<?php
/**
 * Abstract class for the substring transformations plugins
 */

declare(strict_types=1);

namespace PhpMyAdmin\Plugins\Transformations\Abs;

use PhpMyAdmin\Config;
use PhpMyAdmin\FieldMetadata;
use PhpMyAdmin\Plugins\TransformationsPlugin;

use function __;
use function htmlspecialchars;
use function mb_strlen;
use function mb_substr;

/**
 * Provides common methods for all of the substring transformations plugins.
 */
abstract class SubstringTransformationsPlugin extends TransformationsPlugin
{
    /**
     * Gets the transformation description of the specific plugin
     */
    public static function getInfo(): string
    {
        return __(
            'Displays a part of a string. The first option is the number of'
            . ' characters to skip from the beginning of the string (Default 0).'
            . ' The second option is the number of characters to return (Default:'
            . ' until end of string). The third option is the string to append'
            . ' and/or prepend when truncation occurs (Default: "…").',
        );
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
        // possibly use a global transform and feed it with special options

        // further operations on $buffer using the $options[] array.
        $cfg = Config::getInstance()->settings;
        $options = $this->getOptions($options, $cfg['DefaultTransformations']['Substring']);

        $optionZero = (int) $options[0];

        if ($options[1] !== 'all') {
            $newtext = mb_substr($buffer, $optionZero, (int) $options[1]);
        } else {
            $newtext = mb_substr($buffer, $optionZero);
        }

        $length = mb_strlen($newtext);
        $baselength = mb_strlen($buffer);
        if ($length !== $baselength) {
            if ($optionZero !== 0) {
                $newtext = $options[2] . $newtext;
            }

            if ($length + $optionZero !== $baselength) {
                $newtext .= $options[2];
            }
        }

        return htmlspecialchars($newtext);
    }

    /* ~~~~~~~~~~~~~~~~~~~~ Getters and Setters ~~~~~~~~~~~~~~~~~~~~ */

    /**
     * Gets the transformation name of the specific plugin
     */
    public static function getName(): string
    {
        return 'Substring';
    }
}
