// apps/web/app/media/layout.tsx
// Big Muddy Media — platform marketing site layout
// Lives at bigmuddymedia.com → /media/ in the monorepo
// 'media' is not yet a BrandId, so we render our own nav inline
// rather than importing Navigation with an invalid brand prop.

import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Footer } from '@bigmuddy/ui';
import MediaNav from './MediaNav';

export const metadata: Metadata = {
  title: {
    default: 'Big Muddy Media | Media Services for Local Businesses',
    template: '%s | Big Muddy Media',
  },
  description:
    'AI-powered media services for local businesses along the Mississippi corridor. Content creation, social media management, local SEO, and more — starting at $99/month.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Big Muddy Media',
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
    <div className="theme-touring">
      <MediaNav />
      <main>{children}</main>
      <Footer brand="touring" />
    </div>
  );
}
