"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[24],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 64:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);




/**
 * @fileoverview    Implements the shiftkey + click remove column
 *                  from order by clause functionality
 * @name            columndelete
 *
 * @requires    jQuery
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('multi_column_sort.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('th.draggable.column_heading.pointer.marker a').on('click', function (event) {
    var orderUrlRemove = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().find('input[name="url-remove-order"]').val();
    var orderUrlAdd = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().find('input[name="url-add-order"]').val();
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    if (event.ctrlKey || event.altKey) {
      event.preventDefault();
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
      orderUrlRemove += argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/sql', orderUrlRemove, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    } else if (event.shiftKey) {
      event.preventDefault();
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
      orderUrlAdd += argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/sql', orderUrlAdd, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    }
  });
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('multi_column_sort.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'th.draggable.column_heading.pointer.marker a');
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(64); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=multi_column_sort.js.map