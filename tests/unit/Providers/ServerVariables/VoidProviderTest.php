<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Providers\ServerVariables;

use PhpMyAdmin\Providers\ServerVariables\VoidProvider;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;

#[CoversClass(VoidProvider::class)]
final class VoidProviderTest extends TestCase
{
    public function testVoidProvider(): void
    {
        $provider = new VoidProvider();
        self::assertNull($provider->getVariableType('test'));
        self::assertSame([], $provider->getStaticVariables());
        self::assertNull($provider->getDocLinkByNameMariaDb('test'));
        self::assertNull($provider->getDocLinkByNameMysql('test'));
    }
}
