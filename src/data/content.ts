import { PROFILE } from 'data/profile';

export const CONTENT = {
  bio: 'A Data Engineer with a strong focus on building scalable, efficient data pipelines and optimizing costs. Proven track record in delivering end-to-end data solutions that enhance performance, streamline workflows and drive impactful results.',
  currently: {
    label: 'Senior Data Engineer at',
    highlight: PROFILE.jobs[0].company
  },
  timeZoneLabel: 'WIB',
  stack: ['Apache Airflow', 'Apache Spark', 'Apache Beam', 'Go', 'Python', 'Google Cloud Platform', 'Amazon Web Services', 'BigQuery', 'Kubernetes', 'dbt'],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' }
  ],
  about: [
    ""
  ]
};
