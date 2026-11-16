import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { deriveSlugFromEntry } from './lib/post-meta';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry, data }) => deriveSlugFromEntry(entry, data.slug),
  }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    canonical: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
