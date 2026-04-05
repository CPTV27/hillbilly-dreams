// apps/web/app/hillbilly/page.tsx
// Hillbilly Dreams Inc. — holding company portfolio
// hillbillydreamsinc.com
// Light, editorial portfolio — distinct from consumer brand dark themes.

import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hillbilly Dreams Inc.',
  description:
    'A media-hospitality company anchored in Natchez, Mississippi. We run the shows, the inn, the magazine, the radio, the records, and the directory. All of it feeds all of it.',
};

/** Portfolio palette — scoped to this page (not global theme tokens). */
const c = {
  paper: '#faf7f2',
  paperWarm: '#f3ece4',
  surface: '#ffffff',
  ink: '#1a1814',
  inkMuted: '#5c5348',
  inkSoft: '#8a8174',
  border: 'rgba(26, 24, 20, 0.1)',
  accent: '#8b6914',
  accentHover: '#6d5210',
  shadow: '0 1px 2px rgba(26, 24, 20, 0.06), 0 8px 24px rgba(26, 24, 20, 0.06)',
};

const BRANDS = [
  {
    name: 'Big Muddy Touring',
    url: 'https://bigmuddytouring.com',
    what: 'The route, the inn, the shows. Thirteen cities between New Orleans and Memphis.',
    image: '/images/processed/big-muddy/sprinter-van-concept.webp',
    imageAlt: 'Tour region — Sprinter on the road',
  },
  {
    name: 'Big Muddy Magazine',
    url: 'https://bigmuddymagazine.com',
    what: 'City guides, interviews, photo essays from the region.',
    image: '/images/processed/big-muddy/natchez-brick-street-live-oaks.webp',
    imageAlt: 'Natchez brick street and live oaks',
  },
  {
    name: 'Big Muddy Radio',
    url: 'https://bigmuddyradio.com',
    what: 'Curated playlists, live sessions, the American Parlor Songbook.',
    image: '/images/radio/podcast-hero-studio-placeholder.webp',
    imageAlt: 'Radio studio — microphones and mixing console',
  },
  {
    name: 'Big Muddy Records',
    url: 'https://bigmuddyrecordlabel.com',
    what: 'Independent label. Artists own their masters.',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp',
    imageAlt: 'Blues Room live session at The Big Muddy Inn',
  },
  {
    name: 'Big Muddy Entertainment',
    url: 'https://bigmuddyentertainment.com',
    what: 'Booking, production, talent search across the Deep South.',
    image: '/images/processed/arrie-aslin-inn-portrait.webp',
    imageAlt: 'Performance in the Inn parlor',
  },
  {
    name: 'Deep South Directory',
    url: 'https://deepsouthdirectory.com',
    what: 'Local business marketing. The engine that pays for everything else.',
    image: '/images/region/natchez-downtown-sidewalk.webp',
    imageAlt: 'Main Street — Natchez sidewalk and storefronts',
  },
  {
    name: 'Outsider Economics',
    url: 'https://outsidereconomics.com',
    what: 'The field manual. Why small towns work and how to prove it.',
    image:
      'https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/01-woodcut/main-street-storefront.webp',
    imageAlt: 'Woodcut illustration — Main Street storefronts and local commerce',
  },
  {
    name: 'Venture Gallery',
    url: 'https://venturegallery.art',
    what: 'Art from regional artists. Photography, prints, limited editions.',
    image: '/images/gallery/prints/glass-house-blue-hour.webp',
    imageAlt: 'Fine art photograph — Glass House, Blue Hour',
  },
];

const TEAM = [
  { name: 'Chase Pierson', role: 'Everything Else', note: 'CEO, CTO, photographer, and the person who answers the phone.' },
  { name: 'Tracy Alderson-Allen', role: 'Finance & Inn Operations', note: 'Equity partner. Runs the numbers and the Inn.' },
  { name: 'Amy Allen', role: 'Inn & Bar Operations', note: 'Equity partner. Runs the bar and keeps the Blues Room alive.' },
];

export default function HillbillyDreamsPage() {
  return (
    <main
      style={{
        background: c.paper,
        color: c.ink,
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        minHeight: '100vh',
      }}
    >
      {/* Top rule — portfolio letterhead feel */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${c.accent} 0%, ${c.accent} 120px, ${c.border} 120px, ${c.border} 100%)`,
        }}
      />

      {/* Hero */}
      <section
        style={{
          padding: 'clamp(3rem, 8vw, 5.5rem) 1.5rem 3rem',
          maxWidth: 820,
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: c.accent,
            marginBottom: '1.25rem',
            fontWeight: 600,
          }}
        >
          Holding company · Natchez, Mississippi
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 5.5vw, 3.35rem)',
            fontWeight: 700,
            fontFamily: 'var(--font-display, Georgia, serif)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            margin: '0 0 1.5rem',
            color: c.ink,
          }}
        >
          We built a media company
          <br />
          in a town of 14,000 people.
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.75,
            color: c.inkMuted,
            maxWidth: 640,
            margin: 0,
          }}
        >
          Hillbilly Dreams Inc. runs eight brands from one building in Natchez — an inn, a record label,
          a magazine, a radio station, a touring operation, a gallery, a directory, and an economics
          publication. All of it feeds all of it. The gap isn&apos;t technology — it&apos;s organization.
        </p>
      </section>

      {/* Thesis — band on warm paper */}
      <section
        style={{
          background: c.paperWarm,
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.5rem',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: c.accent,
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            The thesis
          </h2>
          <div style={{ lineHeight: 1.85, fontSize: '1.02rem', color: c.inkMuted }}>
            <p style={{ margin: 0 }}>
              The Deep South between Memphis and New Orleans produced more American music per
              mile than anywhere on earth. The same towns that gave us blues, jazz, gospel, and rock and
              roll are still there. The talent is still there. The culture is still there.
            </p>
            <p style={{ margin: '1.35rem 0 0' }}>
              What&apos;s missing is coordination. A photographer, a radio station, a venue, a magazine, a
              record label, and a touring route — if they&apos;re all in the same building, they stop
              being separate businesses and start being an ecosystem. Every show feeds the magazine. Every
              magazine feature feeds the radio. Every radio play feeds the record label. Every record feeds
              the next show.
            </p>
            <p style={{ margin: '1.35rem 0 0', color: c.ink, fontWeight: 500 }}>
              That&apos;s not a theory. That&apos;s what we&apos;re running right now.
            </p>
          </div>
        </div>
      </section>

      {/* Brands — card grid */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', maxWidth: 1120, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: c.accent,
            marginBottom: '0.35rem',
            fontWeight: 600,
          }}
        >
          Portfolio
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.5rem, 3vw, 1.85rem)',
            fontWeight: 600,
            color: c.ink,
            margin: '0 0 2rem',
            lineHeight: 1.3,
          }}
        >
          Eight brands. One building.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {BRANDS.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                background: c.surface,
                borderRadius: 12,
                overflow: 'hidden',
                border: `1px solid ${c.border}`,
                boxShadow: c.shadow,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              className="hdi-brand-card"
            >
              <div style={{ position: 'relative', aspectRatio: '16 / 10', width: '100%' }}>
                <Image
                  src={brand.image}
                  alt={brand.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.25rem 1.35rem 1.4rem' }}>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: c.accent,
                    margin: '0 0 0.4rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {brand.name}
                  <span style={{ fontWeight: 400, color: c.inkSoft, fontSize: '0.85rem' }}> ↗</span>
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: c.inkMuted,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {brand.what}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* People */}
      <section
        style={{
          background: c.paperWarm,
          borderTop: `1px solid ${c.border}`,
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.5rem',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: c.accent,
              marginBottom: '2rem',
              fontWeight: 600,
            }}
          >
            Leadership
          </h2>
          {TEAM.map((person, i) => (
            <div
              key={person.name}
              style={{
                padding: '1.25rem 0',
                borderBottom: i < TEAM.length - 1 ? `1px solid ${c.border}` : 'none',
              }}
            >
              <p style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.15rem', color: c.ink }}>
                {person.name}
              </p>
              <p style={{ fontSize: '0.8rem', color: c.accent, margin: '0 0 0.35rem', fontWeight: 600 }}>
                {person.role}
              </p>
              <p style={{ fontSize: '0.875rem', color: c.inkMuted, margin: 0, lineHeight: 1.55 }}>
                {person.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Origin */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4.5rem) 1.5rem', maxWidth: 700, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: c.accent,
            marginBottom: '1.5rem',
            fontWeight: 600,
          }}
        >
          Origin
        </h2>
        <div style={{ lineHeight: 1.85, fontSize: '0.98rem', color: c.inkMuted }}>
          <p style={{ margin: 0 }}>
            In 2022, Chase Pierson designed a complete media production-to-distribution pipeline —
            broadcast, production, analytics, distribution — built on open source tools. It was
            architecture for running a media company at any scale.
          </p>
          <p style={{ margin: '1.25rem 0 0' }}>
            He realized the same system that runs a Viacom can run a small-town media economy. Big Muddy
            is that architecture, applied to Main Street, anchored in the Deep South.
          </p>
          <p
            style={{
              margin: '1.5rem 0 0',
              fontStyle: 'italic',
              color: c.accent,
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: '1.05rem',
            }}
          >
            The gap isn&apos;t technology — it&apos;s organization. That&apos;s what we sell.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: c.ink,
          color: c.paper,
          padding: 'clamp(3.5rem, 8vw, 5rem) 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 1.85rem)',
              fontWeight: 700,
              fontFamily: 'var(--font-display, Georgia, serif)',
              marginBottom: '0.75rem',
              color: c.paper,
            }}
          >
            Want to talk?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              marginBottom: '1.75rem',
              color: 'rgba(250, 247, 242, 0.75)',
            }}
          >
            We&apos;re always looking for musicians, businesses, and people who want to build something real
            in the region.
          </p>
          <a
            href="mailto:info@hillbillydreamsinc.com"
            style={{
              display: 'inline-block',
              padding: '0.9rem 2.25rem',
              background: c.paper,
              color: c.ink,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.02em',
              borderRadius: 6,
            }}
          >
            info@hillbillydreamsinc.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${c.border}`,
          padding: '1.75rem 1.5rem',
          textAlign: 'center',
          background: c.paper,
        }}
      >
        <p style={{ margin: '0 0 0.75rem' }}>
          <a
            href="/hillbilly/org-chart"
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: c.accent,
              textDecoration: 'none',
            }}
          >
            Who does what — org chart
          </a>
        </p>
        <p
          style={{
            fontSize: '0.65rem',
            color: c.inkSoft,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            margin: 0,
          }}
        >
          Powered by Measurably Better Things
        </p>
      </footer>

      <style>{`
        .hdi-brand-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(26, 24, 20, 0.12);
        }
      `}</style>
    </main>
  );
}
