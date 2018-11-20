(function () {
  'use strict';

  var weekListTimes = document.querySelectorAll('.week-times');

  // https://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
  var getDateOfISOWeek = function (w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;

    if (dow <= 4) {
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }

    return ISOweekStart;
  };

  var formatDate = function (date) {
    var formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Toronto',
      hour12: true,
      month: 'short',
      day: 'numeric',
    });

    return formatter.format(date);
  };

  if (!weekListTimes) return;

  [].forEach.call(weekListTimes, function (time) {
    var datetime = time.getAttribute('datetime').trim();
    var weekStart = getDateOfISOWeek(datetime.substr(6), datetime.substr(0, 4));
    var weekEnd = new Date(weekStart.getTime()).setDate(weekStart.getDate() + 4);

    time.removeAttribute('hidden');
    time.removeAttribute('aria-hidden');
    time.innerHTML = formatDate(weekStart) + ' – ' + formatDate(weekEnd);
  });
}());
