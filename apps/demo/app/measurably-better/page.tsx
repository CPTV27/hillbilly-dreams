// Measurably Better — main landing page
// Server component. All inline CSS. No external images.

const C = {
  bg: 'var(--mb-bg)',
  bgAlt: 'var(--mb-bg-alt)',
  surface: 'var(--mb-surface)',
  white: 'var(--mb-surface)', 
  border: 'var(--mb-border)',
  text: 'var(--mb-text)',
  textSecondary: 'var(--mb-text-secondary)',
  textMuted: 'var(--mb-text-tertiary)',
  accent: 'var(--mb-accent)',
  accentHover: 'var(--mb-accent-hover)',
  accentBg: 'rgba(180,83,9,0.06)',
  dark: 'var(--mb-text)', 
  darkText: 'var(--mb-bg-alt)', 
};

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    who: 'Anyone curious',
    hook: 'Type your business name. See what we already know.',
    features: [
      'Google Business Profile analysis',
      'Competitive snapshot (public data)',
      '100 AI queries per month',
      'Directory listing',
      'Intro training — learn what AI can do for your business',
    ],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'The Works',
    price: '$20',
    period: '/month',
    who: 'Any business owner',
    hook: 'Take a photo. It handles the rest.',
    features: [
      '7-day free trial — no credit card',
      'Snap a photo → auto-post to social, website, newsletter',
      'Connect your QuickBooks — it watches your numbers',
      'Daily briefing — one text, one insight',
      'Review monitoring + draft responses',
      'AI marketing that runs while you work',
      'Talk to it — business coaching on demand',
    ],
    cta: 'Try free for a week',
    highlight: false,
  },
  {
    name: 'The Engine',
    price: '$99',
    period: '/month',
    who: 'SMB operators',
    hook: 'Connect everything. Act on everything.',
    features: [
      'Everything in The Works',
      'Connect ALL data sources (QuickBooks + Stripe + Google + POS)',
      'Multi-source correlation and cross-analysis',
      'Marketing automation (AI social posts, email campaigns)',
      'Real-time alerts (margin drops, review spikes, anomalies)',
      '3 team seats',
      'Weekly AI strategy memo',
      'Priority support',
    ],
    cta: 'Start the engine',
    highlight: true,
  },
  {
    name: 'The Operator',
    price: '$499',
    period: '/month',
    who: 'Growing businesses',
    hook: '10 seats. Dedicated AI agent. Forecasting that actually works.',
    features: [
      'Everything in The Engine',
      '10 team seats',
      'Dedicated AI agent',
      'Revenue forecasting',
      'Phone support',
    ],
    cta: 'Talk to us',
    highlight: false,
  },
  {
    name: 'Institutional',
    price: 'Custom',
    period: '',
    who: 'Cities, schools, CVBs',
    hook: 'Tyler charges $25K\u201375K/year. We start at $9,600. Grant-funded pathways.',
    features: [
      'Municipal front door',
      'K-12 curriculum',
      'Multi-department rollout',
      'ARPA & E-Rate compatible',
      'Dedicated account team',
    ],
    cta: 'Schedule a call',
    highlight: false,
  },
];

const PRODUCT_LINES = [
  {
    name: 'Deep South Directory',
    tag: 'Main Street',
    desc: 'The front door for Main Street. Free listing, $20 dashboard, $99 automation. Every business on Main Street, one searchable node.',
  },
  {
    name: 'Micromedia in a Bottle',
    tag: 'Licensable',
    desc: 'Hotel + magazine + radio + touring + records on one engine. Big Muddy is the case study. License it to any regional operator.',
  },
  {
    name: 'Municipal Platform',
    tag: 'Municipal',
    desc: 'City hall front door for cities under 50K. Website, 311, payments, records search. $9,600/year.',
  },
  {
    name: 'District Dashboard',
    tag: 'Education',
    desc: 'District dashboard, AI literacy, safety docs. Funded by E-Rate and Title IV-A.',
  },
  {
    name: 'S2PX',
    tag: 'Spatial',
    desc: 'Spatial intelligence for the built environment. Your outsourced operating system for AEC.',
  },
];

const FOUR_MARKETS = [
  {
    label: 'SMB',
    title: 'Main Street',
    desc: 'Local operators who bleed margin to disconnected subscriptions. One platform replaces five tools at a fraction of the cost.',
  },
  {
    label: 'Civic',
    title: 'City Hall',
    desc: '$826M in unspent ARPA sits in Mississippi alone. We come in at $9,600/year where the incumbent charges $25,000\u201375,000.',
  },
  {
    label: 'Education',
    title: 'School Districts',
    desc: '144 districts in Mississippi, most under 5,000 students. District Dashboard brings AI literacy curriculum and a unified ops view.',
  },
  {
    label: 'Tourism',
    title: 'CVBs & Hospitality',
    desc: 'Content that markets, employs local writers, and becomes a permanent asset. Every dollar does triple duty.',
  },
];

export default function MeasurablyBetterPage() {
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
          padding: 'clamp(48px, 8vw, 96px) 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: C.accent,
              marginBottom: 20,
            }}
          >
            measurablybetter.life
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 'clamp(2rem, 5.5vw, 3.25rem)',
              fontWeight: 700,
              color: C.white,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 24px',
            }}
          >
            It does all the cool stuff<br />
            you don&apos;t know how to do.
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: C.darkText,
              lineHeight: 1.65,
              margin: '0 0 16px',
              maxWidth: 580,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Take a photo. It posts to Instagram, Facebook, your website,
            your newsletter, your Google listing &mdash; and tags it for
            the tourism board. One photo. Six outputs.
          </p>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: C.darkText,
              lineHeight: 1.65,
              margin: '0 0 32px',
              maxWidth: 520,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: 0.8,
            }}
          >
            Take a photo. Watch what happens. $20/mo.
          </p>
          <a
            href="#pricing"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              backgroundColor: C.accent,
              color: C.white,
            }}
          >
            Start free
          </a>
          <p
            style={{
              fontSize: 13,
              color: C.textMuted,
              marginTop: 20,
              marginBottom: 0,
              letterSpacing: '0.01em',
            }}
          >
            Deep South Directory &mdash; every Main Street business gets a node.{' '}
            <a
              href="https://DeepSouthDirectory.com"
              style={{ color: C.accent, textDecoration: 'none' }}
            >
              DeepSouthDirectory.com
            </a>
          </p>
        </div>
      </div>

      {/* Photo demo + business coach stories */}
      <div style={{ maxWidth: 960, margin: '64px auto 0', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            marginBottom: 0,
          }}
        >
          <div
            style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '28px 24px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: C.accent,
                backgroundColor: C.accentBg,
                padding: '3px 8px',
                borderRadius: 4,
                marginBottom: 16,
              }}
            >
              Take a photo
            </span>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: C.text,
                margin: '0 0 10px',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              One photo. Six outputs. Done.
            </p>
            <p
              style={{
                fontSize: 14,
                color: C.textSecondary,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Snap a photo of your lunch special, your storefront, your
              event. It goes to Instagram, Facebook, your website, your
              newsletter, your Google Business listing, and the tourism
              board&apos;s feed &mdash; automatically, with captions
              already written.
            </p>
          </div>
          <div
            style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '28px 24px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: C.accent,
                backgroundColor: C.accentBg,
                padding: '3px 8px',
                borderRadius: 4,
                marginBottom: 16,
              }}
            >
              Have an idea
            </span>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: C.text,
                margin: '0 0 10px',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              Talk to it. Get a brief by morning.
            </p>
            <p
              style={{
                fontSize: 14,
                color: C.textSecondary,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Have an idea at 10pm? Tell it. It runs the numbers overnight
              and has a brief ready for you tomorrow morning &mdash;
              margins, timing, what your competitors are doing, and the
              three questions you should answer before you commit.
            </p>
          </div>
          <div
            style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '28px 24px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: C.accent,
                backgroundColor: C.accentBg,
                padding: '3px 8px',
                borderRadius: 4,
                marginBottom: 16,
              }}
            >
              Every morning
            </span>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: C.text,
                margin: '0 0 10px',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}
            >
              One text. Your number. The one thing that needs you.
            </p>
            <p
              style={{
                fontSize: 14,
                color: C.textSecondary,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Every morning, one text. Your revenue number for yesterday.
              One insight from your data. And the one thing on your plate
              that actually requires a human decision. Everything else is
              already handled.
            </p>
          </div>
        </div>
      </div>

      {/* Four markets */}
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
          Four markets
        </p>
        <h2
          style={{
              fontFamily: 'var(--font-abril), serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            fontWeight: 700,
            color: C.text,
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
          }}
        >
          One engine, four markets.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: C.textSecondary,
            margin: '0 0 40px',
            maxWidth: 520,
            lineHeight: 1.65,
          }}
        >
          Verified gap: no regional provider serves all four segments in the
          Deep South. We do.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 16,
            marginBottom: 64,
          }}
        >
          {FOUR_MARKETS.map((m) => (
            <div
              key={m.label}
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '24px 20px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: C.accent,
                  backgroundColor: C.accentBg,
                  padding: '3px 8px',
                  borderRadius: 4,
                  marginBottom: 12,
                }}
              >
                {m.label}
              </span>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: C.text,
                  margin: '0 0 8px',
                  letterSpacing: '-0.01em',
                }}
              >
                {m.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: C.textSecondary,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Lines */}
      <div style={{ backgroundColor: C.white, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '64px 24px' }}>
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
            Product lines
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
            }}
          >
            One engine. Every vertical.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              margin: '0 0 40px',
              maxWidth: 560,
              lineHeight: 1.65,
            }}
          >
            Each product is the same engine configured for a specific market.
            Every product we build keeps money circulating locally. The
            technology is the means. The community becoming measurably
            better is the end.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: 16,
            }}
          >
            {PRODUCT_LINES.map((p) => (
              <div
                key={p.name}
                style={{
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '24px 20px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: C.accent,
                    backgroundColor: C.accentBg,
                    padding: '3px 8px',
                    borderRadius: 4,
                    marginBottom: 12,
                  }}
                >
                  {p.tag}
                </span>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: C.text,
                    margin: '0 0 8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: C.textSecondary,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '64px 24px' }}>
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
            Pricing
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
            }}
          >
            Transparent pricing. Start free. Upgrade when it pays for itself.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              margin: '0 0 40px',
              lineHeight: 1.65,
            }}
          >
            No contracts. No surprises. Cancel anytime.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
            }}
          >
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                style={{
                  backgroundColor: C.white,
                  border: `1px solid ${C.border}`, borderTop: tier.highlight ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column' as const,
                  gap: 12,
                  position: 'relative' as const,
                }}
              >
                
                <div>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.textMuted,
                      margin: '0 0 4px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    {tier.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    <span
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: C.text,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span
                        style={{
                          fontSize: 13,
                          color: C.textSecondary,
                        }}
                      >
                        {tier.period}
                      </span>
                    )}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: C.textSecondary,
                    lineHeight: 1.55,
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  {tier.hook}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: 6,
                    flex: 1,
                  }}
                >
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: 12,
                        color: C.textSecondary,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 6,
                      }}
                    >
                      <span style={{ color: C.accent, flexShrink: 0, marginTop: 1 }}>&#x2713;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/measurably-better/thesis"
                  style={{
                    display: 'block',
                    textAlign: 'center' as const,
                    padding: '10px 16px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    backgroundColor: tier.highlight ? C.accent : 'transparent',
                    color: C.text,
                    border: tier.highlight ? '1px solid transparent' : `1px solid ${C.accent}`,
                    marginTop: 4,
                  }}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How businesses get started — GTM channels */}
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
          Three ways in
        </p>
        <h2
          style={{
              fontFamily: 'var(--font-abril), serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            fontWeight: 700,
            color: C.text,
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
          }}
        >
          No ads. No funnels. Just trust.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: C.textSecondary,
            margin: '0 0 40px',
            maxWidth: 520,
            lineHeight: 1.65,
          }}
        >
          We don&apos;t buy leads. We earn them &mdash; the same way every Main Street business does.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {[
            {
              title: 'Your city already bought it',
              desc: 'Municipalities buy blocks of licenses for Main Street businesses. Funded by ARPA, CDBG, or economic development budgets. You get a dashboard — the city gets anonymized growth data.',
            },
            {
              title: 'Walk in, try it free',
              desc: '"I run the hotel down the street. This is what I use. Want to try it?" Free tier — see your data — upgrade when it pays for itself. No salesperson. Just a neighbor.',
            },
            {
              title: 'Included with your directory listing',
              desc: 'Join the Deep South Directory through your Chamber or CVB. Every listing comes with a free business dashboard. The directory IS the product.',
            },
          ].map((ch) => (
            <div
              key={ch.title}
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '24px 20px',
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.text,
                  margin: '0 0 10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {ch.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: C.textSecondary,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {ch.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission CTA */}
      <div style={{ maxWidth: 960, margin: '64px auto 0', padding: '0 24px' }}>
        <div
          style={{
            backgroundColor: C.dark,
            borderRadius: 12,
            padding: 'clamp(32px, 5vw, 48px)',
            marginBottom: 48,
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: 700,
              color: C.white,
              letterSpacing: '-0.02em',
              lineHeight: 1.4,
              margin: '0 0 16px',
            }}
          >
            The South has the culture. We&apos;re building the infrastructure to match.
          </p>
          <p
            style={{
              fontSize: 15,
              color: C.darkText,
              lineHeight: 1.65,
              margin: '0 0 32px',
              maxWidth: 600,
            }}
          >
            Every product we build keeps money circulating locally. The Deep
            South Directory keeps Main Street commerce visible. Big Muddy keeps culture and
            entertainment dollars in the corridor. The municipal and education products keep
            government technology dollars in-state. The technology is the means. The
            community becoming measurably better is the end.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <a
              href="/measurably-better/thesis"
              style={{
                display: 'inline-block',
                padding: '11px 20px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                backgroundColor: C.accent,
                color: C.white,
              }}
            >
              Read the thesis
            </a>
            <a
              href="/measurably-better/regional"
              style={{
                display: 'inline-block',
                padding: '11px 20px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                backgroundColor: 'transparent',
                color: C.darkText,
                border: `1px solid rgba(203,213,225,0.3)`,
              }}
            >
              The four markets
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
          A product of Hillbilly Dreams, Inc. &mdash; Natchez, Mississippi.{' '}
          <a
            href="/hillbilly-dreams"
            style={{ color: C.accent, textDecoration: 'none' }}
          >
            hillbillydreamsinc.com
          </a>
        </p>
      </div>
    </div>
  );
}
