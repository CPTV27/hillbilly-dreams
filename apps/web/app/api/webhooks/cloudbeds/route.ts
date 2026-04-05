export const dynamic = 'force-dynamic';
// app/api/webhooks/cloudbeds/route.ts
// Receives webhook events from Cloudbeds PMS
// Events: reservation/created, reservation/status_changed, reservation/dates_changed,
//         reservation/accommodation_changed, reservation/deleted
// Triggers: metric updates, welcome emails, ops activity feed, dynamic pricing recalc

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { apiLog } from '@/lib/api-logger';

// ── Webhook Event Types ──

interface CloudbedsWebhookPayload {
  event: string;
  propertyID: string;
  reservationID?: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

// ── Signature Verification ──

function verifyWebhookSignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}

// ── POST /api/webhooks/cloudbeds ──

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.CLOUDBEDS_WEBHOOK_SECRET;

  // Verify signature if secret is configured
  if (secret) {
    const signature = request.headers.get('x-cloudbeds-signature')
      || request.headers.get('x-webhook-signature');

    if (!verifyWebhookSignature(rawBody, signature, secret)) {
      apiLog.warn('webhook/cloudbeds', 'invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let payload: CloudbedsWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { event, reservationID } = payload;
  apiLog.info('webhook/cloudbeds', 'event received', { event, reservationId: reservationID ?? 'n/a' });

  try {

    switch (event) {
      // ── New Booking ──
      case 'reservation/created': {
        // 1. Log to ops activity feed
        await prisma.opsActivity.create({
          data: {
            type: 'booking',
            message: `New reservation ${reservationID} — Cloudbeds booking received`,
          },
        }).catch(() => {
          apiLog.info('webhook/cloudbeds', 'opsActivity write skipped');
        });

        // 2. Queue occupancy metric recalculation
        await upsertMetricFlag(prisma, 'inn_metrics_stale', 1);

        // 3. GitHub#207 — Trigger welcome email sequence via gmail-service
        // 4. GitHub#208 — Check occupancy threshold for dynamic pricing trigger

        apiLog.info('webhook/cloudbeds', 'new booking processed', { reservationId: reservationID });
        break;
      }

      // ── Status Change (cancel, check-in, check-out, no-show) ──
      case 'reservation/status_changed': {
        const newStatus = payload.data?.status as string || 'unknown';

        await prisma.opsActivity.create({
          data: {
            type: 'booking_update',
            message: `Reservation ${reservationID} → ${newStatus}`,
          },
        }).catch(() => {
          apiLog.info('webhook/cloudbeds', 'opsActivity write skipped');
        });

        // Cancellations and check-outs may open rooms → recalc pricing
        if (newStatus === 'canceled' || newStatus === 'checked_out') {
          await upsertMetricFlag(prisma, 'inn_metrics_stale', 1);
        }

        apiLog.info('webhook/cloudbeds', 'status change', { reservationId: reservationID, newStatus });
        break;
      }

      // ── Date Change ──
      case 'reservation/dates_changed': {
        await upsertMetricFlag(prisma, 'inn_metrics_stale', 1);
        apiLog.info('webhook/cloudbeds', 'dates changed', { reservationId: reservationID });
        break;
      }

      // ── Room Reassignment ──
      case 'reservation/accommodation_changed': {
        apiLog.info('webhook/cloudbeds', 'room reassignment', { reservationId: reservationID });
        break;
      }

      // ── Deletion ──
      case 'reservation/deleted': {
        await upsertMetricFlag(prisma, 'inn_metrics_stale', 1);
        apiLog.info('webhook/cloudbeds', 'reservation deleted', { reservationId: reservationID });
        break;
      }

      default:
        apiLog.info('webhook/cloudbeds', 'unhandled event', { event });
    }

    return NextResponse.json({ received: true, event });
  } catch (error) {
    apiLog.error('webhook/cloudbeds', 'processing error', error);
    // Always return 200 to prevent Cloudbeds from retrying
    return NextResponse.json({ received: true, error: 'Processing failed' });
  }
}

// ── Helper: Upsert a metric flag to trigger recalculation ──

async function upsertMetricFlag(prisma: any, key: string, value: number) {
  try {
    await prisma.metric.upsert({
      where: { key },
      update: { value, updatedAt: new Date() },
      create: { key, value, source: 'cloudbeds', label: key },
    });
  } catch {
    apiLog.info('webhook/cloudbeds', 'could not upsert metric', { key });
  }
}
