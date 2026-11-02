import { ReactNode } from 'react';
import { cn } from 'lib/cn';

type Props = {
  id?: string;
  title?: string;
  headingClassName?: string;
  children: ReactNode;
};

export function Section({ id, title, headingClassName = 'mb-6', children }: Props) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl scroll-mt-20 px-4 py-4 sm:px-6">
      {title && (
        <h2
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.25em] text-accent',
            headingClassName
          )}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

type PanelProps = {
  id?: string;
  title?: string;
  meta?: string;
  /** Visually hidden heading, like the reference site's contributions panel. */
  srOnly?: boolean;
  children: ReactNode;
};

export function Panel({ id, title, meta, srOnly, children }: PanelProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl scroll-mt-20">
      <div className="px-4 sm:px-6">
        <h2
          className={cn(
            'text-xl font-medium tracking-tight',
            srOnly ? 'sr-only' : 'py-1'
          )}
        >
          <a href={id ? `#${id}` : undefined} className="text-foreground no-underline">
            {title}
          </a>
          {meta && <sup className="ml-1 text-sm font-medium text-muted">{meta}</sup>}
        </h2>
        {children}
      </div>
    </section>
  );
}
