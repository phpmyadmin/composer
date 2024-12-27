<?php

declare(strict_types=1);

namespace PhpMyAdmin\Controllers;

use PhpMyAdmin\Http\Response;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Plugins\AuthenticationPluginFactory;
use PhpMyAdmin\ResponseRenderer;

final class LogoutController implements InvocableController
{
    public function __construct(private readonly AuthenticationPluginFactory $authPluginFactory)
    {
    }

    public function __invoke(ServerRequest $request): Response
    {
        $responseRenderer = ResponseRenderer::getInstance();
        if (! $request->isPost()) {
            $responseRenderer->redirect('./index.php?route=/');

            return $responseRenderer->response();
        }

        $authPlugin = $this->authPluginFactory->create();
        $authPlugin->logOut();

        return $responseRenderer->response();
    }
}
