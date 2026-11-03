import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { VOLUNTEERING } from 'data/profile';
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
          <div key={item.id}>
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
                <p className="text-xs text-muted">{item.organization}</p>
                {item.periodText && (
                  <p className="mt-0.5 text-xs text-muted">{item.periodText}</p>
                )}
                {item.description && (
                  <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-muted">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
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
