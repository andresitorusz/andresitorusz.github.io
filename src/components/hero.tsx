import { useEffect, useState } from 'react';
import { PROFILE } from 'data/profile';
import { cn } from 'lib/cn';
import { CONTENT } from 'data/content';
import styles from 'styles/site.module.css';
import { ThemedLogo } from './themed-logo';

// Plain brand images; GitHub and X use the theme-aware ThemedLogo instead.
const SOCIAL_LOGOS: Record<string, string> = {
  linkedin: '/assets/logos/social-linkedin.webp',
  youtube: '/assets/logos/social-youtube.webp',
  email: '/assets/logos/social-gmail.webp'
};

const THEMED_SOCIAL_LOGOS: Record<string, 'github' | 'x'> = {
  github: 'github',
  x: 'x'
};

const HIGHLIGHT = 'Data Engineer';

export function Hero() {
  const { bio } = CONTENT;
  // Portrait shows only when the image loads; null until the check resolves.
  const [hasPhoto, setHasPhoto] = useState<boolean | null>(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setHasPhoto(true);
    image.onerror = () => setHasPhoto(false);
    image.src = PROFILE.avatar;
  }, []);

  return (
    <section className="relative w-full pb-4 pt-24 md:pt-32">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        {/* Picture left, name + summary right, on every screen size. */}
        <div className="flex items-center gap-6 md:gap-10">
          {hasPhoto && (
            <div className={cn(styles.fadeIn, 'shrink-0')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROFILE.avatar}
                alt={PROFILE.displayName}
                fetchPriority="high"
                className="w-[7.5rem] select-none sm:w-40"
              />
            </div>
          )}

          <div className={cn(styles.fadeIn, 'min-w-0')} style={{ animationDelay: '0.12s' }}>
            <h1 className="text-[2rem] font-medium leading-none tracking-tight">
              {PROFILE.displayName}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              {bio.split(HIGHLIGHT).map((part, index, parts) => (
                <span key={index}>
                  {part}
                  {index < parts.length - 1 && (
                    <span className="font-medium text-accent">{HIGHLIGHT}</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {PROFILE.socials
            .filter((social) => social.href)
            .map((social) => {
              const isEmail = social.name === 'email';
              const logo = SOCIAL_LOGOS[social.name];
              const content = THEMED_SOCIAL_LOGOS[social.name] ? (
                <ThemedLogo variant={THEMED_SOCIAL_LOGOS[social.name]} className="size-[18px]" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="" aria-hidden className="size-[18px] object-contain" />
              );
              const className =
                'group inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition-colors duration-150 hover:text-foreground';
              return (
                <li key={social.name}>
                  {isEmail ? (
                    // Button (not a link) so no "#" preview shows; compose built on click.
                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          `https://mail.google.com/mail/u/0/?to=${PROFILE.email}&fs=1&tf=cm`,
                          '_blank'
                        )
                      }
                      aria-label={social.title}
                      title={social.title}
                      className={cn(className, 'cursor-pointer')}
                    >
                      {content}
                    </button>
                  ) : (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.title}
                      title={social.title}
                      className={className}
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
