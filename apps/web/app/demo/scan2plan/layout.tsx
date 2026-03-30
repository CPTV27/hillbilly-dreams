import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'S2PX | Scan2Plan Operating System',
  description: 'Enterprise-grade operating system for 3D scanning and digital twin firms. Built on Google Cloud.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#4285F4',
  width: 'device-width',
  initialScale: 1,
};

export default function Scan2PlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${outfit.variable}`} style={{ 
      fontFamily: 'var(--font-inter), sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      color: '#202124'
    }}>
      {children}
    </div>
  );
}
