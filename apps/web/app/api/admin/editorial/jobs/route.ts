export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';
import { requireAdmin } from '@/lib/admin-auth';

/** List editorial jobs (Editorial Bureau inbox). */
export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const status = (searchParams.get('status') || 'HUMAN_REVIEW').trim();
  const take = Math.min(100, Math.max(1, Number(searchParams.get('limit') || '40') || 40));

  try {
    const jobs = await prisma.job.findMany({
      where: { editorialStatus: status },
      orderBy: { updatedAt: 'desc' },
      take,
      select: {
        id: true,
        toolId: true,
        editorialStatus: true,
        draftContent: true,
        humanEditedContent: true,
        redPenNotes: true,
        assignedHumanId: true,
        styleGuideId: true,
        brandId: true,
        updatedAt: true,
        brand: { select: { id: true, name: true, slug: true } },
        styleGuide: { select: { id: true, name: true, persona: true } },
        assignedHuman: { select: { id: true, name: true, email: true } },
      },
    });
    return NextResponse.json({ ok: true, jobs });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'list_failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
