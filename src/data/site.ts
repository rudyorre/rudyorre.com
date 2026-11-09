export interface Project {
  title: string;
  description: string;
  year: string;
  tags: string[];
  source?: string;
  visit?: string;
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
  resume: 'https://drive.google.com/file/d/1p8nSZYy8jgPrRdBCm4CZ3DQBhIJKudbN/view?usp=sharing',
  zoom: 'https://us05web.zoom.us/j/8749675790?pwd=K2w4aFJ4eHBKQzV3d3pUcXBjT2dHUT09',
  meet: 'https://meet.google.com/her-pqgs-ovd',
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
    featured: true,
  },
  {
    title: 'TensorFaux',
    description: 'Lightweight neural network library modeled on the Keras API, built from scratch on NumPy and published to PyPI.',
    year: '2023',
    tags: ['Python', 'NumPy'],
    source: 'https://github.com/rudyorre/TensorFaux',
    visit: 'https://rudyorre.github.io/TensorFaux',
    featured: true,
  },
  {
    title: 'Dashviz',
    description: 'Minimal dynamic dashboard engine where view definitions and time-series data live in Postgres.',
    year: '2023',
    tags: ['Postgres', 'Express', 'Next.js'],
    source: 'https://github.com/rudyorre/dashviz',
    featured: true,
  },
  {
    title: 'Chatbot.ai (JPL FireSat)',
    description: 'Natural-language to SQL/SPARQL query translator built for the JPL FireSat mission.',
    year: '2023',
    tags: ['Python', 'Flask', 'SPARQL', 'Docker'],
    source: 'https://github.com/rudyorre/chatbot.ai',
    featured: false,
  },
  {
    title: 'ViT: Vision Transformer',
    description: 'From-scratch PyTorch implementation of the Vision Transformer architecture over image patch sequences.',
    year: '2022',
    tags: ['PyTorch'],
    source: 'https://github.com/rudyorre/vit',
    featured: false,
  },
  {
    title: 'Parts-of-Speech Tagger',
    description: 'Hidden Markov Model POS tagger using the Viterbi decoding algorithm, benchmarked against NLTK.',
    year: '2022',
    tags: ['Python', 'HMM'],
    source: 'https://github.com/rudyorre/pos-tagger',
    featured: false,
  },
  {
    title: 'N-Gram Language Model',
    description: 'Markov language model with add-k smoothing and greedy sequence generation.',
    year: '2022',
    tags: ['Python', 'NLP'],
    source: 'https://github.com/rudyorre/ngram',
    featured: false,
  },
  {
    title: 'Multivariable Linear Regression in C++',
    description: 'N-parameter linear regression solver with batch gradient descent in dependency-free C++.',
    year: '2021',
    tags: ['C++'],
    source: 'https://github.com/rudyorre/machine-learning-projects/tree/master/Multivariate-Linear-Regression',
    featured: false,
  },
  {
    title: 'C++ std::shared_ptr & BST Map',
    description: 'Templated reference-counted smart pointer and exception-safe binary search tree map container.',
    year: '2021',
    tags: ['C++'],
    source: 'https://github.com/rudyorre/smart-shared-ptr',
    featured: false,
  },
];
