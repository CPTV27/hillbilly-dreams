// apps/web/app/layout.tsx
// Root layout — handles global concerns: fonts, base CSS, analytics.
// Brand routing is handled by middleware.ts; each route group has its own layout.

import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import '@bigmuddy/config/tokens.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Big Muddy',
    template: '%s — Big Muddy',
  },
  description:
    'A media-hospitality ecosystem anchored in Natchez, Mississippi — touring, magazine, and radio along the Mississippi music corridor.',
  metadataBase: new URL('https://bigmuddytouring.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Big Muddy',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
    >
      <head />
      <body>{children}</body>
    </html>
  );
}
