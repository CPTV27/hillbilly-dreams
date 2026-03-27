import { ThemeProvider } from '@/components/theme-provider';

export default function HillbillyLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="hillbilly">{children}</ThemeProvider>;
}
