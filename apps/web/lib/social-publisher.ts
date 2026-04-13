/**
 * Native Social Publisher — publishes directly to platform APIs.
 * No Postiz dependency. Supports Facebook Pages, Instagram Business, Google Business Profile.
 *
 * Each platform requires OAuth tokens stored on SocialAccount.
 * Token refresh is handled transparently before each publish attempt.
 */

// ── Types ────────────────────────────────────────────────────

interface PublishResult {
  success: boolean;
  platformPostId?: string;
  postUrl?: string;
  error?: string;
}

interface SocialAccountWithTokens {
  id: number;
  platform: string;
  handle: string;
  platformId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: Date | null;
}

// ── Facebook / Instagram (Meta Graph API) ────────────────────

const META_GRAPH_URL = 'https://graph.facebook.com/v21.0';

async function publishToFacebook(
  account: SocialAccountWithTokens,
  content: string,
  mediaUrls: string[]
): Promise<PublishResult> {
  if (!account.accessToken || !account.platformId) {
    return { success: false, error: 'Missing access token or page ID' };
  }

  try {
    let endpoint = `${META_GRAPH_URL}/${account.platformId}/feed`;
    const params: Record<string, string> = {
      message: content,
      access_token: account.accessToken,
    };

    // If there's an image, use /photos endpoint instead
    if (mediaUrls.length > 0) {
      endpoint = `${META_GRAPH_URL}/${account.platformId}/photos`;
      params.url = mediaUrls[0];
      params.caption = content;
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params),
    });

    const data = await res.json();

    if (data.id) {
      const rawId = String(data.id);
      let postUrl = `https://www.facebook.com/${account.platformId}`;
      if (rawId.includes('_')) {
        const [pid, story] = rawId.split('_', 2);
        postUrl = `https://www.facebook.com/${pid}/posts/${story}`;
      }
      return {
        success: true,
        platformPostId: rawId,
        postUrl,
      };
    }

    return { success: false, error: data.error?.message || 'Unknown Facebook error' };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Facebook publish failed' };
  }
}

async function publishToInstagram(
  account: SocialAccountWithTokens,
  content: string,
  mediaUrls: string[]
): Promise<PublishResult> {
  if (!account.accessToken || !account.platformId) {
    return { success: false, error: 'Missing access token or IG business account ID' };
  }

  if (mediaUrls.length === 0) {
    return { success: false, error: 'Instagram requires at least one image' };
  }

  try {
    // Step 1: Create media container
    const containerRes = await fetch(`${META_GRAPH_URL}/${account.platformId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        image_url: mediaUrls[0],
        caption: content,
        access_token: account.accessToken,
      }),
    });

    const containerData = await containerRes.json();
    if (!containerData.id) {
      return { success: false, error: containerData.error?.message || 'Failed to create IG media container' };
    }

    // Step 2: Publish the container
    const publishRes = await fetch(`${META_GRAPH_URL}/${account.platformId}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        creation_id: containerData.id,
        access_token: account.accessToken,
      }),
    });

    const publishData = await publishRes.json();
    if (publishData.id) {
      return {
        success: true,
        platformPostId: publishData.id,
        postUrl: `https://instagram.com/p/${publishData.id}`,
      };
    }

    return { success: false, error: publishData.error?.message || 'IG publish failed' };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Instagram publish failed' };
  }
}

// ── Google Business Profile ──────────────────────────────────

async function publishToGoogleBusiness(
  account: SocialAccountWithTokens,
  content: string,
  mediaUrls: string[]
): Promise<PublishResult> {
  if (!account.accessToken || !account.platformId) {
    return { success: false, error: 'Missing access token or GBP location ID' };
  }

  try {
    const body: Record<string, unknown> = {
      languageCode: 'en',
      topicType: 'STANDARD',
      summary: content,
    };

    if (mediaUrls.length > 0) {
      body.media = {
        mediaFormat: 'PHOTO',
        sourceUrl: mediaUrls[0],
      };
    }

    const res = await fetch(
      `https://mybusiness.googleapis.com/v4/${account.platformId}/localPosts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${account.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (data.name) {
      return {
        success: true,
        platformPostId: data.name,
        postUrl: data.searchUrl || undefined,
      };
    }

    return { success: false, error: data.error?.message || 'GBP publish failed' };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Google Business publish failed' };
  }
}

// ── Token Refresh ───────────────────────────────────────────

/**
 * Refreshes an expired or soon-to-expire token before publishing.
 * Meta (Facebook/Instagram) long-lived tokens last ~60 days.
 * Google tokens last ~1 hour but have a refresh_token.
 * Returns the (possibly refreshed) account with a valid token,
 * or null if refresh failed.
 */
async function ensureFreshToken(
  account: SocialAccountWithTokens
): Promise<SocialAccountWithTokens | null> {
  // If no expiry is set, or token is still valid for 5+ minutes, use as-is
  if (!account.tokenExpiry || account.tokenExpiry.getTime() > Date.now() + 5 * 60 * 1000) {
    return account;
  }

  // Token is expired or expiring soon — attempt refresh
  if (!account.refreshToken) {
    return null; // No refresh token available, can't recover
  }

  const platform = account.platform.toLowerCase();

  if (platform === 'facebook' || platform === 'instagram') {
    // Meta: exchange short-lived for long-lived, or refresh long-lived
    try {
      const res = await fetch(
        `${META_GRAPH_URL}/oauth/access_token?` +
        new URLSearchParams({
          grant_type: 'fb_exchange_token',
          client_id: process.env.META_APP_ID || process.env.FACEBOOK_APP_ID || '',
          client_secret: process.env.META_APP_SECRET || process.env.FACEBOOK_APP_SECRET || '',
          fb_exchange_token: account.accessToken || '',
        }),
      );

      if (res.ok) {
        const data = await res.json();
        if (data.access_token) {
          // Persist the refreshed token — import prisma lazily to keep this file light
          const { prisma } = await import('@bigmuddy/database');
          await prisma.socialAccount.update({
            where: { id: account.id },
            data: {
              accessToken: data.access_token,
              tokenExpiry: new Date(Date.now() + (data.expires_in || 5184000) * 1000),
            },
          });
          return { ...account, accessToken: data.access_token };
        }
      }
    } catch {
      // Fall through to return null
    }
    return null;
  }

  if (platform === 'google_business' || platform === 'google') {
    // Google: standard OAuth2 refresh
    try {
      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: account.refreshToken,
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.access_token) {
          const { prisma } = await import('@bigmuddy/database');
          await prisma.socialAccount.update({
            where: { id: account.id },
            data: {
              accessToken: data.access_token,
              tokenExpiry: new Date(Date.now() + (data.expires_in || 3600) * 1000),
            },
          });
          return { ...account, accessToken: data.access_token };
        }
      }
    } catch {
      // Fall through
    }
    return null;
  }

  // Unknown platform — can't refresh, return as-is and hope for the best
  return account;
}

// ── Router ───────────────────────────────────────────────────

export async function publishPost(
  account: SocialAccountWithTokens,
  content: string,
  mediaUrls: string[]
): Promise<PublishResult> {
  // Ensure token is fresh before attempting to publish
  const freshAccount = await ensureFreshToken(account);
  if (!freshAccount) {
    return {
      success: false,
      error: `Token expired for ${account.platform}/${account.handle} and refresh failed. Re-authenticate in the admin dashboard.`,
    };
  }

  const p = freshAccount.platform.toLowerCase();
  switch (p) {
    case 'facebook':
      return publishToFacebook(freshAccount, content, mediaUrls);
    case 'instagram':
      return publishToInstagram(freshAccount, content, mediaUrls);
    case 'google_business':
    case 'google':
      return publishToGoogleBusiness(freshAccount, content, mediaUrls);
    default:
      return { success: false, error: `Unsupported platform: ${freshAccount.platform}` };
  }
}
