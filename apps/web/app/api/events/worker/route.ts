// apps/web/app/api/events/worker/route.ts
// POST — drain pending EventDelivery rows. Triggered by Vercel Cron every 30s.
// CRON_SECRET-gated (configured in vercel.ts crons + Authorization header).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { dispatcher } from '@bigmuddy/events';

export async function POST(request: NextRequest) {
  // Authenticate cron caller via secret header.
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await dispatcher.processBatch();
    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[POST /api/events/worker]', err);
    const message = err instanceof Error ? err.message : 'Worker failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
