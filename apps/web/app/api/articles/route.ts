// apps/web/app/api/articles/route.ts
// GET /api/articles — list articles
// POST /api/articles — create article

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const articles = await prisma.article.findMany({
      where: {
        ...(status && { status }),
        ...(category && { category }),
        ...(city && { city }),
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      skip,
    });

    const total = await prisma.article.count({
      where: {
        ...(status && { status }),
        ...(category && { category }),
        ...(city && { city }),
      },
    });

    return NextResponse.json({
      items: articles,
      total,
      page,
      limit,
      hasMore: skip + articles.length < total,
    });
  } catch (error) {
    console.error('[API /articles GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, category' },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        city: body.city || null,
        author: body.author || 'Big Muddy Magazine',
        status: body.status || 'draft',
        excerpt: body.excerpt || null,
        body: body.body || null,
        heroImage: body.heroImage || null,
        readTime: body.readTime || null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('[API /articles POST]', error);
    if ((error as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
