import { cn } from 'lib/cn';

export type ThemedLogoVariant = 'github' | 'x' | 'sirclo' | 'del' | 'apache-kafka' | 'helm';

// Theme-aware brand mark: the image swaps with the .dark class via the
// --logo-* CSS variables in site.module.css (zero JS, no hydration flash).
export function ThemedLogo({
  variant,
  className
}: {
  variant: ThemedLogoVariant;
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
