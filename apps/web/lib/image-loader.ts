// apps/web/lib/image-loader.ts
// Custom global image loader.
// Pre-optimized .webp/.avif images from our GCS bucket are served directly,
// skipping the Next.js image optimization proxy (eliminates double-hop latency).
// All other images go through the default Next.js /_next/image optimizer.

const GCS_PREFIX = 'https://storage.googleapis.com/bmt-media-bigmuddy/';

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
