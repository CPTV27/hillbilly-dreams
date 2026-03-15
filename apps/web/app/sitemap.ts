import { MetadataRoute } from 'next';
import { prisma } from '@bigmuddy/database';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bmtBase = 'https://bigmuddytouring.com';
  const econBase = 'https://outsidereconomics.com';

  // ── Big Muddy Touring entries ──
  let articleEntries: MetadataRoute.Sitemap = [];

  try {
    const articles = await prisma.article.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    });

    articleEntries = articles.map((article) => ({
      url: `${bmtBase}/magazine/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    // Prisma unavailable — static entries only
  }

  const bmtEntries: MetadataRoute.Sitemap = [
    {
      url: bmtBase,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${bmtBase}/magazine`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${bmtBase}/radio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${bmtBase}/touring/inn`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${bmtBase}/touring/route`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // ── Outsider Economics entries ──
  const econStaticPages: MetadataRoute.Sitemap = [
    {
      url: econBase,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${econBase}/field-manual`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${econBase}/the-math`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${econBase}/community`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${econBase}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  let econPostEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    econPostEntries = posts.map((post) => ({
      url: `${econBase}/field-manual/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch {
    // Posts directory unavailable
  }

  return [...bmtEntries, ...articleEntries, ...econStaticPages, ...econPostEntries];
}
