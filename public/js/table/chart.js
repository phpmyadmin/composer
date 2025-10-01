"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["table/chart"],{

/***/ "./resources/js/modules/chart.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColumnType: function() { return /* binding */ ColumnType; },
/* harmony export */   DataTable: function() { return /* binding */ DataTable; }
/* harmony export */ });
/**
 * Column type enumeration
 */
const ColumnType = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date'
};
/**
 * The data table contains column information and data for the chart.
 */
const DataTable = function () {
  const columns = [];
  let data = null;
  this.addColumn = function (type, name) {
    columns.push({
      'type': type,
      'name': name
    });
  };
  this.getColumns = function () {
    return columns;
  };
  this.setData = function (rows) {
    data = rows;
    fillMissingValues();
  };
  this.getData = function () {
    return data;
  };
  const fillMissingValues = function () {
    if (columns.length === 0) {
      throw new Error('Set columns first');
    }
    let row;
    for (let i = 0; i < data.length; i++) {
      row = data[i];
      if (row.length > columns.length) {
        row.splice(columns.length - 1, row.length - columns.length);
      } else if (row.length < columns.length) {
        for (let j = row.length; j < columns.length; j++) {
          row.push(null);
        }
      }
    }
  };
};

/***/ }),

/***/ "./resources/js/table/chart.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/functions.ts");
/* harmony import */ var _modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/functions/escape.ts");
/* harmony import */ var _modules_chart_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/js/modules/chart.ts");






var chartData = {};
var tempChartTitle;
var currentChart = null;
var currentSettings = null;
var dateTimeCols = [];
var numericCols = [];
function extractDate(dateString) {
  var matches;
  var match;
  var dateTimeRegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/;
  var dateRegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  matches = dateTimeRegExp.exec(dateString);
  if (matches !== null && matches.length > 0) {
    match = matches[0];
    return new Date(match.substring(0, 4), parseInt(match.substring(5, 7), 10) - 1, match.substring(8, 10), match.substring(11, 13), match.substring(14, 16), match.substring(17, 19));
  } else {
    matches = dateRegExp.exec(dateString);
    if (matches !== null && matches.length > 0) {
      match = matches[0];
      return new Date(match.substring(0, 4), parseInt(match.substring(5, 7), 10) - 1, match.substring(8, 10));
    }
  }
  return null;
}
function queryChart(data, columnNames, settings) {
  const queryChartCanvas = document.getElementById('queryChartCanvas');
  if (!queryChartCanvas) {
    return null;
  }
  var plotSettings = {
    title: {
      text: settings.title,
      escapeHtml: true
    },
    grid: {
      drawBorder: false,
      shadow: false,
      background: 'rgba(0,0,0,0)'
    },
    legend: {
      show: true,
      placement: 'outsideGrid',
      location: 'e',
      rendererOptions: {
        numberColumns: 2
      }
    },
    axes: {
      xaxis: {
        label: (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_4__.escapeHtml)(settings.xaxisLabel)
      },
      yaxis: {
        label: settings.yaxisLabel
      }
    },
    stackSeries: settings.stackSeries
  };
  // create the data table and add columns
  const dataTable = new _modules_chart_ts__WEBPACK_IMPORTED_MODULE_5__.DataTable();
  if (settings.type === 'timeline') {
    dataTable.addColumn(_modules_chart_ts__WEBPACK_IMPORTED_MODULE_5__.ColumnType.DATE, columnNames[settings.mainAxis]);
  } else if (settings.type === 'scatter') {
    dataTable.addColumn(_modules_chart_ts__WEBPACK_IMPORTED_MODULE_5__.ColumnType.NUMBER, columnNames[settings.mainAxis]);
  } else {
    dataTable.addColumn(_modules_chart_ts__WEBPACK_IMPORTED_MODULE_5__.ColumnType.STRING, columnNames[settings.mainAxis]);
  }
  var i;
  var values = [];
  if (settings.seriesColumn === null) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(settings.selectedSeries, function (index, element) {
      dataTable.addColumn(_modules_chart_ts__WEBPACK_IMPORTED_MODULE_5__.ColumnType.NUMBER, columnNames[element]);
    });
    // set data to the data table
    var columnsToExtract = [settings.mainAxis];
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(settings.selectedSeries, function (index, element) {
      columnsToExtract.push(element);
    });
    var newRow;
    var row;
    var col;
    for (i = 0; i < data.length; i++) {
      row = data[i];
      newRow = [];
      for (var j = 0; j < columnsToExtract.length; j++) {
        col = columnNames[columnsToExtract[j]];
        if (j === 0) {
          if (settings.type === 'timeline') {
            // first column is date type
            newRow.push(extractDate(row[col]));
          } else if (settings.type === 'scatter') {
            newRow.push(parseFloat(row[col]));
          } else {
            // first column is string type
            newRow.push(row[col]);
          }
        } else {
          // subsequent columns are of type, number
          newRow.push(parseFloat(row[col]));
        }
      }
      values.push(newRow);
    }
    dataTable.setData(values);
  } else {
    var seriesNames = {};
    var seriesNumber = 1;
    var seriesColumnName = columnNames[settings.seriesColumn];
    for (i = 0; i < data.length; i++) {
      if (!seriesNames[data[i][seriesColumnName]]) {
        seriesNames[data[i][seriesColumnName]] = seriesNumber;
        seriesNumber++;
      }
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(seriesNames, function (seriesName) {
      dataTable.addColumn(_modules_chart_ts__WEBPACK_IMPORTED_MODULE_5__.ColumnType.NUMBER, seriesName);
    });
    var valueMap = {};
    var xValue;
    var value;
    var mainAxisName = columnNames[settings.mainAxis];
    var valueColumnName = columnNames[settings.valueColumn];
    for (i = 0; i < data.length; i++) {
      xValue = data[i][mainAxisName];
      value = valueMap[xValue];
      if (!value) {
        value = [xValue];
        valueMap[xValue] = value;
      }
      seriesNumber = seriesNames[data[i][seriesColumnName]];
      value[seriesNumber] = parseFloat(data[i][valueColumnName]);
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(valueMap, function (index, value) {
      values.push(value);
    });
    dataTable.setData(values);
  }
  let chartType = settings.type;
  if (chartType === 'spline' || chartType === 'timeline' || chartType === 'area') {
    chartType = 'line';
  } else if (chartType === 'column') {
    chartType = 'bar';
  }
  const chartData = dataTable.getData();
  const chartColumns = dataTable.getColumns();
  const labels = chartData.map(row => row[0]);
  const datasets = [];
  for (let i = 1; i < chartColumns.length; i++) {
    const data = chartData.map(function (row) {
      if (settings.type === 'scatter') {
        return {
          x: row[0],
          y: row[i]
        };
      }
      return row[i];
    });
    const dataset = {
      label: chartColumns[i].name,
      data: data
    };
    if (settings.type === 'area') {
      dataset.fill = 'start';
    }
    datasets.push(dataset);
  }
  const chartOptions = {
    type: chartType,
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          position: 'right'
        },
        title: {
          display: plotSettings.title.text !== '',
          text: plotSettings.title.text
        }
      },
      indexAxis: settings.type === 'bar' ? 'y' : 'x',
      scales: {
        x: {
          display: true,
          title: {
            display: plotSettings.axes.xaxis.label !== '',
            text: plotSettings.axes.xaxis.label
          },
          stacked: plotSettings.stackSeries
        },
        y: {
          display: true,
          title: {
            display: plotSettings.axes.yaxis.label !== '',
            text: plotSettings.axes.yaxis.label
          },
          stacked: plotSettings.stackSeries
        }
      }
    }
  };
  if (settings.type === 'timeline') {
    // @ts-ignore
    chartOptions.options.scales.x.type = 'time';
  }
  // @ts-ignore
  let queryChart = window.Chart.getChart('queryChartCanvas');
  if (queryChart) {
    queryChart.destroy();
  }
  // @ts-ignore
  queryChart = new window.Chart(queryChartCanvas, chartOptions);
  if (settings.type === 'spline') {
    queryChart.options.elements.line.tension = 0.4;
    queryChart.update('none');
  }
  return queryChart;
}
function drawChart() {
  currentSettings.width = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#resizer').width() - 20;
  currentSettings.height = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#resizer').height() - 20;
  // TODO: a better way using .redraw() ?
  if (currentChart !== null) {
    currentChart.destroy();
  }
  var columnNames = [];
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartXAxisSelect option').each(function () {
    columnNames.push((0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_4__.escapeHtml)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text()));
  });
  try {
    currentChart = queryChart(chartData, columnNames, currentSettings);
    if (currentChart !== null) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#saveChart').attr('href', currentChart.toBase64Image());
    }
  } catch (err) {
    (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(err.message, false);
  }
}
function getSelectedSeries() {
  var val = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartSeriesSelect').val() || [];
  var ret = [];
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(val, function (i, v) {
    ret.push(parseInt(v, 10));
  });
  return ret;
}
function onXAxisChange() {
  var $xAxisSelect = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartXAxisSelect');
  currentSettings.mainAxis = parseInt($xAxisSelect.val(), 10);
  if (dateTimeCols.indexOf(currentSettings.mainAxis) !== -1) {
    document.getElementById('timelineChartType').classList.remove('d-none');
  } else {
    document.getElementById('timelineChartType').classList.add('d-none');
    if (currentSettings.type === 'timeline') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#lineChartTypeRadio').prop('checked', true);
      currentSettings.type = 'line';
    }
  }
  if (numericCols.indexOf(currentSettings.mainAxis) !== -1) {
    document.getElementById('scatterChartType').classList.remove('d-none');
  } else {
    document.getElementById('scatterChartType').classList.add('d-none');
    if (currentSettings.type === 'scatter') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#lineChartTypeRadio').prop('checked', true);
      currentSettings.type = 'line';
    }
  }
  var xAxisTitle = $xAxisSelect.children('option:selected').text();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#xAxisLabelInput').val(xAxisTitle);
  currentSettings.xaxisLabel = xAxisTitle;
}
function onDataSeriesChange() {
  var $seriesSelect = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartSeriesSelect');
  currentSettings.selectedSeries = getSelectedSeries();
  var yAxisTitle;
  if (currentSettings.selectedSeries.length === 1) {
    document.getElementById('pieChartType').classList.remove('d-none');
    yAxisTitle = $seriesSelect.children('option:selected').text();
  } else {
    document.getElementById('pieChartType').classList.add('d-none');
    if (currentSettings.type === 'pie') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#lineChartTypeRadio').prop('checked', true);
      currentSettings.type = 'line';
    }
    yAxisTitle = window.Messages.strYValues;
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#yAxisLabelInput').val(yAxisTitle);
  currentSettings.yaxisLabel = yAxisTitle;
}
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('table/chart.js', function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="chartType"]').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#barStackedCheckbox').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#seriesColumnCheckbox').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartTitleInput').off('focus').off('keyup').off('blur');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartXAxisSelect').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartSeriesSelect').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartSeriesColumnSelect').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartValueColumnSelect').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#xAxisLabelInput').off('keyup');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#yAxisLabelInput').off('keyup');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#resizer').off('resizestop');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tblchartform').off('submit');
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('table/chart.js', function () {
  // handle chart type changes
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="chartType"]').on('click', function () {
    var type = currentSettings.type = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    if (type === 'bar' || type === 'column' || type === 'area') {
      document.getElementById('barStacked').classList.remove('d-none');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#barStackedCheckbox').prop('checked', false);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, currentSettings, {
        stackSeries: false
      });
      document.getElementById('barStacked').classList.add('d-none');
    }
    drawChart();
  });
  // handle chosing alternative data format
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#seriesColumnCheckbox').on('click', function () {
    var $seriesColumn = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartSeriesColumnSelect');
    var $valueColumn = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartValueColumnSelect');
    var $chartSeries = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartSeriesSelect');
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked')) {
      $seriesColumn.prop('disabled', false);
      $valueColumn.prop('disabled', false);
      $chartSeries.prop('disabled', true);
      currentSettings.seriesColumn = parseInt($seriesColumn.val(), 10);
      currentSettings.valueColumn = parseInt($valueColumn.val(), 10);
    } else {
      $seriesColumn.prop('disabled', true);
      $valueColumn.prop('disabled', true);
      $chartSeries.prop('disabled', false);
      currentSettings.seriesColumn = null;
      currentSettings.valueColumn = null;
    }
    drawChart();
  });
  // handle stacking for bar, column and area charts
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#barStackedCheckbox').on('click', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked')) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, currentSettings, {
        stackSeries: true
      });
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, currentSettings, {
        stackSeries: false
      });
    }
    drawChart();
  });
  // handle changes in chart title
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartTitleInput').on('focus', function () {
    tempChartTitle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
  }).on('keyup', function () {
    currentSettings.title = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartTitleInput').val();
    drawChart();
  }).on('blur', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() !== tempChartTitle) {
      drawChart();
    }
  });
  // handle changing the x-axis
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartXAxisSelect').on('change', function () {
    onXAxisChange();
    drawChart();
  });
  // handle changing the selected data series
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartSeriesSelect').on('change', function () {
    onDataSeriesChange();
    drawChart();
  });
  // handle changing the series column
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartSeriesColumnSelect').on('change', function () {
    currentSettings.seriesColumn = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val(), 10);
    drawChart();
  });
  // handle changing the value column
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartValueColumnSelect').on('change', function () {
    currentSettings.valueColumn = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val(), 10);
    drawChart();
  });
  // handle manual changes to the chart x-axis labels
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#xAxisLabelInput').on('keyup', function () {
    currentSettings.xaxisLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    drawChart();
  });
  // handle manual changes to the chart y-axis labels
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#yAxisLabelInput').on('keyup', function () {
    currentSettings.yaxisLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
    drawChart();
  });
  // handler for ajax form submission
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tblchartform').on('submit', function () {
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    if (window.codeMirrorEditor) {
      // @ts-ignore
      $form[0].elements.sql_query.value = window.codeMirrorEditor.getValue();
    }
    if (!(0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkSqlQuery)($form[0])) {
      return false;
    }
    var $msgbox = (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
    (0,_modules_functions_ts__WEBPACK_IMPORTED_MODULE_2__.prepareForAjaxRequest)($form);
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize(), function (data) {
      if (typeof data !== 'undefined' && data.success === true && typeof data.chartData !== 'undefined') {
        chartData = JSON.parse(data.chartData);
        drawChart();
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      } else {
        (0,_modules_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
      }
    }, 'json'); // end $.post()
    return false;
  });
  // from jQuery UI
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#resizer').resizable({
    minHeight: 240,
    minWidth: 300
  }).width(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#div_view_options').width() - 50).trigger('resizestop');
  currentSettings = {
    type: 'line',
    width: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#resizer').width() - 20,
    height: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#resizer').height() - 20,
    xaxisLabel: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#xAxisLabelInput').val(),
    yaxisLabel: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#yAxisLabelInput').val(),
    title: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartTitleInput').val(),
    stackSeries: false,
    mainAxis: parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#chartXAxisSelect').val(), 10),
    selectedSeries: getSelectedSeries(),
    seriesColumn: null
  };
  var vals = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="dateTimeCols"]').val().split(' ');
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(vals, function (i, v) {
    dateTimeCols.push(parseInt(v, 10));
  });
  vals = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="numericCols"]').val().split(' ');
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(vals, function (i, v) {
    numericCols.push(parseInt(v, 10));
  });
  onXAxisChange();
  onDataSeriesChange();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tblchartform').trigger('submit');
});

/***/ }),

/***/ "jquery":
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["bootstrap","shared"], function() { return __webpack_exec__("./resources/js/table/chart.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=chart.js.map