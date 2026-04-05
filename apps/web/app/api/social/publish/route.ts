export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * POST /api/social/publish
 * Publish a single SocialPost by ID (status must be ready).
 * Auth: admin session or Bearer CRON_SECRET.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireCronOrAdmin } from '@/lib/cron-or-admin';
import { loadAndPublishPostById } from '@/lib/social-publish-run';
import { apiLog } from '@/lib/api-logger';
import { cloudLog } from '@/lib/cloud-logger';

export async function POST(request: NextRequest) {
  const start = Date.now();
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;

  let body: { postId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const postId = body.postId;
  if (postId == null || typeof postId !== 'number' || !Number.isFinite(postId)) {
    return NextResponse.json({ error: 'postId (number) is required' }, { status: 400 });
  }

  try {
    const post = await prisma.socialPost.findUnique({
      where: { id: postId },
      include: { account: true },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (post.status === 'published') {
      return NextResponse.json(
        { error: 'Post already published', postUrl: post.postUrl },
        { status: 409 }
      );
    }

    if (!post.account.accessToken) {
      return NextResponse.json(
        {
          error: `No access token on account ${post.account.handle} (${post.account.platform}). Connect the account first.`,
        },
        { status: 422 }
      );
    }

    const result = await loadAndPublishPostById(postId);

    if (!result.ok) {
      return NextResponse.json({ success: false, error: result.error, code: result.code }, { status: 502 });
    }

    const updated = await prisma.socialPost.findUnique({
      where: { id: postId },
      include: { account: { select: { id: true, platform: true, handle: true } } },
    });

    cloudLog.info('/api/social/publish', 'ok', {
      method: 'POST',
      postId,
      durationMs: Date.now() - start,
      success: true,
    });
    return NextResponse.json({ success: true, postUrl: result.postUrl, data: updated });
  } catch (error) {
    apiLog.error('POST /api/social/publish', 'failed', error);
    cloudLog.error('/api/social/publish', 'failed', error, { durationMs: Date.now() - start, success: false });
    return NextResponse.json({ error: 'Publish failed' }, { status: 500 });
  }
}
