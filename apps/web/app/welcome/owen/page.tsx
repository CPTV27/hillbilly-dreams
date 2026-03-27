// Welcome tour for Owen — guided walkthrough of the HDX ecosystem
// Server component — TourCard is a thin client component for hover state only

import TourCard, { type StopProps } from './TourCard';

const C = {
  bg: '#ffffff',
  bgPage: '#f8f9fa',
  border: '#e8eaed',
  text: '#202124',
  textSecondary: '#5f6368',
  textTertiary: '#9aa0a6',
};

const stops: StopProps[] = [
  {
    step: '01',
    title: 'Measurably Better',
    href: '/measurably-better',
    description:
      'The thesis. Measurably Better is the brand wrapper — AI-powered business intelligence that replaces guesswork with real, auditable numbers pulled from your actual financial systems.',
    isFinal: false,
  },
  {
    step: '02',
    title: 'The Platform',
    href: '/platform',
    description:
      'The engine underneath. This is the HDX Sovereign Protocol — five core capabilities that power every deployment. Think of it as the operating system that S2PX, the Directory, and every other module runs on.',
    isFinal: false,
  },
  {
    step: '03',
    title: 'Hillbilly Dreams',
    href: '/hillbilly',
    description:
      'Our flagship deployment. This is how we use HDX internally — running a holding company across hospitality, media, and music with a three-person team and an AI syndicate.',
    isFinal: false,
  },
  {
    step: '04',
    title: 'The Nexus',
    href: '/nexus',
    description:
      'The org chart, reimagined. This is a live view of how the ecosystem connects — every business unit, every data flow, one nervous system.',
    isFinal: false,
  },
  {
    step: '05',
    title: 'MVX Spatial Prototype',
    href: '/mvx',
    description:
      "A preview of where we're headed. This is a 3D spatial interface prototype — the early concept for embedding architectural scan data directly into the web console. Interactive. Drag to orbit.",
    isFinal: false,
  },
  {
    step: '06',
    title: 'The S2PX Console',
    href: '/hillbilly/proposal/scan2plan/console',
    description:
      'The destination. This is the live S2PX sandbox — your enterprise console with real financial intelligence, commission modeling, and the full proposal framework. This is what we built for you.',
    isFinal: true,
  },
];

export default function WelcomeOwen() {
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
            color: C.textTertiary,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}
        >
          HDX Platform
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
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 20px',
            }}
          >
            Welcome, Owen.
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
            This is a guided walkthrough of the HDX platform — the operating
            system behind Measurably Better and S2PX. Each section below is
            live. Click through at your own pace.
          </p>
        </div>

        {/* Tour stops */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {stops.map((stop) => (
            <TourCard key={stop.step} {...stop} />
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
              color: C.textTertiary,
              margin: 0,
            }}
          >
            Built with HDX — Hillbilly Dreams, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
