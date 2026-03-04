// apps/web/app/(touring)/inn/page.tsx
// Inn detail page — 411 N Commerce St, Natchez MS

import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsletterSignup } from '@bigmuddy/ui';

export const metadata: Metadata = {
  title: 'The Inn at Natchez',
  description:
    'Six suites at 411 N Commerce Street in Natchez, Mississippi. Each named for a legend of American music.',
};

const SUITES = [
  {
    id: 'muddy-waters',
    name: 'Muddy Waters Suite',
    tagline: 'The Father of Chicago Blues',
    description:
      'McKinley Morganfield — Muddy Waters — was born in Rolling Fork, Mississippi, a two-hour drive north. This suite faces the river, the direction he came from. King bed, cast iron soaking tub, and original hardwood floors from the 1840s.',
    amenities: ['King bed', 'River view', 'Cast iron tub', 'Record player', 'Private bath'],
    price: 'From $245/night',
    image: '/images/real/inn-blue-suite.webp',
  },
  {
    id: 'robert-johnson',
    name: 'Robert Johnson Suite',
    tagline: 'The King of the Delta Blues',
    description:
      'Twenty-nine songs. That\'s all we have. This minimal, moody suite is stripped to what matters — a great bed, a wall of darkness, and the sound of the river at night. Double queen, lined with vintage vinyl and photography.',
    amenities: ['Double queen', 'Vinyl collection', 'Exposed brick', 'Rain shower', 'Sitting nook'],
    price: 'From $195/night',
    image: '/images/real/inn-grey-suite.webp',
  },
  {
    id: 'john-lee-hooker',
    name: 'John Lee Hooker Suite',
    tagline: 'Boom Boom Boom',
    description:
      'Born in Clarksdale, John Lee Hooker played a boogie that went straight to the feet. This suite has the same effect — a turntable hardwired to the speaker system, floor-to-ceiling book and record shelves, and a claw-foot tub deep enough to think.',
    amenities: ['King bed', 'Turntable system', 'Claw-foot tub', 'Full library', 'Coffee bar'],
    price: 'From $225/night',
    image: '/images/real/inn-green-suite.webp',
  },
  {
    id: 'bb-king',
    name: 'B.B. King Suite',
    tagline: 'The Thrill Is Not Gone',
    description:
      'Riley B. King was born in Indianola, two hours north. The largest suite at the inn — a sitting room, a balcony above Commerce Street, and the warmth of a man who never stopped touring. King bed plus pullout.',
    amenities: ['King bed', 'Private balcony', 'Sitting room', 'Soaking tub', 'Writing desk'],
    price: 'From $295/night',
    image: '/images/real/inn-magenta-suite.webp',
  },
  {
    id: 'british-invasion-i',
    name: 'British Invasion I',
    tagline: 'What the British Heard',
    description:
      'When Mick Jagger, Keith Richards, Eric Clapton, and Jimmy Page came to America, they came looking for the Mississippi. This suite is the British interpretation — Victorian bones, vintage Americana, and the music that caused a continent to cross the Atlantic.',
    amenities: ['Queen bed', 'Victorian millwork', 'Vintage posters', 'Claw-foot tub', 'Reading nook'],
    price: 'From $185/night',
    image: '/images/real/inn-crimson-parlor.webp',
  },
  {
    id: 'british-invasion-ii',
    name: 'British Invasion II',
    tagline: 'The Rolling Stones Came to Chess',
    description:
      'Chess Records, Chicago, 1964. The Stones wanted to record where their heroes had recorded. This suite is that debt paid — dark, electric, and unapologetically rock and roll. King bed, standing shower, Spotify-connected speaker system.',
    amenities: ['King bed', 'Standing shower', 'Bluetooth speakers', 'Bar setup', 'Courtyard access'],
    price: 'From $205/night',
    image: '/images/real/inn-british-suite.webp',
  },
];

export default function InnPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="inn-hero">
        <Image
          src="/images/real/inn-foyer.webp"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="inn-hero__overlay" />
        <div className="inn-hero__content">
          <div className="inn-hero__eyebrow">
            <span>411 N Commerce Street · Natchez, Mississippi</span>
          </div>
          <h1 className="inn-hero__title">The Inn at Natchez</h1>
          <p className="inn-hero__sub">
            Six suites. Each named for a legend. Located in the oldest part of Natchez,
            perched above the bluff where the Mississippi bends south toward New Orleans.
          </p>
          <a
            href="https://cloudbeds.com"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Availability
          </a>
        </div>
      </section>

      {/* ── Inn Overview ── */}
      <section className="inn-overview">
        <div className="section-container">
          <div className="inn-overview__grid">
            {[
              { label: 'Location', value: 'Natchez, MS', sub: 'Old Town, above the bluff' },
              { label: 'Address', value: '411 N Commerce', sub: 'Natchez, MS 39120' },
              { label: 'Suites', value: '6', sub: 'Each named for a legend' },
              { label: 'Est.', value: 'Historic', sub: 'Built 1840s' },
            ].map((item) => (
              <div key={item.label} className="inn-stat">
                <span className="inn-stat__label">{item.label}</span>
                <span className="inn-stat__value">{item.value}</span>
                <span className="inn-stat__sub">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Suites ── */}
      <section className="inn-suites">
        <div className="section-container">
          <div className="inn-suites__header">
            <div className="section-label">The Suites</div>
            <h2 className="section-title">Six Rooms, Six Stories</h2>
            <p className="section-desc">
              Every suite is named for an artist who shaped American music and 
              who — in some way — called Mississippi home. Stay in the room, 
              hear the story.
            </p>
          </div>

          <div className="suites-list">
            {SUITES.map((suite, i) => (
              <article key={suite.id} className="suite-detail">
                <div className="suite-detail__num">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
                {suite.image && (
                  <div className="suite-detail__image-wrap">
                    <Image src={suite.image} alt={suite.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                )}
                <div className="suite-detail__body">
                  <div className="suite-detail__header">
                    <div>
                      <h3 className="suite-detail__name">{suite.name}</h3>
                      <p className="suite-detail__tagline">{suite.tagline}</p>
                    </div>
                    <span className="suite-detail__price">{suite.price}</span>
                  </div>
                  <p className="suite-detail__desc">{suite.description}</p>
                  <ul className="suite-detail__amenities">
                    {suite.amenities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Book CTA ── */}
      <section className="inn-book">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ textAlign: 'center', display: 'block' }}>Reservations</div>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-4)' }}>
            Ready to Make the Drive?
          </h2>
          <p className="section-desc" style={{ margin: '0 auto var(--space-8)', textAlign: 'center' }}>
            Book directly through our reservations system.
            All suites include breakfast, parking, and a curated welcome playlist.
          </p>
          <a
            href="https://cloudbeds.com"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Availability &amp; Book
          </a>
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        .inn-hero {
          min-height: 60vh;
          display: flex;
          align-items: center;
          background: var(--bg);
          padding: var(--space-24) var(--space-6);
          position: relative;
        }
        .inn-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.85) 0%, rgba(15, 15, 13, 0.65) 50%, rgba(15, 15, 13, 0.9) 100%);
          z-index: 1;
        }
        .inn-hero__content {
          position: relative;
          max-width: var(--container-xl);
          margin: 0 auto;
          width: 100%;
          z-index: 2;
        }
        .inn-hero__eyebrow {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-4);
        }
        .inn-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-5xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-6);
          max-width: 700px;
        }
        .inn-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 560px;
          margin: 0 0 var(--space-10);
        }
        .inn-overview {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .inn-overview__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-8);
        }
        @media (min-width: 640px) {
          .inn-overview__grid { grid-template-columns: repeat(4, 1fr); }
        }
        .inn-stat {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          padding: var(--space-6) 0;
          border-right: 1px solid var(--border-subtle);
        }
        .inn-stat:last-child { border-right: none; }
        .inn-stat__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .inn-stat__value {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
        }
        .inn-stat__sub {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
        .inn-suites__header {
          max-width: 640px;
          margin-bottom: var(--space-12);
        }
        .suites-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .suite-detail {
          display: flex;
          gap: var(--space-8);
          padding: var(--space-8) 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .suite-detail:last-child { border-bottom: none; }
        .suite-detail__num {
          flex-shrink: 0;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.5;
          padding-top: 4px;
          min-width: 32px;
        }
        .suite-detail__body { flex: 1; }
        .suite-detail__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
          flex-wrap: wrap;
        }
        .suite-detail__name {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-1);
        }
        .suite-detail__tagline {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--accent);
          font-weight: 600;
          margin: 0;
          letter-spacing: var(--tracking-wide);
        }
        .suite-detail__price {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .suite-detail__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-5);
          max-width: 680px;
        }
        .suite-detail__amenities {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .suite-detail__amenities li {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-muted);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: var(--space-1) var(--space-3);
        }
        .suite-detail__image-wrap {
          position: relative;
          width: 160px;
          min-height: 120px;
          flex-shrink: 0;
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        @media (max-width: 639px) {
          .suite-detail__image-wrap { width: 100%; min-height: 180px; }
          .suite-detail { flex-wrap: wrap; }
        }
        .inn-book {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        /* Button styles shared */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
        }
        .section-title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-snug);
          margin: 0 0 var(--space-5);
        }
        .section-desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 520px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
