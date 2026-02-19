<?php

declare(strict_types=1);

namespace PhpMyAdmin\Http\Middleware;

use PhpMyAdmin\Config\UserPreferencesHandler;
use PhpMyAdmin\UrlRedirector;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

final readonly class UrlRedirection implements MiddlewareInterface
{
    public function __construct(
        private UrlRedirector $urlRedirector,
        private UserPreferencesHandler $userPreferencesHandler,
    ) {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if ($request->getAttribute('route') !== '/url') {
            return $handler->handle($request);
        }

        $this->userPreferencesHandler->loadUserPreferences(true);

        return $this->urlRedirector->redirect($request->getQueryParams()['url'] ?? null);
    }
}
