import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/draft?enable=1 — enables draft/edit mode
 * GET /api/draft?disable=1 — disables draft/edit mode
 * GET /api/draft — returns current status
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const draft = await draftMode();

  if (searchParams.get('enable') === '1') {
    draft.enable();
    const redirect = searchParams.get('redirect') || '/';
    return NextResponse.redirect(new URL(redirect, req.url));
  }

  if (searchParams.get('disable') === '1') {
    draft.disable();
    const redirect = searchParams.get('redirect') || '/';
    return NextResponse.redirect(new URL(redirect, req.url));
  }

  return NextResponse.json({ enabled: draft.isEnabled });
}
