(function () {
  'use strict';

  var
    items = [],
    topics = document.querySelectorAll('.topics > li'),
    totalTopics = topics.length, i = 0,
    input, form,
    displayResults = function (val) {
      items.forEach(function (item, index) {
        if (val) {
          if (item.tags && FuzzyMatch.contains(item.tags, val)) {
            item.elem.hidden = false;
          } else {
            item.elem.hidden = true;
          }
        } else {
          item.elem.hidden = false;
        }
      });
    }
  ;

  if (!topics.length) {
    return;
  }

  input = document.getElementById('search'),
  form = document.querySelector('form')
  form.hidden = false;

  for (i = 0; i < totalTopics; i++) {
    items.push({
      tags: topics[i].getAttribute('data-tags'),
      elem: topics[i]
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    return false;
  });

  input.addEventListener('keyup', function (e) {
    displayResults(input.value);
  });

  input.addEventListener('blur', function (e) {
    displayResults(input.value);
  });
}());
