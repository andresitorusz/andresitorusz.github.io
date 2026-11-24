import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { STACKS, StackGroupData, StackItemData } from 'data/profile';
import { cn } from 'lib/cn';
import styles from 'styles/site.module.css';
import { Panel } from './section';
import { ThemedLogo } from './themed-logo';

const VISIBLE_COUNT = 3;

export function Stacks() {
  const [showAll, setShowAll] = useState(false);
  const [pressing, setPressing] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const always = STACKS.slice(0, VISIBLE_COUNT);
  const hidden = STACKS.slice(VISIBLE_COUNT);
  const hiddenCount = hidden.length;

  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
    };
  }, []);

  // Keep accent color visible across tap + collapse transition on touch screens.
  const flashPress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setPressing(true);
    pressTimer.current = setTimeout(() => setPressing(false), 200);
  };

  return (
    <Panel id="stacks" title="Stacks">
      <div className="py-4">
        {always.map((group, index) => (
          <StackGroupRow key={group.id} group={group} isFirst={index === 0} />
        ))}
        {/* Extra groups animate open/closed with the Show more/less toggle. */}
        <div className={cn(styles.collapsible, showAll && styles.collapsibleOpen)}>
          <div>
            {hidden.map((group) => (
              <StackGroupRow key={group.id} group={group} isFirst={false} />
            ))}
          </div>
        </div>
      </div>
      {hiddenCount > 0 && (
        <div className="pb-4">
          <button
            type="button"
            onTouchStart={flashPress}
            onClick={() => {
              flashPress();
              setShowAll((value) => !value);
            }}
            className={cn(
              'mx-auto flex items-center gap-1.5 text-xs transition-colors duration-150 hover:text-accent active:text-accent',
              pressing ? 'text-accent' : 'text-muted'
            )}
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

function StackGroupRow({ group, isFirst }: { group: StackGroupData; isFirst: boolean }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-2 py-3 sm:grid-cols-[15.5rem_1fr] sm:gap-0',
        isFirst ? 'pt-0' : 'border-t border-border'
      )}
    >
      <div className="sm:py-1 sm:pr-4">
        <h3 className="text-sm font-medium text-foreground">{group.category}</h3>
      </div>
      <div className="sm:border-l sm:border-dashed sm:border-border sm:pl-4">
        <ul className="flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <StackPill key={item.name} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function StackPill({ item }: { item: StackItemData }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-foreground">
      {item.themedLogo ? (
        item.themedLogo === 'github' ? (
          // GitHub mark fills its 128px canvas; 14px matches the 112/128 optical inset of the other stack icons.
          <span className="flex size-4 shrink-0 items-center justify-center">
            <ThemedLogo variant="github" className="size-[14px]" />
          </span>
        ) : (
          <ThemedLogo variant={item.themedLogo} className="size-4 shrink-0" />
        )
      ) : item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt=""
          aria-hidden
          width="16"
          height="16"
          className="size-4 shrink-0 object-contain"
        />
      ) : null}
      <span>{item.name}</span>
    </li>
  );
}
