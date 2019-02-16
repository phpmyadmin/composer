<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * Holds PluginsControllerTest class
 *
 * @package PhpMyAdmin-test
 */
declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers\Server;

use PhpMyAdmin\Config;
use PhpMyAdmin\Controllers\Server\PluginsController;
use PhpMyAdmin\DatabaseInterface;
use PhpMyAdmin\Response;
use PHPUnit\Framework\TestCase;

/**
 * Tests for PluginsController class
 *
 * @package PhpMyAdmin-test
 */
class PluginsControllerTest extends TestCase
{
    /**
     * Prepares environment for the test.
     *
     * @return void
     */
    protected function setUp(): void
    {
        $GLOBALS['PMA_Config'] = new Config();
        $GLOBALS['PMA_Config']->enableBc();

        $GLOBALS['server'] = 1;
        $GLOBALS['db'] = 'db';
        $GLOBALS['table'] = 'table';
        $GLOBALS['PMA_PHP_SELF'] = 'index.php';
        $GLOBALS['cfg']['Server']['DisableIS'] = false;
    }

    /**
     * Test for index method
     *
     * @return void
     */
    public function testIndex()
    {
        /**
         * Prepare plugin list
         */
        $row = [
            'plugin_name' => 'plugin_name1',
            'plugin_type' => 'plugin_type1',
            'plugin_type_version' => 'plugin_version1',
            'plugin_author' => 'plugin_author1',
            'plugin_license' => 'plugin_license1',
            'plugin_description' => 'plugin_description1',
            'is_active' => true,
        ];

        $dbi = $this->getMockBuilder(DatabaseInterface::class)
            ->disableOriginalConstructor()
            ->getMock();
        $dbi->expects($this->once())
            ->method('query')
            ->will($this->returnValue(true));
        $dbi->expects($this->at(1))
            ->method('fetchAssoc')
            ->will($this->returnValue($row));
        $dbi->expects($this->at(2))
            ->method('fetchAssoc')
            ->will($this->returnValue(false));
        $dbi->expects($this->once())
            ->method('freeResult')
            ->will($this->returnValue(true));

        $controller = new PluginsController(
            Response::getInstance(),
            $dbi
        );
        $actual = $controller->index();

        //validate 1:Items
        $this->assertContains(
            '<th>Plugin</th>',
            $actual
        );
        $this->assertContains(
            '<th>Description</th>',
            $actual
        );
        $this->assertContains(
            '<th>Version</th>',
            $actual
        );
        $this->assertContains(
            '<th>Author</th>',
            $actual
        );
        $this->assertContains(
            '<th>License</th>',
            $actual
        );

        //validate 2: one Item HTML
        $this->assertContains(
            'plugin_name1',
            $actual
        );
        $this->assertContains(
            '<td>plugin_description1</td>',
            $actual
        );
        $this->assertContains(
            '<td>plugin_version1</td>',
            $actual
        );
        $this->assertContains(
            '<td>plugin_author1</td>',
            $actual
        );
        $this->assertContains(
            '<td>plugin_license1</td>',
            $actual
        );
    }
}
