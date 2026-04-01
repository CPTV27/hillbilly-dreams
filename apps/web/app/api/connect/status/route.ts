export const dynamic = 'force-dynamic';
// apps/web/app/api/connect/status/route.ts
// GET /api/connect/status?clientId=X — Check Stripe Connect account status

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientIdParam = searchParams.get('clientId');
  const clientId = clientIdParam ? parseInt(clientIdParam, 10) : NaN;

  if (isNaN(clientId)) {
    return NextResponse.json({ error: 'clientId query param is required.' }, { status: 400 });
  }

  try {
    const Stripe = (await import('stripe' as string)).default;

    const client = await (prisma as any).client.findUnique({ where: { id: clientId } });
    if (!client) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    if (!client.stripeConnectId) {
      return NextResponse.json({
        data: { connected: false, connectStatus: null },
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-06-20' as unknown,
    });

    const account = await stripe.accounts.retrieve(client.stripeConnectId);

    // Derive status from account state
    let connectStatus = 'pending';
    if (account.charges_enabled && account.details_submitted) {
      connectStatus = 'active';
    } else if (account.details_submitted) {
      connectStatus = 'restricted';
    } else {
      connectStatus = 'pending';
    }

    // Update Client record
    await (prisma as any).client.update({
      where: { id: clientId },
      data: { connectStatus },
    });

    // Update ClientIntegration record
    await (prisma as any).clientIntegration.updateMany({
      where: { clientId, provider: 'stripe' },
      data: {
        status: connectStatus === 'active' ? 'active' : connectStatus === 'restricted' ? 'error' : 'pending',
        lastSyncAt: new Date(),
      },
    });

    return NextResponse.json({
      data: {
        connected: true,
        connectStatus,
        chargesEnabled: account.charges_enabled,
        detailsSubmitted: account.details_submitted,
        payoutsEnabled: account.payouts_enabled,
      },
    });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot find module') || message.includes('Cannot read properties of undefined') ||
      message.includes('does not exist') || message.includes('P1001')
    ) {
      return NextResponse.json({ data: { connected: false }, _source: 'no-db', _note: 'Database not connected or migration pending.' });
    }
    console.error('[GET /api/connect/status]', dbError);
    return NextResponse.json({ error: 'Failed to check status.' }, { status: 500 });
  }
}
