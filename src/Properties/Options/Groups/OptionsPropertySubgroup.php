<?php

declare(strict_types=1);

namespace PhpMyAdmin\Properties\Options\Groups;

use PhpMyAdmin\Properties\Options\OptionsPropertyGroup;
use PhpMyAdmin\Properties\Options\OptionsPropertyOneItem;

/**
 * Group property item class of type subgroup
 */
class OptionsPropertySubgroup extends OptionsPropertyGroup
{
    private OptionsPropertyOneItem|null $subgroupHeader = null;

    public function getSubgroupHeader(): OptionsPropertyOneItem|null
    {
        return $this->subgroupHeader;
    }

    public function setSubgroupHeader(OptionsPropertyOneItem $subgroupHeader): void
    {
        $this->subgroupHeader = $subgroupHeader;
    }
}
