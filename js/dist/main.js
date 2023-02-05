"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[25],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 58:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _modules_keyhandler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59);
/* harmony import */ var _modules_page_settings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60);
/* harmony import */ var _modules_cross_framing_protection_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(61);
/* harmony import */ var _modules_indexes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62);
/* harmony import */ var _modules_config_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_checkNumberOfFields_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(20);
/* harmony import */ var _modules_navigation_event_loader_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(63);
/* harmony import */ var _modules_functions_event_loader_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(65);











_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', () => _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.removeSubmitEvents());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.loadEventHandler());

/**
 * Attach a generic event handler to clicks on pages and submissions of forms.
 */
jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', 'a', _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.requestHandler);
jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', 'form', _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.requestHandler);
jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('ajaxError', _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.getFatalErrorHandler());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_keyhandler_js__WEBPACK_IMPORTED_MODULE_3__.KeyHandlerEvents.off());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_keyhandler_js__WEBPACK_IMPORTED_MODULE_3__.KeyHandlerEvents.on());
(0,_modules_cross_framing_protection_js__WEBPACK_IMPORTED_MODULE_5__.crossFramingProtection)();
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_config_js__WEBPACK_IMPORTED_MODULE_7__.Config.off());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_config_js__WEBPACK_IMPORTED_MODULE_7__.Config.on());
jquery__WEBPACK_IMPORTED_MODULE_0__.ajaxPrefilter(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.addNoCacheToAjaxRequests());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', (0,_modules_functions_event_loader_js__WEBPACK_IMPORTED_MODULE_10__.teardownFunctions)());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', (0,_modules_functions_event_loader_js__WEBPACK_IMPORTED_MODULE_10__.onloadFunctions)());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.dismissNotifications());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.initializeMenuResizer());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.floatingMenuBar());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.breadcrumbScrollToTop());
jquery__WEBPACK_IMPORTED_MODULE_0__((0,_modules_navigation_event_loader_js__WEBPACK_IMPORTED_MODULE_9__["default"])());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_indexes_js__WEBPACK_IMPORTED_MODULE_6__.Indexes.off());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_indexes_js__WEBPACK_IMPORTED_MODULE_6__.Indexes.on());
jquery__WEBPACK_IMPORTED_MODULE_0__(() => (0,_modules_functions_checkNumberOfFields_js__WEBPACK_IMPORTED_MODULE_8__["default"])());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', () => {
  _modules_page_settings_js__WEBPACK_IMPORTED_MODULE_4__.PageSettings.off();
});
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', () => {
  _modules_page_settings_js__WEBPACK_IMPORTED_MODULE_4__.PageSettings.on();
});

/***/ }),

/***/ 61:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crossFramingProtection": function() { return /* binding */ crossFramingProtection; }
/* harmony export */ });
/**
 * Conditionally included if framing is not allowed.
 * @return {void}
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

/***/ 65:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onloadFunctions": function() { return /* binding */ onloadFunctions; },
/* harmony export */   "teardownFunctions": function() { return /* binding */ teardownFunctions; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _handleCreateViewModal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64);




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
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownIdleEvent();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('click', 'input:checkbox.checkall');
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownSqlQueryEditEvents();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.removeAutocompleteInfo();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownCreateTableEvents();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownEnumSetEditorMessage();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownEnumSetEditor();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('click', '#index_frm input[type=submit]');
    jquery__WEBPACK_IMPORTED_MODULE_0__('div.toggle-container').off('click');
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('change', 'select.pageselector');
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownRecentFavoriteTables();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownCodeMirrorEditor();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('change', '.autosubmit');
    document.querySelectorAll('.jsPrintButton').forEach(item => {
      item.removeEventListener('click', PrintPage);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('click', 'a.create_view.ajax');
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownCreateView();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('keydown', 'form input, form textarea, form select');
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('change', 'input[type=radio][name="pw_hash"]');
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.teardownSortLinkMouseEvent();
  };
}

/**
 * @return {function}
 */
function onloadFunctions() {
  return function () {
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadIdleEvent();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', 'input:checkbox.checkall', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getCheckAllCheckboxEventHandler());
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.addDateTimePicker();

    /**
     * Add attribute to text boxes for iOS devices (based on bugID: 3508912)
     */
    if (navigator.userAgent.match(/(iphone|ipod|ipad)/i)) {
      jquery__WEBPACK_IMPORTED_MODULE_0__('input[type=text]').attr('autocapitalize', 'off').attr('autocorrect', 'off');
    }
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadSqlQueryEditEvents();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadCreateTableEvents();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadChangePasswordEvents();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadEnumSetEditorMessage();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadEnumSetEditor();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '#index_frm input[type=submit]', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getAddIndexEventHandler());
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.showHints();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.initializeToggleButtons();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('change', 'select.pageselector', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getPageSelectorEventHandler());
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadRecentFavoriteTables();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadCodeMirrorEditor();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadLockPage();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('change', '.autosubmit', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getAutoSubmitEventHandler());
    document.querySelectorAll('.jsPrintButton').forEach(item => {
      item.addEventListener('click', PrintPage);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', 'a.create_view.ajax', function (e) {
      e.preventDefault();
      (0,_handleCreateViewModal_js__WEBPACK_IMPORTED_MODULE_2__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0__(this));
    });
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadCreateView();
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('change', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.checkboxesSel, _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.checkboxesChanged);
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('change', 'input.checkall_box', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getCheckAllBoxEventHandler());
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '.checkall-filter', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getCheckAllFilterEventHandler());
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('change', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.checkboxesSel + ', input.checkall_box:checkbox:enabled', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.subCheckboxesChanged);
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('change', 'input.sub_checkall_box', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getSubCheckAllBoxEventHandler());
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('keyup', '#filterText', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getFilterTextEventHandler());
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadFilterText();
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadLoginForm();
    jquery__WEBPACK_IMPORTED_MODULE_0__('form input, form textarea, form select').on('keydown', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getKeyboardFormSubmitEventHandler());
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('change', 'select#select_authentication_plugin_cp', _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.getSslPasswordEventHandler());
    _functions_js__WEBPACK_IMPORTED_MODULE_1__.Functions.onloadSortLinkMouseEvent();
  };
}

/***/ }),

/***/ 64:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handleCreateViewModal; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _ajax_message_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _getJsConfirmCommonParam_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30);







/**
 * @param {JQuery<HTMLElement>} $this
 *
 * @return {void}
 */
function handleCreateViewModal($this) {
  var $msg = (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)();
  var sep = _common_js__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
  var params = (0,_getJsConfirmCommonParam_js__WEBPACK_IMPORTED_MODULE_5__["default"])(this, $this.getPostData());
  params += sep + 'ajax_dialog=1';
  jquery__WEBPACK_IMPORTED_MODULE_0__.post($this.attr('href'), params, function (data) {
    if (typeof data !== 'undefined' && data.success === true) {
      (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_1__.ajaxRemoveMessage)($msg);
      jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModalGoButton').on('click', function () {
        if (typeof window.CodeMirror !== 'undefined') {
          window.codeMirrorEditor.save();
        }
        $msg = (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)();
        jquery__WEBPACK_IMPORTED_MODULE_0__.post('index.php?route=/view/create', jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModal').find('form').serialize(), function (data) {
          (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_1__.ajaxRemoveMessage)($msg);
          if (typeof data !== 'undefined' && data.success === true) {
            jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModal').modal('hide');
            jquery__WEBPACK_IMPORTED_MODULE_0__('.result_query').html(data.message);
            _navigation_js__WEBPACK_IMPORTED_MODULE_4__.Navigation.reload();
          } else {
            (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)(data.error);
          }
        });
      });
      jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModal').find('.modal-body').first().html(data.message);
      // Attach syntax highlighted editor
      jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModal').on('shown.bs.modal', function () {
        window.codeMirrorEditor = _functions_js__WEBPACK_IMPORTED_MODULE_3__.Functions.getSqlEditor(jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModal').find('textarea'));
        jquery__WEBPACK_IMPORTED_MODULE_0__('input:visible[type=text]', jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModal')).first().trigger('focus');
        jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModal').off('shown.bs.modal');
      });
      jquery__WEBPACK_IMPORTED_MODULE_0__('#createViewModal').modal('show');
    } else {
      (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)(data.error);
    }
  });
}

/***/ }),

/***/ 59:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyHandlerEvents": function() { return /* binding */ KeyHandlerEvents; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
      jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('keydown keyup', '#table_columns');
      jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('keydown keyup', 'table.insertRowTable');
    };
  },
  /**
   * @return {function}
   */
  on: function () {
    return function () {
      jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('keydown keyup', '#table_columns', function (event) {
        onKeyDownArrowsHandler(event.originalEvent);
      });
      jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('keydown keyup', 'table.insertRowTable', function (event) {
        onKeyDownArrowsHandler(event.originalEvent);
      });
    };
  }
};


/***/ }),

/***/ 63:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ onloadNavigation; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _functions_handleCreateViewModal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64);
/* harmony import */ var _ajax_message_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _functions_isStorageSupported_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _tooltip_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);








/**
 * @return {function}
 */
function onloadNavigation() {
  return function () {
    if (!jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation').length) {
      // Don't bother running any code if the navigation is not even on the page
      return;
    }

    // Do not let the page reload on submitting the fast filter
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', '.fast_filter', function (event) {
      event.preventDefault();
    });

    // Fire up the resize handlers
    new _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.ResizeHandler();

    /**
     * opens/closes (hides/shows) tree elements
     * loads data via ajax
     */
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '#pma_navigation_tree a.expander', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var $icon = jquery__WEBPACK_IMPORTED_MODULE_0__(this).find('img');
      if ($icon.is('.ic_b_plus')) {
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.expandTreeNode(jquery__WEBPACK_IMPORTED_MODULE_0__(this));
      } else {
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.collapseTreeNode(jquery__WEBPACK_IMPORTED_MODULE_0__(this));
      }
    });

    /**
     * Register event handler for click on the reload
     * navigation icon at the top of the panel
     */
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '#pma_navigation_reload', function (event) {
      event.preventDefault();

      // Find the loading symbol and show it
      var $iconThrobberSrc = jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation').find('.throbber');
      $iconThrobberSrc.show();
      // TODO Why is a loading symbol both hidden, and invisible?
      $iconThrobberSrc.css('visibility', '');

      // Callback to be used to hide the loading symbol when done reloading
      function hideNav() {
        $iconThrobberSrc.hide();
      }

      // Reload the navigation
      _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload(hideNav);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('change', '#navi_db_select', function () {
      if (!jquery__WEBPACK_IMPORTED_MODULE_0__(this).val()) {
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.update(_common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.set('db', ''));
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
      }
      jquery__WEBPACK_IMPORTED_MODULE_0__(this).closest('form').trigger('submit');
    });

    /**
     * Register event handler for click on the collapse all
     * navigation icon at the top of the navigation tree
     */
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '#pma_navigation_collapse', function (event) {
      event.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').find('a.expander').each(function () {
        var $icon = jquery__WEBPACK_IMPORTED_MODULE_0__(this).find('img');
        if ($icon.is('.ic_b_minus')) {
          jquery__WEBPACK_IMPORTED_MODULE_0__(this).trigger('click');
        }
      });
    });

    /**
     * Register event handler to toggle
     * the 'link with main panel' icon on mouseenter.
     */
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('mouseenter', '#pma_navigation_sync', function (event) {
      event.preventDefault();
      var synced = jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').hasClass('synced');
      var $img = jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_sync').children('img');
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
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('mouseout', '#pma_navigation_sync', function (event) {
      event.preventDefault();
      var synced = jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').hasClass('synced');
      var $img = jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_sync').children('img');
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
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '#pma_navigation_sync', function (event) {
      event.preventDefault();
      var synced = jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').hasClass('synced');
      var $img = jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_sync').children('img');
      if (synced) {
        $img.removeClass('ic_s_unlink').addClass('ic_s_link').attr('alt', window.Messages.linkWithMain).attr('title', window.Messages.linkWithMain);
        jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').removeClass('synced').find('li.selected').removeClass('selected');
      } else {
        $img.removeClass('ic_s_link').addClass('ic_s_unlink').attr('alt', window.Messages.unlinkWithMain).attr('title', window.Messages.unlinkWithMain);
        jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').addClass('synced');
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.showCurrent();
      }
    });

    /**
     * Bind all "fast filter" events
     */
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').on('click', 'li.fast_filter button.searchClauseClear', _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.FastFilter.events.clear);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').on('focus', 'li.fast_filter input.searchClause', _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.FastFilter.events.focus);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').on('blur', 'li.fast_filter input.searchClause', _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.FastFilter.events.blur);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').on('keyup', 'li.fast_filter input.searchClause', _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.FastFilter.events.keyup);

    /**
     * Ajax handler for pagination
     */
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').on('click', 'div.pageselector a.ajax', function (event) {
      event.preventDefault();
      _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.treePagination(jquery__WEBPACK_IMPORTED_MODULE_0__(this));
    });

    /**
     * Node highlighting
     */
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree.highlight').on('mouseover', 'li:not(.fast_filter)', function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0__('li:visible', this).length === 0) {
        jquery__WEBPACK_IMPORTED_MODULE_0__(this).addClass('activePointer');
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree.highlight').on('mouseout', 'li:not(.fast_filter)', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0__(this).removeClass('activePointer');
    });

    /** New view */
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', 'li.new_view a.ajax', function (event) {
      event.preventDefault();
      (0,_functions_handleCreateViewModal_js__WEBPACK_IMPORTED_MODULE_3__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0__(this));
    });

    /** Hide navigation tree item */
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', 'a.hideNavItem.ajax', function (event) {
      event.preventDefault();
      var argSep = _common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator');
      var params = jquery__WEBPACK_IMPORTED_MODULE_0__(this).getPostData();
      params += argSep + 'ajax_request=true' + argSep + 'server=' + _common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server');
      jquery__WEBPACK_IMPORTED_MODULE_0__.ajax({
        type: 'POST',
        data: params,
        url: jquery__WEBPACK_IMPORTED_MODULE_0__(this).attr('href'),
        success: function (data) {
          if (typeof data !== 'undefined' && data.success === true) {
            _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
          } else {
            (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error);
          }
        }
      });
    });

    /** Display a dialog to choose hidden navigation items to show */
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', 'a.showUnhide.ajax', function (event) {
      event.preventDefault();
      var $msg = (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
      var argSep = _common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator');
      var params = jquery__WEBPACK_IMPORTED_MODULE_0__(this).getPostData();
      params += argSep + 'ajax_request=true';
      jquery__WEBPACK_IMPORTED_MODULE_0__.post(jquery__WEBPACK_IMPORTED_MODULE_0__(this).attr('href'), params, function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
          jquery__WEBPACK_IMPORTED_MODULE_0__('#unhideNavItemModal').modal('show');
          jquery__WEBPACK_IMPORTED_MODULE_0__('#unhideNavItemModal').find('.modal-body').first().html(data.message);
        } else {
          (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error);
        }
      });
    });

    /** Show a hidden navigation tree item */
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', 'a.unhideNavItem.ajax', function (event) {
      event.preventDefault();
      var $tr = jquery__WEBPACK_IMPORTED_MODULE_0__(this).parents('tr');
      var $hiddenTableCount = $tr.parents('tbody').children().length;
      var $hideDialogBox = $tr.closest('div.ui-dialog');
      var $msg = (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
      var argSep = _common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator');
      var params = jquery__WEBPACK_IMPORTED_MODULE_0__(this).getPostData();
      params += argSep + 'ajax_request=true' + argSep + 'server=' + _common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server');
      jquery__WEBPACK_IMPORTED_MODULE_0__.ajax({
        type: 'POST',
        data: params,
        url: jquery__WEBPACK_IMPORTED_MODULE_0__(this).attr('href'),
        success: function (data) {
          (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
          if (typeof data !== 'undefined' && data.success === true) {
            $tr.remove();
            if ($hiddenTableCount === 1) {
              $hideDialogBox.remove();
            }
            _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
          } else {
            (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error);
          }
        }
      });
    });

    // Add/Remove favorite table using Ajax.
    jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '.favorite_table_anchor', function (event) {
      event.preventDefault();
      var $self = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
      var anchorId = $self.attr('id');
      if ($self.data('favtargetn') !== null) {
        var $dataFavTargets = jquery__WEBPACK_IMPORTED_MODULE_0__('a[data-favtargets="' + $self.data('favtargetn') + '"]');
        if ($dataFavTargets.length > 0) {
          $dataFavTargets.trigger('click');
          return;
        }
      }
      var hasLocalStorage = (0,_functions_isStorageSupported_js__WEBPACK_IMPORTED_MODULE_5__["default"])('localStorage') && typeof window.localStorage.favoriteTables !== 'undefined';
      jquery__WEBPACK_IMPORTED_MODULE_0__.ajax({
        url: $self.attr('href'),
        cache: false,
        type: 'POST',
        data: {
          'favoriteTables': hasLocalStorage ? window.localStorage.favoriteTables : '',
          'server': _common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server')
        },
        success: function (data) {
          if (data.changes) {
            jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_favorite_list').html(data.list);
            jquery__WEBPACK_IMPORTED_MODULE_0__('#' + anchorId).parent().html(data.anchor);
            (0,_tooltip_js__WEBPACK_IMPORTED_MODULE_6__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0__('#' + anchorId), 'a', jquery__WEBPACK_IMPORTED_MODULE_0__('#' + anchorId).attr('title'));
            // Update localStorage.
            if ((0,_functions_isStorageSupported_js__WEBPACK_IMPORTED_MODULE_5__["default"])('localStorage')) {
              window.localStorage.favoriteTables = data.favoriteTables;
            }
          } else {
            (0,_ajax_message_js__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.message);
          }
        }
      });
    });
    // Check if session storage is supported
    if ((0,_functions_isStorageSupported_js__WEBPACK_IMPORTED_MODULE_5__["default"])('sessionStorage')) {
      var storage = window.sessionStorage;
      // remove tree from storage if Navi_panel config form is submitted
      jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', 'form.config-form', function () {
        storage.removeItem('navTreePaths');
      });
      // Initialize if no previous state is defined
      if (jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree_content').length && typeof storage.navTreePaths === 'undefined') {
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
      } else if (_common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server') === storage.server && _common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('token') === storage.token) {
        // Reload the tree to the state before page refresh
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload(_navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.filterStateRestore, JSON.parse(storage.navTreePaths));
      } else {
        // If the user is different
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.treeStateUpdate();
        _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation.reload();
      }
    }
  };
}

/***/ }),

/***/ 60:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageSettings": function() { return /* binding */ PageSettings; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


/**
 * @fileoverview    function used for page-related settings
 * @name            Page-related settings
 *
 * @requires    jQueryUI
 */

function showSettings(selector) {
  // Keeping a clone to restore in case the user cancels the operation
  var $clone = jquery__WEBPACK_IMPORTED_MODULE_0__(selector + ' .page_settings').clone(true);
  jquery__WEBPACK_IMPORTED_MODULE_0__('#pageSettingsModalApplyButton').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__('.config-form').trigger('submit');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('#pageSettingsModalCloseButton,#pageSettingsModalCancelButton').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__(selector + ' .page_settings').replaceWith($clone);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pageSettingsModal').modal('hide');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('#pageSettingsModal').modal('show');
  jquery__WEBPACK_IMPORTED_MODULE_0__('#pageSettingsModal').find('.modal-body').first().html(jquery__WEBPACK_IMPORTED_MODULE_0__(selector));
  jquery__WEBPACK_IMPORTED_MODULE_0__(selector).css('display', 'block');
}
function showPageSettings() {
  showSettings('#page_settings_modal');
}
function showNaviSettings() {
  showSettings('#pma_navigation_settings');
}
const PageSettings = {
  /**
   * @return {void}
   */
  off: () => {
    jquery__WEBPACK_IMPORTED_MODULE_0__('#page_settings_icon').css('display', 'none');
    jquery__WEBPACK_IMPORTED_MODULE_0__('#page_settings_icon').off('click');
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_settings_icon').off('click');
  },
  /**
   * @return {void}
   */
  on: () => {
    if (jquery__WEBPACK_IMPORTED_MODULE_0__('#page_settings_modal').length) {
      jquery__WEBPACK_IMPORTED_MODULE_0__('#page_settings_icon').css('display', 'inline');
      jquery__WEBPACK_IMPORTED_MODULE_0__('#page_settings_icon').on('click', showPageSettings);
    }
    jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_settings_icon').on('click', showNaviSettings);
  }
};


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [44], function() { return __webpack_exec__(58); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map