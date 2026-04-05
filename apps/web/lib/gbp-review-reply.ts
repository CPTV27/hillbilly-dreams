// Server-only: post a reply to a Google Business Profile review via My Business API v4.
// Requires SocialAccount with platform google_business (or google), valid accessToken,
// and platformId = "accounts/{aid}/locations/{lid}".

export interface GbpReplyResult {
  ok: boolean;
  error?: string;
  raw?: unknown;
}

/**
 * PUT reply on a review. reviewId is the Google review ID segment (stored as Review.externalId).
 */
export async function postGbpReviewReply(params: {
  accessToken: string;
  locationResourceName: string; // accounts/X/locations/Y
  reviewExternalId: string;
  comment: string;
}): Promise<GbpReplyResult> {
  const { accessToken, locationResourceName, reviewExternalId, comment } = params;
  const trimmed = locationResourceName.replace(/^\/+|\/+$/g, '');
  const reviewName = `${trimmed}/reviews/${reviewExternalId}`;
  const url = `https://mybusiness.googleapis.com/v4/${reviewName}/reply`;

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        ok: false,
        error: (data as { error?: { message?: string } })?.error?.message || `GBP API ${res.status}`,
        raw: data,
      };
    }
    return { ok: true, raw: data };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
