"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[30],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 69:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);







/**
 * Export privileges modal handler
 *
 * @param {object} data
 *
 * @param {JQuery} msgbox
 *
 */
function exportPrivilegesModalHandler(data, msgbox) {
  if (typeof data !== 'undefined' && data.success === true) {
    var modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#exportPrivilegesModal');
    // Remove any previous privilege modal data, if any
    modal.find('.modal-body').first().html('');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#exportPrivilegesModalLabel').first().html('Loading');
    modal.modal('show');
    modal.on('shown.bs.modal', function () {
      modal.find('.modal-body').first().html(data.message);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#exportPrivilegesModalLabel').first().html(data.title);
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxRemoveMessage)(msgbox);
      // Attach syntax highlighted editor to export dialog
      (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getSqlEditor)(modal.find('textarea'));
    });
    return;
  }
  (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
}
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const EditUserGroup = {
  /**
   * @param {MouseEvent} event
   */
  handleEvent: function (event) {
    const editUserGroupModal = document.getElementById('editUserGroupModal');
    const button = event.relatedTarget;
    const username = button.getAttribute('data-username');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().get('index.php?route=/server/user-groups/edit-form', {
      'ajax_request': true,
      'username': username,
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
    }, data => {
      if (typeof data === 'undefined' || data.success !== true) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false, 'error');
        return;
      }
      const modal = window.bootstrap.Modal.getInstance(editUserGroupModal);
      const modalBody = editUserGroupModal.querySelector('.modal-body');
      const saveButton = editUserGroupModal.querySelector('#editUserGroupModalSaveButton');
      modalBody.innerHTML = data.message;
      saveButton.addEventListener('click', () => {
        const form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(editUserGroupModal.querySelector('#changeUserGroupForm'));
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/server/privileges', form.serialize() + _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('arg_separator') + 'ajax_request=1', data => {
          if (typeof data === 'undefined' || data.success !== true) {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false, 'error');
            return;
          }
          const userGroup = form.serializeArray().find(el => el.name === 'userGroup').value;
          // button -> td -> tr -> td.usrGroup
          const userGroupTableCell = button.parentElement.parentElement.querySelector('.usrGroup');
          userGroupTableCell.textContent = userGroup;
        });
        modal.hide();
      });
    });
  }
};
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const AccountLocking = {
  handleEvent: function () {
    const button = this;
    const isLocked = button.dataset.isLocked === 'true';
    const url = isLocked ? 'index.php?route=/server/privileges/account-unlock' : 'index.php?route=/server/privileges/account-lock';
    const params = {
      'username': button.dataset.userName,
      'hostname': button.dataset.hostName,
      'ajax_request': true,
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, data => {
      if (data.success === false) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error);
        return;
      }
      if (isLocked) {
        const lockIcon = (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_6__["default"])('s_lock', window.Messages.strLock, {}).toString();
        button.innerHTML = '<span class="text-nowrap">' + lockIcon + ' ' + window.Messages.strLock + '</span>';
        button.title = window.Messages.strLockAccount;
        button.dataset.isLocked = 'false';
      } else {
        const unlockIcon = (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_6__["default"])('s_unlock', window.Messages.strUnlock, {}).toString();
        button.innerHTML = '<span class="text-nowrap">' + unlockIcon + ' ' + window.Messages.strUnlock + '</span>';
        button.title = window.Messages.strUnlockAccount;
        button.dataset.isLocked = 'true';
      }
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
    });
  }
};
/**
 * Display a warning if there is already a user by the name entered as the username.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const AddUserLoginCheckUsername = {
  handleEvent: function () {
    var username = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    var $warning = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#user_exists_warning');
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_pred_username').val() === 'userdefined' && username !== '') {
      var href = jquery__WEBPACK_IMPORTED_MODULE_0___default()('form[name=\'usersForm\']').attr('action');
      var params = {
        'ajax_request': true,
        'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
        'validate_username': true,
        'username': username
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default().get(href, params, function (data) {
        if (data.user_exists) {
          $warning.show();
        } else {
          $warning.hide();
        }
      });
    } else {
      $warning.hide();
    }
  }
};
/**
 * Indicating password strength
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const PasswordStrength = {
  handleEvent: function () {
    var meterObj = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#password_strength_meter');
    var meterObjLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#password_strength');
    var username = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="username"]');
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkPasswordStrength)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val(), meterObj, meterObjLabel, username.val());
  }
};
/**
 * Automatically switching to 'Use Text field' from 'No password' once start writing in text area
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const SwitchToUseTextField = {
  handleEvent: function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw').val() !== '') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_pred_password').val('userdefined');
    }
  }
};
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const ChangePasswordStrength = {
  handleEvent: function () {
    var meterObj = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#change_password_strength_meter');
    var meterObjLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#change_password_strength');
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkPasswordStrength)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val(), meterObj, meterObjLabel, _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('user'));
  }
};
/**
 * Display a notice if sha256_password is selected
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const ShowSha256PasswordNotice = {
  handleEvent: function () {
    var selectedPlugin = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    if (selectedPlugin === 'sha256_password') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ssl_reqd_warning').show();
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ssl_reqd_warning').hide();
    }
  }
};
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const RevokeUser = {
  /**
   * @param {Event} event
   */
  handleEvent: function (event) {
    event.preventDefault();
    var $thisButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#usersForm');
    $thisButton.confirm(window.Messages.strDropUserWarning, $form.attr('action'), function (url) {
      var $dropUsersDbCheckbox = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dropUsersDbCheckbox');
      if ($dropUsersDbCheckbox.is(':checked')) {
        var isConfirmed = confirm(window.Messages.strDropDatabaseStrongWarning + '\n' + window.sprintf(window.Messages.strDoYouReally, 'DROP DATABASE'));
        if (!isConfirmed) {
          // Uncheck the drop users database checkbox
          $dropUsersDbCheckbox.prop('checked', false);
        }
      }
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strRemovingSelectedUsers);
      var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('arg_separator');
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, $form.serialize() + argsep + 'delete=' + $thisButton.val() + argsep + 'ajax_request=true', function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
          // Refresh navigation, if we dropped some databases with the name
          // that is the same as the username of the deleted user
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dropUsersDbCheckbox:checked').length) {
            _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_4__.Navigation.reload();
          }
          // Remove the revoked user from the users list
          $form.find('input:checkbox:checked').parents('tr').slideUp('medium', function () {
            var thisUserInitial = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input:checkbox').val().charAt(0).toUpperCase();
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
            // If this is the last user with thisUserInitial, remove the link from #userAccountsPagination
            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#userRightsTable').find('input:checkbox[value^="' + thisUserInitial + '"], input:checkbox[value^="' + thisUserInitial.toLowerCase() + '"]').length === 0) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#userAccountsPagination').find('.page-item > .page-link:contains(' + thisUserInitial + ')').parent('.page-item').addClass('disabled').html('<a class="page-link" href="#" tabindex="-1" aria-disabled="true">' + thisUserInitial + '</a>');
            }
            // Re-check the classes of each row
            $form.find('tbody').find('tr').each(function (index) {
              if (index >= 0 && index % 2 === 0) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('odd').addClass('even');
              } else if (index >= 0 && index % 2 !== 0) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('even').addClass('odd');
              }
            });
            // update the checkall checkbox
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkboxesSel).trigger('change');
          });
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
        }
      }); // end $.post()
    });
  }
};
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const ExportPrivileges = {
  /**
   * @param {Event} event
   */
  handleEvent: function (event) {
    event.preventDefault();
    // can't export if no users checked
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.form).find('input:checked').length === 0) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strNoAccountSelected, 2000, 'success');
      return;
    }
    var msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('arg_separator');
    var serverId = _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server');
    var selectedUsers = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#usersForm input[name*=\'selected_usr\']:checkbox').serialize();
    var postStr = selectedUsers + '&submit_mult=export' + argsep + 'ajax_request=true&server=' + serverId;
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.form).prop('action'), postStr, function (data) {
      exportPrivilegesModalHandler(data, msgbox);
    }); // end $.post
  }
};
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const ExportUser = {
  /**
   * @param {Event} event
   */
  handleEvent: function (event) {
    event.preventDefault();
    var msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default().get(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href'), {
      'ajax_request': true
    }, function (data) {
      exportPrivilegesModalHandler(data, msgbox);
    });
  }
};
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const SslTypeToggle = {
  handleEvent: function () {
    var $div = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#specified_div');
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ssl_type_SPECIFIED').is(':checked')) {
      $div.find('input').prop('disabled', false);
    } else {
      $div.find('input').prop('disabled', true);
    }
  }
};
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const SslPrivilegeToggle = {
  handleEvent: function () {
    var $div = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#require_ssl_div');
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked')) {
      $div.find('input').prop('disabled', false);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ssl_type_SPECIFIED').trigger('change');
    } else {
      $div.find('input').prop('disabled', true);
    }
  }
};
/**
 * Create submenu for simpler interface
 */
function addOrUpdateSubmenu() {
  var $editUserDialog = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit_user_dialog');
  if ($editUserDialog.length === 0) {
    return;
  }
  var $subNav = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-pills');
  var submenuLabel;
  var submenuLink;
  var linkNumber;
  // if submenu exists yet, remove it first
  if ($subNav.length > 0) {
    $subNav.remove();
  }
  // construct a submenu from the existing fieldsets
  $subNav = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<ul></ul>').prop('class', 'nav nav-pills m-2');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit_user_dialog .submenu-item').each(function () {
    submenuLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('.js-submenu-label[data-submenu-label]').data('submenu-label');
    submenuLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a></a>').prop('class', 'nav-link').prop('href', '#').html(submenuLabel);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('<li></li>').prop('class', 'nav-item').append(submenuLink).appendTo($subNav);
  });
  // click handlers for submenu
  $subNav.find('a').on('click', function (e) {
    e.preventDefault();
    // if already active, ignore click
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('active')) {
      return;
    }
    $subNav.find('a').removeClass('active');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active');
    // which section to show now?
    linkNumber = $subNav.find('a').index(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    // hide all sections but the one to show
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit_user_dialog .submenu-item').hide().eq(linkNumber).show();
  });
  // make first menu item active
  // TODO: support URL hash history
  $subNav.find('> :first-child a').addClass('active');
  $editUserDialog.prepend($subNav);
  // hide all sections but the first
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit_user_dialog .submenu-item').hide().eq(0).show();
  // scroll to the top
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
    scrollTop: 0
  }, 'fast');
}
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const SelectAllPrivileges = {
  /**
   * @param {Event} event
   */
  handleEvent: function (event) {
    const method = event.target.getAttribute('data-select-target');
    var options = jquery__WEBPACK_IMPORTED_MODULE_0___default()(method).first().children();
    options.each(function (_, obj) {
      obj.selected = true;
    });
  }
};
function setMaxWidth() {
  var windowWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.jsresponsive').css('max-width', windowWidth - 35 + 'px');
}
/**
 * Validates the "add a user" form
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const CheckAddUser = {
  handleEvent: function () {
    const theForm = this;
    if (theForm.elements.hostname && theForm.elements.hostname.value === '') {
      alert(window.Messages.strHostEmpty);
      theForm.elements.hostname.focus();
      return false;
    }
    if (theForm.elements.pred_username && theForm.elements.pred_username.value === 'userdefined' && theForm.elements.username.value === '') {
      alert(window.Messages.strUserEmpty);
      theForm.elements.username.focus();
      return false;
    }
    return (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkPassword)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(theForm));
  }
};
const CheckEmptyPasswordWhenAllowNoPasswordIsEnabled = {
  handleEvent: function () {
    const theForm = this;
    if ((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.shouldShowEmptyPasswordWarning)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(theForm))) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).confirm(window.Messages.strPasswordEmptyWhenAllowNoPasswordIsEnabled, '', function () {
        theForm.submit();
        return true;
      });
      return false;
    } else {
      theForm.submit();
      return true;
    }
  }
};
const selectPasswordRadioWhenChangingPassword = () => {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nopass_0').prop('checked', true);
};
/**
 * AJAX scripts for /server/privileges page.
 *
 * Actions ajaxified here:
 * Add user
 * Revoke a user
 * Edit privileges
 * Export privileges
 * Paginate table of users
 * Flush privileges
 *
 * @memberOf    jQuery
 * @name        document.ready
 */
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('server/privileges.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldset_add_user_login').off('change', 'input[name=\'username\']');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#deleteUserCard .btn.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_change_pw').off('keyup');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_change_pw').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_change_pw2').off('change');
  const editUserGroupModal = document.getElementById('editUserGroupModal');
  if (editUserGroupModal) {
    editUserGroupModal.removeEventListener('show.bs.modal', EditUserGroup);
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'button.mult_submit[value=export]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.export_user_anchor.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('button.jsAccountLocking').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dropUsersDbCheckbox').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '.checkall_box');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', '#checkbox_SSL_priv');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'input[name="ssl_type"]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', '#select_authentication_plugin');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/privileges.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldset_add_user_login').on('change', 'input[name=\'username\']', AddUserLoginCheckUsername.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw').on('keyup', PasswordStrength.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw').on('input', SwitchToUseTextField.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_change_pw').on('keyup', ChangePasswordStrength.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_change_pw').on('change', selectPasswordRadioWhenChangingPassword);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_change_pw2').on('change', selectPasswordRadioWhenChangingPassword);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#select_authentication_plugin', ShowSha256PasswordNotice.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#deleteUserCard .btn.ajax', RevokeUser.handleEvent);
  const editUserGroupModal = document.getElementById('editUserGroupModal');
  if (editUserGroupModal) {
    editUserGroupModal.addEventListener('show.bs.modal', EditUserGroup);
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'button.mult_submit[value=export]', ExportPrivileges.handleEvent);
  // if exporting non-ajax, highlight anyways
  (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getSqlEditor)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea.export'));
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.export_user_anchor.ajax', ExportUser.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('button.jsAccountLocking').on('click', AccountLocking.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'input[name="ssl_type"]', SslTypeToggle.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#checkbox_SSL_priv', SslPrivilegeToggle.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_SSL_priv').trigger('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input.autofocus').trigger('focus');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkboxesSel).trigger('change');
  (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.displayPasswordGenerateButton)();
  addOrUpdateSubmenu();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_priv_all').on('click', SelectAllPrivileges.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#insert_priv_all').on('click', SelectAllPrivileges.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#update_priv_all').on('click', SelectAllPrivileges.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#references_priv_all').on('click', SelectAllPrivileges.handleEvent);
  setMaxWidth();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addUsersForm').on('submit', CheckAddUser.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#copyUserForm').on('submit', CheckAddUser.handleEvent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#change_password_form').on('submit', CheckEmptyPasswordWhenAllowNoPasswordIsEnabled.handleEvent);
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(69); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=privileges.js.map