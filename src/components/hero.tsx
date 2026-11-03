import { useEffect, useState } from 'react';
import { PROFILE } from 'data/profile';
import { cn } from 'lib/cn';
import { obfuscate } from 'lib/obfuscate';
import { CONTENT } from 'data/content';
import styles from 'styles/site.module.css';

// Real brand marks; GitHub is a theme-aware CSS class, the rest plain images.
const SOCIAL_LOGOS: Record<string, { light: string; dark?: string }> = {
  github: { light: '/assets/logos/github-dark.png', dark: '/assets/logos/github-light.png' },
  linkedin: { light: '/assets/logos/social-linkedin.png' },
  twitter: { light: '/assets/logos/x.png' },
  youtube: { light: '/assets/logos/social-youtube.png' },
  email: { light: '/assets/logos/social-gmail.png' }
};

const THEME_LOGOS: Record<string, string> = {
  github: styles.logoGithub
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
              const href = isEmail ? `mailto:${obfuscate(PROFILE.email)}` : social.href;
              const logo = SOCIAL_LOGOS[social.name];
              return (
                <li key={social.name}>
                  <a
                    href={href}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    aria-label={social.title}
                    title={social.title}
                    className="group inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition-colors duration-150 hover:text-foreground"
                  >
                    {THEME_LOGOS[social.name] ? (
                      <span
                        aria-hidden
                        className={cn(
                          THEME_LOGOS[social.name],
                          'size-[18px] bg-contain bg-center bg-no-repeat'
                        )}
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo.light}
                        alt=""
                        aria-hidden
                        className="size-[18px] object-contain"
                      />
                    )}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
