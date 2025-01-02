<?php
/**
 * Form handling code.
 */

declare(strict_types=1);

namespace PhpMyAdmin\Config;

use PhpMyAdmin\Exceptions\UndefinedOption;
use Webmozart\Assert\Assert;

use function array_combine;
use function array_shift;
use function array_walk;
use function count;
use function gettype;
use function is_array;
use function is_bool;
use function is_int;
use function is_string;
use function ltrim;
use function mb_strrpos;
use function mb_substr;
use function str_replace;
use function str_starts_with;

/**
 * Base class for forms, loads default configuration options, checks allowed
 * values etc.
 */
class Form
{
    /**
     * Form name
     */
    public string $name;

    /**
     * Form fields (paths), filled by {@link readFormPaths()}, indexed by field name
     *
     * @var string[]
     */
    public array $fields = [];

    /**
     * Stores default values for some fields (eg. pmadb tables)
     *
     * @var mixed[]
     */
    public array $default = [];

    /**
     * Caches field types, indexed by field names
     *
     * @var string[]
     */
    private array $fieldsTypes = [];

    /**
     * A counter for the number of groups
     */
    private static int $groupCounter = 0;

    /**
     * Reads default config values
     *
     * @param string     $formName   Form name
     * @param mixed[]    $form       Form data
     * @param ConfigFile $configFile ConfigFile instance
     * @param int|null   $index      Arbitrary index, doesn't affect class' behavior
     */
    public function __construct(
        string $formName,
        array $form,
        private ConfigFile $configFile,
        public int|null $index = null,
    ) {
        $this->loadForm($formName, $form);
    }

    /**
     * Returns type of given option
     *
     * @param string $optionName path or field name
     *
     * @return string one of: boolean, integer, double, string, select, array
     */
    public function getOptionType(string $optionName): string
    {
        $key = ltrim(
            mb_substr(
                $optionName,
                (int) mb_strrpos($optionName, '/'),
            ),
            '/',
        );

        return $this->fieldsTypes[$key] ?? '';
    }

    /**
     * Returns allowed values for select fields
     *
     * @param string $optionPath Option path
     *
     * @return mixed[]
     */
    public function getOptionValueList(string $optionPath): array
    {
        $value = $this->configFile->getDbEntry($optionPath);
        if ($value === null) {
            throw new UndefinedOption($optionPath . ' - select options not defined');
        }

        Assert::isArray($value, $optionPath . ' - not a static value list');

        // convert array('#', 'a', 'b') to array('a', 'b')
        if (isset($value[0]) && $value[0] === '#') {
            // remove first element ('#')
            array_shift($value);

            // $value has keys and value names, return it
            return $value;
        }

        // convert value list array('a', 'b') to array('a' => 'a', 'b' => 'b')
        $hasStringKeys = false;
        $keys = [];
        for ($i = 0, $nb = count($value); $i < $nb; $i++) {
            if (! isset($value[$i])) {
                $hasStringKeys = true;
                break;
            }

            $keys[] = is_bool($value[$i]) ? (int) $value[$i] : $value[$i];
        }

        if (! $hasStringKeys) {
            /** @var array $value */
            $value = array_combine($keys, $value);
        }

        // $value has keys and value names, return it
        return $value;
    }

    /**
     * array_walk callback function, reads path of form fields from
     * array (see docs for \PhpMyAdmin\Config\Forms\BaseForm::getForms)
     *
     * @param mixed $value  Value
     * @param mixed $key    Key
     * @param mixed $prefix Prefix
     */
    private function readFormPathsCallback(mixed $value, mixed $key, mixed $prefix): void
    {
        if (is_array($value)) {
            $prefix .= $key . '/';
            array_walk(
                $value,
                function ($value, $key, $prefix): void {
                    $this->readFormPathsCallback($value, $key, $prefix);
                },
                $prefix,
            );

            return;
        }

        if (! is_int($key)) {
            $this->default[$prefix . $key] = $value;
            $value = $key;
        }

        // add unique id to group ends
        if ($value === ':group:end') {
            $value .= ':' . self::$groupCounter++;
        }

        $this->fields[] = $prefix . $value;
    }

    /**
     * Reset the group counter, function for testing purposes
     */
    public static function resetGroupCounter(): void
    {
        self::$groupCounter = 0;
    }

    /**
     * Reads form paths to {@link $fields}
     *
     * @param mixed[] $form Form
     */
    protected function readFormPaths(array $form): void
    {
        // flatten form fields' paths and save them to $fields
        $this->fields = [];
        array_walk(
            $form,
            function ($value, $key, $prefix): void {
                $this->readFormPathsCallback($value, $key, $prefix);
            },
            '',
        );

        // $this->fields is an array of the form: [0..n] => 'field path'
        // change numeric indexes to contain field names (last part of the path)
        /** @var string[] $paths */
        $paths = $this->fields;
        $this->fields = [];
        foreach ($paths as $path) {
            $key = ltrim(
                mb_substr($path, (int) mb_strrpos($path, '/')),
                '/',
            );
            $this->fields[$key] = $path;
        }
        // now $this->fields is an array of the form: 'field name' => 'field path'
    }

    /**
     * Reads fields' types to $this->fieldsTypes
     */
    protected function readTypes(): void
    {
        foreach ($this->fields as $name => $path) {
            if (str_starts_with((string) $name, ':group:')) {
                $this->fieldsTypes[$name] = 'group';
                continue;
            }

            $v = $this->configFile->getDbEntry($path);
            if ($v !== null) {
                $type = is_array($v) ? 'select' : $v;
            } else {
                $type = gettype($this->configFile->getDefault($path));
            }

            $this->fieldsTypes[$name] = (string) $type;
        }
    }

    /**
     * Remove slashes from group names
     *
     * @see issue #15836
     *
     * @param mixed[] $form The form data
     *
     * @return mixed[]
     */
    protected function cleanGroupPaths(array $form): array
    {
        foreach ($form as &$name) {
            if (! is_string($name)) {
                continue;
            }

            if (! str_starts_with($name, ':group:')) {
                continue;
            }

            $name = str_replace('/', '-', $name);
        }

        return $form;
    }

    /**
     * Reads form settings and prepares class to work with given subset of
     * config file
     *
     * @param string  $formName Form name
     * @param mixed[] $form     Form
     */
    public function loadForm(string $formName, array $form): void
    {
        $this->name = $formName;
        $form = $this->cleanGroupPaths($form);
        $this->readFormPaths($form);
        $this->readTypes();
    }
}
