// apps/web/app/hillbilly/page.tsx
// Hillbilly Dreams Inc. — the holding company page
// hillbillydreamsinc.com
// Tone: honest, direct, a little weird. The real story.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hillbilly Dreams Inc.',
  description: 'A media-hospitality company anchored in Natchez, Mississippi. We run the shows, the inn, the magazine, the radio, the records, and the directory. All of it feeds all of it.',
};

const BRANDS = [
  { name: 'Big Muddy Touring', url: 'https://bigmuddytouring.com', what: 'The route, the inn, the shows. Thirteen cities between New Orleans and Memphis.' },
  { name: 'Big Muddy Magazine', url: 'https://bigmuddymagazine.com', what: 'City guides, interviews, photo essays from the corridor.' },
  { name: 'Big Muddy Radio', url: 'https://bigmuddyradio.com', what: 'Curated playlists, live sessions, the American Parlor Songbook.' },
  { name: 'Big Muddy Records', url: 'https://bigmuddyrecords.com', what: 'Independent label. Artists own their masters.' },
  { name: 'Big Muddy Entertainment', url: 'https://bigmuddyentertainment.com', what: 'Booking, production, talent search along the corridor.' },
  { name: 'Deep South Directory', url: 'https://deepsouthdirectory.com', what: 'Local business marketing. The engine that pays for everything else.' },
  { name: 'Outsider Economics', url: 'https://outsidereconomics.com', what: 'The field manual. Why small towns work and how to prove it.' },
  { name: 'Venture Gallery', url: 'https://venturegallery.art', what: 'Art from corridor artists. Photography, prints, limited editions.' },
];

const TEAM = [
  { name: 'Chase Pierson', role: 'Everything Else', note: 'CEO, CTO, photographer, and the person who answers the phone.' },
  { name: 'Tracy Alderson-Allen', role: 'Finance & Inn Operations', note: 'Equity partner. Runs the numbers and the Inn.' },
  { name: 'Amy Allen', role: 'Inn & Bar Operations', note: 'Equity partner. Runs the bar and keeps the Blues Room alive.' },
];

export default function HillbillyDreamsPage() {
  return (
    <main style={{
      background: 'var(--bg, #0f0f0d)',
      color: 'var(--fg, #f5f0eb)',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      minHeight: '100vh',
    }}>
      {/* Hero */}
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6rem 1.5rem 4rem',
        maxWidth: 800,
        margin: '0 auto',
      }}>
        <p style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--accent, #c8943e)',
          marginBottom: '1.5rem',
          fontWeight: 600,
        }}>
          Natchez, Mississippi
        </p>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-display, Georgia, serif)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          margin: '0 0 2rem',
        }}>
          We built a media company<br />
          in a town of 14,000 people.
        </h1>
        <p style={{
          fontSize: '1.15rem',
          lineHeight: 1.7,
          opacity: 0.7,
          maxWidth: 640,
        }}>
          Hillbilly Dreams Inc. is a holding company that runs eight brands
          from one building in Natchez, Mississippi. An inn, a record label,
          a magazine, a radio station, a touring operation, a gallery, a
          directory, and an economics publication. All of it feeds all of it.
          The gap isn&apos;t technology — it&apos;s organization.
        </p>
      </section>

      {/* The Thesis */}
      <section style={{
        borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
        padding: '4rem 1.5rem',
        maxWidth: 700,
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--accent, #c8943e)',
          marginBottom: '1.5rem',
        }}>
          The Thesis
        </h2>
        <div style={{ lineHeight: 1.8, opacity: 0.75, fontSize: '1rem' }}>
          <p>
            The Mississippi corridor between Memphis and New Orleans produced
            more American music per mile than anywhere on earth. The same towns
            that gave us blues, jazz, gospel, and rock and roll are still there.
            The talent is still there. The culture is still there.
          </p>
          <p style={{ marginTop: '1.25rem' }}>
            What&apos;s missing is coordination. A photographer, a radio station,
            a venue, a magazine, a record label, and a touring route — if they&apos;re
            all in the same building, they stop being separate businesses and
            start being an ecosystem. Every show feeds the magazine. Every
            magazine feature feeds the radio. Every radio play feeds the record
            label. Every record feeds the next show.
          </p>
          <p style={{ marginTop: '1.25rem' }}>
            That&apos;s not a theory. That&apos;s what we&apos;re running right now.
          </p>
        </div>
      </section>

      {/* Photo break */}
      <div style={{
        width: '100%',
        height: 300,
        backgroundImage: 'url(/images/corridor/inn-hallway-gathering.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.75,
      }} role="img" aria-label="Guests gathering at The Big Muddy Inn" />

      {/* The Brands */}
      <section style={{
        borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
        padding: '4rem 1.5rem',
        maxWidth: 900,
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--accent, #c8943e)',
          marginBottom: '2rem',
        }}>
          Eight Brands. One Building.
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          border: '1px solid var(--border, rgba(255,255,255,0.08))',
        }}>
          {BRANDS.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '1.5rem',
                textDecoration: 'none',
                background: 'var(--bg, #0f0f0d)',
                borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))',
              }}
            >
              <p style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--accent, #c8943e)',
                margin: '0 0 0.35rem',
              }}>
                {brand.name}
              </p>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--fg, #f5f0eb)',
                opacity: 0.55,
                lineHeight: 1.5,
                margin: 0,
              }}>
                {brand.what}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* The People */}
      <section style={{
        borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
        padding: '4rem 1.5rem',
        maxWidth: 700,
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--accent, #c8943e)',
          marginBottom: '2rem',
        }}>
          The People
        </h2>
        {TEAM.map((person, i) => (
          <div key={person.name} style={{
            padding: '1.25rem 0',
            borderBottom: i < TEAM.length - 1 ? '1px solid var(--border, rgba(255,255,255,0.08))' : 'none',
          }}>
            <p style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              margin: '0 0 0.15rem',
            }}>
              {person.name}
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--accent, #c8943e)',
              margin: '0 0 0.35rem',
            }}>
              {person.role}
            </p>
            <p style={{
              fontSize: '0.85rem',
              opacity: 0.5,
              margin: 0,
              lineHeight: 1.5,
            }}>
              {person.note}
            </p>
          </div>
        ))}
      </section>

      {/* Origin */}
      <section style={{
        borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
        padding: '4rem 1.5rem',
        maxWidth: 700,
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--accent, #c8943e)',
          marginBottom: '1.5rem',
        }}>
          The Origin
        </h2>
        <div style={{ lineHeight: 1.8, opacity: 0.7, fontSize: '0.95rem' }}>
          <p>
            In 2022, Chase Pierson designed a complete media production-to-distribution
            pipeline — broadcast, production, analytics, distribution — built on open
            source tools. It was architecture for running a media company at any scale.
          </p>
          <p style={{ marginTop: '1.25rem' }}>
            He realized the same system that runs a Viacom can run a small-town
            media economy. Big Muddy is that architecture, applied to Main Street,
            powered by AI, anchored in the Mississippi corridor.
          </p>
          <p style={{ marginTop: '1.25rem', fontStyle: 'italic', color: 'var(--accent, #c8943e)' }}>
            The gap isn&apos;t technology — it&apos;s organization. That&apos;s what we sell.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        maxWidth: 600,
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          fontFamily: 'var(--font-display, Georgia, serif)',
          marginBottom: '1rem',
        }}>
          Want to talk?
        </h2>
        <p style={{
          fontSize: '1rem',
          opacity: 0.6,
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}>
          We&apos;re always looking for musicians, businesses, and people who want
          to build something real in the corridor.
        </p>
        <a
          href="mailto:me@chasepierson.tv"
          style={{
            display: 'inline-block',
            padding: '0.85rem 2.5rem',
            background: 'var(--accent, #c8943e)',
            color: '#0a0a0a',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.03em',
          }}
        >
          me@chasepierson.tv
        </a>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border, rgba(255,255,255,0.08))',
        padding: '2rem 1.5rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.65rem',
          opacity: 0.25,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Powered by Measurably Better Things
        </p>
      </footer>
    </main>
  );
}
