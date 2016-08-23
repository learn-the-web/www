(function () {
  'use strict';

  var $viewer = document.getElementById('assignment-viewer');
  var $wrapper = document.querySelector('.assignment-content-wrapper');
  var $loader = document.getElementById('assignment-loader');
  var $title = document.querySelector('.assignment-name');
  var $icon = document.getElementById('assignment-icon');
  var $btn = document.querySelector('.assignment-btn');
  var $subHeader = document.querySelector('.assignment-sub-header');
  var $summaryDefault = document.querySelector('.assignment-summary-default');
  var $summary = document.querySelector('.assignment-summary');
  var $footer = document.querySelector('.assignment-footer');
  var $timeDefault = document.querySelector('.assignment-time-default');
  var $time = document.querySelector('.assignment-time');
  var $deliverablesDefault = document.querySelector('.assignment-deliverables-default');
  var $deliverables = document.querySelector('.assignment-deliverables');
  var $content = document.querySelector('.assignment-content');
  var $scrollDown = document.querySelector('.assignment-scroll-down');

  var labels = {
    code: document.querySelector('[property="assignment-code"]').getAttribute('content'),
    online: document.querySelector('[property="assignment-online"]').getAttribute('content'),
    show: document.querySelector('[property="assignment-show"]').getAttribute('content'),
  }

  var getButtonLabel = function (type) {
    return labels[type];
  };

  var populateTitle = function (title, icon) {
    $title.innerHTML = title;
    $icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', icon);
  };

  var enableButton = function () {
    $btn.classList.add('btn-dark');
    $btn.classList.remove('btn-subtle');
    $btn.classList.remove('assignment-btn-disabled');
  };

  var disableButton = function () {
    $btn.classList.remove('btn-dark');
    $btn.classList.add('btn-subtle');
    $btn.classList.add('assignment-btn-disabled');
  };

  var populateButton = function (type, href) {
    $btn.innerHTML = getButtonLabel(type);
    $btn.href = href + '/fork';

    if (type == 'show') disableButton();
  };

  var getReadmeUrl = function (href) {
    return href.replace('github.com', 'api.github.com/repos') + '/readme';
  };

  var getYaml = function (text) {
    return text.trim().split('---').filter(Boolean)[0];
  };

  var removeYaml = function (text) {
    return text.trim().split('---').filter(Boolean).slice(1).join('---');
  };

  var formatMarkdown = function (href, markdown) {
    markdown = markdown.replace(/<h1[^>]*>[^<]+<\/h1>/, '').trim();
    markdown = markdown.replace('<img src="', '<img class="img-flex" src="' + href + '/raw/gh-pages/');

    return markdown;
  };

  var parseReadme = function (href, text) {
    var yamlRaw, markdownRaw, yaml, markdown;

    if (text.trim().match(/^---/)) { // Has YAML
      yamlRaw = getYaml(text);
      yaml = jsyaml.load(yamlRaw);
      markdownRaw = removeYaml(text);
    } else {
      yaml = {};
      markdownRaw = text;
    }

    markdown = marked(markdownRaw, { gfm: true, tables: true, breaks: true, smartLists: true });
    yaml.html = formatMarkdown(href, markdown);

    return yaml;
  };

  var hideLoaders = function () {
    $loader.setAttribute('hidden', true);
  };

  var showLoaders = function () {
    $loader.removeAttribute('hidden');
  };

  var showSummary = function (text) {
    $summary.innerHTML = text;
    $summary.removeAttribute('hidden');
    $summaryDefault.setAttribute('hidden', true);
  };

  var hideSummary = function () {
    $subHeader.setAttribute('hidden', true);
    $summary.setAttribute('hidden', true);
    $summaryDefault.setAttribute('hidden', true);
  };

  var defaultSummary = function () {
    $summary.innerHTML = '';
    $summary.setAttribute('hidden', true);
    $summaryDefault.removeAttribute('hidden', true);
    $subHeader.removeAttribute('hidden');
  };

  var showFooter = function (time, deliverables) {
    $time.innerHTML = time;
    $time.removeAttribute('hidden');
    $timeDefault.setAttribute('hidden', true);
    $deliverables.innerHTML = deliverables;
    $deliverables.removeAttribute('hidden');
    $deliverablesDefault.setAttribute('hidden', true);
  };

  var hideFooter = function () {
    $footer.setAttribute('hidden', true);
  };

  var defaultFooter = function () {
    $footer.removeAttribute('hidden');
    $time.innerHTML = '';
    $time.setAttribute('hidden', true);
    $timeDefault.removeAttribute('hidden');
    $deliverables.innerHTML = '';
    $deliverables.setAttribute('hidden', true);
    $deliverablesDefault.removeAttribute('hidden');
  }

  var showContent = function (text) {
    $content.innerHTML = text;
  };

  var defaultContent = function () {
    $content.innerHTML = '';
  }

  var populateViewer = function (readme) {
    if (readme.summary) {
      showSummary(readme.summary);
    } else {
      hideSummary();
    }

    if (readme.time && readme.deliverables) {
      showFooter(readme.time, readme.deliverables);
    } else {
      hideFooter();
    }

    if (readme.submit) $btn.href = readme.submit;

    showContent(readme.html);
    hideLoaders();
  };

  var resetViewer = function () {
    showLoaders();
    defaultSummary();
    defaultFooter();
    defaultContent();
    populateTitle('', '');
    populateButton('', '');
    enableButton();
    $scrollDown.removeAttribute('hidden');
  };

  var closeViewer = function () {
    $viewer.classList.add('assignment-viewer-hidden');
    $viewer.setAttribute('hidden', 'true');
    $viewer.setAttribute('aria-hidden', 'true');
    resetViewer();
  };

  var openViewer = function () {
    $viewer.classList.remove('assignment-viewer-hidden');
    $viewer.removeAttribute('hidden', 'true');
    $viewer.setAttribute('aria-hidden', 'false');
  };

  var downloadContent = function (href) {
    fetch(getReadmeUrl(href), {
        headers: {
          'Accept': 'application/vnd.github.v3.raw'
        }
      }
    ).then(function(response) {
      response.text().then(function (text) {
        var readme = parseReadme(href, text);
        cacheContent(href, readme);
        populateViewer(readme);
      });
    }, function() {
      window.location(href);
    });
  };

  var cacheContent = function (href, readme) {
    sessionStorage.setItem(href, JSON.stringify(readme));
  };

  var displayCachedContent = function (href) {
    populateViewer(JSON.parse(sessionStorage.getItem(href)));
  };

  var getViewerContent = function (href) {
    if (sessionStorage.getItem(href)) {
      displayCachedContent(href);
    } else {
      downloadContent(href);
    }
  };

  [].forEach.call(document.querySelectorAll('a[data-assignment-viewer="true"]'), function (elem) {
    elem.addEventListener('click', function (e) {
      var url = elem.href;
      var submissionType = elem.getAttribute('data-assignment-submission');

      e.preventDefault();

      populateTitle(this.querySelector('.card-title').innerHTML, this.querySelector('.card-icon').getAttributeNS('http://www.w3.org/1999/xlink', 'href'));
      populateButton(submissionType, url);
      openViewer();
      getViewerContent(url);
    });
  });

  document.getElementById('assignment-close-btn').addEventListener('click', function (e) {
    closeViewer();
  });

  document.addEventListener('keydown', function (e) {
    if (e.keyCode == 27) closeViewer();
  });

  $viewer.addEventListener('click', function (e) {
    if (e.target == $viewer) closeViewer();
  });

  $wrapper.addEventListener('scroll', function (e) {
    if ($wrapper.scrollTop >= ($wrapper.scrollHeight - $wrapper.offsetHeight)) {
      $scrollDown.setAttribute('hidden', true);
    } else {
      $scrollDown.removeAttribute('hidden');
    }
  });
}());
