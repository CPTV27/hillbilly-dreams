export const dynamic = 'force-dynamic';
// apps/web/app/api/atom/route.ts
// Atom 1.0 feed for Big Muddy Magazine articles

import { CITY_GUIDE_ARTICLES } from '@/lib/articles';
import { prisma } from '@/lib/db';

export const revalidate = 3600; // 1 hour

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigmuddymagazine.com';
const FEED_TITLE = 'Big Muddy Magazine';
const FEED_SUBTITLE =
  'Stories, city guides, and cultural dispatches from the Mississippi Delta and the American South.';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface FeedArticle {
  title: string;
  slug: string;
  category: string;
  excerpt?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  author?: string;
}

async function getArticles(): Promise<FeedArticle[]> {
  try {
    const articles = await (prisma as any).article.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' as const },
      take: 50,
      select: {
        title: true,
        slug: true,
        category: true,
        excerpt: true,
        publishedAt: true,
        updatedAt: true,
        author: true,
      },
    });
    return articles;
  } catch {
    return CITY_GUIDE_ARTICLES.filter((a) => a.status === 'published').slice(0, 50);
  }
}

function toIso8601(date: Date | string | null | undefined): string {
  if (!date) return new Date().toISOString();
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

export async function GET() {
  const articles = await getArticles();

  const updated = articles.length > 0
    ? toIso8601(articles[0].publishedAt)
    : new Date().toISOString();

  const entries = articles
    .map((article) => {
      const link = `${SITE_URL}/magazine/articles/${article.slug}`;
      return `  <entry>
    <title>${escapeXml(article.title)}</title>
    <link href="${escapeXml(link)}" rel="alternate" type="text/html" />
    <id>${escapeXml(link)}</id>
    <published>${toIso8601(article.publishedAt)}</published>
    <updated>${toIso8601(article.updatedAt || article.publishedAt)}</updated>
    <summary>${escapeXml(article.excerpt || '')}</summary>
    <category term="${escapeXml(article.category)}" />
    <author>
      <name>${escapeXml(article.author || 'Big Muddy Magazine')}</name>
    </author>
  </entry>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(FEED_TITLE)}</title>
  <subtitle>${escapeXml(FEED_SUBTITLE)}</subtitle>
  <link href="${escapeXml(SITE_URL)}" rel="alternate" type="text/html" />
  <link href="${escapeXml(`${SITE_URL}/api/atom`)}" rel="self" type="application/atom+xml" />
  <id>${escapeXml(SITE_URL)}/</id>
  <updated>${updated}</updated>
  <generator>Big Muddy Magazine</generator>
${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
