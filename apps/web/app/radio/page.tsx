// apps/web/app/(radio)/page.tsx
// Radio homepage — Now Playing hero + playlists + upcoming live sessions

import type { Metadata } from 'next';
import Image from 'next/image';
import { PlaylistCard, EventCard, NewsletterSignup, IllustrationDivider, BLUR_DATA_URL } from '@bigmuddy/ui';
import type { Playlist, Event } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: 'Big Muddy Radio',
  description: 'Curated playlists and live sessions from the Mississippi music corridor.',
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

async function getPlaylists(): Promise<Playlist[]> {
  try {
    const res = await fetch(`${baseUrl}/api/playlists`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const all = Array.isArray(data) ? data : data.data ?? [];
    return all.filter((p: Playlist) => p.status === 'active');
  } catch {
    return [];
  }
}

async function getEvents(): Promise<Event[]> {
  try {
    const res = await fetch(`${baseUrl}/api/events`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const all = Array.isArray(data) ? data : data.data ?? [];
    return all
      .filter((e: Event) => e.status === 'upcoming')
      .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  } catch {
    return [];
  }
}

export default async function RadioHomepage() {
  const [playlists, events] = await Promise.all([getPlaylists(), getEvents()]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="radio-hero" style={{ backgroundImage: 'url(https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/radio-hero-vintage.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
            <a href="/radio/live" className="btn btn--ghost">
              Upcoming Live Sessions
            </a>
          </div>
        </div>
      </section>

      <IllustrationDivider variant="magnolia" />

      {/* ── Studio Detail Shots ── */}
      <section className="radio-details">
        <div className="section-container">
          <div className="radio-details__grid">
            <div className="radio-details__item radio-details__item--wide">
              <Image
                src="/images/studio-c/utopiademo-day-40.webp"
                alt="Engineer at the mixing console at Studio C, Natchez"
                width={1600}
                height={900}
                sizes="(min-width: 768px) 66vw, 100vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="radio-details__item radio-details__item--square">
              <Image
                src="/images/studio-c/utopiademo-day-45.webp"
                alt="Steinway grand piano interior — strings and hammers under dramatic studio light"
                width={800}
                height={800}
                sizes="(min-width: 768px) 33vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="radio-details__item radio-details__item--square">
              <Image
                src="/images/studio-c/utopiademo-day-5.webp"
                alt="ATEM production switcher with colorful LED buttons at Studio C"
                width={800}
                height={800}
                sizes="(min-width: 768px) 33vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="radio-details__item radio-details__item--wide">
              <Image
                src="/images/studio-c/utopiademo-day-55.webp"
                alt="Guitarist tracking with Audio-Technica headphones at Studio C"
                width={1600}
                height={900}
                sizes="(min-width: 768px) 66vw, 100vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
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

      {/* ── Live Sessions ── */}
      <section className="radio-live">
        <div className="section-container">
          <div className="section-header">
            <div>
              <div className="section-label">Blues Room Live</div>
              <h2 className="section-title-sm">Upcoming Sessions</h2>
            </div>
            <a href="/radio/live" className="section-link">Full Schedule →</a>
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
              <a href="/radio/live" className="btn btn--outline">
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
        .radio-hero__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
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
          box-shadow: var(--shadow-md);
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
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
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
        /* ── Studio Details ── */
        .radio-details {
          background: var(--bg);
          border-top: 1px solid var(--border);
        }
        .radio-details__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
        }
        @media (min-width: 768px) {
          .radio-details__grid {
            grid-template-columns: 2fr 1fr;
            gap: var(--space-4);
          }
        }
        .radio-details__item {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-lg, 8px);
        }
        .radio-details__item--wide {
          aspect-ratio: 16 / 9;
        }
        .radio-details__item--square {
          aspect-ratio: 1;
        }
        .radio-details__item img {
          transition: transform var(--duration-slow, 0.5s) var(--ease-default, ease);
        }
        .radio-details__item:hover img {
          transform: scale(1.03);
        }

        /* ── Playlists ── */
        .radio-playlists {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .radio-playlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
          box-shadow: var(--shadow-md);
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
          transition: height var(--duration-slow) var(--ease-default);
        }
        @keyframes barPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 0.6; transform: scaleY(1); }
        }
      `}</style>
    </>
  );
}
