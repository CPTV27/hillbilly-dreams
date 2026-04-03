import { ThemeProvider } from '@/components/theme-provider';

/** Light portfolio shell — page sets its own palette; this prevents dark theme bleed from `.theme-hillbilly` ancestors. */
export default function HillbillyLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="hillbilly">
      <div style={{ background: '#faf7f2', minHeight: '100vh' }}>{children}</div>
    </ThemeProvider>
  );
}
