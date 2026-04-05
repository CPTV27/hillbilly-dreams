export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * GET /api/cron/social-publish
 * Publishes SocialPost rows with status=ready, scheduledAt set, and scheduledAt <= now.
 * Auth: Bearer CRON_SECRET (production).
 */

import { NextResponse } from 'next/server';
import { runDueSocialPublishBatch } from '@/lib/social-publish-run';
import { apiLog } from '@/lib/api-logger';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' &&
    (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`)
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await runDueSocialPublishBatch(25);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    apiLog.error('GET /api/cron/social-publish', 'failed', error);
    return NextResponse.json({ error: 'Social publish cron failed' }, { status: 500 });
  }
}
