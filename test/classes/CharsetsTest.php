<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests;

use PhpMyAdmin\Charsets;

/**
 * @covers \PhpMyAdmin\Charsets
 */
class CharsetsTest extends AbstractTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        parent::setGlobalDbi();
        $GLOBALS['server'] = 0;
        $GLOBALS['cfg']['DBG']['sql'] = false;
        $GLOBALS['cfg']['Server']['DisableIS'] = false;
    }

    public function testGetServerCharset(): void
    {
        $this->dummyDbi->addResult(
            'SHOW SESSION VARIABLES LIKE \'character_set_server\';',
            [
                [
                    'character_set_server',
                    'utf8mb3',
                ],
            ],
            [
                'Variable_name',
                'Value',
            ]
        );
        $this->dummyDbi->addResult('SHOW SESSION VARIABLES LIKE \'character_set_server\';', false);
        $this->dummyDbi->addResult('SELECT @@character_set_server;', false);
        $this->dummyDbi->addResult('SHOW SESSION VARIABLES LIKE \'character_set_server\';', false);
        $this->dummyDbi->addResult(
            'SELECT @@character_set_server;',
            [
                ['utf8mb3'],
            ]
        );

        $charset = Charsets::getServerCharset($GLOBALS['dbi'], $GLOBALS['cfg']['Server']['DisableIS']);
        $this->assertSame('utf8', $charset->getName());

        $charset = Charsets::getServerCharset($GLOBALS['dbi'], $GLOBALS['cfg']['Server']['DisableIS']);
        $this->assertSame('Unknown', $charset->getName());

        $charset = Charsets::getServerCharset($GLOBALS['dbi'], $GLOBALS['cfg']['Server']['DisableIS']);
        $this->assertSame('utf8', $charset->getName());

        $this->assertAllQueriesConsumed();
    }

    public function testFindCollationByName(): void
    {
        $this->assertNull(Charsets::findCollationByName(
            $GLOBALS['dbi'],
            $GLOBALS['cfg']['Server']['DisableIS'],
            null
        ));

        $this->assertNull(Charsets::findCollationByName(
            $GLOBALS['dbi'],
            $GLOBALS['cfg']['Server']['DisableIS'],
            ''
        ));

        $this->assertNull(Charsets::findCollationByName(
            $GLOBALS['dbi'],
            $GLOBALS['cfg']['Server']['DisableIS'],
            'invalid'
        ));

        $actual = Charsets::findCollationByName(
            $GLOBALS['dbi'],
            $GLOBALS['cfg']['Server']['DisableIS'],
            'utf8_general_ci'
        );

        $this->assertInstanceOf(Charsets\Collation::class, $actual);

        $this->assertSame('utf8_general_ci', $actual->getName());
    }

    public function testGetCollationsMariaDB(): void
    {
        $this->dbi->setVersion(['@@version' => '10.10.0-MariaDB']);
        $collations = Charsets::getCollations($this->dbi, false);
        $this->assertCount(4, $collations);
        $this->assertContainsOnly('array', $collations);
        foreach ($collations as $collation) {
            $this->assertContainsOnlyInstancesOf(Charsets\Collation::class, $collation);
        }
    }
}
