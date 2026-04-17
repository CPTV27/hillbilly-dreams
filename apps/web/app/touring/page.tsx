// apps/web/app/touring/page.tsx
// Big Muddy Touring — We bring the party.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Big Muddy Touring — We bring the party.',
  description:
    'We book the bands. We drive them there. We put them on the radio. We put them on a record. We book them a room. And we split it fair. 13 cities, Memphis to New Orleans.',
};

const SERVICES = [
  {
    num: '01',
    heading: 'BOOK',
    body: 'Real venue relationships across the corridor.',
    proof: '26 venues across 13 cities, Memphis to New Orleans.',
  },
  {
    num: '02',
    heading: 'TRANSPORT',
    body: 'Sprinter van, gear handling, no rentals required.',
    proof: 'Wrap landing this week. Yours for the run.',
  },
  {
    num: '03',
    heading: 'PROMOTE',
    body: 'Through media we own, not platforms we rent.',
    proof: 'Big Muddy Magazine + Big Muddy Radio + corridor social — every show.',
  },
  {
    num: '04',
    heading: 'RECORD',
    body: 'Sessions and releases through Big Muddy Records.',
    proof: '55 tracks in the catalog. Non-exclusive deals. You keep your masters.',
  },
  {
    num: '05',
    heading: 'HOUSE',
    body: 'The Big Muddy Inn in Natchez, on the river.',
    proof: '6 rooms. Blues Room. Production base camp.',
  },
  {
    num: '06',
    heading: 'SPLIT FAIR',
    body: '50/50 on door, merch, and streams.',
    proof: 'No platform tax. No middleman cut. Your work, your money.',
  },
] as const;

type CorridorStop = { city: string; state: string; anchor?: boolean };

const CORRIDOR: CorridorStop[] = [
  { city: 'Memphis', state: 'TN' },
  { city: 'Tunica', state: 'MS' },
  { city: 'Helena', state: 'AR' },
  { city: 'Clarksdale', state: 'MS' },
  { city: 'Greenville', state: 'MS' },
  { city: 'Indianola', state: 'MS' },
  { city: 'Yazoo City', state: 'MS' },
  { city: 'Vicksburg', state: 'MS' },
  { city: 'Natchez', state: 'MS', anchor: true },
  { city: 'St. Francisville', state: 'LA' },
  { city: 'Baton Rouge', state: 'LA' },
  { city: 'Lafayette', state: 'LA' },
  { city: 'New Orleans', state: 'LA' },
];

const SESSIONS = [
  {
    title: 'Blues Room — Friday Night Sessions',
    desc: 'Weekly live recordings at the Inn, every Friday.',
    note: 'Arrie Aslin hosts.',
  },
  {
    title: 'Save the Hall Ball — A Night at Stanton Hall',
    desc: 'Pilgrimage Garden Club fundraiser, March 2026.',
    note: 'Live recording in the magazine archive.',
  },
  {
    title: 'Amy Allen — Live at Five',
    desc: 'May 8 at the Big Muddy Inn.',
    note: 'Album showcase.',
  },
  {
    title: 'Studio C Sessions — Utopia, Woodstock NY',
    desc: 'Spring sessions for the corridor catalog.',
    note: 'Tracking now.',
  },
] as const;

// ─── shared style tokens ──────────────────────────────────────────────────────
const gold = 'var(--accent, #C8943E)';
const bg = 'var(--bg, #0a0a08)';
const text = 'var(--text, #e8e0d4)';
const muted = 'var(--text-muted, #6b635a)';
const subtle = 'rgba(200,148,62,0.12)';
const divider = '1px solid rgba(200,148,62,0.12)';

export default function TouringPage() {
  return (
    <main
      style={{
        background: bg,
        color: text,
        minHeight: '100vh',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.65) 35%, rgba(10,10,8,0.1) 70%, transparent 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)',
          }}
        >
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: gold,
              margin: '0 0 20px',
            }}
          >
            Big Muddy Touring
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              margin: '0 0 28px',
              maxWidth: '700px',
            }}
          >
            We bring<br />the party.
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              lineHeight: 1.65,
              color: 'rgba(232,224,212,0.75)',
              maxWidth: '540px',
              margin: '0 0 36px',
            }}
          >
            We book the bands. We drive them there. We put them on the radio.
            We put them on a record. We book them a room. And we split it fair.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#bands"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: bg,
                background: gold,
                padding: '14px 36px',
                textDecoration: 'none',
                borderRadius: '2px',
              }}
            >
              Bring Your Band
            </a>
            <a
              href="#venues"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: gold,
                border: `1px solid ${gold}`,
                padding: '14px 36px',
                textDecoration: 'none',
                borderRadius: '2px',
              }}
            >
              Book Your Venue
            </a>
          </div>
        </div>
      </section>

      {/* ── THE 6 THINGS WE DO ───────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderTop: divider,
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: gold,
            margin: '0 0 48px',
          }}
        >
          What we do
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '1px',
            background: subtle,
            border: divider,
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.num}
              style={{
                background: bg,
                padding: 'clamp(28px, 4vw, 48px)',
                borderBottom: divider,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: gold,
                  margin: '0 0 12px',
                  letterSpacing: '-0.02em',
                }}
              >
                {s.num}
              </p>
              <p
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: text,
                  margin: '0 0 14px',
                }}
              >
                {s.heading}
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.55,
                  color: text,
                  margin: '0 0 10px',
                }}
              >
                {s.body}
              </p>
              <p
                style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  color: muted,
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                {s.proof}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE LOOP ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderTop: divider,
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: gold,
            margin: '0 0 16px',
          }}
        >
          The Loop
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}
        >
          Memphis to New Orleans.
        </h2>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: muted,
            margin: '0 0 56px',
            maxWidth: '500px',
            lineHeight: 1.6,
          }}
        >
          The Mississippi corridor. Real cities, real rooms, real audiences.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0',
            rowGap: '12px',
          }}
        >
          {CORRIDOR.map((stop, i) => (
            <span key={stop.city} style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: stop.anchor ? 'clamp(1.1rem, 2vw, 1.4rem)' : 'clamp(0.9rem, 1.6vw, 1.1rem)',
                  fontWeight: stop.anchor ? 800 : 400,
                  color: stop.anchor ? gold : 'rgba(232,224,212,0.55)',
                  letterSpacing: stop.anchor ? '-0.02em' : '0',
                  whiteSpace: 'nowrap',
                }}
              >
                {stop.city}, {stop.state}
              </span>
              {i < CORRIDOR.length - 1 && (
                <span
                  style={{
                    color: 'rgba(200,148,62,0.3)',
                    margin: '0 10px',
                    fontSize: '0.9rem',
                  }}
                >
                  →
                </span>
              )}
            </span>
          ))}
        </div>

        <p
          style={{
            fontSize: '0.82rem',
            color: muted,
            margin: '48px 0 0',
            lineHeight: 1.6,
            maxWidth: '580px',
          }}
        >
          Working with corridor partner Sean Davis (Doug Duffey&rsquo;s manager,
          former director of the Delta Blues Museum) to expand routes through the
          Delta circuit.
        </p>
      </section>

      {/* ── THE HOUSE BAND ───────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          borderTop: divider,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/corridor/guitarist-chandelier-venue.webp"
          alt="Live music at a corridor venue"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.55) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)',
            maxWidth: '660px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
            }}
          >
            Every great scene<br />had a house band.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'rgba(232,224,212,0.7)',
              margin: '0 0 20px',
            }}
          >
            Muscle Shoals had the Swampers. Memphis had Booker T. &amp; the M.G.&rsquo;s.
            Stax had its rhythm section. Big Muddy has a rotating crew of corridor players
            who can back any artist who comes through. Singer-songwriter rolls in with no
            band? We&rsquo;ve got you. Touring act needs a fill-in horn section? Done.
          </p>
          <p
            style={{
              fontSize: '0.88rem',
              color: muted,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            If you can play, you&rsquo;re on the list. The music just has to be good.
          </p>
        </div>
      </section>

      {/* ── RECENT SESSIONS ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderTop: divider,
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: gold,
            margin: '0 0 48px',
          }}
        >
          Recent Sessions
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px',
          }}
        >
          {SESSIONS.map((session) => (
            <article
              key={session.title}
              style={{
                border: divider,
                padding: 'clamp(20px, 3vw, 32px)',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: text,
                  margin: '0 0 10px',
                }}
              >
                {session.title}
              </p>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: muted,
                  lineHeight: 1.5,
                  margin: '0 0 10px',
                }}
              >
                {session.desc}
              </p>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: gold,
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                {session.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── THREE DOORS OUT ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderTop: divider,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1px',
          background: subtle,
        }}
      >
        {/* For Bands */}
        <div
          id="bands"
          style={{
            background: bg,
            padding: 'clamp(32px, 5vw, 56px)',
          }}
        >
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: gold,
              margin: '0 0 20px',
            }}
          >
            For Bands
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
            }}
          >
            Bring your band<br />to the corridor.
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: muted,
              margin: '0 0 28px',
            }}
          >
            Submit your music. We&rsquo;ll listen. If it fits, we&rsquo;ll route a
            tour, put you on the radio, and book you a room.
          </p>
          <a
            href="mailto:bookings@bigmuddytouring.com"
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: bg,
              background: gold,
              padding: '13px 28px',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            Submit Your Band
          </a>
        </div>

        {/* For Venues */}
        <div
          id="venues"
          style={{
            background: bg,
            padding: 'clamp(32px, 5vw, 56px)',
            borderLeft: divider,
            borderRight: divider,
          }}
        >
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: gold,
              margin: '0 0 20px',
            }}
          >
            For Venues
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
            }}
          >
            Get on<br />the circuit.
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: muted,
              margin: '0 0 28px',
            }}
          >
            Tell us what you can hold and what nights are open. We&rsquo;ll bring
            confirmed acts, production support, and audience.
          </p>
          <a
            href="mailto:bookings@bigmuddytouring.com"
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: gold,
              border: `1px solid ${gold}`,
              padding: '13px 28px',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            Get on the Circuit
          </a>
        </div>

        {/* For Fans */}
        <div
          style={{
            background: bg,
            padding: 'clamp(32px, 5vw, 56px)',
          }}
        >
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: gold,
              margin: '0 0 20px',
            }}
          >
            For Fans
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
            }}
          >
            What&rsquo;s<br />coming up.
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: muted,
              margin: '0 0 28px',
            }}
          >
            Live music every week somewhere on the river. The radio plays it 24/7.
            The magazine writes about it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="/radio"
              style={{
                fontSize: '0.82rem',
                color: gold,
                textDecoration: 'none',
                borderBottom: `1px solid rgba(200,148,62,0.2)`,
                paddingBottom: '12px',
              }}
            >
              Listen to Big Muddy Radio →
            </a>
            <a
              href="/magazine"
              style={{
                fontSize: '0.82rem',
                color: gold,
                textDecoration: 'none',
                borderBottom: `1px solid rgba(200,148,62,0.2)`,
                paddingBottom: '12px',
              }}
            >
              Read the Magazine →
            </a>
            <a
              href="/touring/shows"
              style={{
                fontSize: '0.82rem',
                color: gold,
                textDecoration: 'none',
              }}
            >
              See Upcoming Shows →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: 'clamp(28px, 4vw, 48px) clamp(24px, 5vw, 80px)',
          borderTop: `1px solid rgba(200,148,62,0.08)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.65rem',
            color: 'rgba(200,148,62,0.4)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Big Muddy Touring &mdash; Natchez, Mississippi
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.12)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Powered by Measurably Better Things
        </p>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 640px) {
              #venues {
                border-left: none !important;
                border-right: none !important;
                border-top: 1px solid rgba(200,148,62,0.12);
                border-bottom: 1px solid rgba(200,148,62,0.12);
              }
            }
          `,
        }}
      />
    </main>
  );
}
