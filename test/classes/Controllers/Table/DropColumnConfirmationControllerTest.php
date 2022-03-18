<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers\Table;

use PhpMyAdmin\Controllers\Table\DropColumnConfirmationController;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Template;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer;

/**
 * @covers \PhpMyAdmin\Controllers\Table\DropColumnConfirmationController
 */
class DropColumnConfirmationControllerTest extends AbstractTestCase
{
    public function testWithValidParameters(): void
    {
        $request = $this->createStub(ServerRequest::class);
        $request->method('getParsedBodyParam')->willReturnMap([
            ['db', null, 'test_db'],
            ['table', null, 'test_table'],
            ['selected_fld', null, ['name', 'datetimefield']],
        ]);

        $this->dummyDbi->addSelectDb('test_db');
        $this->dummyDbi->addResult('SHOW TABLES LIKE \'test_table\';', [['test_table']]);

        $response = new ResponseRenderer();
        $template = new Template();
        $expected = $template->render('table/structure/drop_confirm', [
            'db' => 'test_db',
            'table' => 'test_table',
            'fields' => ['name', 'datetimefield'],
        ]);

        (new DropColumnConfirmationController($response, $template))($request);

        $this->assertSame(200, $response->getHttpResponseCode());
        $this->assertTrue($response->hasSuccessState());
        $this->assertSame([], $response->getJSONResult());
        $this->assertSame($expected, $response->getHTMLResult());
    }

    public function testWithoutFields(): void
    {
        $request = $this->createStub(ServerRequest::class);
        $request->method('getParsedBodyParam')->willReturnMap([
            ['db', null, 'test_db'],
            ['table', null, 'test_table'],
            ['selected_fld', null, null],
        ]);

        $response = new ResponseRenderer();
        (new DropColumnConfirmationController($response, new Template()))($request);

        $this->assertSame(400, $response->getHttpResponseCode());
        $this->assertFalse($response->hasSuccessState());
        $this->assertSame(['message' => 'No column selected.'], $response->getJSONResult());
        $this->assertSame('', $response->getHTMLResult());
    }

    public function testWithoutDatabaseAndTable(): void
    {
        $request = $this->createStub(ServerRequest::class);
        $request->method('getParsedBodyParam')->willReturnMap([
            ['db', null, null],
            ['table', null, null],
            ['selected_fld', null, ['name', 'datetimefield']],
        ]);

        $response = new ResponseRenderer();
        (new DropColumnConfirmationController($response, new Template()))($request);

        $this->assertSame(400, $response->getHttpResponseCode());
        $this->assertFalse($response->hasSuccessState());
        $this->assertSame(['message' => 'Table not found.'], $response->getJSONResult());
        $this->assertSame('', $response->getHTMLResult());
    }
}
