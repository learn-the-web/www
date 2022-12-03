/*
 ++++++++++++++++++++++++++++++++++++++++++
   KEYBOARD CONTROLS
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  "use strict";

  var stepJumpElems = document.querySelectorAll("[data-step-jump]");
  var stepJumpIds = [];
  var totalSteps = 0;
  var currentJumpLocation = -1;

  stepJumpElems.forEach(function (elem) {
    stepJumpIds.push(elem.id);
  });

  totalSteps = stepJumpIds.length - 1;

  document.documentElement.addEventListener("keydown", function (e) {
    if (window.location.hash)
      currentJumpLocation = stepJumpIds.indexOf(
        window.location.hash.replace(/#/, "")
      );

    switch (e.keyCode) {
      case 39: // right
      case 74: // j
        e.preventDefault();

        if (currentJumpLocation < totalSteps) {
          currentJumpLocation++;
          window.location.hash = stepJumpIds[currentJumpLocation];
          stepJumpElems[currentJumpLocation].focus();
        }

        break;
      case 37: // left
      case 75: // k
        e.preventDefault();

        if (currentJumpLocation > 0) {
          currentJumpLocation--;
          window.location.hash = stepJumpIds[currentJumpLocation];
          stepJumpElems[currentJumpLocation].focus();
        }

        break;
    }
  });
})();

/*
 ++++++++++++++++++++++++++++++++++++++++++
   IMAGE STEPS LABEL HIGHLIGHTING
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  "use strict";

  var imageStepsForms = document.querySelectorAll(".image-steps-form");
  var startingActiveId;
  var makeActive = function (id) {
    document
      .querySelector('.image-steps label[for="' + id + '"]')
      .classList.add("image-steps-label-active");
  };

  if (!imageStepsForms) return;

  [].forEach.call(
    document.querySelectorAll(".image-step-control:checked"),
    function (elem) {
      makeActive(elem.id);
    }
  );

  [].forEach.call(imageStepsForms, function (elem) {
    elem.addEventListener("change", function (e) {
      var stepId = e.currentTarget.dataset.imageSteps;
      document
        .querySelector(
          '[data-image-steps-controls="' +
            stepId +
            '"] label.image-steps-label-active'
        )
        .classList.remove("image-steps-label-active");
      makeActive(e.target.id);
    });
  });
})();

/*
 ++++++++++++++++++++++++++++++++++++++++++
   VIDEO
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  "use strict";

  var iframeVideo =
    '<iframe class="embed-item video-embed-item video-embed-item-loading" src="https://videos.learntheweb.courses/playlists/{playlist}/embed.html#{id}" frameborder="0" allowfullscreen></iframe>';
  var iframePlaylist =
    '<iframe class="embed-item video-embed-item video-embed-item-loading" src="https://videos.learntheweb.courses/playlists/{id}/embed.html" frameborder="0" allowfullscreen></iframe>';
  var playBtn = document.querySelector(".play-btn");

  if (!playBtn) {
    return;
  }

  playBtn.addEventListener("click", function (e) {
    var videoEmbed = document.querySelector(".video-embed");
    var videoId, playlistId, iframe, embedItem;
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
    videoEmbed.classList.remove("embed--3by1", "embed--4by1", "embed--5by1");
    videoEmbed.innerHTML = iframe;
    embedItem = document.querySelector(".video-embed-item");
    document.querySelector("h1").classList.add("is-playing");
    this.parentNode.removeChild(this);
    videoEmbed.addEventListener("transitionend", function () {
      embedItem.classList.remove("video-embed-item-loading");
    });
  });
})();

/*
 ++++++++++++++++++++++++++++++++++++++++++
   TASK LISTS IN BODY TEXT
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  "use strict";
  var lists = document.querySelectorAll(".lesson-body-text ul");

  if (!lists) return;

  [].forEach.call(lists, function (list, textIndex) {
    [].forEach.call(list.children, function (li, liIndex) {
      var newLabel,
        newInput,
        id = "text-" + textIndex + "-" + liIndex;

      if (li.textContent.trim().match(/^\[[ x]\]/)) {
        if (liIndex == 0) {
          li.parentNode.classList.add("list-group");
          li.parentNode.classList.add("cheat-list");
        }

        newLabel = document.createElement("label");
        newLabel.textContent = li.textContent.trim().replace(/^\[[ x]\]/, "");
        newLabel.setAttribute("for", id);
        newLabel.classList.add("check-label");
        newInput = document.createElement("input");
        newInput.type = "checkbox";
        newInput.id = id;
        newInput.classList.add("check-box");
        newInput.classList.add("visually-hidden");

        if (li.textContent.trim().match(/^\[[x]\]/)) newInput.checked = true;

        li.textContent = "";
        li.classList.add("check-list-details");
        li.appendChild(newInput);
        li.appendChild(newLabel);
      }
    });
  });
})();

/*
 ++++++++++++++++++++++++++++++++++++++++++
   IMAGE STEP SWIPING
 ++++++++++++++++++++++++++++++++++++++++++
*/

(function () {
  "use strict";

  var imageSteps = document.querySelectorAll(".image-step");

  if (!imageSteps) return;

  [].forEach.call(imageSteps, function (elem) {
    swiper(elem, function (opts) {
      var btnToClick;

      if (opts.direction == "right") {
        btnToClick = opts.target.querySelector(".image-step-prev");
        btnToClick.click();
      } else {
        btnToClick = opts.target.querySelector(".image-step-next");
        btnToClick.click();
      }
    });
  });
})();
