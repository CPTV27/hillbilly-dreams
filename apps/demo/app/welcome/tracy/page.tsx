// Welcome, Tracy — Hospitality Division Head
// Server component. Imports TourCard from ../owen/TourCard.

import TourCard, { type StopProps } from '../../components/TourCard';

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

const stops: StopProps[] = [
  {
    step: '01',
    title: 'Measurably Better',
    href: '/measurably-better',
    description:
      'The product brand. What we sell. This is what the world sees — AI-powered technology and media services for the Deep South, priced for Main Street.',
    isFinal: false,
  },
  {
    step: '02',
    title: 'Hillbilly Dreams',
    href: '/hillbilly-dreams',
    description:
      'The holding company. How it all connects. Five divisions, one engine, and the cross-promotion model that makes hospitality the anchor of everything.',
    isFinal: false,
  },
  {
    step: '03',
    title: 'The Thesis',
    href: '/measurably-better/thesis',
    description:
      'The philosophy. Why we exist. Sovereignty, density, compounding, local velocity — the four principles behind every decision we make.',
    isFinal: false,
  },
  {
    step: '04',
    title: 'The Four Markets',
    href: '/measurably-better/regional',
    description:
      'The four markets. Where the revenue comes from. SMB, Civic, Education, Tourism — and why the Deep South is the right place to build this.',
    isFinal: false,
  },
  {
    step: '05',
    title: 'The Nexus',
    href: '/big-muddy',
    description:
      'The ecosystem. How every division feeds the others. The Inn is the anchor. Your operation is the proof that the model works.',
    isFinal: false,
  },
  {
    step: '06',
    title: 'The Full Report',
    href: '/strategy',
    description:
      'The full executive report. Everything — financials, strategy, market analysis, and the road ahead. Password: tracy',
    isFinal: true,
  },
];

export default function WelcomeTracy() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'var(--font-inter), sans-serif',
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

      {/* Content wrapper */}
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div style={{ paddingTop: 64, paddingBottom: 48 }}>
          <h1
            style={{
              fontFamily: 'var(--font-abril), serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 20px',
            }}
          >
            Welcome, Tracy.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: C.textSecondary,
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 520,
            }}
          >
            This is a guided walkthrough of the Measurably Better platform,
            built around your role as Hospitality Division Head. Six stops.
            Start wherever you want — the full picture is here.
          </p>
        </div>

        {/* Tour stops */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {stops.map((stop) => (
            <TourCard key={stop.step} {...stop} />
          ))}
        </div>

        {/* Action Items */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{
              fontFamily: 'var(--font-abril), serif', fontSize: 20, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>Action Items</h2>
          <p style={{ fontSize: 14, color: C.textSecondary, margin: '0 0 20px' }}>Grant opportunities &amp; business operations.</p>

          {[
            { priority: 'URGENT — 9 MONTH WINDOW', items: [
              { task: 'ARPA funding application — City of Natchez', note: '$826M unspent in Mississippi. Deadline Dec 31, 2026. Technology is eligible. We need to apply for a civic pilot.', done: false },
              { task: 'Identify Natchez city contact for ARPA', note: 'City manager or clerk. They need to know we exist before we apply.', done: false },
              { task: 'Engage grant writer (retainer)', note: 'Someone who knows ARPA, USDA Rural Development, and E-Rate applications. One of our four vendor stack slots.', done: false },
            ]},
            { priority: 'HIGH — EDUCATION', items: [
              { task: 'E-Rate application — Natchez-Adams School District', note: '$33.3M in MS FY2026 requests. New 5-year Category 2 cycle. Fresh budget per district.', done: false },
              { task: 'Title IV-A inquiry — MS Dept of Education', note: '$17.4M/year allocated to MS for K-12 technology. MB Learn curriculum is eligible.', done: false },
              { task: 'Contact Natchez-Adams School District superintendent', note: 'Amy may have community contacts. Initial conversation about technology needs.', done: false },
            ]},
            { priority: 'MEDIUM — BUSINESS', items: [
              { task: 'Insurance — bind $2M GL + $1M cyber', note: 'Embroker or Coalition. Nothing moves with government until a COI exists.', done: false },
              { task: 'FERPA Data Privacy Agreement template', note: 'Needed before any school district contract. Can use standard template.', done: false },
              { task: 'CivicX product sheet', note: 'One-pager: features, pricing, tech diagram. For city hall meetings.', done: false },
              { task: 'USDA Rural Development grant research', note: 'ReConnect program for broadband/digital infrastructure. Natchez may qualify.', done: false },
            ]},
            { priority: 'ONGOING — HOSPITALITY', items: [
              { task: 'Monthly P&L review in dashboard', note: 'The MB platform tracks this. Review monthly, flag anomalies.', done: false },
              { task: 'Wedding inquiry pipeline', note: 'Track all wedding inquiries through the platform. Attribution matters for the cross-promotion engine.', done: false },
              { task: 'Blues Room event calendar', note: 'Keep current. Every show feeds Radio, Magazine, and Touring content.', done: false },
            ]},
          ].map((group) => (
            <div key={group.priority} style={{ marginBottom: 20 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                color: group.priority.includes('URGENT') ? '#c00' : group.priority.includes('HIGH') ? '#b45309' : '#5f6368',
                backgroundColor: group.priority.includes('URGENT') ? 'rgba(204,0,0,0.06)' : group.priority.includes('HIGH') ? 'rgba(180,83,9,0.06)' : 'rgba(95,99,104,0.06)',
                padding: '2px 8px', borderRadius: 4,
              }}>{group.priority}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                {group.items.map((item) => (
                  <div key={item.task} style={{
                    backgroundColor: '#ffffff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px',
                  }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 4px' }}>
                      {item.done ? '\u2705' : '\u2B1C'} {item.task}
                    </p>
                    <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          <p
            style={{
              fontSize: 15,
              color: C.text,
              margin: 0,
              fontWeight: 500,
            }}
          >
            Questions? Call Chase directly.
          </p>
          <p
            style={{
              fontSize: 13,
              color: C.textMuted,
              margin: 0,
            }}
          >
            Built with HDX &mdash; Hillbilly Dreams, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
