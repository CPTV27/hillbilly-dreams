// apps/web/app/api/broadcast/agent/poll/route.ts
// POST — Mac mini broadcast agent polls for the next pending instruction.
// HMAC-secured via BROADCAST_AGENT_SECRET. Agent posts empty body; server
// returns next AgentInstruction (or { instruction: null } if empty queue).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { agentProtocol } from '@bigmuddy/broadcast';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing x-signature' }, { status: 400 });
  }
  try {
    agentProtocol.verifyRequest(body, signature);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const instruction = agentProtocol.dequeueNext();
  return NextResponse.json({
    data: { instruction, pendingAfter: agentProtocol.pendingCount() },
  });
}
