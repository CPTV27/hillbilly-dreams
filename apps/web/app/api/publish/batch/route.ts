export const dynamic = 'force-dynamic';
// apps/web/app/api/publish/batch/route.ts
// POST /api/publish/batch — process all pending publish jobs whose scheduledAt <= now
//
// Designed to be called by:
// - A cron job (e.g., Vercel Cron, Cloud Scheduler)
// - Manual trigger from admin UI
// - A webhook or automation
//
// Returns: { processed, succeeded, failed, results[] }

import { NextRequest, NextResponse } from 'next/server';
import { getPublisher } from '@/lib/social-publishers';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

/** Vercel Cron / scheduler may call with `Authorization: Bearer ${CRON_SECRET}`; otherwise admin session. */
async function requireCronOrAdmin(request: NextRequest): Promise<NextResponse | null> {
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.CRON_SECRET &&
    authHeader === `Bearer ${process.env.CRON_SECRET}`
  ) {
    return null;
  }
  return requireAdmin();
}

export async function POST(request: NextRequest) {
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;

  try {

    const now = new Date();

    // Find all pending jobs that are due (scheduledAt <= now or scheduledAt is null)
    const pendingJobs = await (prisma as any).publishJob.findMany({
      where: {
        status: 'pending',
        OR: [
          { scheduledAt: { lte: now } },
          { scheduledAt: null },
        ],
      },
      orderBy: { createdAt: 'asc' as const },
    });

    if (pendingJobs.length === 0) {
      return NextResponse.json({ processed: 0, succeeded: 0, failed: 0, results: [] });
    }

    const results: Array<{ jobId: number; postId: number; platform: string; success: boolean; error?: string }> = [];
    let succeeded = 0;
    let failed = 0;

    for (const job of pendingJobs) {
      // Fetch associated post
      const post = await (prisma as any).socialPost.findUnique({
        where: { id: job.postId },
        include: { account: true },
      });

      if (!post) {
        await (prisma as any).publishJob.update({
          where: { id: job.id },
          data: { status: 'failed', error: 'Associated SocialPost not found.', attempts: job.attempts + 1 },
        });
        results.push({ jobId: job.id, postId: job.postId, platform: job.platform, success: false, error: 'Post not found' });
        failed++;
        continue;
      }

      const publisher = getPublisher(job.platform);
      if (!publisher) {
        await (prisma as any).publishJob.update({
          where: { id: job.id },
          data: { status: 'failed', error: `No publisher for platform: ${job.platform}`, attempts: job.attempts + 1 },
        });
        results.push({ jobId: job.id, postId: job.postId, platform: job.platform, success: false, error: `No publisher for: ${job.platform}` });
        failed++;
        continue;
      }

      // Mark as processing
      await (prisma as any).publishJob.update({
        where: { id: job.id },
        data: { status: 'processing' },
      });

      try {
        const result = await publisher.publish({
          content: post.content,
          mediaUrls: post.mediaUrls ?? [],
        });

        const publishTime = new Date();

        if (result.success) {
          await (prisma as any).publishJob.update({
            where: { id: job.id },
            data: {
              status: 'published',
              externalId: result.platformPostId ?? null,
              externalUrl: result.platformUrl ?? null,
              publishedAt: publishTime,
              attempts: job.attempts + 1,
              error: null,
            },
          });

          await (prisma as any).socialPost.update({
            where: { id: post.id },
            data: {
              status: 'published',
              publishedAt: publishTime,
              ...(result.platformUrl ? { postUrl: result.platformUrl } : {}),
            },
          });

          results.push({ jobId: job.id, postId: job.postId, platform: job.platform, success: true });
          succeeded++;
        } else {
          await (prisma as any).publishJob.update({
            where: { id: job.id },
            data: {
              status: 'failed',
              error: result.error ?? 'Unknown error',
              attempts: job.attempts + 1,
            },
          });

          await (prisma as any).socialPost.update({
            where: { id: post.id },
            data: { status: 'failed' },
          });

          results.push({ jobId: job.id, postId: job.postId, platform: job.platform, success: false, error: result.error });
          failed++;
        }
      } catch (publishErr) {
        const errMsg = publishErr instanceof Error ? publishErr.message : String(publishErr);
        await (prisma as any).publishJob.update({
          where: { id: job.id },
          data: {
            status: 'failed',
            error: `Unhandled error: ${errMsg}`,
            attempts: job.attempts + 1,
          },
        });
        results.push({ jobId: job.id, postId: job.postId, platform: job.platform, success: false, error: errMsg });
        failed++;
      }
    }

    return NextResponse.json({
      processed: pendingJobs.length,
      succeeded,
      failed,
      results,
    });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ error: 'Database not available or migration pending.' }, { status: 503 });
    }
    console.error('[POST /api/publish/batch]', dbError);
    return NextResponse.json({ error: 'Failed to process batch publish.' }, { status: 500 });
  }
}
