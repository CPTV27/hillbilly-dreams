// apps/web/app/api/articles/seed/route.ts
// Seed endpoint — upserts all 18 city guide articles from lib/articles.ts into the database
// POST /api/articles/seed

import { NextRequest, NextResponse } from 'next/server';
import { CITY_GUIDE_ARTICLES } from '@/lib/articles';

export async function POST(request: NextRequest) {
  // Optional: basic auth header check
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.SEED_SECRET}`) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const { default: prisma } = await import('@bigmuddy/database');

    let seeded = 0;
    const errors: string[] = [];

    for (const article of CITY_GUIDE_ARTICLES) {
      try {
        await (prisma as any).article.upsert({
          where: { slug: article.slug },
          update: {
            title: article.title,
            category: article.category as string,
            city: article.city as string | null ?? null,
            author: article.author,
            status: article.status as string,
            excerpt: article.excerpt ?? null,
            body: article.body ?? null,
            heroImage: article.heroImage ?? null,
            readTime: article.readTime ?? null,
            publishedAt: article.publishedAt ? new Date(article.publishedAt as string) : null,
            updatedAt: new Date(),
          },
          create: {
            title: article.title,
            slug: article.slug,
            category: article.category as string,
            city: article.city as string | null ?? null,
            author: article.author,
            status: article.status as string,
            excerpt: article.excerpt ?? null,
            body: article.body ?? null,
            heroImage: article.heroImage ?? null,
            readTime: article.readTime ?? null,
            publishedAt: article.publishedAt ? new Date(article.publishedAt as string) : null,
            createdAt: new Date(article.createdAt as string),
            updatedAt: new Date(article.updatedAt as string),
          },
        });
        seeded++;
      } catch (articleError: unknown) {
        const msg = articleError instanceof Error ? articleError.message : String(articleError);
        errors.push(`[${article.slug}] ${msg}`);
      }
    }

    const response: Record<string, unknown> = {
      seeded,
      total: CITY_GUIDE_ARTICLES.length,
      message: `Seeded ${seeded} of ${CITY_GUIDE_ARTICLES.length} articles.`,
    };

    if (errors.length > 0) {
      response.errors = errors;
    }

    return NextResponse.json(response, {
      status: errors.length > 0 ? 207 : 200,
    });
  } catch (dbError: unknown) {
    const message =
      dbError instanceof Error ? dbError.message : 'Unknown database error.';

    // Database not configured
    if (
      message.includes('datasource') ||
      message.includes('DATABASE_URL') ||
      message.includes('Cannot find module') ||
      message.includes('P1001') ||
      message.includes('P1003')
    ) {
      return NextResponse.json(
        {
          error: 'Database not available. Set DATABASE_URL to enable seeding.',
          code: 'DATABASE_UNAVAILABLE',
          note: 'The static article data in lib/articles.ts is already available without a database.',
        },
        { status: 503 }
      );
    }

    console.error('[POST /api/articles/seed] Database error:', dbError);
    return NextResponse.json(
      {
        error: 'Seed failed.',
        message,
      },
      { status: 500 }
    );
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed. Use POST to seed articles.',
      usage: 'POST /api/articles/seed',
    },
    { status: 405 }
  );
}
