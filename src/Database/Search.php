<?php
/**
 * Handles Database Search
 */

declare(strict_types=1);

namespace PhpMyAdmin\Database;

use PhpMyAdmin\Current;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Template;
use PhpMyAdmin\Util;

use function __;
use function array_intersect;
use function array_key_exists;
use function explode;
use function implode;
use function is_array;
use function is_string;

/**
 * Class to handle database search
 */
class Search
{
    /**
     * Table Names
     *
     * @var mixed[]
     */
    private array $tablesNamesOnly;

    /**
     * Type of search
     *
     * @var mixed[]
     */
    private array $searchTypes;

    /**
     * Already set search type
     */
    private int $criteriaSearchType;

    /**
     * Options to apply to search
     *
     * @var bool criteriaSearchOptionsIncludeHex
     */
    private bool $criteriaSearchOptionsIncludeHex;

    /**
     * Already set search type's description
     */
    private string $searchTypeDescription = '';

    /**
     * Search string/regexp
     */
    private string $criteriaSearchString;

    /**
     * Criteria Tables to search in
     *
     * @var string[]
     */
    private array $criteriaTables = [];

    /**
     * Restrict the search to this column
     */
    private string $criteriaColumnName;

    public function __construct(private DatabaseInterface $dbi, private string $db, public Template $template)
    {
        $this->searchTypes = [
            1 => __('at least one of the words'),
            2 => __('all of the words'),
            3 => __('the exact phrase as substring'),
            4 => __('the exact phrase as whole field'),
            5 => __('as regular expression'),
        ];
        $this->criteriaSearchOptionsIncludeHex = false;
        // Sets criteria parameters
        $this->setSearchParams();
    }

    /**
     * Sets search parameters
     */
    private function setSearchParams(): void
    {
        $this->tablesNamesOnly = $this->dbi->getTables($this->db);

        if (
            empty($_POST['criteriaSearchType'])
            || ! is_string($_POST['criteriaSearchType'])
            || ! array_key_exists($_POST['criteriaSearchType'], $this->searchTypes)
        ) {
            $this->criteriaSearchType = 1;
            unset($_POST['submit_search']);
        } else {
            $this->criteriaSearchType = (int) $_POST['criteriaSearchType'];
            $this->searchTypeDescription = $this->searchTypes[$_POST['criteriaSearchType']];
        }

        if (empty($_POST['criteriaSearchString']) || ! is_string($_POST['criteriaSearchString'])) {
            $this->criteriaSearchString = '';
            unset($_POST['submit_search']);
        } else {
            $this->criteriaSearchString = $_POST['criteriaSearchString'];
        }

        if (empty($_POST['criteriaTables']) || ! is_array($_POST['criteriaTables'])) {
            unset($_POST['submit_search']);
        } else {
            $this->criteriaTables = array_intersect($_POST['criteriaTables'], $this->tablesNamesOnly);
        }

        if (empty($_POST['criteriaColumnName']) || ! is_string($_POST['criteriaColumnName'])) {
            $this->criteriaColumnName = '';
        } else {
            $this->criteriaColumnName = $_POST['criteriaColumnName'];
        }

        //phpcs:ignore SlevomatCodingStandard.ControlStructures.EarlyExit.EarlyExitNotUsed
        if (isset($_POST['criteriaSearchOptionIncludeHex']) && $_POST['criteriaSearchOptionIncludeHex'] === '1') {
            $this->criteriaSearchOptionsIncludeHex = true;
        }
    }

    /**
     * Builds the SQL search query
     *
     * @param string $table The table name
     *
     * @return string[] 3 SQL queries (for count, display and delete results)
     *
     * @todo    can we make use of fulltextsearch IN BOOLEAN MODE for this?
     */
    private function getSearchSqls(string $table): array
    {
        // Statement types
        $sqlStrSelect = 'SELECT';
        $sqlStrDelete = 'DELETE';
        // Table to use
        $sqlStrFrom = ' FROM ' . Util::backquote(Current::$database) . '.' . Util::backquote($table);
        // Gets where clause for the query
        $whereClause = $this->getWhereClause($table);
        // Builds complete queries
        $sql = [];
        $sql['select_columns'] = $sqlStrSelect . ' *' . $sqlStrFrom . $whereClause;
        // here, I think we need to still use the COUNT clause, even for
        // VIEWs, anyway we have a WHERE clause that should limit results
        $sql['select_count'] = $sqlStrSelect . ' COUNT(*) AS `count`' . $sqlStrFrom . $whereClause;
        $sql['delete'] = $sqlStrDelete . $sqlStrFrom . $whereClause;

        return $sql;
    }

    /**
     * Provides where clause for building SQL query
     *
     * @param string $table The table name
     *
     * @return string The generated where clause
     */
    private function getWhereClause(string $table): string
    {
        // Columns to select
        $allColumns = $this->dbi->getColumns(Current::$database, $table);
        $likeClauses = [];
        // Based on search type, decide like/regex & '%'/''
        $likeOrRegex = $this->criteriaSearchType === 5 ? 'REGEXP' : 'LIKE';
        $automaticWildcard = $this->criteriaSearchType < 4 ? '%' : '';
        // For "as regular expression" (search option 5), LIKE won't be used
        // Usage example: If user is searching for a literal $ in a regexp search,
        // they should enter \$ as the value.
        // Extract search words or pattern
        $searchWords = $this->criteriaSearchType > 2
            ? [$this->criteriaSearchString]
            : explode(' ', $this->criteriaSearchString);

        foreach ($searchWords as $searchWord) {
            // Eliminates empty values
            if ($searchWord === '') {
                continue;
            }

            $likeClausesPerColumn = [];
            // for each column in the table
            foreach ($allColumns as $column) {
                if (
                    $this->criteriaColumnName !== ''
                    && $column->field != $this->criteriaColumnName
                ) {
                    continue;
                }

                $likeClausesPerColumn[] = 'CONVERT(' . Util::backquote($column->field) . ' USING utf8)'
                    . ' ' . $likeOrRegex . ' '
                    . $this->dbi->quoteString($automaticWildcard . $searchWord . $automaticWildcard);

                if (! $this->criteriaSearchOptionsIncludeHex) {
                    continue;
                }

                $likeClausesPerColumn[] = 'HEX(' . Util::backquote($column->field) . ')'
                    . ' ' . $likeOrRegex . ' '
                    . $this->dbi->quoteString($automaticWildcard . $searchWord . $automaticWildcard);
            }

            if ($likeClausesPerColumn === []) {
                continue;
            }

            $likeClauses[] = implode(' OR ', $likeClausesPerColumn);
        }

        if ($likeClauses === []) {
            // this could happen when the "inside column" does not exist
            // in any selected tables
            return ' WHERE FALSE';
        }

        // Use 'OR' if 'at least one word' is to be searched, else use 'AND'
        $implodeStr = $this->criteriaSearchType === 1 ? ' OR ' : ' AND ';

        return ' WHERE (' . implode(') ' . $implodeStr . ' (', $likeClauses) . ')';
    }

    /**
     * Displays database search results
     *
     * @return string HTML for search results
     */
    public function getSearchResults(): string
    {
        $resultTotal = 0;
        $rows = [];
        // For each table selected as search criteria
        foreach ($this->criteriaTables as $eachTable) {
            // Gets the SQL statements
            $newSearchSqls = $this->getSearchSqls($eachTable);
            // Executes the "COUNT" statement
            $resultCount = (int) $this->dbi->fetchValue($newSearchSqls['select_count']);
            $resultTotal += $resultCount;
            // Gets the result row's HTML for a table
            $rows[] = ['table' => $eachTable, 'new_search_sqls' => $newSearchSqls, 'result_count' => $resultCount];
        }

        return $this->template->render('database/search/results', [
            'db' => $this->db,
            'rows' => $rows,
            'result_total' => $resultTotal,
            'criteria_tables' => $this->criteriaTables,
            'criteria_search_string' => $this->criteriaSearchString,
            'search_type_description' => $this->searchTypeDescription,
            'criteria_search_options_include_hex' => $this->criteriaSearchOptionsIncludeHex,
        ]);
    }

    /**
     * Provides the main search form's html
     *
     * @return string HTML for selection form
     */
    public function getMainHtml(): string
    {
        return $this->template->render('database/search/main', [
            'db' => $this->db,
            'criteria_search_string' => $this->criteriaSearchString,
            'criteria_search_type' => $this->criteriaSearchType,
            'criteria_tables' => $this->criteriaTables,
            'tables_names_only' => $this->tablesNamesOnly,
            'criteria_column_name' => $this->criteriaColumnName,
            'criteria_search_options_include_hex' => $this->criteriaSearchOptionsIncludeHex,
        ]);
    }
}
