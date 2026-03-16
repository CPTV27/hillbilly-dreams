// apps/web/app/api/billing/webhook/route.ts
// POST /api/billing/webhook — Stripe webhook handler
// Handles: invoice.paid, invoice.payment_failed, customer.subscription.updated/deleted

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecret) {
    console.warn('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  try {
    // Dynamic import to avoid bundling Stripe in all routes
    const Stripe = (await import('stripe' as string)).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' as unknown });

    const event = stripe.webhooks.constructEvent(body, signature, stripeSecret);

    const { default: prisma } = await import('@bigmuddy/database');

    switch (event.type) {
      case 'invoice.paid': {
        const invoice = event.data.object as { id: string; amount_paid: number; hosted_invoice_url?: string };
        await (prisma as any).invoice.updateMany({
          where: { stripeInvoiceId: invoice.id },
          data: {
            status: 'paid',
            paidAt: new Date(),
            amount: invoice.amount_paid,
            pdfUrl: invoice.hosted_invoice_url ?? null,
          },
        });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as { id: string };
        await (prisma as any).invoice.updateMany({
          where: { stripeInvoiceId: invoice.id },
          data: { status: 'uncollectible' },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as { customer: string };
        // Pause client when subscription is cancelled
        await (prisma as any).client.updateMany({
          where: { stripeCustomerId: sub.customer as string },
          data: { status: 'paused' },
        });
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[Stripe Webhook]', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
  }
}
