(function () {
  var
    headings,
    total = 0,
    i = 0,
    prependSectionLink = function (heading) {
      var a = '<a class="heading-link" href="{id}">§</a>';

      a = a.replace('{id}', '#' + heading.id);
      heading.innerHTML = a + heading.innerHTML;
    }
  ;

  headings = document.querySelectorAll('.tutorial h2, .tutorial h3, .tutorial h4, .tutorial h5, .tutorial h6');
  total = headings.length;

  for (i = 0; i < total; i++) {
    prependSectionLink(headings[i]);
  }
}());
