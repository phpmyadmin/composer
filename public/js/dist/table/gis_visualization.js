"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[44],{

/***/ 85:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * @fileoverview    functions used for visualizing GIS data
 *
 * @requires    jquery
 * @requires    jQueryUI
 */
class GisVisualization {
  constructor(target) {
    this.target = target;
  }
  /**
   * Make this visualization visible
   */
  show() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).show();
  }
  /**
   * Hide this visualization
   */
  hide() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).hide();
  }
  /**
   * Do cleanup when it is no longer needed
   */
  dispose() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).empty();
  }
}
const DEFAULT_SCALE = 1.0;
const ZOOM_FACTOR = 1.5;
class SvgVisualization extends GisVisualization {
  /**
   * @param {HTMLElement} target
   */
  constructor(target) {
    super(target);
    _defineProperty(this, "x", 0);
    _defineProperty(this, "y", 0);
    _defineProperty(this, "scale", DEFAULT_SCALE);
    _defineProperty(this, "dragX", 0);
    _defineProperty(this, "dragY", 0);
    this.svgEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).find('svg').get(0);
    this.originalWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.svgEl).width();
    this.originalHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.svgEl).height();
    this.width = this.originalWidth;
    this.height = this.originalHeight;
    this.boundOnMouseWheel = this.onMouseWheel.bind(this);
    this.boundOnDragStart = this.onDragStart.bind(this);
    this.boundOnDrag = this.onDrag.bind(this);
    this.boundOnPlotDblClick = this.onPlotDblClick.bind(this);
    this.boundOnZoomInClick = this.onZoomInClick.bind(this);
    this.boundOnZoomWorldClick = this.onZoomWorldClick.bind(this);
    this.boundOnZoomOutClick = this.onZoomOutClick.bind(this);
    this.boundOnLeftArrowClick = this.onLeftArrowClick.bind(this);
    this.boundOnRightArrowClick = this.onRightArrowClick.bind(this);
    this.boundOnUpArrowClick = this.onUpArrowClick.bind(this);
    this.boundOnDownArrowClick = this.onDownArrowClick.bind(this);
    this.boundOnMouseMove = this.onMouseMove.bind(this);
    this.boundOnMouseLeave = this.onMouseLeave.bind(this);
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnButtonDragStart = () => false;
    this.addControls();
    this.bindEvents();
  }
  /**
   * Adds controls for zooming and panning.
   */
  addControls() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).append(
    // pan arrows
    '<img class="button left_arrow" src="' + window.themeImagePath + 'west-mini.png">', '<img class="button right_arrow" src="' + window.themeImagePath + 'east-mini.png">', '<img class="button up_arrow" src="' + window.themeImagePath + 'north-mini.png">', '<img class="button down_arrow" src="' + window.themeImagePath + 'south-mini.png">',
    // zoom controls
    '<img class="button zoom_in" src="' + window.themeImagePath + 'zoom-plus-mini.png">', '<img class="button zoom_world" src="' + window.themeImagePath + 'zoom-world-mini.png">', '<img class="button zoom_out" src="' + window.themeImagePath + 'zoom-minus-mini.png">');
  }
  /**
   * Zooms and pans the visualization.
   */
  zoomAndPan() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('g', this.svgEl).first().attr('transform', 'translate(' + this.x + ', ' + this.y + ') scale(' + this.scale + ')');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('circle.vector', this.svgEl).attr('r', 3 / this.scale).attr('stroke-width', 2 / this.scale);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('polyline.vector', this.svgEl).attr('stroke-width', 2 / this.scale);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('path.vector', this.svgEl).attr('stroke-width', 0.5 / this.scale);
  }
  /**
   * Resizes the GIS visualization to fit into the space available.
   */
  resize() {
    const visWidth = Math.ceil(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).width());
    const visHeight = Math.ceil(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).height());
    this.x += (visWidth - this.width) / 2;
    this.y += (visHeight - this.height) / 2;
    this.width = visWidth;
    this.height = visHeight;
    this.svgEl.setAttribute('width', String(visWidth));
    this.svgEl.setAttribute('height', String(visHeight));
    this.zoomAndPan();
  }
  reset() {
    this.scale = DEFAULT_SCALE;
    this.x = 0;
    this.y = 0;
    this.width = this.originalWidth;
    this.height = this.originalHeight;
    this.resize();
  }
  getRelativeCoords(event) {
    const position = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).offset();
    return {
      x: event.pageX - position.left,
      y: event.pageY - position.top
    };
  }
  /**
   * @param {WheelEvent} event
   */
  onMouseWheel(event) {
    if (event.deltaY === 0) {
      return;
    }
    event.preventDefault();
    const relCoords = this.getRelativeCoords(event);
    const factor = event.deltaY > 0 ? 1 / ZOOM_FACTOR : ZOOM_FACTOR;
    // zoom
    this.scale *= factor;
    // zooming keeping the position under mouse pointer unmoved.
    this.x = relCoords.x - (relCoords.x - this.x) * factor;
    this.y = relCoords.y - (relCoords.y - this.y) * factor;
    this.zoomAndPan();
  }
  show() {
    super.show();
    this.resize();
  }
  dispose() {
    this.unbindEvents();
    super.dispose();
  }
  bindEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.svgEl).on('dblclick', this.boundOnPlotDblClick).on('dragstart', this.boundOnDragStart).on('drag', this.boundOnDrag).on('mousemove', '.vector', this.boundOnMouseMove).on('mouseleave', '.vector', this.boundOnMouseLeave).draggable({
      cursor: 'move',
      // Give a fake element to be used for dragging display
      helper: () => document.createElement('div')
    });
    this.svgEl.addEventListener('wheel', this.boundOnMouseWheel, {
      passive: false
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).on('dragstart', '.button', this.boundOnButtonDragStart).on('click', '.zoom_in', this.boundOnZoomInClick).on('click', '.zoom_world', this.boundOnZoomWorldClick).on('click', '.zoom_out', this.boundOnZoomOutClick).on('click', '.left_arrow', this.boundOnLeftArrowClick).on('click', '.right_arrow', this.boundOnRightArrowClick).on('click', '.up_arrow', this.boundOnUpArrowClick).on('click', '.down_arrow', this.boundOnDownArrowClick);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', this.boundOnResize);
  }
  unbindEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.svgEl).off('dblclick', this.boundOnPlotDblClick).off('dragstart', this.boundOnDragStart).off('drag', this.boundOnDrag).off('mousemove', '.vector', this.boundOnMouseMove).off('mouseleave', '.vector', this.boundOnMouseLeave).draggable('destroy');
    this.svgEl.removeEventListener('wheel', this.boundOnMouseWheel);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.target).off('dragstart', '.button', this.boundOnButtonDragStart).off('click', '.zoom_in', this.boundOnZoomInClick).off('click', '.zoom_world', this.boundOnZoomWorldClick).off('click', '.zoom_out', this.boundOnZoomOutClick).off('click', '.left_arrow', this.boundOnLeftArrowClick).off('click', '.right_arrow', this.boundOnRightArrowClick).off('click', '.up_arrow', this.boundOnUpArrowClick).off('click', '.down_arrow'), this.boundOnDownArrowClick;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('resize', this.boundOnResize);
  }
  onDragStart(event, dd) {
    this.dragX = dd.offset.left;
    this.dragY = dd.offset.top;
  }
  onDrag(event, dd) {
    this.x += Math.round(dd.offset.left - this.dragX);
    this.dragX = dd.offset.left;
    this.y += Math.round(dd.offset.top - this.dragY);
    this.dragY = dd.offset.top;
    this.zoomAndPan();
  }
  onPlotDblClick(event) {
    this.scale *= ZOOM_FACTOR;
    // zooming in keeping the position under mouse pointer unmoved.
    const relCoords = this.getRelativeCoords(event);
    this.x = relCoords.x - (relCoords.x - this.x) * ZOOM_FACTOR;
    this.y = relCoords.y - (relCoords.y - this.y) * ZOOM_FACTOR;
    this.zoomAndPan();
  }
  onZoomInClick(event) {
    event.preventDefault();
    // zoom in
    this.scale *= ZOOM_FACTOR;
    // zooming in keeping the center unmoved.
    this.x = this.width / 2 - (this.width / 2 - this.x) * ZOOM_FACTOR;
    this.y = this.height / 2 - (this.height / 2 - this.y) * ZOOM_FACTOR;
    this.zoomAndPan();
  }
  onZoomWorldClick(event) {
    event.preventDefault();
    this.reset();
  }
  onZoomOutClick(event) {
    event.preventDefault();
    // zoom out
    this.scale /= ZOOM_FACTOR;
    // zooming out keeping the center unmoved.
    this.x = this.width / 2 - (this.width / 2 - this.x) / ZOOM_FACTOR;
    this.y = this.height / 2 - (this.height / 2 - this.y) / ZOOM_FACTOR;
    this.zoomAndPan();
  }
  onLeftArrowClick(event) {
    event.preventDefault();
    this.x += 100;
    this.zoomAndPan();
  }
  onRightArrowClick(event) {
    event.preventDefault();
    this.x -= 100;
    this.zoomAndPan();
  }
  onUpArrowClick(event) {
    event.preventDefault();
    this.y += 100;
    this.zoomAndPan();
  }
  onDownArrowClick(event) {
    event.preventDefault();
    this.y -= 100;
    this.zoomAndPan();
  }
  /**
   * Detect the mousemove event and show tooltips.
   */
  onMouseMove(event) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tooltip').remove();
    const target = event.target;
    const contents = target.getAttribute('data-label').trim();
    if (contents === '') {
      return;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id="tooltip">' + (0,_modules_functions_escape_ts__WEBPACK_IMPORTED_MODULE_2__.escapeHtml)(contents) + '</div>').css({
      top: event.pageY + 10,
      left: event.pageX + 10
    }).appendTo('body').fadeIn(200);
  }
  /**
   * Detect the mouseout event and hide tooltips.
   */
  onMouseLeave() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tooltip').remove();
  }
  onResize() {
    this.resize();
  }
}
class OlVisualization extends GisVisualization {
  /**
   * @param {function(HTMLElement): ol.Map} initFn
   */
  constructor(target, data) {
    super(target);
    _defineProperty(this, "olMap", undefined);
    this.data = data;
  }
  drawOpenLayers() {
    if (typeof window.ol === 'undefined') {
      return undefined;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('head').append('<link rel="stylesheet" type="text/css" href="js/vendor/openlayers/theme/ol.css">');
    const vectorSource = new window.ol.source.Vector({
      features: getFeaturesFromOpenLayersData(this.data)
    });
    const map = new window.ol.Map({
      target: this.target,
      layers: [new window.ol.layer.Tile({
        source: new window.ol.source.OSM()
      }), new window.ol.layer.Vector({
        source: vectorSource
      })],
      view: new window.ol.View({
        center: [0, 0],
        zoom: 4
      }),
      controls: [new window.ol.control.MousePosition({
        coordinateFormat: window.ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326'
      }), new window.ol.control.Zoom(), new window.ol.control.Attribution()]
    });
    const extent = vectorSource.getExtent();
    if (!window.ol.extent.isEmpty(extent)) {
      map.getView().fit(extent, {
        padding: [20, 20, 20, 20]
      });
    }
    return map;
  }
  show() {
    super.show();
    if (this.olMap) {
      this.olMap.updateSize();
    } else {
      this.olMap = this.drawOpenLayers();
    }
  }
  dispose() {
    if (this.olMap) {
      // Removes ol.Map's resize listener from window
      this.olMap.setTarget(null);
      this.olMap = undefined;
    }
    super.dispose();
  }
}
function getFeaturesFromOpenLayersData(geometries) {
  let features = [];
  for (const geometry of geometries) {
    if (geometry.isCollection) {
      features = features.concat(getFeaturesFromOpenLayersData(geometry.geometries));
      continue;
    }
    let olGeometry = null;
    const style = {};
    if (geometry.geometry.type === 'LineString') {
      olGeometry = new window.ol.geom.LineString(geometry.geometry.coordinates);
      style.stroke = new window.ol.style.Stroke(geometry.style.stroke);
    } else if (geometry.geometry.type === 'MultiLineString') {
      olGeometry = new window.ol.geom.MultiLineString(geometry.geometry.coordinates);
      style.stroke = new window.ol.style.Stroke(geometry.style.stroke);
    } else if (geometry.geometry.type === 'MultiPoint') {
      olGeometry = new window.ol.geom.MultiPoint(geometry.geometry.coordinates);
      style.image = new window.ol.style.Circle({
        fill: new window.ol.style.Fill(geometry.style.circle.fill),
        stroke: new window.ol.style.Stroke(geometry.style.circle.stroke),
        radius: geometry.style.circle.radius
      });
    } else if (geometry.geometry.type === 'MultiPolygon') {
      olGeometry = new window.ol.geom.MultiPolygon(geometry.geometry.coordinates);
      style.fill = new window.ol.style.Fill(geometry.style.fill);
      style.stroke = new window.ol.style.Stroke(geometry.style.stroke);
    } else if (geometry.geometry.type === 'Point') {
      olGeometry = new window.ol.geom.Point(geometry.geometry.coordinates);
      style.image = new window.ol.style.Circle({
        fill: new window.ol.style.Fill(geometry.style.circle.fill),
        stroke: new window.ol.style.Stroke(geometry.style.circle.stroke),
        radius: geometry.style.circle.radius
      });
    } else if (geometry.geometry.type === 'Polygon') {
      olGeometry = new window.ol.geom.Polygon(geometry.geometry.coordinates);
      style.fill = new window.ol.style.Fill(geometry.style.fill);
      style.stroke = new window.ol.style.Stroke(geometry.style.stroke);
    } else {
      throw new Error();
    }
    if (geometry.geometry.srid !== 3857) {
      const source = 'EPSG:' + (geometry.geometry.srid !== 0 ? geometry.geometry.srid : 4326);
      const sourceProj = window.ol.getProjection(source);
      if (sourceProj) {
        olGeometry = olGeometry.transform(source, 'EPSG:3857');
      }
    }
    if (geometry.style.text) {
      style.text = new window.ol.style.Text(geometry.style.text);
    }
    const feature = new window.ol.Feature(olGeometry);
    feature.setStyle(new window.ol.style.Style(style));
    features.push(feature);
  }
  return features;
}
class GisVisualizationController {
  constructor(olData) {
    _defineProperty(this, "svgVis", undefined);
    _defineProperty(this, "olVis", undefined);
    this.boundOnChoiceChange = this.onChoiceChange.bind(this);
    this.olData = olData;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#useOsmAsBaseLayerSwitch', this.boundOnChoiceChange);
    if (typeof window.ol === 'undefined') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#useOsmAsBaseLayerSwitch, #useOsmAsBaseLayerSwitchLabel').hide();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#useOsmAsBaseLayerSwitch').prop('checked', false);
    }
    this.selectVisualization();
  }
  onChoiceChange() {
    this.selectVisualization();
  }
  /**
   * Initially loads either SVG or OSM visualization based on the choice.
   */
  selectVisualization() {
    const showOl = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#useOsmAsBaseLayerSwitch').prop('checked') === true;
    const oldVis = showOl ? this.svgVis : this.olVis;
    if (oldVis) {
      oldVis.hide();
    }
    let newVis;
    if (showOl) {
      if (!this.olVis) {
        this.olVis = new OlVisualization(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#visualization-placeholder > .visualization-target-ol').get(0), this.olData);
      }
      newVis = this.olVis;
    } else {
      if (!this.svgVis) {
        this.svgVis = new SvgVisualization(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#visualization-placeholder > .visualization-target-svg').get(0));
      }
      newVis = this.svgVis;
    }
    newVis.show();
  }
  /**
   * Cleanup events when no longer needed
   */
  dispose() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#useOsmAsBaseLayerSwitch');
    if (this.svgVis) {
      this.svgVis.dispose();
    }
    if (this.olVis) {
      this.olVis.dispose();
    }
  }
}
window.GisVisualizationController = GisVisualizationController;
let visualizationController;
/**
 * Ajax handlers for GIS visualization page
 *
 * Actions Ajaxified here:
 * Create visualization for the gis data
 */
/**
 * Unbind all event handlers before tearing down a page
 */
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerTeardown('table/gis_visualization.js', function () {
  if (visualizationController) {
    visualizationController.dispose();
    visualizationController = undefined;
  }
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.registerOnload('table/gis_visualization.js', function () {
  // If we are in GIS visualization, initialize it
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#gis_div').length > 0) {
    visualizationController = new GisVisualizationController(JSON.parse(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#visualization-placeholder').attr('data-ol-data')));
  }
});

/***/ }),

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(85); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=gis_visualization.js.map