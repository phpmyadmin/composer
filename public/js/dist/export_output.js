"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[16],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 47:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);



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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(47); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=export_output.js.map