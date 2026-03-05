// apps/web/app/(radio)/playlists/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import { PlaylistCard, BLUR_DATA_URL } from '@bigmuddy/ui';
import type { Playlist } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: 'All Playlists',
  description: 'Every curated playlist from Big Muddy Radio — Delta blues, soul, jazz, and the full soundtrack of the Mississippi corridor.',
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

async function getPlaylists(): Promise<Playlist[]> {
  try {
    const res = await fetch(`${baseUrl}/api/playlists`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.data ?? [];
  } catch {
    return [];
  }
}

export default async function PlaylistsPage() {
  const playlists = await getPlaylists();

  return (
    <>
      {/* ── Hero Header ── */}
      <section className="playlists-hero">
        <Image
          src="https://storage.googleapis.com/bmt-media-bigmuddy/real/record-player.webp"
          alt="Vintage record player"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="playlists-hero__overlay" />
        <div className="playlists-hero__content">
          <div className="section-label">Big Muddy Radio</div>
          <h1 className="playlists-hero__title">
            The Full<br />
            <em>Collection</em>
          </h1>
          <p className="playlists-hero__sub">
            Every playlist in the Big Muddy Radio catalog — curated by theme,
            city, era, and mood along the Mississippi music corridor.
          </p>
        </div>
      </section>

      {/* ── Playlist Grid ── */}
      <section className="playlists-grid-section">
        <div className="section-container">
          <div className="playlists-grid">
            {playlists.map((pl) => (
              <PlaylistCard key={pl.id} playlist={pl} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .playlists-hero {
          position: relative;
          min-height: 50vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .playlists-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.5) 0%, rgba(15, 15, 13, 0.85) 100%);
          z-index: 1;
        }
        .playlists-hero__content {
          position: relative;
          z-index: 2;
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-20) var(--space-6) var(--space-12);
          width: 100%;
        }
        .playlists-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .playlists-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .playlists-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
          max-width: 520px;
        }

        /* ── Grid ── */
        .playlists-grid-section { background: var(--bg); }
        .playlists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--space-6);
        }
        .section-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-16) var(--space-6);
        }
        .section-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-3);
          display: block;
        }
      `}</style>
    </>
  );
}
