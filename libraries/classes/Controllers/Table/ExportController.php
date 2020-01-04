<?php
/**
 * @package PhpMyAdmin\Controllers\Table
 */
declare(strict_types=1);

namespace PhpMyAdmin\Controllers\Table;

use PhpMyAdmin\Config\PageSettings;
use PhpMyAdmin\DatabaseInterface;
use PhpMyAdmin\Display\Export;
use PhpMyAdmin\Html\Generator;
use PhpMyAdmin\Message;
use PhpMyAdmin\Relation;
use PhpMyAdmin\Response;
use PhpMyAdmin\SqlParser\Parser;
use PhpMyAdmin\SqlParser\Statements\SelectStatement;
use PhpMyAdmin\SqlParser\Utils\Query;
use PhpMyAdmin\Template;
use PhpMyAdmin\Url;

/**
 * @package PhpMyAdmin\Controllers\Table
 */
class ExportController extends AbstractController
{
    /** @var Export */
    private $export;

    /** @var Relation */
    private $relation;

    /**
     * @param Response          $response A Response instance.
     * @param DatabaseInterface $dbi      A DatabaseInterface instance.
     * @param Template          $template A Template instance.
     * @param string            $db       Database name.
     * @param string            $table    Table name.
     * @param Export            $export   An Export instance.
     * @param Relation          $relation A Relation instance.
     */
    public function __construct(
        $response,
        $dbi,
        Template $template,
        $db,
        $table,
        Export $export,
        Relation $relation
    ) {
        parent::__construct($response, $dbi, $template, $db, $table);
        $this->export = $export;
        $this->relation = $relation;
    }

    /**
     * @return void
     */
    public function index(): void
    {
        global $db, $url_query, $url_params, $table, $export_page_title, $replaces;
        global $sql_query, $where_clause, $num_tables, $unlim_num_rows, $multi_values;

        PageSettings::showGroup('Export');

        $header = $this->response->getHeader();
        $scripts = $header->getScripts();
        $scripts->addFile('export.js');

        $cfgRelation = $this->relation->getRelationsParam();

        // handling export template actions
        if (isset($_POST['templateAction']) && $cfgRelation['exporttemplateswork']) {
            $this->export->handleTemplateActions($cfgRelation);
            return;
        }

        /**
         * Gets tables information and displays top links
         */
        require_once ROOT_PATH . 'libraries/tbl_common.inc.php';

        $url_params = [
            'goto' => Url::getFromRoute('/table/export'),
            'back' => Url::getFromRoute('/table/export'),
        ];
        $url_query .= Url::getCommon($url_params, '&');

        $export_page_title = __('View dump (schema) of table');

        // When we have some query, we need to remove LIMIT from that and possibly
        // generate WHERE clause (if we are asked to export specific rows)

        if (! empty($sql_query)) {
            $parser = new Parser($sql_query);

            if (! empty($parser->statements[0])
                && ($parser->statements[0] instanceof SelectStatement)
            ) {
                // Checking if the WHERE clause has to be replaced.
                if (! empty($where_clause) && is_array($where_clause)) {
                    $replaces[] = [
                        'WHERE',
                        'WHERE (' . implode(') OR (', $where_clause) . ')',
                    ];
                }

                // Preparing to remove the LIMIT clause.
                $replaces[] = [
                    'LIMIT',
                    '',
                ];

                // Replacing the clauses.
                $sql_query = Query::replaceClauses(
                    $parser->statements[0],
                    $parser->list,
                    $replaces
                );
            }

            echo Generator::getMessage(Message::success());
        }

        if (! isset($sql_query)) {
            $sql_query = '';
        }
        if (! isset($num_tables)) {
            $num_tables = 0;
        }
        if (! isset($unlim_num_rows)) {
            $unlim_num_rows = 0;
        }
        if (! isset($multi_values)) {
            $multi_values = '';
        }

        $this->response->addHTML($this->export->getDisplay(
            'table',
            $db,
            $table,
            $sql_query,
            $num_tables,
            $unlim_num_rows,
            $multi_values
        ));
    }
}
