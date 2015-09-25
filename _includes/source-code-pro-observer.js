var sourceCodeProNormal, sourceCodeProBold;

if (!sessionStorage.sourceCodeProLoaded) {
  sourceCodeProNormal = new FontFaceObserver('Source Code Pro', {
    weight: 'normal'
  });

  sourceCodeProBold = new FontFaceObserver('Source Code Pro', {
    weight: 'bold'
  });

  Promise.all([
    sourceCodeProNormal.check(),
    sourceCodeProBold.check()
  ]).then(function() {
    document.documentElement.className += ' source-code-pro-loaded';
    sessionStorage.sourceCodeProLoaded = true;
  });
} else {
  document.documentElement.className += ' source-code-pro-loaded';
}
