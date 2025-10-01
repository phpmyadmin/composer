"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["shortcuts_handler"],{

/***/ "./resources/js/shortcuts_handler.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/common.ts");


/**
 * @fileoverview    Handle shortcuts in various pages
 * @name            Shortcuts handler
 *
 * @requires    jQuery
 * @requires    jQueryUI
 */
/**
 * Register key events on load
 */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var databaseOp = false;
  var tableOp = false;
  var keyD = 68;
  var keyT = 84;
  var keyK = 75;
  var keyS = 83;
  var keyF = 70;
  var keyE = 69;
  var keyH = 72;
  var keyC = 67;
  var keyBackSpace = 8;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keyup', function (e) {
    // is a string but is also a boolean according to https://api.jquery.com/prop/
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).prop('contenteditable') === 'true' || jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).prop('contenteditable') === true) {
      return;
    }
    if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA' || e.target.nodeName === 'SELECT') {
      return;
    }
    if (e.keyCode === keyD) {
      setTimeout(function () {
        databaseOp = false;
      }, 2000);
    } else if (e.keyCode === keyT) {
      setTimeout(function () {
        tableOp = false;
      }, 2000);
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown', function (e) {
    // is a string but is also a boolean according to https://api.jquery.com/prop/
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).prop('contenteditable') === 'true' || jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).prop('contenteditable') === true) {
      return;
    }
    // disable the shortcuts when session has timed out.
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#modalOverlay').length > 0) {
      return;
    }
    if (e.ctrlKey && e.altKey && e.keyCode === keyC) {
      window.Console.toggle();
    }
    if (e.ctrlKey && e.keyCode === keyK) {
      e.preventDefault();
      window.Console.toggle();
    }
    if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA' || e.target.nodeName === 'SELECT') {
      return;
    }
    var isTable;
    var isDb;
    if (e.keyCode === keyD) {
      databaseOp = true;
    } else if (e.keyCode === keyK) {
      e.preventDefault();
      window.Console.toggle();
    } else if (e.keyCode === keyS) {
      if (databaseOp === true) {
        isTable = _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('table');
        isDb = _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db');
        if (isDb && !isTable) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-link .ic_b_props').first().trigger('click');
        }
      } else if (tableOp === true) {
        isTable = _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('table');
        isDb = _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db');
        if (isDb && isTable) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-link .ic_b_props').first().trigger('click');
        }
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings_icon').trigger('click');
      }
    } else if (e.keyCode === keyF) {
      if (databaseOp === true) {
        isTable = _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('table');
        isDb = _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db');
        if (isDb && !isTable) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-link .ic_b_search').first().trigger('click');
        }
      } else if (tableOp === true) {
        isTable = _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('table');
        isDb = _modules_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db');
        if (isDb && isTable) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-link .ic_b_search').first().trigger('click');
        }
      }
    } else if (e.keyCode === keyT) {
      tableOp = true;
    } else if (e.keyCode === keyE) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ic_b_export').first().trigger('click');
    } else if (e.keyCode === keyBackSpace) {
      window.history.back();
    } else if (e.keyCode === keyH) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ic_b_home').first().trigger('click');
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
/******/ __webpack_require__.O(0, ["shared"], function() { return __webpack_exec__("./resources/js/shortcuts_handler.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=shortcuts_handler.js.map