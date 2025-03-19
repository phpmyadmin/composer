"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[10],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 36:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);





/**
 * Unbind all event handlers before tearing down the page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('database/tracking.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', '#trackedForm.ajax button[name="submit_mult"], #trackedForm.ajax input[name="submit_mult"]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', '#untrackedForm.ajax button[name="submit_mult"], #untrackedForm.ajax input[name="submit_mult"]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', 'a.delete_tracking_anchor.ajax');
});
/**
 * Bind event handlers
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('database/tracking.js', function () {
  var $versions = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#versions');
  $versions.find('tr').first().find('th').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="sorticon"></div>'));
  $versions.tablesorter({
    sortList: [[1, 0]],
    headers: {
      0: {
        sorter: false
      },
      2: {
        sorter: 'integer'
      },
      5: {
        sorter: false
      },
      6: {
        sorter: false
      },
      7: {
        sorter: false
      }
    }
  });
  var $noVersions = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#noversions');
  $noVersions.find('tr').first().find('th').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="sorticon"></div>'));
  $noVersions.tablesorter({
    sortList: [[1, 0]],
    headers: {
      0: {
        sorter: false
      },
      2: {
        sorter: false
      }
    }
  });
  var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
  /**
   * Handles multi submit for tracked tables
   */
  $body.on('click', '#trackedForm.ajax button[name="submit_mult"], #trackedForm.ajax input[name="submit_mult"]', function (e) {
    e.preventDefault();
    var $button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $form = $button.parent('form');
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    var submitData = $form.serialize() + argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true' + argsep + 'submit_mult=' + $button.val();
    if ($button.val() === 'delete_tracking') {
      var question = window.Messages.strDeleteTrackingDataMultiple;
      $button.confirm(question, $form.attr('action'), function (url) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strDeletingTrackingData);
        _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, submitData, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
      });
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), submitData, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    }
  });
  /**
   * Handles multi submit for untracked tables
   */
  $body.on('click', '#untrackedForm.ajax button[name="submit_mult"], #untrackedForm.ajax input[name="submit_mult"]', function (e) {
    e.preventDefault();
    var $button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $form = $button.parent('form');
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    var submitData = $form.serialize() + argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true' + argsep + 'submit_mult=' + $button.val();
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
    _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), submitData, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
  });
  /**
   * Ajax Event handler for 'Delete tracking'
   */
  $body.on('click', 'a.delete_tracking_anchor.ajax', function (e) {
    e.preventDefault();
    var $anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var question = window.Messages.strDeleteTrackingData;
    $anchor.confirm(question, $anchor.attr('href'), function (url) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strDeletingTrackingData);
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $anchor;
      var argSep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_4__["default"])(this, $anchor.getPostData());
      params += argSep + 'ajax_page_request=1';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    });
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(36); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=tracking.js.map