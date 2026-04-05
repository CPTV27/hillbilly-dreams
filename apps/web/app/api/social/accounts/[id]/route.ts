export const dynamic = 'force-dynamic';
// apps/web/app/api/social/accounts/[id]/route.ts
// GET, PATCH, DELETE for a single social account

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

type Params = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const account = await (prisma as any).socialAccount.findUnique({
      where: { id },
      include: { posts: { orderBy: { createdAt: 'desc' }, take: 20 } },
    });
    if (!account) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: account });
  } catch (err) {
    console.error('[GET /api/social/accounts/:id]', err);
    return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const allowed = ['handle', 'brand', 'status', 'notes', 'platform'];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) data[key] = body[key];
  }

  try {
    const account = await (prisma as any).socialAccount.update({ where: { id }, data });
    return NextResponse.json({ data: account });
  } catch (err) {
    console.error('[PATCH /api/social/accounts/:id]', err);
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await (prisma as any).socialAccount.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/social/accounts/:id]', err);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
