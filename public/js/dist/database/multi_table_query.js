"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[4],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 30:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);






/**
 * @fileoverview    function used in QBE for DB
 * @name            Database Operations
 *
 * @requires    jQueryUI
 * @requires    js/database/query_generator.js
 */
/**
 * js file for handling AJAX and other events in /database/multi-table-query
 */
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('database/multi_table_query.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tableNameSelect').each(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('change');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.columnNameSelect').each(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('change');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.criteria_op').each(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('change');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#update_query_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#copy_query').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#add_column_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', 'input.add-option');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', 'input.remove-option');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('database/multi_table_query.js', function () {
  var editor = (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getSqlEditor)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#MultiSqlquery'), {}, 'vertical');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.CodeMirror-line').css('text-align', 'left');
  editor.setSize(-1, -1);
  var columnCount = 3;
  addNewColumnCallbacks();
  function opsWithMultipleArgs() {
    return ['IN (...)', 'NOT IN (...)'];
  }
  function opsWithTwoArgs() {
    return ['BETWEEN', 'NOT BETWEEN'];
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#update_query_button').on('click', function () {
    var columns = [];
    var tableAliases = {};
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tableNameSelect').each(function () {
      var $show = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.show_col').first();
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() !== '' && $show.prop('checked')) {
        var tableAlias = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.table_alias').first().val();
        var columnAlias = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.col_alias').first().val();
        if (tableAlias !== '') {
          columns.push([tableAlias, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.columnNameSelect').first().val()]);
        } else {
          columns.push([jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val(), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.columnNameSelect').first().val()]);
        }
        columns[columns.length - 1].push(columnAlias);
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() in tableAliases) {
          if (!tableAliases[jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()].includes(tableAlias)) {
            tableAliases[jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()].push(tableAlias);
          }
        } else {
          tableAliases[jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()] = [tableAlias];
        }
      }
    });
    if (Object.keys(tableAliases).length === 0) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)('Nothing selected', false, 'error');
      return;
    }
    var foreignKeys;
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'GET',
      async: false,
      url: 'index.php?route=/database/multi-table-query/tables',
      data: {
        'server': sessionStorage.server,
        'db': jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_name').val(),
        'tables': Object.keys(tableAliases),
        'ajax_request': '1',
        'token': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('token')
      },
      success: function (response) {
        foreignKeys = response.foreignKeyConstrains;
      }
    });
    var query = 'SELECT ' + '`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeBacktick)(columns[0][0]) + '`.';
    if (columns[0][1] === '*') {
      query += '*';
    } else {
      query += '`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeBacktick)(columns[0][1]) + '`';
    }
    if (columns[0][2] !== '') {
      query += ' AS `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeBacktick)(columns[0][2]) + '`';
    }
    for (var i = 1; i < columns.length; i++) {
      query += ', `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeBacktick)(columns[i][0]) + '`.';
      if (columns[i][1] === '*') {
        query += '*';
      } else {
        query += '`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeBacktick)(columns[i][1]) + '`';
      }
      if (columns[i][2] !== '') {
        query += ' AS `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeBacktick)(columns[i][2]) + '`';
      }
    }
    query += '\nFROM ';
    query += window.generateFromBlock(tableAliases, foreignKeys);
    var $criteriaColCount = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.criteria_col:checked').length;
    if ($criteriaColCount > 0) {
      query += '\nWHERE ';
      query += window.generateWhereBlock();
    }
    query += ';';
    editor.getDoc().setValue(query);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#submit_query').on('click', function () {
    var query = editor.getDoc().getValue();
    // Verifying that the query is not empty
    if (query === '') {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.strEmptyQuery, false, 'error');
      return;
    }
    var data = {
      'db': jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_name').val(),
      'sql_query': query,
      'ajax_request': '1',
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
      'token': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('token')
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'POST',
      url: 'index.php?route=/database/multi-table-query/query',
      data: data,
      success: function (data) {
        var $resultsDom = jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.message);
        $resultsDom.find('.ajax:not(.pageselector)').each(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('click', function (event) {
            event.preventDefault();
          });
        });
        $resultsDom.find('.autosubmit, .pageselector, .showAllRows, .filter_rows').each(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('change click select focus', function (event) {
            event.preventDefault();
          });
        });
        // @ts-ignore
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sql_results').html($resultsDom);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#slide-handle').trigger('click'); // Collapse search criteria area
      }
    });
  });
  editor.getDoc().on('change', function () {
    const query = editor.getDoc().getValue();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#copy_query').prop('disabled', query === '');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#copy_query').on('click', function () {
    const query = editor.getDoc().getValue();
    const copyStatus = (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.copyToClipboard)(query, '<textarea>');
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.displayCopyNotification)(copyStatus);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#add_column_button').on('click', function () {
    columnCount++;
    var $newColumnDom = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="col"></div>').html(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#new_column_layout').html());
    $newColumnDom.find('.jsCriteriaButton').first().attr('data-bs-target', '#criteriaOptionsExtra' + columnCount.toString());
    $newColumnDom.find('.jsCriteriaButton').first().attr('aria-controls', 'criteriaOptionsExtra' + columnCount.toString());
    $newColumnDom.find('.jsCriteriaOptions').first().attr('id', 'criteriaOptionsExtra' + columnCount.toString());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#add_column_button').parent().siblings('.row').append($newColumnDom);
    addNewColumnCallbacks();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.columnNameSelect').each(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('change', function () {
      const colIsStar = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === '*';
      colIsStar && jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.col_alias').val('');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.col_alias').prop('disabled', colIsStar);
    });
  });
  const acceptsMultipleArgs = opsWithMultipleArgs();
  const acceptsTwoArgs = opsWithTwoArgs();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.criteria_op').each(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('change', function () {
      if (acceptsMultipleArgs.includes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val().toString())) {
        showMultiFields(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
      } else if (acceptsTwoArgs.includes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val().toString())) {
        showTwoFields(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
      } else {
        const options = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('table').find('.options');
        options.parent().prepend('<input type="text" class="rhs_text_val query-form__input--wide" placeholder="Enter criteria as free text"></input>');
        options.remove();
      }
    });
  });
  function showTwoFields(opSelect) {
    const critetiaRow = opSelect.closest('table').find('.rhs_text');
    const critetiaCol = critetiaRow.find('td').last();
    const criteriaInput = critetiaCol.find('input').first();
    if (critetiaCol.find('.binary').length === 0) {
      critetiaCol.empty();
      critetiaCol.append("\n                <div class=\"options binary\">\n                    <input type=\"text\" class=\"val\" placeholder=\"".concat(window.Messages.strFirstValuePlaceholder, "\" value=\"").concat(criteriaInput.val(), "\" />\n                    <input type=\"text\" class=\"val\" placeholder=\"").concat(window.Messages.strSecondValuePlaceholder, "\" />\n                </div>\n            "));
    }
  }
  function showMultiFields(opSelect) {
    const critetiaRow = opSelect.closest('table').find('.rhs_text');
    const critetiaCol = critetiaRow.find('td').last();
    const criteriaInput = critetiaCol.find('input').first();
    if (critetiaCol.find('.multi').length === 0) {
      critetiaCol.empty();
      critetiaCol.append("\n                <div class=\"options multi\">\n                    <div class=\"option\">\n                        <input type=\"text\" class=\"val\" placeholder=\"Enter an option\" value=\"".concat(criteriaInput.val(), "\" />\n                        <input type=\"button\" class=\"btn btn-secondary add-option\" value=\"+\" />\n                    </div>\n                </div>\n            "));
    }
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', 'input.add-option', function () {
    const options = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.options');
    options.find('.option').first().clone().appendTo(options);
    const newAdded = options.find('.option').last();
    newAdded.find('input.val').val('');
    newAdded.append('<input type="button" class="btn btn-secondary remove-option" value="-" />');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', 'input.remove-option', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.option').remove();
  });
  function addNewColumnCallbacks() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tableNameSelect').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('change', function () {
        const $table = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
        const $alias = $table.siblings('.col_alias');
        const $colsSelect = $table.parent().find('.columnNameSelect');
        $alias.prop('disabled', true);
        $colsSelect.each(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).show();
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).first().html(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + $table.find(':selected').data('hash')).html());
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('opColumn')) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('option[value="*"]').remove();
          }
        });
      });
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.jsRemoveColumn').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('click', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent().parent().remove();
      });
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.jsCriteriaButton').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('click', function (event, from) {
        if (from === null) {
          var $checkbox = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.criteria_col').first();
          $checkbox.prop('checked', !$checkbox.prop('checked'));
        }
        var $criteriaColCount = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.criteria_col:checked').length;
        if ($criteriaColCount > 1) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.jsCriteriaOptions').first().find('.logical_operator').first().css('display', 'table-row');
        }
      });
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.criteria_col').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('change', function () {
        var $anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.jsCriteriaButton').first();
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked') && !$anchor.hasClass('collapsed') || !jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked') && $anchor.hasClass('collapsed')) {
          // Do not collapse on checkbox tick as it does not make sense
          // The user has it open and wants to tick the box
          return;
        }
        $anchor.trigger('click', ['Trigger']);
      });
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.criteria_rhs').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('change', function () {
        var $rhsCol = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent().siblings('.rhs_table').first();
        var $rhsText = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent().siblings('.rhs_text').first();
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === 'text') {
          $rhsCol.css('display', 'none');
          $rhsText.css('display', 'table-row');
        } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === 'anotherColumn') {
          $rhsText.css('display', 'none');
          $rhsCol.css('display', 'table-row');
        } else {
          $rhsText.css('display', 'none');
          $rhsCol.css('display', 'none');
        }
      });
    });
  }
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(30); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=multi_table_query.js.map