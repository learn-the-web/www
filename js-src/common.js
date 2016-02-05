(function () {
  'use strict';

  var
    jumps = document.querySelectorAll('.jumps'),
    total, i = 0,
    attachJumpEvent = function (elem) {
      elem.addEventListener('click', function () {
        var theFocus = document.getElementById(elem.getAttribute('href').replace('#', ''));

        if (!theFocus.tagName.match(/H\d/)) {
          if (theFocus.tagName !== 'INPUT') {
            theFocus = theFocus.querySelector('h1, h2, h3, h4, h5, h6');
          }
        }

        setTimeout(function () {
          theFocus.focus();
        }, 10);
      });
    }
  ;

  if (!jumps) {
    return;
  }

  total = jumps.length;

  for (i = 0; i < total; i++) {
    var internalAs, totalAs, j;

    if (jumps[i].tagName === 'A') {
      attachJumpEvent(jumps[i]);
    } else {
      internalAs = jumps[i].querySelectorAll('a');
      totalAs = internalAs.length;

      for (j = 0; j < totalAs; j++) {
        attachJumpEvent(internalAs[j]);
      }
    }
  }
}());

(function () {
  'use strict';

  var
    navCheck = document.querySelector('.nav-check'),
    navList,
    toggleNavCheck = function () {
      navCheck.checked = !navCheck.checked;
    }
  ;

  if (!navCheck) {
    return;
  }

  navList = document.querySelector('.nav-check ~ ol');

  if (!navList) {
    return;
  }

  navCheck.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 13: // return
        toggleNavCheck();
        break;
      case 27: // esc
        navCheck.checked = false;
        navCheck.focus();
        break;
      case 40: // down
        e.preventDefault();
        navCheck.checked = true;
        document.querySelector('.nav-check ~ ol > li:first-child a').focus();
        break;
      case 38: // up
        e.preventDefault();
        navCheck.checked = true;
        document.querySelector('.nav-check ~ ol > li:last-child a').focus();
        break;
    }
  });

  navList.addEventListener('click', function () {
    navCheck.checked = false;
  });

  navList.addEventListener('keydown', function (e) {
    var focusedItem;

    switch (e.keyCode) {
      case 27: // esc
        navCheck.checked = false;
        navCheck.focus();
        break;
      case 40: // down
        e.preventDefault();
        focusedItem = document.querySelector('.nav-check ~ ol > li a:focus');

        if (focusedItem.parentNode.nextElementSibling) {
          focusedItem.parentNode.nextElementSibling.children[0].focus();
        } else {
          document.querySelector('.nav-check ~ ol > li:first-child a').focus();
        }
        break;
      case 38: // up
        e.preventDefault();
        focusedItem = document.querySelector('.nav-check ~ ol > li a:focus');

        if (focusedItem.parentNode.previousElementSibling) {
          focusedItem.parentNode.previousElementSibling.children[0].focus();
        } else {
          document.querySelector('.nav-check ~ ol > li:last-child a').focus();
        }
        break;
    }
  });
}());
