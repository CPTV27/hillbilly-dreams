import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Measurably Better | The easy you\'ve been looking for',
  description: 'Automate admin overhead, synchronize QuickBooks, and gain pipeline visibility with our zero-configuration, sovereign AI engine.',
  openGraph: {
    title: 'Measurably Better',
    description: 'Automate admin overhead, synchronize QuickBooks, and gain pipeline visibility with our zero-configuration, sovereign AI engine.',
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
  return <>{children}</>;
}
