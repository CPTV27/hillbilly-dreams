import { ThemeProvider } from '@/components/theme-provider';

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="touring">{children}</ThemeProvider>;
}
