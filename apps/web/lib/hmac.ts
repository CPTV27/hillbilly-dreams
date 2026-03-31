// ── HMAC-SHA256 Verification for Bridge Ingest ──
// Machine-to-machine auth. Both systems share BMT_BRIDGE_SECRET.

import crypto from 'crypto';

export interface SignedPayload<T> {
  version: '1.0';
  timestamp: string;
  data: T;
  signature: string;
}

/**
 * Verify an HMAC-SHA256 signed payload from a bridge client.
 * The signature covers version + timestamp + JSON-stringified data.
 * Returns true if the signature matches.
 */
export function verifyPayload<T extends object>(
  payload: SignedPayload<T>,
  secret: string
): boolean {
  const message = `${payload.version}:${payload.timestamp}:${JSON.stringify(payload.data)}`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(payload.signature, 'hex'),
    Buffer.from(expected, 'hex')
  );
}

/**
 * Check that the payload timestamp is within a reasonable window.
 * Prevents replay attacks. Default: 5 minutes.
 */
export function isTimestampValid(
  timestamp: string,
  maxAgeMs: number = 5 * 60 * 1000
): boolean {
  const payloadTime = new Date(timestamp).getTime();
  if (isNaN(payloadTime)) return false;
  return Math.abs(Date.now() - payloadTime) <= maxAgeMs;
}
