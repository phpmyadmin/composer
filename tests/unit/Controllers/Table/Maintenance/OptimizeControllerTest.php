<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers\Table\Maintenance;

use PhpMyAdmin\Controllers\Table\Maintenance\OptimizeController;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Table\Maintenance;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;

#[CoversClass(OptimizeController::class)]
class OptimizeControllerTest extends AbstractTestCase
{
    /** @param string[][]|string[]|string|null $tables */
    #[DataProvider('providerForTestNoTableSelected')]
    public function testNoTableSelected(array|string|null $tables): void
    {
        $request = self::createStub(ServerRequest::class);
        $request->method('getParsedBodyParam')->willReturnMap([['selected_tbl', null, $tables]]);
        $dbi = $this->createDatabaseInterface();
        DatabaseInterface::$instance = $dbi;
        $response = new ResponseRenderer();
        $controller = new OptimizeController($response, new Maintenance($dbi), $this->createConfig());
        $controller($request);
        self::assertFalse($response->hasSuccessState());
        self::assertSame(['message' => 'No table selected.'], $response->getJSONResult());
        self::assertSame('', $response->getHTMLResult());
    }

    /** @return array<int, array{string[][]|string[]|string|null}> */
    public static function providerForTestNoTableSelected(): array
    {
        return [[null], [''], ['table'], [[]], [['']], [['table', '']], [[['table']]]];
    }
}
