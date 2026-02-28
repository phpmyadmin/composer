<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers\Database\CentralColumns;

use Fig\Http\Message\StatusCodeInterface;
use PhpMyAdmin\Controllers\Database\CentralColumns\PopulateColumnsController;
use PhpMyAdmin\Current;
use PhpMyAdmin\Database\CentralColumns;
use PhpMyAdmin\Http\Factory\ServerRequestFactory;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(PopulateColumnsController::class)]
final class PopulateColumnsControllerTest extends AbstractTestCase
{
    public function testPopulateColumns(): void
    {
        $dbi = $this->createDatabaseInterface();

        Current::$database = 'test_db';
        $request = ServerRequestFactory::create()->createServerRequest('POST', 'https://example.com/')
            ->withQueryParams(['route' => '/database/central-columns/populate'])
            ->withParsedBody(['db' => 'test_db', 'selectedTable' => 'test_table']);

        $response = (new PopulateColumnsController(new ResponseRenderer(), new CentralColumns($dbi)))($request);

        self::assertSame(StatusCodeInterface::STATUS_OK, $response->getStatusCode());
        self::assertSame(
            <<<'HTML'
              <option value="id">id</option>
              <option value="name">name</option>
              <option value="datetimefield">datetimefield</option>

            HTML,
            (string) $response->getBody(),
        );
    }
}
