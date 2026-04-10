import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBT Civic — For Towns & Cities',
  description: '$10,000 brings a production crew to your town. You get a content library, a business directory, and a marketing engine.',
};

export default function MBTCivicPage() {
  return (
    <main style={{ background: '#0a0a08', color: '#e8e0d4', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>

      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px, 8vw, 120px)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 24px' }}>Measurably Better Things — Civic</p>
        <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', margin: '0 0 24px' }}>Every business gets their own. It all rolls up to the city.</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.6, color: '#9b9488', maxWidth: '550px', margin: 0 }}>A content library, a live business directory, and a marketing engine that runs itself. $10,000 gets it started.</p>
      </section>

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <div style={{ maxWidth: '700px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Kickstart</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 24px' }}>$10,000 brings a production crew to your town.</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>One week. We shoot everything — downtown, the river, architecture, businesses, food, music, people. Professional video and photography your town has never had.</p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>The directory goes live. Every business gets a listing. AI starts generating social content. The marketing engine turns on.</p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>The businesses pay their own way after that.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Everyone Gets Their Own</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 48px' }}>The baker sees her traffic. The tourism office sees visitor data. It all rolls up.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { who: 'The Baker', gets: 'Her own listing, her own analytics, AI social posts featuring her pastries' },
            { who: 'The Restaurant', gets: 'Menu online, review management, magazine food feature, radio mention' },
            { who: 'Tourism Office', gets: 'Visitor data, event calendar, content library, the whole directory' },
            { who: 'The Mayor', gets: 'City dashboard — every business, every metric, one view' },
            { who: 'The Broker', gets: 'Listings featured, neighborhood content, the full MBT real estate product' },
            { who: 'Fire Department', gets: 'Community page, recruitment, event coordination' },
          ].map((person, i) => (
            <div key={i} style={{ padding: '24px', borderLeft: '2px solid #c8943e' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px' }}>{person.who}</h3>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#6b635a', margin: 0 }}>{person.gets}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Ongoing</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 24px' }}>$500/mo keeps it running. The businesses pay for themselves.</h2>
        <div style={{ maxWidth: '500px' }}>
          {[
            { label: 'Network SLA', price: '$500/mo' },
            { label: 'Business subscriptions', price: '$25–250/mo each' },
            { label: 'Periodic content refresh', price: 'as needed' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(200,148,62,0.08)' }}>
              <span style={{ fontSize: '0.9rem', color: '#9b9488' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 700, color: '#c8943e' }}>{row.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Apply It Anywhere</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 48px' }}>Same platform. Different vertical.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { vertical: 'Real Estate', desc: 'Brokers and agents. Listings in the magazine, on the radio, across social media.' },
            { vertical: 'Banking', desc: 'Branch-level community presence. Financial literacy content. Local sponsorship visibility.' },
            { vertical: 'Hospitality', desc: 'Hotels, restaurants, venues. Guest discovery, event promotion, review management.' },
            { vertical: 'Education', desc: 'Schools, districts. Parent communication, student showcase, community engagement.' },
          ].map((v, i) => (
            <div key={i} style={{ padding: '24px', border: '1px solid rgba(200,148,62,0.1)', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px' }}>{v.vertical}</h3>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#6b635a', margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(40px, 8vw, 120px)', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.95, margin: '0 0 16px' }}>The town gets a content library. The businesses get marketing. Nobody has to think about it.</h2>
        <p style={{ fontSize: '1rem', color: '#6b635a', margin: '24px 0 0' }}>Measurably Better Things &middot; A Hillbilly Dreams Company</p>
      </section>
    </main>
  );
}
