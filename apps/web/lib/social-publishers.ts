// apps/web/lib/social-publishers.ts
// Platform-specific social media publishers for Big Muddy Media Engine
//
// Each publisher implements the SocialPublisher interface and handles
// posting content to a specific platform via its API.

// ── Types ──

export interface PublishPayload {
  content: string;
  mediaUrls?: string[];
}

export interface PublishResult {
  success: boolean;
  platformPostId?: string;
  platformUrl?: string;
  error?: string;
}

export interface SocialPublisher {
  platform: string;
  publish(post: PublishPayload): Promise<PublishResult>;
}

// ── Twitter/X Publisher ──
// Uses Twitter API v2 with OAuth 1.0a (user context)
//
// Required env vars:
//   TWITTER_API_KEY        — Consumer / API key
//   TWITTER_API_SECRET     — Consumer / API secret
//   TWITTER_ACCESS_TOKEN   — User access token
//   TWITTER_ACCESS_SECRET  — User access token secret
//
// Setup:
// 1. Create a Twitter Developer App at https://developer.twitter.com
// 2. Enable OAuth 1.0a with read+write permissions
// 3. Generate user access token and secret in the app dashboard

import crypto from 'crypto';

function percentEncode(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

function buildOAuthHeader(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerKey: string,
  consumerSecret: string,
  token: string,
  tokenSecret: string,
): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: token,
    oauth_version: '1.0',
  };

  const allParams = { ...params, ...oauthParams };
  const sortedKeys = Object.keys(allParams).sort();
  const paramString = sortedKeys.map((k) => `${percentEncode(k)}=${percentEncode(allParams[k])}`).join('&');
  const baseString = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(paramString)}`;
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;
  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

  oauthParams['oauth_signature'] = signature;

  const headerParts = Object.keys(oauthParams)
    .sort()
    .map((k) => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`)
    .join(', ');

  return `OAuth ${headerParts}`;
}

export class TwitterPublisher implements SocialPublisher {
  platform = 'twitter';

  async publish(post: PublishPayload): Promise<PublishResult> {
    const apiKey = process.env.TWITTER_API_KEY;
    const apiSecret = process.env.TWITTER_API_SECRET;
    const accessToken = process.env.TWITTER_ACCESS_TOKEN;
    const accessSecret = process.env.TWITTER_ACCESS_SECRET;

    if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
      return { success: false, error: 'Twitter API credentials not configured. Set TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET.' };
    }

    const url = 'https://api.twitter.com/2/tweets';
    const body = JSON.stringify({ text: post.content });

    try {
      const authHeader = buildOAuthHeader('POST', url, {}, apiKey, apiSecret, accessToken, accessSecret);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data?.detail ?? data?.errors?.[0]?.message ?? `HTTP ${response.status}`;
        return { success: false, error: `Twitter API error: ${errMsg}` };
      }

      const tweetId = data?.data?.id;
      // The username is derived from the access token owner — we build a generic URL
      const platformUrl = tweetId ? `https://twitter.com/i/web/status/${tweetId}` : undefined;

      return {
        success: true,
        platformPostId: tweetId,
        platformUrl,
      };
    } catch (err) {
      return { success: false, error: `Twitter publish failed: ${err instanceof Error ? err.message : String(err)}` };
    }
  }
}

// ── Bluesky Publisher ──
// Uses the AT Protocol — no OAuth needed, just an app password
//
// Required env vars:
//   BLUESKY_HANDLE       — e.g. "hillbillydreams.bsky.social"
//   BLUESKY_APP_PASSWORD — App password from Settings > App Passwords
//
// Setup:
// 1. Go to bsky.app > Settings > App Passwords
// 2. Create a new app password
// 3. Set BLUESKY_HANDLE and BLUESKY_APP_PASSWORD in env

export class BlueskyPublisher implements SocialPublisher {
  platform = 'bluesky';

  private async createSession(handle: string, password: string): Promise<{ did: string; accessJwt: string } | null> {
    const res = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: handle, password }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { did: data.did, accessJwt: data.accessJwt };
  }

  async publish(post: PublishPayload): Promise<PublishResult> {
    const handle = process.env.BLUESKY_HANDLE;
    const appPassword = process.env.BLUESKY_APP_PASSWORD;

    if (!handle || !appPassword) {
      return { success: false, error: 'Bluesky credentials not configured. Set BLUESKY_HANDLE and BLUESKY_APP_PASSWORD.' };
    }

    try {
      const session = await this.createSession(handle, appPassword);
      if (!session) {
        return { success: false, error: 'Failed to authenticate with Bluesky. Check handle and app password.' };
      }

      const now = new Date().toISOString();
      const record = {
        $type: 'app.bsky.feed.post',
        text: post.content,
        createdAt: now,
      };

      const res = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessJwt}`,
        },
        body: JSON.stringify({
          repo: session.did,
          collection: 'app.bsky.feed.post',
          record,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.message ?? data?.error ?? `HTTP ${res.status}`;
        return { success: false, error: `Bluesky API error: ${errMsg}` };
      }

      // Extract the rkey from the URI (at://did:plc:xxx/app.bsky.feed.post/rkey)
      const uri: string = data.uri ?? '';
      const rkey = uri.split('/').pop() ?? '';
      const platformUrl = `https://bsky.app/profile/${handle}/post/${rkey}`;

      return {
        success: true,
        platformPostId: uri,
        platformUrl,
      };
    } catch (err) {
      return { success: false, error: `Bluesky publish failed: ${err instanceof Error ? err.message : String(err)}` };
    }
  }
}

// ── Instagram Publisher (Stub) ──
// Uses the Meta Graph API for Instagram Business/Creator accounts
//
// Required env vars:
//   INSTAGRAM_ACCESS_TOKEN          — Long-lived page access token
//   INSTAGRAM_BUSINESS_ACCOUNT_ID   — Instagram Business Account ID
//
// Setup requirements:
// 1. Create a Meta Developer App at https://developers.facebook.com
// 2. Add the Instagram Graph API product to the app
// 3. Connect a Facebook Page linked to an Instagram Business/Creator account
// 4. Generate a long-lived page access token (valid 60 days, must be refreshed)
// 5. Get the Instagram Business Account ID via:
//    GET /{page-id}?fields=instagram_business_account
//
// Publishing flow (two-step for images):
// Step 1: Create media container
//   POST https://graph.facebook.com/v19.0/{ig-user-id}/media
//   Body: { image_url, caption, access_token }
// Step 2: Publish the container
//   POST https://graph.facebook.com/v19.0/{ig-user-id}/media_publish
//   Body: { creation_id, access_token }
//
// Limitations:
// - Only image and video posts (no text-only posts)
// - Images must be publicly accessible URLs
// - Video uploads require polling for processing status
// - Rate limit: 25 posts per 24 hours

export class InstagramPublisher implements SocialPublisher {
  platform = 'instagram';

  async publish(post: PublishPayload): Promise<PublishResult> {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

    if (!accessToken || !accountId) {
      return { success: false, error: 'Instagram credentials not configured. Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID.' };
    }

    const imageUrl = post.mediaUrls?.[0];
    if (!imageUrl) {
      return { success: false, error: 'Instagram requires at least one image URL. Text-only posts are not supported.' };
    }

    try {
      // Step 1: Create media container
      const containerRes = await fetch(
        `https://graph.facebook.com/v19.0/${accountId}/media`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url: imageUrl,
            caption: post.content,
            access_token: accessToken,
          }),
        },
      );

      const containerData = await containerRes.json();
      if (!containerRes.ok || !containerData.id) {
        const errMsg = containerData?.error?.message ?? `HTTP ${containerRes.status}`;
        return { success: false, error: `Instagram container creation failed: ${errMsg}` };
      }

      // Step 2: Publish the container
      const publishRes = await fetch(
        `https://graph.facebook.com/v19.0/${accountId}/media_publish`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creation_id: containerData.id,
            access_token: accessToken,
          }),
        },
      );

      const publishData = await publishRes.json();
      if (!publishRes.ok || !publishData.id) {
        const errMsg = publishData?.error?.message ?? `HTTP ${publishRes.status}`;
        return { success: false, error: `Instagram publish failed: ${errMsg}` };
      }

      return {
        success: true,
        platformPostId: publishData.id,
        platformUrl: `https://www.instagram.com/p/${publishData.id}/`,
      };
    } catch (err) {
      return { success: false, error: `Instagram publish failed: ${err instanceof Error ? err.message : String(err)}` };
    }
  }
}

// ── TikTok Publisher (Stub) ──
// Uses TikTok Content Posting API (v2)
//
// Required env vars:
//   TIKTOK_ACCESS_TOKEN — OAuth 2.0 access token
//
// Setup requirements:
// 1. Register as a TikTok developer at https://developers.tiktok.com
// 2. Create an app and request the "Content Posting API" scope
// 3. App must be approved by TikTok (takes days/weeks)
// 4. Implement OAuth 2.0 flow to obtain user access token
// 5. Token must include scopes: video.upload, video.publish
//
// Publishing flow:
// Step 1: Initialize upload
//   POST https://open.tiktokapis.com/v2/post/publish/content/init/
//   Body: { post_info: { title, privacy_level }, source_info: { source, video_url } }
// Step 2: Poll for completion
//   POST https://open.tiktokapis.com/v2/post/publish/status/fetch/
//
// Limitations:
// - Video only (no image or text-only posts)
// - Videos must be publicly accessible URLs or uploaded via chunk upload
// - Privacy options: SELF_ONLY, MUTUAL_FOLLOW_FRIENDS, FOLLOWER_OF_CREATOR, PUBLIC_TO_EVERYONE
// - Requires user to authorize posting on their behalf
// - Strict rate limits and content policies

export class TikTokPublisher implements SocialPublisher {
  platform = 'tiktok';

  async publish(post: PublishPayload): Promise<PublishResult> {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

    if (!accessToken) {
      return { success: false, error: 'TikTok credentials not configured. Set TIKTOK_ACCESS_TOKEN.' };
    }

    const videoUrl = post.mediaUrls?.[0];
    if (!videoUrl) {
      return { success: false, error: 'TikTok requires a video URL. Text-only posts are not supported.' };
    }

    try {
      const res = await fetch('https://open.tiktokapis.com/v2/post/publish/content/init/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          post_info: {
            title: post.content,
            privacy_level: 'PUBLIC_TO_EVERYONE',
          },
          source_info: {
            source: 'PULL_FROM_URL',
            video_url: videoUrl,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || data?.error?.code !== 'ok') {
        const errMsg = data?.error?.message ?? `HTTP ${res.status}`;
        return { success: false, error: `TikTok API error: ${errMsg}` };
      }

      const publishId = data?.data?.publish_id;

      return {
        success: true,
        platformPostId: publishId,
        // TikTok does not return a direct URL — the video is processed async
        platformUrl: undefined,
      };
    } catch (err) {
      return { success: false, error: `TikTok publish failed: ${err instanceof Error ? err.message : String(err)}` };
    }
  }
}

// ── Publisher Registry ──

const publishers: Record<string, SocialPublisher> = {
  twitter: new TwitterPublisher(),
  bluesky: new BlueskyPublisher(),
  instagram: new InstagramPublisher(),
  tiktok: new TikTokPublisher(),
};

export function getPublisher(platform: string): SocialPublisher | null {
  return publishers[platform] ?? null;
}

export function getSupportedPlatforms(): string[] {
  return Object.keys(publishers);
}
