// apps/web/app/api/life/board/[id]/route.ts
// GET    /api/life/board/[id] — single task detail
// PUT    /api/life/board/[id] — claim task or update status
// DELETE /api/life/board/[id] — delete own task

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const task = await (prisma as any).taskPost.findUnique({ where: { id } });
    if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: task });
  } catch (err) {
    console.error('[GET /api/life/board/:id]', err);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;

  const session = await auth();
  const email = (session?.user as any)?.email as string | undefined;
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const task = await (prisma as any).taskPost.findUnique({ where: { id } });
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  // Claiming: anyone can claim an open task (except the author)
  if (body.claim === true) {
    if (task.authorId === profile.id) {
      return NextResponse.json({ error: 'Cannot claim your own task' }, { status: 400 });
    }
    if (task.claimedById) {
      return NextResponse.json({ error: 'Task already claimed' }, { status: 409 });
    }
    data.claimedById = profile.id;
    data.status = 'claimed';
  }

  // Author can update status or fields
  if (task.authorId === profile.id) {
    if (body.status) data.status = body.status;
    if (body.title) data.title = body.title;
    if (body.description) data.description = body.description;
    if (body.skillsNeeded) data.skillsNeeded = body.skillsNeeded;
    if (body.valueType) data.valueType = body.valueType;
    if (body.valueNote !== undefined) data.valueNote = body.valueNote;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  try {
    const updated = await (prisma as any).taskPost.update({ where: { id }, data });
    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error('[PUT /api/life/board/:id]', err);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  const session = await auth();
  const email = (session?.user as any)?.email as string | undefined;
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const task = await (prisma as any).taskPost.findUnique({ where: { id } });
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (task.authorId !== profile.id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  try {
    await (prisma as any).taskPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/life/board/:id]', err);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
