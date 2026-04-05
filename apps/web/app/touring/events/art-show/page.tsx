import type { Metadata } from 'next';
import { ArtShowApril2026Content } from '@/components/events/ArtShowApril2026Content';

export const metadata: Metadata = {
  title: 'Multimedia Art Show — April 12, Natchez',
  description:
    'Prints, projection, live music, and first Sovereign Pi demo at Big Muddy Radio Studio, Natchez, Mississippi.',
};

export default function ArtShowPage() {
  return <ArtShowApril2026Content />;
}
