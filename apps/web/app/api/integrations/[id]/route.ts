export const dynamic = 'force-dynamic';
// apps/web/app/api/integrations/[id]/route.ts
// GET, PATCH, DELETE for a single client integration

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type Params = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const integration = await (prisma as any).clientIntegration.findUnique({
      where: { id },
      include: { client: { select: { id: true, name: true, slug: true } } },
    });
    if (!integration) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: integration });
  } catch (err) {
    console.error('[GET /api/integrations/:id]', err);
    return NextResponse.json({ error: 'Failed to fetch integration.' }, { status: 500 });
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
    'status', 'accountId', 'config', 'scopes', 'displayName', 'errorMessage',
  ];
  for (const field of allowedFields) {
    if (field in body) data[field] = body[field];
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update.' }, { status: 400 });
  }

  try {
    const integration = await (prisma as any).clientIntegration.update({
      where: { id },
      data,
    });
    return NextResponse.json({ data: integration });
  } catch (err) {
    console.error('[PATCH /api/integrations/:id]', err);
    return NextResponse.json({ error: 'Failed to update integration.' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {

    // Soft disconnect: clear tokens, set status to disconnected
    const integration = await (prisma as any).clientIntegration.update({
      where: { id },
      data: {
        status: 'disconnected',
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
        errorMessage: null,
      },
    });

    return NextResponse.json({ data: integration });
  } catch (err) {
    console.error('[DELETE /api/integrations/:id]', err);
    return NextResponse.json({ error: 'Failed to disconnect integration.' }, { status: 500 });
  }
}
