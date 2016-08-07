(function () {
  'use strict';

  var embed = '<div class="embed embed-16by9"><iframe class="embed-item video-embed-item video-embed-item-loading" src="https://www.youtube.com/embed/{id}?autoplay=1&color=white&theme=light&rel=0" frameborder="0" allowfullscreen></iframe></div>'
  var video = document.querySelector('[data-video-id]');

  if (!video) return;

  video.addEventListener('click', function (e) {
    e.preventDefault();
    video.innerHTML = embed.replace(/\{id\}/, video.getAttribute('data-video-id'));
    video.setAttribute('data-state', 'playing');
  });

}());
