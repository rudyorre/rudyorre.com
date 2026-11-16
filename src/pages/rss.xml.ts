import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getBlogPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getBlogPosts({ includeDrafts: false });

  return rss({
    title: 'Rudy Orre',
    description: 'Notes on backend engineering, distributed systems, and software.',
    site: context.site ?? 'https://rudyorre.com',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.description,
      link: `/blog/${post.id}/`,
      content: post.body,
    })),
  });
}
