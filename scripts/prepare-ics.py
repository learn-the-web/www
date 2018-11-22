import pendulum

ics_files = (
  '_site/courses/web-dev-1/due-dates-010.ics',
  '_site/courses/web-dev-1/due-dates-020.ics',
  '_site/courses/web-dev-1/due-dates-030.ics',
  '_site/courses/web-dev-1/due-dates-040.ics',

  '_site/courses/web-dev-2/due-dates-010.ics',
  '_site/courses/web-dev-2/due-dates-020.ics',
  '_site/courses/web-dev-2/due-dates-030.ics',
  '_site/courses/web-dev-2/due-dates-040.ics',

  '_site/courses/web-dev-3/due-dates-010.ics',
  '_site/courses/web-dev-3/due-dates-020.ics',
  '_site/courses/web-dev-3/due-dates-030.ics',

  '_site/courses/web-dev-4/due-dates-010.ics',
  '_site/courses/web-dev-4/due-dates-020.ics',
  '_site/courses/web-dev-4/due-dates-030.ics',

  '_site/courses/web-dev-5/due-dates-010.ics',
  '_site/courses/web-dev-5/due-dates-020.ics',

  '_site/courses/web-dev-6/due-dates-010.ics',
  '_site/courses/web-dev-6/due-dates-020.ics',
)

def fix_line_dt(line):
    for pref in ('DTSTART', 'DTEND'):
        dt_prefix = f'{pref};TZID=America/Toronto:'
        if dt_prefix in line:
            dt = line.replace(f'{pref};TZID=America/Toronto:', '').strip()
            if dt:
                dtstart = pendulum.parse(dt, tz='America/Toronto')
                line = dt_prefix + dtstart.format('YYYYMMDD[T]HHmmss')
    return line

for ics_file in ics_files:
    lines = []
    with open(ics_file, mode='r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line:
                lines.append(fix_line_dt(line))
    with open(ics_file, mode='w', encoding='utf-8') as file:
        file.write('\n'.join(lines) + '\n')
