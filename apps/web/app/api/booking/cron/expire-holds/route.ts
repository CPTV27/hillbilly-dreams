// apps/web/app/api/booking/cron/expire-holds/route.ts
// Sweep expired Booking holds — cancels any held rows past their heldUntil
// deadline and returns the reserved capacity to inventory. Vercel Cron
// invokes GET every 10 minutes (see vercel.json).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { bookings } from '@bigmuddy/booking';

function isAuthorizedCron(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== 'production';
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const result = await bookings.expireOldHolds();
    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[GET /api/booking/cron/expire-holds]', err);
    const message = err instanceof Error ? err.message : 'Expire holds failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
