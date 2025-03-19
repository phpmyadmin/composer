"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[12],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 37:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _database_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
/* harmony import */ var _history_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);
/* harmony import */ var _move_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41);
/* harmony import */ var _page_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(43);
/* harmony import */ var _config_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40);







/**
 * Initializes the data required to run Designer, then fires it up.
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('designer/init.js', function () {
  _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.vqbEditor = null;
  _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.historyArray = [];
  _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.selectField = [];
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_edit_rename').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_edit_having').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_edit_Aggr').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_edit_where').off('click');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('designer/init.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_edit_rename').on('click', function () {
    _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.edit('Rename');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_edit_having').on('click', function () {
    _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.edit('Having');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_edit_Aggr').on('click', function () {
    _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.edit('Aggregate');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_edit_where').on('click', function () {
    _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.edit('Where');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ab').accordion({
    collapsible: true,
    active: 'none'
  });
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('designer/init.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('fullscreenchange');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selflink').show();
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('designer/init.js', function () {
  var $content = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content');
  var $img = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#toggleFullscreen').find('img');
  var $span = $img.siblings('span');
  $content.css({
    'margin-left': '3px'
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      $content.removeClass('content_fullscreen').css({
        'width': 'auto',
        'height': 'auto'
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#osn_tab').css({
        'width': 'auto',
        'height': 'auto'
      });
      $img.attr('src', $img.data('enter')).attr('title', $span.data('enter'));
      $span.text($span.data('enter'));
      // Saving the fullscreen state in config when
      // designer exists fullscreen mode via ESC key
      var valueSent = 'off';
      _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.saveValueInConfig('full_screen', valueSent);
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selflink').hide();
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('designer/init.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#side_menu').off('mouseenter mouseleave');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_Show_left_menu').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#toggleFullscreen').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newPage').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#editPage').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#savePos').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#SaveAs').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#delPages').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#StartTableNew').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rel_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#StartTableNew').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#display_field_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#reloadPage').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#angular_direct_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#grid_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_SB_all').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#SmallTabInvert').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#relLineInvert').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#exportPages').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_builder').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_Left_Right').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pin_Text').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#canvas').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_HS_all').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_HS').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.scroll_tab_struct').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.scroll_tab_checkbox').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_scroll_tab').find('tr').off('click', '.designer_Tabs2,.designer_Tabs');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab').off('click', '.select_all_1');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab').off('click', '.small_tab,.small_tab2');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab').off('click', '.small_tab_pref_1');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab_zag_noquery').off('mouseover');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab_zag_noquery').off('mouseout');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab_zag_query').off('mouseover');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab_zag_query').off('mouseout');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab').off('click', '.tab_field_2,.tab_field_3,.tab_field');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab').off('click', '.select_all_store_col');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab').off('click', '.small_tab_pref_click_opt');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#del_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cancel_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_add_object').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cancel_close_option').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_new_rel_panel').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#cancel_new_rel_panel').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mouseup');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mousedown');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mousemove');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('designer/init.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_Show_left_menu').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.showLeftMenu(this);
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#toggleFullscreen').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.toggleFullscreen();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addOtherDbTables').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.addOtherDbTables();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newPage').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.new();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#editPage').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.editPages();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#savePos').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.save3();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#SaveAs').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.saveAs();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('ajaxStop', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selected_value').on('click', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#savePageNewRadio').prop('checked', true);
      });
    });
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#delPages').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.deletePages();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#StartTableNew').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.startTableNew();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rel_button').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.startRelation();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#display_field_button').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.startDisplayField();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#reloadPage').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.loadPage(_config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.selectedPage);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#angular_direct_button').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.angularDirect();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#grid_button').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.grid();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_SB_all').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.smallTabAll(this);
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#SmallTabInvert').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.smallTabInvert();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#relLineInvert').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.relationLinesInvert();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#exportPages').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.exportPages();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_builder').on('click', function () {
    _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.buildQuery();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_Left_Right').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.sideMenuRight(this);
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#side_menu').on('mouseenter', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.showText();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#side_menu').on('mouseleave', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.hideText();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pin_Text').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.pinText();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#canvas').on('click', function (event) {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.canvasClick(this, event);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_HS_all').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.hideTabAll(this);
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_HS').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.noHaveConstr(this);
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab').each(_move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.enableTableEvents);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab').each(_move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.addTableToTablesList);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#del_button').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.updRelation();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#cancel_button').on('click', function () {
    document.getElementById('layer_upd_relation').style.display = 'none';
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.reload();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#ok_add_object').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.addObject(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_add_object_db_name').val(), jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_add_object_table_name').val(), jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_add_object_col_name').val(), jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ok_add_object_db_and_table_name_url').val());
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#cancel_close_option').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.closeOption();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#ok_new_rel_panel').on('click', function () {
    _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.newRelation();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#cancel_new_rel_panel').on('click', function () {
    document.getElementById('layer_new_relation').style.display = 'none';
  });
  _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.enablePageContentEvents();
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('designer/init.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.trigger').off('click');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('designer/init.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.trigger').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.panel').toggle('fast');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).toggleClass('active');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ab').accordion('refresh');
    return false;
  });
  const configValues = window.designerConfig;
  _config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.jTabs = configValues.scriptTables.j_tabs;
  _config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.hTabs = configValues.scriptTables.h_tabs;
  _config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.contr = configValues.scriptContr;
  _config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.displayField = configValues.scriptDisplayField;
  _config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.server = configValues.server;
  _config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.selectedPage = configValues.displayPage;
  _config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.db = configValues.db;
  _config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.designerTablesEnabled = configValues.tablesEnabled;
  _move_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerMove.main();
  if (!_config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.designerTablesEnabled) {
    _database_ts__WEBPACK_IMPORTED_MODULE_2__.DesignerOfflineDB.open(function (success) {
      if (success) {
        _page_ts__WEBPACK_IMPORTED_MODULE_5__.DesignerPage.showTablesInLandingPage(_config_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerConfig.db);
      }
    });
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_Aggregate_Button').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_Aggregate').css('display', 'none');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_having_button').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_having').css('display', 'none');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_rename_to_button').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_rename_to').css('display', 'none');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#build_query_button').on('click', function () {
    _history_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerHistory.buildQuery();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_where_button').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#query_where').css('display', 'none');
  });
});

/***/ }),

/***/ 38:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignerOfflineDB: function() { return /* binding */ DesignerOfflineDB; }
/* harmony export */ });
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

var designerTables = [{
  name: 'pdf_pages',
  key: 'pgNr',
  autoIncrement: true
}, {
  name: 'table_coords',
  key: 'id',
  autoIncrement: true
}];
var DesignerOfflineDB = function () {
  /**
   * @type {IDBDatabase|null}
   */
  var datastore = null;
  /**
   * @param {string} table
   * @return {IDBTransaction}
   */
  const getTransaction = function (table) {
    return datastore.transaction([table], 'readwrite');
  };
  /**
   * @param {string} table
   * @return {IDBObjectStore}
   */
  const getObjectStore = function (table) {
    var transaction = designerDB.getTransaction(table);
    var objStore = transaction.objectStore(table);
    return objStore;
  };
  /**
   * @param {IDBTransaction} transaction
   * @param {string} table
   * @return {IDBObjectStore}
   */
  const getCursorRequest = function (transaction, table) {
    var objStore = transaction.objectStore(table);
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);
    return cursorRequest;
  };
  /**
   * @param {Function} callback
   */
  const open = function (callback) {
    var version = 1;
    var request = window.indexedDB.open('pma_designer', version);
    request.onupgradeneeded = function (e) {
      var db = e.target.result;
      e.target.transaction.onerror = designerDB.onerror;
      var t;
      for (t in designerTables) {
        if (db.objectStoreNames.contains(designerTables[t].name)) {
          db.deleteObjectStore(designerTables[t].name);
        }
      }
      for (t in designerTables) {
        db.createObjectStore(designerTables[t].name, {
          keyPath: designerTables[t].key,
          autoIncrement: designerTables[t].autoIncrement
        });
      }
    };
    request.onsuccess = function (e) {
      datastore = e.target.result;
      if (typeof callback === 'function') {
        callback(true);
      }
    };
    request.onerror = function () {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
    };
  };
  /**
   * @param {string} table
   * @param {string} id
   * @param {Function} callback
   */
  const loadObject = function (table, id, callback) {
    if (datastore === null) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
      return;
    }
    var objStore = designerDB.getObjectStore(table);
    var cursorRequest = objStore.get(parseInt(id));
    cursorRequest.onsuccess = function (e) {
      callback(e.target.result);
    };
    cursorRequest.onerror = designerDB.onerror;
  };
  /**
   * @param {string} table
   * @param {Function} callback
   */
  const loadAllObjects = function (table, callback) {
    if (datastore === null) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
      return;
    }
    var transaction = designerDB.getTransaction(table);
    var cursorRequest = designerDB.getCursorRequest(transaction, table);
    var results = [];
    transaction.oncomplete = function () {
      callback(results);
    };
    cursorRequest.onsuccess = function (e) {
      var result = e.target.result;
      if (Boolean(result) === false) {
        return;
      }
      results.push(result.value);
      result.continue();
    };
    cursorRequest.onerror = designerDB.onerror;
  };
  /**
   * @param {string} table
   * @param {Function} callback
   */
  const loadFirstObject = function (table, callback) {
    if (datastore === null) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
      return;
    }
    var transaction = designerDB.getTransaction(table);
    var cursorRequest = designerDB.getCursorRequest(transaction, table);
    var firstResult = null;
    transaction.oncomplete = function () {
      callback(firstResult);
    };
    cursorRequest.onsuccess = function (e) {
      var result = e.target.result;
      if (Boolean(result) === false) {
        return;
      }
      firstResult = result.value;
    };
    cursorRequest.onerror = designerDB.onerror;
  };
  /**
   * @param {string} table
   * @param {Object} obj
   * @param {Function} callback
   */
  const addObject = function (table, obj) {
    let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    if (datastore === null) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
      return;
    }
    var objStore = designerDB.getObjectStore(table);
    var request = objStore.put(obj);
    request.onsuccess = function (e) {
      if (typeof callback === 'function') {
        callback(e.currentTarget.result);
      }
    };
    request.onerror = designerDB.onerror;
  };
  /**
   * @param {string} table
   * @param {string} id
   * @param {Function} callback
   */
  const deleteObject = function (table, id) {
    let callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    if (datastore === null) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
      return;
    }
    var objStore = designerDB.getObjectStore(table);
    var request = objStore.delete(parseInt(id));
    request.onsuccess = function () {
      if (typeof callback === 'function') {
        callback(true);
      }
    };
    request.onerror = designerDB.onerror;
  };
  /**
   * @param {Error} e
   */
  const onerror = function (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  };
  var designerDB = {
    getTransaction: getTransaction,
    getObjectStore: getObjectStore,
    getCursorRequest: getCursorRequest,
    open: open,
    loadObject: loadObject,
    loadAllObjects: loadAllObjects,
    loadFirstObject: loadFirstObject,
    addObject: addObject,
    deleteObject: deleteObject,
    onerror: onerror
  };
  // Export the designerDB object.
  return designerDB;
}();


/***/ }),

/***/ 39:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignerHistory: function() { return /* binding */ DesignerHistory; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _config_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);




/**
 * @fileoverview    function used in this file builds history tab and generates query.
 *
 * @requires    jQuery
 * @requires    move.js
 */
var gIndex;
/**
 * To display details of objects(where,rename,Having,aggregate,groupby,orderby,having)
 *
 * @param {number} index index of DesignerHistory.historyArray where change is to be made
 * @return {string}
 */
const detail = function (index) {
  var type = DesignerHistory.historyArray[index].getType();
  var str;
  if (type === 'Where') {
    str = 'Where ' + DesignerHistory.historyArray[index].getColumnName() + DesignerHistory.historyArray[index].getObj().getRelationOperator() + DesignerHistory.historyArray[index].getObj().getQuery();
  } else if (type === 'Rename') {
    str = 'Rename ' + DesignerHistory.historyArray[index].getColumnName() + ' To ' + DesignerHistory.historyArray[index].getObj().getRenameTo();
  } else if (type === 'Aggregate') {
    str = 'Select ' + DesignerHistory.historyArray[index].getObj().getOperator() + '( ' + DesignerHistory.historyArray[index].getColumnName() + ' )';
  } else if (type === 'GroupBy') {
    str = 'GroupBy ' + DesignerHistory.historyArray[index].getColumnName();
  } else if (type === 'OrderBy') {
    str = 'OrderBy ' + DesignerHistory.historyArray[index].getColumnName() + ' ' + DesignerHistory.historyArray[index].getObj().getOrder();
  } else if (type === 'Having') {
    str = 'Having ';
    if (DesignerHistory.historyArray[index].getObj().getOperator() !== 'None') {
      str += DesignerHistory.historyArray[index].getObj().getOperator() + '( ' + DesignerHistory.historyArray[index].getColumnName() + ' )';
      str += DesignerHistory.historyArray[index].getObj().getRelationOperator() + DesignerHistory.historyArray[index].getObj().getQuery();
    } else {
      str = 'Having ' + DesignerHistory.historyArray[index].getColumnName() + DesignerHistory.historyArray[index].getObj().getRelationOperator() + DesignerHistory.historyArray[index].getObj().getQuery();
    }
  }
  return str;
};
/**
 * Sorts DesignerHistory.historyArray[] first,using table name as the key and then generates the HTML code for history tab,
 * clubbing all objects of same tables together
 * This function is called whenever changes are made in DesignerHistory.historyArray[]
 *
 *
 * @param {number} init starting index of unsorted array
 * @param {number} finit last index of unsorted array
 * @return {string}
 */
const display = function (init, finit) {
  var str;
  var i;
  var j;
  var k;
  var sto;
  var temp;
  // this part sorts the history array based on table name,this is needed for clubbing all object of same name together.
  for (i = init; i < finit; i++) {
    sto = DesignerHistory.historyArray[i];
    temp = DesignerHistory.historyArray[i].getTab(); // + '.' + DesignerHistory.historyArray[i].getObjNo(); for Self JOINS
    for (j = 0; j < i; j++) {
      if (temp > DesignerHistory.historyArray[j].getTab()) {
        // + '.' + DesignerHistory.historyArray[j].getObjNo())) { //for Self JOINS
        for (k = i; k > j; k--) {
          DesignerHistory.historyArray[k] = DesignerHistory.historyArray[k - 1];
        }
        DesignerHistory.historyArray[j] = sto;
        break;
      }
    }
  }
  // this part generates HTML code for history tab.adds delete,edit,and/or and detail features with objects.
  str = ''; // string to store Html code for history tab
  var historyArrayLength = DesignerHistory.historyArray.length;
  for (i = 0; i < historyArrayLength; i++) {
    temp = DesignerHistory.historyArray[i].getTab(); // + '.' + DesignerHistory.historyArray[i].getObjNo(); for Self JOIN
    str += '<h3 class="tiger"><a href="#">' + temp + '</a></h3>';
    str += '<div class="toggle_container">\n';
    while (DesignerHistory.historyArray[i].getTab() === temp) {
      // + '.' + DesignerHistory.historyArray[i].getObjNo()) === temp) {
      str += '<div class="block"> <table class="table table-sm w-auto mb-0">';
      str += '<thead><tr><td>';
      if (DesignerHistory.historyArray[i].getAndOr()) {
        str += '<img src="' + window.themeImagePath + 'designer/or_icon.png" onclick="DesignerHistory.andOr(' + i + ')" title="OR"></td>';
      } else {
        str += '<img src="' + window.themeImagePath + 'designer/and_icon.png" onclick="DesignerHistory.andOr(' + i + ')" title="AND"></td>';
      }
      str += '<td style="padding-left: 5px;" class="text-end">' + (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_2__["default"])('b_sbrowse', window.Messages.strColumnName) + '</td>' + '<td width="175" style="padding-left: 5px">' + jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').text(DesignerHistory.historyArray[i].getColumnName()).html() + '<td>';
      if (DesignerHistory.historyArray[i].getType() === 'GroupBy' || DesignerHistory.historyArray[i].getType() === 'OrderBy') {
        var detailDescGroupBy = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').text(DesignerHistory.detail(i)).html();
        str += '<td class="text-center">' + (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_2__["default"])('s_info', DesignerHistory.detail(i)) + '</td>' + '<td title="' + detailDescGroupBy + '">' + DesignerHistory.historyArray[i].getType() + '</td>' + '<td onclick=DesignerHistory.historyDelete(' + i + ')>' + (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_2__["default"])('b_drop', window.Messages.strDelete) + '</td>';
      } else {
        var detailDesc = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').text(DesignerHistory.detail(i)).html();
        str += '<td class="text-center">' + (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_2__["default"])('s_info', DesignerHistory.detail(i)) + '</td>' + '<td title="' + detailDesc + '">' + DesignerHistory.historyArray[i].getType() + '</td>' + '<td onclick=DesignerHistory.historyEdit(' + i + ')>' + (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_2__["default"])('b_edit', window.Messages.strEdit) + '</td>' + '<td onclick=DesignerHistory.historyDelete(' + i + ')>' + (0,_modules_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_2__["default"])('b_drop', window.Messages.strDelete) + '</td>';
      }
      str += '</tr></thead>';
      i++;
      if (i >= historyArrayLength) {
        break;
      }
      str += '</table></div>';
    }
    i--;
    str += '</div>';
  }
  return str;
};
/**
 * To change And/Or relation in history tab
 *
 *
 * @param {number} index index of DesignerHistory.historyArray where change is to be made
 */
const andOr = function (index) {
  if (DesignerHistory.historyArray[index].getAndOr()) {
    DesignerHistory.historyArray[index].setAndOr(0);
  } else {
    DesignerHistory.historyArray[index].setAndOr(1);
  }
  var existingDiv = document.getElementById('ab');
  existingDiv.innerHTML = DesignerHistory.display(0, 0);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ab').accordion('refresh');
};
/**
 * Deletes entry in DesignerHistory.historyArray
 *
 * @param {number} index of DesignerHistory.historyArray[] which is to be deleted
 */
const historyDelete = function (index) {
  var fromArrayLength = window.fromArray.length;
  for (var k = 0; k < fromArrayLength; k++) {
    if (window.fromArray[k] === DesignerHistory.historyArray[index].getTab()) {
      window.fromArray.splice(k, 1);
      break;
    }
  }
  DesignerHistory.historyArray.splice(index, 1);
  var existingDiv = document.getElementById('ab');
  existingDiv.innerHTML = DesignerHistory.display(0, 0);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ab').accordion('refresh');
};
/**
 * @param {string} elementId
 */
const changeStyle = function (elementId) {
  var element = document.getElementById(elementId);
  element.style.left = '530px';
  element.style.top = '130px';
  element.style.position = 'absolute';
  element.style.zIndex = '103';
  element.style.visibility = 'visible';
  element.style.display = 'block';
};
/**
 * To show where,rename,aggregate,having forms to edit a object
 *
 * @param {number} index index of DesignerHistory.historyArray where change is to be made
 */
const historyEdit = function (index) {
  gIndex = index;
  var type = DesignerHistory.historyArray[index].getType();
  if (type === 'Where') {
    document.getElementById('eQuery').value = DesignerHistory.historyArray[index].getObj().getQuery();
    document.getElementById('erel_opt').value = DesignerHistory.historyArray[index].getObj().getRelationOperator();
    DesignerHistory.changeStyle('query_where');
  } else if (type === 'Having') {
    document.getElementById('hQuery').value = DesignerHistory.historyArray[index].getObj().getQuery();
    document.getElementById('hrel_opt').value = DesignerHistory.historyArray[index].getObj().getRelationOperator();
    document.getElementById('hoperator').value = DesignerHistory.historyArray[index].getObj().getOperator();
    DesignerHistory.changeStyle('query_having');
  } else if (type === 'Rename') {
    document.getElementById('e_rename').value = DesignerHistory.historyArray[index].getObj().getRenameTo();
    DesignerHistory.changeStyle('query_rename_to');
  } else if (type === 'Aggregate') {
    document.getElementById('e_operator').value = DesignerHistory.historyArray[index].getObj().getOperator();
    DesignerHistory.changeStyle('query_Aggregate');
  }
};
/**
 * Make changes in DesignerHistory.historyArray when Edit button is clicked
 * checks for the type of object and then sets the new value
 *
 * @param {string} type of DesignerHistory.historyArray where change is to be made
 */
const edit = function (type) {
  if (type === 'Rename') {
    if (document.getElementById('e_rename').value !== '') {
      DesignerHistory.historyArray[gIndex].getObj().setRenameTo(document.getElementById('e_rename').value);
      document.getElementById('e_rename').value = '';
    }
    document.getElementById('query_rename_to').style.visibility = 'hidden';
  } else if (type === 'Aggregate') {
    if (document.getElementById('e_operator').value !== '---') {
      DesignerHistory.historyArray[gIndex].getObj().setOperator(document.getElementById('e_operator').value);
      document.getElementById('e_operator').value = '---';
    }
    document.getElementById('query_Aggregate').style.visibility = 'hidden';
  } else if (type === 'Where') {
    if (document.getElementById('erel_opt').value !== '--' && document.getElementById('eQuery').value !== '') {
      DesignerHistory.historyArray[gIndex].getObj().setQuery(document.getElementById('eQuery').value);
      DesignerHistory.historyArray[gIndex].getObj().setRelationOperator(document.getElementById('erel_opt').value);
    }
    document.getElementById('query_where').style.visibility = 'hidden';
  } else if (type === 'Having') {
    if (document.getElementById('hrel_opt').value !== '--' && document.getElementById('hQuery').value !== '') {
      DesignerHistory.historyArray[gIndex].getObj().setQuery(document.getElementById('hQuery').value);
      DesignerHistory.historyArray[gIndex].getObj().setRelationOperator(document.getElementById('hrel_opt').value);
      DesignerHistory.historyArray[gIndex].getObj().setOperator(document.getElementById('hoperator').value);
    }
    document.getElementById('query_having').style.visibility = 'hidden';
  }
  var existingDiv = document.getElementById('ab');
  existingDiv.innerHTML = DesignerHistory.display(0, 0);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ab').accordion('refresh');
};
/**
 * history object closure
 *
 * @param nColumnName  name of the column on which conditions are put
 * @param nObj          object details(where,rename,orderby,groupby,aggregate)
 * @param nTab          table name of the column on which conditions are applied
 * @param nObjNo       object no used for inner join
 * @param nType         type of object
 *
 */
const HistoryObj = function (nColumnName, nObj, nTab, nObjNo, nType) {
  var andOr;
  var obj;
  var tab;
  var columnName;
  var objNo;
  var type;
  this.setColumnName = function (nColumnName) {
    columnName = nColumnName;
  };
  this.getColumnName = function () {
    return columnName;
  };
  this.setAndOr = function (nAndOr) {
    andOr = nAndOr;
  };
  this.getAndOr = function () {
    return andOr;
  };
  this.getRelation = function () {
    return andOr;
  };
  this.setObj = function (nObj) {
    obj = nObj;
  };
  this.getObj = function () {
    return obj;
  };
  this.setTab = function (nTab) {
    tab = nTab;
  };
  this.getTab = function () {
    return tab;
  };
  this.setObjNo = function (nObjNo) {
    objNo = nObjNo;
  };
  this.getObjNo = function () {
    return objNo;
  };
  this.setType = function (nType) {
    type = nType;
  };
  this.getType = function () {
    return type;
  };
  this.setObjNo(nObjNo);
  this.setTab(nTab);
  this.setAndOr(0);
  this.setObj(nObj);
  this.setColumnName(nColumnName);
  this.setType(nType);
};
/**
 * where object closure, makes an object with all information of where
 *
 * @param nRelationOperator type of relation operator to be applied
 * @param nQuery             stores value of value/sub-query
 *
 */
const Where = function (nRelationOperator, nQuery) {
  var relationOperator;
  var query;
  this.setRelationOperator = function (nRelationOperator) {
    relationOperator = nRelationOperator;
  };
  this.setQuery = function (nQuery) {
    query = nQuery;
  };
  this.getQuery = function () {
    return query;
  };
  this.getRelationOperator = function () {
    return relationOperator;
  };
  this.setQuery(nQuery);
  this.setRelationOperator(nRelationOperator);
};
/**
 * Orderby object closure
 *
 * @param nOrder order, ASC or DESC
 */
const OrderBy = function (nOrder) {
  var order;
  this.setOrder = function (nOrder) {
    order = nOrder;
  };
  this.getOrder = function () {
    return order;
  };
  this.setOrder(nOrder);
};
/**
 * Having object closure, makes an object with all information of where
 *
 * @param nRelationOperator type of relation operator to be applied
 * @param nQuery             stores value of value/sub-query
 * @param nOperator          operator
 */
const Having = function (nRelationOperator, nQuery, nOperator) {
  var relationOperator;
  var query;
  var operator;
  this.setOperator = function (nOperator) {
    operator = nOperator;
  };
  this.setRelationOperator = function (nRelationOperator) {
    relationOperator = nRelationOperator;
  };
  this.setQuery = function (nQuery) {
    query = nQuery;
  };
  this.getQuery = function () {
    return query;
  };
  this.getRelationOperator = function () {
    return relationOperator;
  };
  this.getOperator = function () {
    return operator;
  };
  this.setQuery(nQuery);
  this.setRelationOperator(nRelationOperator);
  this.setOperator(nOperator);
};
/**
 * rename object closure,makes an object with all information of rename
 *
 * @param nRenameTo new name information
 *
 */
const Rename = function (nRenameTo) {
  var renameTo;
  this.setRenameTo = function (nRenameTo) {
    renameTo = nRenameTo;
  };
  this.getRenameTo = function () {
    return renameTo;
  };
  this.setRenameTo(nRenameTo);
};
/**
 * aggregate object closure
 *
 * @param nOperator aggregate operator
 *
 */
const Aggregate = function (nOperator) {
  var operator;
  this.setOperator = function (nOperator) {
    operator = nOperator;
  };
  this.getOperator = function () {
    return operator;
  };
  this.setOperator(nOperator);
};
/**
 * This function returns unique element from an array
 *
 * @param arrayName array from which duplicate elem are to be removed.
 * @return unique array
 */
const unique = function (arrayName) {
  var newArray = [];
  uniquetop: for (var i = 0; i < arrayName.length; i++) {
    var newArrayLength = newArray.length;
    for (var j = 0; j < newArrayLength; j++) {
      if (newArray[j] === arrayName[i]) {
        continue uniquetop;
      }
    }
    newArray[newArrayLength] = arrayName[i];
  }
  return newArray;
};
/**
 * This function takes in array and a value as input and returns 1 if values is present in array
 * else returns -1
 *
 * @param arrayName array
 * @param value  value which is to be searched in the array
 */
const found = function (arrayName, value) {
  var arrayNameLength = arrayName.length;
  for (var i = 0; i < arrayNameLength; i++) {
    if (arrayName[i] === value) {
      return 1;
    }
  }
  return -1;
};
/**
 * This function concatenates two array
 *
 * @param {object} add array elements of which are pushed in
 * @param {obj[]} arr array in which elements are added
 *
 * @return {obj[]}
 */
const addArray = function (add, arr) {
  var addLength = add.length;
  for (var i = 0; i < addLength; i++) {
    arr.push(add[i]);
  }
  return arr;
};
/**
 * This function removes all elements present in one array from the other.
 *
 * @param {object} rem array from which each element is removed from other array.
 * @param {obj[]} arr array from which elements are removed.
 *
 * @return {obj[]}
 *
 */
const removeArray = function (rem, arr) {
  var remLength = rem.length;
  for (var i = 0; i < remLength; i++) {
    var arrLength = arr.length;
    for (var j = 0; j < arrLength; j++) {
      if (rem[i] === arr[j]) {
        arr.splice(j, 1);
      }
    }
  }
  return arr;
};
/**
 * This function builds the groupby clause from history object
 * @return {string}
 */
const queryGroupBy = function () {
  var i;
  var str = '';
  var historyArrayLength = DesignerHistory.historyArray.length;
  for (i = 0; i < historyArrayLength; i++) {
    if (DesignerHistory.historyArray[i].getType() === 'GroupBy') {
      str += '`' + DesignerHistory.historyArray[i].getColumnName() + '`, ';
    }
  }
  str = str.substring(0, str.length - 2);
  return str;
};
/**
 * This function builds the Having clause from the history object.
 * @return {string}
 */
const queryHaving = function () {
  var i;
  var and = '(';
  var historyArrayLength = DesignerHistory.historyArray.length;
  for (i = 0; i < historyArrayLength; i++) {
    if (DesignerHistory.historyArray[i].getType() === 'Having') {
      if (DesignerHistory.historyArray[i].getObj().getOperator() !== 'None') {
        and += DesignerHistory.historyArray[i].getObj().getOperator() + '(`' + DesignerHistory.historyArray[i].getColumnName() + '`) ' + DesignerHistory.historyArray[i].getObj().getRelationOperator();
        and += ' ' + DesignerHistory.historyArray[i].getObj().getQuery() + ', ';
      } else {
        and += '`' + DesignerHistory.historyArray[i].getColumnName() + '` ' + DesignerHistory.historyArray[i].getObj().getRelationOperator() + ' ' + DesignerHistory.historyArray[i].getObj().getQuery() + ', ';
      }
    }
  }
  if (and === '(') {
    and = '';
  } else {
    and = and.substring(0, and.length - 2) + ')';
  }
  return and;
};
/**
 * This function builds the orderby clause from the history object.
 * @return {string}
 */
const queryOrderBy = function () {
  var i;
  var str = '';
  var historyArrayLength = DesignerHistory.historyArray.length;
  for (i = 0; i < historyArrayLength; i++) {
    if (DesignerHistory.historyArray[i].getType() === 'OrderBy') {
      str += '`' + DesignerHistory.historyArray[i].getColumnName() + '` ' + DesignerHistory.historyArray[i].getObj().getOrder() + ', ';
    }
  }
  str = str.substring(0, str.length - 2);
  return str;
};
/**
 * This function builds the Where clause from the history object.
 * @return {string}
 */
const queryWhere = function () {
  var i;
  var and = '(';
  var or = '(';
  var historyArrayLength = DesignerHistory.historyArray.length;
  for (i = 0; i < historyArrayLength; i++) {
    if (DesignerHistory.historyArray[i].getType() === 'Where') {
      if (DesignerHistory.historyArray[i].getAndOr() === 0) {
        and += '( `' + DesignerHistory.historyArray[i].getColumnName() + '` ' + DesignerHistory.historyArray[i].getObj().getRelationOperator() + ' ' + DesignerHistory.historyArray[i].getObj().getQuery() + ')';
        and += ' AND ';
      } else {
        or += '( `' + DesignerHistory.historyArray[i].getColumnName() + '` ' + DesignerHistory.historyArray[i].getObj().getRelationOperator() + ' ' + DesignerHistory.historyArray[i].getObj().getQuery() + ')';
        or += ' OR ';
      }
    }
  }
  if (or !== '(') {
    or = or.substring(0, or.length - 4) + ')';
  } else {
    or = '';
  }
  if (and !== '(') {
    and = and.substring(0, and.length - 5) + ')';
  } else {
    and = '';
  }
  if (or !== '') {
    and = and + ' OR ' + or + ' )';
  }
  return and;
};
const checkAggregate = function (idThis) {
  var i;
  var historyArrayLength = DesignerHistory.historyArray.length;
  for (i = 0; i < historyArrayLength; i++) {
    var temp = '`' + DesignerHistory.historyArray[i].getTab() + '`.`' + DesignerHistory.historyArray[i].getColumnName() + '`';
    if (temp === idThis && DesignerHistory.historyArray[i].getType() === 'Aggregate') {
      return DesignerHistory.historyArray[i].getObj().getOperator() + '(' + idThis + ')';
    }
  }
  return '';
};
const checkRename = function (idThis) {
  var i;
  var historyArrayLength = DesignerHistory.historyArray.length;
  for (i = 0; i < historyArrayLength; i++) {
    var temp = '`' + DesignerHistory.historyArray[i].getTab() + '`.`' + DesignerHistory.historyArray[i].getColumnName() + '`';
    if (temp === idThis && DesignerHistory.historyArray[i].getType() === 'Rename') {
      return ' AS `' + DesignerHistory.historyArray[i].getObj().getRenameTo() + '`';
    }
  }
  return '';
};
/**
 * This function builds from clause of query
 * makes automatic joins.
 *
 * @return {string}
 */
const queryFrom = function () {
  var i;
  var tabLeft = [];
  var tabUsed = [];
  var tTabLeft = [];
  var temp;
  var query = '';
  var quer = '';
  var parts = [];
  var tArray = [];
  tArray = window.fromArray;
  var K = 0;
  var k;
  var key;
  var key2;
  var key3;
  var parts1;
  // the constraints that have been used in the LEFT JOIN
  var constraintsAdded = [];
  var historyArrayLength = DesignerHistory.historyArray.length;
  for (i = 0; i < historyArrayLength; i++) {
    window.fromArray.push(DesignerHistory.historyArray[i].getTab());
  }
  window.fromArray = DesignerHistory.unique(window.fromArray);
  tabLeft = window.fromArray;
  temp = tabLeft.shift();
  quer = '`' + temp + '`';
  tabUsed.push(temp);
  // if master table (key2) matches with tab used get all keys and check if tab_left matches
  // after this check if master table (key2) matches with tab left then check if any foreign matches with master .
  for (i = 0; i < 2; i++) {
    for (K in _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr) {
      for (key in _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K]) {
        // contr name
        for (key2 in _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key]) {
          // table name
          parts = key2.split('.');
          if (DesignerHistory.found(tabUsed, parts[1]) > 0) {
            for (key3 in _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key][key2]) {
              parts1 = _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key][key2][key3][0].split('.');
              if (DesignerHistory.found(tabLeft, parts1[1]) > 0) {
                if (DesignerHistory.found(constraintsAdded, key) > 0) {
                  query += ' AND ' + '`' + parts[1] + '`.`' + key3 + '` = ';
                  query += '`' + parts1[1] + '`.`' + _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key][key2][key3][1] + '` ';
                } else {
                  query += '\n' + 'LEFT JOIN ';
                  query += '`' + parts[1] + '` ON ';
                  query += '`' + parts1[1] + '`.`' + _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key][key2][key3][1] + '` = ';
                  query += '`' + parts[1] + '`.`' + key3 + '` ';
                  constraintsAdded.push(key);
                }
                tTabLeft.push(parts[1]);
              }
            }
          }
        }
      }
    }
    K = 0;
    tTabLeft = DesignerHistory.unique(tTabLeft);
    tabUsed = DesignerHistory.addArray(tTabLeft, tabUsed);
    tabLeft = DesignerHistory.removeArray(tTabLeft, tabLeft);
    tTabLeft = [];
    for (K in _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr) {
      for (key in _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K]) {
        for (key2 in _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key]) {
          // table name
          parts = key2.split('.');
          if (DesignerHistory.found(tabLeft, parts[1]) > 0) {
            for (key3 in _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key][key2]) {
              parts1 = _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key][key2][key3][0].split('.');
              if (DesignerHistory.found(tabUsed, parts1[1]) > 0) {
                if (DesignerHistory.found(constraintsAdded, key) > 0) {
                  query += ' AND ' + '`' + parts[1] + '`.`' + key3 + '` = ';
                  query += '`' + parts1[1] + '`.`' + _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key][key2][key3][1] + '` ';
                } else {
                  query += '\n' + 'LEFT JOIN ';
                  query += '`' + parts[1] + '` ON ';
                  query += '`' + parts1[1] + '`.`' + _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.contr[K][key][key2][key3][1] + '` = ';
                  query += '`' + parts[1] + '`.`' + key3 + '` ';
                  constraintsAdded.push(key);
                }
                tTabLeft.push(parts[1]);
              }
            }
          }
        }
      }
    }
    tTabLeft = DesignerHistory.unique(tTabLeft);
    tabUsed = DesignerHistory.addArray(tTabLeft, tabUsed);
    tabLeft = DesignerHistory.removeArray(tTabLeft, tabLeft);
    tTabLeft = [];
  }
  for (k in tabLeft) {
    quer += ' , `' + tabLeft[k] + '`';
  }
  query = quer + query;
  window.fromArray = tArray;
  return query;
};
/**
 * This function is the main function for query building.
 * uses history object details for this.
 *
 * @uses DesignerHistory.queryWhere()
 * @uses DesignerHistory.queryGroupBy()
 * @uses DesignerHistory.queryHaving()
 * @uses DesignerHistory.queryOrderBy()
 */
const buildQuery = function () {
  var qSelect = 'SELECT ';
  var temp;
  var selectFieldLength = DesignerHistory.selectField.length;
  if (selectFieldLength > 0) {
    for (var i = 0; i < selectFieldLength; i++) {
      temp = DesignerHistory.checkAggregate(DesignerHistory.selectField[i]);
      if (temp !== '') {
        qSelect += temp;
        temp = DesignerHistory.checkRename(DesignerHistory.selectField[i]);
        qSelect += temp + ', ';
      } else {
        temp = DesignerHistory.checkRename(DesignerHistory.selectField[i]);
        qSelect += DesignerHistory.selectField[i] + temp + ', ';
      }
    }
    qSelect = qSelect.substring(0, qSelect.length - 2);
  } else {
    qSelect += '* ';
  }
  qSelect += '\nFROM ' + DesignerHistory.queryFrom();
  var qWhere = DesignerHistory.queryWhere();
  if (qWhere !== '') {
    qSelect += '\nWHERE ' + qWhere;
  }
  var qGroupBy = DesignerHistory.queryGroupBy();
  if (qGroupBy !== '') {
    qSelect += '\nGROUP BY ' + qGroupBy;
  }
  var qHaving = DesignerHistory.queryHaving();
  if (qHaving !== '') {
    qSelect += '\nHAVING ' + qHaving;
  }
  var qOrderBy = DesignerHistory.queryOrderBy();
  if (qOrderBy !== '') {
    qSelect += '\nORDER BY ' + qOrderBy;
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#buildQuerySubmitButton').on('click', function () {
    if (DesignerHistory.vqbEditor) {
      var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#buildQueryModal').find('textarea');
      DesignerHistory.vqbEditor.save();
      $elm.val(DesignerHistory.vqbEditor.getValue());
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#vqb_form').trigger('submit');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#buildQueryModal').modal('show');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#buildQueryModalLabel').first().text('SELECT');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#buildQueryModal').on('shown.bs.modal', function () {
    // Attach syntax highlighted editor to query dialog
    /**
     * @var $elm jQuery object containing the reference
     *           to the query textarea.
     */
    var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#buildQueryModal').find('textarea');
    if (!DesignerHistory.vqbEditor) {
      DesignerHistory.vqbEditor = (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_1__.getSqlEditor)($elm);
    }
    if (DesignerHistory.vqbEditor) {
      DesignerHistory.vqbEditor.setValue(qSelect);
      DesignerHistory.vqbEditor.focus();
    } else {
      $elm.val(qSelect);
      $elm.trigger('focus');
    }
  });
};
const DesignerHistory = {
  /**
   * Global array to store history objects.
   */
  historyArray: [],
  /**
   * Global array to store information for columns which are used in select clause.
   */
  selectField: [],
  vqbEditor: null,
  detail: detail,
  display: display,
  andOr: andOr,
  historyDelete: historyDelete,
  changeStyle: changeStyle,
  historyEdit: historyEdit,
  edit: edit,
  HistoryObj: HistoryObj,
  Where: Where,
  OrderBy: OrderBy,
  Having: Having,
  Rename: Rename,
  Aggregate: Aggregate,
  unique: unique,
  found: found,
  addArray: addArray,
  removeArray: removeArray,
  queryGroupBy: queryGroupBy,
  queryHaving: queryHaving,
  queryOrderBy: queryOrderBy,
  queryWhere: queryWhere,
  checkAggregate: checkAggregate,
  checkRename: checkRename,
  queryFrom: queryFrom,
  buildQuery: buildQuery
};
window.DesignerHistory = DesignerHistory;


/***/ }),

/***/ 40:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignerConfig: function() { return /* binding */ DesignerConfig; }
/* harmony export */ });
const DesignerConfig = {
  /** @type {any[]} */
  jTabs: [],
  /** @type {any[]} */
  hTabs: [],
  /** @type {any[]} */
  contr: [],
  /** @type {any[]} */
  displayField: [],
  /** @type {number} */
  server: 0,
  /** @type {number} */
  selectedPage: -1,
  /** @type {string} */
  db: '',
  /** @type {boolean} */
  designerTablesEnabled: false
};

/***/ }),

/***/ 41:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignerMove: function() { return /* binding */ DesignerMove; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _objects_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);
/* harmony import */ var _history_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(39);
/* harmony import */ var _page_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(43);
/* harmony import */ var _config_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40);










var change = 0; // variable to track any change in designer layout.
var showRelationLines = true;
var alwaysShowText = false;
const markSaved = function () {
  change = 0;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#saved_state').text('');
};
const markUnsaved = function () {
  change = 1;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#saved_state').text('*');
};
var mainDirection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('dir') === 'rtl' ? 'right' : 'left';
// Will be used to multiply the offsetLeft by -1 if the direction is rtl.
var directionEffect = mainDirection === 'right' ? -1 : 1;
var curClick = null;
var smS = 0;
var smAdd = 10;
var sLeft = 0;
var sRight = 0;
var onRelation = 0;
var onGrid = 0;
var onDisplayField = 0;
// relation_style: 0 - angular 1 - direct
var onAngularDirect = 1;
var clickField = 0;
var linkRelation = '';
var canvasWidth = 0;
var canvasHeight = 0;
var osnTabWidth = 0;
var osnTabHeight = 0;
var heightField = 7;
var globX;
var globY;
var layerMenuCurClick = 0;
window.fromArray = [];
var menuMoved = false;
var gridSize = 10;
// ------------------------------------------------------------------------------
const mouseDown = function (e) {
  globX = e.pageX;
  globY = e.pageY;
  if (e.target.tagName === 'SPAN') {
    curClick = e.target.parentNode.parentNode.parentNode.parentNode;
  } else if (e.target.className === 'tab_zag_2') {
    curClick = e.target.parentNode.parentNode.parentNode;
  } else if (e.target.id === 'layer_menu_sizer_btn') {
    layerMenuCurClick = 1;
  } else if (e.target.className === 'M_butt') {
    return false;
  }
  if (curClick !== null) {
    document.getElementById('canvas').style.display = 'none';
    curClick.style.zIndex = 2;
  }
};
const mouseMove = function (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  var newDx = e.pageX;
  var newDy = e.pageY;
  var deltaX = globX - newDx;
  var deltaY = globY - newDy;
  globX = newDx;
  globY = newDy;
  if (curClick !== null) {
    DesignerMove.markUnsaved();
    var $curClick = jquery__WEBPACK_IMPORTED_MODULE_0___default()(curClick);
    var curX = parseFloat($curClick.attr('data-' + mainDirection) || $curClick.css(mainDirection));
    var curY = parseFloat($curClick.attr('data-top') || $curClick.css('top'));
    var newX = curX - directionEffect * deltaX;
    var newY = curY - deltaY;
    $curClick.attr('data-' + mainDirection, newX);
    $curClick.attr('data-top', newY);
    if (onGrid) {
      newX = parseInt((newX / gridSize).toString()) * gridSize;
      newY = parseInt((newY / gridSize).toString()) * gridSize;
    }
    if (newX < 0) {
      newX = 0;
    } else if (newY < 0) {
      newY = 0;
    }
    $curClick.css(mainDirection, newX + 'px');
    $curClick.css('top', newY + 'px');
  } else if (layerMenuCurClick) {
    if (menuMoved) {
      deltaX = -deltaX;
    }
    var $layerMenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#layer_menu');
    var newWidth = $layerMenu.width() + directionEffect * deltaX;
    if (newWidth < 150) {
      newWidth = 150;
    }
    $layerMenu.width(newWidth);
  }
  if (onRelation || onDisplayField) {
    document.getElementById('designer_hint').style.left = globX + 20 + 'px';
    document.getElementById('designer_hint').style.top = globY + 20 + 'px';
  }
};
const mouseUp = function () {
  if (curClick !== null) {
    document.getElementById('canvas').style.display = 'inline-block';
    DesignerMove.reload();
    curClick.style.zIndex = 1;
    curClick = null;
  }
  layerMenuCurClick = 0;
};
// ------------------------------------------------------------------------------
const canvasPos = function () {
  canvasWidth = document.getElementById('canvas').width = osnTabWidth - 3;
  canvasHeight = document.getElementById('canvas').height = osnTabHeight - 3;
};
const osnTabPos = function () {
  osnTabWidth = parseInt(document.getElementById('osn_tab').style.width, 10);
  osnTabHeight = parseInt(document.getElementById('osn_tab').style.height, 10);
};
const setDefaultValuesFromSavedState = function () {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#angular_direct_button').attr('class') === 'M_butt') {
    onAngularDirect = 0;
  } else {
    onAngularDirect = 1;
  }
  DesignerMove.angularDirect();
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#grid_button').attr('class') === 'M_butt') {
    onGrid = 1;
  } else {
    onGrid = 0;
  }
  DesignerMove.grid();
  var $relLineInvert = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#relLineInvert');
  if ($relLineInvert.attr('class') === 'M_butt') {
    showRelationLines = false;
    $relLineInvert.attr('class', 'M_butt');
  } else {
    showRelationLines = true;
    $relLineInvert.attr('class', 'M_butt_Selected_down');
  }
  DesignerMove.relationLinesInvert();
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pin_Text').attr('class') === 'M_butt_Selected_down') {
    alwaysShowText = true;
    DesignerMove.showText();
  } else {
    alwaysShowText = false;
  }
  var $keySbAll = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_SB_all');
  if ($keySbAll.attr('class') === 'M_butt_Selected_down') {
    $keySbAll.trigger('click');
    $keySbAll.toggleClass('M_butt_Selected_down');
    $keySbAll.toggleClass('M_butt');
  }
  var $keyLeftRight = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_Left_Right');
  if ($keyLeftRight.attr('class') === 'M_butt_Selected_down') {
    $keyLeftRight.trigger('click');
  }
};
const main = function () {
  // ---CROSS
  document.getElementById('layer_menu').style.top = -1000 + 'px'; // fast scroll
  DesignerMove.osnTabPos();
  DesignerMove.canvasPos();
  DesignerMove.smallTabRefresh();
  DesignerMove.reload();
  DesignerMove.setDefaultValuesFromSavedState();
};
const resizeOsnTab = function () {
  var maxX = 0;
  var maxY = 0;
  for (var key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs) {
    var kX = parseInt(document.getElementById(key).style[mainDirection], 10) + document.getElementById(key).offsetWidth;
    var kY = parseInt(document.getElementById(key).style.top, 10) + document.getElementById(key).offsetHeight;
    maxX = maxX < kX ? kX : maxX;
    maxY = maxY < kY ? kY : maxY;
  }
  osnTabWidth = maxX + 50;
  osnTabHeight = maxY + 50;
  DesignerMove.canvasPos();
};
/**
 * Draw a colored line
 *
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 * @param {HTMLElement} osnTab
 * @param {string} colorTarget
 */
const drawLine0 = function (x1, x2, y1, y2, osnTab, colorTarget) {
  DesignerMove.line0(x1 + directionEffect * osnTab.offsetLeft, y1 - osnTab.offsetTop, x2 + directionEffect * osnTab.offsetLeft, y2 - osnTab.offsetTop, DesignerMove.getColorByTarget(colorTarget));
};
/**
 * refreshes display, must be called after state changes
 */
const reload = function () {
  DesignerMove.resizeOsnTab();
  var n;
  var x1;
  var x2;
  var a = [];
  var K;
  var key;
  var key2;
  var key3;
  DesignerMove.clear();
  var osnTab = document.getElementById('osn_tab');
  for (K in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr) {
    for (key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K]) {
      // contr name
      for (key2 in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key]) {
        // table name
        for (key3 in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2]) {
          // field name
          if (!document.getElementById('check_vis_' + key2).checked || !document.getElementById('check_vis_' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]).checked) {
            // if hide
            continue;
          }
          var x1Left = document.getElementById(key2).offsetLeft + 1;
          var x1Right = x1Left + document.getElementById(key2).offsetWidth;
          var x2Left = document.getElementById(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]).offsetLeft;
          var x2Right = x2Left + document.getElementById(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]).offsetWidth;
          a[0] = Math.abs(x1Left - x2Left);
          a[1] = Math.abs(x1Left - x2Right);
          a[2] = Math.abs(x1Right - x2Left);
          a[3] = Math.abs(x1Right - x2Right);
          n = sLeft = sRight = 0;
          for (var i = 1; i < 4; i++) {
            if (a[n] > a[i]) {
              n = i;
            }
          }
          if (n === 1) {
            x1 = x1Left - smS;
            x2 = x2Right + smS;
            if (x1 < x2) {
              n = 0;
            }
          }
          if (n === 2) {
            x1 = x1Right + smS;
            x2 = x2Left - smS;
            if (x1 > x2) {
              n = 0;
            }
          }
          if (n === 3) {
            x1 = x1Right + smS;
            x2 = x2Right + smS;
            sRight = 1;
          }
          if (n === 0) {
            x1 = x1Left - smS;
            x2 = x2Left - smS;
            sLeft = 1;
          }
          var rowOffsetTop = 0;
          var tabHideButton = document.getElementById('id_hide_tbody_' + key2);
          if (tabHideButton.innerHTML === 'v') {
            var fromColumn = document.getElementById(key2 + '.' + key3);
            if (fromColumn) {
              rowOffsetTop = fromColumn.offsetTop;
            } else {
              continue;
            }
          }
          var y1 = document.getElementById(key2).offsetTop + rowOffsetTop + heightField;
          rowOffsetTop = 0;
          tabHideButton = document.getElementById('id_hide_tbody_' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]);
          if (tabHideButton.innerHTML === 'v') {
            var toColumn = document.getElementById(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0] + '.' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][1]);
            if (toColumn) {
              rowOffsetTop = toColumn.offsetTop;
            } else {
              continue;
            }
          }
          var y2 = document.getElementById(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]).offsetTop + rowOffsetTop + heightField;
          DesignerMove.drawLine0(x1, x2, y1, y2, osnTab, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0] + '.' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][1]);
        }
      }
    }
  }
};
/**
 * draws a line from x1:y1 to x2:y2 with color
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param colorLine
 */
const line = function (x1, y1, x2, y2, colorLine) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = colorLine;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};
/**
 * draws a relation/constraint line, whether angular or not
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param colorLine
 */
const line0 = function (x1, y1, x2, y2, colorLine) {
  if (!showRelationLines) {
    return;
  }
  DesignerMove.circle(x1, y1, 3, 3, colorLine);
  DesignerMove.rect(x2 - 1, y2 - 2, 4, 4, colorLine);
  if (onAngularDirect) {
    DesignerMove.line2(x1, y1, x2, y2, colorLine);
  } else {
    DesignerMove.line3(x1, y1, x2, y2, colorLine);
  }
};
/**
 * draws a angular relation/constraint line
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param colorLine
 */
const line2 = function (x1, y1, x2, y2, colorLine) {
  var x1Local = x1;
  var x2Local = x2;
  if (sRight) {
    x1Local += smAdd;
    x2Local += smAdd;
  } else if (sLeft) {
    x1Local -= smAdd;
    x2Local -= smAdd;
  } else if (x1 < x2) {
    x1Local += smAdd;
    x2Local -= smAdd;
  } else {
    x1Local -= smAdd;
    x2Local += smAdd;
  }
  DesignerMove.line(x1, y1, x1Local, y1, colorLine);
  DesignerMove.line(x2, y2, x2Local, y2, colorLine);
  DesignerMove.line(x1Local, y1, x2Local, y2, colorLine);
};
/**
 * draws a relation/constraint line
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param colorLine
 */
const line3 = function (x1, y1, x2, y2, colorLine) {
  var x1Local = x1;
  var x2Local = x2;
  if (sRight) {
    if (x1 < x2) {
      x1Local += x2 - x1 + smAdd;
      x2Local += smAdd;
    } else {
      x2Local += x1 - x2 + smAdd;
      x1Local += smAdd;
    }
    DesignerMove.line(x1, y1, x1Local, y1, colorLine);
    DesignerMove.line(x2, y2, x2Local, y2, colorLine);
    DesignerMove.line(x1Local, y1, x2Local, y2, colorLine);
    return;
  }
  if (sLeft) {
    if (x1 < x2) {
      x2Local -= x2 - x1 + smAdd;
      x1Local -= smAdd;
    } else {
      x1Local -= x1 - x2 + smAdd;
      x2Local -= smAdd;
    }
    DesignerMove.line(x1, y1, x1Local, y1, colorLine);
    DesignerMove.line(x2, y2, x2Local, y2, colorLine);
    DesignerMove.line(x1Local, y1, x2Local, y2, colorLine);
    return;
  }
  var xS = (x1 + x2) / 2;
  DesignerMove.line(x1, y1, xS, y1, colorLine);
  DesignerMove.line(xS, y2, x2, y2, colorLine);
  DesignerMove.line(xS, y1, xS, y2, colorLine);
};
const circle = function (x, y, r, w, color) {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineWidth = w;
  ctx.strokeStyle = color;
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.stroke();
};
const clear = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};
const rect = function (x1, y1, w, h, color) {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(x1, y1, w, h);
};
// --------------------------- FULLSCREEN -------------------------------------
const toggleFullscreen = function () {
  var valueSent = '';
  var $img = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#toggleFullscreen').find('img');
  var $span = $img.siblings('span');
  var $content = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content');
  const pageContent = document.getElementById('page_content');
  if (!document.fullscreenElement) {
    $img.attr('src', $img.data('exit')).attr('title', $span.data('exit'));
    $span.text($span.data('exit'));
    $content.addClass('content_fullscreen').css({
      'width': screen.width - 5,
      'height': screen.height - 5
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#osn_tab').css({
      'width': screen.width + 'px',
      'height': screen.height
    });
    valueSent = 'on';
    pageContent.requestFullscreen();
  } else {
    $img.attr('src', $img.data('enter')).attr('title', $span.data('enter'));
    $span.text($span.data('enter'));
    $content.removeClass('content_fullscreen').css({
      'width': 'auto',
      'height': 'auto'
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#osn_tab').css({
      'width': 'auto',
      'height': 'auto'
    });
    document.exitFullscreen();
    valueSent = 'off';
  }
  DesignerMove.saveValueInConfig('full_screen', valueSent);
};
const addTableToTablesList = function (index, tableDom) {
  var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableDom).find('.small_tab_pref').attr('db');
  var table = jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableDom).find('.small_tab_pref').attr('table_name');
  var dbEncoded = jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableDom).find('.small_tab_pref').attr('db_url');
  var tableEncoded = jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableDom).find('.small_tab_pref').attr('table_name_url');
  var tableIsChecked = jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableDom).css('display') === 'block' ? 'checked' : '';
  var checkboxStatus = tableIsChecked === 'checked' ? window.Messages.strHide : window.Messages.strShow;
  var $newTableLine = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<tr>' + '    <td title="' + window.Messages.strStructure + '"' + '        width="1px"' + '        class="L_butt2_1">' + '        <img alt=""' + '            db="' + dbEncoded + '"' + '            table_name="' + tableEncoded + '"' + '            class="scroll_tab_struct"' + '            src="' + window.themeImagePath + 'designer/exec.png"/>' + '    </td>' + '    <td width="1px">' + '        <input class="scroll_tab_checkbox"' + '            title="' + checkboxStatus + '"' + '            id="check_vis_' + dbEncoded + '.' + tableEncoded + '"' + '            style="margin:0;"' + '            type="checkbox"' + '            value="' + dbEncoded + '.' + tableEncoded + '"' + tableIsChecked + '            />' + '    </td>' + '    <td class="designer_Tabs"' + '        designer_url_table_name="' + dbEncoded + '.' + tableEncoded + '">' + jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').text(db + '.' + table).html() + '</td>' + '</tr>');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_scroll_tab table').first().append($newTableLine);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()($newTableLine).find('.scroll_tab_struct').on('click', function () {
    DesignerMove.startTabUpd(db, table);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()($newTableLine).on('click', '.designer_Tabs2,.designer_Tabs', function () {
    DesignerMove.selectTab(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('designer_url_table_name'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()($newTableLine).find('.scroll_tab_checkbox').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('title', function (i, currentvalue) {
      return currentvalue === window.Messages.strHide ? window.Messages.strShow : window.Messages.strHide;
    });
    DesignerMove.visibleTab(this, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
  });
  var $tablesCounter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tables_counter');
  $tablesCounter.text(parseInt($tablesCounter.text(), 10) + 1);
};
/**
 * This function shows modal with Go buttons where required in designer
 * @param {object} form
 * @param {string} heading
 * @param {string} type
 *
 * @return {object} modal;
 */
const displayModal = function (form, heading, type) {
  var modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()(type);
  modal.modal('show');
  modal.find('.modal-body').first().html(form);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(type + 'Label').first().html(heading);
  return modal;
};
const addOtherDbTables = function () {
  var $selectDb = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<select id="add_table_from"></select>');
  $selectDb.append('<option value="">' + window.Messages.strNone + '</option>');
  var $selectTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<select id="add_table"></select>');
  $selectTable.append('<option value="">' + window.Messages.strNone + '</option>');
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/sql', {
    'ajax_request': true,
    'sql_query': 'SHOW databases;',
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server')
  }, function (data) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.message).find('table.table_results.data.ajax').find('td.data').each(function () {
      var val = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)[0].innerText;
      $selectDb.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option></option>').val(val).text(val));
    });
  });
  var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<form action="" class="ajax"></form>').append($selectDb).append($selectTable);
  var modal = DesignerMove.displayModal($form, window.Messages.strAddTables, '#designerGoModal');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').on('click', function () {
    var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#add_table_from').val();
    var table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#add_table').val();
    // Check if table already imported or not.
    var $table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[id="' + encodeURIComponent(db) + '.' + encodeURIComponent(table) + '"]');
    if ($table.length !== 0) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.sprintf(window.Messages.strTableAlreadyExists, db + '.' + table), undefined, 'error');
      return;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', {
      'ajax_request': true,
      'dialog': 'add_table',
      'db': db,
      'table': table,
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server')
    }, function (data) {
      var $newTableDom = jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.message);
      $newTableDom.find('a').first().remove();
      var dbEncoded = jquery__WEBPACK_IMPORTED_MODULE_0___default()($newTableDom).find('.small_tab_pref').attr('db_url');
      var tableEncoded = jquery__WEBPACK_IMPORTED_MODULE_0___default()($newTableDom).find('.small_tab_pref').attr('table_name_url');
      if (typeof dbEncoded === 'string' && typeof tableEncoded === 'string') {
        // Do not try to add if attr not found !
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#container-form').append($newTableDom);
        DesignerMove.enableTableEvents(null, $newTableDom);
        DesignerMove.addTableToTablesList(null, $newTableDom);
        _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs[dbEncoded + '.' + tableEncoded] = 1;
        DesignerMove.markUnsaved();
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').off('click'); // Unregister the event for other modals to not call this one
    modal.modal('hide');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#add_table_from').on('change', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) {
      var dbName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
      var sqlQuery = 'SHOW tables;';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/sql', {
        'ajax_request': true,
        'sql_query': sqlQuery,
        'db': dbName,
        'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server')
      }, function (data) {
        $selectTable.html('');
        var rows = jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.message).find('table.table_results.data.ajax').find('td.data');
        if (rows.length === 0) {
          $selectTable.append('<option value="">' + window.Messages.strNone + '</option>');
        }
        rows.each(function () {
          var val = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)[0].innerText;
          $selectTable.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option></option>').val(val).text(val));
        });
      });
    }
  });
};
// ------------------------------ NEW ------------------------------------------
const newPage = function () {
  DesignerMove.promptToSaveCurrentPage(function () {
    DesignerMove.loadPage(-1);
  });
};
// ------------------------------ SAVE ------------------------------------------
// (del?) no for pdf
const save = function (url) {
  for (var key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs) {
    document.getElementById('t_x_' + key + '_').value = parseInt(document.getElementById(key).style.left, 10).toString();
    document.getElementById('t_y_' + key + '_').value = parseInt(document.getElementById(key).style.top, 10).toString();
    document.getElementById('t_v_' + key + '_').value = document.getElementById('id_tbody_' + key).style.display === 'none' ? '0' : '1';
    document.getElementById('t_h_' + key + '_').value = document.getElementById('check_vis_' + key).checked ? '1' : '0';
  }
  document.getElementById('container-form').action = url;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#container-form').trigger('submit');
};
const getUrlPos = function () {
  let forceString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var key;
  if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled || forceString) {
    var poststr = '';
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    var i = 1;
    for (key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs) {
      poststr += argsep + 't_x[' + i + ']=' + parseInt(document.getElementById(key).style.left, 10);
      poststr += argsep + 't_y[' + i + ']=' + parseInt(document.getElementById(key).style.top, 10);
      poststr += argsep + 't_v[' + i + ']=' + (document.getElementById('id_tbody_' + key).style.display === 'none' ? 0 : 1);
      poststr += argsep + 't_h[' + i + ']=' + (document.getElementById('check_vis_' + key).checked ? 1 : 0);
      poststr += argsep + 't_db[' + i + ']=' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(key)).attr('db_url');
      poststr += argsep + 't_tbl[' + i + ']=' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(key)).attr('table_name_url');
      i++;
    }
    return poststr;
  } else {
    var coords = [];
    for (key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs) {
      if (document.getElementById('check_vis_' + key).checked) {
        var x = parseInt(document.getElementById(key).style.left, 10);
        var y = parseInt(document.getElementById(key).style.top, 10);
        var tbCoords = new _objects_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerObjects.TableCoordinate(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(key)).attr('db_url'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(key)).attr('table_name_url'), -1, x, y);
        coords.push(tbCoords);
      }
    }
    return coords;
  }
};
const save2 = function (callback) {
  if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    var poststr = 'operation=savePage' + argsep + 'save_page=same' + argsep + 'ajax_request=true';
    poststr += argsep + 'server=' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server + argsep + 'db=' + encodeURIComponent(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db) + argsep + 'selected_page=' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage;
    poststr += DesignerMove.getUrlPos();
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strProcessingRequest);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', poststr, function (data) {
      if (data.success === false) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strModificationSaved);
        DesignerMove.markSaved();
        if (typeof callback !== 'undefined') {
          callback();
        }
      }
    });
  } else {
    var name = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_name').html().trim();
    _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.saveToSelectedPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage, name, DesignerMove.getUrlPos(), function () {
      DesignerMove.markSaved();
      if (typeof callback !== 'undefined') {
        callback();
      }
    });
  }
};
const submitSaveDialogAndClose = function (callback, modal) {
  var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#save_page');
  var name = $form.find('input[name="selected_value"]').val().trim();
  if (name === '') {
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strEnterValidPageName, false);
    return;
  }
  modal.modal('hide');
  if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strProcessingRequest);
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_1__.prepareForAjaxRequest)($form);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize() + DesignerMove.getUrlPos(), function (data) {
      if (data.success === false) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
        DesignerMove.markSaved();
        if (data.id) {
          _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage = data.id;
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_name').text(name);
        if (typeof callback !== 'undefined') {
          callback();
        }
      }
    });
  } else {
    _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.saveToNewPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db, name, DesignerMove.getUrlPos(), function (page) {
      DesignerMove.markSaved();
      if (page.pgNr) {
        _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage = page.pgNr;
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_name').text(page.pageDescr);
      if (typeof callback !== 'undefined') {
        callback();
      }
    });
  }
};
const save3 = function () {
  let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage !== -1) {
    DesignerMove.save2(callback);
  } else {
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<form action="index.php?route=/database/designer" method="post" name="save_page" id="save_page" class="ajax"></form>').append('<input type="hidden" name="server" value="' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server + '">').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input type="hidden" name="db" />').val(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db)).append('<input type="hidden" name="operation" value="savePage">').append('<input type="hidden" name="save_page" value="new">').append('<label for="selected_value">' + window.Messages.strPageName + '</label>:<input type="text" name="selected_value">');
    var modal = DesignerMove.displayModal($form, window.Messages.strSavePage, '#designerGoModal');
    $form.on('submit', function (e) {
      e.preventDefault();
      DesignerMove.submitSaveDialogAndClose(callback, modal);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').on('click', function () {
      var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#save_page');
      $form.trigger('submit');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').off('click'); // Unregister the event for other modals to not call this one
      modal.modal('hide');
    });
  }
};
// ------------------------------ EDIT PAGES ------------------------------------------
const editPages = function () {
  DesignerMove.promptToSaveCurrentPage(function () {
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', {
      'ajax_request': true,
      'server': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server,
      'db': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db,
      'dialog': 'edit'
    }, function (data) {
      if (data.success === false) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
        if (!_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
          _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.createPageList(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db, function (options) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selected_page').append(options);
          });
        }
        var modal = DesignerMove.displayModal(data.message, window.Messages.strOpenPage, '#designerGoModal');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').on('click', function () {
          var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit_delete_pages');
          var selected = $form.find('select[name="selected_page"]').val();
          if (selected === '0') {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strSelectPage, 2000);
            return;
          }
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').off('click'); // Unregister the event for other modals to not call this one
          modal.modal('hide');
          DesignerMove.loadPage(selected);
        });
      }
    }); // end $.post()
  });
};
// -----------------------------  DELETE PAGES ---------------------------------------
const deletePages = function () {
  var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', {
    'ajax_request': true,
    'server': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server,
    'db': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db,
    'dialog': 'delete'
  }, function (data) {
    if (data.success === false) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      if (!_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
        _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.createPageList(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db, function (options) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selected_page').append(options);
        });
      }
      var modal = DesignerMove.displayModal(data.message, window.Messages.strDeletePage, '#designerGoModal');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').on('click', function () {
        var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit_delete_pages');
        var selected = $form.find('select[name="selected_page"]').val();
        if (selected === '0') {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strSelectPage, 2000);
          return;
        }
        var $messageBox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strProcessingRequest);
        var deletingCurrentPage = parseInt(selected) === _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage;
        (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_1__.prepareForAjaxRequest)($form);
        if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize(), function (data) {
            if (data.success === false) {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
            } else {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($messageBox);
              if (deletingCurrentPage) {
                DesignerMove.loadPage(null);
              } else {
                (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strSuccessfulPageDelete);
              }
            }
          }); // end $.post()
        } else {
          _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.deletePage(selected, function (success) {
            if (!success) {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)('Error', false);
            } else {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($messageBox);
              if (deletingCurrentPage) {
                DesignerMove.loadPage(null);
              } else {
                (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strSuccessfulPageDelete);
              }
            }
          });
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').off('click'); // Unregister the event for other modals to not call this one
        modal.modal('hide');
      });
    }
  }); // end $.post()
};
// ------------------------------ SAVE AS PAGES ---------------------------------------
const saveAs = function () {
  var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', {
    'ajax_request': true,
    'server': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server,
    'db': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db,
    'dialog': 'save_as'
  }, function (data) {
    if (data.success === false) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      if (!_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
        _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.createPageList(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db, function (options) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selected_page').append(options);
        });
      }
      var modal = DesignerMove.displayModal(data.message, window.Messages.strSavePageAs, '#designerGoModal');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').on('click', function () {
        var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#save_as_pages');
        var selectedValue = $form.find('input[name="selected_value"]').val().trim();
        var $selectedPage = $form.find('select[name="selected_page"]');
        var choice = $form.find('input[name="save_page"]:checked').val();
        var name = '';
        if (choice === 'same') {
          if ($selectedPage.val() === '0') {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strSelectPage, 2000);
            return;
          }
          name = $selectedPage.find('option:selected').text();
        } else if (choice === 'new') {
          if (selectedValue === '') {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strEnterValidPageName, 2000);
            return;
          }
          name = selectedValue;
        }
        var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strProcessingRequest);
        if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
          (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_1__.prepareForAjaxRequest)($form);
          jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize() + DesignerMove.getUrlPos(), function (data) {
            if (data.success === false) {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
            } else {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
              DesignerMove.markSaved();
              if (data.id) {
                _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage = data.id;
              }
              DesignerMove.loadPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage);
            }
          }); // end $.post()
        } else {
          if (choice === 'same') {
            var selectedPageId = $selectedPage.find('option:selected').val();
            _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.saveToSelectedPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db, selectedPageId, name, DesignerMove.getUrlPos(), function (page) {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
              DesignerMove.markSaved();
              if (page.pgNr) {
                _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage = page.pgNr;
              }
              DesignerMove.loadPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage);
            });
          } else if (choice === 'new') {
            _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.saveToNewPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db, name, DesignerMove.getUrlPos(), function (page) {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
              DesignerMove.markSaved();
              if (page.pgNr) {
                _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage = page.pgNr;
              }
              DesignerMove.loadPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage);
            });
          }
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').off('click'); // Unregister the event for other modals to not call this one
        modal.modal('hide');
      });
      // select current page by default
      if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage !== -1) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="selected_page"]').val(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage);
      }
    }
  }); // end $.post()
};
const promptToSaveCurrentPage = function (callback) {
  if (change === 1 || _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage === -1) {
    var modal = DesignerMove.displayModal('<div>' + window.Messages.strLeavingPage + '</div>', window.Messages.strSavePage, '#designerPromptModal');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalYesButton').on('click', function () {
      modal.modal('hide');
      DesignerMove.save3(callback);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalNoButton').on('click', function () {
      modal.modal('hide');
      callback();
    });
  } else {
    callback();
  }
};
// ------------------------------ EXPORT PAGES ---------------------------------------
const exportPages = function () {
  var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
  var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', {
    'ajax_request': true,
    'server': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server,
    'db': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db,
    'dialog': 'export',
    'selected_page': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage
  }, function (data) {
    if (data.success === false) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.message);
      if (!_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
        $form.append('<input type="hidden" name="offline_export" value="true">');
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(DesignerMove.getUrlPos(true).substring(1).split(argsep), function () {
        var pair = this.split('=');
        var input = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input type="hidden">');
        input.attr('name', pair[0]);
        input.attr('value', pair[1]);
        $form.append(input);
      });
      var $formatDropDown = $form.find('#plugins');
      $formatDropDown.on('change', function () {
        var format = $formatDropDown.val();
        $form.find('.format_specific_options').hide();
        $form.find('#' + format + '_options').show();
      }).trigger('change');
      var modal = DesignerMove.displayModal($form, window.Messages.strExportRelationalSchema, '#designerGoModal');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').on('click', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_export_pages').trigger('submit');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#designerModalGoButton').off('click'); // Unregister the event for other modals to not call this one
        modal.modal('hide');
      });
    }
  }); // end $.post()
};
const loadPage = function (page) {
  if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.designerTablesEnabled) {
    var paramPage = '';
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    if (page !== null) {
      paramPage = argsep + 'page=' + page;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a href="index.php?route=/database/designer&server=' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server + argsep + 'db=' + encodeURIComponent(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db) + paramPage + '"></a>').appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content')).trigger('click');
  } else {
    if (page === null) {
      _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.showTablesInLandingPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db);
    } else if (page > -1) {
      _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.loadHtmlForPage(page);
    } else if (page === -1) {
      _page_ts__WEBPACK_IMPORTED_MODULE_8__.DesignerPage.showNewPageTables(true);
    }
  }
  DesignerMove.markSaved();
};
const grid = function () {
  var valueSent = '';
  if (!onGrid) {
    onGrid = 1;
    valueSent = 'on';
    document.getElementById('grid_button').className = 'M_butt_Selected_down';
  } else {
    document.getElementById('grid_button').className = 'M_butt';
    onGrid = 0;
    valueSent = 'off';
  }
  DesignerMove.saveValueInConfig('snap_to_grid', valueSent);
};
const angularDirect = function () {
  var valueSent = '';
  if (onAngularDirect) {
    onAngularDirect = 0;
    valueSent = 'angular';
    document.getElementById('angular_direct_button').className = 'M_butt_Selected_down';
  } else {
    onAngularDirect = 1;
    valueSent = 'direct';
    document.getElementById('angular_direct_button').className = 'M_butt';
  }
  DesignerMove.saveValueInConfig('angular_direct', valueSent);
  DesignerMove.reload();
};
const saveValueInConfig = function (indexSent, valueSent) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', {
    'operation': 'save_setting_value',
    'index': indexSent,
    'ajax_request': true,
    'server': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server,
    'value': valueSent
  }, function (data) {
    if (data.success === false) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
    }
  });
};
// ++++++++++++++++++++++++++++++ RELATION ++++++++++++++++++++++++++++++++++++++
const startRelation = function () {
  if (onDisplayField) {
    return;
  }
  if (!onRelation) {
    document.getElementById('foreign_relation').style.display = '';
    onRelation = 1;
    document.getElementById('designer_hint').innerHTML = window.Messages.strSelectReferencedKey;
    document.getElementById('designer_hint').style.display = 'block';
    document.getElementById('rel_button').className = 'M_butt_Selected_down';
  } else {
    document.getElementById('designer_hint').innerHTML = '';
    document.getElementById('designer_hint').style.display = 'none';
    document.getElementById('rel_button').className = 'M_butt';
    clickField = 0;
    onRelation = 0;
  }
};
// table field
const clickTableField = function (db, T, f, pk) {
  var pkLocal = parseInt(pk);
  var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
  if (onRelation) {
    if (!clickField) {
      // .style.display=='none'        .style.display = 'none'
      if (!pkLocal) {
        alert(window.Messages.strPleaseSelectPrimaryOrUniqueKey);
        return; // 0;
      } // PK
      if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs[db + '.' + T] !== 1) {
        document.getElementById('foreign_relation').style.display = 'none';
      }
      clickField = 1;
      linkRelation = 'DB1=' + db + argsep + 'T1=' + T + argsep + 'F1=' + f;
      document.getElementById('designer_hint').innerHTML = window.Messages.strSelectForeignKey;
    } else {
      DesignerMove.startRelation(); // hidden hint...
      if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs[db + '.' + T] !== 1 || !pkLocal) {
        document.getElementById('foreign_relation').style.display = 'none';
      }
      var left = globX - (document.getElementById('layer_new_relation').offsetWidth >> 1);
      document.getElementById('layer_new_relation').style.left = left + 'px';
      var top = globY - document.getElementById('layer_new_relation').offsetHeight;
      document.getElementById('layer_new_relation').style.top = top + 'px';
      document.getElementById('layer_new_relation').style.display = 'block';
      linkRelation += argsep + 'DB2=' + db + argsep + 'T2=' + T + argsep + 'F2=' + f;
    }
  }
  if (onDisplayField) {
    var fieldNameToSend = decodeURIComponent(f);
    var newDisplayFieldClass = 'tab_field';
    var oldTabField = document.getElementById('id_tr_' + T + '.' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.displayField[T]);
    // if is display field
    if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.displayField[T] === f) {
      // The display field is already the one defined, user wants to remove it
      newDisplayFieldClass = 'tab_field';
      delete _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.displayField[T];
      if (oldTabField) {
        // Clear the style
        // Set display field class on old item
        oldTabField.className = 'tab_field';
      }
      fieldNameToSend = '';
    } else {
      newDisplayFieldClass = 'tab_field_3';
      if (_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.displayField[T]) {
        // Had a previous one, clear it
        if (oldTabField) {
          // Set display field class on old item
          oldTabField.className = 'tab_field';
        }
        delete _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.displayField[T];
      }
      _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.displayField[T] = f;
      var tabField = document.getElementById('id_tr_' + T + '.' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.displayField[T]);
      if (tabField) {
        // Set new display field class
        tabField.className = newDisplayFieldClass;
      }
    }
    onDisplayField = 0;
    document.getElementById('designer_hint').innerHTML = '';
    document.getElementById('designer_hint').style.display = 'none';
    document.getElementById('display_field_button').className = 'M_butt';
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strProcessingRequest);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', {
      'operation': 'setDisplayField',
      'ajax_request': true,
      'server': _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server,
      'db': db,
      'table': T,
      'field': fieldNameToSend
    }, function (data) {
      if (data.success === false) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strModificationSaved);
      }
    });
  }
};
const newRelation = function () {
  document.getElementById('layer_new_relation').style.display = 'none';
  var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
  linkRelation += argsep + 'server=' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server + argsep + 'db=' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db + argsep + 'db2=p';
  linkRelation += argsep + 'on_delete=' + document.getElementById('on_delete').value + argsep + 'on_update=' + document.getElementById('on_update').value;
  linkRelation += argsep + 'operation=addNewRelation' + argsep + 'ajax_request=true';
  var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strProcessingRequest);
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', linkRelation, function (data) {
    if (data.success === false) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.message);
      DesignerMove.loadPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage);
    }
  }); // end $.post()
};
// -------------------------- create tables -------------------------------------
const startTableNew = function () {
  _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_5__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.set('table', ''));
  (0,_modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_4__["default"])('index.php?route=/table/create');
};
const startTabUpd = function (db, table) {
  _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_5__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.set('db', db));
  _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_5__.Navigation.update(_modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.set('table', table));
  (0,_modules_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_4__["default"])('index.php?route=/table/structure');
};
// --------------------------- hide tables --------------------------------------
// max/min all tables
const smallTabAll = function (idThis) {
  var icon = idThis.children[0];
  var valueSent = '';
  if (icon.alt === 'v') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab .small_tab,.small_tab2').each(function (index, element) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).text() === 'v') {
        DesignerMove.smallTab(jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).attr('table_name'), 0);
      }
    });
    icon.alt = '>';
    icon.src = icon.dataset.right;
    valueSent = 'v';
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.designer_tab .small_tab,.small_tab2').each(function (index, element) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).text() !== 'v') {
        DesignerMove.smallTab(jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).attr('table_name'), 0);
      }
    });
    icon.alt = 'v';
    icon.src = icon.dataset.down;
    valueSent = '>';
  }
  DesignerMove.saveValueInConfig('small_big_all', valueSent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_SB_all').toggleClass('M_butt_Selected_down');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_SB_all').toggleClass('M_butt');
  DesignerMove.reload();
};
// invert max/min all tables
const smallTabInvert = function () {
  for (var key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs) {
    DesignerMove.smallTab(key, 0);
  }
  DesignerMove.reload();
};
const relationLinesInvert = function () {
  showRelationLines = !showRelationLines;
  DesignerMove.saveValueInConfig('relation_lines', showRelationLines);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#relLineInvert').toggleClass('M_butt_Selected_down');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#relLineInvert').toggleClass('M_butt');
  DesignerMove.reload();
};
const smallTabRefresh = function () {
  for (var key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.jTabs) {
    if (document.getElementById('id_hide_tbody_' + key).innerHTML !== 'v') {
      DesignerMove.smallTab(key, 0);
    }
  }
};
const smallTab = function (t, reload) {
  var id = document.getElementById('id_tbody_' + t);
  var idThis = document.getElementById('id_hide_tbody_' + t);
  if (idThis.innerHTML === 'v') {
    // ---CROSS
    id.style.display = 'none';
    idThis.innerHTML = '>';
  } else {
    id.style.display = '';
    idThis.innerHTML = 'v';
  }
  if (reload) {
    DesignerMove.reload();
  }
};
const selectTab = function (t) {
  var idZag = document.getElementById('id_zag_' + t);
  if (idZag.className !== 'tab_zag_3') {
    document.getElementById('id_zag_' + t).className = 'tab_zag_2';
  } else {
    document.getElementById('id_zag_' + t).className = 'tab_zag';
  }
  // ----------
  var idT = document.getElementById(t);
  window.scrollTo(parseInt(idT.style.left, 10) - 300, parseInt(idT.style.top, 10) - 300);
  setTimeout(function () {
    document.getElementById('id_zag_' + t).className = 'tab_zag';
  }, 800);
};
const canvasClick = function (id, event) {
  var n = 0;
  var selected = 0;
  var a = [];
  var Key0;
  var Key1;
  var Key2;
  var Key3;
  var Key;
  var x1;
  var x2;
  var K;
  var key;
  var key2;
  var key3;
  var localX = event.pageX;
  var localY = event.pageY;
  localX -= jquery__WEBPACK_IMPORTED_MODULE_0___default()('#osn_tab').offset().left;
  localY -= jquery__WEBPACK_IMPORTED_MODULE_0___default()('#osn_tab').offset().top;
  DesignerMove.clear();
  var osnTab = document.getElementById('osn_tab');
  for (K in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr) {
    for (key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K]) {
      for (key2 in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key]) {
        for (key3 in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2]) {
          if (!document.getElementById('check_vis_' + key2).checked || !document.getElementById('check_vis_' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]).checked) {
            continue; // if hide
          }
          var x1Left = document.getElementById(key2).offsetLeft + 1; // document.getElementById(key2+"."+key3).offsetLeft;
          var x1Right = x1Left + document.getElementById(key2).offsetWidth;
          var x2Left = document.getElementById(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]).offsetLeft; // +document.getElementById(contr[K][key2][key3][0]+"."+contr[K][key2][key3][1]).offsetLeft
          var x2Right = x2Left + document.getElementById(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]).offsetWidth;
          a[0] = Math.abs(x1Left - x2Left);
          a[1] = Math.abs(x1Left - x2Right);
          a[2] = Math.abs(x1Right - x2Left);
          a[3] = Math.abs(x1Right - x2Right);
          n = sLeft = sRight = 0;
          for (var i = 1; i < 4; i++) {
            if (a[n] > a[i]) {
              n = i;
            }
          }
          if (n === 1) {
            x1 = x1Left - smS;
            x2 = x2Right + smS;
            if (x1 < x2) {
              n = 0;
            }
          }
          if (n === 2) {
            x1 = x1Right + smS;
            x2 = x2Left - smS;
            if (x1 > x2) {
              n = 0;
            }
          }
          if (n === 3) {
            x1 = x1Right + smS;
            x2 = x2Right + smS;
            sRight = 1;
          }
          if (n === 0) {
            x1 = x1Left - smS;
            x2 = x2Left - smS;
            sLeft = 1;
          }
          var y1 = document.getElementById(key2).offsetTop + document.getElementById(key2 + '.' + key3).offsetTop + heightField;
          var y2 = document.getElementById(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]).offsetTop + document.getElementById(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0] + '.' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][1]).offsetTop + heightField;
          if (!selected && localX > x1 - 10 && localX < x1 + 10 && localY > y1 - 7 && localY < y1 + 7) {
            DesignerMove.drawLine0(x1, x2, y1, y2, osnTab, 'rgba(255,0,0,1)');
            selected = 1;
            Key0 = _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0];
            Key1 = _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][1];
            Key2 = key2;
            Key3 = key3;
            Key = K;
          } else {
            DesignerMove.drawLine0(x1, x2, y1, y2, osnTab, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0] + '.' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][1]);
          }
        }
      }
    }
  }
  if (selected) {
    // select relations
    var left = globX - (document.getElementById('layer_upd_relation').offsetWidth >> 1);
    document.getElementById('layer_upd_relation').style.left = left + 'px';
    var top = globY - document.getElementById('layer_upd_relation').offsetHeight - 10;
    document.getElementById('layer_upd_relation').style.top = top + 'px';
    document.getElementById('layer_upd_relation').style.display = 'block';
    var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    linkRelation = 'T1=' + Key0 + argsep + 'F1=' + Key1 + argsep + 'T2=' + Key2 + argsep + 'F2=' + Key3 + argsep + 'K=' + Key;
  }
};
const updRelation = function () {
  document.getElementById('layer_upd_relation').style.display = 'none';
  var argsep = _modules_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
  linkRelation += argsep + 'server=' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.server + argsep + 'db=' + _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.db;
  linkRelation += argsep + 'operation=removeRelation' + argsep + 'ajax_request=true';
  var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.Messages.strProcessingRequest);
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/designer', linkRelation, function (data) {
    if (data.success === false) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.message);
      DesignerMove.loadPage(_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.selectedPage);
    }
  }); // end $.post()
};
const visibleTab = function (id, tN) {
  if (id.checked) {
    document.getElementById(tN).style.display = 'block';
  } else {
    document.getElementById(tN).style.display = 'none';
  }
  DesignerMove.reload();
  DesignerMove.markUnsaved();
};
// max/min all tables
const hideTabAll = function (idThis) {
  if (idThis.alt === 'v') {
    idThis.alt = '>';
    idThis.src = idThis.dataset.right;
  } else {
    idThis.alt = 'v';
    idThis.src = idThis.dataset.down;
  }
  var E = document.getElementById('container-form');
  var EelementsLength = E.elements.length;
  for (var i = 0; i < EelementsLength; i++) {
    if (E.elements[i].type === 'checkbox' && E.elements[i].id.startsWith('check_vis_')) {
      if (idThis.alt === 'v') {
        E.elements[i].checked = true;
        document.getElementById(E.elements[i].value).style.display = '';
      } else {
        E.elements[i].checked = false;
        document.getElementById(E.elements[i].value).style.display = 'none';
      }
    }
  }
  DesignerMove.reload();
};
const inArrayK = function (x, m) {
  var b = 0;
  for (var u in m) {
    if (x === u) {
      b = 1;
      break;
    }
  }
  return b;
};
const noHaveConstr = function (idThis) {
  var a = [];
  var K;
  var key;
  var key2;
  var key3;
  for (K in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr) {
    for (key in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K]) {
      // contr name
      for (key2 in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key]) {
        // table name
        for (key3 in _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2]) {
          // field name
          a[key2] = a[_config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.contr[K][key][key2][key3][0]] = 1; // exist constr
        }
      }
    }
  }
  if (idThis.alt === 'v') {
    idThis.alt = '>';
    idThis.src = idThis.dataset.right;
  } else {
    idThis.alt = 'v';
    idThis.src = idThis.dataset.down;
  }
  var E = document.getElementById('container-form');
  var EelementsLength = E.elements.length;
  for (var i = 0; i < EelementsLength; i++) {
    if (E.elements[i].type === 'checkbox' && E.elements[i].id.startsWith('check_vis_')) {
      if (!DesignerMove.inArrayK(E.elements[i].value, a)) {
        if (idThis.alt === 'v') {
          E.elements[i].checked = true;
          document.getElementById(E.elements[i].value).style.display = '';
        } else {
          E.elements[i].checked = false;
          document.getElementById(E.elements[i].value).style.display = 'none';
        }
      }
    }
  }
};
// max/min all tables
const showLeftMenu = function (idThis) {
  var icon = idThis.children[0];
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_Show_left_menu').toggleClass('M_butt_Selected_down');
  if (icon.alt === 'v') {
    document.getElementById('layer_menu').style.top = '0px';
    document.getElementById('layer_menu').style.display = 'block';
    icon.alt = '>';
    icon.src = icon.dataset.up;
  } else {
    document.getElementById('layer_menu').style.top = -1000 + 'px'; // fast scroll
    document.getElementById('layer_menu').style.display = 'none';
    icon.alt = 'v';
    icon.src = icon.dataset.down;
  }
};
const sideMenuRight = function (idThis) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#side_menu').toggleClass('right');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#layer_menu').toggleClass('float-start');
  var moveMenuIcon = jquery__WEBPACK_IMPORTED_MODULE_0___default()(idThis.getElementsByTagName('img')[0]);
  var resizeIcon = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#layer_menu_sizer > img').toggleClass('float-start').toggleClass('float-end');
  var srcResizeIcon = resizeIcon.attr('src');
  resizeIcon.attr('src', resizeIcon.attr('data-right'));
  resizeIcon.attr('data-right', srcResizeIcon);
  var srcMoveIcon = moveMenuIcon.attr('src');
  moveMenuIcon.attr('src', moveMenuIcon.attr('data-right'));
  moveMenuIcon.attr('data-right', srcMoveIcon);
  menuMoved = !menuMoved;
  DesignerMove.saveValueInConfig('side_menu', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#side_menu').hasClass('right'));
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_Left_Right').toggleClass('M_butt_Selected_down');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#key_Left_Right').toggleClass('M_butt');
};
const showText = function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#side_menu').find('.hidable').show();
};
const hideText = function () {
  if (!alwaysShowText) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#side_menu').find('.hidable').hide();
  }
};
const pinText = function () {
  alwaysShowText = !alwaysShowText;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pin_Text').toggleClass('M_butt_Selected_down');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pin_Text').toggleClass('M_butt');
  DesignerMove.saveValueInConfig('pin_text', alwaysShowText);
};
const startDisplayField = function () {
  if (onRelation) {
    return;
  }
  if (!onDisplayField) {
    onDisplayField = 1;
    document.getElementById('designer_hint').innerHTML = window.Messages.strChangeDisplay;
    document.getElementById('designer_hint').style.display = 'block';
    document.getElementById('display_field_button').className = 'M_butt_Selected_down';
  } else {
    document.getElementById('designer_hint').innerHTML = '';
    document.getElementById('designer_hint').style.display = 'none';
    document.getElementById('display_field_button').className = 'M_butt';
    onDisplayField = 0;
  }
};
var TargetColors = [];
const getColorByTarget = function (target) {
  var color = ''; // "rgba(0,100,150,1)";
  for (var targetColor in TargetColors) {
    if (TargetColors[targetColor][0] === target) {
      color = TargetColors[targetColor][1];
      break;
    }
  }
  if (color.length === 0) {
    var i = TargetColors.length + 1;
    var d = i % 6;
    var j = (i - d) / 6;
    j = j % 4;
    j++;
    var colorCase = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1]];
    var a = colorCase[d][0];
    var b = colorCase[d][1];
    var c = colorCase[d][2];
    var e = 1 - (j - 1) / 6;
    var r = Math.round(a * 200 * e);
    var g = Math.round(b * 200 * e);
    b = Math.round(c * 200 * e);
    color = 'rgba(' + r + ',' + g + ',' + b + ',1)';
    TargetColors.push([target, color]);
  }
  return color;
};
const clickOption = function (dbName, tableName, columnName, tableDbNameUrl, optionColNameString) {
  var designerOptions = document.getElementById('designer_optionse');
  var left = globX - (designerOptions.offsetWidth >> 1);
  designerOptions.style.left = left + 'px';
  // var top = Glob_Y - designerOptions.offsetHeight - 10;
  designerOptions.style.top = screen.height / 4 + 'px';
  designerOptions.style.display = 'block';
  document.getElementById('ok_add_object_db_and_table_name_url').value = tableDbNameUrl;
  document.getElementById('ok_add_object_db_name').value = dbName;
  document.getElementById('ok_add_object_table_name').value = tableName;
  document.getElementById('ok_add_object_col_name').value = columnName;
  document.getElementById('option_col_name').innerHTML = optionColNameString;
};
const closeOption = function () {
  document.getElementById('designer_optionse').style.display = 'none';
  document.getElementById('rel_opt').value = '--';
  document.getElementById('Query').value = '';
  document.getElementById('new_name').value = '';
  document.getElementById('operator').value = '---';
  document.getElementById('groupby').checked = false;
  document.getElementById('h_rel_opt').value = '--';
  document.getElementById('h_operator').value = '---';
  document.getElementById('having').value = '';
  document.getElementById('orderby').value = '---';
};
const selectAll = function (tableName, dbName, idSelectAll) {
  var parentIsChecked = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + idSelectAll).is(':checked');
  var checkboxAll = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#container-form input[id_check_all=\'' + idSelectAll + '\']:checkbox');
  checkboxAll.each(function () {
    // already checked and then check parent
    if (parentIsChecked === true && this.checked) {
      // was checked, removing column from selected fields
      // trigger unchecked event
      this.click();
    }
    this.checked = parentIsChecked;
    this.disabled = parentIsChecked;
  });
  if (parentIsChecked) {
    _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.selectField.push('`' + tableName + '`.*');
    window.fromArray.push(tableName);
  } else {
    var i;
    for (i = 0; i < _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.selectField.length; i++) {
      if (_history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.selectField[i] === '`' + tableName + '`.*') {
        _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.selectField.splice(i, 1);
      }
    }
    var k;
    for (k = 0; k < window.fromArray.length; k++) {
      if (window.fromArray[k] === tableName) {
        window.fromArray.splice(k, 1);
        break;
      }
    }
  }
  DesignerMove.reload();
};
const tableOnOver = function (idThis, val, buil) {
  var builLocal = parseInt(buil);
  if (!val) {
    document.getElementById('id_zag_' + idThis).className = 'tab_zag_2';
    if (builLocal) {
      document.getElementById('id_zag_' + idThis + '_2').className = 'tab_zag_2';
    }
  } else {
    document.getElementById('id_zag_' + idThis).className = 'tab_zag';
    if (builLocal) {
      document.getElementById('id_zag_' + idThis + '_2').className = 'tab_zag';
    }
  }
};
/**
 * This function stores selected column information in DesignerHistory.selectField[]
 * In case column is checked it add else it deletes
 *
 * @param {string} tableName
 * @param {string} colName
 * @param {string} checkboxId
 */
const storeColumn = function (tableName, colName, checkboxId) {
  var i;
  var k;
  var selectKeyField = '`' + tableName + '`.`' + colName + '`';
  if (document.getElementById(checkboxId).checked === true) {
    _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.selectField.push(selectKeyField);
    window.fromArray.push(tableName);
  } else {
    for (i = 0; i < _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.selectField.length; i++) {
      if (_history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.selectField[i] === selectKeyField) {
        _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.selectField.splice(i, 1);
        break;
      }
    }
    for (k = 0; k < window.fromArray.length; k++) {
      if (window.fromArray[k] === tableName) {
        window.fromArray.splice(k, 1);
        break;
      }
    }
  }
};
/**
 * This function builds object and adds them to DesignerHistory.historyArray
 * first it does a few checks on each object, then makes an object(where,rename,groupby,aggregate,orderby)
 * then a new history object is made and finally all these history objects are added to DesignerHistory.historyArray[]
 *
 * @param {string} dbName
 * @param {string} tableName
 * @param {string} colName
 * @param {string} dbTableNameUrl
 */
const addObject = function (dbName, tableName, colName, dbTableNameUrl) {
  var p;
  var whereObj;
  var rel = document.getElementById('rel_opt');
  var sum = 0;
  var init = _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.historyArray.length;
  if (rel.value !== '--') {
    if (document.getElementById('Query').value === '') {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.sprintf(window.Messages.strQueryEmpty));
      return;
    }
    p = document.getElementById('Query');
    whereObj = new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.Where(rel.value, p.value); // make where object
    _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.historyArray.push(new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.HistoryObj(colName, whereObj, tableName, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.hTabs[dbTableNameUrl], 'Where'));
    sum = sum + 1;
  }
  if (document.getElementById('new_name').value !== '') {
    var renameObj = new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.Rename(document.getElementById('new_name').value); // make Rename object
    _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.historyArray.push(new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.HistoryObj(colName, renameObj, tableName, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.hTabs[dbTableNameUrl], 'Rename'));
    sum = sum + 1;
  }
  if (document.getElementById('operator').value !== '---') {
    var aggregateObj = new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.Aggregate(document.getElementById('operator').value);
    _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.historyArray.push(new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.HistoryObj(colName, aggregateObj, tableName, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.hTabs[dbTableNameUrl], 'Aggregate'));
    sum = sum + 1;
    // make aggregate operator
  }
  if (document.getElementById('groupby').checked === true) {
    _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.historyArray.push(new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.HistoryObj(colName, 'GroupBy', tableName, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.hTabs[dbTableNameUrl], 'GroupBy'));
    sum = sum + 1;
    // make groupby
  }
  if (document.getElementById('h_rel_opt').value !== '--') {
    if (document.getElementById('having').value === '') {
      return;
    }
    whereObj = new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.Having(document.getElementById('h_rel_opt').value, document.getElementById('having').value, document.getElementById('h_operator').value); // make where object
    _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.historyArray.push(new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.HistoryObj(colName, whereObj, tableName, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.hTabs[dbTableNameUrl], 'Having'));
    sum = sum + 1;
    // make having
  }
  if (document.getElementById('orderby').value !== '---') {
    var orderByObj = new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.OrderBy(document.getElementById('orderby').value);
    _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.historyArray.push(new _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.HistoryObj(colName, orderByObj, tableName, _config_ts__WEBPACK_IMPORTED_MODULE_9__.DesignerConfig.hTabs[dbTableNameUrl], 'OrderBy'));
    sum = sum + 1;
    // make orderby
  }
  (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(window.sprintf(window.Messages.strObjectsCreated, sum));
  // output sum new objects created
  var existingDiv = document.getElementById('ab');
  existingDiv.innerHTML = _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.display(init, _history_ts__WEBPACK_IMPORTED_MODULE_7__.DesignerHistory.historyArray.length);
  DesignerMove.closeOption();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ab').accordion('refresh');
};
const enablePageContentEvents = function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mousedown');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mouseup');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mousemove');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousedown', function (e) {
    DesignerMove.mouseDown(e);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseup', function () {
    DesignerMove.mouseUp();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousemove', function (e) {
    DesignerMove.mouseMove(e);
  });
};
/**
 * This function enables the events on table items.
 * It helps to enable them on page loading and when a table is added on the fly.
 * @param {number} index
 * @param {object} element
 */
const enableTableEvents = function (index, element) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).on('click', '.select_all_1', function () {
    DesignerMove.selectAll(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('db_name'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).on('click', '.small_tab,.small_tab2', function () {
    DesignerMove.smallTab(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name'), 1);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).on('click', '.small_tab_pref_1', function () {
    DesignerMove.startTabUpd(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('db_url'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name_url'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).on('click', '.select_all_store_col', function () {
    DesignerMove.storeColumn(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('col_name'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).on('click', '.small_tab_pref_click_opt', function () {
    DesignerMove.clickOption(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('db_name'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('col_name'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('db_table_name_url'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('option_col_name_modal'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).on('click', '.tab_field_2,.tab_field_3,.tab_field', function () {
    var params = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('click_field_param').split(',');
    DesignerMove.clickField(params[3], params[0], params[1], params[2]);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).find('.tab_zag_noquery').on('mouseover', function () {
    DesignerMove.tableOnOver(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name'), 0, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('query_set'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).find('.tab_zag_noquery').on('mouseout', function () {
    DesignerMove.tableOnOver(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name'), 1, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('query_set'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).find('.tab_zag_query').on('mouseover', function () {
    DesignerMove.tableOnOver(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name'), 0, 1);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).find('.tab_zag_query').on('mouseout', function () {
    DesignerMove.tableOnOver(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('table_name'), 1, 1);
  });
  DesignerMove.enablePageContentEvents();
};
const DesignerMove = {
  markSaved: markSaved,
  markUnsaved: markUnsaved,
  mouseDown: mouseDown,
  mouseMove: mouseMove,
  mouseUp: mouseUp,
  canvasPos: canvasPos,
  osnTabPos: osnTabPos,
  setDefaultValuesFromSavedState: setDefaultValuesFromSavedState,
  main: main,
  resizeOsnTab: resizeOsnTab,
  drawLine0: drawLine0,
  reload: reload,
  line: line,
  line0: line0,
  line2: line2,
  line3: line3,
  circle: circle,
  clear: clear,
  rect: rect,
  toggleFullscreen: toggleFullscreen,
  addTableToTablesList: addTableToTablesList,
  displayModal: displayModal,
  addOtherDbTables: addOtherDbTables,
  new: newPage,
  save: save,
  getUrlPos: getUrlPos,
  save2: save2,
  submitSaveDialogAndClose: submitSaveDialogAndClose,
  save3: save3,
  editPages: editPages,
  deletePages: deletePages,
  saveAs: saveAs,
  promptToSaveCurrentPage: promptToSaveCurrentPage,
  exportPages: exportPages,
  loadPage: loadPage,
  grid: grid,
  angularDirect: angularDirect,
  saveValueInConfig: saveValueInConfig,
  startRelation: startRelation,
  clickField: clickTableField,
  newRelation: newRelation,
  startTableNew: startTableNew,
  startTabUpd: startTabUpd,
  smallTabAll: smallTabAll,
  smallTabInvert: smallTabInvert,
  relationLinesInvert: relationLinesInvert,
  smallTabRefresh: smallTabRefresh,
  smallTab: smallTab,
  selectTab: selectTab,
  canvasClick: canvasClick,
  updRelation: updRelation,
  visibleTab: visibleTab,
  hideTabAll: hideTabAll,
  inArrayK: inArrayK,
  noHaveConstr: noHaveConstr,
  showLeftMenu: showLeftMenu,
  sideMenuRight: sideMenuRight,
  showText: showText,
  hideText: hideText,
  pinText: pinText,
  startDisplayField: startDisplayField,
  getColorByTarget: getColorByTarget,
  clickOption: clickOption,
  closeOption: closeOption,
  selectAll: selectAll,
  tableOnOver: tableOnOver,
  storeColumn: storeColumn,
  addObject: addObject,
  enablePageContentEvents: enablePageContentEvents,
  enableTableEvents: enableTableEvents
};


/***/ }),

/***/ 42:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignerObjects: function() { return /* binding */ DesignerObjects; }
/* harmony export */ });
var DesignerObjects = {
  PdfPage: function (dbName, pageDescr, tblCords) {
    // no dot set the auto increment before put() in the database
    // issue #12900
    // eslint-disable-next-line no-unused-vars
    var pgNr;
    this.dbName = dbName;
    this.pageDescr = pageDescr;
    this.tblCords = tblCords;
  },
  TableCoordinate: function (dbName, tableName, pdfPgNr, x, y) {
    // no dot set the auto increment before put() in the database
    // issue #12900
    // var id;
    this.dbName = dbName;
    this.tableName = tableName;
    this.pdfPgNr = pdfPgNr;
    this.x = x;
    this.y = y;
  }
};


/***/ }),

/***/ 43:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DesignerPage: function() { return /* binding */ DesignerPage; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _config_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _database_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(38);
/* harmony import */ var _move_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41);
/* harmony import */ var _objects_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(42);







function showTablesInLandingPage(db) {
  DesignerPage.loadFirstPage(db, function (page) {
    if (page) {
      DesignerPage.loadHtmlForPage(page.pgNr);
      _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.selectedPage = page.pgNr;
    } else {
      DesignerPage.showNewPageTables(true);
    }
  });
}
function saveToNewPage(db, pageName, tablePositions, callback) {
  DesignerPage.createNewPage(db, pageName, function (page) {
    if (page) {
      var tblCords = [];
      var saveCallback = function (id) {
        tblCords.push(id);
        if (tablePositions.length === tblCords.length) {
          page.tblCords = tblCords;
          _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.addObject('pdf_pages', page);
        }
      };
      for (var pos = 0; pos < tablePositions.length; pos++) {
        tablePositions[pos].pdfPgNr = page.pgNr;
        DesignerPage.saveTablePositions(tablePositions[pos], saveCallback);
      }
      if (typeof callback !== 'undefined') {
        callback(page);
      }
    }
  });
}
function saveToSelectedPage(db, pageId, pageName, tablePositions, callback) {
  DesignerPage.deletePage(pageId);
  DesignerPage.saveToNewPage(db, pageName, tablePositions, function (page) {
    if (typeof callback !== 'undefined') {
      callback(page);
    }
    _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.selectedPage = page.pgNr;
  });
}
function createNewPage(db, pageName, callback) {
  var newPage = new _objects_ts__WEBPACK_IMPORTED_MODULE_6__.DesignerObjects.PdfPage(db, pageName, []);
  _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.addObject('pdf_pages', newPage, function (pgNr) {
    newPage.pgNr = pgNr;
    if (typeof callback !== 'undefined') {
      callback(newPage);
    }
  });
}
function saveTablePositions(positions, callback) {
  _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.addObject('table_coords', positions, callback);
}
function createPageList(db, callback) {
  _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.loadAllObjects('pdf_pages', function (pages) {
    var html = '';
    for (var p = 0; p < pages.length; p++) {
      var page = pages[p];
      if (page.dbName === db) {
        html += '<option value="' + page.pgNr + '">';
        html += (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_2__.escapeHtml)(page.pageDescr) + '</option>';
      }
    }
    if (typeof callback !== 'undefined') {
      callback(html);
    }
  });
}
function deletePage(pageId) {
  let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.loadObject('pdf_pages', pageId, function (page) {
    if (page) {
      for (var i = 0; i < page.tblCords.length; i++) {
        _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.deleteObject('table_coords', page.tblCords[i]);
      }
      _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.deleteObject('pdf_pages', pageId, callback);
    }
  });
}
function loadFirstPage(db, callback) {
  _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.loadAllObjects('pdf_pages', function (pages) {
    var firstPage = null;
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      if (page.dbName === db) {
        // give preference to a page having same name as the db
        if (page.pageDescr === db) {
          callback(page);
          return;
        }
        if (firstPage === null) {
          firstPage = page;
        }
      }
    }
    callback(firstPage);
  });
}
function showNewPageTables(check) {
  var allTables = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#id_scroll_tab').find('td input:checkbox');
  allTables.prop('checked', check);
  for (var tab = 0; tab < allTables.length; tab++) {
    var input = allTables[tab];
    if (input.value) {
      var element = document.getElementById(input.value);
      element.style.top = DesignerPage.getRandom(550, 20) + 'px';
      element.style.left = DesignerPage.getRandom(700, 20) + 'px';
      _move_ts__WEBPACK_IMPORTED_MODULE_5__.DesignerMove.visibleTab(input, input.value);
    }
  }
  _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.selectedPage = -1;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_name').text(window.Messages.strUntitled);
  _move_ts__WEBPACK_IMPORTED_MODULE_5__.DesignerMove.markUnsaved();
}
function loadHtmlForPage(pageId) {
  DesignerPage.showNewPageTables(true);
  DesignerPage.loadPageObjects(pageId, function (page, tblCords) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#name-panel').find('#page_name').text(page.pageDescr);
    var tableMissing = false;
    for (var t = 0; t < tblCords.length; t++) {
      var tbId = _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.db + '.' + tblCords[t].tableName;
      var table = document.getElementById(tbId);
      if (table === null) {
        tableMissing = true;
        continue;
      }
      table.style.top = tblCords[t].y + 'px';
      table.style.left = tblCords[t].x + 'px';
      var checkbox = document.getElementById('check_vis_' + tbId);
      checkbox.checked = true;
      _move_ts__WEBPACK_IMPORTED_MODULE_5__.DesignerMove.visibleTab(checkbox, checkbox.value);
    }
    _move_ts__WEBPACK_IMPORTED_MODULE_5__.DesignerMove.markSaved();
    if (tableMissing === true) {
      _move_ts__WEBPACK_IMPORTED_MODULE_5__.DesignerMove.markUnsaved();
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)(window.Messages.strSavedPageTableMissing);
    }
    _config_ts__WEBPACK_IMPORTED_MODULE_3__.DesignerConfig.selectedPage = page.pgNr;
  });
}
function loadPageObjects(pageId, callback) {
  _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.loadObject('pdf_pages', pageId, function (page) {
    var tblCords = [];
    var count = page.tblCords.length;
    for (var i = 0; i < count; i++) {
      _database_ts__WEBPACK_IMPORTED_MODULE_4__.DesignerOfflineDB.loadObject('table_coords', page.tblCords[i], function (tblCord) {
        tblCords.push(tblCord);
        if (tblCords.length === count) {
          if (typeof callback !== 'undefined') {
            callback(page, tblCords);
          }
        }
      });
    }
  });
}
function getRandom(max, min) {
  var val = Math.random() * (max - min) + min;
  return Math.floor(val);
}
const DesignerPage = {
  showTablesInLandingPage: showTablesInLandingPage,
  saveToNewPage: saveToNewPage,
  saveToSelectedPage: saveToSelectedPage,
  createNewPage: createNewPage,
  saveTablePositions: saveTablePositions,
  createPageList: createPageList,
  deletePage: deletePage,
  loadFirstPage: loadFirstPage,
  showNewPageTables: showNewPageTables,
  loadHtmlForPage: loadHtmlForPage,
  loadPageObjects: loadPageObjects,
  getRandom: getRandom
};


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(37); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=init.js.map