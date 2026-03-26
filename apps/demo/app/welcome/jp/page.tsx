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
    title: 'The Big Picture',
    href: '/hillbilly-dreams',
    description:
      'Hillbilly Dreams, Inc. — the holding company. Five divisions, one engine. This is how it all connects and where Entertainment fits.',
    isFinal: false,
  },
  {
    step: '02',
    title: 'Big Muddy Entertainment',
    href: '/big-muddy',
    description:
      'Your division. Records, Radio, Touring, Rise Up. You have full creative authority — gear, talent, scheduling, sound, production. If you want to produce a TV show, Big Muddy sponsors it.',
    isFinal: false,
  },
  {
    step: '03',
    title: 'The Mission',
    href: '/measurably-better/thesis',
    description:
      'Outsider Economics — Deep South Edition. The philosophy behind everything we build. "The South has the culture. We\'re building the infrastructure to match."',
    isFinal: false,
  },
  {
    step: '04',
    title: 'The Platform',
    href: '/measurably-better/platform',
    description:
      'The HDX engine that runs underneath. This is the technology that makes it possible to run Records, Radio, Touring, and Rise Up on one system with a three-person team.',
    isFinal: false,
  },
  {
    step: '05',
    title: 'Feed Farm',
    href: '/big-muddy/publishing',
    description:
      'The independent media protocol. Contributing writers, local content production, and the model for keeping media dollars in the region. This is how the magazine and radio content scales.',
    isFinal: false,
  },
  {
    step: '06',
    title: 'The Full Strategy Report',
    href: '/strategy',
    description:
      'The complete executive memo — org chart, revenue projections, competitive landscape, and what we need to execute. Password: jp',
    isFinal: true,
  },
];

export default function WelcomeJP() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'var(--font-inter), sans-serif',
        padding: '0 0 80px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
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
          Big Muddy Entertainment
        </span>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
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
            Welcome, JP.
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
            This is your division. Records, Radio, Touring, Rise Up — and
            anything else you want to build under the Big Muddy Entertainment
            banner. Click through to see the full picture.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {stops.map((stop) => (
            <TourCard key={stop.step} {...stop} />
          ))}
        </div>

        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <p style={{ fontSize: 15, color: C.text, margin: 0, fontWeight: 500 }}>
            Questions? Call Chase.
          </p>
          <p style={{ fontSize: 13, color: C.textMuted, margin: '8px 0 0' }}>
            Built with HDX — Hillbilly Dreams, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
