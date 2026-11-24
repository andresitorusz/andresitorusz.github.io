import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { differenceInMonths, parse } from 'date-fns';
import { EXPERIENCES, ExperienceItemData } from 'data/profile';
import { cn } from 'lib/cn';
import styles from 'styles/site.module.css';
import { Panel, ShowMoreButton } from './section';
import { ThemedLogo } from './themed-logo';

const VISIBLE_COUNT = 3;

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const always = EXPERIENCES.slice(0, VISIBLE_COUNT);
  const hidden = EXPERIENCES.slice(VISIBLE_COUNT);

  return (
    <Panel id="experience" title="Work Experience">
      <div className="py-4">
        <div className="space-y-4">
          {always.map((experience) => (
            <ExperienceRow key={experience.id} experience={experience} />
          ))}
        </div>
        {/* Extra rows animate open/closed with the Show more/less toggle. */}
        <div className={cn(styles.collapsible, showAll && styles.collapsibleOpen)}>
          <div className="space-y-4 pt-4">
            {hidden.map((experience) => (
              <ExperienceRow key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </div>
      {hidden.length > 0 && (
        <ShowMoreButton expanded={showAll} onToggle={() => setShowAll((value) => !value)} />
      )}
    </Panel>
  );
}

function ExperienceRow({ experience }: { experience: ExperienceItemData }) {
  // Multi-position companies get the header + per-role blocks layout;
  // single-position companies keep the merged one-line layout.
  if (experience.positions.length > 1) {
    return <MultiPositionExperience experience={experience} />;
  }
  return <SinglePositionExperience experience={experience} />;
}

function PositionMeta({
  position,
  experience
}: {
  position: ExperienceItemData['positions'][number];
  experience?: ExperienceItemData;
}) {
  const { start, end } = position.employmentPeriod;
  const companyPart = experience?.companyLocation
    ? `${experience.companyLocation}${experience.companyLocationType ? ` (${experience.companyLocationType})` : ''}`
    : undefined;
  const leadingParts = [companyPart, position.location, position.locationType].filter(Boolean);
  const trailingParts = [position.employmentType].filter(Boolean);

  return (
    <dl className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted">
      {leadingParts.map((part, index) => (
        <dd key={part} className="flex items-center gap-2">
          {index > 0 && <span className="tabular-nums text-subtle">·</span>}
          <span>{part}</span>
        </dd>
      ))}
      {leadingParts.length > 0 && <span className="tabular-nums text-subtle">·</span>}
      <dd className="flex items-center gap-0.5 tabular-nums">
        {start && <span>{start}</span>}
        <span>—</span>
        {end ? <span>{end}</span> : <span>Present</span>}
      </dd>
      <span className="tabular-nums text-subtle">·</span>
      <dd className="tabular-nums">{formatDuration(start, end)}</dd>
      {trailingParts.map((part) => (
        <dd key={part} className="flex items-center gap-2">
          <span className="tabular-nums text-subtle">·</span>
          <span>{part}</span>
        </dd>
      ))}
    </dl>
  );
}

function SinglePositionExperience({ experience }: { experience: ExperienceItemData }) {
  const [open, setOpen] = useState(true);
  const position = experience.positions[0];

  return (
    <div className="flex items-start gap-3">
      <ExperienceLogo experience={experience} />
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-2 text-sm font-medium">
          <span>
            {position.title} at {experience.companyName}
          </span>
          {experience.isCurrentEmployer && <CurrentDot />}
        </h3>
        <PositionMeta position={position} experience={experience} />
        {position.context && (
          <p className="mt-1 text-xs leading-phi text-muted">{position.context}</p>
        )}
        {position.highlights && position.highlights.length > 0 && (
          <div className={cn(styles.collapsible, open && styles.collapsibleOpen)}>
            <div>
              <ul className="mt-1 space-y-1">
                {position.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-xs leading-phi text-muted">
                    <span className="shrink-0 text-accent">▸</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {position.stacks && (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {position.stacks.map((stack) => (
              <li
                key={stack}
                className="rounded-full bg-card px-1.5 py-0.5 text-[11px] text-muted"
              >
                {stack}
              </li>
            ))}
          </ul>
        )}
      </div>
      {position.highlights && (
        <ExpandButton
          open={open}
          disabled={position.highlights.length === 0}
          onToggle={() => setOpen((value) => !value)}
        />
      )}
    </div>
  );
}

function MultiPositionExperience({ experience }: { experience: ExperienceItemData }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <ExperienceLogo experience={experience} />
        <div className="min-w-0 flex-1">
          {/* The active role is marked by the pinging rail dot instead. */}
          <h3 className="text-sm font-medium">{experience.companyName}</h3>
        </div>
      </div>
      <div>
        {experience.positions.map((position, index) => (
          <MultiPositionBlock
            key={position.id}
            position={position}
            experience={experience}
            isFirst={index === 0}
            isLast={index === experience.positions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function MultiPositionBlock({
  position,
  experience,
  isFirst,
  isLast
}: {
  position: ExperienceItemData['positions'][number];
  experience: ExperienceItemData;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(true);
  const { start, end } = position.employmentPeriod;
  // Ping only the position whose period actually covers today.
  const now = new Date();
  const isActivePosition =
    parse(start, 'MMM yyyy', new Date()) <= now &&
    (!end || parse(end, 'MMM yyyy', new Date()) >= now);

  return (
    <div className={cn(isFirst ? 'mt-1' : 'mt-4', 'flex items-start')}>
      {/* Rail column: dot shares the title's first row; line runs to the next dot. */}
      <div className="relative w-11 shrink-0 self-stretch">
        {isActivePosition ? (
          /* The active position gets the pinging current-role dot. */
          <span className="absolute left-[11px] top-[5px]">
            <CurrentDot />
          </span>
        ) : (
          <span
            aria-hidden
            className="absolute left-[13px] top-[7px] size-1.5 rounded-full bg-accent"
          />
        )}
        {!isLast && (
          /* Starts 5px below this dot (top-[18px] vs dot bottom at 13px) and
             ends 5px above the next dot: 16px block gap + 7px next-dot offset
             - 18px bottom overhang. */
          <div
            aria-hidden
            className="absolute -bottom-[18px] left-[15px] top-[18px] w-0.5 bg-border"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium">{position.title}</h4>
        <PositionMeta position={position} experience={experience} />
        {position.context && (
          <p className="mt-1 text-xs leading-phi text-muted">{position.context}</p>
        )}
        {position.highlights && position.highlights.length > 0 && (
          <div className={cn(styles.collapsible, open && styles.collapsibleOpen)}>
            <div>
              <ul className="mt-1 space-y-1">
                {position.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-xs leading-phi text-muted">
                    <span className="shrink-0 text-accent">▸</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {position.stacks && (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {position.stacks.map((stack) => (
              <li
                key={stack}
                className="rounded-full bg-card px-1.5 py-0.5 text-[11px] text-muted"
              >
                {stack}
              </li>
            ))}
          </ul>
        )}
      </div>
      {position.highlights && (
        <ExpandButton
          open={open}
          disabled={position.highlights.length === 0}
          onToggle={() => setOpen((value) => !value)}
        />
      )}
    </div>
  );
}

function ExperienceLogo({ experience }: { experience: ExperienceItemData }) {
  if (experience.themedLogo) {
    return <ThemedLogo variant={experience.themedLogo} className="mx-1 size-6 shrink-0" />;
  }
  if (experience.companyLogo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={experience.companyLogo}
        alt={`${experience.companyName} logo`}
        width="24"
        height="24"
        className={cn(
          'mx-1 shrink-0',
          experience.logoShape === 'rounded-square'
            ? 'size-6 rounded-md object-contain'
            : experience.logoShape === 'full'
              ? 'h-6 w-auto object-contain'
              : 'size-6 rounded-full object-contain'
        )}
      />
    );
  }
  return null;
}

function CurrentDot() {
  return (
    <span className="relative flex size-2.5 items-center justify-center" aria-label="Current employer">
      <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-accent opacity-50" />
      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
    </span>
  );
}

function ExpandButton({
  open,
  onToggle,
  disabled = false
}: {
  open: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  // Disabled (empty highlights) renders as expanded and inert.
  const isOpen = open || disabled;
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Hide description' : 'Show description'}
      className="flex size-6 shrink-0 items-center justify-center text-accent transition-opacity duration-150 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <ChevronDown
        className={cn('size-4 transition-transform duration-200', isOpen && 'rotate-180')}
      />
    </button>
  );
}

function formatDuration(start: string, end?: string) {
  const startDate = parse(start, 'MMM yyyy', new Date());
  const endDate = end ? parse(end, 'MMM yyyy', new Date()) : new Date();
  // Inclusive month count (clamped for future start dates): Feb 2021 – Feb 2022 is 1y 1m.
  const months = Math.max(0, differenceInMonths(endDate, startDate)) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return years > 0 ? `${years}y ${rest}m` : `${rest}m`;
}

