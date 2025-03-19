"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[59],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 100:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

function extendingValidatorMessages() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().extend((jquery__WEBPACK_IMPORTED_MODULE_0___default().validator).messages, {
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
    maxlength: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidatorMaxLength),
    minlength: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidatorMinLength),
    rangelength: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidatorRangeLength),
    range: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidatorRange),
    max: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidatorMax),
    min: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidatorMin),
    validationFunctionForDateTime: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidationFunctionForDateTime),
    validationFunctionForHex: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidationFunctionForHex),
    validationFunctionForMd5: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidationFunctionForMd5),
    validationFunctionForAesDesEncrypt: jquery__WEBPACK_IMPORTED_MODULE_0___default().validator.format(window.Messages.strValidationFunctionForAesDesEncrypt)
  });
}
window.extendingValidatorMessages = extendingValidatorMessages;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(100); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=validator-messages.js.map