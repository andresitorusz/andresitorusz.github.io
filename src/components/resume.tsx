import { ReactNode } from 'react';
import { PROFILE, EXPERIENCES } from 'data/profile';
import { CONTENT } from 'data/content';
import { obfuscate } from 'lib/obfuscate';
import { Section } from './section';

export function Resume() {
  const job = PROFILE.jobs[0];

  return (
    <Section>
      <div className="mb-8">
        <h3 className="text-2xl font-bold tracking-tight">{PROFILE.displayName}</h3>
        <p className="mt-1 text-sm text-accent">{job.title}</p>
        <p className="mt-2 text-xs text-muted">
          {/* Entities in raw HTML; browsers render the plain strings. */}
          <span dangerouslySetInnerHTML={{ __html: obfuscate(PROFILE.email) }} /> ·{' '}
          <span
            dangerouslySetInnerHTML={{ __html: obfuscate(PROFILE.githubUrl.replace('https://', '')) }}
          />{' '}
          ·{' '}
          <span
            dangerouslySetInnerHTML={{
              __html: obfuscate(PROFILE.linkedinUrl.replace('https://', ''))
            }}
          />{' '}
          · {PROFILE.location}
        </p>
      </div>

      <div className="space-y-8">
        <ResumeBlock title="Summary">
          <p className="text-sm leading-relaxed text-muted">{CONTENT.bio}</p>
        </ResumeBlock>

        <ResumeBlock title="Experience">
          {EXPERIENCES.map((experience) => {
            const position = experience.positions[0];
            const { start, end } = position.employmentPeriod;
            return (
              <div key={experience.id} className="mb-6 last:mb-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-sm font-semibold">{position.title}</h4>
                  <span className="shrink-0 text-[11px] tabular-nums text-subtle">
                    {start ? `${start} – ${end ?? 'present'}` : 'present'}
                  </span>
                </div>
                <p className="text-xs text-accent">{experience.companyName}</p>
                {position.highlights && (
                  <ul className="mt-2 space-y-1">
                    {position.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-xs leading-relaxed text-muted"
                      >
                        <span className="mt-0.5 shrink-0 text-accent">▸</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
                {position.skills && (
                  <p className="mt-2 text-[11px] text-subtle">
                    {position.skills.map((skill) => skill).join(' · ')}
                  </p>
                )}
              </div>
            );
          })}
        </ResumeBlock>
      </div>
    </Section>
  );
}

function ResumeBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        {title}
      </h4>
      {children}
    </div>
  );
}
