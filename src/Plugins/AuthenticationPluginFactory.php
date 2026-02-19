<?php

declare(strict_types=1);

namespace PhpMyAdmin\Plugins;

use PhpMyAdmin\Config;
use PhpMyAdmin\Exceptions\AuthenticationPluginException;
use PhpMyAdmin\ResponseRenderer;

use function __;
use function class_exists;
use function is_subclass_of;
use function strtolower;
use function ucfirst;

class AuthenticationPluginFactory
{
    private AuthenticationPlugin|null $plugin = null;

    public function __construct(private readonly ResponseRenderer $responseRenderer)
    {
    }

    /** @throws AuthenticationPluginException */
    public function create(): AuthenticationPlugin
    {
        if ($this->plugin instanceof AuthenticationPlugin) {
            return $this->plugin;
        }

        $authType = Config::getInstance()->selectedServer['auth_type'];
        $class = 'PhpMyAdmin\\Plugins\\Auth\\Authentication' . ucfirst(strtolower($authType));
        if (! class_exists($class) || ! is_subclass_of($class, AuthenticationPlugin::class)) {
            throw new AuthenticationPluginException(
                __('Invalid authentication method set in configuration:') . ' ' . $authType,
            );
        }

        $this->plugin = new $class($this->responseRenderer);

        return $this->plugin;
    }
}
