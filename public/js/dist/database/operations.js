"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[5],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 31:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29);
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);









/**
 * @fileoverview    function used in server privilege pages
 * @name            Database Operations
 *
 * @requires    jQueryUI
 */
/**
 * Ajax event handlers here for /database/operations
 *
 * Actions Ajaxified here:
 * Rename Database
 * Copy Database
 * Change Charset
 * Drop Database
 */
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('database/operations.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '#rename_db_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '#copy_db_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '#change_db_charset_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#drop_db_anchor.ajax');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('database/operations.js', function () {
  /**
   * Ajax event handlers for 'Rename Database'
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '#rename_db_form.ajax', function (event) {
    event.preventDefault();
    if ((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.emptyCheckTheField)(this, 'newname')) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strFormEmpty, false, 'error');
      return false;
    }
    var oldDbName = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db');
    var newDbName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#new_db_name').val();
    if (newDbName === oldDbName) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strDatabaseRenameToSameName, false, 'error');
      return false;
    }
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var question = (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)('CREATE DATABASE ' + newDbName + ' / DROP DATABASE ' + oldDbName);
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)($form);
    $form.confirm(question, $form.attr('action'), function (url) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strRenamingDatabases, false);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rename_db_form').serialize() + _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'is_js_confirmed=1', function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', data.newname));
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload(function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('a:not(\'.expander\')').each(function () {
              var $thisAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
              if ($thisAnchor.text() === data.newname) {
                // simulate a click on the new db name
                // in navigation
                $thisAnchor.trigger('click');
              }
            });
          });
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
        }
      }); // end $.post()
    });
  }); // end Rename Database
  /**
   * Ajax Event Handler for 'Copy Database'
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '#copy_db_form.ajax', function (event) {
    event.preventDefault();
    if ((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.emptyCheckTheField)(this, 'newname')) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strFormEmpty, false, 'error');
      return false;
    }
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strCopyingDatabase, false);
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)($form);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize(), function (data) {
      // use messages that stay on screen
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.alert-success, .alert-danger').fadeOut();
      if (typeof data !== 'undefined' && data.success === true) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_switch').is(':checked')) {
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', data.newname));
          (0,_modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__["default"])(false);
          _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.callback = () => {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
          };
        } else {
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', data.db));
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
        }
        _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
      }
    }); // end $.post()
  }); // end copy database
  /**
   * Change tables columns visible only if change tables is checked
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#span_change_all_tables_columns_collations').hide();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_change_all_tables_collations').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#span_change_all_tables_columns_collations').toggle();
  });
  /**
   * Ajax Event handler for 'Change Charset' of the database
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '#change_db_charset_form.ajax', function (event) {
    event.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)($form);
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strChangingCharset);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize(), function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
      }
    }); // end $.post()
  }); // end change charset
  /**
   * Ajax event handlers for Drop Database
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#drop_db_anchor.ajax', function (event) {
    event.preventDefault();
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    /**
     * @var {string} question String containing the question to be asked for confirmation
     */
    var question = window.Messages.strDropDatabaseStrongWarning + ' ';
    question += window.sprintf(window.Messages.strDoYouReally, 'DROP DATABASE `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(_modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db') + '`'));
    var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_6__["default"])(this, $link.getPostData());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).confirm(question, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href'), function (url) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
        if (typeof data !== 'undefined' && data.success) {
          // Database deleted successfully, refresh both the frames
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', ''));
          (0,_modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__["default"])('index.php?route=/server/databases');
          _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.callback = () => {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
          };
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
        }
      });
    });
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(31); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=operations.js.map