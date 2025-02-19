"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[40],{

/***/ 80:
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
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);
/* harmony import */ var _modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11);










/**
 * @fileoverview    functions used wherever an sql query form is used
 *
 * @test-module Sql
 */
/**
 * decode a string URL_encoded
 *
 * @param {string} str
 * @return {string} the URL-decoded string
 */
function urlDecode(str) {
  if (typeof str !== 'undefined') {
    return decodeURIComponent(str.replace(/\+/g, '%20'));
  }
}
/**
 * encode a string URL_decoded
 *
 * @param {string} str
 * @return {string} the URL-encoded string
 */
function urlEncode(str) {
  if (typeof str !== 'undefined') {
    return encodeURIComponent(str).replace(/%20/g, '+');
  }
}
/**
 * Saves SQL query in local storage or cookie
 *
 * @param {string} query SQL query
 */
function autoSave(query) {
  if (query) {
    var key = Sql.getAutoSavedKey();
    if ((0,_modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__["default"])('localStorage')) {
      window.localStorage.setItem(key, query);
    } else {
      window.Cookies.set(key, query, {
        path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
      });
    }
    checkSavedQuery();
  }
}
/**
 * Saves SQL query in local storage or cookie
 *
 * @param {string} db database name
 * @param {string} table table name
 * @param {string} query SQL query
 */
function showThisQuery(db, table, query) {
  var showThisQueryObject = {
    'db': db,
    'table': table,
    'query': query
  };
  if ((0,_modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__["default"])('localStorage')) {
    window.localStorage.showThisQuery = 1;
    window.localStorage.showThisQueryObject = JSON.stringify(showThisQueryObject);
  } else {
    window.Cookies.set('showThisQuery', '1', {
      path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
    });
    window.Cookies.set('showThisQueryObject', JSON.stringify(showThisQueryObject), {
      path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
    });
  }
}
/**
 * Set query to codemirror if show this query is
 * checked and query for the db and table pair exists
 */
function setShowThisQuery() {
  var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="db"]').val();
  var table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table"]').val();
  if ((0,_modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__["default"])('localStorage')) {
    if (window.localStorage.showThisQueryObject !== undefined) {
      var storedDb = JSON.parse(window.localStorage.showThisQueryObject).db;
      var storedTable = JSON.parse(window.localStorage.showThisQueryObject).table;
      var storedQuery = JSON.parse(window.localStorage.showThisQueryObject).query;
    }
    if (window.localStorage.showThisQuery !== undefined && window.localStorage.showThisQuery === '1') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="show_query"]').prop('checked', true);
      if (db === storedDb && table === storedTable) {
        if (window.codeMirrorEditor) {
          window.codeMirrorEditor.setValue(storedQuery);
          // @ts-ignore
        } else if (document.sqlform) {
          // @ts-ignore
          document.sqlform.sql_query.value = storedQuery;
        }
      }
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="show_query"]').prop('checked', false);
    }
  }
}
/**
 * Saves SQL query with sort in local storage or cookie
 *
 * @param {string} query SQL query
 */
function autoSaveWithSort(query) {
  if (query) {
    if ((0,_modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__["default"])('localStorage')) {
      window.localStorage.setItem('autoSavedSqlSort', query);
    } else {
      window.Cookies.set('autoSavedSqlSort', query, {
        path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
      });
    }
  }
}
/**
 * Clear saved SQL query with sort in local storage or cookie
 */
function clearAutoSavedSort() {
  if ((0,_modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__["default"])('localStorage')) {
    window.localStorage.removeItem('autoSavedSqlSort');
  } else {
    window.Cookies.set('autoSavedSqlSort', '', {
      path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
    });
  }
}
/**
 * Get the field name for the current field.  Required to construct the query
 * for grid editing
 *
 * @param $tableResults enclosing results table
 * @param $thisField    jQuery object that points to the current field's tr
 *
 * @return {string}
 */
function getFieldName($tableResults, $thisField) {
  var thisFieldIndex = $thisField.index();
  // ltr or rtl direction does not impact how the DOM was generated
  // check if the action column in the left exist
  var leftActionExist = !$tableResults.find('th').first().hasClass('draggable');
  // number of column span for checkbox and Actions
  var leftActionSkip = leftActionExist ? $tableResults.find('th').first().attr('colspan') - 1 : 0;
  // If this column was sorted, the text of the a element contains something
  // like <small>1</small> that is useful to indicate the order in case
  // of a sort on multiple columns; however, we dont want this as part
  // of the column name so we strip it ( .clone() to .end() )
  var fieldName = $tableResults.find('thead').find('th').eq(thisFieldIndex - leftActionSkip).find('a').clone() // clone the element
  .children() // select all the children
  .remove() // remove all of them
  .end() // go back to the selected element
  .text(); // grab the text
  // happens when just one row (headings contain no a)
  if (fieldName === '') {
    var $heading = $tableResults.find('thead').find('th').eq(thisFieldIndex - leftActionSkip).children('span');
    // may contain column comment enclosed in a span - detach it temporarily to read the column name
    var $tempColComment = $heading.children().detach();
    fieldName = $heading.text();
    // re-attach the column comment
    $heading.append($tempColComment);
  }
  fieldName = fieldName.trim();
  return fieldName;
}
/**
 * @type {boolean} lock for the sqlbox textarea in the querybox
 */
let sqlBoxLocked = false;
/**
 * @type {boolean[]} holds elements which content should only selected once
 */
const onlyOnceElements = [];
/**
 * Handles 'Simulate query' button on SQL query box.
 */
const handleSimulateQueryButton = function () {
  const updateRegExp = /^\s*UPDATE\b\s*(((`([^`]|``)+`)|([a-z0-9_$]+))\s*\.\s*)?((`([^`]|``)+`)|([a-z0-9_$]+))\s*\bSET\b/i;
  const deleteRegExp = /^\s*DELETE\b\s*((((`([^`]|``)+`)|([a-z0-9_$]+))\s*\.\s*)?((`([^`]|``)+`)|([a-z0-9_$]+))\s*)?\bFROM\b/i;
  const query = window.codeMirrorEditor ? window.codeMirrorEditor.getValue() : jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').val();
  const $simulateDml = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#simulate_dml');
  if (updateRegExp.test(query) || deleteRegExp.test(query)) {
    if (!$simulateDml.length) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#button_submit_query').before('<input type="button" id="simulate_dml"' + 'tabindex="199" class="btn btn-primary" value="' + window.Messages.strSimulateDML + '">');
    }
  } else {
    if ($simulateDml.length) {
      $simulateDml.remove();
    }
  }
};
/**
 * selects the content of a given object, f.e. a textarea
 *
 * @param {HTMLTextAreaElement} element Element of which the content will be selected
 */
const selectContent = function (element) {
  if (onlyOnceElements[element.name]) {
    return;
  }
  onlyOnceElements[element.name] = true;
  if (sqlBoxLocked) {
    return;
  }
  element.select();
};
/**
 * Sets current value for query box.
 * @param {string} query
 */
const setQuery = function (query) {
  if (window.codeMirrorEditor) {
    window.codeMirrorEditor.setValue(query);
    window.codeMirrorEditor.focus();
    // @ts-ignore
  } else if (document.sqlform) {
    // @ts-ignore
    document.sqlform.sql_query.value = query;
    // @ts-ignore
    document.sqlform.sql_query.focus();
  }
};
/**
 * Create quick sql statements.
 *
 * @param {'clear'|'format'|'saved'|'selectall'|'select'|'insert'|'update'|'delete'} queryType
 *
 */
const insertQuery = function (queryType) {
  var table;
  if (queryType === 'clear') {
    setQuery('');
    return;
  } else if (queryType === 'format' || queryType === 'formatSingleLine') {
    if (window.codeMirrorEditor) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#querymessage').html(window.Messages.strFormatting + '&nbsp;<img class="ajaxIcon" src="' + window.themeImagePath + 'ajax_clock_small.gif" alt="">');
      var params = {
        'ajax_request': true,
        'sql': window.codeMirrorEditor.getValue(),
        'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server'),
        'formatSingleLine': queryType === 'formatSingleLine'
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: 'index.php?route=/database/sql/format',
        data: params,
        success: function (data) {
          if (data.success) {
            window.codeMirrorEditor.setValue(data.sql);
          }
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#querymessage').html('');
        },
        error: function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#querymessage').html('');
        }
      });
    }
    return;
  } else if (queryType === 'saved') {
    var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="db"]').val();
    table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table"]').val();
    var key = db;
    if (table !== undefined) {
      key += '.' + table;
    }
    key = 'autoSavedSql_' + key;
    if ((0,_modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__["default"])('localStorage') && typeof window.localStorage.getItem(key) === 'string') {
      setQuery(window.localStorage.getItem(key));
      // @ts-ignore
    } else if (window.Cookies.get(key, {
      path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
    })) {
      // @ts-ignore
      setQuery(window.Cookies.get(key, {
        path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
      }));
    }
    return;
  }
  var query = '';
  // @ts-ignore
  var myListBox = document.sqlform.dummy;
  // @ts-ignore
  table = (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeBacktick)(document.sqlform.table.value);
  if (myListBox.options.length > 0) {
    sqlBoxLocked = true;
    var columnsList = '';
    var valDis = '';
    var editDis = '';
    var NbSelect = 0;
    for (var i = 0; i < myListBox.options.length; i++) {
      NbSelect++;
      if (NbSelect > 1) {
        columnsList += ', ';
        valDis += ',';
        editDis += ',';
      }
      columnsList += myListBox.options[i].value;
      valDis += '\'[value-' + NbSelect + ']\'';
      editDis += myListBox.options[i].value + '=\'[value-' + NbSelect + ']\'';
    }
    if (queryType === 'selectall') {
      query = 'SELECT * FROM `' + table + '` WHERE 1';
    } else if (queryType === 'select') {
      query = 'SELECT ' + columnsList + ' FROM `' + table + '` WHERE 1';
    } else if (queryType === 'insert') {
      query = 'INSERT INTO `' + table + '`(' + columnsList + ') VALUES (' + valDis + ')';
    } else if (queryType === 'update') {
      query = 'UPDATE `' + table + '` SET ' + editDis + ' WHERE 1';
    } else if (queryType === 'delete') {
      query = 'DELETE FROM `' + table + '` WHERE 0';
    }
    setQuery(query);
    sqlBoxLocked = false;
  }
};
/**
 * Inserts multiple fields.
 *
 */
const insertValueQuery = function () {
  // @ts-ignore
  var myQuery = document.sqlform.sql_query;
  // @ts-ignore
  var myListBox = document.sqlform.dummy;
  if (myListBox.options.length > 0) {
    sqlBoxLocked = true;
    var columnsList = '';
    var NbSelect = 0;
    for (var i = 0; i < myListBox.options.length; i++) {
      if (myListBox.options[i].selected) {
        NbSelect++;
        if (NbSelect > 1) {
          columnsList += ', ';
        }
        columnsList += myListBox.options[i].value;
      }
    }
    /* CodeMirror support */
    if (window.codeMirrorEditor) {
      window.codeMirrorEditor.replaceSelection(columnsList);
      window.codeMirrorEditor.focus();
      // IE support
      // @ts-ignore
    } else if (document.selection) {
      myQuery.focus();
      // @ts-ignore
      var sel = document.selection.createRange();
      sel.text = columnsList;
      // MOZILLA/NETSCAPE support
      // @ts-ignore
    } else if (document.sqlform.sql_query.selectionStart || document.sqlform.sql_query.selectionStart === '0') {
      // @ts-ignore
      var startPos = document.sqlform.sql_query.selectionStart;
      // @ts-ignore
      var endPos = document.sqlform.sql_query.selectionEnd;
      // @ts-ignore
      var SqlString = document.sqlform.sql_query.value;
      myQuery.value = SqlString.substring(0, startPos) + columnsList + SqlString.substring(endPos, SqlString.length);
      myQuery.focus();
    } else {
      myQuery.value += columnsList;
    }
    // eslint-disable-next-line no-unused-vars
    sqlBoxLocked = false;
  }
};
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('sql.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.delete_row.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '.bookmarkQueryForm');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#bkm_label').off('input');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('makeGrid', '.sqlqueryresults');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglequerybox').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#button_submit_query');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', '#id_bookmark');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=\'bookmark_variable\']').off('keypress');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '#sqlqueryform.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'input[name=navig].ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', 'form[name=\'displayOptionsForm\'].ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mouseenter', 'th.column_heading.pointer');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mouseleave', 'th.column_heading.pointer');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'th.column_heading.marker');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('keyup', '.filter_rows');
  if (window.codeMirrorEditor) {
    // @ts-ignore
    window.codeMirrorEditor.off('change');
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').off('input propertychange');
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', '.navigation .showAllRows');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', 'a.browse_foreign');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', '#simulate_dml');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('keyup', '#sqlqueryform');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', 'form[name="resultsForm"].ajax button[name="submit_mult"], form[name="resultsForm"].ajax input[name="submit_mult"]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '.maxRowsForm');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#view_as');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#sqlquery');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'input.sqlbutton');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldsSelect').off('dblclick');
});
/**
 * @description <p>Ajax scripts for sql and browse pages</p>
 *
 * Actions ajaxified here:
 * <ul>
 * <li>Retrieve results of an SQL query</li>
 * <li>Paginate the results table</li>
 * <li>Sort the results table</li>
 * <li>Change table according to display options</li>
 * <li>Grid editing of data</li>
 * <li>Saving a bookmark</li>
 * </ul>
 *
 * @name        document.ready
 * @memberOf    jQuery
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('sql.js', function () {
  // @ts-ignore
  if (window.codeMirrorEditor || document.sqlform) {
    Sql.setShowThisQuery();
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {
    if (window.codeMirrorEditor) {
      window.codeMirrorEditor.on('change', function () {
        Sql.autoSave(window.codeMirrorEditor.getValue());
      });
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').on('input propertychange', function () {
        Sql.autoSave(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').val());
      });
      var useLocalStorageValue = (0,_modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__["default"])('localStorage') && typeof window.localStorage.autoSavedSqlSort !== 'undefined';
      // Save sql query with sort
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#RememberSorting') !== undefined && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#RememberSorting').is(':checked')) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="sql_query"]').on('change', function () {
          Sql.autoSaveWithSort(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
        });
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sortlink').on('click', function () {
          Sql.clearAutoSavedSort();
        });
      } else {
        Sql.clearAutoSavedSort();
      }
      // If sql query with sort for current table is stored, change sort by key select value
      var sortStoredQuery = useLocalStorageValue ? window.localStorage.autoSavedSqlSort
      // @ts-ignore
      : window.Cookies.get('autoSavedSqlSort', {
        path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
      });
      if (typeof sortStoredQuery !== 'undefined' && sortStoredQuery !== jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="sql_query"]').val() && jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="sql_query"] option[value="' + sortStoredQuery + '"]').length !== 0) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="sql_query"]').val(sortStoredQuery).trigger('change');
      }
    }
  });
  // Delete row from SQL results
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.delete_row.ajax', function (e) {
    e.preventDefault();
    var question = window.sprintf(window.Messages.strDoYouReally, (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('td').find('div').text()));
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    $link.confirm(question, $link.attr('href'), function (url) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
      var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
      var params = 'ajax_request=1' + argsep + 'is_js_confirmed=1';
      var postData = $link.getPostData();
      if (postData) {
        params += argsep + postData;
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
        if (data.success) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.message);
          $link.closest('tr').remove();
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error, false);
        }
      });
    });
  });
  // Ajaxification for 'Bookmark this SQL query'
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '.bookmarkQueryForm', function (e) {
    e.preventDefault();
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('action'), 'ajax_request=1' + argsep + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).serialize(), function (data) {
      if (data.success) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.message);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error, false);
      }
    });
  });
  /* Hides the bookmarkoptions checkboxes when the bookmark label is empty */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#bkm_label').on('input', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#id_bkm_all_users, input#id_bkm_replace').parent().toggle(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val().length > 0);
  }).trigger('input');
  /**
   * Attach Event Handler for 'Copy to clipboard'
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#copyToClipBoard', function (event) {
    event.preventDefault();
    var textArea = document.createElement('textarea');
    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //
    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = '0';
    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';
    textArea.value = '';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#server-breadcrumb a').each(function () {
      textArea.value += jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('raw-text') + '/';
    });
    textArea.value += '\t\t' + window.location.href;
    textArea.value += '\n';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.alert-success').each(function () {
      textArea.value += jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text() + '\n\n';
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sql pre').each(function () {
      textArea.value += jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text() + '\n\n';
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.table_results .column_heading a').each(function () {
      // Don't copy ordering number text within <small> tag
      textArea.value += jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).clone().find('small').remove().end().text() + '\t';
    });
    textArea.value += '\n';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.table_results tbody tr').each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('repeating_header_row')) {
        return;
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('.data span').each(function () {
        // Extract <em> tag for NULL values before converting to string to not mess up formatting
        var data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('em').length !== 0 ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('em')[0] : this;
        textArea.value += jquery__WEBPACK_IMPORTED_MODULE_0___default()(data).text() + '\t';
      });
      textArea.value += '\n';
    });
    // eslint-disable-next-line compat/compat
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      alert('Sorry! Unable to copy');
    }
    // eslint-disable-next-line compat/compat
    document.body.removeChild(textArea);
  }); // end of Copy to Clipboard action
  /**
   * Attach the {@link makeGrid} function to a custom event, which will be
   * triggered manually everytime the table of results is reloaded
   * @memberOf    jQuery
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('makeGrid', '.sqlqueryresults', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.table_results').each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('td.grid_edit').length > 0) {
        window.makeGrid(this);
      }
    });
  });
  /**
   * Append the "Show/Hide query box" message to the query input form
   *
   * @memberOf jQuery
   * @name    appendToggleSpan
   */
  // do not add this link more than once
  if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryform').find('button').is('#togglequerybox')) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('<button class="btn btn-secondary" id="togglequerybox"></button>').html(window.Messages.strHideQueryBox).appendTo('#sqlqueryform')
    // initially hidden because at this point, nothing else
    // appears under the link
    .hide();
    // Attach the toggling of the query box visibility to a click
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglequerybox').on('click', function () {
      var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      $link.siblings().slideToggle('fast');
      if ($link.text() === window.Messages.strHideQueryBox) {
        $link.text(window.Messages.strShowQueryBox);
        // cheap trick to add a spacer between the menu tabs
        // and "Show query box"; feel free to improve!
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglequerybox_spacer').remove();
        $link.before('<br id="togglequerybox_spacer">');
      } else {
        $link.text(window.Messages.strHideQueryBox);
      }
      // avoid default click action
      return false;
    });
  }
  /**
   * Event handler for sqlqueryform.ajax button_submit_query
   *
   * @memberOf    jQuery
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#button_submit_query', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.alert-success,.alert-danger').hide();
    // hide already existing error or success message
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form');
    // the Go button related to query submission was clicked,
    // instead of the one related to Bookmarks, so empty the
    // id_bookmark selector to avoid misinterpretation in
    // /import about what needs to be done
    $form.find('select[name=id_bookmark]').val('');
    var isShowQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="show_query"]').is(':checked');
    if (isShowQuery) {
      window.localStorage.showThisQuery = '1';
      var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="db"]').val();
      var table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table"]').val();
      var query;
      if (window.codeMirrorEditor) {
        query = window.codeMirrorEditor.getValue();
      } else {
        query = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').val();
      }
      Sql.showThisQuery(db, table, query);
    } else {
      window.localStorage.showThisQuery = '0';
    }
  });
  /**
   * Event handler to show appropriate number of variable boxes
   * based on the bookmarked query
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#id_bookmark', function () {
    var varCount = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('option:selected').data('varcount');
    if (typeof varCount === 'undefined') {
      varCount = 0;
    }
    var $varDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#bookmarkVariables');
    $varDiv.empty();
    for (var i = 1; i <= varCount; i++) {
      $varDiv.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="mb-3">'));
      $varDiv.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<label for="bookmarkVariable' + i + '">' + window.sprintf(window.Messages.strBookmarkVariable, i) + '</label>'));
      $varDiv.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input class="form-control" type="text" size="10" name="bookmark_variable[' + i + ']" id="bookmarkVariable' + i + '">'));
      $varDiv.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('</div>'));
    }
    if (varCount === 0) {
      $varDiv.parent().hide();
    } else {
      $varDiv.parent().show();
    }
  });
  /**
   * Event handler for hitting enter on sqlqueryform bookmark_variable
   * (the Variable textfield in Bookmarked SQL query section)
   *
   * @memberOf    jQuery
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=bookmark_variable]').on('keypress', function (event) {
    // force the 'Enter Key' to implicitly click the #button_submit_bookmark
    var keycode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keycode === 13) {
      // keycode for enter key
      // When you press enter in the sqlqueryform, which
      // has 2 submit buttons, the default is to run the
      // #button_submit_query, because of the tabindex
      // attribute.
      // This submits #button_submit_bookmark instead,
      // because when you are in the Bookmarked SQL query
      // section and hit enter, you expect it to do the
      // same action as the Go button in that section.
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#button_submit_bookmark').trigger('click');
      return false;
    } else {
      return true;
    }
  });
  /**
   * Ajax Event handler for 'SQL Query Submit'
   *
   * @see         ajaxShowMessage()
   * @memberOf    jQuery
   * @name        sqlqueryform_submit
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '#sqlqueryform.ajax', function (event) {
    event.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    if (window.codeMirrorEditor) {
      $form[0].elements.sql_query.value = window.codeMirrorEditor.getValue();
    }
    if (!(0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkSqlQuery)($form[0])) {
      return false;
    }
    // remove any div containing a previous error message
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.alert-danger').remove();
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
    var $sqlqueryresultsouter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter');
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)($form);
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize() + argsep + 'ajax_page_request=true', function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        // success happens if the query returns rows or not
        // show a message that stays on screen
        if (typeof data.action_bookmark !== 'undefined') {
          // view only
          if ('1' === data.action_bookmark) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').text(data.sql_query);
            // send to codemirror if possible
            setQuery(data.sql_query);
          }
          // delete
          if ('2' === data.action_bookmark) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_bookmark option[value=\'' + data.id_bookmark + '\']').remove();
            // if there are no bookmarked queries now (only the empty option),
            // remove the bookmark section
            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_bookmark option').length === 1) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldsetBookmarkOptions').hide();
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldsetBookmarkOptionsFooter').hide();
            }
          }
        }
        $sqlqueryresultsouter.show().html(data.message);
        (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])($sqlqueryresultsouter);
        if (data.menu) {
          history.replaceState({
            menu: data.menu
          }, null);
          _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.handleMenu.replace(data.menu);
        }
        if (data.params) {
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.setAll(data.params));
        }
        if (typeof data.ajax_reload !== 'undefined') {
          if (data.ajax_reload.reload) {
            if (data.ajax_reload.table_name) {
              _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('table', data.ajax_reload.table_name));
              (0,_modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__["default"])();
            } else {
              _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
            }
          }
        } else if (typeof data.reload !== 'undefined') {
          // this happens if a USE or DROP command was typed
          if (data.db !== _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db')) {
            _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.setAll({
              'db': data.db,
              'table': ''
            }));
          }
          var url;
          if (data.db) {
            if (data.table) {
              url = 'index.php?route=/table/sql';
            } else {
              url = 'index.php?route=/database/sql';
            }
          } else {
            url = 'index.php?route=/server/sql';
          }
          (0,_modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__["default"])(url);
          _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.callback = () => {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter').show().html(data.message);
            (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter'));
          };
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sqlqueryresults').trigger('makeGrid');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglequerybox').show();
        if (typeof data.action_bookmark === 'undefined') {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryform input[name="retain_query_box"]').is(':checked') !== true) {
            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglequerybox').siblings(':visible').length > 0) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglequerybox').trigger('click');
            }
          }
        }
      } else if (typeof data !== 'undefined' && data.success === false) {
        // show an error message that stays on screen
        $sqlqueryresultsouter.show().html(data.error);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
          scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()
        }, 200);
      }
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
    }); // end $.post()
  }); // end SQL Query submit
  /**
   * Ajax Event handler for the display options
   * @memberOf    jQuery
   * @name        displayOptionsForm_submit
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', 'form[name=\'displayOptionsForm\'].ajax', function (event) {
    event.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize() + argsep + 'ajax_request=true', function (data) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
      var $sqlqueryresults = $form.parents('.sqlqueryresults');
      $sqlqueryresults.html(data.message).trigger('makeGrid');
      (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])($sqlqueryresults);
    }); // end $.post()
  }); // end displayOptionsForm handler
  // Filter row handling. --STARTS--
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keyup', '.filter_rows', function () {
    var uniqueId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('for');
    var $targetTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.table_results[data-uniqueId=\'' + uniqueId + '\']');
    var $headerCells = $targetTable.find('th[data-column]');
    var targetColumns = [];
    // To handle colspan=4, in case of edit, copy, etc options (Table row links). Add 3 dummy <TH> elements - only when the Table row links are NOT on the "Right"
    var rowLinksLocation = $targetTable.find('thead > tr > th').first();
    var dummyTh = rowLinksLocation[0].getAttribute('colspan') !== null ? '<th class="hide dummy_th"></th><th class="hide dummy_th"></th><th class="hide dummy_th"></th>' : ''; // Selecting columns that will be considered for filtering and searching.
    // Selecting columns that will be considered for filtering and searching.
    $headerCells.each(function () {
      targetColumns.push(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text().trim());
    });
    var phrase = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    // Set same value to both Filter rows fields.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.filter_rows[data-for=\'' + uniqueId + '\']').not(this).val(phrase);
    // Handle colspan.
    $targetTable.find('thead > tr').prepend(dummyTh);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().uiTableFilter($targetTable, phrase, targetColumns);
    $targetTable.find('th.dummy_th').remove();
  });
  // Filter row handling. --ENDS--
  // Prompt to confirm on Show All
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', '.navigation .showAllRows', function (e) {
    e.preventDefault();
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('form');
    const submitShowAllForm = function () {
      var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
      var submitData = $form.serialize() + argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true';
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
      _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), submitData, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    };
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked')) {
      // already showing all rows
      submitShowAllForm();
    } else {
      $form.confirm(window.Messages.strShowAllRowsWarning, $form.attr('action'), function () {
        submitShowAllForm();
      });
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('keyup', '#sqlqueryform', function () {
    handleSimulateQueryButton();
  });
  /**
   * Ajax event handler for 'Simulate DML'.
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', '#simulate_dml', function () {
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryform');
    var query = '';
    var delimiter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_sql_delimiter').val();
    var dbName = $form.find('input[name="db"]').val();
    if (window.codeMirrorEditor) {
      query = window.codeMirrorEditor.getValue();
    } else {
      query = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').val();
    }
    if (query.length === 0) {
      alert(window.Messages.strFormEmpty);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').trigger('focus');
      return false;
    }
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'POST',
      url: 'index.php?route=/import/simulate-dml',
      data: {
        'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server'),
        'db': dbName,
        'ajax_request': '1',
        'sql_query': query,
        'sql_delimiter': delimiter
      },
      success: function (response) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
        if (response.success) {
          var dialogContent = '<div class="preview_sql">';
          if (response.sql_data) {
            var len = response.sql_data.length;
            for (var i = 0; i < len; i++) {
              dialogContent += '<strong>' + window.Messages.strSQLQuery + '</strong>' + response.sql_data[i].sql_query + window.Messages.strAffectedRows + ' <a href="' + response.sql_data[i].matched_rows_url + '">' + response.sql_data[i].matched_rows + '</a><br>';
              if (i < len - 1) {
                dialogContent += '<hr>';
              }
            }
          } else {
            dialogContent += response.message;
          }
          dialogContent += '</div>';
          var $dialogContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(dialogContent);
          var modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#simulateDmlModal');
          modal.modal('show');
          modal.find('.modal-body').first()
          // @ts-ignore
          .html($dialogContent);
          modal.on('shown.bs.modal', function () {
            (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(modal);
          });
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(response.error);
        }
      },
      error: function () {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strErrorProcessingRequest);
      }
    });
  });
  /**
   * Handles multi submits of results browsing page such as edit, delete and export
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', 'form[name="resultsForm"].ajax button[name="submit_mult"], form[name="resultsForm"].ajax input[name="submit_mult"]', function (e) {
    e.preventDefault();
    var $button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var action = $button.val();
    var $form = $button.closest('form');
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
    var submitData = $form.serialize() + argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true' + argsep;
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
    _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
    var url;
    if (action === 'edit') {
      submitData = submitData + argsep + 'default_action=update';
      url = 'index.php?route=/table/change/rows';
    } else if (action === 'copy') {
      submitData = submitData + argsep + 'default_action=insert';
      url = 'index.php?route=/table/change/rows';
    } else if (action === 'export') {
      url = 'index.php?route=/table/export/rows';
    } else if (action === 'delete') {
      url = 'index.php?route=/table/delete/confirm';
    } else {
      return;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, submitData, _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '.maxRowsForm', function () {
    var unlimNumRows = Number(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input[name="unlim_num_rows"]').val());
    var maxRowsCheck = (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkFormElementInRange)(this, 'session_max_rows', window.Messages.strNotValidRowNumber, 1);
    var posCheck = (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkFormElementInRange)(this, 'pos', window.Messages.strNotValidRowNumber, 0, unlimNumRows > 0 ? unlimNumRows - 1 : null);
    return maxRowsCheck && posCheck;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#insertBtn').on('click', function () {
    insertValueQuery();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#view_as').on('click', function () {
    selectContent(this);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').on('click', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('textarea-auto-select') === true) {
      selectContent(this);
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'input.sqlbutton', function (evt) {
    insertQuery(evt.target.id);
    handleSimulateQueryButton();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldsSelect').on('dblclick', () => {
    insertValueQuery();
  });
});
/**
 * Starting from some th, change the class of all td under it.
 * If isAddClass is specified, it will be used to determine whether to add or remove the class.
 *
 * @param $thisTh
 * @param {string} newClass
 * @param isAddClass
 */
function changeClassForColumn($thisTh, newClass) {
  let isAddClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  // index 0 is the th containing the big T
  var thIndex = $thisTh.index();
  var hasBigT = $thisTh.closest('tr').children().first().hasClass('column_action');
  // .eq() is zero-based
  if (hasBigT) {
    thIndex--;
  }
  var $table = $thisTh.parents('.table_results');
  if (!$table.length) {
    $table = $thisTh.parents('table').siblings('.table_results');
  }
  var $tds = $table.find('tbody tr').find('td.data').eq(thIndex);
  if (isAddClass === undefined) {
    $tds.toggleClass(newClass);
  } else {
    $tds.toggleClass(newClass, isAddClass);
  }
}
/**
 * Handles browse foreign values modal dialog
 *
 * @param {object} $thisA reference to the browse foreign value link
 */
function browseForeignDialog($thisA) {
  var formId = '#browse_foreign_form';
  var showAllId = '#foreign_showAll';
  var tableId = '#browse_foreign_table';
  var filterId = '#input_foreign_filter';
  var $dialog = null;
  var argSep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
  var params = $thisA.getPostData();
  params += argSep + 'ajax_request=true';
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post($thisA.attr('href'), params, function (data) {
    // Creates browse foreign value dialog
    $dialog = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div>').append(data.message).dialog({
      classes: {
        'ui-dialog-titlebar-close': 'btn-close'
      },
      title: window.Messages.strBrowseForeignValues,
      width: Math.min(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width() - 100, 700),
      maxHeight: jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height() - 100,
      dialogClass: 'browse_foreign_modal',
      close: function () {
        // remove event handlers attached to elements related to dialog
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId).off('click', 'td a.foreign_value');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(formId).off('click', showAllId);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(formId).off('submit');
        // remove dialog itself
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
      },
      modal: true
    });
  }).done(function () {
    var showAll = false;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId).on('click', 'td a.foreign_value', function (e) {
      e.preventDefault();
      var $input = $thisA.prev('input[type=text]');
      // Check if input exists or get CEdit edit_box
      if ($input.length === 0) {
        $input = $thisA.closest('.edit_area').prev('.edit_box');
      }
      // Set selected value as input value
      $input.val(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('key'));
      // Unchecks the Ignore checkbox for the current row
      $input.trigger('change');
      $dialog.dialog('close');
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(formId).on('click', showAllId, function () {
      showAll = true;
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(formId).on('submit', function (e) {
      e.preventDefault();
      // if filter value is not equal to old value
      // then reset page number to 1
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(filterId).val() !== jquery__WEBPACK_IMPORTED_MODULE_0___default()(filterId).data('old')) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(formId).find('select[name=pos]').val('0');
      }
      var postParams = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).serializeArray();
      // if showAll button was clicked to submit form then
      // add showAll button parameter to form
      if (showAll) {
        postParams.push({
          name: jquery__WEBPACK_IMPORTED_MODULE_0___default()(showAllId).attr('name'),
          value: jquery__WEBPACK_IMPORTED_MODULE_0___default()(showAllId).val()
        });
      }
      // updates values in dialog
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('action') + '&ajax_request=1', postParams, function (data) {
        var $obj = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div>').html(data.message);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(formId).html($obj.find(formId).html());
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId).html($obj.find(tableId).html());
      });
      showAll = false;
    });
  });
}
/**
 * Get the auto saved query key
 * @return {string}
 */
function getAutoSavedKey() {
  var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="db"]').val();
  var table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table"]').val();
  var key = db;
  if (table !== undefined) {
    key += '.' + table;
  }
  return 'autoSavedSql_' + key;
}
function checkSavedQuery() {
  let key = Sql.getAutoSavedKey();
  let buttonGetAutoSavedQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#saved');
  let isAutoSavedInLocalStorage = (0,_modules_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_9__["default"])('localStorage') && typeof window.localStorage.getItem(key) === 'string';
  // @ts-ignore
  let isAutoSavedInCookie = window.Cookies.get(key, {
    path: _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('rootPath')
  });
  if (isAutoSavedInLocalStorage || isAutoSavedInCookie) {
    buttonGetAutoSavedQuery.prop('disabled', false);
    return;
  }
  buttonGetAutoSavedQuery.prop('disabled', true);
}
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('sql.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', 'a.browse_foreign', function (e) {
    e.preventDefault();
    Sql.browseForeignDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  /**
   * vertical column highlighting in horizontal mode when hovering over the column header
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseenter', 'th.column_heading.pointer', function () {
    Sql.changeClassForColumn(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'hover', true);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseleave', 'th.column_heading.pointer', function () {
    Sql.changeClassForColumn(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'hover', false);
  });
  /**
   * vertical column marking in horizontal mode when clicking the column header
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'th.column_heading.marker', function () {
    Sql.changeClassForColumn(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'marked');
  });
  /**
   * create resizable table
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sqlqueryresults').trigger('makeGrid');
  /**
   * Check if there is any saved query
   */
  // @ts-ignore
  if (window.codeMirrorEditor || document.sqlform) {
    Sql.checkSavedQuery();
  }
});
function buildProfilingChart() {
  const profilingChartCanvas = document.getElementById('profilingChartCanvas');
  if (!profilingChartCanvas) {
    return;
  }
  const chartDataJson = profilingChartCanvas.getAttribute('data-chart-data');
  let chartData = null;
  try {
    chartData = JSON.parse(chartDataJson);
  } catch (e) {
    return;
  }
  if (!(chartData && 'labels' in chartData && 'data' in chartData)) {
    return;
  }
  const lang = _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('lang');
  const numberFormat = new Intl.NumberFormat(lang.replace('_', '-'), {
    style: 'unit',
    unit: 'second',
    unitDisplay: 'long',
    notation: 'engineering'
  });
  new window.Chart(profilingChartCanvas, {
    type: 'pie',
    data: {
      labels: chartData.labels,
      datasets: [{
        data: chartData.data
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: context => context.parsed ? numberFormat.format(context.parsed) : ''
          }
        }
      }
    }
  });
}
/**
 * initialize profiling data tables
 */
function initProfilingTables() {
  if (!(jquery__WEBPACK_IMPORTED_MODULE_0___default().tablesorter)) {
    return;
  }
  // Added to allow two direction sorting
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#profiletable').find('thead th').off('click mousedown');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#profiletable').tablesorter({
    widgets: ['zebra'],
    sortList: [[0, 0]],
    textExtraction: function (node) {
      if (node.children.length > 0) {
        return node.children[0].innerHTML;
      } else {
        return node.innerHTML;
      }
    }
  });
  // Added to allow two direction sorting
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#profilesummarytable').find('thead th').off('click mousedown');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#profilesummarytable').tablesorter({
    widgets: ['zebra'],
    sortList: [[1, 1]],
    textExtraction: function (node) {
      if (node.children.length > 0) {
        return node.children[0].innerHTML;
      } else {
        return node.innerHTML;
      }
    }
  });
}
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('sql.js', function () {
  Sql.initProfilingTables();
  buildProfilingChart();
});
const Sql = {
  urlDecode: urlDecode,
  urlEncode: urlEncode,
  autoSave: autoSave,
  showThisQuery: showThisQuery,
  setShowThisQuery: setShowThisQuery,
  autoSaveWithSort: autoSaveWithSort,
  clearAutoSavedSort: clearAutoSavedSort,
  getFieldName: getFieldName,
  changeClassForColumn: changeClassForColumn,
  browseForeignDialog: browseForeignDialog,
  getAutoSavedKey: getAutoSavedKey,
  checkSavedQuery: checkSavedQuery,
  initProfilingTables: initProfilingTables
};
window.Sql = Sql;

/***/ }),

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(80); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=sql.js.map