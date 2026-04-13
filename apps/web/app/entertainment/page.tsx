import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Big Muddy Entertainment — One show becomes everything.',
  description: 'A media company on the Mississippi River. One show becomes a magazine feature, a radio session, a concert film, a live album, and the next booking. Natchez, Mississippi.',
};

export default function EntertainmentPage() {
  return (
    <main style={{ background: '#0a0a08', color: '#e8e0d4', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>

      {/* HERO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/corridor/natchez-bluff-river-view.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.5) 30%, rgba(10,10,8,0.1) 60%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Big Muddy Entertainment</p>
          <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.04em', margin: '0 0 24px' }}>One show becomes<br />everything.</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', lineHeight: 1.6, color: '#9b9488', maxWidth: '500px', margin: 0 }}>Touring. Records. Radio. Magazine. A house band. Five divisions, one operation. A band plays Friday night — by Monday there&rsquo;s a magazine feature, a radio session, a concert film, and the next show booked.</p>
        </div>
      </section>

      {/* TOURING */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/corridor/street-musician-guitar.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.5) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)', maxWidth: '650px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Big Muddy Touring</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 20px' }}>Memphis to New Orleans. 400 miles of venues most people have never heard of.</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>13 cities. 735 venues. We find the artists, bring them down the corridor, and put them on stages that deserve the music.</p>
        </div>
      </section>

      {/* HOUSE BAND */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/corridor/guitarist-chandelier-venue.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.4) 25%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)', maxWidth: '650px' }}>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 20px' }}>The House Band</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>Muscle Shoals had the Swampers. Memphis had Booker T. Session musicians who showed up every day and made everyone who walked through the door sound like the best version of themselves. That model built American music.</p>
        </div>
      </section>

      {/* RECORDS */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/studio-c/utopiademo-day-2.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.5) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)', maxWidth: '650px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Big Muddy Records</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 20px' }}>Keep your masters. Get the machine.</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>Recording. Distribution. Radio play. Magazine coverage. A corridor of venues. The music just has to be good.</p>
        </div>
      </section>

      {/* RADIO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/corridor/natchez-night-lounge.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.5) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)', maxWidth: '650px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Big Muddy Radio</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 20px' }}>Recorded Tuesday. On the air Wednesday.</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>Streaming from Natchez. Live sessions, corridor music, interviews. Every show we produce goes straight to the station.</p>
        </div>
      </section>

      {/* MAGAZINE */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/processed/big-muddy/natchez-brick-street-live-oaks.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.5) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)', maxWidth: '650px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Big Muddy Magazine</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 20px' }}>The stories are already here. Somebody has to tell them right.</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>The music, the food, the architecture, the people. Real editorial. Real photography. Every artist on the corridor gets the feature they deserve.</p>
        </div>
      </section>

      {/* ARRIE ASLIN */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/processed/arrie-aslin-inn-portrait.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.5) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)', maxWidth: '650px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Artist in Residence</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 20px' }}>Arrie Aslin</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>Gospel, soul, and the American songbook. Live at the Blues Room and on stages across the corridor.</p>
        </div>
      </section>

      {/* ONE SHOW BECOMES EVERYTHING */}
      <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(32px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '550px' }}>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 32px' }}>One show becomes everything.</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', margin: '0 0 32px' }}>A band plays the Blues Room on a Friday night. By Monday:</p>
          {['Magazine feature with real photography', 'Radio session on Big Muddy Radio', 'Multi-camera concert film', 'Social clips from the footage', 'Live album from the multi-track', 'Next show booked on the corridor'].map((item, i) => (
            <p key={i} style={{ fontSize: '1rem', color: '#e8e0d4', margin: '0 0 12px', paddingLeft: '20px', borderLeft: '2px solid #c8943e' }}>{item}</p>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <img src="/images/dsd/mississippi-sunset.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(10,10,8,0.6) 0%, rgba(10,10,8,0.85) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.85, margin: '0 0 16px' }}>Natchez, Mississippi.</h2>
          <p style={{ fontSize: '1rem', color: '#9b9488', margin: 0 }}>On the river. Where it all connects.</p>
        </div>
      </section>

      <footer style={{ padding: '32px', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.06)' }}>
        <p style={{ fontSize: '0.6rem', color: '#2a2620', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Big Muddy Entertainment &middot; Natchez, Mississippi</p>
      </footer>
    </main>
  );
}
