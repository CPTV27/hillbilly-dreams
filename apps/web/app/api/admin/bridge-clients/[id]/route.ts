// apps/web/app/api/admin/bridge-clients/[id]/route.ts
// PATCH  — update client (name, status, allowedCategories, rotate secret)
// DELETE — remove a client

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { default: prisma } = await import('@bigmuddy/database');

    // Build update payload
    const data: Record<string, unknown> = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.status !== undefined) data.status = body.status;
    if (body.allowedCategories !== undefined) data.allowedCategories = body.allowedCategories;

    // Rotate secret if requested
    let newSecret: string | null = null;
    if (body.rotateSecret === true) {
      newSecret = crypto.randomBytes(32).toString('hex');
      data.apiSecret = newSecret;
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
    if (newSecret) {
      response.apiSecret = newSecret;
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
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const { default: prisma } = await import('@bigmuddy/database');
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
