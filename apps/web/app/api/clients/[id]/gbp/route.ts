export const dynamic = 'force-dynamic';
// POST /api/clients/:id/gbp — Google Business Profile write helpers (#108).
// v1: postReviewReply (requires SocialAccount google_business + platformId accounts/.../locations/...).

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { postGbpReviewReply } from '@/lib/gbp-review-reply';
import { apiLog } from '@/lib/api-logger';

type Params = { params: { id: string } };

export async function POST(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const clientId = parseInt(params.id, 10);
  if (Number.isNaN(clientId)) {
    return NextResponse.json({ error: 'Invalid client id' }, { status: 400 });
  }

  let body: { action?: string; reviewId?: number; comment?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (body.action !== 'postReviewReply') {
    return NextResponse.json(
      {
        error: 'Unsupported action',
        supported: ['postReviewReply'],
        roadmap: ['updateRegularHours', 'uploadPhoto', 'updateCategories'],
      },
      { status: 400 },
    );
  }

  const reviewId = body.reviewId;
  const comment = body.comment?.trim();
  if (!reviewId || !comment) {
    return NextResponse.json({ error: 'reviewId and comment required' }, { status: 400 });
  }

  try {
    const review = await prisma.review.findFirst({
      where: { id: reviewId, clientId, platform: 'google' },
    });
    if (!review) {
      return NextResponse.json({ error: 'Google review not found for this client' }, { status: 404 });
    }

    const gbpAccount = await prisma.socialAccount.findFirst({
      where: {
        clientId,
        platform: { in: ['google_business', 'google'] },
        status: 'active',
      },
    });

    if (!gbpAccount?.accessToken || !gbpAccount.platformId) {
      return NextResponse.json(
        { error: 'No active Google Business SocialAccount with platformId (accounts/.../locations/...) and token' },
        { status: 409 },
      );
    }

    const result = await postGbpReviewReply({
      accessToken: gbpAccount.accessToken,
      locationResourceName: gbpAccount.platformId,
      reviewExternalId: review.externalId,
      comment,
    });

    if (!result.ok) {
      apiLog.warn('gbp/review-reply', 'GBP reply failed', { clientId, reviewId, error: result.error });
      return NextResponse.json({ error: result.error, raw: result.raw }, { status: 502 });
    }

    await prisma.review.update({
      where: { id: review.id },
      data: {
        response: comment,
        responseStatus: 'posted',
        respondedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    apiLog.error('gbp/route', 'unexpected error', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
