import { useEffect, useState } from 'react';
import Meta from 'components/meta';
import { Hero } from 'components/hero';
import { Contributions } from 'components/contributions';
import { Experience } from 'components/experience';
import { Education } from 'components/education';
import { Certifications } from 'components/certifications';
import { Projects } from 'components/projects';
import { Volunteering } from 'components/volunteering';
import { Cta } from 'components/cta';
import { Activity, fetchGitHubContributions } from 'lib/github-contributions';

export default function Home() {
  const [contributions, setContributions] = useState<Activity[] | null>(null);

  useEffect(() => {
    fetchGitHubContributions().then(setContributions);
  }, []);

  return (
    <>
      <Meta title="ye" description="My loopbaanlogboek." />
      <Hero />
      <Contributions contributions={contributions ?? []} loading={contributions === null} />
      <Experience />
      <Certifications />
      <Education />
      <Projects />
      <Volunteering />
      <Cta />
    </>
  );
}
