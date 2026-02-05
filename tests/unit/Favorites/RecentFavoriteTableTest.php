<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Favorites;

use PhpMyAdmin\Favorites\RecentFavoriteTable;
use PhpMyAdmin\Identifiers\DatabaseName;
use PhpMyAdmin\Identifiers\InvalidDatabaseName;
use PhpMyAdmin\Identifiers\InvalidTableName;
use PhpMyAdmin\Identifiers\TableName;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;

use function json_encode;

#[CoversClass(RecentFavoriteTable::class)]
final class RecentFavoriteTableTest extends TestCase
{
    public function testRecentFavoriteTable(): void
    {
        $recentFavoriteTable = new RecentFavoriteTable(DatabaseName::from('test_db'), TableName::from('test_table'));
        self::assertEquals(
            $recentFavoriteTable,
            RecentFavoriteTable::fromArray(['table' => 'test_table', 'db' => 'test_db']),
        );
        self::assertSame('test_db', $recentFavoriteTable->db->getName());
        self::assertSame('test_table', $recentFavoriteTable->table->getName());
        self::assertSame(['db' => 'test_db', 'table' => 'test_table'], $recentFavoriteTable->toArray());
        self::assertSame('{"db":"test_db","table":"test_table"}', json_encode($recentFavoriteTable));
    }

    public function testFromArrayWithInvalidDatabase(): void
    {
        self::expectException(InvalidDatabaseName::class);
        RecentFavoriteTable::fromArray(['db' => 'test_db ', 'table' => 'test_table']);
    }

    public function testFromArrayWithInvalidTable(): void
    {
        self::expectException(InvalidTableName::class);
        RecentFavoriteTable::fromArray(['db' => 'test_db', 'table' => 'test_table ']);
    }
}
