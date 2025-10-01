"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["server/status/processes"],{

/***/ "./resources/js/server/status/processes.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/sql-highlight.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/js/modules/functions/escape.ts");
/* harmony import */ var _modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./resources/js/modules/functions/getImageTag.ts");







/**
 * Server Status Processes
 *
 * @package PhpMyAdmin
 */
// object to store process list state information
var processList = {
  // denotes whether auto refresh is on or off
  autoRefresh: false,
  // stores the GET request which refresh process list
  refreshRequest: null,
  // stores the timeout id returned by setTimeout
  refreshTimeout: null,
  // the refresh interval in seconds
  refreshInterval: null,
  // the refresh URL (required to save last used option)
  // i.e. full or sorting url
  refreshUrl: null,
  /**
   * Handles killing of a process
   */
  init: function () {
    processList.setRefreshLabel();
    if (processList.refreshUrl === null) {
      processList.refreshUrl = 'index.php?route=/server/status/processes/refresh';
    }
    if (processList.refreshInterval === null) {
      processList.refreshInterval = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_refreshRate').val();
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_refreshRate').val(processList.refreshInterval);
    }
  },
  /**
   * Handles killing of a process
   *
   * @param {object} event the event object
   */
  killProcessHandler: function (event) {
    event.preventDefault();
    var argSep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    var params = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).getPostData();
    params += argSep + 'ajax_request=1' + argSep + 'server=' + _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server');
    // Get row element of the process to be killed.
    var $tr = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href'), params, function (data) {
      // Check if process was killed or not.
      if (data.hasOwnProperty('success') && data.success) {
        // remove the row of killed process.
        $tr.remove();
        // As we just removed a row, reapply odd-even classes
        // to keep table stripes consistent
        var $tableProcessListTr = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tableprocesslist').find('> tbody > tr');
        $tableProcessListTr.each(function (index) {
          if (index >= 0 && index % 2 === 0) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('odd').addClass('even');
          } else if (index >= 0 && index % 2 !== 0) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('even').addClass('odd');
          }
        });
        // Show process killed message
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.message, false);
      } else {
        // Show process error message
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      }
    }, 'json');
  },
  /**
   * Handles Auto Refreshing
   */
  refresh: function () {
    // abort any previous pending requests
    // this is necessary, it may go into
    // multiple loops causing unnecessary
    // requests even after leaving the page.
    processList.abortRefresh();
    // if auto refresh is enabled
    if (processList.autoRefresh) {
      // Only fetch the table contents
      processList.refreshUrl = 'index.php?route=/server/status/processes/refresh';
      var interval = parseInt(processList.refreshInterval, 10) * 1000;
      var urlParams = processList.getUrlParams();
      processList.refreshRequest = jquery__WEBPACK_IMPORTED_MODULE_0___default().post(processList.refreshUrl, urlParams, function (data) {
        if (data.hasOwnProperty('success') && data.success) {
          var $newTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.message);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tableprocesslist').html($newTable.html());
          (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_3__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tableprocesslist'));
        }
        processList.refreshTimeout = setTimeout(processList.refresh, interval);
      });
    }
  },
  /**
   * Stop current request and clears timeout
   */
  abortRefresh: function () {
    if (processList.refreshRequest !== null) {
      processList.refreshRequest.abort();
      processList.refreshRequest = null;
    }
    clearTimeout(processList.refreshTimeout);
  },
  /**
   * Set label of refresh button
   * change between play & pause
   */
  setRefreshLabel: function () {
    var img = 'play';
    var label = window.Messages.strStartRefresh;
    if (processList.autoRefresh) {
      img = 'pause';
      label = window.Messages.strStopRefresh;
      processList.refresh();
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('a#toggleRefresh').html((0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_6__["default"])(img) + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(label));
  },
  /**
   * Return the Url Parameters
   * for autorefresh request,
   * includes showExecuting if the filter is checked
   *
   * @return {object} urlParams - url parameters with autoRefresh request
   */
  getUrlParams: function () {
    var urlParams = {
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server'),
      'ajax_request': true,
      'refresh': true,
      'full': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="full"]').val(),
      'order_by_field': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="order_by_field"]').val(),
      'column_name': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="column_name"]').val(),
      'sort_order': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="sort_order"]').val()
    };
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showExecuting').is(':checked')) {
      urlParams.showExecuting = true;
      return urlParams;
    }
    return urlParams;
  }
};
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/status/processes.js', function () {
  processList.init();
  // Bind event handler for kill_process
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tableprocesslist').on('click', 'a.kill_process', processList.killProcessHandler);
  // Bind event handler for toggling refresh of process list
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a#toggleRefresh').on('click', function (event) {
    event.preventDefault();
    processList.autoRefresh = !processList.autoRefresh;
    processList.setRefreshLabel();
  });
  // Bind event handler for change in refresh rate
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_refreshRate').on('change', function () {
    processList.refreshInterval = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    processList.refresh();
  });
  // Bind event handler for table header links
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tableprocesslist').on('click', 'thead a', function () {
    processList.refreshUrl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href');
  });
});
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('server/status/processes.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tableprocesslist').off('click', 'a.kill_process');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a#toggleRefresh').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_refreshRate').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tableprocesslist').off('click', 'thead a');
  // stop refreshing further
  processList.abortRefresh();
});

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/server/status/processes.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=processes.js.map