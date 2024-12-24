<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests;

use PhpMyAdmin\Config;
use PhpMyAdmin\Config\ConfigFile;
use PhpMyAdmin\ConfigStorage\Relation;
use PhpMyAdmin\ConfigStorage\RelationParameters;
use PhpMyAdmin\Current;
use PhpMyAdmin\Dbal\ConnectionType;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Message;
use PhpMyAdmin\ResponseRenderer;
use PhpMyAdmin\Template;
use PhpMyAdmin\Tests\Stubs\DummyResult;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer as ResponseRendererStub;
use PhpMyAdmin\Url;
use PhpMyAdmin\UserPreferences;
use PHPUnit\Framework\Attributes\BackupStaticProperties;
use PHPUnit\Framework\Attributes\CoversClass;
use ReflectionProperty;

use function json_encode;
use function time;

#[CoversClass(UserPreferences::class)]
class UserPreferencesTest extends AbstractTestCase
{
    /**
     * Setup various pre conditions
     */
    protected function setUp(): void
    {
        parent::setUp();

        DatabaseInterface::$instance = $this->createDatabaseInterface();
        Current::$server = 2;
        $_SERVER['PHP_SELF'] = '/phpmyadmin/';
    }

    /**
     * Test for pageInit
     */
    public function testPageInit(): void
    {
        $config = Config::getInstance();
        $config->settings = ['Server/hide_db' => 'testval123', 'Server/port' => '213'];
        $config->settings['AvailableCharsets'] = [];
        $config->settings['UserprefsDeveloperTab'] = null;

        $dbi = DatabaseInterface::getInstance();
        $userPreferences = new UserPreferences($dbi, new Relation($dbi), new Template());
        $userPreferences->pageInit(new ConfigFile());

        self::assertSame(
            ['Servers' => [1 => ['hide_db' => 'testval123']]],
            $_SESSION['ConfigFile' . Current::$server],
        );
    }

    /**
     * Test for load
     */
    public function testLoad(): void
    {
        $relationParameters = RelationParameters::fromArray([]);
        (new ReflectionProperty(Relation::class, 'cache'))->setValue(null, $relationParameters);

        unset($_SESSION['userconfig']);

        $dbi1 = DatabaseInterface::getInstance();
        $userPreferences = new UserPreferences($dbi1, new Relation($dbi1), new Template());
        $result = $userPreferences->load();

        self::assertSame(
            [],
            $result['config_data'],
        );

        self::assertEqualsWithDelta(
            time(),
            $result['mtime'],
            2,
            '',
        );

        self::assertSame('session', $result['type']);

        // case 2
        $relationParameters = RelationParameters::fromArray([
            'user' => 'user',
            'db' => "pma'db",
            'userconfig' => 'testconf',
            'userconfigwork' => true,
        ]);
        (new ReflectionProperty(Relation::class, 'cache'))->setValue(null, $relationParameters);

        $dbi = $this->getMockBuilder(DatabaseInterface::class)
            ->disableOriginalConstructor()
            ->getMock();

        $query = 'SELECT `config_data`, UNIX_TIMESTAMP(`timevalue`) ts '
            . 'FROM `pma\'db`.`testconf` WHERE `username` = \'user\'';

        $dbi->expects(self::once())
            ->method('fetchSingleRow')
            ->with($query, DatabaseInterface::FETCH_ASSOC, ConnectionType::ControlUser)
            ->willReturn(['ts' => '123', 'config_data' => json_encode([1, 2])]);
        $dbi->expects(self::any())
            ->method('quoteString')
            ->willReturnCallback(static fn (string $string): string => "'" . $string . "'");

        $userPreferences = new UserPreferences($dbi, new Relation($dbi), new Template());
        $result = $userPreferences->load();

        self::assertSame(
            ['config_data' => [1, 2], 'mtime' => 123, 'type' => 'db'],
            $result,
        );
    }

    /**
     * Test for save
     */
    public function testSave(): void
    {
        Config::getInstance()->selectedServer['DisableIS'] = true;
        $relationParameters = RelationParameters::fromArray([]);
        (new ReflectionProperty(Relation::class, 'cache'))->setValue(null, $relationParameters);

        unset($_SESSION['userconfig']);

        $dbi1 = DatabaseInterface::getInstance();
        $userPreferences = new UserPreferences($dbi1, new Relation($dbi1), new Template());
        $result = $userPreferences->save([1]);

        self::assertTrue($result);

        self::assertCount(2, $_SESSION['userconfig']);

        self::assertSame(
            [1],
            $_SESSION['userconfig']['db'],
        );

        /* TODO: This breaks sometimes as there might be time difference! */
        self::assertEqualsWithDelta(
            time(),
            $_SESSION['userconfig']['ts'],
            2,
            '',
        );

        $assert = true;

        if (isset($_SESSION['cache']['server_2']['userprefs'])) {
            $assert = false;
        }

        self::assertTrue($assert);

        // case 2
        $relationParameters = RelationParameters::fromArray([
            'userconfigwork' => true,
            'db' => 'pmadb',
            'userconfig' => 'testconf',
            'user' => 'user',
        ]);
        (new ReflectionProperty(Relation::class, 'cache'))->setValue(null, $relationParameters);

        $query1 = 'SELECT `username` FROM `pmadb`.`testconf` WHERE `username` = \'user\'';

        $query2 = 'UPDATE `pmadb`.`testconf` SET `timevalue` = NOW(), `config_data` = \''
            . json_encode([1]) . '\' WHERE `username` = \'user\'';

        $dbi = $this->getMockBuilder(DatabaseInterface::class)
            ->disableOriginalConstructor()
            ->getMock();

        $dbi->expects(self::once())
            ->method('fetchValue')
            ->with($query1, 0, ConnectionType::ControlUser)
            ->willReturn('1');

        $dbi->expects(self::once())
            ->method('tryQuery')
            ->with($query2, ConnectionType::ControlUser)
            ->willReturn(self::createStub(DummyResult::class));

        $dbi->expects(self::any())
            ->method('quoteString')
            ->willReturnCallback(static fn (string $string): string => "'" . $string . "'");

        $userPreferences = new UserPreferences($dbi, new Relation($dbi1), new Template());
        $result = $userPreferences->save([1]);

        self::assertTrue($result);

        // case 3

        $query1 = 'SELECT `username` FROM `pmadb`.`testconf` WHERE `username` = \'user\'';

        $query2 = 'INSERT INTO `pmadb`.`testconf` (`username`, `timevalue`,`config_data`) '
            . 'VALUES (\'user\', NOW(), \'' . json_encode([1]) . '\')';

        $dbi = $this->getMockBuilder(DatabaseInterface::class)
            ->disableOriginalConstructor()
            ->getMock();

        $dbi->expects(self::once())
            ->method('fetchValue')
            ->with($query1, 0, ConnectionType::ControlUser)
            ->willReturn(false);

        $dbi->expects(self::once())
            ->method('tryQuery')
            ->with($query2, ConnectionType::ControlUser)
            ->willReturn(false);

        $dbi->expects(self::once())
            ->method('getError')
            ->with(ConnectionType::ControlUser)
            ->willReturn('err1');
        $dbi->expects(self::any())
            ->method('quoteString')
            ->willReturnCallback(static fn (string $string): string => "'" . $string . "'");

        $userPreferences = new UserPreferences($dbi, new Relation($dbi1), new Template());
        $result = $userPreferences->save([1]);

        self::assertInstanceOf(Message::class, $result);
        self::assertSame(
            'Could not save configuration<br><br>err1'
            . '<br><br>The phpMyAdmin configuration storage database could not be accessed.',
            $result->getMessage(),
        );
    }

    /**
     * Test for apply
     */
    public function testApply(): void
    {
        $config = Config::getInstance();
        $config->settings['UserprefsDisallow'] = ['test' => 'val', 'foo' => 'bar'];
        $config->settings['UserprefsDeveloperTab'] = null;

        $dbi = DatabaseInterface::getInstance();
        $userPreferences = new UserPreferences($dbi, new Relation($dbi), new Template());
        $result = $userPreferences->apply(
            [
                'DBG/sql' => true,
                'ErrorHandler/display' => true,
                'ErrorHandler/gather' => false,
                'Servers/foobar' => '123',
                'Server/hide_db' => true,
            ],
        );

        self::assertEquals(
            ['Server' => ['hide_db' => 1]],
            $result,
        );
    }

    /**
     * Test for apply
     */
    public function testApplyDevel(): void
    {
        Config::getInstance()->settings['UserprefsDeveloperTab'] = true;

        $dbi = DatabaseInterface::getInstance();
        $userPreferences = new UserPreferences($dbi, new Relation($dbi), new Template());
        $result = $userPreferences->apply(
            ['DBG/sql' => true],
        );

        self::assertSame(
            ['DBG' => ['sql' => true]],
            $result,
        );
    }

    /**
     * Test for persistOption
     */
    public function testPersistOption(): void
    {
        $relationParameters = RelationParameters::fromArray([]);
        (new ReflectionProperty(Relation::class, 'cache'))->setValue(null, $relationParameters);

        $_SESSION['userconfig'] = [];
        $_SESSION['userconfig']['ts'] = '123';
        $_SESSION['userconfig']['db'] = ['Server/hide_db' => true, 'Server/only_db' => true];

        (new ReflectionProperty(Relation::class, 'cache'))->setValue(null, $relationParameters);

        $dbi = DatabaseInterface::getInstance();
        $userPreferences = new UserPreferences($dbi, new Relation($dbi), new Template());
        self::assertTrue(
            $userPreferences->persistOption('Server/hide_db', 'val', 'val'),
        );

        self::assertTrue(
            $userPreferences->persistOption('Server/hide_db', 'val2', 'val'),
        );

        self::assertTrue(
            $userPreferences->persistOption('Server/hide_db2', 'val', 'val'),
        );
    }

    #[BackupStaticProperties(true)]
    public function testRedirect(): void
    {
        $responseStub = new ResponseRendererStub();
        (new ReflectionProperty(ResponseRenderer::class, 'instance'))->setValue(null, $responseStub);

        Current::$lang = '';
        Current::$database = 'db';
        Current::$table = 'table';

        Config::getInstance()->set('PmaAbsoluteUri', '');

        $dbi = DatabaseInterface::getInstance();
        $userPreferences = new UserPreferences($dbi, new Relation($dbi), new Template());
        $userPreferences->redirect(
            'file.html',
            ['a' => 'b'],
            'h ash',
        );

        $response = $responseStub->getResponse();
        self::assertSame(['/phpmyadmin/file.html?a=b&saved=1&server=2#h+ash'], $response->getHeader('Location'));
        self::assertSame(302, $response->getStatusCode());
    }

    /**
     * Test for autoloadGetHeader
     */
    public function testAutoloadGetHeader(): void
    {
        $_SESSION['userprefs_autoload'] = false;
        $_REQUEST['prefs_autoload'] = 'hide';

        $dbi = DatabaseInterface::getInstance();
        $userPreferences = new UserPreferences($dbi, new Relation($dbi), new Template());
        self::assertSame(
            '',
            $userPreferences->autoloadGetHeader(),
        );

        self::assertTrue($_SESSION['userprefs_autoload']);

        $_REQUEST['prefs_autoload'] = 'nohide';
        Config::getInstance()->settings['ServerDefault'] = 1;
        $result = $userPreferences->autoloadGetHeader();

        self::assertStringContainsString(
            '<form action="' . Url::getFromRoute('/preferences/manage') . '" method="post" class="disableAjax">',
            $result,
        );

        self::assertStringContainsString('<input type="hidden" name="token" value="token"', $result);

        self::assertStringContainsString('<input type="hidden" name="json" value="">', $result);

        self::assertStringContainsString('<input type="hidden" name="submit_import" value="1">', $result);

        self::assertStringContainsString('<input type="hidden" name="return_url" value="?">', $result);
    }
}
