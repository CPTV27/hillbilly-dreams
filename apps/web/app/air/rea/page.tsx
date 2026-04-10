import type { Metadata } from 'next';
import { imageBadgeStyle } from '@/lib/content-status';

export const metadata: Metadata = {
  title: 'Rea — An Invitation',
  description: 'A personal invitation from Chase Pierson.',
  robots: { index: false, follow: false },
};

export default function ReaInvitationPage() {
  return (
    <main style={{ background: '#0a0a08', color: '#e8e0d4', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>

      {/* HERO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/studio-c/utopiademo-day-2.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.55) 30%, rgba(10,10,8,0.1) 60%, transparent 100%)' }} />
        <span style={imageBadgeStyle('borrowed')!}>BORROWED</span>
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 24px' }}>For Rea</p>
          <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
            Come to<br />Natchez.
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', lineHeight: 1.6, color: '#9b9488', maxWidth: '500px', margin: 0 }}>
            You&rsquo;re driving tomorrow. Here&rsquo;s what you&rsquo;re driving into.
          </p>
        </div>
      </section>

      {/* THE BIG PICTURE */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '750px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Big Picture</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            A space. No rent. Your gear. Our engine.
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            Here&rsquo;s what I&rsquo;m working on. I&rsquo;m trying to figure out the space — a building Tracy would invest in, where we&rsquo;re the tenants. You and me. No rent.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            Something we can start in for not much money, assuming you bring your equipment. Your console. Your preamps. Your tape machines. The whole rig. The room gets built around what you already own.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            And then we start making money. Sessions. Records. Shows. The whole thing.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            That&rsquo;s what I want you thinking about on the drive.
          </p>
        </div>
      </section>

      {/* THE ENGINE */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/corridor/natchez-night-lounge.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,8,0.95) 0%, rgba(10,10,8,0.8) 100%)' }} />
        <span style={imageBadgeStyle('borrowed')!}>BORROWED</span>
        <div style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>What We Already Built</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            A media company waiting for the studio.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
            A magazine. A record label. A radio show. A touring company. A 50-seat room. The Inn. The corridor from Memphis to New Orleans with 735 venues mapped and ready.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
            We already know how to fill rooms. We book bands out of Memphis and bring them down. We book bands out of New Orleans and bring them up. They come to Natchez because we&rsquo;re the place that makes it worth the stop.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
            Every show goes on the radio. Every artist gets the magazine treatment. Every session gets written up. The marketing is already running.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            All of it is pointed at the studio we don&rsquo;t have yet. That&rsquo;s where you come in.
          </p>
        </div>
      </section>

      {/* THE SHOW */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '750px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Radio Show</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            The front door.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
            The radio show is how musicians find out about the studio. They come on, we interview them, we play their stuff, we tell them what we&rsquo;re building. They hear the console you&rsquo;re bringing. They hear about the room. They want in.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
            Then they book a session. Then they play the Blues Room. Then they tour the corridor. Then the magazine covers it. The show feeds the room. The room feeds the shows.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            You&rsquo;ll be on the show. We&rsquo;ll tell your story. Then everyone knows the studio is real.
          </p>
        </div>
      </section>

      {/* THE CORRIDOR */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Corridor</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
          Memphis to New Orleans. 400 miles of music history.
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px 28px',
          maxWidth: '700px',
          margin: '0 auto 40px',
        }}>
          {['Memphis', 'Clarksdale', 'Oxford', 'Tupelo', 'Holly Springs', 'Greenwood', 'Indianola', 'Greenville', 'Jackson', 'Vicksburg', 'Natchez', 'Baton Rouge', 'New Orleans'].map((city) => (
            <span key={city} style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: city === 'Natchez' ? '1.8rem' : '1.1rem',
              fontWeight: city === 'Natchez' ? 800 : 400,
              color: city === 'Natchez' ? '#c8943e' : '#4a4440',
            }}>
              {city}
            </span>
          ))}
        </div>
        <p style={{ fontSize: '1rem', color: '#9b9488', maxWidth: '600px', margin: '0 auto' }}>
          We tour this corridor. We bring bands from Memphis down, from New Orleans up. Natchez is the room in the middle that makes the trip worth it.
        </p>
      </section>

      {/* WHAT TO THINK ABOUT */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '750px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>For The Drive</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            What I want you thinking about.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              'What you need the room to be. Not the finished version — the minimum viable version that lets you start making records.',
              'What you&rsquo;d bring. All of it, or some of it. What has to come first, what can follow later.',
              'What kind of sessions you&rsquo;d want to run. Solo artists, bands, film scores, podcasts, whatever.',
              'Who you&rsquo;d want to bring through the room in the first year. People you already know, people you&rsquo;ve been meaning to work with.',
              'What the deal looks like between us. We haven&rsquo;t figured that out yet. I want you to come in with thoughts.',
            ].map((item, i) => (
              <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#9b9488', margin: 0, paddingLeft: '20px', borderLeft: '2px solid #c8943e' }}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* THE SPACES */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '900px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>What We&rsquo;re Looking At</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Two buildings. Both worth a conversation.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '28px', border: '1px solid rgba(200,148,62,0.15)', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px' }}>The Ritz Theatre</h3>
              <p style={{ fontSize: '0.75rem', color: '#c8943e', margin: '0 0 12px', fontWeight: 600 }}>Art Deco &middot; 1935 &middot; Empty since 1986</p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>
                6,385 square feet. Projecting marquee. Stage, balcony, projection room. The facade is restored. The interior is a blank canvas.
              </p>
            </div>
            <div style={{ padding: '28px', border: '1px solid rgba(200,148,62,0.15)', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px' }}>521 Franklin Street</h3>
              <p style={{ fontSize: '0.75rem', color: '#c8943e', margin: '0 0 12px', fontWeight: 600 }}>11,680 sq ft &middot; Existing stage</p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#9b9488', margin: 0 }}>
                Open first floor with a stage already in place. Mezzanine. Hardwood floors. Vintage pulley elevator.
              </p>
            </div>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#6b635a', fontStyle: 'italic', margin: '24px 0 0' }}>
            Neither is locked in. We&rsquo;re looking at more. The right building is the one that fits what you need.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ padding: 'clamp(80px, 12vw, 180px) clamp(40px, 8vw, 120px)', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, margin: '0 0 24px' }}>
          Drive safe. See you soon.
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#9b9488', margin: '0 0 8px' }}>Chase</p>
        <p style={{ fontSize: '0.8rem', color: '#6b635a', margin: 0 }}>411 North Congress Street &middot; Natchez, Mississippi</p>
      </section>

    </main>
  );
}
