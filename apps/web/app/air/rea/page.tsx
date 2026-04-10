import type { Metadata } from 'next';
import { imageBadgeStyle } from '@/lib/content-status';

export const metadata: Metadata = {
  title: 'Rea — Welcome to Natchez',
  description: 'A personal hello from Chase Pierson.',
  robots: { index: false, follow: false },
};

export default function ReaInvitationPage() {
  return (
    <main style={{ background: '#0a0a08', color: '#e8e0d4', minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>

      {/* HERO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/corridor/natchez-bluff-river-view.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.55) 30%, rgba(10,10,8,0.1) 60%, transparent 100%)' }} />
        <span style={imageBadgeStyle('borrowed')!}>BORROWED</span>
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px, 6vw, 80px)' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 24px' }}>For Rea</p>
          <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
            Welcome to<br />Natchez.
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', lineHeight: 1.6, color: '#9b9488', maxWidth: '500px', margin: 0 }}>
            You&rsquo;re about to drive a long way. Here&rsquo;s what you&rsquo;re driving into.
          </p>
        </div>
      </section>

      {/* THE INN */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '750px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Big Muddy Inn</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            411 North Congress Street.
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            Six rooms. A bar. A 50-seat live music venue called the Blues Room. Two blocks from the Mississippi River. Tracy runs the finances, Amy runs the hospitality, I run the creative and the cameras. Shows every week. Musicians always moving through.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            This is where you&rsquo;re staying. This is what we built around.
          </p>
        </div>
      </section>

      {/* THE MEDIA COMPANY */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/corridor/natchez-night-lounge.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,8,0.95) 0%, rgba(10,10,8,0.8) 100%)' }} />
        <span style={imageBadgeStyle('borrowed')!}>BORROWED</span>
        <div style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>The Marketing Engine</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            A whole media company, already running.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
            We built Big Muddy Touring as a media-first entertainment company. Not a venue that tries to do marketing. A marketing engine that happens to have a venue.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
            A magazine. A radio station. A record label. A touring company. A photo archive of 51,000 images. A production team. A corridor of 735 venues from Memphis to New Orleans already mapped in the database. A content pipeline that takes one show and turns it into a magazine feature, a radio session, a concert film, and a month of social clips.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
            All of it is running. All of it is ours. All of it is pointed at whoever we bring through the room.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            When we put somebody in front of the microphone, they show up on every channel we own the next day.
          </p>
        </div>
      </section>

      {/* BIG MUDDY RADIO */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '850px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Big Muddy Radio</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            A real radio station with real shows.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            Streaming 24/7 from Natchez. Not a Spotify playlist — a station. Programming blocks, rotating shows, live sessions, interviews, curated hours built around real musical knowledge.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 32px' }}>
            Amy hosts a show. Chase hosts a show. Rotating guest hosts from the corridor. Deep cuts from the Delta. Live performances from the Blues Room cut into the rotation the next morning. Conversations with every musician who walks through the door.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { title: 'Artist Interviews', desc: 'Long-form conversations with every musician who visits Natchez. Not 30-second soundbites — actual interviews. The way they used to do it.' },
              { title: 'Live Sessions', desc: 'Recorded in the Blues Room, mixed overnight, on the air the next day. One show becomes a radio session becomes a podcast episode becomes a live album track.' },
              { title: 'The Deep South Hour', desc: 'Curated deep cuts from the Delta, Memphis, New Orleans, and the corridor in between. Music you can&rsquo;t find on the algorithms.' },
              { title: 'Amy&rsquo;s Show', desc: 'Amy hosts her own program. Musician&rsquo;s perspective, musician&rsquo;s taste, live from the bar at the Inn when she&rsquo;s in the mood.' },
              { title: 'The Corridor Rotation', desc: 'Artists from every city on the route — Memphis to New Orleans, Clarksdale to Vicksburg. The station is the soundtrack of the whole corridor.' },
              { title: 'Guest Hosts', desc: 'Rotating slots for visiting musicians to build their own hour. Play what they love, talk about what they&rsquo;re working on, tell stories.' },
            ].map((show, i) => (
              <div key={i} style={{ padding: '20px', borderLeft: '2px solid #c8943e' }}>
                <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: '#e8e0d4' }}>{show.title}</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#9b9488', margin: 0 }}>{show.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            You&rsquo;re coming on the show. Multiple shows, probably. We&rsquo;re going to tell your story the way it deserves to be told.
          </p>
        </div>
      </section>

      {/* BIG MUDDY MAGAZINE */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '850px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>Big Muddy Magazine</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Editorial photography and real stories.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            The magazine is how we cover the corridor. Not blog posts — real editorial. Long-form profiles. Photo essays. City guides. The kind of coverage music and culture used to get before everything turned into quick hits and algorithm bait.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 20px' }}>
            Chase is the photographer. 25 years of shooting — concerts, studios, architecture, landscape. 51,000 photos in the archive. The magazine is where that photography gets used the way it should be used: big, editorial, with space to breathe.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 32px' }}>
            Tracy is the executive producer. She edits everything, including Chase&rsquo;s copy. Every story gets her sign-off before it ships. That&rsquo;s how you know the magazine is real and not just a personal blog.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { title: 'The Studios', desc: 'Every studio in the region gets photographed and profiled. The consoles, the rooms, the engineers, the history. Visual coverage you can&rsquo;t get anywhere else.' },
              { title: 'The Musicians', desc: 'Every artist who comes through the corridor gets the photo treatment. Portraits, sessions, live shots. Real photography, not iPhone snaps.' },
              { title: 'Performance Spaces', desc: 'The Blues Room, the theaters, the juke joints, the bars. Documenting the venues that keep the music alive along the corridor.' },
              { title: 'City Guides', desc: 'Natchez, Clarksdale, Memphis, New Orleans, and every stop in between. The places worth stopping, the food worth eating, the people worth meeting.' },
              { title: 'The Label Roster', desc: 'Every Big Muddy Records artist gets the magazine treatment. Cover shoots, feature spreads, album stories. The label and the magazine work together.' },
              { title: 'The Culture', desc: 'Food, architecture, history, traditions. The stuff that makes the South what it is. Not tourist coverage — lived coverage.' },
            ].map((section, i) => (
              <div key={i} style={{ padding: '20px', borderLeft: '2px solid #c8943e' }}>
                <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: '#e8e0d4' }}>{section.title}</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#9b9488', margin: 0 }}>{section.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
            The magazine will photograph every studio and every musician on the corridor. That&rsquo;s the promise. That&rsquo;s what we&rsquo;re building toward.
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
          We run the corridor. We bring bands from Memphis down, from New Orleans up. Natchez is the room in the middle that makes the trip worth it.
        </p>
      </section>

      {/* THE CONTENT FLYWHEEL */}
      <section style={{ padding: 'clamp(60px, 10vw, 140px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <div style={{ maxWidth: '900px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>One Show Becomes Everything</p>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            A band plays on Friday. By Monday it&rsquo;s everywhere.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#9b9488', margin: '0 0 40px', maxWidth: '600px' }}>
            That&rsquo;s not marketing-speak. It&rsquo;s already how it works. Every show runs through the pipeline automatically.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Magazine Feature', brand: 'Big Muddy Magazine' },
              { title: 'Radio Session', brand: 'Big Muddy Radio' },
              { title: 'Concert Film', brand: 'Big Muddy Entertainment' },
              { title: 'Social Clips', brand: 'Automated' },
              { title: 'Live Album', brand: 'Big Muddy Records' },
              { title: 'Corridor Tour', brand: 'Big Muddy Touring' },
            ].map((card, i) => (
              <div key={i} style={{ padding: '20px', borderLeft: '2px solid #c8943e' }}>
                <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: '#e8e0d4' }}>{card.title}</h3>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4a4440', margin: 0 }}>{card.brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S HAPPENING */}
      <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(40px, 8vw, 120px)', borderTop: '1px solid rgba(200,148,62,0.15)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 32px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          You&rsquo;re coming to see the town. We&rsquo;ll figure the rest out together.
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', maxWidth: '600px', margin: '0 auto' }}>
          Stay at the Inn. Meet the people. Walk the streets. Hear a show. See what we&rsquo;re doing. We&rsquo;ll talk about whatever makes sense to talk about when we&rsquo;re actually in the room together.
        </p>
      </section>

      {/* CLOSING */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(40px, 8vw, 120px)', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.15)' }}>
        <p style={{ fontSize: '1.2rem', color: '#e8e0d4', margin: '0 0 12px' }}>Drive safe.</p>
        <p style={{ fontSize: '1rem', color: '#9b9488', margin: '0 0 8px' }}>Chase</p>
        <p style={{ fontSize: '0.8rem', color: '#6b635a', margin: 0 }}>411 North Congress Street &middot; Natchez, Mississippi</p>
      </section>

    </main>
  );
}
