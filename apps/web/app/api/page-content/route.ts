// apps/web/app/api/page-content/route.ts
// GET /api/page-content?slug=pricing&brand=records
// Public endpoint — returns the Sanity pageContent doc matching slug + brand,
// or null if none exists. Clients render fallback copy on null.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getPageContent } from '@/lib/page-content';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const brand = searchParams.get('brand') ?? undefined;

  if (!slug) {
    return NextResponse.json({ error: 'slug query param required' }, { status: 400 });
  }

  try {
    const content = await getPageContent(slug, brand);
    return NextResponse.json({ data: content });
  } catch (err) {
    console.error('[GET /api/page-content]', err);
    const message = err instanceof Error ? err.message : 'Fetch failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
