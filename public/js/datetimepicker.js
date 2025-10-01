"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["datetimepicker"],{

/***/ "./resources/js/datetimepicker.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

function registerDatePickerTranslations() {
  'use strict';

  if (!(jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker)) {
    return;
  }
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].closeText = window.Messages.strCalendarClose;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].prevText = window.Messages.strCalendarPrevious;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].nextText = window.Messages.strCalendarNext;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].currentText = window.Messages.strCalendarCurrent;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].monthNames = [window.Messages.strMonthNameJan, window.Messages.strMonthNameFeb, window.Messages.strMonthNameMar, window.Messages.strMonthNameApr, window.Messages.strMonthNameMay, window.Messages.strMonthNameJun, window.Messages.strMonthNameJul, window.Messages.strMonthNameAug, window.Messages.strMonthNameSep, window.Messages.strMonthNameOct, window.Messages.strMonthNameNov, window.Messages.strMonthNameDec];
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].monthNamesShort = [window.Messages.strMonthNameJanShort, window.Messages.strMonthNameFebShort, window.Messages.strMonthNameMarShort, window.Messages.strMonthNameAprShort, window.Messages.strMonthNameMayShort, window.Messages.strMonthNameJunShort, window.Messages.strMonthNameJulShort, window.Messages.strMonthNameAugShort, window.Messages.strMonthNameSepShort, window.Messages.strMonthNameOctShort, window.Messages.strMonthNameNovShort, window.Messages.strMonthNameDecShort];
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].dayNames = [window.Messages.strDayNameSun, window.Messages.strDayNameMon, window.Messages.strDayNameTue, window.Messages.strDayNameWed, window.Messages.strDayNameThu, window.Messages.strDayNameFri, window.Messages.strDayNameSat];
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].dayNamesShort = [window.Messages.strDayNameSunShort, window.Messages.strDayNameMonShort, window.Messages.strDayNameTueShort, window.Messages.strDayNameWedShort, window.Messages.strDayNameThuShort, window.Messages.strDayNameFriShort, window.Messages.strDayNameSatShort];
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].dayNamesMin = [window.Messages.strDayNameSunMin, window.Messages.strDayNameMonMin, window.Messages.strDayNameTueMin, window.Messages.strDayNameWedMin, window.Messages.strDayNameThuMin, window.Messages.strDayNameFriMin, window.Messages.strDayNameSatMin];
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].weekHeader = window.Messages.strWeekHeader;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].showMonthAfterYear = window.Messages.strMonthAfterYear === 'calendar-year-month';
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional[''].yearSuffix = window.Messages.strYearSuffix !== 'none' ? window.Messages.strYearSuffix : '';
  // @ts-ignore
  jquery__WEBPACK_IMPORTED_MODULE_0___default().extend((jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker)._defaults, (jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker).regional['']); // eslint-disable-line no-underscore-dangle
}
function registerTimePickerTranslations() {
  'use strict';

  if (!(jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker)) {
    return;
  }
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker).regional[''].timeText = window.Messages.strCalendarTime;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker).regional[''].hourText = window.Messages.strCalendarHour;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker).regional[''].minuteText = window.Messages.strCalendarMinute;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker).regional[''].secondText = window.Messages.strCalendarSecond;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker).regional[''].millisecText = window.Messages.strCalendarMillisecond;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker).regional[''].microsecText = window.Messages.strCalendarMicrosecond;
  (jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker).regional[''].timezoneText = window.Messages.strCalendarTimezone;
  // eslint-disable-next-line no-underscore-dangle
  jquery__WEBPACK_IMPORTED_MODULE_0___default().extend((jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker)._defaults, (jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker).regional['']);
}
registerDatePickerTranslations();
registerTimePickerTranslations();

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["shared"], function() { return __webpack_exec__("./resources/js/datetimepicker.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=datetimepicker.js.map