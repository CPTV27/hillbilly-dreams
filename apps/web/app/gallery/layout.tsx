// apps/web/app/gallery/layout.tsx
// Venture Gallery — gallery route layout
// Default theme: clean white museum (theme-gallery)
// Funky mode toggle is handled by page.tsx which swaps the class

import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Footer } from '@bigmuddy/ui';
import GalleryNav from './GalleryNav';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    default: 'Chase Pierson Photography | Venture Gallery',
    template: '%s | Venture Gallery',
  },
  description:
    'Fine art photography by Chase Pierson. Landscapes, aerial panoramas, infrared, and night exposures from the Hudson Valley to the Mississippi corridor. Archival prints available.',
  metadataBase: new URL('https://venturegallery.art'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Chase Pierson Photography',
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
    <ThemeProvider defaultTheme="gallery">
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
    </ThemeProvider>
  );
}
