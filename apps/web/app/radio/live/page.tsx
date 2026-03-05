// apps/web/app/(radio)/live/page.tsx
// Live sessions / upcoming events

import type { Metadata } from 'next';
import Image from 'next/image';
import { EventCard, BLUR_DATA_URL } from '@bigmuddy/ui';
import type { Event } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: 'Live Sessions',
  description: 'Upcoming live sessions from the Blues Room at the inn in Natchez, Mississippi.',
};

const EVENTS: Event[] = [
  {
    id: 1,
    name: 'Blues Room Live Session — Delta Night',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    time: '8:00 PM CT',
    artist: 'Marcus King',
    description: 'A live session from the Blues Room at the inn. Streaming live on Restream for all subscribers.',
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
    description: 'Hosted listening session with the Highway 61 playlist. Community Zoom call.',
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
  {
    id: 4,
    name: 'Delta Roots: Junior Kimbrough Tribute',
    date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    time: '8:30 PM CT',
    artist: 'Various Artists',
    description: 'A tribute to Junior Kimbrough and the hill country blues tradition. Live from the Blues Room.',
    price: '$20',
    capacity: 40,
    status: 'upcoming',
    stream: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default async function LivePage() {
  const events = EVENTS;

  return (
    <>
      {/* ── Hero Header ── */}
      <section className="live-hero">
        <Image
          src="https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp"
          alt="Live performance at the Blues Room"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="live-hero__overlay" />
        <div className="live-hero__content">
          <div className="section-label">Blues Room Live</div>
          <h1 className="live-hero__title">
            Live from<br />
            <em>Natchez</em>
          </h1>
          <p className="live-hero__sub">
            The Blues Room at the inn seats 40. Every session streams live.
            Subscribe to the newsletter for advance notice and stream links.
          </p>
        </div>
      </section>

      {/* ── Upcoming Sessions ── */}
      <section className="live-events">
        <div className="section-container">
          <div className="live-events__header">
            <h2 className="live-events__title">Upcoming Sessions</h2>
          </div>
          <div className="live-events__grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="live-info">
        <div className="section-container">
          <div className="live-info__inner">
            <div className="live-info__item">
              <h3>In-Person Tickets</h3>
              <p>The Blues Room seats 40. In-person tickets available through the reservation system. Book early — sessions sell out.</p>
            </div>
            <div className="live-info__item">
              <h3>Stream Access</h3>
              <p>All sessions stream live via Restream. Links sent to newsletter subscribers 24 hours before showtime.</p>
            </div>
            <div className="live-info__item">
              <h3>Propose a Session</h3>
              <p>Artist or label? Contact us about performing at the Blues Room. We book independently with a focus on the corridor.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero ── */
        .live-hero {
          position: relative;
          min-height: 50vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .live-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.4) 0%, rgba(15, 15, 13, 0.85) 100%);
          z-index: 1;
        }
        .live-hero__content {
          position: relative;
          z-index: 2;
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-20) var(--space-6) var(--space-12);
          width: 100%;
        }
        .live-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .live-hero__title em { font-style: italic; color: var(--accent); }
        .live-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          max-width: 520px;
          margin: 0;
        }

        /* ── Events ── */
        .live-events__header { margin-bottom: var(--space-8); }
        .live-events__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .live-events__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-5);
        }

        /* ── Info ── */
        .live-info {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .live-info__inner {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: var(--space-8);
        }
        .live-info__item h3 {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
        }
        .live-info__item p {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }

        /* ── Shared ── */
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
