<?php
/**
 * Tests for displaying results
 *
 * @package PhpMyAdmin-test
 */
declare(strict_types=1);

namespace PhpMyAdmin\Tests\Display;

use PhpMyAdmin\Config;
use PhpMyAdmin\Core;
use PhpMyAdmin\Display\Results as DisplayResults;
use PhpMyAdmin\Plugins\Transformations\Text_Plain_Link;
use PhpMyAdmin\SqlParser\Parser;
use PhpMyAdmin\SqlParser\Utils\Query;
use PhpMyAdmin\Tests\PmaTestCase;
use PhpMyAdmin\Transformations;
use ReflectionClass;
use stdClass;

/**
 * Test cases for displaying results.
 *
 * @package PhpMyAdmin-test
 */
class ResultsTest extends PmaTestCase
{
    /**
     * @access protected
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     *
     * @access protected
     * @return void
     */
    protected function setUp(): void
    {
        $GLOBALS['server'] = 0;
        $GLOBALS['db'] = 'db';
        $GLOBALS['table'] = 'table';
        $GLOBALS['PMA_PHP_SELF'] = 'index.php';
        $this->object = new DisplayResults('as', '', 0, '', '');
        $GLOBALS['PMA_Config'] = new Config();
        $GLOBALS['PMA_Config']->enableBc();
        $GLOBALS['text_dir'] = 'ltr';
        $_SESSION[' HMAC_secret '] = 'test';

        $dbi = $this->getMockBuilder('PhpMyAdmin\DatabaseInterface')
            ->disableOriginalConstructor()
            ->getMock();

        $dbi->expects($this->any())->method('fieldFlags')
            ->will($this->returnArgument(1));

        $GLOBALS['dbi'] = $dbi;
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     *
     * @access protected
     * @return void
     */
    protected function tearDown(): void
    {
        unset($this->object);
    }

    /**
     * Call private functions by setting visibility to public.
     *
     * @param string $name   method name
     * @param array  $params parameters for the invocation
     *
     * @return mixed the output from the private method.
     */
    private function _callPrivateFunction($name, array $params)
    {
        $class = new ReflectionClass(DisplayResults::class);
        $method = $class->getMethod($name);
        $method->setAccessible(true);
        return $method->invokeArgs($this->object, $params);
    }

    /**
     * Test for _isSelect function
     *
     * @return void
     */
    public function testisSelect()
    {
        $parser = new Parser('SELECT * FROM pma');
        $this->assertTrue(
            $this->_callPrivateFunction(
                '_isSelect',
                [
                    [
                        'statement' => $parser->statements[0],
                        'select_from' => true,
                    ],
                ]
            )
        );
    }

    /**
     * Test for navigation buttons
     *
     * @param string  $caption        iconic caption for button
     * @param string  $title          text for button
     * @param integer $pos            position for next query
     * @param string  $html_sql_query query ready for display
     *
     * @return void
     *
     * @dataProvider providerForTestGetTableNavigationButton
     */
    public function testGetTableNavigationButton(
        $caption,
        $title,
        $pos,
        $html_sql_query
    ) {
        $GLOBALS['cfg']['TableNavigationLinksMode'] = 'icons';
        $_SESSION[' PMA_token '] = 'token';

        $actual = $this->_callPrivateFunction(
            '_getTableNavigationButton',
            [
                &$caption,
                $title,
                $pos,
                $html_sql_query,
                true,
            ]
        );

        $this->assertStringContainsString(
            '<form action="sql.php" method="post">',
            $actual
        );
        $this->assertStringContainsString(
            'name="sql_query" value="SELECT * FROM `pma_bookmark` WHERE 1"',
            $actual
        );
        $this->assertStringContainsString(
            'name="pos" value="1"',
            $actual
        );
        $this->assertStringContainsString(
            'value="btn" title="Submit"',
            $actual
        );
    }

    /**
     * Provider for testGetTableNavigationButton
     *
     * @return array array data for testGetTableNavigationButton
     */
    public function providerForTestGetTableNavigationButton()
    {
        return [
            [
                'btn',
                'Submit',
                1,
                'SELECT * FROM `pma_bookmark` WHERE 1',
            ],
        ];
    }

    /**
     * Provider for testing table navigation
     *
     * @return array data for testGetTableNavigation
     */
    public function providerForTestGetTableNavigation()
    {
        return [
            [
                21,
                41,
                false,
                '310',
            ],
        ];
    }

    /**
     * Data provider for testGetClassesForColumn
     *
     * @return array parameters and output
     */
    public function dataProviderForTestGetClassesForColumn()
    {
        return [
            [
                'grid_edit',
                'not_null',
                '',
                '',
                '',
                'data grid_edit not_null   ',
            ],
        ];
    }

    /**
     * Test for _getClassesForColumn
     *
     * @param string $grid_edit_class  the class for all editable columns
     * @param string $not_null_class   the class for not null columns
     * @param string $relation_class   the class for relations in a column
     * @param string $hide_class       the class for visibility of a column
     * @param string $field_type_class the class related to type of the field
     * @param string $output           output of__getResettedClassForInlineEdit
     *
     * @return void
     *
     * @dataProvider dataProviderForTestGetClassesForColumn
     */
    public function testGetClassesForColumn(
        $grid_edit_class,
        $not_null_class,
        $relation_class,
        $hide_class,
        $field_type_class,
        $output
    ) {
        $GLOBALS['cfg']['BrowsePointerEnable'] = true;
        $GLOBALS['cfg']['BrowseMarkerEnable'] = true;

        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getClassesForColumn',
                [
                    $grid_edit_class,
                    $not_null_class,
                    $relation_class,
                    $hide_class,
                    $field_type_class,
                ]
            )
        );
    }

    /**
     * Test for _getClassForDateTimeRelatedFields - case 1
     *
     * @return void
     */
    public function testGetClassForDateTimeRelatedFieldsCase1()
    {
        $this->assertEquals(
            'datetimefield',
            $this->_callPrivateFunction(
                '_getClassForDateTimeRelatedFields',
                [DisplayResults::DATETIME_FIELD]
            )
        );
    }

    /**
     * Test for _getClassForDateTimeRelatedFields - case 2
     *
     * @return void
     */
    public function testGetClassForDateTimeRelatedFieldsCase2()
    {
        $this->assertEquals(
            'datefield',
            $this->_callPrivateFunction(
                '_getClassForDateTimeRelatedFields',
                [DisplayResults::DATE_FIELD]
            )
        );
    }

    /**
     * Test for _getClassForDateTimeRelatedFields - case 3
     *
     * @return void
     */
    public function testGetClassForDateTimeRelatedFieldsCase3()
    {
        $this->assertEquals(
            'text',
            $this->_callPrivateFunction(
                '_getClassForDateTimeRelatedFields',
                [DisplayResults::STRING_FIELD]
            )
        );
    }

    /**
     * Test for _getOffsets - case 1
     *
     * @return void
     */
    public function testGetOffsetsCase1()
    {
        $_SESSION['tmpval']['max_rows'] = DisplayResults::ALL_ROWS;
        $this->assertEquals(
            [
                0,
                0,
            ],
            $this->_callPrivateFunction('_getOffsets', [])
        );
    }

    /**
     * Test for _getOffsets - case 2
     *
     * @return void
     */
    public function testGetOffsetsCase2()
    {
        $_SESSION['tmpval']['max_rows'] = 5;
        $_SESSION['tmpval']['pos'] = 4;
        $this->assertEquals(
            [
                9,
                0,
            ],
            $this->_callPrivateFunction('_getOffsets', [])
        );
    }

    /**
     * Data provider for testGetCheckboxForMultiRowSubmissions
     *
     * @return array parameters and output
     */
    public function dataProviderForGetCheckboxForMultiRowSubmissions()
    {
        return [
            [
                'sql.php?db=data&amp;table=new&amp;sql_query=DELETE+FROM+%60data%60'
                . '.%60new%60+WHERE+%60new%60.%60id%60+%3D+1&amp;message_to_show='
                . 'The+row+has+been+deleted&amp;goto=sql.php%3Fdb%3Ddata%26table%3D'
                . 'new%26sql_query%3DSELECT%2B%252A%2BFROM%2B%2560new%2560%26message'
                . '_to_show%3DThe%2Brow%2Bhas%2Bbeen%2Bdeleted%26goto%3Dtbl_'
                . 'structure.php',
                [
                    'edit_lnk' => 'ur',
                    'del_lnk' => 'dr',
                    'sort_lnk' => '0',
                    'nav_bar' => '1',
                    'bkm_form' => '1',
                    'text_btn' => '1',
                    'pview_lnk' => '1',
                ],
                0,
                '%60new%60.%60id%60+%3D+1',
                ['`new`.`id`' => '= 1'],
                '[%_PMA_CHECKBOX_DIR_%]',
                'klass',
                '<td class="klass" class="center print_ignore"><input type'
                . '="checkbox" id="id_rows_to_delete0[%_PMA_CHECKBOX_DIR_%]" name='
                . '"rows_to_delete[0]" class="multi_checkbox checkall" value="%60'
                . 'new%60.%60id%60+%3D+1"><input type="hidden" class="condition_'
                . 'array" value="{&quot;`new`.`id`&quot;:&quot;= 1&quot;}">    '
                . '</td>',
            ],
        ];
    }

    /**
     * Test for _getCheckboxForMultiRowSubmissions
     *
     * @param string $del_url           delete url
     * @param array  $displayParts      array with explicit indexes for all
     *                                  the display elements
     * @param string $row_no            the row number
     * @param string $where_clause_html url encoded where clause
     * @param array  $condition_array   array of conditions in the where clause
     * @param string $id_suffix         suffix for the id
     * @param string $class             css classes for the td element
     * @param string $output            output of _getCheckboxForMultiRowSubmissions
     *
     * @return void
     *
     * @dataProvider dataProviderForGetCheckboxForMultiRowSubmissions
     */
    public function testGetCheckboxForMultiRowSubmissions(
        $del_url,
        $displayParts,
        $row_no,
        $where_clause_html,
        $condition_array,
        $id_suffix,
        $class,
        $output
    ) {
        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getCheckboxForMultiRowSubmissions',
                [
                    $del_url,
                    $displayParts,
                    $row_no,
                    $where_clause_html,
                    $condition_array,
                    $id_suffix,
                    $class,
                ]
            )
        );
    }

    /**
     * Data provider for testGetEditLink
     *
     * @return array parameters and output
     */
    public function dataProviderForGetEditLink()
    {
        return [
            [
                'tbl_change.php?db=Data&amp;table=customer&amp;where_clause=%60'
                . 'customer%60.%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query='
                . 'SELECT+%2A+FROM+%60customer%60&amp;goto=sql.php&amp;default_'
                . 'action=update',
                'klass edit_row_anchor',
                '<span class="nowrap"><img src="themes/dot.gif" title="Edit" alt='
                . '"Edit" class="icon ic_b_edit"> Edit</span>',
                '`customer`.`id` = 1',
                '%60customer%60.%60id%60+%3D+1',
                '<td class="klass edit_row_anchor center print_ignore">'
                . '<span class="nowrap">'
                . '<a href="tbl_change.php" data-post="db=Data&amp;table=customer&amp;where_'
                . 'clause=%60customer%60.%60id%60+%3D+1&amp;clause_is_unique=1&amp;'
                . 'sql_query=SELECT+%2A+FROM+%60customer%60&amp;goto=sql.php&amp;'
                . 'default_action=update"'
                . '><span class="nowrap"><img src="themes/dot.gif" title="Edit" '
                . 'alt="Edit" class="icon ic_b_edit"> Edit</span></a>'
                . '<input type="hidden" class="where_clause" value ="%60customer'
                . '%60.%60id%60+%3D+1"></span></td>',
            ],
        ];
    }

    /**
     * Test for _getEditLink
     *
     * @param string $edit_url          edit url
     * @param string $class             css classes for td element
     * @param string $edit_str          text for the edit link
     * @param string $where_clause      where clause
     * @param string $where_clause_html url encoded where clause
     * @param string $output            output of _getEditLink
     *
     * @return void
     *
     * @dataProvider dataProviderForGetEditLink
     */
    public function testGetEditLink(
        $edit_url,
        $class,
        $edit_str,
        $where_clause,
        $where_clause_html,
        $output
    ) {
        $GLOBALS['cfg']['ActionLinksMode'] = 'both';
        $GLOBALS['cfg']['LinkLengthLimit'] = 1000;

        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getEditLink',
                [
                    $edit_url,
                    $class,
                    $edit_str,
                    $where_clause,
                    $where_clause_html,
                ]
            )
        );
    }

    /**
     * Data provider for testGetCopyLink
     *
     * @return array parameters and output
     */
    public function dataProviderForGetCopyLink()
    {
        return [
            [
                'tbl_change.php?db=Data&amp;table=customer&amp;where_clause=%60cust'
                . 'omer%60.%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query='
                . 'SELECT+%2A+FROM+%60customer%60&amp;goto=sql.php&amp;default_'
                . 'action=insert',
                '<span class="nowrap"><img src="themes/dot.gif" title="Copy" alt'
                . '="Copy" class="icon ic_b_insrow"> Copy</span>',
                '`customer`.`id` = 1',
                '%60customer%60.%60id%60+%3D+1',
                'klass',
                '<td class="klass center print_ignore"><span class='
                . '"nowrap">'
                . '<a href="tbl_change.php" data-post="db=Data&amp;table=customer&amp;where_'
                . 'clause=%60customer%60.%60id%60+%3D+1&amp;clause_is_unique=1&amp;'
                . 'sql_query=SELECT+%2A+FROM+%60customer%60&amp;goto=sql.php&amp;'
                . 'default_action=insert"'
                . '><span class="nowrap"><img src="themes/dot.gif" title="Copy" '
                . 'alt="Copy" class="icon ic_b_insrow"> Copy</span></a>'
                . '<input type="hidden" class="where_clause" value="%60customer%60'
                . '.%60id%60+%3D+1"></span></td>',
            ],
        ];
    }

    /**
     * Test for _getCopyLink
     *
     * @param string $copy_url          copy url
     * @param string $copy_str          text for the copy link
     * @param string $where_clause      where clause
     * @param string $where_clause_html url encoded where clause
     * @param string $class             css classes for the td element
     * @param string $output            output of _getCopyLink
     *
     * @return void
     *
     * @dataProvider dataProviderForGetCopyLink
     */
    public function testGetCopyLink(
        $copy_url,
        $copy_str,
        $where_clause,
        $where_clause_html,
        $class,
        $output
    ) {
        $GLOBALS['cfg']['ActionLinksMode'] = 'both';
        $GLOBALS['cfg']['LinkLengthLimit'] = 1000;

        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getCopyLink',
                [
                    $copy_url,
                    $copy_str,
                    $where_clause,
                    $where_clause_html,
                    $class,
                ]
            )
        );
    }

    /**
     * Data provider for testGetDeleteLink
     *
     * @return array parameters and output
     */
    public function dataProviderForGetDeleteLink()
    {
        return [
            [
                'sql.php?db=Data&amp;table=customer&amp;sql_query=DELETE+FROM+%60'
                . 'Data%60.%60customer%60+WHERE+%60customer%60.%60id%60+%3D+1&amp;'
                . 'message_to_show=The+row+has+been+deleted&amp;goto=sql.php%3Fdb'
                . '%3DData%26table%3Dcustomer%26sql_query%3DSELECT%2B%252A%2BFROM'
                . '%2B%2560customer%2560%26message_to_show%3DThe%2Brow%2Bhas%2Bbeen'
                . '%2Bdeleted%26goto%3Dtbl_structure.php',
                '<span class="nowrap"><img src="themes/dot.gif" title="Delete" '
                . 'alt="Delete" class="icon ic_b_drop"> Delete</span>',
                'DELETE FROM `Data`.`customer` WHERE `customer`.`id` = 1',
                'klass',
                '<td class="klass center print_ignore">'
                . '<a href="sql.php" data-post="db=Data&amp;table=customer&amp;sql_query=DELETE'
                . '+FROM+%60Data%60.%60customer%60+WHERE+%60customer%60.%60id%60+%3D'
                . '+1&amp;message_to_show=The+row+has+been+deleted&amp;goto=sql.php'
                . '%3Fdb%3DData%26table%3Dcustomer%26sql_query%3DSELECT%2B%252A%2B'
                . 'FROM%2B%2560customer%2560%26message_to_show%3DThe%2Brow%2Bhas%2B'
                . 'been%2Bdeleted%26goto%3Dtbl_structure.php" '
                . 'class="delete_row requireConfirm"><span class="nowrap"><img src="themes/dot.'
                . 'gif" title="Delete" alt="Delete" class="icon ic_b_drop"> '
                . 'Delete</span></a>'
                . '<div class="hide">DELETE FROM `Data`.`customer` WHERE '
                . '`customer`.`id` = 1</div></td>',
            ],
        ];
    }

    /**
     * Test for _getDeleteLink
     *
     * @param string $del_url delete url
     * @param string $del_str text for the delete link
     * @param string $js_conf text for the JS confirmation
     * @param string $class   css classes for the td element
     * @param string $output  output of _getDeleteLink
     *
     * @return void
     *
     * @dataProvider dataProviderForGetDeleteLink
     */
    public function testGetDeleteLink(
        $del_url,
        $del_str,
        $js_conf,
        $class,
        $output
    ) {
        $GLOBALS['cfg']['ActionLinksMode'] = 'both';
        $GLOBALS['cfg']['LinkLengthLimit'] = 1000;

        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getDeleteLink',
                [
                    $del_url,
                    $del_str,
                    $js_conf,
                    $class,
                ]
            )
        );
    }

    /**
     * Data provider for testGetCheckboxAndLinks
     *
     * @return array parameters and output
     */
    public function dataProviderForGetCheckboxAndLinks()
    {
        return [
            [
                DisplayResults::POSITION_LEFT,
                'sql.php?db=data&amp;table=new&amp;sql_query=DELETE+FROM+%60data'
                . '%60.%60new%60+WHERE+%60new%60.%60id%60+%3D+1&amp;message_to_show='
                . 'The+row+has+been+deleted&amp;goto=sql.php%3Fdb%3Ddata%26table%3D'
                . 'new%26sql_query%3DSELECT%2B%252A%2BFROM%2B%2560new%2560%26'
                . 'message_to_show%3DThe%2Brow%2Bhas%2Bbeen%2Bdeleted%26goto%3D'
                . 'tbl_structure.php',
                [
                    'edit_lnk' => 'ur',
                    'del_lnk' => 'dr',
                    'sort_lnk' => '0',
                    'nav_bar' => '1',
                    'bkm_form' => '1',
                    'text_btn' => '1',
                    'pview_lnk' => '1',
                ],
                0,
                '`new`.`id` = 1',
                '%60new%60.%60id%60+%3D+1',
                [
                    '`new`.`id`' => '= 1',
                ],
                'tbl_change.php?db=data&amp;table=new&amp;where_clause=%60new%60.'
                . '%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query=SELECT+%2A+'
                . 'FROM+%60new%60&amp;goto=sql.php&amp;default_action=update',
                'tbl_change.php?db=data&amp;table=new&amp;where_clause=%60new%60.'
                . '%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query=SELECT+%2A+'
                . 'FROM+%60new%60&amp;goto=sql.php&amp;default_action=insert',
                'edit_row_anchor',
                '<span class="nowrap"><img src="themes/dot.gif" title="Edit" '
                . 'alt="Edit" class="icon ic_b_edit"> Edit</span>',
                '<span class="nowrap"><img src="themes/dot.gif" title="Copy" '
                . 'alt="Copy" class="icon ic_b_insrow"> Copy</span>',
                '<span class="nowrap"><img src="themes/dot.gif" title="Delete" '
                . 'alt="Delete" class="icon ic_b_drop"> Delete</span>',
                'DELETE FROM `data`.`new` WHERE `new`.`id` = 1',
                '<td  class="center print_ignore"><input type="checkbox" id="id_rows_to_delete0_'
                . 'left" name="rows_to_delete[0]" class="multi_checkbox checkall" '
                . 'value="%60new%60.%60id%60+%3D+1"><input type="hidden" class='
                . '"condition_array" value="{&quot;`new`.`id`&quot;:&quot;= 1&quot;'
                . '}">    </td><td class="edit_row_anchor center print_ignore"><span class='
                . '"nowrap">'
                . '<a href="tbl_change.php" data-post="db=data&amp;table=new&amp;where_'
                . 'clause=%60new%60.%60id%60+%3D+1&amp;clause_is_unique=1&amp;'
                . 'sql_query=SELECT+%2A+FROM+%60new%60&amp;goto=sql.php&amp;default'
                . '_action=update">'
                . '<span class="nowrap"><img src="themes/dot.gif" title="Edit" '
                . 'alt="Edit" class="icon ic_b_edit"> Edit</span></a>'
                . '<input type="hidden" class="where_clause" value ="%60new%60.%60'
                . 'id%60+%3D+1"></span></td><td class="center print_ignore"><span class'
                . '="nowrap">'
                . '<a href="tbl_change.php" data-post="db=data&amp;table=new&amp;where_clause'
                . '=%60new%60.%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query='
                . 'SELECT+%2A+FROM+%60new%60&amp;goto=sql.php&amp;default_action='
                . 'insert"><span class'
                . '="nowrap"><img src="themes/dot.gif" title="Copy" alt="Copy" '
                . 'class="icon ic_b_insrow"> Copy</span></a>'
                . '<input type="hidden" class="where_clause" value="%60new%60.%60id'
                . '%60+%3D+1"></span></td><td class="center print_ignore">'
                . '<a href="sql.php" data-post="db=data&amp;table=new&amp;sql_query=DELETE+'
                . 'FROM+%60data%60.%60new%60+WHERE+%60new%60.%60id%60+%3D+1&amp;'
                . 'message_to_show=The+row+has+been+deleted&amp;goto=sql.php%3F'
                . 'db%3Ddata%26table%3Dnew%26sql_query%3DSELECT%2B%252A%2BFROM%2B'
                . '%2560new%2560%26message_to_show%3DThe%2Brow%2Bhas%2Bbeen%2B'
                . 'deleted%26goto%3Dtbl_structure.php" '
                . 'class="delete_row requireConfirm"><span class="nowrap"><img src="themes/dot.'
                . 'gif" title="Delete" alt="Delete" class="icon ic_b_drop"> '
                . 'Delete</span></a>'
                . '<div class="hide">DELETE FROM `data`.`new` WHERE `new`.`id` = 1'
                . '</div></td>',
            ],
            [
                DisplayResults::POSITION_RIGHT,
                'sql.php?db=data&amp;table=new&amp;sql_query=DELETE+FROM+%60data%60'
                . '.%60new%60+WHERE+%60new%60.%60id%60+%3D+1&amp;message_to_show='
                . 'The+row+has+been+deleted&amp;goto=sql.php%3Fdb%3Ddata%26table%3D'
                . 'new%26sql_query%3DSELECT%2B%252A%2BFROM%2B%2560new%2560%26message'
                . '_to_show%3DThe%2Brow%2Bhas%2Bbeen%2Bdeleted%26goto%3Dtbl_'
                . 'structure.php',
                [
                    'edit_lnk' => 'ur',
                    'del_lnk' => 'dr',
                    'sort_lnk' => '0',
                    'nav_bar' => '1',
                    'bkm_form' => '1',
                    'text_btn' => '1',
                    'pview_lnk' => '1',
                ],
                0,
                '`new`.`id` = 1',
                '%60new%60.%60id%60+%3D+1',
                [
                    '`new`.`id`' => '= 1',
                ],
                'tbl_change.php?db=data&amp;table=new&amp;where_clause=%60new%60.'
                . '%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query=SELECT+%2A+'
                . 'FROM+%60new%60&amp;goto=sql.php&amp;default_action=update',
                'tbl_change.php?db=data&amp;table=new&amp;where_clause=%60new%60.'
                . '%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query=SELECT+%2A+'
                . 'FROM+%60new%60&amp;goto=sql.php&amp;default_action=insert',
                'edit_row_anchor',
                '<span class="nowrap"><img src="themes/dot.gif" title="Edit" '
                . 'alt="Edit" class="icon ic_b_edit"> Edit</span>',
                '<span class="nowrap"><img src="themes/dot.gif" title="Copy" '
                . 'alt="Copy" class="icon ic_b_insrow"> Copy</span>',
                '<span class="nowrap"><img src="themes/dot.gif" title="Delete" '
                . 'alt="Delete" class="icon ic_b_drop"> Delete</span>',
                'DELETE FROM `data`.`new` WHERE `new`.`id` = 1',
                '<td class="center print_ignore">'
                . '<a href="sql.php" data-post="db=data&amp;table=new&amp;sql_query=DELETE+'
                . 'FROM+%60data%60.%60new%60+WHERE+%60new%60.%60id%60+%3D+1&amp;'
                . 'message_to_show=The+row+has+been+deleted&amp;goto=sql.php%3Fdb'
                . '%3Ddata%26table%3Dnew%26sql_query%3DSELECT%2B%252A%2BFROM%2B%25'
                . '60new%2560%26message_to_show%3DThe%2Brow%2Bhas%2Bbeen%2Bdeleted'
                . '%26goto%3Dtbl_structure.php" class="delete'
                . '_row requireConfirm"><span class="nowrap"><img src="themes/dot.gif" title='
                . '"Delete" alt="Delete" class="icon ic_b_drop"> Delete</span></a>'
                . '<div class="hide">DELETE FROM `data`.`new` WHERE `new`.'
                . '`id` = 1</div></td><td class="center print_ignore"><span class="nowrap">'
                . '<a href="tbl_change.php" data-post="db=data&amp;table=new&amp;where_'
                . 'clause=%60new%60.%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_'
                . 'query=SELECT+%2A+FROM+%60new%60&amp;goto=sql.php&amp;default_'
                . 'action=insert"><span '
                . 'class="nowrap"><img src="themes/dot.gif" title="Copy" alt="Copy" '
                . 'class="icon ic_b_insrow"> Copy</span></a>'
                . '<input type="hidden" class="where_clause" value="%60new%60.%60id'
                . '%60+%3D+1"></span></td><td class="edit_row_anchor center print_ignore">'
                . '<span class="nowrap">'
                . '<a href="tbl_change.php" data-post="db=data&amp;table=new&amp;where_clause'
                . '=%60new%60.%60id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query='
                . 'SELECT+%2A+FROM+%60new%60&amp;goto=sql.php&amp;default_action='
                . 'update"><span class='
                . '"nowrap"><img src="themes/dot.gif" title="Edit" alt="Edit" class'
                . '="icon ic_b_edit"> Edit</span></a>'
                . '<input type="hidden" class="where_clause" value ="%60new%60.%60'
                . 'id%60+%3D+1"></span></td><td  class="center print_ignore"><input type='
                . '"checkbox" id="id_rows_to_delete0_right" name="rows_to_delete'
                . '[0]" class="multi_checkbox checkall" value="%60new%60.%60id%60'
                . '+%3D+1"><input type="hidden" class="condition_array" value="'
                . '{&quot;`new`.`id`&quot;:&quot;= 1&quot;}">    </td>',
            ],
            [
                DisplayResults::POSITION_NONE,
                'sql.php?db=data&amp;table=new&amp;sql_query=DELETE+FROM+%60data%60.'
                . '%60new%60+WHERE+%60new%60.%60id%60+%3D+1&amp;message_to_show=The+'
                . 'row+has+been+deleted&amp;goto=sql.php%3Fdb%3Ddata%26table%3Dnew'
                . '%26sql_query%3DSELECT%2B%252A%2BFROM%2B%2560new%2560%26message_'
                . 'to_show%3DThe%2Brow%2Bhas%2Bbeen%2Bdeleted%26goto%3Dtbl_structure'
                . '.php',
                [
                    'edit_lnk' => 'ur',
                    'del_lnk' => 'dr',
                    'sort_lnk' => '0',
                    'nav_bar' => '1',
                    'bkm_form' => '1',
                    'text_btn' => '1',
                    'pview_lnk' => '1',
                ],
                0,
                '`new`.`id` = 1',
                '%60new%60.%60id%60+%3D+1',
                [
                    '`new`.`id`' => '= 1',
                ],
                'tbl_change.php?db=data&amp;table=new&amp;where_clause=%60new%60.%60'
                . 'id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query=SELECT+%2A+FROM+'
                . '%60new%60&amp;goto=sql.php&amp;default_action=update',
                'tbl_change.php?db=data&amp;table=new&amp;where_clause=%60new%60.%60'
                . 'id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query=SELECT+%2A+FROM+'
                . '%60new%60&amp;goto=sql.php&amp;default_action=insert',
                'edit_row_anchor',
                '<span class="nowrap"><img src="themes/dot.gif" title="Edit" '
                . 'alt="Edit" class="icon ic_b_edit"> Edit</span>',
                '<span class="nowrap"><img src="themes/dot.gif" title="Copy" '
                . 'alt="Copy" class="icon ic_b_insrow"> Copy</span>',
                '<span class="nowrap"><img src="themes/dot.gif" title="Delete" '
                . 'alt="Delete" class="icon ic_b_drop"> Delete</span>',
                'DELETE FROM `data`.`new` WHERE `new`.`id` = 1',
                '<td  class="center print_ignore"><input type="checkbox" id="id_rows_to_'
                . 'delete0_left" name="rows_to_delete[0]" class="multi_checkbox '
                . 'checkall" value="%60new%60.%60id%60+%3D+1"><input type='
                . '"hidden" class="condition_array" value="{&quot;`new`.`id`&quot;:'
                . '&quot;= 1&quot;}">    </td>',
            ],
        ];
    }

    /**
     * Test for _getCheckboxAndLinks
     *
     * @param string $position          the position of the checkbox and links
     * @param string $del_url           delete url
     * @param array  $displayParts      array with explicit indexes for all the
     *                                  display elements
     * @param string $row_no            row number
     * @param string $where_clause      where clause
     * @param string $where_clause_html url encoded where clause
     * @param array  $condition_array   array of conditions in the where clause
     * @param string $edit_url          edit url
     * @param string $copy_url          copy url
     * @param string $class             css classes for the td elements
     * @param string $edit_str          text for the edit link
     * @param string $copy_str          text for the copy link
     * @param string $del_str           text for the delete link
     * @param string $js_conf           text for the JS confirmation
     * @param string $output            output of _getCheckboxAndLinks
     *
     * @return void
     *
     * @dataProvider dataProviderForGetCheckboxAndLinks
     */
    public function testGetCheckboxAndLinks(
        $position,
        $del_url,
        $displayParts,
        $row_no,
        $where_clause,
        $where_clause_html,
        $condition_array,
        $edit_url,
        $copy_url,
        $class,
        $edit_str,
        $copy_str,
        $del_str,
        $js_conf,
        $output
    ) {
        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getCheckboxAndLinks',
                [
                    $position,
                    $del_url,
                    $displayParts,
                    $row_no,
                    $where_clause,
                    $where_clause_html,
                    $condition_array,
                    $edit_url,
                    $copy_url,
                    $class,
                    $edit_str,
                    $copy_str,
                    $del_str,
                    $js_conf,
                ]
            )
        );
    }

    /**
     * Data provider for testGetPlacedLinks
     *
     * @return array parameters and output
     */
    public function dataProviderForGetPlacedLinks()
    {
        return [
            [
                DisplayResults::POSITION_NONE,
                'sql.php?db=data&amp;table=new&amp;sql_query=DELETE+FROM+%60data%60.'
                . '%60new%60+WHERE+%60new%60.%60id%60+%3D+1&amp;message_to_show=The+'
                . 'row+has+been+deleted&amp;goto=sql.php%3Fdb%3Ddata%26table%3Dnew'
                . '%26sql_query%3DSELECT%2B%252A%2BFROM%2B%2560new%2560%26message_'
                . 'to_show%3DThe%2Brow%2Bhas%2Bbeen%2Bdeleted%26goto%3Dtbl_structure'
                . '.php',
                [
                    'edit_lnk' => 'ur',
                    'del_lnk' => 'dr',
                    'sort_lnk' => '0',
                    'nav_bar' => '1',
                    'bkm_form' => '1',
                    'text_btn' => '1',
                    'pview_lnk' => '1',
                ],
                0,
                '`new`.`id` = 1',
                '%60new%60.%60id%60+%3D+1',
                [
                    '`new`.`id`' => '= 1',
                ],
                'tbl_change.php?db=data&amp;table=new&amp;where_clause=%60new%60.%60'
                . 'id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query=SELECT+%2A+FROM+'
                . '%60new%60&amp;goto=sql.php&amp;default_action=update',
                '/tbl_change.php?db=data&amp;table=new&amp;where_clause=%60new%60.%60'
                . 'id%60+%3D+1&amp;clause_is_unique=1&amp;sql_query=SELECT+%2A+FROM+'
                . '%60new%60&amp;goto=sql.php&amp;default_action=insert',
                'edit_row_anchor',
                '<span class="nowrap"><img src="themes/dot.gif" title="Edit" '
                . 'alt="Edit" class="icon ic_b_edit"> Edit</span>',
                '<span class="nowrap"><img src="themes/dot.gif" title="Copy" '
                . 'alt="Copy" class="icon ic_b_insrow"> Copy</span>',
                '<span class="nowrap"><img src="themes/dot.gif" title="Delete" '
                . 'alt="Delete" class="icon ic_b_drop"> Delete</span>',
                null,
                '<td  class="center print_ignore"><input type="checkbox" id="id_rows_to_'
                . 'delete0_left" name="rows_to_delete[0]" class="multi_checkbox '
                . 'checkall" value="%60new%60.%60id%60+%3D+1"><input type='
                . '"hidden" class="condition_array" value="{&quot;`new`.`id`&quot;:'
                . '&quot;= 1&quot;}">    </td>',
            ],
        ];
    }

    /**
     * Test for _getPlacedLinks
     *
     * @param string  $dir               the direction of links should place
     * @param string  $del_url           the url for delete row
     * @param array   $displayParts      which elements to display
     * @param integer $row_no            the index of current row
     * @param string  $where_clause      the where clause of the sql
     * @param string  $where_clause_html the html encoded where clause
     * @param array   $condition_array   array of keys (primary, unique, condition)
     * @param string  $edit_url          the url for edit row
     * @param string  $copy_url          the url for copy row
     * @param string  $edit_anchor_class the class for html element for edit
     * @param string  $edit_str          the label for edit row
     * @param string  $copy_str          the label for copy row
     * @param string  $del_str           the label for delete row
     * @param string  $js_conf           text for the JS confirmation
     * @param string  $output            output of _getPlacedLinks
     *
     * @return void
     *
     * @dataProvider dataProviderForGetPlacedLinks
     */
    public function testGetPlacedLinks(
        $dir,
        $del_url,
        $displayParts,
        $row_no,
        $where_clause,
        $where_clause_html,
        $condition_array,
        $edit_url,
        $copy_url,
        $edit_anchor_class,
        $edit_str,
        $copy_str,
        $del_str,
        $js_conf,
        $output
    ) {
        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getPlacedLinks',
                [
                    $dir,
                    $del_url,
                    $displayParts,
                    $row_no,
                    $where_clause,
                    $where_clause_html,
                    $condition_array,
                    $edit_url,
                    $copy_url,
                    $edit_anchor_class,
                    $edit_str,
                    $copy_str,
                    $del_str,
                    $js_conf,
                ]
            )
        );
    }


    /**
     * Data provider for testGetSpecialLinkUrl
     *
     * @return array parameters and output
     */
    public function dataProviderForTestGetSpecialLinkUrl()
    {
        return [
            [
                'information_schema',
                'routines',
                'circumference',
                [
                    'routine_name' => 'circumference',
                    'routine_schema' => 'data',
                    'routine_type' => 'FUNCTION',
                ],
                'routine_name',
                'db_routines.php?item_name=circumference&db=data'
                . '&item_type=FUNCTION&server=0&lang=en',
            ],
            [
                'information_schema',
                'routines',
                'area',
                [
                    'routine_name' => 'area',
                    'routine_schema' => 'data',
                    'routine_type' => 'PROCEDURE',
                ],
                'routine_name',
                'db_routines.php?item_name=area&db=data'
                . '&item_type=PROCEDURE&server=0&lang=en',
            ],
            [
                'information_schema',
                'columns',
                'CHARACTER_SET_NAME',
                [
                    'table_schema' => 'information_schema',
                    'table_name' => 'CHARACTER_SETS',
                ],
                'column_name',
                'index.php?sql_query=SELECT+%60CHARACTER_SET_NAME%60+FROM+%60info'
                . 'rmation_schema%60.%60CHARACTER_SETS%60&db=information_schema'
                . '&test_name=value&server=0&lang=en',
            ],
        ];
    }


    /**
     * Test _getSpecialLinkUrl
     *
     * @param string  $db           the database name
     * @param string  $table        the table name
     * @param string  $column_value column value
     * @param array   $row_info     information about row
     * @param string  $field_name   column name
     * @param boolean $output       output of _getSpecialLinkUrl
     *
     * @return void
     *
     * @dataProvider dataProviderForTestGetSpecialLinkUrl
     */
    public function testGetSpecialLinkUrl(
        $db,
        $table,
        $column_value,
        $row_info,
        $field_name,
        $output
    ) {
        $specialSchemaLinks = [
            'information_schema' => [
                'routines' => [
                    'routine_name' => [
                        'link_param' => 'item_name',
                        'link_dependancy_params' => [
                            0 => [
                                'param_info' => 'db',
                                'column_name' => 'routine_schema',
                            ],
                            1 => [
                                'param_info' => 'item_type',
                                'column_name' => 'routine_type',
                            ],
                        ],
                        'default_page' => 'db_routines.php',
                    ],
                ],
                'columns' => [
                    'column_name' => [
                        'link_param' => [
                            'sql_query',
                            'table_schema',
                            'table_name',
                        ],
                        'link_dependancy_params' => [
                            0 => [
                                'param_info' => 'db',
                                'column_name' => 'table_schema',
                            ],
                            1 => [
                                'param_info' => [
                                    'test_name',
                                    'value',
                                ],
                            ],
                        ],
                        'default_page' => 'index.php',
                    ],
                ],
            ],
        ];

        $this->object->__set('db', $db);
        $this->object->__set('table', $table);

        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getSpecialLinkUrl',
                [
                    $specialSchemaLinks,
                    $column_value,
                    $row_info,
                    $field_name,
                ]
            )
        );
    }


    /**
     * Data provider for testGetRowInfoForSpecialLinks
     *
     * @return array parameters and output
     */
    public function dataProviderForTestGetRowInfoForSpecialLinks()
    {
        $column_names = [
            'host',
            'db',
            'user',
            'select_privilages',
        ];
        $fields_mata = [];

        foreach ($column_names as $column_name) {
            $field_meta = new stdClass();
            $field_meta->orgname = $column_name;
            $fields_mata[] = $field_meta;
        }

        return [
            [
                $fields_mata,
                count($fields_mata),
                [
                    0 => 'localhost',
                    1 => 'phpmyadmin',
                    2 => 'pmauser',
                    3 => 'Y',
                ],
                [
                    0 => '0',
                    1 => '3',
                    2 => '1',
                    3 => '2',
                ],
                [
                    'host' => 'localhost',
                    'select_privilages' => 'Y',
                    'db' => 'phpmyadmin',
                    'user' => 'pmauser',
                ],
            ],
        ];
    }


    /**
     * Test _getRowInfoForSpecialLinks
     *
     * @param array   $fields_meta  meta information about fields
     * @param integer $fields_count number of fields
     * @param array   $row          current row data
     * @param array   $col_order    the column order
     * @param boolean $output       output of _getRowInfoForSpecialLinks
     *
     * @return void
     *
     * @dataProvider dataProviderForTestGetRowInfoForSpecialLinks
     */
    public function testGetRowInfoForSpecialLinks(
        $fields_meta,
        $fields_count,
        $row,
        $col_order,
        $output
    ) {
        $this->object->__set('fields_meta', $fields_meta);
        $this->object->__set('fields_cnt', $fields_count);

        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getRowInfoForSpecialLinks',
                [
                    $row,
                    $col_order,
                ]
            )
        );
    }

    /**
     * Data provider for testSetHighlightedColumnGlobalField
     *
     * @return array parameters and output
     */
    public function dataProviderForTestSetHighlightedColumnGlobalField()
    {
        $parser = new Parser(
            'SELECT * FROM db_name WHERE `db_name`.`tbl`.id > 0 AND `id` < 10'
        );
        return [
            [
                ['statement' => $parser->statements[0]],
                [
                    'db_name' => 'true',
                    'tbl' => 'true',
                    'id' => 'true',
                ],
            ],
        ];
    }


    /**
     * Test _setHighlightedColumnGlobalField
     *
     * @param array $analyzed_sql the analyzed query
     * @param array $output       setting value of _setHighlightedColumnGlobalField
     *
     * @return void
     *
     * @dataProvider dataProviderForTestSetHighlightedColumnGlobalField
     */
    public function testSetHighlightedColumnGlobalField($analyzed_sql, $output): void
    {
        $this->_callPrivateFunction(
            '_setHighlightedColumnGlobalField',
            [$analyzed_sql]
        );

        $this->assertEquals(
            $output,
            $this->object->__get('highlight_columns')
        );
    }


    /**
     * Data provider for testGetPartialText
     *
     * @return array parameters and output
     */
    public function dataProviderForTestGetPartialText()
    {
        return [
            [
                'P',
                10,
                'foo',
                [
                    false,
                    'foo',
                    3,
                ],
            ],
            [
                'P',
                1,
                'foo',
                [
                    true,
                    'f...',
                    3,
                ],
            ],
            [
                'F',
                10,
                'foo',
                [
                    false,
                    'foo',
                    3,
                ],
            ],
            [
                'F',
                1,
                'foo',
                [
                    false,
                    'foo',
                    3,
                ],
            ],
        ];
    }


    /**
     * Test _getPartialText
     *
     * @param string  $pftext     Partial or Full text
     * @param integer $limitChars Partial or Full text
     * @param string  $str        the string to be tested
     * @param boolean $output     return value of _getPartialText
     *
     * @return void
     *
     * @dataProvider dataProviderForTestGetPartialText
     */
    public function testGetPartialText($pftext, $limitChars, $str, $output): void
    {
        $_SESSION['tmpval']['pftext'] = $pftext;
        $GLOBALS['cfg']['LimitChars'] = $limitChars;
        $this->assertEquals(
            $output,
            $this->_callPrivateFunction(
                '_getPartialText',
                [$str]
            )
        );
    }


    /**
     * Data provider for testHandleNonPrintableContents
     *
     * @return array parameters and output
     */
    public function dataProviderForTestHandleNonPrintableContents()
    {
        $transformation_plugin = new Text_Plain_Link();
        $meta = new stdClass();
        $meta->type = 'BLOB';
        $meta->orgtable = 'bar';
        $url_params = [
            'db' => 'foo',
            'table' => 'bar',
            'where_clause' => 'where_clause',
        ];

        return [
            [
                true,
                true,
                'BLOB',
                '1001',
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                [],
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                $meta,
                $url_params,
                null,
                'class="disableAjax">1001</a>',
            ],
            [
                true,
                true,
                'BLOB',
                hex2bin('123456'),
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                [],
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                $meta,
                $url_params,
                null,
                'class="disableAjax">0x123456</a>',
            ],
            [
                true,
                false,
                'BLOB',
                '1001',
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                [],
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                $meta,
                $url_params,
                null,
                'class="disableAjax">[BLOB - 4 B]</a>',
            ],
            [
                false,
                false,
                'BINARY',
                '1001',
                $transformation_plugin,
                [],
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                $meta,
                $url_params,
                null,
                '1001',
            ],
            [
                false,
                true,
                'GEOMETRY',
                null,
                '',
                [],
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                $meta,
                $url_params,
                null,
                '[GEOMETRY - NULL]',
            ],
        ];
    }


    /**
     * Test _handleNonPrintableContents
     *
     * @param boolean $display_binary        show binary contents?
     * @param boolean $display_blob          show blob contents?
     * @param string  $category              BLOB|BINARY|GEOMETRY
     * @param string  $content               the binary content
     * @param string  $transformation_plugin transformation plugin.
     *                                       Can also be the default function:
     *                                       PhpMyAdmin\Core::mimeDefaultFunction
     * @param array   $transform_options     transformation parameters
     * @param string  $default_function      default transformation function
     * @param object  $meta                  the meta-information about the field
     * @param array   $url_params            parameters that should go to the
     *                                       download link
     * @param boolean $is_truncated          the result is truncated or not
     * @param string  $output                the output of this function
     *
     * @return void
     *
     * @dataProvider dataProviderForTestHandleNonPrintableContents
     */
    public function testHandleNonPrintableContents(
        $display_binary,
        $display_blob,
        $category,
        $content,
        $transformation_plugin,
        array $transform_options,
        $default_function,
        $meta,
        $url_params,
        $is_truncated,
        $output
    ) {
        $_SESSION['tmpval']['display_binary'] = $display_binary;
        $_SESSION['tmpval']['display_blob'] = $display_blob;
        $GLOBALS['cfg']['LimitChars'] = 50;
        $this->assertStringContainsString(
            $output,
            $this->_callPrivateFunction(
                '_handleNonPrintableContents',
                [
                    $category,
                    $content,
                    $transformation_plugin,
                    $transform_options,
                    $default_function,
                    $meta,
                    $url_params,
                    &$is_truncated,
                ]
            )
        );
    }


    /**
     * Data provider for testGetDataCellForNonNumericColumns
     *
     * @return array parameters and output
     */
    public function dataProviderForTestGetDataCellForNonNumericColumns()
    {
        $transformation_plugin = new Text_Plain_Link();
        $meta = new stdClass();
        $meta->db = 'foo';
        $meta->table = 'tbl';
        $meta->orgtable = 'tbl';
        $meta->type = 'BLOB';
        $meta->flags = 'blob binary';
        $meta->name = 'tblob';
        $meta->orgname = 'tblob';

        $meta2 = new stdClass();
        $meta2->db = 'foo';
        $meta2->table = 'tbl';
        $meta2->orgtable = 'tbl';
        $meta2->type = 'string';
        $meta2->flags = '';
        $meta2->decimals = 0;
        $meta2->name = 'varchar';
        $meta2->orgname = 'varchar';
        $url_params = [
            'db' => 'foo',
            'table' => 'tbl',
            'where_clause' => 'where_clause',
        ];

        return [
            [
                'all',
                '1001',
                'grid_edit',
                $meta,
                [],
                $url_params,
                false,
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                ['https://www.example.com/'],
                false,
                [],
                0,
                'binary',
                'class="disableAjax">[BLOB - 4 B]</a>' . "\n"
                . '</td>' . "\n",
            ],
            [
                'noblob',
                '1001',
                'grid_edit',
                $meta,
                [],
                $url_params,
                false,
                $transformation_plugin,
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                [],
                false,
                [],
                0,
                'binary',
                '<td class="left grid_edit  transformed hex">' . "\n"
                . '    1001' . "\n"
                . '</td>' . "\n",
            ],
            [
                'noblob',
                null,
                'grid_edit',
                $meta2,
                [],
                $url_params,
                false,
                $transformation_plugin,
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                [],
                false,
                [],
                0,
                '',
                '<td ' . "\n"
                . '    data-decimals="0"' . "\n"
                . '    data-type="string"' . "\n"
                . '        class="grid_edit  null">' . "\n"
                . '    <em>NULL</em>' . "\n"
                . '</td>' . "\n",
            ],
            [
                'all',
                'foo bar baz',
                'grid_edit',
                $meta2,
                [],
                $url_params,
                false,
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                [
                    Core::class,
                    'mimeDefaultFunction',
                ],
                [],
                false,
                [],
                0,
                '',
                '<td data-decimals="0" data-type="string" '
                . 'data-originallength="11" '
                . 'class="grid_edit ">foo bar baz</td>' . "\n",
            ],
        ];
    }


    /**
     * Test _getDataCellForNonNumericColumns
     *
     * @param boolean $protectBinary         all|blob|noblob|no
     * @param string  $column                the relevant column in data row
     * @param string  $class                 the html class for column
     * @param object  $meta                  the meta-information about the field
     * @param array   $map                   the list of relations
     * @param array   $_url_params           the parameters for generate url
     * @param boolean $condition_field       the column should highlighted
     *                                       or not
     * @param string  $transformation_plugin the name of transformation function
     * @param string  $default_function      the default transformation function
     * @param array   $transform_options     the transformation parameters
     * @param boolean $is_field_truncated    is data truncated due to LimitChars
     * @param array   $analyzed_sql_results  the analyzed query
     * @param integer $dt_result             the link id associated to the query
     *                                       which results have to be displayed
     * @param integer $col_index             the column index
     * @param string  $output                the output of this function
     *
     * @return void
     *
     * @dataProvider dataProviderForTestGetDataCellForNonNumericColumns
     */
    public function testGetDataCellForNonNumericColumns(
        $protectBinary,
        $column,
        $class,
        $meta,
        $map,
        $_url_params,
        $condition_field,
        $transformation_plugin,
        $default_function,
        array $transform_options,
        $is_field_truncated,
        $analyzed_sql_results,
        $dt_result,
        $col_index,
        $output
    ) {
        $_SESSION['tmpval']['display_binary'] = true;
        $_SESSION['tmpval']['display_blob'] = false;
        $_SESSION['tmpval']['relational_display'] = false;
        $GLOBALS['cfg']['LimitChars'] = 50;
        $GLOBALS['cfg']['ProtectBinary'] = $protectBinary;
        $this->assertStringContainsString(
            $output,
            $this->_callPrivateFunction(
                '_getDataCellForNonNumericColumns',
                [
                    $column,
                    $class,
                    $meta,
                    $map,
                    $_url_params,
                    $condition_field,
                    $transformation_plugin,
                    $default_function,
                    $transform_options,
                    $is_field_truncated,
                    $analyzed_sql_results,
                    &$dt_result,
                    $col_index,
                ]
            )
        );
    }

    /**
     * Simple output transformation test
     *
     * It mocks data needed to display two transformations and asserts
     * they are rendered.
     *
     * @return void
     */
    public function testOutputTransformations()
    {
        // Fake relation settings
        $_SESSION['tmpval']['relational_display'] = 'K';
        $_SESSION['relation'][$GLOBALS['server']]['PMA_VERSION'] = PMA_VERSION;
        $_SESSION['relation'][$GLOBALS['server']]['mimework'] = true;
        $_SESSION['relation'][$GLOBALS['server']]['column_info'] = 'column_info';
        $GLOBALS['cfg']['BrowseMIME'] = true;

        // Basic data
        $result = 0;
        $query = 'SELECT 1';
        $this->object->__set('db', 'db');
        $this->object->__set('fields_cnt', 2);

        // Field meta information
        $meta = new stdClass();
        $meta->db = 'db';
        $meta->table = 'table';
        $meta->orgtable = 'table';
        $meta->type = 'INT';
        $meta->flags = '';
        $meta->name = '1';
        $meta->orgname = '1';
        $meta->not_null = true;
        $meta->numeric = true;
        $meta->primary_key = false;
        $meta->unique_key = false;
        $meta2 = new stdClass();
        $meta2->db = 'db';
        $meta2->table = 'table';
        $meta2->orgtable = 'table';
        $meta2->type = 'INT';
        $meta2->flags = '';
        $meta2->name = '2';
        $meta2->orgname = '2';
        $meta2->not_null = true;
        $meta2->numeric = true;
        $meta2->primary_key = false;
        $meta2->unique_key = false;
        $fields_meta = [
            $meta,
            $meta2,
        ];
        $this->object->__set('fields_meta', $fields_meta);

        $dbi = $this->getMockBuilder('PhpMyAdmin\DatabaseInterface')
            ->disableOriginalConstructor()
            ->getMock();

        $dbi->expects($this->any())->method('fieldFlags')
            ->willReturn('');

        // MIME transformations
        $dbi->expects($this->exactly(1))
            ->method('fetchResult')
            ->willReturn(
                [
                    'db.table.1' => [
                        'mimetype' => '',
                        'transformation' => 'output/text_plain_dateformat.php',
                    ],
                    'db.table.2' => [
                        'mimetype' => '',
                        'transformation' => 'output/text_plain_bool2text.php',
                    ],
                ]
            );

        $GLOBALS['dbi'] = $dbi;

        $transformations = new Transformations();
        $this->object->__set(
            'mime_map',
            $transformations->getMime('db', 'table')
        );

        // Actually invoke tested method
        $output = $this->_callPrivateFunction(
            '_getRowValues',
            [
                &$result,
                [
                    3600,
                    true,
                ],
                0,
                false,
                [],
                '',
                false,
                $query,
                Query::getAll($query),
            ]
        );

        // Dateformat
        $this->assertStringContainsString(
            'Jan 01, 1970 at 01:00 AM',
            $output
        );
        // Bool2Text
        $this->assertStringContainsString(
            '>T<',
            $output
        );
        unset($_SESSION['tmpval']);
        unset($_SESSION['relation']);
    }
}
