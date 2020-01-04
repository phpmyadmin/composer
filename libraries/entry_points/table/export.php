<?php
/**
 * @package PhpMyAdmin
 */
declare(strict_types=1);

use PhpMyAdmin\Controllers\Table\ExportController;

if (! defined('PHPMYADMIN')) {
    exit;
}

global $containerBuilder;

/** @var ExportController $controller */
$controller = $containerBuilder->get(ExportController::class);
$controller->index();
