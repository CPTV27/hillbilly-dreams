/**
 * Postiz API Client — connects Content Studio to social publishing
 *
 * Postiz runs at localhost:4007 (dev) or a Cloud Run URL (prod).
 * Uses the /public/v1/ API which requires an API key.
 */

const POSTIZ_URL = process.env.POSTIZ_URL || 'http://localhost:4007';
const POSTIZ_API_KEY = process.env.POSTIZ_API_KEY || '';

async function postizFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${POSTIZ_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${POSTIZ_API_KEY}`,
      ...options.headers,
    },
  });
  return res.json();
}

/**
 * List connected social media accounts
 */
export async function listIntegrations() {
  return postizFetch('/public/v1/integrations');
}

/**
 * Create and schedule a social media post
 */
export async function createPost(options: {
  content: string;
  integrationIds: string[];  // Which social accounts to post to
  scheduleDate?: string;     // ISO datetime, or omit for immediate
  mediaUrls?: string[];      // Image/video URLs
}) {
  return postizFetch('/public/v1/posts', {
    method: 'POST',
    body: JSON.stringify({
      posts: options.integrationIds.map(id => ({
        content: options.content,
        integration: { id },
        settings: {},
      })),
      date: options.scheduleDate || new Date().toISOString(),
      type: 'now',
    }),
  });
}

/**
 * Upload an image from URL for use in posts
 */
export async function uploadFromUrl(url: string) {
  return postizFetch('/public/v1/upload-from-url', {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
}

/**
 * List scheduled/published posts
 */
export async function listPosts() {
  return postizFetch('/public/v1/posts');
}

/**
 * Delete a scheduled post
 */
export async function deletePost(id: string) {
  return postizFetch(`/public/v1/posts/${id}`, { method: 'DELETE' });
}

/**
 * Get analytics for a specific integration
 */
export async function getAnalytics(integrationId: string) {
  return postizFetch(`/public/v1/analytics/${integrationId}`);
}
