// apps/web/app/(magazine)/layout.tsx
// Magazine layout — bigmuddymagazine.com
// Playfair-forward, editorial feel

import type { Metadata } from 'next';
import { Navigation, Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: {
    default: 'Big Muddy Magazine',
    template: '%s — Big Muddy Magazine',
  },
  description:
    'Long-form editorial, city guides, and stories from the Mississippi music corridor.',
};

const brand = BRANDS.magazine;

export default function MagazineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={brand.themeClass}>
      <Navigation brand="magazine" links={brand.nav.links} logoHref="/" />
      <main>{children}</main>
      <Footer brand="magazine" />
    </div>
  );
}
