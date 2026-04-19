// apps/web/app/api/wizard/save/route.ts
// POST — save a generated draft to Sanity. Tracy promotes drafts to
// published in Studio. This endpoint never publishes directly.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { sanityWriter } from '@bigmuddy/content-creation';
import type { GeneratedDraft } from '@bigmuddy/content-creation';

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: { draft: GeneratedDraft; dataset?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.draft?.title || !body.draft?.body) {
    return NextResponse.json(
      { error: 'draft.title and draft.body required' },
      { status: 400 }
    );
  }

  try {
    const result = await sanityWriter.saveDraft({
      draft: body.draft,
      dataset: body.dataset,
    });
    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[POST /api/wizard/save]', err);
    const message = err instanceof Error ? err.message : 'Save failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
