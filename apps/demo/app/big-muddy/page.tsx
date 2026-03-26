import Nav from '../components/Nav';

const divisions = [
  {
    title: 'Big Muddy Entertainment',
    description: 'Records, radio, touring, and Rise Up. JP has full creative authority.',
    tag: 'Entertainment',
    lead: 'JP, Division Head',
    href: '/big-muddy/entertainment',
  },
  {
    title: 'Big Muddy Hospitality',
    description: 'The Big Muddy Inn. The anchor. Where the story started.',
    tag: 'Hospitality',
    lead: 'Tracy, Division Head',
    href: '/big-muddy/hospitality',
  },
  {
    title: 'Big Muddy Publishing',
    description: 'Magazine, books, and editorial content from the corridor.',
    tag: 'Publishing',
    href: '/big-muddy/publishing',
  },
  {
    title: 'HDX Platform',
    description: 'The engine underneath everything — routing, payments, content, AI, and identity.',
    tag: 'Infrastructure',
    isEngine: true,
  },
];

export default function NexusPage() {
  return (
    <div
      style={{
        backgroundColor: 'var(--bm-cream)',
        minHeight: '100vh',
        fontFamily: 'var(--font-inter), sans-serif',
        color: 'var(--bm-charcoal)',
      }}
    >
      <Nav currentPath="/big-muddy" />

      {/* Header */}
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '80px 32px 48px',
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--bm-burgundy)',
            marginBottom: 16,
          }}
        >
          Big Muddy
        </p>
        <h1
          style={{
              fontFamily: 'var(--font-abril), serif',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--bm-charcoal)',
            marginBottom: 20,
          }}
        >
          Big Muddy
        </h1>
        <p
          style={{
            fontSize: 20,
            color: '#5f6368',
            lineHeight: 1.6,
            maxWidth: 480,
          }}
        >
          The Mississippi&apos;s music corridor. Stay. Drive. Read. Listen.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto 56px',
          padding: '0 32px',
        }}
      >
        <div style={{ height: 1, backgroundColor: '#e8eaed' }} />
      </div>

      {/* Division Cards */}
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {divisions.map((division) => (
          <a
            key={division.title}
            href={division.href || undefined}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              backgroundColor: '#ffffff',
              border: division.isEngine ? '1px solid var(--bm-burgundy)' : '1px solid #e8eaed',
              borderRadius: 12,
              padding: '28px 28px 24px',
              position: 'relative',
            }}
          >
            {/* Tag */}
            <div
              style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: division.isEngine ? 'var(--bm-burgundy)' : '#9aa0a6',
                marginBottom: 14,
              }}
            >
              {division.tag}
            </div>

            <h2
              style={{
              fontFamily: 'var(--font-abril), serif',
                fontSize: 17,
                fontWeight: 600,
                color: 'var(--bm-charcoal)',
                marginBottom: 10,
                letterSpacing: '-0.01em',
              }}
            >
              {division.title}
            </h2>

            <p
              style={{
                fontSize: 14,
                color: '#5f6368',
                lineHeight: 1.65,
                marginBottom: division.lead ? 16 : 0,
              }}
            >
              {division.description}
            </p>

            {division.lead && (
              <p
                style={{
                  fontSize: 12,
                  color: '#9aa0a6',
                  fontWeight: 500,
                }}
              >
                {division.lead}
              </p>
            )}

            {/* HDX connection indicator */}
            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: '1px solid #f1f3f4',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: division.isEngine ? 'var(--bm-burgundy)' : '#e8eaed',
                  border: division.isEngine ? 'none' : '1px solid #9aa0a6',
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: '#9aa0a6',
                  letterSpacing: '0.05em',
                }}
              >
                {division.isEngine ? 'Core engine' : 'Runs on HDX'}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 800,
          margin: '72px auto 0',
          padding: '32px 32px 64px',
          borderTop: '1px solid #e8eaed',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: '#9aa0a6',
            letterSpacing: '0.02em',
          }}
        >
          Big Muddy — a division of Hillbilly Dreams, Inc.
        </p>
      </div>
    </div>
  );
}
