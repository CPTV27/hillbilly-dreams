// apps/web/app/api/feed/route.ts
// RSS 2.0 feed for Big Muddy Magazine articles

import { CITY_GUIDE_ARTICLES } from '@/lib/articles';

export const revalidate = 3600; // 1 hour

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigmuddymagazine.com';
const FEED_TITLE = 'Big Muddy Magazine';
const FEED_DESCRIPTION =
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
  author?: string;
}

async function getArticles(): Promise<FeedArticle[]> {
  try {
    const { default: prisma } = await import('@bigmuddy/database');
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
        author: true,
      },
    });
    return articles;
  } catch {
    return CITY_GUIDE_ARTICLES.filter((a) => a.status === 'published').slice(0, 50);
  }
}

function toRfc822(date: Date | string | null | undefined): string {
  if (!date) return new Date().toUTCString();
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toUTCString();
}

export async function GET() {
  const articles = await getArticles();

  const lastBuildDate = articles.length > 0
    ? toRfc822(articles[0].publishedAt)
    : new Date().toUTCString();

  const items = articles
    .map((article) => {
      const link = `${SITE_URL}/magazine/articles/${article.slug}`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <description>${escapeXml(article.excerpt || '')}</description>
      <pubDate>${toRfc822(article.publishedAt)}</pubDate>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <category>${escapeXml(article.category)}</category>
      <author>${escapeXml(article.author || 'Big Muddy Magazine')}</author>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${SITE_URL}/api/feed`)}" rel="self" type="application/rss+xml" />
    <generator>Big Muddy Magazine</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
