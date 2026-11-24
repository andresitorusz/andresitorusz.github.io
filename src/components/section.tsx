import { ReactNode, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from 'lib/cn';

type PanelProps = {
  id?: string;
  title?: string;
  /** Visually hidden heading, e.g. the GitHub contributions panel. */
  srOnly?: boolean;
  children: ReactNode;
};

export function Panel({ id, title, srOnly, children }: PanelProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl scroll-mt-20">
      <div className="px-4 sm:px-6">
        <h2
          className={cn(
            'text-[1.214rem] font-medium tracking-tight',
            srOnly ? 'sr-only' : 'py-1'
          )}
        >
          <a href={id ? `#${id}` : undefined} className="text-foreground no-underline">
            {title}
          </a>
        </h2>
        {children}
      </div>
    </section>
  );
}

export function ShowMoreButton({
  expanded,
  onToggle
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const [pressing, setPressing] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <div className="pb-4">
      <button
        type="button"
        onTouchStart={flashPress}
        onClick={() => {
          flashPress();
          onToggle();
        }}
        className={cn(
          'mx-auto flex items-center gap-1.5 text-xs transition-colors duration-150 hover:text-accent active:text-accent',
          pressing ? 'text-accent' : 'text-muted'
        )}
      >
        <ChevronDown
          className={cn('size-3.5 transition-transform duration-200', expanded && 'rotate-180')}
        />
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
}
