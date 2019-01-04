<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * Handles database multi-table querying
 *
 * @package PhpMyAdmin
 */
declare(strict_types=1);

use PhpMyAdmin\Database\MultiTableQuery;
use PhpMyAdmin\Response;

if (! defined('ROOT_PATH')) {
    define('ROOT_PATH', __DIR__ . DIRECTORY_SEPARATOR);
}

require_once ROOT_PATH . 'libraries/common.inc.php';

if (isset($_POST['sql_query'])) {
    MultiTableQuery::displayResults(
        $_POST['sql_query'],
        $_REQUEST['db'],
        $pmaThemeImage
    );
} if (isset($_GET['tables'])) {
    $constrains = $GLOBALS['dbi']->getForeignKeyConstrains(
        $_REQUEST['db'],
        $_GET['tables']
    );
    $response = Response::getInstance();
    $response->addJSON('foreignKeyConstrains', $constrains);
} else {
    $response = Response::getInstance();

    $header = $response->getHeader();
    $scripts = $header->getScripts();
    $scripts->addFile('vendor/jquery/jquery.md5.js');
    $scripts->addFile('db_multi_table_query.js');
    $scripts->addFile('db_query_generator.js');

    $queryInstance = new MultiTableQuery($GLOBALS['dbi'], $db);

    $response->addHTML($queryInstance->getFormHtml());
}
