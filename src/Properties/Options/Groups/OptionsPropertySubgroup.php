<?php

declare(strict_types=1);

namespace PhpMyAdmin\Properties\Options\Groups;

use PhpMyAdmin\Properties\Options\OptionsPropertyGroup;
use PhpMyAdmin\Properties\PropertyItem;

/**
 * Group property item class of type subgroup
 */
class OptionsPropertySubgroup extends OptionsPropertyGroup
{
    private PropertyItem|null $subgroupHeader = null;

    public function getSubgroupHeader(): PropertyItem|null
    {
        return $this->subgroupHeader;
    }

    public function setSubgroupHeader(PropertyItem $subgroupHeader): void
    {
        $this->subgroupHeader = $subgroupHeader;
    }
}
