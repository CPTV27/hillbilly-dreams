// packages/modules/broadcast/src/agent-protocol.ts
//
// Mac mini agent ↔ server protocol. The mini polls /api/broadcast/agent/poll
// every 30s with HMAC-signed requests; server returns the next pending
// AgentInstruction. After execution, the mini POSTs to /api/broadcast/agent/ack.
//
// Persistence (Gemini review CRITICAL #2, fixed 2026-04-19):
//   The instruction queue is now stored in the BroadcastAgentInstruction
//   Postgres table. Previously it was in-memory module state, which is
//   broken in Vercel's serverless environment — enqueue on one function
//   instance wouldn't be visible to the poll handler on another.
//
// Atomic dequeue: we use SELECT ... FOR UPDATE SKIP LOCKED inside a raw
// UPDATE so concurrent polls can't hand out the same instruction twice.

import { createHmac, timingSafeEqual } from 'node:crypto';
import { prisma } from '@bigmuddy/database';
import type { AgentInstruction, AgentAck } from './types';

type StoredInstruction = {
  id: string;
  type: string;
  payload: unknown;
  status: string;
  priority: number;
  claimedAt: Date | null;
  ackedAt: Date | null;
  result: unknown;
  error: string | null;
  issuedBy: string | null;
  issuedAt: Date;
};

/** Sign a request body with HMAC-SHA256 using BROADCAST_AGENT_SECRET. */
export function signRequest(body: string): string {
  const secret = process.env.BROADCAST_AGENT_SECRET;
  if (!secret) throw new Error('BROADCAST_AGENT_SECRET not configured');
  return createHmac('sha256', secret).update(body).digest('hex');
}

/** Verify an incoming HMAC signature. Throws on mismatch. */
export function verifyRequest(body: string, signature: string): void {
  const expected = signRequest(body);
  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expected, 'hex');
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    throw new Error('Invalid HMAC signature');
  }
}

/** Convert a stored row into the external AgentInstruction shape. */
function toInstruction(row: StoredInstruction): AgentInstruction {
  return {
    id: row.id,
    type: row.type as AgentInstruction['type'],
    payload: row.payload as AgentInstruction['payload'],
    issuedAt: row.issuedAt.toISOString(),
  };
}

/** Server-side: enqueue an instruction for the next poll. */
export async function enqueue(
  instruction: Omit<AgentInstruction, 'issuedAt'> & { priority?: number; issuedBy?: string }
): Promise<AgentInstruction> {
  const row = (await prisma.broadcastAgentInstruction.create({
    data: {
      id: instruction.id,
      type: instruction.type,
      payload: instruction.payload as never,
      priority: instruction.priority ?? 0,
      issuedBy: instruction.issuedBy ?? null,
      status: 'pending',
    },
  })) as unknown as StoredInstruction;
  return toInstruction(row);
}

/**
 * Server-side: return the next pending instruction (FIFO by issuedAt,
 * priority-descending) and atomically mark it claimed. Uses
 * SELECT ... FOR UPDATE SKIP LOCKED so concurrent pollers can't grab the
 * same row.
 */
export async function dequeueNext(): Promise<AgentInstruction | null> {
  const rows = await prisma.$queryRaw<StoredInstruction[]>`
    UPDATE "BroadcastAgentInstruction"
    SET status = 'claimed', "claimedAt" = NOW(), "updatedAt" = NOW()
    WHERE id = (
      SELECT id FROM "BroadcastAgentInstruction"
      WHERE status = 'pending'
      ORDER BY priority DESC, "issuedAt" ASC
      LIMIT 1
      FOR UPDATE SKIP LOCKED
    )
    RETURNING id, type, payload, status, priority,
      "claimedAt", "ackedAt", result, error, "issuedBy", "issuedAt"
  `;
  if (rows.length === 0) return null;
  return toInstruction(rows[0]);
}

/** Server-side: record an ack from the mini. */
export async function recordAck(ack: AgentAck): Promise<void> {
  await prisma.broadcastAgentInstruction.update({
    where: { id: ack.instructionId },
    data: {
      status: ack.success ? 'acked' : 'failed',
      ackedAt: ack.completedAt ? new Date(ack.completedAt) : new Date(),
      result: (ack.result ?? null) as never,
      error: ack.error ?? null,
    },
  });
}

/** Server-side: look up the latest ack state for an instruction. */
export async function getAck(instructionId: string): Promise<AgentAck | undefined> {
  const row = (await prisma.broadcastAgentInstruction.findUnique({
    where: { id: instructionId },
  })) as unknown as StoredInstruction | null;
  if (!row || !row.ackedAt) return undefined;
  return {
    instructionId: row.id,
    success: row.status === 'acked',
    result: (row.result ?? undefined) as AgentAck['result'],
    error: row.error ?? undefined,
    completedAt: row.ackedAt.toISOString(),
  };
}

/** Server-side: how many instructions are still pending. */
export async function pendingCount(): Promise<number> {
  return prisma.broadcastAgentInstruction.count({ where: { status: 'pending' } });
}
