// apps/web/app/(touring)/layout.tsx
// Touring site layout — bigmuddytouring.com

import type { Metadata } from 'next';
import { Navigation } from '@bigmuddy/ui';
import { Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: {
    default: 'Big Muddy Touring',
    template: '%s — Big Muddy Touring',
  },
  description:
    "The Mississippi's music corridor — inn, route, and travel from Memphis to New Orleans.",
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
