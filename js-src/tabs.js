(function () {
  var tablist = document.querySelector('[role="tablist"]');
  var tabs = document.querySelectorAll('[role="tab"]');

  if (!tablist || !tabs) return;

  tablist.removeAttribute('hidden');
  tablist.removeAttribute('aria-hidden');

  [].forEach.call(tabs, function (elem) {
    elem.addEventListener('click', function (e) {
      var id = e.target.getAttribute('aria-controls');
      var oldTab = document.querySelector('[role="tab"][aria-selected="true"]');
      var oldTabPanel = document.querySelector('[role="tabpanel"]:not([hidden])');
      var newTabPanel = document.getElementById(id);

      e.preventDefault();

      oldTab.classList.remove('bold');
      oldTab.removeAttribute('aria-selected');
      oldTab.nextElementSibling.setAttribute('hidden', true);
      oldTabPanel.setAttribute('hidden', true);
      oldTabPanel.setAttribute('aria-hidden', true);

      e.target.classList.add('bold');
      e.target.setAttribute('aria-selected', true);
      e.target.nextElementSibling.removeAttribute('hidden');
      newTabPanel.removeAttribute('hidden');
      newTabPanel.removeAttribute('aria-hidden');
    });
  });

  window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace(/\#/, '');
    var tab = document.querySelector('[aria-controls="' + hash + '"]');

    if (tab) {
      tab.click();
      document.getElementById(hash).focus();
      document.getElementById(hash).scrollIntoView(true);
    }
  });
}());
