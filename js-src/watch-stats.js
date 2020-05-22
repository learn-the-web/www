(function (slug) {
  'use strict';

  var player;
  var list;
  var timeElapsed = 0;
  var watchStats = {
    playlistLength: 0,
    videos: {},
  };
  var watchInterval;

  var $watched = document.getElementById('playlist-watched');
  var $watchedInitial = document.getElementById('playlist-watched-initial');
  var $timeHours = document.getElementById('playlist-time-hours');
  var $timeMinutes = document.getElementById('playlist-time-minutes');
  var $timeSeconds = document.getElementById('playlist-time-seconds');
  var $numVideos = document.getElementById('playlist-items');

  var periodHoursToSeconds = function (hours) {
    return (parseInt(hours.replace('H', ''), 10) * 3600);
  };

  var periodMinutesToSeconds = function (minutes) {
    return (parseInt(minutes.replace('M', ''), 10) * 60);
  };

  var periodSecondsToSeconds = function (seconds) {
    return parseInt(seconds.replace('S', ''), 10);
  };

  var periodToSeconds = function (period) {
    var seconds = 0;
    var timeBits = period.match(/^PT(\d+H)?(\d+M)?(\d+S)?$/);
    if (timeBits[1]) seconds += periodHoursToSeconds(timeBits[1]);
    if (timeBits[2]) seconds += periodMinutesToSeconds(timeBits[2]);
    if (timeBits[3]) seconds += periodSecondsToSeconds(timeBits[3]);

    return seconds;
  };

  var addMissingVideosToWatchStats = function () {
    Object.keys(list).forEach(function (key) {
      if (!watchStats.videos[key]) {
        watchStats.videos[key] = {
          videoLength: list[key],
          stats: {}
        };
      };
    });
  };

  var removeOldVideosFromWatchStats = function () {
    if (!list) return;

    Object.keys(watchStats.videos).forEach(function (key) {
      if (!list[key]) delete watchStats.videos[key];
    });
  };

  var setupWatchStats = function () {
    addMissingVideosToWatchStats();
    removeOldVideosFromWatchStats();
  };

  var cacheWatchStats = function (slug) {
    localStorage.setItem(slug + '-watch-stats', JSON.stringify(watchStats));
  };

  var getCachedWatchStats = function (slug) {
    if (localStorage.getItem(slug + '-watch-stats')) {
      watchStats = JSON.parse(localStorage.getItem(slug + '-watch-stats'));
    }
  };

  var calculatePlaylistLength = function () {
    var length = 0;

    Object.keys(list).forEach(function (key) {
      length += list[key];
    });

    return length;
  };

  var fetchPlaylist = function (next) {
    var playlistItems = player.getPlaylist();

    list = {};

    if (playlistItems) {
      fetch('https://www.googleapis.com/youtube/v3/videos?part=contentDetails&maxResults=50&id=' + playlistItems.join(',') + '&key=AIzaSyDAnE5i5GKC70E4ZbPVHwEV76j_LhtZ0aY')
      .then(function(response) {
        response.json().then(function (data) {
          data.items.forEach(function (video) {
            list[video.id] = periodToSeconds(video.contentDetails.duration);
          });

          cacheList(slug);
          next();
        });
      });
    } else {
      list[getPlayingVideoId()] = Math.round(player.getDuration());
      cacheList(slug);
      next();
    }
  };

  var cacheList = function (slug) {
    sessionStorage.setItem(slug + '-youtube-playlist', JSON.stringify(list));
  };

  var getListCache = function (slug) {
    if (sessionStorage.getItem(slug + '-youtube-playlist')) list = JSON.parse(sessionStorage.getItem(slug + '-youtube-playlist'));
  };

  var renderPlaylistDetails = function () {
    var date = new Date(watchStats.playlistLength * 1000);

    $timeHours.innerHTML = date.getUTCHours();
    $timeMinutes.innerHTML = date.getUTCMinutes();
    $timeSeconds.innerHTML = ('00' + date.getSeconds()).slice(-2);

    $numVideos.innerHTML = Object.keys(list).length;
  };

  var setupPlaylistDetails = function () {
    if (!list) {
      fetchPlaylist(function () {
        watchStats.playlistLength = calculatePlaylistLength();
        setupWatchStats();
        cacheWatchStats(slug);
        renderPlaylistDetails();
      });
    } else {
      setupWatchStats();
      watchStats.playlistLength = calculatePlaylistLength();
      cacheWatchStats(slug);
      renderPlaylistDetails();
    }
  };

  var getPlayingVideoId = function () {
    var playlistItems = player.getPlaylist();

    if (playlistItems) {
      return playlistItems[player.getPlaylistIndex()];
    } else {
      return player.getVideoUrl().match(/v\=([^\&]+)/)[1];
    }
  };

  var calculatePercentVideoWatched = function (stats, videoLength) {
    return Object.keys(stats).length / parseInt((videoLength / 10), 10);
  };

  var calculatePercentPlaylistWatched = function () {
    var totalPercent = 0;

    if (!watchStats.playlistLength) return 0;

    Object.keys(watchStats.videos).forEach(function (key) {
      var vidPercent = calculatePercentVideoWatched(watchStats.videos[key].stats, watchStats.videos[key].videoLength);
      var percentOfList = watchStats.videos[key].videoLength / watchStats.playlistLength;

      totalPercent += percentOfList * vidPercent;
    });

    return totalPercent;
  };

  var renderPercentWatched = function () {
    var watched = Math.round(calculatePercentPlaylistWatched() * 100);

    $watchedInitial.innerHTML = watched;
    $watched.innerHTML = watched;
  };

  var onYouTubeIframeAPIReady = function () {
    player = new YT.Player('youtube-api', {
      events: {
        'onStateChange': onPlayerStateChange,
      }
    });

    getListCache(slug);
  };

  var onPlayerStateChange = function (e) {
    var id;

    setupPlaylistDetails();

    if (e.data == YT.PlayerState.PLAYING) {
      id = getPlayingVideoId();

      watchInterval = setInterval(function () {
        timeElapsed = player.getCurrentTime();
        watchStats.videos[id].stats[parseInt((timeElapsed / 10), 10)] = true;
        cacheWatchStats(slug);
        renderPercentWatched();
       }, 5000);
    } else {
      clearInterval(watchInterval);
    }
  };

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  if ($watched) {
    getCachedWatchStats(slug);
    renderPercentWatched();
  }
}(slug));
