var alegreyaNormal, alegreyaItalic, alegreyaBold;

if (!sessionStorage.alegreyaLoaded) {
  alegreyaNormal = new FontFaceObserver('Alegreya Sans', {
    weight: 'normal'
  });

  alegreyaItalic = new FontFaceObserver('Alegreya Sans', {
    style: 'italic'
  });

  alegreyaBold = new FontFaceObserver('Alegreya Sans', {
    weight: 'bold'
  });

  Promise.all([
    alegreyaNormal.check(),
    alegreyaItalic.check(),
    alegreyaBold.check()
  ]).then(function() {
    document.documentElement.className += ' alegreya-loaded';
    sessionStorage.alegreyaLoaded = true;
  });
} else {
  document.documentElement.className += ' alegreya-loaded';
}
