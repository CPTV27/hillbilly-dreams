import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listen Live',
  description: 'Stream Big Muddy Radio — same player as the main radio page.',
};

export default function RadioPlayerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
