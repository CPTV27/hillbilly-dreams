import Nav from '../../components/Nav';

const C = {
  bg: 'var(--bm-cream)',
  bgAlt: '#F0EBE1',
  white: '#FFFFFF',
  border: '#E2D9CC',
  text: 'var(--bm-charcoal)',
  textSecondary: '#5A524C',
  textMuted: '#8B7E76',
  accent: 'var(--bm-periwinkle)',
  accentBg: 'rgba(100,119,173,0.1)',
  dark: '#1A1715',
  darkText: '#E0D6C8',
};

const brands = [
  { name: 'Big Muddy Records', desc: '100% masters retained. Always.', status: 'Live' },
  { name: 'Big Muddy Radio', desc: 'The sound of the Delta. One show in production.', status: 'Live' },
  { name: 'Big Muddy Touring', desc: 'Memphis to New Orleans and 14 more cities.', status: 'Live' },
  { name: 'Rise Up', desc: 'The talent has always been here.', status: 'Live' },
];

export default function EntertainmentPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'var(--font-inter), sans-serif', padding: '0 0 80px' }}>
      <Nav currentPath="/big-muddy" />
      <div style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Big Muddy Entertainment</span>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ paddingTop: 64, paddingBottom: 32 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.accent, letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>JP — Division Head</p>
          <h1 style={{
              fontFamily: 'var(--font-abril), serif', fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 20px' }}>
            Records. Radio. Touring. Rise Up.
          </h1>
          <p style={{ fontSize: 17, color: C.textSecondary, lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
            Big Muddy Entertainment is the creative division of Hillbilly Dreams. JP has full authority — gear, talent, scheduling, sound, production.
          </p>
          <img
            src="https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp"
            alt="Live show at the Blues Room — Big Muddy Inn, Natchez"
            style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 12, marginTop: 28 }}
          />
        </div>

        <div style={{ backgroundColor: C.dark, borderRadius: 12, padding: '32px 28px', margin: '24px 0 40px', color: '#cbd5e1' }}>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Rise Up is franchisable — multiple touring units pulling talent from every stop on the corridor. The talent has always been here. JP&apos;s job is to make sure it gets heard.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {brands.map((b) => (
            <div key={b.name} style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{b.name}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', backgroundColor: 'rgba(22,163,74,0.06)', padding: '2px 8px', borderRadius: 4 }}>{b.status}</span>
              </div>
              <p style={{ fontSize: 14, color: C.textSecondary, margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>Big Muddy Entertainment — a division of Hillbilly Dreams, Inc.</p>
        </div>
      </div>
    </div>
  );
}
