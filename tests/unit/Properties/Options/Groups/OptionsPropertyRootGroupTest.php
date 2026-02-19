<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Properties\Options\Groups;

use PhpMyAdmin\Properties\Options\Groups\OptionsPropertyRootGroup;
use PhpMyAdmin\Tests\AbstractTestCase;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(OptionsPropertyRootGroup::class)]
class OptionsPropertyRootGroupTest extends AbstractTestCase
{
    protected OptionsPropertyRootGroup $object;

    /**
     * Configures global environment.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->object = new OptionsPropertyRootGroup();
    }

    /**
     * Test for contable interface
     */
    public function testCountable(): void
    {
        self::assertCount(0, $this->object);
    }
}
