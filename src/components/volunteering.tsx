import { useState } from 'react';
import { ChevronDown, Link as LinkIcon } from 'lucide-react';
import { VOLUNTEERING, VolunteeringItemData } from 'data/profile';
import { cn } from 'lib/cn';
import styles from 'styles/site.module.css';
import { Panel, ShowMoreButton } from './section';
import { ThemedLogo } from './themed-logo';

const VISIBLE_COUNT = 3;

export function Volunteering() {
  const [showAll, setShowAll] = useState(false);
  const always = VOLUNTEERING.slice(0, VISIBLE_COUNT);
  const hidden = VOLUNTEERING.slice(VISIBLE_COUNT);

  return (
    <Panel id="volunteering" title="Volunteer Experience">
      <div className="py-4">
        <div className="space-y-4">
          {always.map((item) => (
            <VolunteeringRow key={item.id} item={item} />
          ))}
        </div>
        {/* Extra rows animate open/closed with the Show more/less toggle. */}
        <div className={cn(styles.collapsible, showAll && styles.collapsibleOpen)}>
          <div className="space-y-4 pt-4">
            {hidden.map((item) => (
              <VolunteeringRow key={item.id} item={item} />
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

function VolunteeringRow({ item }: { item: VolunteeringItemData }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-start gap-3">
        {item.themedLogo ? (
          <ThemedLogo variant={item.themedLogo} className="mx-1 size-6 shrink-0" />
        ) : item.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.logo}
            alt={`${item.organization} logo`}
            width="24"
            height="24"
            className="mx-1 size-6 shrink-0 object-contain"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium">{item.role ?? item.organization}</h3>
          {item.role && <p className="text-xs text-muted">{item.organization}</p>}
          {item.periodText && (
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs tabular-nums text-muted">
              {item.periodText.split(' · ').map((part, index) => (
                <span key={part} className="flex items-center gap-2">
                  {index > 0 && <span className="text-subtle">·</span>}
                  {part}
                </span>
              ))}
            </p>
          )}
        </div>
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
        {item.credentialUrl && (
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Credential for ${item.organization}`}
            className="flex size-6 shrink-0 items-center justify-center text-accent transition-opacity duration-150 hover:opacity-80"
          >
            <LinkIcon className="size-4" />
          </a>
        )}
      </div>
      {item.description && (
        <div className={cn(styles.collapsible, open && styles.collapsibleOpen)}>
          <div>
            <p className="mt-1 whitespace-pre-line pl-11 pr-4 text-xs leading-phi text-muted">
              {item.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
