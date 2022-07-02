(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[56],{

/***/ 59:
/***/ (function() {

/**
 * @fileoverview    Javascript functions used in server user groups page
 * @name            Server User Groups
 *
 * @requires    jQuery
 */

/**
 * Unbind all event handlers before tearing down a page
 */
window.AJAX.registerTeardown('server/user_groups.js', function () {
  $('#deleteUserGroupModal').off('show.bs.modal');
});
/**
 * Bind event handlers
 */

window.AJAX.registerOnload('server/user_groups.js', function () {
  const deleteUserGroupModal = $('#deleteUserGroupModal');
  deleteUserGroupModal.on('show.bs.modal', function (event) {
    const userGroupName = $(event.relatedTarget).data('user-group');
    this.querySelector('.modal-body').innerText = Functions.sprintf(window.Messages.strDropUserGroupWarning, Functions.escapeHtml(userGroupName));
  });
  deleteUserGroupModal.on('shown.bs.modal', function (event) {
    const userGroupName = $(event.relatedTarget).data('user-group');
    $('#deleteUserGroupConfirm').on('click', function () {
      $.post('index.php?route=/server/user-groups', {
        'deleteUserGroup': true,
        'userGroup': userGroupName,
        'ajax_request': true
      }, window.AJAX.responseHandler);
      $('#deleteUserGroupModal').modal('hide');
    });
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(59));
/******/ }
]);
//# sourceMappingURL=user_groups.js.map