'use client';

// /admin/links — Every link in the ecosystem on one page (#88 mobile: single column ≤480px)

const BASE = 'https://bigmuddytouring.com';

const SECTIONS = [
  {
    title: 'Command',
    links: [
      { label: 'HQ Dashboard', href: '/admin/hq', desc: 'Valuation, multipliers, timeline, team' },
      { label: 'Command Center', href: '/admin/command', desc: 'Tasks, products, audit, brain' },
      { label: 'Dashboard', href: '/admin/dashboard', desc: 'Overview' },
      { label: 'Launch', href: '/admin/launch', desc: 'Launch status' },
      { label: 'Roadmap', href: '/admin/roadmap', desc: 'Product roadmap' },
      { label: 'Deploys', href: '/admin/deploys', desc: 'Deployment status' },
    ],
  },
  {
    title: 'Sales & CRM',
    links: [
      { label: 'Clients', href: '/admin/clients', desc: 'Deep South Directory client management' },
      { label: 'Contacts', href: '/admin/contacts', desc: 'Contact database' },
      { label: 'Scout', href: '/admin/scout', desc: 'Photo scout for walk-ins' },
      { label: 'Business Audit', href: '/admin/scout/audit', desc: 'Pre-call audit (add /slug)' },
      { label: 'Reviews', href: '/admin/reviews', desc: 'Review queue + AI responses' },
      { label: 'Review Desk', href: '/admin/review', desc: 'Content drafts approval' },
      { label: 'Bridge Clients', href: '/admin/bridge', desc: 'Bridge client management' },
      { label: 'Finance', href: '/admin/finance', desc: 'Financial overview' },
      { label: 'Pricing', href: '/admin/pricing', desc: 'Tier pricing config' },
    ],
  },
  {
    title: 'Content & Media',
    links: [
      { label: 'Creative Hub', href: '/admin/creative', desc: 'Creative tools' },
      { label: 'Articles', href: '/admin/articles', desc: 'Magazine articles' },
      { label: 'Media Vault', href: '/admin/media', desc: 'Upload + manage media' },
      { label: 'Upload', href: '/admin/upload', desc: 'File upload' },
      { label: 'Lookbook', href: '/admin/lookbook', desc: 'Illustration library' },
      { label: 'Publications', href: '/admin/publications', desc: 'Publication management' },
      { label: 'Newsletter', href: '/admin/newsletter', desc: 'Email newsletters' },
      { label: 'Social', href: '/admin/social', desc: 'Social media publishing' },
      { label: 'Snap', href: '/admin/snap', desc: 'Quick photo capture' },
    ],
  },
  {
    title: 'Production',
    links: [
      { label: 'Studio C Jobs', href: '/admin/studio-c/jobs', desc: 'Video production queue (Bearsville, NY)' },
      { label: 'Studio Mode', href: '/admin/studio-mode', desc: 'Studio control panel' },
      { label: 'Productions', href: '/admin/productions', desc: 'Campaign production' },
      { label: 'Radio Control', href: '/admin/radio', desc: 'Radio station management' },
      { label: 'Kiosk', href: '/admin/kiosk', desc: 'Glass UI / kiosk display' },
      { label: 'Playlists', href: '/admin/playlists', desc: 'Music playlists' },
      { label: 'Contests', href: '/admin/contests', desc: 'Design contests' },
    ],
  },
  {
    title: 'Operations',
    links: [
      { label: 'Guild', href: '/admin/guild', desc: 'Creative guild + credits' },
      { label: 'Marketplace', href: '/admin/marketplace', desc: 'Vendor storefronts' },
      { label: 'Calendar', href: '/admin/calendar', desc: 'Event calendar' },
      { label: 'Events', href: '/admin/events', desc: 'Event management' },
      { label: 'Ecosystem', href: '/admin/ecosystem', desc: 'Platform overview' },
      { label: 'Business Directory', href: '/admin/business', desc: 'Directory businesses' },
    ],
  },
  {
    title: 'Live Sites',
    external: true,
    links: [
      { label: 'DSD', href: 'https://deepsouthdirectory.com', desc: 'Deep South Directory' },
      { label: 'Touring', href: 'https://bigmuddytouring.com', desc: 'Big Muddy Touring' },
      { label: 'Magazine', href: 'https://bigmuddymagazine.com', desc: 'Big Muddy Magazine' },
      { label: 'Radio', href: 'https://bigmuddyradio.com', desc: 'Big Muddy Radio' },
      { label: 'Entertainment', href: 'https://bigmuddyentertainment.com', desc: 'Big Muddy Entertainment' },
      { label: 'Records', href: 'https://bigmuddyrecord.com', desc: 'Big Muddy Records' },
      { label: 'Inn', href: 'https://bigmuddytouring.com/touring/inn', desc: 'Big Muddy Inn' },
      { label: 'Economics', href: 'https://outsidereconomics.com', desc: 'Outsider Economics' },
      { label: 'HDI', href: 'https://hillbillydreamsinc.com', desc: 'Hillbilly Dreams Inc' },
      { label: 'Bearsville', href: 'https://bearsvillemediagroup.com', desc: 'Bearsville Creative' },
      { label: 'Studio C', href: 'https://studiocvideo.com', desc: 'Studio C Video' },
      { label: 'Tuthill', href: 'https://tuthilldesign.com', desc: 'Tuthill Design' },
      { label: 'MBT', href: 'https://measurablybetter.life', desc: 'Measurably Better (B2B)' },
      { label: 'Gallery', href: 'https://buycurious.art', desc: 'Venture Gallery' },
    ],
  },
  {
    title: 'Tools & Sandbox',
    external: true,
    links: [
      { label: 'Walk-In Flyer', href: '/sandbox/dsd-flyer.html', desc: 'Printable DSD sales flyer' },
      { label: 'Competitive Analysis', href: '/competitive-analysis.html', desc: 'Competitor matrix' },
      { label: 'Roadmap (Static)', href: '/sandbox/roadmap.html', desc: 'Internal roadmap' },
      { label: 'Org Chart', href: '/hillbilly/org-chart', desc: 'HDI org chart (public)' },
      { label: 'Case Studies', href: 'https://outsidereconomics.com/case-studies', desc: 'OE case studies' },
    ],
  },
  {
    title: 'External Services',
    external: true,
    links: [
      { label: 'GitHub', href: 'https://github.com/CPTV27/hillbilly-dreams', desc: 'Code repo' },
      { label: 'GitHub Issues', href: 'https://github.com/CPTV27/hillbilly-dreams/issues', desc: 'Dev task board' },
      { label: 'Vercel', href: 'https://vercel.com', desc: 'Deployment platform' },
      { label: 'Asana', href: 'https://app.asana.com', desc: 'Business task management' },
      { label: 'Cloudflare', href: 'https://dash.cloudflare.com', desc: 'DNS + CDN' },
      { label: 'Bitwarden', href: 'https://vault.bitwarden.com', desc: 'Password vault' },
      { label: 'GCP Console', href: 'https://console.cloud.google.com', desc: 'Google Cloud' },
      { label: 'Stripe', href: 'https://dashboard.stripe.com', desc: 'Payments (setup needed)' },
      { label: 'Canva', href: 'https://canva.com', desc: 'Design + brand kits' },
    ],
  },
  {
    title: 'Mac Mini Services',
    external: true,
    links: [
      { label: 'OpenBroadcaster', href: 'http://192.168.4.37:8080', desc: 'Radio broadcast control' },
      { label: 'Icecast', href: 'http://192.168.4.37:8010', desc: 'Stream status' },
      { label: 'Plex', href: 'http://192.168.4.37:32400', desc: 'Media server' },
      { label: 'Postiz', href: 'http://192.168.4.37:4007', desc: 'Social scheduling (self-hosted)' },
      { label: 'Open Notebook', href: 'http://192.168.4.37:5055', desc: 'AI notebook' },
    ],
  },
];

export default function LinksPage() {
  return (
    <div className="admin-links-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Links</h1>
          <p className="admin-page-sub">Every page, tool, and service in the HDI ecosystem</p>
        </div>
      </div>

      {SECTIONS.map(section => (
        <div key={section.title} style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-3)' }}>
            {section.title}
          </h2>
          <div className="admin-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-2)' }}>
            {section.links.map(link => (
              <a
                key={link.href}
                href={section.external ? link.href : `${BASE}/admin${link.href.startsWith('/admin') ? link.href.replace('/admin', '') : link.href}`}
                target={section.external ? '_blank' : undefined}
                rel={section.external ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'block',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                  minHeight: 48,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)', marginBottom: 2 }}>
                  {link.label} {section.external ? '\u2197' : ''}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{link.desc}</div>
              </a>
            ))}
          </div>
        </div>
      ))}
      <style>{`
        @media (max-width: 600px) {
          .admin-links-page .admin-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
