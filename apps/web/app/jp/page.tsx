'use client';

export default function JPPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a08',
      color: '#e8e0d4',
      fontFamily: "'Inter', sans-serif",
      padding: '3rem 2rem',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: '0 0 0.75rem 0',
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}>
            Welcome, JP
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: '#c8943e',
            margin: 0,
            fontWeight: 500,
          }}>
            Head of Shows & Programming — Big Muddy Entertainment
          </p>
        </div>

        {/* Status Banner */}
        <div style={{
          backgroundColor: '#151412',
          border: '1px solid #c8943e40',
          borderRadius: '12px',
          padding: '1.5rem 2rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', color: '#c8943e' }}>
            Your <strong>jp@bigmuddyentertainment.com</strong> email is being set up.
            Once it is live, you will sign into everything with that Google account.
          </p>
        </div>

        {/* Quick Links - No Auth Required */}
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 1.5rem 0',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #2a2520',
        }}>
          Your Links (no login needed)
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}>
          {[
            {
              label: 'The Whiteboard',
              desc: 'The big picture — toggle between Story, Flywheel, Revenue, Tech, and more',
              url: 'https://bigmuddytouring.com/whiteboard',
              icon: '\uD83D\uDCCB',
            },
            {
              label: 'Radio Shows',
              desc: '18 shows with poster art. Your programming grid lives here.',
              url: 'https://bigmuddytouring.com/radio/shows',
              icon: '\uD83C\uDFA7',
            },
            {
              label: 'Big Muddy Radio',
              desc: 'The live stream. Listen to what is broadcasting right now.',
              url: 'https://bigmuddyradio.com',
              icon: '\uD83D\uDCFB',
            },
            {
              label: 'Big Muddy Magazine',
              desc: 'Articles, city guides, features. Content that promotes every show.',
              url: 'https://bigmuddymagazine.com',
              icon: '\uD83D\uDCF0',
            },
            {
              label: 'Big Muddy Entertainment',
              desc: 'The entertainment hub. Events, talent, shows.',
              url: 'https://bigmuddyentertainment.com',
              icon: '\uD83C\uDFB5',
            },
            {
              label: 'Deep South Directory',
              desc: 'Every local business. This is the revenue engine — sponsors come from here.',
              url: 'https://deepsouthdirectory.com',
              icon: '\uD83D\uDCCD',
            },
            {
              label: 'Your Asana Board',
              desc: 'Your tasks and to-dos. Check daily.',
              url: 'https://app.asana.com',
              icon: '\u2705',
            },
            {
              label: 'The Tour (Full Deck)',
              desc: 'The full platform walkthrough with all the links.',
              url: 'https://bigmuddytouring.com/tour?audience=partner',
              icon: '\uD83D\uDE80',
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '1.5rem',
                backgroundColor: '#151412',
                border: '1px solid #2a2520',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#c8943e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = '#2a2520';
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{link.icon}</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 0.25rem 0',
              }}>
                {link.label}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#8a8074',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {link.desc}
              </p>
            </a>
          ))}
        </div>

        {/* Needs Login Section */}
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 1.5rem 0',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #2a2520',
        }}>
          Unlocks with your email (coming soon)
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
          opacity: 0.5,
        }}>
          {[
            {
              label: 'Mission Control',
              desc: 'Admin dashboard — shows, content, media, everything.',
              icon: '\uD83C\uDFDB\uFE0F',
            },
            {
              label: 'Content Studio',
              desc: 'Type a show name, get social posts + magazine feature + radio promo + poster.',
              icon: '\u2728',
            },
            {
              label: 'Creative Hub',
              desc: 'Generate images, video, audio, text with Google AI.',
              icon: '\uD83C\uDFA8',
            },
            {
              label: 'Delta Dawn',
              desc: 'The AI assistant. Ask her anything about the business.',
              icon: '\uD83E\uDD16',
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: '1.5rem',
                backgroundColor: '#151412',
                border: '1px solid #2a2520',
                borderRadius: '12px',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 0.25rem 0',
              }}>
                {item.label}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#8a8074',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* The Pitch */}
        <div style={{
          backgroundColor: '#151412',
          border: '1px solid #2a2520',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 1rem 0',
          }}>
            How Shows Connect to Revenue
          </h2>
          <div style={{ fontSize: '1.05rem', color: '#b0a898', lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 1rem 0' }}>
              Every business in the Deep South Directory is a potential show sponsor.
              Every show generates audience. Audience drives directory signups.
              Directory revenue funds more shows. <strong style={{ color: '#c8943e' }}>That is the flywheel.</strong>
            </p>
            <p style={{ margin: '0 0 1rem 0' }}>
              When you book a show, Content Studio auto-generates promos for social media,
              radio, and the magazine. Photos from the show go into the Media Vault and get
              used across every channel. Bar revenue ($300-500/night) tracks separately.
            </p>
            <p style={{ margin: 0 }}>
              Your NPR syndication (American Parlor Songbook, 20+ stations) is the most
              credentialed broadcast presence on the team. We are building infrastructure
              for you to do what you already do — with built-in distribution across every channel.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          textAlign: 'center',
          padding: '2rem 0',
          borderTop: '1px solid #2a2520',
          color: '#5a5248',
          fontSize: '0.9rem',
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            Questions? Text Chase directly or drop a comment in Asana.
          </p>
          <p style={{ margin: 0, opacity: 0.6, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
            Big Muddy Entertainment &middot; Built on Google Cloud
          </p>
        </div>
      </div>
    </div>
  );
}
