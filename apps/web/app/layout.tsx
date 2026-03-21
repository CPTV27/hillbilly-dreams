// apps/web/app/layout.tsx
// Root layout — handles global concerns: fonts, base CSS, analytics.
// Brand routing is handled by middleware.ts; each route group has its own layout.

import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Barlow_Condensed, Space_Grotesk, Libre_Baskerville } from 'next/font/google';
import { Analytics } from '../components/Analytics';
import { JsonLd, getOrganizationSchema } from '@/lib/structured-data';
import '@bigmuddy/config/tokens.css';
import './globals.css';

// Default display + body fonts (Touring, Gallery, Admin)
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

// Radio + Records: bold condensed headlines, feels like a gig poster
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-radio',
  display: 'swap',
});

// Studio: geometric, modern, technical
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-studio',
  display: 'swap',
});

// Magazine: classic editorial serif for body text
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
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
      className={`${playfairDisplay.variable} ${dmSans.variable} ${barlowCondensed.variable} ${spaceGrotesk.variable} ${libreBaskerville.variable}`}
    >
      <head>
        <Analytics />
        {/* Microsoft Clarity — session recordings, heatmaps, rage-click detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "vyek5nvhzf");`,
          }}
        />
      </head>
      <body>
        <JsonLd schema={getOrganizationSchema()} />
        {children}
      </body>
    </html>
  );
}
