"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[43],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 70:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _modules_functions_createProfilingChart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);



/**
 * @fileoverview    Javascript functions used in server status query page
 * @name            Server Status Query
 *
 * @requires    jQueryUI
 */

/* global initTableSorter */
// js/server/status/sorter.js

/**
 * Unbind all event handlers before tearing down a page
 */

_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('server/status/queries.js', function () {
  if (document.getElementById('serverstatusquerieschart') !== null) {
    var queryPieChart = jquery__WEBPACK_IMPORTED_MODULE_0__('#serverstatusquerieschart').data('queryPieChart');

    if (queryPieChart) {
      queryPieChart.destroy();
    }
  }
});
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/status/queries.js', function () {
  // Build query statistics chart
  var cdata = [];

  try {
    if (document.getElementById('serverstatusquerieschart') !== null) {
      jquery__WEBPACK_IMPORTED_MODULE_0__.each(jquery__WEBPACK_IMPORTED_MODULE_0__('#serverstatusquerieschart').data('chart'), function (key, value) {
        cdata.push([key, parseInt(value, 10)]);
      });
      jquery__WEBPACK_IMPORTED_MODULE_0__('#serverstatusquerieschart').data('queryPieChart', (0,_modules_functions_createProfilingChart_js__WEBPACK_IMPORTED_MODULE_2__["default"])('serverstatusquerieschart', cdata));
    }
  } catch (exception) {// Could not load chart, no big deal...
  }

  initTableSorter('statustabs_queries');
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(70); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=queries.js.map