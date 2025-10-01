import $ from 'jquery';
import { AJAX } from './modules/ajax.ts';
import {
    addNoCacheToAjaxRequests,
    breadcrumbScrollToTop,
    dismissNotifications,
    floatingMenuBar,
    initializeMenuResizer
} from './modules/functions.ts';
import { KeyHandlerEvents } from './modules/keyhandler.ts';
import { PageSettings } from './modules/page_settings.ts';
import { crossFramingProtection } from './modules/cross_framing_protection.ts';
import { Indexes } from './modules/indexes.ts';
import { Config } from './modules/config.ts';
import checkNumberOfFields from './modules/functions/checkNumberOfFields.ts';
import onloadNavigation from './modules/navigation/event-loader.ts';
import { onloadFunctions, teardownFunctions } from './modules/functions/event-loader.ts';
import { ThemeColorModeToggle } from './modules/themes-manager.ts';

AJAX.registerOnload('main.js', () => AJAX.removeSubmitEvents());
$(AJAX.loadEventHandler());

/**
 * Attach a generic event handler to clicks on pages and submissions of forms.
 */
$(document).on('click', 'a', AJAX.requestHandler);
$(document).on('submit', 'form', AJAX.requestHandler);

$(document).on('ajaxError', AJAX.getFatalErrorHandler());

AJAX.registerTeardown('main.js', KeyHandlerEvents.off());
AJAX.registerOnload('main.js', KeyHandlerEvents.on());

crossFramingProtection();

AJAX.registerTeardown('main.js', Config.off());
AJAX.registerOnload('main.js', Config.on());

$.ajaxPrefilter(addNoCacheToAjaxRequests);

AJAX.registerTeardown('main.js', teardownFunctions());
AJAX.registerOnload('main.js', onloadFunctions());

$(dismissNotifications());
$(initializeMenuResizer());
$(floatingMenuBar());
$(breadcrumbScrollToTop());

$(onloadNavigation());

AJAX.registerTeardown('main.js', Indexes.off());
AJAX.registerOnload('main.js', Indexes.on());

$(() => checkNumberOfFields());

AJAX.registerTeardown('main.js', () => {
    PageSettings.off();

    const themeColorModeToggle = document.getElementById('themeColorModeToggle') as HTMLSelectElement;
    themeColorModeToggle?.removeEventListener('change', ThemeColorModeToggle);
});

AJAX.registerOnload('main.js', () => {
    PageSettings.on();

    const themeColorModeToggle = document.getElementById('themeColorModeToggle') as HTMLSelectElement;
    themeColorModeToggle?.addEventListener('change', ThemeColorModeToggle);
});
