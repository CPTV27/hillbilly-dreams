// packages/modules/email/src/send.ts
// Thin Resend wrapper — POSTs to https://api.resend.com/emails.
//
// Per-brand from-addresses are derived from brand key. Configure in Resend
// dashboard with verified domains:
//   inn → tracy@bigmuddyinn.com
//   magazine → editor@bigmuddymagazine.com
//   touring/records/radio → booking@bigmuddytouring.com
//   cpp → chase@chasepierson.tv
//   tuthill → hello@tuthilldesign.com
//   studio-c → hello@studiocvideo.com
//   dsd/mbt → billing@bigmuddyinn.com (shared)

import type { Brand, Email, SendResult } from './types';

const FROM_BY_BRAND: Record<Brand, string> = {
  inn: 'Big Muddy Inn <tracy@bigmuddyinn.com>',
  magazine: 'Big Muddy Magazine <editor@bigmuddymagazine.com>',
  touring: 'Big Muddy Touring <booking@bigmuddytouring.com>',
  records: 'Big Muddy Records <label@bigmuddyrecordlabel.com>',
  radio: 'Big Muddy Radio <amy@bigmuddyradio.com>',
  cpp: 'Chase Pierson <me@chasepierson.tv>',
  tuthill: 'Tuthill Design <hello@tuthilldesign.com>',
  'studio-c': 'Studio C <hello@studiocvideo.com>',
  dsd: 'Deep South Directory <billing@bigmuddyinn.com>',
  mbt: 'MBT Billing <billing@bigmuddyinn.com>',
};

function getApiKey(): string {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');
  return key;
}

export interface SendInput {
  brand: Brand;
  to: string;
  email: Email;
  /** Optional reply-to override — defaults to from address. */
  replyTo?: string;
  /** Bcc for internal copy — useful for Tracy getting a copy of every Inn email. */
  bcc?: string;
  /** Tags for analytics — Resend supports tags in the API payload. */
  tags?: Record<string, string>;
}

/**
 * Send a transactional email. Throws on error — caller is responsible
 * for logging + retry policy.
 */
export async function send(input: SendInput): Promise<SendResult> {
  const from = FROM_BY_BRAND[input.brand];
  if (!from) {
    throw new Error(`Unknown brand for email from-address: ${input.brand}`);
  }

  const body = {
    from,
    to: [input.to],
    subject: input.email.subject,
    text: input.email.text,
    ...(input.email.html && { html: input.email.html }),
    ...(input.replyTo && { reply_to: input.replyTo }),
    ...(input.bcc && { bcc: [input.bcc] }),
    ...(input.tags && {
      tags: Object.entries(input.tags).map(([name, value]) => ({ name, value })),
    }),
  };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as { id: string };
  return {
    id: data.id,
    from,
    to: input.to,
    at: new Date().toISOString(),
  };
}

/**
 * Safe send — swallows errors and returns null instead of throwing. Use
 * in webhook handlers where email failure should never block the mutation.
 * Logs the error via console.error.
 */
export async function sendSafe(input: SendInput): Promise<SendResult | null> {
  try {
    return await send(input);
  } catch (e) {
    console.error(
      `[email.sendSafe] ${input.brand} → ${input.to} failed:`,
      e instanceof Error ? e.message : String(e)
    );
    return null;
  }
}
