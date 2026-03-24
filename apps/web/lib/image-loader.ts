// apps/web/lib/image-loader.ts
// ─────────────────────────────────────────────────────────────
// Custom global image loader.
// Pre-optimized .webp/.avif images from our GCS bucket are served directly,
// skipping the Next.js image optimization proxy (eliminates double-hop latency).
// All other images go through the default Next.js /_next/image optimizer.
// ─────────────────────────────────────────────────────────────
// SEAM: Bucket name sourced from GCS_BUCKET env var (same as gcs.ts).
//       Each HDX sovereign sets its own bucket. BMT fallback preserved.
//
// Seam introduced: 2026-03-24 — Phase 2 Config Seams (AG)
// ─────────────────────────────────────────────────────────────

const GCS_BUCKET = process.env.GCS_BUCKET ?? 'bmt-media-bigmuddy';
const GCS_PREFIX = `https://storage.googleapis.com/${GCS_BUCKET}/`;

interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: LoaderProps): string {
  // GCS images already in modern format — serve directly from CDN.
  // Append width as a cache-busting hint (GCS ignores unknown query params)
  // so Next.js sees the width param is "used" and suppresses warnings.
  if (
    src.startsWith(GCS_PREFIX) &&
    (src.endsWith('.webp') || src.endsWith('.avif'))
  ) {
    return `${src}?w=${width}`;
  }

  // Everything else (PNGs, external URLs) goes through Next.js optimizer
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

