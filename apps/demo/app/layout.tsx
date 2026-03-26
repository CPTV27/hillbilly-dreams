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
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            /* Measurably Better (MB) - Product Default */
            --mb-bg: #FAFAF8;
            --mb-bg-alt: #F5F3EF;
            --mb-surface: #FFFFFF;
            --mb-text: #1A1A1A;
            --mb-text-secondary: #6B7280;
            --mb-text-tertiary: #9CA3AF;
            --mb-border: #E5E5E0;
            --mb-accent: #b45309;
            --mb-accent-hover: #92400e;
            --mb-font-body: var(--font-inter), -apple-system, sans-serif;
            --mb-font-display: var(--font-inter), -apple-system, sans-serif;
            --mb-font-mono: 'JetBrains Mono', monospace;
            --mb-radius: 8px;
            --mb-radius-lg: 12px;
            --mb-shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
            --mb-shadow-md: 0 4px 12px rgba(0,0,0,0.06);
            --mb-shadow-lg: 0 8px 24px rgba(0,0,0,0.08);
            --mb-max-width: 1200px;
            --mb-content-width: 720px;

            /* Big Muddy (BM) - Ecosystem Override */
            --bm-burgundy: #7B1B46;
            --bm-periwinkle: #6477AD;
            --bm-cream: #FAF7F2;
            --bm-charcoal: #2D2926;
            --bm-font-display: var(--font-abril), Georgia, serif;
            --bm-font-body: var(--font-inter), -apple-system, sans-serif;

            /* Hillbilly Dreams (HDI) - Holding Override */
            --hdi-navy: #1B2A4A;
            --hdi-slate: #4A5568;
            --hdi-bg: #F7F8FA;
            --hdi-font-display: var(--font-inter), sans-serif;
          }
          
          body {
            background-color: var(--mb-bg);
            color: var(--mb-text);
            font-family: var(--mb-font-body);
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          
          * {
            box-sizing: border-box;
          }
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
