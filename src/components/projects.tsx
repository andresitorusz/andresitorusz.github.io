import { useState } from 'react';
import { Box, ChevronDown, Link as LinkIcon } from 'lucide-react';
import { PROJECTS, ProjectItemData } from 'data/profile';
import { cn } from 'lib/cn';
import { Panel } from './section';
import { ThemedLogo } from './themed-logo';

const VISIBLE_COUNT = 3;

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, VISIBLE_COUNT);
  const hiddenCount = PROJECTS.length - VISIBLE_COUNT;

  return (
    <Panel id="projects" title="Projects">
      <ul className="space-y-4 py-4">
        {visible.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ul>
      {hiddenCount > 0 && (
        <div className="flex items-center justify-center py-4">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-1.5 text-xs text-muted transition-colors duration-150 hover:text-foreground active:text-accent"
          >
            <span>{showAll ? 'Show less' : 'Show more'}</span>
            <ChevronDown
              className={cn('size-4 transition-transform duration-200', showAll && 'rotate-180')}
            />
          </button>
        </div>
      )}
    </Panel>
  );
}

function ProjectRow({ project }: { project: ProjectItemData }) {
  // A GitHub link gets the GitHub mark (theme-aware); otherwise fall back to the box tile.
  const isGithubFallback = !project.logo && !!project.link?.includes('github.com');
  const logo = project.logo ?? (isGithubFallback ? '/assets/logos/github-dark.webp' : undefined);

  return (
    <li>
      {/* Same structure and gaps as Licenses & Certifications. */}
      <div className="flex items-start gap-3">
        {isGithubFallback ? (
          <ThemedLogo variant="github" className="mx-1 size-6 shrink-0" />
        ) : logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt={`${project.title} logo`}
            width="24"
            height="24"
            className="mx-1 size-6 shrink-0 rounded-full object-contain"
          />
        ) : (
          <div className="mx-1 flex size-6 shrink-0 items-center justify-center rounded-md border border-muted/15 bg-card text-muted">
            <Box className="size-4" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-balance">{project.title}</h3>
          {project.date && <p className="text-xs text-subtle">{project.date}</p>}
          {project.description && (
            <p className="mt-1 text-xs leading-relaxed text-muted">{project.description}</p>
          )}
          {project.skills.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {project.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-card px-1.5 py-0.5 text-[11px] text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open project"
            className="flex size-6 shrink-0 items-center justify-center text-accent transition-opacity duration-150 hover:opacity-80"
          >
            <LinkIcon className="size-4" />
          </a>
        )}
      </div>
    </li>
  );
}
