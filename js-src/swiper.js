/*
 * (c) 2017 Thomas J Bradley
 * Licensed under the MIT License
 */
(function () {
  'use strict';

  var swiper = function (elem, callback) {
    var directions = {left : 'left', right : 'right'};
    var returnObject = {target : elem, direction : directions.left};
    var originalCoord = {x : 0, y : 0};
    var finalCoord = {x : 0, y : 0};
    var changeX = 0;
    var goingVertical = 0;
    var callbackTimeout;

    var touchStartHandler = function (e) {
      originalCoord.x = e.targetTouches[0].pageX;
      originalCoord.y = e.targetTouches[0].pageY;

      finalCoord.x = originalCoord.x;
      finalCoord.y = originalCoord.y;

      goingVertical = 0;
      clearTimeout(callbackTimeout);
    };

    var touchMoveHandler = function (e) {
      finalCoord.x = e.targetTouches[0].pageX;
      finalCoord.y = e.targetTouches[0].pageY;

      if (goingVertical === 0) {
        goingVertical = false;

        if (Math.abs(finalCoord.y - originalCoord.y) > Math.abs(finalCoord.x - originalCoord.x)) {
          goingVertical = true;
        }
      }

      if (goingVertical === false) {
        e.preventDefault();
      }
    };

    var touchEndHandler = function () {
      changeX = originalCoord.x - finalCoord.x;
      clearTimeout(callbackTimeout);

      if (goingVertical === false) {
        if (changeX > 0) {
          // Timeout stops the callback being fired if the tablet catches a scroll first
          // Stops weird DOM freezing of iOS, they will then be triggered after scroll
          returnObject.direction = directions.left;
          callbackTimeout = setTimeout(function () { callback(returnObject); }, 10);
        } else {
          returnObject.direction = directions.right;
          callbackTimeout = setTimeout(function () { callback(returnObject); }, 10);
        }
      }

      goingVertical = 0;
    };

    var addSwipeListener = function () {
      elem.addEventListener('touchstart', touchStartHandler, false);
      elem.addEventListener('touchmove', touchMoveHandler, false);
      elem.addEventListener('touchend', touchEndHandler, false);
    };

    var removeSwipeListener = function () {
      elem.removeEventListener('touchstart', touchStartHandler);
      elem.removeEventListener('touchmove', touchMoveHandler);
      elem.removeEventListener('touchend', touchEndHandler);
    };

    addSwipeListener();

    return {
      off : removeSwipeListener,
      noSwiping : removeSwipeListener,
      directions : directions
    };
  };

  window.swiper = swiper;

}());
