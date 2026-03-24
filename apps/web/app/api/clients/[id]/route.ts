// apps/web/app/api/clients/[id]/route.ts
// GET, PATCH, DELETE for a single client

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type Params = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const client = await (prisma as any).client.findUnique({
      where: { id },
      include: {
        _count: { select: { reviews: true, calendars: true, reports: true, invoices: true } },
      },
    });
    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // Soft FK: fetch accounts separately (Client → SocialAccount relation removed, cross-sovereign)
    const accounts = await (prisma as any).socialAccount.findMany({ where: { clientId: id } });
    return NextResponse.json({ data: { ...client, accounts } });
  } catch (err) {
    console.error('[GET /api/clients/:id]', err);
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  const allowedFields = [
    'name', 'tier', 'businessType', 'city', 'state', 'address', 'phone', 'email',
    'website', 'description', 'voiceProfile', 'platforms', 'gbpPlaceId', 'gbpUrl',
    'stripeCustomerId', 'logoUrl', 'heroImageUrl', 'contactName', 'contactEmail',
    'contactPhone', 'notes', 'status',
  ];
  for (const field of allowedFields) {
    if (field in body) data[field] = body[field];
  }
  if ('status' in body && body.status === 'active' && !('onboardedAt' in body)) {
    data.onboardedAt = new Date();
  }

  try {
    const client = await (prisma as any).client.update({
      where: { id },
      data,
      include: {
        _count: { select: { reviews: true, reports: true } },
      },
    });
    return NextResponse.json({ data: client });
  } catch (err) {
    console.error('[PATCH /api/clients/:id]', err);
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await (prisma as any).client.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/clients/:id]', err);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
