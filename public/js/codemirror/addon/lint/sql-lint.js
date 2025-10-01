"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["codemirror/addon/lint/sql-lint"],{

/***/ "./resources/js/codemirror/addon/lint/sql-lint.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/common.ts");


// @ts-ignore
window.CodeMirror.sqlLint = function (text, updateLinting, options, cm) {
  // Skipping check if text box is empty.
  if (text.trim() === '') {
    updateLinting(cm, []);
    return;
  }
  function handleResponse(response) {
    var found = [];
    for (var idx in response) {
      found.push({
        // eslint-disable-next-line new-cap
        from: window.CodeMirror.Pos(response[idx].fromLine, response[idx].fromColumn),
        // eslint-disable-next-line new-cap
        to: window.CodeMirror.Pos(response[idx].toLine, response[idx].toColumn),
        messageHTML: response[idx].message,
        severity: response[idx].severity
      });
    }
    updateLinting(cm, found);
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    method: 'POST',
    url: 'index.php?route=/lint',
    dataType: 'json',
    data: {
      'sql_query': text,
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
      'options': options.lintOptions,
      'no_history': true,
      'ajax_request': true
    },
    success: handleResponse
  });
};

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["shared"], function() { return __webpack_exec__("./resources/js/codemirror/addon/lint/sql-lint.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=sql-lint.js.map