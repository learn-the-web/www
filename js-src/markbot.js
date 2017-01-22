(function () {
  'use strict';

  var markbotBtnIcon = document.getElementById('markbot-btn-icon');
  var markbotBtnMac = document.getElementById('markbot-btn-mac');
  var markbotBtnWin = document.getElementById('markbot-btn-win');
  var isWin = (navigator.appVersion.indexOf('Win') != -1) ? true : false;

  if (!markbotBtnMac && !markbotBtnWin && !markbotIconBtn) return;

  if (isWin) {
    markbotBtnMac.setAttribute('hidden', true);
    markbotBtnWin.removeAttribute('hidden');
    markbotBtnIcon.href = markbotBtnWin.querySelector('a').href;
  } else {
    markbotBtnMac.removeAttribute('hidden');
    markbotBtnWin.setAttribute('hidden', true);
    markbotBtnIcon.href = markbotBtnMac.querySelector('a').href;
  }
}());
