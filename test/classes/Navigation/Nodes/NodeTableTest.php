<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Navigation\Nodes;

use PhpMyAdmin\Navigation\NodeFactory;
use PhpMyAdmin\Tests\AbstractTestCase;

class NodeTableTest extends AbstractTestCase
{
    /**
     * SetUp for test cases
     */
    protected function setUp(): void
    {
        parent::setUp();
        parent::loadDefaultConfig();

        $GLOBALS['server'] = 0;
        $GLOBALS['cfg']['NavigationTreeDefaultTabTable'] = 'b_browse';
        $GLOBALS['cfg']['NavigationTreeDefaultTabTable2'] = '';
        $GLOBALS['cfg']['DefaultTabTable'] = 'browse';
        $GLOBALS['cfg']['MaxNavigationItems'] = 250;
        $GLOBALS['cfg']['NavigationTreeEnableGrouping'] = true;
        $GLOBALS['cfg']['NavigationTreeDbSeparator'] = '_';
        $GLOBALS['cfg']['NavigationTreeTableSeparator'] = '__';
        $GLOBALS['cfg']['NavigationTreeTableLevel'] = 1;
    }

    /**
     * Test for __construct
     */
    public function testConstructor(): void
    {
        $parent = NodeFactory::getInstance('NodeTable');
        $this->assertArrayHasKey(
            'text',
            $parent->links
        );
        $this->assertStringContainsString(
            'index.php?route=/sql',
            $parent->links['text']
        );
        $this->assertStringContainsString('table', $parent->classes);
    }

    /**
     * Tests whether the node icon is properly set based on the icon target.
     *
     * @param string $target    target of the icon
     * @param string $imageName name of the image that should be set
     *
     * @dataProvider providerForTestIcon
     */
    public function testIcon(string $target, string $imageName, string $imageTitle): void
    {
        $GLOBALS['cfg']['NavigationTreeDefaultTabTable'] = $target;
        $node = NodeFactory::getInstance('NodeTable');
        $this->assertEquals($imageName, $node->icon['image']);
        $this->assertEquals($imageTitle, $node->icon['title']);
    }

    /**
     * Data provider for testIcon().
     *
     * @return array data for testIcon()
     */
    public function providerForTestIcon(): array
    {
        return [
            ['structure', 'b_props', 'Structure'],
            ['search', 'b_search', 'Search'],
            ['insert', 'b_insrow', 'Insert'],
            ['sql', 'b_sql', 'SQL'],
            ['browse', 'b_browse', 'Browse'],
        ];
    }
}
