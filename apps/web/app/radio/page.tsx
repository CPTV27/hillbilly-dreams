// apps/web/app/(radio)/page.tsx
// Radio homepage — Now Playing hero + playlists + upcoming live sessions

import type { Metadata } from 'next';
import Image from 'next/image';
import { PlaylistCard, EventCard, NewsletterSignup, BLUR_DATA_URL } from '@bigmuddy/ui';
import type { Playlist, Event } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: 'Big Muddy Radio',
  description: 'Curated playlists and live sessions from the Mississippi music corridor.',
};

const PLACEHOLDER_PLAYLISTS: Playlist[] = [
  {
    id: 1,
    name: 'Delta Blues Essentials',
    description: 'Robert Johnson, Muddy Waters, Howlin Wolf. The founding documents of American music.',
    trackCount: 42,
    spotifyUrl: null,
    coverImage: '/images/real/blues-room-harmonica.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Natchez After Dark',
    description: 'What plays in the inn after midnight. Soul, jazz, and something unnamed.',
    trackCount: 28,
    spotifyUrl: null,
    coverImage: '/images/real/juke-joint-interior.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Highway 61 North to South',
    description: 'Road music for the corridor. Memphis to New Orleans at 70 mph.',
    trackCount: 55,
    spotifyUrl: null,
    coverImage: '/images/real/blues-room-live-show.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'New Orleans Jazz Standards',
    description: 'Louis Armstrong, Jelly Roll Morton, Preservation Hall Jazz Band.',
    trackCount: 38,
    spotifyUrl: null,
    coverImage: '/images/real/blues-room-show.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'The British Came Looking',
    description: 'The Stones, the Yardbirds, Led Zeppelin — following the thread back to Mississippi.',
    trackCount: 44,
    spotifyUrl: null,
    coverImage: '/images/real/musician-performing.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Memphis Soul: Stax and Hi Records',
    description: 'Otis Redding, Al Green, Isaac Hayes, Sam & Dave. Memphis soul in its prime.',
    trackCount: 51,
    spotifyUrl: null,
    coverImage: '/images/real/record-player.webp',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const PLACEHOLDER_EVENTS: Event[] = [
  {
    id: 1,
    name: 'Blues Room Live Session — Delta Night',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    time: '8:00 PM CT',
    artist: 'Marcus King',
    description: 'A live session from the Blues Room at the inn. Streaming on Restream.',
    price: 'Free to stream',
    capacity: 40,
    status: 'upcoming',
    stream: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Playlist Listening Session — Highway 61',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    time: '7:30 PM CT',
    artist: null,
    description: 'Hosted listening session with the Highway 61 playlist. Community call.',
    price: 'Free',
    capacity: 100,
    status: 'upcoming',
    stream: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Blues Room Live — New Orleans Jazz Night',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    time: '9:00 PM CT',
    artist: 'Tank and the Bangas',
    description: 'New Orleans Night at the Blues Room. Streaming live for subscribers.',
    price: '$15',
    capacity: 40,
    status: 'upcoming',
    stream: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default async function RadioHomepage() {
  const playlists = PLACEHOLDER_PLAYLISTS;
  const events = PLACEHOLDER_EVENTS;

  return (
    <>
      {/* ── Hero ── */}
      <section className="radio-hero">
        <Image
          src="/images/heroes/hero-bayou-mist.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="radio-hero__overlay" />
        <div className="radio-hero__bg" aria-hidden="true">
          <div className="radio-hero__wave radio-hero__wave--1" />
          <div className="radio-hero__wave radio-hero__wave--2" />
          <div className="radio-hero__wave radio-hero__wave--3" />
        </div>
        <div className="radio-hero__content">
          <div className="radio-hero__now-playing">
            <span className="radio-hero__live-dot" />
            <span>Now Playing</span>
          </div>
          <h1 className="radio-hero__title">
            Big Muddy<br />
            <em>Radio</em>
          </h1>
          <p className="radio-hero__sub">
            Curated playlists, live sessions from the Blues Room in Natchez,
            and the full soundtrack of the Mississippi music corridor.
          </p>
          <div className="radio-hero__ctas">
            <a href="/radio/playlists" className="btn btn--primary">
              Browse All Playlists
            </a>
            <a href="/live" className="btn btn--ghost">
              Upcoming Live Sessions
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Playlists ── */}
      <section className="radio-playlists">
        <div className="section-container">
          <div className="section-header">
            <div>
              <div className="section-label">Playlists</div>
              <h2 className="section-title-sm">Curated for the Corridor</h2>
            </div>
            <a href="/radio/playlists" className="section-link">All Playlists →</a>
          </div>
          <div className="radio-playlist-grid">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet ── */}
      <section className="fleet-banner">
        <div className="fleet-banner__inner">
          <Image src="/images/fleet/fleet-transit-clarksdale-crossroads.webp" alt="Big Muddy Transit at the Clarksdale crossroads" width={1600} height={893} sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} style={{ width: '100%', height: 'auto' }} />
        </div>
      </section>

      {/* ── Live Sessions ── */}
      <section className="radio-live">
        <div className="section-container">
          <div className="section-header">
            <div>
              <div className="section-label">Blues Room Live</div>
              <h2 className="section-title-sm">Upcoming Sessions</h2>
            </div>
            <a href="/live" className="section-link">Full Schedule →</a>
          </div>
          <div className="radio-events">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── What is the Blues Room ── */}
      <section className="radio-about">
        <div className="section-container">
          <div className="radio-about__inner">
            <div className="radio-about__text">
              <div className="section-label">The Blues Room</div>
              <h2 className="radio-about__title">Live from Natchez</h2>
              <p className="radio-about__desc">
                The Blues Room is the performance space at the inn — a 40-seat room 
                built for the music that made the corridor famous. Live sessions stream 
                to subscribers. Upcoming shows post here first.
              </p>
              <a href="/live" className="btn btn--outline">
                See the Schedule
              </a>
            </div>
            <div className="radio-about__visual" aria-hidden="true">
              <div className="radio-about__waveform">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="radio-about__bar"
                    style={{
                      height: `${20 + Math.sin(i * 0.8) * 40 + Math.cos(i * 0.3) * 20}%`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        /* ── Hero ── */
        .radio-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: var(--bg);
          overflow: hidden;
        }
        .radio-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.85) 0%, rgba(15, 15, 13, 0.65) 50%, rgba(15, 15, 13, 0.9) 100%);
          z-index: 1;
        }
        .radio-hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }
        .radio-hero__wave {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.1;
        }
        .radio-hero__wave--1 { top: 30%; animation: wave 8s ease-in-out infinite; }
        .radio-hero__wave--2 { top: 50%; animation: wave 6s ease-in-out infinite 1s; opacity: 0.07; }
        .radio-hero__wave--3 { top: 70%; animation: wave 10s ease-in-out infinite 2s; opacity: 0.05; }
        @keyframes wave {
          0%, 100% { transform: scaleX(0.3) translateX(-20%); opacity: 0.1; }
          50% { transform: scaleX(1.2) translateX(10%); opacity: 0.15; }
        }
        .radio-hero__content {
          position: relative;
          z-index: 3;
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-24) var(--space-6);
          width: 100%;
        }
        .radio-hero__now-playing {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-6);
          background: var(--accent-muted);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-full);
          padding: var(--space-2) var(--space-4);
        }
        .radio-hero__live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .radio-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-6);
        }
        .radio-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .radio-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 560px;
          margin: 0 0 var(--space-10);
        }
        .radio-hero__ctas {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        /* ── Playlists ── */
        .radio-playlists {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .radio-playlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: var(--space-5);
        }
        /* ── Live ── */
        .radio-events {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-5);
        }
        /* ── About Blues Room ── */
        .radio-about {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .radio-about__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          align-items: center;
        }
        @media (min-width: 768px) {
          .radio-about__inner { grid-template-columns: 1fr 1fr; }
        }
        .radio-about__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-4);
        }
        .radio-about__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-6);
        }
        .radio-about__visual {
          height: 200px;
          display: flex;
          align-items: center;
        }
        .radio-about__waveform {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 100%;
          width: 100%;
        }
        .radio-about__bar {
          flex: 1;
          background: var(--accent);
          opacity: 0.4;
          border-radius: 2px;
          animation: barPulse 3s ease-in-out infinite;
          min-height: 4px;
        }
        @keyframes barPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 0.6; transform: scaleY(1); }
        }

        /* Shared */
        .btn {
          display: inline-flex;
          align-items: center;
          padding: var(--space-3) var(--space-8);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: all var(--duration-fast) var(--ease-default);
          cursor: pointer;
          border: none;
        }
        .btn--primary { background: var(--accent); color: var(--bg); }
        .btn--primary:hover { background: var(--accent-hover); }
        .btn--ghost {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border-strong);
        }
        .btn--ghost:hover { color: var(--text); border-color: var(--accent); }
        .btn--outline {
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
        }
        .btn--outline:hover { background: var(--accent-muted); }
        .section-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-20) var(--space-6);
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
        .section-title-sm {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--space-6);
          margin-bottom: var(--space-10);
          flex-wrap: wrap;
        }
        .section-link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          white-space: nowrap;
        }
        .section-link:hover { color: var(--accent-hover); }

        /* ── Fleet Banner ── */
        .fleet-banner { padding: var(--space-8) var(--space-6); max-width: var(--container-xl); margin: 0 auto; }
        .fleet-banner__inner { border-radius: var(--radius-lg); overflow: hidden; }
        .fleet-banner__inner img { display: block; }
      `}</style>
    </>
  );
}
