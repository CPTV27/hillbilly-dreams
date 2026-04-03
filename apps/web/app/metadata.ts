// apps/web/app/metadata.ts
import type { Metadata } from 'next';

export const siteName = 'Big Muddy Touring';
export const tagline = 'Memphis to New Orleans';
export const defaultDescription = "Eighteen cities. Five states. A thousand years of American music. City guides, curated playlists, live events, and lodging along the Mississippi's music corridor.";
export const themeColor = '#1a1816';
export const defaultOgImage = 'https://storage.googleapis.com/bmt-media-bigmuddy/heroes/hero-highway-sunset.webp';

/** Sprinter van hero — share previews for Touring + Entertainment (on-domain asset). */
export const sprinterVanOgImage = '/images/processed/big-muddy/sprinter-van-concept.webp';

export const sharedMetadata: Partial<Metadata> = {
  applicationName: siteName,
  authors: [{ name: siteName }],
  generator: 'Next.js',
  creator: siteName,
  publisher: siteName,
  metadataBase: new URL('https://bigmuddytouring.com'),
};

export const constructMetadata = ({
  title,
  description,
  path = '',
  /** Full URL for og:url + canonical when the host is not bigmuddytouring.com */
  openGraphUrl,
  /** Override default highway sunset OG/Twitter image */
  ogImage,
}: {
  title: string | { default: string; template: string };
  description: string;
  path?: string;
  openGraphUrl?: string;
  ogImage?: { url: string; width?: number; height?: number; alt: string };
}): Metadata => {
  const resolvedTitle = typeof title === 'string' ? title : title.default;
  const pageUrl = openGraphUrl ?? `https://bigmuddytouring.com${path}`;
  const og = ogImage ?? {
    url: defaultOgImage,
    width: 1200,
    height: 630,
    alt: `${siteName} — ${tagline}`,
  };

  return {
    ...sharedMetadata,
    title,
    description,
    openGraph: {
      type: 'website',
      siteName,
      title: resolvedTitle,
      description,
      url: pageUrl,
      images: [
        {
          url: og.url,
          width: og.width ?? 1200,
          height: og.height ?? 630,
          alt: og.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [og.url],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
};
