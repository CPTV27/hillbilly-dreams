export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { ModelTier } from '@/lib/ai/modelTier';
import { peelBudgetFields, toolRegistry } from '@/lib/agent/toolRegistry';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

/** POST /api/agent/orchestrate — thin edge; core logic in `executeOrchestrate` + registry dispatch. */
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const orchestrator = toolRegistry.get('rook.orchestrate');
  if (!orchestrator) {
    return NextResponse.json({ error: 'Orchestrator not configured' }, { status: 500 });
  }

  const { rest, opts } = peelBudgetFields(raw);
  const result = await orchestrator.execute(rest, opts);
  if (isRecord(result) && result.error === 'validation_failed') {
    return NextResponse.json(result, { status: 400 });
  }
  if (isRecord(result) && result.success === false) {
    const status = result.error === 'Budget Exceeded' ? 402 : 500;
    return NextResponse.json({ error: result.error, detail: result.detail }, { status });
  }
  const headers = new Headers();
  headers.set('X-Registry-Model-Tier', ModelTier.ARCHITECT);
  headers.set('X-Registry-Tool-Id', 'rook.orchestrate');

  return NextResponse.json(result, { headers });
}
