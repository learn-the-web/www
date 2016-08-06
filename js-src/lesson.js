/*
 ++++++++++++++++++++++++++++++++++++++++++
   KEYBOARD CONTROLS
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  var totalSteps = parseInt(document.querySelector('.lesson__step[data-total]').dataset.total, 10);

  document.documentElement.addEventListener('keydown', function (e) {
    var
      currentHash = window.location.hash,
      currentLocation = 0
    ;

    if (!currentHash) {
      currentLocation = 0;
    } else {
      currentLocation = parseInt(currentHash.replace(/\#step\-/, ''), 10);
    }

    switch (e.keyCode) {
      case 39: // right
      // case 40: // down
      case 74: // j
        e.preventDefault();

        if (currentLocation < totalSteps) {
          currentLocation++;
          window.location.hash = 'step-' + currentLocation;
        }

        break;
      case 37: // left
      // case 38: // up
      case 75: // k
        e.preventDefault();

        if (currentLocation > 1) {
          currentLocation--;
          window.location.hash = 'step-' + currentLocation;
        }

        break;
    }
  });

}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   PRISM WINDOW RESIZE LINE HIGHLIGHT BUG
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';
  var resizeTimer;

  var onWindowResize = function () {
    var
      lineHightlights = document.querySelectorAll('pre .line-highlight'),
      i=0, total = lineHightlights.length
    ;

    for (i; i<total; i++) {
      lineHightlights[i].parentNode.removeChild(lineHightlights[i]);
    }

    Prism.highlightAll();
  };

  window.addEventListener('resize', function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(onWindowResize, 100);
  });
}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   IMAGE STEPS LABEL HIGHLIGHTING
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  var
    imageStepsForm = document.querySelector('.image-steps-form'),
    startingActiveId,
    makeActive = function (id) {
      document.querySelector('.image-steps label[for="' + id + '"]').classList.add('image-steps__label--active');
    }
  ;

  if (!imageStepsForm) return;

  startingActiveId = document.querySelector('.image-step__control:checked').id;
  makeActive(startingActiveId);

  imageStepsForm.addEventListener('change', function (e) {
    document.querySelector('.image-steps__label--active').classList.remove('image-steps__label--active');
    makeActive(e.target.id);
  });
}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   VIDEO
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  var
    iframeVideo = '<iframe class="embed__item video-embed__item video-embed__item--loading" src="https://www.youtube.com/embed/{id}?autoplay=1&color=white&theme=light&rel=0" frameborder="0" allowfullscreen></iframe>',
    iframePlaylist = '<iframe class="embed__item video-embed__item video-embed__item--loading" src="https://www.youtube.com/embed/videoseries?list={id}&autoplay=1&color=white&theme=light&rel=0" frameborder="0" allowfullscreen></iframe>',
    playBtn = document.querySelector('.play-btn')
  ;

  if (!playBtn) return;

  playBtn.addEventListener('click', function (e) {
    var
      videoId, iframe,
      videoEmbed = document.querySelector('.video-embed'),
      embedItem
    ;

    e.preventDefault();

    if (this.hasAttribute('data-video')) {
      videoId = this.getAttribute('data-video');
      iframe = iframeVideo.replace('{id}', videoId);
    } else {
      videoId = this.getAttribute('data-playlist');
      iframe = iframePlaylist.replace('{id}', videoId);
    }

    videoEmbed.classList.add('is-loading');
    videoEmbed.classList.add('embed--16by9');
    videoEmbed.classList.remove('embed--3by1', 'embed--4by1', 'embed--5by1');
    videoEmbed.innerHTML = iframe;
    embedItem = document.querySelector('.video-embed__item');
    document.querySelector('h1').classList.add('is-playing');
    this.parentNode.removeChild(this);

    videoEmbed.addEventListener('transitionend', function () {
      embedItem.classList.remove('video-embed__item--loading');
    });
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

/*
 ++++++++++++++++++++++++++++++++++++++++++
   PRISM FADE LINES
 ++++++++++++++++++++++++++++++++++++++++++
*/
(function () {
  'use strict';

  Prism.hooks.add('complete', function(env) {
    var
      pre = env.element.parentNode,
      fadeLines = []
      ;

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
    var
      pre = env.element.parentNode,
      letters = [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ'],
      lineHightlights = pre.querySelectorAll('.line-highlight'),
      i = 0, total = lineHightlights.length
      ;

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
