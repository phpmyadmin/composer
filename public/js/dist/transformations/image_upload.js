"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[51],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 92:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);


/**
 * Image upload transformations plugin js
 *
 * @package PhpMyAdmin
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('transformations/image_upload.js', function () {
  // Change thumbnail when image file is selected
  // through file upload dialog
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input.image-upload').on('change', function () {
    const fileInput = this;
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      reader.onload = function (e) {
        $input.prevAll('img').attr('src', e.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  });
});
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('transformations/image_upload.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input.image-upload').off('change');
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(92); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=image_upload.js.map