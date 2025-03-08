"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[48],{

/***/ 89:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _modules_indexes_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(58);
/* harmony import */ var _modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(29);
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15);
/* harmony import */ var _modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21);











/**
 * @fileoverview    functions used on the table structure page
 * @name            Table Structure
 *
 * @requires    jQueryUI
 */
/**
 * AJAX scripts for /table/structure
 *
 * Actions ajaxified here:
 * Drop Column
 * Add Primary Key
 * Drop Primary Key/Index
 *
 */
/**
 * Reload fields table
 */
function reloadFieldForm() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldsForm').attr('action'), jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldsForm').serialize() + _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'ajax_request=true', function (formData) {
    var $tempDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id=\'temp_div\'><div>').append(formData.message);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldsForm').replaceWith($tempDiv.find('#fieldsForm'));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addColumns').replaceWith($tempDiv.find('#addColumns'));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#move_columns_dialog').find('ul').replaceWith($tempDiv.find('#move_columns_dialog ul'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').show();
}
function checkFirst() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=after_field] option:selected').data('pos') === 'first') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=field_where]').val('first');
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=field_where]').val('after');
  }
}
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('table/structure.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.drop_column_anchor.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.add_key.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#move_columns_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '.append_fields_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', '#fieldsForm button.mult_submit');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a[id^=partition_action].ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#remove_partitioning.ajax');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('table/structure.js', function () {
  _modules_indexes_ts__WEBPACK_IMPORTED_MODULE_7__.Indexes.resetColumnLists();
  /**
   *Ajax action for submitting the "Column Change" and "Add Column" form
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.append_fields_form.ajax').off();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '.append_fields_form.ajax', function (event) {
    event.preventDefault();
    /**
     * @var form object referring to the export form
     */
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var fieldCnt = Number($form.find('input[name=orig_num_fields]').val());
    function submitForm() {
      var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize() + _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'do_save_data=1', function (data) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sqlqueryresults').length !== 0) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sqlqueryresults').remove();
        } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.error:not(.tab)').length !== 0) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.error:not(.tab)').remove();
        }
        if (typeof data.success !== 'undefined' && data.success === true) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').empty().append(data.message).show();
          (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content'));
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query .alert-primary').remove();
          if (typeof data.structure_refresh_route !== 'string') {
            // Do not reload the form when the code below freshly filled it
            reloadFieldForm();
          }
          $form.remove();
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msg);
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
          if (typeof data.structure_refresh_route === 'string') {
            // Fetch the table structure right after adding a new column
            jquery__WEBPACK_IMPORTED_MODULE_0___default().get(data.structure_refresh_route, function (data) {
              if (typeof data.success !== 'undefined' && data.success === true) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').append(data.message).show();
              }
            });
          } else {
            (0,_modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_10__["default"])('index.php?route=/table/structure');
          }
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error, false);
        }
      }); // end $.post()
    }
    function checkIfConfirmRequired($form) {
      var i = 0;
      var id;
      var elm;
      var val;
      var nameOrig;
      var elmOrig;
      var valOrig;
      var checkRequired = false;
      for (i = 0; i < fieldCnt; i++) {
        id = '#field_' + i + '_5';
        elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(id);
        val = elm.val();
        nameOrig = 'input[name=field_collation_orig\\[' + i + '\\]]';
        elmOrig = $form.find(nameOrig);
        valOrig = elmOrig.val();
        if (val && valOrig && val !== valOrig) {
          checkRequired = true;
          break;
        }
      }
      return checkRequired;
    }
    /*
     * First validate the form; if there is a problem, avoid submitting it
     *
     * checkTableEditForm() needs a pure element and not a jQuery object,
     * this is why we pass $form[0] as a parameter (the jQuery object
     * is actually an array of DOM elements)
     */
    if ((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkTableEditForm)($form[0], fieldCnt)) {
      // OK, form passed validation step
      (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)($form);
      if ((0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkReservedWordColumns)($form)) {
        // User wants to submit the form
        // If Collation is changed, Warn and Confirm
        if (checkIfConfirmRequired($form)) {
          var question = window.sprintf(window.Messages.strChangeColumnCollation, 'https://wiki.phpmyadmin.net/pma/Garbled_data');
          $form.confirm(question, $form.attr('action'), function () {
            submitForm();
          });
        } else {
          submitForm();
        }
      }
    }
  }); // end change table button "do_save_data"
  /**
   * Attach Event Handler for 'Drop Column'
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.drop_column_anchor.ajax', function (event) {
    event.preventDefault();
    /**
     * @var currTableName String containing the name of the current table
     */
    var currTableName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form').find('input[name=table]').val();
    /**
     * @var currRow    Object reference to the currently selected row (i.e. field in the table)
     */
    var $currRow = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('tr');
    /**
     * @var currColumnName    String containing name of the field referred to by {@link curr_row}
     */
    var currColumnName = $currRow.children('th').children('label').text().trim();
    currColumnName = (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_9__.escapeJsString)((0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_9__.escapeHtml)(currColumnName));
    /**
     * @var $afterFieldItem    Corresponding entry in the 'After' field.
     */
    var $afterFieldItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=\'after_field\'] option[value=\'' + currColumnName + '\']');
    /**
     * @var question String containing the question to be asked for confirmation
     */
    var question = window.sprintf(window.Messages.strDoYouReally, 'ALTER TABLE `' + currTableName + '` DROP `' + currColumnName + '`;');
    var $thisAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    $thisAnchor.confirm(question, $thisAnchor.attr('href'), function (url) {
      var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strDroppingColumn, false);
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_8__["default"])(this, $thisAnchor.getPostData());
      params += _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'ajax_page_request=1';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
        if (typeof data !== 'undefined' && data.success === true) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msg);
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query').length) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query').remove();
          }
          if (data.sql_query) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="result_query"></div>').html(data.sql_query).prependTo('#structure_content');
            (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content'));
          }
          // Adjust the row numbers
          for (var $row = $currRow.next(); $row.length > 0; $row = $row.next()) {
            var newVal = parseInt($row.find('td').eq(1).text(), 10) - 1;
            $row.find('td').eq(1).text(newVal);
          }
          $afterFieldItem.remove();
          $currRow.hide('medium').remove();
          // Remove the dropped column from select menu for 'after field'
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=after_field]').find('[value="' + currColumnName + '"]').remove();
          // by default select the (new) last option to add new column
          // (in case last column is dropped)
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=after_field] option').last().attr('selected', 'selected');
          // refresh table stats
          if (data.tableStat) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tablestatistics').html(data.tableStat);
          }
          // refresh the list of indexes (comes from /sql)
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.index_info').replaceWith(data.indexes_list);
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strErrorProcessingRequest + ' : ' + data.error, false);
        }
      }); // end $.post()
    });
  }); // end of Drop Column Anchor action
  /**
   * Ajax Event handler for adding keys
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.add_key.ajax', function (event) {
    event.preventDefault();
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var currTableName = $this.closest('form').find('input[name=table]').val();
    var currColumnName = $this.parents('tr').children('th').children('label').text().trim();
    var addClause = '';
    if ($this.is('.add_primary_key_anchor')) {
      addClause = 'ADD PRIMARY KEY';
    } else if ($this.is('.add_index_anchor')) {
      addClause = 'ADD INDEX';
    } else if ($this.is('.add_unique_anchor')) {
      addClause = 'ADD UNIQUE';
    } else if ($this.is('.add_spatial_anchor')) {
      addClause = 'ADD SPATIAL';
    } else if ($this.is('.add_fulltext_anchor')) {
      addClause = 'ADD FULLTEXT';
    }
    var question = window.sprintf(window.Messages.strDoYouReally, 'ALTER TABLE `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_9__.escapeHtml)(currTableName) + '` ' + addClause + '(`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_9__.escapeHtml)(currColumnName) + '`);');
    var $thisAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    $thisAnchor.confirm(question, $thisAnchor.attr('href'), function (url) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $this;
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_8__["default"])(this, $thisAnchor.getPostData());
      params += _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'ajax_page_request=1';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    });
  }); // end Add key
  /**
   * Inline move columns
   **/
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#move_columns_anchor', function (e) {
    e.preventDefault();
    var buttonOptionsError = {};
    buttonOptionsError[window.Messages.strOK] = function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dialog('close').remove();
    };
    var columns = [];
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tablestructure').find('tbody tr').each(function () {
      var colName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input:checkbox').eq(0).val();
      var hiddenInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').prop({
        name: 'move_columns[]',
        type: 'hidden'
      }).val(colName);
      columns[columns.length] = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<li></li>').addClass('placeholderDrag').text(colName).append(hiddenInput);
    });
    var colList = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#move_columns_dialog').find('ul').find('li').remove().end();
    for (var i in columns) {
      colList.append(columns[i]);
    }
    colList.sortable({
      axis: 'y',
      containment: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#move_columns_dialog').find('div'),
      tolerance: 'pointer'
    }).disableSelection();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#move_columns_dialog').find('form');
    $form.data('serialized-unmoved', $form.serialize());
    const designerModalPreviewModal = document.getElementById('designerModalPreviewModal');
    designerModalPreviewModal.addEventListener('shown.bs.modal', () => {
      const modalBody = designerModalPreviewModal.querySelector('.modal-body');
      const $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#move_column_form');
      const serialized = $form.serialize();
      if (serialized === $form.data('serialized-unmoved')) {
        modalBody.innerHTML = '';
        return;
      }
      const formUrl = $form.attr('action');
      const sep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
      const formData = serialized + sep + 'preview_sql=1' + sep + 'ajax_request=1';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post({
        url: formUrl,
        data: formData,
        success: response => {
          if (!response.success) {
            modalBody.innerHTML = '<div class="alert alert-danger" role="alert">' + window.Messages.strErrorProcessingRequest + '</div>';
            return;
          }
          modalBody.innerHTML = response.sql_data;
          (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalPreviewModal'));
        },
        error: () => {
          modalBody.innerHTML = '<div class="alert alert-danger" role="alert">' + window.Messages.strErrorProcessingRequest + '</div>';
        }
      });
    });
    designerModalPreviewModal.addEventListener('hidden.bs.modal', () => {
      designerModalPreviewModal.querySelector('.modal-body').innerHTML = '<div class="spinner-border" role="status">' + '<span class="visually-hidden">' + window.Messages.strLoading + '</span></div>';
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#moveColumnsModal').modal('show');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').off('click'); // Unregister previous modals
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').on('click', function () {
      event.preventDefault();
      var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
      var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#moveColumnsModal');
      var $form = $this.find('form');
      var serialized = $form.serialize();
      // check if any columns were moved at all
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#moveColumnsModal').modal('hide');
      if (serialized === $form.data('serialized-unmoved')) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
        return;
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.prop('action'), serialized + _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'ajax_request=true', function (data) {
        if (data.success === false) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
          var errorModal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#moveColumnsErrorModal');
          errorModal.modal('show');
          errorModal.find('.modal-body').first().html(data.error);
        } else {
          // sort the fields table
          var $fieldsTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()('table#tablestructure tbody');
          // remove all existing rows and remember them
          var $rows = $fieldsTable.find('tr').remove();
          // loop through the correct order
          for (var i in data.columns) {
            var theColumn = data.columns[i];
            var $theRow = $rows.find('input:checkbox[value="' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_9__.escapeJsString)(theColumn) + '"]').closest('tr');
            // append the row for this column to the table
            $fieldsTable.append($theRow);
          }
          var $firstrow = $fieldsTable.find('tr').eq(0);
          // Adjust the row numbers and colors
          for (var $row = $firstrow; $row.length > 0; $row = $row.next()) {
            $row.find('td').eq(1).text($row.index() + 1).end().removeClass('odd even').addClass($row.index() % 2 === 0 ? 'odd' : 'even');
          }
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.message);
        }
      });
    });
  });
  /**
   * Handles multi submits in table structure page such as change, browse, drop, primary etc.
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', '#fieldsForm button.mult_submit', function (e) {
    e.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('form');
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
    var submitData = $form.serialize() + argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true';
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
    _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(this.formAction, submitData, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
  });
  /**
   * Handles clicks on Action links in partition table
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a[id^=partition_action].ajax', function (e) {
    e.preventDefault();
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    function submitPartitionAction(url) {
      var params = 'ajax_request=true&ajax_page_request=true&' + $link.getPostData();
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $link;
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    }
    if ($link.is('#partition_action_DROP')) {
      $link.confirm(window.Messages.strDropPartitionWarning, $link.attr('href'), function (url) {
        submitPartitionAction(url);
      });
    } else if ($link.is('#partition_action_TRUNCATE')) {
      $link.confirm(window.Messages.strTruncatePartitionWarning, $link.attr('href'), function (url) {
        submitPartitionAction(url);
      });
    } else {
      submitPartitionAction($link.attr('href'));
    }
  });
  /**
   * Handles remove partitioning
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#remove_partitioning.ajax', function (e) {
    e.preventDefault();
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var question = window.Messages.strRemovePartitioningWarning;
    $link.confirm(question, $link.attr('href'), function (url) {
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_8__["default"])({
        'ajax_request': true,
        'ajax_page_request': true
      }, $link.getPostData());
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $link;
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select[name=after_field]', function () {
    checkFirst();
  });
});

/***/ }),

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(89); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=structure.js.map