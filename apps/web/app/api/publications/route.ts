export const dynamic = 'force-dynamic';
// apps/web/app/api/publications/route.ts
// GET  /api/publications  — list, filterable by status, category, city
// POST /api/publications  — create
//
// Query params:
//   ?status=available,preorder   (comma-separated OR single value)
//   ?category=book
//   ?city=natchez

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

const DB_FALLBACK_MSGS = [
  'Cannot read properties of undefined',
  'datasource',
  'DATABASE_URL',
  'Cannot find module',
  'P1001',
  'does not exist',
];

function isDbError(e: unknown): boolean {
  const msg = String(e);
  return DB_FALLBACK_MSGS.some((m) => msg.includes(m));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status');
  const category = searchParams.get('category');
  const city = searchParams.get('city');

  try {

    const where: Record<string, unknown> = {};

    if (statusParam) {
      const statuses = statusParam.split(',').map((s) => s.trim()).filter(Boolean);
      if (statuses.length === 1) {
        where.status = statuses[0];
      } else if (statuses.length > 1) {
        where.status = { in: statuses };
      }
    }

    if (category) where.category = category;
    if (city) where.relatedCity = city;

    const publications = await (prisma as any).publication.findMany({
      where,
      orderBy: [{ publishedAt: 'desc' as const }, { createdAt: 'desc' as const }],
    });

    return NextResponse.json({ data: publications });
  } catch (e) {
    if (isDbError(e)) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    console.error('[GET /api/publications]', e);
    return NextResponse.json({ error: 'Failed to load publications.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'title and slug are required.' }, { status: 400 });
    }


    const publication = await (prisma as any).publication.create({
      data: {
        title: body.title,
        slug: body.slug,
        subtitle: body.subtitle ?? null,
        author: body.author ?? 'Chase Pierson',
        description: body.description ?? null,
        longDescription: body.longDescription ?? null,
        category: body.category ?? 'book',
        format: body.format ?? 'hardcover',
        pageCount: body.pageCount ? Number(body.pageCount) : null,
        dimensions: body.dimensions ?? null,
        isbn: body.isbn ?? null,
        price: body.price ? Number(body.price) : null,
        currency: body.currency ?? 'usd',
        coverImageUrl: body.coverImageUrl ?? null,
        backCoverUrl: body.backCoverUrl ?? null,
        previewImages: Array.isArray(body.previewImages) ? body.previewImages : [],
        printPartner: body.printPartner ?? null,
        printUrl: body.printUrl ?? null,
        shopifyUrl: body.shopifyUrl ?? null,
        status: body.status ?? 'draft',
        edition: body.edition ?? null,
        printRun: body.printRun ? Number(body.printRun) : null,
        soldCount: body.soldCount ? Number(body.soldCount) : 0,
        relatedCity: body.relatedCity ?? null,
        tags: Array.isArray(body.tags) ? body.tags : [],
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
      },
    });

    return NextResponse.json({ data: publication }, { status: 201 });
  } catch (e) {
    if (isDbError(e)) {
      return NextResponse.json({ error: 'Database unavailable.' }, { status: 503 });
    }
    if ((e as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'A publication with that slug already exists.' }, { status: 409 });
    }
    console.error('[POST /api/publications]', e);
    return NextResponse.json({ error: 'Failed to create publication.' }, { status: 500 });
  }
}
