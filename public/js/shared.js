"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([["shared"],{

/***/ "./resources/js/modules/ajax-message.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ajaxRemoveMessage: function() { return /* binding */ ajaxRemoveMessage; },
/* harmony export */   ajaxShowMessage: function() { return /* binding */ ajaxShowMessage; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _sql_highlight_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/sql-highlight.ts");



/**
 * Number of AJAX messages shown since page load.
 * @type {number}
 */
let ajaxMessageCount = 0;
/**
 * Show a message on the top of the page for an Ajax request
 *
 * Sample usage:
 *
 * 1) var $msg = ajaxShowMessage();
 * This will show a message that reads "Loading...". Such a message will not
 * disappear automatically and cannot be dismissed by the user. To remove this
 * message either the ajaxRemoveMessage($msg) function must be called or
 * another message must be show with ajaxShowMessage() function.
 *
 * 2) var $msg = ajaxShowMessage(window.Messages.strProcessingRequest);
 * This is a special case. The behaviour is same as above,
 * just with a different message
 *
 * 3) var $msg = ajaxShowMessage('The operation was successful');
 * This will show a message that will disappear automatically and it can also
 * be dismissed by the user.
 *
 * 4) var $msg = ajaxShowMessage('Some error', false);
 * This will show a message that will not disappear automatically, but it
 * can be dismissed by the user after they have finished reading it.
 *
 * @param {string|null} message string containing the message to be shown.
 *                              optional, defaults to 'Loading...'
 * @param {any} timeout         number of milliseconds for the message to be visible
 *                              optional, defaults to 5000. If set to 'false', the
 *                              notification will never disappear
 * @param {string|null} type    string to dictate the type of message shown.
 *                              optional, defaults to normal notification.
 *                              If set to 'error', the notification will show message
 *                              with red background.
 *                              If set to 'success', the notification will show with
 *                              a green background.
 * @return {JQuery<Element>}   jQuery Element that holds the message div
 *                              this object can be passed to ajaxRemoveMessage()
 *                              to remove the notification
 */
const ajaxShowMessage = function () {
  let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var msg = message;
  var newTimeOut = timeout;
  /**
   * @var self_closing Whether the notification will automatically disappear
   */
  var selfClosing = true;
  /**
   * @var dismissable Whether the user will be able to remove
   *                  the notification by clicking on it
   */
  var dismissable = true;
  // Handle the case when a empty data.message is passed.
  // We don't want the empty message
  if (msg === '') {
    return true;
  } else if (!msg) {
    // If the message is undefined, show the default
    msg = window.Messages.strLoading;
    dismissable = false;
    selfClosing = false;
  } else if (msg === window.Messages.strProcessingRequest) {
    // This is another case where the message should not disappear
    dismissable = false;
    selfClosing = false;
  }
  // Figure out whether (or after how long) to remove the notification
  if (newTimeOut === undefined || newTimeOut === null) {
    newTimeOut = 5000;
  } else if (newTimeOut === false) {
    selfClosing = false;
  }
  // Determine type of message, add styling as required
  if (type === 'error') {
    msg = '<div class="alert alert-danger" role="alert">' + msg + '</div>';
  } else if (type === 'success') {
    msg = '<div class="alert alert-success" role="alert">' + msg + '</div>';
  }
  // Create a parent element for the AJAX messages, if necessary
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#loading_parent').length === 0) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id="loading_parent"></div>').prependTo('#page_content');
  }
  // Update message count to create distinct message elements every time
  ajaxMessageCount++;
  // Remove all old messages, if any
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('[role="tooltip"]').remove();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('span.ajax_notification[id^=ajax_message_num]').remove();
  /**
   * @var $retval    a jQuery object containing the reference
   *                 to the created AJAX message
   */
  var $retval = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span class="ajax_notification" id="ajax_message_num_' + ajaxMessageCount + '"></span>').hide().appendTo('#loading_parent').html(msg).show();
  // If the notification is self-closing we should create a callback to remove it
  if (selfClosing) {
    $retval.delay(newTimeOut).fadeOut('medium', function () {
      var _bootstrap$Tooltip$ge;
      (_bootstrap$Tooltip$ge = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip.getInstance(this)) === null || _bootstrap$Tooltip$ge === void 0 || _bootstrap$Tooltip$ge.dispose();
      // Remove the notification
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
    });
  }
  // If the notification is dismissable we need to add the relevant class to it
  // and add a tooltip so that the users know that it can be removed
  if (dismissable) {
    $retval.addClass('dismissable').css('cursor', 'pointer');
    /**
     * Add a tooltip to the notification to let the user know that they
     * can dismiss the ajax notification by clicking on it.
     */
    bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip.getOrCreateInstance($retval.get(0), {
      title: window.Messages.strDismiss
    }).setContent({
      '.tooltip-inner': window.Messages.strDismiss
    });
  }
  // Hide spinner if this is not a loading message
  if (msg !== window.Messages.strLoading) {
    $retval.css('background-image', 'none');
  }
  (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_2__["default"])($retval);
  return $retval;
};
/**
 * Removes the message shown for an Ajax operation when it's completed
 *
 * @param {JQuery} $thisMessageBox Element that holds the notification
 */
const ajaxRemoveMessage = function ($thisMessageBox) {
  if ($thisMessageBox !== undefined && typeof $thisMessageBox !== 'boolean' && $thisMessageBox instanceof (jquery__WEBPACK_IMPORTED_MODULE_0___default())) {
    var _bootstrap$Tooltip$ge2;
    (_bootstrap$Tooltip$ge2 = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip.getInstance($thisMessageBox.get(0))) === null || _bootstrap$Tooltip$ge2 === void 0 || _bootstrap$Tooltip$ge2.dispose();
    $thisMessageBox.stop(true, true).fadeOut('medium');
    $thisMessageBox.remove();
  }
};
window.getAjaxMessageCount = () => ajaxMessageCount;
window.ajaxShowMessage = ajaxShowMessage;


/***/ }),

/***/ "./resources/js/modules/ajax.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AJAX: function() { return /* binding */ AJAX; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _navigation_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/navigation.ts");
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _sql_highlight_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/sql-highlight.ts");
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/js/modules/functions/escape.ts");
/* harmony import */ var _functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./resources/js/modules/functions/getImageTag.ts");
/* harmony import */ var _functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./resources/js/modules/functions/ignorePhpErrors.ts");
/* harmony import */ var _functions_handleRedirectAndReload_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./resources/js/modules/functions/handleRedirectAndReload.ts");
/* harmony import */ var _functions_checkNumberOfFields_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./resources/js/modules/functions/checkNumberOfFields.ts");
/* harmony import */ var _functions_mainMenuResizerCallback_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./resources/js/modules/functions/mainMenuResizerCallback.ts");











/**
 * This object handles ajax requests for pages. It also
 * handles the reloading of the main menu and scripts.
 *
 * @test-module AJAX
 */
const AJAX = {
  /**
   * @var {boolean} active Whether we are busy
   */
  active: false,
  /**
   * @var {object} source The object whose event initialized the request
   */
  source: null,
  /**
   * @var {object} xhr A reference to the ajax request that is currently running
   */
  xhr: null,
  /**
   * @var {object} lockedTargets, list of locked targets
   */
  lockedTargets: {},
  // eslint-disable-next-line valid-jsdoc
  /**
   * @var {Function} callback Callback to execute after a successful request
   */
  callback: function () {},
  /**
   * @var {boolean} debug Makes noise in your Firebug console
   */
  debug: false,
  /**
   * @var {object} $msgbox A reference to a jQuery object that links to a message
   *                     box that is generated by ajaxShowMessage()
   */
  $msgbox: null,
  /**
   * Given the filename of a script, returns a hash to be
   * used to refer to all the events registered for the file
   *
   * @param {string} key key The filename for which to get the event name
   *
   * @return {number}
   */
  hash: function (key) {
    var newKey = key;
    /* https://burtleburtle.net/bob/hash/doobs.html#one */
    newKey += '';
    var len = newKey.length;
    var hash = 0;
    var i = 0;
    for (; i < len; ++i) {
      hash += newKey.charCodeAt(i);
      hash += hash << 10;
      hash ^= hash >> 6;
    }
    hash += hash << 3;
    hash ^= hash >> 11;
    hash += hash << 15;
    return Math.abs(hash);
  },
  /**
   * Registers an onload event for a file
   *
   * @param {string} file   The filename for which to register the event
   * @param {Function} func The function to execute when the page is ready
   *
   * @return {self} For chaining
   */
  registerOnload: function (file, func) {
    var eventName = 'onload_' + AJAX.hash(file);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on(eventName, func);
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(
      // no need to translate
      'Registered event ' + eventName + ' for file ' + file);
    }
    return this;
  },
  /**
   * Registers a teardown event for a file. This is useful to execute functions
   * that unbind events for page elements that are about to be removed.
   *
   * @param {string} file   The filename for which to register the event
   * @param {Function} func The function to execute when
   *                        the page is about to be torn down
   *
   * @return {self} For chaining
   */
  registerTeardown: function (file, func) {
    var eventName = 'teardown_' + AJAX.hash(file);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on(eventName, func);
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(
      // no need to translate
      'Registered event ' + eventName + ' for file ' + file);
    }
    return this;
  },
  /**
   * Called when a page has finished loading, once for every
   * file that registered to the onload event of that file.
   *
   * @param {string} file The filename for which to fire the event
   */
  fireOnload: function (file) {
    var eventName = 'onload_' + AJAX.hash(file);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).trigger(eventName);
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(
      // no need to translate
      'Fired event ' + eventName + ' for file ' + file);
    }
  },
  /**
   * Called just before a page is torn down, once for every
   * file that registered to the teardown event of that file.
   *
   * @param {string} file The filename for which to fire the event
   */
  fireTeardown: function (file) {
    var eventName = 'teardown_' + AJAX.hash(file);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).triggerHandler(eventName);
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(
      // no need to translate
      'Fired event ' + eventName + ' for file ' + file);
    }
  },
  /**
   * function to handle lock page mechanism
   *
   * @param event the event object
   */
  lockPageHandler: function (event) {
    // don't consider checkbox event
    if (typeof event.target !== 'undefined') {
      if (event.target.type === 'checkbox') {
        return;
      }
    }
    var newHash = null;
    var oldHash = null;
    var lockId;
    // CodeMirror lock
    if (event.data.value === 3) {
      newHash = event.data.content;
      oldHash = true;
      lockId = 'cm';
    } else {
      // Don't lock on enter.
      if (0 === event.charCode) {
        return;
      }
      lockId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('lock-id');
      if (typeof lockId === 'undefined') {
        return;
      }
      /*
       * @todo Fix Code mirror does not give correct full value (query)
       * in textarea, it returns only the change in content.
       */
      if (event.data.value === 1) {
        newHash = AJAX.hash(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
      } else {
        newHash = AJAX.hash(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked'));
      }
      oldHash = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('val-hash');
    }
    // Set lock if old value !== new value
    // otherwise release lock
    if (oldHash !== newHash) {
      AJAX.lockedTargets[lockId] = true;
    } else {
      delete AJAX.lockedTargets[lockId];
    }
    // Show lock icon if locked targets is not empty.
    // otherwise remove lock icon
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().isEmptyObject(AJAX.lockedTargets)) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#lock_page_icon').html((0,_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_6__["default"])('s_lock', window.Messages.strLockToolTip).toString());
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#lock_page_icon').html('');
    }
  },
  /**
   * resets the lock
   */
  resetLock: function () {
    AJAX.lockedTargets = {};
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#lock_page_icon').html('');
  },
  handleMenu: {
    replace: function (content) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#floating_menubar').html(content)
      // Remove duplicate wrapper
      // TODO: don't send it in the response
      .children().first().remove();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenu').menuResizer(_functions_mainMenuResizerCallback_ts__WEBPACK_IMPORTED_MODULE_10__["default"]);
    }
  },
  /**
   * Event handler for clicks on links and form submissions
   *
   * @param {JQuery.Event} event Event data
   *
   * @return {boolean | void}
   */
  requestHandler: function (event) {
    // In some cases we don't want to handle the request here and either
    // leave the browser deal with it natively (e.g: file download)
    // or leave an existing ajax event handler present elsewhere deal with it
    var href = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href');
    if (typeof event !== 'undefined' && (event.shiftKey || event.ctrlKey || event.metaKey)) {
      return true;
    } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('target')) {
      return true;
    } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('ajax') || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('disableAjax')) {
      // reset the lockedTargets object, as specified AJAX operation has finished
      AJAX.resetLock();
      return true;
    } else if (href && href.match(/^#/)) {
      return true;
    } else if (href && href.match(/^mailto/)) {
      return true;
    } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('ui-datepicker-next') || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('ui-datepicker-prev')) {
      return true;
    }
    if (typeof event !== 'undefined') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    // triggers a confirm dialog if:
    // the user has performed some operations on loaded page
    // the user clicks on some link, (won't trigger for buttons)
    // the click event is not triggered by script
    if (typeof event !== 'undefined' && event.type === 'click' && event.isTrigger !== true && !jquery__WEBPACK_IMPORTED_MODULE_0___default().isEmptyObject(AJAX.lockedTargets) && confirm(window.Messages.strConfirmNavigation) === false) {
      return false;
    }
    AJAX.resetLock();
    var isLink = !!href || false;
    var previousLinkAborted = false;
    if (AJAX.active === true) {
      // Cancel the old request if abortable, when the user requests
      // something else. Otherwise silently bail out, as there is already
      // a request well in progress.
      if (AJAX.xhr) {
        // In case of a link request, attempt aborting
        AJAX.xhr.abort();
        if (AJAX.xhr.status === 0 && AJAX.xhr.statusText === 'abort') {
          // If aborted
          AJAX.$msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.strAbortedRequest);
          AJAX.active = false;
          AJAX.xhr = null;
          previousLinkAborted = true;
        } else {
          // If can't abort
          return false;
        }
      } else {
        // In case submitting a form, don't attempt aborting
        return false;
      }
    }
    AJAX.source = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
      scrollTop: 0
    }, 'fast');
    var url = isLink ? href : jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('action');
    var argsep = _common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator');
    var params = 'ajax_request=true' + argsep + 'ajax_page_request=true';
    var dataPost = AJAX.source.getPostData();
    if (!isLink) {
      params += argsep + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).serialize();
    } else if (dataPost) {
      params += argsep + dataPost;
      isLink = false;
    }
    if (AJAX.debug) {
      // eslint-disable-next-line no-console
      console.log('Loading: ' + url); // no need to translate
    }
    if (isLink) {
      AJAX.active = true;
      AJAX.$msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
      // Save reference for the new link request
      AJAX.xhr = jquery__WEBPACK_IMPORTED_MODULE_0___default().get(url, params, AJAX.responseHandler);
      var state = {
        url: href
      };
      if (previousLinkAborted) {
        // hack: there is already an aborted entry on stack
        // so just modify the aborted one
        history.replaceState(state, null, href);
      } else {
        history.pushState(state, null, href);
      }
    } else {
      /**
       * Manually fire the onsubmit event for the form, if any.
       * The event was saved in the jQuery data object by an onload
       * handler defined below. Workaround for bug #3583316
       */
      var onsubmit = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('onsubmit');
      // Submit the request if there is no onsubmit handler
      // or if it returns a value that evaluates to true
      if (typeof onsubmit !== 'function' || onsubmit.apply(this, [event])) {
        AJAX.active = true;
        AJAX.$msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id') === 'login_form') {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, AJAX.loginResponseHandler);
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, AJAX.responseHandler);
        }
      }
    }
  },
  /**
   * Response handler to handle login request from login modal after session expiration
   *
   * To refer to self use 'AJAX', instead of 'this' as this function
   * is called in the jQuery context.
   *
   * @param {object} data Event data
   */
  loginResponseHandler: function (data) {
    if (typeof data === 'undefined' || data === null) {
      return;
    }
    (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)(AJAX.$msgbox);
    _navigation_ts__WEBPACK_IMPORTED_MODULE_1__.Navigation.update(_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.set('token', data.new_token));
    AJAX.scriptHandler.load([]);
    if (data.displayMessage) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').prepend(data.displayMessage);
      (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_3__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content'));
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_errors').remove();
    var msg = '';
    if (data.errSubmitMsg) {
      msg = data.errSubmitMsg;
    }
    if (data.errors) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>', {
        id: 'pma_errors',
        class: 'clearfloat d-print-none'
      }).insertAfter('#selflink').append(data.errors);
      // bind for php error reporting forms (bottom)
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_ignore_errors_bottom').on('click', function (e) {
        e.preventDefault();
        (0,_functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__.ignorePhpErrors)();
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_ignore_all_errors_bottom').on('click', function (e) {
        e.preventDefault();
        (0,_functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__.ignorePhpErrors)(false);
      });
      // In case of 'sendErrorReport'='always'
      // submit the hidden error reporting form.
      if (data.sendErrorAlways === '1' && data.stopErrorReportLoop !== '1') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_report_errors_form').trigger('submit');
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.phpErrorsBeingSubmitted, false);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
          scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()
        }, 'slow');
      } else if (data.promptPhpErrors) {
        // otherwise just prompt user if it is set so.
        msg = msg + window.Messages.phpErrorsFound;
        // scroll to bottom where all the errors are displayed.
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
          scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()
        }, 'slow');
      }
    }
    (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(msg, false);
    // bind for php error reporting forms (popup)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_ignore_errors_popup').on('click', function () {
      (0,_functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__.ignorePhpErrors)();
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_ignore_all_errors_popup').on('click', function () {
      (0,_functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__.ignorePhpErrors)(false);
    });
    if (typeof data.success !== 'undefined' && data.success) {
      // reload page if user trying to login has changed
      if (_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('user') !== data.params.user) {
        // @ts-ignore
        window.location = 'index.php';
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.strLoading, false);
        AJAX.active = false;
        AJAX.xhr = null;
        return;
      }
      // remove the login modal if the login is successful otherwise show error.
      if (typeof data.logged_in !== 'undefined' && data.logged_in === 1) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#modalOverlay').length) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#modalOverlay').remove();
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('fieldset.disabled_for_expiration').removeAttr('disabled').removeClass('disabled_for_expiration');
        AJAX.fireTeardown('main.js');
        AJAX.fireOnload('main.js');
      }
      if (typeof data.new_token !== 'undefined') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=token]').val(data.new_token);
      }
    } else if (typeof data.logged_in !== 'undefined' && data.logged_in === 0) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#modalOverlay').replaceWith(data.error);
    } else {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      AJAX.active = false;
      AJAX.xhr = null;
      (0,_functions_handleRedirectAndReload_ts__WEBPACK_IMPORTED_MODULE_8__["default"])(data);
      if (data.fieldWithError) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input.error').removeClass('error');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + data.fieldWithError).addClass('error');
      }
    }
  },
  /**
   * Called after the request that was initiated by this.requestHandler()
   * has completed successfully or with a caught error. For completely
   * failed requests or requests with uncaught errors, see the .ajaxError
   * handler at the bottom of this file.
   *
   * To refer to self use 'AJAX', instead of 'this' as this function
   * is called in the jQuery context.
   *
   * @param {object} data Event data
   */
  responseHandler: function (data) {
    if (typeof data === 'undefined' || data === null) {
      return;
    }
    // Can be a string when an error occurred and only HTML was returned.
    if (typeof data === 'string') {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)(AJAX.$msgbox);
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(data).text(), false, 'error');
      AJAX.active = false;
      AJAX.xhr = null;
      return;
    }
    if (typeof data.success !== 'undefined' && data.success) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
        scrollTop: 0
      }, 'fast');
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)(AJAX.$msgbox);
      if (data.redirect) {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.redirect, false);
        AJAX.active = false;
        AJAX.xhr = null;
        return;
      }
      AJAX.scriptHandler.reset(function () {
        if (data.reloadNavigation) {
          _navigation_ts__WEBPACK_IMPORTED_MODULE_1__.Navigation.reload();
        }
        if (data.title) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('title').replaceWith(data.title);
        }
        if (data.menu) {
          var state = {
            url: data.selflink,
            menu: data.menu
          };
          history.replaceState(state, null);
          AJAX.handleMenu.replace(data.menu);
        }
        if (data.disableNaviSettings) {
          _navigation_ts__WEBPACK_IMPORTED_MODULE_1__.Navigation.disableSettings();
        } else {
          _navigation_ts__WEBPACK_IMPORTED_MODULE_1__.Navigation.ensureSettings(data.selflink);
        }
        // Remove all containers that may have
        // been added outside of #page_content
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').children().not('div.modal').not('#pma_navigation').not('#floating_menubar').not('#page_nav_icons').not('#page_content').not('#selflink').not('#pma_header').not('#pma_footer').not('#pma_demo').not('#pma_console_container').not('#prefs_autoload').remove();
        // Replace #page_content with new content
        if (data.message && data.message.length > 0) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').replaceWith('<div id=\'page_content\'>' + data.message + '</div>');
          (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_3__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content'));
          (0,_functions_checkNumberOfFields_ts__WEBPACK_IMPORTED_MODULE_9__["default"])();
        }
        if (data.selflink) {
          var source = data.selflink.split('?')[0];
          // Check for faulty links
          var $selflinkReplace = {
            'index.php?route=/import': 'index.php?route=/table/sql',
            'index.php?route=/table/chart': 'index.php?route=/sql',
            'index.php?route=/table/gis-visualization': 'index.php?route=/sql'
          };
          if ($selflinkReplace[source]) {
            var replacement = $selflinkReplace[source];
            data.selflink = data.selflink.replace(source, replacement);
          }
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selflink').find('> a').attr('href', data.selflink);
        }
        if (data.params) {
          _navigation_ts__WEBPACK_IMPORTED_MODULE_1__.Navigation.update(_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.setAll(data.params));
        }
        if (data.scripts) {
          AJAX.scriptHandler.load(data.scripts);
        }
        if (data.displayMessage) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').prepend(data.displayMessage);
          (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_3__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content'));
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_errors').remove();
        var msg = '';
        if (data.errSubmitMsg) {
          msg = data.errSubmitMsg;
        }
        if (data.errors) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>', {
            id: 'pma_errors',
            class: 'clearfloat d-print-none'
          }).insertAfter('#selflink').append(data.errors);
          // bind for php error reporting forms (bottom)
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_ignore_errors_bottom').on('click', function (e) {
            e.preventDefault();
            (0,_functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__.ignorePhpErrors)();
          });
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_ignore_all_errors_bottom').on('click', function (e) {
            e.preventDefault();
            (0,_functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__.ignorePhpErrors)(false);
          });
          // In case of 'sendErrorReport'='always'
          // submit the hidden error reporting form.
          if (data.sendErrorAlways === '1' && data.stopErrorReportLoop !== '1') {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_report_errors_form').trigger('submit');
            (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(window.Messages.phpErrorsBeingSubmitted, false);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
              scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()
            }, 'slow');
          } else if (data.promptPhpErrors) {
            // otherwise just prompt user if it is set so.
            msg = msg + window.Messages.phpErrorsFound;
            // scroll to bottom where all the errors are displayed.
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
              scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()
            }, 'slow');
          }
        }
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(msg, false);
        // bind for php error reporting forms (popup)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_ignore_errors_popup').on('click', function () {
          (0,_functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__.ignorePhpErrors)();
        });
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_ignore_all_errors_popup').on('click', function () {
          (0,_functions_ignorePhpErrors_ts__WEBPACK_IMPORTED_MODULE_7__.ignorePhpErrors)(false);
        });
        if (typeof AJAX.callback === 'function') {
          AJAX.callback.call(window);
        }
        AJAX.callback = function () {};
      });
    } else {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)(data.error, false);
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxRemoveMessage)(AJAX.$msgbox);
      var $ajaxError = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>');
      $ajaxError.attr({
        'id': 'ajaxError'
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').append($ajaxError);
      $ajaxError.html(data.error);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
        scrollTop: jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height()
      }, 200);
      AJAX.active = false;
      AJAX.xhr = null;
      (0,_functions_handleRedirectAndReload_ts__WEBPACK_IMPORTED_MODULE_8__["default"])(data);
      if (data.fieldWithError) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input.error').removeClass('error');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + data.fieldWithError).addClass('error');
      }
    }
  },
  /**
   * This object is in charge of downloading scripts,
   * keeping track of what's downloaded and firing
   * the onload event for them when the page is ready.
   */
  scriptHandler: {
    /**
     * @var {string[]} scripts The list of files already downloaded
     */
    scripts: [],
    /**
     * @var {string} scriptsVersion version of phpMyAdmin from which the
     *                              scripts have been loaded
     */
    scriptsVersion: null,
    /**
     * @var {string[]} scriptsToBeLoaded The list of files that
     *                                   need to be downloaded
     */
    scriptsToBeLoaded: [],
    /**
     * @var {string[]} scriptsToBeFired The list of files for which
     *                                  to fire the onload and unload events
     */
    scriptsToBeFired: [],
    scriptsCompleted: false,
    /**
     * Records that a file has been downloaded
     *
     * @param {string} file The filename
     * @param {boolean} fire Whether this file will be registering onload/teardown events
     */
    add: function (file, fire) {
      this.scripts.push(file);
      if (fire) {
        // Record whether to fire any events for the file
        // This is necessary to correctly tear down the initial page
        this.scriptsToBeFired.push(file);
      }
    },
    /**
     * Download a list of js files in one request
     *
     * @param {string[]} files An array of filenames and flags
     * @param {Function} callback
     */
    load: function (files) {
      let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var self = this;
      var i;
      // Clear loaded scripts if they are from another version of phpMyAdmin.
      // Depends on common params being set before loading scripts in responseHandler
      if (self.scriptsVersion === null) {
        self.scriptsVersion = _common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('version');
      } else if (self.scriptsVersion !== _common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('version')) {
        self.scripts = [];
        self.scriptsVersion = _common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('version');
      }
      self.scriptsCompleted = false;
      self.scriptsToBeFired = [];
      // We need to first complete list of files to load
      // as next loop will directly fire requests to load them
      // and that triggers removal of them from
      // self.scriptsToBeLoaded
      for (i in files) {
        self.scriptsToBeLoaded.push(files[i].name);
        if (files[i].fire) {
          self.scriptsToBeFired.push(files[i].name);
        }
      }
      for (i in files) {
        var script = files[i].name;
        // Only for scripts that we don't already have
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(script, self.scripts) === -1) {
          this.add(script, false);
          this.appendScript(script, callback);
        } else {
          self.done(script, callback);
        }
      }
      // Trigger callback if there is nothing else to load
      self.done(null, callback);
    },
    /**
     * Called whenever all files are loaded
     *
     * @param {string} script
     * @param {Function?} callback
     */
    done: function (script, callback) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(script, this.scriptsToBeFired)) {
        AJAX.fireOnload(script);
      }
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(script, this.scriptsToBeLoaded)) {
        this.scriptsToBeLoaded.splice(jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(script, this.scriptsToBeLoaded), 1);
      }
      if (script === null) {
        this.scriptsCompleted = true;
      }
      /* We need to wait for last signal (with null) or last script load */
      AJAX.active = this.scriptsToBeLoaded.length > 0 || !this.scriptsCompleted;
      /* Run callback on last script */
      if (!AJAX.active && typeof callback === 'function') {
        callback();
      }
    },
    /**
     * Appends a script element to the head to load the scripts
     *
     * @param {string} name
     * @param {Function} callback
     */
    appendScript: function (name, callback) {
      var head = document.head || document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      var self = this;
      script.src = 'js/' + name + '?' + 'v=' + encodeURIComponent(_common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('version'));
      script.async = false;
      script.onload = function () {
        self.done(name, callback);
      };
      head.appendChild(script);
    },
    /**
     * Fires all the teardown event handlers for the current page
     * and rebinds all forms and links to the request handler
     *
     * @param {Function} callback The callback to call after resetting
     */
    reset: function (callback) {
      for (var i in this.scriptsToBeFired) {
        AJAX.fireTeardown(this.scriptsToBeFired[i]);
      }
      this.scriptsToBeFired = [];
      /**
       * Re-attach a generic event handler to clicks
       * on pages and submissions of forms
       */
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a').on('click', 'a', AJAX.requestHandler);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', 'form').on('submit', 'form', AJAX.requestHandler);
      callback();
    }
  },
  /**
   * Here we register a function that will remove the onsubmit event from all
   * forms that will be handled by the generic page loader. We then save this
   * event handler in the "jQuery data", so that we can fire it up later in
   * AJAX.requestHandler().
   *
   * See bug #3583316
   */
  removeSubmitEvents: function () {
    // Registering the onload event for functions.js
    // ensures that it will be fired for all pages
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('form').not('.ajax').not('.disableAjax').each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('onsubmit')) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('onsubmit', this.onsubmit).attr('onsubmit', '');
      }
    });
    var $pageContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content');
    /**
     * Workaround for passing submit button name,value on ajax form submit
     * by appending hidden element with submit button name and value.
     */
    $pageContent.on('click', 'form input[type=submit]', function () {
      var buttonName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name');
      if (typeof buttonName === 'undefined') {
        return;
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>', {
        'type': 'hidden',
        'name': buttonName,
        'value': jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()
      }));
    });
    /**
     * Attach event listener to events when user modify visible
     * Input,Textarea and select fields to make changes in forms
     */
    $pageContent.on('keyup change', 'form.lock-page textarea, ' + 'form.lock-page input[type="text"], ' + 'form.lock-page input[type="number"], ' + 'form.lock-page select', {
      value: 1
    }, AJAX.lockPageHandler);
    $pageContent.on('change', 'form.lock-page input[type="checkbox"], ' + 'form.lock-page input[type="radio"]', {
      value: 2
    }, AJAX.lockPageHandler);
    /**
     * Reset lock when lock-page form reset event is fired
     * Note: reset does not bubble in all browser so attach to
     * form directly.
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.lock-page').on('reset', function () {
      AJAX.resetLock();
    });
  },
  /**
   * Page load event handler
   * @return {function}
   */
  loadEventHandler: function () {
    return function () {
      var menuContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#server-breadcrumb').clone()).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenucontainer').clone()).html();
      // set initial state reload
      var initState = 'state' in window.history && window.history.state !== null;
      var initURL = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selflink').find('> a').attr('href') || location.href;
      var state = {
        url: initURL,
        menu: menuContent
      };
      history.replaceState(state, null);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('popstate', function (event) {
        var initPop = !initState && location.href === initURL;
        initState = true;
        // check if popstate fired on first page itself
        if (initPop) {
          return;
        }
        // @ts-ignore
        var state = event.originalEvent.state;
        if (state && state.menu) {
          AJAX.$msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)();
          var params = 'ajax_request=true' + _common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('arg_separator') + 'ajax_page_request=true';
          var url = state.url || location.href;
          jquery__WEBPACK_IMPORTED_MODULE_0___default().get(url, params, AJAX.responseHandler);
          // TODO: Check if sometimes menu is not retrieved from server,
          // Not sure but it seems menu was missing only for printview which
          // been removed lately, so if it's right some dead menu checks/fallbacks
          // may need to be removed from this file and Header.php
          // AJAX.handleMenu.replace(event.originalEvent.state.menu);
        }
      });
    };
  },
  /**
   * Gracefully handle fatal server errors (e.g: 500 - Internal server error)
   * @return {function(JQuery.Event, JQuery.jqXHR): void}
   */
  getFatalErrorHandler: function () {
    return function (event, request, settings) {
      if (AJAX.debug) {
        // eslint-disable-next-line no-console
        console.log('AJAX error: status=' + request.status + ', text=' + request.statusText);
      }
      if (settings.url.includes('/git-revision') || settings.url.includes('/console/update-config')) {
        return;
      }
      // Don't handle aborted requests
      if (request.status !== 0 || request.statusText !== 'abort') {
        var details = '';
        var state = request.state();
        if ('responseJSON' in request && 'isErrorResponse' in request.responseJSON && request.responseJSON.isErrorResponse) {
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)('<div class="alert alert-danger" role="alert">' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(request.responseJSON.error) + '</div>', false);
          AJAX.active = false;
          AJAX.xhr = null;
          return;
        }
        if (request.status !== 0) {
          details += '<div>' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(window.sprintf(window.Messages.strErrorCode, request.status)) + '</div>';
        }
        details += '<div>' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(window.sprintf(window.Messages.strErrorText, request.statusText + ' (' + state + ')')) + '</div>';
        if (state === 'rejected' || state === 'timeout') {
          details += '<div>' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(window.Messages.strErrorConnection) + '</div>';
        }
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_4__.ajaxShowMessage)('<div class="alert alert-danger" role="alert">' + window.Messages.strErrorProcessingRequest + details + '</div>', false);
        AJAX.active = false;
        AJAX.xhr = null;
      }
    };
  }
};
window.AJAX = AJAX;


/***/ }),

/***/ "./resources/js/modules/common.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommonParams: function() { return /* binding */ CommonParams; }
/* harmony export */ });
/**
 * Holds common parameters such as server, db, table, etc
 *
 * The content for this is normally loaded from Header.php or
 * Response.php and executed by ajax.js
 *
 * @test-module CommonParams
 */
const CommonParams = function () {
  /**
   * @var {Object} params An associative array of key value pairs
   * @access private
   */
  var params = {};
  // The returned object is the public part of the module
  return {
    /**
     * Saves all the key value pair that
     * are provided in the input array
     *
     * @param obj hash The input array
     *
     * @return {boolean}
     */
    setAll: function (obj) {
      let updateNavigation = false;
      for (var i in obj) {
        if (params[i] !== undefined && params[i] !== obj[i]) {
          if (i === 'db' || i === 'table') {
            updateNavigation = true;
          }
        }
        params[i] = obj[i];
      }
      return updateNavigation;
    },
    /**
     * Retrieves a value given its key
     * Returns empty string for undefined values
     *
     * @param {string} name The key
     *
     * @return {string}
     */
    get: function (name) {
      return params[name];
    },
    /**
     * Saves a single key value pair
     *
     * @param {string} name  The key
     * @param {string} value The value
     *
     * @return {boolean}
     */
    set: function (name, value) {
      let updateNavigation = false;
      if (name === 'db' || name === 'table' && params[name] !== value) {
        updateNavigation = true;
      }
      params[name] = value;
      return updateNavigation;
    },
    /**
     * Returns the url query string using the saved parameters
     *
     * @param {string} separator New separator
     *
     * @return {string}
     */
    getUrlQuery: function (separator) {
      var sep = typeof separator !== 'undefined' ? separator : '?';
      var common = this.get('common_query');
      var argsep = CommonParams.get('arg_separator');
      if (typeof common === 'string' && common.length > 0) {
        // If the last char is the separator, do not add it
        // Else add it
        common = common.endsWith(argsep) ? common : common + argsep;
      }
      return window.sprintf('%s%sserver=%s' + argsep + 'db=%s' + argsep + 'table=%s', sep, common, encodeURIComponent(this.get('server')), encodeURIComponent(this.get('db')), encodeURIComponent(this.get('table')));
    }
  };
}();
window.CommonParams = CommonParams;


/***/ }),

/***/ "./resources/js/modules/config.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Config: function() { return /* binding */ Config; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/functions/isStorageSupported.ts");
/* harmony import */ var _functions_formatDateTime_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/functions/formatDateTime.ts");





let configInlineParams;
let configScriptLoaded = false;
// default values for fields
const defaultValues = {};
/**
 * Returns field type
 *
 * @param {Element} field
 *
 * @return {string}
 */
function getFieldType(field) {
  var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()(field);
  var tagName = $field.prop('tagName');
  if (tagName === 'INPUT') {
    return $field.attr('type');
  } else if (tagName === 'SELECT') {
    return 'select';
  } else if (tagName === 'TEXTAREA') {
    return 'text';
  }
  return '';
}
/**
 * Enables or disables the "restore default value" button
 *
 * @param {Element} field
 * @param {boolean} display
 */
function setRestoreDefaultBtn(field, display) {
  var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(field).closest('td').find('.restore-default img');
  $el[display ? 'show' : 'hide']();
}
/**
 * Marks field depending on its value (system default or custom)
 *
 * @param {Element | JQuery<Element>} field
 */
function markField(field) {
  var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()(field);
  var type = getFieldType($field);
  var isDefault = checkFieldDefault($field, type);
  // checkboxes uses parent <span> for marking
  var $fieldMarker = type === 'checkbox' ? $field.parent() : $field;
  setRestoreDefaultBtn($field, !isDefault);
  $fieldMarker[isDefault ? 'removeClass' : 'addClass']('custom');
}
/**
 * Sets field value
 *
 * value must be of type:
 * o undefined (omitted) - restore default value (form default, not PMA default)
 * o String - if field_type is 'text'
 * o boolean - if field_type is 'checkbox'
 * o Array of values - if field_type is 'select'
 *
 * @param {Element} field
 * @param {string}  fieldType see {@link #getFieldType}
 * @param {string | boolean}  value
 */
function setFieldValue(field, fieldType, value) {
  var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()(field);
  switch (fieldType) {
    case 'text':
    case 'number':
      $field.val(value);
      break;
    case 'checkbox':
      $field.prop('checked', value);
      break;
    case 'select':
      var options = $field.prop('options');
      var i;
      var imax = options.length;
      for (i = 0; i < imax; i++) {
        options[i].selected = value.indexOf(options[i].value) !== -1;
      }
      break;
  }
  markField($field);
}
/**
 * Gets field value
 *
 * Will return one of:
 * o String - if type is 'text'
 * o boolean - if type is 'checkbox'
 * o Array of values - if type is 'select'
 *
 * @param {Element} field
 * @param {string}  fieldType returned by {@link #getFieldType}
 *
 * @return {boolean | string | string[] | null}
 */
function getFieldValue(field, fieldType) {
  var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()(field);
  switch (fieldType) {
    case 'text':
    case 'number':
      return $field.prop('value');
    case 'checkbox':
      return $field.prop('checked');
    case 'select':
      var options = $field.prop('options');
      var i;
      var imax = options.length;
      var items = [];
      for (i = 0; i < imax; i++) {
        if (options[i].selected) {
          items.push(options[i].value);
        }
      }
      return items;
  }
  return null;
}
/**
 * Returns values for all fields in fieldsets
 *
 * @return {object}
 */
function getAllValues() {
  var $elements = jquery__WEBPACK_IMPORTED_MODULE_0___default()('fieldset input, fieldset select, fieldset textarea');
  var values = {};
  var type;
  var value;
  for (var i = 0; i < $elements.length; i++) {
    type = getFieldType($elements[i]);
    value = getFieldValue($elements[i], type);
    if (typeof value !== 'undefined') {
      // we only have single selects, fatten array
      if (type === 'select') {
        value = value[0];
      }
      values[$elements[i].name] = value;
    }
  }
  return values;
}
/**
 * Checks whether field has its default value
 *
 * @param {Element} field
 * @param {string}  type
 *
 * @return {boolean}
 */
function checkFieldDefault(field, type) {
  var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()(field);
  var fieldId = $field.attr('id');
  if (typeof defaultValues[fieldId] === 'undefined') {
    return true;
  }
  var isDefault = true;
  var currentValue = getFieldValue($field, type);
  if (type !== 'select') {
    isDefault = currentValue === defaultValues[fieldId];
  } else {
    // compare arrays, will work for our representation of select values
    if (currentValue.length !== defaultValues[fieldId].length) {
      isDefault = false;
    } else {
      for (var i = 0; i < currentValue.length; i++) {
        if (currentValue[i] !== defaultValues[fieldId][i]) {
          isDefault = false;
          break;
        }
      }
    }
  }
  return isDefault;
}
/**
 * Returns element's id prefix
 * @param {Element} element
 *
 * @return {string}
 */
function getIdPrefix(element) {
  return jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).attr('id').replace(/[^-]+$/, '');
}
// ------------------------------------------------------------------
// Form validation and field operations
//
// form validator assignments
let validate = {};
// form validator list
const validators = {
  // regexp: numeric value
  regExpNumeric: /^[0-9]+$/,
  // regexp: extract parts from PCRE expression
  regExpPcreExtract: /(.)(.*)\1(.*)?/,
  /**
   * Validates positive number
   *
   * @param {boolean} isKeyUp
   *
   * @return {boolean}
   */
  validatePositiveNumber: function (isKeyUp) {
    if (isKeyUp && this.value === '') {
      return true;
    }
    var result = this.value !== '0' && window.validators.regExpNumeric.test(this.value);
    return result ? true : window.Messages.configErrorInvalidPositiveNumber;
  },
  /**
   * Validates non-negative number
   *
   * @param {boolean} isKeyUp
   *
   * @return {boolean}
   */
  validateNonNegativeNumber: function (isKeyUp) {
    if (isKeyUp && this.value === '') {
      return true;
    }
    var result = window.validators.regExpNumeric.test(this.value);
    return result ? true : window.Messages.configErrorInvalidNonNegativeNumber;
  },
  /**
   * Validates port number
   *
   * @return {true|string}
   */
  validatePortNumber: function () {
    if (this.value === '') {
      return true;
    }
    var result = window.validators.regExpNumeric.test(this.value) && this.value !== '0';
    return result && this.value <= 65535 ? true : window.Messages.configErrorInvalidPortNumber;
  },
  /**
   * Validates value according to given regular expression
   *
   * @param {boolean} isKeyUp
   * @param {string}  regexp
   *
   * @return {true|string}
   */
  validateByRegex: function (isKeyUp, regexp) {
    if (isKeyUp && this.value === '') {
      return true;
    }
    // convert PCRE regexp
    var parts = regexp.match(window.validators.regExpPcreExtract);
    var valid = this.value.match(new RegExp(parts[2], parts[3])) !== null;
    return valid ? true : window.Messages.configErrorInvalidValue;
  },
  /**
   * Validates upper bound for numeric inputs
   *
   * @param {boolean} isKeyUp
   * @param {number} maxValue
   *
   * @return {true|string}
   */
  validateUpperBound: function (isKeyUp, maxValue) {
    var val = parseInt(this.value, 10);
    if (isNaN(val)) {
      return true;
    }
    return val <= maxValue ? true : window.sprintf(window.Messages.configErrorInvalidUpperBound, maxValue);
  },
  // field validators
  field: {},
  // fieldset validators
  fieldset: {}
};
/**
 * Registers validator for given field
 *
 * @param {string}  id       field id
 * @param {string}  type     validator (key in validators object)
 * @param {boolean} onKeyUp  whether fire on key up
 * @param {any[]}   params   validation function parameters
 */
function registerFieldValidator(id, type, onKeyUp) {
  let params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  if (typeof window.validators[type] === 'undefined') {
    return;
  }
  if (typeof validate[id] === 'undefined') {
    validate[id] = [];
  }
  if (validate[id].length === 0) {
    validate[id].push([type, params, onKeyUp]);
  }
}
/**
 * Returns validation functions associated with form field
 *
 * @param {string}  fieldId     form field id
 * @param {boolean} onKeyUpOnly see registerFieldValidator
 *
 * @return {any[]} of [function, parameters to be passed to function]
 */
function getFieldValidators(fieldId, onKeyUpOnly) {
  // look for field bound validator
  var name = fieldId && fieldId.match(/[^-]+$/)[0];
  if (typeof window.validators.field[name] !== 'undefined') {
    return [[window.validators.field[name], null]];
  }
  // look for registered validators
  var functions = [];
  if (typeof validate[fieldId] !== 'undefined') {
    // validate[field_id]: array of [type, params, onKeyUp]
    for (var i = 0, imax = validate[fieldId].length; i < imax; i++) {
      if (onKeyUpOnly && !validate[fieldId][i][2]) {
        continue;
      }
      functions.push([window.validators[validate[fieldId][i][0]], validate[fieldId][i][1]]);
    }
  }
  return functions;
}
/**
 * Displays errors for given form fields
 *
 * WARNING: created DOM elements must be identical with the ones made by
 * PhpMyAdmin\Config\FormDisplayTemplate::displayInput()!
 *
 * @param {object} errorList list of errors in the form {field id: error array}
 */
function displayErrors(errorList) {
  var tempIsEmpty = function (item) {
    return item !== '';
  };
  for (var fieldId in errorList) {
    var errors = errorList[fieldId];
    var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + fieldId);
    var isFieldset = $field.attr('tagName') === 'FIELDSET';
    var $errorCnt;
    if (isFieldset) {
      $errorCnt = $field.find('dl.errors');
    } else {
      $errorCnt = $field.siblings('.inline_errors');
    }
    // remove empty errors (used to clear error list)
    errors = jquery__WEBPACK_IMPORTED_MODULE_0___default().grep(errors, tempIsEmpty);
    // CSS error class
    if (!isFieldset) {
      // checkboxes uses parent <span> for marking
      var $fieldMarker = $field.attr('type') === 'checkbox' ? $field.parent() : $field;
      $fieldMarker[errors.length ? 'addClass' : 'removeClass']('field-error');
    }
    if (errors.length) {
      // if error container doesn't exist, create it
      if ($errorCnt.length === 0) {
        if (isFieldset) {
          $errorCnt = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<dl class="errors"></dl>');
          $field.find('table').before($errorCnt);
        } else {
          $errorCnt = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<dl class="inline_errors"></dl>');
          $field.closest('td').append($errorCnt);
        }
      }
      var html = '';
      for (var i = 0, imax = errors.length; i < imax; i++) {
        html += '<dd>' + errors[i] + '</dd>';
      }
      $errorCnt.html(html);
    } else if ($errorCnt !== null) {
      // remove useless error container
      $errorCnt.remove();
    }
  }
}
/**
 * Validates fields and fieldsets and call displayError function as required
 */
function setDisplayError() {
  var elements = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.optbox input[id], .optbox select[id], .optbox textarea[id]');
  // run all field validators
  var errors = {};
  for (var i = 0; i < elements.length; i++) {
    validateField(elements[i], false, errors);
  }
  // run all fieldset validators
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('fieldset.optbox').each(function () {
    validateFieldset(this, false, errors);
  });
  Config.displayErrors(errors);
}
/**
 * Validates fieldset and puts errors in 'errors' object
 *
 * @param {Element} fieldset
 * @param {boolean} isKeyUp
 * @param {object}  errors
 */
function validateFieldset(fieldset, isKeyUp, errors) {
  var $fieldset = jquery__WEBPACK_IMPORTED_MODULE_0___default()(fieldset);
  if ($fieldset.length && typeof window.validators.fieldset[$fieldset.attr('id')] !== 'undefined') {
    var fieldsetErrors = window.validators.fieldset[$fieldset.attr('id')].apply($fieldset[0], [isKeyUp]);
    for (var fieldId in fieldsetErrors) {
      if (typeof errors[fieldId] === 'undefined') {
        errors[fieldId] = [];
      }
      if (typeof fieldsetErrors[fieldId] === 'string') {
        fieldsetErrors[fieldId] = [fieldsetErrors[fieldId]];
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default().merge(errors[fieldId], fieldsetErrors[fieldId]);
    }
  }
}
/**
 * Validates form field and puts errors in 'errors' object
 *
 * @param {Element} field
 * @param {boolean} isKeyUp
 * @param {object}  errors
 */
function validateField(field, isKeyUp, errors) {
  var args;
  var result;
  var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()(field);
  var fieldId = $field.attr('id');
  errors[fieldId] = [];
  var functions = getFieldValidators(fieldId, isKeyUp);
  for (var i = 0; i < functions.length; i++) {
    if (typeof functions[i][1] !== 'undefined' && functions[i][1] !== null) {
      args = functions[i][1].slice(0);
    } else {
      args = [];
    }
    args.unshift(isKeyUp);
    result = functions[i][0].apply($field[0], args);
    if (result !== true) {
      if (typeof result === 'string') {
        result = [result];
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default().merge(errors[fieldId], result);
    }
  }
}
/**
 * Validates form field and parent fieldset
 *
 * @param {Element} field
 * @param {boolean} isKeyUp
 */
function validateFieldAndFieldset(field, isKeyUp) {
  var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()(field);
  var errors = {};
  validateField($field, isKeyUp, errors);
  validateFieldset($field.closest('fieldset.optbox'), isKeyUp, errors);
  Config.displayErrors(errors);
}
function loadInlineConfig() {
  if (!Array.isArray(configInlineParams)) {
    return;
  }
  for (var i = 0; i < configInlineParams.length; ++i) {
    if (typeof configInlineParams[i] === 'function') {
      configInlineParams[i]();
    }
  }
}
function setupValidation() {
  validate = {};
  const configInlineParamsData = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#configInlineParamsData');
  if (configInlineParamsData.length > 0) {
    const fieldValidators = configInlineParamsData.data('fieldValidators');
    const inlineDefaultValues = configInlineParamsData.data('defaultValues');
    if (typeof configInlineParams === 'undefined' || !Array.isArray(configInlineParams)) {
      configInlineParams = [];
    }
    configInlineParams.push(function () {
      for (const validator of fieldValidators) {
        if (validator.args) {
          registerFieldValidator(validator.fieldId, validator.name, true, validator.args);
        } else {
          registerFieldValidator(validator.fieldId, validator.name, true);
        }
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(defaultValues, inlineDefaultValues);
  }
  configScriptLoaded = true;
  if (configScriptLoaded && typeof configInlineParams !== 'undefined') {
    Config.loadInlineConfig();
  }
  // register validators and mark custom values
  var $elements = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.optbox input[id], .optbox select[id], .optbox textarea[id]');
  $elements.each(function () {
    markField(this);
    var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    $el.on('change', function () {
      validateFieldAndFieldset(this, false);
      markField(this);
    });
    var tagName = $el.attr('tagName');
    // text fields can be validated after each change
    if (tagName === 'INPUT' && $el.attr('type') === 'text') {
      $el.on('keyup', function () {
        validateFieldAndFieldset($el, true);
        markField($el);
      });
    }
    // disable textarea spellcheck
    if (tagName === 'TEXTAREA') {
      $el.attr('spellcheck', 'false');
    }
  });
  // check whether we've refreshed a page and browser remembered modified
  // form values
  var $checkPageRefresh = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#check_page_refresh');
  if ($checkPageRefresh.length === 0 || $checkPageRefresh.val() === '1') {
    // run all field validators
    var errors = {};
    for (var i = 0; i < $elements.length; i++) {
      validateField($elements[i], false, errors);
    }
    // run all fieldset validators
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('fieldset.optbox').each(function () {
      validateFieldset(this, false, errors);
    });
    Config.displayErrors(errors);
  } else if ($checkPageRefresh) {
    $checkPageRefresh.val('1');
  }
}
//
// END: Form validation and field operations
// ------------------------------------------------------------------
function adjustPrefsNotification() {
  var $prefsAutoLoad = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#prefs_autoload');
  var $tableNameControl = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_name_col_no');
  var $prefsAutoShowing = $prefsAutoLoad.css('display') !== 'none';
  if ($prefsAutoShowing && $tableNameControl.length) {
    $tableNameControl.css('top', '55px');
  }
}
// ------------------------------------------------------------------
// "Restore default" and "set value" buttons
//
/**
 * Restores field's default value
 *
 * @param {string} fieldId
 */
function restoreField(fieldId) {
  var $field = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + fieldId);
  if ($field.length === 0 || defaultValues[fieldId] === undefined) {
    return;
  }
  setFieldValue($field, getFieldType($field), defaultValues[fieldId]);
}
function setupRestoreField() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.tab-content').on('mouseenter', '.restore-default, .set-value', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('opacity', 1);
  }).on('mouseleave', '.restore-default, .set-value', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('opacity', 0.25);
  }).on('click', '.restore-default, .set-value', function (e) {
    e.preventDefault();
    var href = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href');
    var fieldSel;
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('restore-default')) {
      fieldSel = href;
      restoreField(fieldSel.substring(1));
    } else {
      fieldSel = href.match(/^[^=]+/)[0];
      var value = href.match(/=(.+)$/)[1];
      setFieldValue(jquery__WEBPACK_IMPORTED_MODULE_0___default()(fieldSel), 'text', value);
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(fieldSel).trigger('change');
  }).find('.restore-default, .set-value')
  // inline-block for IE so opacity inheritance works
  .css({
    display: 'inline-block',
    opacity: 0.25
  });
}
//
// END: "Restore default" and "set value" buttons
// ------------------------------------------------------------------
/**
 * Saves user preferences to localStorage
 *
 * @param {Element} form
 */
function savePrefsToLocalStorage(form) {
  var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(form);
  var submit = $form.find('input[type=submit]');
  submit.prop('disabled', true);
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    url: 'index.php?route=/preferences/manage',
    cache: false,
    type: 'POST',
    data: {
      'ajax_request': true,
      'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
      'submit_get_json': true
    },
    success: function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        window.localStorage.config = data.prefs;
        window.localStorage.configMtime = data.mtime;
        window.localStorage.configMtimeLocal = new Date().toUTCString();
        updatePrefsDate();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.localStorage-empty').hide();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.localStorage-exists').show();
        var group = $form.parent('.card-body');
        group.css('height', group.height() + 'px');
        $form.hide('fast');
        $form.prev('.click-hide-message').show('fast');
      } else {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_2__.ajaxShowMessage)(data.error);
      }
    },
    complete: function () {
      submit.prop('disabled', false);
    }
  });
}
/**
 * Updates preferences timestamp in Import form
 */
function updatePrefsDate() {
  var d = new Date(window.localStorage.configMtimeLocal);
  var msg = window.Messages.strSavedOn.replace('@DATE@', (0,_functions_formatDateTime_ts__WEBPACK_IMPORTED_MODULE_4__["default"])(d));
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#opts_import_local_storage').find('div.localStorage-exists').html(msg);
}
/**
 * Prepares message which informs that localStorage preferences are available and can be imported or deleted
 */
function offerPrefsAutoimport() {
  var hasConfig = (0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_3__["default"])('localStorage') && (window.localStorage.config || false);
  var $cnt = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#prefs_autoload');
  if (!$cnt.length || !hasConfig) {
    return;
  }
  $cnt.find('a').on('click', function (e) {
    e.preventDefault();
    var $a = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    if ($a.attr('href') === '#no') {
      $cnt.remove();
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php', {
        'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
        'prefs_autoload': 'hide'
      }, null, 'html');
      return;
    } else if ($a.attr('href') === '#delete') {
      $cnt.remove();
      localStorage.clear();
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php', {
        'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
        'prefs_autoload': 'hide'
      }, null, 'html');
      return;
    }
    $cnt.find('input[name=json]').val(window.localStorage.config);
    $cnt.find('form').trigger('submit');
  });
  $cnt.show();
}
/**
 * @return {function}
 */
function off() {
  return function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.optbox input[id], .optbox select[id], .optbox textarea[id]').off('change').off('keyup');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.optbox input[type=button][name=submit_reset]').off('click');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.tab-content').off();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#import_local_storage, #export_local_storage').off('click');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.prefs-form').off('change').off('submit');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'div.click-hide-message');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#prefs_autoload').find('a').off('click');
  };
}
/**
 * @return {function}
 */
function on() {
  return function () {
    var $topmenuUpt = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#user_prefs_tabs');
    $topmenuUpt.find('a.active').attr('rel', 'samepage');
    $topmenuUpt.find('a:not(.active)').attr('rel', 'newpage');
    Config.setupValidation();
    adjustPrefsNotification();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.optbox input[type=button][name=submit_reset]').on('click', function () {
      var fields = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('fieldset').find('input, select, textarea');
      for (var i = 0, imax = fields.length; i < imax; i++) {
        setFieldValue(fields[i], getFieldType(fields[i]), defaultValues[fields[i].id]);
      }
      setDisplayError();
    });
    Config.setupRestoreField();
    offerPrefsAutoimport();
    var $radios = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#import_local_storage, #export_local_storage');
    if (!$radios.length) {
      return;
    }
    // enable JavaScript dependent fields
    $radios.prop('disabled', false).add('#export_text_file, #import_text_file').on('click', function () {
      var enableId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('id');
      var disableId;
      if (enableId.match(/local_storage$/)) {
        disableId = enableId.replace(/local_storage$/, 'text_file');
      } else {
        disableId = enableId.replace(/text_file$/, 'local_storage');
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#opts_' + disableId).addClass('disabled').find('input').prop('disabled', true);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#opts_' + enableId).removeClass('disabled').find('input').prop('disabled', false);
    });
    // detect localStorage state
    var lsSupported = (0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_3__["default"])('localStorage', true);
    var lsExists = lsSupported ? window.localStorage.config || false : false;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.localStorage-' + (lsSupported ? 'un' : '') + 'supported').hide();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.localStorage-' + (lsExists ? 'empty' : 'exists')).hide();
    if (lsExists) {
      updatePrefsDate();
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.prefs-form').on('change', function () {
      var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      var disabled = false;
      if (!lsSupported) {
        disabled = $form.find('input[type=radio][value$=local_storage]').prop('checked');
      } else if (!lsExists && $form.attr('name') === 'prefs_import' && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#import_local_storage')[0].checked) {
        disabled = true;
      }
      $form.find('input[type=submit]').prop('disabled', disabled);
    }).on('submit', function (e) {
      var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      if ($form.attr('name') === 'prefs_export' && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#export_local_storage')[0].checked) {
        e.preventDefault();
        // use AJAX to read JSON settings and save them
        savePrefsToLocalStorage($form);
      } else if ($form.attr('name') === 'prefs_import' && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#import_local_storage')[0].checked) {
        // set 'json' input and submit form
        $form.find('input[name=json]').val(window.localStorage.config);
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'div.click-hide-message', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hide();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent('.card-body').css('height', '');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent('.card-body').find('.prefs-form').show();
    });
  };
}
/**
 * Used in configuration forms and on user preferences pages
 */
const Config = {
  getAllValues: getAllValues,
  getIdPrefix: getIdPrefix,
  displayErrors: displayErrors,
  loadInlineConfig: loadInlineConfig,
  setupValidation: setupValidation,
  setupRestoreField: setupRestoreField,
  off: off,
  on: on
};
window.validators = validators;
window.Config = Config;


/***/ }),

/***/ "./resources/js/modules/functions.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDateTimePicker: function() { return /* binding */ addDateTimePicker; },
/* harmony export */   addDatepicker: function() { return /* binding */ addDatepicker; },
/* harmony export */   addNoCacheToAjaxRequests: function() { return /* binding */ addNoCacheToAjaxRequests; },
/* harmony export */   breadcrumbScrollToTop: function() { return /* binding */ breadcrumbScrollToTop; },
/* harmony export */   checkFormElementInRange: function() { return /* binding */ checkFormElementInRange; },
/* harmony export */   checkPassword: function() { return /* binding */ checkPassword; },
/* harmony export */   checkPasswordStrength: function() { return /* binding */ checkPasswordStrength; },
/* harmony export */   checkReservedWordColumns: function() { return /* binding */ checkReservedWordColumns; },
/* harmony export */   checkSqlQuery: function() { return /* binding */ checkSqlQuery; },
/* harmony export */   checkTableEditForm: function() { return /* binding */ checkTableEditForm; },
/* harmony export */   checkboxesChanged: function() { return /* binding */ checkboxesChanged; },
/* harmony export */   checkboxesSel: function() { return /* binding */ checkboxesSel; },
/* harmony export */   codeMirrorAutoCompleteOnInputRead: function() { return /* binding */ codeMirrorAutoCompleteOnInputRead; },
/* harmony export */   confirmLink: function() { return /* binding */ confirmLink; },
/* harmony export */   confirmPreviewSql: function() { return /* binding */ confirmPreviewSql; },
/* harmony export */   confirmQuery: function() { return /* binding */ confirmQuery; },
/* harmony export */   copyToClipboard: function() { return /* binding */ copyToClipboard; },
/* harmony export */   dismissNotifications: function() { return /* binding */ dismissNotifications; },
/* harmony export */   displayCopyNotification: function() { return /* binding */ displayCopyNotification; },
/* harmony export */   displayCopyStatus: function() { return /* binding */ displayCopyStatus; },
/* harmony export */   displayPasswordGenerateButton: function() { return /* binding */ displayPasswordGenerateButton; },
/* harmony export */   emptyCheckTheField: function() { return /* binding */ emptyCheckTheField; },
/* harmony export */   floatingMenuBar: function() { return /* binding */ floatingMenuBar; },
/* harmony export */   formatBytes: function() { return /* binding */ formatBytes; },
/* harmony export */   getAddIndexEventHandler: function() { return /* binding */ getAddIndexEventHandler; },
/* harmony export */   getAutoSubmitEventHandler: function() { return /* binding */ getAutoSubmitEventHandler; },
/* harmony export */   getCellValue: function() { return /* binding */ getCellValue; },
/* harmony export */   getCheckAllBoxEventHandler: function() { return /* binding */ getCheckAllBoxEventHandler; },
/* harmony export */   getCheckAllCheckboxEventHandler: function() { return /* binding */ getCheckAllCheckboxEventHandler; },
/* harmony export */   getCheckAllFilterEventHandler: function() { return /* binding */ getCheckAllFilterEventHandler; },
/* harmony export */   getFilterTextEventHandler: function() { return /* binding */ getFilterTextEventHandler; },
/* harmony export */   getForeignKeyCheckboxLoader: function() { return /* binding */ getForeignKeyCheckboxLoader; },
/* harmony export */   getKeyboardFormSubmitEventHandler: function() { return /* binding */ getKeyboardFormSubmitEventHandler; },
/* harmony export */   getPageSelectorEventHandler: function() { return /* binding */ getPageSelectorEventHandler; },
/* harmony export */   getSqlEditor: function() { return /* binding */ getSqlEditor; },
/* harmony export */   getSslPasswordEventHandler: function() { return /* binding */ getSslPasswordEventHandler; },
/* harmony export */   getSubCheckAllBoxEventHandler: function() { return /* binding */ getSubCheckAllBoxEventHandler; },
/* harmony export */   hideShowConnection: function() { return /* binding */ hideShowConnection; },
/* harmony export */   indexEditorDialog: function() { return /* binding */ indexEditorDialog; },
/* harmony export */   indexRenameDialog: function() { return /* binding */ indexRenameDialog; },
/* harmony export */   initializeMenuResizer: function() { return /* binding */ initializeMenuResizer; },
/* harmony export */   initializeToggleButtons: function() { return /* binding */ initializeToggleButtons; },
/* harmony export */   loadForeignKeyCheckbox: function() { return /* binding */ loadForeignKeyCheckbox; },
/* harmony export */   onloadChangePasswordEvents: function() { return /* binding */ onloadChangePasswordEvents; },
/* harmony export */   onloadCodeMirrorEditor: function() { return /* binding */ onloadCodeMirrorEditor; },
/* harmony export */   onloadCreateTableEvents: function() { return /* binding */ onloadCreateTableEvents; },
/* harmony export */   onloadCreateView: function() { return /* binding */ onloadCreateView; },
/* harmony export */   onloadEnumSetEditor: function() { return /* binding */ onloadEnumSetEditor; },
/* harmony export */   onloadEnumSetEditorMessage: function() { return /* binding */ onloadEnumSetEditorMessage; },
/* harmony export */   onloadFilterText: function() { return /* binding */ onloadFilterText; },
/* harmony export */   onloadIdleEvent: function() { return /* binding */ onloadIdleEvent; },
/* harmony export */   onloadLockPage: function() { return /* binding */ onloadLockPage; },
/* harmony export */   onloadLoginForm: function() { return /* binding */ onloadLoginForm; },
/* harmony export */   onloadRecentFavoriteTables: function() { return /* binding */ onloadRecentFavoriteTables; },
/* harmony export */   onloadSortLinkMouseEvent: function() { return /* binding */ onloadSortLinkMouseEvent; },
/* harmony export */   onloadSqlQueryEditEvents: function() { return /* binding */ onloadSqlQueryEditEvents; },
/* harmony export */   prepareForAjaxRequest: function() { return /* binding */ prepareForAjaxRequest; },
/* harmony export */   prettyProfilingNum: function() { return /* binding */ prettyProfilingNum; },
/* harmony export */   previewSql: function() { return /* binding */ previewSql; },
/* harmony export */   removeAutocompleteInfo: function() { return /* binding */ removeAutocompleteInfo; },
/* harmony export */   setSelectOptions: function() { return /* binding */ setSelectOptions; },
/* harmony export */   shouldShowEmptyPasswordWarning: function() { return /* binding */ shouldShowEmptyPasswordWarning; },
/* harmony export */   showHints: function() { return /* binding */ showHints; },
/* harmony export */   showIndexEditDialog: function() { return /* binding */ showIndexEditDialog; },
/* harmony export */   slidingMessage: function() { return /* binding */ slidingMessage; },
/* harmony export */   stringifyJSON: function() { return /* binding */ stringifyJSON; },
/* harmony export */   subCheckboxesChanged: function() { return /* binding */ subCheckboxesChanged; },
/* harmony export */   suggestPassword: function() { return /* binding */ suggestPassword; },
/* harmony export */   teardownCodeMirrorEditor: function() { return /* binding */ teardownCodeMirrorEditor; },
/* harmony export */   teardownCreateTableEvents: function() { return /* binding */ teardownCreateTableEvents; },
/* harmony export */   teardownCreateView: function() { return /* binding */ teardownCreateView; },
/* harmony export */   teardownEnumSetEditor: function() { return /* binding */ teardownEnumSetEditor; },
/* harmony export */   teardownEnumSetEditorMessage: function() { return /* binding */ teardownEnumSetEditorMessage; },
/* harmony export */   teardownIdleEvent: function() { return /* binding */ teardownIdleEvent; },
/* harmony export */   teardownRecentFavoriteTables: function() { return /* binding */ teardownRecentFavoriteTables; },
/* harmony export */   teardownSortLinkMouseEvent: function() { return /* binding */ teardownSortLinkMouseEvent; },
/* harmony export */   teardownSqlQueryEditEvents: function() { return /* binding */ teardownSqlQueryEditEvents; },
/* harmony export */   toggleDatepickerIfInvalid: function() { return /* binding */ toggleDatepickerIfInvalid; },
/* harmony export */   updateCode: function() { return /* binding */ updateCode; },
/* harmony export */   userAgent: function() { return /* binding */ userAgent; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _ajax_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _navigation_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/navigation.ts");
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/js/modules/sql-highlight.ts");
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./resources/js/modules/functions/escape.ts");
/* harmony import */ var _functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./resources/js/modules/functions/getImageTag.ts");
/* harmony import */ var _functions_handleRedirectAndReload_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./resources/js/modules/functions/handleRedirectAndReload.ts");
/* harmony import */ var _functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./resources/js/modules/functions/refreshMainContent.ts");
/* harmony import */ var _indexes_checkIndexType_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./resources/js/modules/indexes/checkIndexType.ts");
/* harmony import */ var _indexes_checkIndexName_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./resources/js/modules/indexes/checkIndexName.ts");
/* harmony import */ var _functions_mainMenuResizerCallback_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./resources/js/modules/functions/mainMenuResizerCallback.ts");
/* harmony import */ var _functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./resources/js/modules/functions/isStorageSupported.ts");
/* harmony import */ var _functions_adjustTotals_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./resources/js/modules/functions/adjustTotals.ts");
















/**
 * Object containing CodeMirror editor of the query editor in SQL tab.
 */
window.codeMirrorEditor = null;
/**
 * Object containing CodeMirror editor of the inline query editor.
 */
let codeMirrorInlineEditor = null;
/**
 * Shows if Table/Column name autocomplete AJAX is in progress.
 * @type {boolean}
 */
let sqlAutoCompleteInProgress = false;
/**
 * Object containing list of columns in each table.
 * @type {(any[]|boolean)}
 */
let sqlAutoComplete = false;
/**
 * String containing default table to autocomplete columns.
 * @type {string}
 */
let sqlAutoCompleteDefaultTable = '';
/**
 * Array to hold the columns in central list per db.
 * @type {any[]}
 */
window.centralColumnList = [];
/**
 * Make sure that ajax requests will not be cached by appending a random variable to their parameters.
 */
function addNoCacheToAjaxRequests(options, originalOptions) {
  const nocache = new Date().getTime() + '' + Math.floor(Math.random() * 1000000);
  if (typeof options.data === 'string') {
    options.data += '&_nocache=' + nocache + '&token=' + encodeURIComponent(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('token'));
  } else if (typeof options.data === 'object') {
    options.data = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(originalOptions.data, {
      '_nocache': nocache,
      'token': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('token')
    });
  }
}
/**
 * Get an empty string for user-agent, if undefined
 */
function userAgent() {
  try {
    return navigator.userAgent;
  } catch (e) {
    console.error(e);
    return '';
  }
}
/**
 * Adds a date/time picker to an element
 *
 * @param {object} $thisElement a jQuery object pointing to the element
 * @param {string} type
 * @param {object} options
 */
function addDatepicker($thisElement) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  if (type !== 'date' && type !== 'time' && type !== 'datetime' && type !== 'timestamp') {
    return;
  }
  var showTimepicker = true;
  if (type === 'date') {
    showTimepicker = false;
  }
  // Getting the current Date and time
  var currentDateTime = new Date();
  var defaultOptions = {
    timeInput: true,
    hour: currentDateTime.getHours(),
    minute: currentDateTime.getMinutes(),
    second: currentDateTime.getSeconds(),
    showOn: 'button',
    buttonImage: window.themeImagePath + 'b_calendar.png',
    buttonImageOnly: true,
    stepMinutes: 1,
    stepHours: 1,
    showSecond: true,
    showMillisec: true,
    showMicrosec: true,
    showTimepicker: showTimepicker,
    showButtonPanel: false,
    changeYear: true,
    dateFormat: 'yy-mm-dd',
    // yy means year with four digits
    timeFormat: 'HH:mm:ss.lc',
    constrainInput: false,
    altFieldTimeOnly: false,
    showAnim: '',
    beforeShow: function (input, inst) {
      // Remember that we came from the datepicker; this is used
      // in table/change.js by verificationsAfterFieldChange()
      $thisElement.data('comes_from', 'datepicker');
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(input).closest('.cEdit').length > 0) {
        setTimeout(function () {
          inst.dpDiv.css({
            top: 0,
            left: 0,
            position: 'relative'
          });
        }, 0);
      }
      setTimeout(function () {
        // Fix wrong timepicker z-index, doesn't work without timeout
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ui-timepicker-div').css('z-index', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ui-datepicker-div').css('z-index'));
        // Integrate tooltip text into dialog
        if ($thisElement.hasClass('timefield')) {
          const $note = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p class="note"></div>');
          $note.text(window.Messages.strMysqlAllowedValuesTipTime);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.ui-datepicker').append($note);
        } else if ($thisElement.hasClass('datefield')) {
          const $note = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p class="note"></div>');
          $note.text(window.Messages.strMysqlAllowedValuesTipDate);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.ui-datepicker').append($note);
        }
      }, 0);
    },
    onSelect: function () {
      $thisElement.data('datepicker').inline = true;
    },
    onClose: function () {
      // The value is no more from the date picker
      $thisElement.data('comes_from', '');
      if (typeof $thisElement.data('datepicker') !== 'undefined') {
        $thisElement.data('datepicker').inline = false;
      }
    }
  };
  if (type === 'time') {
    $thisElement.timepicker(jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(defaultOptions, options));
    // Add a tip regarding entering MySQL allowed-values for TIME data-type
    bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip.getOrCreateInstance($thisElement.get(0), {
      title: window.Messages.strMysqlAllowedValuesTipTime
    }).setContent({
      '.tooltip-inner': window.Messages.strMysqlAllowedValuesTipTime
    });
  } else {
    $thisElement.datetimepicker(jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(defaultOptions, options));
  }
}
/**
 * Add a date/time picker to each element that needs it
 * (only when jquery-ui-timepicker-addon.min.js is loaded)
 */
function addDateTimePicker() {
  if ((jquery__WEBPACK_IMPORTED_MODULE_0___default().timepicker) === undefined) {
    return;
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('input.timefield, input.datefield, input.datetimefield').each(function () {
    var decimals = Number(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().attr('data-decimals'));
    var type = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().attr('data-type');
    var showMillisec = false;
    var showMicrosec = false;
    var timeFormat = 'HH:mm:ss';
    var hourMax = 23;
    // check for decimal places of seconds
    if (decimals > 0 && type.indexOf('time') !== -1) {
      if (decimals > 3) {
        showMillisec = true;
        showMicrosec = true;
        timeFormat = 'HH:mm:ss.lc';
      } else {
        showMillisec = true;
        timeFormat = 'HH:mm:ss.l';
      }
    }
    if (type === 'time') {
      hourMax = 99;
    }
    addDatepicker(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), type, {
      showMillisec: showMillisec,
      showMicrosec: showMicrosec,
      timeFormat: timeFormat,
      hourMax: hourMax,
      firstDay: window.firstDayOfCalendar
    });
    // Add a tip regarding entering MySQL allowed-values for TIME and DATE data-type
    if (this.classList.contains('timefield')) {
      bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip.getOrCreateInstance(this, {
        title: window.Messages.strMysqlAllowedValuesTipTime,
        trigger: 'hover'
      }).setContent({
        '.tooltip-inner': window.Messages.strMysqlAllowedValuesTipTime
      });
    } else if (this.classList.contains('datefield')) {
      bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip.getOrCreateInstance(this, {
        title: window.Messages.strMysqlAllowedValuesTipDate,
        trigger: 'hover'
      }).setContent({
        '.tooltip-inner': window.Messages.strMysqlAllowedValuesTipDate
      });
    }
  });
}
/**
 * Creates an SQL editor which supports auto completing etc.
 *
 * @param $textarea   jQuery object wrapping the textarea to be made the editor
 * @param options     optional options for CodeMirror
 * @param {'vertical'|'horizontal'|'both'} resize optional resizing ('vertical', 'horizontal', 'both')
 * @param lintOptions additional options for lint
 */
function getSqlEditor($textarea) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  let resize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  let lintOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  if ($textarea.length === 0 || typeof window.CodeMirror === 'undefined') {
    return null;
  }
  var resizeType = resize;
  // merge options for CodeMirror
  var defaults = {
    lineNumbers: true,
    matchBrackets: true,
    extraKeys: {
      'Ctrl-Space': 'autocomplete'
    },
    hintOptions: {
      'completeSingle': false,
      'completeOnSingleClick': true
    },
    indentUnit: 4,
    mode: 'text/x-mysql',
    lineWrapping: true
  };
  // @ts-ignore
  if (window.CodeMirror.sqlLint) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(defaults, {
      gutters: ['CodeMirror-lint-markers'],
      lint: {
        // @ts-ignore
        'getAnnotations': window.CodeMirror.sqlLint,
        'async': true,
        'lintOptions': lintOptions
      }
    });
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, defaults, options);
  // create CodeMirror editor
  var codemirrorEditor = window.CodeMirror.fromTextArea($textarea[0], defaults);
  // allow resizing
  if (!resizeType) {
    resizeType = 'vertical';
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(codemirrorEditor.getWrapperElement()).css('resize', resizeType);
  // enable autocomplete
  codemirrorEditor.on('inputRead', codeMirrorAutoCompleteOnInputRead);
  // page locking
  codemirrorEditor.on('change', function (e) {
    // @ts-ignore
    e.data = {
      value: 3,
      content: codemirrorEditor.isClean()
    };
    _ajax_ts__WEBPACK_IMPORTED_MODULE_2__.AJAX.lockPageHandler(e);
  });
  return codemirrorEditor;
}
/**
 * Clear text selection
 */
function clearSelection() {
  // @ts-ignore
  if (document.selection && document.selection.empty) {
    // @ts-ignore
    document.selection.empty();
  } else if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.empty) {
      sel.empty();
    }
    if (sel.removeAllRanges) {
      sel.removeAllRanges();
    }
  }
}
/**
 * Hides/shows the default value input field, depending on the default type
 * Ticks the NULL checkbox if NULL is chosen as default value.
 *
 * @param {JQuery<HTMLElement>} $defaultType
 */
function hideShowDefaultValue($defaultType) {
  if ($defaultType.val() === 'USER_DEFINED') {
    $defaultType.siblings('.default_value').show().trigger('focus');
  } else {
    $defaultType.siblings('.default_value').hide();
    if ($defaultType.val() === 'NULL') {
      var $nullCheckbox = $defaultType.closest('tr').find('.allow_null');
      $nullCheckbox.prop('checked', true);
    }
  }
}
/**
 * Hides/shows the input field for column expression based on whether
 * VIRTUAL/PERSISTENT is selected
 *
 * @param $virtuality virtuality dropdown
 */
function hideShowExpression($virtuality) {
  if ($virtuality.val() === '') {
    $virtuality.siblings('.expression').hide();
  } else {
    $virtuality.siblings('.expression').show();
  }
}
/**
 * Show notices for ENUM columns; add/hide the default value
 *
 */
function verifyColumnsProperties() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select.column_type').each(function () {
    showNoticeForEnum(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    showWarningForIntTypes();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select.default_type').each(function () {
    hideShowDefaultValue(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select.virtuality').each(function () {
    hideShowExpression(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
}
/**
 * Add a hidden field to the form to indicate that this will be an
 * Ajax request (only if this hidden field does not exist)
 *
 * @param {object} $form the form
 */
function prepareForAjaxRequest($form) {
  if (!$form.find('input:hidden').is('#ajax_request_hidden')) {
    $form.append('<input type="hidden" id="ajax_request_hidden" name="ajax_request" value="true">');
  }
}
function checkPasswordStrength(value, meterObject, meterObjectLabel, username) {
  // List of words we don't want to appear in the password
  var customDict = ['phpmyadmin', 'mariadb', 'mysql', 'php', 'my', 'admin'];
  if (username) {
    customDict.push(username);
  }
  window.zxcvbnts.core.zxcvbnOptions.setOptions({
    dictionary: {
      userInputs: customDict
    }
  });
  var zxcvbnObject = window.zxcvbnts.core.zxcvbn(value);
  var strength = zxcvbnObject.score;
  strength = parseInt(strength);
  meterObject.val(strength);
  switch (strength) {
    case 0:
      meterObjectLabel.html(window.Messages.strExtrWeak);
      break;
    case 1:
      meterObjectLabel.html(window.Messages.strVeryWeak);
      break;
    case 2:
      meterObjectLabel.html(window.Messages.strWeak);
      break;
    case 3:
      meterObjectLabel.html(window.Messages.strGood);
      break;
    case 4:
      meterObjectLabel.html(window.Messages.strStrong);
  }
}
/**
 * Generate a new password and copy it to the password input areas
 *
 * @param {object} passwordForm the form that holds the password fields
 *
 * @return {boolean} always true
 */
function suggestPassword(passwordForm) {
  // restrict the password to just letters and numbers to avoid problems:
  // "editors and viewers regard the password as multiple words and
  // things like double click no longer work"
  var pwchars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWYXZ@!_.*/()[]-';
  var passwordlength = 16; // do we want that to be dynamic?  no, keep it simple :)
  var passwd = passwordForm.generated_pw;
  // eslint-disable-next-line compat/compat
  var randomWords = new Int32Array(passwordlength);
  passwd.value = '';
  var i;
  // First we're going to try to use a built-in CSPRNG
  // eslint-disable-next-line compat/compat
  if (window.crypto && window.crypto.getRandomValues) {
    // eslint-disable-next-line compat/compat
    window.crypto.getRandomValues(randomWords);
  } else if (window.msCrypto && window.msCrypto.getRandomValues) {
    // Because of course IE calls it msCrypto instead of being standard
    window.msCrypto.getRandomValues(randomWords);
  } else {
    // Fallback to Math.random
    for (i = 0; i < passwordlength; i++) {
      randomWords[i] = Math.floor(Math.random() * pwchars.length);
    }
  }
  for (i = 0; i < passwordlength; i++) {
    passwd.value += pwchars.charAt(Math.abs(randomWords[i]) % pwchars.length);
  }
  var $jQueryPasswordForm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(passwordForm);
  passwordForm.elements.pma_pw.value = passwd.value;
  passwordForm.elements.pma_pw2.value = passwd.value;
  var meterObj = $jQueryPasswordForm.find('meter[name="pw_meter"]').first();
  var meterObjLabel = $jQueryPasswordForm.find('span[name="pw_strength"]').first();
  var username = '';
  if (passwordForm.elements.username) {
    username = passwordForm.elements.username.value;
  }
  checkPasswordStrength(passwd.value, meterObj, meterObjLabel, username);
  return true;
}
/**
 * for PhpMyAdmin\Display\ChangePassword and /user-password
 */
function displayPasswordGenerateButton() {
  var generatePwdRow = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<tr></tr>').addClass('align-middle');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('<td></td>').html(window.Messages.strGeneratePassword).appendTo(generatePwdRow);
  var pwdCell = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<td colspan="2"></td>').addClass('row').appendTo(generatePwdRow);
  pwdCell.append('<div class="d-flex align-items-center col-4"></div>');
  var pwdButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
    type: 'button',
    id: 'button_generate_password',
    value: window.Messages.strGenerate
  }).addClass('btn btn-secondary button').on('click', function () {
    suggestPassword(this.form);
  });
  var pwdTextbox = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>').attr({
    type: 'text',
    name: 'generated_pw',
    id: 'generated_pw'
  }).addClass('col-6');
  pwdCell.find('div').eq(0).append(pwdButton);
  pwdCell.append(pwdTextbox);
  if (document.getElementById('button_generate_password') === null) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tr_element_before_generate_password').parent().append(generatePwdRow);
  }
  var generatePwdDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').addClass('item');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('<label></label>').attr({
    for: 'button_generate_password'
  }).html(window.Messages.strGeneratePassword + ':').appendTo(generatePwdDiv);
  var optionsSpan = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span></span>').addClass('options').appendTo(generatePwdDiv);
  pwdButton.clone(true).appendTo(optionsSpan);
  pwdTextbox.clone(true).appendTo(generatePwdDiv);
  if (document.getElementById('button_generate_password') === null) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#div_element_before_generate_password').parent().append(generatePwdDiv);
  }
}
/**
 * Displays a confirmation box before submitting a "DROP/DELETE/ALTER" query.
 * This function is called while clicking links
 *
 * @param {object} theLink     the link
 * @param {object} theSqlQuery the sql query to submit
 *
 * @return {boolean} whether to run the query or not
 */
function confirmLink(theLink, theSqlQuery) {
  // Confirmation is not required in the configuration file
  // or browser is Opera (crappy js implementation)
  if (window.Messages.strDoYouReally === '' || typeof window.opera !== 'undefined') {
    return true;
  }
  var isConfirmed = window.confirm(window.sprintf(window.Messages.strDoYouReally, theSqlQuery));
  if (isConfirmed) {
    if (typeof theLink.href !== 'undefined') {
      theLink.href += _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'is_js_confirmed=1';
    } else if (typeof theLink.form !== 'undefined') {
      theLink.form.action += '?is_js_confirmed=1';
    }
  }
  return isConfirmed;
}
/**
 * Confirms a "DROP/DELETE/ALTER" query before submitting it if required.
 *
 * @param {object} theForm1  the form
 * @param {string} sqlQuery1 the sql query string
 *
 * @return {boolean} whether to run the query or not
 *
 * @see checkSqlQuery()
 */
function confirmQuery(theForm1, sqlQuery1) {
  // Confirmation is not required in the configuration file
  if (window.Messages.strDoYouReally === '') {
    return true;
  }
  // Confirms a "DROP/DELETE/ALTER/TRUNCATE" statement
  //
  // TODO: find a way (if possible) to use the parser-analyser
  // for this kind of verification
  // For now, I just added a ^ to check for the statement at
  // beginning of expression
  var doConfirmRegExp0 = new RegExp('^\\s*DROP\\s+(IF EXISTS\\s+)?(TABLE|PROCEDURE)\\s', 'i');
  var doConfirmRegExp1 = new RegExp('^\\s*ALTER\\s+TABLE\\s+((`[^`]+`)|([A-Za-z0-9_$]+))\\s+DROP\\s', 'i');
  var doConfirmRegExp2 = new RegExp('^\\s*DELETE\\s+FROM\\s', 'i');
  var doConfirmRegExp3 = new RegExp('^\\s*TRUNCATE\\s', 'i');
  var doConfirmRegExp4 = new RegExp('^(?=.*UPDATE\\b)^((?!WHERE).)*$', 'i');
  if (doConfirmRegExp0.test(sqlQuery1) || doConfirmRegExp1.test(sqlQuery1) || doConfirmRegExp2.test(sqlQuery1) || doConfirmRegExp3.test(sqlQuery1) || doConfirmRegExp4.test(sqlQuery1)) {
    var message;
    if (sqlQuery1.length > 100) {
      message = sqlQuery1.substring(0, 100) + '\n    ...';
    } else {
      message = sqlQuery1;
    }
    var isConfirmed = window.confirm(window.sprintf(window.Messages.strDoYouReally, message));
    // statement is confirmed -> update the
    // "is_js_confirmed" form field so the confirm test won't be
    // run on the server side and allows to submit the form
    if (isConfirmed) {
      theForm1.elements.is_js_confirmed.value = 1;
      return true;
    } else {
      // statement is rejected -> do not submit the form
      window.focus();
      return false;
    } // end if (handle confirm box result)
  } // end if (display confirm box)
  return true;
}
/**
 * Displays an error message if the user submitted the sql query form with no
 * sql query, else checks for "DROP/DELETE/ALTER" statements
 *
 * @param {object} theForm the form
 *
 * @return {boolean} always false
 *
 * @see confirmQuery()
 */
function checkSqlQuery(theForm) {
  // get the textarea element containing the query
  var sqlQuery;
  if (window.codeMirrorEditor) {
    window.codeMirrorEditor.save();
    sqlQuery = window.codeMirrorEditor.getValue();
  } else {
    sqlQuery = theForm.elements.sql_query.value;
  }
  var spaceRegExp = new RegExp('\\s+');
  if (typeof theForm.elements.sql_file !== 'undefined' && theForm.elements.sql_file.value.replace(spaceRegExp, '') !== '') {
    return true;
  }
  if (typeof theForm.elements.id_bookmark !== 'undefined' && (theForm.elements.id_bookmark.value !== null || theForm.elements.id_bookmark.value !== '') && theForm.elements.id_bookmark.selectedIndex !== 0) {
    return true;
  }
  var result = false;
  // Checks for "DROP/DELETE/ALTER" statements
  if (sqlQuery.replace(spaceRegExp, '') !== '') {
    result = confirmQuery(theForm, sqlQuery);
  } else {
    alert(window.Messages.strFormEmpty);
  }
  if (window.codeMirrorEditor) {
    window.codeMirrorEditor.focus();
  } else if (codeMirrorInlineEditor) {
    codeMirrorInlineEditor.focus();
  }
  return result;
}
/**
 * Check if a form's element is empty.
 * An element containing only spaces is also considered empty
 *
 * @param {object} theForm      the form
 * @param {string} theFieldName the name of the form field to put the focus on
 *
 * @return {boolean} whether the form field is empty or not
 */
function emptyCheckTheField(theForm, theFieldName) {
  var theField = theForm.elements[theFieldName];
  var spaceRegExp = new RegExp('\\s+');
  return theField.value.replace(spaceRegExp, '') === '';
}
/**
 * Ensures a value submitted in a form is numeric and is in a range
 *
 * @param {object} theForm the form
 * @param {string} theFieldName the name of the form field to check
 * @param {any} message
 * @param {number} minimum the minimum authorized value
 * @param {number} maximum the maximum authorized value
 *
 * @return {boolean}  whether a valid number has been submitted or not
 */
function checkFormElementInRange(theForm, theFieldName, message) {
  let minimum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  let maximum = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var theField = theForm.elements[theFieldName];
  var val = parseInt(theField.value, 10);
  var min = 0;
  var max = Number.MAX_VALUE;
  if (typeof minimum !== 'undefined') {
    min = minimum;
  }
  if (typeof maximum !== 'undefined' && maximum !== null) {
    max = maximum;
  }
  if (isNaN(val)) {
    theField.select();
    alert(window.Messages.strEnterValidNumber);
    theField.focus();
    return false;
  } else if (val < min || val > max) {
    theField.select();
    alert(window.sprintf(message, val));
    theField.focus();
    return false;
  } else {
    theField.value = val;
  }
  return true;
}
function checkTableEditForm(theForm, fieldsCnt) {
  // TODO: avoid sending a message if user just wants to add a line
  // on the form but has not completed at least one field name
  var atLeastOneField = 0;
  var i;
  var elm;
  var elm2;
  var elm3;
  var val;
  var id;
  for (i = 0; i < fieldsCnt; i++) {
    id = '#field_' + i + '_2';
    elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(id);
    val = elm.val();
    if (val === 'VARCHAR' || val === 'CHAR' || val === 'BIT' || val === 'VARBINARY' || val === 'BINARY') {
      elm2 = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#field_' + i + '_3');
      val = parseInt(elm2.val(), 10);
      elm3 = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#field_' + i + '_1');
      if (isNaN(val) && elm3.val() !== '') {
        elm2.select();
        alert(window.Messages.strEnterValidLength);
        elm2.focus();
        return false;
      }
    }
    if (atLeastOneField === 0) {
      id = 'field_' + i + '_1';
      if (!emptyCheckTheField(theForm, id)) {
        atLeastOneField = 1;
      }
    }
  }
  if (atLeastOneField === 0) {
    var theField = theForm.elements.field_0_1;
    alert(window.Messages.strFormEmpty);
    theField.focus();
    return false;
  }
  // at least this section is under jQuery
  var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input.textfield[name=\'table\']');
  if ($input.val() === '') {
    alert(window.Messages.strFormEmpty);
    $input.trigger('focus');
    return false;
  }
  return true;
}
/**
 * True if last click is to check a row.
 * @type {boolean}
 */
let lastClickChecked = false;
/**
 * Zero-based index of last clicked row. Used to handle the shift + click event in the code above.
 * @type {number}
 */
let lastClickedRow = -1;
/**
 * Zero-based index of last shift clicked row.
 * @type {number}
 */
let lastShiftClickedRow = -1;
/** @type {number} */
let idleSecondsCounter = 0;
/** @type {number} */
let incInterval;
/** @type {number} */
let updateTimeout;
function teardownIdleEvent() {
  clearTimeout(updateTimeout);
  clearInterval(incInterval);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mousemove');
}
function onloadIdleEvent() {
  document.onclick = function () {
    idleSecondsCounter = 0;
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousemove', function () {
    idleSecondsCounter = 0;
  });
  document.onkeypress = function () {
    idleSecondsCounter = 0;
  };
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  function SetIdleTime() {
    idleSecondsCounter++;
  }
  function UpdateIdleTime() {
    var href = 'index.php?route=/';
    var guid = 'default';
    if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_14__["default"])('sessionStorage')) {
      guid = window.sessionStorage.guid;
    }
    var params = {
      'ajax_request': true,
      'server': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server'),
      'db': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db'),
      'guid': guid,
      'access_time': idleSecondsCounter,
      'check_timeout': 1
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      type: 'POST',
      url: href,
      data: params,
      success: function (data) {
        if (data.success) {
          if (_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('LoginCookieValidity') - idleSecondsCounter < 0) {
            /* There is other active window, let's reset counter */
            idleSecondsCounter = 0;
          }
          var remaining = Math.min(/* Remaining login validity */
          _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('LoginCookieValidity') - idleSecondsCounter, /* Remaining time till session GC */
          _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('session_gc_maxlifetime'));
          var interval = 1000;
          if (remaining > 5) {
            // max value for setInterval() function
            interval = Math.min((remaining - 1) * 1000, Math.pow(2, 31) - 1);
          }
          updateTimeout = window.setTimeout(UpdateIdleTime, interval);
        } else {
          // timeout occurred
          clearInterval(incInterval);
          if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_14__["default"])('sessionStorage')) {
            window.sessionStorage.clear();
          }
          // append the login form on the page, disable all the forms which were not disabled already, close all the open jqueryui modal boxes
          if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#modalOverlay').length) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('fieldset').not(':disabled').attr('disabled', 'disabled').addClass('disabled_for_expiration');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append(data.error);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_username').trigger('focus');
          } else {
            _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('token', data.new_token));
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name=token]').val(data.new_token);
          }
          idleSecondsCounter = 0;
          (0,_functions_handleRedirectAndReload_ts__WEBPACK_IMPORTED_MODULE_9__["default"])(data);
        }
      }
    });
  }
  if (_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('logged_in')) {
    incInterval = window.setInterval(SetIdleTime, 1000);
    var sessionTimeout = Math.min(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('LoginCookieValidity'), _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('session_gc_maxlifetime'));
    if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_14__["default"])('sessionStorage')) {
      window.sessionStorage.setItem('guid', guid());
    }
    var interval = (sessionTimeout - 5) * 1000;
    if (interval > Math.pow(2, 31) - 1) {
      // max value for setInterval() function
      interval = Math.pow(2, 31) - 1;
    }
    updateTimeout = window.setTimeout(UpdateIdleTime, interval);
  }
}
/**
 * @return {function}
 */
function getCheckAllCheckboxEventHandler() {
  return function (e) {
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $tr = $this.closest('tr');
    var $table = $this.closest('table');
    if (!e.shiftKey || lastClickedRow === -1) {
      // usual click
      var $checkbox = $tr.find(':checkbox.checkall');
      var checked = $this.prop('checked');
      $checkbox.prop('checked', checked).trigger('change');
      if (checked) {
        $tr.addClass('marked table-active');
      } else {
        $tr.removeClass('marked table-active');
      }
      lastClickChecked = checked;
      // remember the last clicked row
      lastClickedRow = lastClickChecked ? $table.find('tbody tr:not(.noclick)').index($tr) : -1;
      lastShiftClickedRow = -1;
    } else {
      // handle the shift click
      clearSelection();
      var start;
      var end;
      // clear last shift click result
      if (lastShiftClickedRow >= 0) {
        if (lastShiftClickedRow >= lastClickedRow) {
          start = lastClickedRow;
          end = lastShiftClickedRow;
        } else {
          start = lastShiftClickedRow;
          end = lastClickedRow;
        }
        $tr.parent().find('tr:not(.noclick)').slice(start, end + 1).removeClass('marked table-active').find(':checkbox').prop('checked', false).trigger('change');
      }
      // handle new shift click
      var currRow = $table.find('tbody tr:not(.noclick)').index($tr);
      if (currRow >= lastClickedRow) {
        start = lastClickedRow;
        end = currRow;
      } else {
        start = currRow;
        end = lastClickedRow;
      }
      $tr.parent().find('tr:not(.noclick)').slice(start, end + 1).addClass('marked table-active').find(':checkbox').prop('checked', true).trigger('change');
      // remember the last shift clicked row
      lastShiftClickedRow = currRow;
    }
  };
}
/**
 * Checks/unchecks all options of a <select> element
 *
 * @param {string} theForm   the form name
 * @param {string} theSelect the element name
 * @param {boolean} doCheck  whether to check or to uncheck options
 *
 * @return {boolean} always true
 */
function setSelectOptions(theForm, theSelect, doCheck) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('form[name=\'' + theForm + '\'] select[name=\'' + theSelect + '\']').find('option').prop('selected', doCheck);
  return true;
}
/**
 * Updates the input fields for the parameters based on the query
 */
function updateQueryParameters() {
  if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#parameterized').is(':checked')) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#parametersDiv').empty();
    return;
  }
  var query = window.codeMirrorEditor ? window.codeMirrorEditor.getValue() : jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').val();
  var allParameters = query.match(/:[a-zA-Z0-9_]+/g);
  var parameters = [];
  // get unique parameters
  if (allParameters) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(allParameters, function (i, parameter) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default().inArray(parameter, parameters) === -1) {
        parameters.push(parameter);
      }
    });
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#parametersDiv').text(window.Messages.strNoParam);
    return;
  }
  var $temp = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>');
  $temp.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#parametersDiv').children());
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#parametersDiv').empty();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(parameters, function (i, parameter) {
    var paramName = parameter.substring(1);
    var $param = $temp.find('#paramSpan_' + paramName);
    if (!$param.length) {
      $param = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<span class="parameter" id="paramSpan_' + paramName + '"></span>');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<label for="param_' + paramName + '"></label>').text(parameter).appendTo($param);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input type="text" name="parameters[' + parameter + ']" id="param_' + paramName + '">').appendTo($param);
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#parametersDiv').append($param);
  });
}
/**
 * Get checkbox for foreign key checks
 *
 * @return {string}
 */
function getForeignKeyCheckboxLoader() {
  var html = '';
  html += '<div class="mt-1 mb-2">';
  html += '<div class="load-default-fk-check-value">';
  html += (0,_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_8__["default"])('ajax_clock_small');
  html += '</div>';
  html += '</div>';
  return html;
}
function loadForeignKeyCheckbox() {
  // Load default foreign key check value
  var params = {
    'ajax_request': true,
    'server': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server')
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default().get('index.php?route=/sql/get-default-fk-check-value', params, function (data) {
    var html = '<input type="hidden" name="fk_checks" value="0">' + '<input type="checkbox" name="fk_checks" id="fk_checks"' + (data.default_fk_check_value ? ' checked' : '') + '>' + '<label for="fk_checks">' + window.Messages.strForeignKeyCheck + '</label>';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.load-default-fk-check-value').replaceWith(html);
  });
}
function teardownSqlQueryEditEvents() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.inline_edit_sql');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'input#sql_query_edit_save');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'input#sql_query_edit_discard');
  if (window.codeMirrorEditor) {
    // @ts-ignore
    window.codeMirrorEditor.off('blur');
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('blur', '#sqlquery');
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', '#parameterized');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').off('keydown');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sql_query_edit').off('keydown');
  if (codeMirrorInlineEditor) {
    // Copy the sql query to the text area to preserve it.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sql_query_edit').text(codeMirrorInlineEditor.getValue());
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(codeMirrorInlineEditor.getWrapperElement()).off('keydown');
    codeMirrorInlineEditor.toTextArea();
    codeMirrorInlineEditor = null;
  }
  if (window.codeMirrorEditor) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window.codeMirrorEditor.getWrapperElement()).off('keydown');
  }
}
function onloadSqlQueryEditEvents() {
  // If we are coming back to the page by clicking forward button
  // of the browser, bind the code mirror to inline query editor.
  bindCodeMirrorToInlineEditor();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.inline_edit_sql', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sql_query_edit').length) {
      // An inline query editor is already open,
      // we don't want another copy of it
      return false;
    }
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent().find('form');
    var sqlQuery = $form.find('input[name=\'sql_query\']').val().trim();
    var $innerSql = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent().parent().prev().find('code.sql').closest('pre');
    var newContent = '<textarea name="sql_query_edit" id="sql_query_edit">' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(sqlQuery) + '</textarea>\n';
    newContent += getForeignKeyCheckboxLoader();
    newContent += '<input type="submit" id="sql_query_edit_save" class="btn btn-secondary button btnSave" value="' + window.Messages.strGo + '">\n';
    newContent += '<input type="button" id="sql_query_edit_discard" class="btn btn-secondary button btnDiscard" value="' + window.Messages.strCancel + '">\n';
    var $editorArea = jquery__WEBPACK_IMPORTED_MODULE_0___default()('div#inline_editor');
    if ($editorArea.length === 0) {
      $editorArea = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id="inline_editor_outer"></div>');
      $editorArea.insertBefore($innerSql);
    }
    $editorArea.html(newContent);
    loadForeignKeyCheckbox();
    $innerSql.hide();
    bindCodeMirrorToInlineEditor();
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'input#sql_query_edit_save', function () {
    // hide already existing success message
    var sqlQuery;
    if (codeMirrorInlineEditor) {
      codeMirrorInlineEditor.save();
      sqlQuery = codeMirrorInlineEditor.getValue();
    } else {
      sqlQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().find('#sql_query_edit').val();
    }
    var fkCheck = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().find('#fk_checks').is(':checked');
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.inline_edit_sql').parent().parent().find('form');
    var $fakeForm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<form>', {
      action: 'index.php?route=/import',
      method: 'post'
    }).append($form.find('input[name=server], input[name=db], input[name=table], input[name=token]').clone()).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>', {
      type: 'hidden',
      name: 'show_query',
      value: 1
    })).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>', {
      type: 'hidden',
      name: 'is_js_confirmed',
      value: 0
    })).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>', {
      type: 'hidden',
      name: 'sql_query',
      value: sqlQuery
    })).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input>', {
      type: 'hidden',
      name: 'fk_checks',
      value: fkCheck ? 1 : 0
    }));
    if (!checkSqlQuery($fakeForm[0])) {
      return false;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.alert-success').hide();
    $fakeForm.appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('body')).trigger('submit');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'input#sql_query_edit_discard', function () {
    var $divEditor = jquery__WEBPACK_IMPORTED_MODULE_0___default()('div#inline_editor_outer');
    $divEditor.siblings('pre').show();
    $divEditor.remove();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#parameterized', updateQueryParameters);
  var $inputUsername = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_username');
  if ($inputUsername) {
    if ($inputUsername.val() === '') {
      $inputUsername.trigger('focus');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_password').trigger('focus');
    }
  }
}
/**
 * "inputRead" event handler for CodeMirror SQL query editors for autocompletion
 * @param instance
 */
function codeMirrorAutoCompleteOnInputRead(instance) {
  if (!sqlAutoCompleteInProgress && (!instance.options.hintOptions.tables || !sqlAutoComplete)) {
    if (!sqlAutoComplete) {
      // Reset after teardown
      instance.options.hintOptions.tables = false;
      instance.options.hintOptions.defaultTable = '';
      sqlAutoCompleteInProgress = true;
      var params = {
        'ajax_request': true,
        'server': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server'),
        'db': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db'),
        'no_debug': true
      };
      var columnHintRender = function (elem, self, data) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="autocomplete-column-name">').text(data.columnName).appendTo(elem);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="autocomplete-column-hint">').text(data.columnHint).appendTo(elem);
      };
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: 'index.php?route=/database/sql/autocomplete',
        data: params,
        success: function (data) {
          if (data.success) {
            var tables = data.tables;
            sqlAutoCompleteDefaultTable = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('table');
            sqlAutoComplete = [];
            for (var table in tables) {
              if (tables.hasOwnProperty(table)) {
                var columns = tables[table];
                // @ts-ignore
                table = {
                  text: table,
                  columns: []
                };
                for (let column of columns) {
                  // @ts-ignore
                  table.columns.push({
                    text: column.field,
                    displayText: column.field + ' | ' + column.columnHint,
                    columnName: column.field,
                    columnHint: column.columnHint,
                    render: columnHintRender
                  });
                }
              }
              sqlAutoComplete.push(table);
            }
            instance.options.hintOptions.tables = sqlAutoComplete;
            instance.options.hintOptions.defaultTable = sqlAutoCompleteDefaultTable;
          }
        },
        complete: function () {
          sqlAutoCompleteInProgress = false;
        }
      });
    } else {
      instance.options.hintOptions.tables = sqlAutoComplete;
      instance.options.hintOptions.defaultTable = sqlAutoCompleteDefaultTable;
    }
  }
  if (instance.state.completionActive) {
    return;
  }
  var cur = instance.getCursor();
  var token = instance.getTokenAt(cur);
  var string = '';
  if (token.string.match(/^[.`\w@]\w*$/)) {
    string = token.string;
  }
  if (string.length > 0) {
    // @ts-ignore
    window.CodeMirror.commands.autocomplete(instance);
  }
}
function removeAutocompleteInfo() {
  sqlAutoComplete = false;
  sqlAutoCompleteDefaultTable = '';
}
/**
 * Binds the CodeMirror to the text area used to inline edit a query.
 */
function bindCodeMirrorToInlineEditor() {
  var $inlineEditor = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sql_query_edit');
  if ($inlineEditor.length === 0) {
    return;
  }
  if (typeof window.CodeMirror !== 'undefined') {
    var height = $inlineEditor.css('height');
    codeMirrorInlineEditor = getSqlEditor($inlineEditor);
    codeMirrorInlineEditor.getWrapperElement().style.height = height;
    codeMirrorInlineEditor.refresh();
    codeMirrorInlineEditor.focus();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(codeMirrorInlineEditor.getWrapperElement()).on('keydown', catchKeypressesFromSqlInlineEdit);
  } else {
    $inlineEditor.trigger('focus').on('keydown', catchKeypressesFromSqlInlineEdit);
  }
}
function catchKeypressesFromSqlInlineEdit(event) {
  // ctrl-enter is 10 in chrome and ie, but 13 in ff
  if ((event.ctrlKey || event.metaKey) && (event.keyCode === 13 || event.keyCode === 10)) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sql_query_edit_save').trigger('click');
  }
}
/**
 * Updates an element containing code.
 *
 * @param {JQuery} $base     base element which contains the raw and the
 *                           highlighted code.
 *
 * @param {string} htmlValue code in HTML format, displayed if code cannot be
 *                           highlighted
 *
 * @param {string} rawValue  raw code, used as a parameter for highlighter
 *
 * @return {boolean}        whether content was updated or not
 */
function updateCode($base, htmlValue, rawValue) {
  var $code = $base.find('code');
  if ($code.length === 0) {
    return false;
  }
  // Determines the type of the content and appropriate CodeMirror mode.
  var type = '';
  var mode = '';
  if ($code.hasClass('json')) {
    type = 'json';
    mode = 'application/json';
  } else if ($code.hasClass('sql')) {
    type = 'sql';
    mode = 'text/x-mysql';
  } else if ($code.hasClass('xml')) {
    type = 'xml';
    mode = 'application/xml';
  } else {
    return false;
  }
  // Element used to display unhighlighted code.
  var $notHighlighted = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<pre>' + htmlValue + '</pre>');
  // Tries to highlight code using CodeMirror.
  if (typeof window.CodeMirror !== 'undefined') {
    var $highlighted = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="' + type + '-highlight cm-s-default"></div>');
    // @ts-ignore
    window.CodeMirror.runMode(rawValue, mode, $highlighted[0]);
    $notHighlighted.hide();
    $code.html('').append($notHighlighted, $highlighted[0]);
  } else {
    $code.html('').append($notHighlighted);
  }
  return true;
}
/**
 * Requests SQL for previewing before executing.
 *
 * @param {JQuery<HTMLElement>} $form Form containing query data
 */
function previewSql($form) {
  var formUrl = $form.attr('action');
  var sep = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
  var formData = $form.serialize() + sep + 'do_save_data=1' + sep + 'preview_sql=1' + sep + 'ajax_request=1';
  var $messageBox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    type: 'POST',
    url: formUrl,
    data: formData,
    success: function (response) {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($messageBox);
      if (response.success) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlModal').modal('show');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlModal').find('.modal-body').first().html(response.sql_data);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlModalLabel').first().html(window.Messages.strPreviewSQL);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlModal').on('shown.bs.modal', function () {
          (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlModal'));
        });
      } else {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(response.message);
      }
    },
    error: function () {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strErrorProcessingRequest);
    }
  });
}
/**
 * Callback called when submit/"OK" is clicked on sql preview/confirm modal
 *
 * @callback onSubmitCallback
 * @param {string} url The url
 */
/**
 *
 * @param {string}           sqlData  Sql query to preview
 * @param {string}           url      Url to be sent to callback
 * @param {onSubmitCallback} callback On submit callback function
 */
function confirmPreviewSql(sqlData, url, callback) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlConfirmModal').modal('show');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlConfirmModalLabel').first().html(window.Messages.strPreviewSQL);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlConfirmCode > code.sql').first().text(sqlData);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlConfirmModal').on('shown.bs.modal', function () {
    (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlConfirmModal'));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSQLConfirmOkButton').on('click', function () {
    callback(url);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#previewSqlConfirmModal').modal('hide');
  });
}
/**
 * check for reserved keyword column name
 *
 * @param {JQuery} $form Form
 *
 * @return {boolean}
 */
function checkReservedWordColumns($form) {
  var isConfirmed = true;
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    type: 'POST',
    url: 'index.php?route=/table/structure/reserved-word-check',
    data: $form.serialize(),
    success: function (data) {
      if (typeof data.success !== 'undefined' && data.success === true) {
        isConfirmed = window.confirm(data.message);
      }
    },
    async: false
  });
  return isConfirmed;
}
/**
 * Copy text to clipboard
 *
 * @param {string | number | string[]} text to copy to clipboard
 * @param {string} inputType input type like: <input>,<textarea>, etc...
 *
 * @return {boolean}
 */
function copyToClipboard(text) {
  let inputType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '<input>';
  var $temp = jquery__WEBPACK_IMPORTED_MODULE_0___default()(inputType);
  $temp.css({
    'position': 'fixed',
    'width': '2em',
    'border': 0,
    'top': 0,
    'left': 0,
    'padding': 0,
    'background': 'transparent'
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append($temp);
  $temp.val(text).trigger('select');
  try {
    var res = document.execCommand('copy');
    $temp.remove();
    return res;
  } catch (e) {
    $temp.remove();
    return false;
  }
}
/**
 * displaying status of copy to clipboard action next to the copy button
 *
 * @param {JQuery<HTMLInputElement> | HTMLElement} copyButton jQuery the clicked button object
 * @param {boolean} copyStatus status of copyToClipboard
 */
function displayCopyStatus(copyButton, copyStatus) {
  if (copyStatus) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(copyButton).after('<span id=\'copyStatus\'> (' + window.Messages.strCopyQueryButtonSuccess + ')</span>');
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(copyButton).after('<span id=\'copyStatus\'> (' + window.Messages.strCopyQueryButtonFailure + ')</span>');
  }
  setTimeout(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#copyStatus').remove();
  }, 2000);
}
/**
 * Displaying notification of copy to clipboard action.
 *
 * @param {boolean} copyStatus status of copyToClipboard
 */
function displayCopyNotification(copyStatus) {
  if (copyStatus) {
    (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strCopyQueryButtonSuccess, 1000, 'success');
  } else {
    (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strCopyQueryButtonFailure, 1000, 'error');
  }
}
/**
 * @return {function}
 */
function dismissNotifications() {
  return function () {
    /**
     * Allows the user to dismiss a notification
     * created with ajaxShowMessage()
     */
    var holdStarter = null;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousedown', 'span.ajax_notification.dismissable', function () {
      holdStarter = setTimeout(function () {
        holdStarter = null;
      }, 250);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseup', 'span.ajax_notification.dismissable', function (event) {
      if (holdStarter && event.which === 1) {
        clearTimeout(holdStarter);
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.copyQueryBtn', function (event) {
      event.preventDefault();
      var copyStatus = copyToClipboard(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-text'));
      displayCopyStatus(this, copyStatus);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseover mouseleave', 'span.ajax_notification.dismissable a', function (event) {
      let message = window.Messages.strDismiss;
      if (event.type === 'mouseover') {
        message = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('copyQueryBtn') ? window.Messages.strCopyToClipboard : window.Messages.strEditQuery;
      }
      bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip.getOrCreateInstance('.ajax_notification', {
        title: message
      }).setContent({
        '.tooltip-inner': message
      });
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseup', '.ajax_notification a', function (event) {
      event.stopPropagation();
    });
  };
}
/**
 * Hides/shows the "Open in ENUM/SET editor" message, depending on the data type of the column currently selected
 *
 * @param selectElement
 */
function showNoticeForEnum(selectElement) {
  var enumNoticeId = selectElement.attr('id').split('_')[1];
  enumNoticeId += '_' + (parseInt(selectElement.attr('id').split('_')[2], 10) + 1);
  var selectedType = selectElement.val();
  if (selectedType === 'ENUM' || selectedType === 'SET') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('p#enum_notice_' + enumNoticeId).show();
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('p#enum_notice_' + enumNoticeId).hide();
  }
}
/**
 * Hides/shows a warning message when LENGTH is used with inappropriate integer type
 */
function showWarningForIntTypes() {
  if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('div#length_not_allowed').length) {
    return;
  }
  var lengthRestrictions = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select.column_type option').map(function () {
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).filter(':selected').attr('data-length-restricted');
  }).get();
  var restricationFound = lengthRestrictions.some(restriction => Number(restriction) === 1);
  if (restricationFound) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('div#length_not_allowed').show();
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('div#length_not_allowed').hide();
  }
}
/**
 * Formats a profiling duration nicely (in us and ms time).
 * Used in server/status/monitor.js
 *
 * @param {number} number   Number to be formatted, should be in the range of microsecond to second
 * @param {number} accuracy Accuracy, how many numbers right to the comma should be
 * @return {string}        The formatted number
 */
function prettyProfilingNum(number, accuracy) {
  var num = number;
  var acc = accuracy;
  if (!acc) {
    acc = 2;
  }
  acc = Math.pow(10, acc);
  if (num * 1000 < 0.1) {
    num = Math.round(acc * (num * 1000 * 1000)) / acc + 'µ';
  } else if (num < 0.1) {
    num = Math.round(acc * (num * 1000)) / acc + 'm';
  } else {
    num = Math.round(acc * num) / acc;
  }
  return num + 's';
}
function createFunctionConfirmModal() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#functionConfirmModal').length > 0) {
    return;
  }
  const functionConfirmModalTemplate = '<div class="modal fade" id="functionConfirmModal" tabindex="-1" aria-labelledby="functionConfirmModalLabel" aria-hidden="true">' + '  <div class="modal-dialog">' + '    <div class="modal-content">' + '      <div class="modal-header">' + '        <h5 class="modal-title" id="functionConfirmModalLabel">' + window.Messages.strConfirm + '</h5>' + '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + window.Messages.strClose + '"></button>' + '      </div>' + '      <div class="modal-body"></div>' + '      <div class="modal-footer">' + '        <button type="button" class="btn btn-secondary" id="functionConfirmOkButton">' + window.Messages.strOK + '</button>' + '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">' + window.Messages.strClose + '</button>' + '      </div>' + '    </div>' + '  </div>' + '</div>';
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(functionConfirmModalTemplate).appendTo('body');
}
/**
 * jQuery function that uses jQueryUI's dialogs to confirm with user. Does not
 * return a jQuery object yet and hence cannot be chained
 *
 * @param {string}   question
 * @param {string}   url          URL to be passed to the callbackFn to make
 *                                an Ajax call to
 * @param {Function} callbackFn   callback to execute after user clicks on OK
 * @param {Function} openCallback optional callback to run when dialog is shown
 *
 * @return {boolean}
 */
function confirmDialog(question) {
  let url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  let callbackFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  let openCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var confirmState = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('confirm');
  if (!confirmState) {
    // user does not want to confirm
    if (typeof callbackFn === 'function') {
      callbackFn.call(this, url);
      return true;
    }
  }
  if (window.Messages.strDoYouReally === '') {
    return true;
  }
  createFunctionConfirmModal();
  const functionConfirmModal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#functionConfirmModal');
  functionConfirmModal.modal('show');
  functionConfirmModal.find('.modal-body').first().html(question);
  const functionConfirmOkButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#functionConfirmOkButton');
  functionConfirmOkButton.off('click'); // Un-register previous modals
  functionConfirmOkButton.on('click', function () {
    functionConfirmModal.modal('hide');
    if (typeof callbackFn === 'function') {
      callbackFn.call(this, url);
    }
  });
  if (typeof openCallback === 'function') {
    openCallback();
  }
}
/**
 * jQuery function to sort a table's body after a new row has been appended to it.
 *
 * @param {string} textSelector string to select the sortKey's text
 *
 * @return {JQuery<HTMLElement>} for chaining purposes
 */
function sortTable(textSelector) {
  return this.each(function () {
    /**
     * @var table_body  Object referring to the table's <tbody> element
     */
    var tableBody = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    /**
     * @var rows    Object referring to the collection of rows in {@link tableBody}
     */
    var rows = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('tr').get();
    // get the text of the field that we will sort by
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(rows, function (index, row) {
      // @ts-ignore
      row.sortKey = jquery__WEBPACK_IMPORTED_MODULE_0___default()(row).find(textSelector).text().toLowerCase().trim();
    });
    // get the sorted order
    rows.sort(function (a, b) {
      // @ts-ignore
      if (a.sortKey < b.sortKey) {
        return -1;
      }
      // @ts-ignore
      if (a.sortKey > b.sortKey) {
        return 1;
      }
      return 0;
    });
    // pull out each row from the table and then append it according to it's order
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(rows, function (index, row) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(tableBody).append(row);
      // @ts-ignore
      row.sortKey = null;
    });
  });
}
function teardownCreateTableEvents() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('submit', 'form.create_table_form.ajax');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'form.create_table_form.ajax input[name=submit_num_fields]');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('keyup', 'form.create_table_form.ajax input');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'input[name=partition_count],input[name=subpartition_count],select[name=partition_by]');
}
/**
 * Used on /database/operations, /database/structure and /database/tracking
 */
function onloadCreateTableEvents() {
  /**
   * Attach event handler for submission of create table form (save)
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('submit', 'form.create_table_form.ajax', function (event) {
    event.preventDefault();
    /**
     * @var    the_form    object referring to the create table form
     */
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    /*
     * First validate the form; if there is a problem, avoid submitting it
     *
     * checkTableEditForm() needs a pure element and not a jQuery object,
     * this is why we pass $form[0] as a parameter (the jQuery object
     * is actually an array of DOM elements)
     */
    if (checkTableEditForm($form[0], $form.find('input[name=orig_num_fields]').val())) {
      prepareForAjaxRequest($form);
      if (!checkReservedWordColumns($form)) {
        return;
      }
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      // User wants to submit the form
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize() + _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'do_save_data=1', function (data) {
        if (typeof data === 'undefined' || data.success !== true) {
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)('<div class="alert alert-danger" role="alert">' + data.error + '</div>', false);
          return;
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#properties_message').removeClass('alert-danger').html('');
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.message);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tableslistcontainer').before(data.formatted_sql);
        /**
         * @var tables_table    Object referring to the <tbody> element that holds the list of tables
         */
        var tablesTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tablesForm').find('tbody').not('#tbl_summary_row');
        // this is the first table created in this db
        if (tablesTable.length === 0) {
          (0,_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_10__["default"])(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('opendb_url'));
        } else {
          /**
           * @var curr_last_row   Object referring to the last <tr> element in {@link tablesTable}
           */
          var currLastRow = jquery__WEBPACK_IMPORTED_MODULE_0___default()(tablesTable).find('tr').last();
          /**
           * @var curr_last_row_index_string   String containing the index of {@link currLastRow}
           */
          var currLastRowIndexString = jquery__WEBPACK_IMPORTED_MODULE_0___default()(currLastRow).find('input:checkbox').attr('id').match(/\d+/)[0];
          /**
           * @var curr_last_row_index Index of {@link currLastRow}
           */
          var currLastRowIndex = parseFloat(currLastRowIndexString);
          /**
           * @var new_last_row_index   Index of the new row to be appended to {@link tablesTable}
           */
          var newLastRowIndex = currLastRowIndex + 1;
          /**
           * @var new_last_row_id String containing the id of the row to be appended to {@link tablesTable}
           */
          var newLastRowId = 'checkbox_tbl_' + newLastRowIndex;
          data.newTableString = data.newTableString.replace(/checkbox_tbl_/, newLastRowId);
          // append to table
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.newTableString).appendTo(tablesTable);
          // Sort the table
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(tablesTable).sortTable('th');
          // Adjust summary row
          (0,_functions_adjustTotals_ts__WEBPACK_IMPORTED_MODULE_15__["default"])();
        }
        // Refresh navigation as a new table has been added
        _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
        // Redirect to table structure page on creation of new table
        var argsep = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
        var params12 = 'ajax_request=true' + argsep + 'ajax_page_request=true';
        var tableStructureUrl = 'index.php?route=/table/structure' + argsep + 'server=' + data.params.server + argsep + 'db=' + data.params.db + argsep + 'token=' + data.params.token + argsep + 'goto=' + encodeURIComponent('index.php?route=/database/structure') + argsep + 'table=' + data.params.table + '';
        jquery__WEBPACK_IMPORTED_MODULE_0___default().get(tableStructureUrl, params12, _ajax_ts__WEBPACK_IMPORTED_MODULE_2__.AJAX.responseHandler);
      }); // end $.post()
    }
  }); // end create table form (save)
  /**
   * Submits the intermediate changes in the table creation form
   * to refresh the UI accordingly
   *
   * @param actionParam
   */
  function submitChangesInCreateTableForm(actionParam) {
    /**
     * @var    the_form    object referring to the create table form
     */
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('form.create_table_form.ajax');
    var $msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strProcessingRequest);
    prepareForAjaxRequest($form);
    // User wants to add more fields to the table
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize() + '&' + actionParam, function (data) {
      if (typeof data === 'undefined' || !data.success) {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error);
        return;
      }
      var $pageContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content');
      $pageContent.html(data.message);
      (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])($pageContent);
      verifyColumnsProperties();
      hideShowConnection(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.create_table_form select[name=tbl_storage_engine]'));
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
    }); // end $.post()
  }
  /**
   * Attach event handler for create table form (add fields)
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'form.create_table_form.ajax input[name=submit_num_fields]', function (event) {
    event.preventDefault();
    submitChangesInCreateTableForm('submit_num_fields=1');
  }); // end create table form (add fields)
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown', 'form.create_table_form.ajax input[name=added_fields]', function (event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form').find('input[name=submit_num_fields]').trigger('click');
  });
  /**
   * Attach event handler to manage changes in number of partitions and subpartitions
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'input[name=partition_count],input[name=subpartition_count],select[name=partition_by]', function () {
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $form = $this.parents('form');
    if ($form.is('.create_table_form.ajax')) {
      submitChangesInCreateTableForm('submit_partition_change=1');
    } else {
      $form.trigger('submit');
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'input[value=AUTO_INCREMENT]', function () {
    if (!this.checked) {
      return;
    }
    var colRegEx = /\d/.exec(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name'));
    const col = colRegEx[0];
    var $selectFieldKey = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_key[' + col + ']"]');
    if ($selectFieldKey.val() === 'none_' + col) {
      $selectFieldKey.val('primary_' + col).trigger('change', [false]);
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click', 'input.preview_sql').on('click', 'input.preview_sql', function () {
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form');
    previewSql($form);
  });
}
/**
 * Validates the password field in a form
 *
 * @see    window.Messages.strPasswordEmpty
 * @see    window.Messages.strPasswordNotSame
 * @param {object} $theForm The form to be validated
 * @return {boolean}
 */
function checkPassword($theForm) {
  // Did the user select 'no password'?
  if ($theForm.find('#nopass_1').is(':checked')) {
    return true;
  } else {
    var $pred = $theForm.find('#select_pred_password');
    if ($pred.length && ($pred.val() === 'none' || $pred.val() === 'keep')) {
      return true;
    }
  }
  var $password = $theForm.find('input[name=pma_pw]');
  var $passwordRepeat = $theForm.find('input[name=pma_pw2]');
  var alertMessage = false;
  if ($password.val() === '') {
    alertMessage = window.Messages.strPasswordEmpty;
  } else if ($password.val() !== $passwordRepeat.val()) {
    alertMessage = window.Messages.strPasswordNotSame;
  }
  if (alertMessage) {
    alert(alertMessage);
    $password.val('');
    $passwordRepeat.val('');
    $password.trigger('focus');
    return false;
  }
  return true;
}
function shouldShowEmptyPasswordWarning(form) {
  return form.find('#nopass_1').is(':checked') && form.data('allowNoPassword') === 0;
}
function onloadChangePasswordEvents() {
  /* Handler for hostname type */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#select_pred_hostname', function () {
    var hostname = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_hostname');
    if (this.value === 'any') {
      hostname.val('%');
    } else if (this.value === 'localhost') {
      hostname.val('localhost');
    } else if (this.value === 'thishost' && jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('thishost')) {
      hostname.val(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('thishost'));
    } else if (this.value === 'hosttable') {
      hostname.val('').prop('required', false);
    } else if (this.value === 'userdefined') {
      hostname.trigger('focus').select().prop('required', true);
    }
  });
  /* Handler for editing hostname */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#pma_hostname', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_pred_hostname').val('userdefined');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_hostname').prop('required', true);
  });
  /* Handler for username type */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#select_pred_username', function () {
    if (this.value === 'any') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_username').val('').prop('required', false);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#user_exists_warning').css('display', 'none');
    } else if (this.value === 'userdefined') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_username').trigger('focus').trigger('select').prop('required', true);
    }
  });
  /* Handler for editing username */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#pma_username', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_pred_username').val('userdefined');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_username').prop('required', true);
  });
  /* Handler for password type */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#select_pred_password', function () {
    if (this.value === 'none') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw2').prop('required', false).val('');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw').prop('required', false).val('');
    } else if (this.value === 'userdefined') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw2').prop('required', true);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw').prop('required', true).trigger('focus').trigger('select');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw2').prop('required', false);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw').prop('required', false);
    }
  });
  /* Handler for editing password */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#text_pma_pw,#text_pma_pw2', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_pred_password').val('userdefined');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw2').prop('required', true);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#text_pma_pw').prop('required', true);
  });
  /**
   * Unbind all event handlers before tearing down a page
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#change_password_anchor.ajax');
  /**
   * Attach Ajax event handler on the change password anchor
   */
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#change_password_anchor.ajax', function (event) {
    event.preventDefault();
    var $msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#changePasswordGoButton').on('click', function () {
      event.preventDefault();
      /**
       * @var $the_form    Object referring to the change password form
       */
      var $theForm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#change_password_form');
      if (!checkPassword($theForm)) {
        return false;
      }
      /**
       * @var {string} thisValue String containing the value of the submit button.
       * Need to append this for the change password form on Server Privileges
       * page to work
       */
      var thisValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
      var submitForm = function () {
        var $msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strProcessingRequest);
        $theForm.append('<input type="hidden" name="ajax_request" value="true">');
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post($theForm.attr('action'), $theForm.serialize() + _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'change_pw=' + thisValue, function (data) {
          if (typeof data === 'undefined' || data.success !== true) {
            (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error, false);
            return;
          }
          var $pageContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content');
          $pageContent.prepend(data.message);
          (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])($pageContent);
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
        });
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#changePasswordModal').modal('hide');
      };
      if (shouldShowEmptyPasswordWarning($theForm)) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).confirm(window.Messages.strPasswordEmptyWhenAllowNoPasswordIsEnabled, '', function () {
          submitForm();
        });
      } else {
        submitForm();
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default().get(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href'), {
      'ajax_request': true
    }, function (data) {
      if (typeof data === 'undefined' || !data.success) {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error, false);
        return;
      }
      if (data.scripts) {
        _ajax_ts__WEBPACK_IMPORTED_MODULE_2__.AJAX.scriptHandler.load(data.scripts);
      }
      // for this dialog, we remove the fieldset wrapping due to double headings
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#changePasswordModal').modal('show');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#changePasswordModal').find('.modal-body').first().html(data.message);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('fieldset#fieldset_change_password').find('legend').remove().end().find('table.table').unwrap().addClass('m-3').find('input#text_pma_pw').trigger('focus');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#fieldset_change_password_footer').hide();
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
      displayPasswordGenerateButton();
    });
  });
}
function teardownEnumSetEditorMessage() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'select.column_type');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'select.default_type');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'select.virtuality');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', 'input.allow_null');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', '.create_table_form select[name=tbl_storage_engine]');
}
/**
 * Toggle the hiding/showing of the "Open in ENUM/SET editor" message when
 * the page loads and when the selected data type changes
 */
function onloadEnumSetEditorMessage() {
  // is called here for normal page loads and also when opening
  // the Create table dialog
  verifyColumnsProperties();
  //
  // needs on() to work also in the Create Table dialog
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select.column_type', function () {
    showNoticeForEnum(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    showWarningForIntTypes();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select.default_type', function () {
    hideShowDefaultValue(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'select.virtuality', function () {
    hideShowExpression(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', 'input.allow_null', function () {
    validateDefaultValue(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '.create_table_form select[name=tbl_storage_engine]', function () {
    hideShowConnection(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
  });
}
/**
 * If the chosen storage engine is FEDERATED show connection field. Hide otherwise
 *
 * @param $engineSelector storage engine selector
 */
function hideShowConnection($engineSelector) {
  var $connection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.create_table_form input[name=connection]');
  var $labelTh = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.create_table_form #storage-engine-connection');
  if ($engineSelector.val() !== 'FEDERATED') {
    $connection.prop('disabled', true).parent('td').hide();
    $labelTh.hide();
  } else {
    $connection.prop('disabled', false).parent('td').show();
    $labelTh.show();
  }
}
/**
 * If the column does not allow NULL values, makes sure that default is not NULL
 *
 * @param $nullCheckbox
 */
function validateDefaultValue($nullCheckbox) {
  if (!$nullCheckbox.prop('checked')) {
    var $default = $nullCheckbox.closest('tr').find('.default_type');
    if ($default.val() === 'NULL') {
      $default.val('NONE');
    }
  }
}
/**
 * function to populate the input fields on picking a column from central list
 *
 * @param {string} inputId input id of the name field for the column to be populated
 * @param {number} offset of the selected column in central list of columns
 */
function autoPopulate(inputId, offset) {
  var db = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db');
  var table = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('table');
  var newInputId = inputId.substring(0, inputId.length - 1);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '1').val(window.centralColumnList[db + '_' + table][offset].col_name);
  var colType = window.centralColumnList[db + '_' + table][offset].col_type.toUpperCase();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '2').val(colType);
  var $input3 = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '3');
  $input3.val(window.centralColumnList[db + '_' + table][offset].col_length);
  if (colType === 'ENUM' || colType === 'SET') {
    $input3.next().show();
  } else {
    $input3.next().hide();
  }
  var colDefault = window.centralColumnList[db + '_' + table][offset].col_default.toUpperCase();
  var $input4 = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '4');
  if (colDefault === 'NULL' || colDefault === 'CURRENT_TIMESTAMP' || colDefault === 'CURRENT_TIMESTAMP()') {
    if (colDefault === 'CURRENT_TIMESTAMP()') {
      colDefault = 'CURRENT_TIMESTAMP';
    }
    $input4.val(colDefault);
    $input4.siblings('.default_value').hide();
  }
  if (colDefault === '') {
    $input4.val('NONE');
    $input4.siblings('.default_value').hide();
  } else {
    $input4.val('USER_DEFINED');
    $input4.siblings('.default_value').show();
    $input4.siblings('.default_value').val(window.centralColumnList[db + '_' + table][offset].col_default);
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '5').val(window.centralColumnList[db + '_' + table][offset].col_collation);
  var $input6 = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '6');
  $input6.val(window.centralColumnList[db + '_' + table][offset].col_attribute);
  if (window.centralColumnList[db + '_' + table][offset].col_extra === 'on update CURRENT_TIMESTAMP') {
    $input6.val(window.centralColumnList[db + '_' + table][offset].col_extra);
  }
  if (window.centralColumnList[db + '_' + table][offset].col_extra.toUpperCase() === 'AUTO_INCREMENT') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '9').prop('checked', true).trigger('change');
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '9').prop('checked', false);
  }
  if (window.centralColumnList[db + '_' + table][offset].col_isNull !== '0') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '7').prop('checked', true);
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + newInputId + '7').prop('checked', false);
  }
}
function teardownEnumSetEditor() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.open_enum_editor');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'input.add_value');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#enum_editor td.drop');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.central_columns_dialog');
}
/**
 * Opens the ENUM/SET editor and controls its functions
 */
function onloadEnumSetEditor() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.open_enum_editor', function () {
    // Get the name of the column that is being edited
    var colname = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr').find('input').first().val();
    var title;
    var i;
    // And use it to make up a title for the page
    if (colname.length < 1) {
      title = window.Messages.enum_newColumnVals;
    } else {
      title = window.Messages.enum_columnVals.replace(/%s/, '"' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(decodeURIComponent(colname)) + '"');
    }
    // Get the values as a string
    var inputstring = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('td').find('input').val();
    // Escape html entities
    inputstring = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').text(inputstring).html();
    // Parse the values, escaping quotes and
    // slashes on the fly, into an array
    var values = [];
    var inString = false;
    var curr;
    var next;
    var buffer = '';
    for (i = 0; i < inputstring.length; i++) {
      curr = inputstring.charAt(i);
      next = i === inputstring.length ? '' : inputstring.charAt(i + 1);
      if (!inString && curr === '\'') {
        inString = true;
      } else if (inString && curr === '\\' && next === '\\') {
        buffer += '&#92;';
        i++;
      } else if (inString && next === '\'' && (curr === '\'' || curr === '\\')) {
        buffer += '&#39;';
        i++;
      } else if (inString && curr === '\'') {
        inString = false;
        values.push(buffer);
        buffer = '';
      } else if (inString) {
        buffer += curr;
      }
    }
    if (buffer.length > 0) {
      // The leftovers in the buffer are the last value (if any)
      values.push(buffer);
    }
    var fields = '';
    // If there are no values, maybe the user is about to make a
    // new list so we add a few for them to get started with.
    if (values.length === 0) {
      values.push('', '', '', '');
    }
    // Add the parsed values to the editor
    var dropIcon = (0,_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_8__["default"])('b_drop');
    var dragIcon = '<span class="drag-handle">&#9776;</span>';
    for (i = 0; i < values.length; i++) {
      fields += '<tr><td>' + '<input type=\'text\' value=\'' + values[i] + '\'>' + '</td><td class=\'drop\'>' + dropIcon + '</td><td class="drag-col">' + dragIcon + '</td></tr>';
    }
    /**
     * @var dialog HTML code for the ENUM/SET dialog
     */
    var dialog = '<div id="enum_editor" class="card">' + '<div class="card-header">' + title + '</div>' + '<div class="card-body">' + '<p>' + (0,_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_8__["default"])('s_notice') + window.Messages.enum_hint + '</p>' + '<table class="table table-borderless values"><tbody>' + fields + '</tbody></table>' + '</div><div class="card-footer">' + '<table class="table table-borderless add"><tr><td>' + '<div class="slider"></div>' + '</td><td>' + '<form><div><input type="submit" class="add_value btn btn-primary" value="' + window.sprintf(window.Messages.enum_addValue, 1) + '"></div></form>' + '</td></tr></table>' + '<input type="hidden" value="' +
    // So we know which column's data is being edited
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('td').find('input').attr('id') + '">' + '</div>' + '</div>';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorGoButton').on('click', function () {
      // When the submit button is clicked,
      // put the data back into the original form
      var valueArray = [];
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorModal').find('.values input').each(function (index, elm) {
        var val = elm.value.replace(/\\/g, '\\\\').replace(/'/g, '\'\'');
        valueArray.push('\'' + val + '\'');
      });
      // get the Length/Values text field where this value belongs
      var valuesId = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorModal').find('input[type=\'hidden\']').val();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#' + valuesId).val(valueArray.join(','));
    });
    // Show the dialog
    var width = parseInt((parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').css('font-size'), 10) / 13 * 340).toString(), 10);
    if (!width) {
      width = 340;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorModal').modal('show');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorModal').find('.modal-body').first().html(dialog);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorModal .values tbody').sortable({
      axis: 'y',
      containment: 'parent',
      handle: '.drag-handle',
      cursor: 'move',
      tolerance: 'pointer'
    });
    // slider for choosing how many fields to add
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorModal').find('.slider').slider({
      animate: true,
      range: 'min',
      value: 1,
      min: 1,
      max: 9,
      slide: function (event, ui) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('table').find('input[type=submit]').val(window.sprintf(window.Messages.enum_addValue, ui.value));
      }
    });
    // Focus the slider, otherwise it looks nearly transparent
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.ui-slider-handle').addClass('ui-state-focus');
    return false;
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.central_columns_dialog', function () {
    var href = 'index.php?route=/database/central-columns';
    var db = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db');
    var table = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('table');
    var maxRows = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('maxrows');
    var pick = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('pick');
    if (pick !== false) {
      pick = true;
    }
    var params = {
      'ajax_request': true,
      'server': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server'),
      'db': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('db'),
      'cur_table': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('table'),
      'getColumnList': true
    };
    var colid = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('td').find('input').attr('id');
    var fields = '';
    if (!(db + '_' + table in window.centralColumnList)) {
      window.centralColumnList.push(db + '_' + table);
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: href,
        data: params,
        success: function (data) {
          window.centralColumnList[db + '_' + table] = data.message;
        },
        async: false
      });
    }
    var i = 0;
    var listSize = window.centralColumnList[db + '_' + table].length;
    var min = listSize <= maxRows ? listSize : maxRows;
    for (i = 0; i < min; i++) {
      fields += '<tr><td><div><span class="fw-bold">' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(window.centralColumnList[db + '_' + table][i].col_name) + '</span><br><span class="color_gray">' + window.centralColumnList[db + '_' + table][i].col_type;
      if (window.centralColumnList[db + '_' + table][i].col_attribute !== '') {
        fields += '(' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(window.centralColumnList[db + '_' + table][i].col_attribute) + ') ';
      }
      if (window.centralColumnList[db + '_' + table][i].col_length !== '') {
        fields += '(' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(window.centralColumnList[db + '_' + table][i].col_length) + ') ';
      }
      fields += (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(window.centralColumnList[db + '_' + table][i].col_extra) + '</span>' + '</div></td>';
      if (pick) {
        fields += '<td><input class="btn btn-secondary pick w-100" type="submit" value="' + window.Messages.pickColumn + '" onclick="window.pmaAutoPopulate(\'' + colid + '\',' + i + ')"></td>';
      }
      fields += '</tr>';
    }
    var resultPointer = i;
    var searchIn = '<input type="text" class="filter_rows" placeholder="' + window.Messages.searchList + '">';
    if (fields === '') {
      fields = window.sprintf(window.Messages.strEmptyCentralList, '\'' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(db) + '\'');
      searchIn = '';
    }
    let seeMore = '';
    if (listSize > maxRows) {
      seeMore = '<button type="button" class="btn btn-secondary" id="seeMore">' + window.Messages.seeMore + '</button>';
    }
    let centralColumnsModal = document.getElementById('centralColumnsModal');
    if (centralColumnsModal === null) {
      const centralColumnsModalHtml = '<div class="modal fade" id="centralColumnsModal" tabindex="-1" aria-labelledby="centralColumnsModalLabel" aria-hidden="true">\n' + '  <div class="modal-dialog modal-lg">\n' + '    <div class="modal-content">\n' + '      <div class="modal-header">\n' + '        <h1 class="modal-title fs-5" id="centralColumnsModalLabel">' + window.Messages.pickColumnTitle + '</h1>\n' + '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + window.Messages.strClose + '"></button>\n' + '      </div>\n' + '      <div class="modal-body">\n' + searchIn + '<table id="col_list" class="table table-borderless values">' + fields + '</table>' + '      </div>\n' + '      <div class="modal-footer">\n' + seeMore + '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">' + window.Messages.strClose + '</button>\n' + '      </div>\n' + '    </div>\n' + '  </div>\n' + '</div>\n';
      document.body.insertAdjacentHTML('beforeend', centralColumnsModalHtml);
      centralColumnsModal = document.getElementById('centralColumnsModal');
    }
    const modal = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getOrCreateInstance(centralColumnsModal);
    centralColumnsModal.addEventListener('shown.bs.modal', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#col_list').on('click', '.pick', function () {
        modal.hide();
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.filter_rows').on('keyup', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default().uiTableFilter(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#col_list'), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#seeMore').on('click', function () {
        fields = '';
        min = listSize <= maxRows + resultPointer ? listSize : maxRows + resultPointer;
        for (i = resultPointer; i < min; i++) {
          fields += '<tr><td><div><span class="fw-bold">' + window.centralColumnList[db + '_' + table][i].col_name + '</span><br><span class="color_gray">' + window.centralColumnList[db + '_' + table][i].col_type;
          if (window.centralColumnList[db + '_' + table][i].col_attribute !== '') {
            fields += '(' + window.centralColumnList[db + '_' + table][i].col_attribute + ') ';
          }
          if (window.centralColumnList[db + '_' + table][i].col_length !== '') {
            fields += '(' + window.centralColumnList[db + '_' + table][i].col_length + ') ';
          }
          fields += window.centralColumnList[db + '_' + table][i].col_extra + '</span>' + '</div></td>';
          if (pick) {
            fields += '<td><input class="btn btn-secondary pick w-100" type="submit" value="' + window.Messages.pickColumn + '" onclick="window.pmaAutoPopulate(\'' + colid + '\',' + i + ')"></td>';
          }
          fields += '</tr>';
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#col_list').append(fields);
        resultPointer = i;
        if (resultPointer === listSize) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#seeMore').hide();
        }
        modal.handleUpdate();
      });
    });
    centralColumnsModal.addEventListener('hidden.bs.modal', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#col_list').off('click', '.pick');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.filter_rows').off('keyup');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
    });
    modal.show();
  });
  // When "add a new value" is clicked, append an empty text field
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'input.add_value', function (e) {
    e.preventDefault();
    var numNewRows = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorModal').find('div.slider').slider('value');
    while (numNewRows--) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#enumEditorModal').find('.values').append('<tr class=\'hide\'><td>' + '<input type=\'text\'>' + '</td><td class=\'drop\'>' + (0,_functions_getImageTag_ts__WEBPACK_IMPORTED_MODULE_8__["default"])('b_drop') + '</td><td class="drag-col">' + '<span class="drag-handle">&#9776;</span>' + '</td></tr>').find('tr').last().show('fast');
    }
  });
  // Removes the specified row from the enum editor
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#enum_editor td.drop', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr').hide('fast', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
    });
  });
}
/**
 * Handler for adding more columns to an index in the editor
 * @return {function}
 */
function getAddIndexEventHandler() {
  return function (event) {
    event.preventDefault();
    var hadAddButtonHidden = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.card-body').find('.add_fields').hasClass('hide');
    if (hadAddButtonHidden === false) {
      var rowsToAdd = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.card-body').find('.slider').slider('value');
      var tempEmptyVal = function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val('');
      };
      var tempSetFocus = function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('option:selected').val() === '') {
          return true;
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr').find('input').trigger('focus');
      };
      while (rowsToAdd--) {
        var $indexColumns = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_columns');
        var $newrow = $indexColumns.find('tbody > tr').first().clone().appendTo($indexColumns.find('tbody'));
        $newrow.find(':input').each(tempEmptyVal);
        // focus index size input on column picked
        $newrow.find('select').on('change', tempSetFocus);
      }
    }
  };
}
function indexDialogModal(routeUrl, url, title, callbackSuccess) {
  let callbackFailure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  /* Remove the hidden dialogs if there are*/
  var modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#indexDialogModal');
  const indexDialogPreviewModal = document.getElementById('indexDialogPreviewModal');
  indexDialogPreviewModal.addEventListener('shown.bs.modal', () => {
    const modalBody = indexDialogPreviewModal.querySelector('.modal-body');
    const $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_frm');
    const formUrl = $form.attr('action');
    const sep = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
    const formData = $form.serialize() + sep + 'do_save_data=1' + sep + 'preview_sql=1' + sep + 'ajax_request=1';
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post({
      url: formUrl,
      data: formData,
      success: response => {
        if (!response.success) {
          modalBody.innerHTML = '<div class="alert alert-danger" role="alert">' + window.Messages.strErrorProcessingRequest + '</div>';
          return;
        }
        modalBody.innerHTML = response.sql_data;
        (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#indexDialogPreviewModal'));
      },
      error: () => {
        modalBody.innerHTML = '<div class="alert alert-danger" role="alert">' + window.Messages.strErrorProcessingRequest + '</div>';
      }
    });
  });
  indexDialogPreviewModal.addEventListener('hidden.bs.modal', () => {
    indexDialogPreviewModal.querySelector('.modal-body').innerHTML = '<div class="spinner-border" role="status">' + '<span class="visually-hidden">' + window.Messages.strLoading + '</span></div>';
  });
  // Remove previous click listeners from other modal openings (issue: #17892)
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#indexDialogModalGoButton').off('click');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#indexDialogModalGoButton').on('click', function () {
    /**
     * @var the_form object referring to the export form
     */
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_frm');
    (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strProcessingRequest);
    prepareForAjaxRequest($form);
    // User wants to submit the form
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), $form.serialize() + _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'do_save_data=1', function (data) {
      var $sqlqueryresults = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sqlqueryresults');
      if ($sqlqueryresults.length !== 0) {
        $sqlqueryresults.remove();
      }
      if (typeof data !== 'undefined' && data.success === true) {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.message);
        (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query'));
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query .alert').remove();
        /* Reload the field form*/
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#table_index').remove();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id=\'temp_div\'><div>').append(data.index_table).find('#table_index').insertAfter('#index_header');
        var $editIndexDialog = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#indexDialogModal');
        if ($editIndexDialog.length > 0) {
          $editIndexDialog.modal('hide');
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.no_indexes_defined').hide();
        if (callbackSuccess) {
          callbackSuccess(data);
        }
        _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
      } else {
        var $tempDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div id=\'temp_div\'><div>').append(data.error);
        var $error;
        if ($tempDiv.find('.error code').length !== 0) {
          $error = $tempDiv.find('.error code').addClass('error');
        } else {
          $error = $tempDiv;
        }
        if (callbackFailure) {
          callbackFailure();
        }
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)($error, false);
      }
    }); // end $.post()
  });
  var $msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post(routeUrl, url, function (data) {
    if (typeof data !== 'undefined' && data.success === false) {
      // in the case of an error, show the error message returned.
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error, false);
      return;
    }
    (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
    // Show dialog if the request was successful
    modal.modal('show');
    // FIXME data may be undefiend
    modal.find('.modal-body').first().html(data.message);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#indexDialogModalLabel').first().text(title);
    verifyColumnsProperties();
    modal.find('.card-footer').remove();
    showIndexEditDialog(modal);
  }); // end $.get()
}
function indexEditorDialog(url, title, callbackSuccess) {
  let callbackFailure = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  indexDialogModal('index.php?route=/table/indexes', url, title, callbackSuccess, callbackFailure);
}
function indexRenameDialog(url, title, callbackSuccess) {
  let callbackFailure = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  indexDialogModal('index.php?route=/table/indexes/rename', url, title, callbackSuccess, callbackFailure);
}
function showIndexEditDialog($outer) {
  (0,_indexes_checkIndexType_ts__WEBPACK_IMPORTED_MODULE_11__["default"])();
  (0,_indexes_checkIndexName_ts__WEBPACK_IMPORTED_MODULE_12__["default"])('index_frm');
  var $indexColumns = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_columns');
  $indexColumns.find('tbody').sortable({
    axis: 'y',
    containment: $indexColumns.find('tbody'),
    tolerance: 'pointer',
    forcePlaceholderSize: true,
    // Add custom dragged row
    // @ts-ignore
    helper: function (event, tr) {
      var $originalCells = tr.children();
      var $helper = tr.clone();
      $helper.children().each(function (index) {
        // Set cell width in dragged row
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).width($originalCells.eq(index).outerWidth());
        var $childrenSelect = $originalCells.eq(index).children('select');
        if ($childrenSelect.length) {
          var selectedIndex = $childrenSelect.prop('selectedIndex');
          // Set correct select value in dragged row
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('select').prop('selectedIndex', selectedIndex);
        }
      });
      return $helper;
    }
  });
  showHints($outer);
  // Add a slider for selecting how many columns to add to the index
  $outer.find('.slider').slider({
    animate: true,
    value: 1,
    min: 1,
    max: 16,
    slide: function (event, ui) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('.card-body').find('input[type=submit]').val(window.sprintf(window.Messages.strAddToIndex, ui.value));
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.add_fields').removeClass('hide');
  // focus index size input on column picked
  $outer.find('table#index_columns select').on('change', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('option:selected').val() === '') {
      return true;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('tr').find('input').trigger('focus');
  });
  // Focus the slider, otherwise it looks nearly transparent
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a.ui-slider-handle').addClass('ui-state-focus');
  // set focus on index name input, if empty
  var input = $outer.find('input#input_index_name');
  if (!input.val()) {
    input.trigger('focus');
  }
}
/**
 * Function to display tooltips that were
 * generated on the PHP side by PhpMyAdmin\Util::showHint()
 *
 * @param {object} $div a div jquery object which specifies the
 *                    domain for searching for tooltips. If we
 *                    omit this parameter the function searches
 *                    in the whole body
 **/
function showHints() {
  let $div = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#no_hint').length > 0) {
    return;
  }
  var $newDiv = $div;
  if ($newDiv === undefined || !($newDiv instanceof (jquery__WEBPACK_IMPORTED_MODULE_0___default())) || $newDiv.length === 0) {
    $newDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
  }
  $newDiv.get(0).querySelectorAll('.pma_hint').forEach(hintElement => {
    const content = hintElement.querySelector('span').textContent;
    bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip.getOrCreateInstance(hintElement, {
      title: content
    }).setContent({
      '.tooltip-inner': content
    });
  });
}
/**
 * @return {function}
 */
function initializeMenuResizer() {
  return function () {
    // Initialise the menu resize plugin
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenu').menuResizer(_functions_mainMenuResizerCallback_ts__WEBPACK_IMPORTED_MODULE_13__["default"]);
    // register resize event
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenu').menuResizer('resize');
    });
  };
}
/**
 * var  toggleButton  This is a function that creates a toggle
 *                    sliding button given a jQuery reference
 *                    to the correct DOM element
 *
 * @param $obj
 */
function toggleButton($obj) {
  // In rtl mode the toggle switch is flipped horizontally
  // so we need to take that into account
  var right;
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('span.text_direction', $obj).text() === 'ltr') {
    right = 'right';
  } else {
    right = 'left';
  }
  /**
   * @var  h  Height of the button, used to scale the
   *          background image and position the layers
   */
  var h = $obj.height();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('img', $obj).height(h);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('table', $obj).css('bottom', h - 1);
  /**
   * @var  on   Width of the "ON" part of the toggle switch
   * @var  off  Width of the "OFF" part of the toggle switch
   */
  var on = jquery__WEBPACK_IMPORTED_MODULE_0___default()('td.toggleOn', $obj).width();
  var off = jquery__WEBPACK_IMPORTED_MODULE_0___default()('td.toggleOff', $obj).width();
  // Make the "ON" and "OFF" parts of the switch the same size
  // + 2 pixels to avoid overflowed
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('td.toggleOn > div', $obj).width(Math.max(on, off) + 2);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('td.toggleOff > div', $obj).width(Math.max(on, off) + 2);
  /**
   *  @var  w  Width of the central part of the switch
   */
  var w = parseInt((jquery__WEBPACK_IMPORTED_MODULE_0___default()('img', $obj).height() / 16 * 22).toString(), 10);
  // Resize the central part of the switch on the top
  // layer to match the background
  jquery__WEBPACK_IMPORTED_MODULE_0___default()($obj).find('table td').eq(1).children('div').width(w);
  /**
   * @var  imgw    Width of the background image
   * @var  tblw    Width of the foreground layer
   * @var  offset  By how many pixels to move the background
   *               image, so that it matches the top layer
   */
  var imgw = jquery__WEBPACK_IMPORTED_MODULE_0___default()('img', $obj).width();
  var tblw = jquery__WEBPACK_IMPORTED_MODULE_0___default()('table', $obj).width();
  var offset = parseInt(((imgw - tblw) / 2).toString(), 10);
  // Move the background to match the layout of the top layer
  $obj.find('img').css(right, offset);
  /**
   * @var  offw    Outer width of the "ON" part of the toggle switch
   * @var  btnw    Outer width of the central part of the switch
   */
  var offw = jquery__WEBPACK_IMPORTED_MODULE_0___default()('td.toggleOff', $obj).outerWidth();
  var btnw = jquery__WEBPACK_IMPORTED_MODULE_0___default()($obj).find('table td').eq(1).outerWidth();
  // Resize the main div so that exactly one side of
  // the switch plus the central part fit into it.
  $obj.width(offw + btnw + 2);
  /**
   * @var  move  How many pixels to move the
   *             switch by when toggling
   */
  var move = jquery__WEBPACK_IMPORTED_MODULE_0___default()('td.toggleOff', $obj).outerWidth();
  // If the switch is initialized to the
  // OFF state we need to move it now.
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.toggle-container', $obj).hasClass('off')) {
    if (right === 'right') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.toggle-container', $obj).animate({
        'left': '-=' + move + 'px'
      }, 0);
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.toggle-container', $obj).animate({
        'left': '+=' + move + 'px'
      }, 0);
    }
  }
  // Attach an 'onclick' event to the switch
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.toggle-container', $obj).on('click', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('isActive')) {
      return false;
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('isActive');
    }
    var $msg = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
    var $container = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var callback = jquery__WEBPACK_IMPORTED_MODULE_0___default()('span.callback', this).text();
    var operator;
    var url;
    var removeClass;
    var addClass;
    // Perform the actual toggle
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('on')) {
      if (right === 'right') {
        operator = '-=';
      } else {
        operator = '+=';
      }
      url = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('td.toggleOff > span').text();
      removeClass = 'on';
      addClass = 'off';
    } else {
      if (right === 'right') {
        operator = '+=';
      } else {
        operator = '-=';
      }
      url = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('td.toggleOn > span').text();
      removeClass = 'off';
      addClass = 'on';
    }
    var parts = url.split('?');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(parts[0], parts[1] + '&ajax_request=true', function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msg);
        $container.removeClass(removeClass).addClass(addClass).animate({
          'left': operator + move + 'px'
        }, function () {
          $container.removeClass('isActive');
        });
        // eslint-disable-next-line no-eval
        eval(callback);
      } else {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error, false);
        $container.removeClass('isActive');
      }
    });
  });
}
function initializeToggleButtons() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.toggleAjax').each(function () {
    var $button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).show();
    $button.find('img').each(function () {
      if (this.complete) {
        toggleButton($button);
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('load', function () {
          toggleButton($button);
        });
      }
    });
  });
}
/**
 * Auto submit page selector
 * @return {function}
 */
function getPageSelectorEventHandler() {
  return function (event) {
    event.stopPropagation();
    // Check where to load the new content
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('#pma_navigation').length === 0) {
      // For the main page we don't need to do anything,
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form').trigger('submit');
    } else {
      // but for the navigation we need to manually replace the content
      _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.treePagination(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
    }
  };
}
function teardownRecentFavoriteTables() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sync_favorite_tables').off('ready');
}
function onloadRecentFavoriteTables() {
  // Sync favorite tables from localStorage to pmadb.
  if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sync_favorite_tables').length) {
    return;
  }
  var favoriteTables = '';
  if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_14__["default"])('localStorage') && typeof window.localStorage.favoriteTables !== 'undefined' && window.localStorage.favoriteTables !== 'undefined') {
    favoriteTables = window.localStorage.favoriteTables;
    if (favoriteTables === 'undefined') {
      // Do not send an invalid value
      return;
    }
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    url: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sync_favorite_tables').attr('href'),
    cache: false,
    type: 'POST',
    data: {
      'favoriteTables': favoriteTables,
      'server': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server'),
      'no_debug': true
    },
    success: function (data) {
      // Update localStorage.
      if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_14__["default"])('localStorage')) {
        window.localStorage.favoriteTables = data.favoriteTables;
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#favoriteTableList').html(data.list);
    }
  });
}
/**
 * Creates a message inside an object with a sliding effect
 *
 * @param {string} msg    A string containing the text to display
 * @param {JQuery} $object   a jQuery object containing the reference
 *                 to the element where to put the message
 *                 This is optional, if no element is
 *                 provided, one will be created below the
 *                 navigation links at the top of the page
 *
 * @return {boolean} True on success, false on failure
 */
function slidingMessage(msg) {
  let $object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var $obj = $object;
  if (msg === undefined || msg.length === 0) {
    // Don't show an empty message
    return false;
  }
  // @ts-ignore
  if ($obj === undefined || !($obj instanceof (jquery__WEBPACK_IMPORTED_MODULE_0___default())) || $obj.length === 0) {
    // If the second argument was not supplied,
    // we might have to create a new DOM node.
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#PMA_slidingMessage').length === 0) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content').prepend('<span id="PMA_slidingMessage" ' + 'class="d-inline-block"></span>');
    }
    $obj = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#PMA_slidingMessage');
  }
  if ($obj.has('div').length > 0) {
    // If there already is a message inside the
    // target object, we must get rid of it
    $obj.find('div').first().fadeOut(function () {
      $obj.children().remove();
      $obj.append('<div>' + msg + '</div>');
      // highlight any sql before taking height;
      (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])($obj);
      $obj.find('div').first().hide();
      $obj.animate({
        height: $obj.find('div').first().height()
      }).find('div').first().fadeIn();
    });
  } else {
    // Object does not already have a message
    // inside it, so we simply slide it down
    $obj.width('100%').html('<div>' + msg + '</div>');
    // highlight any sql before taking height;
    (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])($obj);
    var h = $obj.find('div').first().hide().height();
    $obj.find('div').first().css('height', 0).show().animate({
      height: h
    }, function () {
      // Set the height of the parent
      // to the height of the child
      $obj.height($obj.find('div').first().height());
    });
  }
  return true;
}
/**
 * Attach CodeMirror editor to SQL edit area.
 */
function onloadCodeMirrorEditor() {
  var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery');
  if ($elm.siblings().filter('.CodeMirror').length > 0) {
    return;
  }
  if ($elm.length > 0) {
    if (typeof window.CodeMirror !== 'undefined') {
      window.codeMirrorEditor = getSqlEditor($elm);
      window.codeMirrorEditor.focus();
      window.codeMirrorEditor.on('blur', updateQueryParameters);
    } else {
      // without codemirror
      $elm.trigger('focus').on('blur', updateQueryParameters);
    }
  }
  (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('body'));
}
function teardownCodeMirrorEditor() {
  if (!window.codeMirrorEditor) {
    return;
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#sqlquery').text(window.codeMirrorEditor.getValue());
  window.codeMirrorEditor.toTextArea();
  window.codeMirrorEditor = null;
}
function onloadLockPage() {
  // initializes all lock-page elements lock-id and
  // val-hash data property
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content form.lock-page textarea, ' + '#page_content form.lock-page input[type="text"], ' + '#page_content form.lock-page input[type="number"], ' + '#page_content form.lock-page select').each(function (i) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('lock-id', i);
    // val-hash is the hash of default value of the field
    // so that it can be compared with new value hash
    // to check whether field was modified or not.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('val-hash', _ajax_ts__WEBPACK_IMPORTED_MODULE_2__.AJAX.hash(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()));
  });
  // initializes lock-page elements (input types checkbox and radio buttons)
  // lock-id and val-hash data property
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content form.lock-page input[type="checkbox"], ' + '#page_content form.lock-page input[type="radio"]').each(function (i) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('lock-id', i);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('val-hash', _ajax_ts__WEBPACK_IMPORTED_MODULE_2__.AJAX.hash(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked')));
  });
}
/**
 * jQuery plugin to correctly filter input fields by value, needed
 * because some nasty values may break selector syntax
 */
(function ($) {
  $.fn.filterByValue = function (value) {
    return this.filter(function () {
      return $(this).val() === value;
    });
  };
})((jquery__WEBPACK_IMPORTED_MODULE_0___default()));
/**
 * Return value of a cell in a table.
 *
 * @param {string} td
 * @return {string}
 */
function getCellValue(td) {
  var $td = jquery__WEBPACK_IMPORTED_MODULE_0___default()(td);
  if ($td.is('.null')) {
    return '';
  } else if ((!$td.is('.to_be_saved') || $td.is('.set')) && $td.data('original_data')) {
    return $td.data('original_data');
  } else {
    return $td.text();
  }
}
/**
 * Validate and return stringified JSON inputs, or plain if invalid.
 *
 * @param json the json input to be validated and stringified
 * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @return {string}
 */
function stringifyJSON(json) {
  let replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let space = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  try {
    return JSON.stringify(JSON.parse(json), replacer, space);
  } catch (e) {
    return json;
  }
}
/**
 * Automatic form submission on change.
 * @return {function}
 */
function getAutoSubmitEventHandler() {
  return function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form').trigger('submit');
  };
}
function teardownCreateView() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('keydown', '#createViewModal input, #createViewModal select');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', '#fkc_checkbox');
}
function onloadCreateView() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.logout').on('click', function () {
    var form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<form method="POST" action="' + jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('href') + '" class="disableAjax">' + '<input type="hidden" name="token" value="' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_7__.escapeHtml)(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('token')) + '">' + '</form>');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append(form);
    form.submit();
    sessionStorage.clear();
    return false;
  });
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea[name="view[as]"]').length !== 0) {
    window.codeMirrorEditor = getSqlEditor(jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea[name="view[as]"]'));
  }
}
/**
 * Makes the breadcrumbs and the menu bar float at the top of the viewport.
 * @return {function}
 */
function floatingMenuBar() {
  return function () {
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#floating_menubar').length || jquery__WEBPACK_IMPORTED_MODULE_0___default()('#PMA_disable_floating_menubar').length !== 0) {
      return;
    }
    var left = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('dir') === 'ltr' ? 'left' : 'right';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#floating_menubar').css('margin-' + left, jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').width() + jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_resizer').width()).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#server-breadcrumb')).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenucontainer'));
    // Allow the DOM to render, then adjust the padding on the body
    setTimeout(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('padding-top', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#floating_menubar').outerHeight(true));
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenu').menuResizer('resize');
    }, 4);
  };
}
/**
 * Scrolls the page to the top if clicking the server-breadcrumb bar
 * If the user holds the Ctrl (or Meta on macOS) key, it prevents the scroll
 * so they can open the link in a new tab.
 *
 * @return {function}
 */
function breadcrumbScrollToTop() {
  return function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#server-breadcrumb, #goto_pagetop', function (event) {
      if (event.ctrlKey || event.metaKey) {
        return;
      }
      event.preventDefault();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
        scrollTop: 0
      }, 'fast');
    });
  };
}
const checkboxesSel = 'input.checkall:checkbox:enabled';
/**
 * Watches checkboxes in a form to set the checkall box accordingly
 */
function checkboxesChanged() {
  var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.form);
  // total number of checkboxes in current form
  var totalBoxes = $form.find(checkboxesSel).length;
  // number of checkboxes checked in current form
  var checkedBoxes = $form.find(checkboxesSel + ':checked').length;
  var $checkall = $form.find('input.checkall_box');
  if (totalBoxes === checkedBoxes) {
    $checkall.prop({
      checked: true,
      indeterminate: false
    });
  } else if (checkedBoxes > 0) {
    $checkall.prop({
      checked: true,
      indeterminate: true
    });
  } else {
    $checkall.prop({
      checked: false,
      indeterminate: false
    });
  }
}
/**
 * @return {function}
 */
function getCheckAllBoxEventHandler() {
  return function () {
    var isChecked = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.form).find(checkboxesSel).not('.row-hidden').prop('checked', isChecked).parents('tr').toggleClass('marked table-active', isChecked);
  };
}
/**
 * @return {function}
 */
function getCheckAllFilterEventHandler() {
  return function () {
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var selector = $this.data('checkall-selector');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input.checkall_box').prop('checked', false);
    $this.parents('form').find(checkboxesSel).filter(selector).prop('checked', true).trigger('change').parents('tr').toggleClass('marked', true);
    return false;
  };
}
/**
 * Watches checkboxes in a sub form to set the sub checkall box accordingly
 */
function subCheckboxesChanged() {
  var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent();
  // total number of checkboxes in current sub form
  var totalBoxes = $form.find(checkboxesSel).length;
  // number of checkboxes checked in current sub form
  var checkedBoxes = $form.find(checkboxesSel + ':checked').length;
  var $checkall = $form.find('input.sub_checkall_box');
  if (totalBoxes === checkedBoxes) {
    $checkall.prop({
      checked: true,
      indeterminate: false
    });
  } else if (checkedBoxes > 0) {
    $checkall.prop({
      checked: true,
      indeterminate: true
    });
  } else {
    $checkall.prop({
      checked: false,
      indeterminate: false
    });
  }
}
/**
 * @return {function}
 */
function getSubCheckAllBoxEventHandler() {
  return function () {
    var isChecked = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked');
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent();
    $form.find(checkboxesSel).prop('checked', isChecked).parents('tr').toggleClass('marked', isChecked);
  };
}
/**
 * Rows filtering
 *
 * - rows to filter are identified by data-filter-row attribute
 *   which contains uppercase string to filter
 * - it is simple substring case insensitive search
 * - optionally number of matching rows is written to element with
 *   id filter-rows-count
 * @return {function}
 */
function getFilterTextEventHandler() {
  return function () {
    var filterInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val().toUpperCase().replace(/ /g, '_');
    var count = 0;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-filter-row]').each(function () {
      var $row = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      /* Can not use data() here as it does magic conversion to int for numeric values */
      if ($row.attr('data-filter-row').indexOf(filterInput) > -1) {
        count += 1;
        $row.show();
        $row.find('input.checkall').removeClass('row-hidden');
      } else {
        $row.hide();
        $row.find('input.checkall').addClass('row-hidden').prop('checked', false);
        $row.removeClass('marked');
      }
    });
    setTimeout(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(checkboxesSel).trigger('change');
    }, 300);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filter-rows-count').html(count.toString());
  };
}
function onloadFilterText() {
  /* Trigger filtering of the list based on incoming database name */
  var $filter = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#filterText');
  if ($filter.val()) {
    $filter.trigger('keyup').trigger('select');
  }
}
/**
 * Formats a byte number to human-readable form
 *
 * @param bytesToFormat the bytes to format
 * @param subDecimals optional subdecimals the number of digits after the point
 * @param pointChar optional pointchar the char to use as decimal point
 *
 * @return {string}
 */
function formatBytes(bytesToFormat, subDecimals, pointChar) {
  var bytes = bytesToFormat;
  var decimals = subDecimals;
  var point = pointChar;
  if (!decimals) {
    decimals = 0;
  }
  if (!point) {
    point = '.';
  }
  var units = ['B', 'KiB', 'MiB', 'GiB'];
  for (var i = 0; bytes > 1024 && i < units.length; i++) {
    bytes /= 1024;
  }
  var factor = Math.pow(10, decimals);
  bytes = Math.round(bytes * factor) / factor;
  bytes = bytes.toString().split('.').join(point);
  return bytes + ' ' + units[i];
}
function onloadLoginForm() {
  /**
   * Reveal the login form to users with JS enabled
   * and focus the appropriate input field
   */
  var $loginform = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#loginform');
  if ($loginform.length) {
    $loginform.find('.js-show').show();
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_username').val()) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_password').trigger('focus');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_username').trigger('focus');
    }
  }
  var $httpsWarning = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#js-https-mismatch');
  if ($httpsWarning.length) {
    if (window.location.protocol === 'https:' !== _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('is_https')) {
      $httpsWarning.show();
    }
  }
}
/**
 * Toggle the Datetimepicker UI if the date value entered
 * by the user in the 'text box' is not going to be accepted
 * by the Datetimepicker plugin (but is accepted by MySQL)
 *
 * @param $td
 * @param $inputField
 */
function toggleDatepickerIfInvalid($td, $inputField) {
  // If the Datetimepicker UI is not present, return
  if ($inputField.hasClass('hasDatepicker')) {
    // Regex allowed by the Datetimepicker UI
    var dtexpDate = new RegExp(['^([0-9]{4})', '-(((01|03|05|07|08|10|12)-((0[1-9])|([1-2][0-9])|(3[0-1])))|((02|04|06|09|11)', '-((0[1-9])|([1-2][0-9])|30)))$'].join(''));
    var dtexpTime = new RegExp(['^(([0-1][0-9])|(2[0-3]))', ':((0[0-9])|([1-5][0-9]))', ':((0[0-9])|([1-5][0-9]))(.[0-9]{1,6}){0,1}$'].join(''));
    // If key-ed in Time or Date values are unsupported by the UI, close it
    if ($td.attr('data-type') === 'date' && !dtexpDate.test($inputField.val())) {
      $inputField.datepicker('hide');
    } else if ($td.attr('data-type') === 'time' && !dtexpTime.test($inputField.val())) {
      $inputField.datepicker('hide');
    } else {
      $inputField.datepicker('show');
    }
  }
}
/**
 * Function to submit the login form after validation is done.
 * NOTE: do NOT use a module or it will break the callback, issue #15435
 */
window.recaptchaCallback = function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#login_form').trigger('submit');
};
/**
 * Handle 'Ctrl/Alt + Enter' form submits
 * @return {function}
 */
function getKeyboardFormSubmitEventHandler() {
  return function (e) {
    if (e.which !== 13 || !(e.ctrlKey || e.altKey)) {
      return;
    }
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form');
    // There could be multiple submit buttons on the same form,
    // we assume all of them behave identical and just click one.
    if (!$form.find('input[type="submit"]').first() || !$form.find('input[type="submit"]').first().trigger('click')) {
      $form.trigger('submit');
    }
  };
}
/**
 * Display warning regarding SSL when sha256_password method is selected
 * Used in /user-password (Change Password link on index.php)
 * @return {function}
 */
function getSslPasswordEventHandler() {
  return function () {
    if (this.value === 'sha256_password') {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ssl_reqd_warning_cp').show();
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ssl_reqd_warning_cp').hide();
    }
  };
}
function teardownSortLinkMouseEvent() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mouseover', '.sortlink');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mouseout', '.sortlink');
}
function onloadSortLinkMouseEvent() {
  // Bind event handlers for toggling sort icons
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseover', '.sortlink', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('.soimg').toggle();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mouseout', '.sortlink', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('.soimg').toggle();
  });
}
/**
 * Return POST data as stored by Generator::linkOrButton
 *
 * @return {string}
 */
function getPostData() {
  var dataPost = this.attr('data-post');
  // Strip possible leading ?
  if (dataPost !== undefined && dataPost.startsWith('?')) {
    dataPost = dataPost.substring(1);
  }
  return dataPost;
}
(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn).confirm = confirmDialog;
(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn).sortTable = sortTable;
(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn).getPostData = getPostData;
window.pmaConfirmLink = confirmLink;
window.pmaEmptyCheckTheField = emptyCheckTheField;
window.pmaAutoPopulate = autoPopulate;
window.pmaSlidingMessage = slidingMessage;

/***/ }),

/***/ "./resources/js/modules/functions/adjustTotals.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ adjustTotals; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Adjust number of rows and total size in the summary
 * when truncating, creating, dropping or inserting into a table
 */
function adjustTotals() {
  var byteUnits = [window.Messages.strB, window.Messages.strKiB, window.Messages.strMiB, window.Messages.strGiB, window.Messages.strTiB, window.Messages.strPiB, window.Messages.strEiB];
  /**
   * @var $allTr jQuery object that references all the rows in the list of tables
   */
  var $allTr = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tablesForm').find('table.data tbody').first().find('tr');
  // New summary values for the table
  var tableSum = $allTr.length;
  var rowsSum = 0;
  var sizeSum = 0;
  var overheadSum = 0;
  var rowSumApproximated = false;
  $allTr.each(function () {
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var i;
    var tmpVal;
    // Get the number of rows for this SQL table
    var strRows = $this.find('.tbl_rows').text();
    // If the value is approximated
    if (strRows.indexOf('~') === 0) {
      rowSumApproximated = true;
      // The approximated value contains a preceding ~ (Eg 100 --> ~100)
      strRows = strRows.substring(1, strRows.length);
    }
    strRows = strRows.replace(/[,.\s]/g, '');
    var intRow = parseInt(strRows, 10);
    if (!isNaN(intRow)) {
      rowsSum += intRow;
    }
    // Extract the size and overhead
    var valSize = 0;
    var valOverhead = 0;
    var strSize = $this.find('.tbl_size span:not(.unit)').text().trim();
    var strSizeUnit = $this.find('.tbl_size span.unit').text().trim();
    var strOverhead = $this.find('.tbl_overhead span:not(.unit)').text().trim();
    var strOverheadUnit = $this.find('.tbl_overhead span.unit').text().trim();
    // Given a value and a unit, such as 100 and KiB, for the table size
    // and overhead calculate their numeric values in bytes, such as 102400
    for (i = 0; i < byteUnits.length; i++) {
      if (strSizeUnit === byteUnits[i]) {
        tmpVal = parseFloat(strSize);
        valSize = tmpVal * Math.pow(1024, i);
        break;
      }
    }
    for (i = 0; i < byteUnits.length; i++) {
      if (strOverheadUnit === byteUnits[i]) {
        tmpVal = parseFloat(strOverhead);
        valOverhead = tmpVal * Math.pow(1024, i);
        break;
      }
    }
    sizeSum += valSize;
    overheadSum += valOverhead;
  });
  // Add some commas for readability:
  // 1000000 becomes 1,000,000
  var strRowSum = rowsSum + '';
  var regex = /(\d+)(\d{3})/;
  while (regex.test(strRowSum)) {
    strRowSum = strRowSum.replace(regex, '$1' + ',' + '$2');
  }
  // If approximated total value add ~ in front
  if (rowSumApproximated) {
    strRowSum = '~' + strRowSum;
  }
  // Calculate the magnitude for the size and overhead values
  var sizeMagnitude = 0;
  var overheadMagnitude = 0;
  while (sizeSum >= 1024) {
    sizeSum /= 1024;
    sizeMagnitude++;
  }
  while (overheadSum >= 1024) {
    overheadSum /= 1024;
    overheadMagnitude++;
  }
  sizeSum = Math.round(sizeSum * 10) / 10;
  overheadSum = Math.round(overheadSum * 10) / 10;
  // Update summary with new data
  var $summary = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tbl_summary_row');
  $summary.find('.tbl_num').text(window.sprintf(window.Messages.strNTables, tableSum));
  if (rowSumApproximated) {
    $summary.find('.row_count_sum').text(strRowSum);
  } else {
    $summary.find('.tbl_rows').text(strRowSum);
  }
  $summary.find('.tbl_size').text(sizeSum + ' ' + byteUnits[sizeMagnitude]);
  $summary.find('.tbl_overhead').text(overheadSum + ' ' + byteUnits[overheadMagnitude]);
}

/***/ }),

/***/ "./resources/js/modules/functions/checkNumberOfFields.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ checkNumberOfFields; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax-message.ts");


/**
 * Check than forms have less fields than max allowed by PHP.
 * @return {boolean}
 */
function checkNumberOfFields() {
  if (typeof window.maxInputVars === 'undefined') {
    return false;
  }
  // @ts-ignore
  if (false === window.maxInputVars) {
    return false;
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('form').each(function () {
    var nbInputs = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find(':input').length;
    if (nbInputs > window.maxInputVars) {
      var warning = window.sprintf(window.Messages.strTooManyInputs, window.maxInputVars);
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)(warning);
      return false;
    }
  });
  return true;
}

/***/ }),

/***/ "./resources/js/modules/functions/createProfilingChart.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createProfilingChart; }
/* harmony export */ });
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./resources/js/modules/common.ts");

/**
 * Creates a Profiling Chart. Used in sql.ts
 * and in server/status/monitor.ts
 *
 * @param {string} target
 * @param {any[]} chartData
 * @param {string} legendPosition
 *
 * @return {object}
 */
function createProfilingChart(target, chartData, legendPosition) {
  const lang = _common_ts__WEBPACK_IMPORTED_MODULE_0__.CommonParams.get('lang');
  const numberFormat = new Intl.NumberFormat(lang.replace('_', '-'), {
    style: 'unit',
    unit: 'second',
    unitDisplay: 'long',
    notation: 'engineering'
  });
  return new window.Chart(target, {
    type: 'pie',
    data: {
      labels: chartData.labels,
      datasets: [{
        data: chartData.data
      }]
    },
    options: {
      plugins: {
        legend: {
          position: legendPosition
        },
        tooltip: {
          callbacks: {
            label: context => context.parsed ? numberFormat.format(context.parsed) : ''
          }
        }
      }
    }
  });
}

/***/ }),

/***/ "./resources/js/modules/functions/escape.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeBacktick: function() { return /* binding */ escapeBacktick; },
/* harmony export */   escapeHtml: function() { return /* binding */ escapeHtml; },
/* harmony export */   escapeJsString: function() { return /* binding */ escapeJsString; },
/* harmony export */   escapeSingleQuote: function() { return /* binding */ escapeSingleQuote; }
/* harmony export */ });
/**
 * @param {string} value
 * @return {string}
 */
function escapeHtml() {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  const element = document.createElement('span');
  element.appendChild(document.createTextNode(value));
  return element.innerHTML;
}
/**
 * JavaScript escaping
 *
 * @param {any} unsafe
 * @return {string | false}
 */
function escapeJsString(unsafe) {
  if (typeof unsafe !== 'undefined') {
    return unsafe.toString().replace('\x00', '').replace('\\', '\\\\').replace('\'', '\\\'').replace('&#039;', '\\&#039;').replace('"', '\\"').replace('&quot;', '\\&quot;').replace('\n', '\n').replace('\r', '\r').replace(/<\/script/gi, '</\' + \'script');
  } else {
    return false;
  }
}
/**
 * @param {string} s
 * @return {string}
 */
function escapeBacktick(s) {
  return s.replaceAll('`', '``');
}
/**
 * @param {string} s
 * @return {string}
 */
function escapeSingleQuote(s) {
  return s.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'');
}

/***/ }),

/***/ "./resources/js/modules/functions/formatDateTime.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ formatDateTime; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Formats timestamp for display
 *
 * @param {Date} date
 * @param {boolean} seconds
 * @return {string}
 */
function formatDateTime(date) {
  let seconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var result = jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker.formatDate('yy-mm-dd', date);
  var timefmt = 'HH:mm';
  if (seconds) {
    timefmt = 'HH:mm:ss';
  }
  // @ts-ignore
  return result + ' ' + jquery__WEBPACK_IMPORTED_MODULE_0___default().datepicker.formatTime(timefmt, {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  });
}

/***/ }),

/***/ "./resources/js/modules/functions/getImageTag.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getImageTag; }
/* harmony export */ });
/* harmony import */ var _escape_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./resources/js/modules/functions/escape.ts");

/**
 * Returns an HTML IMG tag for a particular image from a theme,
 * which may be an actual file or an icon from a sprite
 *
 * @param {string} image      The name of the file to get
 * @param {string} alternate  Used to set 'alt' and 'title' attributes of the image
 * @param {object} attributes An associative array of other attributes
 *
 * @return {object} The requested image, this object has two methods:
 *                  .toString()        - Returns the IMG tag for the requested image
 *                  .attr(name)        - Returns a particular attribute of the IMG
 *                                       tag given it's name
 *                  .attr(name, value) - Sets a particular attribute of the IMG
 *                                       tag to the given value
 */
function getImageTag(image) {
  let alternate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  let attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var alt = alternate;
  var attr = attributes;
  // custom image object, it will eventually be returned by this functions
  var retval = {
    data: {
      // this is private
      alt: '',
      title: '',
      src: 'themes/dot.gif'
    },
    attr: function (name, value) {
      if (value === undefined) {
        if (this.data[name] === undefined) {
          return '';
        } else {
          return this.data[name];
        }
      } else {
        this.data[name] = value;
      }
    },
    toString: function () {
      var retval = '<' + 'img';
      for (var i in this.data) {
        retval += ' ' + i + '="' + this.data[i] + '"';
      }
      retval += ' /' + '>';
      return retval;
    }
  };
  // initialise missing parameters
  if (attr === undefined) {
    attr = {};
  }
  if (alt === undefined) {
    alt = '';
  }
  // set alt
  if (attr.alt !== undefined) {
    retval.attr('alt', (0,_escape_ts__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(attr.alt));
  } else {
    retval.attr('alt', (0,_escape_ts__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(alt));
  }
  // set title
  if (attr.title !== undefined) {
    retval.attr('title', (0,_escape_ts__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(attr.title));
  } else {
    retval.attr('title', (0,_escape_ts__WEBPACK_IMPORTED_MODULE_0__.escapeHtml)(alt));
  }
  // set css classes
  retval.attr('class', 'icon ic_' + image);
  // set all other attributes
  for (var i in attr) {
    if (i === 'src') {
      // do not allow to override the 'src' attribute
      continue;
    }
    retval.attr(i, attr[i]);
  }
  return retval;
}

/***/ }),

/***/ "./resources/js/modules/functions/getJsConfirmCommonParam.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getJsConfirmCommonParam; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/common.ts");


/**
 * @param {HTMLElement} elem
 * @param {string} parameters
 * @return {string}
 */
function getJsConfirmCommonParam(elem, parameters) {
  var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem);
  var params = parameters;
  var sep = _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator');
  if (params) {
    // Strip possible leading ?
    if (params.startsWith('?')) {
      params = params.substring(1);
    }
    params += sep;
  } else {
    params = '';
  }
  params += 'is_js_confirmed=1' + sep + 'ajax_request=true' + sep + 'fk_checks=' + ($elem.find('#fk_checks').is(':checked') ? 1 : 0);
  return params;
}

/***/ }),

/***/ "./resources/js/modules/functions/handleRedirectAndReload.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handleRedirectAndReload; }
/* harmony export */ });
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./resources/js/modules/common.ts");

/**
 * Handle redirect and reload flags sent as part of AJAX requests
 *
 * @param {Object} data ajax response data
 */
function handleRedirectAndReload(data) {
  if (parseInt(data.redirect_flag) === 1) {
    // add one more GET param to display session expiry msg
    if (window.location.href.indexOf('?') === -1) {
      window.location.href += '?session_expired=1';
    } else {
      window.location.href += _common_ts__WEBPACK_IMPORTED_MODULE_0__.CommonParams.get('arg_separator') + 'session_expired=1';
    }
    window.location.reload();
  } else if (parseInt(data.reload_flag) === 1) {
    window.location.reload();
  }
}

/***/ }),

/***/ "./resources/js/modules/functions/ignorePhpErrors.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ignorePhpErrors: function() { return /* binding */ ignorePhpErrors; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Ignore the displayed php errors.
 * Simply removes the displayed errors.
 *
 * @param {boolean} clearPrevErrors whether to clear errors stored
 *             in $_SESSION['prev_errors'] at server
 *
 */
function ignorePhpErrors() {
  let clearPrevErrors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var clearPrevious = clearPrevErrors;
  if (typeof clearPrevious === 'undefined' || clearPrevious === null) {
    clearPrevious = false;
  }
  // send AJAX request to /error-report with send_error_report=0, exception_type=php & token.
  // It clears the prev_errors stored in session.
  if (clearPrevious) {
    var $pmaReportErrorsForm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_report_errors_form');
    $pmaReportErrorsForm.find('input[name="send_error_report"]').val(0); // change send_error_report to '0'
    $pmaReportErrorsForm.trigger('submit');
  }
  // remove displayed errors
  var $pmaErrors = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_errors');
  $pmaErrors.fadeOut('slow');
  $pmaErrors.remove();
}
window.ignorePhpErrors = ignorePhpErrors;


/***/ }),

/***/ "./resources/js/modules/functions/isStorageSupported.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isStorageSupported; }
/* harmony export */ });
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./resources/js/modules/ajax-message.ts");

/**
 * checks whether browser supports web storage
 *
 * @param {'localStorage' | 'sessionStorage'} type the type of storage i.e. localStorage or sessionStorage
 * @param {boolean} warn Wether to show a warning on error
 *
 * @return {boolean}
 */
function isStorageSupported(type) {
  let warn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  try {
    window[type].setItem('PMATest', 'test');
    // Check whether key-value pair was set successfully
    if (window[type].getItem('PMATest') === 'test') {
      // Supported, remove test variable from storage
      window[type].removeItem('PMATest');
      return true;
    }
  } catch (error) {
    // Not supported
    if (warn) {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_0__.ajaxShowMessage)(window.Messages.strNoLocalStorage, false);
    }
  }
  return false;
}

/***/ }),

/***/ "./resources/js/modules/functions/mainMenuResizerCallback.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mainMenuResizerCallback; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

function mainMenuResizerCallback() {
  // 5 px margin for jumping menu in Chrome
  // eslint-disable-next-line compat/compat
  return jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).width() - 5;
}

/***/ }),

/***/ "./resources/js/modules/functions/refreshMainContent.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ refreshMainContent; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/common.ts");


/**
 * Refreshes the main frame
 *
 * @param {any} url Undefined to refresh to the same page
 *                  String to go to a different page, e.g: 'index.php'
 */
function refreshMainContent() {
  let url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var newUrl = url;
  if (!newUrl) {
    newUrl = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#selflink').find('a').attr('href') || window.location.pathname;
    newUrl = newUrl.substring(0, newUrl.indexOf('?'));
  }
  if (newUrl.indexOf('?') !== -1) {
    newUrl += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.getUrlQuery(_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator'));
  } else {
    newUrl += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.getUrlQuery('?');
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a></a>', {
    href: newUrl
  }).appendTo('body').trigger('click').remove();
}

/***/ }),

/***/ "./resources/js/modules/indexes.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Indexes: function() { return /* binding */ Indexes; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ajax_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax.ts");
/* harmony import */ var _functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/functions.ts");
/* harmony import */ var _navigation_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/navigation.ts");
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/js/modules/sql-highlight.ts");
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./resources/js/modules/functions/getJsConfirmCommonParam.ts");
/* harmony import */ var _functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./resources/js/modules/functions/refreshMainContent.ts");
/* harmony import */ var _indexes_checkIndexType_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./resources/js/modules/indexes/checkIndexType.ts");
/* harmony import */ var _indexes_checkIndexName_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./resources/js/modules/indexes/checkIndexName.ts");











/**
 * Array to hold 'Primary' index columns.
 * @type {any[]}
 */
let primaryColumns = [];
/**
 * Array to hold 'Unique' index columns.
 * @type {any[]}
 */
let uniqueColumns = [];
/**
 * Array to hold 'Index' columns.
 * @type {any[]}
 */
let indexColumns = [];
/**
 * Array to hold 'Fulltext' columns.
 * @type {any[]}
 */
let fulltextColumns = [];
/**
 * Array to hold 'Spatial' columns.
 * @type {any[]}
 */
let spatialColumns = [];
function resetColumnLists() {
  primaryColumns = [];
  uniqueColumns = [];
  indexColumns = [];
  fulltextColumns = [];
  spatialColumns = [];
}
/**
 * Returns the array of indexes based on the index choice
 *
 * @param {string} indexChoice index choice
 *
 * @return {null|object}
 */
function getIndexArray(indexChoice) {
  let sourceArray = null;
  switch (indexChoice.toLowerCase()) {
    case 'primary':
      sourceArray = primaryColumns;
      break;
    case 'unique':
      sourceArray = uniqueColumns;
      break;
    case 'index':
      sourceArray = indexColumns;
      break;
    case 'fulltext':
      sourceArray = fulltextColumns;
      break;
    case 'spatial':
      sourceArray = spatialColumns;
      break;
    default:
      return null;
  }
  return sourceArray;
}
/**
 * Sets current index information into form parameters.
 *
 * @param {any[]}  sourceArray Array containing index columns
 * @param {string} indexChoice Choice of index
 */
function setIndexFormParameters(sourceArray, indexChoice) {
  if (indexChoice === 'index') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="indexes"]').val(JSON.stringify(sourceArray));
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="' + indexChoice + '_indexes"]').val(JSON.stringify(sourceArray));
  }
}
/**
 * Removes a column from an Index.
 *
 * @param {string} colIndex Index of column in form
 */
function removeColumnFromIndex(colIndex) {
  // Get previous index details.
  var previousIndex = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_key[' + colIndex + ']"]').attr('data-index');
  if (previousIndex.length) {
    const previousIndexes = previousIndex.split(',');
    var sourceArray = Indexes.getIndexArray(previousIndexes[0]);
    if (sourceArray === null) {
      return;
    }
    if (previousIndex[1] in sourceArray) {
      // Remove column from index array.
      var sourceLength = sourceArray[previousIndexes[1]].columns.length;
      for (var i = 0; i < sourceLength; i++) {
        if (i in sourceArray[previousIndex[1]].columns) {
          if (sourceArray[previousIndexes[1]].columns[i].col_index === colIndex) {
            sourceArray[previousIndexes[1]].columns.splice(i, 1);
          }
        }
      }
      // Remove index completely if no columns left.
      if (sourceArray[previousIndexes[1]].columns.length === 0) {
        sourceArray.splice(previousIndexes[1], 1);
      }
    }
    // Update current index details.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_key[' + colIndex + ']"]').attr('data-index', '');
    // Update form index parameters.
    Indexes.setIndexFormParameters(sourceArray, previousIndexes[0].toLowerCase());
  }
}
/**
 * Adds a column to an Index.
 *
 * @param {any[]}  sourceArray Array holding corresponding indexes
 * @param {string} arrayIndex  Index of an INDEX in array
 * @param {string} indexChoice Choice of Index
 * @param {string} colIndex    Index of column on form
 */
function addColumnToIndex(sourceArray, arrayIndex, indexChoice, colIndex) {
  if (colIndex >= 0) {
    // Remove column from other indexes (if any).
    Indexes.removeColumnFromIndex(colIndex);
  }
  var indexName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="index[Key_name]"]').val();
  var indexComment = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="index[Index_comment]"]').val();
  var keyBlockSize = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="index[Key_block_size]"]').val();
  var parser = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="index[Parser]"]').val();
  var indexType = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="index[Index_type]"]').val();
  var columns = [];
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_columns').find('tbody').find('tr').each(function () {
    // Get columns in particular order.
    var colIndex = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('select[name="index[columns][names][]"]').val();
    var size = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('input[name="index[columns][sub_parts][]"]').val();
    columns.push({
      'col_index': colIndex,
      'size': size
    });
  });
  // Update or create an index.
  sourceArray[arrayIndex] = {
    'Key_name': indexName,
    'Index_comment': indexComment,
    'Index_choice': indexChoice.toUpperCase(),
    'Key_block_size': keyBlockSize,
    'Parser': parser,
    'Index_type': indexType,
    'columns': columns
  };
  // Display index name (or column list)
  var displayName = indexName;
  if (displayName === '') {
    var columnNames = [];
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(columns, function () {
      columnNames.push(jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="field_name[' + this.col_index + ']"]').val());
    });
    displayName = '[' + columnNames.join(', ').trimRight() + ']';
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default().each(columns, function () {
    var id = 'index_name_' + this.col_index + '_8';
    var $name = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + id);
    if ($name.length === 0) {
      $name = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a id="' + id + '" href="#" class="ajax show_index_dialog"></a>');
      $name.insertAfter(jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_key[' + this.col_index + ']"]'));
    }
    var $text = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<small>').text(displayName);
    // @ts-ignore
    $name.html($text);
  });
  if (colIndex >= 0) {
    // Update index details on form.
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_key[' + colIndex + ']"]').attr('data-index', indexChoice + ',' + arrayIndex);
  }
  Indexes.setIndexFormParameters(sourceArray, indexChoice.toLowerCase());
}
/**
 * Get choices list for a column to create a composite index with.
 *
 * @param {any[]} sourceArray Array hodling columns for particular index
 * @param {string} colIndex Choice of index
 *
 * @return {JQuery} jQuery Object
 */
function getCompositeIndexList(sourceArray, colIndex) {
  // Remove any previous list.
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#composite_index_list').length) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#composite_index_list').remove();
  }
  // Html list.
  var $compositeIndexList = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<ul id="composite_index_list">' + '<div>' + window.Messages.strCompositeWith + '</div>' + '</ul>');
  // Add each column to list available for composite index.
  var sourceLength = sourceArray.length;
  var alreadyPresent = false;
  for (var i = 0; i < sourceLength; i++) {
    var subArrayLen = sourceArray[i].columns.length;
    var columnNames = [];
    for (var j = 0; j < subArrayLen; j++) {
      columnNames.push(jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="field_name[' + sourceArray[i].columns[j].col_index + ']"]').val());
      if (colIndex === sourceArray[i].columns[j].col_index) {
        alreadyPresent = true;
      }
    }
    $compositeIndexList.append('<li>' + '<input type="radio" name="composite_with" ' + (alreadyPresent ? 'checked' : '') + ' id="composite_index_' + i + '" value="' + i + '">' + '<label for="composite_index_' + i + '">' + columnNames.join(', ') + '</label>' + '</li>');
  }
  return $compositeIndexList;
}
var addIndexGo = function (sourceArray, arrayIndex, index, colIndex) {
  var isMissingValue = false;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="index[columns][names][]"]').each(function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === '') {
      isMissingValue = true;
    }
  });
  if (!isMissingValue) {
    Indexes.addColumnToIndex(sourceArray, arrayIndex, index.Index_choice, colIndex);
  } else {
    (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)('<div class="alert alert-danger" role="alert"><img src="themes/dot.gif" title="" alt=""' + ' class="icon ic_s_error"> ' + window.Messages.strMissingColumn + ' </div>', false);
    return false;
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').modal('hide');
};
/**
 * Shows 'Add Index' dialog.
 *
 * @param {any[]}  sourceArray   Array holding particular index
 * @param {string} arrayIndex    Index of an INDEX in array
 * @param {any[]}  targetColumns Columns for an INDEX
 * @param {string} colIndex      Index of column on form
 * @param {object} index         Index detail object
 * @param {boolean} showDialog   Whether to show index creation dialog or not
 */
function showAddIndexDialog(sourceArray, arrayIndex, targetColumns, colIndex, index) {
  let showDialog = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
  var showDialogLocal = typeof showDialog !== 'undefined' ? showDialog : true;
  // Prepare post-data.
  var $table = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="table"]');
  var table = $table.length > 0 ? $table.val() : '';
  var postData = {
    'server': _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('server'),
    'db': jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="db"]').val(),
    'table': table,
    'ajax_request': 1,
    'create_edit_table': 1,
    'index': index,
    'columns': ''
  };
  var columns = {};
  for (var i = 0; i < targetColumns.length; i++) {
    var columnName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="field_name[' + targetColumns[i] + ']"]').val();
    var columnType = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_type[' + targetColumns[i] + ']"]').val().toLowerCase();
    columns[columnName] = [columnType, targetColumns[i]];
  }
  postData.columns = JSON.stringify(columns);
  createAddIndexModal();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModalGoButton').on('click', function () {
    addIndexGo(sourceArray, arrayIndex, index, colIndex);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModalCancelButton').on('click', function () {
    if (colIndex >= 0) {
      // Handle state on 'Cancel'.
      var $selectList = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_key[' + colIndex + ']"]');
      if (!$selectList.attr('data-index').length) {
        $selectList.find('option[value*="none"]').attr('selected', 'selected');
      } else {
        var previousIndex = $selectList.attr('data-index').split(',');
        $selectList.find('option[value*="' + previousIndex[0].toLowerCase() + '"]').attr('selected', 'selected');
      }
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').modal('hide');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModalCloseButton').on('click', function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').modal('hide');
  });
  var $msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/table/indexes', postData, function (data) {
    if (data.success === false) {
      // in the case of an error, show the error message returned.
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(data.error, false);
    } else {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msgbox);
      var $div = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>');
      if (showDialogLocal) {
        // Show dialog if the request was successful
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndex').length > 0) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndex').remove();
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').on('keypress', function (e) {
          if (e.which === 13 || e.keyCode === 13 || window.event.keyCode === 13) {
            e.preventDefault();
            console.log('BOOM');
            addIndexGo(sourceArray, arrayIndex, index, colIndex);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').modal('hide');
          }
        });
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').modal('show');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModalLabel').first().text(window.Messages.strAddIndex);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').find('.modal-body').first().html(data.message);
        (0,_indexes_checkIndexName_ts__WEBPACK_IMPORTED_MODULE_10__["default"])('index_frm');
        (0,_functions_ts__WEBPACK_IMPORTED_MODULE_2__.showHints)($div);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_columns').find('td').each(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('width', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).width() + 'px');
        });
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_columns').find('tbody').sortable({
          axis: 'y',
          containment: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_columns').find('tbody'),
          tolerance: 'pointer'
        });
      } else {
        $div.append(data.message);
        $div.css({
          'display': 'none'
        });
        $div.appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()('body'));
        $div.attr({
          'id': 'addIndex'
        });
        var isMissingValue = false;
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="index[columns][names][]"]').each(function () {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === '') {
            isMissingValue = true;
          }
        });
        if (!isMissingValue) {
          Indexes.addColumnToIndex(sourceArray, arrayIndex, index.Index_choice, colIndex);
        } else {
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)('<div class="alert alert-danger" role="alert"><img src="themes/dot.gif" title="" alt=""' + ' class="icon ic_s_error"> ' + window.Messages.strMissingColumn + ' </div>', false);
          return false;
        }
      }
    }
  });
}
var removeIndexOnChangeEvent = function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#composite_index').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#single_column').off('change');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').modal('hide');
};
/**
 * Creates a advanced index type selection dialog.
 *
 * @param {any[]}  sourceArray Array holding a particular type of indexes
 * @param {string} indexChoice Choice of index
 * @param {string} colIndex    Index of new column on form
 */
function indexTypeSelectionDialog(sourceArray, indexChoice, colIndex) {
  var $singleColumnRadio = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="form-check">' + '<input class="form-check-input" type="radio" id="single_column" name="index_choice" checked>' + '<label class="form-check-label" for="single_column">' + window.Messages.strCreateSingleColumnIndex + '</label></div>');
  var $compositeIndexRadio = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="form-check">' + '<input class="form-check-input" type="radio" id="composite_index" name="index_choice">' + '<label class="form-check-label" for="composite_index">' + window.Messages.strCreateCompositeIndex + '</label></div>');
  var $dialogContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<fieldset id="advance_index_creator"></fieldset>');
  $dialogContent.append('<legend>' + indexChoice.toUpperCase() + '</legend>');
  // For UNIQUE/INDEX type, show choice for single-column and composite index.
  $dialogContent.append($singleColumnRadio);
  $dialogContent.append($compositeIndexRadio);
  createAddIndexModal();
  // 'OK' operation.
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModalGoButton').on('click', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#single_column').is(':checked')) {
      var index = {
        'Key_name': indexChoice === 'primary' ? 'PRIMARY' : '',
        'Index_choice': indexChoice.toUpperCase()
      };
      Indexes.showAddIndexDialog(sourceArray, sourceArray.length, [colIndex], colIndex, index);
    }
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#composite_index').is(':checked')) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="composite_with"]').length !== 0 && jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="composite_with"]:checked').length === 0) {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)('<div class="alert alert-danger" role="alert"><img src="themes/dot.gif" title=""' + ' alt="" class="icon ic_s_error"> ' + window.Messages.strFormEmpty + ' </div>', false);
        return false;
      }
      var arrayIndex = Number(jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="composite_with"]:checked').val());
      var sourceLength = sourceArray[arrayIndex].columns.length;
      var targetColumns = [];
      for (var i = 0; i < sourceLength; i++) {
        targetColumns.push(sourceArray[arrayIndex].columns[i].col_index);
      }
      targetColumns.push(colIndex);
      Indexes.showAddIndexDialog(sourceArray, arrayIndex, targetColumns, colIndex, sourceArray[arrayIndex]);
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').modal('hide');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModalCancelButton').on('click', function () {
    // Handle state on 'Cancel'.
    var $selectList = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_key[' + colIndex + ']"]');
    if (!$selectList.attr('data-index').length) {
      $selectList.find('option[value*="none"]').attr('selected', 'selected');
    } else {
      var previousIndex = $selectList.attr('data-index').split(',');
      $selectList.find('option[value*="' + previousIndex[0].toLowerCase() + '"]').attr('selected', 'selected');
    }
    removeIndexOnChangeEvent();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModalCloseButton').on('click', function () {
    removeIndexOnChangeEvent();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').modal('show');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModalLabel').first().text(window.Messages.strAddIndex);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').find('.modal-body').first()
  // @ts-ignore
  .html($dialogContent);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#composite_index').on('change', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked')) {
      $dialogContent.append(Indexes.getCompositeIndexList(sourceArray, colIndex));
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#single_column').on('change', function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':checked')) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#composite_index_list').length) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#composite_index_list').remove();
      }
    }
  });
}
/**
 * @return {function}
 */
function off() {
  return function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#save_index_frm');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#preview_index_frm');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('change', '#select_index_choice');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', 'a.drop_primary_key_index_anchor.ajax');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#table_index tbody tr td.edit_index.ajax, #index_div .add_index.ajax');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#table_index tbody tr td.rename_index.ajax');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '#index_frm input[type=submit]');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('change', 'select[name*="field_key"]');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('click', '.show_index_dialog');
  };
}
function createAddIndexModal() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#addIndexModal').length > 0) {
    return;
  }
  const addIndexModalTemplate = '<div class="modal fade" id="addIndexModal" tabindex="-1" aria-labelledby="addIndexModalLabel" aria-hidden="true">' + '  <div class="modal-dialog">' + '    <div class="modal-content">' + '      <div class="modal-header">' + '        <h5 class="modal-title" id="addIndexModalLabel">' + window.Messages.strLoading + '</h5>' + '        <button type="button" class="btn-close" id="addIndexModalCloseButton" aria-label="' + window.Messages.strClose + '"></button>' + '      </div>' + '      <div class="modal-body"></div>' + '      <div class="modal-footer">' + '        <button type="button" class="btn btn-secondary" id="addIndexModalGoButton">' + window.Messages.strGo + '</button>' + '        <button type="button" class="btn btn-secondary" id="addIndexModalCancelButton">' + window.Messages.strCancel + '</button>' + '      </div>' + '    </div>' + '  </div>' + '</div>';
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(addIndexModalTemplate).appendTo('body');
}
/**
 * @return {function}
 */
function on() {
  return function () {
    Indexes.resetColumnLists();
    // for table creation form
    var $engineSelector = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.create_table_form select[name=tbl_storage_engine]');
    if ($engineSelector.length) {
      (0,_functions_ts__WEBPACK_IMPORTED_MODULE_2__.hideShowConnection)($engineSelector);
    }
    var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_frm');
    if ($form.length > 0) {
      (0,_functions_ts__WEBPACK_IMPORTED_MODULE_2__.showIndexEditDialog)($form);
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#save_index_frm', function (event) {
      event.preventDefault();
      var $form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_frm');
      var argsep = _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator');
      var submitData = $form.serialize() + argsep + 'do_save_data=1' + argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true';
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strProcessingRequest);
      _ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.source = $form;
      jquery__WEBPACK_IMPORTED_MODULE_0___default().post($form.attr('action'), submitData, _ajax_ts__WEBPACK_IMPORTED_MODULE_1__.AJAX.responseHandler);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#preview_index_frm', function (event) {
      event.preventDefault();
      (0,_functions_ts__WEBPACK_IMPORTED_MODULE_2__.previewSql)(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_frm'));
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#select_index_choice', function (event) {
      event.preventDefault();
      (0,_indexes_checkIndexType_ts__WEBPACK_IMPORTED_MODULE_9__["default"])();
      (0,_indexes_checkIndexName_ts__WEBPACK_IMPORTED_MODULE_10__["default"])('index_frm');
    });
    /**
     * Ajax Event handler for 'Drop Index'
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', 'a.drop_primary_key_index_anchor.ajax', function (event) {
      event.preventDefault();
      var $anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      /**
       * @var $currRow Object containing reference to the current field's row
       */
      var $currRow = $anchor.parents('tr');
      /** @var {number} rows Number of columns in the key */
      var rows = Number($anchor.parents('td').attr('rowspan')) || 1;
      /** @var {number} $rowsToHide Rows that should be hidden */
      var $rowsToHide = $currRow;
      for (var i = 1, $lastRow = $currRow.next(); i < rows; i++, $lastRow = $lastRow.next()) {
        $rowsToHide = $rowsToHide.add($lastRow);
      }
      var question = $currRow.children('td').children('.drop_primary_key_index_msg').val();
      (0,_functions_ts__WEBPACK_IMPORTED_MODULE_2__.confirmPreviewSql)(question, $anchor.attr('href'), function (url) {
        var $msg = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strDroppingPrimaryKeyIndex, false);
        var params = (0,_functions_getJsConfirmCommonParam_ts__WEBPACK_IMPORTED_MODULE_7__["default"])(this, $anchor.getPostData());
        jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
          if (typeof data !== 'undefined' && data.success === true) {
            (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxRemoveMessage)($msg);
            var $tableRef = $rowsToHide.closest('table');
            if ($rowsToHide.length === $tableRef.find('tbody > tr').length) {
              // We are about to remove all rows from the table
              $tableRef.hide('medium', function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('div.no_indexes_defined').show('medium');
                $rowsToHide.remove();
              });
              $tableRef.siblings('.alert-primary').hide('medium');
            } else {
              // We are removing some of the rows only
              $rowsToHide.hide('medium', function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).remove();
              });
            }
            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query').length) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('.result_query').remove();
            }
            if (data.sql_query) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="result_query"></div>').html(data.sql_query).prependTo('#structure_content');
              (0,_sql_highlight_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#page_content'));
            }
            _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.reload();
            (0,_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__["default"])('index.php?route=/table/structure');
          } else {
            (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_6__.ajaxShowMessage)(window.Messages.strErrorProcessingRequest + ' : ' + data.error, false);
          }
        }); // end $.post()
      });
    }); // end Drop Primary Key/Index
    /**
     * Ajax event handler for index edit
     **/
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#table_index tbody tr td.edit_index.ajax, #index_div .add_index.ajax', function (event) {
      event.preventDefault();
      var url;
      var title;
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('a').length === 0) {
        // Add index
        var valid = (0,_functions_ts__WEBPACK_IMPORTED_MODULE_2__.checkFormElementInRange)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form')[0], 'added_fields', 'Column count has to be larger than zero.');
        if (!valid) {
          return;
        }
        url = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('form').serialize();
        title = window.Messages.strAddIndex;
      } else {
        // Edit index
        url = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('a').getPostData();
        title = window.Messages.strEditIndex;
      }
      url += _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'ajax_request=true';
      (0,_functions_ts__WEBPACK_IMPORTED_MODULE_2__.indexEditorDialog)(url, title, function (data) {
        _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', data.params.db));
        _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('table', data.params.table));
        (0,_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__["default"])('index.php?route=/table/structure');
      });
    });
    /**
     * Ajax event handler for index rename
     **/
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#table_index tbody tr td.rename_index.ajax', function (event) {
      event.preventDefault();
      var url = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('a').getPostData();
      var title = window.Messages.strRenameIndex;
      url += _common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.get('arg_separator') + 'ajax_request=true';
      (0,_functions_ts__WEBPACK_IMPORTED_MODULE_2__.indexRenameDialog)(url, title, function (data) {
        _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('db', data.params.db));
        _navigation_ts__WEBPACK_IMPORTED_MODULE_3__.Navigation.update(_common_ts__WEBPACK_IMPORTED_MODULE_4__.CommonParams.set('table', data.params.table));
        (0,_functions_refreshMainContent_ts__WEBPACK_IMPORTED_MODULE_8__["default"])('index.php?route=/table/structure');
      });
    });
    /**
     * Ajax event handler for advanced index creation during table creation
     * and column addition.
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('change', 'select[name*="field_key"]', function (e, showDialog) {
      var showDialogLocal = typeof showDialog !== 'undefined' ? showDialog : true;
      // Index of column on Table edit and create page.
      var colIndexRegEx = /\d+/.exec(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name'));
      const colIndex = colIndexRegEx[0];
      // Choice of selected index.
      var indexChoiceRegEx = /[a-z]+/.exec(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
      const indexChoice = indexChoiceRegEx[0];
      // Array containing corresponding indexes.
      var sourceArray = null;
      if (indexChoice === 'none') {
        Indexes.removeColumnFromIndex(colIndex);
        var id = 'index_name_' + colIndex + '_8';
        var $name = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + id);
        if ($name.length === 0) {
          $name = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a id="' + id + '" href="#" class="ajax show_index_dialog"></a>');
          $name.insertAfter(jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="field_key[' + '0' + ']"]'));
        }
        $name.html('');
        return false;
      }
      // Select a source array.
      sourceArray = Indexes.getIndexArray(indexChoice);
      if (sourceArray === null) {
        return;
      }
      if (sourceArray.length === 0) {
        var index = {
          'Key_name': indexChoice === 'primary' ? 'PRIMARY' : '',
          'Index_choice': indexChoice.toUpperCase()
        };
        Indexes.showAddIndexDialog(sourceArray, 0, [colIndex], colIndex, index, showDialogLocal);
      } else {
        if (indexChoice === 'primary') {
          var arrayIndex = 0;
          var sourceLength = sourceArray[arrayIndex].columns.length;
          var targetColumns = [];
          for (var i = 0; i < sourceLength; i++) {
            targetColumns.push(sourceArray[arrayIndex].columns[i].col_index);
          }
          targetColumns.push(colIndex);
          Indexes.showAddIndexDialog(sourceArray, arrayIndex, targetColumns, colIndex, sourceArray[arrayIndex], showDialogLocal);
        } else {
          // If there are multiple columns selected for an index, show advanced dialog.
          Indexes.indexTypeSelectionDialog(sourceArray, indexChoice, colIndex);
        }
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '.show_index_dialog', function (e) {
      e.preventDefault();
      // Get index details.
      var previousIndex = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prev('select').attr('data-index').split(',');
      var indexChoice = previousIndex[0];
      var arrayIndex = previousIndex[1];
      var sourceArray = Indexes.getIndexArray(indexChoice);
      if (sourceArray === null) {
        return;
      }
      if (arrayIndex in sourceArray) {
        var sourceLength = sourceArray[arrayIndex].columns.length;
        var targetColumns = [];
        for (var i = 0; i < sourceLength; i++) {
          targetColumns.push(sourceArray[arrayIndex].columns[i].col_index);
        }
        Indexes.showAddIndexDialog(sourceArray, arrayIndex, targetColumns, -1, sourceArray[arrayIndex]);
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_frm').on('submit', function () {
      if (typeof this.elements['index[Key_name]'].disabled !== 'undefined') {
        this.elements['index[Key_name]'].disabled = false;
      }
    });
  };
}
/**
 * Index manipulation pages
 */
const Indexes = {
  resetColumnLists: resetColumnLists,
  getIndexArray: getIndexArray,
  setIndexFormParameters: setIndexFormParameters,
  removeColumnFromIndex: removeColumnFromIndex,
  addColumnToIndex: addColumnToIndex,
  getCompositeIndexList: getCompositeIndexList,
  showAddIndexDialog: showAddIndexDialog,
  indexTypeSelectionDialog: indexTypeSelectionDialog,
  off: off,
  on: on
};


/***/ }),

/***/ "./resources/js/modules/indexes/checkIndexName.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ checkIndexName; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Ensures indexes names are valid according to their type and, for a primary
 * key, lock index name to 'PRIMARY'
 * @param {string} formId Variable which parses the form name as
 *                        the input
 * @return {boolean} false if there is no index form, true else
 */
function checkIndexName(formId) {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + formId).length === 0) {
    return false;
  }
  // Gets the elements pointers
  var $theIdxName = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#input_index_name');
  var $theIdxChoice = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_index_choice');
  // Index is a primary key
  if ($theIdxChoice.find('option:selected').val() === 'PRIMARY') {
    $theIdxName.val('PRIMARY');
    $theIdxName.prop('disabled', true);
  } else {
    if ($theIdxName.val() === 'PRIMARY') {
      $theIdxName.val('');
    }
    $theIdxName.prop('disabled', false);
  }
  return true;
}

/***/ }),

/***/ "./resources/js/modules/indexes/checkIndexType.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ checkIndexType; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Hides/shows the inputs and submits appropriately depending
 * on whether the index type chosen is 'SPATIAL' or not.
 */
function checkIndexType() {
  /**
   * @var {JQuery<HTMLElement}, Dropdown to select the index choice.
   */
  var $selectIndexChoice = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_index_choice');
  /**
   * @var {JQuery<HTMLElement}, Dropdown to select the index type.
   */
  var $selectIndexType = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#select_index_type');
  /**
   * @var {JQuery<HTMLElement}, Table header for the size column.
   */
  var $sizeHeader = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_columns').find('thead tr').children('th').eq(1);
  /**
   * @var {JQuery<HTMLElement}, Inputs to specify the columns for the index.
   */
  var $columnInputs = jquery__WEBPACK_IMPORTED_MODULE_0___default()('select[name="index[columns][names][]"]');
  /**
   * @var {JQuery<HTMLElement}, Inputs to specify sizes for columns of the index.
   */
  var $sizeInputs = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[name="index[columns][sub_parts][]"]');
  /**
   * @var {JQuery<HTMLElement}, Footer containing the controllers to add more columns
   */
  var $addMore = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#index_frm').find('.add_more');
  if ($selectIndexChoice.val() === 'SPATIAL') {
    // Disable and hide the size column
    $sizeHeader.hide();
    $sizeInputs.each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop('disabled', true).parent('td').hide();
    });
    // Disable and hide the columns of the index other than the first one
    var initial = true;
    $columnInputs.each(function () {
      var $columnInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      if (!initial) {
        $columnInput.prop('disabled', true).parent('td').hide();
      } else {
        initial = false;
      }
    });
    // Hide controllers to add more columns
    $addMore.hide();
  } else {
    // Enable and show the size column
    $sizeHeader.show();
    $sizeInputs.each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop('disabled', false).parent('td').show();
    });
    // Enable and show the columns of the index
    $columnInputs.each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop('disabled', false).parent('td').show();
    });
    // Show controllers to add more columns
    $addMore.show();
  }
  if ($selectIndexChoice.val() === 'SPATIAL' || $selectIndexChoice.val() === 'FULLTEXT') {
    $selectIndexType.val('').prop('disabled', true);
  } else {
    $selectIndexType.prop('disabled', false);
  }
}

/***/ }),

/***/ "./resources/js/modules/json-highlight.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ highlightJson; }
/* harmony export */ });
/**
 * Applies JSON syntax highlighting transformation using CodeMirror
 *
 * @param {JQuery} $base base element which contains the JSON code blocks
 */
function highlightJson($base) {
  var $elm = $base.find('code.json');
  $elm.each(function () {
    var $json = $(this);
    var $pre = $json.find('pre');
    /* We only care about visible elements to avoid double processing */
    if ($pre.is(':visible')) {
      var $highlight = $('<div class="json-highlight cm-s-default"></div>');
      $json.append($highlight);
      // @ts-ignore
      if (typeof window.CodeMirror !== 'undefined' && typeof window.CodeMirror.runMode === 'function') {
        // @ts-ignore
        window.CodeMirror.runMode($json.text(), 'application/json', $highlight[0]);
        $pre.hide();
      }
    }
  });
}

/***/ }),

/***/ "./resources/js/modules/navigation.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Navigation: function() { return /* binding */ Navigation; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/common.ts");
/* harmony import */ var _config_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/config.ts");
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _navigation_updateNavigationWidthConfig_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./resources/js/modules/navigation/updateNavigationWidthConfig.ts");
/* harmony import */ var _functions_handleRedirectAndReload_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./resources/js/modules/functions/handleRedirectAndReload.ts");
/* harmony import */ var _functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./resources/js/modules/functions/isStorageSupported.ts");







/**
 * updates the tree state in sessionStorage
 */
function treeStateUpdate() {
  // update if session storage is supported
  if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_6__["default"])('sessionStorage')) {
    var storage = window.sessionStorage;
    // try catch necessary here to detect whether
    // content to be stored exceeds storage capacity
    try {
      storage.setItem('navTreePaths', JSON.stringify(Navigation.traverseForPaths()));
      storage.setItem('server', _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'));
      storage.setItem('token', _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('token'));
    } catch (error) {
      // storage capacity exceeded & old navigation tree
      // state is no more valid, so remove it
      storage.removeItem('navTreePaths');
      storage.removeItem('server');
      storage.removeItem('token');
    }
  }
}
/**
 * updates the filter state in sessionStorage
 *
 * @param {string} filterName
 * @param {string} filterValue
 */
function filterStateUpdate(filterName, filterValue) {
  if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_6__["default"])('sessionStorage')) {
    var storage = window.sessionStorage;
    try {
      var currentFilter = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, JSON.parse(storage.getItem('navTreeSearchFilters')));
      var filter = {};
      filter[filterName] = filterValue;
      currentFilter = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(currentFilter, filter);
      storage.setItem('navTreeSearchFilters', JSON.stringify(currentFilter));
    } catch (error) {
      storage.removeItem('navTreeSearchFilters');
    }
  }
}
/**
 * restores the filter state on navigation reload
 */
function filterStateRestore() {
  if ((0,_functions_isStorageSupported_ts__WEBPACK_IMPORTED_MODULE_6__["default"])('sessionStorage') && typeof window.sessionStorage.navTreeSearchFilters !== 'undefined') {
    var searchClauses = JSON.parse(window.sessionStorage.navTreeSearchFilters);
    if (Object.keys(searchClauses).length < 1) {
      return;
    }
    // restore database filter if present and not empty
    if (searchClauses.hasOwnProperty('dbFilter') && searchClauses.dbFilter.length) {
      var $obj = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree');
      if (!$obj.data('fastFilter')) {
        $obj.data('fastFilter', new Navigation.FastFilter.Filter($obj, ''));
      }
      $obj.find('li.fast_filter.db_fast_filter input.searchClause').val(searchClauses.dbFilter).trigger('keyup');
    }
    // find all table filters present in the tree
    var $tableFilters = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree li.database').children('div.list_container').find('li.fast_filter input.searchClause');
    // restore table filters
    $tableFilters.each(function () {
      $obj = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div.list_container');
      // aPath associated with this filter
      var filterName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('input[name=aPath]').val();
      // if this table's filter has a state stored in storage
      if (searchClauses.hasOwnProperty(filterName) && searchClauses[filterName].length) {
        // clear state if item is not visible,
        // happens when table filter becomes invisible
        // as db filter has already been applied
        if (!$obj.is(':visible')) {
          Navigation.filterStateUpdate(filterName, '');
          return;
        }
        if (!$obj.data('fastFilter')) {
          $obj.data('fastFilter', new Navigation.FastFilter.Filter($obj, ''));
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val(searchClauses[filterName]).trigger('keyup');
      }
    });
  }
}
/**
 * Loads child items of a node and executes a given callback
 *
 * @param isNode
 * @param $expandElem expander
 * @param callback    callback function
 */
function loadChildNodes(isNode, $expandElem, callback) {
  var $destination = null;
  var params = null;
  if (isNode) {
    if (!$expandElem.hasClass('expander')) {
      return;
    }
    $destination = $expandElem.closest('li');
    var pos2Name = $expandElem.find('span.pos2_nav');
    var pathsNav = $expandElem.find('span.paths_nav');
    params = {
      'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
      'aPath': pathsNav.attr('data-apath'),
      'vPath': pathsNav.attr('data-vpath'),
      'pos': pathsNav.attr('data-pos'),
      'pos2_name': pos2Name.attr('data-name'),
      'pos2_value': pos2Name.attr('data-value'),
      'searchClause': '',
      'searchClause2': ''
    };
    if ($expandElem.closest('ul').hasClass('search_results')) {
      params.searchClause = Navigation.FastFilter.getSearchClause();
      params.searchClause2 = Navigation.FastFilter.getSearchClause2($expandElem);
    }
  } else {
    $destination = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content');
    params = {
      'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
      'aPath': $expandElem.attr('data-apath'),
      'vPath': $expandElem.attr('data-vpath'),
      'pos': $expandElem.attr('data-pos'),
      'pos2_name': '',
      'pos2_value': '',
      'searchClause': '',
      'searchClause2': ''
    };
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/navigation&ajax_request=1', params, function (data) {
    if (typeof data !== 'undefined' && data.success === true) {
      $destination.find('div.list_container').remove(); // FIXME: Hack, there shouldn't be a list container there
      if (isNode) {
        $destination.append(data.message);
        $expandElem.addClass('loaded');
      } else {
        $destination.html(data.message);
        $destination.children().first().css({
          border: '0px',
          margin: '0em',
          padding: '0em'
        }).slideDown('slow');
      }
      if (data.errors) {
        var $errors = jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.errors);
        if ($errors.children().length > 0) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_errors').append(data.errors);
        }
      }
      if (callback && typeof callback === 'function') {
        callback(data);
      }
    } else if (typeof data !== 'undefined' && data.redirect_flag === '1') {
      if (window.location.href.indexOf('?') === -1) {
        window.location.href += '?session_expired=1';
      } else {
        window.location.href += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator') + 'session_expired=1';
      }
      window.location.reload();
    } else {
      var $throbber = $expandElem.find('img.throbber');
      $throbber.hide();
      var $icon = $expandElem.find('img.ic_b_plus');
      $icon.show();
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
    }
  });
}
/**
 * Collapses a node in navigation tree.
 *
 * @param $expandElem expander
 */
function collapseTreeNode($expandElem) {
  var $children = $expandElem.closest('li').children('div.list_container');
  var $icon = $expandElem.find('img');
  if ($expandElem.hasClass('loaded')) {
    if ($icon.is('.ic_b_minus')) {
      $icon.removeClass('ic_b_minus').addClass('ic_b_plus');
      $children.slideUp('fast');
    }
  }
  $expandElem.trigger('blur');
  $children.promise().done(Navigation.treeStateUpdate);
}
/**
 * Traverse the navigation tree backwards to generate all the actual
 * and virtual paths, as well as the positions in the pagination at
 * various levels, if necessary.
 *
 * @return {object}
 */
function traverseForPaths() {
  var params = {
    pos: jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('div.dbselector select').val()
  };
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select').length) {
    return params;
  }
  var count = 0;
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('a.expander:visible').each(function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('img').is('.ic_b_minus') && jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('li').find('div.list_container .ic_b_minus').length === 0) {
      var pathsNav = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('span.paths_nav');
      params['n' + count + '_aPath'] = pathsNav.attr('data-apath');
      params['n' + count + '_vPath'] = pathsNav.attr('data-vpath');
      var pos2Nav = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('span.pos2_nav');
      if (pos2Nav.length === 0) {
        pos2Nav = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent().find('span.pos2_nav').last();
      }
      params['n' + count + '_pos2_name'] = pos2Nav.attr('data-name');
      params['n' + count + '_pos2_value'] = pos2Nav.attr('data-value');
      var pos3Nav = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('span.pos3_nav');
      params['n' + count + '_pos3_name'] = pos3Nav.attr('data-name');
      params['n' + count + '_pos3_value'] = pos3Nav.attr('data-value');
      count++;
    }
  });
  return params;
}
/**
 * Expands a node in navigation tree.
 *
 * @param $expandElem expander
 * @param callback    callback function
 */
function expandTreeNode($expandElem) {
  let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var $children = $expandElem.closest('li').children('div.list_container');
  var $icon = $expandElem.find('img');
  if ($expandElem.hasClass('loaded')) {
    if ($icon.is('.ic_b_plus')) {
      $icon.removeClass('ic_b_plus').addClass('ic_b_minus');
      $children.slideDown('fast');
    }
    if (callback && typeof callback === 'function') {
      callback.call();
    }
    $children.promise().done(Navigation.treeStateUpdate);
  } else {
    var $throbber = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').find('.throbber').first().clone().css({
      visibility: 'visible',
      display: 'block'
    }).on('click', false);
    $icon.hide();
    $throbber.insertBefore($icon);
    Navigation.loadChildNodes(true, $expandElem, function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        var $destination = $expandElem.closest('li');
        $icon.removeClass('ic_b_plus').addClass('ic_b_minus');
        $children = $destination.children('div.list_container');
        $children.slideDown('fast');
        if ($destination.find('ul > li').length === 1) {
          $destination.find('ul > li').find('a.expander.container').trigger('click');
        }
        if (callback && typeof callback === 'function') {
          callback.call();
        }
        Navigation.showFullName($destination);
      } else {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error, false);
      }
      $icon.show();
      $throbber.remove();
      $children.promise().done(Navigation.treeStateUpdate);
    });
  }
  $expandElem.trigger('blur');
}
/**
 * Auto-scrolls the newly chosen database
 *
 * @param {object} $element    The element to set to view
 * @param {boolean}   $forceToTop Whether to force scroll to top
 *
 */
function scrollToView($element, $forceToTop) {
  Navigation.filterStateRestore();
  var $container = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content');
  var elemTop = $element.offset().top - $container.offset().top;
  var textHeight = 20;
  var scrollPadding = 20; // extra padding from top of bottom when scrolling to view
  if (elemTop < 0 || $forceToTop) {
    $container.stop().animate({
      scrollTop: elemTop + $container.scrollTop() - scrollPadding
    });
  } else if (elemTop + textHeight > $container.height()) {
    $container.stop().animate({
      scrollTop: elemTop + textHeight - $container.height() + $container.scrollTop() + scrollPadding
    });
  }
}
/**
 * Expand the navigation and highlight the current database or table/view
 */
function showCurrent() {
  var db = _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db');
  var table = _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('table');
  var autoexpand = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').hasClass('autoexpand');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('li.selected').removeClass('selected');
  var $dbItem;
  if (db) {
    $dbItem = findLoadedItem(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('> div'), db, 'database', !table);
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select').length && jquery__WEBPACK_IMPORTED_MODULE_0___default()('option:selected', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select')).length) {
      if (!Navigation.selectCurrentDatabase()) {
        return;
      }
      // If loaded database in navigation is not same as current one
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content').find('span.loaded_db').first().text() !== jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select').val()) {
        Navigation.loadChildNodes(false, jquery__WEBPACK_IMPORTED_MODULE_0___default()('option:selected', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select')), function () {
          handleTableOrDb(table, jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content'));
          var $children = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content').children('div.list_container');
          $children.promise().done(Navigation.treeStateUpdate);
        });
      } else {
        handleTableOrDb(table, jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content'));
      }
    } else if ($dbItem) {
      fullExpand(table, $dbItem);
    }
  } else if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select').length && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select').val()) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select').val('').hide().trigger('change');
  } else if (autoexpand && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content > ul > li.database').length === 1) {
    // automatically expand the list if there is only single database
    // find the name of the database
    var dbItemName = '';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content > ul > li.database').children('a').each(function () {
      var name = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text();
      if (!dbItemName && name.trim()) {
        // if the name is not empty, it is the desired element
        dbItemName = name;
      }
    });
    $dbItem = findLoadedItem(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('> div'), dbItemName, 'database', !table);
    fullExpand(table, $dbItem);
  }
  Navigation.showFullName(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree'));
  function fullExpand(table, $dbItem) {
    var $expander = $dbItem.children('div').first().children('a.expander');
    // if not loaded or loaded but collapsed
    if (!$expander.hasClass('loaded') || $expander.find('img').is('.ic_b_plus')) {
      Navigation.expandTreeNode($expander, function () {
        handleTableOrDb(table, $dbItem);
      });
    } else {
      handleTableOrDb(table, $dbItem);
    }
  }
  function handleTableOrDb(table, $dbItem) {
    if (table) {
      loadAndHighlightTableOrView($dbItem, table);
    } else {
      var $container = $dbItem.children('div.list_container');
      var $tableContainer = $container.children('ul').children('li.tableContainer');
      if ($tableContainer.length > 0) {
        var $expander = $tableContainer.children('div').first().children('a.expander');
        $tableContainer.addClass('selected');
        Navigation.expandTreeNode($expander, function () {
          Navigation.scrollToView($dbItem, true);
        });
      } else {
        Navigation.scrollToView($dbItem, true);
      }
    }
  }
  function findLoadedItem($container, name, clazz, doSelect) {
    var ret = false;
    $container.children('ul').children('li').each(function () {
      var $li = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      // this is a navigation group, recurse
      if ($li.is('.navGroup')) {
        var $container = $li.children('div.list_container');
        var $childRet = findLoadedItem($container, name, clazz, doSelect);
        if ($childRet) {
          ret = $childRet;
          return false;
        }
      } else {
        // this is a real navigation item
        // name and class matches
        if ((clazz && $li.is('.' + clazz) || !clazz) && $li.children('a').text() === name) {
          if (doSelect) {
            $li.addClass('selected');
          }
          // traverse up and expand and parent navigation groups
          $li.parents('.navGroup').each(function () {
            var $cont = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('div.list_container');
            if (!$cont.is(':visible')) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('div').first().children('a.expander').trigger('click');
            }
          });
          ret = $li;
          return false;
        }
      }
    });
    return ret;
  }
  function loadAndHighlightTableOrView($dbItem, itemName) {
    var $container = $dbItem.children('div.list_container');
    var $expander;
    var $whichItem = isItemInContainer($container, itemName, 'li.nav_node_table, li.view');
    // If item already there in some container
    if ($whichItem) {
      // get the relevant container while may also be a subcontainer
      var $relatedContainer = $whichItem.closest('li.subContainer').length ? $whichItem.closest('li.subContainer') : $dbItem;
      $whichItem = findLoadedItem($relatedContainer.children('div.list_container'), itemName, null, true);
      // Show directly
      showTableOrView($whichItem, $relatedContainer.children('div').first().children('a.expander'));
      // else if item not there, try loading once
    } else {
      var $subContainers = $dbItem.find('.subContainer');
      // If there are subContainers i.e. tableContainer or viewContainer
      if ($subContainers.length > 0) {
        var $containers = [];
        $subContainers.each(function (index) {
          $containers[index] = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
          $expander = $containers[index].children('div').first().children('a.expander');
          if (!$expander.hasClass('loaded')) {
            loadAndShowTableOrView($expander, $containers[index], itemName);
          }
        });
        // else if no subContainers
      } else {
        $expander = $dbItem.children('div').first().children('a.expander');
        if (!$expander.hasClass('loaded')) {
          loadAndShowTableOrView($expander, $dbItem, itemName);
        }
      }
    }
  }
  function loadAndShowTableOrView($expander, $relatedContainer, itemName) {
    Navigation.loadChildNodes(true, $expander, function () {
      var $whichItem = findLoadedItem($relatedContainer.children('div.list_container'), itemName, null, true);
      if ($whichItem) {
        showTableOrView($whichItem, $expander);
      }
    });
  }
  function showTableOrView($whichItem, $expander) {
    Navigation.expandTreeNode($expander, function () {
      if ($whichItem) {
        Navigation.scrollToView($whichItem, false);
      }
    });
  }
  function isItemInContainer($container, name, clazz) {
    var $whichItem = null;
    var $items = $container.find(clazz);
    $items.each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('a').text() === name) {
        $whichItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
        return false;
      }
    });
    return $whichItem;
  }
}
/**
 * Disable navigation panel settings
 */
function disableSettings() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings_icon').addClass('hide');
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings').remove();
}
/**
 * Ensure that navigation panel settings is properly setup.
 * If not, set it up
 *
 * @param {string} selflink
 */
function ensureSettings(selflink) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings_icon').removeClass('hide');
  if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings').length) {
    var params = {
      getNaviSettings: true,
      server: _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server')
    };
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/navigation&ajax_request=1', params, function (data) {
      if (typeof data !== 'undefined' && data.success) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navi_settings_container').html(data.message);
        _config_ts__WEBPACK_IMPORTED_MODULE_2__.Config.setupRestoreField();
        _config_ts__WEBPACK_IMPORTED_MODULE_2__.Config.setupValidation();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings').find('form').attr('action', selflink);
      } else {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error);
      }
    });
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_settings').find('form').attr('action', selflink);
  }
}
/**
 * Reloads the whole navigation tree while preserving its state
 *
 * @param {Function} callback the callback function
 * @param {object} paths stored navigation paths
 */
function reload() {
  let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  let paths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var params = {
    'reload': true,
    'no_debug': true,
    'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server')
  };
  var pathsLocal = paths || Navigation.traverseForPaths();
  jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(params, pathsLocal);
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select').length) {
    params.db = _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db');
    requestNaviReload(params);
    return;
  }
  requestNaviReload(params);
  function requestNaviReload(params) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post('index.php?route=/navigation&ajax_request=1', params, function (data) {
      if (typeof data !== 'undefined' && data.success) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').html(data.message).children('div').show();
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').hasClass('synced')) {
          Navigation.selectCurrentDatabase();
          Navigation.showCurrent();
        }
        // Fire the callback, if any
        if (typeof callback === 'function') {
          callback.call();
        }
        Navigation.treeStateUpdate();
      } else {
        (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error);
      }
    });
  }
}
function selectCurrentDatabase() {
  var $naviDbSelect = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#navi_db_select');
  if (!$naviDbSelect.length) {
    return false;
  }
  if (_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db')) {
    // db selected
    $naviDbSelect.show();
  }
  $naviDbSelect.val(_common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db'));
  return $naviDbSelect.val() === _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('db');
}
/**
 * Handles any requests to change the page in a branch of a tree
 *
 * This can be called from link click or select change event handlers
 *
 * @param {object} $this A jQuery object that points to the element that
 * initiated the action of changing the page
 */
function treePagination($this) {
  var $msgbox = (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)();
  var isDbSelector = $this.closest('div.pageselector').is('.dbselector');
  var url = 'index.php?route=/navigation';
  var params = 'ajax_request=true';
  if ($this[0].tagName === 'A') {
    params += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator') + $this.getPostData();
  } else {
    // tagName === 'SELECT'
    params += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator') + $this.closest('form').serialize();
  }
  var searchClause = Navigation.FastFilter.getSearchClause();
  if (searchClause) {
    params += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator') + 'searchClause=' + encodeURIComponent(searchClause);
  }
  if (isDbSelector) {
    params += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator') + 'full=true';
  } else {
    var searchClause2 = Navigation.FastFilter.getSearchClause2($this);
    if (searchClause2) {
      params += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator') + 'searchClause2=' + encodeURIComponent(searchClause2);
    }
  }
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post(url, params, function (data) {
    if (typeof data !== 'undefined' && data.success) {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxRemoveMessage)($msgbox);
      var val;
      if (isDbSelector) {
        val = Navigation.FastFilter.getSearchClause();
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').html(data.message).children('div').show();
        if (val) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('li.fast_filter input.searchClause').val(val);
        }
      } else {
        var $parent = $this.closest('div.list_container').parent();
        val = Navigation.FastFilter.getSearchClause2($this);
        $this.closest('div.list_container').html(jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.message).children().show());
        if (val) {
          $parent.find('li.fast_filter input.searchClause').val(val);
        }
        $parent.find('span.pos2_value').first().text($parent.find('span.pos2_value').last().text());
        $parent.find('span.pos3_value').first().text($parent.find('span.pos3_value').last().text());
      }
    } else {
      (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_3__.ajaxShowMessage)(data.error);
      (0,_functions_handleRedirectAndReload_ts__WEBPACK_IMPORTED_MODULE_5__["default"])(data);
    }
    Navigation.treeStateUpdate();
  });
}
/**
 * ResizeHandler Custom object that manages the resizing of the navigation
 *
 * XXX: Must only be ever instanciated once
 * XXX: Inside event handlers the 'this' object is accessed as 'event.data.resize_handler'
 */
const ResizeHandler = function () {
  /**
   * @var {number} panelWidth Used by the collapser to know where to go
   *                      back to when uncollapsing the panel
   */
  this.panelWidth = 0;
  /**
   * @var {string} left Used to provide support for RTL languages
   */
  this.left = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('dir') === 'ltr' ? 'left' : 'right';
  /**
   * Adjusts the width of the navigation panel to the specified value
   *
   * @param {number} position Navigation width in pixels
   */
  this.setWidth = function (position) {
    var pos = position;
    if (typeof pos !== 'number') {
      pos = 240;
    }
    var $resizer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_resizer');
    var resizerWidth = $resizer.width();
    var $collapser = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_collapser');
    var windowWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').width(pos);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('margin-' + this.left, pos + 'px');
    // Issue #15127 : Adding fixed positioning to menubar
    // Issue #15570 : Panels on homescreen go underneath of floating menubar
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#floating_menubar').css('margin-' + this.left, jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').width() + jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_resizer').width()).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#server-breadcrumb')).append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenucontainer'));
    // Allow the DOM to render, then adjust the padding on the body
    setTimeout(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('padding-top', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#floating_menubar').outerHeight(true));
    }, 2);
    if (window.MutationObserver) {
      var target = document.getElementById('floating_menubar');
      if (target) {
        var observer = new MutationObserver(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('padding-top', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#floating_menubar').outerHeight(true));
        });
        observer.observe(target, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_console').css('margin-' + this.left, pos + resizerWidth + 'px');
    $resizer.css(this.left, pos + 'px');
    if (pos === 0) {
      $collapser.css(this.left, pos + resizerWidth).html(this.getSymbol(pos)).prop('title', window.Messages.strShowPanel);
    } else if (windowWidth > 768) {
      $collapser.css(this.left, pos).html(this.getSymbol(pos)).prop('title', window.Messages.strHidePanel);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_resizer').css({
        'width': '3px'
      });
    } else {
      $collapser.css(this.left, windowWidth - 22).html(this.getSymbol(100)).prop('title', window.Messages.strHidePanel);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').width(windowWidth);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('margin-' + this.left, '0px');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_resizer').css({
        'width': '0px'
      });
    }
    setTimeout(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger('resize');
    }, 4);
  };
  /**
   * Returns the horizontal position of the mouse,
   * relative to the outer side of the navigation panel
   *
   * @param {MouseEvent} event
   *
   * @return {number} Navigation width in pixels
   */
  this.getPos = function (event) {
    var pos = event.pageX;
    var windowWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
    var windowScroll = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollLeft();
    pos = pos - windowScroll;
    if (this.left !== 'left') {
      pos = windowWidth - event.pageX;
    }
    if (pos < 0) {
      pos = 0;
    } else if (pos + 100 >= windowWidth) {
      pos = windowWidth - 100;
    } else {
      this.panelWidth = 0;
    }
    return pos;
  };
  /**
   * Returns the HTML code for the arrow symbol used in the collapser
   *
   * @param {number} width The width of the panel
   *
   * @return {string}
   */
  this.getSymbol = function (width) {
    if (this.left === 'left') {
      if (width === 0) {
        return '&rarr;';
      } else {
        return '&larr;';
      }
    } else {
      if (width === 0) {
        return '&larr;';
      } else {
        return '&rarr;';
      }
    }
  };
  /**
   * Event handler for initiating a resize of the panel
   *
   * @param {object} event Event data (contains a reference to Navigation.ResizeHandler)
   */
  this.mousedown = function (event) {
    event.preventDefault();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousemove', {
      'resize_handler': event.data.resize_handler
    }, event.data.resize_handler.mousemove).on('mouseup', {
      'resize_handler': event.data.resize_handler
    }, event.data.resize_handler.mouseup);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('cursor', 'col-resize');
  };
  /**
   * Event handler for terminating a resize of the panel
   *
   * @param {object} event Event data (contains a reference to Navigation.ResizeHandler)
   */
  this.mouseup = function (event) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('cursor', '');
    (0,_navigation_updateNavigationWidthConfig_ts__WEBPACK_IMPORTED_MODULE_4__["default"])(event.data.resize_handler.getPos(event));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenu').menuResizer('resize');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off('mousemove').off('mouseup');
  };
  /**
   * Event handler for updating the panel during a resize operation
   *
   * @param {object} event Event data (contains a reference to Navigation.ResizeHandler)
   */
  this.mousemove = function (event) {
    event.preventDefault();
    if (event.data && event.data.resize_handler) {
      var pos = event.data.resize_handler.getPos(event);
      event.data.resize_handler.setWidth(pos);
    }
  };
  /**
   * Event handler for collapsing the panel
   *
   * @param {object} event Event data (contains a reference to Navigation.ResizeHandler)
   */
  this.collapse = function (event) {
    event.preventDefault();
    var panelWidth = event.data.resize_handler.panelWidth;
    var width = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation').width();
    if (width === 0 && panelWidth === 0) {
      panelWidth = 240;
    }
    (0,_navigation_updateNavigationWidthConfig_ts__WEBPACK_IMPORTED_MODULE_4__["default"])(panelWidth);
    event.data.resize_handler.setWidth(panelWidth);
    event.data.resize_handler.panelWidth = width;
  };
  /**
   * Event handler for resizing the navigation tree height on window resize
   */
  this.treeResize = function () {
    var $nav = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation');
    var $navTree = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree');
    var $navHeader = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_header');
    var $navTreeContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content');
    var height = $nav.height() - $navHeader.height();
    height = height > 50 ? height : 800; // keep min. height
    $navTree.height(height);
    if ($navTreeContent.length > 0) {
      $navTreeContent.height(height - $navTreeContent.position().top);
    } else {
      // TODO: in fast filter search response there is no #pma_navigation_tree_content, needs to be added in php
      $navTree.css({
        'overflow-y': 'auto'
      });
    }
    // Set content bottom space because of console
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('margin-bottom', jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_console').height() + 'px');
  };
  /**
   * Init handlers for the tree resizers
   */
  this.treeInit = function () {
    const isLoadedOnMobile = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width() < 768;
    // Hide the pma_navigation initially when loaded on mobile
    if (isLoadedOnMobile) {
      this.setWidth(0);
    }
    // Register the events for the resizer and the collapser
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('mousedown', '#pma_navigation_resizer', {
      'resize_handler': this
    }, this.mousedown);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#pma_navigation_collapser', {
      'resize_handler': this
    }, this.collapse);
    const navigationDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation');
    // Add the correct arrow symbol to the collapser
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_collapser').html(this.getSymbol(navigationDiv.width()));
    // Fix navigation tree height
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', this.treeResize);
    // need to call this now and then, browser might decide
    // to show/hide horizontal scrollbars depending on page content width
    setInterval(this.treeResize, 2000);
    this.treeResize();
    const initialResizeValue = Number(navigationDiv.data('config-navigation-width'));
    this.setWidth(initialResizeValue);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#topmenu').menuResizer('resize');
  };
  this.treeInit();
};
/**
 * @var {object} FastFilter Handles the functionality that allows filtering
 *                          of the items in a branch of the navigation tree
 */
const FastFilter = {
  /**
   * Construct for the asynchronous fast filter functionality
   *
   * @param {object} $this        A jQuery object pointing to the list container
   *                              which is the nearest parent of the fast filter
   * @param {string} searchClause The query string for the filter
   */
  Filter: function ($this, searchClause) {
    /**
     * @var {object} $this A jQuery object pointing to the list container
     *                     which is the nearest parent of the fast filter
     */
    this.$this = $this;
    /**
     * @var {boolean} searchClause The query string for the filter
     */
    this.searchClause = searchClause;
    /**
     * @var {object} $clone A clone of the original contents
     *                      of the navigation branch before
     *                      the fast filter was applied
     */
    this.$clone = $this.clone();
    /**
     * @var {object} xhr A reference to the ajax request that is currently running
     * @type {JQuery.jqXHR<any> | null}
     */
    this.xhr = null;
    /**
     * @var {number} timeout Used to delay the request for asynchronous search
     */
    this.timeout = null;
    var $filterInput = $this.find('li.fast_filter input.searchClause');
    if ($filterInput.length !== 0 && $filterInput.val() !== '' && $filterInput.val() !== $filterInput[0].defaultValue) {
      this.request();
    }
  },
  /**
   * Gets the query string from the database fast filter form
   *
   * @return {string}
   */
  getSearchClause: function () {
    var retval = '';
    var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('li.fast_filter.db_fast_filter input.searchClause');
    if ($input.length && $input.val() !== $input[0].defaultValue) {
      retval = $input.val();
    }
    return retval;
  },
  /**
   * Gets the query string from a second level item's fast filter form
   * The retrieval is done by traversing the navigation tree backwards
   *
   * @param $this
   *
   * @return {string}
   */
  getSearchClause2: function ($this) {
    var $filterContainer = $this.closest('div.list_container');
    var $filterInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()([]);
    if ($filterContainer.find('li.fast_filter:not(.db_fast_filter) input.searchClause').length !== 0) {
      $filterInput = $filterContainer.find('li.fast_filter:not(.db_fast_filter) input.searchClause');
    }
    var searchClause2 = '';
    if ($filterInput.length !== 0 && $filterInput.first().val() !== $filterInput[0].defaultValue) {
      searchClause2 = $filterInput.val();
    }
    return searchClause2;
  },
  /**
   * @var hash events A list of functions that are bound to DOM events
   *                  at the top of this file
   */
  events: {
    focus: function () {
      var $obj = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div.list_container');
      if (!$obj.data('fastFilter')) {
        $obj.data('fastFilter', new Navigation.FastFilter.Filter($obj, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()));
      }
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === this.defaultValue) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val('');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('select');
      }
    },
    blur: function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val(this.defaultValue);
      }
      var $obj = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div.list_container');
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() === this.defaultValue && $obj.data('fastFilter')) {
        $obj.data('fastFilter').restore();
      }
    },
    keyup: function (event) {
      var $obj = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div.list_container');
      var str = '';
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() !== this.defaultValue && jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() !== '') {
        $obj.find('div.pageselector').hide();
        str = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val();
      }
      /**
       * FIXME at the server level a value match is done while on
       * the client side it is a regex match. These two should be aligned
       */
      // regex used for filtering.
      var regex;
      try {
        regex = new RegExp(str, 'i');
      } catch (err) {
        return;
      }
      // this is the div that houses the items to be filtered by this filter.
      var outerContainer;
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('li.fast_filter').is('.db_fast_filter')) {
        outerContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree_content');
      } else {
        outerContainer = $obj;
      }
      // filters items that are directly under the div as well as grouped in
      // groups. Does not filter child items (i.e. a database search does
      // not filter tables)
      var itemFilter = function ($curr) {
        $curr.children('ul').children('li.navGroup').each(function () {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('div.list_container').each(function () {
            itemFilter(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)); // recursive
          });
        });
        $curr.children('ul').children('li').children('a').not('.container').each(function () {
          if (regex.test(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text())) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().show().removeClass('hidden');
          } else {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().hide().addClass('hidden');
          }
        });
      };
      itemFilter(outerContainer);
      // hides containers that does not have any visible children
      var containerFilter = function ($curr) {
        $curr.children('ul').children('li.navGroup').each(function () {
          var $group = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
          $group.children('div.list_container').each(function () {
            containerFilter(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)); // recursive
          });
          $group.show().removeClass('hidden');
          if ($group.children('div.list_container').children('ul').children('li').not('.hidden').length === 0) {
            $group.hide().addClass('hidden');
          }
        });
      };
      containerFilter(outerContainer);
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() !== this.defaultValue && jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val() !== '') {
        if (!$obj.data('fastFilter')) {
          $obj.data('fastFilter', new Navigation.FastFilter.Filter($obj, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()));
        } else {
          if (event.keyCode === 13) {
            $obj.data('fastFilter').update(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
          }
        }
      } else if ($obj.data('fastFilter')) {
        $obj.data('fastFilter').restore(true);
      }
      // update filter state
      var filterName;
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name') === 'searchClause2') {
        filterName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings('input[name=aPath]').val();
      } else {
        filterName = 'dbFilter';
      }
      Navigation.filterStateUpdate(filterName, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
    },
    clear: function (event) {
      event.stopPropagation();
      // Clear the input and apply the fast filter with empty input
      var filter = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('div.list_container').data('fastFilter');
      if (filter) {
        filter.restore();
      }
      var value = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prev()[0].defaultValue;
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prev().val(value).trigger('keyup');
    }
  }
};
/**
 * Handles a change in the search clause
 *
 * @param {string} searchClause The query string for the filter
 */
FastFilter.Filter.prototype.update = function (searchClause) {
  if (this.searchClause !== searchClause) {
    this.searchClause = searchClause;
    this.request();
  }
};
/**
 * After a delay of 250mS, initiates a request to retrieve search results
 * Multiple calls to this function will always abort the previous request
 */
FastFilter.Filter.prototype.request = function () {
  var self = this;
  if (self.$this.find('li.fast_filter').find('img.throbber').length === 0) {
    self.$this.find('li.fast_filter').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="throbber"></div>').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_content').find('img.throbber').clone().css({
      visibility: 'visible',
      display: 'block'
    })));
  }
  if (self.xhr) {
    self.xhr.abort();
  }
  var params = self.$this.find('> ul > li > form.fast_filter').first().serialize();
  if (self.$this.find('> ul > li > form.fast_filter').first().find('input[name=searchClause]').length === 0) {
    var $input = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').find('li.fast_filter.db_fast_filter input.searchClause');
    if ($input.length && $input.val() !== $input[0].defaultValue) {
      params += _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('arg_separator') + 'searchClause=' + encodeURIComponent($input.val());
    }
  }
  self.xhr = jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    url: 'index.php?route=/navigation&ajax_request=1&server=' + _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
    type: 'post',
    dataType: 'json',
    data: params,
    complete: function (jqXHR, status) {
      if (status !== 'abort') {
        var data = JSON.parse(jqXHR.responseText);
        self.$this.find('li.fast_filter').find('div.throbber').remove();
        if (data && data.results) {
          self.swap.apply(self, [data.message]);
        }
      }
    }
  });
};
/**
 * Replaces the contents of the navigation branch with the search results
 *
 * @param {string} list The search results
 */
FastFilter.Filter.prototype.swap = function (list) {
  this.$this.html(jquery__WEBPACK_IMPORTED_MODULE_0___default()(list).html()).children().show().end().find('li.fast_filter input.searchClause').val(this.searchClause);
  this.$this.data('fastFilter', this);
};
/**
 * Restores the navigation to the original state after the fast filter is cleared
 *
 * @param {boolean} focus Whether to also focus the input box of the fast filter
 */
FastFilter.Filter.prototype.restore = function (focus) {
  if (this.$this.children('ul').first().hasClass('search_results')) {
    this.$this.html(this.$clone.html()).children().show();
    this.$this.data('fastFilter', this);
    if (focus) {
      this.$this.find('li.fast_filter input.searchClause').trigger('focus');
    }
  }
  this.searchClause = '';
  this.$this.find('div.pageselector').show();
  this.$this.find('div.throbber').remove();
};
/**
 * Show full name when cursor hover and name not shown completely
 *
 * @param {object} $containerELem Container element
 */
function showFullName($containerELem) {
  $containerELem.find('.hover_show_full').on('mouseenter', function () {
    /** mouseenter */
    var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var thisOffset = $this.offset();
    if ($this.text() === '') {
      return;
    }
    var $parent = $this.parent();
    if ($parent.offset().left + $parent.outerWidth() < thisOffset.left + $this.outerWidth()) {
      var $fullNameLayer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#full_name_layer');
      if ($fullNameLayer.length === 0) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append('<div id="full_name_layer" class="hide"></div>');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#full_name_layer').on('mouseleave', function () {
          /** mouseleave */
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('hide').removeClass('hovering');
        }).on('mouseenter', function () {
          /** mouseenter */
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('hovering');
        });
        $fullNameLayer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#full_name_layer');
      }
      $fullNameLayer.removeClass('hide');
      $fullNameLayer.css({
        left: thisOffset.left,
        top: thisOffset.top
      });
      // @ts-ignore
      $fullNameLayer.html($this.clone());
      setTimeout(function () {
        if (!$fullNameLayer.hasClass('hovering')) {
          $fullNameLayer.trigger('mouseleave');
        }
      }, 200);
    }
  });
}
/**
 * @param {boolean} update
 */
function update(update) {
  if (update && jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pma_navigation_tree').hasClass('synced')) {
    Navigation.showCurrent();
  }
}
/**
 * Used in or for navigation panel.
 */
const Navigation = {
  treeStateUpdate: treeStateUpdate,
  filterStateUpdate: filterStateUpdate,
  filterStateRestore: filterStateRestore,
  loadChildNodes: loadChildNodes,
  collapseTreeNode: collapseTreeNode,
  traverseForPaths: traverseForPaths,
  expandTreeNode: expandTreeNode,
  scrollToView: scrollToView,
  showCurrent: showCurrent,
  disableSettings: disableSettings,
  ensureSettings: ensureSettings,
  reload: reload,
  selectCurrentDatabase: selectCurrentDatabase,
  treePagination: treePagination,
  ResizeHandler: ResizeHandler,
  FastFilter: FastFilter,
  showFullName: showFullName,
  update: update
};
// eslint-disable-next-line compat/compat
window.Navigation = Navigation;


/***/ }),

/***/ "./resources/js/modules/navigation/updateNavigationWidthConfig.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ updateNavigationWidthConfig; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/ajax-message.ts");
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./resources/js/modules/common.ts");



function updateNavigationWidthConfig(value) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    url: 'index.php?route=/navigation/update-width',
    type: 'POST',
    dataType: 'json',
    data: {
      'ajax_request': true,
      server: _common_ts__WEBPACK_IMPORTED_MODULE_2__.CommonParams.get('server'),
      value: value
    },
    success: function (data) {
      if (data.success !== true) {
        // Try to find a message to display
        if (data.error || data.message) {
          (0,_ajax_message_ts__WEBPACK_IMPORTED_MODULE_1__.ajaxShowMessage)(data.error || data.message);
        }
      }
    }
  });
}

/***/ }),

/***/ "./resources/js/modules/sql-highlight.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ highlightSql; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Definition of links to MySQL documentation.
 */
const mysqlDocKeyword = {
  /* Multi word */
  'CHARACTER SET': ['charset'],
  'SHOW AUTHORS': ['show-authors'],
  'SHOW BINARY LOGS': ['show-binary-logs'],
  'SHOW BINLOG EVENTS': ['show-binlog-events'],
  'SHOW CHARACTER SET': ['show-character-set'],
  'SHOW COLLATION': ['show-collation'],
  'SHOW COLUMNS': ['show-columns'],
  'SHOW CONTRIBUTORS': ['show-contributors'],
  'SHOW CREATE DATABASE': ['show-create-database'],
  'SHOW CREATE EVENT': ['show-create-event'],
  'SHOW CREATE FUNCTION': ['show-create-function'],
  'SHOW CREATE PROCEDURE': ['show-create-procedure'],
  'SHOW CREATE TABLE': ['show-create-table'],
  'SHOW CREATE TRIGGER': ['show-create-trigger'],
  'SHOW CREATE VIEW': ['show-create-view'],
  'SHOW DATABASES': ['show-databases'],
  'SHOW ENGINE': ['show-engine'],
  'SHOW ENGINES': ['show-engines'],
  'SHOW ERRORS': ['show-errors'],
  'SHOW EVENTS': ['show-events'],
  'SHOW FUNCTION CODE': ['show-function-code'],
  'SHOW FUNCTION STATUS': ['show-function-status'],
  'SHOW GRANTS': ['show-grants'],
  'SHOW INDEX': ['show-index'],
  'SHOW MASTER STATUS': ['show-master-status'],
  'SHOW OPEN TABLES': ['show-open-tables'],
  'SHOW PLUGINS': ['show-plugins'],
  'SHOW PRIVILEGES': ['show-privileges'],
  'SHOW PROCEDURE CODE': ['show-procedure-code'],
  'SHOW PROCEDURE STATUS': ['show-procedure-status'],
  'SHOW PROCESSLIST': ['show-processlist'],
  'SHOW PROFILE': ['show-profile'],
  'SHOW PROFILES': ['show-profiles'],
  'SHOW RELAYLOG EVENTS': ['show-relaylog-events'],
  'SHOW SLAVE HOSTS': ['show-slave-hosts'],
  'SHOW SLAVE STATUS': ['show-slave-status'],
  'SHOW STATUS': ['show-status'],
  'SHOW TABLE STATUS': ['show-table-status'],
  'SHOW TABLES': ['show-tables'],
  'SHOW TRIGGERS': ['show-triggers'],
  'SHOW VARIABLES': ['show-variables'],
  'SHOW WARNINGS': ['show-warnings'],
  'LOAD DATA INFILE': ['load-data'],
  'LOAD XML': ['load-xml'],
  'LOCK TABLES': ['lock-tables'],
  'UNLOCK TABLES': ['lock-tables'],
  'ALTER DATABASE': ['alter-database'],
  'ALTER EVENT': ['alter-event'],
  'ALTER LOGFILE GROUP': ['alter-logfile-group'],
  'ALTER FUNCTION': ['alter-function'],
  'ALTER PROCEDURE': ['alter-procedure'],
  'ALTER SERVER': ['alter-server'],
  'ALTER TABLE': ['alter-table'],
  'ALTER TABLESPACE': ['alter-tablespace'],
  'ALTER VIEW': ['alter-view'],
  'CREATE DATABASE': ['create-database'],
  'CREATE EVENT': ['create-event'],
  'CREATE FUNCTION': ['create-function'],
  'CREATE INDEX': ['create-index'],
  'CREATE LOGFILE GROUP': ['create-logfile-group'],
  'CREATE PROCEDURE': ['create-procedure'],
  'CREATE SERVER': ['create-server'],
  'CREATE TABLE': ['create-table'],
  'CREATE TABLESPACE': ['create-tablespace'],
  'CREATE TRIGGER': ['create-trigger'],
  'CREATE VIEW': ['create-view'],
  'DROP DATABASE': ['drop-database'],
  'DROP EVENT': ['drop-event'],
  'DROP FUNCTION': ['drop-function'],
  'DROP INDEX': ['drop-index'],
  'DROP LOGFILE GROUP': ['drop-logfile-group'],
  'DROP PROCEDURE': ['drop-procedure'],
  'DROP SERVER': ['drop-server'],
  'DROP TABLE': ['drop-table'],
  'DROP TABLESPACE': ['drop-tablespace'],
  'DROP TRIGGER': ['drop-trigger'],
  'DROP VIEW': ['drop-view'],
  'RENAME TABLE': ['rename-table'],
  'TRUNCATE TABLE': ['truncate-table'],
  /* Statements */
  'SELECT': ['select'],
  'SET': ['set'],
  'EXPLAIN': ['explain'],
  'DESCRIBE': ['describe'],
  'DELETE': ['delete'],
  'SHOW': ['show'],
  'UPDATE': ['update'],
  'INSERT': ['insert'],
  'REPLACE': ['replace'],
  'CALL': ['call'],
  'DO': ['do'],
  'HANDLER': ['handler'],
  'COLLATE': ['charset-collations'],
  /* Functions */
  'ABS': ['mathematical-functions', 'function_abs'],
  'ACOS': ['mathematical-functions', 'function_acos'],
  'ADDDATE': ['date-and-time-functions', 'function_adddate'],
  'ADDTIME': ['date-and-time-functions', 'function_addtime'],
  'AES_DECRYPT': ['encryption-functions', 'function_aes_decrypt'],
  'AES_ENCRYPT': ['encryption-functions', 'function_aes_encrypt'],
  'AND': ['logical-operators', 'operator_and'],
  'ASCII': ['string-functions', 'function_ascii'],
  'ASIN': ['mathematical-functions', 'function_asin'],
  'ATAN2': ['mathematical-functions', 'function_atan2'],
  'ATAN': ['mathematical-functions', 'function_atan'],
  'AVG': ['aggregate-functions', 'function_avg'],
  'BENCHMARK': ['information-functions', 'function_benchmark'],
  'BIN': ['string-functions', 'function_bin'],
  'BINARY': ['cast-functions', 'operator_binary'],
  'BIT_AND': ['aggregate-functions', 'function_bit_and'],
  'BIT_COUNT': ['bit-functions', 'function_bit_count'],
  'BIT_LENGTH': ['string-functions', 'function_bit_length'],
  'BIT_OR': ['aggregate-functions', 'function_bit_or'],
  'BIT_XOR': ['aggregate-functions', 'function_bit_xor'],
  'CASE': ['control-flow-functions', 'operator_case'],
  'CAST': ['cast-functions', 'function_cast'],
  'CEIL': ['mathematical-functions', 'function_ceil'],
  'CEILING': ['mathematical-functions', 'function_ceiling'],
  'CHAR_LENGTH': ['string-functions', 'function_char_length'],
  'CHAR': ['string-functions', 'function_char'],
  'CHARACTER_LENGTH': ['string-functions', 'function_character_length'],
  'CHARSET': ['information-functions', 'function_charset'],
  'COALESCE': ['comparison-operators', 'function_coalesce'],
  'COERCIBILITY': ['information-functions', 'function_coercibility'],
  'COLLATION': ['information-functions', 'function_collation'],
  'COMPRESS': ['encryption-functions', 'function_compress'],
  'CONCAT_WS': ['string-functions', 'function_concat_ws'],
  'CONCAT': ['string-functions', 'function_concat'],
  'CONNECTION_ID': ['information-functions', 'function_connection_id'],
  'CONV': ['mathematical-functions', 'function_conv'],
  'CONVERT_TZ': ['date-and-time-functions', 'function_convert_tz'],
  'Convert': ['cast-functions', 'function_convert'],
  'COS': ['mathematical-functions', 'function_cos'],
  'COT': ['mathematical-functions', 'function_cot'],
  'COUNT': ['aggregate-functions', 'function_count'],
  'CRC32': ['mathematical-functions', 'function_crc32'],
  'CURDATE': ['date-and-time-functions', 'function_curdate'],
  'CURRENT_DATE': ['date-and-time-functions', 'function_current_date'],
  'CURRENT_TIME': ['date-and-time-functions', 'function_current_time'],
  'CURRENT_TIMESTAMP': ['date-and-time-functions', 'function_current_timestamp'],
  'CURRENT_USER': ['information-functions', 'function_current_user'],
  'CURTIME': ['date-and-time-functions', 'function_curtime'],
  'DATABASE': ['information-functions', 'function_database'],
  'DATE_ADD': ['date-and-time-functions', 'function_date_add'],
  'DATE_FORMAT': ['date-and-time-functions', 'function_date_format'],
  'DATE_SUB': ['date-and-time-functions', 'function_date_sub'],
  'DATE': ['date-and-time-functions', 'function_date'],
  'DATEDIFF': ['date-and-time-functions', 'function_datediff'],
  'DAY': ['date-and-time-functions', 'function_day'],
  'DAYNAME': ['date-and-time-functions', 'function_dayname'],
  'DAYOFMONTH': ['date-and-time-functions', 'function_dayofmonth'],
  'DAYOFWEEK': ['date-and-time-functions', 'function_dayofweek'],
  'DAYOFYEAR': ['date-and-time-functions', 'function_dayofyear'],
  'DECLARE': ['declare', 'declare'],
  'DECODE': ['encryption-functions', 'function_decode'],
  'DEFAULT': ['miscellaneous-functions', 'function_default'],
  'DEGREES': ['mathematical-functions', 'function_degrees'],
  'DES_DECRYPT': ['encryption-functions', 'function_des_decrypt'],
  'DES_ENCRYPT': ['encryption-functions', 'function_des_encrypt'],
  'DIV': ['arithmetic-functions', 'operator_div'],
  'ELT': ['string-functions', 'function_elt'],
  'ENCODE': ['encryption-functions', 'function_encode'],
  'ENCRYPT': ['encryption-functions', 'function_encrypt'],
  'EXP': ['mathematical-functions', 'function_exp'],
  'EXPORT_SET': ['string-functions', 'function_export_set'],
  'EXTRACT': ['date-and-time-functions', 'function_extract'],
  'ExtractValue': ['xml-functions', 'function_extractvalue'],
  'FIELD': ['string-functions', 'function_field'],
  'FIND_IN_SET': ['string-functions', 'function_find_in_set'],
  'FLOOR': ['mathematical-functions', 'function_floor'],
  'FORMAT': ['string-functions', 'function_format'],
  'FOUND_ROWS': ['information-functions', 'function_found_rows'],
  'FROM_DAYS': ['date-and-time-functions', 'function_from_days'],
  'FROM_UNIXTIME': ['date-and-time-functions', 'function_from_unixtime'],
  'GET_FORMAT': ['date-and-time-functions', 'function_get_format'],
  'GET_LOCK': ['miscellaneous-functions', 'function_get_lock'],
  'GREATEST': ['comparison-operators', 'function_greatest'],
  'GROUP_CONCAT': ['aggregate-functions', 'function_group_concat'],
  'HEX': ['string-functions', 'function_hex'],
  'HOUR': ['date-and-time-functions', 'function_hour'],
  'IF': ['control-flow-functions', 'function_if'],
  'IFNULL': ['control-flow-functions', 'function_ifnull'],
  'IN': ['comparison-operators', 'function_in'],
  'INET_ATON': ['miscellaneous-functions', 'function_inet_aton'],
  'INET_NTOA': ['miscellaneous-functions', 'function_inet_ntoa'],
  'INSTR': ['string-functions', 'function_instr'],
  'INTERVAL': ['comparison-operators', 'function_interval'],
  'IS_FREE_LOCK': ['miscellaneous-functions', 'function_is_free_lock'],
  'IS_USED_LOCK': ['miscellaneous-functions', 'function_is_used_lock'],
  'IS': ['comparison-operators', 'operator_is'],
  'ISNULL': ['comparison-operators', 'function_isnull'],
  'LAST_DAY': ['date-and-time-functions', 'function_last_day'],
  'LAST_INSERT_ID': ['information-functions', 'function_last_insert_id'],
  'LCASE': ['string-functions', 'function_lcase'],
  'LEAST': ['comparison-operators', 'function_least'],
  'LEFT': ['string-functions', 'function_left'],
  'LENGTH': ['string-functions', 'function_length'],
  'LIKE': ['string-comparison-functions', 'operator_like'],
  'LN': ['mathematical-functions', 'function_ln'],
  'LOAD_FILE': ['string-functions', 'function_load_file'],
  'LOCALTIME': ['date-and-time-functions', 'function_localtime'],
  'LOCALTIMESTAMP': ['date-and-time-functions', 'function_localtimestamp'],
  'LOCATE': ['string-functions', 'function_locate'],
  'LOG10': ['mathematical-functions', 'function_log10'],
  'LOG2': ['mathematical-functions', 'function_log2'],
  'LOG': ['mathematical-functions', 'function_log'],
  'LOWER': ['string-functions', 'function_lower'],
  'LPAD': ['string-functions', 'function_lpad'],
  'LTRIM': ['string-functions', 'function_ltrim'],
  'MAKE_SET': ['string-functions', 'function_make_set'],
  'MAKEDATE': ['date-and-time-functions', 'function_makedate'],
  'MAKETIME': ['date-and-time-functions', 'function_maketime'],
  'MASTER_POS_WAIT': ['miscellaneous-functions', 'function_master_pos_wait'],
  'MATCH': ['fulltext-search', 'function_match'],
  'MAX': ['aggregate-functions', 'function_max'],
  'MD5': ['encryption-functions', 'function_md5'],
  'MICROSECOND': ['date-and-time-functions', 'function_microsecond'],
  'MID': ['string-functions', 'function_mid'],
  'MIN': ['aggregate-functions', 'function_min'],
  'MINUTE': ['date-and-time-functions', 'function_minute'],
  'MOD': ['mathematical-functions', 'function_mod'],
  'MONTH': ['date-and-time-functions', 'function_month'],
  'MONTHNAME': ['date-and-time-functions', 'function_monthname'],
  'NAME_CONST': ['miscellaneous-functions', 'function_name_const'],
  'NOT': ['logical-operators', 'operator_not'],
  'NOW': ['date-and-time-functions', 'function_now'],
  'NULLIF': ['control-flow-functions', 'function_nullif'],
  'OCT': ['mathematical-functions', 'function_oct'],
  'OCTET_LENGTH': ['string-functions', 'function_octet_length'],
  'OLD_PASSWORD': ['encryption-functions', 'function_old_password'],
  'OR': ['logical-operators', 'operator_or'],
  'ORD': ['string-functions', 'function_ord'],
  'PASSWORD': ['encryption-functions', 'function_password'],
  'PERIOD_ADD': ['date-and-time-functions', 'function_period_add'],
  'PERIOD_DIFF': ['date-and-time-functions', 'function_period_diff'],
  'PI': ['mathematical-functions', 'function_pi'],
  'POSITION': ['string-functions', 'function_position'],
  'POW': ['mathematical-functions', 'function_pow'],
  'POWER': ['mathematical-functions', 'function_power'],
  'QUARTER': ['date-and-time-functions', 'function_quarter'],
  'QUOTE': ['string-functions', 'function_quote'],
  'RADIANS': ['mathematical-functions', 'function_radians'],
  'RAND': ['mathematical-functions', 'function_rand'],
  'REGEXP': ['regexp', 'operator_regexp'],
  'RELEASE_LOCK': ['miscellaneous-functions', 'function_release_lock'],
  'REPEAT': ['string-functions', 'function_repeat'],
  'REVERSE': ['string-functions', 'function_reverse'],
  'RIGHT': ['string-functions', 'function_right'],
  'RLIKE': ['regexp', 'operator_rlike'],
  'ROUND': ['mathematical-functions', 'function_round'],
  'ROW_COUNT': ['information-functions', 'function_row_count'],
  'RPAD': ['string-functions', 'function_rpad'],
  'RTRIM': ['string-functions', 'function_rtrim'],
  'SCHEMA': ['information-functions', 'function_schema'],
  'SEC_TO_TIME': ['date-and-time-functions', 'function_sec_to_time'],
  'SECOND': ['date-and-time-functions', 'function_second'],
  'SESSION_USER': ['information-functions', 'function_session_user'],
  'SHA': ['encryption-functions', 'function_sha1'],
  'SHA1': ['encryption-functions', 'function_sha1'],
  'SHA2': ['encryption-functions', 'function_sha2'],
  'SIGN': ['mathematical-functions', 'function_sign'],
  'SIN': ['mathematical-functions', 'function_sin'],
  'SLEEP': ['miscellaneous-functions', 'function_sleep'],
  'SOUNDEX': ['string-functions', 'function_soundex'],
  'SPACE': ['string-functions', 'function_space'],
  'SQRT': ['mathematical-functions', 'function_sqrt'],
  'STD': ['aggregate-functions', 'function_std'],
  'STDDEV_POP': ['aggregate-functions', 'function_stddev_pop'],
  'STDDEV_SAMP': ['aggregate-functions', 'function_stddev_samp'],
  'STDDEV': ['aggregate-functions', 'function_stddev'],
  'STR_TO_DATE': ['date-and-time-functions', 'function_str_to_date'],
  'STRCMP': ['string-comparison-functions', 'function_strcmp'],
  'SUBDATE': ['date-and-time-functions', 'function_subdate'],
  'SUBSTR': ['string-functions', 'function_substr'],
  'SUBSTRING_INDEX': ['string-functions', 'function_substring_index'],
  'SUBSTRING': ['string-functions', 'function_substring'],
  'SUBTIME': ['date-and-time-functions', 'function_subtime'],
  'SUM': ['aggregate-functions', 'function_sum'],
  'SYSDATE': ['date-and-time-functions', 'function_sysdate'],
  'SYSTEM_USER': ['information-functions', 'function_system_user'],
  'TAN': ['mathematical-functions', 'function_tan'],
  'TIME_FORMAT': ['date-and-time-functions', 'function_time_format'],
  'TIME_TO_SEC': ['date-and-time-functions', 'function_time_to_sec'],
  'TIME': ['date-and-time-functions', 'function_time'],
  'TIMEDIFF': ['date-and-time-functions', 'function_timediff'],
  'TIMESTAMP': ['date-and-time-functions', 'function_timestamp'],
  'TIMESTAMPADD': ['date-and-time-functions', 'function_timestampadd'],
  'TIMESTAMPDIFF': ['date-and-time-functions', 'function_timestampdiff'],
  'TO_DAYS': ['date-and-time-functions', 'function_to_days'],
  'TRIM': ['string-functions', 'function_trim'],
  'TRUNCATE': ['mathematical-functions', 'function_truncate'],
  'UCASE': ['string-functions', 'function_ucase'],
  'UNCOMPRESS': ['encryption-functions', 'function_uncompress'],
  'UNCOMPRESSED_LENGTH': ['encryption-functions', 'function_uncompressed_length'],
  'UNHEX': ['string-functions', 'function_unhex'],
  'UNIX_TIMESTAMP': ['date-and-time-functions', 'function_unix_timestamp'],
  'UpdateXML': ['xml-functions', 'function_updatexml'],
  'UPPER': ['string-functions', 'function_upper'],
  'USER': ['information-functions', 'function_user'],
  'UTC_DATE': ['date-and-time-functions', 'function_utc_date'],
  'UTC_TIME': ['date-and-time-functions', 'function_utc_time'],
  'UTC_TIMESTAMP': ['date-and-time-functions', 'function_utc_timestamp'],
  'UUID_SHORT': ['miscellaneous-functions', 'function_uuid_short'],
  'UUID': ['miscellaneous-functions', 'function_uuid'],
  'VALUES': ['miscellaneous-functions', 'function_values'],
  'VAR_POP': ['aggregate-functions', 'function_var_pop'],
  'VAR_SAMP': ['aggregate-functions', 'function_var_samp'],
  'VARIANCE': ['aggregate-functions', 'function_variance'],
  'VERSION': ['information-functions', 'function_version'],
  'WEEK': ['date-and-time-functions', 'function_week'],
  'WEEKDAY': ['date-and-time-functions', 'function_weekday'],
  'WEEKOFYEAR': ['date-and-time-functions', 'function_weekofyear'],
  'XOR': ['logical-operators', 'operator_xor'],
  'YEAR': ['date-and-time-functions', 'function_year'],
  'YEARWEEK': ['date-and-time-functions', 'function_yearweek'],
  'SOUNDS_LIKE': ['string-functions', 'operator_sounds-like'],
  'IS_NOT_NULL': ['comparison-operators', 'operator_is-not-null'],
  'IS_NOT': ['comparison-operators', 'operator_is-not'],
  'IS_NULL': ['comparison-operators', 'operator_is-null'],
  'NOT_LIKE': ['string-comparison-functions', 'operator_not-like'],
  'NOT_REGEXP': ['regexp', 'operator_not-regexp'],
  'COUNT_DISTINCT': ['aggregate-functions', 'function_count-distinct'],
  'NOT_IN': ['comparison-operators', 'function_not-in']
};
const mysqlDocBuiltin = {
  'TINYINT': ['numeric-types'],
  'SMALLINT': ['numeric-types'],
  'MEDIUMINT': ['numeric-types'],
  'INT': ['numeric-types'],
  'BIGINT': ['numeric-types'],
  'DECIMAL': ['numeric-types'],
  'FLOAT': ['numeric-types'],
  'DOUBLE': ['numeric-types'],
  'REAL': ['numeric-types'],
  'BIT': ['numeric-types'],
  'BOOLEAN': ['numeric-types'],
  'SERIAL': ['numeric-types'],
  'DATE': ['date-and-time-types'],
  'DATETIME': ['date-and-time-types'],
  'TIMESTAMP': ['date-and-time-types'],
  'TIME': ['date-and-time-types'],
  'YEAR': ['date-and-time-types'],
  'CHAR': ['string-types'],
  'VARCHAR': ['string-types'],
  'TINYTEXT': ['string-types'],
  'TEXT': ['string-types'],
  'MEDIUMTEXT': ['string-types'],
  'LONGTEXT': ['string-types'],
  'BINARY': ['string-types'],
  'VARBINARY': ['string-types'],
  'TINYBLOB': ['string-types'],
  'MEDIUMBLOB': ['string-types'],
  'BLOB': ['string-types'],
  'LONGBLOB': ['string-types'],
  'ENUM': ['string-types'],
  'SET': ['string-types']
};
/**
 * Adds doc link to single highlighted SQL element
 *
 * @param $elm
 * @param params
 */
function documentationAdd($elm, params) {
  if (typeof window.mysqlDocTemplate === 'undefined') {
    return;
  }
  var url = window.sprintf(decodeURIComponent(window.mysqlDocTemplate), params[0]);
  if (params.length > 1) {
    // The # needs to be escaped to be part of the destination URL
    url += encodeURIComponent('#') + params[1];
  }
  var content = $elm.text();
  $elm.text('');
  $elm.append('<a target="mysql_doc" class="cm-sql-doc" href="' + url + '">' + content + '</a>');
}
/**
 * Generates doc links for keywords inside highlighted SQL
 *
 * @param idx
 * @param elm
 */
function documentationKeyword(idx, elm) {
  var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elm);
  /* Skip already processed ones */
  if ($elm.find('a').length > 0) {
    return;
  }
  var keyword = $elm.text().toUpperCase();
  var $next = $elm.next('.cm-keyword');
  if ($next) {
    var nextKeyword = $next.text().toUpperCase();
    var full = keyword + ' ' + nextKeyword;
    var $next2 = $next.next('.cm-keyword');
    if ($next2) {
      var next2Keyword = $next2.text().toUpperCase();
      var full2 = full + ' ' + next2Keyword;
      if (full2 in mysqlDocKeyword) {
        documentationAdd($elm, mysqlDocKeyword[full2]);
        documentationAdd($next, mysqlDocKeyword[full2]);
        documentationAdd($next2, mysqlDocKeyword[full2]);
        return;
      }
    }
    if (full in mysqlDocKeyword) {
      documentationAdd($elm, mysqlDocKeyword[full]);
      documentationAdd($next, mysqlDocKeyword[full]);
      return;
    }
  }
  if (keyword in mysqlDocKeyword) {
    documentationAdd($elm, mysqlDocKeyword[keyword]);
  }
}
/**
 * Generates doc links for builtins inside highlighted SQL
 *
 * @param idx
 * @param elm
 */
function documentationBuiltin(idx, elm) {
  var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elm);
  var builtin = $elm.text().toUpperCase();
  if (builtin in mysqlDocBuiltin) {
    documentationAdd($elm, mysqlDocBuiltin[builtin]);
  }
}
/**
 * Higlights SQL using CodeMirror.
 *
 * @param $base
 */
function highlightSql($base) {
  var $elm = $base.find('code.sql');
  $elm.each(function () {
    var $sql = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $pre = $sql.closest('pre');
    /* We only care about visible elements to avoid double processing */
    if ($sql.is(':visible')) {
      if (typeof window.CodeMirror !== 'undefined') {
        var $highlight = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="sql-highlight cm-s-default"></div>');
        $pre.append($highlight);
        // @ts-ignore
        window.CodeMirror.runMode($sql.text(), 'text/x-mysql', $highlight[0]);
        $sql.hide();
        $highlight.find('.cm-keyword').each(documentationKeyword);
        $highlight.find('.cm-builtin').each(documentationBuiltin);
      }
    }
  });
}

/***/ }),

/***/ "./resources/js/modules/themes-manager.ts":
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeColorModeToggle: function() { return /* binding */ ThemeColorModeToggle; },
/* harmony export */   ThemesManager: function() { return /* binding */ ThemesManager; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./resources/js/modules/common.ts");


/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const ThemesManager = {
  handleEvent: () => {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().get('index.php?route=/themes', {
      'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
      'ajax_request': true
    }, data => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#themesModal .modal-body').html(data.themes);
    });
  }
};
function setColorModeToHtmlTag(themeColorMode) {
  const htmlTag = document.querySelector('html');
  htmlTag.dataset.bsTheme = themeColorMode;
}
const ThemeColorModeToggle = {
  handleEvent: event => {
    const toggleSelect = event.target;
    setColorModeToHtmlTag(toggleSelect.options.item(toggleSelect.selectedIndex).value);
    const toggleForm = toggleSelect.form;
    const formData = new FormData(toggleForm);
    formData.set('ajax_request', '1');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().post(toggleForm.action, Object.fromEntries(formData.entries())).done(function (data) {
      setColorModeToHtmlTag(data.themeColorMode);
    });
  }
};

/***/ })

}]);
//# sourceMappingURL=shared.js.map