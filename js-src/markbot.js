(function () {
  'use strict';

  var markbotBtnMac = document.getElementById('markbot-btn-mac');
  var markbotBtnWin = document.getElementById('markbot-btn-win');
  var isWin = (navigator.appVersion.indexOf('Win') != -1) ? true : false;

  if (!markbotBtnMac && !markbotBtnWin) return;

  if (isWin) {
    markbotBtnMac.setAttribute('hidden', true);
    markbotBtnWin.removeAttribute('hidden');
  } else {
    markbotBtnMac.removeAttribute('hidden');
    markbotBtnWin.setAttribute('hidden', true);
  }
}());
