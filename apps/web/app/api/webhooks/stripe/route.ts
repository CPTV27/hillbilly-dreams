export const dynamic = 'force-dynamic';
// POST /api/webhooks/stripe — Marketplace / commerce checkout (#68).
// Configure a separate Stripe webhook endpoint with STRIPE_COMMERCE_WEBHOOK_SECRET
// (do not reuse billing or Connect secrets unless you intend a single endpoint).
//
// Expected checkout.session.completed metadata for fulfillment:
//   commerce = "marketplace"
//   storeId = MarketplaceStore.id (cuid)
//   supplySku = ApprovedSupply.sku
//   buyerUserId = User.id (cuid) — optional ledger row
//   affiliateUserId = User.id — optional; commission from AffiliateProgram.commissionRate
//   quantity = optional int, default 1

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { apiLog } from '@/lib/api-logger';

export async function POST(request: NextRequest) {
  const webhookSecret =
    process.env.STRIPE_COMMERCE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET_COMMERCE;
  if (!webhookSecret) {
    apiLog.warn('stripe/commerce-webhook', 'STRIPE_COMMERCE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };

  try {
    const Stripe = (await import('stripe' as string)).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-06-20' as unknown,
    });
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret) as typeof event;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    apiLog.error('stripe/commerce-webhook', 'signature verification failed', err, { message });
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    if (event.type !== 'checkout.session.completed') {
      return NextResponse.json({ received: true, handled: false });
    }

    const session = event.data.object as {
      id?: string;
      amount_total?: number;
      metadata?: Record<string, string | undefined>;
    };

    const meta = session.metadata || {};
    if (meta.commerce !== 'marketplace') {
      return NextResponse.json({ received: true, skipped: true, reason: 'not_commerce' });
    }

    const storeId = meta.storeId;
    const supplySku = meta.supplySku;
    if (!storeId || !supplySku) {
      apiLog.warn('stripe/commerce-webhook', 'missing storeId or supplySku', {
        sessionId: session.id,
      });
      return NextResponse.json({ received: true, skipped: true, reason: 'missing_metadata' });
    }

    const qty = Math.max(1, parseInt(meta.quantity || '1', 10) || 1);
    const amountTotal = session.amount_total ?? 0;

    await prisma.$transaction(async (tx) => {
      const supply = await tx.approvedSupply.findFirst({
        where: { storeId, sku: supplySku },
      });
      if (!supply) {
        throw new Error(`ApprovedSupply not found: ${storeId} / ${supplySku}`);
      }
      if (supply.inventory < qty) {
        throw new Error(`Insufficient inventory for ${supplySku}`);
      }

      await tx.approvedSupply.update({
        where: { id: supply.id },
        data: { inventory: { decrement: qty } },
      });

      const affiliateUserId = meta.affiliateUserId;
      if (affiliateUserId && amountTotal > 0) {
        const program = await tx.affiliateProgram.findUnique({ where: { storeId } });
        if (program) {
          const commissionCents = Math.floor(amountTotal * program.commissionRate);
          if (commissionCents > 0) {
            await tx.creditLedger.create({
              data: {
                userId: affiliateUserId,
                change: commissionCents,
                reason: 'affiliate_commission',
                metadata: {
                  sessionId: session.id,
                  storeId,
                  supplySku,
                  rate: program.commissionRate,
                } as object,
              },
            });
          }
        }
      }

    });

    apiLog.info('stripe/commerce-webhook', 'checkout.session.completed fulfilled', {
      sessionId: session.id,
      storeId,
      supplySku,
      qty,
    });

    return NextResponse.json({ received: true, fulfilled: true });
  } catch (err) {
    apiLog.error('stripe/commerce-webhook', 'processing error', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
