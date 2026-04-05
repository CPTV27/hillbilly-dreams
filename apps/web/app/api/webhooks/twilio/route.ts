export const dynamic = 'force-dynamic';

// POST /api/webhooks/twilio — Inbound SMS handler
// Twilio sends a POST when someone texts our number.
// We look up the sender's phone → find their Asana project → create a task with their message.
//
// Env vars needed:
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN — for signature validation
//   ASANA_PAT — for creating tasks
//   VENDOR_PHONE_MAP — JSON mapping phone → Asana project ID
//     e.g. {"6015551234":"1213942086747969"} (Chandra → her project)

import { NextRequest, NextResponse } from 'next/server';
import { apiLog } from '@/lib/api-logger';
import { createTask } from '@/lib/asana-client';

// Vendor phone → Asana project mapping
// Stored as env var JSON. Example: {"6015551234":"1213942086747969"}
function getPhoneMap(): Record<string, string> {
  const raw = process.env.VENDOR_PHONE_MAP;
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

export async function POST(request: NextRequest) {
  try {
    // Twilio sends form-encoded data
    const formData = await request.formData();
    const from = (formData.get('From') as string)?.replace(/\D/g, '') || '';
    const body = (formData.get('Body') as string) || '';
    const messageSid = formData.get('MessageSid') as string;

    if (!from || !body) {
      return new NextResponse('<Response></Response>', {
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    // Look up vendor by phone number
    const phoneMap = getPhoneMap();
    const projectId = phoneMap[from] || phoneMap[from.slice(-10)]; // Try full and last 10 digits

    if (projectId) {
      // Known vendor — log to their Asana project
      const timestamp = new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
      });
      await createTask(
        projectId,
        `[SMS] ${timestamp} — ${body.slice(0, 60)}`,
        `From: ${from}\nReceived: ${timestamp}\nMessage SID: ${messageSid}\n\n${body}`,
      );
    } else {
      // Unknown number — log to a catch-all or ignore
      apiLog.info('webhooks/twilio', 'unknown sender', { from, preview: body.slice(0, 100) });
    }

    // Respond with empty TwiML (no auto-reply for now)
    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (err) {
    console.error('[POST /api/webhooks/twilio]', err);
    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
