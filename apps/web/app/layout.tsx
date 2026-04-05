// apps/web/app/layout.tsx
// Root layout — handles global concerns: fonts, base CSS, analytics.
// Brand routing is handled by middleware.ts; each route group has its own layout.

import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans, Plus_Jakarta_Sans, Abril_Fatface, Inter } from 'next/font/google';
import { Analytics } from '../components/Analytics';
import { JsonLd, getOrganizationSchema } from '@/lib/structured-data';
import { EditToolbar } from '@/components/EditToolbar';
import DeltaDawnWidget from '@/components/DeltaDawnWidget';
import '@bigmuddy/config/tokens.css';
import './globals.css';

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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const abrilFatface = Abril_Fatface({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-abril',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: 'Big Muddy',
    template: '%s — Big Muddy',
  },
  description:
    'Seven brands anchored in Natchez, Mississippi — touring, magazine, radio, and records along the Deep South.',
  metadataBase: new URL('https://bigmuddytouring.com'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Big Muddy',
  },
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
      className={`${playfairDisplay.variable} ${dmSans.variable} ${plusJakartaSans.variable} ${abrilFatface.variable} ${inter.variable}`}
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
        <EditToolbar />
        {children}
        <DeltaDawnWidget />
      </body>
    </html>
  );
}
