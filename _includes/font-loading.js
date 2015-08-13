// loadCSS('http://fonts.googleapis.com/css?family=Alegreya+Sans:400,400italic,700|Source+Code+Pro:400,700');

var
  alegreya= new FontFaceObserver('Alegreya Sans', {
    weight: 400
  }),
  alegreyaItalic = new FontFaceObserver('Alegreya Sans', {
    weight: 500,
    style: 'italic'
  }),
  alegreyaBold = new FontFaceObserver('Alegreya Sans', {
    weight: 700
  }),
  sourceCode = new FontFaceObserver('Source Code Pro', {
    weight: 400
  }),
  sourceCodeBold = new FontFaceObserver('Source Code Pro', {
    weight: 700
  })
;

if (!cookie('fonts-loaded')) {
  Promise.all([
    alegreya.check(),
    alegreyaItalic.check(),
    alegreyaBold.check(),
    sourceCode.check(),
    sourceCodeBold.check()
  ]).then(function() {
    document.documentElement.className += " fonts-loaded";
    cookie('fonts-loaded', 'all-the-fonts', 7);
  });
} else {
  document.documentElement.className += " fonts-loaded";
}
