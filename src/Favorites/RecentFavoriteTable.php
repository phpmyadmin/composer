<?php

declare(strict_types=1);

namespace PhpMyAdmin\Favorites;

use JsonSerializable;
use PhpMyAdmin\Identifiers\DatabaseName;
use PhpMyAdmin\Identifiers\TableName;

final readonly class RecentFavoriteTable implements JsonSerializable
{
    public function __construct(public DatabaseName $db, public TableName $table)
    {
    }

    /** @param array{db: non-empty-string, table: non-empty-string} $array */
    public static function fromArray(array $array): self
    {
        return new self(DatabaseName::from($array['db']), TableName::from($array['table']));
    }

    /** @return array{db: non-empty-string, table: non-empty-string} */
    public function toArray(): array
    {
        return ['db' => $this->db->getName(), 'table' => $this->table->getName()];
    }

    /** @return array{db: non-empty-string, table: non-empty-string} */
    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}
