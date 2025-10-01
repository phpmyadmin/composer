"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["error_report"],{

/***/ "./resources/js/error_report.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/functions/getImageTag.ts");





/**
 * general function, usually for data manipulation pages
 *
 */
var ErrorReport = {
  /**
   * @var {object}, stores the last exception info
   */
  lastException: null,
  /**
   * @var object stores the Error Report Data to prevent unnecessary data fetching
   */
  errorReportData: null,
  /**
   * @var object maintains unique keys already used
   */
  keyDict: {},
  /**
   * handles thrown error exceptions based on user preferences
   *
   * @param {object} data
   * @param {any} exception
   */
  errorDataHandler: function (data, exception) {
    if (data.success !== true) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
      return;
    }
    if (data.report_setting === 'ask') {
      ErrorReport.showErrorNotification();
    } else if (data.report_setting === 'always') {
      var reportData = ErrorReport.getReportData(exception);
      var postData = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(reportData, {
        'send_error_report': true,
        'automatic': true
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/error-report', postData, function (data) {
        if (data.success === false) {
          // in the case of an error, show the error message returned.
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.message, false);
        }
      });
    }
  },
  errorHandler: function (exception) {
    // issue: 14359
    if (JSON.stringify(ErrorReport.lastException) === JSON.stringify(exception)) {
      return;
    }
    if (exception.name === null || typeof exception.name === 'undefined') {
      exception.name = ErrorReport.extractExceptionName(exception);
    }
    ErrorReport.lastException = exception;
    if (ErrorReport.errorReportData === null) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/error-report', {
        'ajax_request': true,
        'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server'),
        'get_settings': true,
        'exception_type': 'js'
      }, function (data) {
        ErrorReport.errorReportData = data;
        ErrorReport.errorDataHandler(data, exception);
      });
    } else {
      ErrorReport.errorDataHandler(ErrorReport.errorReportData, exception);
    }
  },
  /**
   * Shows the modal dialog previewing the report
   *
   * @param exception object error report info
   */
  showReportDialog: function (exception) {
    const reportData = ErrorReport.getReportData(exception);
    const sendErrorReport = function () {
      const postData = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(reportData, {
        'send_error_report': true,
        'description': jquery__WEBPACK_IMPORTED_MODULE_0___default()('#errorReportDescription').val(),
        'always_send': jquery__WEBPACK_IMPORTED_MODULE_0___default()('#errorReportAlwaysSendCheckbox')[0].checked
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/error-report', postData, function (data) {
        if (data.success === false) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.message, 3000);
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#errorReportModal').modal('hide');
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/error-report', reportData).done(function (data) {
      // Delete the modal to refresh it in case the user changed SendErrorReports value
      if (document.getElementById('errorReportModal') !== null) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#errorReportModal').remove();
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.report_modal));
      const $errorReportModal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#errorReportModal');
      $errorReportModal.on('show.bs.modal', function () {
        // Prevents multiple onClick events
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#errorReportModalConfirm').off('click', sendErrorReport);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#errorReportModalConfirm').on('click', sendErrorReport);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#errorReportModal .modal-body').html(data.message);
      });
      $errorReportModal.modal('show');
    });
  },
  /**
   * Shows the small notification that asks for user permission
   */
  showErrorNotification: function () {
    var key = Math.random().toString(36).substring(2, 12);
    while (key in ErrorReport.keyDict) {
      key = Math.random().toString(36).substring(2, 12);
    }
    ErrorReport.keyDict[key] = 1;
    var $div = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="alert alert-danger" role="alert" id="error_notification_' + key + '"></div>').append((0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_4__["default"])('s_error') + window.Messages.strErrorOccurred);
    var $buttons = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="float-end"></div>');
    var buttonHtml = '<button class="btn btn-primary" id="show_error_report_' + key + '">';
    buttonHtml += window.Messages.strShowReportDetails;
    buttonHtml += '</button>';
    var settingsUrl = 'index.php?route=/preferences/features&server=' + _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server');
    buttonHtml += '<a class="ajax" href="' + settingsUrl + '">';
    buttonHtml += (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_4__["default"])('s_cog', window.Messages.strChangeReportSettings);
    buttonHtml += '</a>';
    buttonHtml += '<a href="#" id="ignore_error_' + key + '" data-notification-id="' + key + '">';
    buttonHtml += (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_4__["default"])('b_close', window.Messages.strIgnore);
    buttonHtml += '</a>';
    $buttons.html(buttonHtml);
    $div.append($buttons);
    // eslint-disable-next-line compat/compat
    $div.appendTo(document.body);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#show_error_report_' + key, ErrorReport.createReportDialog);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#ignore_error_' + key, ErrorReport.removeErrorNotification);
  },
  /**
   * Removes the notification if it was displayed before
   *
   * @param {Event} e
   */
  removeErrorNotification: function () {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    if (e) {
      // don't remove the hash fragment by navigating to #
      e.preventDefault();
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#error_notification_' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('notification-id')).fadeOut(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
    });
  },
  /**
   * Extracts Exception name from message if it exists
   *
   * @param exception
   * @return {string}
   */
  extractExceptionName: function (exception) {
    if (exception.message === null || typeof exception.message === 'undefined') {
      return '';
    }
    var reg = /([a-zA-Z]+):/;
    var regexResult = reg.exec(exception.message);
    if (regexResult && regexResult.length === 2) {
      return regexResult[1];
    }
    return '';
  },
  /**
   * Shows the modal dialog previewing the report
   */
  createReportDialog: function () {
    ErrorReport.removeErrorNotification();
    ErrorReport.showReportDialog(ErrorReport.lastException);
  },
  /**
   * Returns the report data to send to the server
   *
   * @param exception object exception info
   *
   * @return {object}
   */
  getReportData: function (exception) {
    if (exception && exception.stack && exception.stack.length) {
      for (var i = 0; i < exception.stack.length; i++) {
        var stack = exception.stack[i];
        if (stack.context && stack.context.length) {
          for (var j = 0; j < stack.context.length; j++) {
            if (stack.context[j].length > 80) {
              stack.context[j] = stack.context[j].substring(-1, 75) + '//...';
            }
          }
        }
      }
    }
    var reportData = {
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server'),
      'ajax_request': true,
      'exception': exception,
      'url': window.location.href,
      'exception_type': 'js'
    };
    if (_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.scriptHandler.scripts.length > 0) {
      reportData.scripts = _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.scriptHandler.scripts.map(function (script) {
        return script;
      });
    }
    return reportData;
  },
  /**
   * Wraps given function in error reporting code and returns wrapped function
   *
   * @param {Function} func function to be wrapped
   *
   * @return {Function}
   */
  wrapFunction: function (func) {
    if (!func.wrapped) {
      var newFunc = function () {
        try {
          return func.apply(this, arguments);
        } catch (x) {
          window.TraceKit.report(x);
        }
      };
      // @ts-ignore
      newFunc.wrapped = true;
      // Set guid of wrapped function same as original function, so it can be removed
      // See bug#4146 (problem with jquery draggable and sortable)
      // @ts-ignore
      newFunc.guid = func.guid = func.guid || newFunc.guid || (jquery__WEBPACK_IMPORTED_MODULE_0___default().guid)++;
      return newFunc;
    } else {
      return func;
    }
  },
  /**
   * Automatically wraps the callback in AJAX.registerOnload
   */
  wrapAjaxOnloadCallback: function () {
    var oldOnload = _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload;
    _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload = function (file, func) {
      var wrappedFunction = ErrorReport.wrapFunction(func);
      oldOnload.call(this, file, wrappedFunction);
    };
  },
  /**
   * Automatically wraps the callback in $.fn.on
   */
  wrapJqueryOnCallback: function () {
    var oldOn = (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn).on;
    (jquery__WEBPACK_IMPORTED_MODULE_0___default().fn).on = function () {
      for (var i = 1; i <= 3; i++) {
        if (typeof arguments[i] === 'function') {
          arguments[i] = ErrorReport.wrapFunction(arguments[i]);
          break;
        }
      }
      return oldOn.apply(this, arguments);
    };
  },
  /**
   * Wraps the callback in AJAX.registerOnload automatically
   */
  setUpErrorReporting: function () {
    ErrorReport.wrapAjaxOnloadCallback();
    ErrorReport.wrapJqueryOnCallback();
  }
};
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('error_report.js', function () {
  window.TraceKit.report.subscribe(ErrorReport.errorHandler);
  ErrorReport.setUpErrorReporting();
});

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/error_report.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=error_report.js.map