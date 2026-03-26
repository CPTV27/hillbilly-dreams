import Nav from '../../components/Nav';

const C = {
  bg: 'var(--bm-cream)',
  bgAlt: '#F5EFF3',
  white: '#FFFFFF',
  border: '#E5D6DF',
  text: 'var(--bm-charcoal)',
  textSecondary: '#574B46',
  textMuted: '#8C7A73',
  accent: 'var(--bm-burgundy)',
  accentBg: 'rgba(123,27,70,0.06)',
  dark: '#1C1816',
  darkText: '#E5D6DF',
};

export default function HospitalityPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'var(--font-inter), sans-serif', padding: '0 0 80px' }}>
      <Nav currentPath="/big-muddy" />
      <div style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Big Muddy Hospitality</span>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ paddingTop: 64, paddingBottom: 32 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.accent, letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>Tracy — Division Head</p>
          <h1 style={{
              fontFamily: 'var(--font-abril), serif', fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 20px' }}>
            The Big Muddy Inn
          </h1>
          <p style={{ fontSize: 17, color: C.textSecondary, lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
            The anchor. Where the story started. Six rooms in Natchez, Mississippi, on the bluffs above the river.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 20px' }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: C.text }}>The Big Muddy Inn</span>
            <p style={{ fontSize: 14, color: C.textSecondary, margin: '8px 0 0', lineHeight: 1.5 }}>
              Six rooms in Natchez, Mississippi. Every room named for a blues legend. You&apos;re not staying at a hotel. You&apos;re staying inside a living media company.
            </p>
          </div>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 20px' }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Weddings &amp; Events</span>
            <p style={{ fontSize: 14, color: C.textSecondary, margin: '8px 0 0', lineHeight: 1.5 }}>
              A venue on the Mississippi River in a town full of antebellum architecture. Every event is a content moment for the magazine, a session for radio, and a night the touring artists remember.
            </p>
          </div>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 20px' }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: C.text }}>The Blues Room</span>
            <p style={{ fontSize: 14, color: C.textSecondary, margin: '8px 0 0', lineHeight: 1.5 }}>
              The stage. Live music venue attached to the Inn. Rise Up performs here. Touring artists stop here. The room that connects Hospitality to Entertainment.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(180,83,9,0.06)', border: '1px solid rgba(180,83,9,0.2)', borderRadius: 12, padding: '24px 20px', margin: '32px 0' }}>
          <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.6 }}>
            <strong>The model:</strong> Tracy runs the profitable base. The rooms fund everything else. No expansion into more rooms — the Inn is the anchor, not a growth vehicle.
          </p>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>Big Muddy Hospitality — a division of Hillbilly Dreams, Inc.</p>
        </div>
      </div>
    </div>
  );
}
