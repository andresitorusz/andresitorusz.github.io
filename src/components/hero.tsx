import { PROFILE } from 'data/profile';
import { CONTENT } from 'data/content';
import styles from 'styles/site.module.css';
import { ThemedLogo } from './themed-logo';

// Plain brand images; GitHub and X use the theme-aware ThemedLogo instead.
const SOCIAL_LOGOS: Record<string, string> = {
  linkedin: '/assets/logos/socials/linkedin.webp',
  youtube: '/assets/logos/socials/youtube.webp'
};

const THEMED_SOCIAL_LOGOS: Record<string, 'github' | 'x'> = {
  github: 'github',
  x: 'x'
};

const HIGHLIGHT = 'Data Engineer';

export function Hero() {
  const { bio } = CONTENT;

  return (
    <section className="relative w-full pb-4 pt-[4.25rem] md:pt-[6.875rem]">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className={styles.fadeIn}>
          <h1 className="text-[1.964rem] font-medium leading-none tracking-tight">
            {PROFILE.displayName}
          </h1>
          <p className="mt-2.5 text-sm leading-phi text-muted">
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

        <ul className="mt-4 flex flex-wrap gap-2">
          {PROFILE.socials
            .filter((social) => social.href)
            .map((social) => {
              const logo = SOCIAL_LOGOS[social.name];
              const content = THEMED_SOCIAL_LOGOS[social.name] ? (
                <ThemedLogo variant={THEMED_SOCIAL_LOGOS[social.name]} className="size-[18px]" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="" aria-hidden className="size-[18px] object-contain" />
              );
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                    title={social.title}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition-colors duration-150 hover:text-foreground"
                  >
                    {content}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
