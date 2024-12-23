<?php
/**
 * PDF schema export code
 */

declare(strict_types=1);

namespace PhpMyAdmin\Plugins\Schema;

use PhpMyAdmin\ConfigStorage\Relation;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Identifiers\DatabaseName;
use PhpMyAdmin\Plugins\Schema\Eps\EpsRelationSchema;
use PhpMyAdmin\Plugins\SchemaPlugin;
use PhpMyAdmin\Properties\Options\Groups\OptionsPropertyMainGroup;
use PhpMyAdmin\Properties\Options\Groups\OptionsPropertyRootGroup;
use PhpMyAdmin\Properties\Options\Items\BoolPropertyItem;
use PhpMyAdmin\Properties\Options\Items\SelectPropertyItem;
use PhpMyAdmin\Properties\Plugins\SchemaPluginProperties;

use function __;

/**
 * Handles the schema export for the EPS format
 */
class SchemaEps extends SchemaPlugin
{
    /** @psalm-return non-empty-lowercase-string */
    public function getName(): string
    {
        return 'eps';
    }

    /**
     * Sets the schema export EPS properties
     */
    protected function setProperties(): SchemaPluginProperties
    {
        $schemaPluginProperties = new SchemaPluginProperties();
        $schemaPluginProperties->setText('EPS');
        $schemaPluginProperties->setExtension('eps');
        $schemaPluginProperties->setMimeType('application/eps');

        // create the root group that will be the options field for
        // $schemaPluginProperties
        // this will be shown as "Format specific options"
        $exportSpecificOptions = new OptionsPropertyRootGroup('Format Specific Options');

        // specific options main group
        $specificOptions = new OptionsPropertyMainGroup('general_opts');
        // add options common to all plugins
        $this->addCommonOptions($specificOptions);

        // create leaf items and add them to the group
        $leaf = new BoolPropertyItem(
            'all_tables_same_width',
            __('Same width for all tables'),
        );
        $specificOptions->addProperty($leaf);

        $leaf = new SelectPropertyItem(
            'orientation',
            __('Orientation'),
        );
        $leaf->setValues(
            ['L' => __('Landscape'), 'P' => __('Portrait')],
        );
        $specificOptions->addProperty($leaf);

        // add the main group to the root group
        $exportSpecificOptions->addProperty($specificOptions);

        // set the options for the schema export plugin property item
        $schemaPluginProperties->setOptions($exportSpecificOptions);

        return $schemaPluginProperties;
    }

    /** @return array{fileName: non-empty-string, mediaType: non-empty-string, fileData: string} */
    public function getExportInfo(DatabaseName $db): array
    {
        $export = new EpsRelationSchema(new Relation(DatabaseInterface::getInstance()), $db);
        $exportInfo = $export->getExportInfo();

        return [
            'fileName' => $exportInfo['fileName'],
            'mediaType' => 'image/x-eps',
            'fileData' => $exportInfo['fileData'],
        ];
    }
}
