// apps/web/app/welcome/page.tsx
// Chase's personal command center — link tree of all live properties
// Protected route (skips middleware rewriting per middleware.ts line ~140)

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HDI — Command Center',
};

const PROPERTIES = [
  {
    section: 'Big Muddy',
    items: [
      { name: 'Touring', url: 'https://bigmuddytouring.com', desc: 'The circuit', status: 'live' },
      { name: 'Magazine', url: 'https://bigmuddymagazine.com', desc: 'Editorial', status: 'live' },
      { name: 'Radio', url: 'https://bigmuddyradio.com', desc: 'Streaming', status: 'live' },
      { name: 'Entertainment', url: 'https://bigmuddyentertainment.com', desc: 'The company', status: 'updated' },
      { name: 'Records', url: 'https://bigmuddyrecordlabel.com', desc: 'The label', status: 'live' },
      { name: 'Directory (DSD)', url: 'https://deepsouthdirectory.com', desc: 'Business listings', status: 'updated' },
    ],
  },
  {
    section: 'Platform',
    items: [
      { name: 'Measurably Better Things', url: 'https://measurablybetter.life', desc: 'The Glass Engine', status: 'updated' },
      { name: 'Voice AI', url: 'https://measurablybetter.life/life', desc: 'Southern Concierge', status: 'new' },
      { name: 'Technology', url: 'https://measurablybetter.life/technology', desc: 'Stack overview', status: 'live' },
    ],
  },
  {
    section: 'Northeast',
    items: [
      { name: 'Bearsville Media', url: 'https://bearsvillemediagroup.com', desc: 'Hudson Valley', status: 'updated' },
    ],
  },
  {
    section: 'Partners',
    items: [
      { name: 'Tuthill Design', url: 'https://tuthilldesign.com', desc: 'Design studio', status: 'live' },
      { name: 'Studio C Video', url: 'https://studiocvideo.com', desc: 'Production', status: 'live' },
    ],
  },
  {
    section: 'Editorial',
    items: [
      { name: 'Outsider Economics', url: 'https://outsidereconomics.com', desc: 'Field manual', status: 'live' },
    ],
  },
  {
    section: 'Corporate',
    items: [
      { name: 'Hillbilly Dreams Inc', url: 'https://bigmuddytouring.com/hillbilly', desc: 'Holding company', status: 'live' },
    ],
  },
];

const ADMIN_LINKS = [
  { name: 'Dashboard', url: '/admin', desc: 'Home base' },
  { name: 'Events', url: '/admin/events', desc: 'Schedule shows' },
  { name: 'Articles', url: '/admin/articles', desc: 'Write & publish' },
  { name: 'Creative Studio', url: '/admin/creative', desc: 'Audio, promos' },
  { name: 'Clients', url: '/admin/clients', desc: 'DSD subscribers' },
  { name: 'Newsletter', url: '/admin/newsletter', desc: 'Email blasts' },
  { name: 'Media Upload', url: '/admin/upload', desc: 'Photos & files' },
  { name: 'Playlists', url: '/admin/playlists', desc: 'Radio playlists' },
  { name: 'Productions', url: '/admin/productions', desc: 'Video & audio' },
  { name: 'Social', url: '/admin/social', desc: 'Content scheduling' },
];

const TEST_LISTINGS = [
  { name: 'The Big Muddy Inn', url: '/directory/the-big-muddy-inn-natchez', tier: 'Engine' },
  { name: 'Bluff City Books', url: '/directory/bluff-city-books-records-natchez', tier: 'Listing' },
  { name: 'The Porch Bar', url: '/directory/the-porch-bar-social-club-natchez', tier: 'Engine' },
  { name: 'Juke Joint Revival', url: '/directory/the-juke-joint-revival-hall-natchez', tier: 'Free' },
  { name: 'River Road Kitchen', url: '/directory/river-road-kitchen-natchez', tier: 'Listing' },
];

function StatusDot({ status }: { status: string }) {
  const color = status === 'new' ? '#22c55e'
    : status === 'updated' ? 'var(--accent)'
    : 'var(--text-disabled)';
  return (
    <span style={{
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: color,
      marginRight: '0.5rem',
    }} />
  );
}

export default function WelcomePage() {
  return (
    <main style={{
      backgroundColor: 'var(--bg, #0a0a0a)',
      color: 'var(--text, #f5f0eb)',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
      padding: '2rem 5%',
      maxWidth: '900px',
      margin: '0 auto',
    }}>

      {/* Header */}
      <header style={{ marginBottom: '3rem' }}>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent, #c8943e)',
          marginBottom: '0.5rem',
        }}>
          Hillbilly Dreams Inc
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
        }}>
          Command Center
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #8a8580)' }}>
          14 domains. One codebase. Everything live.
        </p>
      </header>

      {/* Properties */}
      {PROPERTIES.map((group) => (
        <section key={group.section} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent, #c8943e)',
            marginBottom: '0.75rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--border, #242220)',
          }}>
            {group.section}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {group.items.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border, #1a1918)',
                  textDecoration: 'none',
                  color: 'var(--text, #f5f0eb)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <StatusDot status={item.status} />
                  <span style={{ fontWeight: 500 }}>{item.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted, #8a8580)', marginLeft: '0.75rem' }}>
                    {item.desc}
                  </span>
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-disabled, #4a4540)' }}>
                  {item.url.replace('https://', '')} →
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}

      {/* Admin Tools */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent, #c8943e)',
          marginBottom: '0.75rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid var(--border, #242220)',
        }}>
          Admin Tools
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '0.5rem',
        }}>
          {ADMIN_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                border: '1px solid var(--border, #242220)',
                textDecoration: 'none',
                color: 'var(--text, #f5f0eb)',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block' }}>{link.name}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted, #8a8580)' }}>{link.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Test Listings */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent, #c8943e)',
          marginBottom: '0.75rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid var(--border, #242220)',
        }}>
          Dogfood — Test Listings
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {TEST_LISTINGS.map((listing) => (
            <a
              key={listing.name}
              href={listing.url}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0',
                borderBottom: '1px solid var(--border, #1a1918)',
                textDecoration: 'none',
                color: 'var(--text, #f5f0eb)',
                fontSize: '0.85rem',
              }}
            >
              <span>{listing.name}</span>
              <span style={{
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent, #c8943e)',
                padding: '0.15rem 0.5rem',
                border: '1px solid var(--accent, #c8943e)',
              }}>
                {listing.tier}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        paddingTop: '2rem',
        borderTop: '1px solid var(--border, #242220)',
        fontSize: '0.65rem',
        color: 'var(--text-disabled, #4a4540)',
        textAlign: 'center',
      }}>
        Powered by Measurably Better Things · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </footer>
    </main>
  );
}
