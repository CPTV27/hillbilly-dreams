export const dynamic = 'force-dynamic';
// POST /api/gchat/reply — Agent replies to a Google Chat message
// Agents call this to respond to a message in the original thread.
// Uses the Google Chat API (service account) to post back into the space.

import { NextRequest, NextResponse } from 'next/server';

const D1_DATABASE_ID = 'ed612d3b-967b-45ae-aacf-5ba5cc670469';
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

// Google Chat API auth — service account
const GOOGLE_CHAT_SA_KEY = process.env.GOOGLE_CHAT_SA_KEY; // JSON key as env var or path

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

  if (!res.ok) throw new Error(`D1 query failed: ${res.status}`);
  return res.json();
}

// Get Google Chat API access token from service account
async function getChatToken(): Promise<string> {
  // For now, use the webhook URL as fallback (simpler, works without SA)
  // Full SA auth will be added when the bot is registered in GCP
  throw new Error('Service account auth not yet configured — using webhook fallback');
}

// Fallback: reply via webhook (works now, before SA is configured)
async function replyViaWebhook(
  webhookUrl: string,
  agentName: string,
  agentSubtitle: string,
  text: string,
  threadKey?: string
) {
  let url = webhookUrl;
  if (threadKey) {
    const sep = url.includes('?') ? '&' : '?';
    url += `${sep}threadKey=${encodeURIComponent(threadKey)}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cardsV2: [{
        cardId: `${agentName}-reply-${Date.now()}`,
        card: {
          header: { title: agentName, subtitle: agentSubtitle },
          sections: [{ widgets: [{ textParagraph: { text } }] }],
        },
      }],
    }),
  });

  return res.ok;
}

// Agent webhook URLs — these post back into the Agent Desk space
const AGENT_WEBHOOKS: Record<string, { url: string; subtitle: string }> = {
  huck: {
    url: process.env.GCHAT_WEBHOOK_AGENT_DESK || '',
    subtitle: 'Build Agent',
  },
  'delta-dawn': {
    url: process.env.GCHAT_WEBHOOK_DELTA_DAWN || process.env.GCHAT_WEBHOOK_AGENT_DESK || '',
    subtitle: 'Big Muddy Ecosystem',
  },
  ledger: {
    url: process.env.GCHAT_WEBHOOK_AGENT_DESK || '',
    subtitle: 'Data & Metrics',
  },
  chuck: {
    url: process.env.GCHAT_WEBHOOK_CHUCK || process.env.GCHAT_WEBHOOK_AGENT_DESK || '',
    subtitle: 'Road Manager',
  },
  rook: {
    url: process.env.GCHAT_WEBHOOK_AGENT_DESK || '',
    subtitle: 'Strategy',
  },
};

interface ReplyBody {
  messageId: number;
  agent: string;
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ReplyBody = await req.json();
    const { messageId, agent, text } = body;

    if (!messageId || !agent || !text) {
      return NextResponse.json(
        { error: 'Required: messageId, agent, text' },
        { status: 400 }
      );
    }

    // Get the original message for thread context
    const result = await d1Query(
      'SELECT thread_id, space_id FROM chat_messages WHERE id = ?',
      [String(messageId)]
    );

    const original = result?.[0]?.results?.[0];
    const threadKey = original?.thread_id || `reply-${messageId}`;

    // Reply via webhook (works immediately, no SA needed)
    const agentConfig = AGENT_WEBHOOKS[agent] || AGENT_WEBHOOKS.huck;

    if (!agentConfig.url) {
      return NextResponse.json(
        { error: 'No webhook URL configured for this agent' },
        { status: 500 }
      );
    }

    const sent = await replyViaWebhook(
      agentConfig.url,
      agent.charAt(0).toUpperCase() + agent.slice(1),
      agentConfig.subtitle,
      text,
      threadKey
    );

    // Update D1 record
    await d1Query(
      `UPDATE chat_messages SET status = 'replied', replied_at = datetime('now'), reply_text = ? WHERE id = ?`,
      [text, String(messageId)]
    );

    return NextResponse.json({
      success: sent,
      messageId,
      agent,
      threadKey,
    });
  } catch (err) {
    console.error('[gchat/reply] Error:', err);
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 });
  }
}
