<?php
/**
 * User preferences page
 *
 * @package PhpMyAdmin
 */
declare(strict_types=1);

use PhpMyAdmin\Config\ConfigFile;
use PhpMyAdmin\Config\Forms\BaseForm;
use PhpMyAdmin\Config\Forms\User\UserFormList;
use PhpMyAdmin\Core;
use PhpMyAdmin\Relation;
use PhpMyAdmin\Response;
use PhpMyAdmin\Template;
use PhpMyAdmin\Url;
use PhpMyAdmin\UserPreferences;
use PhpMyAdmin\UserPreferencesHeader;

if (! defined('PHPMYADMIN')) {
    exit;
}

global $containerBuilder, $cf, $form_param, $form_class, $form_display, $url_params, $error, $tabHash, $hash;

/** @var Template $template */
$template = $containerBuilder->get('template');
$userPreferences = new UserPreferences();

$cf = new ConfigFile($GLOBALS['PMA_Config']->base_settings);
$userPreferences->pageInit($cf);

// handle form processing

$form_param = isset($_GET['form']) ? $_GET['form'] : null;
$form_class = UserFormList::get($form_param);
if ($form_class === null) {
    Core::fatalError(__('Incorrect form specified!'));
}

/** @var BaseForm $form_display */
$form_display = new $form_class($cf, 1);

if (isset($_POST['revert'])) {
    // revert erroneous fields to their default values
    $form_display->fixErrors();
    // redirect
    $url_params = ['form' => $form_param];
    Core::sendHeaderLocation(
        './index.php?route=/preferences/forms'
        . Url::getCommonRaw($url_params, '&')
    );
    exit;
}

$error = null;
if ($form_display->process(false) && ! $form_display->hasErrors()) {
    // save settings
    $result = $userPreferences->save($cf->getConfigArray());
    if ($result === true) {
        // reload config
        $GLOBALS['PMA_Config']->loadUserPreferences();
        $tabHash = isset($_POST['tab_hash']) ? $_POST['tab_hash'] : null;
        $hash = ltrim($tabHash, '#');
        $userPreferences->redirect(
            'index.php?route=/preferences/forms',
            ['form' => $form_param],
            $hash
        );
        exit;
    } else {
        $error = $result;
    }
}

// display forms
$response = Response::getInstance();
$header   = $response->getHeader();
$scripts  = $header->getScripts();
$scripts->addFile('config.js');

/** @var Relation $relation */
$relation = $containerBuilder->get('relation');
echo UserPreferencesHeader::getContent($template, $relation);

if ($form_display->hasErrors()) {
    $formErrors = $form_display->displayErrors();
}

echo $template->render('preferences/forms/main', [
    'error' => $error ? $error->getDisplay() : '',
    'has_errors' => $form_display->hasErrors(),
    'errors' => $formErrors ?? null,
    'form' => $form_display->getDisplay(
        true,
        true,
        true,
        Url::getFromRoute('/preferences/forms', ['form' => $form_param]),
        ['server' => $GLOBALS['server']]
    ),
]);

if ($response->isAjax()) {
    $response->addJSON('disableNaviSettings', true);
} else {
    define('PMA_DISABLE_NAVI_SETTINGS', true);
}
