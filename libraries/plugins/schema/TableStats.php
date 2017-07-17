<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * Contains abstract class to hold table preferences/statistics
 *
 * @package PhpMyAdmin
 */
namespace PMA\libraries\plugins\schema;

use PhpMyAdmin\DatabaseInterface;
use PhpMyAdmin\Index;
use PhpMyAdmin\Util;

/**
 * Table preferences/statistics
 *
 * This class preserves the table co-ordinates,fields
 * and helps in drawing/generating the tables.
 *
 * @package PhpMyAdmin
 * @abstract
 */
abstract class TableStats
{
    protected $diagram;
    protected $db;
    protected $pageNumber;
    protected $tableName;
    protected $showKeys;
    protected $tableDimension;
    public $displayfield;
    public $fields = array();
    public $primary = array();
    public $x, $y;
    public $width = 0;
    public $heightCell = 0;
    protected $offline;

    /**
     * Constructor
     *
     * @param object  $diagram        schema diagram
     * @param string  $db             current db name
     * @param integer $pageNumber     current page number (from the
     *                                $cfg['Servers'][$i]['table_coords'] table)
     * @param string  $tableName      table name
     * @param boolean $showKeys       whether to display keys or not
     * @param boolean $tableDimension whether to display table position or not
     * @param boolean $offline        whether the coordinates are sent
     *                                from the browser
     */
    public function __construct(
        $diagram, $db, $pageNumber, $tableName, $showKeys, $tableDimension, $offline
    ) {
        $this->diagram    = $diagram;
        $this->db         = $db;
        $this->pageNumber = $pageNumber;
        $this->tableName  = $tableName;

        $this->showKeys   = $showKeys;
        $this->tableDimension   = $tableDimension;

        $this->offline    = $offline;

        // checks whether the table exists
        // and loads fields
        $this->validateTableAndLoadFields();
        // load table coordinates
        $this->loadCoordinates();
        // loads display field
        $this->loadDisplayField();
        // loads primary keys
        $this->loadPrimaryKey();
    }

    /**
     * Validate whether the table exists.
     *
     * @return void
     */
    protected function validateTableAndLoadFields()
    {
        $sql = 'DESCRIBE ' . Util::backquote($this->tableName);
        $result = $GLOBALS['dbi']->tryQuery(
            $sql, null, DatabaseInterface::QUERY_STORE
        );
        if (! $result || ! $GLOBALS['dbi']->numRows($result)) {
            $this->showMissingTableError();
        }

        if ($this->showKeys) {
            $indexes = Index::getFromTable($this->tableName, $this->db);
            $all_columns = array();
            foreach ($indexes as $index) {
                $all_columns = array_merge(
                    $all_columns,
                    array_flip(array_keys($index->getColumns()))
                );
            }
            $this->fields = array_keys($all_columns);
        } else {
            while ($row = $GLOBALS['dbi']->fetchRow($result)) {
                $this->fields[] = $row[0];
            }
        }
    }

    /**
     * Displays an error when the table cannot be found.
     *
     * @return void
     * @abstract
     */
    protected abstract function showMissingTableError();

    /**
     * Loads coordinates of a table
     *
     * @return void
     */
    protected function loadCoordinates()
    {
        foreach ($_REQUEST['t_h'] as $key => $value) {
            if ($this->db . '.' . $this->tableName == $key) {
                $this->x = (double) $_REQUEST['t_x'][$key];
                $this->y = (double) $_REQUEST['t_y'][$key];
                break;
            }
        }
    }

    /**
     * Loads the table's display field
     *
     * @return void
     */
    protected function loadDisplayField()
    {
        $this->displayfield = PMA_getDisplayField($this->db, $this->tableName);
    }

    /**
     * Loads the PRIMARY key.
     *
     * @return void
     */
    protected function loadPrimaryKey()
    {
        $result = $GLOBALS['dbi']->query(
            'SHOW INDEX FROM ' . Util::backquote($this->tableName) . ';',
            null, DatabaseInterface::QUERY_STORE
        );
        if ($GLOBALS['dbi']->numRows($result) > 0) {
            while ($row = $GLOBALS['dbi']->fetchAssoc($result)) {
                if ($row['Key_name'] == 'PRIMARY') {
                    $this->primary[] = $row['Column_name'];
                }
            }
        }
    }

    /**
     * Returns title of the current table,
     * title can have the dimensions/co-ordinates of the table
     *
     * @return string title of the current table
     */
    protected function getTitle()
    {
        return ($this->tableDimension
            ? sprintf('%.0fx%0.f', $this->width, $this->heightCell)
            : ''
        )
        . ' ' . $this->tableName;
    }
}
