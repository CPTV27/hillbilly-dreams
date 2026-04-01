export const dynamic = 'force-dynamic';
// apps/web/app/api/content/approve/route.ts
// POST /api/content/approve — approve or reject content in the pipeline
// Handles: calendar approval, post approval, review response approval

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type ApprovalAction = 'approve' | 'reject' | 'request-changes';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const type = body.type as string; // 'calendar' | 'post' | 'review'
  const id = body.id as number;
  const action = body.action as ApprovalAction;
  const notes = (body.notes as string) ?? null;
  const approvedBy = (body.approvedBy as string) ?? 'admin';

  if (!type || !id || !action) {
    return NextResponse.json({ error: 'type, id, and action are required.' }, { status: 400 });
  }

  try {

    switch (type) {
      case 'calendar': {
        const statusMap: Record<string, string> = {
          'approve': 'approved',
          'reject': 'draft',
          'request-changes': 'draft',
        };
        const calendar = await (prisma as any).contentCalendar.update({
          where: { id },
          data: {
            status: statusMap[action] ?? 'draft',
            approvedAt: action === 'approve' ? new Date() : null,
            approvedBy: action === 'approve' ? approvedBy : null,
            notes: notes || undefined,
          },
        });
        return NextResponse.json({ data: calendar });
      }

      case 'post': {
        const statusMap: Record<string, string> = {
          'approve': 'ready',
          'reject': 'draft',
          'request-changes': 'draft',
        };
        const post = await (prisma as any).socialPost.update({
          where: { id },
          data: { status: statusMap[action] ?? 'draft' },
        });
        return NextResponse.json({ data: post });
      }

      case 'review': {
        if (action === 'approve') {
          // Move AI draft to the response field and mark as approved
          const review = await (prisma as any).review.findUnique({ where: { id } });
          if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

          const updated = await (prisma as any).review.update({
            where: { id },
            data: {
              response: (body.response as string) || review.aiDraft || review.response,
              responseStatus: 'approved',
            },
          });
          return NextResponse.json({ data: updated });
        } else {
          const updated = await (prisma as any).review.update({
            where: { id },
            data: {
              responseStatus: action === 'reject' ? 'skipped' : 'pending',
              response: null,
            },
          });
          return NextResponse.json({ data: updated });
        }
      }

      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }
  } catch (err) {
    console.error('[POST /api/content/approve]', err);
    return NextResponse.json({ error: 'Approval action failed' }, { status: 500 });
  }
}
