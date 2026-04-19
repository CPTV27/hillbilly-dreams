// apps/web/lib/page-content.ts
// Fetch pageContent documents from Sanity. Used by /pricing, /shows,
// /private-events, /account/subscriptions, /checkout/*, and eventually
// brand homepages.
//
// Resolution order:
//   1. pageContent doc matching (slug + brand) — most specific
//   2. pageContent doc matching (slug + no brand) — global default
//   3. null — caller falls back to hardcoded copy
//
// Cached 5 minutes. Sanity webhook at /api/webhooks/sanity-page-content
// invalidates on edit.

interface PageContentBlock {
  _type: string;
  children?: Array<{ _type: string; text?: string }>;
  markDefs?: unknown[];
  style?: string;
  [key: string]: unknown;
}

interface PageContentImage {
  _type: 'image';
  asset?: { _ref?: string; url?: string };
  hotspot?: { x: number; y: number };
  alt?: string;
}

export interface PageContentSection {
  title?: string;
  body?: PageContentBlock[];
  image?: PageContentImage;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface PageContent {
  _id: string;
  title: string;
  slug: string;
  brand?: string;
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSub?: string;
  heroImage?: PageContentImage;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  sections?: PageContentSection[];
  footerNote?: string;
  seoTitle?: string;
  seoDescription?: string;
  active: boolean;
}

const cache = new Map<string, { content: PageContent | null; at: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function cacheKey(slug: string, brand?: string): string {
  return `${slug}::${brand ?? '(global)'}`;
}

async function fetchFromSanity(
  slug: string,
  brand?: string
): Promise<PageContent | null> {
  const projectId = (
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    process.env.SANITY_PROJECT_ID ??
    ''
  ).trim();
  if (!projectId) return null;

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
  const apiVersion = process.env.SANITY_API_VERSION ?? '2024-01-01';

  // GROQ: find the most-specific match. Try (slug + brand), fall back to (slug + no brand).
  const brandFilter = brand
    ? `brand == "${brand}" || !defined(brand)`
    : `!defined(brand) || brand == ""`;

  const query = `*[_type == "pageContent" && slug == "${slug}" && active == true && (${brandFilter})] | order(brand desc)[0]`;
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: process.env.SANITY_READ_TOKEN
        ? { Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}` }
        : undefined,
      signal: AbortSignal.timeout(5000),
      // Next.js will revalidate this on deploy; our in-process cache is
      // the fast path during a single request's lifetime.
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: PageContent };
    return data.result ?? null;
  } catch {
    return null;
  }
}

/**
 * Load page content for a given slug (+ optional brand).
 * Returns null if no doc exists — caller renders hardcoded fallback.
 */
export async function getPageContent(
  slug: string,
  brand?: string
): Promise<PageContent | null> {
  const key = cacheKey(slug, brand);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.content;
  }

  const content = await fetchFromSanity(slug, brand);
  cache.set(key, { content, at: Date.now() });
  return content;
}

/** Invalidate cache — called from /api/webhooks/sanity-page-content. */
export function invalidatePageContentCache(slug?: string, brand?: string): void {
  if (slug && brand !== undefined) {
    cache.delete(cacheKey(slug, brand));
  } else if (slug) {
    // Clear all brand variants of this slug
    for (const k of Array.from(cache.keys())) {
      if (k.startsWith(`${slug}::`)) cache.delete(k);
    }
  } else {
    cache.clear();
  }
}

/**
 * Minimal portable-text renderer. Returns plain HTML string.
 * For richer rendering (inline images, marks, links), use @portabletext/react
 * in a client component. This is the SSR-friendly fallback.
 */
export function renderPortableTextPlain(blocks?: PageContentBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map((block) => {
      if (block._type !== 'block') return '';
      const text = (block.children ?? [])
        .filter((c) => c._type === 'span')
        .map((c) => c.text ?? '')
        .join('');
      return text;
    })
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Resolve a Sanity image asset to a displayable URL.
 * For hotspot-aware rendering use @sanity/image-url; this is the simple path.
 */
export function imageUrl(image?: PageContentImage): string | null {
  if (!image?.asset?._ref) return null;
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
  if (!projectId) return null;

  // Asset ref format: "image-<hash>-<width>x<height>-<format>"
  const ref = image.asset._ref;
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  const [, hash, dims, format] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dims}.${format}`;
}
