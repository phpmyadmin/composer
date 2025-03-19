"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[28],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 67:
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
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const DropDatabases = {
  /**
   * @param {Event} event
   */
  handleEvent: function (event) {
    event.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    /**
     * @var selected_dbs Array containing the names of the checked databases
     */
    var selectedDbs = [];
    // loop over all checked checkboxes, except the .checkall_box checkbox
    $form.find('input:checkbox:checked:not(.checkall_box)').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr').addClass('removeMe');
      selectedDbs[selectedDbs.length] = 'DROP DATABASE `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) + '`;';
    });
    if (!selectedDbs.length) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="alert alert-warning" role="alert"></div>').text(window.Messages.strNoDatabasesSelected), 2000);
      return;
    }
    /**
     * @var question    String containing the question to be asked for confirmation
     */
    var question = window.Messages.strDropDatabaseStrongWarning + ' ' + window.sprintf(window.Messages.strDoYouReally, selectedDbs.join('<br>'));
    const modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dropDatabaseModal');
    modal.find('.modal-body').html(question);
    modal.modal('show');
    const url = 'index.php?route=/server/databases/destroy&' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).serialize();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dropDatabaseModalDropButton').on('click', function () {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strProcessingRequest, false);
      var parts = url.split('?');
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_6__["default"])(this, parts[1]);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(parts[0], params, function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
          var $rowsToRemove = $form.find('tr.removeMe');
          var $databasesCount = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filter-rows-count');
          var newCount = parseInt($databasesCount.text(), 10) - $rowsToRemove.length;
          $databasesCount.text(newCount);
          $rowsToRemove.remove();
          $form.find('tbody').sortTable('.name');
          if ($form.find('tbody').find('tr').length === 0) {
            // user just dropped the last db on this page
            (0,_modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__["default"])();
          }
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
        } else {
          $form.find('tr.removeMe').removeClass('removeMe');
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
        }
      });
      modal.modal('hide');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dropDatabaseModalDropButton').off('click');
    });
  }
};
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const CreateDatabase = {
  /**
   * @param {Event} event
   */
  handleEvent: function (event) {
    event.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    // TODO Remove this section when all browsers support HTML5 "required" property
    var newDbNameInput = $form.find('input[name=new_db]');
    if (newDbNameInput.val() === '') {
      newDbNameInput.trigger('focus');
      alert(window.Messages.strFormEmpty);
      return;
    }
    // end remove
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strProcessingRequest);
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)($form);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize(), function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
        var $databasesCountObject = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filter-rows-count');
        var databasesCount = parseInt($databasesCountObject.text(), 10) + 1;
        $databasesCountObject.text(databasesCount);
        _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
        // make ajax request to load db structure page - taken from ajax.js
        var dbStructUrl = data.url;
        dbStructUrl = dbStructUrl.replace(/amp;/ig, '');
        var params = 'ajax_request=true' + _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'ajax_page_request=true';
        jquery__WEBPACK_IMPORTED_MODULE_0___default().get(dbStructUrl, params, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
      }
    });
  }
};
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('server/databases.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '#dbStatsForm');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '#create_database_form.ajax');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/databases.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '#dbStatsForm', DropDatabases.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '#create_database_form.ajax', CreateDatabase.handleEvent);
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(67); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=databases.js.map