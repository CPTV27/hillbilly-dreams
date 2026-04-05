export const dynamic = 'force-dynamic';
import { prisma } from '@bigmuddy/database';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { cloudLog } from '@/lib/cloud-logger';

export async function POST(req: Request) {
    const start = Date.now();
    const denied = await requireAdmin();
    if (denied) return denied;

    const { reviewId, response } = await req.json();
    if (!reviewId || !response) {
        return NextResponse.json({ error: 'reviewId and response required' }, { status: 400 });
    }

    const review = await prisma.review.update({
        where: { id: reviewId },
        data: {
            response,
            responseStatus: 'approved',
            respondedAt: new Date(),
        },
    });

    // Log the activity
    try {
        await prisma.opsActivity.create({
            data: {
                type: 'review_response',
                message: `Review response approved for ${review.author} (${review.platform}, ${review.rating}★)`,
            },
        });
    } catch {
        // opsActivity may not exist — non-fatal
    }

    cloudLog.info('/api/ops/reviews/approve', 'ok', {
      method: 'POST',
      reviewId,
      durationMs: Date.now() - start,
      success: true,
    });
    return NextResponse.json({ success: true, reviewId });
}
