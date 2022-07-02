(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[75],{

/***/ 78:
/***/ (function() {

/**
 * SQL syntax highlighting transformation plugin js
 *
 * @package PhpMyAdmin
 */
window.AJAX.registerOnload('transformations/sql_editor.js', function () {
  $('textarea.transform_sql_editor').each(function () {
    Functions.getSqlEditor($(this), {}, 'both');
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(78));
/******/ }
]);
//# sourceMappingURL=sql_editor.js.map