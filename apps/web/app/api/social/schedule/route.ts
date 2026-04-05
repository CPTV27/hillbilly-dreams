export const dynamic = 'force-dynamic';
export const maxDuration = 120;

/**
 * POST /api/social/schedule
 * Creates SocialPost rows per SocialAccount and either publishes immediately (due now)
 * or leaves them for GET /api/cron/social-publish when scheduledAt is in the future.
 *
 * Body: {
 *   content: string,
 *   integrationIds: number[]  // SocialAccount.id values
 *   scheduleDate?: string      // ISO — future = cron; omit or past = publish now
 *   imageUrl?: string          // Appended to mediaUrls as single image
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { loadAndPublishPostById } from '@/lib/social-publish-run';
import { apiLog } from '@/lib/api-logger';

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: {
    content?: string;
    integrationIds?: unknown;
    scheduleDate?: string;
    imageUrl?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { content, scheduleDate, imageUrl } = body;
  const rawIds = body.integrationIds;

  if (!content?.trim()) {
    return NextResponse.json({ error: 'content required' }, { status: 400 });
  }

  const integrationIds = Array.isArray(rawIds)
    ? rawIds.map((x) => (typeof x === 'string' ? parseInt(x, 10) : Number(x))).filter((n) => Number.isFinite(n))
    : [];

  if (integrationIds.length === 0) {
    return NextResponse.json({ error: 'integrationIds (non-empty array of SocialAccount ids) required' }, { status: 400 });
  }

  const mediaUrls: string[] = [];
  if (imageUrl?.trim()) {
    mediaUrls.push(imageUrl.trim());
  }

  const when = scheduleDate ? new Date(scheduleDate) : new Date();
  if (Number.isNaN(when.getTime())) {
    return NextResponse.json({ error: 'Invalid scheduleDate' }, { status: 400 });
  }

  const now = new Date();
  const publishImmediately = when.getTime() <= now.getTime();

  try {
    const accounts = await prisma.socialAccount.findMany({
      where: { id: { in: integrationIds }, status: 'active' },
    });

    if (accounts.length === 0) {
      return NextResponse.json({ error: 'No matching active social accounts' }, { status: 400 });
    }

    const created: Array<{ id: number; accountId: number; published?: boolean; error?: string }> = [];

    for (const account of accounts) {
      const post = await prisma.socialPost.create({
        data: {
          accountId: account.id,
          content: content.trim(),
          mediaUrls,
          status: 'ready',
          scheduledAt: when,
          visibility: 'internal',
        },
      });

      if (publishImmediately) {
        const pub = await loadAndPublishPostById(post.id);
        created.push({
          id: post.id,
          accountId: account.id,
          published: pub.ok,
          error: pub.ok ? undefined : pub.error,
        });
      } else {
        created.push({ id: post.id, accountId: account.id });
      }
    }

    return NextResponse.json({
      success: true,
      publishImmediately,
      posts: created,
    });
  } catch (e) {
    apiLog.error('POST /api/social/schedule', 'failed', e);
    return NextResponse.json({ error: 'Scheduling failed' }, { status: 500 });
  }
}
