(function () {
  var details = document.querySelectorAll('[data-control="details"]');

  var toggleContent = function (btn) {
    var elem = document.getElementById(btn.getAttribute('aria-controls'));

    if (elem.getAttribute('aria-hidden') == 'true') {
      elem.setAttribute('aria-hidden', false);
      elem.removeAttribute('hidden');
      btn.setAttribute('aria-selected', true);
      btn.querySelector('.btn').innerHTML = '-';
      btn.querySelector('.btn').setAttribute('title', 'Collapse details');
      btn.querySelector('.btn').setAttribute('aria-label', 'Collapse details');
    } else {
      elem.setAttribute('aria-hidden', true);
      elem.setAttribute('hidden', true);
      btn.setAttribute('aria-selected', false);
      btn.querySelector('.btn').innerHTML = '+';
      btn.querySelector('.btn').setAttribute('title', 'Expand details');
      btn.querySelector('.btn').setAttribute('aria-label', 'Expand details');
    }
  };

  if (!details) return;

  [].forEach.call(details, function (elem) {
    var id = elem.getAttribute('data-controls');
    var content = document.getElementById(id);
    var btn = document.createElement('span');

    content.setAttribute('hidden', true);
    content.setAttribute('aria-hidden', true);

    btn.classList.add('btn');
    btn.classList.add('btn-invisible');
    btn.classList.add('tera');
    btn.classList.add('font-os');
    btn.classList.add('no-print');
    btn.innerHTML = '+';
    btn.setAttribute('title', 'Expand details');
    btn.setAttribute('aria-label', 'Expand details');
    elem.setAttribute('aria-controls', id);
    elem.setAttribute('aria-selected', false);
    elem.innerHTML += '&nbsp;';
    elem.appendChild(btn);
    elem.style.cursor = 'pointer';
    elem.setAttribute('role', 'button');

    elem.addEventListener('click', function (e) {
      toggleContent(e.target);
    });

    elem.addEventListener('keypress', function (e) {
      switch (e.keyCode) {
        case 32:
        case 13:
          e.preventDefault();
          toggleContent(e.target);
      }
    });
  });
}());
