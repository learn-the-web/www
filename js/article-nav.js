(function () {
  var
    nav = document.querySelector('.tutorial-nav'),
    headings,
    total = 0,
    i = 0,
    list,
    currentLevel = 1,
    currentItem,
    appendItem = function (li, heading) {
      var
        newLi = document.createElement('li'),
        a = document.createElement('a')
      ;

      a.innerHTML = heading.innerHTML;
      a.href = '#' + heading.id;
      newLi.appendChild(a);

      li.appendChild(newLi);

      return newLi;
    }
  ;

  if (!nav) {
    return;
  }

  headings = document.querySelectorAll('.tutorial h2, .tutorial h3, .tutorial h4, .tutorial h5, .tutorial h6');
  total = headings.length;
  list = document.createElement('ol');
  currentItem = appendItem(list, document.querySelector('.tutorial h1'));

  for (i = 0; i < total; i++) {
    var
      tag = headings[i].tagName.toUpperCase(),
      level = parseInt(tag.replace('H', ''), 10),
      tmp
    ;

    if (level === currentLevel) {
      currentItem = appendItem(currentItem.parentNode, headings[i]);
    }

    if (level > currentLevel) {
      tmp = document.createElement('ol');
      currentItem.appendChild(tmp);
      currentItem = appendItem(tmp, headings[i]);
    }

    if (level < currentLevel) {
      currentItem = appendItem(currentItem.parentNode.parentNode, headings[i]);
    }

    currentLevel = level;
  }

  nav.appendChild(list);
}());
