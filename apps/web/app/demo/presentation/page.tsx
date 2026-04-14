import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hillbilly Dreams — The Whole Story',
  description: 'Presentation for Tracy and Carrie.',
};

const LIVE_DEMOS = [
  { label: 'Big Muddy Entertainment', url: 'https://bigmuddytouring.com/entertainment', note: 'The media company' },
  { label: 'Big Muddy Touring', url: 'https://bigmuddytouring.com', note: 'Live music + corridor' },
  { label: 'Big Muddy Radio', url: 'https://bigmuddytouring.com/radio', note: 'Streaming from Natchez' },
  { label: 'Big Muddy Magazine', url: 'https://bigmuddytouring.com/magazine', note: 'Editorial + photography' },
  { label: 'Big Muddy Records', url: 'https://bigmuddytouring.com/records', note: 'The label' },
  { label: 'Deep South Directory', url: 'https://deepsouthdirectory.com', note: 'Business marketing product' },
  { label: 'MBT Overview', url: 'https://bigmuddytouring.com/mbt', note: 'The platform product' },
  { label: 'MBT — Real Estate', url: 'https://bigmuddytouring.com/mbt/real-estate', note: 'For brokers & agents' },
  { label: 'MBT — Civic', url: 'https://bigmuddytouring.com/mbt/civic', note: 'For towns & cities' },
  { label: 'Outsider Economics', url: 'https://outsidereconomics.com', note: 'The book / the theory' },
  { label: 'Venture Gallery', url: 'https://buycurious.art', note: 'Photography + prints' },
];

const LOCAL_DEMOS = [
  { label: 'Photo Search (16,936 photos)', url: '/admin/photos', note: 'Searchable photo library' },
  { label: 'Hotel TV Slideshow', url: 'http://192.168.4.37:8888/tv', note: 'Photo slideshow on Mac mini' },
  { label: 'Hotel Kiosk', url: 'http://192.168.4.37:8888/kiosk', note: 'Lobby display' },
  { label: 'Big Muddy Radio (Icecast)', url: process.env.NEXT_PUBLIC_ICECAST_URL?.replace(/\/stream\/?$/, '') || 'http://192.168.4.37:8010', note: 'Live stream server' },
];

export default function PresentationPage() {
  return (
    <main style={{
      background: '#0a0a08',
      color: '#e8e0d4',
      minHeight: '100vh',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      padding: '0 0 80px',
    }}>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 120px)',
      }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 24px' }}>
          Hillbilly Dreams Inc
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 800,
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          margin: '0 0 32px',
        }}>
          The Whole Story
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', lineHeight: 1.6, color: '#9b9488', maxWidth: '600px', margin: 0 }}>
          Two businesses. One platform. Built in Natchez, Mississippi.
        </p>
      </section>

      {/* THE TWO BUSINESSES */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          Two Businesses
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '32px' }}>
          <div style={{ padding: '40px', border: '1px solid rgba(200,148,62,0.2)', borderTop: '3px solid #c8943e', borderRadius: '6px' }}>
            <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 20px' }}>
              Big Muddy Touring
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
              The entertainment company. Radio show, concerts, touring, booking, label services.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
              The radio show is the front door. Musicians come on, see the ecosystem, get hooked.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
              Studio C handles the video, production, and tech. Expanding into Natchez this year.
            </p>
          </div>
          <div style={{ padding: '40px', border: '1px solid rgba(200,148,62,0.2)', borderTop: '3px solid #c8943e', borderRadius: '6px' }}>
            <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 20px' }}>
              Measurably Better Things
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
              The product you sell to towns, brokers, and banks. We clean up your digital life, make everything look amazing, and put it on autopilot.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 16px' }}>
              You never think about it again.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#c8943e', fontWeight: 600, margin: 0 }}>
              Studio C and Tuthill Design run the delivery. Both expanding into the Deep South.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT STARTED */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          How It Started
        </p>
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 24px' }}>
            Amy needed her band promoted.
          </h2>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#9b9488', margin: '0 0 16px' }}>
            Chase built a magazine, a record label, and a radio station to do it. Then he built the CMS to run it all.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#9b9488', margin: '0 0 16px' }}>
            Now the tools are ready for other people. Same engine. Different skin.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#e8e0d4', fontWeight: 600, margin: 0 }}>
            Big Muddy is customer zero. It proves the platform works.
          </p>
        </div>
      </section>

      {/* ONE SHOW BECOMES EVERYTHING */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          The Flywheel
        </p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 32px' }}>
          One show becomes everything.
        </h2>
        <div style={{ maxWidth: '600px' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#9b9488', margin: '0 0 24px' }}>
            A band plays the Blues Room on a Friday night. By Monday:
          </p>
          {[
            'Magazine feature with real photography',
            'Radio session on Big Muddy Radio',
            'Multi-camera concert film',
            'Social clips from the footage',
            'Live album from the multi-track',
            'Next show booked on the corridor',
          ].map((item, i) => (
            <p key={i} style={{ fontSize: '1.1rem', color: '#e8e0d4', margin: '0 0 14px', paddingLeft: '20px', borderLeft: '2px solid #c8943e' }}>
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* THE TECH STACK */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          The Tech Stack
        </p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 24px' }}>
          One platform. Every tool wired together.
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', maxWidth: '650px', margin: '0 0 40px' }}>
          Same engine runs every vertical. Directory, magazine, radio, social, photo archive, AI — all connected.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '900px' }}>
          {[
            { layer: 'Directory', tools: 'Business data, analytics, review management' },
            { layer: 'Magazine', tools: 'Editorial CMS, photo pipeline, publishing' },
            { layer: 'Radio', tools: 'Streaming, scheduling, live sessions' },
            { layer: 'Social', tools: 'AI content, multi-channel scheduling' },
            { layer: 'Photo & Video', tools: 'Vision AI tagging, searchable archive' },
            { layer: 'AI Agents', tools: 'Delta Dawn, voice, multi-agent coordination' },
          ].map((row, i) => (
            <div key={i} style={{ padding: '20px', borderLeft: '2px solid #c8943e' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: '#e8e0d4' }}>{row.layer}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#6b635a', margin: 0 }}>{row.tools}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE MATH */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          MBT Revenue Model
        </p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 40px' }}>
          It stacks.
        </h2>
        <div style={{ maxWidth: '550px' }}>
          {[
            { label: 'Town kickstart', amount: '$10,000', note: 'one-time' },
            { label: 'Network SLA', amount: '$500/mo', note: 'ongoing' },
            { label: '50 businesses at $50/mo', amount: '$2,500/mo', note: 'recurring' },
            { label: '1 broker at $500/mo', amount: '$500/mo', note: 'recurring' },
            { label: '5 agents at $150/mo', amount: '$750/mo', note: 'recurring' },
            { label: 'Shows (2:1 multiplier)', amount: 'variable', note: 'Inn + bar' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid rgba(200,148,62,0.1)' }}>
              <span style={{ fontSize: '1.05rem', color: '#9b9488' }}>{row.label}</span>
              <span style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.3rem', fontWeight: 700, color: '#c8943e' }}>{row.amount}</span>
                <span style={{ fontSize: '0.7rem', color: '#4a4440', width: '65px', textAlign: 'right' }}>{row.note}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* THE TECH STACK */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          The Tech Stack
        </p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 24px' }}>
          One platform. Every tool wired together.
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#9b9488', maxWidth: '650px', margin: '0 0 40px' }}>
          Same engine runs every vertical. Directory, magazine, radio, social, photo archive, AI — all connected.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '900px' }}>
          {[
            { layer: 'Directory', tools: 'Business data, analytics, review management' },
            { layer: 'Magazine', tools: 'Editorial CMS, photo pipeline, publishing' },
            { layer: 'Radio', tools: 'Streaming, scheduling, live sessions' },
            { layer: 'Social', tools: 'AI content, multi-channel scheduling' },
            { layer: 'Photo & Video', tools: 'Vision AI tagging, searchable archive' },
            { layer: 'AI Agents', tools: 'Delta Dawn, voice, multi-agent coordination' },
          ].map((row, i) => (
            <div key={i} style={{ padding: '20px', borderLeft: '2px solid #c8943e' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 700, margin: '0 0 6px', color: '#e8e0d4' }}>{row.layer}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#6b635a', margin: 0 }}>{row.tools}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO DOES WHAT */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          Who Does What
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '24px' }}>
          {[
            { who: 'Chase', does: 'Creative direction, photography, architecture, the radio show' },
            { who: 'Tracy', does: 'Executive producer of the magazine. Edits everything. Finance and Inn ops.' },
            { who: 'Amy', does: 'Inn and bar ops. Her own magazine projects. The band.' },
            { who: 'Studio C', does: 'Video production, tech support, fulfillment for both Big Muddy and MBT' },
            { who: 'Tuthill Design', does: 'Real estate implementations. Hudson Valley market.' },
            { who: 'AI Agents', does: 'Daily content, social posting, analytics, review management' },
          ].map((person, i) => (
            <div key={i} style={{ padding: '24px', borderLeft: '2px solid #c8943e' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.15rem', fontWeight: 700, margin: '0 0 8px' }}>{person.who}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#6b635a', margin: 0 }}>{person.does}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE DEMOS — THE LINKS */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          Live Right Now
        </p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 40px' }}>
          Tap any link to demo.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {LIVE_DEMOS.map((demo, i) => (
            <a
              key={i}
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '24px 28px',
                border: '1px solid rgba(200,148,62,0.15)',
                borderRadius: '6px',
                textDecoration: 'none',
                color: '#e8e0d4',
                WebkitTapHighlightColor: 'rgba(200,148,62,0.2)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.15rem', fontWeight: 700, margin: '0 0 4px' }}>
                {demo.label}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6b635a', margin: 0 }}>{demo.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* LOCAL NETWORK DEMOS */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px)', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c8943e', margin: '0 0 16px' }}>
          On the Local Network
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {LOCAL_DEMOS.map((demo, i) => (
            <a
              key={i}
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '24px 28px',
                border: '1px solid rgba(200,148,62,0.15)',
                borderLeft: '3px solid #c8943e',
                borderRadius: '6px',
                textDecoration: 'none',
                color: '#e8e0d4',
                WebkitTapHighlightColor: 'rgba(200,148,62,0.2)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px' }}>
                {demo.label}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6b635a', margin: 0 }}>{demo.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px)', textAlign: 'center', borderTop: '1px solid rgba(200,148,62,0.1)' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.9, margin: '0 0 16px' }}>
          Natchez, Mississippi.
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#9b9488', margin: 0 }}>On the river. Where it all connects.</p>
      </section>
    </main>
  );
}
