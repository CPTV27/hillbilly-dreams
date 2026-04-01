export const dynamic = 'force-dynamic';
// apps/web/app/api/articles/slug/[slug]/route.ts
// GET /api/articles/slug/[slug] — get article by slug (for public article pages)

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: params.slug },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('[API /articles/slug/[slug] GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
