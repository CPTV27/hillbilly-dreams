// apps/web/app/directory/dashboard/page.tsx
// Deep South Directory — Business owner dashboard for managing listing and connected services
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Usage: /directory/dashboard?client=biz_abc123

const INTEGRATIONS = [
  {
    key: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    desc: 'Accept payments directly. Your account, your money.',
    status: 'connect' as const,
    color: '#6772e5',
  },
  {
    key: 'square',
    name: 'Square',
    category: 'POS',
    desc: 'POS and payments for in-store.',
    status: 'soon' as const,
    color: '#3e9a6c',
  },
  {
    key: 'toast',
    name: 'Toast',
    category: 'Restaurant POS',
    desc: 'Restaurant POS and online ordering.',
    status: 'soon' as const,
    color: '#e84427',
  },
  {
    key: 'opentable',
    name: 'OpenTable / Resy',
    category: 'Reservations',
    desc: 'Reservations and table management.',
    status: 'soon' as const,
    color: '#da3743',
  },
  {
    key: 'cloudbeds',
    name: 'Cloudbeds',
    category: 'Property Management',
    desc: 'Property management for lodging.',
    status: 'soon' as const,
    color: '#2196c4',
  },
  {
    key: 'mailchimp',
    name: 'Mailchimp',
    category: 'Email',
    desc: 'Email marketing and newsletters.',
    status: 'soon' as const,
    color: '#ffe01b',
  },
  {
    key: 'ga',
    name: 'Google Analytics',
    category: 'Traffic',
    desc: 'Track who visits your listing.',
    status: 'soon' as const,
    color: '#f4a621',
  },
  {
    key: 'meta',
    name: 'Meta Pixel',
    category: 'Retargeting',
    desc: 'Retarget visitors on Facebook & Instagram.',
    status: 'soon' as const,
    color: '#1877f2',
  },
];

const PLACEHOLDER_BUSINESS = {
  name: 'The Anthologist',
  type: 'Record Store / Florist / Venue',
  city: 'Natchez, MS',
  desc: 'Vinyl, violets, and live music under one roof. A record store inside a flower shop inside a performance space.',
};

const QUICK_STATS = [
  { label: 'Views this month', value: '\u2014' },
  { label: 'Clicks to website', value: '\u2014' },
  { label: 'Magazine mentions', value: '\u2014' },
];

function ServiceInitial({ name, color }: { name: string; color: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: '1rem',
        fontWeight: 700,
        color: '#fff',
        opacity: 0.9,
      }}
    >
      {name[0]}
    </div>
  );
}

function StatusBadge({
  status,
  onConnect,
  connecting,
}: {
  status: 'connect' | 'connected' | 'soon';
  onConnect?: () => void;
  connecting?: boolean;
}) {
  if (status === 'connected') {
    return (
      <span
        style={{
          display: 'inline-block',
          padding: '0.3rem 0.75rem',
          background: '#1a3d2b',
          color: '#4caf7d',
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          border: '1px solid #2a5c3f',
        }}
      >
        Connected
      </span>
    );
  }

  if (status === 'soon') {
    return (
      <span
        style={{
          display: 'inline-block',
          padding: '0.3rem 0.75rem',
          background: 'transparent',
          color: 'var(--fg, #f5f0eb)',
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          border: '1px solid var(--muted, #333)',
          opacity: 0.4,
        }}
      >
        Coming Soon
      </span>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={connecting}
      aria-label="Connect Stripe account"
      style={{
        display: 'inline-block',
        padding: '0.3rem 0.75rem',
        background: 'transparent',
        color: connecting ? 'rgba(200,148,62,0.5)' : 'var(--accent, #c8943e)',
        fontSize: '0.7rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        border: '1px solid var(--accent, #c8943e)',
        cursor: connecting ? 'not-allowed' : 'pointer',
        opacity: connecting ? 0.6 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      {connecting ? 'Connecting...' : 'Connect'}
    </button>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client');
  const [connecting, setConnecting] = useState(false);

  const handleStripeConnect = async () => {
    setConnecting(true);
    try {
      const res = await fetch('/api/connect/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      });
      const data = await res.json();
      if (data.data?.url) {
        window.location.href = data.data.url;
      }
    } catch (err) {
      console.error('Connect failed:', err);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '6rem' }}>

      {/* Header */}
      <section
        style={{
          padding: '4rem 1.5rem 2.5rem',
          maxWidth: 900,
          margin: '0 auto',
          borderBottom: '1px solid var(--muted, #333)',
        }}
      >
        <p
          style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '0.75rem',
          }}
        >
          Deep South Directory
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: '0 0 0.75rem',
          }}
        >
          Your Business Dashboard
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.6,
            lineHeight: 1.6,
            maxWidth: 520,
            margin: 0,
          }}
        >
          Manage your listing, connect services, and see how the corridor finds you.
        </p>
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.7rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.3,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Powered by Measurably Better Things · hillbillydreamsinc.com
        </p>
      </section>

      {/* Quick Stats */}
      <section
        style={{
          padding: '2.5rem 1.5rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '1.25rem',
          }}
        >
          At a Glance
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
          }}
        >
          {QUICK_STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                border: '1px solid var(--muted, #333)',
                padding: '1.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  margin: '0 0 0.25rem',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.5,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Spotlight */}
      <section
        style={{
          padding: '0 1.5rem 3rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <div style={{ borderTop: '1px solid var(--muted, #333)', paddingTop: '2.5rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent, #c8943e)',
              marginBottom: '0.4rem',
            }}
          >
            Your Editorial Spotlight
          </p>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--fg, #f5f0eb)',
              marginBottom: '1.25rem',
            }}
          >
            AI-generated. Yours to publish.
          </p>
          <div
            style={{
              border: '1px solid var(--muted, #333)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--fg, #f5f0eb)',
                opacity: 0.45,
                lineHeight: 1.7,
                margin: 0,
                filter: 'blur(4px)',
                userSelect: 'none',
              }}
            >
              When you submit your listing, we generate a 200-word editorial spotlight
              about your business in the voice of Big Muddy Magazine. Direct, analog-warm,
              written for the corridor. At the $99/month Main Street tier, it gets published
              to your Directory profile. At $299/month, it cross-publishes to Big Muddy Magazine.
            </p>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(10, 10, 10, 0.6)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--accent, #c8943e)',
                    marginBottom: '0.5rem',
                    fontWeight: 700,
                  }}
                >
                  Available at Main Street tier ($99/mo)
                </p>
                <a
                  href="/directory/submit"
                  style={{
                    display: 'inline-block',
                    padding: '0.6rem 1.5rem',
                    background: 'var(--accent, #c8943e)',
                    color: '#0a0a0a',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                  }}
                >
                  Get Listed →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Services */}
      <section
        style={{
          padding: '0 1.5rem 3rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <div style={{ borderTop: '1px solid var(--muted, #333)', paddingTop: '2.5rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent, #c8943e)',
              marginBottom: '0.4rem',
            }}
          >
            Connected Services
          </p>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--fg, #f5f0eb)',
              marginBottom: '0.4rem',
            }}
          >
            Plug in the tools you already use.
          </p>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--fg, #f5f0eb)',
              opacity: 0.5,
              marginBottom: '2rem',
              lineHeight: 1.6,
              maxWidth: 500,
            }}
          >
            Your accounts, your data. We just make them work harder for your listing.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {INTEGRATIONS.map((service) => (
              <div
                key={service.key}
                style={{
                  border: '1px solid var(--muted, #333)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <ServiceInitial name={service.name} color={service.color} />
                  <div>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--fg, #f5f0eb)',
                        margin: '0 0 0.1rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {service.name}
                    </p>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--accent, #c8943e)',
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                      }}
                    >
                      {service.category}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--fg, #f5f0eb)',
                    opacity: 0.55,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {service.desc}
                </p>
                <div>
                  <StatusBadge
                    status={service.status}
                    onConnect={service.key === 'stripe' ? handleStripeConnect : undefined}
                    connecting={service.key === 'stripe' ? connecting : false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listing Preview */}
      <section
        style={{
          padding: '0 1.5rem 3rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <div style={{ borderTop: '1px solid var(--muted, #333)', paddingTop: '2.5rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent, #c8943e)',
              marginBottom: '1.25rem',
            }}
          >
            Your Public Listing
          </p>
          <div
            style={{
              border: '1px solid var(--muted, #333)',
              padding: '2rem',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  margin: '0 0 0.3rem',
                }}
              >
                {PLACEHOLDER_BUSINESS.name}
              </h2>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--accent, #c8943e)',
                  margin: '0 0 0.75rem',
                }}
              >
                {PLACEHOLDER_BUSINESS.type} &middot; {PLACEHOLDER_BUSINESS.city}
              </p>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.6,
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: 460,
                }}
              >
                {PLACEHOLDER_BUSINESS.desc}
              </p>
            </div>
            <a
              href="mailto:listings@hillbillydreamsinc.com"
              style={{
                fontSize: '0.78rem',
                color: 'var(--accent, #c8943e)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                borderBottom: '1px solid var(--accent, #c8943e)',
                paddingBottom: '0.15rem',
                flexShrink: 0,
              }}
            >
              Edit Listing
            </a>
          </div>
          <p
            style={{
              marginTop: '0.75rem',
              fontSize: '0.75rem',
              color: 'var(--fg, #f5f0eb)',
              opacity: 0.35,
            }}
          >
            To update your listing details, email listings@hillbillydreamsinc.com
          </p>
        </div>
      </section>

      {/* Measurably Better OS Locked Panel */}
      <section
        style={{
          padding: '0 1.5rem 3rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <div style={{ borderTop: '1px solid var(--muted, #333)', paddingTop: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--fg, #f5f0eb)',
                opacity: 0.3,
                margin: 0,
                fontWeight: 700,
              }}
            >
              Measurably Better Operating System
            </p>
            <span
              style={{
                fontSize: '0.65rem',
                padding: '0.2rem 0.6rem',
                border: '1px solid var(--muted, #333)',
                color: 'var(--fg, #f5f0eb)',
                opacity: 0.35,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Locked
            </span>
          </div>
          <div
            style={{
              border: '1px solid var(--muted, #333)',
              padding: '2rem',
              opacity: 0.6,
            }}
          >
            <p
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--fg, #f5f0eb)',
                marginBottom: '0.75rem',
              }}
            >
              You&apos;re already in the network.
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--fg, #f5f0eb)',
                opacity: 0.65,
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                maxWidth: 560,
              }}
            >
              Measurably Better is the full operating system: sales pipeline, billing, project management,
              client delivery — all connected. The Directory runs on it. Your business can too.
              One monthly cost. No engineering team required. Hillbilly Dreams as your embedded
              technology arm.
            </p>
            <a
              href="mailto:licensing@hillbillydreamsinc.com"
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.5rem',
                border: '1px solid var(--muted, #333)',
                color: 'var(--fg, #f5f0eb)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                opacity: 0.7,
              }}
            >
              Talk to us about Measurably Better →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main style={{ minHeight: '100vh', padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
          <p style={{ color: 'var(--fg, #f5f0eb)', opacity: 0.4, fontSize: '0.9rem' }}>
            Loading dashboard...
          </p>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
