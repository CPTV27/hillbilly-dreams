export const dynamic = 'force-dynamic';
// GET /api/gchat/pending?agent=huck — Poll for pending messages
// Agents call this to check if Chase or team members have sent them messages.
// Returns pending messages and marks them as 'read'.

import { NextRequest, NextResponse } from 'next/server';

const D1_DATABASE_ID = 'ed612d3b-967b-45ae-aacf-5ba5cc670469';
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function d1Query(sql: string, params: string[] = []) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${D1_DATABASE_ID}/query`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[gchat/pending] D1 query failed:', err);
    throw new Error(`D1 query failed: ${res.status}`);
  }

  return res.json();
}

export async function GET(req: NextRequest) {
  const agent = req.nextUrl.searchParams.get('agent') || 'huck';
  const limit = req.nextUrl.searchParams.get('limit') || '10';

  try {
    // Fetch pending messages for this agent
    const result = await d1Query(
      `SELECT id, space_id, thread_id, sender_name, sender_email, message, agent_target, created_at
       FROM chat_messages
       WHERE agent_target = ? AND status = 'pending'
       ORDER BY created_at ASC
       LIMIT ?`,
      [agent, limit]
    );

    const messages = result?.[0]?.results || [];

    // Mark fetched messages as 'read'
    if (messages.length > 0) {
      const ids = messages.map((m: { id: number }) => m.id).join(',');
      await d1Query(
        `UPDATE chat_messages SET status = 'read' WHERE id IN (${ids})`
      );
    }

    return NextResponse.json({
      agent,
      count: messages.length,
      messages,
    });
  } catch (err) {
    console.error('[gchat/pending] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
