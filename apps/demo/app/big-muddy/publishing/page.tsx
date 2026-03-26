// Feed Farm — Independent Media Protocol
// Server component. All inline CSS. No external images.

const C = {
  bg: '#f8f9fa',
  white: '#ffffff',
  border: '#e8eaed',
  text: '#202124',
  textSecondary: '#5f6368',
  textMuted: '#9aa0a6',
  accent: '#b45309',
  accentBg: 'rgba(180,83,9,0.06)',
  dark: '#1a1a2e',
  darkText: '#cbd5e1',
};

const WRITER_TIERS = [
  {
    tier: 'Community',
    price: 'Free',
    desc: 'Local voices. Unpaid contributors who build audience and establish their byline. Full editorial support. No exclusivity.',
    rights: 'Byline + distribution across the network. You own the words.',
  },
  {
    tier: 'Paid',
    price: 'Per assignment',
    desc: 'Commissioned work. CVB travel guides, city profiles, venue spotlights, and long-form features. Direct payment per piece.',
    rights: 'Work-for-hire with reprint rights retained by writer after 90 days.',
  },
  {
    tier: 'Rev-Share',
    price: '80/20 split',
    desc: 'Senior contributors and anchor nodes. 80% of ad revenue from their content goes to the writer. Every writer is a distribution node.',
    rights: '80% revenue share, full editorial freedom, permanent archive.',
  },
];

const CVB_PLAY = [
  {
    n: '01',
    title: 'CVB commissions a city guide',
    desc: 'Tourism dollar becomes a content assignment. Writer gets paid. City gets a permanent asset.',
  },
  {
    n: '02',
    title: 'Writer publishes in Big Muddy Magazine',
    desc: 'Content lives in the archive. Search traffic compounds. The CVB\'s investment keeps working.',
  },
  {
    n: '03',
    title: 'Radio picks up the story',
    desc: 'Big Muddy Radio records an interview with the writer or the subject. One assignment, two outputs.',
  },
  {
    n: '04',
    title: 'Rise Up plays the venue',
    desc: 'The city guide drives bookings. The touring circuit adds the stop. Hospitality and entertainment reinforce each other.',
  },
];

const PRINCIPLES = [
  {
    label: 'Open protocol',
    desc: 'Feed Farm is an open-source media protocol. Any regional publisher can join the guild. The network gets stronger with every node.',
  },
  {
    label: 'FFmpeg CLI bumpers',
    desc: 'Every podcast and radio segment carries a standardized bumper. Decentralized but coherent. Brand stays intact across the network.',
  },
  {
    label: 'RSS aggregator',
    desc: 'One feed pulls from every contributor. Subscribers get the whole network. Publishers get reach they couldn\'t build alone.',
  },
  {
    label: 'Guild economics',
    desc: '80/20 rev split. We take 20% to maintain infrastructure. Writers keep 80%. That\'s the whole model.',
  },
];

export default function FeedFarmPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
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
            Big Muddy Publishing
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              color: C.white,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 20px',
            }}
          >
            Feed Farm
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: C.darkText,
              lineHeight: 1.65,
              margin: '0 0 24px',
              maxWidth: 560,
            }}
          >
            Independent Media Protocol. A decentralized creator ad network and
            content guild connecting regional writers, podcasters, and
            publishers across the Deep South corridor.
          </p>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(180,83,9,0.15)',
              border: `1px solid ${C.accent}`,
              borderRadius: 8,
              padding: '12px 20px',
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: C.accent,
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              "Every dollar does triple duty: marketing output, local
              employment, permanent asset."
            </p>
          </div>
        </div>
      </div>

      {/* Contributing writers */}
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
          Contributing writers program
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: C.text,
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
          }}
        >
          Three tiers. Every writer is a distribution node.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: C.textSecondary,
            margin: '0 0 32px',
            lineHeight: 1.65,
            maxWidth: 520,
          }}
        >
          Content compounds. Nothing is disposable. Each piece lives in the
          archive and keeps earning.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            marginBottom: 64,
          }}
        >
          {WRITER_TIERS.map((tier) => (
            <div
              key={tier.tier}
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '24px 20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12,
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
                  {tier.tier}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.text,
                  }}
                >
                  {tier.price}
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: C.textSecondary,
                  lineHeight: 1.65,
                  margin: '0 0 12px',
                }}
              >
                {tier.desc}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  lineHeight: 1.55,
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                {tier.rights}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CVB Tourism Play */}
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
            CVB tourism content play
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
            }}
          >
            One tourism dollar. Four outputs.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              margin: '0 0 32px',
              lineHeight: 1.65,
              maxWidth: 520,
            }}
          >
            This is how Big Muddy Publishing connects to every other division.
            The content engine doesn&apos;t operate in isolation.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {CVB_PLAY.map((step) => (
              <div
                key={step.n}
                style={{
                  backgroundColor: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: C.accent,
                    marginBottom: 8,
                  }}
                >
                  {step.n}
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: C.text,
                    margin: '0 0 8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: C.textSecondary,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Protocol principles */}
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
          The protocol
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: C.text,
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
          }}
        >
          Open-source. Guild model. 80/20 split.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: C.textSecondary,
            margin: '0 0 32px',
            lineHeight: 1.65,
            maxWidth: 520,
          }}
        >
          Any regional publisher can join. The network gets stronger with every
          node.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 48,
          }}
        >
          {PRINCIPLES.map((p) => (
            <div
              key={p.label}
              style={{
                backgroundColor: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: '20px',
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: C.accent,
                  margin: '0 0 8px',
                }}
              >
                {p.label}
              </p>
              <p
                style={{
                  fontSize: 13,
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

        {/* Connection to Big Muddy narrative */}
        <div
          style={{
            backgroundColor: C.dark,
            borderRadius: 12,
            padding: 'clamp(28px, 4vw, 40px)',
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 700,
              color: C.white,
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
              lineHeight: 1.3,
            }}
          >
            Publishing connects every division.
          </h3>
          <p
            style={{
              fontSize: 15,
              color: C.darkText,
              lineHeight: 1.65,
              margin: '0 0 24px',
              maxWidth: 540,
            }}
          >
            Big Muddy Magazine writes the city guides that drive Inn bookings.
            Feed Farm pays local writers to do it. Those writers become
            distribution nodes. The CVB funding that pays them creates
            permanent content assets — not disposable ads that expire.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <a
              href="/hillbilly"
              style={{
                display: 'inline-block',
                padding: '10px 18px',
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                backgroundColor: C.accent,
                color: C.white,
              }}
            >
              See the holding company
            </a>
            <a
              href="/measurably-better/thesis"
              style={{
                display: 'inline-block',
                padding: '10px 18px',
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                backgroundColor: 'transparent',
                color: C.darkText,
                border: '1px solid rgba(203,213,225,0.2)',
              }}
            >
              Read the thesis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
