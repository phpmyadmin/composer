"use strict";

var GitInfo = {
  /**
   * Version string to integer conversion.
   * @param {string} str
   * @return {number | false}
   */
  parseVersionString: function parseVersionString(str) {
    if (typeof str !== 'string') {
      return false;
    }

    var add = 0; // Parse possible alpha/beta/rc/

    var state = str.split('-');

    if (state.length >= 2) {
      if (state[1].substr(0, 2) === 'rc') {
        add = -20 - parseInt(state[1].substr(2), 10);
      } else if (state[1].substr(0, 4) === 'beta') {
        add = -40 - parseInt(state[1].substr(4), 10);
      } else if (state[1].substr(0, 5) === 'alpha') {
        add = -60 - parseInt(state[1].substr(5), 10);
      } else if (state[1].substr(0, 3) === 'dev') {
        /* We don't handle dev, it's git snapshot */
        add = 0;
      }
    } // Parse version


    var x = str.split('.'); // Use 0 for non existing parts

    var maj = parseInt(x[0], 10) || 0;
    var min = parseInt(x[1], 10) || 0;
    var pat = parseInt(x[2], 10) || 0;
    var hotfix = parseInt(x[3], 10) || 0;
    return maj * 100000000 + min * 1000000 + pat * 10000 + hotfix * 100 + add;
  },

  /**
   * Indicates current available version on main page.
   * @param {object} data
   */
  currentVersion: function currentVersion(data) {
    if (data && data.version && data.date) {
      var current = GitInfo.parseVersionString($('span.version').text());
      var latest = GitInfo.parseVersionString(data.version);
      var url = 'https://www.phpmyadmin.net/files/' + Functions.escapeHtml(encodeURIComponent(data.version)) + '/';
      var versionInformationMessage = document.createElement('span');
      versionInformationMessage.className = 'latest';
      var versionInformationMessageLink = document.createElement('a');
      versionInformationMessageLink.href = url;
      versionInformationMessageLink.className = 'disableAjax';
      var versionInformationMessageLinkText = document.createTextNode(data.version);
      versionInformationMessageLink.appendChild(versionInformationMessageLinkText);
      var prefixMessage = document.createTextNode(Messages.strLatestAvailable + ' ');
      versionInformationMessage.appendChild(prefixMessage);
      versionInformationMessage.appendChild(versionInformationMessageLink);

      if (latest > current) {
        var message = Functions.sprintf(Messages.strNewerVersion, Functions.escapeHtml(data.version), Functions.escapeHtml(data.date));
        var htmlClass = 'alert alert-primary';

        if (Math.floor(latest / 10000) === Math.floor(current / 10000)) {
          /* Security update */
          htmlClass = 'alert alert-danger';
        }

        $('#newer_version_notice').remove();
        var mainContainerDiv = document.createElement('div');
        mainContainerDiv.id = 'newer_version_notice';
        mainContainerDiv.className = htmlClass;
        var mainContainerDivLink = document.createElement('a');
        mainContainerDivLink.href = url;
        mainContainerDivLink.className = 'disableAjax';
        var mainContainerDivLinkText = document.createTextNode(message);
        mainContainerDivLink.appendChild(mainContainerDivLinkText);
        mainContainerDiv.appendChild(mainContainerDivLink);
        $('#maincontainer').append($(mainContainerDiv));
      }

      if (latest === current) {
        versionInformationMessage = document.createTextNode(' (' + Messages.strUpToDate + ')');
      }
      /* Remove extra whitespace */


      var versionInfo = $('#li_pma_version').contents().get(2);

      if (typeof versionInfo !== 'undefined') {
        versionInfo.textContent = versionInfo.textContent.trim();
      }

      var $liPmaVersion = $('#li_pma_version');
      $liPmaVersion.find('span.latest').remove();
      $liPmaVersion.append($(versionInformationMessage));
    }
  },

  /**
   * Loads Git revision data from ajax for index.php
   */
  displayGitRevision: function displayGitRevision() {
    $('#is_git_revision').remove();
    $('#li_pma_version_git').remove();
    $.get('index.php?route=/git-revision', {
      'server': CommonParams.get('server'),
      'ajax_request': true,
      'no_debug': true
    }, function (data) {
      if (typeof data !== 'undefined' && data.success === true) {
        $(data.message).insertAfter('#li_pma_version');
      }
    });
  }
};
AJAX.registerTeardown('home.js', function () {
  $('#themesModal').off('show.bs.modal');
});
AJAX.registerOnload('home.js', function () {
  $('#themesModal').on('show.bs.modal', function () {
    $.get('index.php?route=/themes', function (data) {
      $('#themesModal .modal-body').html(data.themes);
    });
  });
  /**
   * Load version information asynchronously.
   */

  if ($('li.jsversioncheck').length > 0) {
    $.ajax({
      dataType: 'json',
      url: 'index.php?route=/version-check',
      method: 'POST',
      data: {
        'server': CommonParams.get('server')
      },
      success: GitInfo.currentVersion
    });
  }

  if ($('#is_git_revision').length > 0) {
    setTimeout(GitInfo.displayGitRevision, 10);
  }
});