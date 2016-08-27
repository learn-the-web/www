(function () {
  var details = document.querySelectorAll('[data-control="details"]');

  var toggleContent = function (btn) {
    var elem = document.getElementById(btn.getAttribute('aria-controls'));

    if (elem.getAttribute('aria-hidden') == 'true') {
      elem.setAttribute('aria-hidden', false);
      elem.removeAttribute('hidden');
      btn.setAttribute('aria-selected', true);
      btn.innerHTML = '-';
      btn.setAttribute('title', 'Collapse details');
      btn.setAttribute('aria-label', 'Collapse details');
    } else {
      elem.setAttribute('aria-hidden', true);
      elem.setAttribute('hidden', true);
      btn.setAttribute('aria-selected', false);
      btn.innerHTML = '+';
      btn.setAttribute('title', 'Expand details');
      btn.setAttribute('aria-label', 'Expand details');
    }
  };

  if (!details) return;

  [].forEach.call(details, function (elem) {
    var id = elem.getAttribute('data-controls');
    var content = document.getElementById(id);
    var btn = document.createElement('button');

    content.setAttribute('hidden', true);
    content.setAttribute('aria-hidden', true);

    btn.classList.add('btn');
    btn.classList.add('btn-invisible');
    btn.classList.add('tera');
    btn.classList.add('font-os');
    btn.innerHTML = '+';
    btn.setAttribute('title', 'Expand details');
    btn.setAttribute('aria-label', 'Expand details');
    btn.setAttribute('aria-controls', id);
    btn.setAttribute('aria-selected', false);
    elem.innerHTML += '&nbsp;';
    elem.appendChild(btn);

    btn.addEventListener('click', function (e) {
      toggleContent(e.target);
    });
  });
}());
