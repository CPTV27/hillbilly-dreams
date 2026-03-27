// apps/web/app/(magazine)/layout.tsx
// Magazine layout — bigmuddymagazine.com
// Playfair-forward, editorial feel

import type { Metadata } from 'next';
import { Navigation, Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';

import { constructMetadata, themeColor } from '../metadata';
import type { Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  ...constructMetadata({
    title: {
      default: 'Big Muddy Magazine | Stories from the Southern Gothic Heartland',
      template: '%s | Big Muddy Magazine',
    },
    description: 'Long-form editorial, city guides, and stories from the Mississippi music corridor.',
    path: '/magazine',
  }),
  metadataBase: new URL('https://bigmuddymagazine.com'),
};

export const viewport: Viewport = {
  themeColor,
};

const brand = BRANDS.magazine;

export default function MagazineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="magazine">
      <div className={brand.themeClass}>
        <Navigation brand="magazine" links={brand.nav.links} logoHref="/" />
        <main>{children}</main>
        <Footer brand="magazine" />
      </div>
    </ThemeProvider>
  );
}
