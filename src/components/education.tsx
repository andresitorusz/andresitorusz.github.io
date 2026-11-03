import { GraduationCap } from 'lucide-react';
import { EDUCATION } from 'data/profile';
import { Panel } from './section';

export function Education() {
  return (
    <Panel id="education" title="Education">
      <div className="space-y-4 py-4">
        {EDUCATION.map((item) => (
          <div key={item.id} className="group/education flex items-start gap-3">
            {item.campusLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.campusLogo}
                alt={`${item.campus} logo`}
                width="24"
                height="24"
                className="mx-1 size-6 shrink-0 object-contain"
              />
            ) : (
              <div className="mx-1 flex size-6 shrink-0 items-center justify-center rounded-md border border-muted/15 bg-card text-muted">
                <GraduationCap className="size-4" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium">{item.degree}</h3>
              <p className="text-xs text-muted">{item.campus}</p>
              {item.period && (
                <p className="mt-0.5 text-xs text-muted">
                  {item.period.start} – {item.period.end ?? 'present'}
                </p>
              )}
              {item.description && (
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
