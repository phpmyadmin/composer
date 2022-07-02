(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[49],{

/***/ 52:
/***/ (function() {

/**
 * Make columns sortable, but only for tables with more than 1 data row.
 */
function makeColumnsSortable() {
  var $tables = $('#plugins_plugins table:has(tbody tr + tr)');
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

window.AJAX.registerOnload('server/plugins.js', function () {
  makeColumnsSortable();
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(52));
/******/ }
]);
//# sourceMappingURL=plugins.js.map