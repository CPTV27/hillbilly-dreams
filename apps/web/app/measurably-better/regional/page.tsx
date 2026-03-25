// Regional Technology & Media Provider — Measurably Better
// Server component — no client JS needed

const C = {
  bg: '#ffffff',
  bgPage: '#f8f9fa',
  bgCard: '#ffffff',
  border: '#e8eaed',
  text: '#202124',
  textSec: '#5f6368',
  textMuted: '#9aa0a6',
  accent: '#b45309',
  accentBg: 'rgba(180,83,9,0.06)',
  green: '#16a34a',
  greenBg: 'rgba(22,163,74,0.06)',
  blue: '#2563eb',
  blueBg: 'rgba(37,99,235,0.06)',
  purple: '#7c3aed',
  purpleBg: 'rgba(124,58,237,0.06)',
};

type Tier = {
  label: string;
  color: string;
  colorBg: string;
  title: string;
  buyer: string;
  pitch: string;
  modules: string[];
  pricing: string;
  funding: string;
};

const tiers: Tier[] = [
  {
    label: 'TIER 1',
    color: C.accent,
    colorBg: C.accentBg,
    title: 'Small & Medium Business',
    buyer: 'Owner-operators, 1\u201350 employees',
    pitch: 'Replace your back-office headcount with an AI operating system.',
    modules: [
      'CEO Console with live financial telemetry',
      'QuickBooks Online sync \u2014 real-time P&L',
      'AI scoping, quoting, and lead qualification',
      'Automated case studies and marketing pipeline',
      'Spatial / LiDAR compute for AEC operators',
    ],
    pricing: '$5,000/mo core + growth module',
    funding: 'Operating budget',
  },
  {
    label: 'TIER 2',
    color: C.blue,
    colorBg: C.blueBg,
    title: 'Civic & Municipal',
    buyer: 'City managers, county administrators, planning directors',
    pitch: 'Digitize your city for less than one FTE.',
    modules: [
      'Permitting & code enforcement dashboard',
      'Asset management \u2014 infrastructure, fleet, facilities',
      'Citizen request tracking (311 replacement)',
      'Tourism & economic development analytics',
      'Grant reporting automation \u2014 eliminate 20% compliance overhead',
    ],
    pricing: '$25\u2013$50K/year per city',
    funding: 'ARPA, USDA Rural Development, HUD CDBG, state digital transformation programs',
  },
  {
    label: 'TIER 3',
    color: C.green,
    colorBg: C.greenBg,
    title: 'Education',
    buyer: 'Superintendents, district IT directors',
    pitch: 'One dashboard for enrollment, facilities, and compliance \u2014 funded by dollars you already receive.',
    modules: [
      'Facilities management \u2014 scan buildings, track maintenance',
      'Enrollment & capacity forecasting',
      'Title I/II/IV compliance reporting',
      'Transportation route optimization',
      'Staff scheduling & substitute management',
    ],
    pricing: '$3\u2013$5K/mo per district',
    funding: 'E-Rate, Title IV-A, ESSER, state per-pupil tech allocations',
  },
  {
    label: 'TIER 4',
    color: C.purple,
    colorBg: C.purpleBg,
    title: 'Tourism & Regional Media',
    buyer: 'CVB directors, tourism commissions, Main Street programs',
    pitch: 'Convert your marketing budget into locally-produced content that stays in the community.',
    modules: [
      'Magazine-quality editorial \u2014 city guides, interviews, photo essays',
      'Radio & podcast content featuring local musicians',
      'Photo/video produced by local creators, not out-of-state agencies',
      'Social content calendars managed by AI, executed by residents',
      'Permanent SEO content library \u2014 not disposable ad buys',
    ],
    pricing: '$2\u2013$8K/mo or direct CVB budget replacement',
    funding: 'State tourism allocations, CVB operating budgets, Main Street grants',
  },
];

const proofPoints = [
  { label: 'SMB', example: 'Big Muddy Inn + S2PX contractors', status: 'Live' },
  { label: 'Civic', example: 'City of Natchez tourism + permitting', status: 'Pilot' },
  { label: 'Education', example: 'Natchez-Adams School District', status: 'Proposed' },
  { label: 'Media', example: 'Big Muddy Magazine, Radio, Touring', status: 'Live' },
];

const comparison = [
  { dimension: 'Sales', national: 'Cold outbound, $50K CAC', regional: 'Warm intros, shared networks' },
  { dimension: 'Support', national: 'Ticket queue offshore', regional: 'A phone number that answers' },
  { dimension: 'Implementation', national: '6-month enterprise onboard', regional: '30 days, same timezone' },
  { dimension: 'Trust', national: '"Who are these people?"', regional: '"They run the inn on Main Street"' },
  { dimension: 'Content $', national: 'Leaves the region entirely', regional: '80% stays with local producers' },
];

export default function RegionalPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bgPage,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        padding: '0 0 80px',
      }}
    >
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

      {/* Content */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ paddingTop: 64, paddingBottom: 24 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: C.accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              margin: '0 0 12px',
            }}
          >
            Regional Technology & Media Provider
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 20px',
            }}
          >
            One engine.<br />
            Every institution in the region.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: C.textSec,
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 580,
            }}
          >
            The same HDX platform that runs a hotel, a scanning company, and a
            record label can run a city hall, a school district, and a tourism
            bureau. Every dollar stays local. Every deployment is a case study
            that sells the next one.
          </p>
        </div>

        {/* The Problem */}
        <div
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: 12,
            padding: '32px 28px',
            margin: '32px 0',
            color: '#e8e8f0',
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', color: C.accent, margin: '0 0 12px', textTransform: 'uppercase' as const }}>
            The Problem
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: 0, color: '#cbd5e1' }}>
            Small Southern cities run on paper, Access databases from 2004, and
            one IT person who&apos;s also the fire chief. Tourism budgets go to
            agencies in Memphis or Jackson. The content they produce is generic.
            The money leaves. Nothing compounds. Measurably Better keeps the
            technology, the content, and the revenue inside the region.
          </p>
        </div>

        {/* Tiers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '40px 0' }}>
          {tiers.map((tier) => (
            <div
              key={tier.label}
              style={{
                backgroundColor: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '28px 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: tier.color,
                    backgroundColor: tier.colorBg,
                    padding: '3px 10px',
                    borderRadius: 4,
                    letterSpacing: '0.06em',
                  }}
                >
                  {tier.label}
                </span>
                <span style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{tier.title}</span>
              </div>

              <p style={{ fontSize: 13, color: C.textMuted, margin: '0 0 4px' }}>
                <strong style={{ color: C.textSec }}>Buyer:</strong> {tier.buyer}
              </p>
              <p style={{ fontSize: 15, color: C.text, margin: '0 0 16px', lineHeight: 1.5 }}>
                {tier.pitch}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                {tier.modules.map((m) => (
                  <p key={m} style={{ fontSize: 14, color: C.textSec, margin: 0, paddingLeft: 18 }}>
                    &#x2713; {m}
                  </p>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const }}>
                <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
                  <strong style={{ color: C.text }}>{tier.pricing}</strong>
                </p>
                <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
                  Funded by: {tier.funding}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Regional Beats National */}
        <div style={{ margin: '48px 0 32px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: '0 0 20px' }}>
            Why Regional Beats National
          </h2>
          <div
            style={{
              backgroundColor: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                backgroundColor: '#1a1a2e',
                padding: '12px 20px',
                gap: 16,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}></span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em' }}>NATIONAL SAAS</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: '0.06em' }}>MEASURABLY BETTER</span>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.dimension}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '14px 20px',
                  gap: 16,
                  backgroundColor: i % 2 === 0 ? C.bgCard : C.bgPage,
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{row.dimension}</span>
                <span style={{ fontSize: 13, color: C.textMuted }}>{row.national}</span>
                <span style={{ fontSize: 13, color: C.text }}>{row.regional}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Natchez Proof Stack */}
        <div style={{ margin: '48px 0 32px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>
            The Natchez Proof Stack
          </h2>
          <p style={{ fontSize: 15, color: C.textSec, margin: '0 0 20px', lineHeight: 1.5 }}>
            One town. All four tiers. Running on the same engine.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {proofPoints.map((p) => (
              <div
                key={p.label}
                style={{
                  backgroundColor: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: '20px 18px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.label}</span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: p.status === 'Live' ? C.green : C.accent,
                      backgroundColor: p.status === 'Live' ? C.greenBg : C.accentBg,
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: C.textSec, margin: 0 }}>{p.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Content Dollar */}
        <div
          style={{
            backgroundColor: C.accentBg,
            border: `1px solid ${C.accent}33`,
            borderRadius: 12,
            padding: '28px 24px',
            margin: '40px 0',
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', color: C.accent, margin: '0 0 12px', textTransform: 'uppercase' as const }}>
            Every Dollar Does Triple Duty
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.5 }}>
              <strong>1. Marketing output</strong> &mdash; The CVB gets their tourism content. The school gets their enrollment materials. The city gets their economic development story.
            </p>
            <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.5 }}>
              <strong>2. Local employment</strong> &mdash; Photographers, writers, musicians, and filmmakers in the corridor get paid. Not an agency in another state.
            </p>
            <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.5 }}>
              <strong>3. Permanent assets</strong> &mdash; Content compounds on the platform. Magazine articles, radio episodes, city guides &mdash; they build SEO and brand equity forever. Not a disposable Facebook ad.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: `1px solid ${C.border}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <p style={{ fontSize: 15, color: C.text, margin: 0, fontWeight: 500 }}>
            Interested? Let&apos;s talk.
          </p>
          <p style={{ fontSize: 14, color: C.textSec, margin: 0 }}>
            chase@hillbillydreamsinc.com
          </p>
          <p style={{ fontSize: 13, color: C.textMuted, margin: '8px 0 0' }}>
            Built with HDX &mdash; Hillbilly Dreams, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
