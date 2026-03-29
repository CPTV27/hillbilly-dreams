// apps/web/app/platform/layout.tsx
// SuperChase platform layout — superchase.app

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'SuperChase | The Platform',
    template: '%s | SuperChase',
  },
  description:
    'SuperChase — tools, APIs, and dashboards powering the Big Muddy media network.',
  metadataBase: new URL('https://superchase.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SuperChase',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f0f0d',
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
