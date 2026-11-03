import { useState } from 'react';
import { ChevronDown, Link as LinkIcon } from 'lucide-react';
import { VOLUNTEERING, VolunteeringItemData } from 'data/profile';
import { cn } from 'lib/cn';
import { Panel } from './section';

const VISIBLE_COUNT = 3;

export function Volunteering() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? VOLUNTEERING : VOLUNTEERING.slice(0, VISIBLE_COUNT);
  const hiddenCount = VOLUNTEERING.length - VISIBLE_COUNT;

  return (
    <Panel id="volunteering" title="Volunteering">
      <div className="space-y-4 py-4">
        {visible.map((item) => (
          <VolunteeringRow key={item.id} item={item} />
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

function VolunteeringRow({ item }: { item: VolunteeringItemData }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-start gap-3">
        {item.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.logo}
            alt={`${item.organization} logo`}
            width="24"
            height="24"
            className="mx-1 size-6 shrink-0 object-contain"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium">{item.role ?? item.organization}</h3>
          {item.role && <p className="text-xs text-muted">{item.organization}</p>}
          {item.periodText && <p className="mt-1 text-xs text-muted">{item.periodText}</p>}
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
      {open && item.description && (
        <p className="mt-1 whitespace-pre-line pl-11 pr-4 text-xs leading-relaxed text-muted">
          {item.description}
        </p>
      )}
    </div>
  );
}
