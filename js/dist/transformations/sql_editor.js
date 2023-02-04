"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[60],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 98:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);




/**
 * SQL syntax highlighting transformation plugin js
 *
 * @package PhpMyAdmin
 */
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('transformations/sql_editor.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0__('textarea.transform_sql_editor').each(function () {
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.getSqlEditor(jquery__WEBPACK_IMPORTED_MODULE_0__(this), {}, 'both');
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [44], function() { return __webpack_exec__(98); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=sql_editor.js.map