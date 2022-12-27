"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[1],[
/* 0 */,
/* 1 */
/***/ (function(module) {

module.exports = jQuery;

/***/ }),
/* 2 */
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


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
  jquery__WEBPACK_IMPORTED_MODULE_0__.ajax({
    method: 'POST',
    url: 'index.php?route=/lint',
    dataType: 'json',
    data: {
      'sql_query': text,
      'server': _modules_common_js__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
      'options': options.lintOptions,
      'no_history': true
    },
    success: handleResponse
  });
};

/***/ })
],
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(2); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=sql-lint.js.map