import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';
import { applyCreditDelta } from '@/lib/sovereign/wallet';
import { EventProducer } from '@/lib/agent/eventProducer';
import { apiLog } from '@/lib/api-logger';

export const dynamic = 'force-dynamic';

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    const contestId = params.id;
    if (!contestId) {
      return NextResponse.json({ error: 'Contest id required' }, { status: 400 });
    }

    const contest = await prisma.contest.findUnique({ where: { id: contestId } });
    if (!contest || contest.status !== 'published') {
      return NextResponse.json({ error: 'Contest not available' }, { status: 400 });
    }
    const now = new Date();
    if (now < contest.startDate || now > contest.endDate) {
      return NextResponse.json({ error: 'Contest not open' }, { status: 400 });
    }

    const fee = contest.entryFeeCredits;
    if (fee > 0) {
      const delta = await applyCreditDelta({
        userId,
        change: -fee,
        reason: 'contest_entry',
        metadata: { contestId },
      });
      if ('error' in delta) {
        if (delta.error === 'INSUFFICIENT_CREDITS') {
          return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
        }
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    const submission = await prisma.submission.create({
      data: {
        contestId,
        userId,
        contentUrl: 'sovereign://contest-entry/pending',
        status: 'PENDING',
        metadata: { source: 'contest_enter_api' },
      },
    });

    EventProducer.broadcastPulse({
      kind: 'submission',
      submissionId: submission.id,
      contestId,
      userId,
      status: submission.status,
    });

    return NextResponse.json({
      ok: true,
      submissionId: submission.id,
      creditsBurned: fee,
    });
  } catch (e) {
    apiLog.error('POST /api/sovereign/contests/[id]/enter', 'handler failed', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
