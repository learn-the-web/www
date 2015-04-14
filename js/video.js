(function () {
  var
    iframe = '<iframe class="embed__item video-embed__item video-embed__item--loading" src="https://www.youtube.com/embed/videoseries?list={id}&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    playBtn = document.querySelector('.play-btn')
  ;

  if (!playBtn) {
    return;
  }

  playBtn.addEventListener('click', function (e) {
    var
      playlist = this.getAttribute('data-playlist'),
      videoEmbed = document.querySelector('.video-embed'),
      embedItem
    ;

    e.preventDefault();

    videoEmbed.classList.add('is-loading');
    videoEmbed.classList.add('embed--16by9');
    videoEmbed.classList.remove('embed--3by1');
    videoEmbed.innerHTML = iframe.replace('{id}', playlist);
    embedItem = document.querySelector('.video-embed__item');
    document.querySelector('h1').classList.add('is-playing');
    this.parentNode.removeChild(this);

    videoEmbed.addEventListener('transitionend', function () {
      embedItem.classList.remove('video-embed__item--loading');
    });
  });

}());
