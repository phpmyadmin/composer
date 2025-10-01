<?php

declare(strict_types=1);

namespace PhpMyAdmin\Controllers\Navigation;

use PhpMyAdmin\Config;
use PhpMyAdmin\Controllers\InvocableController;
use PhpMyAdmin\Http\Response;
use PhpMyAdmin\Http\ServerRequest;
use PhpMyAdmin\Message;
use PhpMyAdmin\ResponseRenderer;
use PhpMyAdmin\Routing\Route;

use function __;
use function is_numeric;

#[Route('/navigation/update-width', ['POST'])]
final class UpdateNavWidthConfigController implements InvocableController
{
    public function __construct(private readonly ResponseRenderer $response, private readonly Config $config)
    {
    }

    public function __invoke(ServerRequest $request): Response
    {
        $value = $request->getParsedBodyParam('value');
        if (! is_numeric($value) || $value < 0) {
            $this->response->setRequestStatus(false);
            $this->response->addJSON(['message' => Message::error(__('Unexpected parameter value.'))]);

            return $this->response->response();
        }

        $result = $this->config->setUserValue(null, 'NavigationWidth', (int) $value);
        if ($result === true) {
            return $this->response->response();
        }

        $this->response->setRequestStatus(false);
        $this->response->addJSON(['message' => $result]);

        return $this->response->response();
    }
}
