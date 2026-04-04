export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@bigmuddy/database';
import { auth } from '@/lib/auth';
import { requireAdmin } from '@/lib/admin-auth';

const PatchBodySchema = z
  .object({
    humanEditedContent: z.string().max(120_000).optional(),
    action: z.enum(['save', 'approve_live']).optional(),
  })
  .strict();

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await context.params;
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        brand: { select: { id: true, name: true, slug: true } },
        styleGuide: true,
        assignedHuman: { select: { id: true, name: true, email: true } },
        visualAssets: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });
    if (!job) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
    return NextResponse.json({ ok: true, job });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'get_failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ ok: false, error: 'session_user_id_required' }, { status: 401 });
  }

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = PatchBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 });
  }

  const { humanEditedContent, action } = parsed.data;

  try {
    const existing = await prisma.job.findUnique({
      where: { id },
      select: { id: true, assignedHumanId: true, editorialStatus: true },
    });
    if (!existing) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });

    if (action === 'approve_live') {
      if (!existing.assignedHumanId) {
        return NextResponse.json(
          { ok: false, error: 'assign_an_editor_before_publish' },
          { status: 403 }
        );
      }
      if (existing.assignedHumanId !== userId) {
        return NextResponse.json(
          { ok: false, error: 'only_assigned_editor_may_publish' },
          { status: 403 }
        );
      }
      const updated = await prisma.job.update({
        where: { id },
        data: {
          editorialStatus: 'LIVE',
          ...(typeof humanEditedContent === 'string' ? { humanEditedContent } : {}),
        },
      });
      return NextResponse.json({ ok: true, job: updated });
    }

    if (typeof humanEditedContent === 'string') {
      const updated = await prisma.job.update({
        where: { id },
        data: { humanEditedContent },
      });
      return NextResponse.json({ ok: true, job: updated });
    }

    return NextResponse.json({ ok: false, error: 'no_updates' }, { status: 400 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'patch_failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
