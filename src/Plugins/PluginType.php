<?php

declare(strict_types=1);

namespace PhpMyAdmin\Plugins;

enum PluginType: string
{
    case Export = 'Export';
    case Import = 'Import';
    case Schema = 'Schema';
}
