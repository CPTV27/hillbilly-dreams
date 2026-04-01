export const dynamic = 'force-dynamic';
// POST /api/gchat/bot — Google Chat Bot webhook receiver
// Google Chat sends events here when someone messages the bot or @mentions it.
// Messages are stored in Cloudflare D1 for agents to poll.

import { NextRequest, NextResponse } from 'next/server';

const D1_DATABASE_ID = 'ed612d3b-967b-45ae-aacf-5ba5cc670469';
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

// Agent name detection — route messages to the right agent
const AGENT_KEYWORDS: Record<string, string[]> = {
  huck: ['huck', 'build', 'code', 'deploy', 'fix', 'bug', 'api', 'route'],
  'delta-dawn': ['delta', 'dawn', 'inn', 'magazine', 'radio', 'records', 'big muddy', 'event', 'booking'],
  ledger: ['ledger', 'data', 'metric', 'number', 'database', 'census', 'directory'],
  chuck: ['chuck', 'tour', 'route', 'venue', 'bus', 'prevost', 'schedule', 'logistics'],
  rook: ['rook', 'strategy', 'valuation', 'investor', 'holding', 'hdi'],
};

function detectAgent(text: string): string {
  const lower = text.toLowerCase();

  // Check for explicit @mentions first
  for (const [agent, keywords] of Object.entries(AGENT_KEYWORDS)) {
    if (lower.startsWith(`@${agent}`) || lower.startsWith(agent + ',') || lower.startsWith(agent + ' ')) {
      return agent;
    }
  }

  // Keyword matching fallback
  for (const [agent, keywords] of Object.entries(AGENT_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return agent;
    }
  }

  // Default to huck (build agent handles general requests)
  return 'huck';
}

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
    console.error('[gchat/bot] D1 query failed:', err);
    throw new Error(`D1 query failed: ${res.status}`);
  }

  return res.json();
}

// Google Chat event types we handle
interface ChatEvent {
  type: 'MESSAGE' | 'ADDED_TO_SPACE' | 'REMOVED_FROM_SPACE' | 'CARD_CLICKED';
  eventTime: string;
  message?: {
    name: string;
    sender: {
      name: string;
      displayName: string;
      email?: string;
      type: 'HUMAN' | 'BOT';
    };
    text: string;
    thread?: { name: string };
    space?: { name: string };
    argumentText?: string; // text without @mention
  };
  space?: {
    name: string;
    displayName: string;
    type: 'DM' | 'ROOM';
  };
  user?: {
    name: string;
    displayName: string;
    email?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const event: ChatEvent = await req.json();

    // Bot added to a space — send welcome
    if (event.type === 'ADDED_TO_SPACE') {
      return NextResponse.json({
        text: "Huck here. I'm connected to the HDI Agent Desk. Message me and I'll route it to the right agent — Huck (build), Delta Dawn (Big Muddy), Ledger (data), Chuck (touring), or Rook (strategy).",
      });
    }

    // Bot removed — nothing to do
    if (event.type === 'REMOVED_FROM_SPACE') {
      return NextResponse.json({});
    }

    // Handle messages
    if (event.type === 'MESSAGE' && event.message) {
      const msg = event.message;

      // Skip bot messages
      if (msg.sender.type === 'BOT') {
        return NextResponse.json({});
      }

      // Use argumentText (without @mention) if available, fallback to full text
      const messageText = msg.argumentText?.trim() || msg.text || '';
      const agentTarget = detectAgent(messageText);
      const spaceId = msg.space?.name || event.space?.name || '';
      const threadId = msg.thread?.name || '';

      // Store in D1
      await d1Query(
        `INSERT INTO chat_messages (space_id, thread_id, sender_name, sender_email, message, agent_target, status)
         VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
        [
          spaceId,
          threadId,
          msg.sender.displayName,
          msg.sender.email || '',
          messageText,
          agentTarget,
        ]
      );

      // Acknowledge to the sender
      const agentNames: Record<string, string> = {
        huck: 'Huck (Build)',
        'delta-dawn': 'Delta Dawn (Big Muddy)',
        ledger: 'Ledger (Data)',
        chuck: 'Chuck (Touring)',
        rook: 'Rook (Strategy)',
      };

      return NextResponse.json({
        text: `Routed to **${agentNames[agentTarget] || agentTarget}**. They'll respond here shortly.`,
      });
    }

    return NextResponse.json({});
  } catch (err) {
    console.error('[gchat/bot] Error processing event:', err);
    return NextResponse.json({ text: 'Error processing message.' }, { status: 500 });
  }
}
