<?php

declare(strict_types=1);

namespace PhpMyAdmin\Database\Designer;

use PhpMyAdmin\Config;
use PhpMyAdmin\ConfigStorage\Relation;
use PhpMyAdmin\Current;
use PhpMyAdmin\Dbal\ConnectionType;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Index;
use PhpMyAdmin\Message;
use PhpMyAdmin\Query\Generator as QueryGenerator;
use PhpMyAdmin\Table\Table;
use PhpMyAdmin\Util;
use PhpMyAdmin\Utils\ForeignKey;

use function __;
use function _pgettext;
use function array_keys;
use function count;
use function explode;
use function in_array;
use function is_string;
use function json_decode;
use function json_encode;
use function rawurlencode;

/**
 * Common functions for Designer
 */
class Common
{
    public function __construct(private DatabaseInterface $dbi, private Relation $relation)
    {
    }

    /**
     * Retrieves table info and returns it
     *
     * @param string|null $db    (optional) Filter only a DB ($table is required if you use $db)
     * @param string|null $table (optional) Filter only a table ($db is now required)
     *
     * @return DesignerTable[] with table info
     */
    public function getTablesInfo(string|null $db = null, string|null $table = null): array
    {
        $designerTables = [];
        $db ??= Current::$database;
        // seems to be needed later
        $this->dbi->selectDb($db);
        if ($table === null) {
            $tables = $this->dbi->getTablesFull($db);
        } else {
            $tables = $this->dbi->getTablesFull($db, $table);
        }

        foreach ($tables as $oneTable) {
            $df = $this->relation->getDisplayField($db, $oneTable['TABLE_NAME']);
            $df = $df !== '' ? $df : null;
            $designerTables[] = new DesignerTable(
                $db,
                $oneTable['TABLE_NAME'],
                is_string($oneTable['ENGINE']) ? $oneTable['ENGINE'] : '',
                $df,
            );
        }

        return $designerTables;
    }

    /**
     * Retrieves table column info
     *
     * @param DesignerTable[] $designerTables The designer tables
     *
     * @return list<ColumnInfo>[] table column nfo
     */
    public function getColumnsInfo(array $designerTables): array
    {
        $tabColumn = [];

        foreach ($designerTables as $designerTable) {
            $fieldsRs = $this->dbi->query(
                QueryGenerator::getColumnsSql(
                    $designerTable->getDatabaseName(),
                    $designerTable->getTableName(),
                ),
            );
            /**
             * @var string $field
             * @var string $type
             */
            foreach ($fieldsRs as ['Field' => $field, 'Type' => $type]) {
                $tabColumn[$designerTable->getDbTableString()][] = new ColumnInfo($field, $type);
            }
        }

        return $tabColumn;
    }

    /**
     * Returns JavaScript code for initializing vars
     *
     * @param DesignerTable[] $designerTables The designer tables
     *
     * @return mixed[] JavaScript code
     */
    public function getScriptContr(array $designerTables): array
    {
        $this->dbi->selectDb(Current::$database);
        /** @var array{C_NAME: string[], DTN: string[], DCN: string[], STN: string[], SCN: string[]} $con */
        $con = ['C_NAME' => [], 'DTN' => [], 'DCN' => [], 'STN' => [], 'SCN' => []];
        $i = 0;
        $allTabRs = $this->dbi->query('SHOW TABLES FROM ' . Util::backquote(Current::$database));
        while ($val = $allTabRs->fetchRow()) {
            $val = (string) $val[0];

            $row = $this->relation->getForeignersInternal(Current::$database, $val);

            foreach ($row as $field => $value) {
                $con['C_NAME'][$i] = '';
                $con['DTN'][$i] = rawurlencode(Current::$database . '.' . $val);
                $con['DCN'][$i] = rawurlencode((string) $field);
                $con['STN'][$i] = rawurlencode($value['foreign_db'] . '.' . $value['foreign_table']);
                $con['SCN'][$i] = rawurlencode($value['foreign_field']);
                $i++;
            }

            foreach ($this->relation->getForeignKeysData(Current::$database, $val) as $oneKey) {
                foreach ($oneKey->indexList as $index => $oneField) {
                    $con['C_NAME'][$i] = rawurlencode($oneKey->constraint);
                    $con['DTN'][$i] = rawurlencode(Current::$database . '.' . $val);
                    $con['DCN'][$i] = rawurlencode($oneField);
                    $con['STN'][$i] = rawurlencode(
                        ($oneKey->refDbName ?? Current::$database)
                        . '.' . $oneKey->refTableName,
                    );
                    $con['SCN'][$i] = rawurlencode($oneKey->refIndexList[$index]);
                    $i++;
                }
            }
        }

        $tableDbNames = [];
        foreach ($designerTables as $designerTable) {
            $tableDbNames[] = rawurlencode($designerTable->getDbTableString());
        }

        $ti = 0;
        $retval = [];
        for ($i = 0, $cnt = count($con['C_NAME']); $i < $cnt; $i++) {
            $cNameI = $con['C_NAME'][$i];
            $dtnI = $con['DTN'][$i];
            $retval[$ti] = [];
            $retval[$ti][$cNameI] = [];
            if (in_array($dtnI, $tableDbNames, true) && in_array($con['STN'][$i], $tableDbNames, true)) {
                $retval[$ti][$cNameI][$dtnI] = [];
                $retval[$ti][$cNameI][$dtnI][$con['DCN'][$i]] = [$con['STN'][$i], $con['SCN'][$i]];
            }

            $ti++;
        }

        return $retval;
    }

    /**
     * Returns all indices
     *
     * @param DesignerTable[] $designerTables The designer tables
     *
     * @return array<string, bool>
     */
    public function getAllKeys(array $designerTables): array
    {
        $keys = [];

        foreach ($designerTables as $designerTable) {
            $schema = $designerTable->getDatabaseName();
            // for now, take into account only the first index segment
            foreach (Index::getFromTable($this->dbi, $designerTable->getTableName(), $schema) as $index) {
                $columns = $index->getColumns();
                foreach (array_keys($columns) as $columnName) {
                    $key = $schema . '.' . $designerTable->getTableName() . '.' . $columnName;
                    $keys[$key] = ! $index->getNonUnique();
                }
            }
        }

        return $keys;
    }

    /**
     * Return j_tab and h_tab arrays
     *
     * @param DesignerTable[] $designerTables The designer tables
     *
     * @return mixed[]
     */
    public function getScriptTabs(array $designerTables): array
    {
        $retval = ['j_tabs' => [], 'h_tabs' => []];

        foreach ($designerTables as $designerTable) {
            $key = rawurlencode($designerTable->getDbTableString());
            $retval['j_tabs'][$key] = $designerTable->supportsForeignkeys() ? 1 : 0;
            $retval['h_tabs'][$key] = 1;
        }

        return $retval;
    }

    /**
     * Returns table positions of a given pdf page
     *
     * @param int $pg pdf page id
     *
     * @return mixed[] of table positions
     */
    public function getTablePositions(int $pg): array
    {
        $pdfFeature = $this->relation->getRelationParameters()->pdfFeature;
        if ($pdfFeature === null) {
            return [];
        }

        $query = "
            SELECT CONCAT_WS('.', `db_name`, `table_name`) AS `name`,
                `db_name` as `dbName`, `table_name` as `tableName`,
                `x` AS `X`,
                `y` AS `Y`,
                1 AS `V`,
                1 AS `H`
            FROM " . Util::backquote($pdfFeature->database)
                . '.' . Util::backquote($pdfFeature->tableCoords) . '
            WHERE pdf_page_number = ' . $pg;

        return $this->dbi->fetchResult($query, 'name', null, ConnectionType::ControlUser);
    }

    /**
     * Returns page name of a given pdf page
     *
     * @param int $pg pdf page id
     *
     * @return string|null table name
     */
    public function getPageName(int $pg): string|null
    {
        $pdfFeature = $this->relation->getRelationParameters()->pdfFeature;
        if ($pdfFeature === null) {
            return null;
        }

        $query = 'SELECT `page_descr`'
            . ' FROM ' . Util::backquote($pdfFeature->database)
            . '.' . Util::backquote($pdfFeature->pdfPages)
            . ' WHERE ' . Util::backquote('page_nr') . ' = ' . $pg;
        $pageName = $this->dbi->fetchValue($query, 0, ConnectionType::ControlUser);

        return $pageName !== false ? $pageName : null;
    }

    /**
     * Deletes a given pdf page and its corresponding coordinates
     *
     * @param int $pg page id
     */
    public function deletePage(int $pg): bool
    {
        $pdfFeature = $this->relation->getRelationParameters()->pdfFeature;
        if ($pdfFeature === null) {
            return false;
        }

        $query = 'DELETE FROM ' . Util::backquote($pdfFeature->database)
            . '.' . Util::backquote($pdfFeature->tableCoords)
            . ' WHERE ' . Util::backquote('pdf_page_number') . ' = ' . $pg;
        $this->dbi->queryAsControlUser($query);

        $query = 'DELETE FROM ' . Util::backquote($pdfFeature->database)
            . '.' . Util::backquote($pdfFeature->pdfPages)
            . ' WHERE ' . Util::backquote('page_nr') . ' = ' . $pg;
        $this->dbi->queryAsControlUser($query);

        return true;
    }

    /**
     * Returns the id of the default pdf page of the database.
     * Default page is the one which has the same name as the database.
     *
     * @param string $db database
     *
     * @return int id of the default pdf page for the database
     */
    public function getDefaultPage(string $db): int
    {
        $pdfFeature = $this->relation->getRelationParameters()->pdfFeature;
        if ($pdfFeature === null) {
            return -1;
        }

        $query = 'SELECT `page_nr`'
            . ' FROM ' . Util::backquote($pdfFeature->database)
            . '.' . Util::backquote($pdfFeature->pdfPages)
            . ' WHERE `db_name` = ' . $this->dbi->quoteString($db, ConnectionType::ControlUser)
            . ' AND `page_descr` = ' . $this->dbi->quoteString($db, ConnectionType::ControlUser);

        $defaultPageNo = $this->dbi->fetchValue($query, 0, ConnectionType::ControlUser);

        return is_string($defaultPageNo) ? (int) $defaultPageNo : -1;
    }

    /**
     * Get the status if the page already exists
     * If no such exists, returns negative index.
     *
     * @param string $pg name
     */
    public function getPageExists(string $pg): bool
    {
        $pdfFeature = $this->relation->getRelationParameters()->pdfFeature;
        if ($pdfFeature === null) {
            return false;
        }

        $query = 'SELECT `page_nr`'
            . ' FROM ' . Util::backquote($pdfFeature->database)
            . '.' . Util::backquote($pdfFeature->pdfPages)
            . ' WHERE `page_descr` = ' . $this->dbi->quoteString($pg, ConnectionType::ControlUser);
        $pageNos = $this->dbi->fetchResultSimple($query, ConnectionType::ControlUser);

        return $pageNos !== [];
    }

    /**
     * Get the id of the page to load. If a default page exists it will be returned.
     * If no such exists, returns the id of the first page of the database.
     *
     * @param string $db database
     *
     * @return int id of the page to load
     */
    public function getLoadingPage(string $db): int
    {
        $pdfFeature = $this->relation->getRelationParameters()->pdfFeature;
        if ($pdfFeature === null) {
            return -1;
        }

        $defaultPageNo = $this->getDefaultPage($db);
        if ($defaultPageNo != -1) {
            return $defaultPageNo;
        }

        $query = 'SELECT MIN(`page_nr`)'
            . ' FROM ' . Util::backquote($pdfFeature->database)
            . '.' . Util::backquote($pdfFeature->pdfPages)
            . ' WHERE `db_name` = ' . $this->dbi->quoteString($db, ConnectionType::ControlUser);

        $minPageNo = $this->dbi->fetchValue($query, 0, ConnectionType::ControlUser);

        return is_string($minPageNo) ? (int) $minPageNo : -1;
    }

    /**
     * Creates a new page and returns its auto-incrementing id
     *
     * @param string $pageName name of the page
     * @param string $db       name of the database
     */
    public function createNewPage(string $pageName, string $db): int|null
    {
        $pdfFeature = $this->relation->getRelationParameters()->pdfFeature;
        if ($pdfFeature === null) {
            return null;
        }

        return $this->relation->createPage($pageName, $pdfFeature, $db);
    }

    /**
     * Saves positions of table(s) of a given pdf page
     *
     * @param int $pg pdf page id
     */
    public function saveTablePositions(int $pg): bool
    {
        $pdfFeature = $this->relation->getRelationParameters()->pdfFeature;
        if ($pdfFeature === null) {
            return false;
        }

        $pageId = $this->dbi->quoteString((string) $pg, ConnectionType::ControlUser);

        $query = 'DELETE FROM '
            . Util::backquote($pdfFeature->database)
            . '.' . Util::backquote($pdfFeature->tableCoords)
            . ' WHERE `pdf_page_number` = ' . $pageId;

        $this->dbi->queryAsControlUser($query);

        foreach ($_POST['t_h'] as $key => $value) {
            $db = $_POST['t_db'][$key];
            $tab = $_POST['t_tbl'][$key];
            if (! $value) {
                continue;
            }

            $query = 'INSERT INTO '
                . Util::backquote($pdfFeature->database) . '.'
                . Util::backquote($pdfFeature->tableCoords)
                . ' (`db_name`, `table_name`, `pdf_page_number`, `x`, `y`)'
                . ' VALUES ('
                . $this->dbi->quoteString($db, ConnectionType::ControlUser) . ', '
                . $this->dbi->quoteString($tab, ConnectionType::ControlUser) . ', '
                . $pageId . ', '
                . $this->dbi->quoteString($_POST['t_x'][$key], ConnectionType::ControlUser) . ', '
                . $this->dbi->quoteString($_POST['t_y'][$key], ConnectionType::ControlUser) . ')';

            $this->dbi->queryAsControlUser($query);
        }

        return true;
    }

    /**
     * Saves the display field for a table.
     *
     * @param string $db    database name
     * @param string $table table name
     * @param string $field display field name
     */
    public function saveDisplayField(string $db, string $table, string $field): Message
    {
        $displayFeature = $this->relation->getRelationParameters()->displayFeature;
        if ($displayFeature === null) {
            return Message::error(
                _pgettext(
                    'phpMyAdmin configuration storage is not configured for'
                    . ' "Display Features" on designer when user tries to set a display field.',
                    'phpMyAdmin configuration storage is not configured for "Display Features".',
                ),
            );
        }

        $updQuery = new Table($table, $db, $this->dbi);
        $updQuery->updateDisplayField($field, $displayFeature);

        return Message::success();
    }

    /**
     * Adds a new foreign relation
     *
     * @param string $t1       foreign table
     * @param string $f1       foreign field
     * @param string $t2       master table
     * @param string $f2       master field
     * @param string $onDelete on delete action
     * @param string $onUpdate on update action
     * @param string $db1      database
     * @param string $db2      database
     */
    public function addNewRelation(
        string $t1,
        string $f1,
        string $t2,
        string $f2,
        string $onDelete,
        string $onUpdate,
        string $db1,
        string $db2,
    ): Message {
        $typeT1 = Table::get($t1, $db1, $this->dbi)->getStorageEngine();
        $typeT2 = Table::get($t2, $db2, $this->dbi)->getStorageEngine();

        // native foreign key
        if (ForeignKey::isSupported($typeT1) && $typeT1 === $typeT2) {
            // relation exists?
            $existRelForeign = $this->relation->getForeignKeysData($db2, $t2);
            $foreigner = $this->relation->getColumnFromForeignKeysData($existRelForeign, $f2);
            if ($foreigner !== false && isset($foreigner['constraint'])) {
                return Message::error(__('Error: relationship already exists.'));
            }

            // note: in InnoDB, the index does not requires to be on a PRIMARY
            // or UNIQUE key
            // improve: check all other requirements for InnoDB relations
            $result = $this->dbi->query(
                'SHOW INDEX FROM ' . Util::backquote($db1)
                . '.' . Util::backquote($t1) . ';',
            );

            // will be use to emphasis prim. keys in the table view
            $indexArray1 = [];
            while ($row = $result->fetchAssoc()) {
                $indexArray1[$row['Column_name']] = 1;
            }

            $result = $this->dbi->query(
                'SHOW INDEX FROM ' . Util::backquote($db2)
                . '.' . Util::backquote($t2) . ';',
            );
            // will be used to emphasis prim. keys in the table view
            $indexArray2 = [];
            while ($row = $result->fetchAssoc()) {
                $indexArray2[$row['Column_name']] = 1;
            }

            unset($result);

            if (! empty($indexArray1[$f1]) && ! empty($indexArray2[$f2])) {
                $updQuery = 'ALTER TABLE ' . Util::backquote($db2)
                    . '.' . Util::backquote($t2)
                    . ' ADD FOREIGN KEY ('
                    . Util::backquote($f2) . ')'
                    . ' REFERENCES '
                    . Util::backquote($db1) . '.'
                    . Util::backquote($t1) . '('
                    . Util::backquote($f1) . ')';

                if ($onDelete !== 'nix') {
                    $updQuery .= ' ON DELETE ' . $onDelete;
                }

                if ($onUpdate !== 'nix') {
                    $updQuery .= ' ON UPDATE ' . $onUpdate;
                }

                $updQuery .= ';';
                if ($this->dbi->tryQuery($updQuery)) {
                    return Message::success(__('FOREIGN KEY relationship has been added.'));
                }

                $error = $this->dbi->getError();

                return Message::error(__('Error: FOREIGN KEY relationship could not be added!') . '<br>' . $error);
            }

            return Message::error(__('Error: Missing index on column(s).'));
        }

        $relationFeature = $this->relation->getRelationParameters()->relationFeature;
        if ($relationFeature === null) {
            return Message::error(__('Error: Relational features are disabled!'));
        }

        // no need to recheck if the keys are primary or unique at this point,
        // this was checked on the interface part

        $q = 'INSERT INTO '
            . Util::backquote($relationFeature->database)
            . '.'
            . Util::backquote($relationFeature->relation)
            . '(master_db, master_table, master_field, '
            . 'foreign_db, foreign_table, foreign_field)'
            . ' values('
            . $this->dbi->quoteString($db2, ConnectionType::ControlUser) . ', '
            . $this->dbi->quoteString($t2, ConnectionType::ControlUser) . ', '
            . $this->dbi->quoteString($f2, ConnectionType::ControlUser) . ', '
            . $this->dbi->quoteString($db1, ConnectionType::ControlUser) . ', '
            . $this->dbi->quoteString($t1, ConnectionType::ControlUser) . ', '
            . $this->dbi->quoteString($f1, ConnectionType::ControlUser) . ')';

        if ($this->dbi->tryQueryAsControlUser($q)) {
            return Message::success(__('Internal relationship has been added.'));
        }

        $error = $this->dbi->getError(ConnectionType::ControlUser);

        return Message::error(__('Error: Internal relationship could not be added!') . '<br>' . $error);
    }

    /**
     * Removes a foreign relation
     *
     * @param string $t1 foreign db.table
     * @param string $f1 foreign field
     * @param string $t2 master db.table
     * @param string $f2 master field
     */
    public function removeRelation(string $t1, string $f1, string $t2, string $f2): Message
    {
        [$db1, $t1] = explode('.', $t1);
        [$db2, $t2] = explode('.', $t2);

        $typeT1 = Table::get($t1, $db1, $this->dbi)->getStorageEngine();
        $typeT2 = Table::get($t2, $db2, $this->dbi)->getStorageEngine();

        if (ForeignKey::isSupported($typeT1) && $typeT1 === $typeT2) {
            // InnoDB
            $existRelForeign = $this->relation->getForeignKeysData($db2, $t2);
            $foreigner = $this->relation->getColumnFromForeignKeysData($existRelForeign, $f2);

            if ($foreigner !== false && isset($foreigner['constraint'])) {
                $updQuery = 'ALTER TABLE ' . Util::backquote($db2)
                    . '.' . Util::backquote($t2) . ' DROP FOREIGN KEY '
                    . Util::backquote($foreigner['constraint']) . ';';
                $this->dbi->query($updQuery);

                return Message::success(__('FOREIGN KEY relationship has been removed.'));
            }
        }

        $relationFeature = $this->relation->getRelationParameters()->relationFeature;
        if ($relationFeature === null) {
            return Message::error(__('Error: Relational features are disabled!'));
        }

        // internal relations
        $deleteQuery = 'DELETE FROM '
            . Util::backquote($relationFeature->database) . '.'
            . Util::backquote($relationFeature->relation) . ' WHERE '
            . 'master_db = ' . $this->dbi->quoteString($db2, ConnectionType::ControlUser)
            . ' AND master_table = ' . $this->dbi->quoteString($t2, ConnectionType::ControlUser)
            . ' AND master_field = ' . $this->dbi->quoteString($f2, ConnectionType::ControlUser)
            . ' AND foreign_db = ' . $this->dbi->quoteString($db1, ConnectionType::ControlUser)
            . ' AND foreign_table = ' . $this->dbi->quoteString($t1, ConnectionType::ControlUser)
            . ' AND foreign_field = ' . $this->dbi->quoteString($f1, ConnectionType::ControlUser);

        $result = $this->dbi->tryQueryAsControlUser($deleteQuery);

        if (! $result) {
            $error = $this->dbi->getError(ConnectionType::ControlUser);

            return Message::error(__('Error: Internal relationship could not be removed!') . '<br>' . $error);
        }

        return Message::success(__('Internal relationship has been removed.'));
    }

    /**
     * Save value for a designer setting
     *
     * @param string $index setting
     * @param string $value value
     */
    public function saveSetting(string $index, string $value): bool
    {
        $databaseDesignerSettingsFeature = $this->relation->getRelationParameters()->databaseDesignerSettingsFeature;
        if ($databaseDesignerSettingsFeature !== null) {
            $cfgDesigner = [
                'user' => Config::getInstance()->selectedServer['user'],
                'db' => $databaseDesignerSettingsFeature->database->getName(),
                'table' => $databaseDesignerSettingsFeature->designerSettings->getName(),
            ];

            $origDataQuery = 'SELECT settings_data'
                . ' FROM ' . Util::backquote($cfgDesigner['db'])
                . '.' . Util::backquote($cfgDesigner['table'])
                . ' WHERE username = '
                . $this->dbi->quoteString($cfgDesigner['user'], ConnectionType::ControlUser) . ';';

            $origData = $this->dbi->fetchSingleRow(
                $origDataQuery,
                DatabaseInterface::FETCH_ASSOC,
                ConnectionType::ControlUser,
            );

            if ($origData !== []) {
                $origData = json_decode($origData['settings_data'], true);
                $origData[$index] = $value;
                $origData = json_encode($origData);

                $saveQuery = 'UPDATE '
                    . Util::backquote($cfgDesigner['db'])
                    . '.' . Util::backquote($cfgDesigner['table'])
                    . ' SET settings_data = ' . $this->dbi->quoteString($origData, ConnectionType::ControlUser)
                    . ' WHERE username = '
                    . $this->dbi->quoteString($cfgDesigner['user'], ConnectionType::ControlUser) . ';';

                $this->dbi->queryAsControlUser($saveQuery);
            } else {
                $saveData = [$index => $value];

                $query = 'INSERT INTO '
                    . Util::backquote($cfgDesigner['db'])
                    . '.' . Util::backquote($cfgDesigner['table'])
                    . ' (username, settings_data)'
                    . ' VALUES(' . $this->dbi->quoteString($cfgDesigner['user'], ConnectionType::ControlUser)
                    . ', ' . $this->dbi->quoteString(json_encode($saveData), ConnectionType::ControlUser) . ');';

                $this->dbi->queryAsControlUser($query);
            }
        }

        return true;
    }
}
