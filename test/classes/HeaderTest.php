<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * Test for PhpMyAdmin\Header class
 *
 * @package PhpMyAdmin-test
 */
declare(strict_types=1);

namespace PhpMyAdmin\Tests;

use PhpMyAdmin\Config;
use PhpMyAdmin\Core;
use PhpMyAdmin\Header;
use PhpMyAdmin\Tests\PmaTestCase;
use ReflectionMethod;
use ReflectionProperty;

/**
 * Test for PhpMyAdmin\Header class
 *
 * @package PhpMyAdmin-test
 * @group medium
 */
class HeaderTest extends PmaTestCase
{
    /**
     * Configures global environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        if (! defined('PMA_IS_WINDOWS')) {
            define('PMA_IS_WINDOWS', false);
        }
        $GLOBALS['server'] = 0;
        $GLOBALS['message'] = 'phpmyadminmessage';
        $GLOBALS['pmaThemePath'] = $GLOBALS['PMA_Theme']->getPath();
        $GLOBALS['PMA_PHP_SELF'] = Core::getenv('PHP_SELF');
        $GLOBALS['server'] = 'server';
        $GLOBALS['db'] = 'db';
        $GLOBALS['table'] = '';
        $GLOBALS['PMA_Config'] = new Config();
        $GLOBALS['PMA_Config']->enableBc();
        $GLOBALS['cfg']['Server']['DisableIS'] = false;
        $GLOBALS['cfg']['Server']['verbose'] = 'verbose host';
        $GLOBALS['cfg']['Server']['pmadb'] = '';
        $GLOBALS['cfg']['Server']['user'] = '';
    }

    /**
     * Test for disable
     *
     * @return void
     */
    public function testDisable()
    {
        $header = new Header();
        $header->disable();
        $this->assertEquals(
            '',
            $header->getDisplay()
        );
    }

    /**
     * Test for enable
     *
     * @return void
     */
    public function testEnable()
    {
        $header = new Header();
        $this->assertStringContainsString(
            '<title>phpMyAdmin</title>',
            $header->getDisplay()
        );
    }

    /**
     * Test for Set BodyId
     *
     * @return void
     */
    public function testSetBodyId()
    {
        $header = new Header();
        $header->setBodyId('PMA_header_id');
        $this->assertStringContainsString(
            'PMA_header_id',
            $header->getDisplay()
        );
    }

    /**
     * Test for print view
     *
     * @return void
     */
    public function testPrintView()
    {
        $header = new Header();
        $header->enablePrintView();
        $this->assertStringContainsString(
            'Print view',
            $header->getDisplay()
        );
    }

    /**
     * Test for Get JsParams
     *
     * @return void
     */
    public function testGetJsParams()
    {
        $header = new Header();
        $this->assertArrayHasKey(
            'common_query',
            $header->getJsParams()
        );
    }

    /**
     * Test for Get JsParamsCode
     *
     * @return void
     */
    public function testGetJsParamsCode()
    {
        $header = new Header();
        $this->assertStringContainsString(
            'CommonParams.setAll',
            $header->getJsParamsCode()
        );
    }

    /**
     * Test for Get Message
     *
     * @return void
     */
    public function testGetMessage()
    {
        $header = new Header();
        $this->assertStringContainsString(
            'phpmyadminmessage',
            $header->getMessage()
        );
    }

    /**
     * Test for Disable Warnings
     *
     * @return void
     * @test
     */
    public function testDisableWarnings()
    {
        $reflection = new ReflectionProperty(Header::class, '_warningsEnabled');
        $reflection->setAccessible(true);

        $header = new Header();
        $header->disableWarnings();

        $this->assertFalse($reflection->getValue($header));
    }
}
