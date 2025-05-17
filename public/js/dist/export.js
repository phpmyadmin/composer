"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[15],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 46:
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
 * Functions used in the export tab
 *
 */
/**
 * Disables the "Dump some row(s)" sub-options
 */
function disableDumpSomeRowsSubOptions() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('label[for=\'limit_to\']').fadeTo('fast', 0.4);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('label[for=\'limit_from\']').fadeTo('fast', 0.4);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'text\'][name=\'limit_to\']').prop('disabled', 'disabled');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'text\'][name=\'limit_from\']').prop('disabled', 'disabled');
}
/**
 * Enables the "Dump some row(s)" sub-options
 */
function enableDumpSomeRowsSubOptions() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('label[for=\'limit_to\']').fadeTo('fast', 1);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('label[for=\'limit_from\']').fadeTo('fast', 1);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'text\'][name=\'limit_to\']').prop('disabled', '');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'text\'][name=\'limit_from\']').prop('disabled', '');
}
/**
 * Return template data as a json object
 *
 * @return {object} template data
 */
function getTemplateData() {
  var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('form[name="dump"]');
  var excludeList = ['token', 'server', 'db', 'table', 'single_table', 'export_type', 'export_method', 'sql_query', 'template_id'];
  var obj = {};
  var arr = $form.serializeArray();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(arr, function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(this.name, excludeList) < 0) {
      if (obj[this.name] !== undefined) {
        if (!obj[this.name].push) {
          obj[this.name] = [obj[this.name]];
        }
        obj[this.name].push(this.value || '');
      } else {
        obj[this.name] = this.value || '';
      }
    }
  });
  // include unchecked checkboxes (which are ignored by serializeArray()) with null
  // to uncheck them when loading the template
  $form.find('input[type="checkbox"]:not(:checked)').each(function () {
    if (obj[this.name] === undefined) {
      obj[this.name] = null;
    }
  });
  // include empty multiselects
  $form.find('select').each(function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('option:selected').length === 0) {
      obj[this.name] = [];
    }
  });
  return obj;
}
/**
 * Create a template with selected options
 *
 * @param name name of the template
 */
function createTemplate(name) {
  var templateData = Export.getTemplateData();
  var params = {
    'ajax_request': true,
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'exportType': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="export_type"]').val(),
    'templateName': name,
    'templateData': JSON.stringify(templateData)
  };
  (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/export/template/create', params, function (response) {
    if (response.success === true) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#templateName').val('');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#template').html(response.data);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#template').find('option').each(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text() === name) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop('selected', true);
        }
      });
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strTemplateCreated);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(response.error, false);
    }
  });
}
/**
 * Loads a template
 *
 * @param id ID of the template to load
 */
function loadTemplate(id) {
  var params = {
    'ajax_request': true,
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'exportType': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="export_type"]').val(),
    'templateId': id
  };
  (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/export/template/load', params, function (response) {
    if (response.success === true) {
      var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('form[name="dump"]');
      var options = JSON.parse(response.data);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().each(options, function (key, value) {
        if (typeof key === 'symbol') {
          // Continue to next iteration.
          return true;
        }
        var localValue = value;
        var $element = $form.find('[name="' + key + '"]');
        if ($element.length) {
          if ($element.is('input') && $element.attr('type') === 'checkbox' && localValue === null) {
            $element.prop('checked', false);
          } else {
            if ($element.is('input') && $element.attr('type') === 'checkbox' || $element.is('input') && $element.attr('type') === 'radio' || $element.is('select') && $element.attr('multiple') === 'multiple') {
              if (!localValue.push) {
                localValue = [localValue];
              }
            }
            $element.val(localValue);
          }
          $element.trigger('change');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="template_id"]').val(id);
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strTemplateLoaded);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(response.error, false);
    }
  });
}
/**
 * Updates an existing template with current options
 *
 * @param id ID of the template to update
 */
function updateTemplate(id) {
  var templateData = Export.getTemplateData();
  var params = {
    'ajax_request': true,
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'exportType': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="export_type"]').val(),
    'templateId': id,
    'templateData': JSON.stringify(templateData)
  };
  (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/export/template/update', params, function (response) {
    if (response.success === true) {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strTemplateUpdated);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(response.error, false);
    }
  });
}
/**
 * Delete a template
 *
 * @param id ID of the template to delete
 */
function deleteTemplate(id) {
  var params = {
    'ajax_request': true,
    'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
    'db': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db'),
    'table': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table'),
    'exportType': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="export_type"]').val(),
    'templateId': id
  };
  (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/export/template/delete', params, function (response) {
    if (response.success === true) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#template').find('option[value="' + id + '"]').remove();
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(window.Messages.strTemplateDeleted);
    } else {
      (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(response.error, false);
    }
  });
}
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('export.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'sql_structure_or_data\']').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name$=\'_structure_or_data\']').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'output_format\']').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_include_comments').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'quick_or_custom\']').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'allrows\']').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#btn_alias_config').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.alias_remove').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#column_alias_button').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_select[]"]').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_structure[]"]').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_data[]"]').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_structure_all').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_data_all').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="createTemplate"]').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="template"]').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="updateTemplate"]').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="deleteTemplate"]').off('click');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('export.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showsqlquery').on('click', function () {
    // Creating a dialog box similar to preview sql container to show sql query
    var modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showSqlQueryModal');
    modal.modal('show');
    modal.on('shown.bs.modal', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#showSqlQueryModalLabel').first().html(window.Messages.strQuery);
      (0,_modules_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_4__["default"])(modal);
    });
  });
  /**
   * Export template handling code
   */
  // create a new template
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="createTemplate"]').on('click', function (e) {
    e.preventDefault();
    var name = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="templateName"]').val();
    if (name.length) {
      Export.createTemplate(name);
    }
  });
  // load an existing template
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="template"]').on('change', function (e) {
    e.preventDefault();
    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    if (id.length) {
      Export.loadTemplate(id);
    }
  });
  // update an existing template with new criteria
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="updateTemplate"]').on('click', function (e) {
    e.preventDefault();
    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="template"]').val();
    if (id.length) {
      Export.updateTemplate(id);
    }
  });
  // delete an existing template
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="deleteTemplate"]').on('click', function (e) {
    e.preventDefault();
    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="template"]').val();
    if (id.length) {
      Export.deleteTemplate(id);
    }
  });
  /**
   * Toggles the hiding and showing of each plugin's options
   * according to the currently selected plugin from the dropdown list
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').on('change', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#format_specific_opts').find('div.format_specific_options').addClass('d-none');
    var selectedPluginName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').find('option:selected').val();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + selectedPluginName + '_options').removeClass('d-none');
  });
  /**
   * Toggles the enabling and disabling of the SQL plugin's comment options that apply only when exporting structure
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'sql_structure_or_data\']').on('change', function () {
    var commentsArePresent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_include_comments').prop('checked');
    var show = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'sql_structure_or_data\']:checked').val();
    if (show === 'data') {
      // disable the SQL comment options
      if (commentsArePresent) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_dates').prop('disabled', true).parent().fadeTo('fast', 0.4);
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_relation').prop('disabled', true).parent().fadeTo('fast', 0.4);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_mime').prop('disabled', true).parent().fadeTo('fast', 0.4);
    } else {
      // enable the SQL comment options
      if (commentsArePresent) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_dates').prop('disabled', false).parent().fadeTo('fast', 1);
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_relation').prop('disabled', false).parent().fadeTo('fast', 1);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_mime').prop('disabled', false).parent().fadeTo('fast', 1);
    }
    if (show === 'structure') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_auto_increment').prop('disabled', true).parent().fadeTo('fast', 0.4);
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_auto_increment').prop('disabled', false).parent().fadeTo('fast', 1);
    }
  });
  // When MS Excel is selected as the Format automatically Switch to Character Set as windows-1252
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').on('change', function () {
    var selectedPluginName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').find('option:selected').val();
    if (selectedPluginName === 'excel') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_charset').val('windows-1252');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_charset').val('utf-8');
    }
  });
  // For separate-file exports only ZIP compression is allowed
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type="checkbox"][name="as_separate_files"]').on('change', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked')) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#compression').val('zip');
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#compression').on('change', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('option:selected').val() !== 'zip') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type="checkbox"][name="as_separate_files"]').prop('checked', false);
    }
  });
});
function setupTableStructureOrData() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=\'export_type\']').val() !== 'database') {
    return;
  }
  var pluginName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').find('option:selected').val();
  var formElemName = pluginName + '_structure_or_data';
  var forceStructureOrData = !jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=\'' + formElemName + '_default\']').length;
  if (forceStructureOrData === true) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="structure_or_data_forced"]').val(1);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_structure input[type="checkbox"], .export_data input[type="checkbox"]').prop('disabled', true);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_structure, .export_data').fadeTo('fast', 0.4);
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="structure_or_data_forced"]').val(0);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_structure input[type="checkbox"], .export_data input[type="checkbox"]').prop('disabled', false);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_structure, .export_data').fadeTo('fast', 1);
    var structureOrData = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="' + formElemName + '_default"]').val();
    if (structureOrData === 'structure') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_data input[type="checkbox"]').prop('checked', false);
    } else if (structureOrData === 'data') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_structure input[type="checkbox"]').prop('checked', false);
    }
    if (structureOrData === 'structure' || structureOrData === 'structure_and_data') {
      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_structure input[type="checkbox"]:checked').length) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_select[]"]:checked').closest('tr').find('.export_structure input[type="checkbox"]').prop('checked', true);
      }
    }
    if (structureOrData === 'data' || structureOrData === 'structure_and_data') {
      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_data input[type="checkbox"]:checked').length) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_select[]"]:checked').closest('tr').find('.export_data input[type="checkbox"]').prop('checked', true);
      }
    }
    Export.checkSelectedTables();
    Export.checkTableSelectAll();
    Export.checkTableSelectStructureOrData();
  }
}
/**
 * Toggles the hiding and showing of plugin structure-specific and data-specific
 * options
 */
function toggleStructureDataOpts() {
  var pluginName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select#plugins').val();
  var radioFormName = pluginName + '_structure_or_data';
  var dataDiv = '#' + pluginName + '_data';
  var structureDiv = '#' + pluginName + '_structure';
  var show = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'' + radioFormName + '\']:checked').val();
  // Show the #rows if 'show' is not structure
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#rows').toggle(show !== 'structure');
  if (show === 'data') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(dataDiv).slideDown('slow');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(structureDiv).slideUp('slow');
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(structureDiv).slideDown('slow');
    if (show === 'structure') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(dataDiv).slideUp('slow');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(dataDiv).slideDown('slow');
    }
  }
}
/**
 * Toggles the disabling of the "save to file" options
 */
function toggleSaveToFile() {
  var $ulSaveAsfile = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ul_save_asfile');
  if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#radio_dump_asfile').prop('checked')) {
    $ulSaveAsfile.find('> li').fadeTo('fast', 0.4);
    $ulSaveAsfile.find('> li > input').prop('disabled', true);
    $ulSaveAsfile.find('> li > select').prop('disabled', true);
  } else {
    $ulSaveAsfile.find('> li').fadeTo('fast', 1);
    $ulSaveAsfile.find('> li > input').prop('disabled', false);
    $ulSaveAsfile.find('> li > select').prop('disabled', false);
  }
}
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('export.js', function () {
  Export.toggleSaveToFile();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'output_format\']').on('change', Export.toggleSaveToFile);
});
/**
 * For SQL plugin, toggles the disabling of the "display comments" options
 */
function toggleSqlIncludeComments() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_include_comments').on('change', function () {
    var $ulIncludeComments = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ul_include_comments');
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_include_comments').prop('checked')) {
      $ulIncludeComments.find('> li').fadeTo('fast', 0.4);
      $ulIncludeComments.find('> li > input').prop('disabled', true);
    } else {
      // If structure is not being exported, the comment options for structure should not be enabled
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#radio_sql_structure_or_data_data').prop('checked')) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_sql_header_comment').prop('disabled', false).parent('li').fadeTo('fast', 1);
      } else {
        $ulIncludeComments.find('> li').fadeTo('fast', 1);
        $ulIncludeComments.find('> li > input').prop('disabled', false);
      }
    }
  });
}
function checkTableSelectAll() {
  var total = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_select[]"]').length;
  var strChecked = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_structure[]"]:checked').length;
  var dataChecked = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_data[]"]:checked').length;
  var strAll = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_structure_all');
  var dataAll = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_data_all');
  if (strChecked === total) {
    strAll.prop('indeterminate', false).prop('checked', true);
  } else if (strChecked === 0) {
    strAll.prop('indeterminate', false).prop('checked', false);
  } else {
    strAll.prop('indeterminate', true).prop('checked', false);
  }
  if (dataChecked === total) {
    dataAll.prop('indeterminate', false).prop('checked', true);
  } else if (dataChecked === 0) {
    dataAll.prop('indeterminate', false).prop('checked', false);
  } else {
    dataAll.prop('indeterminate', true).prop('checked', false);
  }
}
function checkTableSelectStructureOrData() {
  var dataChecked = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_data[]"]:checked').length;
  var autoIncrement = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_auto_increment');
  var pluginName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select#plugins').val();
  var dataDiv = '#' + pluginName + '_data';
  if (dataChecked === 0) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(dataDiv).slideUp('slow');
    autoIncrement.prop('disabled', true).parent().fadeTo('fast', 0.4);
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(dataDiv).slideDown('slow');
    autoIncrement.prop('disabled', false).parent().fadeTo('fast', 1);
  }
}
function toggleTableSelectAllStr() {
  var strAll = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_structure_all').is(':checked');
  if (strAll) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_structure[]"]').prop('checked', true);
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_structure[]"]').prop('checked', false);
  }
}
function toggleTableSelectAllData() {
  var dataAll = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_data_all').is(':checked');
  if (dataAll) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_data[]"]').prop('checked', true);
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_data[]"]').prop('checked', false);
  }
}
function checkSelectedTables() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.export_table_select tbody tr').each(function () {
    Export.checkTableSelected(this);
  });
}
function checkTableSelected(row) {
  var $row = jquery__WEBPACK_IMPORTED_MODULE_0___default()(row);
  var tableSelect = $row.find('input[name="table_select[]"]');
  var strCheck = $row.find('input[name="table_structure[]"]');
  var dataCheck = $row.find('input[name="table_data[]"]');
  var data = dataCheck.is(':checked:not(:disabled)');
  var structure = strCheck.is(':checked:not(:disabled)');
  if (data && structure) {
    tableSelect.prop({
      checked: true,
      indeterminate: false
    });
    $row.addClass('marked');
  } else if (data || structure) {
    tableSelect.prop({
      checked: true,
      indeterminate: true
    });
    $row.removeClass('marked');
  } else {
    tableSelect.prop({
      checked: false,
      indeterminate: false
    });
    $row.removeClass('marked');
  }
}
function toggleTableSelect(row) {
  var $row = jquery__WEBPACK_IMPORTED_MODULE_0___default()(row);
  var tableSelected = $row.find('input[name="table_select[]"]').is(':checked');
  if (tableSelected) {
    $row.find('input[type="checkbox"]:not(:disabled)').prop('checked', true);
    $row.addClass('marked');
  } else {
    $row.find('input[type="checkbox"]:not(:disabled)').prop('checked', false);
    $row.removeClass('marked');
  }
}
function handleAddProcCheckbox() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_structure_all').is(':checked') === true && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_data_all').is(':checked') === true) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_procedure_function').prop('checked', true);
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_procedure_function').prop('checked', false);
  }
}
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('export.js', function () {
  /**
   * For SQL plugin, if "CREATE TABLE options" is checked/unchecked, check/uncheck each of its sub-options
   */
  var $create = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_create_table_statements');
  var $createOptions = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ul_create_table_statements').find('input');
  $create.on('change', function () {
    $createOptions.prop('checked', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop('checked'));
  });
  $createOptions.on('change', function () {
    if ($createOptions.is(':checked')) {
      $create.prop('checked', true);
    }
  });
  /**
   * Disables the view output as text option if the output must be saved as a file
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').on('change', function () {
    const isBinary = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').find('option:selected').attr('data-is-binary') === 'true';
    if (isBinary) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#radio_dump_asfile').prop('checked') !== true) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#radio_dump_asfile').prop('checked', true);
        Export.toggleSaveToFile();
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#radio_view_as_text').prop('disabled', true).parent().fadeTo('fast', 0.4);
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#radio_view_as_text').prop('disabled', false).parent().fadeTo('fast', 1);
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name$=\'_structure_or_data\']').on('change', function () {
    Export.toggleStructureDataOpts();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_select[]"]').on('change', function () {
    Export.toggleTableSelect(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr'));
    Export.checkTableSelectAll();
    Export.handleAddProcCheckbox();
    Export.checkTableSelectStructureOrData();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_structure[]"]').on('change', function () {
    Export.checkTableSelected(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr'));
    Export.checkTableSelectAll();
    Export.handleAddProcCheckbox();
    Export.checkTableSelectStructureOrData();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table_data[]"]').on('change', function () {
    Export.checkTableSelected(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr'));
    Export.checkTableSelectAll();
    Export.handleAddProcCheckbox();
    Export.checkTableSelectStructureOrData();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_structure_all').on('change', function () {
    Export.toggleTableSelectAllStr();
    Export.checkSelectedTables();
    Export.handleAddProcCheckbox();
    Export.checkTableSelectStructureOrData();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_data_all').on('change', function () {
    Export.toggleTableSelectAllData();
    Export.checkSelectedTables();
    Export.handleAddProcCheckbox();
    Export.checkTableSelectStructureOrData();
  });
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=\'export_type\']').val() === 'database') {
    // Hide structure or data radio buttons
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name$=\'_structure_or_data\']').each(function () {
      var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      var name = $this.prop('name');
      var val = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="' + name + '"]:checked').val();
      var nameDefault = name + '_default';
      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="' + nameDefault + '"]').length) {
        $this.after(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input type="hidden" name="' + nameDefault + '" value="' + val + '" disabled>')).after(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input type="hidden" name="' + name + '" value="structure_and_data">'));
        $this.parent().find('label').remove();
      } else {
        $this.parent().remove();
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name$=\'_structure_or_data\']').remove();
    // Disable CREATE table checkbox for sql
    var createTableCheckbox = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_create_table');
    createTableCheckbox.prop('checked', true);
    var dummyCreateTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#checkbox_sql_create_table').clone().removeAttr('id').attr('type', 'hidden');
    createTableCheckbox.prop('disabled', true).after(dummyCreateTable).parent().fadeTo('fast', 0.4);
    Export.setupTableStructureOrData();
  }
  /**
   * Handle force structure_or_data
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#plugins').on('change', Export.setupTableStructureOrData);
});
/**
 * Toggles display of options when quick and custom export are selected
 */
function toggleQuickOrCustom() {
  const isCustomNoFormOption = !document.getElementById('quick_or_custom');
  const radioCustomExportElement = document.getElementById('radio_custom_export');
  const isCustomExport = isCustomNoFormOption || radioCustomExportElement instanceof HTMLInputElement && radioCustomExportElement.checked;
  const databasesAndTablesElement = document.getElementById('databases_and_tables');
  if (databasesAndTablesElement) {
    databasesAndTablesElement.classList.toggle('d-none', !isCustomExport);
  }
  const rowsElement = document.getElementById('rows');
  if (rowsElement) {
    rowsElement.classList.toggle('d-none', !isCustomExport);
  }
  const outputElement = document.getElementById('output');
  if (outputElement) {
    outputElement.classList.toggle('d-none', !isCustomExport);
  }
  const formatSpecificOptionsElement = document.getElementById('format_specific_opts');
  if (formatSpecificOptionsElement) {
    formatSpecificOptionsElement.classList.toggle('d-none', !isCustomExport);
  }
  const outputQuickExportElement = document.getElementById('output_quick_export');
  if (outputQuickExportElement) {
    outputQuickExportElement.classList.toggle('d-none', isCustomExport);
  }
  if (!isCustomExport) {
    return;
  }
  const selectedPluginElement = document.querySelector('#plugins > option[selected]');
  const selectedPluginName = selectedPluginElement instanceof HTMLOptionElement ? selectedPluginElement.value : null;
  if (selectedPluginName === null) {
    return;
  }
  const pluginOptionsElement = document.getElementById(selectedPluginName + '_options');
  if (!pluginOptionsElement) {
    return;
  }
  pluginOptionsElement.classList.remove('d-none');
}
var timeOut;
function checkTimeOut(timeLimit) {
  var limit = timeLimit;
  if (typeof limit === 'undefined' || limit === 0) {
    return true;
  }
  // margin of one second to avoid race condition to set/access session variable
  limit = limit + 1;
  clearTimeout(timeOut);
  timeOut = setTimeout(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().get('index.php?route=/export/check-time-out', {
      'ajax_request': true,
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
    }, function (data) {
      if (data.message === 'timeout') {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)('<div class="alert alert-danger" role="alert">' + window.Messages.strTimeOutError + '</div>', false);
      }
    });
  }, limit * 1000);
}
/**
 * Handler for Alias dialog box
 *
 * @param event object the event object
 */
function createAliasModal(event) {
  event.preventDefault();
  var modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#renameExportModal');
  modal.modal('show');
  modal.on('shown.bs.modal', function () {
    var db = _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('db');
    if (db) {
      var option = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option></option>');
      option.text(db);
      option.attr('value', db);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_select').append(option).val(db).trigger('change');
    } else {
      var params = {
        'ajax_request': true,
        'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server')
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/databases', params, function (response) {
        if (response.success === true) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(response.databases, function (idx, value) {
            var option = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option></option>');
            option.text(value);
            option.attr('value', value);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_select').append(option);
          });
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(response.error, false);
        }
      });
    }
  });
  modal.on('hidden.bs.modal', function () {
    var isEmpty = true;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input[type="text"]').each(function () {
      // trim empty input fields on close
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) {
        isEmpty = false;
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('tr').remove();
      }
    });
    // Toggle checkbox based on aliases
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#btn_alias_config').prop('checked', !isEmpty);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#saveAndCloseBtn').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#alias_modal').parent().appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('form[name="dump"]'));
  });
}
function aliasToggleRow(elm) {
  var inputs = elm.parents('tr').find('input,button');
  if (elm.val()) {
    inputs.attr('disabled', false);
  } else {
    inputs.attr('disabled', true);
  }
}
function addAlias(type, name, field, value) {
  if (value === '') {
    return;
  }
  if (Export.aliasRow === null) {
    Export.aliasRow = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#alias_data tfoot tr');
  }
  var row = Export.aliasRow.clone();
  row.find('th').text(type);
  row.find('td').first().text(name);
  row.find('input').attr('name', field);
  row.find('input').val(value);
  row.find('.alias_remove').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('tr').remove();
  });
  var matching = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#alias_data [name="' + jquery__WEBPACK_IMPORTED_MODULE_0___default().escapeSelector(field) + '"]');
  if (matching.length > 0) {
    matching.parents('tr').remove();
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#alias_data tbody').append(row);
}
const Export = {
  disableDumpSomeRowsSubOptions: disableDumpSomeRowsSubOptions,
  enableDumpSomeRowsSubOptions: enableDumpSomeRowsSubOptions,
  getTemplateData: getTemplateData,
  createTemplate: createTemplate,
  loadTemplate: loadTemplate,
  updateTemplate: updateTemplate,
  deleteTemplate: deleteTemplate,
  setupTableStructureOrData: setupTableStructureOrData,
  toggleStructureDataOpts: toggleStructureDataOpts,
  toggleSaveToFile: toggleSaveToFile,
  toggleSqlIncludeComments: toggleSqlIncludeComments,
  checkTableSelectAll: checkTableSelectAll,
  checkTableSelectStructureOrData: checkTableSelectStructureOrData,
  toggleTableSelectAllStr: toggleTableSelectAllStr,
  toggleTableSelectAllData: toggleTableSelectAllData,
  checkSelectedTables: checkSelectedTables,
  checkTableSelected: checkTableSelected,
  toggleTableSelect: toggleTableSelect,
  handleAddProcCheckbox: handleAddProcCheckbox,
  checkTimeOut: checkTimeOut,
  createAliasModal: createAliasModal,
  aliasToggleRow: aliasToggleRow,
  aliasRow: null,
  addAlias: addAlias
};
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('export.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'quick_or_custom\']').on('change', toggleQuickOrCustom);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#format_specific_opts').find('div.format_specific_options').addClass('d-none').find('h3').remove();
  toggleQuickOrCustom();
  Export.toggleStructureDataOpts();
  Export.toggleSqlIncludeComments();
  Export.checkTableSelectAll();
  Export.handleAddProcCheckbox();
  /**
   * Initially disables the "Dump some row(s)" sub-options
   */
  Export.disableDumpSomeRowsSubOptions();
  /**
   * Disables the "Dump some row(s)" sub-options when it is not selected
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=\'radio\'][name=\'allrows\']').on('change', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#radio_allrows_0').prop('checked')) {
      Export.enableDumpSomeRowsSubOptions();
    } else {
      Export.disableDumpSomeRowsSubOptions();
    }
  });
  // Open Alias Modal Dialog on click
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#btn_alias_config').on('click', Export.createAliasModal);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.alias_remove').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('tr').remove();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_select').on('change', function () {
    Export.aliasToggleRow(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    var table = _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('table');
    if (table) {
      var option = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option></option>');
      option.text(table);
      option.attr('value', table);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_select').append(option).val(table).trigger('change');
    } else {
      var database = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
      var params = {
        'ajax_request': true,
        'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
        'db': database
      };
      var url = 'index.php?route=/tables';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (response) {
        if (response.success === true) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().each(response.tables, function (idx, value) {
            var option = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option></option>');
            option.text(value);
            option.attr('value', value);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_select').append(option);
          });
        } else {
          (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(response.error, false);
        }
      });
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_select').on('change', function () {
    Export.aliasToggleRow(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    var database = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_select').val();
    var table = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    var params = {
      'ajax_request': true,
      'server': _modules_common_ts__WEBPACK_IMPORTED_MODULE_3__.CommonParams.get('server'),
      'db': database,
      'table': table
    };
    var url = 'index.php?route=/columns';
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (response) {
      if (response.success === true) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default().each(response.columns, function (idx, value) {
          var option = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option></option>');
          option.text(value);
          option.attr('value', value);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#column_alias_select').append(option);
        });
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_5__.ajaxShowMessage)(response.error, false);
      }
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#column_alias_select').on('change', function () {
    Export.aliasToggleRow(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_button').on('click', function (e) {
    e.preventDefault();
    var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_select').val();
    Export.addAlias(window.Messages.strAliasDatabase, db, 'aliases[' + db + '][alias]', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_name').val());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_name').val('');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_button').on('click', function (e) {
    e.preventDefault();
    var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_select').val();
    var table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_select').val();
    Export.addAlias(window.Messages.strAliasTable, db + '.' + table, 'aliases[' + db + '][tables][' + table + '][alias]', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_name').val());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_name').val('');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#column_alias_button').on('click', function (e) {
    e.preventDefault();
    var db = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_alias_select').val();
    var table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_alias_select').val();
    var column = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#column_alias_select').val();
    Export.addAlias(window.Messages.strAliasColumn, db + '.' + table + '.' + column, 'aliases[' + db + '][tables][' + table + '][colums][' + column + ']', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#column_alias_name').val());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#column_alias_name').val('');
  });
  var setDbSelectOptions = function (doCheck) {
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.setSelectOptions)('dump', 'db_select[]', doCheck);
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_select_all').on('click', function (e) {
    e.preventDefault();
    setDbSelectOptions(true);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#db_unselect_all').on('click', function (e) {
    e.preventDefault();
    setDbSelectOptions(false);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#buttonGo').on('click', function () {
    var timeLimit = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-exec-time-limit'));
    // If the time limit set is zero,
    // then time out won't occur so no need to check for time out.
    if (timeLimit > 0) {
      Export.checkTimeOut(timeLimit);
    }
  });
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(46); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=export.js.map