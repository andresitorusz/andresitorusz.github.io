import { ReactNode, useEffect, useSyncExternalStore, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import localFont from 'next/font/local';
import { ArrowUp, House, Moon, Sun } from 'lucide-react';
import { PROFILE } from 'data/profile';
import { cn } from 'lib/cn';
import { CONTENT } from 'data/content';
import styles from 'styles/site.module.css';

const googleSans = localFont({
  src: [
    { path: '../styles/fonts/google-sans-400.ttf', weight: '400', style: 'normal' },
    { path: '../styles/fonts/google-sans-500.ttf', weight: '500', style: 'normal' },
    { path: '../styles/fonts/google-sans-700.ttf', weight: '700', style: 'normal' }
  ],
  display: 'swap',
  variable: '--font-google-sans'
});

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        googleSans.className,
        'flex min-h-screen flex-col bg-background text-foreground antialiased'
      )}
    >
      <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-3xl items-center justify-end gap-2.5 px-4 py-3 sm:px-6 sm:gap-5">
          <div className={cn(styles.noScrollbar, 'flex items-center gap-2.5 overflow-x-auto sm:gap-5')}>
            {/* Home mark: lucide House (ISC-licensed), currentColor follows the theme. */}
            <Link
              href="/"
              aria-label="Home"
              className="text-muted transition-colors duration-150 hover:text-accent"
            >
              <House className="size-4" />
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="mx-auto mt-auto w-full max-w-3xl px-6 pb-4 pt-3">
        <div className="flex items-center justify-between text-xs text-subtle">
          <LocalTime />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="inline-flex items-center gap-1 text-muted transition-colors duration-150 hover:text-accent"
          >
            Top <ArrowUp className="size-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Hydration-safe: false during SSR/first render, true after mount.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Placeholder keeps the nav from shifting when the real icon mounts.
  if (!mounted) return <span className="inline-block size-4" aria-hidden />;

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-0.5 text-muted transition-colors duration-150 hover:text-accent"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: PROFILE.timeZone,
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const interval = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time} {CONTENT.timeZoneLabel}
    </span>
  );
}
