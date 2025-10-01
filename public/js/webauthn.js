"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["webauthn"],{

/***/ "./resources/js/webauthn.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/ajax-message.ts");



/**
 * @param {ArrayBuffer} buffer
 *
 * @return {string}
 */
const arrayBufferToBase64 = buffer => {
  const bytes = new Uint8Array(buffer);
  let string = '';
  for (const byte of bytes) {
    string += String.fromCharCode(byte);
  }
  return window.btoa(string);
};
/**
 * @param {string} string
 *
 * @return {Uint8Array}
 */
const base64ToUint8Array = string => {
  return Uint8Array.from(window.atob(string), char => char.charCodeAt(0));
};
/**
 * @param {JQuery<HTMLElement>} $input
 */
const handleCreation = $input => {
  const $form = $input.parents('form');
  $form.find('input[type=submit]').hide();
  const creationOptionsJson = $input.attr('data-creation-options');
  const creationOptions = JSON.parse(creationOptionsJson);
  const publicKey = creationOptions;
  publicKey.challenge = base64ToUint8Array(creationOptions.challenge);
  publicKey.user.id = base64ToUint8Array(creationOptions.user.id);
  if (creationOptions.excludeCredentials) {
    const excludedCredentials = [];
    for (let value of creationOptions.excludeCredentials) {
      let excludedCredential = value;
      excludedCredential.id = base64ToUint8Array(value.id);
      excludedCredentials.push(excludedCredential);
    }
    publicKey.excludeCredentials = excludedCredentials;
  }
  // eslint-disable-next-line compat/compat
  navigator.credentials.create({
    publicKey: publicKey
  }).then(credential => {
    const credentialJson = JSON.stringify({
      id: credential.id,
      rawId: arrayBufferToBase64(credential.rawId),
      type: credential.type,
      response: {
        clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
        attestationObject: arrayBufferToBase64(credential.response.attestationObject)
      }
    });
    $input.val(credentialJson);
    $form.trigger('submit');
  }).catch(error => (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(error, false, 'error'));
};
/**
 * @param {JQuery<HTMLElement>} $input
 */
const handleRequest = $input => {
  const $form = $input.parents('form');
  $form.find('input[type=submit]').hide();
  const requestOptionsJson = $input.attr('data-request-options');
  const requestOptions = JSON.parse(requestOptionsJson);
  const publicKey = requestOptions;
  publicKey.challenge = base64ToUint8Array(requestOptions.challenge);
  if (requestOptions.allowCredentials) {
    const allowedCredentials = [];
    for (let value of requestOptions.allowCredentials) {
      let allowedCredential = value;
      allowedCredential.id = base64ToUint8Array(value.id);
      allowedCredentials.push(allowedCredential);
    }
    publicKey.allowCredentials = allowedCredentials;
  }
  // eslint-disable-next-line compat/compat
  navigator.credentials.get({
    publicKey: publicKey
  }).then(credential => {
    const credentialJson = JSON.stringify({
      id: credential.id,
      rawId: arrayBufferToBase64(credential.rawId),
      type: credential.type,
      response: {
        authenticatorData: arrayBufferToBase64(credential.response.authenticatorData),
        clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
        signature: arrayBufferToBase64(credential.response.signature),
        userHandle: arrayBufferToBase64(credential.response.userHandle)
      }
    });
    $input.val(credentialJson);
    $form.trigger('submit');
  }).catch(error => (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(error, false, 'error'));
};
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('webauthn.js', function () {
  if (!navigator.credentials || !navigator.credentials.create || !navigator.credentials.get || !window.PublicKeyCredential) {
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(window.Messages.webAuthnNotSupported, false, 'error');
    return;
  }
  const $creationInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#webauthn_creation_response');
  if ($creationInput.length > 0) {
    handleCreation($creationInput);
  }
  const $requestInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#webauthn_request_response');
  if ($requestInput.length > 0) {
    handleRequest($requestInput);
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
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/webauthn.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=webauthn.js.map