<?php

declare(strict_types=1);

namespace PhpMyAdmin\Controllers\Server\Privileges;

use Fig\Http\Message\StatusCodeInterface;
use PhpMyAdmin\Controllers\InvocableController;
use PhpMyAdmin\Http\Response;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Message;
use PhpMyAdmin\ResponseRenderer;
use PhpMyAdmin\Server\Privileges\AccountLocking;
use Throwable;

use function __;

final class AccountUnlockController implements InvocableController
{
    public function __construct(
        private readonly ResponseRenderer $response,
        private readonly AccountLocking $accountLocking,
    ) {
    }

    public function __invoke(ServerRequest $request): Response
    {
        if (! $request->isAjax()) {
            return $this->response->response();
        }

        /** @var string $userName */
        $userName = $request->getParsedBodyParam('username');
        /** @var string $hostName */
        $hostName = $request->getParsedBodyParam('hostname');

        try {
            $this->accountLocking->unlock($userName, $hostName);
        } catch (Throwable $exception) {
            $this->response->setStatusCode(StatusCodeInterface::STATUS_BAD_REQUEST);
            $this->response->setRequestStatus(false);
            $this->response->addJSON(['message' => Message::error($exception->getMessage())]);

            return $this->response->response();
        }

        $message = Message::success(__('The account %s@%s has been successfully unlocked.'));
        $message->addParam($userName);
        $message->addParam($hostName);
        $this->response->addJSON(['message' => $message]);

        return $this->response->response();
    }
}
