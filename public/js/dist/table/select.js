"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[47],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 88:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);






/**
 * @fileoverview JavaScript functions used on /table/search
 */
/**
 * Checks if given data-type is numeric or date.
 *
 * @param {string} dataType Column data-type
 *
 * @return {boolean | string}
 */
const checkIfDataTypeNumericOrDate = function (dataType) {
  // To test for numeric data-types.
  var numericRegExp = new RegExp('TINYINT|SMALLINT|MEDIUMINT|INT|BIGINT|DECIMAL|FLOAT|DOUBLE|REAL', 'i');
  // To test for date data-types.
  var dateRegExp = new RegExp('DATETIME|DATE|TIMESTAMP|TIME|YEAR', 'i');
  // Return matched data-type
  if (numericRegExp.test(dataType)) {
    return numericRegExp.exec(dataType)[0];
  }
  if (dateRegExp.test(dataType)) {
    return dateRegExp.exec(dataType)[0];
  }
  return false;
};
const TableSelect = {
  checkIfDataTypeNumericOrDate: checkIfDataTypeNumericOrDate
};
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('table/select.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglesearchformlink').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', '#tbl_search_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select.geom_func').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('change', 'select[name*="criteriaColumnOperators"]'); // Fix for bug #13778, changed 'click' to 'change'
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('table/select.js', function () {
  /**
   * Prepare a div containing a link, otherwise it's incorrectly displayed
   * after a couple of clicks
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id="togglesearchformdiv"><a id="togglesearchformlink"></a></div>').insertAfter('#tbl_search_form')
  // don't show it until we have results on-screen
  .hide();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglesearchformlink').html(window.Messages.strShowSearchCriteria).on('click', function () {
    var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tbl_search_form').slideToggle();
    if ($link.text() === window.Messages.strHideSearchCriteria) {
      $link.text(window.Messages.strShowSearchCriteria);
    } else {
      $link.text(window.Messages.strHideSearchCriteria);
    }
    // avoid default click action
    return false;
  });
  var tableRows = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldset_table_qbe select.column-operator');
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(tableRows, function (index, item) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(item).on('change', function () {
      window.changeValueFieldType(this, index);
      window.verifyAfterSearchFieldChange(index, '#tbl_search_form');
    });
  });
  /**
   * Ajax event handler for Table search
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '#tbl_search_form.ajax', function (event) {
    var unaryFunctions = ['IS NULL', 'IS NOT NULL', '= \'\'', '!= \'\''];
    var geomUnaryFunctions = ['IsEmpty', 'IsSimple', 'IsRing', 'IsClosed'];
    // jQuery object to reuse
    var $searchForm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    event.preventDefault();
    // empty previous search results while we are waiting for new results
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter').empty();
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strSearching, false);
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)($searchForm);
    var values = {};
    $searchForm.find(':input').each(function () {
      var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      if ($input.attr('type') === 'checkbox' || $input.attr('type') === 'radio') {
        if ($input.is(':checked')) {
          values[this.name] = $input.val();
        }
      } else {
        values[this.name] = $input.val();
      }
    });
    var columnCount = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="columnsToDisplay[]"] option').length;
    // Submit values only for the columns that have unary column operator or a search criteria
    for (var a = 0; a < columnCount; a++) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(values['criteriaColumnOperators[' + a + ']'], unaryFunctions) >= 0) {
        continue;
      }
      if (values['geom_func[' + a + ']'] && jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(values['geom_func[' + a + ']'], geomUnaryFunctions) >= 0) {
        continue;
      }
      if (values['criteriaValues[' + a + ']'] === '' || values['criteriaValues[' + a + ']'] === null) {
        delete values['criteriaValues[' + a + ']'];
        delete values['criteriaColumnOperators[' + a + ']'];
        delete values['criteriaColumnNames[' + a + ']'];
        delete values['criteriaColumnTypes[' + a + ']'];
        delete values['criteriaColumnCollations[' + a + ']'];
      }
    }
    // If all columns are selected, use a single parameter to indicate that
    if (values['columnsToDisplay[]'] !== null) {
      if (values['columnsToDisplay[]'].length === columnCount) {
        delete values['columnsToDisplay[]'];
        values.displayAllColumns = true;
      }
    } else {
      values.displayAllColumns = true;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($searchForm.attr('action'), values, function (data) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxRemoveMessage)($msgbox);
      if (typeof data !== 'undefined' && data.success === true) {
        if (typeof data.sql_query !== 'undefined') {
          // zero rows
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter').html(data.sql_query);
        } else {
          // results found
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter').html(data.message);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sqlqueryresults').trigger('makeGrid');
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tbl_search_form')
        // workaround for bug #3168569 - Issue on toggling the "Hide search criteria" in chrome.
        .slideToggle().hide();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglesearchformlink')
        // always start with the Show message
        .text(window.Messages.strShowSearchCriteria);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#togglesearchformdiv')
        // now it's time to show the div containing the link
        .show();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
          scrollTop: 0
        }, 'fast');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter').html(data.error);
      }
      (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_4__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlqueryresultsouter'));
    }); // end $.post()
  });
  // Following section is related to the 'function based search' for geometry data types.
  // Initially hide all the open_search_gis_editor spans
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.open_search_gis_editor').hide();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select.geom_func').on('change', function () {
    var $geomFuncSelector = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var binaryFunctions = ['Contains', 'Crosses', 'Disjoint', 'Equals', 'Intersects', 'Overlaps', 'Touches', 'Within', 'MBRContains', 'MBRDisjoint', 'MBREquals', 'MBRIntersects', 'MBROverlaps', 'MBRTouches', 'MBRWithin', 'ST_Contains', 'ST_Crosses', 'ST_Disjoint', 'ST_Equals', 'ST_Intersects', 'ST_Overlaps', 'ST_Touches', 'ST_Within'];
    var tempArray = ['Envelope', 'EndPoint', 'StartPoint', 'ExteriorRing', 'Centroid', 'PointOnSurface'];
    var outputGeomFunctions = binaryFunctions.concat(tempArray);
    // If the chosen function takes two geometry objects as parameters
    var $operator = $geomFuncSelector.parents('tr').find('td').eq(4).find('select');
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray($geomFuncSelector.val(), binaryFunctions) >= 0) {
      $operator.prop('readonly', true);
    } else {
      $operator.prop('readonly', false);
    }
    // if the chosen function's output is a geometry, enable GIS editor
    var $editorSpan = $geomFuncSelector.parents('tr').find('.open_search_gis_editor');
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray($geomFuncSelector.val(), outputGeomFunctions) >= 0) {
      $editorSpan.show();
    } else {
      $editorSpan.hide();
    }
  });
  const gisEditorModal = document.getElementById('gisEditorModal');
  gisEditorModal === null || gisEditorModal === void 0 || gisEditorModal.addEventListener('show.bs.modal', event => {
    // @ts-ignore
    const button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.relatedTarget);
    // Current value
    let value = button.parent('td').children('input[type=\'text\']').val();
    // Field name
    const field = 'Parameter';
    // Column type
    const geomFunc = button.parents('tr').find('.geom_func').val();
    const type = 'GEOMETRY';
    if (!value) {
      if (geomFunc === 'Envelope') {
        value = 'POLYGON()';
      } else if (geomFunc === 'ExteriorRing') {
        value = 'LINESTRING()';
      } else {
        value = 'POINT()';
      }
    }
    // Names of input field and null checkbox
    const inputName = button.parent('td').children('input[type=\'text\']').attr('name');
    window.openGISEditor(value, field, type, inputName);
  });
  /**
   * Ajax event handler for Range-Search.
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('change', 'select[name*="criteriaColumnOperators"]', function () {
    var $sourceSelect = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    // Get the column name.
    var columnName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr').find('th').first().text();
    // Get the data-type of column excluding size.
    var dataType = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr').find('td[data-type]').attr('data-type');
    dataType = TableSelect.checkIfDataTypeNumericOrDate(dataType);
    // Get the operator.
    var operator = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    if ((operator === 'BETWEEN' || operator === 'NOT BETWEEN') && dataType) {
      var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        url: 'index.php?route=/table/search',
        type: 'POST',
        data: {
          'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
          'ajax_request': 1,
          'db': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="db"]').val(),
          'table': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table"]').val(),
          'column': columnName,
          'range_search': 1
        },
        success: function (response) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxRemoveMessage)($msgbox);
          if (response.success) {
            // Get the column min value.
            var min = response.column_data.min ? '(' + window.Messages.strColumnMin + ' ' + response.column_data.min + ')' : '';
            // Get the column max value.
            var max = response.column_data.max ? '(' + window.Messages.strColumnMax + ' ' + response.column_data.max + ')' : '';
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rangeSearchModal').modal('show');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rangeSearchLegend').first().html(operator);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rangeSearchMin').first().text(min);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rangeSearchMax').first().text(max);
            // Reset input values on reuse
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#min_value').first().val('');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#max_value').first().val('');
            // Add datepicker wherever required.
            (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.addDatepicker)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#min_value'), dataType);
            (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.addDatepicker)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#max_value'), dataType);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rangeSearchModalGo').on('click', function () {
              var minValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#min_value').val();
              var maxValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#max_value').val();
              var finalValue = '';
              if (minValue.length && maxValue.length) {
                finalValue = minValue + ', ' + maxValue;
              }
              var $targetField = $sourceSelect.closest('tr').find('[name*="criteriaValues"]');
              // If target field is a select list.
              if ($targetField.is('select')) {
                $targetField.val(finalValue);
                var $options = $targetField.find('option');
                var $closestMin = null;
                var $closestMax = null;
                // Find closest min and max value.
                $options.each(function () {
                  if ($closestMin === null || Math.abs(Number(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) - Number(minValue)) < Math.abs(Number($closestMin.val()) - Number(minValue))) {
                    $closestMin = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
                  }
                  if ($closestMax === null || Math.abs(Number(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) - Number(maxValue)) < Math.abs(Number($closestMax.val()) - Number(maxValue))) {
                    $closestMax = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
                  }
                });
                $closestMin.attr('selected', 'selected');
                $closestMax.attr('selected', 'selected');
              } else {
                $targetField.val(finalValue);
              }
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rangeSearchModal').modal('hide');
            });
          } else {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(response.error);
          }
        },
        error: function () {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strErrorProcessingRequest);
        }
      });
    }
  });
  var windowWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.jsresponsive').css('max-width', windowWidth - 69 + 'px');
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(88); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=select.js.map