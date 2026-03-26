export default function PlatformPage() {
  const features = [
    {
      title: 'Multi-Tenant Routing',
      description:
        'One codebase serves multiple brands via hostname matching. Each deployment gets its own domain, theme, and data scope — all running on shared infrastructure.',
    },
    {
      title: 'AI Intelligence Layer',
      description:
        'Vertex AI and Gemini Pro are embedded into the platform for business data analysis, content generation, and decision support across all tenants.',
    },
    {
      title: 'Financial Sync',
      description:
        'Live QuickBooks Online integration surfaces real-time P&L data directly in the dashboard. No exports, no manual reconciliation.',
    },
    {
      title: 'Content Engine',
      description:
        'A built-in CMS handles articles, events, playlists, and newsletters. Each brand manages its own content within a shared editorial framework.',
    },
    {
      title: 'Payment Rails',
      description:
        'Stripe Connect powers split payments and direct payouts. Revenue flows to the right account without manual intervention.',
    },
    {
      title: 'Identity & Access',
      description:
        'NextAuth provides authentication with role-based access control. Staff, operators, and admins each see exactly what they need.',
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
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
          Platform
        </p>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#202124',
            marginBottom: 20,
          }}
        >
          The HDX Platform
        </h1>
        <p
          style={{
            fontSize: 20,
            color: '#5f6368',
            lineHeight: 1.6,
            maxWidth: 520,
          }}
        >
          One engine. Every deployment.
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

      {/* Feature Grid */}
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
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e8eaed',
              borderRadius: 12,
              padding: '28px 28px 24px',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#b45309',
                marginBottom: 16,
              }}
            />
            <h2
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#202124',
                marginBottom: 10,
                letterSpacing: '-0.01em',
              }}
            >
              {feature.title}
            </h2>
            <p
              style={{
                fontSize: 14,
                color: '#5f6368',
                lineHeight: 1.65,
              }}
            >
              {feature.description}
            </p>
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
          Built on Google Cloud. Deployed in Mississippi.
        </p>
      </div>
    </div>
  );
}
