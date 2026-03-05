// apps/web/app/metadata.ts
import type { Metadata } from 'next';

export const siteName = 'Big Muddy Touring';
export const tagline = 'Memphis to New Orleans';
export const defaultDescription = "Eighteen cities. Five states. A thousand years of American music. City guides, curated playlists, live events, and lodging along the Mississippi's music corridor.";
export const themeColor = '#1a1816';
export const defaultOgImage = 'https://storage.googleapis.com/bmt-media-bigmuddy/heroes/hero-highway-sunset.webp';

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
}: {
  title: string | { default: string; template: string };
  description: string;
  path?: string;
}): Metadata => {
  const resolvedTitle = typeof title === 'string' ? title : title.default;

  return {
    ...sharedMetadata,
    title,
    description,
    openGraph: {
      type: 'website',
      siteName,
      title: resolvedTitle,
      description,
      url: `https://bigmuddytouring.com${path}`,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteName} — ${tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `https://bigmuddytouring.com${path}`,
    },
  };
};
