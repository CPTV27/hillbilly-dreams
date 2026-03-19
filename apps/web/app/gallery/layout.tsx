// apps/web/app/gallery/layout.tsx
// BuyCurious Art — gallery route layout
// Uses inline nav pattern (same as media/) since 'gallery' is a newer brand

import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Footer } from '@bigmuddy/ui';
import GalleryNav from './GalleryNav';

export const metadata: Metadata = {
  title: {
    default: 'BuyCurious Art | Original Art from the Mississippi Corridor',
    template: '%s | BuyCurious Art',
  },
  description:
    'Original art from the artists, musicians, and makers who call the Deep South home. Paintings, photography, sculpture, and more — curated from the Mississippi corridor.',
  metadataBase: new URL('https://buycurious.art'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BuyCurious Art',
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

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-touring">
      <GalleryNav />
      <main>{children}</main>
      <Footer brand="touring" />
    </div>
  );
}
