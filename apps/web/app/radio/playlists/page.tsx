// apps/web/app/(radio)/playlists/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import { PlaylistCard } from '@bigmuddy/ui';
import type { Playlist } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: 'All Playlists',
  description: 'Every curated playlist from Big Muddy Radio — Delta blues, soul, jazz, and the full soundtrack of the Mississippi corridor.',
};

const PLAYLISTS: Playlist[] = [
  { id: 1, name: 'Delta Blues Essentials', description: 'Robert Johnson, Muddy Waters, Howlin Wolf. The founding documents of American music.', trackCount: 42, spotifyUrl: null, coverImage: '/images/real/blues-room-harmonica.webp', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 2, name: 'Natchez After Dark', description: 'What plays in the inn after midnight. Soul, jazz, and something unnamed.', trackCount: 28, spotifyUrl: null, coverImage: '/images/real/juke-joint-interior.webp', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 3, name: 'Highway 61 North to South', description: 'Road music for the corridor. Memphis to New Orleans at 70 mph.', trackCount: 55, spotifyUrl: null, coverImage: '/images/real/blues-room-live-show.webp', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 4, name: 'New Orleans Jazz Standards', description: 'Louis Armstrong, Jelly Roll Morton, Preservation Hall Jazz Band.', trackCount: 38, spotifyUrl: null, coverImage: '/images/real/blues-room-show.webp', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 5, name: 'The British Came Looking', description: 'The Stones, the Yardbirds, Led Zeppelin — following the thread back to Mississippi.', trackCount: 44, spotifyUrl: null, coverImage: '/images/real/musician-performing.webp', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 6, name: 'Memphis Soul: Stax and Hi Records', description: 'Otis Redding, Al Green, Isaac Hayes, Sam & Dave. Memphis soul in its prime.', trackCount: 51, spotifyUrl: null, coverImage: '/images/real/record-player.webp', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 7, name: 'Clarksdale Boogie', description: 'John Lee Hooker, Junior Kimbrough, R.L. Burnside. The hill country sound.', trackCount: 33, spotifyUrl: null, coverImage: '/images/real/mississippi-river.webp', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 8, name: 'Sunday Morning in New Orleans', description: 'Gospel, jazz, and the sound of a city waking up slowly.', trackCount: 26, spotifyUrl: null, coverImage: '/images/real/inn-foyer.webp', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export default async function PlaylistsPage() {
  const playlists = PLAYLISTS;

  return (
    <>
      {/* ── Hero Header ── */}
      <section className="playlists-hero">
        <Image
          src="/images/real/record-player.webp"
          alt="Vintage record player"
          fill
          priority
          sizes="100vw"
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
