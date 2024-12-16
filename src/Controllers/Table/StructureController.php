<?php

declare(strict_types=1);

namespace PhpMyAdmin\Controllers\Table;

use DateTimeImmutable;
use PhpMyAdmin\Charsets;
use PhpMyAdmin\ColumnFull;
use PhpMyAdmin\Config;
use PhpMyAdmin\Config\PageSettings;
use PhpMyAdmin\ConfigStorage\Relation;
use PhpMyAdmin\ConfigStorage\RelationParameters;
use PhpMyAdmin\Controllers\InvocableController;
use PhpMyAdmin\Current;
use PhpMyAdmin\Database\CentralColumns;
use PhpMyAdmin\DatabaseInterface;
use PhpMyAdmin\DbTableExists;
use PhpMyAdmin\Engines\Innodb;
use PhpMyAdmin\Html\Generator;
use PhpMyAdmin\Http\Response;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Identifiers\DatabaseName;
use PhpMyAdmin\Identifiers\TableName;
use PhpMyAdmin\Index;
use PhpMyAdmin\Message;
use PhpMyAdmin\Partitioning\Partition;
use PhpMyAdmin\Query\Utilities;
use PhpMyAdmin\ResponseRenderer;
use PhpMyAdmin\StorageEngine;
use PhpMyAdmin\Table\Table;
use PhpMyAdmin\Template;
use PhpMyAdmin\Tracking\Tracker;
use PhpMyAdmin\Transformations;
use PhpMyAdmin\Util;
use PhpMyAdmin\Utils\ForeignKey;
use stdClass;

use function __;
use function in_array;
use function str_contains;

/**
 * Displays table structure infos like columns, indexes, size, rows
 * and allows manipulation of indexes and columns.
 */
class StructureController implements InvocableController
{
    private readonly Table $tableObj;

    public function __construct(
        private readonly ResponseRenderer $response,
        private readonly Template $template,
        private readonly Relation $relation,
        private readonly Transformations $transformations,
        private readonly DatabaseInterface $dbi,
        private readonly PageSettings $pageSettings,
        private readonly DbTableExists $dbTableExists,
    ) {
        $this->tableObj = $this->dbi->getTable(Current::$database, Current::$table);
    }

    public function __invoke(ServerRequest $request): Response
    {
        $this->dbi->selectDb(Current::$database);

        $this->pageSettings->init('TableStructure');
        $this->response->addHTML($this->pageSettings->getErrorHTML());
        $this->response->addHTML($this->pageSettings->getHTML());

        $this->response->addScriptFiles(['table/structure.js']);

        $relationParameters = $this->relation->getRelationParameters();

        if (Current::$database === '') {
            return $this->response->missingParameterError('db');
        }

        if (Current::$table === '') {
            return $this->response->missingParameterError('table');
        }

        $isSystemSchema = Utilities::isSystemSchema(Current::$database);

        $databaseName = DatabaseName::tryFrom($request->getParam('db'));
        if ($databaseName === null || ! $this->dbTableExists->selectDatabase($databaseName)) {
            if ($request->isAjax()) {
                $this->response->setRequestStatus(false);
                $this->response->addJSON('message', Message::error(__('No databases selected.')));

                return $this->response->response();
            }

            $this->response->redirectToRoute('/', ['reload' => true, 'message' => __('No databases selected.')]);

            return $this->response->response();
        }

        $tableName = TableName::tryFrom($request->getParam('table'));
        if ($tableName === null || ! $this->dbTableExists->hasTable($databaseName, $tableName)) {
            if ($request->isAjax()) {
                $this->response->setRequestStatus(false);
                $this->response->addJSON('message', Message::error(__('No table selected.')));

                return $this->response->response();
            }

            $this->response->redirectToRoute('/', ['reload' => true, 'message' => __('No table selected.')]);

            return $this->response->response();
        }

        $primary = Index::getPrimary($this->dbi, Current::$table, Current::$database);
        $columnsWithIndex = $this->dbi
            ->getTable(Current::$database, Current::$table)
            ->getColumnsWithIndex(Index::UNIQUE | Index::INDEX | Index::SPATIAL | Index::FULLTEXT);

        $fields = $this->dbi->getColumns(Current::$database, Current::$table, true);

        $this->response->addHTML($this->displayStructure(
            $relationParameters,
            $primary,
            $fields,
            $columnsWithIndex,
            $isSystemSchema,
            $request->getRoute(),
        ));

        return $this->response->response();
    }

    /**
     * Displays the table structure ('show table' works correct since 3.23.03)
     *
     * @param ColumnFull[]   $fields           Fields
     * @param (string|int)[] $columnsWithIndex Columns with index
     * @psalm-param non-empty-string $route
     */
    private function displayStructure(
        RelationParameters $relationParameters,
        Index|null $primaryIndex,
        array $fields,
        array $columnsWithIndex,
        bool $isSystemSchema,
        string $route,
    ): string {
        if ($this->tableObj->isView()) {
            $tableIsAView = true;
            $tableStorageEngine = __('View');
        } else {
            $tableIsAView = false;
            $tableStorageEngine = $this->tableObj->getStorageEngine();
        }

        // prepare comments
        $commentsMap = [];
        $mimeMap = [];

        $config = Config::getInstance();
        if ($config->settings['ShowPropertyComments']) {
            $commentsMap = $this->relation->getComments(Current::$database, Current::$table);
            if ($relationParameters->browserTransformationFeature !== null && $config->settings['BrowseMIME']) {
                $mimeMap = $this->transformations->getMime(Current::$database, Current::$table, true);
            }
        }

        $centralColumns = new CentralColumns($this->dbi);
        $centralList = $centralColumns->findExistingColNames(
            Current::$database,
            $this->dbi->getColumnNames(Current::$database, Current::$table),
        );

        /**
         * Displays Space usage and row statistics
         */
        // BEGIN - Calc Table Space
        // Get valid statistics whatever is the table type
        if ($config->settings['ShowStats']) {
            //get table stats in HTML format
            $tablestats = $this->getTableStats($isSystemSchema, $tableIsAView, $tableStorageEngine);
            //returning the response in JSON format to be used by Ajax
            $this->response->addJSON('tableStat', $tablestats);
        }

        // END - Calc Table Space

        // logic removed from Template
        $rownum = 0;
        $columnsList = [];
        $attributes = [];
        $displayedFields = [];
        $rowComments = [];
        $extractedColumnSpecs = [];
        $collations = [];
        foreach ($fields as $field) {
            ++$rownum;
            $columnsList[] = $field->field;

            $extractedColumnSpecs[$rownum] = Util::extractColumnSpec($field->type);
            $attributes[$rownum] = $extractedColumnSpecs[$rownum]['attribute'];
            if (str_contains($field->extra, 'on update CURRENT_TIMESTAMP')) {
                $attributes[$rownum] = 'on update CURRENT_TIMESTAMP';
            }

            $displayedFields[$rownum] = new stdClass();
            $displayedFields[$rownum]->text = $field->field;
            $displayedFields[$rownum]->icon = '';
            $rowComments[$rownum] = '';

            if (isset($commentsMap[$field->field])) {
                $displayedFields[$rownum]->comment = $commentsMap[$field->field];
                $rowComments[$rownum] = $commentsMap[$field->field];
            }

            if ($primaryIndex !== null && $primaryIndex->hasColumn($field->field)) {
                $displayedFields[$rownum]->icon .= Generator::getImage('b_primary', __('Primary'));
            }

            if (in_array($field->field, $columnsWithIndex)) {
                $displayedFields[$rownum]->icon .= Generator::getImage('bd_primary', __('Index'));
            }

            $collation = Charsets::findCollationByName(
                $this->dbi,
                $config->selectedServer['DisableIS'],
                $field->collation ?? '',
            );
            if ($collation === null) {
                continue;
            }

            $collations[$collation->getName()] = [
                'name' => $collation->getName(),
                'description' => $collation->getDescription(),
            ];
        }

        $engine = $this->tableObj->getStorageEngine();

        return $this->template->render('table/structure/display_structure', [
            'collations' => $collations,
            'is_foreign_key_supported' => ForeignKey::isSupported($engine),
            'indexes' => Index::getFromTable($this->dbi, Current::$table, Current::$database),
            'indexes_duplicates' => Index::findDuplicates(Current::$table, Current::$database),
            'relation_parameters' => $relationParameters,
            'hide_structure_actions' => $config->settings['HideStructureActions'] === true,
            'db' => Current::$database,
            'table' => Current::$table,
            'db_is_system_schema' => $isSystemSchema,
            'tbl_is_view' => $tableIsAView,
            'mime_map' => $mimeMap,
            'tbl_storage_engine' => $tableStorageEngine,
            'primary' => $primaryIndex,
            'columns_list' => $columnsList,
            'table_stats' => $tablestats ?? null,
            'fields' => $fields,
            'extracted_columnspecs' => $extractedColumnSpecs,
            'columns_with_index' => $columnsWithIndex,
            'central_list' => $centralList,
            'comments_map' => $commentsMap,
            'browse_mime' => $config->settings['BrowseMIME'],
            'show_column_comments' => $config->settings['ShowColumnComments'],
            'show_stats' => $config->settings['ShowStats'],
            'mysql_int_version' => $this->dbi->getVersion(),
            'is_mariadb' => $this->dbi->isMariaDB(),
            'is_active' => Tracker::isActive(),
            'have_partitioning' => Partition::havePartitioning(),
            'partitions' => Partition::getPartitions(Current::$database, Current::$table),
            'partition_names' => Partition::getPartitionNames(Current::$database, Current::$table),
            'default_sliders_state' => $config->settings['InitialSlidersState'],
            'attributes' => $attributes,
            'displayed_fields' => $displayedFields,
            'row_comments' => $rowComments,
            'route' => $route,
        ]);
    }

    /**
     * Get HTML snippet for display table statistics
     */
    private function getTableStats(
        bool $isSystemSchema,
        bool $tableIsAView,
        string $tableStorageEngine,
    ): string {
        // Clear the cache as some table information might have gotten changed due to the user action.
        $this->dbi->getCache()->clearTableCache();
        $showTable = $this->tableObj->getStatusInfo();

        if (empty($showTable['Data_length'])) {
            $showTable['Data_length'] = 0;
        }

        if (empty($showTable['Index_length'])) {
            $showTable['Index_length'] = 0;
        }

        $isInnoDB = isset($showTable['Type']) && $showTable['Type'] === 'InnoDB';

        $mergetable = $this->tableObj->isMerge();

        // this is to display for example 261.2 MiB instead of 268k KiB
        $maxDigits = 3;
        $decimals = 1;
        [$dataSize, $dataUnit] = Util::formatByteDown($showTable['Data_length'], $maxDigits, $decimals);
        if ($mergetable === false) {
            [$indexSize, $indexUnit] = Util::formatByteDown($showTable['Index_length'], $maxDigits, $decimals);
        }

        if (isset($showTable['Data_free'])) {
            [$freeSize, $freeUnit] = Util::formatByteDown($showTable['Data_free'], $maxDigits, $decimals);
            [$effectSize, $effectUnit] = Util::formatByteDown(
                $showTable['Data_length']
                + $showTable['Index_length']
                - $showTable['Data_free'],
                $maxDigits,
                $decimals,
            );
        } else {
            [$effectSize, $effectUnit] = Util::formatByteDown(
                $showTable['Data_length']
                + $showTable['Index_length'],
                $maxDigits,
                $decimals,
            );
        }

        [$totSize, $totUnit] = Util::formatByteDown(
            $showTable['Data_length'] + $showTable['Index_length'],
            $maxDigits,
            $decimals,
        );

        $avgSize = '';
        $avgUnit = '';
        if ($this->tableObj->getNumRows() > 0) {
            [$avgSize, $avgUnit] = Util::formatByteDown(
                ($showTable['Data_length']
                + $showTable['Index_length'])
                / $showTable['Rows'],
                6,
                1,
            );
        }

        /** @var Innodb $innodbEnginePlugin */
        $innodbEnginePlugin = StorageEngine::getEngine('Innodb');
        $innodbFilePerTable = $innodbEnginePlugin->supportsFilePerTable();

        $tableCollation = [];
        $collation = Charsets::findCollationByName(
            $this->dbi,
            Config::getInstance()->selectedServer['DisableIS'],
            $this->tableObj->getCollation(),
        );
        if ($collation !== null) {
            $tableCollation = ['name' => $collation->getName(), 'description' => $collation->getDescription()];
        }

        if (isset($showTable['Create_time'])) {
            $showTable['Create_time'] = Util::localisedDate(new DateTimeImmutable($showTable['Create_time']));
        }

        if (isset($showTable['Update_time'])) {
            $showTable['Update_time'] = Util::localisedDate(new DateTimeImmutable($showTable['Update_time']));
        }

        if (isset($showTable['Check_time'])) {
            $showTable['Check_time'] = Util::localisedDate(new DateTimeImmutable($showTable['Check_time']));
        }

        return $this->template->render('table/structure/display_table_stats', [
            'db' => Current::$database,
            'table' => Current::$table,
            'showtable' => $showTable,
            'tbl_is_view' => $tableIsAView,
            'db_is_system_schema' => $isSystemSchema,
            'tbl_storage_engine' => $tableStorageEngine,
            'table_collation' => $tableCollation,
            'is_innodb' => $isInnoDB,
            'mergetable' => $mergetable,
            'avg_size' => $avgSize,
            'avg_unit' => $avgUnit,
            'data_size' => $dataSize,
            'data_unit' => $dataUnit,
            'index_size' => $indexSize ?? null,
            'index_unit' => $indexUnit ?? null,
            'innodb_file_per_table' => $innodbFilePerTable,
            'free_size' => $freeSize ?? null,
            'free_unit' => $freeUnit ?? null,
            'effect_size' => $effectSize,
            'effect_unit' => $effectUnit,
            'tot_size' => $totSize,
            'tot_unit' => $totUnit,
        ]);
    }
}
