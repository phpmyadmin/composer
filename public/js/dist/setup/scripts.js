"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[37],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 78:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_config_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


/**
 * Functions used in Setup configuration forms
 */
// show this window in top frame
if (top !== self) {
  // @ts-ignore
  window.top.location.href = location;
}
// ------------------------------------------------------------------
// Messages
//
jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  if (window.location.protocol === 'https:') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#no_https').remove();
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#no_https a').on('click', function () {
      var oldLocation = window.location;
      window.location.href = 'https:' + oldLocation.href.substring(oldLocation.protocol.length);
      return false;
    });
  }
  var hiddenMessages = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.hiddenmessage');
  if (hiddenMessages.length > 0) {
    hiddenMessages.hide();
    var link = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#show_hidden_messages');
    link.on('click', function (e) {
      e.preventDefault();
      hiddenMessages.show();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
    });
    link.html(link.html().replace('#MSG_COUNT', hiddenMessages.length.toString()));
    link.show();
  }
});
// set document width
jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var width = 0;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('ul.tabs li').each(function () {
    width += jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).width() + 10;
  });
  var contentWidth = width;
  width += 250;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('min-width', width);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tabs_contents').css('min-width', contentWidth);
});
//
// END: Messages
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Form validation and field operations
//
/**
 * Calls server-side validation procedures
 *
 * @param {Element} parent  input field in <fieldset> or <fieldset>
 * @param {string}  id      validator id
 * @param {object}  values  values hash {element1_id: value, ...}
 *
 * @return {boolean|void}
 */
function ajaxValidate(parent, id, values) {
  var $parent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(parent);
  // ensure that parent is a fieldset
  if ($parent.attr('tagName') !== 'FIELDSET') {
    $parent = $parent.closest('fieldset');
    if ($parent.length === 0) {
      return false;
    }
  }
  if ($parent.data('ajax') !== null) {
    $parent.data('ajax').abort();
  }
  $parent.data('ajax', jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    url: '../setup/index.php?route=/setup/validate',
    cache: false,
    type: 'POST',
    data: {
      token: $parent.closest('form').find('input[name=token]').val(),
      id: id,
      values: JSON.stringify(values)
    },
    success: function (response) {
      if (response === null) {
        return;
      }
      var error = {};
      if (typeof response !== 'object') {
        // @ts-ignore
        error[$parent.id] = [response];
      } else if (typeof response.error !== 'undefined') {
        // @ts-ignore
        error[$parent.id] = [response.error];
      } else {
        for (var key in response) {
          var value = response[key];
          error[key] = Array.isArray(value) ? value : [value];
        }
      }
      _modules_config_ts__WEBPACK_IMPORTED_MODULE_1__.Config.displayErrors(error);
    },
    complete: function () {
      $parent.removeData('ajax');
    }
  }));
  return true;
}
/**
 * Automatic form submission on change.
 */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '.autosubmit', function (e) {
  e.target.form.submit();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, window.validators, {
  // field validators
  field: {
    /**
     * hide_db field
     *
     * @param {boolean} isKeyUp
     *
     * @return {true}
     */
    hide_db: function (isKeyUp) {
      if (!isKeyUp && this.value !== '') {
        var data = {};
        data[this.id] = this.value;
        ajaxValidate(this, 'Servers/1/hide_db', data);
      }
      return true;
    },
    /**
     * TrustedProxies field
     *
     * @param {boolean} isKeyUp
     *
     * @return {true}
     */
    TrustedProxies: function (isKeyUp) {
      if (!isKeyUp && this.value !== '') {
        var data = {};
        data[this.id] = this.value;
        ajaxValidate(this, 'TrustedProxies', data);
      }
      return true;
    }
  },
  // fieldset validators
  fieldset: {
    /**
     * Validates Server fieldset
     *
     * @param {boolean} isKeyUp
     *
     * @return {true}
     */
    Server: function (isKeyUp) {
      if (!isKeyUp) {
        ajaxValidate(this, 'Server', _modules_config_ts__WEBPACK_IMPORTED_MODULE_1__.Config.getAllValues());
      }
      return true;
    },
    /**
     * Validates Server_login_options fieldset
     *
     * @param {boolean} isKeyUp
     *
     * @return {true}
     */
    Server_login_options: function (isKeyUp) {
      // @ts-ignore
      return window.validators.fieldset.Server.apply(this, [isKeyUp]);
    },
    /**
     * Validates Server_pmadb fieldset
     *
     * @param {boolean} isKeyUp
     *
     * @return {true}
     */
    Server_pmadb: function (isKeyUp) {
      if (isKeyUp) {
        return true;
      }
      var prefix = _modules_config_ts__WEBPACK_IMPORTED_MODULE_1__.Config.getIdPrefix(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input'));
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + prefix + 'pmadb').val() !== '') {
        ajaxValidate(this, 'Server_pmadb', _modules_config_ts__WEBPACK_IMPORTED_MODULE_1__.Config.getAllValues());
      }
      return true;
    }
  }
});
//
// END: Form validation and field operations
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// User preferences allow/disallow UI
//
jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.userprefs-allow').on('click', function (e) {
    if (this !== e.target) {
      return;
    }
    var el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input');
    if (el.prop('disabled')) {
      return;
    }
    el.prop('checked', !el.prop('checked'));
  });
});
//
// END: User preferences allow/disallow UI
// ------------------------------------------------------------------
jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.delete-server').on('click', function (e) {
    e.preventDefault();
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($this.attr('href'), $this.attr('data-post'), function () {
      window.location.replace('../setup/index.php?route=/setup');
    });
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(78); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=scripts.js.map