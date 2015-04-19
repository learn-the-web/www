(function () {
  "use strict";

  var
    jumps = document.querySelectorAll('.jumps'),
    total, i = 0,
    attachJumpEvent = function (elem) {
      elem.addEventListener('click', function () {
        document.getElementById(elem.getAttribute('href').replace('#', '')).focus();
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
