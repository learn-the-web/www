/*
 ++++++++++++++++++++++++++++++++++++++++++
   KEYBOARD CONTROLS
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  if (!window.location.hash) {
    window.location.hash = '#slide-1';
  }

  document.documentElement.addEventListener('keydown', function (e) {
    var btn;
    e.preventDefault();

    switch (e.keyCode) {
      case 39: // right
      case 40: // down
      case 74: // j
        btn = document.querySelector('.slide:target .slide-nav-next');
        if (btn) btn.click();
        break;
      case 37: // left
      case 38: // up
      case 75: // k
        btn = document.querySelector('.slide:target .slide-nav-prev');
        if (btn) btn.click();
        break;
    }
  });

}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   INTERACTIVE SLIDE GENERATION
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  var
    slides = document.querySelectorAll('.slide-interactive'),
    i = 0, total = 0,
    htmlDecode = function (input) {
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
  ;

  if (!slides) return;

  total = slides.length;

  for (i; i < total; i++) {
    var
      iframe = slides[i].querySelector('iframe'),
      doc = null,
      html = slides[i].querySelector('code.language-html'),
      htmlHidden = slides[i].querySelector('textarea.html-hidden'),
      svg = slides[i].querySelector('code.language-xml'),
      cssHidden = slides[i].querySelector('textarea.css-hidden'),
      css = slides[i].querySelector('code.language-css'),
      jsHidden = slides[i].querySelector('textarea.js-hidden'),
      js = slides[i].querySelector('code.language-js')
    ;

    if (!iframe) continue;

    if (iframe.document) doc = iframe.document;
    if (iframe.contentDocument) doc = iframe.contentDocument;
    if (iframe.contentWindow) doc = iframe.contentWindow.document;

    doc.open();
    doc.write('<style>html { font-family: sans-serif; font-size: 300%; line-height: 1.5; } a { border-bottom: 0.1em solid rgba(68, 132, 194, .4); color: #4484c2; text-decoration: none; } a:hover { border-color: #4484c2; } input, button, select { font-size: 1rem; }</style>');

    if (htmlHidden) doc.write(htmlDecode(htmlHidden.innerHTML));
    if (cssHidden) doc.write('<style>' + htmlDecode(cssHidden.innerHTML) + '</style>');
    if (css) doc.write('<style>' + htmlDecode(css.innerHTML) + '</style>');
    if (html) doc.write(htmlDecode(html.innerHTML));
    if (svg) doc.write(htmlDecode(svg.innerHTML));
    if (jsHidden) doc.write(htmlDecode(jsHidden.innerHTML));
    if (js) doc.write('<script>' + htmlDecode(js.innerHTML) + '</script>');

    doc.close();
  }
}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   INTERACTIVE SLIDE RESIZEABILITY
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';
  var
    resizeHandles = document.querySelectorAll('.slide-resize-handle'),
    codeSlides = document.querySelectorAll('.slide-code'),
    resizableSlides = document.querySelectorAll('.slide-resizable'),
    codeSlide = null,
    resizableSlide = null
    ;

  var handleMouseMove = function (e) {
    moveColumns(e.pageX);
  };

  var enableHighlighting = function () {
    [].forEach.call(codeSlides, function (slide) {
      slide.classList.remove('slide--disable-highlighting')
    });
  };

  var disableHighlighting = function () {
    [].forEach.call(codeSlides, function (slide) {
      slide.classList.add('slide--disable-highlighting')
    });
  };

  var moveColumns = function (x) {
    if (x >= 0 && x <= document.documentElement.clientWidth) {
      codeSlide.style.width = Math.floor(x) + 'px';
      resizableSlide.style.width = Math.floor(document.documentElement.clientWidth - x) + 'px';
    }
  };

  var centreColumns = function (cs, rs) {
    cs.setAttribute('style', '');
    rs.setAttribute('style', '');
  };

  if (!resizeHandles) return;

  [].forEach.call(resizeHandles, function (handle) {
    handle.addEventListener('mousedown', function (e) {
      codeSlide = handle.parentNode.parentNode.querySelector('.slide-code');
      resizableSlide = handle.parentNode.parentNode.querySelector('.slide-resizable');
      moveColumns(e.pageX);
      disableHighlighting();
      document.addEventListener('mousemove', handleMouseMove);
    });

    handle.addEventListener('dblclick', function (e) {
      centreColumns(handle.parentNode.parentNode.querySelector('.slide-code'), handle.parentNode.parentNode.querySelector('.slide-resizable'));
    });
  });

  document.addEventListener('mouseup', function (e) {
    enableHighlighting();
    codeSlide = null;
    resizableSlide = null;
    document.removeEventListener('mousemove', handleMouseMove);
  });
}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   TASK LISTS IN SLIDES
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';
  var lists = document.querySelectorAll('.slide ul');

  if (!lists) return;

  [].forEach.call(lists, function (list, slideIndex) {
    [].forEach.call(list.children, function (li, liIndex) {
      var newLabel, newInput, id = 'slide-' + slideIndex + '-' + liIndex;

      if (li.textContent.trim().match(/^\[[ x]\]/)) {
        if (liIndex == 0) li.parentNode.classList.add('list-group');

        newLabel = document.createElement('label');
        newLabel.textContent = li.textContent.trim().replace(/^\[[ x]\]/, '');
        newLabel.setAttribute('for', id);
        newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.id = id;

        if (li.textContent.trim().match(/^\[[x]\]/)) newInput.checked = true;

        li.textContent = '';
        li.appendChild(newInput);
        li.appendChild(newLabel);
      }
    });
  });
}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   HIDE FULL SCREEN INFO BUBBLE
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  var fullScreenBubble = document.querySelector('.full-screen-shortcut');

  if (!fullScreenBubble) return;

  fullScreenBubble.addEventListener('animationend', function (e) {
    if (fullScreenBubble.parentNode) fullScreenBubble.parentNode.removeChild(fullScreenBubble);
  });
}());

/*
 ++++++++++++++++++++++++++++++++++++++++++
   COUNTDOWN TIMER
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  'use strict';

  var countdownElems = document.querySelectorAll('[data-countdown-minutes]');
  var countdowns = {};

  var convertTime = function (numSeconds) {
    var hours = Math.floor(numSeconds / 3600);
    var minutes = Math.floor((numSeconds - (hours * 3600)) / 60);
    var seconds = numSeconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) hours = '0' + hours;
    if (seconds < 10) seconds = '0' + seconds;

    if (hours == '00' || hours == '0') {
      return minutes + ':' + seconds;
    } else {
      if (minutes < 10) minutes = '0' + minutes;
      return hours + ':' + minutes + ':' + seconds;
    }
  };

  var completeDisplay = function (countdown) {
    countdown.elem.innerHTML = '0:00';
    countdown.elem.classList.add('countdown-complete');
    countdown.startBtn.innerHTML = countdown.startBtn.dataset.textStart;
    countdown.startBtn.dataset.state = 'stopped';
  };

  var updateDisplay = function (countdown, seconds) {
    countdown.elem.innerHTML = convertTime(seconds);
  };

  var resetDisplay = function (countdown) {
    updateDisplay(countdown, Math.ceil(countdown.timeMilliseconds / 1000));
    countdown.elem.classList.remove('countdown-complete');
    countdown.startBtn.innerHTML = countdown.startBtn.dataset.textStart;
    countdown.startBtn.dataset.state = 'stopped';
  };

  if (!countdownElems) return;

  [].forEach.call(countdownElems, function (elem) {
    var id = elem.id;
    var startBtn = document.querySelector('.slide-countdown-btn-start[aria-controls="' + id + '"]');
    var resetBtn = document.querySelector('.slide-countdown-btn-reset[aria-controls="' + id + '"]');

    countdowns[id] = {
      elem: elem,
      start: false,
      time: parseFloat(elem.dataset.countdownMinutes),
      timeMilliseconds: Math.ceil(parseFloat(elem.dataset.countdownMinutes) * 60 * 1000),
      interval: false,
      startBtn: startBtn,
      resetBtn: resetBtn,
    };

    updateDisplay(countdowns[id], Math.floor(countdowns[id].timeMilliseconds / 1000));

    startBtn.addEventListener('click', function (e) {
      var id = e.target.getAttribute('aria-controls');

      if (e.target.dataset.state === 'running') {
        var now = countdowns[id].timeMilliseconds - (new Date().getTime() - countdowns[id].start);

        clearInterval(countdowns[id].interval);
        e.target.innerHTML = e.target.dataset.textStart;
        e.target.dataset.state = 'paused';
        countdowns[id].timeMilliseconds = now;
        updateDisplay(countdowns[id], Math.ceil(now / 1000));
      } else {
        e.target.innerHTML = e.target.dataset.textPause;
        e.target.dataset.state = 'running';
        countdowns[id].start = new Date().getTime();

        countdowns[id].interval = setInterval(function() {
          var now = countdowns[id].timeMilliseconds - (new Date().getTime() - countdowns[id].start);

          if (now <= 0) {
            clearInterval(countdowns[id].interval);
            completeDisplay(countdowns[id]);
          } else {
            updateDisplay(countdowns[id], Math.ceil(now / 1000));
          }
        }, 100);
      }
    });

    resetBtn.addEventListener('click', function (e) {
      var id = e.target.getAttribute('aria-controls');

      e.preventDefault();
      countdowns[id].timeMilliseconds = Math.ceil(countdowns[id].time * 60 * 1000);
      clearInterval(countdowns[id].interval);
      resetDisplay(countdowns[id]);
    });
  });
}());
