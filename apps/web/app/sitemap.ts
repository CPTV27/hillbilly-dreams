import type { MetadataRoute } from 'next';
import { prisma } from '@bigmuddy/database';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Brand base URLs ──
  const brands = {
    touring: 'https://bigmuddytouring.com',
    magazine: 'https://bigmuddymagazine.com',
    radio: 'https://bigmuddyradio.com',
    economics: 'https://outsidereconomics.com',
    gallery: 'https://buycurious.art',
    records: 'https://bigmuddyrecords.com',
    directory: 'https://deepsouthdirectory.com',
  };

  // ── Touring static pages ──
  const touringEntries: MetadataRoute.Sitemap = [
    {
      url: brands.touring,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${brands.touring}/touring/inn`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${brands.touring}/touring/route`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // ── Magazine static pages ──
  const magazineEntries: MetadataRoute.Sitemap = [
    {
      url: brands.magazine,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // ── Magazine articles from DB ──
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    });

    articleEntries = articles.map((article) => ({
      url: `${brands.magazine}/magazine/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    // Prisma unavailable — static entries only
  }

  // ── Radio static pages ──
  const radioEntries: MetadataRoute.Sitemap = [
    {
      url: brands.radio,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${brands.radio}/radio/playlists`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${brands.radio}/radio/live`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${brands.radio}/radio/directory`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${brands.radio}/radio/podcast`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // ── Outsider Economics static pages ──
  const econEntries: MetadataRoute.Sitemap = [
    {
      url: brands.economics,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${brands.economics}/field-manual`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${brands.economics}/the-math`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${brands.economics}/community`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${brands.economics}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // ── Economics posts from MDX ──
  let econPostEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    econPostEntries = posts.map((post) => ({
      url: `${brands.economics}/field-manual/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch {
    // Posts directory unavailable
  }

  // ── Gallery static pages ──
  const galleryEntries: MetadataRoute.Sitemap = [
    {
      url: brands.gallery,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${brands.gallery}/gallery/artists`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${brands.gallery}/gallery/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // ── Records static pages ──
  const recordsEntries: MetadataRoute.Sitemap = [
    {
      url: brands.records,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${brands.records}/records/artists`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${brands.records}/records/releases`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${brands.records}/records/sessions`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // ── Deep South Directory static pages ──
  const mediaEntries: MetadataRoute.Sitemap = [
    {
      url: brands.directory,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${brands.directory}/media/directory`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${brands.directory}/media/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${brands.directory}/media/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${brands.directory}/media/get-started`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // ── Platform static pages ──
  const platformEntries: MetadataRoute.Sitemap = [
    {
      url: "https://hillbillydreamsinc.com",
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];

  return [
    ...touringEntries,
    ...magazineEntries,
    ...articleEntries,
    ...radioEntries,
    ...econEntries,
    ...econPostEntries,
    ...galleryEntries,
    ...recordsEntries,
    ...mediaEntries,
    ...platformEntries,
  ];
}
