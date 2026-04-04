export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { executeStyleMatch, StyleMatchInputSchema } from '@/lib/agent/handlers/editorialBureau';

const BodySchema = StyleMatchInputSchema;

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await executeStyleMatch(parsed.data, { toolId: 'system.editorial.style_match' });
    if (result && typeof result === 'object' && 'error' in result) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'style_match_failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
