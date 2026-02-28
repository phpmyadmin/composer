<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers\Database;

use Fig\Http\Message\StatusCodeInterface;
use PhpMyAdmin\Config;
use PhpMyAdmin\Controllers\Database\MultiTableQueryController;
use PhpMyAdmin\Current;
use PhpMyAdmin\Http\Factory\ServerRequestFactory;
use PhpMyAdmin\Template;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Tests\Stubs\DbiDummy;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(MultiTableQueryController::class)]
final class MultiTableQueryControllerTest extends AbstractTestCase
{
    public function testController(): void
    {
        Current::$database = 'test_db';
        $dbiDummy = $this->createDbiDummy();
        $dbiDummy->addResult(
            "SELECT TABLE_NAME, COLUMN_NAME FROM information_schema.columns WHERE table_schema = 'test_db'",
            [['test_table', 'id'], ['test_table', 'name'], ['test_table', 'datetimefield']],
            ['TABLE_NAME', 'COLUMN_NAME'],
        );

        $request = ServerRequestFactory::create()->createServerRequest('GET', 'https://example.com/')
            ->withQueryParams(['route' => '/database/multi-table-query', 'db' => 'test_db']);

        $response = ($this->getMultiTableQueryController($dbiDummy))($request);

        $dbiDummy->assertAllQueriesConsumed();
        self::assertSame(StatusCodeInterface::STATUS_OK, $response->getStatusCode());
        self::assertStringEqualsFile(
            __DIR__ . '/Fixtures/MultiTableQuery-testController.html',
            (string) $response->getBody(),
        );
    }

    private function getMultiTableQueryController(DbiDummy $dbiDummy): MultiTableQueryController
    {
        $config = new Config();
        $dbi = $this->createDatabaseInterface($dbiDummy, $config);

        return new MultiTableQueryController(new ResponseRenderer(), new Template($config), $dbi);
    }
}
