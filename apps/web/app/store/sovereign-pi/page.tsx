import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sovereign Pi — Your business brain in a box',
  description: 'A computer for your business that works without the internet. Free with any DSD subscription. Battery, solar, and Faraday shield available.',
};

const ADDONS = [
  { id: 'battery', name: 'Battery Pack', price: 59, desc: '20,000mAh — 4-6 hours off-grid. Works during power outages.', icon: '⚡' },
  { id: 'solar', name: 'Solar Kit', price: 49, desc: '20W foldable panel. Indefinite runtime outdoors. Charges the battery.', icon: '☀' },
  { id: 'faraday', name: 'Faraday Shield', price: 39, desc: 'RF-shielded case. EMP protection. Your data stays yours.', icon: '🛡' },
  { id: 'hdmi', name: 'Display Cable', price: 9, desc: '6ft HDMI. Plug into any TV to show your dashboard.', icon: '📺' },
];

const BUNDLE_PRICE = 129;
const BUNDLE_SAVINGS = ADDONS.reduce((s, a) => s + a.price, 0) - BUNDLE_PRICE;

const SPECS = [
  { label: 'Processor', value: 'Broadcom BCM2712 quad-core ARM Cortex-A76 @ 2.4GHz' },
  { label: 'Memory', value: '8GB LPDDR4X' },
  { label: 'Storage', value: '256GB NVMe SSD' },
  { label: 'Connectivity', value: 'WiFi 6, Bluetooth 5.0, Gigabit Ethernet, 2x USB 3.0' },
  { label: 'Display', value: 'Micro HDMI — connects to any TV or monitor' },
  { label: 'Power', value: 'USB-C 27W (included). Optional battery + solar.' },
  { label: 'OS', value: 'Custom — boots straight into your business dashboard' },
  { label: 'Size', value: '3.4 x 2.2 x 1.5 inches. Fits in your hand.' },
];

const FEATURES = [
  { title: 'Works without internet.', desc: 'Your business data, your AI assistant, your dashboard — all running locally. No cloud. No subscription server. If the internet goes down, your Pi keeps working.' },
  { title: 'Plugs into any TV.', desc: 'HDMI out turns any screen into a business display. Menu boards, specials, social media feed, radio visualizer — all managed from your phone.' },
  { title: 'Your data stays on your desk.', desc: 'Not in someone else\'s cloud. Not on a server in Virginia. On your counter, in your building, under your control.' },
  { title: 'Free with your DSD membership.', desc: 'The Pi is included with any paid Deep South Directory tier. $25/mo and up. No hardware cost. We finance it because we know you\'ll stay.' },
];

const TIERS = [
  { tier: 'Free', price: '$0/mo', pi: 'Not included', note: 'Sign up, get listed, try the AI.' },
  { tier: 'Essentials', price: '$25/mo', pi: 'Included', note: 'Full AI + Sovereign Pi. Replaces ChatGPT.' },
  { tier: 'Pro', price: '$50/mo', pi: 'Included', note: 'Network + Pi. Your business joins the grid.' },
  { tier: 'Marketing', price: '$99/mo', pi: 'Included', note: 'Autopilot marketing + Pi. Set it and forget it.' },
  { tier: 'Engine', price: '$250/mo', pi: 'Included + 1 Display Module', note: 'Full media company. Pi + a free display for your TV.' },
];

export default function SovereignPiPage() {
  return (
    <main style={{ fontFamily: 'var(--font-body, system-ui)', color: 'var(--text, #f0ebe0)', background: 'var(--bg, #0f0f0d)' }}>

      {/* Hero */}
      <section style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
          Deep South Directory
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 1.5rem' }}>
          Your business brain
          <br />
          <span style={{ color: 'var(--accent, #c8943e)' }}>in a box.</span>
        </h1>
        <p style={{ fontSize: '1.15rem', opacity: 0.7, maxWidth: 520, lineHeight: 1.6, margin: '0 0 2rem' }}>
          A computer that knows your business, your town, and your customers. Works without the internet. Fits in your hand. Free with any DSD membership.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/directory/onboard?addon=sovereign-pi" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Get yours free
          </a>
          <a href="#configure" style={{ display: 'inline-block', padding: '0.75rem 2rem', border: '1px solid var(--accent, #c8943e)', color: 'var(--accent, #c8943e)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Configure + buy standalone
          </a>
        </div>
      </section>

      {/* What it does */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>What it does</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 700, margin: '0 0 2rem', lineHeight: 1.2 }}>
          Not a gadget. A tool that does actual work.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ borderLeft: '3px solid var(--accent, #c8943e)', paddingLeft: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Included with DSD */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto', borderTop: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Pricing</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 700, margin: '0 0 0.5rem', lineHeight: 1.2 }}>
          $0 with your membership. $299 standalone.
        </h2>
        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.7, maxWidth: 600, margin: '0 0 2.5rem' }}>
          Like a phone from your carrier. The hardware is free because the service is the product. Cancel anytime — but nobody returns the computer that runs their business.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
          {TIERS.map(t => (
            <div key={t.tier} style={{ border: t.pi.startsWith('Included') ? '2px solid var(--accent, #c8943e)' : '1px solid var(--border, rgba(200,148,62,0.12))', padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', marginBottom: '0.25rem' }}>{t.tier}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{t.price}</p>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: t.pi.startsWith('Included') ? 'var(--accent, #c8943e)' : 'var(--text-muted, #8a8074)', marginBottom: '0.25rem' }}>{t.pi}</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Configure */}
      <section id="configure" style={{ padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto', borderTop: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Configure</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 700, margin: '0 0 2rem', lineHeight: 1.2 }}>
          Add what you need.
        </h2>

        {/* Base unit */}
        <div style={{ border: '2px solid var(--accent, #c8943e)', padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>Sovereign Pi Core</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.6, margin: 0 }}>Pi 5 (8GB) + 256GB NVMe + aluminum case + pre-loaded software</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent, #c8943e)', margin: 0 }}>$299</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>or $0 with DSD membership</p>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        {ADDONS.map(a => (
          <div key={a.id} style={{ border: '1px solid var(--border, rgba(200,148,62,0.12))', padding: '1.25rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{a.icon}</span>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.15rem' }}>{a.name}</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.5, margin: 0 }}>{a.desc}</p>
              </div>
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, flexShrink: 0 }}>+${a.price}</p>
          </div>
        ))}

        {/* Bundle */}
        <div style={{ border: '2px solid var(--accent, #c8943e)', padding: '1.25rem', marginTop: '1rem', background: 'rgba(200,148,62,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent, #c8943e)', margin: '0 0 0.15rem' }}>Full Sovereign Bundle</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.6, margin: 0 }}>Battery + Solar + Faraday Shield + Display Cable. Save ${BUNDLE_SAVINGS}.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent, #c8943e)', margin: 0 }}>${BUNDLE_PRICE}</p>
              <p style={{ fontSize: '0.65rem', opacity: 0.4, margin: 0, textDecoration: 'line-through' }}>${ADDONS.reduce((s, a) => s + a.price, 0)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto', borderTop: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Specs</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {SPECS.map(s => (
            <div key={s.label} style={{ padding: '1rem', border: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', marginBottom: '0.25rem' }}>{s.label}</p>
              <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.8 }}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto', borderTop: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Use cases</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 700, margin: '0 0 2rem', lineHeight: 1.2 }}>
          One box. Many jobs.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[
            { title: 'Restaurant', uses: 'Menu board on the TV. Review alerts. Social posts on autopilot. AI answers customer questions about hours and specials.' },
            { title: 'Hotel / B&B', uses: 'Lobby display with local recommendations. Guest WiFi splash page. Room status dashboard. Check-in info on the TV.' },
            { title: 'Retail Shop', uses: 'Product showcase on screen. Instagram feed display. Inventory alerts. Customer loyalty tracking.' },
            { title: 'Venue / Bar', uses: 'Tonight\'s lineup on every screen. Artist bios. Ticket QR codes. Live radio visualizer. Sponsor rotation.' },
            { title: 'Food Truck', uses: 'Battery-powered menu board. Solar panel on the roof. Works at festivals with no WiFi. Takes orders offline.' },
            { title: 'Pop-Up Market', uses: 'Vendor directory display. Payment terminal companion. Social proof wall. Event schedule.' },
          ].map(u => (
            <div key={u.title} style={{ border: '1px solid var(--border, rgba(200,148,62,0.12))', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent, #c8943e)', margin: '0 0 0.5rem' }}>{u.title}</h3>
              <p style={{ fontSize: '0.82rem', opacity: 0.6, lineHeight: 1.6, margin: 0 }}>{u.uses}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Display Module */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto', borderTop: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
        <p style={{ color: 'var(--accent, #c8943e)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>For multiple screens</p>
        <h2 style={{ fontFamily: 'var(--font-display, Georgia)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 700, margin: '0 0 1rem', lineHeight: 1.2 }}>
          Display Module — $99 per screen
        </h2>
        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.7, maxWidth: 600, margin: '0 0 1.5rem' }}>
          Got 3 TVs? Add a Display Module to each one. All managed from your phone. Menus, specials, social feed, radio — different content on every screen, coordinated from one dashboard.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ border: '1px solid var(--border, rgba(200,148,62,0.12))', padding: '1.25rem', flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', marginBottom: '0.25rem' }}>Display Module</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem' }}>$99<span style={{ fontSize: '0.8rem', fontWeight: 400, opacity: 0.5 }}>/screen</span></p>
            <p style={{ fontSize: '0.8rem', opacity: 0.5, margin: 0 }}>One-time purchase. Plug into any TV.</p>
          </div>
          <div style={{ border: '1px solid var(--border, rgba(200,148,62,0.12))', padding: '1.25rem', flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', marginBottom: '0.25rem' }}>Signage Network</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem' }}>$199<span style={{ fontSize: '0.8rem', fontWeight: 400, opacity: 0.5 }}>/mo</span></p>
            <p style={{ fontSize: '0.8rem', opacity: 0.5, margin: 0 }}>Up to 5 screens. We manage the content for you.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center', maxWidth: 600, margin: '0 auto', borderTop: '1px solid var(--border, rgba(200,148,62,0.12))' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
          Your data. Your desk. Your business.
        </h2>
        <p style={{ fontSize: '1rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '2rem' }}>
          No cloud. No monthly server fees. No one between you and your information. Just a small computer on your counter doing the work that used to cost $1,000 a month.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/directory/onboard?addon=sovereign-pi" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Get yours free with DSD
          </a>
          <a href="mailto:listings@hillbillydreamsinc.com?subject=Sovereign Pi" style={{ display: 'inline-block', padding: '0.75rem 2rem', border: '1px solid var(--accent, #c8943e)', color: 'var(--accent, #c8943e)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Questions? Email us
          </a>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.7rem', opacity: 0.25, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Deep South Directory &middot; Natchez, Mississippi
        </p>
      </section>
    </main>
  );
}
