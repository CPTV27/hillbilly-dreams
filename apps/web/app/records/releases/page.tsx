// apps/web/app/records/releases/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Releases — Big Muddy Records',
  description: 'Releases from Big Muddy Records. Vinyl, digital, and limited editions.',
};

export default function ReleasesPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.5rem' }}>
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--fg, #f5f0eb)',
          marginBottom: '0.5rem',
        }}
      >
        Releases
      </h1>
      <p
        style={{
          color: 'var(--fg, #f5f0eb)',
          opacity: 0.6,
          fontSize: '1rem',
          marginBottom: '3rem',
        }}
      >
        Coming soon.
      </p>

      {/* Placeholder for first release */}
      <div
        style={{
          border: '1px solid var(--muted, #333)',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: 600,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            background: 'var(--muted, #333)',
            margin: '0 auto 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '3rem',
              color: 'var(--accent, #c8943e)',
              fontWeight: 700,
            }}
          >
            01
          </span>
        </div>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '0.5rem',
          }}
        >
          Blues Room Sessions Vol. 1
        </h2>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--accent, #c8943e)',
            marginBottom: '1rem',
          }}
        >
          Recording in progress &middot; Expected 2026
        </p>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.7,
            lineHeight: 1.6,
            maxWidth: 450,
            margin: '0 auto',
          }}
        >
          Live recordings from the Blues Room at the Big Muddy Inn in Natchez.
          Limited vinyl pressing. Digital distribution through all platforms.
          The first thing we put into the world.
        </p>
      </div>

      {/* What&apos;s coming */}
      <section style={{ marginTop: '4rem' }}>
        <h3
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '1.5rem',
          }}
        >
          In the Pipeline
        </h3>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {[
            { title: 'Blues Room Sessions Vol. 1', format: 'Vinyl LP + Digital', eta: '2026' },
            { title: 'Amy Allen — Debut EP', format: 'Digital + Limited CD', eta: 'Spring 2026' },
            { title: 'Corridor Compilation Vol. 1', format: 'Vinyl LP + Digital', eta: 'Late 2026' },
            { title: 'Porch Sessions — Natchez', format: 'Digital EP', eta: 'Fall 2026' },
          ].map((release) => (
            <li
              key={release.title}
              style={{
                padding: '1rem 0',
                borderBottom: '1px solid var(--muted, #333)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <span
                  style={{
                    color: 'var(--fg, #f5f0eb)',
                    fontWeight: 600,
                  }}
                >
                  {release.title}
                </span>
                <span
                  style={{
                    color: 'var(--fg, #f5f0eb)',
                    opacity: 0.5,
                    fontSize: '0.85rem',
                    marginLeft: '0.75rem',
                  }}
                >
                  {release.format}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--accent, #c8943e)',
                }}
              >
                {release.eta}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
