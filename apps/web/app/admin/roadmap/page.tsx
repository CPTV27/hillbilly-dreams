// apps/web/app/admin/roadmap/page.tsx
// Single internal roadmap — brands, tiers, product map, competitors. Admin auth only.

import type { CSSProperties } from 'react';
import { BRANDS } from '@bigmuddy/config';
import type { BrandId } from '@bigmuddy/config';
import { TENANTS } from '@/config/tenants';

const NAV = [
  { href: '#brands-properties', label: 'Brands & properties' },
  { href: '#product-map', label: 'Product × brand map' },
  { href: '#retail-tiers', label: 'Retail tiers (pitch)' },
  { href: '#platform-capabilities', label: 'Platform capabilities' },
  { href: '#competitors', label: 'Competitors (20 categories)' },
  { href: '#moat', label: 'Moat vs. buy-separate' },
  { href: '#rollout', label: 'Rollout (planning)' },
  { href: '#anti-churn', label: 'Anti-churn' },
] as const;

/** Consumer + hub + holding + internal — canonical registry order for scanning */
const BRAND_ORDER: BrandId[] = [
  'hillbilly',
  'entertainment',
  'touring',
  'magazine',
  'radio',
  'records',
  'directory',
  'economics',
  'admin',
];

const RETAIL_TIERS = [
  {
    id: 'free',
    title: 'Free — corridor capture',
    price: '$0',
    pitch:
      'We come to you with an iPhone, grab real photos of you and your place, and get you live in the Deep South Directory fast. Low friction so you actually say yes — then you see what the network can do and why paid tiers exist.',
    bullets: [
      'On-site or curbside photo pass (phone camera — authentic, not a stock shoot)',
      'Directory profile + corridor placement (you show up where travelers look)',
      'Simple onboarding — we do the typing; you approve the copy',
      'Designed as the wedge: proof of value + reason to step up to The Engine',
    ],
  },
  {
    id: 'engine',
    title: 'The Engine — primary paid tier',
    price: '~$99/mo (retail TBD — quote on the call)',
    pitch:
      'This is what we lead with after Free. Full local-marketing OS: AI trained on your business and your town, review workflows, social cadence, and reporting — without selling a stack of disconnected SaaS logos.',
    bullets: [
      'AI assistant + local context (not generic internet answers)',
      'Review monitoring + drafted responses (you approve before post)',
      'Social / GBP cadence and content ideas tied to your photos and reviews',
      'SMS-first nudges where it helps (optional — no dashboard religion)',
      'Integrations path (Stripe, Square, POS, mail — as we wire each sovereign safely)',
    ],
  },
  {
    id: 'partner',
    title: 'Partner / Network — corridor media bundle',
    price: 'Custom (often $250–500+ / mo range — set on quote)',
    pitch:
      'For operators who want the software plus the owned media: magazine, radio, photography, and priority when our production calendar allows. This is where absentee platforms cannot compete.',
    bullets: [
      'Everything in The Engine',
      'Editorial + radio exposure when production calendar allows',
      'On-site or corridor photography sessions on a real schedule (we do not over-promise)',
      'Deeper analytics + competitor watch (bounded, honest scope)',
      'White-glove support / strategy check-ins',
    ],
  },
  {
    id: 'operator',
    title: 'Operator — outsourced OS',
    price: '$1,500+/mo · $500K+ revenue operators',
    pitch:
      'Predictive cash flow, multi-location rollups, AR/AP nudges, and “ask the data” over SMS — for businesses that want us as operating infrastructure, not just marketing.',
    bullets: [
      'Forecasting + demand signals (foot traffic, weather, staffing hints)',
      'Multi-location unified reporting',
      'Automated chasers and exception routing',
      'Voice / text → structured actions in your stack',
    ],
  },
] as const;

/** How DSD / MBT product surfaces attach to each brand */
const PRODUCT_BRAND_MAP: Array<{
  brand: string;
  domain: string;
  role: string;
  dsdProduct: string;
  mediaStack: string;
}> = [
  {
    brand: 'Deep South Directory',
    domain: 'deepsouthdirectory.com',
    role: 'Revenue product — local business marketing + listings',
    dsdProduct: 'Primary — listings, tiers, onboard, dashboard',
    mediaStack: 'Feeds magazine + radio + touring story; pulls corridor content',
  },
  {
    brand: 'Big Muddy Touring',
    domain: 'bigmuddytouring.com',
    role: 'Shows, route, talent pipeline, inn tie-in',
    dsdProduct: 'Directory clients get show / corridor exposure (Partner tier)',
    mediaStack: 'Events → magazine, radio, records, directory features',
  },
  {
    brand: 'Big Muddy Magazine',
    domain: 'bigmuddymagazine.com',
    role: 'Editorial proof + city guides',
    dsdProduct: 'Partner tier — features when calendar allows',
    mediaStack: 'Articles link to directory listings + economics field manual',
  },
  {
    brand: 'Big Muddy Radio',
    domain: 'bigmuddyradio.com',
    role: 'Owned channel — playlists, podcast, directory “On the Route”',
    dsdProduct: 'Partner tier — airplay / mentions; directory businesses surfaced',
    mediaStack: 'Audio + cross-links to touring / records',
  },
  {
    brand: 'Big Muddy Records',
    domain: 'bigmuddyrecordlabel.com',
    role: 'Label + artist roster (MelodyVault / talent DB)',
    dsdProduct: 'Corridor musicians roster surfaces on DSD; artist profiles',
    mediaStack: 'Releases feed radio + magazine + touring',
  },
  {
    brand: 'Big Muddy Entertainment',
    domain: 'bigmuddyentertainment.com',
    role: 'Hub to touring / radio / records',
    dsdProduct: 'Booking + talent narrative supports Partner-tier stories',
    mediaStack: 'Single front door for music division',
  },
  {
    brand: 'Outsider Economics',
    domain: 'outsidereconomics.com',
    role: 'Thought leadership + field manual (coordination / extraction)',
    dsdProduct: 'Editorial trust layer — not a billing product',
    mediaStack: 'Feeds magazine tone + operator education',
  },
  {
    brand: 'Hillbilly Dreams Inc.',
    domain: 'hillbillydreamsinc.com',
    role: 'Holding + portfolio',
    dsdProduct: 'Corporate face; internal roadmap (this page)',
    mediaStack: 'Narrative shell for all properties',
  },
  {
    brand: 'Measurably Better (platform)',
    domain: 'measurablybetter.life',
    role: 'B2B platform brand for operators / licensees',
    dsdProduct: 'Same engine as DSD — different skin / contract',
    mediaStack: 'Not a walk-in consumer pitch',
  },
  {
    brand: 'Venture Gallery',
    domain: 'venturegallery.art',
    role: 'Prints / photography storefront',
    dsdProduct: 'Partner photography pipeline can feed gallery + directory heroes',
    mediaStack: 'Chase Pierson print catalog',
  },
];

const COMPETITOR_CATEGORIES = [
  { cat: 'Listings', tops: 'Yext, BrightLocal, Moz', low: '~$14–499/mo', us: 'Engine–Partner' },
  { cat: 'Social', tops: 'Hootsuite, Sprout, Buffer', low: '~$15–249/mo', us: 'Engine–Partner' },
  { cat: 'Reputation', tops: 'Podium, Birdeye, ReviewTrackers', low: '~$49–299/mo', us: 'Engine–Partner' },
  { cat: 'Email', tops: 'Mailchimp, Brevo, Constant Contact', low: '~$9–40/mo', us: 'Partner (cadence)' },
  { cat: 'CRM', tops: 'Pipedrive, Salesforce, Zoho', low: '~$14–25/mo', us: 'Engine–Partner' },
  { cat: 'CMS / site', tops: 'Ghost, Webflow, Squarespace', low: '~$18–23/mo', us: 'Partner (scope)' },
  { cat: 'Radio stack', tops: 'Live365, Radio.co, Airtime', low: '~$10–59/mo', us: 'Owned Big Muddy Radio + Partner' },
  { cat: 'DAM / photo', tops: 'Adobe CC, Brandfolder', low: '~$60+/mo', us: 'Partner + Studio pipeline' },
  { cat: 'AI content', tops: 'Jasper, ChatGPT, Simplified', low: '~$19–59/mo', us: 'Engine–Partner' },
  { cat: 'Projects', tops: 'Monday, Asana, Basecamp', low: '~$9–15/mo', us: 'Growth ops (internal + client)' },
  { cat: 'Events', tops: 'RSVPify, EventCreate, Splash', low: '~$39–500+/mo', us: 'Partner + Touring' },
  { cat: 'Distribution', tops: 'DistroKid, TuneCore, Amuse', low: '~$1–5/mo', us: 'Records + Partner' },
  { cat: 'Video', tops: 'Restream, StreamYard, Vimeo', low: '~$16–20/mo', us: 'Partner + Studio C' },
  { cat: 'Analytics', tops: 'AgencyAnalytics, Databox, Matomo', low: '~$12–49/mo', us: 'Engine–Partner' },
  { cat: 'WiFi marketing', tops: 'Tanaza, Purple, Aislelabs', low: 'varies', us: 'Partner (Inn / welcome)' },
  { cat: 'Signage', tops: 'Yodeck, TelemetryTV', low: '~$8–20/mo', us: 'Case-by-case' },
  { cat: 'Chat / voice AI', tops: 'Intercom, Tidio, Crisp', low: '~$25–39/mo', us: 'Engine–Partner' },
  { cat: 'Photo delivery', tops: 'ShootProof, Pixieset, Pic-Time', low: '~$10/mo', us: 'Partner' },
  { cat: 'Gallery / print', tops: 'SmugMug, Shopify, FAA', low: '~$0–39/mo', us: 'Venture Gallery + Partner' },
  { cat: 'Booking', tops: 'Eat App, Resy, Yelp', low: '~$129–249/mo', us: 'Roadmap / case-by-case' },
] as const;

const MOAT_ROWS = [
  { ours: 'Magazine feature', alt: 'PR firm', cost: '$2,000–5,000/feature' },
  { ours: 'Radio airplay', alt: 'Spots buy', cost: '$500–2,000/mo' },
  { ours: 'Corridor photography', alt: 'Freelance shoot', cost: '$200–500/shoot' },
  { ours: 'Label / distro narrative', alt: 'Distro + ads', cost: '$500+/mo' },
  { ours: 'WiFi / welcome flows', alt: 'Purple + setup', cost: '$200+/mo' },
  { ours: 'Touring / event lift', alt: 'Agency', cost: '$1,000+/event' },
] as const;

const ROLLOUT_PHASES = [
  {
    q: 'Q1',
    title: 'Natchez fortress (months 1–3)',
    body: 'Grant + engine + manual anchor onboarding.',
    nodes: '18',
    retained: '$38,500',
  },
  {
    q: 'Q2',
    title: 'Circuit expansion (months 4–6)',
    body: 'Clarksdale, Memphis, Lafayette — follow the corridor.',
    nodes: '46',
    retained: '$32,500',
  },
  {
    q: 'H2',
    title: 'Density (months 7–12)',
    body: '10+ cities · 150 paying operators (model).',
    nodes: '165',
    retained: '$144,000',
  },
] as const;

const ANTI_CHURN = [
  { reason: 'Infrequent usage', industry: 'Users forget to log in', ours: 'SMS-first — value on the lock screen' },
  { reason: 'Manual data entry', industry: 'Still retyping between systems', ours: 'Integrations + we capture on-site (Free tier photos)' },
  { reason: 'Too complex', industry: 'Dashboard fatigue', ours: 'No dashboard religion — camera + text + voice' },
  { reason: 'No visible ROI', industry: 'SaaS blur', ours: 'Daily proof + owned media hits they can hear and read' },
] as const;

const linkStyle = { color: 'var(--accent)', textDecoration: 'none' as const };

export default function InternalRoadmapPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Master roadmap</h1>
          <p className="admin-page-sub">
            Single internal source: brands, retail tiers, product map, competitors. Not for customers — verify every
            &ldquo;shipped&rdquo; line against the repo before quoting.
          </p>
        </div>
      </div>

      <div
        className="admin-card"
        style={{
          marginBottom: 'var(--space-6)',
          borderLeft: '4px solid var(--error, #ef4444)',
          background: 'var(--surface-2)',
        }}
      >
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          <strong style={{ color: 'var(--text)' }}>Do not distribute.</strong> Strip financials and competitor dollars
          before any external deck. Public site tier <em>names</em> may still say Core / Growth in places —{' '}
          <strong>retail pitch is Free → The Engine (~$99) → Partner → Operator</strong>. We are not leading with
          low-dollar stair-steps ($20 / $49) anymore.
        </p>
      </div>

      <div
        className="admin-card"
        style={{
          marginBottom: 'var(--space-6)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', marginRight: 8 }}>
          Jump to:
        </span>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} style={{ ...linkStyle, fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            {n.label}
          </a>
        ))}
      </div>

      {/* Canonical brand registry */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }} id="brands-properties">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '0 0 var(--space-2)' }}>Brands & properties</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)', lineHeight: 1.6 }}>
          From <code>@bigmuddy/config</code> registry + multi-tenant operators. Domains are canonical production hosts.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={th}>Brand</th>
                <th style={th}>Domain</th>
                <th style={th}>Layer</th>
                <th style={th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_ORDER.map((id) => {
                const b = BRANDS[id];
                return (
                  <tr key={id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={tdStrong}>{b.name}</td>
                    <td style={td}>
                      <a href={`https://${b.domain}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                        {b.domain} ↗
                      </a>
                    </td>
                    <td style={tdMuted}>{id === 'hillbilly' ? 'holding' : id === 'entertainment' ? 'hub' : id === 'admin' ? 'internal' : 'brand'}</td>
                    <td style={tdMuted}>{b.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, margin: 'var(--space-6) 0 var(--space-3)' }}>
          Tenants (multi-node)
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={th}>Tenant</th>
                <th style={th}>Entity</th>
                <th style={th}>Primary domain</th>
                <th style={th}>Feature tags</th>
              </tr>
            </thead>
            <tbody>
              {TENANTS.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={tdStrong}>{t.name}</td>
                  <td style={tdMuted}>{t.entity}</td>
                  <td style={td}>
                    <a href={`https://${t.primaryDomain}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                      {t.primaryDomain} ↗
                    </a>
                  </td>
                  <td style={tdMuted}>{t.features.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product × brand */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }} id="product-map">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '0 0 var(--space-2)' }}>Product × brand map</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)', lineHeight: 1.6 }}>
          How Deep South Directory / MBT software connects to each consumer property. Adjust as modules ship.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={th}>Brand</th>
                <th style={th}>Role</th>
                <th style={th}>DSD / product</th>
                <th style={th}>Media stack</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCT_BRAND_MAP.map((row) => (
                <tr key={row.brand} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={tdStrong}>
                    {row.brand}
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 400, color: 'var(--text-disabled)', marginTop: 4 }}>
                      {row.domain}
                    </div>
                  </td>
                  <td style={tdMuted}>{row.role}</td>
                  <td style={tdMuted}>{row.dsdProduct}</td>
                  <td style={tdMuted}>{row.mediaStack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tiers */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }} id="retail-tiers">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '0 0 var(--space-2)' }}>Retail tiers (how we sell)</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)', lineHeight: 1.6 }}>
          <strong>Free</strong> is the foot-in-door: real photos, real listing, real participation.{' '}
          <strong>Paid focus starts at The Engine (~$99)</strong> — then Partner for media bundle, Operator for outsourced
          OS. Legacy $20 / $49 stair-steps are <em>not</em> the story; retire them from pitch (code or marketing pages may
          lag — clean up as you touch them).
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {RETAIL_TIERS.map((tier) => (
            <section
              key={tier.id}
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-5)',
                background: 'var(--surface)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, margin: 0 }}>{tier.title}</h3>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--accent)' }}>{tier.price}</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-3)', lineHeight: 1.65 }}>{tier.pitch}</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                {tier.bullets.map((b) => (
                  <li key={b} style={{ marginBottom: 6 }}>{b}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {/* Platform capabilities (legacy feature backlog merged) */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }} id="platform-capabilities">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '0 0 var(--space-2)' }}>Platform capability backlog</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)', lineHeight: 1.6 }}>
          Engineering north star — not all shipped. Map each item to a tier before promising externally.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
          <CapabilityCard
            title="Data & integrations"
            items={[
              'POS → accounting sync (Square / Toast → QBO / Xero)',
              '"One number" daily SMS — yesterday revenue',
              'Receipt capture → expense log',
              'Notification hub (alerts in one feed)',
              'Stripe / Connect / client billing',
            ]}
          />
          <CapabilityCard
            title="Growth & reputation"
            items={[
              'Photo → caption → post (IG / FB / GBP)',
              'Review drafts + post workflow',
              'Competitor watch (bounded)',
              'Social listening alerts',
              'Email newsletter from photos + reviews',
            ]}
          />
          <CapabilityCard
            title="Operator / advanced"
            items={[
              'Compliance calendar via SMS',
              'Decision queue (approve POs, refunds, shifts)',
              'Voice → bookkeeping actions',
              'Cash flow + demand signals (model)',
              'Multi-location roll-up',
            ]}
          />
        </div>
      </div>

      {/* Competitors */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }} id="competitors">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '0 0 var(--space-2)' }}>Competitors — 20 categories</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)', lineHeight: 1.6 }}>
          Condensed from <code>docs/COMPETITIVE_ANALYSIS_2026.md</code>. Re-verify vendor pricing before contracts.{' '}
          Stack-replacement story: ~<strong>$497/mo</strong> if they buy the cheapest tool per category — we bundle + media.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={th}>#</th>
                <th style={th}>Category</th>
                <th style={th}>Top competitors</th>
                <th style={th}>Low-end $</th>
                <th style={th}>Our tier span</th>
              </tr>
            </thead>
            <tbody>
              {COMPETITOR_CATEGORIES.map((c, i) => (
                <tr key={c.cat} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={tdMuted}>{i + 1}</td>
                  <td style={tdStrong}>{c.cat}</td>
                  <td style={tdMuted}>{c.tops}</td>
                  <td style={tdMuted}>{c.low}</td>
                  <td style={tdMuted}>{c.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', marginTop: 'var(--space-4)' }}>
          Deep dives: Townsquare (~$499), Vendasta, Birdeye, Podium, Thryv — see full doc.
        </p>
      </div>

      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }} id="moat">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '0 0 var(--space-4)' }}>Moat — buy separate vs. us</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={th}>We provide</th>
                <th style={th}>Typical alternative</th>
                <th style={th}>If bought à la carte</th>
              </tr>
            </thead>
            <tbody>
              {MOAT_ROWS.map((m) => (
                <tr key={m.ours} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={tdStrong}>{m.ours}</td>
                  <td style={tdMuted}>{m.alt}</td>
                  <td style={tdMuted}>{m.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-4)', lineHeight: 1.6 }}>
          Equivalent buy-separate band (rough): <strong>$4,500–9,000/mo</strong> — position Partner / bundle against that range
          on the call; put your final retail on the slide only when locked.
        </p>
      </div>

      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }} id="rollout">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '0 0 var(--space-2)' }}>12-month rollout (planning)</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)' }}>
          Model only — revisit quarterly.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {ROLLOUT_PHASES.map((p) => (
            <div
              key={p.q}
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                padding: 'var(--space-4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-2)',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: 'var(--accent)',
                }}
              >
                {p.q}
              </div>
              <div style={{ flex: '1 1 220px' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, margin: '0 0 6px' }}>{p.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{p.body}</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-disabled)', marginTop: 10 }}>
                  Nodes: <span style={{ color: 'var(--accent)' }}>{p.nodes}</span> · Projected retained:{' '}
                  <span style={{ color: 'var(--accent)' }}>{p.retained}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 'var(--space-5)',
            padding: 'var(--space-4)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-disabled)' }}>
              Year 1 net income (model)
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success, #22c55e)' }}>~$177,500</div>
          </div>
          <div style={{ textAlign: 'right' as const }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Exit ~$350K ARR (model)</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>96% gross cloud margins (model)</div>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }} id="anti-churn">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '0 0 var(--space-4)' }}>Anti-churn architecture</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={th}>Risk</th>
                <th style={th}>Industry pattern</th>
                <th style={th}>Our answer</th>
              </tr>
            </thead>
            <tbody>
              {ANTI_CHURN.map((row) => (
                <tr key={row.reason} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={tdStrong}>{row.reason}</td>
                  <td style={tdMuted}>{row.industry}</td>
                  <td style={tdMuted}>{row.ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
        Customer-facing pitch (different styling):{' '}
        <a href="/hillbilly/directory-pitch" style={linkStyle}>/hillbilly/directory-pitch</a>
        {' · '}
        Full competitor write-up: <code>docs/COMPETITIVE_ANALYSIS_2026.md</code>
      </p>
    </>
  );
}

function CapabilityCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        background: 'var(--surface)',
      }}
    >
      <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, margin: '0 0 var(--space-3)' }}>{title}</h3>
      <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.65 }}>
        {items.map((x) => (
          <li key={x} style={{ marginBottom: 6 }}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

const th: CSSProperties = {
  textAlign: 'left',
  padding: 'var(--space-2)',
  color: 'var(--text-disabled)',
  fontWeight: 700,
  fontSize: 'var(--text-xs)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const td: CSSProperties = {
  padding: 'var(--space-3) var(--space-2)',
  verticalAlign: 'top',
  lineHeight: 1.55,
};

const tdStrong: CSSProperties = { ...td, color: 'var(--text)', fontWeight: 600 };
const tdMuted: CSSProperties = { ...td, color: 'var(--text-muted)' };
