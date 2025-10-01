"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["transformations/xml"],{

/***/ "./resources/js/transformations/xml.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");


/**
 * XML syntax highlighting transformation plugin
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('transformations/xml.js', function () {
  var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').find('code.xml');
  $elm.each(function () {
    var $json = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $pre = $json.closest('pre');
    /* We only care about visible elements to avoid double processing */
    if ($json.is(':visible')) {
      var $highlight = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="xml-highlight cm-s-default"></div>');
      $pre.append($highlight);
      // @ts-ignore
      window.CodeMirror.runMode($json.text(), 'application/xml', $highlight[0]);
      $json.hide();
    }
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
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/transformations/xml.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=xml.js.map