"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[9],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 35:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29);
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _modules_functions_adjustTotals_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);









/**
 * @fileoverview    functions used on the database structure page
 * @name            Database Structure
 *
 * @requires    jQueryUI
 */
/**
 * AJAX scripts for /database/structure
 *
 * Actions ajaxified here:
 * Drop Database
 * Truncate Table
 * Drop Table
 *
 */
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('database/structure.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.truncate_table_anchor.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.drop_table_anchor.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.favorite_table_anchor.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.real_row_count').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.row_count_sum').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=submit_mult]').off('change');
});
/**
 * Gets the real row count for a table or DB.
 * @param {object} $target Target for appending the real count value.
 */
function fetchRealRowCount($target) {
  var $throbber = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').find('.throbber').first().clone().css({
    visibility: 'visible',
    display: 'inline-block'
  }).on('click', false);
  $target.html($throbber);
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    type: 'GET',
    url: $target.attr('href'),
    cache: false,
    dataType: 'json',
    success: function (response) {
      if (response.success) {
        // If to update all row counts for a DB.
        if (response.real_row_count_all) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(response.real_row_count_all, function (index, table) {
            // Update each table row count.
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.data td[data-table*="' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeJsString)(table.table) + '"]').text(table.row_count);
          });
        }
        // If to update a particular table's row count.
        if (response.real_row_count) {
          // Append the parent cell with real row count.
          $target.parent().text(response.real_row_count);
        }
        // Adjust the 'Sum' displayed at the bottom.
        (0,_modules_functions_adjustTotals_ts__WEBPACK_IMPORTED_MODULE_8__["default"])();
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strErrorRealRowCount);
      }
    },
    error: function () {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strErrorRealRowCount);
    }
  });
}
function addTooltipToFavoriteIcons() {
  document.querySelectorAll('.favorite_table_anchor').forEach(favoriteTableAnchor => {
    new window.bootstrap.Tooltip(favoriteTableAnchor);
  });
}
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('database/structure.js', function () {
  /**
   * Event handler on select of "Make consistent with central list"
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=submit_mult]').on('change', function (event) {
    var url = 'index.php?route=/database/structure';
    var action = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    if (action === 'make_consistent_with_central_list') {
      event.preventDefault();
      event.stopPropagation();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#makeConsistentWithCentralListModal').modal('show').on('shown.bs.modal', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#makeConsistentWithCentralListContinue').on('click', function () {
          const $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tablesForm');
          const argSep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
          const data = $form.serialize() + argSep + 'ajax_request=true' + argSep + 'ajax_page_request=true';
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
          _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
          jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/structure/central-columns/make-consistent', data, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#makeConsistentWithCentralListModal').modal('hide');
        });
      });
      return;
    }
    if (action === 'copy_tbl' || action === 'add_prefix_tbl' || action === 'replace_prefix_tbl' || action === 'copy_tbl_change_prefix') {
      event.preventDefault();
      event.stopPropagation();
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="selected_tbl[]"]:checked').length === 0) {
        return false;
      }
      var formData = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tablesForm').serialize();
      var modalTitle = '';
      if (action === 'copy_tbl') {
        url = 'index.php?route=/database/structure/copy-form';
        modalTitle = window.Messages.strCopyTablesTo;
      } else if (action === 'add_prefix_tbl') {
        url = 'index.php?route=/database/structure/add-prefix';
        modalTitle = window.Messages.strAddPrefix;
      } else if (action === 'replace_prefix_tbl') {
        url = 'index.php?route=/database/structure/change-prefix-form';
        modalTitle = window.Messages.strReplacePrefix;
      } else if (action === 'copy_tbl_change_prefix') {
        url = 'index.php?route=/database/structure/change-prefix-form';
        modalTitle = window.Messages.strCopyPrefix;
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: url,
        dataType: 'html',
        data: formData
      }).done(function (modalBody) {
        const bulkActionModal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#bulkActionModal');
        bulkActionModal.on('show.bs.modal', function () {
          this.querySelector('.modal-title').innerText = modalTitle;
          this.querySelector('.modal-body').innerHTML = modalBody;
        });
        bulkActionModal.modal('show').on('shown.bs.modal', function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#bulkActionContinue').on('click', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ajax_form').trigger('submit');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#bulkActionModal').modal('hide');
          });
        });
      });
      return;
    }
    if (action === 'analyze_tbl') {
      url = 'index.php?route=/table/maintenance/analyze';
    } else if (action === 'sync_unique_columns_central_list') {
      url = 'index.php?route=/database/structure/central-columns/add';
    } else if (action === 'delete_unique_columns_central_list') {
      url = 'index.php?route=/database/structure/central-columns/remove';
    } else if (action === 'check_tbl') {
      url = 'index.php?route=/table/maintenance/check';
    } else if (action === 'checksum_tbl') {
      url = 'index.php?route=/table/maintenance/checksum';
    } else if (action === 'drop_tbl') {
      url = 'index.php?route=/database/structure/drop-form';
    } else if (action === 'empty_tbl') {
      url = 'index.php?route=/database/structure/empty-form';
    } else if (action === 'export') {
      url = 'index.php?route=/export/tables';
    } else if (action === 'optimize_tbl') {
      url = 'index.php?route=/table/maintenance/optimize';
    } else if (action === 'repair_tbl') {
      url = 'index.php?route=/table/maintenance/repair';
    } else if (action === 'show_create') {
      url = 'index.php?route=/database/structure/show-create';
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tablesForm').trigger('submit');
      return;
    }
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('form');
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
    var data = $form.serialize() + argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true';
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
    _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, data, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
  });
  /**
   * Ajax Event handler for 'Truncate Table'
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.truncate_table_anchor.ajax', function (event) {
    event.preventDefault();
    /**
     * @var $this_anchor Object  referring to the anchor clicked
     */
    var $thisAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    // extract current table name and build the question string
    /**
     * @var curr_table_name String containing the name of the table to be truncated
     */
    var currTableName = $thisAnchor.parents('tr').children('th').children('a').text();
    /**
     * @var question    String containing the question to be asked for confirmation
     */
    var question = window.Messages.strTruncateTableStrongWarning + ' ' + window.sprintf(window.Messages.strDoYouReally, 'TRUNCATE `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(currTableName) + '`') + (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getForeignKeyCheckboxLoader)();
    $thisAnchor.confirm(question, $thisAnchor.attr('href'), function (url) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_6__["default"])(this, $thisAnchor.getPostData());
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
          // Adjust table statistics
          var $tr = $thisAnchor.closest('tr');
          $tr.find('.tbl_rows').text('0');
          $tr.find('.tbl_size, .tbl_overhead').text('-');
          (0,_modules_functions_adjustTotals_ts__WEBPACK_IMPORTED_MODULE_8__["default"])();
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strErrorProcessingRequest + ' : ' + data.error, false);
        }
      }); // end $.post()
    }, _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.loadForeignKeyCheckbox);
  }); // end of Truncate Table Ajax action
  /**
   * Ajax Event handler for 'Drop Table' or 'Drop View'
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.drop_table_anchor.ajax', function (event) {
    event.preventDefault();
    var $thisAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    // extract current table name and build the question string
    /**
     * @var $curr_row    Object containing reference to the current row
     */
    var $currRow = $thisAnchor.parents('tr');
    /**
     * @var curr_table_name String containing the name of the table to be truncated
     */
    var currTableName = $currRow.children('th').children('a').text();
    /**
     * @var is_view Boolean telling if we have a view
     */
    var isView = $currRow.hasClass('is_view') || $thisAnchor.hasClass('view');
    /**
     * @var question    String containing the question to be asked for confirmation
     */
    var question;
    if (!isView) {
      question = window.Messages.strDropTableStrongWarning + ' ' + window.sprintf(window.Messages.strDoYouReally, 'DROP TABLE `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(currTableName) + '`');
    } else {
      question = window.sprintf(window.Messages.strDoYouReally, 'DROP VIEW `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(currTableName) + '`');
    }
    question += (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getForeignKeyCheckboxLoader)();
    $thisAnchor.confirm(question, $thisAnchor.attr('href'), function (url) {
      var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_6__["default"])(this, $thisAnchor.getPostData());
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(data.message);
          $currRow.hide('medium').remove();
          (0,_modules_functions_adjustTotals_ts__WEBPACK_IMPORTED_MODULE_8__["default"])();
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxRemoveMessage)($msg);
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strErrorProcessingRequest + ' : ' + data.error, false);
        }
      }); // end $.post()
    }, _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.loadForeignKeyCheckbox);
  }); // end of Drop Table Ajax action
  addTooltipToFavoriteIcons();
  // Get real row count via Ajax.
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.real_row_count').on('click', function (event) {
    event.preventDefault();
    fetchRealRowCount(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  // Get all real row count.
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.row_count_sum').on('click', function (event) {
    event.preventDefault();
    fetchRealRowCount(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(35); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=structure.js.map