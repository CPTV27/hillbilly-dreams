// apps/web/app/api/articles/route.ts
// Articles API — GET (list) and POST (create)
// Falls back to lib/articles.ts data when database is not connected

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CITY_GUIDE_ARTICLES } from '@/lib/articles';

// ── GET /api/articles ──────────────────────────────────────────────────────
// Returns all published articles. Tries Prisma first; falls back to static data.

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const city = searchParams.get('city');
  const category = searchParams.get('category');
  const take = searchParams.get('take');

  try {
    // Attempt Prisma query
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (city) where.city = city;
    if (category) where.category = category;

    const articles = await (prisma as any).article.findMany({
      where,
      orderBy: { publishedAt: 'desc' as const },
      ...(take ? { take: parseInt(take, 10) } : {}),
    });

    return NextResponse.json({ data: articles }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (_dbError) {
    // Database not available — serve static data
    let articles = CITY_GUIDE_ARTICLES;

    if (status) {
      articles = articles.filter((a) => a.status === status);
    }
    if (city) {
      articles = articles.filter((a) => a.city === city);
    }
    if (category) {
      articles = articles.filter((a) => a.category === category);
    }
    if (take) {
      articles = articles.slice(0, parseInt(take, 10));
    }

    return NextResponse.json({
      data: articles,
      _source: 'static',
      _note: 'Database not connected. Serving static article data from lib/articles.ts.',
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}

// ── POST /api/articles ─────────────────────────────────────────────────────
// Creates a new article in the database.
// Returns 503 if database is not available.

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  // Basic validation
  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json(
      { error: 'title is required and must be a string.' },
      { status: 400 }
    );
  }
  if (!body.slug || typeof body.slug !== 'string') {
    return NextResponse.json(
      { error: 'slug is required and must be a string.' },
      { status: 400 }
    );
  }

  try {
    const article = await (prisma as any).article.create({
      data: {
        title: body.title as string,
        slug: body.slug as string,
        category: (body.category as string) ?? 'city-guide',
        city: (body.city as string | null) ?? null,
        author: (body.author as string) ?? 'Big Muddy Magazine',
        status: (body.status as string) ?? 'draft',
        excerpt: (body.excerpt as string | null) ?? null,
        body: (body.body as string | null) ?? null,
        heroImage: (body.heroImage as string | null) ?? null,
        readTime: (body.readTime as string | null) ?? null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt as string) : null,
      },
    });

    return NextResponse.json({ data: article }, { status: 201 });
  } catch (dbError: unknown) {
    const message =
      dbError instanceof Error ? dbError.message : 'Unknown database error.';

    // Check for unique constraint violation (slug already exists)
    if (
      message.includes('Unique constraint') ||
      message.includes('unique constraint')
    ) {
      return NextResponse.json(
        {
          error: 'An article with this slug already exists.',
          code: 'SLUG_CONFLICT',
        },
        { status: 409 }
      );
    }

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
          error: 'Database not available. Set DATABASE_URL environment variable to enable article creation.',
          code: 'DATABASE_UNAVAILABLE',
        },
        { status: 503 }
      );
    }

    console.error('[POST /api/articles] Database error:', dbError);
    return NextResponse.json(
      {
        error: 'Failed to create article.',
        message,
      },
      { status: 500 }
    );
  }
}
