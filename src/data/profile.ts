import { GITHUB_USERNAME } from 'data/constants';

export type SocialName = 'github' | 'linkedin' | 'x' | 'youtube';

type Social = { name: SocialName; title: string; href: string };

const socials: Social[] = [
  {
    name: 'github',
    title: 'GitHub',
    href: `https://github.com/${GITHUB_USERNAME}`
  },
  {
    name: 'linkedin',
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/andresitorusz'
  },
  {
    name: 'x',
    title: 'X',
    href: 'https://x.com/andresitorusz'
  },
  {
    name: 'youtube',
    title: 'YouTube',
    href: 'https://www.youtube.com/@andresitorusz'
  }
];

export const PROFILE = {
  displayName: 'Andre Yehuda Sitorus',
  githubUsername: GITHUB_USERNAME,
  linkedinUrl: 'https://linkedin.com/in/andresitorusz',
  socials
};

export type StackItemData = {
  name: string;
  logo?: string;
  themedLogo?: 'github' | 'apache-kafka' | 'helm';
};

export type StackGroupData = {
  id: string;
  category: string;
  items: StackItemData[];
};

export const STACKS: StackGroupData[] = [
  {
    id: 'collaboration',
    category: 'Collaboration',
    items: [
      { name: 'Atlassian Bitbucket', logo: '/assets/logos/stacks/atlassian-bitbucket.webp' },
      { name: 'Atlassian Confluence', logo: '/assets/logos/stacks/atlassian-confluence.webp' },
      { name: 'Atlassian Jira', logo: '/assets/logos/stacks/atlassian-jira.webp' },
      { name: 'GitHub', themedLogo: 'github' },
      { name: 'GitLab', logo: '/assets/logos/stacks/gitlab.webp' },
      { name: 'Phabricator', logo: '/assets/logos/stacks/phabricator.webp' }
    ]
  },
  {
    id: 'data-governance-storage',
    category: 'Data (Governance / Storage)',
    items: [
      { name: 'Alibaba MaxCompute', logo: '/assets/logos/stacks/alibaba-maxcompute.webp' },
      { name: 'Alibaba OSS', logo: '/assets/logos/stacks/alibaba-oss.webp' },
      { name: 'Amazon Athena', logo: '/assets/logos/stacks/amazon-athena.webp' },
      { name: 'Amazon S3', logo: '/assets/logos/stacks/amazon-s3.webp' },
      { name: 'DataHub', logo: '/assets/logos/stacks/datahub.webp' },
      { name: 'Google BigQuery', logo: '/assets/logos/stacks/google-bigquery.webp' },
      { name: 'Google Cloud Storage', logo: '/assets/logos/stacks/google-cloud-storage.webp' }
    ]
  },
  {
    id: 'data-orchestration-processing-streaming',
    category: 'Data (Orchestration / Processing / Streaming)',
    items: [
      { name: 'Apache Airflow', logo: '/assets/logos/stacks/apache-airflow.webp' },
      { name: 'Apache Beam', logo: '/assets/logos/stacks/apache-beam.webp' },
      { name: 'Apache Flink', logo: '/assets/logos/stacks/apache-flink.webp' },
      { name: 'Apache Kafka', themedLogo: 'apache-kafka' },
      { name: 'Apache Spark', logo: '/assets/logos/stacks/apache-spark.webp' },
      { name: 'AWS Glue', logo: '/assets/logos/stacks/aws-glue.webp' },
      { name: 'dbt', logo: '/assets/logos/stacks/dbt.webp' },
      { name: 'Debezium', logo: '/assets/logos/stacks/debezium.webp' },
      { name: 'Google Dataflow', logo: '/assets/logos/stacks/google-dataflow.webp' },
      { name: 'Google Pub/Sub', logo: '/assets/logos/stacks/google-pubsub.webp' }
    ]
  },
  {
    id: 'devops',
    category: 'Devops',
    items: [
      { name: 'Argo CD', logo: '/assets/logos/stacks/argo-cd.webp' },
      { name: 'AWS Lambda', logo: '/assets/logos/stacks/aws-lambda.webp' },
      { name: 'Docker', logo: '/assets/logos/stacks/docker.webp' },
      { name: 'Google Artifact Registry', logo: '/assets/logos/stacks/google-artifact-registry.webp' },
      { name: 'Google Cloud Run', logo: '/assets/logos/stacks/google-cloud-run.webp' },
      { name: 'Google Kubernetes Engine', logo: '/assets/logos/stacks/google-kubernetes-engine.webp' },
      { name: 'Google Secret Manager', logo: '/assets/logos/stacks/google-secret-manager.webp' },
      { name: 'Helm', themedLogo: 'helm' },
      { name: 'Jenkins', logo: '/assets/logos/stacks/jenkins.webp' },
      { name: 'Kubernetes', logo: '/assets/logos/stacks/kubernetes.webp' },
      { name: 'Terraform', logo: '/assets/logos/stacks/terraform.webp' }
    ]
  },
  {
    id: 'productivity',
    category: 'Productivity',
    items: [
      { name: 'Claude', logo: '/assets/logos/stacks/claude.webp' },
      { name: 'Google Antigravity', logo: '/assets/logos/stacks/google-antigravity.webp' },
      { name: 'Visual Studio Code', logo: '/assets/logos/stacks/visual-studio-code.webp' }
    ]
  },
  {
    id: 'programming-languages',
    category: 'Programming Languages',
    items: [
      { name: 'Go', logo: '/assets/logos/stacks/go.webp' },
      { name: 'Java', logo: '/assets/logos/stacks/java.webp' },
      { name: 'Python', logo: '/assets/logos/stacks/python.webp' },
      { name: 'Scala', logo: '/assets/logos/stacks/scala.webp' },
      { name: 'SQL', logo: '/assets/logos/stacks/sql.webp' }
    ]
  },
  {
    id: 'visualization',
    category: 'Visualization',
    items: [
      { name: 'Apache Superset', logo: '/assets/logos/stacks/apache-superset.webp' },
      { name: 'Metabase', logo: '/assets/logos/stacks/metabase.webp' },
      { name: 'Streamlit', logo: '/assets/logos/stacks/streamlit.webp' }
    ]
  }
];

export type ExperienceItemData = {
  id: string;
  companyName: string;
  companyLogo?: string;
  /** Optional company headquarters/location and work arrangement. */
  companyLocation?: string;
  companyLocationType?: 'Remote' | 'Hybrid' | 'On-site';
  /** Theme-aware logo variant rendered via ThemedLogo. */
  themedLogo?: 'sirclo' | 'del';
  /** 'rounded-square' for logos with a background; 'full' shows the whole logo at its natural width. */
  logoShape?: 'circle' | 'rounded-square' | 'full';
  isCurrentEmployer?: boolean;
  positions: {
    id: string;
    title: string;
    /** Optional employment type, e.g. 'Full-time'; shown in the multi-position header. */
    employmentType?: string;
    employmentPeriod: { start: string; end?: string };
    /** Optional work arrangement and place, rendered below the employment period. */
    locationType?: 'Remote' | 'Hybrid' | 'On-site';
    location?: string;
    /** Role context (team, focus) shown before the description points. */
    context?: string;
    stacks?: string[];
    highlights?: string[];
  }[];
};

export const EXPERIENCES: ExperienceItemData[] = [
  {
    id: 'ajaib',
    companyName: 'Ajaib',
    companyLogo: '/assets/logos/experiences/ajaib.webp',
    companyLocation: 'Indonesia',
    companyLocationType: 'Remote',
    logoShape: 'rounded-square',
    isCurrentEmployer: true,
    positions: [
      {
        id: 'ajaib-senior-data-engineer',
        title: 'Senior Data Engineer',
        employmentPeriod: { start: 'Jul 2026' },
        employmentType: 'Full-time',
        context: 'Making Magic Happen.',
        stacks: [
          'Apache Airflow', 'Apache Flink', 'Apache Kafka', 'Apache Spark', 'Argo CD', 'Atlassian Confluence',
          'Atlassian Jira', 'dbt', 'Debezium', 'GitHub', 'Docker', 'Go','Google Artifact Registry',
          'Google BigQuery', 'Google Cloud Storage', 'Google Kubernetes Engine', 'Google Secret Manager',
          'Java', 'Metabase', 'Python', 'SQL', 'Terraform'
        ],
        highlights: []
      }
    ]
  },
  {
    id: 'goto-group',
    companyName: 'GoTo Group',
    companyLogo: '/assets/logos/experiences/goto.webp',
    companyLocation: 'Indonesia',
    companyLocationType: 'Hybrid',
    logoShape: 'full',
    positions: [
      {
        id: 'goto-group-data-engineer',
        title: 'Data Engineer',
        employmentPeriod: { start: 'Oct 2024', end: 'Jun 2026' },
        employmentType: 'Full-time',
        context:
          "I was part of a small, dedicated data squad handling market-pricing-related work at GoTo Group (specifically Gojek), Indonesia's premier on-demand platform.",
        stacks: [
          'Alibaba MaxCompute', 'Alibaba OSS', 'Apache Airflow', 'Docker', 'GitLab',
          'Google BigQuery', 'Google Cloud Storage', 'Python', 'SQL'
        ],
        highlights: [
          'Integrated third-party data sources, streamlined ingestion of external data into the internal data warehouse, and staged data as requested by analysts.',
          'Enforced data governance policies by refactoring legacy tables to ensure structural integrity and strict internal compliance.',
          'Standardized data workflows by developing scalable pipeline templates, driving engineering efficiency and ensuring consistent maintainability across all data products.',
          'Executed the end-to-end migration of the team\'s data resources from Google Cloud Platform to Alibaba Cloud.',
        ]
      }
    ]
  },
  {
    id: 'sirclo',
    companyName: 'SIRCLO',
    companyLocation: 'Indonesia',
    companyLocationType: 'Remote',
    themedLogo: 'sirclo',
    positions: [
      {
        id: 'sirclo-data-engineer',
        title: 'Data Engineer',
        employmentPeriod: { start: 'Jun 2023', end: 'Sep 2024' },
        employmentType: 'Full-time',
        context: 'At SIRCLO, Indonesia\'s leading omnichannel commerce enabler, I helped manage the internal data platform.',
        stacks: [
          'Apache Airflow', 'Apache Spark', 'Apache Superset', 'DataHub', 'dbt', 'Docker', 'Google Artifact Registry',
          'Google BigQuery', 'Google Cloud Run', 'Google Cloud Storage', 'Google Kubernetes Engine',
          'Jenkins', 'Phabricator', 'Python', 'Scala', 'Streamlit', 'SQL'
        ],
        highlights: [
          'Accelerated data pipeline development by engineering a custom framework for dynamic batch generation and maintenance, leveraging Apache Airflow and Apache Spark on Google Kubernetes Engine (GKE).',
          'Enhanced data accessibility by developing an in-house Streamlit application on GKE, enabling users to interact with Google BigQuery seamlessly.',
          'Centralized metadata management by deploying DataHub on GKE, unifying end-to-end data lineage across Apache Airflow, Google BigQuery, dbt, Apache Superset, and transactional databases.',
          'Boosted pipeline performance and reliability by spearheading a major Apache Airflow upgrade (2.0.2 to 2.5.0), proactively resolving breaking changes and migrating all production pipelines.',
          'Modernized external data ingestion by containerizing legacy API crawling and web scraping codebases and standardizing their orchestration through Apache Airflow.'
        ]
      }
    ]
  },
  {
    id: 'tokopedia',
    companyName: 'Tokopedia',
    companyLogo: '/assets/logos/experiences/tokopedia.webp',
    companyLocation: 'Indonesia',
    companyLocationType: 'Remote',
    logoShape: 'full',
    positions: [
      {
        id: 'tokopedia-data-engineer',
        title: 'Data Engineer',
        employmentPeriod: { start: 'Mar 2022', end: 'May 2023' },
        employmentType: 'Full-time',
        context: 'At Tokopedia, an Indonesian tech company focused on democratizing commerce, I was part of the Data Ingestion squad responsible for their data platform.',
        stacks: [
          'Apache Airflow', 'Apache Beam', 'Atlassian Confluence', 'Atlassian Jira', 'Debezium',
          'Docker', 'GitHub', 'Go', 'Google Artifact Registry', 'Google BigQuery', 'Google Cloud Storage',
          'Google Dataflow', 'Google Kubernetes Engine', 'Google Pub/Sub', 'Google Secret Manager',
          'Java', 'Jenkins', 'Python', 'SQL'
        ],
        highlights: [
          'Developed a custom framework for automated, dynamic batch pipeline generation using Apache Airflow and Apache Beam on Google Dataflow.',
          'Developed a low-latency, near-real-time data replication pipeline from operational databases to a data warehouse by utilizing Apache Beam, Google Dataflow, Debezium, GKE, and Google Pub/Sub.',
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
    companyLogo: '/assets/logos/experiences/blibli.webp',
    companyLocation: 'Indonesia',
    companyLocationType: 'Remote',
    logoShape: 'full',
    positions: [
      {
        id: 'blibli-associate-data-engineer',
        title: 'Associate Data Engineer',
        employmentPeriod: { start: 'Feb 2021', end: 'Feb 2022' },
        employmentType: 'Full-time',
        context: 'Working across Blibli, an omnichannel commerce ecosystem, and its automotive sister company, Garasi.id, was my direct pathway to becoming a Data Engineer.',
        stacks: [
          'Apache Airflow', 'Atlassian Bitbucket', 'Atlassian Confluence', 'Atlassian Jira', 'Google Artifact Registry',
          'Google BigQuery', 'Google Cloud Storage', 'Google Dataflow', 'Python', 'SQL'
        ],
        highlights: [
          'Built Garasi.id\'s end-to-end data pipeline from scratch as the sole founding Data Engineer; then I got transferred to Blibli after seven months.',
          'Reduced data processing costs by ~90% on high-frequency pipelines by implementing a raw-to-standard data transformation operator.'
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
    issuerLogo: '/assets/logos/certifications/gcp.webp',
    issued: 'Oct 2024',
    expires: 'Oct 2027',
    credentialId: 'c890643b57af405db80b1e0c5f46eafa',
    credentialUrl: 'https://www.credly.com/badges/49f5252c-c502-4e49-b815-340d6bb26dcb/public_url'
  },
  {
    id: 'binar-quality-assurance-bootcamp',
    title: 'Quality Assurance Bootcamp',
    issuer: 'Binar Academy',
    issuerLogo: '/assets/logos/certifications/binar.webp',
    issued: 'Mar 2023',
    credentialUrl: 'https://drive.google.com/file/d/1RA1Zwu-AoZo1NsplqN0wge5S5eZ9-SCL/view?pli=1'
  },
  {
    id: 'coursera-gcp-specialization',
    title: 'Developing Applications with Google Cloud Platform Specialization',
    issuer: 'Coursera',
    issuerLogo: '/assets/logos/certifications/coursera.webp',
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
  stacks: string[];
  description?: string;
};

export const PROJECTS: ProjectItemData[] = [
  {
    id: 'lugvloei',
    title: 'Lugvloei',
    date: 'Feb 2025',
    link: 'https://github.com/andresitorusz/lugvloei',
    stacks: ['Apache Airflow', 'Docker', 'Helm', 'Kubernetes', 'Python'],
    description: 'Learning Apache Airflow deployment and operation on Kubernetes.'
  },
  {
    id: 'esdiel',
    title: 'Esdiel',
    date: 'Jul 2024',
    link: 'https://github.com/andresitorusz/esdiel',
    stacks: ['Amazon Athena', 'Amazon S3', 'AWS Glue', 'AWS Lambda', 'Terraform'],
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

export const VOLUNTEERING: VolunteeringItemData[] = [
  {
    id: 'cloud-study-jams',
    organization: 'Google',
    logo: '/assets/logos/volunteering/google.webp',
    role: 'Facilitator of Cloud Study Jams',
    periodText: 'Nov 2019 · 1 mo',
    description:
      'Cloud Study Jams (CSJ) is a community-run study group for developers to learn the fundamental tools and capabilities of Google Cloud including free access to online labs across Machine Learning, Kubernetes, Certification, IoT, and Security.\nAs a Facilitator, I:\n- Guided participants on how to operate the GCP according to the mandatory topics chosen by the CSJ team and also according to the learning topics that are being followed by the participants after completing the mandatory topics.\n- Led the event activities.\n- Encouraged participants to dive deeper into the topics.'
  },
  {
    id: 'developer-student-clubs',
    organization: 'Google',
    logo: '/assets/logos/volunteering/google.webp',
    role: 'Lead of Developer Student Clubs',
    periodText: 'Aug 2019 — Jul 2020 · 1 yr',
    credentialUrl: 'https://drive.google.com/file/d/1EfzH89gUANt5s6FDtjyrcXpEsqhHAQPG/view?usp=sharing',
    description:
      'Developer Student Clubs (DSC) is a Google Developer program for university students, designed to help them build their cloud computing, mobile, and web development skills and knowledge.\nAs a Lead, I:\n- Set up DSC on my campus.\n- Organized club events.\n- Created chances for colleagues to share knowledge with fellow students.'
  },
  {
    id: 'computer-lab-assistant',
    organization: 'Institut Teknologi Del',
    themedLogo: 'del',
    role: 'Computer Lab Assistant',
    periodText: 'Sep 2019 — May 2020 · 9 mos',
    description:
      'As a Computer Lab Assistant, I:\n- Guided the students in understanding the practicum module.\n- Assisted the lecturer in evaluating student practicum assignments.\n- Assisted the lecturer in evaluating the final project of the course.\n\nCourse: Mobile Application Development. [September 2019 - May 2020]\nCourse topics: Activity, Thread & Fragment, Intent & Services, Content Provider & Broadcast Receiver, App Resources, Layout, Input Controls & Input Events, Room, and Web Service & Retrofit.\n\nCourse: Artificial Intelligence. [September 2019 - January 2020]\nCourse topics: Uninformed Search, Informed Search, Classical Search, Adversarial Search, and Uncertainty & Probabilistic Reasoning.'
  },
  {
    id: 'bebras',
    organization: 'Bebras Indonesia',
    logo: '/assets/logos/volunteering/bebras.webp',
    role: 'Committee Member',
    periodText: 'Oct 2018 · 1 mo',
    description:
      'Bebras Challenge is a challenge for elementary, junior high, and high school students to educate problem-solving skills, which contains the concept of computational thinking.\nAs a Committee Member, I guided and assisted participants in completing the challenge.'
  }
];
