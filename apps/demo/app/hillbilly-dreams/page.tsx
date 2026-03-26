// Hillbilly Dreams, Inc. — Holding company overview
// Server component. All inline CSS. No external images.

const C = {
  bg: 'var(--hdi-bg)',
  bgAlt: '#EDF0F5',
  white: '#FFFFFF',
  border: '#D8DEE9',
  text: 'var(--hdi-navy)',
  textSecondary: '#3B4863',
  textMuted: '#6B7A99',
  accent: 'var(--hdi-slate)',
  accentBg: 'rgba(74,85,104,0.08)',
  dark: '#0F172A',
  darkText: '#CBD5E1',
};

const DIVISIONS = [
  {
    slug: 'measurably-better',
    label: 'Product Brand',
    name: 'Measurably Better',
    lead: 'Chase Pierson',
    desc: 'Regional technology provider. It does all the cool stuff businesses don\'t know how to do.',
    details: ['Deep South Directory — regional business network', 'Micromedia in a Bottle — licensable media company package', 'CivicX — municipal front door', 'MB Learn — AI literacy curriculum'],
    href: '/measurably-better',
  },
  {
    slug: 'entertainment',
    label: 'Big Muddy Entertainment',
    name: 'Entertainment',
    lead: 'JP (Division Head)',
    desc: 'Records, radio, touring, and Rise Up. JP has full creative authority.',
    details: ['Big Muddy Records — artist services, 100% masters retained', 'Big Muddy Radio — playlists, streaming, live sessions', 'Snowbird Circuit — 18-city touring corridor', 'Rise Up — franchisable gospel & blues touring brand'],
    href: '/nexus',
  },
  {
    slug: 'publishing',
    label: 'Big Muddy Publishing',
    name: 'Publishing',
    lead: 'Tracy Alderson-Allen (Division Head)',
    desc: 'Magazine, books, and editorial content from the corridor.',
    details: ['Big Muddy Magazine — city guides, interviews, photo essays', 'Outsider Economics — the book', 'Three-tier writers program: community, paid, rev-share', 'CVB tourism content play', 'Feed Farm — independent media protocol'],
    href: '/ffx',
  },
  {
    slug: 'hospitality',
    label: 'Big Muddy Hospitality',
    name: 'Hospitality',
    lead: 'Tracy Alderson-Allen (Division Head)',
    desc: 'The Big Muddy Inn. The anchor. Where the story started.',
    details: ['The Big Muddy Inn — 6 rooms, Natchez', 'Weddings & Events', 'Hotel operations', 'Tracy runs the profitable base.'],
    href: '/nexus',
  },
  {
    slug: 'hdx',
    label: 'HDX Platform',
    name: 'HDX Platform',
    lead: 'Chase Pierson',
    desc: 'The base technology. HDX is the operating system every product runs on. Deep South Directory, CivicX, MB Learn — all HDX deployments.',
    details: ['Sovereign Cloud SQL per tenant', 'Gemini Pro AI layer', 'QuickBooks, Stripe, Google Workspace integrations', 'White-label licensing for regional operators'],
    href: '/platform',
  },
];

const CASE_STUDIES = [
  { what: 'The Big Muddy Inn', status: 'Live', note: 'Bookable' },
  { what: 'Big Muddy Magazine', status: 'Live', note: 'Readable' },
  { what: 'Big Muddy Radio', status: 'Live', note: 'Listenable' },
  { what: 'Big Muddy Touring', status: 'Live', note: '18-city corridor' },
  { what: 'Big Muddy Records', status: 'Live', note: 'Artists signed' },
  { what: 'Rise Up', status: 'Live', note: 'Performing' },
  { what: 'Measurably Better (SMB)', status: 'Live', note: 'Platform deployed' },
  { what: 'Deep South Directory', status: 'Building', note: 'Regional business network' },
  { what: 'Measurably Better (Civic)', status: 'Pilot', note: 'Natchez target' },
  { what: 'MB Learn (AI curriculum)', status: 'Designed', note: 'Seeking funding' },
];

const CROSS_PROMO = [
  { n: '01', event: 'Artist books a show at the Inn' },
  { n: '02', event: 'Show gets recorded for Radio' },
  { n: '03', event: 'Magazine writes the city guide for the tour stop' },
  { n: '04', event: 'Artist goes on Rise Up' },
  { n: '05', event: 'Catalog lives on Records' },
  { n: '06', event: 'Touring route adds the venue' },
  { n: '07', event: 'Kiosk mode sells the ticket at the front desk' },
];

export default function HillbillyDreamsPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'var(--font-inter), sans-serif',
        color: C.text,
        padding: '0 0 80px',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          backgroundColor: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.textMuted,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}
        >
          Measurably Better
        </span>
      </div>

      {/* Hero */}
      <div
        style={{
          backgroundColor: C.dark,
          padding: 'clamp(48px, 8vw, 80px) 24px',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: C.accent,
              margin: '0 0 16px',
            }}
          >
            Holding Company
          </p>
          <h1
            style={{
              fontFamily: 'var(--hdi-font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              color: C.white,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 20px',
            }}
          >
            Hillbilly Dreams, Inc.
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: C.darkText,
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 560,
            }}
          >
            Technology infrastructure for the New South. Owns all IP, platform,
            and equity across five operating divisions.
          </p>
        </div>
      </div>

      {/* Divisions */}
      <div style={{ maxWidth: 960, margin: '64px auto 0', padding: '0 24px' }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: C.textMuted,
            marginBottom: 8,
          }}
        >
          Five divisions
        </p>
        <h2
          style={{
              fontFamily: 'var(--hdi-font-display)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: C.text,
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
          }}
        >
          One holding company. Five operating divisions.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: C.textSecondary,
            margin: '0 0 40px',
            lineHeight: 1.65,
            maxWidth: 520,
          }}
        >
          Not a conglomerate. A cross-promotion engine. Every division feeds
          the others.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: 16,
            marginBottom: 64,
          }}
        >
          {DIVISIONS.map((div) => (
            <a
              key={div.slug}
              href={div.href}
              style={{
                display: 'block',
                textDecoration: 'none',
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '28px 28px 28px 28px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 16,
                  flexWrap: 'wrap' as const,
                }}
              >
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase' as const,
                        color: C.accent,
                        backgroundColor: C.accentBg,
                        padding: '3px 8px',
                        borderRadius: 4,
                      }}
                    >
                      {div.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: C.textMuted,
                      }}
                    >
                      {div.lead}
                    </span>
                  </div>
                  <h3
                    style={{
              fontFamily: 'var(--hdi-font-display)',
                      fontSize: 20,
                      fontWeight: 700,
                      color: C.text,
                      margin: '0 0 8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {div.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: C.textSecondary,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {div.desc}
                  </p>
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: 5,
                    minWidth: 240,
                  }}
                >
                  {div.details.map((d) => (
                    <li
                      key={d}
                      style={{
                        fontSize: 13,
                        color: C.textSecondary,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          color: C.accent,
                          flexShrink: 0,
                          marginTop: 1,
                          fontSize: 11,
                        }}
                      >
                        &#x2192;
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Cross-promotion engine */}
      <div
        style={{
          backgroundColor: C.white,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: C.textMuted,
              marginBottom: 8,
            }}
          >
            The cross-promotion engine
          </p>
          <h2
            style={{
              fontFamily: 'var(--hdi-font-display)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
            }}
          >
            One artist booking triggers seven revenue events.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              margin: '0 0 32px',
              lineHeight: 1.65,
              maxWidth: 500,
            }}
          >
            Every dollar circulates. No division is an island.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            {CROSS_PROMO.map((item) => (
              <div
                key={item.n}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '16px',
                  backgroundColor: C.bg,
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.accent,
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.n}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: C.text,
                    lineHeight: 1.5,
                  }}
                >
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Natchez Case Studies */}
      <div style={{ maxWidth: 960, margin: '64px auto 0', padding: '0 24px' }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: C.textMuted,
            marginBottom: 8,
          }}
        >
          The Natchez Case Studies
        </p>
        <h2
          style={{
              fontFamily: 'var(--hdi-font-display)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: C.text,
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
          }}
        >
          We don&apos;t show slides. We show a hotel you can book, a magazine you can read, and a radio station you can hear.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: C.textSecondary,
            margin: '0 0 32px',
            lineHeight: 1.65,
            maxWidth: 560,
          }}
        >
          When we walk into a city council meeting, these are already open in a browser tab.
        </p>

        <div
          style={{
            backgroundColor: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {CASE_STUDIES.map((row, i) => (
            <div
              key={row.what}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom:
                  i < CASE_STUDIES.length - 1 ? `1px solid ${C.border}` : 'none',
                gap: 16,
              }}
            >
              <span style={{ fontSize: 14, color: C.text, flex: 1 }}>
                {row.what}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  flexShrink: 0,
                }}
              >
                {row.note}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  color:
                    row.status === 'Live'
                      ? '#1e8e3e'
                      : row.status === 'Pilot'
                      ? C.accent
                      : row.status === 'Building'
                      ? '#1a73e8'
                      : C.textMuted,
                  backgroundColor:
                    row.status === 'Live'
                      ? '#e6f4ea'
                      : row.status === 'Pilot'
                      ? C.accentBg
                      : row.status === 'Building'
                      ? '#e8f0fe'
                      : '#f1f3f4',
                  padding: '3px 8px',
                  borderRadius: 4,
                  flexShrink: 0,
                  minWidth: 72,
                  textAlign: 'center' as const,
                }}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
