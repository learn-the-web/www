(function () {
  "use strict";

  var
    iframeVideo = '<iframe class="embed__item video-embed__item video-embed__item--loading" src="https://www.youtube.com/embed/{id}&autoplay=1&color=white&theme=light" frameborder="0" allowfullscreen></iframe>',
    iframePlaylist = '<iframe class="embed__item video-embed__item video-embed__item--loading" src="https://www.youtube.com/embed/videoseries?list={id}&autoplay=1&color=white&theme=light" frameborder="0" allowfullscreen></iframe>',
    playBtn = document.querySelector('.play-btn')
  ;

  if (!playBtn) {
    return;
  }

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
    videoEmbed.classList.remove('embed--3by1');
    videoEmbed.innerHTML = iframe;
    embedItem = document.querySelector('.video-embed__item');
    document.querySelector('h1').classList.add('is-playing');
    this.parentNode.removeChild(this);

    videoEmbed.addEventListener('transitionend', function () {
      embedItem.classList.remove('video-embed__item--loading');
    });
  });

}());
