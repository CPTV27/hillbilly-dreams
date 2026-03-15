// lib/posts.ts
// Reads Outsider Economics posts from outsider-economics-v2/ folder

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const POSTS_DIR = path.join(process.cwd(), '../../outsider-economics-v2');

// Post order matches SERIES-OUTLINE.md
const POST_ORDER: Record<string, number> = {
  'ch01-the-450000-secret': 1,
  '02-the-extraction-trap': 2,
  '03-the-coordination-premium': 3,
  '04-time-is-the-only-currency-that-cant-leave-town': 4,
  '05-the-task-board': 5,
  '06-building-without-banks': 6,
  '07-federation-not-scale': 7,
  '08-the-first-90-days': 8,
  '09-what-kills-coordination-systems': 9,
  '10-the-off-switch': 10,
  '11-pod-types': 11,
  '12-shared-services-without-money': 12,
  '13-the-scaling-math': 13,
  '14-the-legal-reality': 14,
  '15-technology-sovereignty': 15,
};

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  order: number;
  content: string;
  htmlContent?: string;
}

function getSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

function extractExcerpt(content: string): string {
  // Get the first paragraph after the title
  const lines = content.split('\n');
  let foundTitle = false;
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('---')) {
      // Clean markdown formatting
      return line.replace(/\*\*/g, '').replace(/\*/g, '').trim().slice(0, 200);
    }
  }
  return '';
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter(
    (f) => f.endsWith('.md') && !f.startsWith('AGENT') && !f.startsWith('SERIES') && !f.startsWith('twitter') && !f.startsWith('voice')
  );

  return files
    .map((filename) => {
      const slug = getSlug(filename);
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
      const { content } = matter(raw);

      return {
        slug,
        title: extractTitle(content),
        excerpt: extractExcerpt(content),
        order: POST_ORDER[slug] ?? 99,
        content,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  // Strip the first # heading — we render the title separately in the page header
  const bodyContent = post.content.replace(/^#\s+.+$/m, '').trim();

  const result = await remark().use(html, { sanitize: false }).process(bodyContent);

  return {
    ...post,
    htmlContent: result.toString(),
  };
}

// getAllSlugs can be used by generateStaticParams if we switch to static generation
// export function getAllSlugs(): string[] {
//   return getAllPosts().map((p) => p.slug);
// }
