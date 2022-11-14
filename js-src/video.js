(function () {
  "use strict";

  const iframeVideo =
    '<iframe class="embed-item video-embed-item video-embed-item-loading" src="https://videos.learntheweb.courses/playlists/{playlist}/embed.html#{id}" frameborder="0" allowfullscreen></iframe>';
  const iframePlaylist =
    '<iframe class="embed-item video-embed-item video-embed-item-loading" src="https://videos.learntheweb.courses/playlists/{id}/embed.html" frameborder="0" allowfullscreen></iframe>';
  const playBtn = document.querySelector(".play-btn");

  if (!playBtn) {
    return;
  }

  playBtn.addEventListener("click", function (e) {
    const videoEmbed = document.querySelector(".video-embed");
    let videoId, iframe, embedItem;
    e.preventDefault();
    if (this.hasAttribute("data-video")) {
      videoId = this.getAttribute("data-video");
      playlistId = this.getAttribute("data-playlist");
      iframe = iframeVideo
        .replace("{playlist}", playlistId)
        .replace("{id}", videoId);
    } else {
      videoId = this.getAttribute("data-playlist");
      iframe = iframePlaylist.replace("{id}", videoId);
    }
    videoEmbed.classList.add("is-loading");
    videoEmbed.classList.add("embed--16by9");
    videoEmbed.classList.remove("embed--4by1");
    videoEmbed.innerHTML = iframe;
    embedItem = document.querySelector(".video-embed-item");
    document.querySelector("h1").classList.add("is-playing");
    this.parentNode.removeChild(this);
    videoEmbed.addEventListener("transitionend", function () {
      embedItem.classList.remove("video-embed-item-loading");
    });
  });
})();
