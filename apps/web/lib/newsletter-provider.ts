// apps/web/lib/newsletter-provider.ts
// Abstract newsletter provider with Mailchimp implementation + dev fallback

import crypto from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NewsletterProvider {
  subscribe(email: string, brand?: string): Promise<{ success: boolean; error?: string }>;
  unsubscribe(email: string): Promise<{ success: boolean; error?: string }>;
  sendCampaign(issue: CampaignIssue): Promise<{ success: boolean; campaignId?: string; error?: string }>;
}

export interface CampaignIssue {
  subject: string;
  htmlBody: string;
  /** Optional plain-text fallback */
  textBody?: string;
  brand?: string;
}

// ---------------------------------------------------------------------------
// Per-brand list mapping
// ---------------------------------------------------------------------------

const BRAND_LIST_MAP: Record<string, string | undefined> = {
  touring: process.env.MAILCHIMP_LIST_ID_TOURING,
  magazine: process.env.MAILCHIMP_LIST_ID_MAGAZINE,
  inn: process.env.MAILCHIMP_LIST_ID_INN,
  studio: process.env.MAILCHIMP_LIST_ID_STUDIO,
  default: process.env.MAILCHIMP_LIST_ID,
};

function getListId(brand?: string): string {
  if (brand && BRAND_LIST_MAP[brand]) {
    return BRAND_LIST_MAP[brand]!;
  }
  return process.env.MAILCHIMP_LIST_ID || '';
}

function subscriberHash(email: string): string {
  return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}

// ---------------------------------------------------------------------------
// Mailchimp provider (Marketing API v3, REST)
// ---------------------------------------------------------------------------

class MailchimpProvider implements NewsletterProvider {
  private apiKey: string;
  private server: string;

  constructor(apiKey: string, server: string) {
    this.apiKey = apiKey;
    this.server = server;
  }

  private baseUrl() {
    return `https://${this.server}.api.mailchimp.com/3.0`;
  }

  private headers(): HeadersInit {
    const encoded = Buffer.from(`anystring:${this.apiKey}`).toString('base64');
    return {
      Authorization: `Basic ${encoded}`,
      'Content-Type': 'application/json',
    };
  }

  async subscribe(email: string, brand?: string) {
    const listId = getListId(brand);
    if (!listId) {
      return { success: false, error: 'No Mailchimp list ID configured for this brand' };
    }

    try {
      const res = await fetch(`${this.baseUrl()}/lists/${listId}/members`, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          ...(brand && {
            merge_fields: { BRAND: brand },
          }),
        }),
      });

      if (res.ok) {
        return { success: true };
      }

      const data = await res.json();

      // Already subscribed — treat as success
      if (res.status === 400 && data.title === 'Member Exists') {
        return { success: true };
      }

      console.error('[Mailchimp] subscribe error', data);
      return { success: false, error: data.detail || 'Mailchimp API error' };
    } catch (err) {
      console.error('[Mailchimp] subscribe network error', err);
      return { success: false, error: 'Failed to reach Mailchimp' };
    }
  }

  async unsubscribe(email: string) {
    const listId = getListId();
    if (!listId) {
      return { success: false, error: 'No Mailchimp list ID configured' };
    }

    const hash = subscriberHash(email);

    try {
      const res = await fetch(`${this.baseUrl()}/lists/${listId}/members/${hash}`, {
        method: 'PATCH',
        headers: this.headers(),
        body: JSON.stringify({ status: 'unsubscribed' }),
      });

      if (res.ok) {
        return { success: true };
      }

      const data = await res.json();
      console.error('[Mailchimp] unsubscribe error', data);
      return { success: false, error: data.detail || 'Mailchimp API error' };
    } catch (err) {
      console.error('[Mailchimp] unsubscribe network error', err);
      return { success: false, error: 'Failed to reach Mailchimp' };
    }
  }

  async sendCampaign(issue: CampaignIssue) {
    const listId = getListId(issue.brand);
    if (!listId) {
      return { success: false, error: 'No Mailchimp list ID configured' };
    }

    try {
      // 1. Create campaign
      const createRes = await fetch(`${this.baseUrl()}/campaigns`, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({
          type: 'regular',
          recipients: { list_id: listId },
          settings: {
            subject_line: issue.subject,
            from_name: 'Big Muddy',
            reply_to: 'hello@bigmuddy.co',
          },
        }),
      });

      if (!createRes.ok) {
        const data = await createRes.json();
        console.error('[Mailchimp] create campaign error', data);
        return { success: false, error: data.detail || 'Failed to create campaign' };
      }

      const campaign = await createRes.json();
      const campaignId = campaign.id as string;

      // 2. Set campaign content
      const contentRes = await fetch(`${this.baseUrl()}/campaigns/${campaignId}/content`, {
        method: 'PUT',
        headers: this.headers(),
        body: JSON.stringify({
          html: issue.htmlBody,
          ...(issue.textBody && { plain_text: issue.textBody }),
        }),
      });

      if (!contentRes.ok) {
        const data = await contentRes.json();
        console.error('[Mailchimp] set content error', data);
        return { success: false, campaignId, error: data.detail || 'Failed to set campaign content' };
      }

      // 3. Send
      const sendRes = await fetch(`${this.baseUrl()}/campaigns/${campaignId}/actions/send`, {
        method: 'POST',
        headers: this.headers(),
      });

      if (!sendRes.ok) {
        const data = await sendRes.json();
        console.error('[Mailchimp] send error', data);
        return { success: false, campaignId, error: data.detail || 'Failed to send campaign' };
      }

      return { success: true, campaignId };
    } catch (err) {
      console.error('[Mailchimp] sendCampaign network error', err);
      return { success: false, error: 'Failed to reach Mailchimp' };
    }
  }
}

// ---------------------------------------------------------------------------
// Dev / fallback provider (no API key — logs to console)
// ---------------------------------------------------------------------------

class DevNewsletterProvider implements NewsletterProvider {
  async subscribe(email: string, brand?: string) {
    console.log(`[Newsletter Dev] subscribe: ${email} (brand: ${brand || 'default'})`);
    return { success: true };
  }

  async unsubscribe(email: string) {
    console.log(`[Newsletter Dev] unsubscribe: ${email}`);
    return { success: true };
  }

  async sendCampaign(issue: CampaignIssue) {
    console.log(`[Newsletter Dev] sendCampaign: "${issue.subject}" (brand: ${issue.brand || 'default'})`);
    return { success: true, campaignId: `dev-${Date.now()}` };
  }
}

// ---------------------------------------------------------------------------
// Singleton export
// ---------------------------------------------------------------------------

function createProvider(): NewsletterProvider {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;

  if (apiKey && server) {
    return new MailchimpProvider(apiKey, server);
  }

  console.warn('[Newsletter] No MAILCHIMP_API_KEY configured — using dev provider (logs only)');
  return new DevNewsletterProvider();
}

export const newsletterProvider: NewsletterProvider = createProvider();
