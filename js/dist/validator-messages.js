"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[69],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 97:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

function extendingValidatorMessages() {
  jquery__WEBPACK_IMPORTED_MODULE_0__.extend(jquery__WEBPACK_IMPORTED_MODULE_0__.validator.messages, {
    required: window.Messages.strValidatorRequired,
    remote: window.Messages.strValidatorRemote,
    email: window.Messages.strValidatorEmail,
    url: window.Messages.strValidatorUrl,
    date: window.Messages.strValidatorDate,
    dateISO: window.Messages.strValidatorDateIso,
    number: window.Messages.strValidatorNumber,
    creditcard: window.Messages.strValidatorCreditCard,
    digits: window.Messages.strValidatorDigits,
    equalTo: window.Messages.strValidatorEqualTo,
    maxlength: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidatorMaxLength),
    minlength: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidatorMinLength),
    rangelength: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidatorRangeLength),
    range: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidatorRange),
    max: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidatorMax),
    min: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidatorMin),
    validationFunctionForDateTime: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidationFunctionForDateTime),
    validationFunctionForHex: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidationFunctionForHex),
    validationFunctionForMd5: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidationFunctionForMd5),
    validationFunctionForAesDesEncrypt: jquery__WEBPACK_IMPORTED_MODULE_0__.validator.format(window.Messages.strValidationFunctionForAesDesEncrypt)
  });
}
window.extendingValidatorMessages = extendingValidatorMessages;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(97); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=validator-messages.js.map