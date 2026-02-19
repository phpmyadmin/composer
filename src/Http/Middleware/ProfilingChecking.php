<?php

declare(strict_types=1);

namespace PhpMyAdmin\Http\Middleware;

use PhpMyAdmin\Dbal\DatabaseInterface;
use PhpMyAdmin\Profiling;
use PhpMyAdmin\ResponseRenderer;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

final readonly class ProfilingChecking implements MiddlewareInterface
{
    public function __construct(private ResponseRenderer $responseRenderer, private DatabaseInterface $dbi)
    {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        Profiling::check($this->dbi, $this->responseRenderer);

        return $handler->handle($request);
    }
}
