"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["database/query_generator"],{

/***/ "./resources/js/database/query_generator.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/functions/escape.ts");


/**
 * @fileoverview    function used in QBE for DB
 * @name            Database Operations
 *
 * @requires    jQueryUI
 */
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '.criteria_op', function () {
  const op = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
  const criteria = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.table').find('.rhs_text_val');
  isOpWithoutArg(op) ? criteria.hide().val('') : criteria.show();
});
function getFormatsText() {
  return {
    '=': ' = \'%s\'',
    '>': ' > \'%s\'',
    '>=': ' >= \'%s\'',
    '<': ' < \'%s\'',
    '<=': ' <= \'%s\'',
    '!=': ' != \'%s\'',
    'LIKE': ' LIKE \'%s\'',
    'LIKE %...%': ' LIKE \'%%%s%%\'',
    'NOT LIKE': ' NOT LIKE \'%s\'',
    'NOT LIKE %...%': ' NOT LIKE \'%%%s%%\'',
    'IN (...)': ' IN (%s)',
    'NOT IN (...)': ' NOT IN (%s)',
    'BETWEEN': ' BETWEEN \'%s\' AND \'%s\'',
    'NOT BETWEEN': ' NOT BETWEEN \'%s\' AND \'%s\'',
    'REGEXP': ' REGEXP \'%s\'',
    'REGEXP ^...$': ' REGEXP \'^%s$\'',
    'NOT REGEXP': ' NOT REGEXP \'%s\''
  };
}
function opsWithoutArg() {
  return ['IS NULL', 'IS NOT NULL'];
}
function opsWithMultipleArgs() {
  return ['IN (...)', 'NOT IN (...)'];
}
function opsWithTwoArgs() {
  return ['BETWEEN', 'NOT BETWEEN'];
}
function isOpWithoutArg(op) {
  return opsWithoutArg().includes(op);
}
function acceptsMultipleValues(op) {
  return opsWithMultipleArgs().includes(op);
}
function acceptsTwoValues(op) {
  return opsWithTwoArgs().includes(op);
}
function joinWrappingElementsWith(array, char) {
  let separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  let string = '';
  array.forEach(function (option, index) {
    string += "".concat(char).concat(option).concat(char);
    if (index !== array.length - 1) {
      string += separator;
    }
  });
  return string;
}
function generateCondition(criteriaDiv, table) {
  const tableName = table.val();
  const tableAlias = table.siblings('.table_alias').val();
  const criteriaOp = criteriaDiv.find('.criteria_op').first().val();
  let criteriaText = criteriaDiv.find('.rhs_text_val').first().val();
  let query = '`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(tableAlias === '' ? tableName : tableAlias) + '`.';
  query += '`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(table.parent().find('.opColumn').first().val()) + '`';
  if (criteriaDiv.find('.criteria_rhs').first().val() === 'text') {
    if (isOpWithoutArg(criteriaOp)) {
      query += ' ' + criteriaOp;
    } else if (acceptsMultipleValues(criteriaOp)) {
      const formatsText = getFormatsText();
      const valuesInputs = criteriaDiv.find('input.val');
      let critertiaTextArray = [];
      valuesInputs.each(function () {
        let value = (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeSingleQuote)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
        if (!critertiaTextArray.includes(value)) {
          critertiaTextArray.push(value);
        }
      });
      criteriaText = joinWrappingElementsWith(critertiaTextArray, '\'');
      query += window.sprintf(formatsText[criteriaOp], criteriaText);
    } else if (acceptsTwoValues(criteriaOp)) {
      const formatsText = getFormatsText();
      const valuesInputs = criteriaDiv.find('input.val');
      query += window.sprintf(formatsText[criteriaOp], valuesInputs[0].value, valuesInputs[1].value);
    } else {
      const formatsText = getFormatsText();
      query += window.sprintf(formatsText[criteriaOp], criteriaText);
    }
  } else {
    query += ' ' + criteriaOp;
    query += ' `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(criteriaDiv.find('.tableNameSelect').first().val()) + '`.';
    query += '`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(criteriaDiv.find('.opColumn').first().val()) + '`';
  }
  return query;
}
function generateWhereBlock() {
  var count = 0;
  var query = '';
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tableNameSelect').each(function () {
    var criteriaDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.jsCriteriaOptions').first();
    var useCriteria = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('.criteria_col').first();
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() !== '' && useCriteria.prop('checked')) {
      if (count > 0) {
        criteriaDiv.find('input.logical_op').each(function () {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop('checked')) {
            query += ' ' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() + ' ';
          }
        });
      }
      query += generateCondition(criteriaDiv, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
      count++;
    }
  });
  return query;
}
function generateJoin(newTable, tableAliases, fk) {
  var query = '';
  query += ' \n\tLEFT JOIN ' + '`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(newTable) + '`';
  if (tableAliases[fk.TABLE_NAME][0] !== '') {
    query += ' AS `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(tableAliases[newTable][0]) + '`';
    query += ' ON `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(tableAliases[fk.TABLE_NAME][0]) + '`';
  } else {
    query += ' ON `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(fk.TABLE_NAME) + '`';
  }
  query += '.`' + fk.COLUMN_NAME + '`';
  if (tableAliases[fk.REFERENCED_TABLE_NAME][0] !== '') {
    query += ' = `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(tableAliases[fk.REFERENCED_TABLE_NAME][0]) + '`';
  } else {
    query += ' = `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(fk.REFERENCED_TABLE_NAME) + '`';
  }
  query += '.`' + fk.REFERENCED_COLUMN_NAME + '`';
  return query;
}
function existReference(table, fk, usedTables) {
  var isReferredBy = fk.TABLE_NAME === table && usedTables.includes(fk.REFERENCED_TABLE_NAME);
  var isReferencedBy = fk.REFERENCED_TABLE_NAME === table && usedTables.includes(fk.TABLE_NAME);
  return isReferredBy || isReferencedBy;
}
function tryJoinTable(table, tableAliases, usedTables, foreignKeys) {
  for (var i = 0; i < foreignKeys.length; i++) {
    var fk = foreignKeys[i];
    if (existReference(table, fk, usedTables)) {
      return generateJoin(table, tableAliases, fk);
    }
  }
  return '';
}
function appendTable(table, tableAliases, usedTables, foreignKeys) {
  var query = tryJoinTable(table, tableAliases, usedTables, foreignKeys);
  if (query === '') {
    if (usedTables.length > 0) {
      query += '\n\t, ';
    }
    query += '`' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(table) + '`';
    if (tableAliases[table][0] !== '') {
      query += ' AS `' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_1__.escapeBacktick)(tableAliases[table][0]) + '`';
    }
  }
  usedTables.push(table);
  return query;
}
function generateFromBlock(tableAliases, foreignKeys) {
  var usedTables = [];
  var query = '';
  for (var table in tableAliases) {
    if (tableAliases.hasOwnProperty(table)) {
      query += appendTable(table, tableAliases, usedTables, foreignKeys);
    }
  }
  return query;
}
window.generateWhereBlock = generateWhereBlock;
window.generateFromBlock = generateFromBlock;

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["shared"], function() { return __webpack_exec__("./resources/js/database/query_generator.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=query_generator.js.map