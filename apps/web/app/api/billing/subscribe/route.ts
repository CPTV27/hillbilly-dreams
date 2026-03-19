// apps/web/app/api/billing/subscribe/route.ts
// POST /api/billing/subscribe — create a Stripe checkout session for a client

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const TIER_PRICES: Record<string, { amount: number; name: string }> = {
  'front-porch': { amount: 9900, name: 'Front Porch — $99/month' },
  'route': { amount: 29900, name: 'The Route — $299/month' },
  'river-room': { amount: 59900, name: 'River Room — $599/month' },
  'blues-room': { amount: 120000, name: 'The Blues Room — $1,200/month' },
};

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'STRIPE_SECRET_KEY not configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const clientId = body.clientId as number;
  if (!clientId) {
    return NextResponse.json({ error: 'clientId is required.' }, { status: 400 });
  }

  try {
    const client = await (prisma as any).client.findUnique({ where: { id: clientId } });
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

    const tierInfo = TIER_PRICES[client.tier] ?? TIER_PRICES['front-porch'];

    const Stripe = (await import('stripe' as string)).default;
    const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' as unknown });

    // Create or retrieve Stripe customer
    let customerId = client.stripeCustomerId as string | null;
    if (!customerId) {
      const customer = await stripe.customers.create({
        name: client.name,
        email: client.contactEmail || client.email || undefined,
        metadata: { clientId: String(client.id), tier: client.tier },
      });
      customerId = customer.id;
      await (prisma as any).client.update({
        where: { id: clientId },
        data: { stripeCustomerId: customerId },
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://admin.bigmuddytouring.com';

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Big Muddy Media — ${tierInfo.name}`,
            description: `Media services for ${client.name}`,
          },
          unit_amount: tierInfo.amount,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      success_url: `${baseUrl}/admin/clients?success=true&client=${clientId}`,
      cancel_url: `${baseUrl}/admin/clients?cancelled=true&client=${clientId}`,
      metadata: { clientId: String(clientId) },
    });

    return NextResponse.json({ data: { url: session.url, sessionId: session.id } });
  } catch (err) {
    console.error('[POST /api/billing/subscribe]', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
