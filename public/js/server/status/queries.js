"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["server/status/queries"],{

/***/ "./resources/js/server/status/queries.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./resources/js/modules/ajax.ts");

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

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/server/status/queries.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=queries.js.map