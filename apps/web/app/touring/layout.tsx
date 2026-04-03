// apps/web/app/(touring)/layout.tsx
// Touring site layout — bigmuddytouring.com

import type { Metadata } from 'next';
import { Navigation } from '@bigmuddy/ui';
import { Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';
import { JsonLd, getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data';

import { ThemeProvider } from '@/components/theme-provider';
import { constructMetadata, sprinterVanOgImage, themeColor } from '../metadata';
import type { Viewport } from 'next';

export const metadata: Metadata = {
  ...constructMetadata({
    title: {
      default: 'Big Muddy Touring | Memphis to New Orleans',
      template: '%s | Big Muddy Touring',
    },
    description: "Eighteen cities. Five states. A thousand years of American music. City guides, curated playlists, live events, and lodging along the Mississippi's music corridor.",
    openGraphUrl: 'https://bigmuddytouring.com/',
    ogImage: {
      url: sprinterVanOgImage,
      width: 1200,
      height: 630,
      alt: 'Big Muddy Touring Sprinter van — Memphis to New Orleans corridor',
    },
  }),
  metadataBase: new URL('https://bigmuddytouring.com'),
};

export const viewport: Viewport = {
  themeColor,
};

const brand = BRANDS.touring;

export default function TouringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="touring">
      <div className={brand.themeClass}>
        <JsonLd schema={getOrganizationSchema()} />
        <JsonLd schema={getWebSiteSchema()} />
        <Navigation
          brand="touring"
          links={brand.nav.links}
          logoHref="/"
        />
        <main>{children}</main>
        <Footer brand="touring" />
      </div>
    </ThemeProvider>
  );
}
