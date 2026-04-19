// apps/web/app/api/broadcast/agent/ack/route.ts
// POST — Mac mini agent reports completion of an instruction.
// HMAC-secured via BROADCAST_AGENT_SECRET.

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

  let parsed: {
    instructionId: string;
    success: boolean;
    result?: Record<string, unknown>;
    error?: string;
    completedAt?: string;
  };
  try {
    parsed = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  agentProtocol.recordAck({
    instructionId: parsed.instructionId,
    success: parsed.success,
    result: parsed.result,
    error: parsed.error,
    completedAt: parsed.completedAt ?? new Date().toISOString(),
  });

  return NextResponse.json({ data: { recorded: true } });
}
