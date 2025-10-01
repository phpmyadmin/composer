"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["replication"],{

/***/ "./resources/js/replication.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/functions.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/functions/getJsConfirmCommonParam.ts");





/**
 * @fileoverview    Javascript functions used in server replication page
 * @name            Server Replication
 *
 * @requires    jQueryUI
 */
var randomServerId = Math.floor(Math.random() * 10000000);
var confPrefix = 'server-id=' + randomServerId + '\nlog_bin=mysql-bin\nlog_error=mysql-bin.err\n';
function updateConfig() {
  var confIgnore = 'binlog_ignore_db=';
  var confDo = 'binlog_do_db=';
  var databaseList = '';
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select option:selected').length === 0) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rep').text(confPrefix);
  } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_type option:selected').val() === 'all') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select option:selected').each(function () {
      databaseList += confIgnore + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() + '\n';
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rep').text(confPrefix + databaseList);
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select option:selected').each(function () {
      databaseList += confDo + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() + '\n';
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rep').text(confPrefix + databaseList);
  }
}
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('replication.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_type').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#primary_status_href').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#primary_replicas_href').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_status_href').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_control_href').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_errormanagement_href').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_synchronization_href').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_reset_href').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select_href').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#reset_replica').off('click');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('replication.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rep').text(confPrefix);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_type').on('change', updateConfig);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select').on('change', updateConfig);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#primary_status_href').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replication_primary_section').toggle();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#primary_replicas_href').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replication_replicas_section').toggle();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_status_href').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replication_replica_section').toggle();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_control_href').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_control_gui').toggle();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_errormanagement_href').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_errormanagement_gui').toggle();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_synchronization_href').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#replica_synchronization_gui').toggle();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_reset_href').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select option:selected').prop('selected', false);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select').trigger('change');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select_href').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select option').prop('selected', true);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select').trigger('change');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#reset_replica').on('click', function (e) {
    e.preventDefault();
    var $anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var question = window.Messages.strResetReplicaWarning;
    $anchor.confirm(question, $anchor.attr('href'), function (url) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $anchor;
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_4__["default"])({
        'ajax_page_request': true,
        'ajax_request': true
      }, $anchor.getPostData());
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#button_generate_password').on('click', function () {
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.suggestPassword)(this.form);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nopass_1').on('click', function () {
    this.form.pma_pw.value = '';
    this.form.pma_pw2.value = '';
    this.checked = true;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nopass_0').on('click', function () {
    document.getElementById('text_pma_change_pw').focus();
  });
});

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/replication.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=replication.js.map