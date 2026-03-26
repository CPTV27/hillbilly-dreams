import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

// Volume card data — extend here as books are added
const VOLUMES = [
  {
    to: '/volume-1/intro',
    label: 'Volume 1 \u00b7 Published',
    title: 'A Field Manual for Independent Economic Systems',
    blurb: 'The math. The theory. The $450,000 secret.',
  },
  {
    to: '/volume-2/intro',
    label: 'Volume 2 \u00b7 Read Free',
    title: 'The Implementation Playbook',
    blurb: 'Building community economic sovereignty in 90 days. 19 chapters.',
  },
  {
    to: '/volume-3/intro',
    label: 'Volume 3 \u00b7 Coming Soon',
    title: 'What Happens Next',
    blurb: 'The Deep South in 2028. Solarpunk meets the Mississippi corridor.',
  },
  {
    to: '/corridor/intro',
    label: 'Reference',
    title: 'The Corridor',
    blurb: 'Memphis to New Orleans. Town profiles from the route.',
  },
];

const BURNT_ORANGE = '#C4441A';
const CREAM = '#F0E6D3';
const INK = '#1A1A1A';
const WARM_BORDER = '#D4C8B5';
const WARM_MUTED = '#7A6E63';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Outsider Economics"
      description="What happens when the economy works for the people who actually live here."
    >
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: CREAM,
          padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 64px)',
          borderBottom: `3px solid ${BURNT_ORANGE}`,
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(32px, 5vw, 72px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* Cover art */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src="/img/cover-v1.jpg"
              alt="Outsider Economics cover — woodcut illustration of a flower growing through cracked earth"
              style={{
                width: 'clamp(200px, 28vw, 320px)',
                height: 'auto',
                boxShadow: '6px 8px 28px rgba(26,26,26,0.28)',
                display: 'block',
              }}
            />
          </div>

          {/* Title block */}
          <div
            style={{
              flex: '1 1 300px',
              minWidth: 0,
            }}
          >
            {/* Publisher slug */}
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: BURNT_ORANGE,
                marginBottom: 16,
              }}
            >
              Hillbilly Dreams, Inc. &mdash; Natchez, Mississippi
            </p>

            <h1
              style={{
                fontFamily: "'Abril Fatface', serif",
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                color: INK,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                marginBottom: 20,
              }}
            >
              Outsider Economics
            </h1>

            <p
              style={{
                fontFamily: "'Abril Fatface', serif",
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                color: WARM_MUTED,
                lineHeight: 1.4,
                marginBottom: 20,
                fontStyle: 'italic',
              }}
            >
              A Field Manual for Independent Economic Systems
            </p>

            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: WARM_MUTED,
                marginBottom: 24,
              }}
            >
              By Chase Tuthill Pierson
            </p>

            {/* Tagline — woodblock-press feel */}
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: INK,
                lineHeight: 1.7,
                maxWidth: 460,
                borderLeft: `3px solid ${BURNT_ORANGE}`,
                paddingLeft: 16,
                marginBottom: 32,
                fontStyle: 'italic',
              }}
            >
              What happens when the economy works for the people who actually live here.
            </p>

            {/* CTA */}
            <Link
              to="/volume-1/intro"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: BURNT_ORANGE,
                color: CREAM,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 2,
              }}
            >
              Start Reading &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Volume Cards ──────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#EDE0CA',
          padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Abril Fatface', serif",
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              color: INK,
              letterSpacing: '-0.02em',
              marginBottom: 32,
              textAlign: 'center',
            }}
          >
            The Series
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {VOLUMES.map((vol) => (
              <Link
                key={vol.to}
                to={vol.to}
                style={{
                  display: 'block',
                  padding: '24px 22px',
                  backgroundColor: '#FAF5EC',
                  border: `1px solid ${WARM_BORDER}`,
                  borderRadius: 2,
                  textDecoration: 'none',
                  transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `4px 6px 20px rgba(196,68,26,0.18)`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    color: BURNT_ORANGE,
                    marginBottom: 8,
                  }}
                >
                  {vol.label}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: "'Abril Fatface', serif",
                    fontSize: 18,
                    color: INK,
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  {vol.title}
                </span>
                <span style={{ fontSize: 13, color: WARM_MUTED, lineHeight: 1.5 }}>
                  {vol.blurb}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer strip ──────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: CREAM,
          borderTop: `1px solid ${WARM_BORDER}`,
          padding: 'clamp(32px, 4vw, 48px) clamp(24px, 5vw, 64px)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: INK,
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 auto 24px',
          }}
        >
          This isn't theory. The hotel is real. The platform is deployed.
          The band is forming. The directory is launching.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="https://measurablybetter.life"
            style={{ fontSize: 13, color: BURNT_ORANGE, fontWeight: 600, textDecoration: 'none' }}
          >
            See the proof &rarr;
          </a>
          <a
            href="https://deepsouthdirectory.com"
            style={{ fontSize: 13, color: BURNT_ORANGE, fontWeight: 600, textDecoration: 'none' }}
          >
            Deep South Directory &rarr;
          </a>
          <a
            href="#"
            style={{ fontSize: 13, color: BURNT_ORANGE, fontWeight: 600, textDecoration: 'none' }}
          >
            Buy on Amazon &rarr;
          </a>
        </div>
      </section>
    </Layout>
  );
}
