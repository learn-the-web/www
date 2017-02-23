/*
 ++++++++++++++++++++++++++++++++++++++++++
   PRISM WINDOW RESIZE LINE HIGHLIGHT BUG
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  var resizeTimer;
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  var escapeHtml = function (string) {
    return String(string).replace(/[&<>]/g, function (s) {
      return entityMap[s];
    });
  };

  var onWindowResize = function () {
    var lineHightlights = document.querySelectorAll('pre .line-highlight');
    var codeBlocks = document.querySelectorAll('pre[class*="language-"] code');

    [].forEach.call(lineHightlights, function (lineHightlight) {
      lineHightlight.parentNode.removeChild(lineHightlight);
    });

    [].forEach.call(codeBlocks, function (tag) {
      tag.innerHTML = escapeHtml(tag.textContent);
    });

    Prism.highlightAll();
  };

  window.addEventListener('resize', function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(onWindowResize, 100);
  });
}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   PRISM FADE LINES
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  Prism.hooks.add('complete', function(env) {
    var pre = env.element.parentNode;
    var fadeLines = [];

    if (!pre.dataset.lineFade) return;

    fadeLines = pre.dataset.lineFade.split(',');

    fadeLines.forEach(function (lines) {
      var lineBits = [];

      if (!lines.trim()) return;

      lineBits = lines.split('-');
      document.querySelector('.line-highlight[data-start="' + lineBits[0] + '"]').classList.add('line-faded');
    });
  });
}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   PRISM LINE NUMBERS TO LETTERS
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  Prism.hooks.add('complete', function(env) {
    var pre = env.element.parentNode;
    var letters = [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ'];
    var lineHightlights = pre.querySelectorAll('.line-highlight');
    var i = 0, total = lineHightlights.length;

    for (i = 0; i < total; i++) {
      if (lineHightlights[i].hasAttribute('data-start')) {
        lineHightlights[i].setAttribute('data-start', letters[parseInt(lineHightlights[i].getAttribute('data-start'), 10)]);
      }
      if (lineHightlights[i].hasAttribute('data-end')) {
        lineHightlights[i].setAttribute('data-end', letters[parseInt(lineHightlights[i].getAttribute('data-end'), 10)]);
      }
    }
  });
}());


/*
 ++++++++++++++++++++++++++++++++++++++++++
   PRISM CONTINUE FROM ABOVE
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict'

  Prism.hooks.add('before-insert', function(env) {
    var pre = env.element.parentNode;

    if (env.highlightedCode.match(/⋮/)) {
      env.highlightedCode = env.highlightedCode.replace(/⋮/g, '<mark class="code-continue-from-above">⋮</mark>');
    }
  });
}());
