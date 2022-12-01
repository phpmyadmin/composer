"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[6],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 18:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _modules_navigation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _modules_common_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);





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

_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('database/operations.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('submit', '#rename_db_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('submit', '#copy_db_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('submit', '#change_db_charset_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('click', '#drop_db_anchor.ajax');
});
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('database/operations.js', function () {
  /**
   * Ajax event handlers for 'Rename Database'
   */
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', '#rename_db_form.ajax', function (event) {
    event.preventDefault();

    if (_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.emptyCheckTheField(this, 'newname')) {
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strFormEmpty, false, 'error');
      return false;
    }

    var oldDbName = _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db');
    var newDbName = jquery__WEBPACK_IMPORTED_MODULE_0__('#new_db_name').val();

    if (newDbName === oldDbName) {
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strDatabaseRenameToSameName, false, 'error');
      return false;
    }

    var $form = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    var question = _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.escapeHtml('CREATE DATABASE ' + newDbName + ' / DROP DATABASE ' + oldDbName);
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.prepareForAjaxRequest($form);
    $form.confirm(question, $form.attr('action'), function (url) {
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strRenamingDatabases, false);
      jquery__WEBPACK_IMPORTED_MODULE_0__.post(url, jquery__WEBPACK_IMPORTED_MODULE_0__('#rename_db_form').serialize() + _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'is_js_confirmed=1', function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.message);
          _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', data.newname);
          _modules_navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload(function () {
            jquery__WEBPACK_IMPORTED_MODULE_0__('#pma_navigation_tree').find('a:not(\'.expander\')').each(function () {
              var $thisAnchor = jquery__WEBPACK_IMPORTED_MODULE_0__(this);

              if ($thisAnchor.text() === data.newname) {
                // simulate a click on the new db name
                // in navigation
                $thisAnchor.trigger('click');
              }
            });
          });
        } else {
          _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.error, false);
        }
      }); // end $.post()
    });
  }); // end Rename Database

  /**
   * Ajax Event Handler for 'Copy Database'
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', '#copy_db_form.ajax', function (event) {
    event.preventDefault();

    if (_modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.emptyCheckTheField(this, 'newname')) {
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strFormEmpty, false, 'error');
      return false;
    }

    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strCopyingDatabase, false);
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.prepareForAjaxRequest($form);
    jquery__WEBPACK_IMPORTED_MODULE_0__.post($form.attr('action'), $form.serialize(), function (data) {
      // use messages that stay on screen
      jquery__WEBPACK_IMPORTED_MODULE_0__('.alert-success, .alert-danger').fadeOut();

      if (typeof data !== 'undefined' && data.success === true) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0__('#checkbox_switch').is(':checked')) {
          _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', data.newname);
          _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonActions.refreshMain(false, function () {
            _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.message);
          });
        } else {
          _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', data.db);
          _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.message);
        }

        _modules_navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
      } else {
        _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.error, false);
      }
    }); // end $.post()
  }); // end copy database

  /**
   * Change tables columns visible only if change tables is checked
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__('#span_change_all_tables_columns_collations').hide();
  jquery__WEBPACK_IMPORTED_MODULE_0__('#checkbox_change_all_tables_collations').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__('#span_change_all_tables_columns_collations').toggle();
  });
  /**
   * Ajax Event handler for 'Change Charset' of the database
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', '#change_db_charset_form.ajax', function (event) {
    event.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.prepareForAjaxRequest($form);
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strChangingCharset);
    jquery__WEBPACK_IMPORTED_MODULE_0__.post($form.attr('action'), $form.serialize(), function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.message);
      } else {
        _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.error, false);
      }
    }); // end $.post()
  }); // end change charset

  /**
   * Ajax event handlers for Drop Database
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '#drop_db_anchor.ajax', function (event) {
    event.preventDefault();
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    /**
     * @var {String} question String containing the question to be asked for confirmation
     */

    var question = window.Messages.strDropDatabaseStrongWarning + ' ';
    question += window.sprintf(window.Messages.strDoYouReally, 'DROP DATABASE `' + _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.escapeHtml(_modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db') + '`'));
    var params = _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.getJsConfirmCommonParam(this, $link.getPostData());
    jquery__WEBPACK_IMPORTED_MODULE_0__(this).confirm(question, jquery__WEBPACK_IMPORTED_MODULE_0__(this).attr('href'), function (url) {
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strProcessingRequest);
      jquery__WEBPACK_IMPORTED_MODULE_0__.post(url, params, function (data) {
        if (typeof data !== 'undefined' && data.success) {
          // Database deleted successfully, refresh both the frames
          _modules_navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
          _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', '');
          _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonActions.refreshMain('index.php?route=/server/databases', function () {
            _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.message);
          });
        } else {
          _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.error, false);
        }
      });
    });
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(18); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=operations.js.map