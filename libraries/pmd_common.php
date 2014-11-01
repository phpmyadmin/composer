<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * Common functions for Designer
 *
 * @package PhpMyAdmin-Designer
 */
/**
 * Block attempts to directly run this script
 */
if (! defined('PHPMYADMIN')) {
    exit;
}

$GLOBALS['PMD']['STYLE']          = 'default';

$cfgRelation = PMA_getRelationsParam();

/**
 * Retrieves table info and stores it in $GLOBALS['PMD']
 *
 * @return array with table info
 */
function PMA_getTablesInfo()
{
    $retval = array();

    $GLOBALS['PMD']['TABLE_NAME'] = array();// that foreach no error
    $GLOBALS['PMD']['OWNER'] = array();
    $GLOBALS['PMD']['TABLE_NAME_SMALL'] = array();

    $tables = $GLOBALS['dbi']->getTablesFull($GLOBALS['db']);
    // seems to be needed later
    $GLOBALS['dbi']->selectDb($GLOBALS['db']);
    $i = 0;
    foreach ($tables as $one_table) {
        $GLOBALS['PMD']['TABLE_NAME'][$i]
            = $GLOBALS['db'] . "." . $one_table['TABLE_NAME'];
        $GLOBALS['PMD']['OWNER'][$i] = $GLOBALS['db'];
        $GLOBALS['PMD']['TABLE_NAME_SMALL'][$i] = $one_table['TABLE_NAME'];

        $GLOBALS['PMD_URL']['TABLE_NAME'][$i]
            = urlencode($GLOBALS['db'] . "." . $one_table['TABLE_NAME']);
        $GLOBALS['PMD_URL']['OWNER'][$i] = urlencode($GLOBALS['db']);
        $GLOBALS['PMD_URL']['TABLE_NAME_SMALL'][$i]
            = urlencode($one_table['TABLE_NAME']);

        $GLOBALS['PMD_OUT']['TABLE_NAME'][$i] = htmlspecialchars(
            $GLOBALS['db'] . "." . $one_table['TABLE_NAME'], ENT_QUOTES
        );
        $GLOBALS['PMD_OUT']['OWNER'][$i] = htmlspecialchars(
            $GLOBALS['db'], ENT_QUOTES
        );
        $GLOBALS['PMD_OUT']['TABLE_NAME_SMALL'][$i] = htmlspecialchars(
            $one_table['TABLE_NAME'], ENT_QUOTES
        );

        $GLOBALS['PMD']['TABLE_TYPE'][$i] = /*overload*/mb_strtoupper(
            $one_table['ENGINE']
        );

        $DF = PMA_getDisplayField($GLOBALS['db'], $one_table['TABLE_NAME']);
        if ($DF != '') {
            $retval[$GLOBALS['PMD_URL']["TABLE_NAME_SMALL"][$i]] = urlencode($DF);
        }

        $i++;
    }

    return $retval;
}

/**
 * Retrieves table column info
 *
 * @return array   table column nfo
 */
function PMA_getColumnsInfo()
{
    $GLOBALS['dbi']->selectDb($GLOBALS['db']);
    $tab_column = array();
    for ($i = 0, $cnt = count($GLOBALS['PMD']["TABLE_NAME"]); $i < $cnt; $i++) {
        $fields_rs = $GLOBALS['dbi']->query(
            $GLOBALS['dbi']->getColumnsSql(
                $GLOBALS['db'],
                $GLOBALS['PMD']["TABLE_NAME_SMALL"][$i],
                null,
                true
            ),
            null,
            PMA_DatabaseInterface::QUERY_STORE
        );
        $tbl_name_i = $GLOBALS['PMD']['TABLE_NAME'][$i];
        $j = 0;
        while ($row = $GLOBALS['dbi']->fetchAssoc($fields_rs)) {
            $tab_column[$tbl_name_i]['COLUMN_ID'][$j]   = $j;
            $tab_column[$tbl_name_i]['COLUMN_NAME'][$j] = $row['Field'];
            $tab_column[$tbl_name_i]['TYPE'][$j]        = $row['Type'];
            $tab_column[$tbl_name_i]['NULLABLE'][$j]    = $row['Null'];
            $j++;
        }
    }
    return $tab_column;
}

/**
 * Returns JavaScript code for initializing vars
 *
 * @return string   JavaScript code
 */
function PMA_getScriptContr()
{
    $GLOBALS['dbi']->selectDb($GLOBALS['db']);
    $con = array();
    $con["C_NAME"] = array();
    $i = 0;
    $alltab_rs = $GLOBALS['dbi']->query(
        'SHOW TABLES FROM ' . PMA_Util::backquote($GLOBALS['db']),
        null,
        PMA_DatabaseInterface::QUERY_STORE
    );
    while ($val = @$GLOBALS['dbi']->fetchRow($alltab_rs)) {
        $row = PMA_getForeigners($GLOBALS['db'], $val[0], '', 'internal');
        //echo "<br> internal ".$GLOBALS['db']." - ".$val[0]." - ";
        //print_r($row);
        if ($row !== false) {
            foreach ($row as $field => $value) {
                $con['C_NAME'][$i] = '';
                $con['DTN'][$i]    = urlencode($GLOBALS['db'] . "." . $val[0]);
                $con['DCN'][$i]    = urlencode($field);
                $con['STN'][$i]    = urlencode(
                    $value['foreign_db'] . "." . $value['foreign_table']
                );
                $con['SCN'][$i]    = urlencode($value['foreign_field']);
                $i++;
            }
        }
        $row = PMA_getForeigners($GLOBALS['db'], $val[0], '', 'foreign');
        //echo "<br> INNO ";
        //print_r($row);
        if ($row !== false) {
            foreach ($row['foreign_keys_data'] as $key => $one_key) {
                foreach ($one_key['index_list'] as $index => $one_field) {
                    $con['C_NAME'][$i] = '';
                    $con['DTN'][$i]    = urlencode($GLOBALS['db'] . "." . $val[0]);
                    $con['DCN'][$i]    = urlencode($one_field);
                    $con['STN'][$i]    = urlencode(
                        (isset($one_key['ref_db_name']) ?
                            $one_key['ref_db_name'] : $GLOBALS['db'])
                        . "." . $one_key['ref_table_name']
                    );
                    $con['SCN'][$i] = urlencode($one_key['ref_index_list'][$index]);
                    $i++;
                }
            }
        }
    }

    $ti = 0;
    $retval = array();
    for ($i = 0, $cnt = count($con["C_NAME"]); $i < $cnt; $i++) {
        $c_name_i = $con['C_NAME'][$i];
        $dtn_i = $con['DTN'][$i];
        $retval[$ti] = array();
        $retval[$ti][$c_name_i] = array();
        if (in_array($dtn_i, $GLOBALS['PMD_URL']["TABLE_NAME"])
            && in_array($con['STN'][$i], $GLOBALS['PMD_URL']["TABLE_NAME"])
        ) {
            $retval[$ti][$c_name_i][$dtn_i] = array();
            $retval[$ti][$c_name_i][$dtn_i][$con['DCN'][$i]] = array(
                0 => $con['STN'][$i],
                1 => $con['SCN'][$i]
            );
        }
        $ti++;
    }
    return $retval;
}

/**
 * Returns UNIQUE and PRIMARY indices
 *
 * @return array unique or primary indices
 */
function PMA_getPKOrUniqueKeys()
{
    return PMA_getAllKeys(true);
}

/**
 * Returns all indices
 *
 * @param bool $unique_only whether to include only unique ones
 *
 * @return array indices
 */
function PMA_getAllKeys($unique_only = false)
{
    include_once './libraries/Index.class.php';

    $keys = array();

    foreach ($GLOBALS['PMD']['TABLE_NAME_SMALL'] as $I => $table) {
        $schema = $GLOBALS['PMD']['OWNER'][$I];
        // for now, take into account only the first index segment
        foreach (PMA_Index::getFromTable($table, $schema) as $index) {
            if ($unique_only && ! $index->isUnique()) {
                continue;
            }
            $columns = $index->getColumns();
            foreach ($columns as $column_name => $dummy) {
                $keys[$schema . '.' . $table . '.' . $column_name] = 1;
            }
        }
    }
    return $keys;
}

/**
 * Return script to create j_tab and h_tab arrays
 *
 * @return string
 */
function PMA_getScriptTabs()
{
    $retval = array(
        'j_tabs' => array(),
        'h_tabs' => array()
    );

    for ($i = 0, $cnt = count($GLOBALS['PMD']['TABLE_NAME']); $i < $cnt; $i++) {
        $j = 0;
        if (PMA_Util::isForeignKeySupported($GLOBALS['PMD']['TABLE_TYPE'][$i])) {
            $j = 1;
        }
        $retval['j_tabs'][$GLOBALS['PMD_URL']['TABLE_NAME'][$i]] = $j;
        $retval['h_tabs'][$GLOBALS['PMD_URL']['TABLE_NAME'][$i]] = 1;
    }
    return $retval;
}

/**
 * Returns table positions of a given pdf page
 *
 * @param int $pg pdf page id
 *
 * @return array of table positions
 */
function PMA_getTablePositions($pg)
{
    $cfgRelation = PMA_getRelationsParam();
    if (! $cfgRelation['pdfwork']) {
        return null;
    }

    $query = "
        SELECT CONCAT_WS('.', `db_name`, `table_name`) AS `name`,
            `x` AS `X`,
            `y` AS `Y`,
            1 AS `V`,
            1 AS `H`
        FROM " . PMA_Util::backquote($cfgRelation['db'])
            . "." . PMA_Util::backquote($cfgRelation['table_coords']) . "
        WHERE pdf_page_number = " . $pg;

    $tab_pos = $GLOBALS['dbi']->fetchResult(
        $query,
        'name',
        null,
        $GLOBALS['controllink'],
        PMA_DatabaseInterface::QUERY_STORE
    );
    return $tab_pos;
}

/**
 * Returns page name of a given pdf page
 *
 * @param int $pg pdf page id
 *
 * @return String table name
 */
function PMA_getPageName($pg)
{
    $cfgRelation = PMA_getRelationsParam();
    if (! $cfgRelation['pdfwork']) {
        return null;
    }

    $query = "SELECT `page_descr`"
        . " FROM " . PMA_Util::backquote($cfgRelation['db'])
        . "." . PMA_Util::backquote($cfgRelation['pdf_pages'])
        . " WHERE " . PMA_Util::backquote('page_nr') . " = " . $pg;
    $page_name = $GLOBALS['dbi']->fetchResult(
        $query,
        null,
        null,
        $GLOBALS['controllink'],
        PMA_DatabaseInterface::QUERY_STORE
    );
    return count($page_name) ? $page_name[0] : null;
}

/**
 * Deletes a given pdf page and its corresponding coordinates
 *
 * @param int $pg page id
 *
 * @return boolean success/failure
 */
function PMA_deletePage($pg)
{
    $cfgRelation = PMA_getRelationsParam();
    if (! $cfgRelation['pdfwork']) {
        return null;
    }

    $query = "DELETE FROM " . PMA_Util::backquote($cfgRelation['db'])
             . "." . PMA_Util::backquote($cfgRelation['table_coords'])
             . " WHERE " . PMA_Util::backquote('pdf_page_number') . " = " . $pg;
    $success = PMA_queryAsControlUser(
        $query, true, PMA_DatabaseInterface::QUERY_STORE
    );

    if ($success) {
        $query = "DELETE FROM " . PMA_Util::backquote($cfgRelation['db'])
                 . "." . PMA_Util::backquote($cfgRelation['pdf_pages'])
                 . " WHERE " . PMA_Util::backquote('page_nr') . " = " . $pg;
        $success = PMA_queryAsControlUser(
            $query, true, PMA_DatabaseInterface::QUERY_STORE
        );
    }

    return $success;
}

/**
 * Returns the id of the first pdf page of the database
 *
 * @param string $db database
 *
 * @return int id of the first pdf page, default is -1
 */
function PMA_getFirstPage($db)
{
    $cfgRelation = PMA_getRelationsParam();
    if (! $cfgRelation['pdfwork']) {
        return null;
    }

    $query = "SELECT MIN(`page_nr`)"
        . " FROM " . PMA_Util::backquote($cfgRelation['db'])
        . "." . PMA_Util::backquote($cfgRelation['pdf_pages'])
        . " WHERE `db_name` = '" . $db . "'";

    $min_page_no = $GLOBALS['dbi']->fetchResult(
        $query,
        null,
        null,
        $GLOBALS['controllink'],
        PMA_DatabaseInterface::QUERY_STORE
    );
    return count($min_page_no[0]) ? $min_page_no[0] : -1;
}

/**
 * Creates a new page and returns its auto-incrementing id
 *
 * @param string $pageName name of the page
 * @param string $db       name of the database
 *
 * @return int|null
 */
function PMA_createNewPage($pageName, $db)
{
    $cfgRelation = PMA_getRelationsParam();
    if ($cfgRelation['pdfwork']) {
        $pageNumber = PMA_REL_createPage(
            $pageName,
            $cfgRelation,
            $db
        );
        return $pageNumber;
    }
    return null;
}

/**
 * Saves positions of table(s) of a given pdf page
 *
 * @param int $pg pdf page id
 *
 * @return boolean success/failure
 */
function PMA_saveTablePositions($pg)
{
    $cfgRelation = PMA_getRelationsParam();
    if (! $cfgRelation['pdfwork']) {
        return null;
    }

    $queury =  "DELETE FROM " . PMA_Util::backquote($GLOBALS['cfgRelation']['db'])
        . "." . PMA_Util::backquote($GLOBALS['cfgRelation']['table_coords'])
        . " WHERE `db_name` = '" . PMA_Util::sqlAddSlashes($_REQUEST['db']) . "'"
        . " AND `pdf_page_number` = '" . PMA_Util::sqlAddSlashes($pg) . "'";

    $res = PMA_queryAsControlUser($queury, true, PMA_DatabaseInterface::QUERY_STORE);

    if ($res) {
        foreach ($_REQUEST['t_h'] as $key => $value) {
            list($DB, $TAB) = explode(".", $key);
            if ($value) {
                $queury = "INSERT INTO "
                    . PMA_Util::backquote($GLOBALS['cfgRelation']['db']) . "."
                    . PMA_Util::backquote($GLOBALS['cfgRelation']['table_coords'])
                    . " (`db_name`, `table_name`, `pdf_page_number`, `x`, `y`)"
                    . " VALUES ("
                    . "'" . PMA_Util::sqlAddSlashes($DB) . "', "
                    . "'" . PMA_Util::sqlAddSlashes($TAB) . "', "
                    . "'" . PMA_Util::sqlAddSlashes($pg) . "', "
                    . "'" . PMA_Util::sqlAddSlashes($_REQUEST['t_x'][$key]) . "', "
                    . "'" . PMA_Util::sqlAddSlashes($_REQUEST['t_y'][$key]) . "')";

                $res = PMA_queryAsControlUser(
                    $queury,  true, PMA_DatabaseInterface::QUERY_STORE
                );
            }
        }
    }

    return $res;
}

/**
 * Saves the display field for a table.
 *
 * @param string $db    database name
 * @param string $table table name
 * @param string $field display field name
 *
 * @return boolean
 */
function PMA_saveDisplayField($db, $table, $field)
{
    $cfgRelation = PMA_getRelationsParam();
    if (!$cfgRelation['displaywork']) {
        return false;
    }

    $disp = PMA_getDisplayField($db, $table);
    if ($disp && $disp === $field) {
        $field = '';
    }

    include_once 'libraries/tbl_relation.lib.php';
    PMA_handleUpdateForDisplayField($disp, $field, $db, $table, $cfgRelation);

    return true;
}

/**
 * Adds a new foreign relation
 *
 * @param string $db        database name
 * @param string $T1        foreign table
 * @param string $F1        foreign field
 * @param string $T2        master table
 * @param string $F2        master field
 * @param string $on_delete on delete action
 * @param string $on_update on update action
 *
 * @return array array of success/failure and message
 */
function PMA_addNewRelation($db, $T1, $F1, $T2, $F2, $on_delete, $on_update)
{
    $tables = $GLOBALS['dbi']->getTablesFull($db, $T1);
    $type_T1 = /*overload*/mb_strtoupper($tables[$T1]['ENGINE']);
    $tables = $GLOBALS['dbi']->getTablesFull($db, $T2);
    $type_T2 = /*overload*/mb_strtoupper($tables[$T2]['ENGINE']);

    // native foreign key
    if (PMA_Util::isForeignKeySupported($type_T1)
        && PMA_Util::isForeignKeySupported($type_T2)
        && $type_T1 == $type_T2
    ) {
        // relation exists?
        $existrel_foreign = PMA_getForeigners($db, $T2, '', 'foreign');
        $foreigner = PMA_searchColumnInForeigners($existrel_foreign, $F2);
        if ($foreigner
            && isset($foreigner['constraint'])
        ) {
            return array(false, __('Error: relation already exists.'));
        }
        // note: in InnoDB, the index does not requires to be on a PRIMARY
        // or UNIQUE key
        // improve: check all other requirements for InnoDB relations
        $result = $GLOBALS['dbi']->query(
            'SHOW INDEX FROM ' . PMA_Util::backquote($db)
            . '.' . PMA_Util::backquote($T1) . ';'
        );

        // will be use to emphasis prim. keys in the table view
        $index_array1 = array();
        while ($row = $GLOBALS['dbi']->fetchAssoc($result)) {
            $index_array1[$row['Column_name']] = 1;
        }
        $GLOBALS['dbi']->freeResult($result);

        $result = $GLOBALS['dbi']->query(
            'SHOW INDEX FROM ' . PMA_Util::backquote($db)
            . '.' . PMA_Util::backquote($T2) . ';'
        );
        // will be used to emphasis prim. keys in the table view
        $index_array2 = array();
        while ($row = $GLOBALS['dbi']->fetchAssoc($result)) {
            $index_array2[$row['Column_name']] = 1;
        }
        $GLOBALS['dbi']->freeResult($result);

        if (! empty($index_array1[$F1]) && ! empty($index_array2[$F2])) {
            $upd_query  = 'ALTER TABLE ' . PMA_Util::backquote($db)
                . '.' . PMA_Util::backquote($T2)
                . ' ADD FOREIGN KEY ('
                . PMA_Util::backquote($F2) . ')'
                . ' REFERENCES '
                . PMA_Util::backquote($db) . '.'
                . PMA_Util::backquote($T1) . '('
                . PMA_Util::backquote($F1) . ')';

            if ($on_delete != 'nix') {
                $upd_query   .= ' ON DELETE ' . $on_delete;
            }
            if ($on_update != 'nix') {
                $upd_query   .= ' ON UPDATE ' . $on_update;
            }
            $upd_query .= ';';
            if ($GLOBALS['dbi']->tryQuery($upd_query)) {
                return array(true, __('FOREIGN KEY relation has been added.'));
            } else {
                $error = $GLOBALS['dbi']->getError();
                return array(
                    false,
                    __('Error: FOREIGN KEY relation could not be added!')
                    . "<br/>" . $error
                );
            }
        } else {
            return array(false, __('Error: Missing index on column(s).'));
        }
    } else { // internal (pmadb) relation
        if ($GLOBALS['cfgRelation']['relwork'] == false) {
            return array(false, __('Error: Relational features are disabled!'));
        } else {
            // no need to recheck if the keys are primary or unique at this point,
            // this was checked on the interface part

            $q  = "INSERT INTO "
                . PMA_Util::backquote($GLOBALS['cfgRelation']['db'])
                . "." . PMA_Util::backquote($GLOBALS['cfgRelation']['relation'])
                . "(master_db, master_table, master_field, "
                . "foreign_db, foreign_table, foreign_field)"
                . " values("
                . "'" . PMA_Util::sqlAddSlashes($db) . "', "
                . "'" . PMA_Util::sqlAddSlashes($T2) . "', "
                . "'" . PMA_Util::sqlAddSlashes($F2) . "', "
                . "'" . PMA_Util::sqlAddSlashes($db) . "', "
                . "'" . PMA_Util::sqlAddSlashes($T1) . "', "
                . "'" . PMA_Util::sqlAddSlashes($F1) . "')";

            if (PMA_queryAsControlUser($q, false, PMA_DatabaseInterface::QUERY_STORE)
            ) {
                return array(true, __('Internal relation has been added.'));
            } else {
                $error = $GLOBALS['dbi']->getError($GLOBALS['controllink']);
                return array(
                    false,
                    __('Error: Internal relation could not be added!')
                    . "<br/>" . $error
                );
            }
        }
    }
}

/**
 * Removes a foreign relation
 *
 * @param string $T1 foreign db.table
 * @param string $F1 foreign field
 * @param string $T2 master db.table
 * @param string $F2 master field
 *
 * @return array array of success/failure and message
 */
function PMA_removeRelation($T1, $F1, $T2, $F2)
{
    list($DB1, $T1) = explode(".", $T1);
    list($DB2, $T2) = explode(".", $T2);

    $tables = $GLOBALS['dbi']->getTablesFull($DB1, $T1);
    $type_T1 = /*overload*/mb_strtoupper($tables[$T1]['ENGINE']);
    $tables = $GLOBALS['dbi']->getTablesFull($DB2, $T2);
    $type_T2 = /*overload*/mb_strtoupper($tables[$T2]['ENGINE']);

    $try_to_delete_internal_relation = false;

    if (PMA_Util::isForeignKeySupported($type_T1)
        && PMA_Util::isForeignKeySupported($type_T2)
        && $type_T1 == $type_T2
    ) {
        // InnoDB
        $existrel_foreign = PMA_getForeigners($DB2, $T2, '', 'foreign');
        $foreigner = PMA_searchColumnInForeigners($existrel_foreign, $F2);

        if (isset($foreigner['constraint'])) {
            $upd_query = 'ALTER TABLE ' . PMA_Util::backquote($DB2)
                . '.' . PMA_Util::backquote($T2) . ' DROP FOREIGN KEY '
                . PMA_Util::backquote($foreigner['constraint']) . ';';
            if ($GLOBALS['dbi']->query($upd_query)) {
                return array(true, __('FOREIGN KEY relation has been removed.'));
            } else {
                $error = $GLOBALS['dbi']->getError();
                return array(
                    false,
                    __('Error: FOREIGN KEY relation could not be removed!')
                    . "<br/>" . $error
                );
            }
        } else {
            // there can be an internal relation even if InnoDB
            $try_to_delete_internal_relation = true;
        }
    } else {
        $try_to_delete_internal_relation = true;
    }

    if (!$try_to_delete_internal_relation) {
        return;
    }

    // internal relations
    $delete_query = "DELETE FROM "
        . PMA_Util::backquote($GLOBALS['cfgRelation']['db']) . "."
        . $GLOBALS['cfgRelation']['relation'] . " WHERE "
        . "master_db = '" . PMA_Util::sqlAddSlashes($DB2) . "'"
        . " AND master_table = '" . PMA_Util::sqlAddSlashes($T2) . "'"
        . " AND master_field = '" . PMA_Util::sqlAddSlashes($F2) . "'"
        . " AND foreign_db = '" . PMA_Util::sqlAddSlashes($DB1) . "'"
        . " AND foreign_table = '" . PMA_Util::sqlAddSlashes($T1) . "'"
        . " AND foreign_field = '" . PMA_Util::sqlAddSlashes($F1) . "'";

    $result = PMA_queryAsControlUser(
        $delete_query,
        false,
        PMA_DatabaseInterface::QUERY_STORE
    );

    if (!$result) {
        $error = $GLOBALS['dbi']->getError($GLOBALS['controllink']);
        return array(
            false,
            __('Error: Internal relation could not be removed!') . "<br/>" . $error
        );
    }

    return array(true, __('Internal relation has been removed.'));
}
?>
