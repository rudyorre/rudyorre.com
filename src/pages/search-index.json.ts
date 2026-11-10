import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projects, jobs } from '../data/site';

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
      title: 'Projects',
      url: '/projects',
      kind: 'page',
      snippet: 'Selected open-source and academic projects.',
      body: 'projects open source code github',
    },
    {
      title: 'Writing',
      url: '/writing',
      kind: 'page',
      snippet: 'All essays, notes, and technical write-ups.',
      body: 'blog writing essays notes posts rss',
    },
    {
      title: 'Lab — Interactive Visualizers & Tools',
      url: '/lab',
      kind: 'page',
      snippet: 'Interactive systems experiments, visualizers, and technical tools.',
      body: 'lab tools interactive demo visualizer sandbox experiments',
    },
    {
      title: 'Procedural SVG Glyph Workbench',
      url: '/lab/glyphs',
      kind: 'page',
      snippet: 'Interactive FNV-1a + SplitMix32 SVG glyph synthesizer across 10 motif families.',
      body: 'lab glyphs svg generator visualizer procedural fnv1a splitmix32 seed hash lissajous hilbert',
    },
    {
      title: 'Time Machine — Site Version Archive',
      url: '/versions',
      kind: 'page',
      snippet: 'Archived iterations of rudyorre.com across different eras and web stacks (v0-alpha through v4).',
      body: 'time machine versions archive history v0-alpha v0 v1 v2 v3 v4 html5up hugo nextjs astro static snapshot',
    },
    {
      title: 'rudyorre.com v3 (2024 — 2025 Snapshot)',
      url: '/v3/',
      kind: 'page',
      snippet: 'Archived Next.js 14 + Tailwind CSS portfolio with 6 color themes and bento cards.',
      body: 'time machine v3 archive 2024 2025 nextjs tailwind shadcn nextui framer motion themes',
    },
    {
      title: 'rudyorre.com v2 (2022 — 2023 Snapshot)',
      url: '/v2/',
      kind: 'page',
      snippet: 'Archived Next.js 13 + Styled Components dark-navy portfolio with SVG hero animation and UCLA projects.',
      body: 'time machine v2 archive 2022 2023 nextjs react styled components ucla tensorfaux brewin vit',
    },
    {
      title: 'rudyorre.com v1 (2020 — 2021 Snapshot)',
      url: '/v1/',
      kind: 'page',
      snippet: 'Archived Hugo Academic / Wowchemy portfolio with ML projects and sorting visualizer.',
      body: 'time machine v1 archive 2020 2021 hugo academic wowchemy bootstrap sorting visualizer',
    },
    {
      title: 'rudyorre.com v0 (Sep 2020 Snapshot)',
      url: '/v0/',
      kind: 'page',
      snippet: 'Archived hand-coded HTML5 UP Spectral portfolio from El Camino College.',
      body: 'time machine v0 archive 2020 html5 up spectral el camino college warriorplanner smart pointer transcript',
    },
    {
      title: 'rudyorre.com v0-alpha (Feb 10, 2020 First Commit)',
      url: '/v0-alpha/',
      kind: 'page',
      snippet: 'Literal first commit in the repository: raw HTML5 UP Spectral template with Lorem Ipsum.',
      body: 'time machine v0-alpha archive 2020 first commit 3648bc8 html5 up spectral lorem ipsum',
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
