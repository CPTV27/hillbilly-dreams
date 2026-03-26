const divisions = [
  {
    title: 'Measurably Better',
    description: 'Regional technology provider. One engine runs the Deep South Directory, Micromedia in a Bottle, CivicX, MB Learn, and KioskMode.',
    tag: 'Technology',
  },
  {
    title: 'Deep South Directory',
    description: 'AI-powered regional business network. Every Main Street business gets a node. CVBs and chambers of commerce are the buyers.',
    tag: 'Directory',
  },
  {
    title: 'Big Muddy Entertainment',
    description: 'Records, radio, touring, and the Rise Up talent development program.',
    tag: 'Entertainment',
    lead: 'JP, Division Head',
  },
  {
    title: 'Big Muddy Publishing',
    description: 'Magazine, books, and editorial content rooted in the Deep South.',
    tag: 'Publishing',
  },
  {
    title: 'Big Muddy Hospitality',
    description: 'The Inn, weddings, and events in Natchez, Mississippi.',
    tag: 'Hospitality',
    lead: 'Tracy, Division Head',
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
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: 'var(--font-inter), sans-serif',
        color: '#202124',
      }}
    >
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
            color: '#b45309',
            marginBottom: 16,
          }}
        >
          Ecosystem
        </p>
        <h1
          style={{
              fontFamily: 'var(--font-abril), serif',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#202124',
            marginBottom: 20,
          }}
        >
          The Nexus
        </h1>
        <p
          style={{
            fontSize: 20,
            color: '#5f6368',
            lineHeight: 1.6,
            maxWidth: 480,
          }}
        >
          How it all connects.
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
          <div
            key={division.title}
            style={{
              backgroundColor: '#ffffff',
              border: division.isEngine ? '1px solid #b45309' : '1px solid #e8eaed',
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
                color: division.isEngine ? '#b45309' : '#9aa0a6',
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
                color: '#202124',
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
                  backgroundColor: division.isEngine ? '#b45309' : '#e8eaed',
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
          </div>
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
          One engine. Five divisions. Built in Natchez, Mississippi.
        </p>
      </div>
    </div>
  );
}
