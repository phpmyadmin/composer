<?php
/**
 * Text Plain XML Transformations plugin for phpMyAdmin
 */

declare(strict_types=1);

namespace PhpMyAdmin\Plugins\Transformations\Output;

use PhpMyAdmin\Config;
use PhpMyAdmin\FieldMetadata;
use PhpMyAdmin\Plugins\TransformationsPlugin;
use PhpMyAdmin\ResponseRenderer;

use function __;
use function htmlspecialchars;

/**
 * Handles the XML transformation for text plain
 */
class Text_Plain_Xml extends TransformationsPlugin
{
    public function __construct()
    {
        if (empty(Config::getInstance()->settings['CodemirrorEnable'])) {
            return;
        }

        $response = ResponseRenderer::getInstance();
        $scripts = $response->getHeader()
            ->getScripts();
        $scripts->addFile('vendor/codemirror/lib/codemirror.js');
        $scripts->addFile('vendor/codemirror/mode/xml/xml.js');
        $scripts->addFile('vendor/codemirror/addon/runmode/runmode.js');
        $scripts->addFile('transformations/xml.js');
    }

    /**
     * Gets the transformation description of the specific plugin
     */
    public static function getInfo(): string
    {
        return __('Formats text as XML with syntax highlighting.');
    }

    /**
     * Does the actual work of each specific transformations plugin.
     *
     * @param string             $buffer  text to be transformed
     * @param mixed[]            $options transformation options
     * @param FieldMetadata|null $meta    meta information
     */
    public function applyTransformation(string $buffer, array $options = [], FieldMetadata|null $meta = null): string
    {
        return '<pre><code class="xml">' . htmlspecialchars($buffer) . '</code></pre>';
    }

    /* ~~~~~~~~~~~~~~~~~~~~ Getters and Setters ~~~~~~~~~~~~~~~~~~~~ */

    /**
     * Gets the plugin`s MIME type
     */
    public static function getMIMEType(): string
    {
        return 'Text';
    }

    /**
     * Gets the plugin`s MIME subtype
     */
    public static function getMIMESubtype(): string
    {
        return 'Plain';
    }

    /**
     * Gets the transformation name of the specific plugin
     */
    public static function getName(): string
    {
        return 'XML';
    }
}
