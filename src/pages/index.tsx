import { useEffect, useState } from 'react';
import Meta from 'components/meta';
import { Hero } from 'components/hero';
import { Contributions } from 'components/contributions';
import { Experience } from 'components/experience';
import { Education } from 'components/education';
import { Certifications } from 'components/certifications';
import { Projects } from 'components/projects';
import { Activity, fetchGitHubContributions } from 'lib/github-contributions';

export default function Home() {
  const [contributions, setContributions] = useState<Activity[]>([]);

  useEffect(() => {
    fetchGitHubContributions().then(setContributions);
  }, []);

  return (
    <>
      <Meta
        title="Ye — Senior Data Engineer"
        description="Data engineer building scalable batch and real-time data platforms."
      />
      <Hero />
      <Contributions contributions={contributions} />
      <Experience />
      <Education />
      <Certifications />
      <Projects />
    </>
  );
}
