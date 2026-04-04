export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// GET /api/cron/social-publish
// Publishes all SocialPosts with status=ready and scheduledAt <= now.
// Auth: CRON_SECRET bearer token.

import { NextResponse } from 'next/server';
import { publishScheduledPosts } from '@/lib/social-publisher';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await publishScheduledPosts();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('[cron/social-publish]', error);
    return NextResponse.json({ error: 'Social publish cron failed' }, { status: 500 });
  }
}
