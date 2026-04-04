import type { Prisma } from '@prisma/client';
import { prisma } from '@bigmuddy/database';
import { EventProducer } from '@/lib/agent/eventProducer';

export type CreditDeltaError = 'USER_NOT_FOUND' | 'INSUFFICIENT_CREDITS';

/**
 * Atomic credit mutation + CreditLedger row + Socket.io pulse (Hub only).
 */
export async function applyCreditDelta(opts: {
  userId: string;
  change: number;
  reason: string;
  metadata?: Record<string, unknown>;
}): Promise<{ balanceAfter: number } | { error: CreditDeltaError }> {
  const { userId, change, reason, metadata } = opts;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { credits: true } });
  if (!user) return { error: 'USER_NOT_FOUND' };
  const next = user.credits + change;
  if (next < 0) return { error: 'INSUFFICIENT_CREDITS' };

  await prisma.$transaction(async (tx) => {
    await tx.user.update({ where: { id: userId }, data: { credits: next } });
    await tx.creditLedger.create({
      data: {
        userId,
        change,
        balanceAfter: next,
        reason,
        metadata: metadata as Prisma.InputJsonValue | undefined,
      },
    });
  });

  EventProducer.broadcastPulse({
    kind: 'credit',
    userId,
    change,
    balanceAfter: next,
    reason,
  });

  return { balanceAfter: next };
}
