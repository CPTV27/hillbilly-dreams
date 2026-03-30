'use client';

/* eslint-disable @next/next/no-img-element */

const SECTIONS = [
  {
    label: 'THE SITES',
    items: [
      { name: 'Big Muddy Touring', desc: 'Main site — hotel, venue, corridor', url: 'https://bigmuddytouring.com' },
      { name: 'Deep South Directory', desc: 'Business listings — the product we sell', url: 'https://deepsouthdirectory.com' },
      { name: 'Measurably Better', desc: 'The pitch page — why $99/mo', url: 'https://measurablybetter.life' },
      { name: 'Big Muddy Magazine', desc: 'Editorial — stories from the corridor', url: 'https://bigmuddymagazine.com' },
      { name: 'Big Muddy Radio', desc: 'Radio station — 18 shows', url: 'https://bigmuddyradio.com' },
      { name: 'Big Muddy Entertainment', desc: 'Records, touring, talent search', url: 'https://bigmuddyentertainment.com' },
      { name: 'Outsider Economics', desc: 'The philosophy — how local economies work', url: 'https://outsidereconomics.com' },
      { name: 'Bearsville Media Group', desc: 'Woodstock, NY — second town deployment', url: 'https://bigmuddytouring.com/bearsville' },
    ],
  },
  {
    label: 'THE RADIO',
    items: [
      { name: 'All 18 Shows', desc: 'Poster art, schedule, hosts', url: 'https://bigmuddytouring.com/radio/shows' },
      { name: 'Web Player', desc: 'Listen to Big Muddy Radio', url: 'https://bigmuddytouring.com/radio/player' },
    ],
  },
  {
    label: 'THE TOOLS',
    items: [
      { name: 'Admin Dashboard', desc: 'Mission Control — start here', url: 'https://bigmuddytouring.com/admin/dashboard' },
      { name: 'Content Studio', desc: 'Generate social, articles, radio, posters', url: 'https://bigmuddytouring.com/admin/studio' },
      { name: 'Creative Hub', desc: 'AI image, video, audio, text generation', url: 'https://bigmuddytouring.com/admin/creative' },
      { name: 'Media Vault', desc: 'All photos and assets', url: 'https://bigmuddytouring.com/admin/media' },
      { name: 'Broadcast Control', desc: 'Radio schedule, media library, TV', url: 'https://bigmuddytouring.com/admin/radio' },
      { name: 'Upload Content', desc: 'Drag and drop files', url: 'https://bigmuddytouring.com/admin/upload' },
      { name: 'Illustration Lookbook', desc: '36 styles to choose from', url: 'https://bigmuddytouring.com/admin/lookbook' },
      { name: 'Delta Dawn', desc: 'AI assistant — ask her anything', url: 'https://bigmuddytouring.com/ops/chat' },
    ],
  },
  {
    label: 'THE BIG PICTURE',
    items: [
      { name: 'Whiteboard', desc: 'Toggle between 11 views of the business', url: 'https://bigmuddytouring.com/whiteboard' },
      { name: 'Ecosystem Dashboard', desc: '7 lenses — flywheel, org chart, revenue, AI', url: 'https://bigmuddytouring.com/admin/ecosystem' },
      { name: 'Architecture Blueprint', desc: 'The original 2022 diagram → today', url: 'https://bigmuddytouring.com/platform/architecture' },
      { name: 'Demo Deck', desc: '10-slide presentation with links', url: 'https://bigmuddytouring.com/demo-deck.html' },
    ],
  },
  {
    label: 'THE ART',
    items: [
      { name: 'Chase Pierson Photography', desc: 'Print storefront with Stripe checkout', url: 'https://bigmuddytouring.com/gallery/chase-pierson' },
      { name: 'In-Room TV', desc: '4 channels for hotel guest rooms', url: 'https://bigmuddytouring.com/touring/inn/tv' },
    ],
  },
  {
    label: 'FOR JP',
    items: [
      { name: 'Your Asana Board', desc: 'Your tasks and to-dos', url: 'https://app.asana.com' },
      { name: 'Scan2Plan Review', desc: 'Financials and documents for your review', url: 'https://app.asana.com/1/1211216881488780/project/1213753731475702/task/1213862302768434' },
      { name: 'JP Options', desc: '4 engagement tiers — pick your level', url: 'https://bigmuddytouring.com/whiteboard' },
    ],
  },
];

export default function TourPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a08', color: '#e8e0d4',
      fontFamily: "'Inter', system-ui, sans-serif", padding: '2rem',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Big Muddy — Everything</h1>
          <p style={{ fontSize: '1rem', color: '#8a8074' }}>Click anything. Every button goes somewhere real.</p>
        </div>

        {/* Sections */}
        {SECTIONS.map(section => (
          <div key={section.label} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8943e', marginBottom: '0.75rem' }}>
              {section.label}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
              {section.items.map(item => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: '1rem 1.25rem',
                    background: '#1a1816',
                    border: '1px solid #2a2520',
                    borderRadius: 10,
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8943e40'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2520'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#e8e0d4', marginBottom: '0.25rem' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6a6560' }}>
                    {item.desc}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
