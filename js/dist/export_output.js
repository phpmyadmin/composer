"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[24],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 49:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('export_output.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('keydown', function (e) {
    if ((e.which || e.keyCode) === 116) {
      e.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_0__('#export_refresh_form').trigger('submit');
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('.export_refresh_btn').on('click', function (e) {
    e.preventDefault();
    jquery__WEBPACK_IMPORTED_MODULE_0__('#export_refresh_form').trigger('submit');
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(49); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=export_output.js.map