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
    description: 'The product brand. Pricing tiers, the $20 hook, the four markets.',
    isFinal: false,
  },
  {
    step: '02',
    title: 'The Thesis',
    href: '/measurably-better/thesis',
    description: 'Outsider Economics — Deep South Edition.',
    isFinal: false,
  },
  {
    step: '03',
    title: 'Regional Provider',
    href: '/measurably-better/regional',
    description: 'The four-tier model. SMB, Civic, Education, Tourism.',
    isFinal: false,
  },
  {
    step: '04',
    title: 'The Company',
    href: '/hillbilly-dreams',
    description: 'Hillbilly Dreams. Five divisions, org chart, proof stack.',
    isFinal: false,
  },
  {
    step: '05',
    title: 'The Platform',
    href: '/measurably-better/platform',
    description: 'HDX — the engine underneath everything.',
    isFinal: false,
  },
  {
    step: '06',
    title: 'The Ecosystem',
    href: '/big-muddy',
    description: 'How every division feeds the others. One artist booking triggers seven revenue events.',
    isFinal: false,
  },
  {
    step: '07',
    title: 'Strategy Report',
    href: '/strategy',
    description: 'The full executive memo.',
    isFinal: true,
  },
];

export default function WelcomeChase() {
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
          Hillbilly Dreams, Inc.
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
            Everything.
          </h1>
          <p style={{ fontSize: 18, color: C.textSecondary, lineHeight: 1.65, margin: 0, maxWidth: 520 }}>
            Every page, every section, every number. The full stack.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {stops.map((stop) => (
            <TourCard key={stop.step} {...stop} />
          ))}
        </div>
      </div>
    </div>
  );
}
