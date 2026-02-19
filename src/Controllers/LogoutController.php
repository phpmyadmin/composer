<?php

declare(strict_types=1);

namespace PhpMyAdmin\Controllers;

use PhpMyAdmin\Http\Response;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Plugins\AuthenticationPluginFactory;
use PhpMyAdmin\ResponseRenderer;
use PhpMyAdmin\Routing\Route;

#[Route('/logout', ['GET', 'POST'])]
final readonly class LogoutController implements InvocableController
{
    public function __construct(
        private AuthenticationPluginFactory $authPluginFactory,
        private ResponseRenderer $responseRenderer,
    ) {
    }

    public function __invoke(ServerRequest $request): Response
    {
        if (! $request->isPost()) {
            $this->responseRenderer->redirect('./index.php?route=/');

            return $this->responseRenderer->response();
        }

        $authPlugin = $this->authPluginFactory->create();

        return $authPlugin->logOut();
    }
}
