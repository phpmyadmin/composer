(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[29],{

/***/ 33:
/***/ (function() {

window.AJAX.registerOnload('export_output.js', function () {
  $(document).on('keydown', function (e) {
    if ((e.which || e.keyCode) === 116) {
      e.preventDefault();
      $('#export_refresh_form').trigger('submit');
    }
  });
  $('.export_refresh_btn').on('click', function (e) {
    e.preventDefault();
    $('#export_refresh_form').trigger('submit');
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(33));
/******/ }
]);
//# sourceMappingURL=export_output.js.map