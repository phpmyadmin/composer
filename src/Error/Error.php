<?php

declare(strict_types=1);

namespace PhpMyAdmin\Error;

use PhpMyAdmin\Message;
use PhpMyAdmin\MessageType;
use PhpMyAdmin\Template;
use Throwable;

use function array_pop;
use function array_slice;
use function basename;
use function count;
use function debug_backtrace;
use function explode;
use function function_exists;
use function gettype;
use function htmlspecialchars;
use function implode;
use function in_array;
use function is_object;
use function is_scalar;
use function is_string;
use function mb_substr;
use function md5;
use function realpath;
use function serialize;
use function str_replace;
use function var_export;

use const DIRECTORY_SEPARATOR;
use const E_COMPILE_ERROR;
use const E_COMPILE_WARNING;
use const E_CORE_ERROR;
use const E_CORE_WARNING;
use const E_DEPRECATED;
use const E_ERROR;
use const E_NOTICE;
use const E_PARSE;
use const E_RECOVERABLE_ERROR;
use const E_USER_DEPRECATED;
use const E_USER_ERROR;
use const E_USER_NOTICE;
use const E_USER_WARNING;
use const E_WARNING;
use const PATH_SEPARATOR;

/**
 * a single error
 */
class Error extends Message
{
    /**
     * The file in which the error occurred
     */
    protected string $file = '';

    /**
     * The line in which the error occurred
     */
    protected int $line = 0;

    /**
     * Holds the backtrace for this error
     *
     * @var mixed[]
     */
    protected array $backtrace = [];

    /**
     * Hide location of errors
     */
    protected bool $hideLocation = false;

    /**
     * @param string $errstr  error message
     * @param string $errfile file
     * @param int    $errline line
     */
    public function __construct(private int $errorNumber, string $errstr, string $errfile, int $errline)
    {
        parent::__construct();

        $this->setMessage($errstr);
        $this->setFile($errfile);
        $this->setLine($errline);

        // This function can be disabled in php.ini
        if (function_exists('debug_backtrace')) {
            $backtrace = @debug_backtrace();
            // remove last three calls:
            // debug_backtrace(), handleError() and addError()
            $backtrace = array_slice($backtrace, 3);
        } else {
            $backtrace = [];
        }

        $this->setBacktrace($backtrace);
    }

    /**
     * Process backtrace to avoid path disclosures, objects and so on
     *
     * @param mixed[] $backtrace backtrace
     *
     * @return mixed[]
     */
    public static function processBacktrace(array $backtrace): array
    {
        $result = [];

        $members = ['line', 'function', 'class', 'type'];

        foreach ($backtrace as $idx => $step) {
            /* Create new backtrace entry */
            $result[$idx] = [];

            /* Make path relative */
            if (isset($step['file'])) {
                $result[$idx]['file'] = self::relPath($step['file']);
            }

            /* Store members we want */
            foreach ($members as $name) {
                if (! isset($step[$name])) {
                    continue;
                }

                $result[$idx][$name] = $step[$name];
            }

            /* Store simplified args */
            if (! isset($step['args'])) {
                continue;
            }

            foreach ($step['args'] as $key => $arg) {
                $result[$idx]['args'][$key] = self::getArg($arg, $step['function']);
            }
        }

        return $result;
    }

    /**
     * Toggles location hiding
     *
     * @param bool $hide Whether to hide
     */
    public function setHideLocation(bool $hide): void
    {
        $this->hideLocation = $hide;
    }

    /**
     * sets PhpMyAdmin\Error\Error::$_backtrace
     *
     * We don't store full arguments to avoid wakeup or memory problems.
     *
     * @param mixed[] $backtrace backtrace
     */
    public function setBacktrace(array $backtrace): void
    {
        $this->backtrace = self::processBacktrace($backtrace);
    }

    /**
     * sets PhpMyAdmin\Error\Error::$_line
     *
     * @param int $line the line
     */
    public function setLine(int $line): void
    {
        $this->line = $line;
    }

    /**
     * sets PhpMyAdmin\Error\Error::$_file
     *
     * @param string $file the file
     */
    public function setFile(string $file): void
    {
        $this->file = self::relPath($file);
    }

    /**
     * returns unique PhpMyAdmin\Error\Error::$hash, if not exists it will be created
     *
     * @return string PhpMyAdmin\Error\Error::$hash
     */
    public function getHash(): string
    {
        try {
            $backtrace = serialize($this->getBacktrace());
        } catch (Throwable) {
            $backtrace = '';
        }

        if ($this->hash === null) {
            $this->hash = md5(
                $this->errorNumber .
                $this->getMessage() .
                $this->getFile() .
                $this->getLine() .
                $backtrace,
            );
        }

        return $this->hash;
    }

    /**
     * returns PhpMyAdmin\Error\Error::$_backtrace for first $count frames
     * pass $count = -1 to get full backtrace.
     * The same can be done by not passing $count at all.
     *
     * @param int $count Number of stack frames.
     *
     * @return mixed[] PhpMyAdmin\Error\Error::$_backtrace
     */
    public function getBacktrace(int $count = -1): array
    {
        if ($count !== -1) {
            return array_slice($this->backtrace, 0, $count);
        }

        return $this->backtrace;
    }

    /**
     * returns PhpMyAdmin\Error\Error::$file
     *
     * @return string PhpMyAdmin\Error\Error::$file
     */
    public function getFile(): string
    {
        return $this->file;
    }

    /**
     * returns PhpMyAdmin\Error\Error::$line
     *
     * @return int PhpMyAdmin\Error\Error::$line
     */
    public function getLine(): int
    {
        return $this->line;
    }

    /**
     * returns type of error
     *
     * @return string type of error
     */
    public function getType(): string
    {
        return match ($this->errorNumber) {
            default => 'Internal error',
            E_ERROR => 'Error',
            E_WARNING => 'Warning',
            E_PARSE => 'Parsing Error',
            E_NOTICE => 'Notice',
            E_CORE_ERROR => 'Core Error',
            E_CORE_WARNING => 'Core Warning',
            E_COMPILE_ERROR => 'Compile Error',
            E_COMPILE_WARNING => 'Compile Warning',
            E_USER_ERROR => 'User Error',
            E_USER_WARNING => 'User Warning',
            E_USER_NOTICE => 'User Notice',
            2048 => 'Runtime Notice', // E_STRICT
            E_DEPRECATED => 'Deprecation Notice',
            E_USER_DEPRECATED => 'Deprecation Notice',
            E_RECOVERABLE_ERROR => 'Catchable Fatal Error',
        };
    }

    protected function getLevel(): MessageType
    {
        return match ($this->errorNumber) {
            default => MessageType::Error,
            E_NOTICE,
            E_USER_NOTICE,
            2048, // E_STRICT
            E_DEPRECATED,
            E_USER_DEPRECATED => MessageType::Notice,
        };
    }

    /**
     * returns title prepared for HTML Title-Tag
     *
     * @return string HTML escaped and truncated title
     */
    public function getHtmlTitle(): string
    {
        return htmlspecialchars(
            mb_substr($this->getTitle(), 0, 100),
        );
    }

    /**
     * returns title for error
     */
    public function getTitle(): string
    {
        return $this->getType() . ': ' . $this->getMessage();
    }

    /**
     * Get HTML backtrace
     */
    public function getBacktraceDisplay(): string
    {
        return self::formatBacktrace($this->getBacktrace());
    }

    /**
     * return formatted backtrace field
     *
     * @param mixed[] $backtrace Backtrace data
     *
     * @return string formatted backtrace
     */
    public static function formatBacktrace(array $backtrace): string
    {
        if ($backtrace === []) {
            return '';
        }

        $retval = '<ol class="list-group">';

        foreach ($backtrace as $step) {
            $retval .= '<li class="list-group-item">';
            if (isset($step['file'], $step['line'])) {
                $retval .= self::relPath($step['file']) . '#' . $step['line'] . ': ';
            }

            if (isset($step['class'])) {
                $retval .= $step['class'] . $step['type'];
            }

            $retval .= self::getFunctionCall($step);
            $retval .= '</li>';
        }

        return $retval . '</ol>';
    }

    /**
     * Formats function call in a backtrace
     *
     * @param mixed[] $step backtrace step
     */
    public static function getFunctionCall(array $step): string
    {
        $retval = $step['function'] . '(';
        if (isset($step['args'])) {
            if (count($step['args']) > 1) {
                $retval .= '<br>';
                foreach ($step['args'] as $arg) {
                    $retval .= "\t";
                    $retval .= $arg;
                    $retval .= ',<br>';
                }
            } elseif (count($step['args']) > 0) {
                foreach ($step['args'] as $arg) {
                    $retval .= $arg;
                }
            }
        }

        return $retval . ')';
    }

    /**
     * Get a single function argument
     *
     * if $function is one of include/require
     * the $arg is converted to a relative path
     *
     * @param mixed  $arg      argument to process
     * @param string $function function name
     *
     * @infection-ignore-all
     */
    public static function getArg(mixed $arg, string $function): string
    {
        $retval = '';
        $includeFunctions = ['include', 'include_once', 'require', 'require_once'];
        $connectFunctions = [
            'mysql_connect',
            'mysql_pconnect',
            'mysqli_connect',
            'mysqli_real_connect',
            'connect',
            '_realConnect',
        ];

        if (in_array($function, $includeFunctions, true) && is_string($arg)) {
            $retval .= self::relPath($arg);
        } elseif (in_array($function, $connectFunctions, true) && is_string($arg)) {
            $retval .= gettype($arg) . ' ********';
        } elseif (is_scalar($arg)) {
            $retval .= gettype($arg) . ' '
                . htmlspecialchars(var_export($arg, true));
        } elseif (is_object($arg)) {
            $retval .= '<Class:' . $arg::class . '>';
        } else {
            $retval .= gettype($arg);
        }

        return $retval;
    }

    /**
     * Gets the error as string of HTML
     */
    public function getDisplay(): string
    {
        $this->isDisplayed(true);

        $template = new Template();

        return $template->render('error/get_display', [
            'context' => $this->getLevel() === MessageType::Error ? 'danger' : 'primary',
            'is_user_error' => $this->isUserError(),
            'type' => $this->getType(),
            'file' => $this->getFile(),
            'line' => $this->getLine(),
            'message' => $this->getMessage(),
            'formatted_backtrace' => $this->getBacktraceDisplay(),
        ]);
    }

    /**
     * whether this error is a user error
     */
    public function isUserError(): bool
    {
        return $this->hideLocation
            || ($this->errorNumber & (E_USER_WARNING | E_USER_ERROR | E_USER_NOTICE | E_USER_DEPRECATED));
    }

    public function getErrorNumber(): int
    {
        return $this->errorNumber;
    }

    /**
     * return short relative path to phpMyAdmin basedir
     *
     * prevent path disclosure in error message,
     * and make users feel safe to submit error reports
     *
     * @param string $path path to be shorten
     *
     * @return string shortened path
     */
    public static function relPath(string $path): string
    {
        $dest = @realpath($path);

        /* Probably affected by open_basedir */
        if ($dest === false) {
            return basename($path);
        }

        $hereParts = explode(
            DIRECTORY_SEPARATOR,
            (string) realpath(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..'),
        );
        $destParts = explode(DIRECTORY_SEPARATOR, $dest);

        $result = '.';
        /** @infection-ignore-all */
        while (implode(DIRECTORY_SEPARATOR, $destParts) !== implode(DIRECTORY_SEPARATOR, $hereParts)) {
            if (count($hereParts) > count($destParts)) {
                array_pop($hereParts);
                $result .= DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..';
            } else {
                array_pop($destParts);
            }
        }

        $path = $result . str_replace(implode(DIRECTORY_SEPARATOR, $destParts), '', $dest);

        return str_replace(DIRECTORY_SEPARATOR . PATH_SEPARATOR, DIRECTORY_SEPARATOR, $path);
    }
}
