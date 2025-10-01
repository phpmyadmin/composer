"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["import"],{

/***/ "./resources/js/import.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/functions.ts");
/* harmony import */ var _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/navigation.ts");
/* harmony import */ var _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/js/modules/ajax-message.ts");






/**
 * Functions used in the import tab
 *
 */
/**
 * Toggles the hiding and showing of each plugin's options
 * according to the currently selected plugin from the dropdown list
 */
function changePluginOpts() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#format_specific_opts').find('div.format_specific_options').each(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hide();
  });
  var selectedPluginName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').find('option:selected').val();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + selectedPluginName + '_options').fadeIn('slow');
  const importNotification = document.getElementById('import_notification');
  if (importNotification) {
    importNotification.innerText = '';
    if (selectedPluginName === 'csv') {
      importNotification.innerHTML = '<div class="alert alert-info mb-0 mt-3" role="alert">' + window.Messages.strImportCSV + '</div>';
    }
  }
}
/**
 * Toggles the hiding and showing of each plugin's options and sets the selected value
 * in the plugin dropdown list according to the format of the selected file
 *
 * @param {string} fname
 */
function matchFile(fname) {
  var fnameArray = fname.toLowerCase().split('.');
  var len = fnameArray.length;
  if (len !== 0) {
    var extension = fnameArray[len - 1];
    if (extension === 'gz' || extension === 'bz2' || extension === 'zip') {
      len--;
    }
    // Only toggle if the format of the file can be imported
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=\'format\'] option').filterByValue(fnameArray[len - 1]).length === 1) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=\'format\'] option').filterByValue(fnameArray[len - 1]).prop('selected', true);
      changePluginOpts();
    }
  }
}
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('import.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_import_file').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_local_import_file').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_import_file').off('change').off('focus');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_local_import_file').off('focus');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_csv_enclosed').add('#text_csv_escaped').off('keyup');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#importmain #buttonGo').off('click');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('import.js', function () {
  // import_file_form validation.
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', '#import_file_form', function () {
    var radioLocalImport = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#localFileTab');
    var radioImport = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#uploadFileTab');
    var fileMsg = '<div class="alert alert-danger" role="alert"><img src="themes/dot.gif" title="" alt="" class="icon ic_s_error"> ' + window.Messages.strImportDialogMessage + '</div>';
    var wrongTblNameMsg = '<div class="alert alert-danger" role="alert"><img src="themes/dot.gif" title="" alt="" class="icon ic_s_error">' + window.Messages.strTableNameDialogMessage + '</div>';
    var wrongDBNameMsg = '<div class="alert alert-danger" role="alert"><img src="themes/dot.gif" title="" alt="" class="icon ic_s_error">' + window.Messages.strDBNameDialogMessage + '</div>';
    if (radioLocalImport.length !== 0) {
      // remote upload.
      if (radioImport.hasClass('active') && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_import_file').val() === '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_import_file').trigger('focus');
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(fileMsg, false);
        return false;
      }
      if (radioLocalImport.hasClass('active')) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_local_import_file').length === 0) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)('<div class="alert alert-danger" role="alert"><img src="themes/dot.gif" title="" alt="" class="icon ic_s_error"> ' + window.Messages.strNoImportFile + ' </div>', false);
          return false;
        }
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_local_import_file').val() === '') {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_local_import_file').trigger('focus');
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(fileMsg, false);
          return false;
        }
      }
    } else {
      // local upload.
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_import_file').val() === '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_import_file').trigger('focus');
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(fileMsg, false);
        return false;
      }
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_csv_new_tbl_name').length > 0) {
        var newTblName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_csv_new_tbl_name').val();
        if (newTblName.length > 0 && newTblName.trim().length === 0) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(wrongTblNameMsg, false);
          return false;
        }
      }
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_csv_new_db_name').length > 0) {
        var newDBName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_csv_new_db_name').val();
        if (newDBName.length > 0 && newDBName.trim().length === 0) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(wrongDBNameMsg, false);
          return false;
        }
      }
    }
    // show progress bar.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#upload_form_status').css('display', 'inline');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#upload_form_status_info').css('display', 'inline');
  });
  // Initially display the options for the selected plugin
  changePluginOpts();
  // Whenever the selected plugin changes, change the options displayed
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').on('change', function () {
    changePluginOpts();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_import_file').on('change', function () {
    matchFile(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_local_import_file').on('change', function () {
    matchFile(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
  });
  /**
   * Set up the interface for Javascript-enabled browsers since the default is for
   *  Javascript-disabled browsers
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#format_specific_opts').find('div.format_specific_options').find('h3').remove();
  // $("form[name=import] *").unwrap();
  /**
   * for input element text_csv_enclosed and text_csv_escaped allow just one character to enter.
   * as mysql allows just one character for these fields,
   * if first character is escape then allow two including escape character.
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_csv_enclosed').add('#text_csv_escaped').on('keyup', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val().length === 2 && jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val().charAt(0) !== '\\') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val().substring(0, 1));
      return false;
    }
    return true;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#importmain #buttonGo').on('click', function () {
    const uploadProgressInfo = document.getElementById('upload_progress_info');
    const uploadId = uploadProgressInfo.dataset.uploadId;
    const handler = uploadProgressInfo.dataset.handler;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#upload_form_form').css('display', 'none');
    const clockImage = '<img src="' + window.themeImagePath + 'ajax_clock_small.gif" width="16" height="16" alt="ajax clock">';
    if (handler !== 'PhpMyAdmin\\Plugins\\Import\\Upload\\UploadNoplugin') {
      var finished = false;
      var percent = 0.0;
      var total = 0;
      var complete = 0;
      var originalTitle = parent && parent.document ? parent.document.title : false;
      var importStart;
      var performUpload = function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON('index.php?route=/import-status', {
          'id': uploadId,
          'import_status': 1,
          'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server')
        }, function (response) {
          finished = response.finished;
          percent = response.percent;
          total = response.total;
          complete = response.complete;
          if (total === 0 && complete === 0 && percent === 0) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#upload_form_status_info').html(clockImage + ' ' + window.Messages.uploadProgressMaximumAllowedSize);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#upload_form_status').css('display', 'none');
          } else {
            var nowDate = new Date();
            const now = Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), nowDate.getMinutes(), nowDate.getSeconds()) + nowDate.getMilliseconds() - 1000;
            var statusText = window.sprintf(window.Messages.uploadProgressStatusText, (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.formatBytes)(complete, 1, window.Messages.strDecimalSeparator), (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.formatBytes)(total, 1, window.Messages.strDecimalSeparator));
            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#importmain').is(':visible')) {
              // Show progress UI
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#importmain').hide();
              const uploadProgressDiv = '<div class="upload_progress">' + '<div class="upload_progress_bar_outer">' + '<div class="percentage"></div>' + '<div id="status" class="upload_progress_bar_inner">' + '<div class="percentage"></div></div></div>' + '<div>' + clockImage + ' ' + window.Messages.uploadProgressUploading + '</div>' + '<div id="statustext"></div></div>';
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#import_form_status').html(uploadProgressDiv).show();
              importStart = now;
            } else if (percent > 9 || complete > 2000000) {
              // Calculate estimated time
              var usedTime = now - importStart;
              var seconds = parseInt(((total - complete) / complete * usedTime / 1000).toString());
              var speed = window.sprintf(window.Messages.uploadProgressPerSecond, (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.formatBytes)(complete / usedTime * 1000, 1, window.Messages.strDecimalSeparator));
              var minutes = parseInt((seconds / 60).toString());
              seconds %= 60;
              var estimatedTime;
              if (minutes > 0) {
                estimatedTime = window.Messages.uploadProgressRemainingMin.replace('%MIN', minutes.toString()).replace('%SEC', seconds.toString());
              } else {
                estimatedTime = window.Messages.uploadProgressRemainingSec.replace('%SEC', seconds.toString());
              }
              statusText += '<br>' + speed + '<br><br>' + estimatedTime;
            }
            var percentString = Math.round(percent) + '%';
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#status').animate({
              width: percentString
            }, 150);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.percentage').text(percentString);
            // Show percent in window title
            if (originalTitle !== false) {
              parent.document.title = percentString + ' - ' + originalTitle;
            } else {
              document.title = percentString + ' - ' + originalTitle;
            }
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#statustext').html(statusText);
          }
          if (finished) {
            if (originalTitle !== false) {
              // @ts-ignore
              parent.document.title = originalTitle;
            } else {
              // @ts-ignore
              document.title = originalTitle;
            }
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#importmain').hide();
            // Loads the message, either success or mysql error
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#import_form_status').html(clockImage + ' ' + window.Messages.uploadProgressBeingProcessed).show();
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#import_form_status').load('index.php?route=/import-status&message=1&import_status=1&server=' + _modules_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server'));
            _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
          } else {
            setTimeout(performUpload, 1000);
          }
        });
      };
      setTimeout(performUpload, 1000);
    } else {
      // No plugin available
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#upload_form_status_info').html(clockImage + ' ' + window.Messages.uploadProgressNoDetails);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#upload_form_status').css('display', 'none');
    }
  });
});

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/import.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=import.js.map