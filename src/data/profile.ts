import { GITHUB_USERNAME } from 'data/constants';

export type SocialName = 'github' | 'linkedin' | 'x' | 'youtube' | 'email';

type Social = { name: SocialName; title: string; handle: string; href: string };

const socials: Social[] = [
  {
    name: 'github',
    title: 'GitHub',
    handle: GITHUB_USERNAME,
    href: `https://github.com/${GITHUB_USERNAME}`
  },
  {
    name: 'linkedin',
    title: 'LinkedIn',
    handle: 'andresitorusz',
    href: 'https://linkedin.com/in/andresitorusz'
  },
  {
    name: 'x',
    title: 'X',
    handle: '@andresitorusz',
    href: 'https://x.com/andresitorusz'
  },
  {
    name: 'youtube',
    title: 'YouTube',
    handle: '@andresitorusz',
    href: 'https://www.youtube.com/@andresitorusz'
  },
  {
    name: 'email',
    title: 'Email',
    handle: 'andresitorusz.19@gmail.com',
    href: 'mailto:andresitorusz.19@gmail.com'
  }
];

export const PROFILE = {
  displayName: 'Andre Yehuda Sitorus',
  firstName: 'Andre',
  avatar: '/assets/pfp.png',
  location: 'Jakarta, Indonesia',
  email: 'andresitorusz.19@gmail.com',
  timeZone: 'Asia/Jakarta',
  githubUsername: GITHUB_USERNAME,
  githubUrl: `https://github.com/${GITHUB_USERNAME}`,
  linkedinUrl: 'https://linkedin.com/in/andresitorusz',
  jobs: [
    {
      title: 'Senior Data Engineer',
      company: 'Ajaib'
    }
  ],
  socials
};

export type ExperienceItemData = {
  id: string;
  companyName: string;
  companyLogo?: string;
  /** Theme-aware logo variant rendered via ThemedLogo. */
  themedLogo?: 'sirclo' | 'del';
  /** 'rounded-square' for logos with a background; 'full' shows the whole logo at its natural width. */
  logoShape?: 'circle' | 'rounded-square' | 'full';
  isCurrentEmployer?: boolean;
  positions: {
    id: string;
    title: string;
    employmentPeriod: { start: string; end?: string };
    skills?: string[];
    highlights?: string[];
  }[];
};

export const EXPERIENCES: ExperienceItemData[] = [
  {
    id: 'ajaib',
    companyName: 'Ajaib',
    companyLogo: '/assets/logos/ajaib.png',
    logoShape: 'rounded-square',
    isCurrentEmployer: true,
    positions: [
      {
        id: 'ajaib-senior-data-engineer',
        title: 'Senior Data Engineer',
        employmentPeriod: { start: 'Jul 2026' },
        skills: [
          'Apache Airflow', 'Apache Flink', 'Apache Kafka', 'Apache Spark', 'Argo CD', 'Atlassian Confluence',
          'Atlassian Jira', 'dbt', 'Debezium', 'GitHub', 'Docker', 'Go','Google Artifact Registry',
          'Google BigQuery', 'Google Cloud Storage', 'Google Kubernetes Engine', 'Google Secret Manager',
          'Java', 'Metabase', 'Python', 'SQL', 'Terraform'
        ],
        highlights: [
          'Making Magic Happen.'
        ]
      }
    ]
  },
  {
    id: 'goto-group',
    companyName: 'GoTo Group',
    companyLogo: '/assets/logos/goto.png',
    logoShape: 'full',
    positions: [
      {
        id: 'goto-group-data-engineer',
        title: 'Data Engineer',
        employmentPeriod: { start: 'Oct 2024', end: 'Jun 2026' },
        skills: [
          'Alibaba MaxCompute', 'Alibaba DataWorks', 'Alibaba OSS', 'Apache Airflow', 'Docker', 'GitLab',
          'Google BigQuery', 'Google Cloud Storage', 'Python', 'SQL'
        ],
        highlights: [
          'Integrated third-party data sources, streamlined ingestion of external data into the internal data warehouse, and staged data as requested by analysts.',
          'Enforced data governance policies by refactoring legacy tables to ensure structural integrity and strict internal compliance.',
          'Standardized data workflows by developing scalable pipeline templates, driving engineering efficiency and ensuring consistent maintainability across all data products.',
          'Executed the end-to-end migration of the team\'s data resources from Google Cloud Platform to Alibaba Cloud.'
        ]
      }
    ]
  },
  {
    id: 'sirclo',
    companyName: 'SIRCLO',
    themedLogo: 'sirclo',
    positions: [
      {
        id: 'sirclo-data-engineer',
        title: 'Data Engineer',
        employmentPeriod: { start: 'Jun 2023', end: 'Sep 2024' },
        skills: [
          'Apache Airflow', 'Apache Spark', 'DataHub', 'dbt', 'Docker', 'Google Artifact Registry',
          'Google BigQuery', 'Google Cloud Run', 'Google Cloud Storage', 'Google Kubernetes Engine',
          'Jenkins', 'Phabricator', 'Python', 'Scala', 'Streamlit', 'SQL'
        ],
        highlights: [
          'Accelerated data pipeline development by engineering a custom framework for dynamic batch generation and maintenance, leveraging Apache Airflow and Apache Spark on Google Kubernetes Engine (GKE).',
          'Enhanced data accessibility by developing an in-house Streamlit application on GKE, enabling users to interact with Google BigQuery seamlessly.',
          'Centralized metadata management by deploying DataHub on GKE, unifying end-to-end data lineage across Apache Airflow, Google BigQuery, dbt, Apache Superset, and transactional databases.',
          'Boosted pipeline performance and reliability by spearheading a major Apache Airflow upgrade (2.0.2 to 2.5.0), proactively resolving breaking changes and migrating all production pipelines.',
          'Modernized external data ingestion by containerizing legacy API crawling and web scraping codebases, and standardizing their orchestration through Apache Airflow.'
        ]
      }
    ]
  },
  {
    id: 'tokopedia',
    companyName: 'Tokopedia',
    companyLogo: '/assets/logos/tokopedia.png',
    logoShape: 'full',
    positions: [
      {
        id: 'tokopedia-data-engineer',
        title: 'Data Engineer',
        employmentPeriod: { start: 'Mar 2022', end: 'May 2023' },
        skills: [
          'Apache Airflow', 'Apache Beam', 'Atlassian Confluence', 'Atlassian Jira', 'Debezium',
          'Docker', 'GitHub', 'Go', 'Google Artifact Registry', 'Google BigQuery', 'Google Cloud Storage',
          'Google Dataflow', 'Google Kubernetes Engine', 'Google Pub/Sub', 'Google Secret Manager',
          'Java', 'Jenkins', 'Python', 'SQL'
        ],
        highlights: [
          'Developed a custom framework for automated, dynamic batch pipeline generation using Apache Airflow and Apache Beam on Google Dataflow.',
          'Developed a low-latency, near real-time data replication pipeline from operational databases to data warehouse by utilizing Apache Beam, Google Dataflow, Debezium, GKE, and Google Pub/Sub.',
          'Enabled real-time product event analytics by developing a Go-based SDK for Pub/Sub ingestion and a high-throughput Java consumer pipeline to process client and server-side events.',
          'Strengthened infrastructure security by implementing Workload Identity, ensuring seamless and secure authentication between GKE and Google Cloud service accounts for custom containerized tasks.',
          'Democratized data workflows by developing Go-based self-serve platforms for batch and real-time pipeline creation, featuring both a Jira-integrated interface and a REST API.'
        ]
      }
    ]
  },
  {
    id: 'blibli',
    companyName: 'Blibli',
    companyLogo: '/assets/logos/blibli.png',
    logoShape: 'full',
    positions: [
      {
        id: 'blibli-associate-data-engineer',
        title: 'Associate Data Engineer',
        employmentPeriod: { start: 'Feb 2021', end: 'Feb 2022' },
        skills: [
          'Apache Airflow', 'Atlassian Bitbucket', 'Atlassian Confluence', 'Atlassian Jira', 'Google Artifact Registry',
          'Google BigQuery', 'Google Cloud Storage', 'Google Dataflow', 'Python', 'SQL'
        ],
        highlights: [
          'Contributed to building the entire end-to-end data engineering pipeline at Garasi.id from scratch, served as the first and the sole Data Engineer.',
          'Reduced data processing costs by approximately 90% for several Blibli.com pipelines by introducing an operator that transformed raw data into standardized formats, applied across multiple large-scale daily or hourly pipelines.'
        ]
      }
    ]
  }
];

export type EducationItemData = {
  id: string;
  campus: string;
  degree?: string;
  campusLogo?: string;
  themedLogo?: 'del';
  period?: { start: string; end?: string };
  description?: string;
  skills?: string[];
};

export const EDUCATION: EducationItemData[] = [
  {
    id: 'institut-teknologi-del',
    campus: 'Institut Teknologi Del',
    degree: 'Bachelor of Computer Science',
    themedLogo: 'del',
    period: { start: 'Aug 2016', end: 'Aug 2020' }
  }
];

export type LicenseItemData = {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issued?: string;
  expires?: string;
  credentialId?: string;
  credentialUrl?: string;
};

export const LICENSES: LicenseItemData[] = [
  {
    id: 'gcp-professional-data-engineer',
    title: 'Professional Data Engineer',
    issuer: 'Google Cloud',
    issuerLogo: '/assets/logos/gcp.png',
    issued: 'Oct 2024',
    expires: 'Oct 2027',
    credentialId: 'c890643b57af405db80b1e0c5f46eafa',
    credentialUrl: 'https://www.credly.com/badges/49f5252c-c502-4e49-b815-340d6bb26dcb/public_url'
  },
  {
    id: 'binar-quality-assurance-bootcamp',
    title: 'Quality Assurance Bootcamp',
    issuer: 'Binar Academy',
    issuerLogo: '/assets/logos/binar.png',
    issued: 'Mar 2023',
    credentialUrl: 'https://drive.google.com/file/d/1RA1Zwu-AoZo1NsplqN0wge5S5eZ9-SCL/view?pli=1'
  },
  {
    id: 'coursera-gcp-specialization',
    title: 'Developing Applications with Google Cloud Platform Specialization',
    issuer: 'Coursera',
    issuerLogo: '/assets/logos/coursera.png',
    issued: 'Apr 2020',
    credentialId: 'KYC3MFTXPU5W',
    credentialUrl: 'https://coursera.org/share/84585f9e1bb9e2a657e21bba80e13c3c'
  }
];

export type ProjectItemData = {
  id: string;
  title: string;
  date?: string;
  logo?: string;
  link?: string;
  skills: string[];
  description?: string;
};

export const PROJECTS: ProjectItemData[] = [
  {
    id: 'lugvloei',
    title: 'Lugvloei',
    date: 'Feb 2025',
    link: 'https://github.com/andresitorusz/lugvloei',
    skills: ['Apache Airflow', 'Docker', 'Helm', 'Kubernetes', 'Python'],
    description: 'Learning Apache Airflow deployment and operation on Kubernetes.'
  },
  {
    id: 'esdiel',
    title: 'Esdiel',
    date: 'Jul 2024',
    link: 'https://github.com/andresitorusz/esdiel',
    skills: ['Amazon Athena', 'Amazon S3', 'AWS Glue', 'AWS Lambda', 'Terraform'],
    description: 'Learning a simple serverless data lake deployment on AWS using Terraform.'
  }
];

export type VolunteeringItemData = {
  id: string;
  organization: string;
  logo?: string;
  themedLogo?: 'del';
  role?: string;
  periodText?: string;
  description?: string;
  credentialUrl?: string;
};

// From temp/volunteering.txt.
export const VOLUNTEERING: VolunteeringItemData[] = [
  {
    id: 'cloud-study-jams',
    organization: 'Google',
    logo: '/assets/logos/google.png',
    role: 'Facilitator of Cloud Study Jams',
    periodText: 'Nov 2019 · 1 mo',
    description:
      'Cloud Study Jams (CSJ) is a community-run study group for developers to learn the fundamental tools and capabilities of Google Cloud including free access to online labs across Machine Learning, Kubernetes, Certification, IoT, and Security.\nAs a Facilitator, I:\n- Guided participants on how to operate the GCP according to the mandatory topics chosen by the CSJ team and also according to the learning topics that are being followed by the participants after completing the mandatory topics.\n- Led the event activities.\n- Encouraged participants to dive deeper into the topics.'
  },
  {
    id: 'developer-student-clubs',
    organization: 'Google',
    logo: '/assets/logos/google.png',
    role: 'Lead of Developer Student Clubs',
    periodText: 'Aug 2019 - Jul 2020 · 1 yr',
    credentialUrl: 'https://drive.google.com/file/d/1EfzH89gUANt5s6FDtjyrcXpEsqhHAQPG/view?usp=sharing',
    description:
      'Developer Student Clubs (DSC) is a Google Developer program for university students, designed to help them build their cloud computing, mobile, and web development skills and knowledge.\nAs a Lead, I:\n- Set up DSC on my campus.\n- Organized club events.\n- Created chances for colleagues to share knowledge with fellow students.'
  },
  {
    id: 'computer-lab-assistant',
    organization: 'Institut Teknologi Del',
    themedLogo: 'del',
    role: 'Computer Lab Assistant',
    periodText: 'Sep 2019 - May 2020 · 9 mos',
    description:
      'As a Computer Lab Assistant, I:\n- Guided the students in understanding the practicum module.\n- Assisted the lecturer in evaluating student practicum assignments.\n- Assisted the lecturer in evaluating the final project of the course.\n\nCourse: Mobile Application Development. [September 2019 - May 2020]\nCourse topics: Activity, Thread & Fragment, Intent & Services, Content Provider & Broadcast Receiver, App Resources, Layout, Input Controls & Input Events, Room, and Web Service & Retrofit.\n\nCourse: Artificial Intelligence. [September 2019 - January 2020]\nCourse topics: Uninformed Search, Informed Search, Classical Search, Adversarial Search, and Uncertainty & Probabilistic Reasoning.'
  },
  {
    id: 'bebras',
    organization: 'Bebras Indonesia',
    logo: '/assets/logos/bebras.png',
    role: 'Committee Member',
    periodText: 'Oct 2018 · 1 mo',
    description:
      'Bebras Challenge is a challenge for elementary, junior high, and high school students to educate problem-solving skills, which contains the concept of computational thinking.\nAs a Committee Member, I guided and assisted participants in completing the challenge.'
  }
];
