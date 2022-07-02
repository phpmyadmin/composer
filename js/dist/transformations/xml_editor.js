(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[77],{

/***/ 80:
/***/ (function() {

/**
 * XML editor plugin
 *
 * @package PhpMyAdmin
 */
window.AJAX.registerOnload('transformations/xml_editor.js', function () {
  $('textarea.transform_xml_editor').each(function () {
    window.CodeMirror.fromTextArea(this, {
      lineNumbers: true,
      indentUnit: 4,
      mode: 'application/xml',
      lineWrapping: true
    });
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(80));
/******/ }
]);
//# sourceMappingURL=xml_editor.js.map