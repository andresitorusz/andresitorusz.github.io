import { useState } from 'react';
import { ChevronDown, Infinity } from 'lucide-react';
import { differenceInMonths, parse } from 'date-fns';
import { EXPERIENCES, ExperienceItemData } from 'data/profile';
import { cn } from 'lib/cn';
import { Panel } from './section';

const VISIBLE_COUNT = 3;

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? EXPERIENCES : EXPERIENCES.slice(0, VISIBLE_COUNT);
  const hiddenCount = EXPERIENCES.length - VISIBLE_COUNT;

  return (
    <Panel id="experience" title="Experience">
      <div className="space-y-4 py-4">
        {visible.map((experience) => (
          <ExperienceRow key={experience.id} experience={experience} />
        ))}
      </div>
      {hiddenCount > 0 && (
        <div className="pb-4">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="mx-auto flex items-center gap-1.5 text-xs text-muted transition-colors duration-150 hover:text-accent"
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
  const position = experience.positions[0];
  const { start, end } = position.employmentPeriod;

  return (
    <div className="group/experience flex items-start gap-3">
      {experience.companyLogo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={experience.companyLogo}
          alt={`${experience.companyName} logo`}
          width="24"
          height="24"
          className={cn(
            'mx-1 size-6 shrink-0',
            experience.logoShape === 'rounded-square'
              ? 'rounded-md object-cover'
              : 'rounded-full object-contain'
          )}
        />
      )}
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
        <dl className="mt-0.5 flex items-center gap-2 text-xs text-muted">
          <dd className="flex items-center gap-0.5 tabular-nums">
            {start && <span>{start}</span>}
            <span>—</span>
            {end ? (
              <span>{end}</span>
            ) : (
              <Infinity className="size-3.5 translate-y-px" aria-label="Present" />
            )}
          </dd>
          <span className="tabular-nums text-subtle">·</span>
          <dd className="tabular-nums">{formatDuration(start, end)}</dd>
        </dl>
        {position.skills && (
          <ul className="flex flex-wrap gap-1.5 pt-2">
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
    </div>
  );
}

function formatDuration(start: string, end?: string) {
  const startDate = parse(start, 'MMM yyyy', new Date());
  const endDate = end ? parse(end, 'MMM yyyy', new Date()) : new Date();
  const months = Math.max(0, differenceInMonths(endDate, startDate));
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return years > 0 ? `${years}y ${rest}m` : `${rest}m`;
}
