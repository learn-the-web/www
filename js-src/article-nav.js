(function () {
  'use strict';

  var
    nav = document.querySelector('.tutorial-nav'),
    headings,
    total = 0,
    i = 0,
    list,
    currentLevel = 1,
    currentItem,
    appendItem = function (list, heading) {
      var
        newLi = document.createElement('li'),
        a = document.createElement('a'),
        tag = heading.tagName.toUpperCase(),
        level = parseInt(tag.replace('H', ''), 10)
      ;

      newLi.setAttribute('class', 'tutorial-nav-level-' + level);

      a.innerHTML = heading.textContent || heading.innerText;
      a.href = '#' + heading.id;

      newLi.appendChild(a);
      list.appendChild(newLi);

      return list;
    }
  ;

  if (!nav) {
    return;
  }

  nav.removeAttribute('hidden');
  headings = document.querySelectorAll('.tutorial h2, .tutorial h3, .tutorial h4, .tutorial h5, .tutorial h6');
  total = headings.length;
  list = document.createElement('ol');
  list.classList.add('jumps', 'list-group');
  appendItem(list, document.querySelector('.tutorial h1'));

  for (i = 0; i < total; i++) {
    appendItem(list, headings[i]);
  }

  nav.appendChild(list);
}());
