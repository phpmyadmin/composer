"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[15],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 37:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

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
  var designerDB = {};
  /**
   * @type {IDBDatabase|null}
   */

  var datastore = null;
  /**
   * @param {String} table
   * @return {IDBTransaction}
   */

  designerDB.getTransaction = function (table) {
    return datastore.transaction([table], 'readwrite');
  };
  /**
   * @param {String} table
   * @return {IDBObjectStore}
   */


  designerDB.getObjectStore = function (table) {
    var transaction = designerDB.getTransaction(table);
    var objStore = transaction.objectStore(table);
    return objStore;
  };
  /**
   * @param {IDBTransaction} transaction
   * @param {String} table
   * @return {IDBObjectStore}
   */


  designerDB.getCursorRequest = function (transaction, table) {
    var objStore = transaction.objectStore(table);
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);
    return cursorRequest;
  };
  /**
   * @param {Function} callback
   * @return {void}
   */


  designerDB.open = function (callback) {
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
      (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
    };
  };
  /**
   * @param {String} table
   * @param {String} id
   * @param {Function} callback
   * @return {void}
   */


  designerDB.loadObject = function (table, id, callback) {
    if (datastore === null) {
      (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
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
   * @param {String} table
   * @param {Function} callback
   * @return {void}
   */


  designerDB.loadAllObjects = function (table, callback) {
    if (datastore === null) {
      (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
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
   * @param {String} table
   * @param {Function} callback
   * @return {void}
   */


  designerDB.loadFirstObject = function (table, callback) {
    if (datastore === null) {
      (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
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
   * @param {String} table
   * @param {Object} obj
   * @param {Function} callback
   * @return {void}
   */


  designerDB.addObject = function (table, obj, callback) {
    if (datastore === null) {
      (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
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
   * @param {String} table
   * @param {String} id
   * @param {Function} callback
   * @return {void}
   */


  designerDB.deleteObject = function (table, id, callback) {
    if (datastore === null) {
      (0,_modules_ajax_message_js__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strIndexedDBNotWorking, null, 'error');
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
   * @return {void}
   */


  designerDB.onerror = function (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }; // Export the designerDB object.


  return designerDB;
}();

window.DesignerOfflineDB = DesignerOfflineDB;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [49], function() { return __webpack_exec__(37); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=database.js.map