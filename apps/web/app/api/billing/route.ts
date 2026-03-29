// apps/web/app/api/billing/route.ts
// GET /api/billing — list invoices (filterable by clientId, status)
// POST /api/billing — create invoice manually or sync from Stripe

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');
  const status = searchParams.get('status');

  try {

    const where: Record<string, unknown> = {};
    if (clientId) where.clientId = parseInt(clientId, 10);
    if (status) where.status = status;

    const invoices = await (prisma as any).invoice.findMany({
      where,
      include: { client: { select: { id: true, name: true, tier: true } } },
      orderBy: { createdAt: 'desc' as const },
      take: 50,
    });

    return NextResponse.json({ data: invoices });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    console.error('[GET /api/billing]', dbError);
    return NextResponse.json({ error: 'Failed to list invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.clientId || typeof body.clientId !== 'number') {
    return NextResponse.json({ error: 'clientId is required.' }, { status: 400 });
  }

  try {

    // Look up client to get tier pricing
    const client = await (prisma as any).client.findUnique({
      where: { id: body.clientId as number },
    });
    if (!client) {
      return NextResponse.json({ error: 'Client not found.' }, { status: 404 });
    }

    const tierPrices: Record<string, number> = {
      'listing': 0,          // The Listing — Free
      'assistant': 2000,     // The Assistant — $20/mo (replaces ChatGPT)
      'works': 4900,         // The Works — $49/mo
      'engine': 9900,        // The Engine — $99/mo
      // Legacy tiers (kept for existing clients)
      'front-porch': 2000,
      'route': 4900,
      'river-room': 9900,
      'blues-room': 9900,
    };

    const amount = (body.amount as number) ?? tierPrices[client.tier] ?? 9900;
    const now = new Date();
    const periodStart = body.periodStart ? new Date(body.periodStart as string) : new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = body.periodEnd ? new Date(body.periodEnd as string) : new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const invoice = await (prisma as any).invoice.create({
      data: {
        clientId: body.clientId as number,
        amount,
        currency: 'usd',
        status: 'open',
        periodStart,
        periodEnd,
        dueDate: body.dueDate ? new Date(body.dueDate as string) : new Date(now.getFullYear(), now.getMonth() + 1, 15),
      },
    });

    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/billing]', err);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
