<?php
/**
 * Properties class for the import plug-in
 */

declare(strict_types=1);

namespace PhpMyAdmin\Properties\Plugins;

/**
 * Defines possible options and getters and setters for them.
 */
class ImportPluginProperties extends PluginPropertyItem
{
    public function getForceFile(): bool
    {
        return true;
    }
}
