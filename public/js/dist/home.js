"use strict";
(self["webpackChunkphpmyadmin"] = self["webpackChunkphpmyadmin"] || []).push([[18],{

/***/ 1:
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ 49:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ajax_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _modules_git_info_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);
/* harmony import */ var _modules_themes_manager_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51);



_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_0__.AJAX.registerTeardown('home.js', () => {
  const themesModal = document.getElementById('themesModal');
  if (themesModal) {
    themesModal.removeEventListener('show.bs.modal', _modules_themes_manager_ts__WEBPACK_IMPORTED_MODULE_2__.ThemesManager.handleEvent);
  }
});
_modules_ajax_ts__WEBPACK_IMPORTED_MODULE_0__.AJAX.registerOnload('home.js', () => {
  const themesModal = document.getElementById('themesModal');
  if (themesModal) {
    themesModal.addEventListener('show.bs.modal', _modules_themes_manager_ts__WEBPACK_IMPORTED_MODULE_2__.ThemesManager.handleEvent);
  }
  (0,_modules_git_info_ts__WEBPACK_IMPORTED_MODULE_1__.showGitVersion)();
});

/***/ }),

/***/ 50:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showGitVersion: function() { return /* binding */ showGitVersion; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _functions_escape_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);



const GitInfo = {
  /**
   * Version string to integer conversion.
   * @param {string} str
   * @return {number | false}
   */
  parseVersionString: str => {
    if (typeof str !== 'string') {
      return false;
    }
    let add = 0;
    // Parse possible alpha/beta/rc/
    const state = str.split('-');
    if (state.length >= 2) {
      if (state[1].startsWith('rc')) {
        add = -20 - parseInt(state[1].substring(2), 10);
      } else if (state[1].startsWith('beta')) {
        add = -40 - parseInt(state[1].substring(4), 10);
      } else if (state[1].startsWith('alpha')) {
        add = -60 - parseInt(state[1].substring(5), 10);
      } else if (state[1].startsWith('dev')) {
        /* We don't handle dev, it's git snapshot */
        add = 0;
      }
    }
    // Parse version
    const x = str.split('.');
    // Use 0 for non existing parts
    const maj = parseInt(x[0], 10) || 0;
    const min = parseInt(x[1], 10) || 0;
    const pat = parseInt(x[2], 10) || 0;
    const hotfix = parseInt(x[3], 10) || 0;
    return maj * 100000000 + min * 1000000 + pat * 10000 + hotfix * 100 + add;
  },
  /**
   * Indicates current available version on main page.
   * @param {object} data
   */
  currentVersion: data => {
    if (data && data.version && data.date) {
      const current = GitInfo.parseVersionString(jquery__WEBPACK_IMPORTED_MODULE_0___default()('span.version').text());
      const latest = GitInfo.parseVersionString(data.version);
      if (current === false || latest === false) {
        return;
      }
      const url = 'index.php?route=/url&url=https://www.phpmyadmin.net/files/' + (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_2__.escapeHtml)(encodeURIComponent(data.version)) + '/';
      let versionInformationMessage = document.createElement('span');
      versionInformationMessage.className = 'latest';
      const versionInformationMessageLink = document.createElement('a');
      versionInformationMessageLink.href = url;
      versionInformationMessageLink.className = 'disableAjax';
      versionInformationMessageLink.target = '_blank';
      versionInformationMessageLink.rel = 'noopener noreferrer';
      const versionInformationMessageLinkText = document.createTextNode(data.version);
      versionInformationMessageLink.appendChild(versionInformationMessageLinkText);
      const prefixMessage = document.createTextNode(window.Messages.strLatestAvailable + ' ');
      versionInformationMessage.appendChild(prefixMessage);
      versionInformationMessage.appendChild(versionInformationMessageLink);
      if (latest > current) {
        const message = window.sprintf(window.Messages.strNewerVersion, (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_2__.escapeHtml)(data.version), (0,_functions_escape_ts__WEBPACK_IMPORTED_MODULE_2__.escapeHtml)(data.date));
        let htmlClass = 'alert alert-primary';
        if (Math.floor(latest / 10000) === Math.floor(current / 10000)) {
          /* Security update */
          htmlClass = 'alert alert-danger';
        }
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#newer_version_notice').remove();
        const mainContainerDiv = document.createElement('div');
        mainContainerDiv.id = 'newer_version_notice';
        mainContainerDiv.className = htmlClass;
        const mainContainerDivLink = document.createElement('a');
        mainContainerDivLink.href = url;
        mainContainerDivLink.className = 'disableAjax';
        mainContainerDivLink.target = '_blank';
        mainContainerDivLink.rel = 'noopener noreferrer';
        const mainContainerDivLinkText = document.createTextNode(message);
        mainContainerDivLink.appendChild(mainContainerDivLinkText);
        mainContainerDiv.appendChild(mainContainerDivLink);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#maincontainer').append(jquery__WEBPACK_IMPORTED_MODULE_0___default()(mainContainerDiv));
      }
      let upToDateMessage = null;
      if (latest === current) {
        upToDateMessage = document.createTextNode(' (' + window.Messages.strUpToDate + ')');
      }
      /* Remove extra whitespace */
      const versionInfo = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#li_pma_version').contents().get(2);
      if (typeof versionInfo !== 'undefined') {
        versionInfo.textContent = versionInfo.textContent.trim();
      }
      const $liPmaVersion = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#li_pma_version');
      $liPmaVersion.find('span.latest').remove();
      if (upToDateMessage !== null) {
        $liPmaVersion.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()(upToDateMessage));
      } else {
        $liPmaVersion.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()(versionInformationMessage));
      }
    }
  },
  /**
   * Loads Git revision data from ajax for index.php
   */
  displayGitRevision: () => {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#is_git_revision').remove();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#li_pma_version_git').remove();
    jquery__WEBPACK_IMPORTED_MODULE_0___default().get('index.php?route=/git-revision', {
      'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server'),
      'ajax_request': true,
      'no_debug': true
    }).done(function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(data.message).insertAfter('#li_pma_version');
      }
    }).fail(function () {
      const gitHashInfoLi = '<li id="li_pma_version_git" class="list-group-item">' + window.Messages.errorLoadingGitInformation + '</li>';
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(gitHashInfoLi).insertAfter('#li_pma_version');
    });
  },
  /**
   * Load version information asynchronously.
   */
  loadVersion: () => {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('li.jsversioncheck').length === 0) {
      return;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      dataType: 'json',
      url: 'index.php?route=/version-check',
      method: 'POST',
      data: {
        'server': _common_ts__WEBPACK_IMPORTED_MODULE_1__.CommonParams.get('server')
      },
      success: GitInfo.currentVersion
    });
  }
};
function showGitVersion() {
  GitInfo.loadVersion();
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#is_git_revision').length === 0) {
    return;
  }
  setTimeout(GitInfo.displayGitRevision, 10);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [38], function() { return __webpack_exec__(49); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=home.js.map