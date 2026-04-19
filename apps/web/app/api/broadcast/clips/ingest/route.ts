// apps/web/app/api/broadcast/clips/ingest/route.ts
// POST — Mac mini agent uploads a clip to GCS and registers metadata here.
// HMAC-secured via BROADCAST_AGENT_SECRET.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { agentProtocol, clips } from '@bigmuddy/broadcast';

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
    broadcastId: string;
    sequence: number;
    startSec: number;
    endSec: number;
    videoUrl: string;
    thumbnailUrl?: string;
  };
  try {
    parsed = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const clip = await clips.ingest(parsed);
    return NextResponse.json({ data: clip });
  } catch (err) {
    console.error('[POST /api/broadcast/clips/ingest]', err);
    const message = err instanceof Error ? err.message : 'Ingest failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
