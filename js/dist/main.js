"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[30],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 54:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _modules_keyhandler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55);
/* harmony import */ var _modules_navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _modules_page_settings_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(56);
/* harmony import */ var _modules_cross_framing_protection_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(57);
/* harmony import */ var _modules_indexes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18);
/* harmony import */ var _modules_config_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony import */ var _modules_functions_checkNumberOfFields_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(23);










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
(0,_modules_cross_framing_protection_js__WEBPACK_IMPORTED_MODULE_6__.crossFramingProtection)();
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_config_js__WEBPACK_IMPORTED_MODULE_8__.Config.off());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_config_js__WEBPACK_IMPORTED_MODULE_8__.Config.on());
jquery__WEBPACK_IMPORTED_MODULE_0__.ajaxPrefilter(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.addNoCacheToAjaxRequests());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.off());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.on());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.dismissNotifications());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.initializeMenuResizer());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.floatingMenuBar());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.breadcrumbScrollToTop());
jquery__WEBPACK_IMPORTED_MODULE_0__(_modules_navigation_js__WEBPACK_IMPORTED_MODULE_4__.Navigation.onload());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', _modules_indexes_js__WEBPACK_IMPORTED_MODULE_7__.Indexes.off());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', _modules_indexes_js__WEBPACK_IMPORTED_MODULE_7__.Indexes.on());
jquery__WEBPACK_IMPORTED_MODULE_0__(() => (0,_modules_functions_checkNumberOfFields_js__WEBPACK_IMPORTED_MODULE_9__["default"])());
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('main.js', () => {
  _modules_page_settings_js__WEBPACK_IMPORTED_MODULE_5__.PageSettings.off();
});
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('main.js', () => {
  _modules_page_settings_js__WEBPACK_IMPORTED_MODULE_5__.PageSettings.on();
});

/***/ }),

/***/ 57:
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

/***/ 55:
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

/***/ 56:
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
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(54); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map