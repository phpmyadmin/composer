<?php
/**
 * Extension independent database result interface
 */

declare(strict_types=1);

namespace PhpMyAdmin\Dbal;

use Generator;
use IteratorAggregate;
use PhpMyAdmin\FieldMetadata;

/**
 * Extension independent database result interface
 *
 * @extends IteratorAggregate<array<array-key, (string|null)>>
 */
interface ResultInterface extends IteratorAggregate
{
    /**
     * Returns a generator that traverses through the whole result set
     * and returns each row as an associative array
     *
     * @psalm-return Generator<int, array<array-key, string|null>, mixed, void>
     */
    public function getIterator(): Generator;

    /**
     * Returns the next row of the result with associative keys
     *
     * @return array<string|null>
     * @psalm-return array<array-key, string|null>
     */
    public function fetchAssoc(): array;

    /**
     * Returns the next row of the result with numeric keys
     *
     * @return array<int,string|null>
     * @psalm-return list<string|null>
     */
    public function fetchRow(): array;

    /**
     * Returns a single value from the given result; false on error
     */
    public function fetchValue(int|string $field = 0): string|false|null;

    /**
     * Returns all rows of the result
     *
     * @return array<int, array<string|null>>
     * @psalm-return list<array<array-key, string|null>>
     */
    public function fetchAllAssoc(): array;

    /**
     * Returns values from the selected column of each row
     *
     * @return array<int, string|null>
     * @psalm-return list<string|null>
     */
    public function fetchAllColumn(int|string $column = 0): array;

    /**
     * Returns values as single dimensional array where the key is the first column
     * and the value is the second column,
     * e.g. "SELECT id, name FROM users"
     * produces: ['123' => 'John', '124' => 'Jane']
     *
     * @return array<string|null>
     * @psalm-return array<array-key, string|null>
     */
    public function fetchAllKeyPair(): array;

    /**
     * Returns the number of fields in the result
     */
    public function numFields(): int;

    /**
     * Returns the number of rows in the result
     *
     * @psalm-return int|numeric-string
     */
    public function numRows(): string|int;

    /**
     * Adjusts the result pointer to an arbitrary row in the result
     *
     * @param int $offset offset to seek
     *
     * @return bool True if the offset exists, false otherwise
     */
    public function seek(int $offset): bool;

    /**
     * Returns meta info for fields in $result
     *
     * @return list<FieldMetadata> meta info for fields in $result
     */
    public function getFieldsMeta(): array;

    /**
     * Returns the names of the fields in the result
     *
     * @return list<string> Fields names
     */
    public function getFieldNames(): array;
}
