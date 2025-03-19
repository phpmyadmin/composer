"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[33],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 74:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);

function buildQueryStatsChart() {
  const queryStatisticsChartCanvas = document.getElementById('query-statistics-chart');
  if (!queryStatisticsChartCanvas) {
    return;
  }
  const chartDataJson = queryStatisticsChartCanvas.getAttribute('data-chart-data');
  let chartData = null;
  try {
    chartData = JSON.parse(chartDataJson);
  } catch (e) {
    return;
  }
  if (!(chartData && 'labels' in chartData && 'data' in chartData)) {
    return;
  }
  new window.Chart(queryStatisticsChartCanvas, {
    type: 'pie',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: window.Messages.numberOfStatements,
        data: chartData.data
      }]
    }
  });
}
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_0__.AJAX.registerOnload('server/status/queries.js', function () {
  buildQueryStatsChart();
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(74); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=queries.js.map