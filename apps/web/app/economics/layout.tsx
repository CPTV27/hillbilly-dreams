// apps/web/app/economics/layout.tsx
// Outsider Economics site layout — outsidereconomics.com

import type { Metadata, Viewport } from 'next';
import { Navigation } from '@bigmuddy/ui';
import { Footer } from '@bigmuddy/ui';
import { BRANDS } from '@bigmuddy/config';
import { ThemeProvider } from '@/components/theme-provider';


export const metadata: Metadata = {
  title: {
    default: 'Outsider Economics',
    template: '%s | Outsider Economics',
  },
  description:
    'A field manual for independent economic systems. Coordination math, extraction analysis, and frameworks for building sovereign local economies.',
  metadataBase: new URL('https://outsidereconomics.com'),
  openGraph: {
    type: 'website',
    siteName: 'Outsider Economics',
    title: 'Outsider Economics — A Field Manual for Independent Economic Systems',
    description:
      'Coordination math, extraction analysis, and frameworks for building sovereign local economies.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f0e0d',
};

const brand = BRANDS.economics;

export default function EconomicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="economics">
      <div className={brand.themeClass}>
        <Navigation
          brand="economics"
          links={brand.nav.links}
          logoHref="/"
        />
        <main>{children}</main>
        <Footer brand="economics" />
      </div>
    </ThemeProvider>
  );
}
