import { prisma } from '@bigmuddy/database';

export interface BMTDispatchMessage {
  triggerId: string;
  recipientEmail: string;
  subject: string;
  body: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

/**
 * Format message body based on user's communication style preference.
 */
export function formatForStyle(body: string, style: string): string {
  switch (style) {
    case 'bulleted_brief': {
      // Convert paragraphs to bullet points, strip fluff
      const lines = body
        .split(/\n+/)
        .map(l => l.trim())
        .filter(Boolean);
      return lines.map(l => `• ${l}`).join('\n');
    }
    case 'detailed_warm': {
      // Wrap in a friendly greeting/sign-off
      return `Hey there —\n\n${body}\n\nLet me know if you have questions!\n— Big Muddy Ops`;
    }
    case 'data_heavy': {
      // Prefix with timestamp and keep raw
      const ts = new Date().toISOString().slice(0, 19).replace('T', ' ');
      return `[${ts}]\n${body}`;
    }
    default:
      return body;
  }
}

/**
 * Dispatch a message to a specific channel.
 */
export async function dispatchToChannel(
  channel: string,
  message: BMTDispatchMessage
): Promise<boolean> {
  switch (channel) {
    case 'google_chat': {
      const webhookUrl = process.env.GCHAT_WEBHOOK_URL;
      if (!webhookUrl) {
        console.warn('[dispatch] GCHAT_WEBHOOK_URL not set — skipping Google Chat');
        return false;
      }
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `*${message.subject}*\n\n${message.body}\n\n_Priority: ${message.priority} | Trigger: ${message.triggerId}_`,
        }),
      });
      return res.ok;
    }
    case 'email': {
      // Email dispatch — console.log placeholder for now
      console.log(`[dispatch:email] To: ${message.recipientEmail}`);
      console.log(`[dispatch:email] Subject: ${message.subject}`);
      console.log(`[dispatch:email] Body:\n${message.body}`);
      return true;
    }
    case 'slack': {
      const slackUrl = process.env.SLACK_WEBHOOK_URL;
      if (!slackUrl) {
        console.warn('[dispatch] SLACK_WEBHOOK_URL not set — skipping Slack');
        return false;
      }
      const res = await fetch(slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `*${message.subject}*\n${message.body}`,
        }),
      });
      return res.ok;
    }
    case 'sms': {
      console.log(`[dispatch:sms] To: ${message.recipientEmail} | ${message.subject}: ${message.body}`);
      return true;
    }
    case 'asana': {
      console.log(`[dispatch:asana] Task: ${message.subject} | ${message.body}`);
      return true;
    }
    case 'ntfy': {
      const prefix = process.env.NTFY_TOPIC_PREFIX || 'hd';
      const secret = process.env.NTFY_TOPIC_SECRET || 'dev';
      const topic = `${prefix}-alerts-${secret}`;
      const priorityMap: Record<string, string> = {
        low: '2', normal: '3', high: '4', urgent: '5',
      };
      const res = await fetch(`https://ntfy.sh/${topic}`, {
        method: 'POST',
        headers: {
          Title: message.subject,
          Priority: priorityMap[message.priority] || '3',
          Tags: message.priority === 'urgent' ? 'warning' : 'briefcase',
        },
        body: message.body,
      });
      if (!res.ok) {
        console.error(`[dispatch:ntfy] ntfy.sh returned ${res.status}`);
      }
      return res.ok;
    }
    default:
      console.warn(`[dispatch] Unknown channel: ${channel}`);
      return false;
  }
}

/**
 * Look up a user's communication preferences and dispatch through all their channels.
 */
export async function dispatchForUser(
  userId: string,
  message: Omit<BMTDispatchMessage, 'recipientEmail'>
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      communicationStyle: true,
      communicationChannels: true,
    },
  });

  if (!user || !user.email) {
    console.warn(`[dispatch] User ${userId} not found or has no email`);
    return;
  }

  const style = user.communicationStyle || 'bulleted_brief';
  const channels = user.communicationChannels || ['email'];
  const formattedBody = formatForStyle(message.body, style);

  const fullMessage: BMTDispatchMessage = {
    ...message,
    recipientEmail: user.email,
    body: formattedBody,
  };

  const results = await Promise.allSettled(
    channels.map(ch => dispatchToChannel(ch, fullMessage))
  );

  for (let i = 0; i < channels.length; i++) {
    const r = results[i];
    if (r.status === 'rejected') {
      console.error(`[dispatch] ${channels[i]} failed for user ${userId}:`, r.reason);
    }
  }
}
