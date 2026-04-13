export const dynamic = 'force-dynamic';
export const maxDuration = 300;

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { apiLog } from '@/lib/api-logger';

// ─────────────────────────────────────────────────────────────
// Review Sync Cron — Pulls Google Business Profile reviews
// ─────────────────────────────────────────────────────────────
// Runs hourly via Vercel Cron. For each DSD client with a
// connected Google Business account, fetches new reviews from
// the My Business API and upserts them into the Review table.
//
// The admin review UI + AI draft generator + reply poster all
// exist — this cron is the missing piece that feeds them.
// ─────────────────────────────────────────────────────────────

const GBP_API = 'https://mybusiness.googleapis.com/v4';

interface GbpReview {
  reviewId: string;
  reviewer: { displayName: string };
  starRating: string; // ONE | TWO | THREE | FOUR | FIVE
  comment?: string;
  createTime: string;
  updateTime: string;
  reviewReply?: { comment: string; updateTime: string };
}

const STAR_MAP: Record<string, number> = {
  ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5,
};

async function refreshGoogleToken(accountId: number, refreshToken: string): Promise<string | null> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) return null;

  const data = await res.json();
  await prisma.socialAccount.update({
    where: { id: accountId },
    data: {
      accessToken: data.access_token,
      tokenExpiry: new Date(Date.now() + data.expires_in * 1000),
    },
  });

  return data.access_token;
}

async function fetchReviews(
  accessToken: string,
  locationResourceName: string
): Promise<GbpReview[]> {
  const url = `${GBP_API}/${locationResourceName}/reviews?pageSize=50`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    throw new Error(`GBP API ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.reviews || [];
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV !== 'development' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Array<{
    client: string;
    platform: string;
    fetched: number;
    new: number;
    error?: string;
  }> = [];

  try {
    // Find all connected Google Business accounts
    const gbpAccounts = await prisma.socialAccount.findMany({
      where: {
        platform: 'google_business',
        status: 'active',
        platformId: { not: null },
        accessToken: { not: null },
      },
    });

    for (const account of gbpAccounts) {
      const clientName = account.handle || `client-${account.clientId}`;

      try {
        let token = account.accessToken!;

        // Refresh if expired or expiring within 5 minutes
        if (
          account.tokenExpiry &&
          account.tokenExpiry.getTime() < Date.now() + 5 * 60 * 1000 &&
          account.refreshToken
        ) {
          const refreshed = await refreshGoogleToken(account.id, account.refreshToken);
          if (!refreshed) {
            results.push({ client: clientName, platform: 'google', fetched: 0, new: 0, error: 'Token refresh failed' });
            continue;
          }
          token = refreshed;
        }

        const reviews = await fetchReviews(token, account.platformId!);
        let newCount = 0;

        for (const review of reviews) {
          const rating = STAR_MAP[review.starRating] || 0;
          if (!rating) continue; // Skip invalid ratings

          // Upsert — if the review already exists (by externalId), update it;
          // otherwise create a new one. This handles edited reviews too.
          const existing = await prisma.review.findUnique({
            where: { externalId: review.reviewId },
          });

          if (!existing) {
            await prisma.review.create({
              data: {
                clientId: account.clientId!,
                platform: 'google',
                externalId: review.reviewId,
                author: review.reviewer?.displayName || 'Anonymous',
                rating,
                text: review.comment || null,
                responseStatus: review.reviewReply ? 'posted' : 'pending',
                response: review.reviewReply?.comment || null,
                respondedAt: review.reviewReply ? new Date(review.reviewReply.updateTime) : null,
                postedAt: new Date(review.createTime),
              },
            });
            newCount++;
          } else if (existing.text !== (review.comment || null)) {
            // Review was edited by the customer — update text
            await prisma.review.update({
              where: { id: existing.id },
              data: {
                text: review.comment || null,
                updatedAt: new Date(),
              },
            });
          }
        }

        results.push({
          client: clientName,
          platform: 'google',
          fetched: reviews.length,
          new: newCount,
        });

        apiLog.info('cron/reviews-sync', `${clientName}: ${reviews.length} fetched, ${newCount} new`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        results.push({ client: clientName, platform: 'google', fetched: 0, new: 0, error: msg });
        apiLog.warn('cron/reviews-sync', `${clientName} failed: ${msg}`);
      }
    }

    const totalNew = results.reduce((sum, r) => sum + r.new, 0);
    return NextResponse.json({
      success: true,
      accounts: gbpAccounts.length,
      totalNew,
      results,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    apiLog.error('cron/reviews-sync', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
