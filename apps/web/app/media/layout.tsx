// apps/web/app/media/layout.tsx
// Deep South Directory — platform marketing site layout
// Lives at deepsouthdirectory.com → /media/ in the monorepo
// 'media' is not yet a BrandId, so we render our own nav inline
// rather than importing Navigation with an invalid brand prop.

import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Footer } from '@bigmuddy/ui';
import MediaNav from './MediaNav';

export const metadata: Metadata = {
  title: {
    default: 'Deep South Directory | Media Services for Local Businesses',
    template: '%s | Deep South Directory',
  },
  description:
    'AI-powered media services for local businesses along the Mississippi corridor — powered by the Big Muddy network. Content creation, social media management, local SEO, and more — starting at $99/month.',
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
    <div className="theme-touring">
      <MediaNav />
      <main>{children}</main>
      <Footer brand="touring" />
    </div>
  );
}
