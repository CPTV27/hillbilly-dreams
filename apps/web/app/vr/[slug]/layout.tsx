import type { Metadata } from 'next';

const TITLES: Record<string, string> = {
  'blues-room': 'Blues Room 360',
};

type Props = { children: React.ReactNode; params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const t = TITLES[params.slug] ?? params.slug;
  return {
    title: `${t} — VR`,
    description: '360° WebXR viewer — works in Meta Quest browser and on desktop.',
  };
}

export default function VrSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
