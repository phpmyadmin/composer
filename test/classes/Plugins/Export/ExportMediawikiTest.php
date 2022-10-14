<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Plugins\Export;

use PhpMyAdmin\DatabaseInterface;
use PhpMyAdmin\Plugins\Export\ExportMediawiki;
use PhpMyAdmin\Properties\Options\Groups\OptionsPropertyMainGroup;
use PhpMyAdmin\Properties\Options\Groups\OptionsPropertyRootGroup;
use PhpMyAdmin\Properties\Options\Groups\OptionsPropertySubgroup;
use PhpMyAdmin\Properties\Options\Items\BoolPropertyItem;
use PhpMyAdmin\Properties\Options\Items\RadioPropertyItem;
use PhpMyAdmin\Properties\Plugins\ExportPluginProperties;
use PhpMyAdmin\Tests\AbstractTestCase;
use ReflectionMethod;
use ReflectionProperty;

use function __;
use function array_shift;
use function ob_get_clean;
use function ob_start;

/**
 * @covers \PhpMyAdmin\Plugins\Export\ExportMediawiki
 * @group medium
 */
class ExportMediawikiTest extends AbstractTestCase
{
    /** @var ExportMediawiki */
    protected $object;

    /**
     * Configures global environment.
     */
    protected function setUp(): void
    {
        parent::setUp();
        $GLOBALS['server'] = 0;
        $GLOBALS['output_kanji_conversion'] = false;
        $GLOBALS['output_charset_conversion'] = false;
        $GLOBALS['buffer_needed'] = false;
        $GLOBALS['asfile'] = true;
        $GLOBALS['save_on_server'] = false;
        $GLOBALS['db'] = '';
        $GLOBALS['table'] = '';
        $GLOBALS['lang'] = 'en';
        $GLOBALS['text_dir'] = 'ltr';
        $GLOBALS['PMA_PHP_SELF'] = '';
        $this->object = new ExportMediawiki();
    }

    /**
     * tearDown for test cases
     */
    protected function tearDown(): void
    {
        parent::tearDown();
        unset($this->object);
    }

    public function testSetProperties(): void
    {
        $method = new ReflectionMethod(ExportMediawiki::class, 'setProperties');
        $method->setAccessible(true);
        $method->invoke($this->object, null);

        $attrProperties = new ReflectionProperty(ExportMediawiki::class, 'properties');
        $attrProperties->setAccessible(true);
        $properties = $attrProperties->getValue($this->object);

        $this->assertInstanceOf(ExportPluginProperties::class, $properties);

        $this->assertEquals(
            'MediaWiki Table',
            $properties->getText()
        );

        $this->assertEquals(
            'mediawiki',
            $properties->getExtension()
        );

        $this->assertEquals(
            'text/plain',
            $properties->getMimeType()
        );

        $this->assertEquals(
            'Options',
            $properties->getOptionsText()
        );

        $options = $properties->getOptions();

        $this->assertInstanceOf(OptionsPropertyRootGroup::class, $options);

        $this->assertEquals(
            'Format Specific Options',
            $options->getName()
        );

        $generalOptionsArray = $options->getProperties();
        $generalOptions = $generalOptionsArray[0];

        $this->assertInstanceOf(OptionsPropertyMainGroup::class, $generalOptions);

        $this->assertEquals(
            'general_opts',
            $generalOptions->getName()
        );

        $this->assertEquals(
            'Dump table',
            $generalOptions->getText()
        );

        $generalProperties = $generalOptions->getProperties();

        $property = array_shift($generalProperties);

        $this->assertInstanceOf(OptionsPropertySubgroup::class, $property);

        $this->assertEquals(
            'dump_table',
            $property->getName()
        );

        $this->assertEquals(
            'Dump table',
            $property->getText()
        );

        $sgHeader = $property->getSubgroupHeader();

        $this->assertInstanceOf(RadioPropertyItem::class, $sgHeader);

        $this->assertEquals(
            'structure_or_data',
            $sgHeader->getName()
        );

        $this->assertEquals(
            [
                'structure' => __('structure'),
                'data' => __('data'),
                'structure_and_data' => __('structure and data'),
            ],
            $sgHeader->getValues()
        );

        $property = array_shift($generalProperties);

        $this->assertInstanceOf(BoolPropertyItem::class, $property);

        $this->assertEquals(
            'caption',
            $property->getName()
        );

        $this->assertEquals(
            'Export table names',
            $property->getText()
        );

        $property = array_shift($generalProperties);

        $this->assertInstanceOf(BoolPropertyItem::class, $property);

        $this->assertEquals(
            'headers',
            $property->getName()
        );

        $this->assertEquals(
            'Export table headers',
            $property->getText()
        );
    }

    public function testExportHeader(): void
    {
        $this->assertTrue(
            $this->object->exportHeader()
        );
    }

    public function testExportFooter(): void
    {
        $this->assertTrue(
            $this->object->exportFooter()
        );
    }

    public function testExportDBHeader(): void
    {
        $this->assertTrue(
            $this->object->exportDBHeader('testDB')
        );
    }

    public function testExportDBFooter(): void
    {
        $this->assertTrue(
            $this->object->exportDBFooter('testDB')
        );
    }

    public function testExportDBCreate(): void
    {
        $this->assertTrue(
            $this->object->exportDBCreate('testDB', 'database')
        );
    }

    /**
     * Test for ExportMediaWiki::exportStructure
     */
    public function testExportStructure(): void
    {
        $dbi = $this->getMockBuilder(DatabaseInterface::class)
            ->disableOriginalConstructor()
            ->getMock();

        $columns = [
            [
                'Null' => 'Yes',
                'Field' => 'name1',
                'Key' => 'PRI',
                'Type' => 'set(abc)enum123',
                'Default' => '',
                'Extra' => '',
            ],
            [
                'Null' => 'NO',
                'Field' => 'fields',
                'Key' => 'COMP',
                'Type' => '',
                'Default' => 'def',
                'Extra' => 'ext',
            ],
        ];

        $dbi->expects($this->once())
            ->method('getColumns')
            ->with('db', 'table')
            ->will($this->returnValue($columns));

        $GLOBALS['dbi'] = $dbi;
        $GLOBALS['mediawiki_caption'] = true;
        $GLOBALS['mediawiki_headers'] = true;

        ob_start();
        $this->assertTrue(
            $this->object->exportStructure(
                'db',
                'table',
                "\n",
                'example.com',
                'create_table',
                'test'
            )
        );
        $result = ob_get_clean();

        $this->assertEquals(
            "\n<!--\n" .
            "Table structure for `table`\n" .
            "-->\n" .
            "\n" .
            "{| class=\"wikitable\" style=\"text-align:center;\"\n" .
            "|+'''table'''\n" .
            "|- style=\"background:#ffdead;\"\n" .
            "! style=\"background:#ffffff\" | \n" .
            " | name1\n" .
            " | fields\n" .
            "|-\n" .
            "! Type\n" .
            " | set(abc)enum123\n" .
            " | \n" .
            "|-\n" .
            "! Null\n" .
            " | Yes\n" .
            " | NO\n" .
            "|-\n" .
            "! Default\n" .
            " | \n" .
            " | def\n" .
            "|-\n" .
            "! Extra\n" .
            " | \n" .
            " | ext\n" .
            "|}\n\n",
            $result
        );
    }

    public function testExportData(): void
    {
        $GLOBALS['mediawiki_caption'] = true;
        $GLOBALS['mediawiki_headers'] = true;

        ob_start();
        $this->assertTrue(
            $this->object->exportData(
                'test_db',
                'test_table',
                "\n",
                'localhost',
                'SELECT * FROM `test_db`.`test_table`;'
            )
        );
        $result = ob_get_clean();

        $this->assertEquals(
            "\n<!--\n" .
            "Table data for `test_table`\n" .
            "-->\n" .
            "\n" .
            '{| class="wikitable sortable" style="text-align:' .
            "center;\"\n" .
            "|+'''test_table'''\n" .
            "|-\n" .
            " ! id\n" .
            " ! name\n" .
            " ! datetimefield\n" .
            "|-\n" .
            " | 1\n" .
            " | abcd\n" .
            " | 2011-01-20 02:00:02\n" .
            "|-\n" .
            " | 2\n" .
            " | foo\n" .
            " | 2010-01-20 02:00:02\n" .
            "|-\n" .
            " | 3\n" .
            " | Abcd\n" .
            " | 2012-01-20 02:00:02\n" .
            "|}\n\n",
            $result
        );
    }
}
