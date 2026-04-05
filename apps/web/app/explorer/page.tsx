import SpatialCanvas from '@/components/explorer/SpatialCanvas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Constellation · Measurably Better Things',
  description: 'Your business in the canvas. Zoom out to see the ecosystem. Zoom in to run it.',
};

export default function ExplorerPage() {
  return <SpatialCanvas />;
}
