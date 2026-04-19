// apps/web/app/api/wizard/templates/[type]/route.ts
// GET — fetch the content template for a content-type + brand combo.
// Public endpoint — wizard UI loads this to show the form.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { templates } from '@bigmuddy/content-creation';
import type { ContentType, Brand } from '@bigmuddy/content-creation';

const VALID_TYPES: ContentType[] = [
  'magazine-article',
  'social-post',
  'listing-description',
  'episode-description',
  'pitch-deck-section',
];

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  if (!VALID_TYPES.includes(params.type as ContentType)) {
    return NextResponse.json(
      { error: `Unknown content type: ${params.type}` },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const brand = (searchParams.get('brand') ?? 'magazine') as Brand;

  try {
    const template = await templates.loadTemplate(params.type as ContentType, brand);
    return NextResponse.json({ data: template });
  } catch (err) {
    console.error('[GET /api/wizard/templates/[type]]', err);
    const message = err instanceof Error ? err.message : 'Template load failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
