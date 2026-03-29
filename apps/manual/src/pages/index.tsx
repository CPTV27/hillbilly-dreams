import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const BURNT_ORANGE = '#C4441A';
const CREAM = '#F0E6D3';
const INK = '#1A1A1A';
const WARM_BORDER = '#D4C8B5';
const WARM_MUTED = '#7A6E63';

const GUIDES = [
  {
    to: '/amy/overview',
    label: 'Inn & Bar Ops',
    title: "Amy's Guide",
    blurb: 'Bar inventory, pricing, guest experience, show night checklist.',
    color: '#2E86AB',
  },
  {
    to: '/tracy/overview',
    label: 'Business & Finance',
    title: "Tracy's Guide",
    blurb: 'Compliance, IRS payments, liquor license, financial dashboards.',
    color: '#6B4C9A',
  },
  {
    to: '/jp/overview',
    label: 'Shows & Programming',
    title: "JP's Guide",
    blurb: 'Booking acts, sound/stage, scheduling, promotion.',
    color: '#D4A017',
  },
];

const TOOLS = [
  { to: '/getting-started/photo-workflow', label: 'Photo Workflow' },
  { to: '/getting-started/content-studio', label: 'Content Studio' },
  { to: '/getting-started/edit-mode', label: 'Edit Mode' },
  { to: '/getting-started/asana', label: 'Asana' },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="The Big Muddy Manual"
      description="How we run this place — step by step."
    >
      {/* Hero */}
      <section
        style={{
          backgroundColor: CREAM,
          padding: 'clamp(48px, 8vw, 80px) clamp(24px, 5vw, 64px)',
          borderBottom: `3px solid ${BURNT_ORANGE}`,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: "'Abril Fatface', serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: INK,
              marginBottom: 16,
            }}
          >
            The Big Muddy Manual
          </h1>
          <p style={{ fontSize: 18, color: WARM_MUTED, marginBottom: 32 }}>
            How we run this place — step by step.
          </p>
          <Link
            to="/getting-started/welcome"
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
            Get Started &rarr;
          </Link>
        </div>
      </section>

      {/* Role Guides */}
      <section
        style={{
          backgroundColor: '#EDE0CA',
          padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Abril Fatface', serif",
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              color: INK,
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            Your Guide
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {GUIDES.map((g) => (
              <Link
                key={g.to}
                to={g.to}
                style={{
                  display: 'block',
                  padding: '24px 22px',
                  backgroundColor: '#FAF5EC',
                  border: `1px solid ${WARM_BORDER}`,
                  borderLeft: `4px solid ${g.color}`,
                  borderRadius: 2,
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    color: g.color,
                    marginBottom: 8,
                  }}
                >
                  {g.label}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: "'Abril Fatface', serif",
                    fontSize: 20,
                    color: INK,
                    marginBottom: 8,
                  }}
                >
                  {g.title}
                </span>
                <span style={{ fontSize: 13, color: WARM_MUTED, lineHeight: 1.5 }}>
                  {g.blurb}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Tools */}
      <section
        style={{
          backgroundColor: CREAM,
          padding: '32px clamp(24px, 5vw, 64px)',
          borderTop: `1px solid ${WARM_BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {TOOLS.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FAF5EC',
                border: `1px solid ${WARM_BORDER}`,
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 600,
                color: INK,
                textDecoration: 'none',
              }}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
