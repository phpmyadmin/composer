(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[74],{

/***/ 77:
/***/ (function() {

/**
 * JSON syntax highlighting transformation plugin
 *
 * @package PhpMyAdmin
 */
window.AJAX.registerOnload('transformations/json_editor.js', function () {
  $('textarea.transform_json_editor').each(function () {
    window.CodeMirror.fromTextArea(this, {
      lineNumbers: true,
      matchBrackets: true,
      indentUnit: 4,
      mode: 'application/json',
      lineWrapping: true
    });
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(77));
/******/ }
]);
//# sourceMappingURL=json_editor.js.map