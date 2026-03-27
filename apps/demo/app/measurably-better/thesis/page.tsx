// Outsider Economics: Deep South Edition — The MB Thesis
// Server component

import Image from 'next/image';
import Nav from '../../components/Nav';

const C = {
  bg: '#FAFAF8',
  bgAlt: '#F5F3EF',
  white: '#FFFFFF',
  border: '#E5E5E0',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  accent: '#B45309',
  accentBg: 'rgba(180,83,9,0.06)',
  dark: '#1A1A1A',
  darkText: '#E5E5E0',
};

type Principle = { number: string; title: string; body: string };

const principles: Principle[] = [
  {
    number: '01',
    title: 'Sovereignty',
    body: 'Own your data. Own your tools. Own your story. Every deployment runs on your vault, not someone else\u2019s cloud. When a business, a city, or a school district operates on sovereign infrastructure, they make decisions from real numbers \u2014 not gut feelings and not someone else\u2019s algorithm.',
  },
  {
    number: '02',
    title: 'Density',
    body: 'One platform runs the hotel, the scanning company, the tourism bureau, and the school district. They share an engine, not data. Every new node makes the network smarter. In a region where everybody already knows everybody, that density is a superpower national players can\u2019t replicate.',
  },
  {
    number: '03',
    title: 'Compounding',
    body: 'Every dollar spent on the platform creates a permanent asset. A tourism photo shoot becomes a magazine article becomes a radio feature becomes a city guide that drives visitors for years. Nothing is disposable. Everything compounds.',
  },
  {
    number: '04',
    title: 'Local Velocity',
    body: 'When technology dollars stay in-region, they circulate. The photographer gets paid, eats at the restaurant, which buys from the local supplier. A dollar that recirculates three times in-county creates three times the economic impact of a dollar that leaves on day one. We build for velocity, not extraction.',
  },
];

type Market = { segment: string; gets: string; changes: string };

const markets: Market[] = [
  {
    segment: 'Main Street Business',
    gets: 'AI operating system, live financials, automated marketing',
    changes: 'Owners spend time on craft, not paperwork',
  },
  {
    segment: 'City Hall',
    gets: 'Digital permitting, asset tracking, grant reporting',
    changes: 'One dashboard replaces five filing cabinets',
  },
  {
    segment: 'School District',
    gets: 'Facilities management, enrollment forecasting, compliance',
    changes: 'Superintendents make decisions from data, not guesswork',
  },
  {
    segment: 'Tourism Bureau',
    gets: 'Locally-produced content engine, analytics, permanent SEO',
    changes: 'Marketing dollars stay in-county and compound',
  },
];

const caseStudies = [
  'A hotel you can book',
  'A magazine you can read',
  'A radio station you can hear',
  'A record label where artists keep 100% of their masters',
  'A touring circuit across five states',
  'All built here. All running here.',
];

export default function ThesisPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'var(--font-inter), sans-serif',
        padding: '0 0 80px',
      }}
    >
      <Nav currentPath="/measurably-better" />

      {/* Top bar */}
      <div
        style={{
          backgroundColor: C.bg,
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

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        {/* Hero */}
        <div style={{ paddingTop: 72, paddingBottom: 32 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: C.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              margin: '0 0 16px',
            }}
          >
            Outsider Economics &middot; Deep South Edition
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 'clamp(2.25rem, 5vw, 3rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: '0 0 24px',
            }}
          >
            The South has the culture.<br />
            We&apos;re building the infrastructure<br />
            to match.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: C.textSecondary,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 560,
            }}
          >
            The Deep South has the talent, the land, the story, and the culture.
            What it hasn&apos;t had is the technology infrastructure to capture
            the value those things generate. That&apos;s changing.
          </p>
        </div>

        {/* Thesis block */}
        <div
          style={{
            backgroundColor: C.dark,
            borderRadius: 12,
            padding: '36px 32px',
            margin: '24px 0 48px',
          }}
        >
          <p
            style={{
              fontSize: 17,
              color: '#cbd5e1',
              lineHeight: 1.75,
              margin: '0 0 20px',
            }}
          >
            Measurably Better is a regional technology and media provider built
            in Mississippi, for the South, by people who live here. We&apos;re
            not fixing what&apos;s broken. We&apos;re building what was never
            built &mdash; and doing it before the rest of the country catches up.
          </p>
          <p
            style={{
              fontSize: 15,
              color: '#94a3b8',
              lineHeight: 1.75,
              margin: 0,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 20,
            }}
          >
            &ldquo;Measurably Better&rdquo; means the things in your community
            become measurably better when the technology infrastructure is owned
            and operated by people who live there.
          </p>
        </div>

        {/* Four Principles */}
        <div style={{ margin: '48px 0' }}>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 13,
              fontWeight: 600,
              color: C.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              margin: '0 0 24px',
            }}
          >
            Four Principles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {principles.map((p) => (
              <div
                key={p.number}
                style={{
                  backgroundColor: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '28px 24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 14,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.accent,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {p.number}
                  </span>
                  <h3
                    style={{
              fontFamily: 'var(--font-abril), serif',
                      fontSize: 20,
                      fontWeight: 700,
                      color: C.text,
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: C.textSecondary,
                    lineHeight: 1.7,
                    margin: 0,
                    paddingLeft: 27,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why the South, Why Now */}
        <div style={{ margin: '48px 0' }}>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 24,
              fontWeight: 700,
              color: C.text,
              margin: '0 0 16px',
            }}
          >
            Why the South. Why Now.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: C.textSecondary,
              lineHeight: 1.7,
              margin: '0 0 16px',
            }}
          >
            The Deep South has something most tech markets don&apos;t:{' '}
            <strong style={{ color: C.text }}>
              trust networks that still work.
            </strong>{' '}
            The mayor knows the superintendent knows the hotel owner knows the
            contractor. In San Francisco, enterprise sales cost $50K in customer
            acquisition. Here, it&apos;s a phone call and a handshake.
          </p>
          <p
            style={{
              fontSize: 16,
              color: C.textSecondary,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            The region also has billions in unspent ARPA funds, state digital
            transformation grants, E-Rate allocations, and USDA Rural
            Development programs sitting on the table. The money exists. The
            technology exists. What&apos;s been missing is a provider who speaks
            the language, lives in the timezone, and prices for the actual
            economy.
          </p>
          <Image
            src="https://storage.googleapis.com/bmt-media-bigmuddy/heroes/hero-highway-sunset.webp"
            alt="Highway at sunset — the Deep South corridor"
            width={800}
            height={240}
            style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 12, marginTop: 28 }}
          />
        </div>

        {/* What We're Building */}
        <div style={{ margin: '48px 0' }}>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 24,
              fontWeight: 700,
              color: C.text,
              margin: '0 0 8px',
            }}
          >
            What We&apos;re Building
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              lineHeight: 1.6,
              margin: '0 0 20px',
            }}
          >
            Not a startup trying to disrupt something. A regional technology
            company that accelerates adoption &mdash; bringing the efficiencies
            that coastal metros take for granted to the towns that built
            American music, food, and culture.
          </p>

          <div
            style={{
              backgroundColor: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr 1.4fr',
                backgroundColor: C.dark,
                padding: '12px 20px',
                gap: 16,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}>MARKET</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}>WHAT THEY GET</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}>WHAT CHANGES</span>
            </div>
            {markets.map((row, i) => (
              <div
                key={row.segment}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.4fr 1.4fr',
                  padding: '14px 20px',
                  gap: 16,
                  backgroundColor: i % 2 === 0 ? C.white : C.bg,
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{row.segment}</span>
                <span style={{ fontSize: 13, color: C.textSecondary }}>{row.gets}</span>
                <span style={{ fontSize: 13, color: C.text }}>{row.changes}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Natchez Model */}
        <div style={{ margin: '48px 0' }}>
          <h2
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 24,
              fontWeight: 700,
              color: C.text,
              margin: '0 0 8px',
            }}
          >
            The Natchez Model
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              lineHeight: 1.6,
              margin: '0 0 20px',
            }}
          >
            One town. All four markets. Running on one engine.
          </p>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              lineHeight: 1.6,
              margin: '0 0 20px',
            }}
          >
            The Big Muddy Inn is the anchor &mdash; a real business on Main
            Street running on the same platform we deploy to clients. The
            magazine, the radio station, the touring route, the record
            label &mdash; all producing content, all employing local creators,
            all running on the same engine.
          </p>
          <p
            style={{
              fontSize: 15,
              color: C.textSecondary,
              lineHeight: 1.6,
              margin: '0 0 24px',
            }}
          >
            When we walk into a city council meeting or a school board hearing,
            we don&apos;t show slides. We show:
          </p>
          <div
            style={{
              backgroundColor: C.accentBg,
              border: `1px solid ${C.accent}33`,
              borderRadius: 12,
              padding: '24px 24px',
            }}
          >
            {caseStudies.map((point, i) => (
              <p
                key={i}
                style={{
                  fontSize: 15,
                  color: i === caseStudies.length - 1 ? C.text : C.textSecondary,
                  fontWeight: i === caseStudies.length - 1 ? 600 : 400,
                  margin: i === caseStudies.length - 1 ? '12px 0 0' : '0 0 6px',
                  lineHeight: 1.5,
                }}
              >
                {i < caseStudies.length - 1 ? '\u2713 ' : ''}{point}
              </p>
            ))}
          </div>
        </div>

        {/* The Scale */}
        <div style={{ margin: '48px 0' }}>
          <p
            style={{
              fontSize: 16,
              color: C.textSecondary,
              lineHeight: 1.7,
              margin: '0 0 16px',
            }}
          >
            If it works in Natchez, it works in Vicksburg. In Clarksdale. In El
            Dorado. In Shreveport. In every Southern city that has the culture
            and the people but never had the technology infrastructure to match.
          </p>
          <p
            style={{
              fontSize: 16,
              color: C.textSecondary,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Technology is about to become ubiquitous. In three years, every
            business will have an AI dashboard. Every city will have a digital
            services layer. The question isn&apos;t whether the technology
            arrives. The question is who delivers it, where the money goes, and
            whether the South leads its own transformation &mdash; or waits for
            someone else to sell it to them.
          </p>
        </div>

        {/* Closing */}
        <div
          style={{
            backgroundColor: C.dark,
            borderRadius: 12,
            padding: '40px 32px',
            margin: '48px 0 0',
            textAlign: 'center' as const,
          }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#f8f9fa',
              lineHeight: 1.4,
              margin: '0 0 8px',
            }}
          >
            Delivering the efficiencies of tomorrow, today.
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#94a3b8',
              margin: 0,
            }}
          >
            Measurably Better &middot; Built in Mississippi
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: `1px solid ${C.border}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <p style={{ fontSize: 14, color: C.textSecondary, margin: 0 }}>
            chase@hillbillydreamsinc.com
          </p>
          <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
            &copy; 2026 Hillbilly Dreams, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
