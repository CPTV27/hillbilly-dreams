// lib/notify.ts
// Push notifications via ntfy.sh — free, no vendor lock-in, instant iOS/Android delivery.
// Agents get first alert. Humans get escalation. Chase never gets paged.

const NTFY_BASE = 'https://ntfy.sh';

export type NotifyPriority = 1 | 2 | 3 | 4 | 5;
// 1 = min, 2 = low, 3 = default, 4 = high, 5 = urgent (bypasses DND)

export type NotifyTopic = 'alerts' | 'deploys' | 'ops' | 'revenue';

const TOPIC_PREFIX = process.env.NTFY_TOPIC_PREFIX || 'hd';

function topicUrl(topic: NotifyTopic): string {
  const secret = process.env.NTFY_TOPIC_SECRET || 'dev';
  return `${NTFY_BASE}/${TOPIC_PREFIX}-${topic}-${secret}`;
}

export interface NotifyOptions {
  title: string;
  message: string;
  topic?: NotifyTopic;
  priority?: NotifyPriority;
  tags?: string[];
  /** URL to open when notification is tapped */
  click?: string;
}

export async function notify({
  title,
  message,
  topic = 'alerts',
  priority = 3,
  tags = [],
  click,
}: NotifyOptions): Promise<boolean> {
  const url = topicUrl(topic);

  const headers: Record<string, string> = {
    Title: title,
    Priority: String(priority),
  };

  if (tags.length > 0) headers.Tags = tags.join(',');
  if (click) headers.Click = click;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: message,
    });
    if (!res.ok) {
      console.error(`[notify] ntfy.sh returned ${res.status}: ${await res.text()}`);
    }
    return res.ok;
  } catch (err) {
    console.error('[notify] Failed to send push notification:', err);
    return false;
  }
}

// Convenience helpers for common events
export const notifyDeploy = (service: string, status: 'success' | 'failure') =>
  notify({
    title: `Deploy ${status === 'success' ? 'Complete' : 'FAILED'}`,
    message: `${service} deployment ${status}`,
    topic: 'deploys',
    priority: status === 'failure' ? 4 : 3,
    tags: [status === 'success' ? 'rocket' : 'x'],
  });

export const notifyRevenue = (amount: number, source: string) =>
  notify({
    title: 'Payment Received',
    message: `$${(amount / 100).toFixed(2)} from ${source}`,
    topic: 'revenue',
    priority: 2,
    tags: ['dollar', 'tada'],
  });

export const notifyAlert = (title: string, message: string) =>
  notify({ title, message, topic: 'alerts', priority: 5, tags: ['warning'] });
