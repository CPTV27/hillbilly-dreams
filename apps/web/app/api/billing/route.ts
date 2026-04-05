export const dynamic = 'force-dynamic';
// apps/web/app/api/billing/route.ts
// GET /api/billing — list invoices (filterable by clientId, status)
// POST /api/billing — create invoice manually or sync from Stripe

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/db';
import { cloudLog } from '@/lib/cloud-logger';
import { apiLog } from '@/lib/api-logger';

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
    apiLog.error('GET /api/billing', 'list invoices failed', dbError);
    return NextResponse.json({ error: 'Failed to list invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const t0 = Date.now();
  const authError = await requireAdmin();
  if (authError) return authError;

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

    /** Amounts in cents — canonical DSD ladder: Free / $25 / $50 / $99 / $250 */
    const tierPrices: Record<string, number> = {
      listing: 0,
      free: 0,
      assistant: 2500,
      essentials: 2500,
      works: 5000,
      pro: 5000,
      marketing: 9900,
      engine: 25000,
      'front-porch': 2500,
      route: 5000,
      'river-room': 9900,
      'blues-room': 25000,
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

    cloudLog.info('/api/billing', 'invoice created', {
      durationMs: Date.now() - t0,
      clientId: body.clientId as number,
    });
    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (err) {
    cloudLog.error('/api/billing', 'create invoice failed', err, { durationMs: Date.now() - t0 });
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
