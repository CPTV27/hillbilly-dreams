import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const BURNT_ORANGE = '#C4441A';
const CREAM = '#F0E6D3';
const INK = '#1A1A1A';
const WARM_BORDER = '#D4C8B5';
const WARM_MUTED = '#7A6E63';

const SECTIONS = [
  {
    to: '/philosophy/what-is-outsider-economics',
    label: 'Start Here',
    title: 'The Philosophy',
    blurb: 'What Outsider Economics is, why it works, and who it\'s for.',
  },
  {
    to: '/toolkit/the-task-board',
    label: 'Build It',
    title: 'The Toolkit',
    blurb: '6 tools you can deploy today. Task boards, directories, shared services, and more.',
  },
  {
    to: '/case-studies',
    label: 'See It Work',
    title: 'Case Studies',
    blurb: 'Real stories from the Mississippi corridor. Natchez, Clarksdale, and beyond.',
  },
  {
    to: '/resources/grants-and-funding',
    label: 'Get Help',
    title: 'Deep South Resources',
    blurb: 'Grants, organizations, legal frameworks, and technology — tailored to MS, LA, and TN.',
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Outsider Economics"
      description="A toolkit for building local economies that work for the people who actually live here."
    >
      {/* Hero */}
      <section
        style={{
          backgroundColor: CREAM,
          padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px)',
          borderBottom: `3px solid ${BURNT_ORANGE}`,
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
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
              marginBottom: 24,
            }}
          >
            Outsider Economics
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: WARM_MUTED,
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto 32px',
            }}
          >
            A toolkit for building local economies that work for the people who
            actually live here. Philosophy, tools, case studies, and resources —
            all tailored to the Deep South.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/philosophy/what-is-outsider-economics"
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
            <Link
              to="/toolkit/the-task-board"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: 'transparent',
                color: INK,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 2,
                border: `2px solid ${WARM_BORDER}`,
              }}
            >
              Jump to the Toolkit
            </Link>
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section
        style={{
          backgroundColor: '#EDE0CA',
          padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {SECTIONS.map((sec) => (
              <Link
                key={sec.to}
                to={sec.to}
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
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '4px 6px 20px rgba(196,68,26,0.18)';
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
                  {sec.label}
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
                  {sec.title}
                </span>
                <span style={{ fontSize: 13, color: WARM_MUTED, lineHeight: 1.5 }}>
                  {sec.blurb}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer strip */}
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
          This isn't theory. The hotel is real. The directory is deployed.
          The band is forming. The tools are live.
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
            href="https://deepsouthdirectory.com"
            style={{ fontSize: 13, color: BURNT_ORANGE, fontWeight: 600, textDecoration: 'none' }}
          >
            Deep South Directory &rarr;
          </a>
          <a
            href="https://bigmuddytouring.com"
            style={{ fontSize: 13, color: BURNT_ORANGE, fontWeight: 600, textDecoration: 'none' }}
          >
            Big Muddy &rarr;
          </a>
          <a
            href="https://measurablybetter.life"
            style={{ fontSize: 13, color: BURNT_ORANGE, fontWeight: 600, textDecoration: 'none' }}
          >
            Measurably Better &rarr;
          </a>
        </div>
      </section>
    </Layout>
  );
}
