<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Properties\Options\Groups;

use PhpMyAdmin\Properties\Options\Groups\OptionsPropertySubgroup;
use PhpMyAdmin\Properties\Options\Items\BoolPropertyItem;
use PhpMyAdmin\Tests\AbstractTestCase;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(OptionsPropertySubgroup::class)]
class OptionsPropertySubgroupTest extends AbstractTestCase
{
    protected OptionsPropertySubgroup $object;

    /**
     * Configures global environment.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->object = new OptionsPropertySubgroup();
    }

    /**
     * tearDown for test cases
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->object);
    }

    /**
     * Test for
     *     - PhpMyAdmin\Properties\Options\Groups\OptionsPropertySubgroup::getSubgroupHeader
     *     - PhpMyAdmin\Properties\Options\Groups\OptionsPropertySubgroup::setSubgroupHeader
     */
    public function testGetSetSubgroupHeader(): void
    {
        $propertyItem = new BoolPropertyItem();
        $this->object->setSubgroupHeader($propertyItem);

        self::assertSame(
            $propertyItem,
            $this->object->getSubgroupHeader(),
        );
    }
}
