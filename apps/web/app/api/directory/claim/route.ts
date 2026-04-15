export const dynamic = 'force-dynamic';
// apps/web/app/api/directory/claim/route.ts
// POST /api/directory/claim — create or claim a Client record in the directory.
// If a paid tier is selected, creates a Stripe checkout session and returns the URL.
// If free tier, creates the Client directly and returns success.
//
// Also supports GET ?q=search+term for business search.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { directoryClaimSchema, formatZodError } from '@/lib/user-post-validation';
import { apiLog } from '@/lib/api-logger';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ── GET: search existing businesses ──────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ data: [] });
  }

  try {

    const clients = await (prisma as any).client.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { city: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 10,
      orderBy: { name: 'asc' as const },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        state: true,
        businessType: true,
        tier: true,
        status: true,
      },
    });

    return NextResponse.json({ data: clients });
  } catch (e) {
    const msg = String(e);
    if (
      msg.includes('Cannot read properties of undefined') ||
      msg.includes('datasource') ||
      msg.includes('DATABASE_URL') ||
      msg.includes('Cannot find module') ||
      msg.includes('P1001') ||
      msg.includes('does not exist')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    apiLog.error('GET /api/directory/claim', 'search failed', e);
    return NextResponse.json({ error: 'Search failed.' }, { status: 500 });
  }
}

// ── POST: create or claim a listing ──────────────────────────────────────────

/** Stripe checkout line items — amounts in cents; keys match directoryClaimSchema paid tiers */
const TIER_PRICES: Record<string, { amount: number; name: string }> = {
  route: { amount: 2500, name: 'Essentials — $25/month' },
  'river-room': { amount: 5000, name: 'Pro — $50/month' },
  'blues-room': { amount: 25000, name: 'Engine — $250/month' },
};

interface ClaimBody {
  name: string;
  businessType: string;
  city: string;
  state?: string;
  address?: string;
  phone?: string;
  email?: string;
  contactName?: string;
  website?: string;
  description?: string;
  tier: string;
  existingClientId?: number;
}

export async function POST(request: NextRequest) {
  let body: ClaimBody;
  try {
    const raw = await request.json();
    const parsed = directoryClaimSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: formatZodError(parsed.error) }, { status: 400 });
    }
    body = parsed.data as ClaimBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, businessType, city, tier } = body;

  try {

    let client: any;

    if (body.existingClientId) {
      // Claim an existing listing
      client = await (prisma as any).client.findUnique({
        where: { id: body.existingClientId },
      });
      if (!client) {
        return NextResponse.json({ error: 'Business not found.' }, { status: 404 });
      }
      // Update with submitted details
      client = await (prisma as any).client.update({
        where: { id: body.existingClientId },
        data: {
          tier: tier === 'free' ? 'front-porch' : tier,
          contactName: body.contactName || undefined,
          contactEmail: body.email || undefined,
          contactPhone: body.phone || undefined,
          description: body.description || client.description,
          address: body.address || client.address,
          phone: body.phone || client.phone,
          email: body.email || client.email,
          website: body.website || client.website,
        },
      });
    } else {
      // Create a new listing
      const slug = slugify(name);

      // Check for slug collision
      const existing = await (prisma as any).client.findUnique({ where: { slug } });
      const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

      client = await (prisma as any).client.create({
        data: {
          name,
          slug: finalSlug,
          tier: tier === 'free' ? 'front-porch' : tier,
          businessType,
          city,
          state: body.state || 'MS',
          address: body.address || null,
          phone: body.phone || null,
          email: body.email || null,
          website: body.website || null,
          description: body.description || null,
          contactName: body.contactName || null,
          contactEmail: body.email || null,
          contactPhone: body.phone || null,
          status: tier === 'free' ? 'active' : 'onboarding',
          platforms: [],
        },
      });
    }

    // Free tier — listing is live immediately
    if (tier === 'free') {
      return NextResponse.json({
        data: {
          clientId: client.id,
          slug: client.slug,
          status: 'created',
        },
      });
    }

    // Paid tier — create Stripe checkout session
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      // No Stripe configured — still create the listing, flag for manual follow-up
      return NextResponse.json({
        data: {
          clientId: client.id,
          slug: client.slug,
          status: 'created-pending-payment',
          message: 'Listing created. Payment setup will be completed shortly.',
        },
      });
    }

    const tierInfo = TIER_PRICES[tier];
    if (!tierInfo) {
      apiLog.warn('POST /api/directory/claim', 'unknown paid tier for checkout', { tier });
      return NextResponse.json(
        { error: 'This tier is handled through a different signup path.' },
        { status: 400 },
      );
    }
    const Stripe = (await import('stripe' as string)).default;
    const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' as unknown });

    // Create or retrieve Stripe customer
    let customerId = client.stripeCustomerId as string | null;
    if (!customerId) {
      const customer = await stripe.customers.create({
        name: client.name,
        email: body.email || undefined,
        metadata: { clientId: String(client.id), tier },
      });
      customerId = customer.id;
      await (prisma as any).client.update({
        where: { id: client.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Deep South Directory — ${tierInfo.name}`,
              description: `Directory listing for ${client.name}`,
            },
            unit_amount: tierInfo.amount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/media/directory/${client.slug}?welcome=true`,
      cancel_url: `${baseUrl}/media/directory/claim?cancelled=true`,
      metadata: { clientId: String(client.id) },
    });

    return NextResponse.json({
      data: {
        clientId: client.id,
        slug: client.slug,
        status: 'checkout',
        checkoutUrl: session.url,
      },
    });
  } catch (e) {
    const msg = String(e);
    if (
      msg.includes('Cannot read properties of undefined') ||
      msg.includes('datasource') ||
      msg.includes('DATABASE_URL') ||
      msg.includes('Cannot find module') ||
      msg.includes('P1001') ||
      msg.includes('does not exist')
    ) {
      return NextResponse.json(
        { error: 'Database not available. Please try again later.' },
        { status: 503 },
      );
    }
    apiLog.error('POST /api/directory/claim', 'claim failed', e);
    return NextResponse.json({ error: 'Failed to create listing.' }, { status: 500 });
  }
}
