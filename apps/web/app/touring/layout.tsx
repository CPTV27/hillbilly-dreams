// apps/web/app/(touring)/layout.tsx
// Touring site layout — bigmuddytouring.com

import type { Metadata } from 'next';
import { Navigation } from '@bigmuddy/ui';
import { Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';

import { constructMetadata, themeColor } from '../metadata';
import type { Viewport } from 'next';

export const metadata: Metadata = constructMetadata({
  title: {
    default: 'Big Muddy Touring | Memphis to New Orleans',
    template: '%s | Big Muddy Touring',
  },
  description: "Eighteen cities. Five states. A thousand years of American music. City guides, curated playlists, live events, and lodging along the Mississippi's music corridor.",
  path: '/touring',
});

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
    <div className={brand.themeClass}>
      <Navigation
        brand="touring"
        links={brand.nav.links}
        logoHref="/"
      />
      <main>{children}</main>
      <Footer brand="touring" />
    </div>
  );
}
