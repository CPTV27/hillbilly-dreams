export const dynamic = 'force-dynamic';
// apps/web/app/api/admin/bridge-clients/[id]/route.ts
// PATCH  — update client (name, status, allowedCategories, rotate secret)
// DELETE — remove a client

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();

    // Build update payload
    const data: Record<string, unknown> = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.status !== undefined) data.status = body.status;
    if (body.allowedCategories !== undefined) data.allowedCategories = body.allowedCategories;

    // Rotate secret if requested — hash before storing
    let rawSecret: string | null = null;
    if (body.rotateSecret === true) {
      rawSecret = crypto.randomBytes(32).toString('hex');
      data.apiSecret = await bcrypt.hash(rawSecret, 10);
    }

    const updated = await (prisma as any).bridgeClient.update({
      where: { id },
      data,
    });

    const response: Record<string, unknown> = {
      id: updated.id,
      name: updated.name,
      status: updated.status,
      allowedCategories: updated.allowedCategories,
    };

    // Only include full secret when rotated
    if (rawSecret) {
      response.apiSecret = rawSecret;
      response.message = 'Secret rotated — save the new apiSecret now, it will not be shown again';
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API /admin/bridge-clients/[id] PATCH]', error);
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await (prisma as any).bridgeClient.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API /admin/bridge-clients/[id] DELETE]', error);
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
