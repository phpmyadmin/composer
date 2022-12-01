"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[38],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 53:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _modules_navigation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _modules_common_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);





/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */

const DropDatabases = {
  /**
   * @param {Event} event
   */
  handleEvent: function (event) {
    event.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    /**
     * @var selected_dbs Array containing the names of the checked databases
     */

    var selectedDbs = []; // loop over all checked checkboxes, except the .checkall_box checkbox

    $form.find('input:checkbox:checked:not(.checkall_box)').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0__(this).closest('tr').addClass('removeMe');
      selectedDbs[selectedDbs.length] = 'DROP DATABASE `' + _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.escapeHtml(jquery__WEBPACK_IMPORTED_MODULE_0__(this).val()) + '`;';
    });

    if (!selectedDbs.length) {
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(jquery__WEBPACK_IMPORTED_MODULE_0__('<div class="alert alert-warning" role="alert"></div>').text(window.Messages.strNoDatabasesSelected), 2000);
      return;
    }
    /**
     * @var question    String containing the question to be asked for confirmation
     */


    var question = window.Messages.strDropDatabaseStrongWarning + ' ' + window.sprintf(window.Messages.strDoYouReally, selectedDbs.join('<br>'));
    const modal = jquery__WEBPACK_IMPORTED_MODULE_0__('#dropDatabaseModal');
    modal.find('.modal-body').html(question);
    modal.modal('show');
    const url = 'index.php?route=/server/databases/destroy&' + jquery__WEBPACK_IMPORTED_MODULE_0__(this).serialize();
    jquery__WEBPACK_IMPORTED_MODULE_0__('#dropDatabaseModalDropButton').on('click', function () {
      _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strProcessingRequest, false);
      var parts = url.split('?');
      var params = _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.getJsConfirmCommonParam(this, parts[1]);
      jquery__WEBPACK_IMPORTED_MODULE_0__.post(parts[0], params, function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.message);
          var $rowsToRemove = $form.find('tr.removeMe');
          var $databasesCount = jquery__WEBPACK_IMPORTED_MODULE_0__('#filter-rows-count');
          var newCount = parseInt($databasesCount.text(), 10) - $rowsToRemove.length;
          $databasesCount.text(newCount);
          $rowsToRemove.remove();
          $form.find('tbody').sortTable('.name');

          if ($form.find('tbody').find('tr').length === 0) {
            // user just dropped the last db on this page
            _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonActions.refreshMain();
          }

          _modules_navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
        } else {
          $form.find('tr.removeMe').removeClass('removeMe');
          _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.error, false);
        }
      });
      modal.modal('hide');
      jquery__WEBPACK_IMPORTED_MODULE_0__('#dropDatabaseModalDropButton').off('click');
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
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0__(this); // TODO Remove this section when all browsers support HTML5 "required" property

    var newDbNameInput = $form.find('input[name=new_db]');

    if (newDbNameInput.val() === '') {
      newDbNameInput.trigger('focus');
      alert(window.Messages.strFormEmpty);
      return;
    } // end remove


    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(window.Messages.strProcessingRequest);
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.prepareForAjaxRequest($form);
    jquery__WEBPACK_IMPORTED_MODULE_0__.post($form.attr('action'), $form.serialize(), function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.message);
        var $databasesCountObject = jquery__WEBPACK_IMPORTED_MODULE_0__('#filter-rows-count');
        var databasesCount = parseInt($databasesCountObject.text(), 10) + 1;
        $databasesCountObject.text(databasesCount);
        _modules_navigation_js__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload(); // make ajax request to load db structure page - taken from ajax.js

        var dbStructUrl = data.url;
        dbStructUrl = dbStructUrl.replace(/amp;/ig, '');
        var params = 'ajax_request=true' + _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'ajax_page_request=true';
        jquery__WEBPACK_IMPORTED_MODULE_0__.get(dbStructUrl, params, _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
      } else {
        _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.ajaxShowMessage(data.error, false);
      }
    });
  }
};

function checkPrivilegesForDatabase() {
  var tableRows = jquery__WEBPACK_IMPORTED_MODULE_0__('.server_databases');
  jquery__WEBPACK_IMPORTED_MODULE_0__.each(tableRows, function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__(this).on('click', function () {
      _modules_common_js__WEBPACK_IMPORTED_MODULE_4__.CommonActions.setDb(jquery__WEBPACK_IMPORTED_MODULE_0__(this).attr('data'));
    });
  });
}

_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('server/databases.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('submit', '#dbStatsForm');
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('submit', '#create_database_form.ajax');
});
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/databases.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', '#dbStatsForm', DropDatabases.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', '#create_database_form.ajax', CreateDatabase.handleEvent);
  checkPrivilegesForDatabase();
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(53); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=databases.js.map