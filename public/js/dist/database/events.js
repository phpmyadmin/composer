"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[3],{

/***/ 28:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _modules_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);






_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('database/events.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.ajax.add_anchor, a.ajax.edit_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.ajax.export_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#bulkActionExportButton');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.ajax.drop_anchor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#bulkActionDropButton');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'select[name=item_type]');
});
const DatabaseEvents = {
  /**
   * @var $ajaxDialog Query object containing the reference to the
   *                  dialog that contains the editor
   */
  $ajaxDialog: null,
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
      /**
       * @var buttonOptions Object containing options
       *                     for jQueryUI dialog buttons
       */
      var buttonOptions = {
        [window.Messages.strClose]: {
          text: window.Messages.strClose,
          class: 'btn btn-primary',
          click: function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dialog('close').remove();
          }
        }
      };
      /**
       * Display the dialog to the user
       */
      data.message = '<textarea cols="40" rows="15" class="w-100">' + data.message + '</textarea>';
      var $ajaxDialog = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div>' + data.message + '</div>').dialog({
        classes: {
          'ui-dialog-titlebar-close': 'btn-close'
        },
        width: 500,
        // @ts-ignore
        buttons: buttonOptions,
        title: data.title
      });
      // Attach syntax highlighted editor to export dialog
      /**
       * @var $elm jQuery object containing the reference
       *           to the Export textarea.
       */
      var $elm = $ajaxDialog.find('textarea');
      (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getSqlEditor)($elm);
    } // end showExport()
  },
  // end exportDialog()
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
      /**
       * @var buttonOptions Object containing options
       *                     for jQueryUI dialog buttons
       */
      var buttonOptions = {
        [window.Messages.strGo]: {
          text: window.Messages.strGo,
          class: 'btn btn-primary'
        },
        [window.Messages.strClose]: {
          text: window.Messages.strClose,
          class: 'btn btn-secondary'
        }
      };
      // Now define the function that is called when
      // the user presses the "Go" button
      // @ts-ignore
      buttonOptions[window.Messages.strGo].click = function () {
        // Move the data from the codemirror editor back to the
        // textarea, where it can be used in the form submission.
        if (typeof window.CodeMirror !== 'undefined') {
          that.syntaxHiglighter.save();
        }
        // Validate editor and submit request, if passed.
        if (that.validate()) {
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
            that.$ajaxDialog.dialog('close');
            // If we are in 'edit' mode, we must
            // remove the reference to the old row.
            if (mode === 'edit' && $editRow !== null) {
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
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.data').find('tr').each(function () {
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
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.data').append(data.new_row);
              }
              // Fade-in the new row
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('tr.ajaxInsert').show('slow').removeClass('ajaxInsert');
            } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.data').find('tr').has('td').length === 0) {
              // If we are not supposed to insert the new row,
              // we will now check if the table is empty and
              // needs to be hidden. This will be the case if
              // we were editing the only item in the list,
              // which we removed and will not be inserting
              // something else in its place.
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.data').hide('slow', function () {
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
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.data').find('tr').has('td').each(function () {
              rowclass = ct % 2 === 0 ? 'odd' : 'even';
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass().addClass(rowclass);
              ct++;
            });
            // If this is the first item being added, remove
            // the "No items" message and show the list.
            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.data').find('tr').has('td').length > 0 && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nothing2display').is(':visible')) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('#nothing2display').hide('slow', function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('table.data').show('slow');
              });
            }
            _modules_navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
          }); // end $.post()
        } // end "if (that.validate())"
      }; // end of function that handles the submission of the Editor
      // @ts-ignore
      buttonOptions[window.Messages.strClose].click = function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).dialog('close');
      };
      /**
       * Display the dialog to the user
       */
      that.$ajaxDialog = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id="rteDialog">' + data.message + '</div>').dialog({
        classes: {
          'ui-dialog-titlebar-close': 'btn-close'
        },
        height: 500,
        width: '70%',
        minWidth: 500,
        // @ts-ignore
        buttons: buttonOptions,
        // Issue #15810 - use button titles for modals (eg: new procedure)
        // Respect the order: title on href tag, href content, title sent in response
        title: $this.attr('title') || $this.text() || jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.title).text(),
        modal: true,
        open: function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rteDialog').dialog('option', 'max-height', jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height());
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rteDialog').parents('.ui-dialog').height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rteDialog').dialog('option', 'height', jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height());
          }
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input[name=item_name]').trigger('focus');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input.datefield').each(function () {
            (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.addDatepicker)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('width', '95%'), 'date');
          });
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input.datetimefield').each(function () {
            (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.addDatepicker)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('width', '95%'), 'datetime');
          });
          // @ts-ignore
          (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).initialized = false;
        },
        close: function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
        }
      });
      /**
       * @var mode Used to remember whether the editor is in
       *           "Edit" or "Add" mode
       */
      var mode = 'add';
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=editor_process_edit]').length > 0) {
        mode = 'edit';
      }
      // Attach syntax highlighted editor to the definition
      /**
       * @var elm jQuery object containing the reference to
       *                 the Definition textarea.
       */
      var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea[name=item_definition]').last();
      var linterOptions = {
        editorType: 'event'
      };
      that.syntaxHiglighter = (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.getSqlEditor)($elm, {}, 'vertical', linterOptions);
      window.codeMirrorEditor = that.syntaxHiglighter;
    }); // end $.get()
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
        var $table = $currRow.parent();
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
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass().addClass(rowclass);
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
          var $table = $currRow.parent();
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
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass().addClass(rowclass);
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
   * Validate custom editor form fields.
   *
   * @return {boolean}
   */
  validateCustom: function () {
    /**
     * @var elm a jQuery object containing the reference
     *          to an element that is being validated
     */
    var $elm = null;
    if (this.$ajaxDialog.find('select[name=item_type]').find(':selected').val() === 'RECURRING') {
      // The interval field must not be empty for recurring events
      $elm = this.$ajaxDialog.find('input[name=item_interval_value]');
      if ($elm.val() === '') {
        $elm.trigger('focus');
        alert(window.Messages.strFormEmpty);
        return false;
      }
    } else {
      // The execute_at field must not be empty for "once off" events
      $elm = this.$ajaxDialog.find('input[name=item_execute_at]');
      if ($elm.val() === '') {
        $elm.trigger('focus');
        alert(window.Messages.strFormEmpty);
        return false;
      }
    }
    return true;
  }
};
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('database/events.js', function () {
  /**
   * Attach Ajax event handlers for the Add/Edit functionality.
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.ajax.add_anchor, a.ajax.edit_anchor', function (event) {
    event.preventDefault();
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('add_anchor')) {
      // @ts-ignore
      (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).initialized = false;
    }
    DatabaseEvents.editorDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('add_anchor'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  /**
   * Attach Ajax event handlers for Export
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.ajax.export_anchor', function (event) {
    event.preventDefault();
    DatabaseEvents.exportDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  }); // end $(document).on()
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#bulkActionExportButton', function (event) {
    event.preventDefault();
    DatabaseEvents.exportDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  }); // end $(document).on()
  /**
   * Attach Ajax event handlers for Drop functionality
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.ajax.drop_anchor', function (event) {
    event.preventDefault();
    DatabaseEvents.dropDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  }); // end $(document).on()
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#bulkActionDropButton', function (event) {
    event.preventDefault();
    DatabaseEvents.dropMultipleDialog(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  }); // end $(document).on()
  /**
   * Attach Ajax event handlers for the "Change event type" functionality, so that the correct
   * rows are shown in the editor when changing the event type
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select[name=item_type]', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('table').find('tr.recurring_event_row, tr.onetime_event_row').toggle();
  });
});

/***/ }),

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(28); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=events.js.map