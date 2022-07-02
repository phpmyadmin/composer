(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[45],{

/***/ 49:
/***/ (function() {

/**
 * @fileoverview    function used for page-related settings
 * @name            Page-related settings
 *
 * @requires    jQuery
 * @requires    jQueryUI
 * @required    js/functions.js
 */
function showSettings(selector) {
  // Keeping a clone to restore in case the user cancels the operation
  var $clone = $(selector + ' .page_settings').clone(true);
  $('#pageSettingsModalApplyButton').on('click', function () {
    $('.config-form').trigger('submit');
  });
  $('#pageSettingsModalCloseButton,#pageSettingsModalCancelButton').on('click', function () {
    $(selector + ' .page_settings').replaceWith($clone);
    $('#pageSettingsModal').modal('hide');
  });
  $('#pageSettingsModal').modal('show');
  $('#pageSettingsModal').find('.modal-body').first().html($(selector));
  $(selector).css('display', 'block');
}

function showPageSettings() {
  showSettings('#page_settings_modal');
}

function showNaviSettings() {
  showSettings('#pma_navigation_settings');
}

window.PageSettings = {};

window.PageSettings.off = () => function () {
  $('#page_settings_icon').css('display', 'none');
  $('#page_settings_icon').off('click');
  $('#pma_navigation_settings_icon').off('click');
};

window.PageSettings.on = () => function () {
  if ($('#page_settings_modal').length) {
    $('#page_settings_icon').css('display', 'inline');
    $('#page_settings_icon').on('click', showPageSettings);
  }

  $('#pma_navigation_settings_icon').on('click', showNaviSettings);
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(49));
/******/ }
]);
//# sourceMappingURL=page_settings.js.map