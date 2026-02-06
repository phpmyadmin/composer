<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers;

use Fig\Http\Message\StatusCodeInterface;
use PhpMyAdmin\Config;
use PhpMyAdmin\Controllers\ChangeLogController;
use PhpMyAdmin\Http\Factory\ResponseFactory;
use PhpMyAdmin\Http\Factory\ServerRequestFactory;
use PhpMyAdmin\Template;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\RequiresPhpExtension;

#[CoversClass(ChangeLogController::class)]
final class ChangeLogControllerTest extends AbstractTestCase
{
    public function testWithValidFile(): void
    {
        $this->assertChangelogOutputIsValid(__DIR__ . '/../../test_data/changelog/CHANGELOG-5.2.md');
    }

    #[RequiresPhpExtension('zlib')]
    public function testWithCompressedFile(): void
    {
        $this->assertChangelogOutputIsValid(__DIR__ . '/../../test_data/changelog/CHANGELOG-5.2.md.gz');
    }

    private function assertChangelogOutputIsValid(string $changelogPath): void
    {
        $config = self::createStub(Config::class);
        $config->method('getChangeLogFilePath')->willReturn($changelogPath);

        $request = ServerRequestFactory::create()->createServerRequest('GET', 'https://example.com/');

        $responseRenderer = new ResponseRenderer();
        $template = new Template();
        $controller = new ChangeLogController($responseRenderer, $config, ResponseFactory::create(), $template);
        $response = $controller($request);

        self::assertSame(StatusCodeInterface::STATUS_OK, $response->getStatusCode());
        self::assertSame(['text/html; charset=utf-8'], $response->getHeader('Content-Type'));
        self::assertStringEqualsFile(
            __DIR__ . '/Fixtures/ChangeLog-assertChangelogOutputIsValid.html',
            (string) $response->getBody(),
        );
    }

    public function testWithInvalidFile(): void
    {
        $config = self::createStub(Config::class);
        $config->method('getChangeLogFilePath')->willReturn(__DIR__ . '/../../test_data/changelog/InvalidChangeLog');

        $request = ServerRequestFactory::create()->createServerRequest('GET', 'https://example.com/');

        $responseRenderer = new ResponseRenderer();
        $controller = new ChangeLogController($responseRenderer, $config, ResponseFactory::create(), new Template());
        $response = $controller($request);

        self::assertSame(StatusCodeInterface::STATUS_OK, $response->getStatusCode());
        self::assertSame(['text/html; charset=utf-8'], $response->getHeader('Content-Type'));
        self::assertSame(
            'The InvalidChangeLog file is not available on this system, please visit'
            . ' <a href="index.php?route=/url&url=https%3A%2F%2Fwww.phpmyadmin.net%2F"'
            . ' rel="noopener noreferrer" target="_blank">phpmyadmin.net</a> for more information.',
            (string) $response->getBody(),
        );
    }
}
