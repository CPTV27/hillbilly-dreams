// apps/web/app/gallery/layout.tsx
// BuyCurious Art — gallery route layout
// Default theme: clean white museum (theme-gallery)
// Funky mode toggle is handled by page.tsx which swaps the class

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
    { media: '(prefers-color-scheme: dark)', color: '#fafaf8' },
    { media: '(prefers-color-scheme: light)', color: '#fafaf8' },
  ],
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="theme-gallery"
      id="gallery-theme-root"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        minHeight: '100vh',
      }}
    >
      <GalleryNav />
      <main>{children}</main>
      <Footer brand="touring" />
    </div>
  );
}
