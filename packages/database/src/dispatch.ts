import { prisma } from './index';

type AlertType = 'QA_ALERT' | 'TASK_ASSIGNED' | 'MORNING_SNAPSHOT' | 'GENERAL_UPDATE';

interface DispatchPayload {
  userId: string;
  alertType: AlertType;
  rawContent: string;
}

/**
 * The Stateless Dispatch Adapter
 * 
 * Intercepts incoming system alerts, looks up the user's communication
 * preferences and style (saved from the Onboarding Survey), formats the 
 * message accordingly, and routes it to their preferred channels.
 */
export async function dispatchAlert(payload: DispatchPayload) {
  const { userId, alertType, rawContent } = payload;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        communicationChannels: true,
        communicationStyle: true,
        asanaMemberId: true,
      }
    });

    if (!user) {
      console.warn(`[Dispatch] User ${userId} not found.`);
      return false;
    }

    const channels = user.communicationChannels || ['email'];
    const style = user.communicationStyle || 'bulleted_brief';

    // 1. FORMAT THE MESSAGE BASED ON STYLE
    let formattedMessage = rawContent;
    if (style === 'bulleted_brief') {
      formattedMessage = `• ${rawContent.replace(/\n/g, '\n• ')}`;
    } else if (style === 'data_heavy') {
      formattedMessage = `[DATA_Heavy | ${alertType}]\n${rawContent}`;
    } else if (style === 'detailed_warm') {
      formattedMessage = `Hi there!\nJust wanted to let you know about the following update:\n\n${rawContent}\n\nLet me know if you need anything else!`;
    }

    // 2. DISPATCH TO CHANNELS
    for (const channel of channels) {
      if (channel === 'asana' && user.asanaMemberId) {
        await pushToAsana(user.asanaMemberId, alertType, formattedMessage);
      } else if (channel === 'google_chat') {
        await pushToGoogleChat(userId, alertType, formattedMessage);
      } else {
        await pushToEmail(userId, alertType, formattedMessage);
      }
    }

    console.log(`[Dispatch] Alert successfully routed for User ${userId}`);
    return true;

  } catch (error) {
    console.error(`[Dispatch Error]:`, error);
    return false;
  }
}

// -- Dummy Adapters for Future Implementation --

async function pushToAsana(memberId: string, title: string, content: string) {
  console.log(`[Dispatch] Sending Asana Task to ${memberId}: ${title}`);
  const asanaToken = process.env.ASANA_PAT;
  if (!asanaToken) {
    console.error('[Dispatch] Missing ASANA_PAT environment variable. Cannot route to Asana.');
    return;
  }

  try {
    const res = await fetch('https://app.asana.com/api/1.0/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${asanaToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: title,
          notes: content,
          assignee: memberId,
          workspace: process.env.ASANA_WORKSPACE_ID, // Ensure workspace is set in env
        },
      }),
    });
    
    if (!res.ok) {
      console.error(`[Dispatch] Failed to create Asana task. Status: ${res.status}`);
    } else {
      console.log(`[Dispatch] Successfully routed task to Asana for user: ${memberId}`);
    }
  } catch (error) {
    console.error(`[Dispatch Error]: Asana Push Failed`, error);
  }
}

async function pushToGoogleChat(userId: string, title: string, content: string) {
  console.log(`Sending Google Chat to ${userId}: ${title}`);
  // Implement Google Chat Webhook POST
}

async function pushToEmail(userId: string, title: string, content: string) {
  console.log(`Sending Email to ${userId}: ${title}`);
  // Implement SMTP / Resend POST
}
