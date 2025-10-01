<?php
/**
 * Page-related settings
 */

declare(strict_types=1);

namespace PhpMyAdmin\Config;

use PhpMyAdmin\Config;
use PhpMyAdmin\Config\Forms\Page\PageFormList;
use PhpMyAdmin\Message;
use PhpMyAdmin\ResponseRenderer;
use PhpMyAdmin\UserPreferences;

use function __;

/**
 * Page-related settings
 */
class PageSettings
{
    /**
     * Contains id of the form element
     */
    private string $elemId = 'page_settings_modal';

    /**
     * Name of the group to show
     */
    private string $groupName = '';

    /**
     * Contains HTML of errors
     */
    private string $errorHTML = '';

    /**
     * Contains HTML of settings
     */
    private string $HTML = '';

    public function __construct(private UserPreferences $userPreferences)
    {
    }

    /**
     * @param string      $formGroupName The name of config form group to display
     * @param string|null $elemId        Id of the div containing settings
     */
    public function init(string $formGroupName, string|null $elemId = null): void
    {
        $formClass = PageFormList::get($formGroupName);
        if ($formClass === null) {
            return;
        }

        if (isset($_REQUEST['printview']) && $_REQUEST['printview']) {
            return;
        }

        if ($elemId !== null && $elemId !== '') {
            $this->elemId = $elemId;
        }

        $this->groupName = $formGroupName;

        $configFile = new ConfigFile(Config::getInstance()->baseSettings);
        $this->userPreferences->pageInit($configFile);

        $formDisplay = new $formClass($configFile);

        // Process form
        $error = null;
        if (isset($_POST['submit_save']) && $_POST['submit_save'] === $formGroupName) {
            $error = $this->processPageSettings($formDisplay, $configFile);
        }

        // Display forms
        $this->HTML = $this->getPageSettingsDisplay($formDisplay, $error);
    }

    /**
     * Process response to form
     *
     * @param FormDisplay $formDisplay Form
     * @param ConfigFile  $cf          Configuration file
     */
    private function processPageSettings(FormDisplay $formDisplay, ConfigFile $cf): Message|null
    {
        if (! $formDisplay->process(false) || $formDisplay->hasErrors()) {
            return null;
        }

        // save settings
        $result = $this->userPreferences->save($cf->getConfigArray());
        if ($result === true) {
            // reload page
            $response = ResponseRenderer::getInstance();
            $response->redirect($response->getSelfUrl());
            $response->callExit();
        }

        return $result;
    }

    /**
     * Store errors in _errorHTML
     *
     * @param FormDisplay  $formDisplay Form
     * @param Message|null $error       Error message
     */
    private function storeError(FormDisplay $formDisplay, Message|null $error): void
    {
        $retval = '';
        if ($error !== null) {
            $retval .= $error->getDisplay();
        }

        if ($formDisplay->hasErrors()) {
            // form has errors
            $retval .= '<div class="alert alert-danger config-form" role="alert">'
                . '<b>' . __('Cannot save settings, submitted configuration form contains errors!') . '</b>'
                . $formDisplay->displayErrors()
                . '</div>';
        }

        $this->errorHTML = $retval;
    }

    /**
     * Display page-related settings
     *
     * @param FormDisplay  $formDisplay Form
     * @param Message|null $error       Error message
     */
    private function getPageSettingsDisplay(FormDisplay $formDisplay, Message|null $error): string
    {
        $response = ResponseRenderer::getInstance();

        $retval = '';

        $this->storeError($formDisplay, $error);

        $retval .= '<div id="' . $this->elemId . '">';
        $retval .= '<div class="page_settings">';
        $retval .= $formDisplay->getDisplay(false, $response->getSelfUrl(), ['submit_save' => $this->groupName]);
        $retval .= '</div>';
        $retval .= '</div>';

        return $retval;
    }

    /**
     * Get HTML output
     */
    public function getHTML(): string
    {
        return $this->HTML;
    }

    /**
     * Get error HTML output
     */
    public function getErrorHTML(): string
    {
        return $this->errorHTML;
    }
}
