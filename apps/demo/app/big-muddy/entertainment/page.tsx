const C = { bg: '#f8f9fa', card: '#ffffff', border: '#e8eaed', text: '#202124', textSec: '#5f6368', muted: '#9aa0a6', accent: '#b45309', dark: '#1a1a2e' };

const brands = [
  { name: 'Big Muddy Records', desc: 'Artist services. 100% masters retained. Always. We make money when you make money.', status: 'Live' },
  { name: 'Big Muddy Radio', desc: 'Curated playlists, live sessions, streaming. The sound of the Delta.', status: 'Live' },
  { name: 'Big Muddy Touring', desc: 'The Snowbird Circuit. 18 cities, five states. Memphis to New Orleans and beyond.', status: 'Live' },
  { name: 'Rise Up Gospel & Blues Band', desc: 'Franchisable touring brand. Multiple units, multiple regions. Every show is a talent search.', status: 'Live' },
];

export default function EntertainmentPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', padding: '0 0 80px' }}>
      <div style={{ backgroundColor: C.card, borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Big Muddy Entertainment</span>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ paddingTop: 64, paddingBottom: 32 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.accent, letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 12px' }}>JP — Division Head</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 20px' }}>
            Records. Radio. Touring. Rise Up.
          </h1>
          <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
            Big Muddy Entertainment is the creative engine of Hillbilly Dreams. JP has full authority over this division — gear, talent, scheduling, sound, production. If he wants to produce a TV show, Big Muddy sponsors it.
          </p>
        </div>

        <div style={{ backgroundColor: C.dark, borderRadius: 12, padding: '32px 28px', margin: '24px 0 40px', color: '#cbd5e1' }}>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Amy Pierson is a lead vocalist and on-network personality. Arri Aslin is the Artist-in-Residence and headliner. The Rise Up model is franchisable — multiple touring units, like Yachtley Crew, pulling talent from every tour stop. US first. Europe next.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {brands.map((b) => (
            <div key={b.name} style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{b.name}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', backgroundColor: 'rgba(22,163,74,0.06)', padding: '2px 8px', borderRadius: 4 }}>{b.status}</span>
              </div>
              <p style={{ fontSize: 14, color: C.textSec, margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Big Muddy Entertainment — Hillbilly Dreams, Inc.</p>
        </div>
      </div>
    </div>
  );
}
