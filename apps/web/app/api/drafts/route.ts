export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';
import { draftUpdateSchema, formatZodError } from '@/lib/user-post-validation';

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const status = req.nextUrl.searchParams.get('status') || 'pending';
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20');

  const drafts = await (prisma as any).pendingDraft.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  const counts = {
    pending: await (prisma as any).pendingDraft.count({ where: { status: 'pending' } }),
    approved: await (prisma as any).pendingDraft.count({ where: { status: 'approved' } }),
    published: await (prisma as any).pendingDraft.count({ where: { status: 'published' } }),
  };

  return NextResponse.json({ drafts, counts });
}

export async function PUT(req: NextRequest) {
  const deniedPut = await requireAdmin();
  if (deniedPut) return deniedPut;

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = draftUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodError(parsed.error) }, { status: 400 });
  }
  const { id, status, content, approvedBy } = parsed.data;

  const update: Record<string, unknown> = {};
  if (status) update.status = status;
  if (content !== undefined) update.content = content;
  if (approvedBy !== undefined) update.approvedBy = approvedBy;
  if (status === 'approved') update.approvedAt = new Date();
  if (status === 'published') update.publishedAt = new Date();

  const draft = await (prisma as any).pendingDraft.update({ where: { id }, data: update });
  return NextResponse.json({ success: true, draft });
}
