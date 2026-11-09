export interface Project {
  title: string;
  description: string;
  year: string;
  tags: string[];
  source?: string;
  visit?: string;
  icon?:
    | 'brewin'
    | 'tensorfaux'
    | 'dashviz'
    | 'chatbot'
    | 'vit'
    | 'postagger'
    | 'ngram'
    | 'linreg'
    | 'cppptr';
  image?: string;
  featured: boolean;
}

export interface Job {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  summary: string;
}

export const links = {
  github: 'https://github.com/rudyorre',
  linkedin: 'https://linkedin.com/in/rudyorre',
  twitter: 'https://twitter.com/rudyorre',
  email: 'mailto:rudyorre@gmail.com',
};

export const jobs: Job[] = [
  {
    role: 'Software Engineer',
    company: 'Google',
    companyUrl: 'https://cloud.google.com/security/products/security-operations',
    period: '2025 — Present',
    summary: 'SecOps Detections Platform. Distributed systems for security event detection at scale.',
  },
  {
    role: 'Software Engineer',
    company: 'Google X',
    companyUrl: 'https://x.company/blog/posts/introducing-chorus/',
    period: '2024 — 2025',
    summary: 'Built ingestion platform and core services for Chorus.',
  },
  {
    role: 'Software Engineer',
    company: 'One Step GPS',
    period: '2024',
    summary: 'Go/SQL backend and real-time WebSocket streaming for fleet tracking.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Arista Networks',
    period: '2023',
    summary: 'Automated TWAMP protocol testing and benchmarked session scale limits.',
  },
];

export const projects: Project[] = [
  {
    title: 'Brewin Language Interpreter',
    description: 'Statically typed, interpreted language in pure Python with lexical scoping, objects, and error handling.',
    year: '2023',
    tags: ['Python', 'Compilers'],
    source: 'https://github.com/rudyorre/brewin',
    icon: 'brewin',
    featured: true,
  },
  {
    title: 'TensorFaux',
    description: 'Lightweight neural network library modeled on the Keras API, built from scratch on NumPy and published to PyPI.',
    year: '2023',
    tags: ['Python', 'NumPy'],
    source: 'https://github.com/rudyorre/TensorFaux',
    visit: 'https://rudyorre.github.io/TensorFaux',
    icon: 'tensorfaux',
    featured: true,
  },
  {
    title: 'Dashviz',
    description: 'Minimal dynamic dashboard engine where view definitions and time-series data live in Postgres.',
    year: '2023',
    tags: ['Postgres', 'Express', 'Next.js'],
    source: 'https://github.com/rudyorre/dashviz',
    icon: 'dashviz',
    featured: true,
  },
  {
    title: 'Chatbot.ai (JPL FireSat)',
    description: 'Natural-language to SQL/SPARQL query translator built for the JPL FireSat mission.',
    year: '2023',
    tags: ['Python', 'Flask', 'SPARQL', 'Docker'],
    source: 'https://github.com/rudyorre/chatbot.ai',
    icon: 'chatbot',
    featured: false,
  },
  {
    title: 'ViT: Vision Transformer',
    description: 'From-scratch PyTorch implementation of the Vision Transformer architecture over image patch sequences.',
    year: '2022',
    tags: ['PyTorch'],
    source: 'https://github.com/rudyorre/vit',
    icon: 'vit',
    featured: false,
  },
  {
    title: 'Parts-of-Speech Tagger',
    description: 'Hidden Markov Model POS tagger using the Viterbi decoding algorithm, benchmarked against NLTK.',
    year: '2022',
    tags: ['Python', 'HMM'],
    source: 'https://github.com/rudyorre/pos-tagger',
    icon: 'postagger',
    featured: false,
  },
  {
    title: 'N-Gram Language Model',
    description: 'Markov language model with add-k smoothing and greedy sequence generation.',
    year: '2022',
    tags: ['Python', 'NLP'],
    source: 'https://github.com/rudyorre/ngram',
    icon: 'ngram',
    featured: false,
  },
  {
    title: 'Multivariable Linear Regression in C++',
    description: 'N-parameter linear regression solver with batch gradient descent in dependency-free C++.',
    year: '2021',
    tags: ['C++'],
    source: 'https://github.com/rudyorre/machine-learning-projects/tree/master/Multivariate-Linear-Regression',
    icon: 'linreg',
    featured: false,
  },
  {
    title: 'C++ std::shared_ptr & BST Map',
    description: 'Templated reference-counted smart pointer and exception-safe binary search tree map container.',
    year: '2021',
    tags: ['C++'],
    source: 'https://github.com/rudyorre/smart-shared-ptr',
    icon: 'cppptr',
    featured: false,
  },
];

export interface SiteVersion {
  id: string;
  label: string;
  era: string;
  status: 'current' | 'archived' | 'planned';
  path?: string;
  tag?: string;
  commit?: string;
  stack: string[];
  summary: string;
}

export const versions: SiteVersion[] = [
  {
    id: 'v4',
    label: 'v4.0',
    era: '2026 — Present',
    status: 'current',
    path: '/',
    tag: 'v4.0.0',
    commit: '01a80d8',
    stack: ['Astro 5', 'Vanilla CSS', 'MDX', 'Procedural SVG'],
    summary:
      'Minimalist static writing and systems lab with deterministic FNV-1a/SplitMix32 SVG glyphs, user-switchable typography, and zero required client JS.',
  },
  {
    id: 'v3',
    label: 'v3.0',
    era: '2024 — 2025',
    status: 'archived',
    path: '/v3/',
    tag: 'v3',
    commit: '976eb30',
    stack: ['Next.js 14', 'Tailwind CSS', 'shadcn/ui', 'NextUI', 'Framer Motion'],
    summary:
      'App Router portfolio featuring six switchable color themes (light, dark, paper, carbon, bento, miami), cursor-tracking radial gradients, and bento hobby cards.',
  },
  {
    id: 'v2',
    label: 'v2.0',
    era: '2022 — 2023',
    status: 'planned',
    commit: 'f440bec',
    stack: ['Next.js 12', 'React 18', 'Styled Components'],
    summary:
      'Single-page React portfolio with timeline milestones, project filtering, and GitHub Actions static export.',
  },
  {
    id: 'v1',
    label: 'v1.0',
    era: '2020 — 2021',
    status: 'planned',
    commit: 'ea1b25d',
    stack: ['HTML5', 'CSS3', 'jQuery'],
    summary:
      'First personal website built during community college—hand-edited HTML pages for coursework, C++ projects, and transcripts.',
  },
];

