export const dynamic = 'force-dynamic';
// app/api/webhooks/cloudbeds/route.ts
// Receives webhook events from Cloudbeds PMS
// Events: reservation/created, reservation/status_changed, reservation/dates_changed,
//         reservation/accommodation_changed, reservation/deleted
// Triggers: metric updates, welcome emails, ops activity feed, dynamic pricing recalc

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';

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
      console.warn('[webhook/cloudbeds] Invalid signature');
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
  console.log(`[webhook/cloudbeds] ${event} — reservation: ${reservationID || 'n/a'}`);

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
          console.log(`[webhook/cloudbeds] opsActivity write skipped`);
        });

        // 2. Queue occupancy metric recalculation
        await upsertMetricFlag(prisma, 'inn_metrics_stale', 1);

        // 3. TODO: Trigger welcome email sequence via gmail-service
        // 4. TODO: Check occupancy threshold for dynamic pricing trigger

        console.log(`[webhook/cloudbeds] New booking processed: ${reservationID}`);
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
          console.log(`[webhook/cloudbeds] opsActivity write skipped`);
        });

        // Cancellations and check-outs may open rooms → recalc pricing
        if (newStatus === 'canceled' || newStatus === 'checked_out') {
          await upsertMetricFlag(prisma, 'inn_metrics_stale', 1);
        }

        console.log(`[webhook/cloudbeds] Status change: ${reservationID} → ${newStatus}`);
        break;
      }

      // ── Date Change ──
      case 'reservation/dates_changed': {
        await upsertMetricFlag(prisma, 'inn_metrics_stale', 1);
        console.log(`[webhook/cloudbeds] Dates changed: ${reservationID}`);
        break;
      }

      // ── Room Reassignment ──
      case 'reservation/accommodation_changed': {
        console.log(`[webhook/cloudbeds] Room reassignment: ${reservationID}`);
        break;
      }

      // ── Deletion ──
      case 'reservation/deleted': {
        await upsertMetricFlag(prisma, 'inn_metrics_stale', 1);
        console.log(`[webhook/cloudbeds] Reservation deleted: ${reservationID}`);
        break;
      }

      default:
        console.log(`[webhook/cloudbeds] Unhandled event: ${event}`);
    }

    return NextResponse.json({ received: true, event });
  } catch (error) {
    console.error('[webhook/cloudbeds] Processing error:', error);
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
    console.log(`[webhook/cloudbeds] Could not upsert metric: ${key}`);
  }
}
