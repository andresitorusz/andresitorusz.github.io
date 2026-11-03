import { ArrowDown } from 'lucide-react';
import { PROFILE } from 'data/profile';
import { cn } from 'lib/cn';
import styles from 'styles/site.module.css';

export function Cta() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
      <h2 className="text-balance text-2xl font-medium tracking-tight">
        Looking to collaborate on your next venture?
      </h2>
      <p className="mt-1 text-xs text-muted">
        I currently reside in Jakarta, Indonesia, and am available for global remote work. Get in
        touch!
      </p>
      <ArrowDown className={cn(styles.bounce, 'mx-auto mt-2 size-4 text-accent')} aria-hidden />
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {/* Built on click so the email never appears in the rendered HTML. */}
        <button
          type="button"
          onClick={() =>
            window.open(`https://mail.google.com/mail/u/0/?to=${PROFILE.email}&fs=1&tf=cm`, '_blank')
          }
          aria-label="get-in-touch-gmail"
          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition-colors duration-150 hover:text-foreground"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logos/social-gmail.png"
            alt=""
            aria-hidden
            className="size-[18px] object-contain"
          />
        </button>
        <a
          href={PROFILE.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="get-in-touch-linkedin"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition-colors duration-150 hover:text-foreground"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logos/social-linkedin.png"
            alt=""
            aria-hidden
            className="size-[18px] object-contain"
          />
        </a>
      </div>
    </section>
  );
}
