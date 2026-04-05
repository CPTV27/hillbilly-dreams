// Reads Outsider Economics case studies from outsider-economics-v2/case-studies/

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const CASE_STUDIES_DIR = path.join(process.cwd(), '../../outsider-economics-v2/case-studies');

export interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  /** Filename for stable ordering (01-foo.md sorts before 02-bar.md) */
  sortKey: string;
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

function extractExcerpt(content: string): string {
  const lines = content.split('\n');
  let foundTitle = false;
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('---')) {
      return line.replace(/\*\*/g, '').replace(/\*/g, '').trim().slice(0, 200);
    }
  }
  return '';
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return [];

  const files = fs.readdirSync(CASE_STUDIES_DIR).filter(
    (f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md',
  );

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, filename), 'utf-8');
      const { content } = matter(raw);
      const slug = filename.replace(/\.md$/i, '');
      return {
        slug,
        title: extractTitle(content),
        excerpt: extractExcerpt(content),
        content,
        sortKey: filename,
      };
    })
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey, 'en'));
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<(CaseStudy & { htmlContent: string }) | null> {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(raw);
  const title = extractTitle(content);
  const excerpt = extractExcerpt(content);
  const bodyContent = content.replace(/^#\s+.+$/m, '').trim();
  const result = await remark().use(html, { sanitize: false }).process(bodyContent);

  return {
    slug,
    title,
    excerpt,
    content,
    sortKey: `${slug}.md`,
    htmlContent: result.toString(),
  };
}

export function getAdjacentCaseStudies(slug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const all = getAllCaseStudies();
  const index = all.findIndex((c) => c.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
