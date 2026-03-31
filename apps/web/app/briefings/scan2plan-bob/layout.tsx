import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Briefing | Scan2Plan',
  description: 'Confidential briefing document.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function BriefingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.variable} style={{
      fontFamily: 'var(--font-inter), Inter, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      color: '#202124',
    }}>
      {children}
    </div>
  );
}
