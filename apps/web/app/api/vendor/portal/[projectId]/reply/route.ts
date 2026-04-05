export const dynamic = 'force-dynamic';

// POST /api/vendor/portal/:projectId/reply — Vendor sends a message
// Creates an Asana task in the project with the message. No auth.

import { NextRequest, NextResponse } from 'next/server';
import { createTask } from '@/lib/asana-client';
import { getClientIp, rateLimitHeaders, rateLimitIp } from '@/lib/rate-limit';

type Params = { params: Promise<{ projectId: string }> };

export async function POST(request: NextRequest, ctx: Params) {
  const { projectId } = await ctx.params;

  const ip = getClientIp(request.headers);
  const retryAfter = rateLimitIp(ip);
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders(retryAfter) }
    );
  }

  try {
    const body = await request.json();
    const { message } = body as { message: string };

    if (!message || message.trim().length < 1) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
    });

    await createTask(
      projectId,
      `[Vendor Message] ${timestamp}`,
      message.trim(),
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/vendor/portal/:projectId/reply]', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
