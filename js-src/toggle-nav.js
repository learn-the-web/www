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
