// apps/web/app/(radio)/layout.tsx
// Radio site layout — darker, music-forward

import type { Metadata } from 'next';
import { Navigation, Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: {
    default: 'Big Muddy Radio',
    template: '%s — Big Muddy Radio',
  },
  description: 'Curated playlists, live sessions, and the soundtrack of the Mississippi music corridor.',
};

const brand = BRANDS.radio;

export default function RadioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={brand.themeClass}>
      <Navigation brand="radio" links={brand.nav.links} logoHref="/" />
      <main>{children}</main>
      <Footer brand="radio" />
    </div>
  );
}
