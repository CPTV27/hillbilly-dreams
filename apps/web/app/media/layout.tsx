// apps/web/app/media/layout.tsx
// Deep South Directory — platform marketing site layout
// Lives at deepsouthdirectory.com → /media/ in the monorepo
// 'media' is not yet a BrandId, so we render our own nav inline
// rather than importing Navigation with an invalid brand prop.

import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Footer } from '@bigmuddy/ui';
import MediaNav from './MediaNav';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    default: 'Deep South Directory | The Local Business Network for the Mississippi Region',
    template: '%s | Deep South Directory',
  },
  description:
    'Join the directory. Get featured in the magazine, played on the radio, and listed on the touring route. AI-powered media services for local businesses along the Deep South — starting at $99/month.',
  metadataBase: new URL('https://deepsouthdirectory.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Deep South Directory',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0d' },
    { media: '(prefers-color-scheme: light)', color: '#0f0f0d' },
  ],
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="media">
      <div className="theme-touring">
        <MediaNav />
        <main>{children}</main>
        <Footer brand="touring" />
      </div>
    </ThemeProvider>
  );
}
