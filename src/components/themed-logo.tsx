import { cn } from 'lib/cn';

// Theme-aware brand mark: the image swaps with the .dark class via the
// --logo-* CSS variables in site.module.css (zero JS, no hydration flash).
export function ThemedLogo({
  variant,
  className
}: {
  variant: 'github' | 'x' | 'sirclo';
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn('bg-contain bg-center bg-no-repeat', className)}
      style={{ backgroundImage: `var(--logo-${variant})` }}
    />
  );
}
