"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[39],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 65:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



/**
 * Make columns sortable, but only for tables with more than 1 data row.
 */
function makeColumnsSortable() {
  var $tables = jquery__WEBPACK_IMPORTED_MODULE_0__('#plugins_plugins table:has(tbody tr + tr)');
  $tables.tablesorter({
    sortList: [[0, 0]],
    headers: {
      1: {
        sorter: false
      }
    }
  });
  $tables.find('thead th').append('<div class="sorticon"></div>');
}
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/plugins.js', function () {
  makeColumnsSortable();
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(65); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=plugins.js.map