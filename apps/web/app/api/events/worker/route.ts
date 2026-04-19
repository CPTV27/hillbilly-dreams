// apps/web/app/api/events/worker/route.ts
// Drain pending EventDelivery rows. Triggered by Vercel Cron every minute
// (see vercel.json). Vercel Cron invokes with GET + Authorization: Bearer $CRON_SECRET.
// Internal callers can POST with the same header.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { dispatcher } from '@bigmuddy/events';

function isAuthorizedCron(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    // No secret set — only allow outside production.
    return process.env.NODE_ENV !== 'production';
  }
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}

async function drain() {
  const result = await dispatcher.processBatch();
  return NextResponse.json({ data: result });
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    return await drain();
  } catch (err) {
    console.error('[GET /api/events/worker]', err);
    const message = err instanceof Error ? err.message : 'Worker failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    return await drain();
  } catch (err) {
    console.error('[POST /api/events/worker]', err);
    const message = err instanceof Error ? err.message : 'Worker failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
