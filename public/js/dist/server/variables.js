"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[36],{

/***/ 77:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);




/**
 * @fileoverview    Javascript functions used in server variables page
 * @name            Server Replication
 *
 * @requires    jQueryUI
 */
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('server/variables.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.editLink');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#serverVariables').find('.var-name').find('a img').remove();
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('server/variables.js', function () {
  var $saveLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.saveLink');
  var $cancelLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.cancelLink');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#serverVariables').find('.var-name').find('a').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#docImage').clone().css('display', 'inline-block'));
  /* Launches the variable editor */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.editLink', function (event) {
    event.preventDefault();
    editVariable(this);
  });
  /* Allows the user to edit a server variable */
  function editVariable(link) {
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(link);
    var $cell = $link.parent();
    var $valueCell = $link.parents('.var-row').find('.var-value');
    var varName = $link.data('variable');
    var $mySaveLink = $saveLink.clone().css('display', 'inline-block');
    var $myCancelLink = $cancelLink.clone().css('display', 'inline-block');
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
    var $myEditLink = $cell.find('a.editLink');
    $cell.addClass('edit'); // variable is being edited
    $myEditLink.remove(); // remove edit link
    $mySaveLink.on('click', function () {
      var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/server/variables/set/' + encodeURIComponent(varName), {
        'ajax_request': true,
        'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server'),
        'varValue': $valueCell.find('input').val()
      }, function (data) {
        if (data.success) {
          $valueCell.html(data.variable).data('content', data.variable);
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
        } else {
          if (data.error === '') {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strRequestFailed, false);
          } else {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
          }
          $valueCell.html($valueCell.data('content'));
        }
        $cell.removeClass('edit')
        // @ts-ignore
        .html($myEditLink);
      });
      return false;
    });
    $myCancelLink.on('click', function () {
      $valueCell.html($valueCell.data('content'));
      $cell.removeClass('edit')
      // @ts-ignore
      .html($myEditLink);
      return false;
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default().get('index.php?route=/server/variables/get/' + encodeURIComponent(varName), {
      'ajax_request': true,
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server')
    }, function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        var $links = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').append($myCancelLink).append('&nbsp;&nbsp;&nbsp;').append($mySaveLink);
        var $editor = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>', {
          'class': 'serverVariableEditor'
        }).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>', {
          type: 'text',
          'class': 'form-control form-control-sm'
        }).val(data.message)));
        // Save and replace content
        $cell
        // @ts-ignore
        .html($links).children().css('display', 'flex');
        $valueCell.data('content', $valueCell.html())
        // @ts-ignore
        .html($editor).find('input').trigger('focus').on('keydown', function (event) {
          if (event.keyCode === 13) {
            // Enter key
            $mySaveLink.trigger('click');
          } else if (event.keyCode === 27) {
            // Escape key
            $myCancelLink.trigger('click');
          }
        });
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      } else {
        $cell.removeClass('edit')
        // @ts-ignore
        .html($myEditLink);
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error);
      }
    });
  }
});

/***/ }),

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(77); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=variables.js.map