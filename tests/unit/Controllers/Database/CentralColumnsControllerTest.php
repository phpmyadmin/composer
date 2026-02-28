<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers\Database;

use Fig\Http\Message\StatusCodeInterface;
use PhpMyAdmin\Config;
use PhpMyAdmin\Controllers\Database\CentralColumnsController;
use PhpMyAdmin\Database\CentralColumns;
use PhpMyAdmin\Http\Factory\ServerRequestFactory;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(CentralColumnsController::class)]
final class CentralColumnsControllerTest extends AbstractTestCase
{
    public function testEmptyList(): void
    {
        $dbiDummy = $this->createDbiDummy();
        $dbiDummy->addResult('SHOW TABLES FROM `test_db`;', [['test_table']], ['Tables_in_test_db']);
        $config = new Config();
        $dbi = $this->createDatabaseInterface($dbiDummy, $config);

        $request = ServerRequestFactory::create()->createServerRequest('GET', 'https://example.com/')
            ->withQueryParams(['route' => '/database/central-columns', 'db' => 'test_db']);

        $response = (new CentralColumnsController(new ResponseRenderer(), new CentralColumns($dbi), $config))($request);

        $dbiDummy->assertAllQueriesConsumed();
        self::assertSame(StatusCodeInterface::STATUS_OK, $response->getStatusCode());
        self::assertStringEqualsFile(
            __DIR__ . '/Fixtures/CentralColumns-testEmptyList.html',
            (string) $response->getBody(),
        );
    }
}
