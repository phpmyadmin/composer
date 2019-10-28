<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * tests for ListDatabase class
 *
 * @package PhpMyAdmin-test
 */
namespace PhpMyAdmin\Tests;

use PhpMyAdmin\ListDatabase;
use PhpMyAdmin\Tests\PmaTestCase;
use ReflectionClass;

$GLOBALS['server'] = 1;
$GLOBALS['cfg']['Server']['DisableIS'] = false;

/**
 * tests for ListDatabase class
 *
 * @package PhpMyAdmin-test
 */
class ListDatabaseTest extends PmaTestCase
{
    /**
     * SetUp for test cases
     *
     * @return void
     */
    public function setUp()
    {
        $GLOBALS['cfg']['Server']['only_db'] = array('single\\_db');
        $this->object = new ListDatabase();
    }

    /**
     * Call protected functions by setting visibility to public.
     *
     * @param string $name   method name
     * @param array  $params parameters for the invocation
     *
     * @return the output from the protected method.
     */
    private function _callProtectedFunction($name, $params)
    {
        $class = new ReflectionClass(ListDatabase::class);
        $method = $class->getMethod($name);
        $method->setAccessible(true);
        return $method->invokeArgs($this->object, $params);
    }

    /**
     * Test for ListDatabase::getEmpty
     *
     * @return void
     */
    public function testEmpty()
    {
        $arr = new ListDatabase;
        $this->assertEquals('', $arr->getEmpty());
    }

    /**
     * Test for ListDatabase::exists
     *
     * @return void
     */
    public function testExists()
    {
        $arr = new ListDatabase;
        $this->assertEquals(true, $arr->exists('single_db'));
    }

    /**
     * Test for ListDatabase::getHtmlOptions
     *
     * @return void
     */
    public function testHtmlOptions()
    {
        $arr = new ListDatabase;
        $this->assertEquals(
            '<option value="single_db">single_db</option>' . "\n",
            $arr->getHtmlOptions()
        );
    }

    /**
     * Test for checkHideDatabase
     *
     * @return void
     */
    public function testCheckHideDatabase()
    {
        $GLOBALS['cfg']['Server']['hide_db'] = 'single\\_db';
        $this->assertEquals(
            $this->_callProtectedFunction(
                'checkHideDatabase',
                array()
            ),
            ''
        );
    }

    /**
     * Test for getDefault
     *
     * @return void
     */
    public function testGetDefault()
    {
        $GLOBALS['db'] = '';
        $this->assertEquals(
            $this->object->getDefault(),
            ''
        );

        $GLOBALS['db'] = 'mysql';
        $this->assertEquals(
            $this->object->getDefault(),
            'mysql'
        );
    }

}
