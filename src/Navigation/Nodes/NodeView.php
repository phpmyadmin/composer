<?php
/**
 * Functionality for the navigation tree
 */

declare(strict_types=1);

namespace PhpMyAdmin\Navigation\Nodes;

use PhpMyAdmin\Config;

use function __;

/**
 * Represents a view node in the navigation tree
 */
class NodeView extends NodeDatabaseChild
{
    /** @param string $name An identifier for the new node */
    public function __construct(Config $config, string $name)
    {
        parent::__construct($config, $name);

        $this->icon = new Icon('b_props', __('View'), '/table/structure', ['db' => null, 'table' => null]);
        $this->link = new Link(
            '',
            '/sql',
            ['pos' => 0, 'db' => null, 'table' => null],
        );
        $this->classes = 'view';
        $this->urlParamName = 'table';
    }

    /**
     * Returns the type of the item represented by the node.
     *
     * @return string type of the item
     */
    protected function getItemType(): string
    {
        return 'view';
    }
}
