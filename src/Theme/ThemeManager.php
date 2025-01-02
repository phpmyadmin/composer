<?php

declare(strict_types=1);

namespace PhpMyAdmin\Theme;

use DirectoryIterator;
use PhpMyAdmin\Config;
use PhpMyAdmin\Current;
use PhpMyAdmin\Exceptions\MissingTheme;

use function __;
use function array_key_exists;
use function htmlspecialchars;
use function is_string;
use function ksort;
use function sprintf;

use const ROOT_PATH;

/**
 * phpMyAdmin theme manager
 */
class ThemeManager
{
    /** @var string file-system path to the theme folder */
    private string $themesPath;

    /** @var string path to theme folder as an URL */
    private string $themesPathUrl;

    /** @var array<string,Theme> available themes */
    public array $themes = [];

    /** @var string  cookie name */
    public string $cookieName = 'pma_theme';

    public bool $perServer = false;

    /** @var string name of active theme */
    public string $activeTheme = self::FALLBACK_THEME;

    /** @var Theme Theme active theme */
    public Theme $theme;

    public string $themeDefault = self::FALLBACK_THEME;

    /** @const string The name of the fallback theme */
    public const FALLBACK_THEME = 'pmahomme';

    public function __construct()
    {
        $this->themesPath = self::getThemesFsDir();
        $this->themesPathUrl = self::getThemesDir();
        $this->theme = new Theme();
    }

    public function initializeTheme(): void
    {
        $config = Config::getInstance();
        $this->setThemePerServer($config->settings['ThemePerServer']);

        $this->loadThemes();

        $configThemeExists = $this->checkTheme($config->settings['ThemeDefault']);
        if (! $configThemeExists) {
            throw new MissingTheme(sprintf(
                __('Default theme %s not found!'),
                htmlspecialchars($config->settings['ThemeDefault']),
            ));
        }

        $this->themeDefault = $config->settings['ThemeDefault'];

        // check if user have a theme cookie
        $cookieTheme = $this->getThemeCookie();
        if (
            $cookieTheme && $this->setActiveTheme($cookieTheme)
            || $configThemeExists && $this->setActiveTheme($this->themeDefault)
        ) {
            $colorMode = $this->getColorModeCookie();
            if (is_string($colorMode) && $colorMode !== '') {
                $this->theme->setColorMode($colorMode);
            }

            return;
        }

        $this->setActiveTheme(self::FALLBACK_THEME);
    }

    /**
     * sets if there are different themes per server
     *
     * @param bool $perServer Whether to enable per server flag
     */
    public function setThemePerServer(bool $perServer): void
    {
        $this->perServer = $perServer;
    }

    /**
     * Sets active theme
     *
     * @param string|null $theme theme name
     */
    public function setActiveTheme(string|null $theme): bool
    {
        if (! $this->checkTheme($theme)) {
            throw new MissingTheme(sprintf(
                __('Theme %s not found!'),
                htmlspecialchars((string) $theme),
            ));
        }

        $this->activeTheme = $theme;
        $this->theme = $this->themes[$theme];

        return true;
    }

    /**
     * Returns name for storing theme
     *
     * @return string cookie name
     */
    public function getThemeCookieName(): string
    {
        // Allow different theme per server
        if ($this->perServer) {
            return $this->cookieName . '-' . Current::$server;
        }

        return $this->cookieName;
    }

    private function getColorModeCookieName(): string
    {
        return $this->getThemeCookieName() . '_color';
    }

    /**
     * returns name of theme stored in the cookie
     *
     * @return string|false theme name from cookie or false
     */
    public function getThemeCookie(): string|false
    {
        $name = $this->getThemeCookieName();
        $config = Config::getInstance();
        if ($config->issetCookie($name)) {
            return $config->getCookie($name);
        }

        return false;
    }

    /**
     * returns name of theme stored in the cookie
     *
     * @return string|false theme name from cookie or false
     */
    public function getColorModeCookie(): string|false
    {
        $name = $this->getColorModeCookieName();
        $config = Config::getInstance();
        if ($config->issetCookie($name)) {
            return $config->getCookie($name);
        }

        return false;
    }

    public function setThemeCookie(): void
    {
        $config = Config::getInstance();
        $config->setCookie(
            $this->getThemeCookieName(),
            $this->theme->id,
            $this->themeDefault,
        );
        $config->setCookie(
            $this->getColorModeCookieName(),
            $this->theme->getColorMode(),
            $this->theme->getColorModes()[0],
        );
        // force a change of a dummy session variable to avoid problems
        // with the caching of phpmyadmin.css.php
        $config->set('theme-update', $this->theme->id);
    }

    public function loadThemes(): void
    {
        $this->themes = [];

        $directoryIterator = new DirectoryIterator($this->themesPath);

        foreach ($directoryIterator as $directoryInfo) {
            if ($directoryInfo->isDot() || ! $directoryInfo->isDir()) {
                continue;
            }

            $dir = $directoryInfo->getFilename();

            if (array_key_exists($dir, $this->themes)) {
                continue;
            }

            $newTheme = Theme::load($this->themesPathUrl . $dir, $this->themesPath . $dir . '/', $dir);
            if (! $newTheme instanceof Theme) {
                continue;
            }

            $this->themes[$dir] = $newTheme;
        }

        ksort($this->themes);
    }

    /**
     * checks if given theme name is a known theme
     *
     * @param string|null $theme name fo theme to check for
     */
    public function checkTheme(string|null $theme): bool
    {
        return array_key_exists($theme ?? '', $this->themes);
    }

    /** @return array{
     *   id: string,
     *   name: string,
     *   version: string,
     *   is_active: bool,
     *   color_mode: string,
     *   color_modes: array<string|int, string>
     * }[] $themes */
    public function getThemesArray(): array
    {
        $themes = [];
        foreach ($this->themes as $theme) {
            $themes[] = [
                'id' => $theme->getId(),
                'name' => $theme->getName(),
                'version' => $theme->getVersion(),
                'is_active' => $theme->getId() === $this->activeTheme,
                'color_mode' => $theme->getColorMode(),
                'color_modes' => $theme->getColorModes(),
            ];
        }

        return $themes;
    }

    /**
     * Return the themes directory with a trailing slash
     */
    public static function getThemesFsDir(): string
    {
        return ROOT_PATH . 'public/themes/';
    }

    /**
     * Return the themes directory with a trailing slash as a relative public path
     */
    public static function getThemesDir(): string
    {
        return './themes/';// This is an URL
    }
}
