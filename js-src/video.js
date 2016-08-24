(function () {
  'use strict';

  var iframeVideo = '<iframe class="embed-item video-embed-item video-embed-item-loading" id="youtube-api" src="https://www.youtube.com/embed/{id}?autoplay=1&color=white&theme=light&rel=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>';
  var iframePlaylist = '<iframe class="embed-item video-embed-item video-embed-item-loading" id="youtube-api" src="https://www.youtube.com/embed/videoseries?list={id}&autoplay=1&color=white&theme=light&rel=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>';
  var playBtn = document.querySelector('.play-btn');
  var watchStats = document.getElementById('watch-stats');
  var watchStatsInitial = document.querySelector('.video-stats-default');

  if (!playBtn) {
    return;
  }

  playBtn.addEventListener('click', function (e) {
    var videoId, iframe, embedItem, youtubeapi;
    var videoEmbed = document.querySelector('.video-embed');

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
    videoEmbed.classList.remove('embed--4by1');
    videoEmbed.innerHTML = iframe;
    embedItem = document.querySelector('.video-embed-item');
    document.querySelector('h1').classList.add('is-playing');
    this.parentNode.removeChild(this);

    watchStats.removeAttribute('hidden');
    watchStatsInitial.setAttribute('hidden', true);

    youtubeapi = document.createElement('script');
    youtubeapi.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(youtubeapi);

    videoEmbed.addEventListener('transitionend', function () {
      embedItem.classList.remove('video-embed-item-loading');
    });
  });

}());
