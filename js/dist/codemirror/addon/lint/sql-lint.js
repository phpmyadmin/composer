(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[2],{

/***/ 2:
/***/ (function() {

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

  $.ajax({
    method: 'POST',
    url: 'index.php?route=/lint',
    dataType: 'json',
    data: {
      'sql_query': text,
      'server': window.CommonParams.get('server'),
      'options': options.lintOptions,
      'no_history': true
    },
    success: handleResponse
  });
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(2));
/******/ }
]);
//# sourceMappingURL=sql-lint.js.map