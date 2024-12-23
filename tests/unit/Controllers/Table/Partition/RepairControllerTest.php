<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers\Table\Partition;

use PhpMyAdmin\Controllers\Table\Partition\RepairController;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Message;
use PhpMyAdmin\Partitioning\Maintenance;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;

#[CoversClass(RepairController::class)]
class RepairControllerTest extends AbstractTestCase
{
    #[DataProvider('providerForTestInvalidDatabaseAndTable')]
    public function testInvalidDatabaseAndTable(
        string|null $partition,
        string|null $db,
        string|null $table,
        string $message,
    ): void {
        $request = self::createStub(ServerRequest::class);
        $request->method('getParsedBodyParam')->willReturnMap([['partition_name', null, $partition]]);
        $request->method('getParam')->willReturnMap([['db', null, $db], ['table', null, $table]]);
        $dbi = $this->createDatabaseInterface();
        DatabaseInterface::$instance = $dbi;
        $response = new ResponseRenderer();

        $controller = new RepairController($response, new Maintenance($dbi));
        $controller($request);

        self::assertSame(Message::error($message)->getDisplay(), $response->getHTMLResult());
    }

    /** @return array<int, array{string|null, string|null, string|null, non-empty-string}> */
    public static function providerForTestInvalidDatabaseAndTable(): iterable
    {
        return [
            [null, null, null, 'The partition name must be a non-empty string.'],
            ['', null, null, 'The partition name must be a non-empty string.'],
            ['partitionName', null, null, 'The database name must be a non-empty string.'],
            ['partitionName', '', null, 'The database name must be a non-empty string.'],
            ['partitionName', 'databaseName', null, 'The table name must be a non-empty string.'],
            ['partitionName', 'databaseName', '', 'The table name must be a non-empty string.'],
        ];
    }
}
