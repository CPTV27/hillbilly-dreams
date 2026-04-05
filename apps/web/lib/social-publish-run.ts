/**
 * DB-backed publish runner — used by POST /api/social/publish, schedule, and cron.
 */

import { prisma } from '@/lib/db';
import { publishPost } from '@/lib/social-publisher';
import { apiLog } from '@/lib/api-logger';

export type RunPublishResult =
  | { ok: true; postUrl: string }
  | { ok: false; error: string; code?: string };

function accountForPublish(account: {
  id: number;
  platform: string;
  handle: string;
  platformId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: Date | null;
}) {
  return {
    id: account.id,
    platform: account.platform,
    handle: account.handle,
    platformId: account.platformId,
    accessToken: account.accessToken,
    refreshToken: account.refreshToken,
    tokenExpiry: account.tokenExpiry,
  };
}

export async function loadAndPublishPostById(postId: number): Promise<RunPublishResult> {
  const post = await prisma.socialPost.findUnique({
    where: { id: postId },
    include: { account: true },
  });

  if (!post) {
    return { ok: false, error: 'Post not found', code: 'not_found' };
  }

  if (post.status !== 'ready') {
    return { ok: false, error: `Post must be status "ready", got "${post.status}"`, code: 'bad_status' };
  }

  if (post.account.status !== 'active') {
    return { ok: false, error: 'Social account is not active', code: 'inactive_account' };
  }

  const result = await publishPost(
    accountForPublish(post.account),
    post.content,
    post.mediaUrls ?? []
  );

  if (!result.success) {
    await prisma.socialPost.update({
      where: { id: postId },
      data: { status: 'failed' },
    });
    return { ok: false, error: result.error ?? 'Publish failed', code: 'platform_error' };
  }

  const postUrl = result.postUrl?.trim() || '';

  await prisma.socialPost.update({
    where: { id: postId },
    data: {
      status: 'published',
      postUrl: postUrl || null,
      publishedAt: new Date(),
    },
  });

  return { ok: true, postUrl: postUrl || '(published — no URL returned)' };
}

export async function findDueReadyPosts(limit: number) {
  const now = new Date();
  return prisma.socialPost.findMany({
    where: {
      status: 'ready',
      AND: [{ scheduledAt: { not: null } }, { scheduledAt: { lte: now } }],
    },
    include: { account: true },
    take: limit,
    orderBy: [{ scheduledAt: 'asc' }, { id: 'asc' }],
  });
}

export async function runDueSocialPublishBatch(limit = 25): Promise<{
  processed: number;
  published: number;
  failed: number;
  skipped: number;
  results: Array<{ postId: number; status: string; error?: string }>;
}> {
  const candidates = await findDueReadyPosts(limit);
  const results: Array<{ postId: number; status: string; error?: string }> = [];
  let published = 0;
  let failed = 0;
  let skipped = 0;

  for (const post of candidates) {
    if (post.account.status !== 'active' || !post.account.accessToken) {
      skipped += 1;
      results.push({
        postId: post.id,
        status: 'skipped',
        error: 'inactive_account_or_no_token',
      });
      continue;
    }

    const pub = await loadAndPublishPostById(post.id);
    if (!pub.ok) {
      failed += 1;
      results.push({ postId: post.id, status: 'failed', error: pub.error });
    } else {
      published += 1;
      results.push({ postId: post.id, status: 'published' });
    }
  }

  if (candidates.length > 0) {
    apiLog.info('social-publish-batch', 'cron batch complete', {
      processed: candidates.length,
      published,
      failed,
      skipped,
    });
  }

  return {
    processed: candidates.length,
    published,
    failed,
    skipped,
    results,
  };
}
