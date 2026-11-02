import { useState } from 'react';
import { Box, ChevronDown, Link as LinkIcon } from 'lucide-react';
import { PROJECTS, ProjectItemData } from 'data/profile';
import { cn } from 'lib/cn';
import { Panel } from './section';

const VISIBLE_COUNT = 3;

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, VISIBLE_COUNT);
  const hiddenCount = PROJECTS.length - VISIBLE_COUNT;

  return (
    <Panel id="projects" title="Projects">
      <ul>
        {visible.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ul>
      {hiddenCount > 0 && (
        <div className="flex items-center justify-center py-4">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex items-center gap-2 rounded-md bg-card px-3 py-1.5 text-xs text-muted transition-colors duration-150 hover:text-foreground"
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
  // A GitHub link gets the GitHub mark; otherwise fall back to the box tile.
  const logo = project.logo ?? (project.link?.includes('github.com') ? '/assets/logos/github.png' : undefined);

  return (
    <li>
      <div className="relative flex items-center">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt={`${project.title} logo`}
            width="24"
            height="24"
            className="mx-1 size-6 shrink-0 rounded-full object-contain grayscale transition-[filter] duration-300 hover:grayscale-0"
          />
        ) : (
          <div className="mx-1 flex size-6 shrink-0 items-center justify-center rounded-md border border-muted/15 bg-card text-muted">
            <Box className="size-4" />
          </div>
        )}
        <div className="flex min-w-0 flex-1 items-center gap-2 py-4 pl-3">
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 leading-snug text-sm font-medium text-balance">
              {project.title}
              {project.date && (
                <span className="ml-2 text-[11px] font-normal text-subtle">{project.date}</span>
              )}
            </h3>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open project"
              className="relative z-[1] flex size-6 shrink-0 items-center justify-center text-accent transition-opacity duration-150 hover:opacity-80"
            >
              <LinkIcon className="size-4" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-4 pl-1 pr-4 pb-4">
        {project.description && (
          <p className="text-xs leading-relaxed text-muted">{project.description}</p>
        )}
        {project.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
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
    </li>
  );
}
