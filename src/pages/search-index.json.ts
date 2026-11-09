import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projects, jobs, links } from '../data/site';

export interface SearchDocument {
  title: string;
  url: string;
  kind: 'writing' | 'project' | 'experience' | 'page';
  snippet: string;
  body: string;
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('writing')).filter((p) => !p.data.draft);

  const docs: SearchDocument[] = [
    {
      title: 'Home — Rudy Orre',
      url: '/',
      kind: 'page',
      snippet: 'Software engineer at Google working on the SecOps Detections Platform.',
      body: 'Rudy Orre software engineer Google SecOps Detections Platform Google X Chorus backend systems',
    },
    {
      title: 'Writing',
      url: '/writing',
      kind: 'page',
      snippet: 'All essays, notes, and technical write-ups.',
      body: 'blog writing essays notes posts rss',
    },
    {
      title: 'Projects',
      url: '/projects',
      kind: 'page',
      snippet: 'Selected open-source and academic projects.',
      body: 'projects open source code github',
    },
    {
      title: 'Resume (PDF)',
      url: '/resume',
      kind: 'page',
      snippet: 'View or download my resume.',
      body: `resume cv ${links.resume}`,
    },
    ...posts.map((post) => ({
      title: post.data.title,
      url: `/writing/${post.id}`,
      kind: 'writing' as const,
      snippet: post.data.description,
      body: `${post.data.tags.join(' ')} ${post.body ?? ''}`.replace(/\s+/g, ' ').slice(0, 4000),
    })),
    ...projects.map((p) => ({
      title: p.title,
      url: p.source || p.visit || '/projects',
      kind: 'project' as const,
      snippet: p.description,
      body: `${p.tags.join(' ')} ${p.year}`,
    })),
    ...jobs.map((j) => ({
      title: `${j.role} · ${j.company}`,
      url: j.companyUrl || '/',
      kind: 'experience' as const,
      snippet: `${j.period} — ${j.summary}`,
      body: `${j.role} ${j.company} ${j.summary}`,
    })),
  ];

  return new Response(JSON.stringify(docs), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
