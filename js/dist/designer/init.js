"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[17],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 40:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



/**
 * Initializes the data required to run Designer, then fires it up.
 */

/* global DesignerOfflineDB */ // js/designer/database.js
/* global DesignerHistory */ // js/designer/history.js
/* global DesignerMove */ // js/designer/move.js
/* global DesignerPage */ // js/designer/page.js
/* global designerConfig */ // templates/database/designer/main.twig

_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('designer/init.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0__('.trigger').off('click');
});
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('designer/init.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0__('.trigger').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__('.panel').toggle('fast');
    jquery__WEBPACK_IMPORTED_MODULE_0__(this).toggleClass('active');
    jquery__WEBPACK_IMPORTED_MODULE_0__('#ab').accordion('refresh');
    return false;
  });
  window.jTabs = designerConfig.scriptTables.j_tabs;
  window.hTabs = designerConfig.scriptTables.h_tabs;
  window.contr = designerConfig.scriptContr;
  window.displayField = designerConfig.scriptDisplayField;
  window.server = designerConfig.server;
  window.selectedPage = designerConfig.displayPage;
  window.db = designerConfig.db;
  window.designerTablesEnabled = designerConfig.tablesEnabled;
  DesignerMove.main();
  if (!window.designerTablesEnabled) {
    DesignerOfflineDB.open(function (success) {
      if (success) {
        DesignerPage.showTablesInLandingPage(window.db);
      }
    });
  }
  jquery__WEBPACK_IMPORTED_MODULE_0__('#query_Aggregate_Button').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__('#query_Aggregate').css('display', 'none');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('#query_having_button').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__('#query_having').css('display', 'none');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('#query_rename_to_button').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__('#query_rename_to').css('display', 'none');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('#build_query_button').on('click', function () {
    DesignerHistory.buildQuery('SQL Query on Database', 0);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('#query_where_button').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__('#query_where').css('display', 'none');
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(40); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=init.js.map