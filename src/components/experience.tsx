import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { differenceInMonths, parse } from 'date-fns';
import { EXPERIENCES, ExperienceItemData } from 'data/profile';
import { cn } from 'lib/cn';
import styles from 'styles/site.module.css';
import { Panel } from './section';
import { ThemedLogo } from './themed-logo';

const VISIBLE_COUNT = 3;

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const always = EXPERIENCES.slice(0, VISIBLE_COUNT);
  const hidden = EXPERIENCES.slice(VISIBLE_COUNT);
  const hiddenCount = hidden.length;

  return (
    <Panel id="experience" title="Work Experience">
      <div className="space-y-4 py-4">
        {always.map((experience) => (
          <ExperienceRow key={experience.id} experience={experience} />
        ))}
        {/* Extra rows animate open/closed with the Show more/less toggle. */}
        <div className={cn(styles.collapsible, showAll && styles.collapsibleOpen)}>
          <div className="space-y-4">
            {hidden.map((experience) => (
              <ExperienceRow key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </div>
      {hiddenCount > 0 && (
        <div className="pb-4">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="mx-auto flex items-center gap-1.5 text-xs text-muted transition-colors duration-150 hover:text-accent active:text-accent"
          >
            <ChevronDown
              className={cn('size-3.5 transition-transform duration-200', showAll && 'rotate-180')}
            />
            {showAll ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}
    </Panel>
  );
}

function ExperienceRow({ experience }: { experience: ExperienceItemData }) {
  const [open, setOpen] = useState(true);
  const position = experience.positions[0];
  const { start, end } = position.employmentPeriod;

  return (
    <div className="group/experience flex items-start gap-3">
      {experience.themedLogo ? (
        <ThemedLogo variant={experience.themedLogo} className="mx-1 size-6 shrink-0" />
      ) : experience.companyLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={experience.companyLogo}
          alt={`${experience.companyName} logo`}
          width="24"
          height="24"
          className={cn(
            'mx-1 shrink-0',
            experience.logoShape === 'rounded-square'
              ? 'size-6 rounded-md object-cover'
              : experience.logoShape === 'full'
                ? 'h-6 w-auto object-contain'
                : 'size-6 rounded-full object-contain'
          )}
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <span>
            {position.title} at {experience.companyName}
          </span>
          {experience.isCurrentEmployer && (
            <span
              className="relative flex size-2.5 items-center justify-center"
              aria-label="Current employer"
            >
              <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
          )}
        </h3>
        <dl className="mt-1 flex items-center gap-2 text-xs text-muted">
          <dd className="flex items-center gap-0.5 tabular-nums">
            {start && <span>{start}</span>}
            <span>—</span>
            {end ? <span>{end}</span> : <span>Present</span>}
          </dd>
          <span className="tabular-nums text-subtle">·</span>
          <dd className="tabular-nums">{formatDuration(start, end)}</dd>
        </dl>
        {position.highlights && (
          <div className={cn(styles.collapsible, open && styles.collapsibleOpen)}>
            <div>
              <ul className="mt-1 space-y-1">
                {position.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-xs leading-relaxed text-muted">
                    <span className="shrink-0 text-accent">▸</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {position.skills && (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {position.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-card px-1.5 py-0.5 text-[11px] text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
      {position.highlights && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Hide description' : 'Show description'}
          className="flex size-6 shrink-0 items-center justify-center text-accent transition-opacity duration-150 hover:opacity-80"
        >
          <ChevronDown
            className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>
      )}
    </div>
  );
}

function formatDuration(start: string, end?: string) {
  const startDate = parse(start, 'MMM yyyy', new Date());
  const endDate = end ? parse(end, 'MMM yyyy', new Date()) : new Date();
  // Inclusive month count: Feb 2021 – Feb 2022 is 1y 1m.
  const months = differenceInMonths(endDate, startDate) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return years > 0 ? `${years}y ${rest}m` : `${rest}m`;
}
