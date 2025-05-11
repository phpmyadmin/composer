<?php

declare(strict_types=1);

namespace PhpMyAdmin\Controllers\Database\Structure;

use PhpMyAdmin\Controllers\Database\StructureController;
use PhpMyAdmin\Controllers\InvocableController;
use PhpMyAdmin\Current;
use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\FlashMessenger;
use PhpMyAdmin\Http\Response;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Message;
use PhpMyAdmin\ResponseRenderer;
use PhpMyAdmin\Sql;
use PhpMyAdmin\Table\Table;
use PhpMyAdmin\Util;
use PhpMyAdmin\Utils\ForeignKey;

use function __;

final readonly class EmptyTableController implements InvocableController
{
    public function __construct(
        private ResponseRenderer $response,
        private DatabaseInterface $dbi,
        private FlashMessenger $flashMessenger,
        private StructureController $structureController,
        private Sql $sql,
    ) {
    }

    public function __invoke(ServerRequest $request): Response
    {
        $multBtn = $_POST['mult_btn'] ?? '';
        /** @var string[] $selected */
        $selected = $request->getParsedBodyParam('selected', []);

        if ($multBtn !== __('Yes')) {
            $this->flashMessenger->addMessage('success', __('No change'));
            $this->response->redirectToRoute('/database/structure', ['db' => Current::$database]);

            return $this->response->response();
        }

        $defaultFkCheckValue = ForeignKey::handleDisableCheckInit();

        Current::$sqlQuery = '';

        $this->dbi->selectDb(Current::$database);

        foreach ($selected as $selectedValue) {
            if (Table::get($selectedValue, Current::$database, $this->dbi)->isView()) {
                continue;
            }

            $aQuery = 'TRUNCATE ';
            $aQuery .= Util::backquote($selectedValue);

            Current::$sqlQuery .= $aQuery . ';' . "\n";
            $this->dbi->query($aQuery);
        }

        if (! empty($_REQUEST['pos'])) {
            $_REQUEST['pos'] = $this->sql->calculatePosForLastPage(
                Current::$database,
                Current::$table,
                $_REQUEST['pos'],
            );
        }

        ForeignKey::handleDisableCheckCleanup($defaultFkCheckValue);

        Current::$message = Message::success();

        unset($_POST['mult_btn']);

        return ($this->structureController)($request);
    }
}
