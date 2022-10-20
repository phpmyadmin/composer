<?php

declare(strict_types=1);

namespace PhpMyAdmin\Tests\Html;

use PhpMyAdmin\Html\Generator;
use PhpMyAdmin\Tests\AbstractTestCase;
use PhpMyAdmin\Url;
use PhpMyAdmin\Util;

use function __;
use function _pgettext;
use function call_user_func_array;
use function htmlspecialchars;
use function urlencode;

/**
 * @covers \PhpMyAdmin\Html\Generator
 */
class GeneratorTest extends AbstractTestCase
{
    /**
     * Set up the test.
     */
    protected function setUp(): void
    {
        parent::setUp();
        parent::setLanguage();
    }

    /**
     * Test for getDbLink
     *
     * @group medium
     */
    public function testGetDbLinkEmpty(): void
    {
        $GLOBALS['db'] = null;
        $this->assertEmpty(Generator::getDbLink());
    }

    /**
     * Test for getDbLink
     *
     * @group medium
     */
    public function testGetDbLinkNull(): void
    {
        global $cfg;
        $GLOBALS['db'] = 'test_db';
        $GLOBALS['server'] = 99;
        $database = $GLOBALS['db'];
        $this->assertEquals(
            '<a href="'
            . Util::getScriptNameForOption(
                $GLOBALS['cfg']['DefaultTabDatabase'],
                'database'
            )
            . '&db=' . $database
            . '&server=99&lang=en" '
            . 'title="Jump to database “'
            . htmlspecialchars($database) . '”.">'
            . htmlspecialchars($database) . '</a>',
            Generator::getDbLink()
        );
    }

    /**
     * Test for getDbLink
     */
    public function testGetDbLink(): void
    {
        $GLOBALS['server'] = 99;
        $database = 'test_database';
        $this->assertEquals(
            '<a href="' . Util::getScriptNameForOption(
                $GLOBALS['cfg']['DefaultTabDatabase'],
                'database'
            )
            . '&db=' . $database
            . '&server=99&lang=en" title="Jump to database “'
            . htmlspecialchars($database) . '”.">'
            . htmlspecialchars($database) . '</a>',
            Generator::getDbLink($database)
        );
    }

    /**
     * Test for getDbLink
     */
    public function testGetDbLinkWithSpecialChars(): void
    {
        $GLOBALS['server'] = 99;
        $database = 'test&data\'base';
        $this->assertEquals(
            '<a href="'
            . Util::getScriptNameForOption(
                $GLOBALS['cfg']['DefaultTabDatabase'],
                'database'
            )
            . '&db='
            . htmlspecialchars(urlencode($database))
            . '&server=99&lang=en" title="Jump to database “'
            . htmlspecialchars($database) . '”.">'
            . htmlspecialchars($database) . '</a>',
            Generator::getDbLink($database)
        );
    }

    /**
     * Test for Util::getIcon
     */
    public function testGetIconWithoutActionLinksMode(): void
    {
        $GLOBALS['cfg']['ActionLinksMode'] = 'text';

        $this->assertEquals(
            '<span class="text-nowrap"></span>',
            Generator::getIcon('b_comment')
        );
    }

    /**
     * Test for Util::getIcon
     */
    public function testGetIconWithActionLinksMode(): void
    {
        $GLOBALS['cfg']['ActionLinksMode'] = 'icons';

        $this->assertEquals(
            '<span class="text-nowrap"><img src="themes/dot.gif" title="" alt="" class="icon ic_b_comment"></span>',
            Generator::getIcon('b_comment')
        );
    }

    /**
     * Test for Util::getIcon
     */
    public function testGetIconAlternate(): void
    {
        $GLOBALS['cfg']['ActionLinksMode'] = 'icons';
        $alternate_text = 'alt_str';

        $this->assertEquals(
            '<span class="text-nowrap"><img src="themes/dot.gif" title="'
            . $alternate_text . '" alt="' . $alternate_text
            . '" class="icon ic_b_comment"></span>',
            Generator::getIcon('b_comment', $alternate_text)
        );
    }

    /**
     * Test for Util::getIcon
     */
    public function testGetIconWithForceText(): void
    {
        $GLOBALS['cfg']['ActionLinksMode'] = 'icons';
        $alternate_text = 'alt_str';

        // Here we are checking for an icon embedded inside a span (i.e not a menu
        // bar icon
        $this->assertEquals(
            '<span class="text-nowrap"><img src="themes/dot.gif" title="'
            . $alternate_text . '" alt="' . $alternate_text
            . '" class="icon ic_b_comment">&nbsp;' . $alternate_text . '</span>',
            Generator::getIcon('b_comment', $alternate_text, true, false)
        );
    }

    /**
     * Test for showPHPDocumentation
     */
    public function testShowPHPDocumentation(): void
    {
        $GLOBALS['server'] = 99;
        $GLOBALS['cfg']['ServerDefault'] = 0;

        $target = 'docu';
        $lang = _pgettext('PHP documentation language', 'en');
        $expected = '<a href="./url.php?url=https%3A%2F%2Fwww.php.net%2Fmanual%2F' . $lang
            . '%2F' . $target . '" target="documentation">'
            . '<img src="themes/dot.gif" title="' . __('Documentation') . '" alt="'
            . __('Documentation') . '" class="icon ic_b_help"></a>';

        $this->assertEquals(
            $expected,
            Generator::showPHPDocumentation($target)
        );
    }

    /**
     * Test for Generator::linkOrButton
     *
     * @param array  $params params
     * @param int    $limit  limit
     * @param string $match  match
     *
     * @dataProvider linksOrButtons
     */
    public function testLinkOrButton(array $params, int $limit, string $match): void
    {
        $restore = $GLOBALS['cfg']['LinkLengthLimit'] ?? 1000;
        $GLOBALS['cfg']['LinkLengthLimit'] = $limit;
        try {
            $result = call_user_func_array(
                [
                    Generator::class,
                    'linkOrButton',
                ],
                $params
            );
            $this->assertEquals($match, $result);
        } finally {
            $GLOBALS['cfg']['LinkLengthLimit'] = $restore;
        }
    }

    /**
     * Data provider for Generator::linkOrButton test
     *
     * @return array
     */
    public function linksOrButtons(): array
    {
        parent::setGlobalConfig();

        return [
            [
                [
                    'index.php',
                    null,
                    'text',
                ],
                1000,
                '<a href="index.php" >text</a>',
            ],
            [
                [
                    'index.php',
                    ['some' => 'parameter'],
                    'text',
                ],
                20,
                '<a href="index.php" data-post="some=parameter&lang=en">text</a>',
            ],
            [
                [
                    'index.php',
                    null,
                    'text',
                    [],
                    'target',
                ],
                1000,
                '<a href="index.php" target="target">text</a>',
            ],
            [
                [
                    'https://mariadb.org/explain_analyzer/analyze/?client=phpMyAdmin&amp;raw_explain=%2B---%2B',
                    null,
                    'text',
                    [],
                    'target',
                ],
                10,
                // This is not the behavior we want for the analyser feature, next test will disable the limit
                '<a href="https://mariadb.org/explain_analyzer/analyze/"'
                . ' data-post="client=phpMyAdmin&amp;raw_explain=%2B---%2B" target="target">text</a>',
            ],
            [
                [
                    'https://mariadb.org/explain_analyzer/analyze/?client=phpMyAdmin&amp;raw_explain=%2B---%2B',
                    null,
                    'text',
                    [],
                    'target',
                    false,
                ],
                10,
                '<a href="https://mariadb.org/explain_analyzer/analyze/?client=phpMyAdmin&amp;raw_explain=%2B---%2B"'
                . ' target="target">text</a>',
            ],
            [
                [
                    'url.php?url=http://phpmyadmin.net/',
                    null,
                    'text',
                    [],
                    '_blank',
                ],
                1000,
                '<a href="url.php?url=http://phpmyadmin.net/" target="_blank" rel="noopener noreferrer">text</a>',
            ],
            [
                [
                    Url::getFromRoute('/server/databases'),
                    ['some' => 'parameter'],
                    'text',
                ],
                20,
                '<a href="index.php" data-post="route=/server/databases&some=parameter&lang=en">text</a>',
            ],
            [
                [
                    Url::getFromRoute('/server/databases'),
                    null,
                    'text',
                ],
                20,
                '<a href="index.php" data-post="route=/server/databases">text</a>',
            ],
            [
                [
                    Url::getFromRoute('/server/databases'),
                    ['some' => 'parameter'],
                    'text',
                ],
                100,
                '<a href="index.php?route=/server/databases&some=parameter&lang=en" >text</a>',
            ],
            [
                [
                    Url::getFromRoute('/server/databases'),
                    null,
                    'text',
                ],
                100,
                '<a href="index.php?route=/server/databases" >text</a>',
            ],
        ];
    }

    public function testFormatSql(): void
    {
        $this->assertEquals(
            '<code class="sql"><pre>' . "\n"
            . 'SELECT 1 &lt; 2' . "\n"
            . '</pre></code>',
            Generator::formatSql('SELECT 1 < 2')
        );

        $GLOBALS['cfg']['MaxCharactersInDisplayedSQL'] = 6;

        $this->assertEquals(
            '<code class="sql"><pre>' . "\n"
            . 'SELECT[...]' . "\n"
            . '</pre></code>',
            Generator::formatSql('SELECT 1 < 2', true)
        );
    }

    /**
     * Test for getServerSSL
     */
    public function testGetServerSSL(): void
    {
        global $cfg;

        $sslNotUsed = '<span class="">SSL is not being used</span>'
        . ' <a href="./url.php?url=https%3A%2F%2Fdocs.phpmyadmin.net%2Fen%2Flatest%2Fsetup.html%23ssl"'
        . ' target="documentation"><img src="themes/dot.gif" title="Documentation" alt="Documentation"'
        . ' class="icon ic_b_help"></a>';

        $sslNotUsedCaution = '<span class="text-danger">SSL is not being used</span>'
        . ' <a href="./url.php?url=https%3A%2F%2Fdocs.phpmyadmin.net%2Fen%2Flatest%2Fsetup.html%23ssl"'
        . ' target="documentation"><img src="themes/dot.gif" title="Documentation" alt="Documentation"'
        . ' class="icon ic_b_help"></a>';

        $cfg['Server'] = [
            'ssl' => false,
            'host' => '127.0.0.1',
        ];
        $this->assertEquals(
            $sslNotUsed,
            Generator::getServerSSL()
        );

        $cfg['Server'] = [
            'ssl' => false,
            'host' => 'custom.host',
        ];
        $cfg['MysqlSslWarningSafeHosts'] = ['localhost', '127.0.0.1'];

        $this->assertEquals(
            $sslNotUsedCaution,
            Generator::getServerSSL()
        );

        $cfg['Server'] = [
            'ssl' => false,
            'host' => 'custom.host',
        ];
        $cfg['MysqlSslWarningSafeHosts'] = ['localhost', '127.0.0.1', 'custom.host'];

        $this->assertEquals(
            $sslNotUsed,
            Generator::getServerSSL()
        );

        $cfg['Server'] = [
            'ssl' => false,
            'ssl_verify' => true,
            'host' => 'custom.host',
        ];

        $this->assertEquals(
            $sslNotUsed,
            Generator::getServerSSL()
        );

        $cfg['Server'] = [
            'ssl' => true,
            'ssl_verify' => false,
            'host' => 'custom.host',
        ];

        $this->assertEquals(
            '<span class="text-danger">SSL is used with disabled verification</span>'
            . ' <a href="./url.php?url=https%3A%2F%2Fdocs.phpmyadmin.net%2Fen%2Flatest%2Fsetup.html%23ssl"'
            . ' target="documentation"><img src="themes/dot.gif" title="Documentation" alt="Documentation"'
            . ' class="icon ic_b_help"></a>',
            Generator::getServerSSL()
        );

        $cfg['Server'] = [
            'ssl' => true,
            'ssl_verify' => true,
            'host' => 'custom.host',
        ];

        $this->assertEquals(
            '<span class="text-danger">SSL is used without certification authority</span>'
            . ' <a href="./url.php?url=https%3A%2F%2Fdocs.phpmyadmin.net%2Fen%2Flatest%2Fsetup.html%23ssl"'
            . ' target="documentation"><img src="themes/dot.gif" title="Documentation" alt="Documentation"'
            . ' class="icon ic_b_help"></a>',
            Generator::getServerSSL()
        );

        $cfg['Server'] = [
            'ssl' => true,
            'ssl_verify' => true,
            'ssl_ca' => '/etc/ssl/ca.crt',
            'host' => 'custom.host',
        ];

        $this->assertEquals(
            '<span class="">SSL is used</span>'
            . ' <a href="./url.php?url=https%3A%2F%2Fdocs.phpmyadmin.net%2Fen%2Flatest%2Fsetup.html%23ssl"'
            . ' target="documentation"><img src="themes/dot.gif" title="Documentation" alt="Documentation"'
            . ' class="icon ic_b_help"></a>',
            Generator::getServerSSL()
        );
    }

    /**
     * Test for Generator::getDefaultFunctionForField
     *
     * @param array  $field      field settings
     * @param bool   $insertMode true if insert mode
     * @param string $expected   expected result
     * @psalm-param array<string, string|bool|null> $field
     *
     * @dataProvider providerForTestGetDefaultFunctionForField
     */
    public function testGetDefaultFunctionForField(
        array $field,
        bool $insertMode,
        string $expected
    ): void {
        $result = Generator::getDefaultFunctionForField($field, $insertMode);

        $this->assertEquals($expected, $result);
    }

    /**
     * Data provider for Generator::getDefaultFunctionForField test
     *
     * @return array
     * @psalm-return array<int, array{array<string, string|bool|null>, bool, string}>
     */
    public function providerForTestGetDefaultFunctionForField(): array
    {
        return [
            [
                [
                    'True_Type' => 'GEOMETRY',
                    'first_timestamp' => false,
                    'Extra' => null,
                    'Key' => '',
                    'Type' => '',
                    'Null' => 'NO',
                ],
                true,
                'ST_GeomFromText',
            ],
            [
                [
                    'True_Type' => 'timestamp',
                    'first_timestamp' => true,
                    'Extra' => null,
                    'Key' => '',
                    'Type' => '',
                    'Null' => 'NO',
                ],
                true,
                'NOW',
            ],
            [
                [
                    'True_Type' => 'uuid',
                    'first_timestamp' => false,
                    'Key' => '',
                    'Type' => '',
                ],
                true,
                '',
            ],
            [
                [
                    'True_Type' => '',
                    'first_timestamp' => false,
                    'Key' => 'PRI',
                    'Type' => 'char(36)',
                ],
                true,
                'UUID',
            ],
        ];
    }
}
