<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Providers\ServerVariables;

use PhpMyAdmin\Providers\ServerVariables\ServerVariablesProvider;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;

#[CoversClass(ServerVariablesProvider::class)]
final class ServerVariablesProviderTest extends TestCase
{
    public function testUniqueness(): void
    {
        (new ReflectionProperty(ServerVariablesProvider::class, 'instance'))->setValue(null, null);
        $instanceOne = ServerVariablesProvider::getImplementation();
        $instanceTwo = ServerVariablesProvider::getImplementation();
        self::assertSame($instanceOne, $instanceTwo);
    }
}
