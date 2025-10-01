"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["table/find_replace"],{

/***/ "./resources/js/table/find_replace.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/functions.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/ajax-message.ts");




/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('table/find_replace.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#find_replace_form').off('submit');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#toggle_find').off('click');
});
/**
 * Bind events
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('table/find_replace.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id="toggle_find_div"><a id="toggle_find"></a></div>').insertAfter('#find_replace_form').hide();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#toggle_find').html(window.Messages.strHideFindNReplaceCriteria).on('click', function () {
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#find_replace_form').slideToggle();
    if ($link.text() === window.Messages.strHideFindNReplaceCriteria) {
      $link.text(window.Messages.strShowFindNReplaceCriteria);
    } else {
      $link.text(window.Messages.strHideFindNReplaceCriteria);
    }
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#find_replace_form').on('submit', function (e) {
    e.preventDefault();
    var findReplaceForm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#find_replace_form');
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)(findReplaceForm);
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(findReplaceForm.attr('action'), findReplaceForm.serialize(), function (data) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      if (data.success === true) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#toggle_find_div').show();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#toggle_find').trigger('click');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter').html(data.preview);
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter').html(data.error);
      }
    });
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
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/table/find_replace.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=find_replace.js.map