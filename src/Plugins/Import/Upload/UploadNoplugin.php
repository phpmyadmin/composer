<?php
/**
 * Provides upload functionalities for the import plugins
 */

declare(strict_types=1);

namespace PhpMyAdmin\Plugins\Import\Upload;

use PhpMyAdmin\Import\Ajax;
use PhpMyAdmin\Plugins\UploadInterface;

use function array_key_exists;
use function trim;

/**
 * Implementation for no plugin
 */
class UploadNoplugin implements UploadInterface
{
    /**
     * Gets the specific upload ID Key
     *
     * @return string ID Key
     */
    public static function getIdKey(): string
    {
        return 'noplugin';
    }

    /**
     * Returns upload status.
     *
     * This is implementation when no webserver support exists,
     * so it returns just zeroes.
     *
     * @param string $id upload id
     */
    public static function getUploadStatus(string $id): array|null
    {
        if (trim($id) == '') {
            return null;
        }

        if (! array_key_exists($id, $_SESSION[Ajax::SESSION_KEY])) {
            $_SESSION[Ajax::SESSION_KEY][$id] = [
                'id' => $id,
                'finished' => false,
                'percent' => 0,
                'total' => 0,
                'complete' => 0,
                'plugin' => self::getIdKey(),
            ];
        }

        return $_SESSION[Ajax::SESSION_KEY][$id];
    }
}
