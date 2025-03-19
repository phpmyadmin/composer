"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[25],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 65:
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
 * @fileoverview   events handling from normalization page
 * @name            normalization
 *
 * @requires    jQuery
 */
/**
 * AJAX scripts for normalization
 *
 */
var normalizeto = '1nf';
var primaryKey;
var dataParsed = null;
function appendHtmlColumnsList() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/get-columns', {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
  }, function (data) {
    if (data.success === true) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=makeAtomic]').html(data.message);
    }
  });
}
function goTo3NFStep1(newTables) {
  var tables = newTables;
  if (Object.keys(tables).length === 1) {
    tables = [_modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table')];
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/3nf/step1', {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
    'tables': tables
  }, function (data) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').find('h3').html(window.Messages.str3NFNormalization);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').find('.card-header').html(data.legendText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').find('h4').html(data.headText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').find('p').html(data.subText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').find('#extra').html(data.extra);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').find('form').each(function () {
      var formId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id');
      var colName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('colname');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + formId + ' input[value=\'' + colName + '\']').next().remove();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + formId + ' input[value=\'' + colName + '\']').remove();
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').find('#newCols').html('');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
    if (data.subText !== '') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
        type: 'button',
        value: window.Messages.strDone,
        class: 'btn btn-primary'
      }).on('click', function () {
        processDependencies('', true);
      }).appendTo('#mainContent .card-footer');
    }
  });
}
function goTo2NFStep1() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/2nf/step1', {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
  }, function (data) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content h3').html(window.Messages.str2NFNormalization);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(data.legendText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(data.headText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html(data.subText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html(data.extra);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #newCols').html('');
    if (data.subText !== '') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
        type: 'submit',
        value: window.Messages.strDone,
        class: 'btn btn-primary'
      }).on('click', function () {
        processDependencies(data.primary_key);
      }).appendTo('#mainContent .card-footer');
    } else {
      if (normalizeto === '3nf') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #newCols').html(window.Messages.strToNextStep);
        setTimeout(function () {
          goTo3NFStep1([_modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table')]);
        }, 3000);
      }
    }
  });
}
function goToFinish1NF() {
  if (normalizeto !== '1nf') {
    goTo2NFStep1();
    return true;
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(window.Messages.strEndStep);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html('<h3>' + window.sprintf(window.Messages.strFinishMsg, (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(_modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'))) + '</h3>');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html('');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html('');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #newCols').html('');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
}
function goToStep4() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/1nf/step4', {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
  }, function (data) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(data.legendText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(data.headText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html(data.subText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html(data.extra);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #newCols').html('');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
    for (var pk in primaryKey) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra input[value=\'' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeJsString)(primaryKey[pk]) + '\']').attr('disabled', 'disabled');
    }
  });
}
window.goToFinish1NF = goToFinish1NF;
window.goToStep4 = goToStep4;
function goToStep3() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/1nf/step3', {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
  }, function (data) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(data.legendText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(data.headText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html(data.subText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html(data.extra);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #newCols').html('');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
    primaryKey = JSON.parse(data.primary_key);
    for (var pk in primaryKey) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra input[value=\'' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeJsString)(primaryKey[pk]) + '\']').attr('disabled', 'disabled');
    }
  });
}
function goToStep2() {
  let extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/1nf/step2', {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
  }, function (data) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(data.legendText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(data.headText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html(data.subText);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra,#mainContent #newCols').html('');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
    if (data.hasPrimaryKey === '1') {
      if (extra === 'goToStep3') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(window.Messages.strPrimaryKeyAdded);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html(window.Messages.strToNextStep);
      }
      if (extra === 'goToFinish1NF') {
        goToFinish1NF();
      } else {
        setTimeout(function () {
          goToStep3();
        }, 3000);
      }
    } else {
      // form to select columns to make primary
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html(data.extra);
    }
  });
}
function goTo2NFFinish(pd) {
  var tables = {};
  for (var dependson in pd) {
    tables[dependson] = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra input[name="' + dependson + '"]').val();
  }
  var datastring = {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
    'pd': JSON.stringify(pd),
    'newTablesName': JSON.stringify(tables)
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    type: 'POST',
    url: 'index.php?route=/normalization/2nf/create-new-tables',
    data: datastring,
    async: false,
    success: function (data) {
      if (data.success === true) {
        if (data.queryError === false) {
          if (normalizeto === '3nf') {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_reload').trigger('click');
            goTo3NFStep1(tables);
            return true;
          }
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(data.legendText);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(data.headText);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html('');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html('');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.extra, false);
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_reload').trigger('click');
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      }
    }
  });
}
function goTo3NFFinish(newTables) {
  for (var table in newTables) {
    for (var newtbl in newTables[table]) {
      var updatedname = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra input[name="' + newtbl + '"]').val();
      newTables[table][updatedname] = newTables[table][newtbl];
      if (updatedname !== newtbl) {
        delete newTables[table][newtbl];
      }
    }
  }
  var datastring = {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
    'newTables': JSON.stringify(newTables)
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    type: 'POST',
    url: 'index.php?route=/normalization/3nf/create-new-tables',
    data: datastring,
    async: false,
    success: function (data) {
      if (data.success === true) {
        if (data.queryError === false) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(data.legendText);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(data.headText);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html('');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html('');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.extra, false);
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_reload').trigger('click');
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      }
    }
  });
}
var backup = '';
function goTo2NFStep2(pd, primaryKey) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html('');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(window.Messages.strStep + ' 2.2 ' + window.Messages.strConfirmPd);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(window.Messages.strSelectedPd);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html(window.Messages.strPdHintNote);
  var extra = '<div class="dependencies_box">';
  var pdFound = false;
  for (var dependson in pd) {
    if (dependson !== primaryKey) {
      pdFound = true;
      extra += '<p class="d-block m-1">' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(dependson) + ' -> ' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(pd[dependson].toString()) + '</p>';
    }
  }
  if (!pdFound) {
    extra += '<p class="d-block m-1">' + window.Messages.strNoPdSelected + '</p>';
    extra += '</div>';
  } else {
    extra += '</div>';
    var datastring = {
      'ajax_request': true,
      'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
      'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
      'pd': JSON.stringify(pd)
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'POST',
      url: 'index.php?route=/normalization/2nf/new-tables',
      data: datastring,
      async: false,
      success: function (data) {
        if (data.success === true) {
          extra += data.message;
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
        }
      }
    });
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html(extra);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('<input type="button" class="btn btn-primary" value="' + window.Messages.strBack + '" id="backEditPd"><input type="button" class="btn btn-primary" id="goTo2NFFinish" value="' + window.Messages.strGo + '">');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#goTo2NFFinish').on('click', function () {
    goTo2NFFinish(pd);
  });
}
function goTo3NFStep2(pd, tablesTds) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html('');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-header').html(window.Messages.strStep + ' 3.2 ' + window.Messages.strConfirmTd);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(window.Messages.strSelectedTd);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html(window.Messages.strPdHintNote);
  var extra = '<div class="dependencies_box">';
  var pdFound = false;
  for (var table in tablesTds) {
    for (var i in tablesTds[table]) {
      var dependson = tablesTds[table][i];
      if (dependson !== '' && dependson !== table) {
        pdFound = true;
        extra += '<p class="d-block m-1">' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(dependson) + ' -> ' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(pd[dependson].toString()) + '</p>';
      }
    }
  }
  if (!pdFound) {
    extra += '<p class="d-block m-1">' + window.Messages.strNoTdSelected + '</p>';
    extra += '</div>';
  } else {
    extra += '</div>';
    var datastring = {
      'ajax_request': true,
      'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
      'tables': JSON.stringify(tablesTds),
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
      'pd': JSON.stringify(pd)
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'POST',
      url: 'index.php?route=/normalization/3nf/new-tables',
      data: datastring,
      async: false,
      success: function (data) {
        dataParsed = data;
        if (data.success === true) {
          extra += dataParsed.html;
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
        }
      }
    });
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html(extra);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('<input type="button" class="btn btn-primary" value="' + window.Messages.strBack + '" id="backEditPd"><input type="button" class="btn btn-primary" id="goTo3NFFinish" value="' + window.Messages.strGo + '">');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#goTo3NFFinish').on('click', function () {
    if (!pdFound) {
      goTo3NFFinish([]);
    } else {
      goTo3NFFinish(dataParsed.newTables);
    }
  });
}
function processDependencies(primaryKey) {
  let isTransitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var pk = primaryKey;
  var pd = {};
  var tablesTds = {};
  var dependsOn;
  pd[pk] = [];
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra form').each(function () {
    var tblname;
    if (isTransitive === true) {
      tblname = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('tablename');
      pk = tblname;
      if (!(tblname in tablesTds)) {
        tablesTds[tblname] = [];
      }
      tablesTds[tblname].push(pk);
    }
    var formId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + formId + ' input[type=checkbox]:not(:checked)').prop('checked', false);
    dependsOn = '';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + formId + ' input[type=checkbox]:checked').each(function () {
      dependsOn += jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() + ', ';
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('checked', 'checked');
    });
    if (dependsOn === '') {
      dependsOn = pk;
    } else {
      dependsOn = dependsOn.slice(0, -2);
    }
    if (!(dependsOn in pd)) {
      pd[dependsOn] = [];
    }
    pd[dependsOn].push(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('colname'));
    if (isTransitive === true) {
      if (!(tblname in tablesTds)) {
        tablesTds[tblname] = [];
      }
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(dependsOn, tablesTds[tblname]) === -1) {
        tablesTds[tblname].push(dependsOn);
      }
    }
  });
  backup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').html();
  if (isTransitive === true) {
    goTo3NFStep2(pd, tablesTds);
  } else {
    goTo2NFStep2(pd, pk);
  }
  return false;
}
function moveRepeatingGroup(repeatingCols) {
  var newTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=repeatGroupTable]').val();
  var newColumn = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=repeatGroupColumn]').val();
  if (!newTable) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=repeatGroupTable]').trigger('focus');
    return false;
  }
  if (!newColumn) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=repeatGroupColumn]').trigger('focus');
    return false;
  }
  var datastring = {
    'ajax_request': true,
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
    'repeatingColumns': repeatingCols,
    'newTable': newTable,
    'newColumn': newColumn,
    'primary_columns': primaryKey.toString()
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    type: 'POST',
    url: 'index.php?route=/normalization/move-repeating-group',
    data: datastring,
    async: false,
    success: function (data) {
      if (data.success === true) {
        if (data.queryError === false) {
          goToStep3();
        }
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.message, false);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_reload').trigger('click');
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      }
    }
  });
}
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('normalization.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').off('click', '#selectNonAtomicCol');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#splitGo').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').off('click', '#saveSplit');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').off('click', '#addNewPrimary');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').off('click', '#saveNewPrimary');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').off('click', '#removeRedundant');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').off('click', '#createPrimaryKey');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').off('click', '#backEditPd');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').off('click', '#showPossiblePd');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').off('click', '.pickPd');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').off('click', '#noRepeatingGroup');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').off('click', '#noRedundantColumn');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('normalization.js', function () {
  var selectedCol;
  normalizeto = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').data('normalizeto');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').on('click', '#selectNonAtomicCol', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === 'no_such_col') {
      goToStep2();
    } else {
      selectedCol = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#splitGo').on('click', function () {
    if (!selectedCol || selectedCol === '') {
      return false;
    }
    var numField = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#numField').val();
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/create-new-column', {
      'ajax_request': true,
      'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
      'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
      'numFields': numField
    }, function (data) {
      if (data.success === true) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html(data.message);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.default_value').hide();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.enum_notice').hide();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
          type: 'submit',
          id: 'saveSplit',
          value: window.Messages.strSave,
          class: 'btn btn-primary'
        }).appendTo('#mainContent .card-footer');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
          type: 'submit',
          id: 'cancelSplit',
          value: window.Messages.strCancel,
          class: 'btn btn-secondary'
        }).on('click', function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html('');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().html('');
        }).appendTo('#mainContent .card-footer');
      }
    });
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').on('click', '#saveSplit', function () {
    window.centralColumnList = [];
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols #field_0_1').val() === '') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols #field_0_1').trigger('focus');
      return false;
    }
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('arg_separator');
    var datastring = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols :input').serialize();
    datastring += argsep + 'ajax_request=1' + argsep + 'do_save_data=1' + argsep + 'field_where=last';
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/table/add-field', datastring, function (data) {
      if (data.success) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/sql', {
          'ajax_request': true,
          'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
          'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
          'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
          'dropped_column': selectedCol,
          'purge': 1,
          'sql_query': 'ALTER TABLE `' + _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table') + '` DROP `' + selectedCol + '`;',
          'is_js_confirmed': 1
        }, function (data) {
          if (data.success === true) {
            appendHtmlColumnsList();
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html('');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
          } else {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
          }
          selectedCol = '';
        });
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      }
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').on('click', '#addNewPrimary', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/add-new-primary', {
      'ajax_request': true,
      'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
      'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
    }, function (data) {
      if (data.success === true) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html(data.message);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.default_value').hide();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.enum_notice').hide();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
          type: 'submit',
          id: 'saveNewPrimary',
          value: window.Messages.strSave,
          class: 'btn btn-primary'
        }).appendTo('#mainContent .card-footer');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
          type: 'submit',
          id: 'cancelSplit',
          value: window.Messages.strCancel,
          class: 'btn btn-secondary'
        }).on('click', function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html('');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().html('');
        }).appendTo('#mainContent .card-footer');
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      }
    });
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').on('click', '#saveNewPrimary', function () {
    var datastring = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols :input').serialize();
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('arg_separator');
    datastring += argsep + 'field_key[0]=primary_0' + argsep + 'ajax_request=1' + argsep + 'do_save_data=1' + argsep + 'field_where=last';
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/table/add-field', datastring, function (data) {
      if (data.success === true) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent h4').html(window.Messages.strPrimaryKeyAdded);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').html(window.Messages.strToNextStep);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #extra').html('');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent #newCols').html('');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
        setTimeout(function () {
          goToStep3();
        }, 2000);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      }
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').on('click', '#removeRedundant', function () {
    var dropQuery = 'ALTER TABLE `' + _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table') + '` ';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra input[type=checkbox]:checked').each(function () {
      dropQuery += 'DROP `' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() + '`, ';
    });
    dropQuery = dropQuery.slice(0, -2);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/sql', {
      'ajax_request': true,
      'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
      'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
      'sql_query': dropQuery,
      'is_js_confirmed': 1
    }, function (data) {
      if (data.success === true) {
        goToStep2('goToFinish1NF');
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      }
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').on('click', '#moveRepeatingGroup', function () {
    var repeatingCols = '';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra input[type=checkbox]:checked').each(function () {
      repeatingCols += jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() + ', ';
    });
    if (repeatingCols !== '') {
      var newColName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra input[type=checkbox]:checked').first().val();
      repeatingCols = repeatingCols.slice(0, -2);
      var confirmStr = window.sprintf(window.Messages.strMoveRepeatingGroup, (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(repeatingCols), (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(_modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table')));
      confirmStr += '<input type="text" name="repeatGroupTable" placeholder="' + window.Messages.strNewTablePlaceholder + '">' + '( ' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(primaryKey.toString()) + ', <input type="text" name="repeatGroupColumn" placeholder="' + window.Messages.strNewColumnPlaceholder + '" value="' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(newColName) + '">)' + '</ol>';
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html(confirmStr);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
        type: 'submit',
        value: window.Messages.strCancel,
        class: 'btn btn-secondary'
      }).on('click', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html('');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra input[type=checkbox]').prop('checked', false);
      }).appendTo('#mainContent .card-footer');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
        type: 'submit',
        value: window.Messages.strGo,
        class: 'btn btn-primary'
      }).on('click', function () {
        moveRepeatingGroup(repeatingCols);
      }).appendTo('#mainContent .card-footer');
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent p').on('click', '#createPrimaryKey', function (event) {
    event.preventDefault();
    var url = {
      'create_index': 1,
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
      'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
      'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
      'added_fields': 1,
      'add_fields': 1,
      'index': {
        'Key_name': 'PRIMARY'
      },
      'ajax_request': true
    };
    var title = window.Messages.strAddPrimaryKey;
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.indexEditorDialog)(url, title, function () {
      // on success
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sqlqueryresults').remove();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query').remove();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent .card-footer').html('');
      goToStep2('goToStep3');
    });
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').on('click', '#backEditPd', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').html(backup);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').on('click', '#showPossiblePd', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('hideList')) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).html('+ ' + window.Messages.strShowPossiblePd);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('hideList');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').slideToggle('slow');
      return false;
    }
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html() !== '') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showPossiblePd').html('- ' + window.Messages.strHidePd);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showPossiblePd').addClass('hideList');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').slideToggle('slow');
      return false;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').insertAfter('#mainContent h4');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html('<div class="text-center">' + window.Messages.strLoading + '<br>' + window.Messages.strWaitForPd + '</div>');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/normalization/partial-dependencies', {
      'ajax_request': true,
      'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
      'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
    }, function (data) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showPossiblePd').html('- ' + window.Messages.strHidePd);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showPossiblePd').addClass('hideList');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newCols').html(data.message);
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#mainContent').on('click', '.pickPd', function () {
    var strColsLeft = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).next('.determinants').html();
    var colsLeft = strColsLeft.split(',');
    var strColsRight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).next().next().html();
    var colsRight = strColsRight.split(',');
    for (var i in colsRight) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('form[data-colname="' + colsRight[i].trim() + '"] input[type="checkbox"]').prop('checked', false);
      for (var j in colsLeft) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('form[data-colname="' + colsRight[i].trim() + '"] input[value="' + colsLeft[j].trim() + '"]').prop('checked', true);
      }
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').on('click', '#noRepeatingGroup', function (evt) {
    evt.preventDefault();
    goToStep4();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#extra').on('click', '#noRedundantColumn', function (evt) {
    evt.preventDefault();
    goToFinish1NF();
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(65); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=normalization.js.map