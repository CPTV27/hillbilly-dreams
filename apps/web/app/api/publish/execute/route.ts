// apps/web/app/api/publish/execute/route.ts
// POST /api/publish/execute — execute a single publish job
//
// Body: { publishJobId: number }
// Looks up the PublishJob, finds the associated SocialPost and SocialAccount,
// calls the appropriate platform publisher, and updates statuses.

import { NextRequest, NextResponse } from 'next/server';
import { getPublisher } from '@/lib/social-publishers';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const publishJobId = body.publishJobId;
  if (!publishJobId || typeof publishJobId !== 'number') {
    return NextResponse.json({ error: 'publishJobId is required (number).' }, { status: 400 });
  }

  try {
    const { default: prisma } = await import('@bigmuddy/database');

    // Fetch the publish job
    const job = await (prisma as any).publishJob.findUnique({
      where: { id: publishJobId },
    });

    if (!job) {
      return NextResponse.json({ error: 'PublishJob not found.' }, { status: 404 });
    }

    if (job.status === 'published') {
      return NextResponse.json({ error: 'Job already published.', data: job }, { status: 409 });
    }

    if (job.status === 'cancelled') {
      return NextResponse.json({ error: 'Job was cancelled.' }, { status: 409 });
    }

    // Fetch the associated social post
    const post = await (prisma as any).socialPost.findUnique({
      where: { id: job.postId },
      include: { account: true },
    });

    if (!post) {
      await (prisma as any).publishJob.update({
        where: { id: publishJobId },
        data: { status: 'failed', error: 'Associated SocialPost not found.', attempts: job.attempts + 1 },
      });
      return NextResponse.json({ error: 'Associated SocialPost not found.' }, { status: 404 });
    }

    // Get the publisher for this platform
    const publisher = getPublisher(job.platform);
    if (!publisher) {
      await (prisma as any).publishJob.update({
        where: { id: publishJobId },
        data: { status: 'failed', error: `No publisher available for platform: ${job.platform}`, attempts: job.attempts + 1 },
      });
      return NextResponse.json({ error: `No publisher for platform: ${job.platform}` }, { status: 400 });
    }

    // Mark as processing
    await (prisma as any).publishJob.update({
      where: { id: publishJobId },
      data: { status: 'processing' },
    });

    // Execute the publish
    const result = await publisher.publish({
      content: post.content,
      mediaUrls: post.mediaUrls ?? [],
    });

    const now = new Date();

    if (result.success) {
      // Update PublishJob — success
      const updatedJob = await (prisma as any).publishJob.update({
        where: { id: publishJobId },
        data: {
          status: 'published',
          externalId: result.platformPostId ?? null,
          externalUrl: result.platformUrl ?? null,
          publishedAt: now,
          attempts: job.attempts + 1,
          error: null,
        },
      });

      // Update SocialPost status and URL
      await (prisma as any).socialPost.update({
        where: { id: post.id },
        data: {
          status: 'published',
          publishedAt: now,
          ...(result.platformUrl ? { postUrl: result.platformUrl } : {}),
        },
      });

      return NextResponse.json({
        data: updatedJob,
        result: { success: true, platformPostId: result.platformPostId, platformUrl: result.platformUrl },
      });
    } else {
      // Update PublishJob — failure
      const updatedJob = await (prisma as any).publishJob.update({
        where: { id: publishJobId },
        data: {
          status: 'failed',
          error: result.error ?? 'Unknown publish error',
          attempts: job.attempts + 1,
        },
      });

      // Update SocialPost status to failed
      await (prisma as any).socialPost.update({
        where: { id: post.id },
        data: { status: 'failed' },
      });

      return NextResponse.json({
        data: updatedJob,
        result: { success: false, error: result.error },
      }, { status: 502 });
    }
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ error: 'Database not available or migration pending.' }, { status: 503 });
    }
    console.error('[POST /api/publish/execute]', dbError);
    return NextResponse.json({ error: 'Failed to execute publish job.' }, { status: 500 });
  }
}
