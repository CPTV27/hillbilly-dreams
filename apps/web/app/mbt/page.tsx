import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Measurably Better Things',
  description: 'The platform that turns any organization into a media company.',
};

export default function MBTPage() {
  return (
    <main style={{ background: '#0a0a08', color: '#e8e0d4', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>

      {/* HERO */}
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px, 8vw, 120px)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 24px' }}>Hillbilly Dreams Inc</p>
        <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.04em', margin: '0 0 24px' }}>Measurably<br />Better Things</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', lineHeight: 1.6, color: '#9b9488', maxWidth: '500px', margin: 0 }}>The platform that turns any organization into a media company.</p>
      </section>

      {/* ORIGIN */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <div style={{ maxWidth: '700px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>How It Started</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 24px' }}>Amy needed her band promoted.</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>Chase built a magazine, a record label, and a radio station to do it. Then he built the CMS to run it autonomously.</p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>Now the tools are ready for other people. Same engine. Different skin. Any organization can have its own media company without building one from scratch.</p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>Big Muddy is customer zero. It proves the platform works.</p>
        </div>
      </section>

      {/* THREE PRODUCTS */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Products</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 48px' }}>One platform. Three markets.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Real Estate', tag: 'For Brokers & Agents', desc: 'Directory presence, magazine features, AI social content, video for listings, radio mentions. The broker looks like they have a whole marketing department.', link: '/mbt/real-estate' },
            { title: 'Civic', tag: 'For Towns & Cities', desc: 'Business directory, content library, community platform. Every employee gets their own dashboard. It all rolls up to the city. $10,000 kickstart.', link: '/mbt/civic' },
            { title: 'Entertainment', tag: 'The Proof It Works', desc: 'What Big Muddy already does. Touring, records, radio, magazine. The radio show is the front door — musicians come on, see the ecosystem, get hooked.', link: '/entertainment' },
          ].map((product, i) => (
            <a key={i} href={product.link} style={{ display: 'block', padding: '32px', border: '1px solid rgba(200,148,62,0.15)', borderTop: '3px solid #c8943e', borderRadius: '4px', textDecoration: 'none', color: '#e8e0d4' }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 8px' }}>{product.tag}</p>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 12px' }}>{product.title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>{product.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* THE COMPANIES */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Structure</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 48px' }}>Hillbilly Dreams Inc</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Big Muddy Touring', role: 'The Entertainment Business', desc: 'Radio show, concerts, touring, booking, label services. The radio show is the front door — musicians come on, see the ecosystem, want in. Studio C is a vendor.' },
            { title: 'Measurably Better Things', role: 'The Product', desc: 'Sold to municipalities, brokers, banks. Always with a support package. Studio C and Tuthill Design are vendors. Placeholder for a web services vendor as it grows.' },
            { title: 'Studio C', role: 'The Vendor', desc: 'Video production, tech support, playout systems, website. Services both Big Muddy and MBT. The cash flow engine that funds the creative work.' },
            { title: 'Tuthill Design', role: 'Real Estate Vendor', desc: 'Handles real estate-specific MBT implementations. Existing relationships with Brown Harris Stevens, Berkshire Hathaway, Coldwell Banker, Keller Williams.' },
          ].map((company, i) => (
            <div key={i} style={{ padding: '28px', border: '1px solid rgba(200,148,62,0.1)', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 8px' }}>{company.role}</p>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 12px' }}>{company.title}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>{company.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE MATH */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Math</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 48px' }}>It stacks.</h2>
        <div style={{ maxWidth: '600px' }}>
          {[
            { label: 'Town kickstart', amount: '$10,000', note: 'one-time' },
            { label: 'Network SLA', amount: '$500/mo', note: 'ongoing' },
            { label: '50 businesses at $50/mo', amount: '$2,500/mo', note: 'recurring' },
            { label: '1 broker at $500/mo', amount: '$500/mo', note: 'recurring' },
            { label: '5 agents at $150/mo', amount: '$750/mo', note: 'recurring' },
            { label: 'Shows (2:1 multiplier)', amount: 'variable', note: 'Inn + bar revenue' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid rgba(200,148,62,0.08)' }}>
              <span style={{ fontSize: '0.95rem', color: '#9b9488' }}>{row.label}</span>
              <span style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.2rem', fontWeight: 700, color: '#c8943e' }}>{row.amount}</span>
                <span style={{ fontSize: '0.65rem', color: '#4a4440', width: '60px', textAlign: 'right' }}>{row.note}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* WHO DOES WHAT */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Who Does What</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { who: 'Chase', does: 'Creative direction, photography, architecture, the radio show' },
            { who: 'Tracy', does: 'Executive producer of the magazine. Edits everything. Finance and Inn ops.' },
            { who: 'Amy', does: 'Inn and bar ops. Her own magazine projects. The band.' },
            { who: 'Studio C', does: 'Video production, tech support, fulfillment for both BM and MBT' },
            { who: 'Tuthill Design', does: 'Real estate implementations. Hudson Valley market.' },
            { who: 'AI Agents', does: 'Daily content, social posting, analytics, review management, scheduling' },
            { who: 'The Operator', does: 'Local relationships, sales, community. Different person in each market.' },
            { who: 'Tesla Taxi', does: 'Transport for guests, musicians, clients. Self-driving. Every vertical.' },
          ].map((person, i) => (
            <div key={i} style={{ padding: '20px', borderLeft: '2px solid #c8943e' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px' }}>{person.who}</h3>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#6b635a', margin: 0 }}>{person.does}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(40px, 8vw, 120px)', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.9, margin: '0 0 16px' }}>Natchez + Woodstock.</h2>
        <p style={{ fontSize: '1rem', color: '#9b9488', margin: 0 }}>Two markets proving the same platform.</p>
      </section>

      <footer style={{ padding: '32px', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.06)' }}>
        <p style={{ fontSize: '0.6rem', color: '#2a2620', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Measurably Better Things &middot; A Hillbilly Dreams Company</p>
      </footer>
    </main>
  );
}
