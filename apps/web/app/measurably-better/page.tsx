// apps/web/app/measurably-better/page.tsx
// MBT — Institutional landing for measurablybetter.life
// Licensed civic-commerce operating system (towns, chambers, brokerages). Not a SaaS signup page.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Measurably Better Things — Local growth system for towns and districts',
  description:
    'A licensed local growth system for towns, districts, and cultural operators. Deployed as yours — proposal-based.',
};

const CAL_DEPLOYMENT_URL =
  process.env.NEXT_PUBLIC_MBT_DEPLOYMENT_CAL_URL || '';

const LIVE_URL = 'https://bigmuddytouring.com';

const HERO_IMAGE =
  'https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-main-street.webp';

const PROOF_IMAGES: { src: string; alt: string }[] = [
  {
    src: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/inn-foyer.webp',
    alt: 'Warm interior of a Mississippi inn lobby',
  },
  {
    src: 'https://storage.googleapis.com/bmt-media-bigmuddy/command/juke-joint.webp',
    alt: 'Juke joint stage and room',
  },
  {
    src: 'https://storage.googleapis.com/bmt-media-bigmuddy/touring/touring-main-street.webp',
    alt: 'Main Street in a small Southern town',
  },
];

const MODULES = [
  {
    name: 'Directory',
    desc: 'Business listings, reviews, and simple report cards so operators know what changed.',
  },
  {
    name: 'Magazine',
    desc: 'Editorial pipeline for guides, features, and photo-led stories from your place.',
  },
  {
    name: 'Radio',
    desc: 'Streaming, show blocks, playlists, and live sessions from your studio or stage.',
  },
  {
    name: 'Records',
    desc: 'Artist services — catalog, sessions, and distribution with artists keeping their work.',
  },
  {
    name: 'Touring & events',
    desc: 'Booking, ticketing, and promotion so shows feed the rest of the system.',
  },
  {
    name: 'Commerce',
    desc: 'Storefronts, payments, and subscriptions with clear splits when more than one party earns.',
  },
  {
    name: 'Broadcasting',
    desc: 'Live production out to the web, radio feed, and social from one control room.',
  },
  {
    name: 'Content support',
    desc: 'Drafts and spotlights for social, search, and voice — edited locally before anything goes live.',
  },
  {
    name: 'Analytics',
    desc: 'Monthly summaries, review alerts, and audience notes you can act on.',
  },
];

const BUYERS = [
  {
    title: 'Municipal & economic development',
    body: 'One operating picture for visitors, employers, and storefronts — without stitching six vendors together.',
  },
  {
    title: 'Chambers & main street',
    body: 'Promote members, publish events, and keep the district on one map people actually check.',
  },
  {
    title: 'Brokerages & hospitality groups',
    body: 'Give each property a live listing while the corridor shares one brand and one calendar.',
  },
  {
    title: 'Cultural venues & festivals',
    body: 'Sell tickets, run the magazine and radio touchpoints, and keep the archive in one place.',
  },
];

export default function MeasurablyBetterInstitutionalPage() {
  const primaryHref =
    CAL_DEPLOYMENT_URL ||
    'mailto:me@chasepierson.tv?subject=Deployment%20request%20%E2%80%94%20MBT';

  return (
    <main
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        minHeight: '100vh',
      }}
    >
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: 'min(92vh, 900px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(2rem, 6vw, 4rem) clamp(1.25rem, 5vw, 4rem)',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, var(--bg) 0%, transparent 45%, color-mix(in srgb, var(--bg) 55%, transparent) 100%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1rem',
            }}
          >
            Measurably Better Things
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5.5vw, 3.35rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 1.25rem',
            }}
          >
            A licensed local growth system for towns, districts, and cultural operators
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              lineHeight: 1.65,
              color: 'var(--text-muted)',
              maxWidth: '560px',
              marginBottom: '2rem',
            }}
          >
            You license the operating system. Your team owns the story, the data, and the revenue.
            Pricing is proposal-based — built around your corridor, not a generic per-seat menu.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href={primaryHref}
              target={CAL_DEPLOYMENT_URL ? '_blank' : undefined}
              rel={CAL_DEPLOYMENT_URL ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-block',
                padding: '0.85rem 1.75rem',
                backgroundColor: 'var(--accent)',
                color: 'var(--bg)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '4px',
              }}
            >
              Request a Deployment
            </a>
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.85rem 1.75rem',
                border: '1px solid color-mix(in srgb, var(--text) 28%, transparent)',
                color: 'var(--text)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                backgroundColor: 'color-mix(in srgb, var(--surface) 65%, transparent)',
              }}
            >
              See it live
            </a>
          </div>
        </div>
      </section>

      {/* Multi-stakeholder model */}
      <section
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
          borderTop: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: '0 0 0.75rem',
          }}
        >
          Many stakeholders. One ledger.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.65,
            color: 'var(--text-muted)',
            maxWidth: '640px',
            marginBottom: '2rem',
          }}
        >
          Visitors, employers, storefronts, and venues each see a different front door. Behind it is
          the same calendar, the same listings, and the same proof — so growth compounds instead of
          scattering across tools.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem',
            maxWidth: '900px',
          }}
        >
          {['Town', 'Chamber', 'Main Street', 'Venues', 'Lodging', 'Directory'].map((label) => (
            <div
              key={label}
              style={{
                padding: '1rem 1.1rem',
                borderRadius: '8px',
                border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)',
                backgroundColor: 'color-mix(in srgb, var(--surface) 80%, transparent)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textAlign: 'center',
                color: 'var(--text)',
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: '1.25rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            maxWidth: '640px',
          }}
        >
          Deployment scope and roles are set in the proposal — you are not buying a generic bundle
          and hoping it fits.
        </p>
      </section>

      {/* Nine modules */}
      <section
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
          borderTop: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
          backgroundColor: 'color-mix(in srgb, var(--surface) 40%, var(--bg))',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '0.5rem',
          }}
        >
          The nine modules
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 600,
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
          }}
        >
          Activate what the place needs
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1px',
            backgroundColor: 'color-mix(in srgb, var(--text) 12%, transparent)',
            border: '1px solid color-mix(in srgb, var(--text) 12%, transparent)',
          }}
        >
          {MODULES.map((mod) => (
            <div
              key={mod.name}
              style={{
                padding: '1.5rem 1.35rem',
                backgroundColor: 'var(--bg)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  margin: '0 0 0.5rem',
                }}
              >
                {mod.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                }}
              >
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Buyers */}
      <section
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
          borderTop: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 600,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Who buys this
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {BUYERS.map((b) => (
            <div
              key={b.title}
              style={{
                padding: '1.35rem',
                borderRadius: '10px',
                border: '1px solid color-mix(in srgb, var(--text) 12%, transparent)',
                backgroundColor: 'color-mix(in srgb, var(--surface) 35%, transparent)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  margin: '0 0 0.5rem',
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof — Natchez / Big Muddy */}
      <section
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
          borderTop: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '0.5rem',
          }}
        >
          Proof of record
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 600,
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}
        >
          Running today in Natchez and the Mississippi corridor
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.65,
            color: 'var(--text-muted)',
            maxWidth: '620px',
            marginBottom: '2rem',
          }}
        >
          Big Muddy is the live reference: touring, magazine, radio, directory, inn, and storefronts
          on one deployment — so every show and every room can feed the next without exporting
          spreadsheets.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2px',
            marginBottom: '2rem',
          }}
        >
          {PROOF_IMAGES.map((img) => (
            <div key={img.src} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '6px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { n: '9', l: 'Modules in production' },
            { n: '14+', l: 'Live brand domains' },
            { n: '1', l: 'Codebase across properties' },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                padding: '1.25rem',
                backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)',
                border: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
                borderRadius: '8px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  margin: '0 0 0.25rem',
                  lineHeight: 1,
                }}
              >
                {s.n}
              </p>
              <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section
        style={{
          padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 5vw, 4rem)',
          borderTop: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
            maxWidth: '520px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.65,
          }}
        >
          If you are ready to scope a corridor or district deployment, start with a conversation —
          not a credit card.
        </p>
        <a
          href={primaryHref}
          target={CAL_DEPLOYMENT_URL ? '_blank' : undefined}
          rel={CAL_DEPLOYMENT_URL ? 'noopener noreferrer' : undefined}
          style={{
            display: 'inline-block',
            padding: '0.85rem 1.75rem',
            backgroundColor: 'var(--accent)',
            color: 'var(--bg)',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRadius: '4px',
          }}
        >
          Request a Deployment
        </a>
      </section>

      <footer
        style={{
          padding: '2rem clamp(1.25rem, 5vw, 4rem) 3rem',
          borderTop: '1px solid color-mix(in srgb, var(--text) 10%, transparent)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            margin: '0 0 0.35rem',
          }}
        >
          Powered by Measurably Better Things
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
          Hillbilly Dreams Inc · Natchez, Mississippi
        </p>
      </footer>
    </main>
  );
}
