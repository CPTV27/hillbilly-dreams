import { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Measurably Better Things — The platform behind independent media companies',
  description: 'A complete media-hospitality platform. Directory, magazine, radio, events, commerce. One codebase, any industry, any town.',
  openGraph: {
    title: 'Measurably Better Things',
    description: 'A complete media-hospitality platform. Directory, magazine, radio, events, commerce. One codebase, any industry, any town.',
    url: 'https://measurablybetter.life',
    siteName: 'Measurably Better Things',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MeasurablyBetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider defaultTheme="mb">{children}</ThemeProvider>;
}
