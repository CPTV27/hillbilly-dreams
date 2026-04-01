export const dynamic = 'force-dynamic';
// apps/web/app/api/connect/onboard/route.ts
// POST /api/connect/onboard — Start Stripe Connect onboarding for a directory client

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const clientId = typeof body.clientId === 'number' ? body.clientId : parseInt(String(body.clientId), 10);
  if (isNaN(clientId)) {
    return NextResponse.json({ error: 'clientId is required.' }, { status: 400 });
  }

  try {
    const Stripe = (await import('stripe' as string)).default;

    const client = await (prisma as any).client.findUnique({ where: { id: clientId } });
    if (!client) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-06-20' as unknown,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hillbillydreamsinc.com';
    let connectAccountId = client.stripeConnectId;

    // Create a new Connect account if one doesn't exist
    if (!connectAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        metadata: { clientId: String(clientId), clientName: client.name },
        ...(client.email ? { email: client.email } : {}),
        business_profile: {
          name: client.name,
          ...(client.website ? { url: client.website } : {}),
        },
      });

      connectAccountId = account.id;

      // Update Client with Connect ID
      await (prisma as any).client.update({
        where: { id: clientId },
        data: {
          stripeConnectId: connectAccountId,
          connectStatus: 'pending',
        },
      });

      // Create or update ClientIntegration record
      await (prisma as any).clientIntegration.upsert({
        where: { clientId_provider: { clientId, provider: 'stripe' } },
        create: {
          clientId,
          provider: 'stripe',
          status: 'pending',
          accountId: connectAccountId,
          displayName: `${client.name} Stripe`,
          scopes: [],
        },
        update: {
          accountId: connectAccountId,
          status: 'pending',
        },
      });
    }

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: connectAccountId,
      refresh_url: `${baseUrl}/directory/dashboard?refresh=true&client=${clientId}`,
      return_url: `${baseUrl}/directory/dashboard?connected=stripe&client=${clientId}`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ data: { url: accountLink.url } });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot find module') || message.includes('Cannot read properties of undefined') ||
      message.includes('does not exist') || message.includes('P1001')
    ) {
      return NextResponse.json({ error: 'Database not available or migration pending.' }, { status: 503 });
    }
    console.error('[POST /api/connect/onboard]', dbError);
    return NextResponse.json({ error: 'Failed to start onboarding.' }, { status: 500 });
  }
}
