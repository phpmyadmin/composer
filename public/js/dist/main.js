"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[21],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 54:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_keyhandler_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55);
/* harmony import */ var _modules_page_settings_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56);
/* harmony import */ var _modules_cross_framing_protection_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(57);
/* harmony import */ var _modules_indexes_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(58);
/* harmony import */ var _modules_config_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _modules_functions_checkNumberOfFields_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var _modules_navigation_event_loader_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(59);
/* harmony import */ var _modules_functions_event_loader_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(61);
/* harmony import */ var _modules_themes_manager_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(51);












_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', () => _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.removeSubmitEvents());
jquery__WEBPACK_IMPORTED_MODULE_0___default()(_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.loadEventHandler());
/**
 * Attach a generic event handler to clicks on pages and submissions of forms.
 */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a', _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.requestHandler);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', 'form', _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.requestHandler);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('ajaxError', _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.getFatalErrorHandler());
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_keyhandler_ts__WEBPACK_IMPORTED_MODULE_3__.KeyHandlerEvents.off());
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_keyhandler_ts__WEBPACK_IMPORTED_MODULE_3__.KeyHandlerEvents.on());
(0,_modules_cross_framing_protection_ts__WEBPACK_IMPORTED_MODULE_5__.crossFramingProtection)();
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_config_ts__WEBPACK_IMPORTED_MODULE_7__.Config.off());
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_config_ts__WEBPACK_IMPORTED_MODULE_7__.Config.on());
jquery__WEBPACK_IMPORTED_MODULE_0___default().ajaxPrefilter(_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.addNoCacheToAjaxRequests);
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', (0,_modules_functions_event_loader_ts__WEBPACK_IMPORTED_MODULE_10__.teardownFunctions)());
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', (0,_modules_functions_event_loader_ts__WEBPACK_IMPORTED_MODULE_10__.onloadFunctions)());
jquery__WEBPACK_IMPORTED_MODULE_0___default()((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.dismissNotifications)());
jquery__WEBPACK_IMPORTED_MODULE_0___default()((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.initializeMenuResizer)());
jquery__WEBPACK_IMPORTED_MODULE_0___default()((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.floatingMenuBar)());
jquery__WEBPACK_IMPORTED_MODULE_0___default()((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.breadcrumbScrollToTop)());
jquery__WEBPACK_IMPORTED_MODULE_0___default()((0,_modules_navigation_event_loader_ts__WEBPACK_IMPORTED_MODULE_9__["default"])());
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_indexes_ts__WEBPACK_IMPORTED_MODULE_6__.Indexes.off());
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_indexes_ts__WEBPACK_IMPORTED_MODULE_6__.Indexes.on());
jquery__WEBPACK_IMPORTED_MODULE_0___default()(() => (0,_modules_functions_checkNumberOfFields_ts__WEBPACK_IMPORTED_MODULE_8__["default"])());
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', () => {
  _modules_page_settings_ts__WEBPACK_IMPORTED_MODULE_4__.PageSettings.off();
  const themeColorModeToggle = document.getElementById('themeColorModeToggle');
  themeColorModeToggle === null || themeColorModeToggle === void 0 || themeColorModeToggle.removeEventListener('change', _modules_themes_manager_ts__WEBPACK_IMPORTED_MODULE_11__.ThemeColorModeToggle);
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', () => {
  _modules_page_settings_ts__WEBPACK_IMPORTED_MODULE_4__.PageSettings.on();
  const themeColorModeToggle = document.getElementById('themeColorModeToggle');
  themeColorModeToggle === null || themeColorModeToggle === void 0 || themeColorModeToggle.addEventListener('change', _modules_themes_manager_ts__WEBPACK_IMPORTED_MODULE_11__.ThemeColorModeToggle);
});

/***/ }),

/***/ 55:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyHandlerEvents: function() { return /* binding */ KeyHandlerEvents; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

// var that holds: 0- if ctrl key is not pressed 1- if ctrl key is pressed
let ctrlKeyHistory = 0;
/**
 * Allows moving around inputs/select by Ctrl+arrows
 *
 * @param {object} event data
 */
const onKeyDownArrowsHandler = function (event) {
  var e = event || window.event;
  var o = e.srcElement || e.target;
  if (!o) {
    return;
  }
  if (o.tagName !== 'TEXTAREA' && o.tagName !== 'INPUT' && o.tagName !== 'SELECT') {
    return;
  }
  if (e.which !== 17 && e.which !== 37 && e.which !== 38 && e.which !== 39 && e.which !== 40) {
    return;
  }
  if (!o.id) {
    return;
  }
  if (e.type === 'keyup') {
    if (e.which === 17) {
      ctrlKeyHistory = 0;
    }
    return;
  } else if (e.type === 'keydown') {
    if (e.which === 17) {
      ctrlKeyHistory = 1;
    }
  }
  if (ctrlKeyHistory !== 1) {
    return;
  }
  e.preventDefault();
  var pos = o.id.split('_');
  if (pos[0] !== 'field' || typeof pos[2] === 'undefined') {
    return;
  }
  var x = pos[2];
  var y = pos[1];
  switch (e.keyCode) {
    case 38:
      // up
      y--;
      break;
    case 40:
      // down
      y++;
      break;
    case 37:
      // left
      x--;
      break;
    case 39:
      // right
      x++;
      break;
    default:
      return;
  }
  var id = 'field_' + y + '_' + x;
  var nO = document.getElementById(id);
  if (!nO) {
    id = 'field_' + y + '_' + x + '_0';
    nO = document.getElementById(id);
  }
  // skip non existent fields
  if (!nO) {
    return;
  }
  nO.focus();
  if (nO.tagName !== 'SELECT') {
    nO.select();
  }
  e.returnValue = false;
};
const KeyHandlerEvents = {
  /**
   * @return {function}
   */
  off: function () {
    return function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('keydown keyup', '#table_columns');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('keydown keyup', 'table.insertRowTable');
    };
  },
  /**
   * @return {function}
   */
  on: function () {
    return function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown keyup', '#table_columns', function (event) {
        onKeyDownArrowsHandler(event.originalEvent);
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown keyup', 'table.insertRowTable', function (event) {
        onKeyDownArrowsHandler(event.originalEvent);
      });
    };
  }
};


/***/ }),

/***/ 56:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageSettings: function() { return /* binding */ PageSettings; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

function createPageSettingsModal() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pageSettingsModal').length > 0) {
    return;
  }
  const pageSettingsModalTemplate = '<div class="modal fade" id="pageSettingsModal" tabindex="-1" aria-labelledby="pageSettingsModalLabel" aria-hidden="true">' + '  <div class="modal-dialog modal-lg" id="pageSettingsModalDialog">' + '    <div class="modal-content">' + '      <div class="modal-header">' + '        <h5 class="modal-title" id="pageSettingsModalLabel">' + window.Messages.strPageSettings + '</h5>' + '        <button type="button" class="btn-close" id="pageSettingsModalCloseButton" aria-label="' + window.Messages.strClose + '"></button>' + '      </div>' + '      <div class="modal-body"></div>' + '      <div class="modal-footer">' + '        <button type="button" class="btn btn-secondary" id="pageSettingsModalApplyButton">' + window.Messages.strApply + '</button>' + '        <button type="button" class="btn btn-secondary" id="pageSettingsModalCancelButton">' + window.Messages.strCancel + '</button>' + '      </div>' + '    </div>' + '  </div>' + '</div>';
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(pageSettingsModalTemplate).appendTo('body');
}
/**
 * @fileoverview    function used for page-related settings
 * @name            Page-related settings
 *
 * @requires    jQueryUI
 */
function showSettings(selector) {
  createPageSettingsModal();
  // Keeping a clone to restore in case the user cancels the operation
  var $clone = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector + ' .page_settings').clone(true);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pageSettingsModalApplyButton').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.config-form').trigger('submit');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pageSettingsModalCloseButton,#pageSettingsModalCancelButton').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector + ' .page_settings').replaceWith($clone);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pageSettingsModal').modal('hide');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pageSettingsModal').modal('show');
  // @ts-ignore
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pageSettingsModal').find('.modal-body').first().html(jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector));
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector).css('display', 'block');
}
function showPageSettings() {
  showSettings('#page_settings_modal');
}
function showNaviSettings() {
  showSettings('#pma_navigation_settings');
}
const PageSettings = {
  off: () => {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_settings_icon').css('display', 'none');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_settings_icon').off('click');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings_icon').off('click');
  },
  on: () => {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_settings_modal').length) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_settings_icon').css('display', 'inline');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_settings_icon').on('click', showPageSettings);
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings_icon').on('click', showNaviSettings);
  }
};


/***/ }),

/***/ 57:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   crossFramingProtection: function() { return /* binding */ crossFramingProtection; }
/* harmony export */ });
/**
 * Conditionally included if framing is not allowed.
 */
const crossFramingProtection = () => {
  if (window.allowThirdPartyFraming) {
    return;
  }
  if (window.self !== window.top) {
    window.top.location = window.self.location;
    return;
  }
  const styleElement = document.getElementById('cfs-style');
  // check if styleElement has already been removed to avoid frequently reported js error
  if (typeof styleElement === 'undefined' || styleElement === null) {
    return;
  }
  styleElement.parentNode.removeChild(styleElement);
};


/***/ }),

/***/ 59:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ onloadNavigation; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _navigation_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _functions_handleCreateViewModal_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);






function updateFavoriteTableButton(buttonId, htmlContent) {
  var _window$bootstrap$Too;
  const currentButton = document.getElementById(buttonId);
  // Remove current tooltip before changing the button
  (_window$bootstrap$Too = window.bootstrap.Tooltip.getInstance(currentButton)) === null || _window$bootstrap$Too === void 0 || _window$bootstrap$Too.dispose();
  currentButton.outerHTML = htmlContent;
  // Enable tooltip of the new button
  new window.bootstrap.Tooltip(document.getElementById(buttonId));
}
/**
 * @return {function}
 */
function onloadNavigation() {
  return function () {
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').length) {
      // Don't bother running any code if the navigation is not even on the page
      return;
    }
    // Do not let the page reload on submitting the fast filter
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '.fast_filter', function (event) {
      event.preventDefault();
    });
    // Fire up the resize handlers
    new _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.ResizeHandler();
    /**
     * opens/closes (hides/shows) tree elements
     * loads data via ajax
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#pma_navigation_tree a.expander', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var $icon = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('img');
      if ($icon.is('.ic_b_plus')) {
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.expandTreeNode(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
      } else {
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.collapseTreeNode(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
      }
    });
    /**
     * Register event handler for click on the reload
     * navigation icon at the top of the panel
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#pma_navigation_reload', function (event) {
      event.preventDefault();
      // Find the loading symbol and show it
      var $iconThrobberSrc = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').find('.throbber');
      $iconThrobberSrc.show();
      // TODO Why is a loading symbol both hidden, and invisible?
      $iconThrobberSrc.css('visibility', '');
      // Callback to be used to hide the loading symbol when done reloading
      function hideNav() {
        $iconThrobberSrc.hide();
      }
      // Reload the navigation
      _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload(hideNav);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#navi_db_select', function () {
      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) {
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.update(_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.set('db', ''));
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form').trigger('submit');
    });
    /**
     * Register event handler for click on the collapse all
     * navigation icon at the top of the navigation tree
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#pma_navigation_collapse', function (event) {
      event.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('a.expander').each(function () {
        var $icon = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('img');
        if ($icon.is('.ic_b_minus')) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('click');
        }
      });
    });
    /**
     * Register event handler to toggle
     * the 'link with main panel' icon on mouseenter.
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseenter', '#pma_navigation_sync', function (event) {
      event.preventDefault();
      var synced = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').hasClass('synced');
      var $img = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_sync').children('img');
      if (synced) {
        $img.removeClass('ic_s_link').addClass('ic_s_unlink');
      } else {
        $img.removeClass('ic_s_unlink').addClass('ic_s_link');
      }
    });
    /**
     * Register event handler to toggle
     * the 'link with main panel' icon on mouseout.
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseout', '#pma_navigation_sync', function (event) {
      event.preventDefault();
      var synced = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').hasClass('synced');
      var $img = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_sync').children('img');
      if (synced) {
        $img.removeClass('ic_s_unlink').addClass('ic_s_link');
      } else {
        $img.removeClass('ic_s_link').addClass('ic_s_unlink');
      }
    });
    /**
     * Register event handler to toggle
     * the linking with main panel behavior
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#pma_navigation_sync', function (event) {
      event.preventDefault();
      var synced = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').hasClass('synced');
      var $img = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_sync').children('img');
      if (synced) {
        $img.removeClass('ic_s_unlink').addClass('ic_s_link').attr('alt', window.Messages.linkWithMain).attr('title', window.Messages.linkWithMain);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').removeClass('synced').find('li.selected').removeClass('selected');
      } else {
        $img.removeClass('ic_s_link').addClass('ic_s_unlink').attr('alt', window.Messages.unlinkWithMain).attr('title', window.Messages.unlinkWithMain);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').addClass('synced');
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.showCurrent();
      }
    });
    /**
     * Bind all "fast filter" events
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').on('click', 'li.fast_filter button.searchClauseClear', _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.FastFilter.events.clear);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').on('focus', 'li.fast_filter input.searchClause', _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.FastFilter.events.focus);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').on('blur', 'li.fast_filter input.searchClause', _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.FastFilter.events.blur);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').on('keyup', 'li.fast_filter input.searchClause', _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.FastFilter.events.keyup);
    /**
     * Ajax handler for pagination
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').on('click', 'div.pageselector a.ajax', function (event) {
      event.preventDefault();
      _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.treePagination(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    });
    /**
     * Node highlighting
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree.highlight').on('mouseover', 'li:not(.fast_filter)', function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('li:visible', this).length === 0) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('activePointer');
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree.highlight').on('mouseout', 'li:not(.fast_filter)', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('activePointer');
    });
    /** New view */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'li.new_view a.ajax', function (event) {
      event.preventDefault();
      (0,_functions_handleCreateViewModal_ts__WEBPACK_IMPORTED_MODULE_3__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    });
    /** Hide navigation tree item */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.hideNavItem.ajax', function (event) {
      event.preventDefault();
      var argSep = _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator');
      var params = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).getPostData();
      params += argSep + 'ajax_request=true' + argSep + 'server=' + _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server');
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        data: params,
        url: jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href'),
        success: function (data) {
          if (typeof data !== 'undefined' && data.success === true) {
            _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
          } else {
            (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error);
          }
        }
      });
    });
    /** Display a dialog to choose hidden navigation items to show */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.showUnhide.ajax', function (event) {
      event.preventDefault();
      var $msg = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
      var argSep = _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator');
      var params = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).getPostData();
      params += argSep + 'ajax_request=true';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href'), params, function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#unhideNavItemModal').modal('show');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#unhideNavItemModal').find('.modal-body').first().html(data.message);
        } else {
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error);
        }
      });
    });
    /** Show a hidden navigation tree item */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.unhideNavItem.ajax', function (event) {
      event.preventDefault();
      var $tr = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('tr');
      var $hiddenTableCount = $tr.parents('tbody').children().length;
      var $hideDialogBox = $tr.closest('div.ui-dialog');
      var $msg = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
      var argSep = _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator');
      var params = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).getPostData();
      params += argSep + 'ajax_request=true' + argSep + 'server=' + _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server');
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        data: params,
        url: jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href'),
        success: function (data) {
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
          if (typeof data !== 'undefined' && data.success === true) {
            $tr.remove();
            if ($hiddenTableCount === 1) {
              $hideDialogBox.remove();
            }
            _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
          } else {
            (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error);
          }
        }
      });
    });
    // Add/Remove favorite table using Ajax.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '.favorite_table_anchor', function (event) {
      event.preventDefault();
      var $self = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      if ($self.data('favtargetn') !== null) {
        var $dataFavTargets = jquery__WEBPACK_IMPORTED_MODULE_0___default()('a[data-favtargets="' + $self.data('favtargetn') + '"]');
        if ($dataFavTargets.length > 0) {
          $dataFavTargets.trigger('click');
          return;
        }
      }
      var hasLocalStorage = (0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_5__["default"])('localStorage') && typeof window.localStorage.favoriteTables !== 'undefined';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        url: $self.attr('href'),
        cache: false,
        type: 'POST',
        data: {
          'favoriteTables': hasLocalStorage ? window.localStorage.favoriteTables : '',
          'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server')
        },
        success: function (data) {
          if (data.changes) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#favoriteTableList').html(data.list);
            if ($self.attr('id')) {
              updateFavoriteTableButton($self.attr('id'), data.anchor);
            }
            // Update localStorage.
            if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_5__["default"])('localStorage')) {
              window.localStorage.favoriteTables = data.favoriteTables;
            }
          } else {
            (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.message);
          }
        }
      });
    });
    // Check if session storage is supported
    if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_5__["default"])('sessionStorage')) {
      var storage = window.sessionStorage;
      // remove tree from storage if Navi_panel config form is submitted
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', 'form.config-form', function () {
        storage.removeItem('navTreePaths');
      });
      // Initialize if no previous state is defined
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content').length && typeof storage.navTreePaths === 'undefined') {
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
      } else if (_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server') === storage.server && _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('token') === storage.token) {
        // Reload the tree to the state before page refresh
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload(_navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.filterStateRestore, JSON.parse(storage.navTreePaths));
      } else {
        // If the user is different
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.treeStateUpdate();
        _navigation_ts__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
      }
    }
  };
}

/***/ }),

/***/ 60:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handleCreateViewModal; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _functions_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _navigation_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);






/**
 * @param {JQuery<HTMLElement>} $this
 */
function handleCreateViewModal($this) {
  var $msg = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)();
  var sep = _common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
  var params = (0,_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(this, $this.getPostData());
  params += sep + 'ajax_dialog=1';
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post($this.attr('href'), params, function (data) {
    if (typeof data !== 'undefined' && data.success === true) {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxRemoveMessage)($msg);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModalGoButton').on('click', function () {
        if (typeof window.CodeMirror !== 'undefined') {
          window.codeMirrorEditor.save();
        }
        $msg = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)();
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/view/create', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModal').find('form').serialize(), function (data) {
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxRemoveMessage)($msg);
          if (typeof data !== 'undefined' && data.success === true) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModal').modal('hide');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query').html(data.message);
            _navigation_ts__WEBPACK_IMPORTED_MODULE_4__.Navigation.reload();
          } else {
            (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)(data.error);
          }
        });
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModal').find('.modal-body').first().html(data.message);
      // Attach syntax highlighted editor
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModal').on('shown.bs.modal', function () {
        window.codeMirrorEditor = (0,_functions_ts__WEBPACK_IMPORTED_MODULE_3__.getSqlEditor)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModal').find('textarea'));
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('input:visible[type=text]', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModal')).first().trigger('focus');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModal').off('shown.bs.modal');
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#createViewModal').modal('show');
    } else {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)(data.error);
    }
  });
}

/***/ }),

/***/ 61:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onloadFunctions: function() { return /* binding */ onloadFunctions; },
/* harmony export */   teardownFunctions: function() { return /* binding */ teardownFunctions; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _handleCreateViewModal_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60);



/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const PrintPage = {
  handleEvent: () => {
    window.print();
  }
};
/**
 * @return {function}
 */
function teardownFunctions() {
  return function () {
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownIdleEvent)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'input:checkbox.checkall');
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownSqlQueryEditEvents)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.removeAutocompleteInfo)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownCreateTableEvents)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownEnumSetEditorMessage)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownEnumSetEditor)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#index_frm input[type=submit]');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.toggle-container').off('click');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'select.pageselector');
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownRecentFavoriteTables)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownCodeMirrorEditor)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', '.autosubmit');
    document.querySelectorAll('.jsPrintButton').forEach(item => {
      item.removeEventListener('click', PrintPage);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.create_view.ajax');
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownCreateView)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('keydown', 'form input, form textarea, form select');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'input[type=radio][name="pw_hash"]');
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.teardownSortLinkMouseEvent)();
  };
}
/**
 * @return {function}
 */
function onloadFunctions() {
  return function () {
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadIdleEvent)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'input:checkbox.checkall', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getCheckAllCheckboxEventHandler)());
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.addDateTimePicker)();
    /**
     * Add attribute to text boxes for iOS devices (based on bugID: 3508912)
     */
    if (navigator.userAgent.match(/(iphone|ipod|ipad)/i)) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=text]').attr('autocapitalize', 'off').attr('autocorrect', 'off');
    }
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadSqlQueryEditEvents)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadCreateTableEvents)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadChangePasswordEvents)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadEnumSetEditorMessage)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadEnumSetEditor)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#index_frm input[type=submit]', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getAddIndexEventHandler)());
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.showHints)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.initializeToggleButtons)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select.pageselector', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getPageSelectorEventHandler)());
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadRecentFavoriteTables)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadCodeMirrorEditor)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadLockPage)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '.autosubmit', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getAutoSubmitEventHandler)());
    document.querySelectorAll('.jsPrintButton').forEach(item => {
      item.addEventListener('click', PrintPage);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.create_view.ajax', function (e) {
      e.preventDefault();
      (0,_handleCreateViewModal_ts__WEBPACK_IMPORTED_MODULE_2__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    });
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadCreateView)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', _functions_ts__WEBPACK_IMPORTED_MODULE_1__.checkboxesSel, _functions_ts__WEBPACK_IMPORTED_MODULE_1__.checkboxesChanged);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'input.checkall_box', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getCheckAllBoxEventHandler)());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '.checkall-filter', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getCheckAllFilterEventHandler)());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', _functions_ts__WEBPACK_IMPORTED_MODULE_1__.checkboxesSel + ', input.checkall_box:checkbox:enabled', _functions_ts__WEBPACK_IMPORTED_MODULE_1__.subCheckboxesChanged);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'input.sub_checkall_box', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getSubCheckAllBoxEventHandler)());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keyup', '#filterText', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getFilterTextEventHandler)());
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadFilterText)();
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadLoginForm)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('form input, form textarea, form select').on('keydown', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getKeyboardFormSubmitEventHandler)());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select#select_authentication_plugin_cp', (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getSslPasswordEventHandler)());
    (0,_functions_ts__WEBPACK_IMPORTED_MODULE_1__.onloadSortLinkMouseEvent)();
  };
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(54); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map