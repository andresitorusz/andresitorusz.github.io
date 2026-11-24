import { useState } from 'react';
import { Box, Link as LinkIcon } from 'lucide-react';
import { PROJECTS, ProjectItemData } from 'data/profile';
import { cn } from 'lib/cn';
import styles from 'styles/site.module.css';
import { Panel, ShowMoreButton } from './section';
import { ThemedLogo } from './themed-logo';

const VISIBLE_COUNT = 3;

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const always = PROJECTS.slice(0, VISIBLE_COUNT);
  const hidden = PROJECTS.slice(VISIBLE_COUNT);

  return (
    <Panel id="projects" title="Projects">
      <div className="py-4">
        <ul className="space-y-4">
          {always.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ul>
        {/* Extra rows animate open/closed with the Show more/less toggle. */}
        {hidden.length > 0 && (
          <div className={cn(styles.collapsible, showAll && styles.collapsibleOpen)}>
            <ul className="space-y-4 pt-4">
              {hidden.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </ul>
          </div>
        )}
      </div>
      {hidden.length > 0 && (
        <ShowMoreButton expanded={showAll} onToggle={() => setShowAll((value) => !value)} />
      )}
    </Panel>
  );
}

function ProjectRow({ project }: { project: ProjectItemData }) {
  // A GitHub link gets the GitHub mark (theme-aware); otherwise fall back to the box tile.
  const isGithubFallback = !project.logo && !!project.link?.includes('github.com');

  return (
    <li>
      <div className="flex items-start gap-3">
        {isGithubFallback ? (
          <span className="mx-1 flex size-6 shrink-0 items-center justify-center">
            <ThemedLogo variant="github" className="size-[18.5px]" />
          </span>
        ) : project.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.logo}
            alt={`${project.title} logo`}
            width="24"
            height="24"
            className="mx-1 size-6 shrink-0 object-contain"
          />
        ) : (
          <div className="mx-1 flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted">
            <Box className="size-4" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-balance">{project.title}</h3>
          {project.date && <p className="mt-1 text-xs tabular-nums text-muted">{project.date}</p>}
          {project.description && (
            <p className="mt-1 text-xs leading-phi text-muted">{project.description}</p>
          )}
          {project.stacks.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {project.stacks.map((stack) => (
                <li
                  key={stack}
                  className="rounded-full bg-card px-1.5 py-0.5 text-[11px] text-muted"
                >
                  {stack}
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
            aria-label={`Open ${project.title}`}
            className="flex size-6 shrink-0 items-center justify-center text-accent transition-opacity duration-150 hover:opacity-80"
          >
            <LinkIcon className="size-4" />
          </a>
        )}
      </div>
    </li>
  );
}
