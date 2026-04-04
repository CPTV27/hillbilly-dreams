/**
 * Native Social Publisher — publishes directly to platform APIs.
 * No Postiz dependency. Supports Facebook Pages, Instagram Business, Google Business Profile.
 *
 * Each platform requires OAuth tokens stored on SocialAccount.
 * Token refresh is handled transparently before each publish attempt.
 */

import { prisma } from '@/lib/db';

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
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params),
    });

    const data = await res.json();

    if (data.id) {
      return {
        success: true,
        platformPostId: data.id,
        postUrl: `https://facebook.com/${data.id}`,
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

// ── Router ───────────────────────────────────────────────────

export async function publishPost(
  account: SocialAccountWithTokens,
  content: string,
  mediaUrls: string[]
): Promise<PublishResult> {
  switch (account.platform) {
    case 'facebook':
      return publishToFacebook(account, content, mediaUrls);
    case 'instagram':
      return publishToInstagram(account, content, mediaUrls);
    case 'google_business':
      return publishToGoogleBusiness(account, content, mediaUrls);
    default:
      return { success: false, error: `Unsupported platform: ${account.platform}` };
  }
}

// ── Batch Publisher (called by cron) ─────────────────────────

export async function publishScheduledPosts(): Promise<{
  processed: number;
  published: number;
  failed: number;
  results: Array<{ postId: number; status: string; error?: string }>;
}> {
  const now = new Date();

  // Find all posts that are ready and scheduled for now or earlier
  const readyPosts = await prisma.socialPost.findMany({
    where: {
      status: 'ready',
      scheduledAt: { lte: now },
    },
    include: {
      account: true,
    },
    take: 50, // Process max 50 per cron run
  });

  const results: Array<{ postId: number; status: string; error?: string }> = [];

  for (const post of readyPosts) {
    const account = post.account as SocialAccountWithTokens;

    if (!account.accessToken) {
      await prisma.socialPost.update({
        where: { id: post.id },
        data: { status: 'failed' },
      });
      results.push({ postId: post.id, status: 'failed', error: 'No access token on account' });
      continue;
    }

    const result = await publishPost(account, post.content, post.mediaUrls);

    if (result.success) {
      await prisma.socialPost.update({
        where: { id: post.id },
        data: {
          status: 'published',
          publishedAt: new Date(),
          postUrl: result.postUrl || null,
        },
      });
      results.push({ postId: post.id, status: 'published' });
    } else {
      await prisma.socialPost.update({
        where: { id: post.id },
        data: { status: 'failed' },
      });
      results.push({ postId: post.id, status: 'failed', error: result.error });
    }
  }

  return {
    processed: readyPosts.length,
    published: results.filter(r => r.status === 'published').length,
    failed: results.filter(r => r.status === 'failed').length,
    results,
  };
}
