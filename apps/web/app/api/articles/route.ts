export const dynamic = 'force-dynamic';
// apps/web/app/api/articles/route.ts
// Articles API — GET (list) and POST (create)
// Falls back to lib/articles.ts data when database is not connected

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CITY_GUIDE_ARTICLES } from '@/lib/articles';
import { articleCreateSchema, formatZodError } from '@/lib/user-post-validation';
import { requireAdmin } from '@/lib/admin-auth';

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
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: import('zod').infer<typeof articleCreateSchema>;
  try {
    const raw = await request.json();
    const parsed = articleCreateSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: formatZodError(parsed.error) }, { status: 400 });
    }
    body = parsed.data;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  try {
    const article = await (prisma as any).article.create({
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        city: body.city ?? null,
        author: body.author,
        status: body.status,
        excerpt: body.excerpt ?? null,
        body: body.body ?? null,
        heroImage: body.heroImage ?? null,
        readTime: body.readTime ?? null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
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
