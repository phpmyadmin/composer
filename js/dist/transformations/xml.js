"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[66],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 94:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



/**
 * XML syntax highlighting transformation plugin
 */
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('transformations/xml.js', function () {
  var $elm = jquery__WEBPACK_IMPORTED_MODULE_0__('#page_content').find('code.xml');
  $elm.each(function () {
    var $json = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    var $pre = $json.find('pre');
    /* We only care about visible elements to avoid double processing */
    if ($pre.is(':visible')) {
      var $highlight = jquery__WEBPACK_IMPORTED_MODULE_0__('<div class="xml-highlight cm-s-default"></div>');
      $json.append($highlight);
      window.CodeMirror.runMode($json.text(), 'application/xml', $highlight[0]);
      $pre.hide();
    }
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(94); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=xml.js.map