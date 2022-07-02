(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[73],{

/***/ 76:
/***/ (function() {

/**
 * JSON syntax highlighting transformation plugin
 */
window.AJAX.registerOnload('transformations/json.js', function () {
  var $elm = $('#page_content').find('code.json');
  $elm.each(function () {
    var $json = $(this);
    var $pre = $json.find('pre');
    /* We only care about visible elements to avoid double processing */

    if ($pre.is(':visible')) {
      var $highlight = $('<div class="json-highlight cm-s-default"></div>');
      $json.append($highlight);
      window.CodeMirror.runMode($json.text(), 'application/json', $highlight[0]);
      $pre.hide();
    }
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(76));
/******/ }
]);
//# sourceMappingURL=json.js.map