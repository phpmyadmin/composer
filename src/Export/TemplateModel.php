<?php

declare(strict_types=1);

namespace PhpMyAdmin\Export;

use PhpMyAdmin\DatabaseInterface;
use PhpMyAdmin\Dbal\ConnectionType;
use PhpMyAdmin\Identifiers\DatabaseName;
use PhpMyAdmin\Identifiers\TableName;
use PhpMyAdmin\Plugins\ExportType;
use PhpMyAdmin\Util;

use function sprintf;

final class TemplateModel
{
    public function __construct(private DatabaseInterface $dbi)
    {
    }

    public function create(DatabaseName $db, TableName $table, Template $template): string
    {
        $query = sprintf(
            'INSERT INTO %s.%s (`username`, `export_type`, `template_name`, `template_data`)'
                . ' VALUES (%s, %s, %s, %s);',
            Util::backquote($db),
            Util::backquote($table),
            $this->dbi->quoteString($template->getUsername(), ConnectionType::ControlUser),
            $this->dbi->quoteString($template->getExportType()->value, ConnectionType::ControlUser),
            $this->dbi->quoteString($template->getName(), ConnectionType::ControlUser),
            $this->dbi->quoteString($template->getData(), ConnectionType::ControlUser),
        );
        $result = $this->dbi->tryQueryAsControlUser($query);
        if ($result !== false) {
            return '';
        }

        return $this->dbi->getError(ConnectionType::ControlUser);
    }

    public function delete(DatabaseName $db, TableName $table, string $user, int $id): string
    {
        $query = sprintf(
            'DELETE FROM %s.%s WHERE `id` = %d AND `username` = %s;',
            Util::backquote($db),
            Util::backquote($table),
            $id,
            $this->dbi->quoteString($user, ConnectionType::ControlUser),
        );
        $result = $this->dbi->tryQueryAsControlUser($query);
        if ($result !== false) {
            return '';
        }

        return $this->dbi->getError(ConnectionType::ControlUser);
    }

    public function load(DatabaseName $db, TableName $table, string $user, int $id): Template|string
    {
        $query = sprintf(
            'SELECT * FROM %s.%s WHERE `id` = %d AND `username` = %s;',
            Util::backquote($db),
            Util::backquote($table),
            $id,
            $this->dbi->quoteString($user, ConnectionType::ControlUser),
        );
        $result = $this->dbi->tryQueryAsControlUser($query);
        if ($result === false) {
            return $this->dbi->getError(ConnectionType::ControlUser);
        }

        $data = [];
        while ($row = $result->fetchAssoc()) {
            $data = $row;
        }

        return Template::fromArray([
            'id' => (int) $data['id'],
            'username' => $data['username'],
            'exportType' => $data['export_type'],
            'name' => $data['template_name'],
            'data' => $data['template_data'],
        ]);
    }

    public function update(DatabaseName $db, TableName $table, Template $template): string
    {
        $query = sprintf(
            'UPDATE %s.%s SET `template_data` = %s WHERE `id` = %d AND `username` = %s;',
            Util::backquote($db),
            Util::backquote($table),
            $this->dbi->quoteString($template->getData(), ConnectionType::ControlUser),
            $template->getId(),
            $this->dbi->quoteString($template->getUsername(), ConnectionType::ControlUser),
        );
        $result = $this->dbi->tryQueryAsControlUser($query);
        if ($result !== false) {
            return '';
        }

        return $this->dbi->getError(ConnectionType::ControlUser);
    }

    /** @return Template[]|string */
    public function getAll(DatabaseName $db, TableName $table, string $user, ExportType $exportType): array|string
    {
        $query = sprintf(
            'SELECT * FROM %s.%s WHERE `username` = %s AND `export_type` = %s ORDER BY `template_name`;',
            Util::backquote($db),
            Util::backquote($table),
            $this->dbi->quoteString($user, ConnectionType::ControlUser),
            $this->dbi->quoteString($exportType->value, ConnectionType::ControlUser),
        );
        $result = $this->dbi->tryQueryAsControlUser($query);
        if ($result === false) {
            return $this->dbi->getError(ConnectionType::ControlUser);
        }

        $templates = [];
        while ($row = $result->fetchAssoc()) {
            $templates[] = Template::fromArray([
                'id' => (int) $row['id'],
                'username' => $row['username'],
                'exportType' => $row['export_type'],
                'name' => $row['template_name'],
                'data' => $row['template_data'],
            ]);
        }

        return $templates;
    }
}
