import type { Metadata } from 'next';
import { ConstellationExplorer } from '@/components/constellation/ConstellationExplorer';

export const metadata: Metadata = {
  title: 'Constellation',
  description: 'Derived ecosystem graph — touring, directory, and corridor data in Postgres.',
};

export default function ConstellationPage() {
  return <ConstellationExplorer />;
}
