"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["u2f"],{

/***/ "./resources/js/u2f.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/ajax-message.ts");



_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('u2f.js', function () {
  var $inputReg = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#u2f_registration_response');
  if ($inputReg.length > 0) {
    var $formReg = $inputReg.parents('form');
    $formReg.find('input[type=submit]').hide();
    setTimeout(function () {
      // A magic JS function that talks to the USB device. This function will keep polling for the USB device until it finds one.
      var request = JSON.parse($inputReg.attr('data-request'));
      if (!(window.u2f && typeof window.u2f.register === 'function')) {
        return;
      }
      window.u2f.register(request.appId, [request], JSON.parse($inputReg.attr('data-signatures')), function (data) {
        // Handle returning error data
        if (data.errorCode && data.errorCode !== 0) {
          switch (data.errorCode) {
            case 5:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FTimeout, false, 'error');
              break;
            case 4:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FErrorRegister, false, 'error');
              break;
            case 3:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FInvalidClient, false, 'error');
              break;
            case 2:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FBadRequest, false, 'error');
              break;
            default:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FUnknown, false, 'error');
              break;
          }
          return;
        }
        // Fill and submit form.
        $inputReg.val(JSON.stringify(data));
        $formReg.trigger('submit');
      });
    }, 1000);
  }
  var $inputAuth = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#u2f_authentication_response');
  if ($inputAuth.length > 0) {
    var $formAuth = $inputAuth.parents('form');
    $formAuth.find('input[type=submit]').hide();
    setTimeout(function () {
      // Magic JavaScript talking to your HID
      // appid, challenge, authenticateRequests
      var request = JSON.parse($inputAuth.attr('data-request'));
      if (!(window.u2f && typeof window.u2f.sign === 'function')) {
        return;
      }
      window.u2f.sign(request[0].appId, request[0].challenge, request, function (data) {
        // Handle returning error data
        if (data.errorCode && data.errorCode !== 0) {
          switch (data.errorCode) {
            case 5:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FTimeout, false, 'error');
              break;
            case 4:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FErrorAuthenticate, false, 'error');
              break;
            case 3:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FInvalidClient, false, 'error');
              break;
            case 2:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FBadRequest, false, 'error');
              break;
            default:
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.strU2FUnknown, false, 'error');
              break;
          }
          return;
        }
        // Fill and submit form.
        $inputAuth.val(JSON.stringify(data));
        $formAuth.trigger('submit');
      });
    }, 1000);
  }
});

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/u2f.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=u2f.js.map