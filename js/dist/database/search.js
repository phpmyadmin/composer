"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[10],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 33:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _modules_common_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _modules_sql_highlight_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _modules_functions_getImageTag_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);







/**
 * JavaScript functions used on Database Search page
 *
 * @package PhpMyAdmin
 */

/**
 * AJAX script for the Database Search page.
 *
 * Actions ajaxified here:
 * Retrieve result of SQL query
 */

/**
 * Unbind all event handlers before tearing down a page
 */

_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('database/search.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0__('.browse_results').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0__('.delete_results').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0__('#buttonGo').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchresultlink').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0__('#togglequerybox').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchformlink').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0__('#select_all').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0__('#unselect_all').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0__(document).off('submit', '#db_search_form.ajax');
});
_modules_ajax_js__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('database/search.js', function () {
  /** Hide the table link in the initial search result */
  var icon = (0,_modules_functions_getImageTag_js__WEBPACK_IMPORTED_MODULE_6__["default"])('s_tbl', '', {
    'id': 'table-image'
  }).toString();
  jquery__WEBPACK_IMPORTED_MODULE_0__('#table-info').prepend(icon).hide();
  /** Hide the browse and deleted results in the new search criteria */

  jquery__WEBPACK_IMPORTED_MODULE_0__('#buttonGo').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0__('#table-info').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0__('#browse-results').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0__('#sqlqueryform').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0__('#togglequerybox').hide();
  });
  /**
   * Prepare a div containing a link for toggle the search results
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchresultsdiv')
  /** don't show it until we have results on-screen */
  .hide();
  /**
   * Changing the displayed text according to
   * the hide/show criteria in search result forms
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchresultlink').html(window.Messages.strHideSearchResults).on('click', function () {
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#searchresults').slideToggle();

    if ($link.text() === window.Messages.strHideSearchResults) {
      $link.text(window.Messages.strShowSearchResults);
    } else {
      $link.text(window.Messages.strHideSearchResults);
    }
    /** avoid default click action */


    return false;
  });
  /**
   * Prepare a div containing a link for toggle the search form,
   * otherwise it's incorrectly displayed after a couple of clicks
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchformdiv').hide(); // don't show it until we have results on-screen

  /**
   * Changing the displayed text according to
   * the hide/show criteria in search form
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__('#togglequerybox').hide().on('click', function () {
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#sqlqueryform').slideToggle('medium');

    if ($link.text() === window.Messages.strHideQueryBox) {
      $link.text(window.Messages.strShowQueryBox);
    } else {
      $link.text(window.Messages.strHideQueryBox);
    }
    /** avoid default click action */


    return false;
  });
  /** don't show it until we have results on-screen */

  /**
   * Changing the displayed text according to
   * the hide/show criteria in search criteria form
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchformlink').html(window.Messages.strShowSearchCriteria).on('click', function () {
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#db_search_form').slideToggle();

    if ($link.text() === window.Messages.strHideSearchCriteria) {
      $link.text(window.Messages.strShowSearchCriteria);
    } else {
      $link.text(window.Messages.strHideSearchCriteria);
    }
    /** avoid default click action */


    return false;
  });
  /*
   * Ajax Event handler for retrieving the results from a table
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '.browse_results', function (e) {
    e.preventDefault();
    /**   Hides the results shown by the delete criteria */

    var $msg = (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strBrowsing, false);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#sqlqueryform').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0__('#togglequerybox').hide();
    /**  Load the browse results to the page */

    jquery__WEBPACK_IMPORTED_MODULE_0__('#table-info').show();
    var tableName = jquery__WEBPACK_IMPORTED_MODULE_0__(this).data('table-name');
    jquery__WEBPACK_IMPORTED_MODULE_0__('#table-link').attr({
      'href': jquery__WEBPACK_IMPORTED_MODULE_0__(this).data('href')
    }).text(tableName);
    var url = jquery__WEBPACK_IMPORTED_MODULE_0__(this).data('href') + '#searchresults';
    var browseSql = jquery__WEBPACK_IMPORTED_MODULE_0__(this).data('browse-sql');
    var params = {
      'ajax_request': true,
      'is_js_confirmed': true,
      'sql_query': browseSql
    };
    jquery__WEBPACK_IMPORTED_MODULE_0__.post(url, params, function (data) {
      if (typeof data !== 'undefined' && data.success) {
        jquery__WEBPACK_IMPORTED_MODULE_0__('#browse-results').html(data.message);
        (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxRemoveMessage)($msg);
        jquery__WEBPACK_IMPORTED_MODULE_0__('.table_results').each(function () {
          window.makeGrid(this, true, true, true, true);
        });
        jquery__WEBPACK_IMPORTED_MODULE_0__('#browse-results').show();
        (0,_modules_sql_highlight_js__WEBPACK_IMPORTED_MODULE_4__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0__('#browse-results'));
        jquery__WEBPACK_IMPORTED_MODULE_0__('html, body').animate({
          scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0__('#browse-results').offset().top
        }, 1000);
      } else {
        (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
      }
    });
  });
  /*
   * Ajax Event handler for deleting the results from a table
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('click', '.delete_results', function (e) {
    e.preventDefault();
    /**  Hides the results shown by the browse criteria */

    jquery__WEBPACK_IMPORTED_MODULE_0__('#table-info').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0__('#sqlqueryform').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0__('#togglequerybox').hide();
    /** Conformation message for deletion */

    var msg = window.sprintf(window.Messages.strConfirmDeleteResults, jquery__WEBPACK_IMPORTED_MODULE_0__(this).data('table-name'));

    if (confirm(msg)) {
      var $msg = (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strDeleting, false);
      /** Load the deleted option to the page*/

      jquery__WEBPACK_IMPORTED_MODULE_0__('#sqlqueryform').html('');
      var params = {
        'ajax_request': true,
        'is_js_confirmed': true,
        'sql_query': jquery__WEBPACK_IMPORTED_MODULE_0__(this).data('delete-sql')
      };
      var url = jquery__WEBPACK_IMPORTED_MODULE_0__(this).data('href');
      jquery__WEBPACK_IMPORTED_MODULE_0__.post(url, params, function (data) {
        if (typeof data === 'undefined' || !data.success) {
          (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.error, false);
          return;
        }

        jquery__WEBPACK_IMPORTED_MODULE_0__('#sqlqueryform').html(data.sql_query);
        /** Refresh the search results after the deletion */

        jquery__WEBPACK_IMPORTED_MODULE_0__('#buttonGo').trigger('click');
        jquery__WEBPACK_IMPORTED_MODULE_0__('#togglequerybox').html(window.Messages.strHideQueryBox);
        /** Show the results of the deletion option */

        jquery__WEBPACK_IMPORTED_MODULE_0__('#browse-results').hide();
        jquery__WEBPACK_IMPORTED_MODULE_0__('#sqlqueryform').show();
        jquery__WEBPACK_IMPORTED_MODULE_0__('#togglequerybox').show();
        jquery__WEBPACK_IMPORTED_MODULE_0__('html, body').animate({
          scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0__('#browse-results').offset().top
        }, 1000);
        (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxRemoveMessage)($msg);
      });
    }
  });
  /**
   * Ajax Event handler for retrieving the result of an SQL Query
   */

  jquery__WEBPACK_IMPORTED_MODULE_0__(document).on('submit', '#db_search_form.ajax', function (event) {
    event.preventDefault();

    if (jquery__WEBPACK_IMPORTED_MODULE_0__('#criteriaTables :selected').length === 0) {
      (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strNoTableSelected);
      return;
    }

    var $msgbox = (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strSearching, false); // jQuery object to reuse

    var $form = jquery__WEBPACK_IMPORTED_MODULE_0__(this);
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.prepareForAjaxRequest($form);
    var url = $form.serialize() + _modules_common_js__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('arg_separator') + 'submit_search=' + jquery__WEBPACK_IMPORTED_MODULE_0__('#buttonGo').val();
    jquery__WEBPACK_IMPORTED_MODULE_0__.post($form.attr('action'), url, function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        // found results
        jquery__WEBPACK_IMPORTED_MODULE_0__('#searchresults').html(data.message);
        jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchresultlink') // always start with the Show message
        .text(window.Messages.strHideSearchResults);
        jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchresultsdiv') // now it's time to show the div containing the link
        .show();
        jquery__WEBPACK_IMPORTED_MODULE_0__('#searchresults').show();
        jquery__WEBPACK_IMPORTED_MODULE_0__('#db_search_form') // workaround for Chrome problem (bug #3168569)
        .slideToggle().hide();
        jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchformlink') // always start with the Show message
        .text(window.Messages.strShowSearchCriteria);
        jquery__WEBPACK_IMPORTED_MODULE_0__('#togglesearchformdiv') // now it's time to show the div containing the link
        .show();
      } else {
        // error message (zero rows)
        jquery__WEBPACK_IMPORTED_MODULE_0__('#searchresults').html(data.error).show();
      }

      (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_5__.ajaxRemoveMessage)($msgbox);
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('#select_all').on('click', function () {
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.setSelectOptions('db_search', 'criteriaTables[]', true);
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0__('#unselect_all').on('click', function () {
    _modules_functions_js__WEBPACK_IMPORTED_MODULE_2__.Functions.setSelectOptions('db_search', 'criteriaTables[]', false);
    return false;
  });
}); // end $()

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(33); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=search.js.map