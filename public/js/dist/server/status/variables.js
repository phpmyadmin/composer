"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[34],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 75:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);


/**
 *
 *
 * @package PhpMyAdmin
 */
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('server/status/variables.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterAlert').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterText').off('keyup');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterCategory').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dontFormat').off('change');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/status/variables.js', function () {
  // Filters for status variables
  var textFilter = null;
  var alertFilter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterAlert').prop('checked');
  var categoryFilter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterCategory').find(':selected').val();
  var text = ''; // Holds filter text
  /* 3 Filtering functions */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterAlert').on('change', function () {
    alertFilter = this.checked;
    filterVariables();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterCategory').on('change', function () {
    categoryFilter = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    filterVariables();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#dontFormat').on('change', function () {
    // Hiding the table while changing values speeds up the process a lot
    const serverStatusVariables = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#serverStatusVariables');
    serverStatusVariables.hide();
    serverStatusVariables.find('td.value span.original').toggle(this.checked);
    serverStatusVariables.find('td.value span.formatted').toggle(!this.checked);
    serverStatusVariables.show();
  }).trigger('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterText').on('keyup', function () {
    var word = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val().replace(/_/g, ' ');
    if (word.length === 0 || word.length >= 32768) {
      textFilter = null;
    } else {
      try {
        textFilter = new RegExp('(^| )' + word, 'i');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('error');
      } catch (e) {
        if (e instanceof SyntaxError) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('error');
          textFilter = null;
        }
      }
    }
    text = word;
    filterVariables();
  }).trigger('keyup');
  /* Filters the status variables by name/category/alert in the variables tab */
  function filterVariables() {
    var usefulLinks = 0;
    var section = text;
    if (categoryFilter.length > 0) {
      section = categoryFilter;
    }
    if (section.length > 1) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#linkSuggestions').find('span').each(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('class').indexOf('status_' + section) !== -1) {
          usefulLinks++;
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('display', '');
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('display', 'none');
        }
      });
    }
    if (usefulLinks > 0) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#linkSuggestions').css('display', '');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#linkSuggestions').css('display', 'none');
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#serverStatusVariables').find('th.name').each(function () {
      if ((textFilter === null || textFilter.exec(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text())) && (!alertFilter || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).next().find('span.text-danger').length > 0) && (categoryFilter.length === 0 || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().hasClass('s_' + categoryFilter))) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().css('display', '');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().css('display', 'none');
      }
    });
  }
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(75); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=variables.js.map