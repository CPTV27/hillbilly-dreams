export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { peelBudgetFields, toolRegistry } from '@/lib/agent/toolRegistry';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

/** POST /api/agent/harvest — legacy path; delegates to `rook.harvest` in-process. */
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const harvest = toolRegistry.get('rook.harvest');
  if (!harvest) {
    return NextResponse.json({ error: 'Harvest tool not configured' }, { status: 500 });
  }

  const { rest, opts } = peelBudgetFields(raw);
  const result = await harvest.execute(rest, opts);
  if (isRecord(result) && result.error === 'validation_failed') {
    return NextResponse.json(result, { status: 400 });
  }
  if (isRecord(result) && result.ok === false) {
    const status = result.error === 'Budget Exceeded' ? 402 : 500;
    return NextResponse.json({ error: result.error, detail: result.detail }, { status });
  }
  if (!isRecord(result) || result.ok !== true) {
    return NextResponse.json(result ?? { error: 'Unexpected harvest response' }, { status: 500 });
  }

  const headers = new Headers();
  headers.set('X-Registry-Model-Tier', 'CARPENTER');
  headers.set('X-Registry-Tool-Id', 'rook.harvest');

  return NextResponse.json(
    {
      success: true,
      location: result.location,
      found: result.found,
      saved: result.saved,
      errors: result.errors,
      businesses: result.businesses,
      ...('_telemetry' in result && result._telemetry ? { _telemetry: result._telemetry } : {}),
    },
    { headers }
  );
}
