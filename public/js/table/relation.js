"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["table/relation"],{

/***/ "./resources/js/table/relation.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/functions/getJsConfirmCommonParam.ts");
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/js/modules/functions/escape.ts");






/**
 * for table relation
 */
const showHideClauses = function ($thisDropdown) {
  if ($thisDropdown.val() === '') {
    $thisDropdown.parent().nextAll('span').hide();
  } else {
    if ($thisDropdown.is('select[name^="destination_foreign_column"]')) {
      $thisDropdown.parent().nextAll('span').show();
    }
  }
};
/**
 * Sets dropdown options to values
 * @param $dropdown
 * @param values
 * @param selectedValue
 */
const setDropdownValues = function ($dropdown, values) {
  let selectedValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  $dropdown.empty();
  var optionsAsString = '';
  // add an empty string to the beginning for empty selection
  values.unshift('');
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(values, function () {
    optionsAsString += '<option value=\'' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(this) + '\'' + (selectedValue === (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(this) ? ' selected=\'selected\'' : '') + '>' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(this) + '</option>';
  });
  $dropdown.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()(optionsAsString));
};
/**
 * Retrieves and populates dropdowns to the left based on the selected value
 *
 * @param $dropdown the dropdown whose value got changed
 */
const getDropdownValues = function ($dropdown) {
  var foreignDb = null;
  var foreignTable = null;
  var $databaseDd;
  var $tableDd;
  var $columnDd;
  var foreign = '';
  // if the changed dropdown is for foreign key constraints
  if ($dropdown.is('select[name^="destination_foreign"]')) {
    $databaseDd = $dropdown.parent().parent().parent().find('select[name^="destination_foreign_db"]');
    $tableDd = $dropdown.parent().parent().parent().find('select[name^="destination_foreign_table"]');
    $columnDd = $dropdown.parent().parent().parent().find('select[name^="destination_foreign_column"]');
    foreign = '_foreign';
  } else {
    // internal relations
    $databaseDd = $dropdown.parent().find('select[name^="destination_db"]');
    $tableDd = $dropdown.parent().find('select[name^="destination_table"]');
    $columnDd = $dropdown.parent().find('select[name^="destination_column"]');
  }
  // if the changed dropdown is a database selector
  if ($dropdown.is('select[name^="destination' + foreign + '_db"]')) {
    foreignDb = $dropdown.val();
    // if no database is selected empty table and column dropdowns
    if (foreignDb === '') {
      TableRelation.setDropdownValues($tableDd, []);
      TableRelation.setDropdownValues($columnDd, []);
      return;
    }
  } else {
    // if a table selector
    foreignDb = $databaseDd.val();
    foreignTable = $dropdown.val();
    // if no table is selected empty the column dropdown
    if (foreignTable === '') {
      TableRelation.setDropdownValues($columnDd, []);
      return;
    }
  }
  var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
  var $form = $dropdown.parents('form');
  var $db = $form.find('input[name="db"]').val();
  var $table = $form.find('input[name="table"]').val();
  var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
  var params = 'getDropdownValues=true' + argsep + 'ajax_request=true' + argsep + 'db=' + encodeURIComponent($db) + argsep + 'table=' + encodeURIComponent($table) + argsep + 'foreign=' + (foreign !== '') + argsep + 'foreignDb=' + encodeURIComponent(foreignDb) + (foreignTable !== null ? argsep + 'foreignTable=' + encodeURIComponent(foreignTable) : '');
  var $server = $form.find('input[name="server"]');
  if ($server.length > 0) {
    params += argsep + 'server=' + $form.find('input[name="server"]').val();
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    type: 'POST',
    url: 'index.php?route=/table/relation',
    data: params,
    dataType: 'json',
    success: function (data) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      if (typeof data !== 'undefined' && data.success) {
        // if the changed dropdown is a database selector
        if (foreignTable === null) {
          // set values for table and column dropdowns
          TableRelation.setDropdownValues($tableDd, data.tables);
          TableRelation.setDropdownValues($columnDd, []);
        } else {
          // if a table selector
          // set values for the column dropdown
          var primary = null;
          if (typeof data.primary !== 'undefined' && 1 === data.primary.length) {
            primary = data.primary[0];
          }
          TableRelation.setDropdownValues($columnDd.first(), data.columns, primary);
          TableRelation.setDropdownValues($columnDd.slice(1), data.columns);
        }
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
      }
    }
  });
};
const TableRelation = {
  showHideClauses: showHideClauses,
  setDropdownValues: setDropdownValues,
  getDropdownValues: getDropdownValues
};
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('table/relation.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('change', 'select[name^="destination_db"], ' + 'select[name^="destination_table"], ' + 'select[name^="destination_foreign_db"], ' + 'select[name^="destination_foreign_table"]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', 'a.add_foreign_key_field');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', 'a.add_foreign_key');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.drop_foreign_key_anchor.ajax').off('click');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('table/relation.js', function () {
  /**
   * Ajax event handler to fetch table/column dropdown values.
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('change', 'select[name^="destination_db"], ' + 'select[name^="destination_table"], ' + 'select[name^="destination_foreign_db"], ' + 'select[name^="destination_foreign_table"]', function () {
    TableRelation.getDropdownValues(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  /**
   * Ajax event handler to add a column to a foreign key constraint.
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', 'a.add_foreign_key_field', function (event) {
    event.preventDefault();
    event.stopPropagation();
    // Add field.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prev('span').clone(true, true).insertBefore(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)).find('select').val('');
    // Add foreign field.
    var $sourceElem = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name^="destination_foreign_column[' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-index') + ']"]').last().parent();
    $sourceElem.clone(true, true).insertAfter($sourceElem).find('select').val('');
  });
  /**
   * Ajax event handler to add a foreign key constraint.
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click', 'a.add_foreign_key', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var $prevRow = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr').prev('tr');
    var $newRow = $prevRow.clone(true, true);
    // Update serial number.
    var currIndex = $newRow.find('a.add_foreign_key_field').attr('data-index');
    var newIndex = parseInt(currIndex) + 1;
    $newRow.find('a.add_foreign_key_field').attr('data-index', newIndex);
    // Update form parameter names.
    $newRow.find('select[name^="foreign_key_fields_name"]').not($newRow.find('select[name^="foreign_key_fields_name"]').first()).find('select[name^="destination_foreign_column"]').not($newRow.find('select[name^="foreign_key_fields_name"]').not($newRow.find('select[name^="foreign_key_fields_name"]').first()).find('select[name^="destination_foreign_column"]').first()).each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().remove();
    });
    $newRow.find('input, select').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name').replace(/\d/, newIndex.toString()));
    });
    $newRow.find('input[type="text"]').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val('');
    });
    // Finally add the row.
    $newRow.insertAfter($prevRow);
  });
  /**
   * Ajax Event handler for 'Drop Foreign key'
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.drop_foreign_key_anchor.ajax').on('click', function (event) {
    event.preventDefault();
    var $anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    // Object containing reference to the current field's row
    var $currRow = $anchor.parents('tr');
    var dropQuery = (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)($currRow.children('td').children('.drop_foreign_key_msg').val());
    var question = window.sprintf(window.Messages.strDoYouReally, dropQuery);
    $anchor.confirm(question, $anchor.attr('href'), function (url) {
      var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strDroppingForeignKey, false);
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_4__["default"])(this, $anchor.getPostData());
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
        if (data.success === true) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msg);
          $currRow.remove();
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strErrorProcessingRequest + ' : ' + data.error, false);
        }
      }); // end $.post()
    });
  }); // end Drop Foreign key
  var windowWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.jsresponsive').css('max-width', windowWidth - 35 + 'px');
});

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/table/relation.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=relation.js.map