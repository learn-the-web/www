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

    switch (e.keyCode) {
      case 39: // right
      case 40: // down
      case 74: // j
        btn = document.querySelector('.slide:target .slide-nav__next');
        if (btn) btn.click();
        break;
      case 37: // left
      case 38: // up
      case 75: // k
        btn = document.querySelector('.slide:target .slide-nav__prev');
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
      doc = iframe.document,
      html = slides[i].querySelector('code.language-html'),
      svg = slides[i].querySelector('code.language-xml'),
      cssHidden = slides[i].querySelector('textarea.css-hidden'),
      css = slides[i].querySelector('code.language-css'),
      js = slides[i].querySelector('code.language-js')
    ;

    if (iframe.contentDocument) doc = iframe.contentDocument;
    if (iframe.contentWindow) doc = iframe.contentWindow.document;

    doc.open();
    doc.write('<style>html { font-family: sans-serif; font-size: 300%; line-height: 1.5; } a { border-bottom: 0.1em solid rgba(68, 132, 194, .4); color: #4484c2; text-decoration: none; } a:hover { border-color: #4484c2; }</style>');

    if (cssHidden) doc.write('<style>' + htmlDecode(cssHidden.innerHTML) + '</style>');
    if (css) doc.write('<style>' + htmlDecode(css.innerHTML) + '</style>');
    if (html) doc.write(htmlDecode(html.innerHTML));
    if (svg) doc.write(htmlDecode(svg.innerHTML));
    if (js) doc.write('<script>' + htmlDecode(js.innerHTML) + '</script>');

    doc.close();
  }
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
