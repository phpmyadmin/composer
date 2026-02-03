<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests;

use PhpMyAdmin\MessageType;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;

#[CoversClass(MessageType::class)]
final class MessageTypeTest extends TestCase
{
    public function testGetNumericalValue(): void
    {
        self::assertSame('1', MessageType::Success->getNumericalValue());
        self::assertSame('2', MessageType::Notice->getNumericalValue());
        self::assertSame('8', MessageType::Error->getNumericalValue());
    }
}
