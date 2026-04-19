// apps/web/app/api/booking/quotes/route.ts
// POST — submit a private-event quote inquiry. Public endpoint (anyone can
// inquire). Tracy reviews + generates quote in admin.
// GET — list quotes (admin-gated).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { quotes } from '@bigmuddy/booking';
import type { TenantId, BrandId, EventType, QuoteStatus } from '@bigmuddy/booking';

export async function POST(request: NextRequest) {
  let body: {
    tenantId: TenantId;
    brand: BrandId;
    customerEmail: string;
    customerName: string;
    customerPhone?: string;
    eventType: EventType;
    proposedDate?: string;
    flexibleDates?: boolean;
    guestCount?: number;
    description: string;
    budget?: string;
    metadata?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (
    !body.tenantId ||
    !body.brand ||
    !body.customerEmail ||
    !body.customerName ||
    !body.eventType ||
    !body.description
  ) {
    return NextResponse.json(
      { error: 'tenantId, brand, customerEmail, customerName, eventType, and description are required' },
      { status: 400 }
    );
  }

  try {
    const quote = await quotes.submit({
      ...body,
      proposedDate: body.proposedDate ? new Date(body.proposedDate) : undefined,
    });
    return NextResponse.json({ data: quote });
  } catch (err) {
    console.error('[POST /api/booking/quotes]', err);
    const message = err instanceof Error ? err.message : 'Submit failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const tenantId = (searchParams.get('tenantId') ?? undefined) as TenantId | undefined;
  const status = (searchParams.get('status') ?? undefined) as QuoteStatus | undefined;
  const customerEmail = searchParams.get('customerEmail') ?? undefined;

  try {
    const list = await quotes.list({ tenantId, status, customerEmail });
    return NextResponse.json({ data: list });
  } catch (err) {
    console.error('[GET /api/booking/quotes]', err);
    const message = err instanceof Error ? err.message : 'List failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
