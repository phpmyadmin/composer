<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Controllers;

use Fig\Http\Message\StatusCodeInterface;
use PhpMyAdmin\BrowseForeigners;
use PhpMyAdmin\Config;
use PhpMyAdmin\ConfigStorage\Relation;
use PhpMyAdmin\Controllers\BrowseForeignersController;
use PhpMyAdmin\Current;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Http\Factory\ServerRequestFactory;
use PhpMyAdmin\Template;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Tests\Stubs\ResponseRenderer;
use PhpMyAdmin\Theme\ThemeManager;
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(BrowseForeignersController::class)]
#[CoversClass(BrowseForeigners::class)]
final class BrowseForeignersControllerTest extends AbstractTestCase
{
    public function testBrowseForeignValues(): void
    {
        Current::$server = 2;
        $config = Config::getInstance();
        $config->selectedServer['DisableIS'] = true;

        $request = ServerRequestFactory::create()->createServerRequest('POST', 'https://example.com/')
            ->withParsedBody([
                'db' => 'sakila',
                'table' => 'film_actor',
                'field' => 'actor_id',
                'fieldkey' => '',
                'data' => '',
                'foreign_showAll' => null,
                'foreign_filter' => '',
            ]);

        $dbiDummy = $this->createDbiDummy();
        $dbiDummy->removeDefaultResults();
        $dbiDummy->addResult('SELECT @@lower_case_table_names', [['0']]);
        $dbiDummy->addResult(
            'SHOW CREATE TABLE `sakila`.`film_actor`',
            [
                [
                    'film_actor',
                    'CREATE TABLE `film_actor` (
  `actor_id` smallint(5) unsigned NOT NULL,
  `film_id` smallint(5) unsigned NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`actor_id`,`film_id`),
  KEY `idx_fk_film_id` (`film_id`),
  CONSTRAINT `fk_film_actor_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_film_actor_film` FOREIGN KEY (`film_id`) REFERENCES `film` (`film_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci',
                ],
            ],
            ['Table', 'Create Table'],
        );
        // phpcs:disable Generic.Files.LineLength.TooLong
        $dbiDummy->addResult(
            'SHOW INDEXES FROM .`actor` WHERE (Non_unique = 0)',
            [['actor', '0', 'PRIMARY', '1', 'actor_id', 'A', '2', 'NULL', 'NULL', '', 'BTREE', '', '', 'NO']],
            ['Table', 'Non_unique', 'Key_name', 'Seq_in_index', 'Column_name', 'Collation', 'Cardinality', 'Sub_part', 'Packed', 'Null', 'Index_type', 'Comment', 'Index_comment', 'Ignored'],
        );
        $dbiDummy->addResult('SELECT `actor_id` FROM .`actor` LIMIT 100', [['71'], ['173'], ['125']], ['actor_id']);
        $dbiDummy->addResult(
            'SELECT `COLUMN_NAME` AS `Field`, `COLUMN_TYPE` AS `Type`,'
                . ' `COLLATION_NAME` AS `Collation`,'
                . ' `IS_NULLABLE` AS `Null`, `COLUMN_KEY` AS `Key`,'
                . ' `COLUMN_DEFAULT` AS `Default`, `EXTRA` AS `Extra`, `PRIVILEGES` AS `Privileges`,'
                . ' `COLUMN_COMMENT` AS `Comment`'
                . ' FROM `information_schema`.`COLUMNS`'
                . ' WHERE `TABLE_SCHEMA` COLLATE utf8_bin = \'\' AND `TABLE_NAME`'
                . ' COLLATE utf8_bin = \'actor\''
                . ' ORDER BY `ORDINAL_POSITION`',
            [
                ['actor_id', 'smallint(5) unsigned', null, 'NO', 'PRI', null, 'auto_increment', '', ''],
                ['first_name', 'varchar(45)', null, 'NO', '', null, '', '', ''],
                ['last_name', 'varchar(45)', null, 'NO', 'MUL', null, '', '', ''],
                ['last_update', 'timestamp', null, 'NO', '', 'current_timestamp()', 'on update current_timestamp()', '', ''],
            ],
            ['Field', 'Type', 'Collation', 'Null', 'Key', 'Default', 'Extra', 'Privileges', 'Comment'],
        );
        $dbiDummy->addResult('SHOW INDEXES FROM .`actor`', []);
        // phpcs:enable
        $dbiDummy->addResult(
            'SELECT `actor_id`, `first_name` FROM .`actor` ORDER BY `actor`.`first_name`LIMIT 0, 25',
            [['71', 'ADAM'], ['173', 'ALAN'], ['125', 'ALBERT']],
            ['actor_id', 'first_name'],
        );
        $dbiDummy->addResult('SELECT COUNT(*) FROM .`actor`', [['3']], ['COUNT(*)']);
        $dbi = $this->createDatabaseInterface($dbiDummy);
        DatabaseInterface::$instance = $dbi;
        $template = new Template();

        $response = (new BrowseForeignersController(
            new ResponseRenderer(),
            new BrowseForeigners($template, $config, new ThemeManager()),
            new Relation($dbi),
        ))($request);

        self::assertSame(StatusCodeInterface::STATUS_OK, $response->getStatusCode());
        self::assertStringEqualsFile(
            __DIR__ . '/Fixtures/BrowseForeigners-testBrowseForeignValues.html',
            (string) $response->getBody(),
        );
    }
}
