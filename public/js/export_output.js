"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["export_output"],{

/***/ "./resources/js/export_output.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/functions.ts");



_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('export_output.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown', function (e) {
    if ((e.which || e.keyCode) === 116) {
      e.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#export_refresh_form').trigger('submit');
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_refresh_btn').on('click', function (e) {
    e.preventDefault();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#export_refresh_form').trigger('submit');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_copy_to_clipboard_btn').on('click', function (e) {
    e.preventDefault();
    var copyStatus = (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.copyToClipboard)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea#textSQLDUMP').val(), '<textarea>');
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.displayCopyStatus)(this, copyStatus);
  });
});

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/export_output.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=export_output.js.map