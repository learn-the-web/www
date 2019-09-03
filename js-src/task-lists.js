(function () {
  'use strict';

  var taskLists = document.querySelectorAll('li.task-list-item');

  if (!taskLists) return;

  [].forEach.call(taskLists, function (li, i) {
    var id = 'task-list-item-' + i;
    var text = li.innerText;
    var input = li.querySelector('input');
    var label = '<label for="' + id + '">' + text + '</label>';

    input.id = id;
    input.disabled = false;
    li.innerHTML = li.innerHTML.replace('&amp;', '&').replace(text, label);

    if (!li.parentNode.classList.contains('list-group')) {
      li.parentNode.classList.add('list-group');
    }
  });
}());
