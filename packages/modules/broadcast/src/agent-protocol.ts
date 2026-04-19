// packages/modules/broadcast/src/agent-protocol.ts
// Mac mini agent ↔ server protocol. The mini polls /api/broadcast/agent/poll
// every 30s with HMAC-signed requests; server returns the next pending
// AgentInstruction. After execution, mini POSTs to /api/broadcast/agent/ack.
//
// In-memory instruction queue. For production we'd persist these in a
// dedicated AgentInstruction table; for v1 we use module state.

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AgentInstruction, AgentAck } from './types';

const QUEUE: AgentInstruction[] = [];
const ACKED: Map<string, AgentAck> = new Map();

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

/** Server-side: enqueue an instruction for the next poll. */
export function enqueue(instruction: Omit<AgentInstruction, 'issuedAt'>): AgentInstruction {
  const full: AgentInstruction = { ...instruction, issuedAt: new Date().toISOString() };
  QUEUE.push(full);
  return full;
}

/** Server-side: return the next pending instruction (FIFO) and remove it. */
export function dequeueNext(): AgentInstruction | null {
  return QUEUE.shift() ?? null;
}

/** Server-side: record an ack from the mini. */
export function recordAck(ack: AgentAck): void {
  ACKED.set(ack.instructionId, ack);
}

export function getAck(instructionId: string): AgentAck | undefined {
  return ACKED.get(instructionId);
}

export function pendingCount(): number {
  return QUEUE.length;
}
