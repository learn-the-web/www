(function () {
  'use strict';

  function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  document.documentElement.addEventListener('keydown', function (e) {
    if (e.keyCode == 70 && e.altKey && e.ctrlKey) {
      launchIntoFullscreen(document.documentElement);
    }
  });

}());
