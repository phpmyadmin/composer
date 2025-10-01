"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["server/user_groups"],{

/***/ "./resources/js/server/user_groups.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");


/**
 * @fileoverview    Javascript functions used in server user groups page
 * @name            Server User Groups
 *
 * @requires    jQuery
 */
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('server/user_groups.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#deleteUserGroupModal').off('show.bs.modal');
});
/**
 * Bind event handlers
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/user_groups.js', function () {
  const deleteUserGroupModal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#deleteUserGroupModal');
  deleteUserGroupModal.on('show.bs.modal', function (event) {
    // @ts-ignore
    const userGroupName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.relatedTarget).data('user-group');
    this.querySelector('.modal-body').innerText = window.sprintf(window.Messages.strDropUserGroupWarning, userGroupName);
  });
  deleteUserGroupModal.on('shown.bs.modal', function (event) {
    // @ts-ignore
    const userGroupName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.relatedTarget).data('user-group');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#deleteUserGroupConfirm').on('click', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/server/user-groups', {
        'deleteUserGroup': true,
        'userGroup': userGroupName,
        'ajax_request': true
      }, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#deleteUserGroupModal').modal('hide');
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
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/server/user_groups.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=user_groups.js.map