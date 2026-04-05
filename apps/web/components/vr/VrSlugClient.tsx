'use client';

import { useParams } from 'next/navigation';
import { Vr360Viewer } from '@/components/vr/Vr360Viewer';

const SLUG_LABELS: Record<string, string> = {
  'blues-room': 'Big Muddy Inn — Blues Room (preview)',
};

/** Public demo texture (equirectangular) — works until GCS asset + CORS are wired. */
const DEMO_PANO = 'https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg';

export default function VrSlugClient() {
  const params = useParams();
  const slug = (params?.slug as string) || 'preview';

  const base =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_VR_PANORAMA_BASE
      ? process.env.NEXT_PUBLIC_VR_PANORAMA_BASE.replace(/\/$/, '')
      : 'https://storage.googleapis.com/bmt-media-bigmuddy/vr';

  const gcsUrl = `${base}/${slug}/equirectangular.jpg`;
  const imageUrl =
    slug === 'blues-room'
      ? (process.env.NEXT_PUBLIC_VR_BLUES_ROOM_PANO ?? DEMO_PANO)
      : gcsUrl;

  const caption = SLUG_LABELS[slug] ?? `Panorama: ${slug}`;

  const footnote =
    slug === 'blues-room' && !process.env.NEXT_PUBLIC_VR_BLUES_ROOM_PANO
      ? 'Demo sky texture for WebXR smoke tests. Set NEXT_PUBLIC_VR_BLUES_ROOM_PANO to your GCS equirectangular URL when ready.'
      : `Expected object: ${gcsUrl} (CORS-enabled bucket).`;

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f0ebe0', fontFamily: 'var(--font-body, system-ui)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '1rem 1rem 0' }}>
        <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: 700, margin: '0 0 0.35rem' }}>
          {SLUG_LABELS[slug] ?? '360° view'}
        </h1>
        <p style={{ fontSize: '0.82rem', opacity: 0.5, margin: '0 0 1rem', lineHeight: 1.5 }}>
          Drag to look around. On Meta Quest, use <strong>Enter VR</strong> (HTTPS required). Public share link — no login.
        </p>
      </div>
      <Vr360Viewer imageUrl={imageUrl} caption={caption} />
      <p style={{ textAlign: 'center', fontSize: '0.72rem', opacity: 0.35, padding: '1rem', maxWidth: 620, margin: '0 auto', lineHeight: 1.45 }}>
        {footnote}
      </p>
    </main>
  );
}
