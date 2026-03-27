// apps/web/app/(radio)/layout.tsx
// Radio site layout — darker, music-forward

import type { Metadata } from 'next';
import { Navigation, Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';

import { constructMetadata, themeColor } from '../metadata';
import type { Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  ...constructMetadata({
    title: {
      default: 'Big Muddy Radio | Curated Playlists from the Mississippi Music Corridor',
      template: '%s | Big Muddy Radio',
    },
    description: 'Curated playlists, live sessions, and the soundtrack of the Mississippi music corridor.',
    path: '/radio',
  }),
  metadataBase: new URL('https://bigmuddyradio.com'),
};

export const viewport: Viewport = {
  themeColor,
};

const brand = BRANDS.radio;

export default function RadioLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="radio">
      <div className={brand.themeClass}>
        <Navigation brand="radio" links={brand.nav.links} logoHref="/" />
        <main>{children}</main>
        <Footer brand="radio" />
      </div>
    </ThemeProvider>
  );
}
