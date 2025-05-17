"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[7],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 33:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);






_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('database/routines.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.ajax.add_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.ajax.edit_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.ajax.exec_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.ajax.export_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#bulkActionExportButton');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.ajax.drop_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#bulkActionDropButton');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'select[name=item_type]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'select[name^=item_param_type]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'select[name=item_returntype]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#addRoutineParameterButton');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.routine_param_remove_anchor');
});
const DatabaseRoutines = {
  /**
   * @var {string} paramTemplate Template for a row in the routine editor
   */
  paramTemplate: '',
  /**
   * @var syntaxHiglighter Reference to the codemirror editor
   */
  syntaxHiglighter: null,
  /**
   * Validate editor form fields.
   *
   * @return {boolean}
   */
  validate: function () {
    /**
     * @var $elm a jQuery object containing the reference
     *           to an element that is being validated
     */
    var $elm = null;
    // Common validation. At the very least the name
    // and the definition must be provided for an item
    $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.rte_table').last().find('input[name=item_name]');
    if ($elm.val() === '') {
      $elm.trigger('focus');
      alert(window.Messages.strFormEmpty);
      return false;
    }
    $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.rte_table').find('textarea[name=item_definition]');
    if ($elm.val() === '') {
      if (this.syntaxHiglighter !== null) {
        this.syntaxHiglighter.focus();
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea[name=item_definition]').last().trigger('focus');
      }
      alert(window.Messages.strFormEmpty);
      return false;
    }
    // The validation has so far passed, so now
    // we can validate item-specific fields.
    return this.validateCustom();
  },
  exportDialog: function ($this) {
    var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
    if ($this.attr('id') === 'bulkActionExportButton') {
      var combined = {
        success: true,
        title: window.Messages.strExport,
        message: '',
        error: ''
      };
      // export anchors of all selected rows
      var exportAnchors = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input.checkall:checked').parents('tr').find('.export_anchor');
      var count = exportAnchors.length;
      var returnCount = 0;
      // No routine is exportable (due to privilege issues)
      if (count === 0) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.NoExportable);
      }
      var p = jquery__WEBPACK_IMPORTED_MODULE_0___default().when();
      exportAnchors.each(function () {
        var h = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href');
        p = p.then(function () {
          return jquery__WEBPACK_IMPORTED_MODULE_0___default().get(h, {
            'ajax_request': true
          }, function (data) {
            returnCount++;
            if (data.success === true) {
              combined.message += '\n' + data.message + '\n';
              if (returnCount === count) {
                showExport(combined);
              }
            } else {
              // complain even if one export is failing
              combined.success = false;
              combined.error += '\n' + data.error + '\n';
              if (returnCount === count) {
                showExport(combined);
              }
            }
          });
        });
      });
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().get($this.attr('href'), {
        'ajax_request': true
      }, showExport);
    }
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
    function showExport(data) {
      if (data.success !== true) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
        return;
      }
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
      const routinesExportTextarea = '<textarea id="routinesExportTextarea" cols="40" rows="15" class="form-control" aria-label="' + window.Messages.strRoutine + '"></textarea>';
      const routinesExportModal = document.getElementById('routinesExportModal');
      routinesExportModal.addEventListener('shown.bs.modal', function () {
        routinesExportModal.querySelector('.modal-title').textContent = data.title;
        routinesExportModal.querySelector('.modal-body').innerHTML = routinesExportTextarea;
        document.getElementById('routinesExportTextarea').textContent = data.message;
        (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getSqlEditor)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#routinesExportTextarea'));
      });
      routinesExportModal.addEventListener('hidden.bs.modal', function () {
        routinesExportModal.querySelector('.modal-body').innerHTML = routinesExportTextarea;
      });
      window.bootstrap.Modal.getOrCreateInstance(routinesExportModal).show();
    }
  },
  editorDialog: function (isNew, $this) {
    var that = this;
    /**
     * @var $edit_row jQuery object containing the reference to
     *                the row of the the item being edited
     *                from the list of items
     */
    var $editRow = null;
    if ($this.hasClass('edit_anchor')) {
      // Remember the row of the item being edited for later,
      // so that if the edit is successful, we can replace the
      // row with info about the modified item.
      $editRow = $this.parents('tr');
    }
    /**
     * @var $msg jQuery object containing the reference to
     *           the AJAX message shown to the user
     */
    var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default().get($this.attr('href'), {
      'ajax_request': true
    }, function (data) {
      if (data.success !== true) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
        return;
      }
      // We have successfully fetched the editor form
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
      let isEditMode = false;
      const routinesEditorModalSaveEventHandler = function () {
        // Move the data from the codemirror editor back to the
        // textarea, where it can be used in the form submission.
        if (typeof window.CodeMirror !== 'undefined') {
          that.syntaxHiglighter.save();
        }
        // Validate editor and submit request, if passed.
        if (!that.validate()) {
          return;
        }
        /**
         * @var data Form data to be sent in the AJAX request
         */
        var data = jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.rte_form').last().serialize();
        $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.strProcessingRequest);
        var url = jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.rte_form').last().attr('action');
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, data, function (data) {
          if (data.success !== true) {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
            return;
          }
          // Item created successfully
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
          (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.slidingMessage)(data.message);
          window.bootstrap.Modal.getOrCreateInstance('#routinesEditorModal').hide();
          var tableId = '#' + data.tableType + 'Table';
          // If we are in 'edit' mode, we must
          // remove the reference to the old row.
          if (isEditMode && $editRow !== null) {
            $editRow.remove();
          }
          // Sometimes, like when moving a trigger from
          // a table to another one, the new row should
          // not be inserted into the list. In this case
          // "data.insert" will be set to false.
          if (data.insert) {
            // Insert the new row at the correct
            // location in the list of items
            /**
             * @var text Contains the name of an item from
             *           the list that is used in comparisons
             *           to find the correct location where
             *           to insert a new row.
             */
            var text = '';
            /**
             * @var inserted Whether a new item has been
             *               inserted in the list or not
             */
            var inserted = false;
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId + '.data').find('tr').each(function () {
              text = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('td').eq(0).find('strong').text().toUpperCase().trim();
              if (text !== '' && text > data.name) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).before(data.new_row);
                inserted = true;
                return false;
              }
            });
            if (!inserted) {
              // If we didn't manage to insert the row yet,
              // it must belong at the end of the list,
              // so we insert it there.
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId + '.data').append(data.new_row);
            }
            // Fade-in the new row
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('tr.ajaxInsert').show('slow').removeClass('ajaxInsert');
          } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId + '.data').find('tr').has('td').length === 0) {
            // If we are not supposed to insert the new row,
            // we will now check if the table is empty and
            // needs to be hidden. This will be the case if
            // we were editing the only item in the list,
            // which we removed and will not be inserting
            // something else in its place.
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId + '.data').hide('slow', function () {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nothing2display').show('slow');
            });
          }
          // Now we have inserted the row at the correct
          // position, but surely at least some row classes
          // are wrong now. So we will iterate through
          // all rows and assign correct classes to them
          /**
           * @var ct Count of processed rows
           */
          var ct = 0;
          /**
           * @var rowclass Class to be attached to the row
           *               that is being processed
           */
          var rowclass = '';
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId + '.data').find('tr').has('td').each(function () {
            rowclass = ct % 2 === 0 ? 'odd' : 'even';
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('odd even').addClass(rowclass);
            ct++;
          });
          // If this is the first item being added, remove
          // the "No items" message and show the list.
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId + '.data').find('tr').has('td').length > 0 && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nothing2display').is(':visible')) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nothing2display').hide('slow', function () {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableId + '.data').show('slow');
            });
          }
          _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
        });
      };
      const routinesEditorModal = document.getElementById('routinesEditorModal');
      routinesEditorModal.addEventListener('shown.bs.modal', function () {
        /**
         * Issue #15810 - use button titles for modals (eg: new procedure)
         * Respect the order: title on href tag, href content, title sent in response
         */
        routinesEditorModal.querySelector('.modal-title').textContent = $this.attr('title') || $this.text() || jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.title).text();
        routinesEditorModal.querySelector('.modal-body').innerHTML = data.message;
        const routinesEditorModalSaveButton = document.getElementById('routinesEditorModalSaveButton');
        routinesEditorModalSaveButton === null || routinesEditorModalSaveButton === void 0 || routinesEditorModalSaveButton.addEventListener('click', routinesEditorModalSaveEventHandler);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input[name=item_name]').trigger('focus');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input.datefield').each(function () {
          (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.addDatepicker)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('width', '95%'), 'date');
        });
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input.datetimefield').each(function () {
          (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.addDatepicker)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('width', '95%'), 'datetime');
        });
        // @ts-ignore
        (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).initialized = false;
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=editor_process_edit]').length > 0) {
          isEditMode = true;
        }
        // Attach syntax highlighted editor to the definition
        /**
         * @var elm jQuery object containing the reference to
         *                 the Definition textarea.
         */
        var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea[name=item_definition]').last();
        var linterOptions = {
          editorType: 'routine'
        };
        that.syntaxHiglighter = (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getSqlEditor)($elm, {}, 'vertical', linterOptions);
        window.codeMirrorEditor = that.syntaxHiglighter;
        // Execute item-specific code
        that.postDialogShow(data);
      });
      routinesEditorModal.addEventListener('hidden.bs.modal', function () {
        const routinesEditorModalSaveButton = document.getElementById('routinesEditorModalSaveButton');
        routinesEditorModalSaveButton === null || routinesEditorModalSaveButton === void 0 || routinesEditorModalSaveButton.removeEventListener('click', routinesEditorModalSaveEventHandler);
        document.getElementById('routinesEditorModal').querySelector('.modal-body').innerHTML = '<div class="spinner-border" role="status">' + '<span class="visually-hidden">' + window.Messages.strLoading + '</span></div>';
      });
      window.bootstrap.Modal.getOrCreateInstance(routinesEditorModal).show();
    });
  },
  dropDialog: function ($this) {
    /**
     * @var $curr_row Object containing reference to the current row
     */
    var $currRow = $this.parents('tr');
    /**
     * @var question String containing the question to be asked for confirmation
     */
    var question = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').text($currRow.children('td').children('.drop_sql').html());
    // We ask for confirmation first here, before submitting the ajax request
    $this.confirm(question, $this.attr('href'), function (url) {
      /**
       * @var msg jQuery object containing the reference to
       *          the AJAX message shown to the user
       */
      var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(this, $this.getPostData());
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
        if (data.success !== true) {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
          return;
        }
        /**
         * @var $table Object containing reference
         *             to the main list of elements
         */
        var $table = $currRow.parent().parent();
        // Check how many rows will be left after we remove
        // the one that the user has requested us to remove
        if ($table.find('tr').length === 3) {
          // If there are two rows left, it means that they are
          // the header of the table and the rows that we are
          // about to remove, so after the removal there will be
          // nothing to show in the table, so we hide it.
          $table.hide('slow', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('tr.even, tr.odd').remove();
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.withSelected').remove();
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nothing2display').show('slow');
          });
        } else {
          $currRow.hide('slow', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
            // Now we have removed the row from the list, but maybe
            // some row classes are wrong now. So we will iterate
            // through all rows and assign correct classes to them.
            /**
             * @var ct Count of processed rows
             */
            var ct = 0;
            /**
             * @var rowclass Class to be attached to the row
             *               that is being processed
             */
            var rowclass = '';
            $table.find('tr').has('td').each(function () {
              rowclass = ct % 2 === 1 ? 'odd' : 'even';
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('odd even').addClass(rowclass);
              ct++;
            });
          });
        }
        // Get rid of the "Loading" message
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
        // Show the query that we just executed
        (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.slidingMessage)(data.sql_query);
        _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
      }); // end $.post()
    });
  },
  dropMultipleDialog: function ($this) {
    // We ask for confirmation here
    $this.confirm(window.Messages.strDropRTEitems, '', function () {
      /**
       * @var msg jQuery object containing the reference to
       *          the AJAX message shown to the user
       */
      var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      // drop anchors of all selected rows
      var dropAnchors = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input.checkall:checked').parents('tr').find('.drop_anchor');
      var success = true;
      var count = dropAnchors.length;
      var returnCount = 0;
      dropAnchors.each(function () {
        var $anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
        /**
         * @var $curr_row Object containing reference to the current row
         */
        var $currRow = $anchor.parents('tr');
        var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(this, $anchor.getPostData());
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post($anchor.attr('href'), params, function (data) {
          returnCount++;
          if (data.success !== true) {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
            success = false;
            if (returnCount === count) {
              _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
            }
            return;
          }
          /**
           * @var $table Object containing reference
           *             to the main list of elements
           */
          var $table = $currRow.parent().parent();
          // Check how many rows will be left after we remove
          // the one that the user has requested us to remove
          if ($table.find('tr').length === 3) {
            // If there are two rows left, it means that they are
            // the header of the table and the rows that we are
            // about to remove, so after the removal there will be
            // nothing to show in the table, so we hide it.
            $table.hide('slow', function () {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('tr.even, tr.odd').remove();
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('.withSelected').remove();
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nothing2display').show('slow');
            });
          } else {
            $currRow.hide('fast', function () {
              // we will iterate
              // through all rows and assign correct classes to them.
              /**
               * @var ct Count of processed rows
               */
              var ct = 0;
              /**
               * @var rowclass Class to be attached to the row
               *               that is being processed
               */
              var rowclass = '';
              $table.find('tr').has('td').each(function () {
                rowclass = ct % 2 === 1 ? 'odd' : 'even';
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('odd even').addClass(rowclass);
                ct++;
              });
            });
            $currRow.remove();
          }
          if (returnCount === count) {
            if (success) {
              // Get rid of the "Loading" message
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rteListForm_checkall').prop({
                checked: false,
                indeterminate: false
              });
            }
            _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
          }
        }); // end $.post()
      }); // end drop_anchors.each()
    });
  },
  /**
   * Execute some code after the ajax dialog for the editor is shown.
   *
   * @param data JSON-encoded data from the ajax request
   */
  postDialogShow: function (data) {
    // Cache the template for a parameter table row
    DatabaseRoutines.paramTemplate = data.paramTemplate;
    var that = this;
    // Make adjustments in the dialog to make it AJAX compatible
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('td.routine_param_remove').show();
    // Enable/disable the 'options' dropdowns for parameters as necessary
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.routine_params_table').last().find('th[colspan=2]').attr('colspan', '1');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.routine_params_table').last().find('tr').has('td').each(function () {
      that.setOptionsForParameter(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('select[name^=item_param_type]'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input[name^=item_param_length]'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('select[name^=item_param_opts_text]'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('select[name^=item_param_opts_num]'));
    });
    // Enable/disable the 'options' dropdowns for
    // function return value as necessary
    this.setOptionsForParameter(jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.rte_table').last().find('select[name=item_returntype]'), jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.rte_table').last().find('input[name=item_returnlength]'), jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.rte_table').last().find('select[name=item_returnopts_text]'), jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.rte_table').last().find('select[name=item_returnopts_num]'));
    // Allow changing parameter order
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.routine_params_table tbody').sortable({
      containment: '.routine_params_table tbody',
      handle: '.dragHandle',
      stop: function () {
        that.reindexParameters();
      }
    });
  },
  /**
   * Reindexes the parameters after dropping a parameter or reordering parameters
   */
  reindexParameters: function () {
    /**
     * @var index Counter used for reindexing the input
     *            fields in the routine parameters table
     */
    var index = 0;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.routine_params_table tbody').find('tr').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find(':input').each(function () {
        /**
         * @var inputname The value of the name attribute of
         *                the input field being reindexed
         */
        var inputname = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name');
        if (inputname.startsWith('item_param_dir')) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name', inputname.substring(0, 14) + '[' + index + ']');
        } else if (inputname.startsWith('item_param_name')) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name', inputname.substring(0, 15) + '[' + index + ']');
        } else if (inputname.startsWith('item_param_type')) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name', inputname.substring(0, 15) + '[' + index + ']');
        } else if (inputname.startsWith('item_param_length')) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name', inputname.substring(0, 17) + '[' + index + ']');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id', 'item_param_length_' + index);
        } else if (inputname.startsWith('item_param_opts_text')) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name', inputname.substring(0, 20) + '[' + index + ']');
        } else if (inputname.startsWith('item_param_opts_num')) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name', inputname.substring(0, 19) + '[' + index + ']');
        }
      });
      index++;
    });
  },
  /**
   * Validate custom editor form fields.
   *
   * @return {boolean}
   */
  validateCustom: function () {
    /**
     * @var isSuccess Stores the outcome of the validation
     */
    var isSuccess = true;
    /**
     * @var inputname The value of the "name" attribute for
     *                the field that is being processed
     */
    var inputname = '';
    const routinesEditorModal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#routinesEditorModal');
    routinesEditorModal.find('table.routine_params_table').last().find('tr').each(function () {
      // Every parameter of a routine must have
      // a non-empty direction, name and type
      if (!isSuccess) {
        return false;
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find(':input').each(function () {
        inputname = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name');
        if (inputname.startsWith('item_param_dir') || inputname.startsWith('item_param_name') || inputname.startsWith('item_param_type')) {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === '') {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('focus');
            isSuccess = false;
            return false;
          }
        }
      });
    });
    if (!isSuccess) {
      alert(window.Messages.strFormEmpty);
      return false;
    }
    routinesEditorModal.find('table.routine_params_table').last().find('tr').each(function () {
      // SET, ENUM, VARCHAR and VARBINARY fields must have length/values
      var $inputtyp = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('select[name^=item_param_type]');
      var $inputlen = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input[name^=item_param_length]');
      if ($inputtyp.length && $inputlen.length) {
        if (($inputtyp.val() === 'ENUM' || $inputtyp.val() === 'SET' || $inputtyp.val().startsWith('VAR')) && $inputlen.val() === '') {
          $inputlen.trigger('focus');
          isSuccess = false;
          return false;
        }
      }
    });
    if (!isSuccess) {
      alert(window.Messages.strFormEmpty);
      return false;
    }
    if (routinesEditorModal.find('select[name=item_type]').find(':selected').val() === 'FUNCTION') {
      // The length/values of return variable for functions must
      // be set, if the type is SET, ENUM, VARCHAR or VARBINARY.
      var $returntyp = routinesEditorModal.find('select[name=item_returntype]');
      var $returnlen = routinesEditorModal.find('input[name=item_returnlength]');
      if (($returntyp.val() === 'ENUM' || $returntyp.val() === 'SET' || $returntyp.val().startsWith('VAR')) && $returnlen.val() === '') {
        $returnlen.trigger('focus');
        alert(window.Messages.strFormEmpty);
        return false;
      }
    }
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name=item_type]').find(':selected').val() === 'FUNCTION') {
      // A function must contain a RETURN statement in its definition
      const itemDefinitionValue = routinesEditorModal.find('table.rte_table').find('textarea[name=item_definition]').val();
      if (itemDefinitionValue.toUpperCase().indexOf('RETURN') < 0) {
        this.syntaxHiglighter.focus();
        alert(window.Messages.MissingReturn);
        return false;
      }
    }
    return true;
  },
  /**
   * Enable/disable the "options" dropdown and "length" input for
   * parameters and the return variable in the routine editor
   * as necessary.
   *
   * @param $type a jQuery object containing the reference
   *              to the "Type" dropdown box
   * @param $len  a jQuery object containing the reference
   *              to the "Length" input box
   * @param $text a jQuery object containing the reference
   *              to the dropdown box with options for
   *              parameters of text type
   * @param $num  a jQuery object containing the reference
   *              to the dropdown box with options for
   *              parameters of numeric type
   */
  setOptionsForParameter: function ($type, $len, $text, $num) {
    /**
     * @var no_opts a jQuery object containing the reference
     *              to an element to be displayed when no
     *              options are available
     */
    var $noOpts = $text.parent().parent().find('.no_opts');
    /**
     * @var no_len a jQuery object containing the reference
     *             to an element to be displayed when no
     *             "length/values" field is available
     */
    var $noLen = $len.parent().parent().find('.no_len');
    // Process for parameter options
    switch ($type.val()) {
      case 'TINYINT':
      case 'SMALLINT':
      case 'MEDIUMINT':
      case 'INT':
      case 'BIGINT':
      case 'DECIMAL':
      case 'FLOAT':
      case 'DOUBLE':
      case 'REAL':
        $text.parent().hide();
        $num.parent().show();
        $noOpts.hide();
        break;
      case 'TINYTEXT':
      case 'TEXT':
      case 'MEDIUMTEXT':
      case 'LONGTEXT':
      case 'CHAR':
      case 'VARCHAR':
      case 'SET':
      case 'ENUM':
        $text.parent().show();
        $num.parent().hide();
        $noOpts.hide();
        break;
      default:
        $text.parent().hide();
        $num.parent().hide();
        $noOpts.show();
        break;
    }
    // Process for parameter length
    switch ($type.val()) {
      case 'DATE':
      case 'TINYBLOB':
      case 'TINYTEXT':
      case 'BLOB':
      case 'TEXT':
      case 'MEDIUMBLOB':
      case 'MEDIUMTEXT':
      case 'LONGBLOB':
      case 'LONGTEXT':
        $text.closest('tr').find('a').first().hide();
        $len.parent().hide();
        $noLen.show();
        break;
      default:
        if ($type.val() === 'ENUM' || $type.val() === 'SET') {
          $text.closest('tr').find('a').first().show();
        } else {
          $text.closest('tr').find('a').first().hide();
        }
        $len.parent().show();
        $noLen.hide();
        break;
    }
  },
  executeDialog: function ($this) {
    /**
     * @var msg jQuery object containing the reference to
     *          the AJAX message shown to the user
     */
    var $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
    var params = (0,_modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_5__["default"])($this[0], $this.getPostData());
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($this.attr('href'), params, function (data) {
      if (data.success !== true) {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
        return;
      }
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
      // If 'data.dialog' is true we show a dialog with a form
      // to get the input parameters for routine, otherwise
      // we just show the results of the query
      if (!data.dialog) {
        // Routine executed successfully
        (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.slidingMessage)(data.message);
        return;
      }
      const routinesExecuteModal = document.getElementById('routinesExecuteModal');
      const modal = window.bootstrap.Modal.getOrCreateInstance(routinesExecuteModal);
      const routinesExecuteButtonEventHandler = function () {
        /**
         * @var data Form data to be sent in the AJAX request
         */
        var data = jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.rte_form').last().serialize();
        $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.strProcessingRequest);
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/database/routines', data, function (data) {
          if (data.success === true) {
            // Routine executed successfully
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
            (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.slidingMessage)(data.message);
            modal.hide();
          } else {
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
          }
        });
      };
      routinesExecuteModal.addEventListener('hidden.bs.modal', function () {
        routinesExecuteModal.querySelector('.modal-title').textContent = '';
        routinesExecuteModal.querySelector('.modal-body').innerHTML = '';
        const routinesExecuteModalExecuteButton = document.getElementById('routinesExecuteModalExecuteButton');
        routinesExecuteModalExecuteButton === null || routinesExecuteModalExecuteButton === void 0 || routinesExecuteModalExecuteButton.removeEventListener('click', routinesExecuteButtonEventHandler);
      });
      routinesExecuteModal.addEventListener('shown.bs.modal', function () {
        routinesExecuteModal.querySelector('.modal-title').textContent = data.title;
        routinesExecuteModal.querySelector('.modal-body').innerHTML = data.message;
        const routinesExecuteModalExecuteButton = document.getElementById('routinesExecuteModalExecuteButton');
        routinesExecuteModalExecuteButton === null || routinesExecuteModalExecuteButton === void 0 || routinesExecuteModalExecuteButton.addEventListener('click', routinesExecuteButtonEventHandler);
        const modalBody = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#routinesExecuteModal .modal-body');
        modalBody.find('input[name^=params]').first().trigger('focus');
        /**
         * Attach the datepickers to the relevant form fields
         */
        modalBody.find('input.datefield, input.datetimefield').each(function () {
          (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.addDatepicker)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('width', '95%'));
        });
        /*
        * Define the function if the user presses enter
        */
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.rte_form').on('keyup', function (event) {
          event.preventDefault();
          if (event.keyCode !== 13) {
            return;
          }
          /**
           * @var data Form data to be sent in the AJAX request
           */
          var data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).serialize();
          $msg = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.strProcessingRequest);
          var url = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('action');
          jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, data, function (data) {
            if (data.success !== true) {
              (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
              return;
            }
            // Routine executed successfully
            (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)($msg);
            (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.slidingMessage)(data.message);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.rte_form').off('keyup');
            modal.hide();
          });
        });
      });
      modal.show();
    });
  }
};
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('database/routines.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.ajax.add_anchor', function (event) {
    event.preventDefault();
    // @ts-ignore
    (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).initialized = false;
    DatabaseRoutines.editorDialog(true, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.ajax.edit_anchor', function (event) {
    event.preventDefault();
    DatabaseRoutines.editorDialog(false, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.ajax.exec_anchor', function (event) {
    event.preventDefault();
    DatabaseRoutines.executeDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.ajax.export_anchor', function (event) {
    event.preventDefault();
    DatabaseRoutines.exportDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#bulkActionExportButton', function (event) {
    event.preventDefault();
    DatabaseRoutines.exportDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.ajax.drop_anchor', function (event) {
    event.preventDefault();
    DatabaseRoutines.dropDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#bulkActionDropButton', function (event) {
    event.preventDefault();
    DatabaseRoutines.dropMultipleDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select[name=item_type]', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('table').find('tr.routine_return_row, .routine_direction_cell').toggle();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select[name^=item_param_type]', function () {
    const $row = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('tr').first();
    DatabaseRoutines.setOptionsForParameter($row.find('select[name^=item_param_type]'), $row.find('input[name^=item_param_length]'), $row.find('select[name^=item_param_opts_text]'), $row.find('select[name^=item_param_opts_num]'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select[name=item_returntype]', function () {
    const $table = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('table.rte_table');
    DatabaseRoutines.setOptionsForParameter($table.find('select[name=item_returntype]'), $table.find('input[name=item_returnlength]'), $table.find('select[name=item_returnopts_text]'), $table.find('select[name=item_returnopts_num]'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addRoutineParameterButton', function (event) {
    event.preventDefault();
    /**
     * @var routine_params_table jQuery object containing the reference
     *                           to the routine parameters table
     */
    const $routineParamsTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div.modal').find('.routine_params_table');
    /**
     * @var new_param_row A string containing the HTML code for the
     *                    new row for the routine parameters table
     */
    const newParamRow = DatabaseRoutines.paramTemplate.replace(/%s/g, ($routineParamsTable.find('tr').length - 1).toString());
    // Append the new row to the parameters table
    $routineParamsTable.append(newParamRow);
    // Make sure that the row is correctly shown according to the type of routine
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div.modal').find('table.rte_table select[name=item_type]').val() === 'FUNCTION') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('tr.routine_return_row').show();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('td.routine_direction_cell').hide();
    }
    /**
     * @var newrow jQuery object containing the reference to the newly
     *             inserted row in the routine parameters table
     */
    const $newrow = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div.modal').find('table.routine_params_table').find('tr').has('td').last();
    // Enable/disable the 'options' dropdowns for parameters as necessary
    DatabaseRoutines.setOptionsForParameter($newrow.find('select[name^=item_param_type]'), $newrow.find('input[name^=item_param_length]'), $newrow.find('select[name^=item_param_opts_text]'), $newrow.find('select[name^=item_param_opts_num]'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.routine_param_remove_anchor', function (event) {
    event.preventDefault();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent().remove();
    // After removing a parameter, the indices of the name attributes in
    // the input fields lose the correct order and need to be reordered.
    DatabaseRoutines.reindexParameters();
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(33); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=routines.js.map