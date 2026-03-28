import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(req: NextRequest) {
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
  const { id, status, content, approvedBy } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const update: any = {};
  if (status) update.status = status;
  if (content) update.content = content;
  if (approvedBy) update.approvedBy = approvedBy;
  if (status === 'approved') update.approvedAt = new Date();
  if (status === 'published') update.publishedAt = new Date();

  const draft = await (prisma as any).pendingDraft.update({ where: { id }, data: update });
  return NextResponse.json({ success: true, draft });
}
