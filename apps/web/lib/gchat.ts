// lib/gchat.ts
// Google Chat integration — named agent roster for HDI.
// Each agent has its own webhook for attribution. All post to Agent Desk space.
// Agents can also poll for replies via /api/gchat/pending and respond via /api/gchat/reply.

export type AgentId = 'huck' | 'delta-dawn' | 'ledger' | 'chuck' | 'rook' | 'system';

const AGENT_CONFIG: Record<AgentId, { label: string; subtitle: string; webhookEnv: string }> = {
  huck:         { label: 'Huck',       subtitle: 'Build Agent',            webhookEnv: 'GCHAT_WEBHOOK_AGENT_DESK' },
  'delta-dawn': { label: 'Delta Dawn', subtitle: 'Big Muddy Ecosystem',    webhookEnv: 'GCHAT_WEBHOOK_DELTA_DAWN' },
  ledger:       { label: 'Ledger',     subtitle: 'Data & Metrics',         webhookEnv: 'GCHAT_WEBHOOK_LEDGER' },
  chuck:        { label: 'Chuck',      subtitle: 'Road Manager',           webhookEnv: 'GCHAT_WEBHOOK_CHUCK' },
  rook:         { label: 'Rook',       subtitle: 'Strategy',               webhookEnv: 'GCHAT_WEBHOOK_AGENT_DESK' },
  system:       { label: 'HDI System', subtitle: 'Automated Notification', webhookEnv: 'GCHAT_WEBHOOK_AGENT_DESK' },
};

function getWebhookUrl(agent: AgentId): string | undefined {
  const config = AGENT_CONFIG[agent];
  return config ? process.env[config.webhookEnv] : undefined;
}

interface GChatMessage {
  agent: AgentId;
  title: string;
  message: string;
  threadKey?: string;
}

/**
 * Post a card to Google Chat as a named agent.
 */
export async function gchat({ agent, title, message, threadKey }: GChatMessage): Promise<boolean> {
  const webhookUrl = getWebhookUrl(agent);

  if (!webhookUrl) {
    console.warn(`[gchat] No webhook URL for agent "${agent}". Set ${AGENT_CONFIG[agent]?.webhookEnv} env var.`);
    return false;
  }

  const config = AGENT_CONFIG[agent];

  const payload = {
    cardsV2: [{
      cardId: `${agent}-${Date.now()}`,
      card: {
        header: { title, subtitle: `${config.label} — ${config.subtitle}` },
        sections: [{ widgets: [{ textParagraph: { text: message } }] }],
      },
    }],
  };

  let url = webhookUrl;
  if (threadKey) {
    const sep = url.includes('?') ? '&' : '?';
    url += `${sep}threadKey=${encodeURIComponent(threadKey)}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`[gchat] Webhook returned ${res.status}: ${await res.text()}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[gchat] Failed to post:', err);
    return false;
  }
}

// ── Convenience helpers ──

/** Agent needs Chase's input */
export const askChase = (agent: AgentId, question: string, context?: string) =>
  gchat({
    agent,
    title: 'Need your input',
    message: context ? `${question}\n\n_Context: ${context}_` : question,
    threadKey: `ask-${agent}-${Date.now()}`,
  });

/** Operational update for Tracy/Amy */
export const notifyOps = (agent: AgentId, title: string, message: string) =>
  gchat({ agent, title, message });

/** Agent completed a task */
export const taskComplete = (agent: AgentId, taskDescription: string) =>
  gchat({ agent, title: 'Task completed', message: taskDescription });

/** Escalation — needs human attention */
export const escalate = (agent: AgentId, issue: string, severity: 'low' | 'medium' | 'high' = 'medium') =>
  gchat({
    agent,
    title: `${severity === 'high' ? '🔴' : severity === 'medium' ? '🟡' : '🟢'} Escalation`,
    message: issue,
  });

/** Simple text message (no card formatting) */
export async function gchatText(agent: AgentId, text: string): Promise<boolean> {
  const webhookUrl = getWebhookUrl(agent);
  if (!webhookUrl) return false;

  const config = AGENT_CONFIG[agent];
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `*${config.label}:* ${text}` }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
