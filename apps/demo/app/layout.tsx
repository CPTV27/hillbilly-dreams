import { Inter, Abril_Fatface } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const abril = Abril_Fatface({ weight: '400', subsets: ['latin'], variable: '--font-abril', display: 'swap' });

export const metadata = {
  title: 'Measurably Better',
  description: 'Regional Technology Provider for the Deep South',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${abril.variable}`}>
      <body style={{ margin: 0, padding: 0, fontFamily: 'var(--font-inter), sans-serif' }}>{children}</body>
    </html>
  );
}
