// apps/web/app/entertainment/layout.tsx
// Big Muddy Entertainment — bigmuddyentertainment.com

import type { Metadata, Viewport } from 'next';
import { Navigation } from '@bigmuddy/ui';
import { Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';
import { JsonLd, getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data';

import { ThemeProvider } from '@/components/theme-provider';
import { constructMetadata, sprinterVanOgImage, themeColor } from '../metadata';

export const metadata: Metadata = {
  ...constructMetadata({
    title: {
      default: 'Big Muddy Entertainment — Your All-Access Pass to the Deep South',
      template: '%s | Big Muddy Entertainment',
    },
    description:
      'Booking, promotion, transport, and production for bands and venues along the Deep South. Big Muddy Entertainment is the music and media arm of Hillbilly Dreams, Inc.',
    openGraphUrl: 'https://bigmuddyentertainment.com/',
    ogImage: {
      url: sprinterVanOgImage,
      width: 1200,
      height: 630,
      alt: 'Big Muddy Touring Sprinter van — region transport and production',
    },
  }),
  metadataBase: new URL('https://bigmuddyentertainment.com'),
};

export const viewport: Viewport = {
  themeColor,
};

const brand = BRANDS.entertainment;

export default function EntertainmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="bm-entertainment">
      <div className={brand.themeClass}>
        <JsonLd schema={getOrganizationSchema()} />
        <JsonLd schema={getWebSiteSchema()} />
        <Navigation
          brand="entertainment"
          links={brand.nav.links}
          logoHref="/"
        />
        <main>{children}</main>
        <Footer brand="entertainment" />
      </div>
    </ThemeProvider>
  );
}
