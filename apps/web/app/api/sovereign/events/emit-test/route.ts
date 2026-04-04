export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { EventProducer } from '@/lib/agent/eventProducer';

/**
 * Smoke-test Socket.io emits when the app is running under `pnpm dev:hub` on the Hub.
 * POST body: { sessionId?: string, mode?: "enterprise" | "standard" }
 */
export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { sessionId?: string; mode?: 'enterprise' | 'standard' } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    /* empty */
  }

  const sessionId = typeof body.sessionId === 'string' && body.sessionId.trim() ? body.sessionId.trim() : 'smoke-test';
  const mode = body.mode === 'standard' ? 'standard' : 'enterprise';

  EventProducer.sessionInit(sessionId, mode);
  EventProducer.reasoningDelta('(smoke) reasoning stream check — ');
  EventProducer.reasoningDelta('Enterprise Lore path online.\n');
  EventProducer.loreCitation('studio-c-signal-chain-manual.md', '(smoke) ribbon mic / phantom power excerpt…', 0.91);
  EventProducer.messageFinal('(smoke) Final: connect a kiosk with join_session and watch sovereign_event payloads.');

  return NextResponse.json({
    ok: true,
    hint: 'Requires Hub boot via pnpm dev:hub; join_session(sessionId) then POST this route.',
    sessionId,
    mode,
  });
}
