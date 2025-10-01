"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["transformations/image_upload"],{

/***/ "./resources/js/transformations/image_upload.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");


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

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/transformations/image_upload.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=image_upload.js.map