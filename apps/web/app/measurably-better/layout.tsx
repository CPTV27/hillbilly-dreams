import { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Measurably Better Things | Run your business, not your software',
  description: 'One system that handles your reviews, social media, and customer outreach. Built for Main Street.',
  openGraph: {
    title: 'Measurably Better Things',
    description: 'One system that handles your reviews, social media, and customer outreach. Built for Main Street.',
    url: 'https://measurablybetterthings.com',
    siteName: 'Measurably Better',
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
