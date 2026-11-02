import { useEffect, useMemo, useRef } from 'react';
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  formatISO,
  getDay,
  getMonth,
  nextDay,
  parseISO,
  subWeeks,
  type Day
} from 'date-fns';
import { Activity } from 'lib/github-contributions';
import { cn } from 'lib/cn';
import styles from 'styles/site.module.css';
import { Panel } from './section';

// Ported from the reference site's contribution graph; margin tightened so a
// full 53-week year fits the max-w-3xl column without clipping.
const BLOCK_SIZE = 12;
const BLOCK_MARGIN = 1;
const BLOCK_RADIUS = 0;
const FONT_SIZE = 14;
const LABEL_MARGIN = 8;

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function Contributions({ contributions }: { contributions: Activity[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const weeks = useMemo(() => groupByWeeks(contributions), [contributions]);

  // When the year doesn't fit, start at the most recent weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  if (!contributions?.length) {
    return null;
  }

  const labelHeight = FONT_SIZE + LABEL_MARGIN;
  const width = weeks.length * (BLOCK_SIZE + BLOCK_MARGIN) - BLOCK_MARGIN;
  const height = labelHeight + (BLOCK_SIZE + BLOCK_MARGIN) * 7 - BLOCK_MARGIN;
  const monthLabels = getMonthLabels(weeks);
  const total = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <Panel srOnly title="GitHub contributions">
      <figure>
        <div
          className="flex w-max max-w-full flex-col gap-4 py-4"
          style={{ fontSize: FONT_SIZE }}
          aria-label="GitHub Contributions Graph"
        >
          <div
            ref={scrollRef}
            className={cn(styles.noScrollbar, 'max-w-full overflow-x-auto overflow-y-hidden')}
            aria-hidden
          >
            <svg
              className="block overflow-visible"
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              width={width}
            >
              <g className="fill-current text-muted">
                {monthLabels.map(({ label, weekIndex }) => (
                  <text
                    key={weekIndex}
                    x={(BLOCK_SIZE + BLOCK_MARGIN) * weekIndex}
                    dominantBaseline="hanging"
                  >
                    {label}
                  </text>
                ))}
              </g>
              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) =>
                  day ? (
                    <rect
                      key={day.date}
                      className={styles.cell}
                      data-count={day.count}
                      data-date={day.date}
                      data-level={day.level}
                      height={BLOCK_SIZE}
                      width={BLOCK_SIZE}
                      rx={BLOCK_RADIUS}
                      ry={BLOCK_RADIUS}
                      x={(BLOCK_SIZE + BLOCK_MARGIN) * weekIndex}
                      y={labelHeight + (BLOCK_SIZE + BLOCK_MARGIN) * dayIndex}
                    >
                      <title>
                        {`${day.count} contribution${day.count === 1 ? '' : 's'} on ${format(parseISO(day.date), 'd MMM yyyy')}`}
                      </title>
                    </rect>
                  ) : null
                )
              )}
            </svg>
          </div>

          <figcaption className="flex flex-wrap gap-1 whitespace-nowrap text-sm text-muted sm:gap-x-4">
            <span className="text-pretty tabular-nums">
              {total.toLocaleString('en-US')} contributions,{' '}
              {format(parseISO(contributions[0].date), 'd MMM yyyy')} –{' '}
              {format(parseISO(contributions[contributions.length - 1].date), 'd MMM yyyy')}.
            </span>
            <span className="ml-auto flex items-center" style={{ gap: BLOCK_MARGIN }} aria-hidden>
              <span className="mr-1 text-muted">Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <svg key={level} height={BLOCK_SIZE} width={BLOCK_SIZE}>
                  <rect
                    className={styles.cell}
                    data-level={level}
                    height={BLOCK_SIZE}
                    width={BLOCK_SIZE}
                    rx={BLOCK_RADIUS}
                    ry={BLOCK_RADIUS}
                  />
                </svg>
              ))}
              <span className="ml-1 text-muted">More</span>
            </span>
          </figcaption>
        </div>
      </figure>
    </Panel>
  );
}

type Week = Array<Activity | undefined>;

function fillHoles(activities: Activity[]): Activity[] {
  if (activities.length === 0) return [];
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
  const calendar = new Map(activities.map((a) => [a.date, a]));
  const last = sorted[sorted.length - 1];
  return eachDayOfInterval({
    start: parseISO(sorted[0].date),
    end: parseISO(last.date)
  }).map((day) => {
    const date = formatISO(day, { representation: 'date' });
    return calendar.get(date) ?? { date, count: 0, level: 0 };
  });
}

function groupByWeeks(activities: Activity[], weekStart: Day = 0): Week[] {
  if (activities.length === 0) return [];
  const normalized = fillHoles(activities);
  const firstDate = parseISO(normalized[0].date);
  const firstCalendarDate =
    getDay(firstDate) === weekStart ? firstDate : subWeeks(nextDay(firstDate, weekStart), 1);
  const padded = [
    ...new Array<Activity | undefined>(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
      undefined
    ),
    ...normalized
  ];
  const numberOfWeeks = Math.ceil(padded.length / 7);
  return new Array(numberOfWeeks)
    .fill(undefined)
    .map((_, weekIndex) => padded.slice(weekIndex * 7, weekIndex * 7 + 7));
}

function getMonthLabels(weeks: Week[]) {
  return weeks
    .reduce<{ weekIndex: number; label: string }[]>((labels, week, weekIndex) => {
      const firstActivity = week.find((activity) => activity !== undefined);
      if (!firstActivity) return labels;
      const label = MONTH_NAMES[getMonth(parseISO(firstActivity.date))];
      const prevLabel = labels[labels.length - 1];
      if (weekIndex === 0 || !prevLabel || prevLabel.label !== label) {
        return labels.concat({ weekIndex, label });
      }
      return labels;
    }, [])
    .filter(({ weekIndex }, index, labels) => {
      const minWeeks = 3;
      if (index === 0) {
        return labels[1] ? labels[1].weekIndex - weekIndex >= minWeeks : true;
      }
      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks;
      }
      return true;
    });
}
