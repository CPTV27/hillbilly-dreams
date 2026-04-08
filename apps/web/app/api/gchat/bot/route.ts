export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

const D1_DATABASE_ID = 'ed612d3b-967b-45ae-aacf-5ba5cc670469';
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const AGENT_KEYWORDS: Record<string, string[]> = {
  huck: ['huck', 'build', 'code', 'deploy', 'fix', 'bug', 'api', 'route', 'page'],
  'delta-dawn': ['delta', 'dawn', 'inn', 'magazine', 'radio', 'records', 'big muddy', 'event', 'booking', 'venue', 'corridor', 'show'],
  ledger: ['ledger', 'data', 'metric', 'number', 'database', 'census', 'directory', 'how many', 'count', 'revenue'],
  chuck: ['chuck', 'tour', 'route', 'venue', 'bus', 'prevost', 'schedule', 'logistics', 'van'],
  rook: ['rook', 'strategy', 'valuation', 'investor', 'holding', 'hdi'],
};

function detectAgent(text: string): string {
  const lower = text.toLowerCase();
  for (const [agent, keywords] of Object.entries(AGENT_KEYWORDS)) {
    if (lower.startsWith(`@${agent}`) || lower.startsWith(agent + ',') || lower.startsWith(agent + ' ')) {
      return agent;
    }
  }
  for (const [agent, keywords] of Object.entries(AGENT_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return agent;
    }
  }
  return 'delta-dawn';
}

async function d1Insert(sql: string, params: string[] = []) {
  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    console.error('[gchat/bot] Missing Cloudflare credentials');
    return false;
  }
  try {
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
      console.error('[gchat/bot] D1 write failed:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[gchat/bot] D1 error:', err);
    return false;
  }
}

const AGENT_NAMES: Record<string, string> = {
  huck: 'Huck (Build)',
  'delta-dawn': 'Delta Dawn (Big Muddy)',
  ledger: 'Ledger (Data)',
  chuck: 'Chuck (Touring)',
  rook: 'Rook (Strategy)',
};

export async function POST(req: NextRequest) {
  let event: any;
  try {
    event = await req.json();
  } catch {
    return NextResponse.json({ text: 'Invalid request.' });
  }

  console.log('[gchat/bot] Event type:', event.type, 'Message:', event.message?.text?.substring(0, 100));

  // Bot added to a space
  if (event.type === 'ADDED_TO_SPACE') {
    return NextResponse.json({
      text: 'HDI Agent Desk is online. Send me a message and I will route it to the right agent — Delta Dawn (Big Muddy), Huck (Build), Ledger (Data), Chuck (Touring), or Rook (Strategy).',
    });
  }

  // Bot removed
  if (event.type === 'REMOVED_FROM_SPACE') {
    return NextResponse.json({});
  }

  // Handle messages
  if (event.type === 'MESSAGE' && event.message) {
    const msg = event.message;

    // Skip bot messages
    if (msg.sender?.type === 'BOT') {
      return NextResponse.json({});
    }

    const messageText = msg.argumentText?.trim() || msg.text?.trim() || '';
    if (!messageText) {
      return NextResponse.json({ text: 'I received an empty message.' });
    }

    const agentTarget = detectAgent(messageText);
    const spaceId = msg.space?.name || event.space?.name || '';
    const threadId = msg.thread?.name || '';
    const senderName = msg.sender?.displayName || 'Unknown';
    const senderEmail = msg.sender?.email || '';

    console.log('[gchat/bot] From:', senderName, '| Agent:', agentTarget, '| Text:', messageText);

    // Try to store in D1 — but don't let it block the response
    d1Insert(
      "INSERT INTO chat_messages (space_id, thread_id, sender_name, sender_email, message, agent_target, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')",
      [spaceId, threadId, senderName, senderEmail, messageText, agentTarget]
    ).then(ok => {
      if (!ok) console.error('[gchat/bot] D1 insert failed for:', messageText);
    });

    // Always respond immediately
    return NextResponse.json({
      text: `*${AGENT_NAMES[agentTarget] || agentTarget}* received your message:\n\n"${messageText}"\n\nProcessing now.`,
    });
  }

  // Unknown event type
  return NextResponse.json({ text: 'Event received.' });
}
