// apps/web/app/directory/page.tsx
// Deep South Directory — Homepage
// Voice: Chase Pierson (see memory/feedback_chase_voice.md)
// Tiers: 5-tier structure from memory/project_mbt_pricing_tiers.md
// Copy direction: approved in issue #73 comments
import type { Metadata } from 'next';
import { IllustrationDivider } from '@bigmuddy/ui';
import {
  getCorridorArtistsPublic,
  recordsArtistProfileUrl,
} from '@/lib/corridor-artists-public';

export const metadata: Metadata = {
  title: 'Deep South Directory — Cancel ChatGPT. This one already knows your business.',
  description:
    'Digital hygiene for Main Street. Google listing, reviews, social posts, AI that knows your town. Starting at $25/mo.',
};

const CATEGORIES = [
  {
    name: 'Restaurants & Food',
    icon: 'R',
    count: 'Biscuits & Blues, The Camp, Cotton Alley, and more',
    desc: 'From Regina\'s biscuits to gas station fried chicken. The corridor eats.',
  },
  {
    name: 'Venues & Music',
    icon: 'V',
    count: 'The Anthologist, Bobby J\'s, Blues Room, and more',
    desc: 'Juke joints, listening rooms, record stores with stages. Where the music lives.',
  },
  {
    name: 'Hotels & Lodging',
    icon: 'H',
    count: 'Big Muddy Inn, B&Bs, historic homes',
    desc: 'Places to stay that have a story. Not chains — characters.',
  },
  {
    name: 'Shops & Retail',
    icon: 'S',
    count: 'Antiques, art, vinyl, flowers',
    desc: 'Main Street still works in these towns. Support the people who keep it open.',
  },
  {
    name: 'Tours & Experiences',
    icon: 'T',
    count: 'Walking tours, cooking classes, river excursions',
    desc: 'The things you came to the corridor to do. We know who does them best.',
  },
  {
    name: 'Services',
    icon: 'P',
    count: 'Photography, web, marketing, events',
    desc: 'The behind-the-scenes people who keep small-town businesses running.',
  },
];

const FEATURED_BUSINESSES = [
  {
    name: 'The Anthologist',
    type: 'Record Store / Florist / Venue',
    city: 'Natchez, MS',
    desc: 'Vinyl, violets, and live music under one roof. A record store inside a flower shop inside a performance space.',
    articleSlug: 'the-anthologist-where-vinyl-meets-violets-on-main-street-natchez',
  },
  {
    name: 'Biscuits & Blues',
    type: 'Restaurant / Cooking School',
    city: 'Natchez, MS',
    desc: 'Built by Regina Charboneau, the Biscuit Queen of Natchez. Paris-trained technique, Mississippi soul.',
    articleSlug: 'reginas-biscuits-how-the-biscuit-queen-of-natchez-trained-in-paris-and-came-home',
  },
  {
    name: 'Stanton Hall',
    type: 'Historic Venue / Event Space',
    city: 'Natchez, MS',
    desc: 'Built in 1857. Maintained by the Pilgrimage Garden Club since 1938. National Historic Landmark.',
    articleSlug: 'save-the-hall-ball-pilgrimage-garden-clubs-fight-for-stanton-hall',
  },
  {
    name: 'The Big Muddy Inn',
    type: 'Boutique Hotel / Music Venue',
    city: 'Natchez, MS',
    desc: '6 rooms, a Blues Room, and the headquarters of everything you\'re reading right now.',
    articleSlug: null,
  },
];

// 5-tier structure — canonical from Chase (2026-04-04)
// Dollar amounts from Chase's direct input. Update memory/project_mbt_pricing_tiers.md if these change.
const TIERS = [
  {
    name: 'Free',
    priceLabel: '$0',
    priceSub: 'forever',
    href: '/directory/onboard?tier=free',
    highlight: false,
    features: [
      'Business profile on the directory',
      'Limited AI access — ask it about your town',
      'Gmail and Google Workspace integration',
      'Basic monthly report',
      'Part of the Big Muddy network',
    ],
  },
  {
    name: 'Essentials',
    priceLabel: '$25',
    priceSub: '/mo',
    href: '/directory/onboard?tier=essentials',
    highlight: false,
    features: [
      'Everything in Free',
      'Full AI trained on your business and your town',
      'Replaces your ChatGPT subscription — with local context',
      'Earn credits by contributing content and photos',
      'Content ideas on demand',
    ],
  },
  {
    name: 'Pro',
    priceLabel: '$50',
    priceSub: '/mo',
    href: '/directory/onboard?tier=pro',
    highlight: false,
    features: [
      'Everything in Essentials',
      'Professional network for the corridor — like LinkedIn, but local',
      'Directory prominence and peer connections',
      'Referral tracking',
      'Priority in search results',
    ],
  },
  {
    name: 'Marketing',
    priceLabel: '$99',
    priceSub: '/mo',
    href: '/directory/onboard?tier=marketing',
    highlight: true,
    features: [
      'Everything in Pro',
      'Digital hygiene handled — Google Business Profile optimized',
      'Review monitoring and AI-drafted responses',
      'Social posts on autopilot — a few per week',
      'Detailed monthly performance report',
    ],
  },
  {
    name: 'Engine',
    priceLabel: '$250',
    priceSub: '/mo',
    href: '/directory/onboard?tier=engine',
    highlight: false,
    features: [
      'Everything in Marketing',
      'More posts per week across all platforms',
      'Magazine features and radio mentions',
      'Professional photography for your business',
      'The whole machine — media company on retainer',
    ],
  },
];

function truncateBio(text: string | null, max = 140): string | null {
  if (!text?.trim()) return null;
  const t = text.trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + '\u2026';
}

export default async function DirectoryPage() {
  const corridorArtists = await getCorridorArtistsPublic(36);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem 1.5rem',
          maxWidth: 900,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <p
          style={{
            color: 'var(--accent, #c8943e)',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '1.5rem',
          }}
        >
          Deep South Directory
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Cancel ChatGPT.
          <br />
          <span style={{ color: 'var(--accent, #c8943e)' }}>This one already knows your business.</span>
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text)',
            opacity: 0.7,
            maxWidth: 550,
            lineHeight: 1.6,
            marginTop: '2rem',
          }}
        >
          Your digital hygiene — handled. Google listing, reviews, social posts, and an AI that already knows your town. Not a generic chatbot. The one that knows Regina makes biscuits on Tuesdays and the Anthologist has live music on Fridays.
        </p>
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="/directory/onboard"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'var(--accent, #c8943e)',
              color: '#0a0a0a',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Claim Your Listing
          </a>
          <a
            href="#tiers"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              border: '1px solid var(--accent, #c8943e)',
              color: 'var(--accent, #c8943e)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            See Plans
          </a>
        </div>
      </section>

      <IllustrationDivider variant="town" />

      {/* Why DSD */}
      <section
        id="why-dsd"
        style={{
          padding: '4rem 1.5rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '0.5rem',
          }}
        >
          Why Deep South Directory
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 1rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          Set it and forget it. Marketing on autopilot for $99 a month — not $1,000.
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text)',
            opacity: 0.65,
            lineHeight: 1.7,
            maxWidth: 640,
            margin: '0 0 2.5rem',
          }}
        >
          Right now, someone in Natchez is Googling &ldquo;best restaurant near me&rdquo; and your listing has wrong hours, no photos, and zero reviews. They picked your competitor. DSD fixes the basics — then puts a magazine, a radio station, and a photography studio behind your business.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {[
            {
              title: 'Your ChatGPT replacement.',
              desc: 'An AI that already knows your business, your town, and your customers. Not generic internet answers — real local context. For $25 a month.',
            },
            {
              title: 'Digital hygiene — handled.',
              desc: 'Google Business Profile corrected. Reviews monitored. Social posts going out every week. The basics that every business needs and nobody has time to do.',
            },
            {
              title: 'A media company, not a dashboard.',
              desc: 'We own a magazine, a radio station, and a photography studio. Higher tiers get you editorial coverage, radio mentions, and professional photos. That is not a feature in a SaaS tool.',
            },
            {
              title: 'We actually live here.',
              desc: 'DSD is run out of Natchez, Mississippi. We ate at your restaurant last week. The companies charging $300 a month have never set foot in Port Gibson.',
            },
          ].map((bullet) => (
            <div
              key={bullet.title}
              style={{
                borderLeft: '3px solid var(--accent, #c8943e)',
                paddingLeft: '1.25rem',
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: '0 0 0.5rem',
                }}
              >
                {bullet.title}
              </h3>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                  opacity: 0.6,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {bullet.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Corridor musicians */}
      <section
        id="musicians"
        style={{
          borderTop: '1px solid var(--border)',
          padding: '3rem 1.5rem',
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem' }}>Corridor musicians</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.75rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          Talent on the route — tied into radio, rooms, and records.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 640, margin: '0 0 2rem' }}>
          These are artists already moving through the Big Muddy network — showcases, touring, and the label pipeline. The directory isn&apos;t only storefronts; it&apos;s the whole corridor stack working together.
        </p>
        {corridorArtists.length === 0 ? (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
            Public roster entries appear here as artists graduate into showcases and routed work. Musicians can{' '}
            <a href="/directory/onboard/musician" style={{ color: 'var(--accent)', fontWeight: 600 }}>get on the list</a>; talent and booking also run through{' '}
            <a href="https://bigmuddytouring.com" style={{ color: 'var(--accent)', fontWeight: 600 }} target="_blank" rel="noopener noreferrer">Big Muddy Touring</a>.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {corridorArtists.map((a) => (
              <a key={a.id} href={recordsArtistProfileUrl(a.slug)} target="_blank" rel="noopener noreferrer" style={{ display: 'block', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem 1.35rem', textDecoration: 'none', color: 'inherit', background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }}>
                <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', margin: '0 0 0.35rem', fontWeight: 700 }}>{a.genre?.replace(/-/g, ' ') ?? 'Corridor artist'}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.35rem', lineHeight: 1.25 }}>{a.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>{a.city}, {a.state}</p>
                {truncateBio(a.bio) && <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>{truncateBio(a.bio)}</p>}
                <span style={{ display: 'inline-block', marginTop: '0.85rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', borderBottom: '1px solid var(--accent)', paddingBottom: 2 }}>Artist profile &#8599;</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Editorial Surface */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '3rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem' }}>From the Corridor</p>
        <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>The network is alive.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {[
            { label: 'From the Corridor', title: 'Where Does the Money Go?', desc: 'Most of the money spent in small Southern towns leaves before the week is out. We looked at why \u2014 and what local businesses can do about it.', href: '/economics/field-manual/02-the-extraction-trap' },
            { label: 'Big Muddy Spotlight \u00b7 Issue 001', title: 'Rise Up: The Talent Has Always Been Here.', desc: 'Arrie Aslin and the Rise Up Gospel and Blues Band travel the corridor. At every stop: a live show, a regional talent search, and the economic program running underneath.', href: '/touring' },
          ].map((card) => (
            <a key={card.title} href={card.href} style={{ display: 'block', border: '1px solid var(--border)', padding: '1.75rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem', opacity: 0.8 }}>{card.label}</p>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.75rem', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{card.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text)', opacity: 0.55, lineHeight: 1.6, margin: '0 0 1rem' }}>{card.desc}</p>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent, #c8943e)', borderBottom: '1px solid var(--accent, #c8943e)', paddingBottom: '0.1rem' }}>Read &#8594;</span>
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="listings" style={{ padding: '4rem 1.5rem', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', marginBottom: '2rem' }}>Browse by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.name} style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: 'var(--accent, #c8943e)', background: 'rgba(200, 148, 62, 0.06)', borderBottom: '1px solid var(--border)', letterSpacing: '0.05em' }}>{cat.icon}</div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.25rem' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem' }}>{cat.count}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.6, lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Businesses */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem' }}>Featured Listings</h2>
        <p style={{ fontSize: '1rem', color: 'var(--text)', opacity: 0.6, marginBottom: '2.5rem', maxWidth: 550 }}>Businesses we&apos;ve written about, photographed, and know personally. The corridor starts here.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FEATURED_BUSINESSES.map((biz) => (
            <div key={biz.name} style={{ border: '1px solid var(--border)', padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.25rem' }}>{biz.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent, #c8943e)', margin: '0 0 0.5rem' }}>{biz.type} &middot; {biz.city}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.65, lineHeight: 1.5, margin: 0 }}>{biz.desc}</p>
              </div>
              {biz.articleSlug && (
                <a href={`/magazine/${biz.articleSlug}`} style={{ fontSize: '0.8rem', color: 'var(--accent, #c8943e)', textDecoration: 'none', whiteSpace: 'nowrap', borderBottom: '1px solid var(--accent, #c8943e)', paddingBottom: '0.15rem' }}>Read feature</a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="tiers" style={{ padding: '4rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem' }}>Plans</h2>
        <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>$99 a month. Not $1,000.</p>
        <p style={{ fontSize: '0.95rem', color: 'var(--text)', opacity: 0.6, lineHeight: 1.7, maxWidth: 600, marginBottom: '2.5rem' }}>
          Birdeye starts at $299. Thryv starts at $244. Podium starts at $399. You get your Google listing fixed, reviews monitored, social posts going out, and an AI that knows your business — for less than any of them. And we live here.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {TIERS.map((tier) => (
            <div key={tier.name} style={{ border: tier.highlight ? '2px solid var(--accent, #c8943e)' : '1px solid var(--border)', padding: '1.75rem', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {tier.highlight && (
                <div style={{ position: 'absolute', top: '-0.75rem', left: '1.5rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.2rem 0.75rem' }}>Most popular</div>
              )}
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent, #c8943e)', marginBottom: '0.25rem' }}>{tier.name}</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
                {tier.priceLabel}<span style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.5 }}>{tier.priceSub}</span>
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem' }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ fontSize: '0.8rem', color: 'var(--text)', opacity: 0.7, lineHeight: 1.5, padding: '0.3rem 0', paddingLeft: '1.25rem', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent, #c8943e)' }}>&mdash;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={tier.href} style={{ display: 'block', textAlign: 'center', padding: '0.75rem 1.5rem', background: tier.highlight ? 'var(--accent, #c8943e)' : 'transparent', color: tier.highlight ? '#0a0a0a' : 'var(--accent, #c8943e)', border: tier.highlight ? 'none' : '1px solid var(--accent, #c8943e)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', marginTop: 'auto' }}>Get Started</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '5rem 1.5rem', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>Connected to the internet properly. Marketing on autopilot.</h2>
        <p style={{ fontSize: '1rem', color: 'var(--text)', opacity: 0.7, lineHeight: 1.6, marginBottom: '2rem' }}>
          Free to list. No contracts. No setup fees. Your Google listing corrected, reviews monitored, and social posts going out — all handled by people who live in the same towns you do.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/directory/onboard" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--accent, #c8943e)', color: '#0a0a0a', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Get started</a>
          <a href="/directory/dashboard" style={{ display: 'inline-block', padding: '0.75rem 2rem', border: '1px solid var(--accent, #c8943e)', color: 'var(--accent, #c8943e)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Business Dashboard &rarr;</a>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text)', opacity: 0.4 }}>listings@hillbillydreamsinc.com</p>
        <p style={{ marginTop: '2rem', fontSize: '0.7rem', color: 'var(--text)', opacity: 0.25, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Deep South Directory &middot; Natchez, Mississippi</p>
      </section>
    </main>
  );
}
