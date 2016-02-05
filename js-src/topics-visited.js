(function () {
  'use strict';

  var
    links = document.querySelectorAll('.topics a'),
    i = 0, t = links.length,
    simplifyPath = function (path) {
      return path.replace('/topics/', '').replace('/', '');
    },
    isLocal = function (link) {
      return (link.host === window.location.host);
    },
    isVisited = function (link) {
      var p = simplifyPath(link.pathname);

      return !!(localStorage.getItem('visited-' + p));
    }
  ;

  for (i; i<t; i++) {
    if (isLocal(links[i]) && isVisited(links[i])) {
      links[i].setAttribute('data-visited', true);
    }
  }
}());
