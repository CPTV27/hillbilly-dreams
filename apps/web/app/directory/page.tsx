// apps/web/app/directory/page.tsx
// Deep South Directory — Business directory landing page
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deep South Directory — Local Business Marketing',
  description:
    'The regional business network for the Mississippi Corridor. Find locals. Get found. Keep your money in the region. Powered by Measurably Better.',
};

const CATEGORIES = [
  {
    name: 'Restaurants & Food',
    image: '/images/dsd/cat-restaurant.webp',
    count: 'Biscuits & Blues, The Camp, Cotton Alley, and more',
    desc: 'From Regina\'s biscuits to gas station fried chicken. The corridor eats.',
  },
  {
    name: 'Venues & Music',
    image: '/images/dsd/cat-venue.webp',
    count: 'The Anthologist, Bobby J\'s, Blues Room, and more',
    desc: 'Juke joints, listening rooms, record stores with stages. Where the music lives.',
  },
  {
    name: 'Hotels & Lodging',
    image: '/images/dsd/cat-hotel.webp',
    count: 'Big Muddy Inn, B&Bs, historic homes',
    desc: 'Places to stay that have a story. Not chains — characters.',
  },
  {
    name: 'Shops & Retail',
    image: '/images/dsd/cat-shop.webp',
    count: 'Antiques, art, vinyl, flowers',
    desc: 'Main Street still works in these towns. Support the people who keep it open.',
  },
  {
    name: 'Tours & Experiences',
    image: '/images/dsd/cat-tour.webp',
    count: 'Walking tours, cooking classes, river excursions',
    desc: 'The things you came to the corridor to do. We know who does them best.',
  },
  {
    name: 'Services',
    image: '/images/dsd/cat-service.webp',
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

const TIERS = [
  {
    name: 'Free Listing',
    price: 'Free',
    features: [
      'Business name, address, and category in the directory',
      'Link to your website',
      'Appear in corridor search results',
    ],
  },
  {
    name: 'Main Street',
    price: '$99/mo',
    features: [
      'Everything in Free Listing',
      'Enhanced profile with photos and description',
      'AI-generated editorial spotlight',
      'Featured in Magazine articles when relevant',
      'Monthly performance report',
      'AI-optimized business description for search',
    ],
  },
  {
    name: 'The Route',
    price: '$299/mo',
    features: [
      'Everything in Main Street',
      'Spotlight cross-published to Big Muddy Magazine',
      'Social media management (2 platforms, 12 posts/mo)',
      'Big Muddy Radio mentions',
      'Priority placement in directory search',
      'AI Search Optimization (structured data, llms.txt)',
      'All payment & booking integrations',
    ],
  },
  {
    name: 'MBT Ops',
    price: '$1,200+/mo',
    features: [
      'Everything in The Route',
      'Full Measurably Better operating system deployment',
      'Sales pipeline, billing, project management, client delivery',
      'One platform replacing your entire software stack',
      'Hillbilly Dreams as your embedded technology arm',
      '24/7 uptime monitoring with SLA',
      'QuickBooks sync included',
    ],
  },
];

export default function DirectoryPage() {
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
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/dsd/hero-mainstreet.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: -1,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
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
            color: 'var(--fg, #f5f0eb)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          The businesses that
          <br />
          <span style={{ color: 'var(--accent, #c8943e)' }}>make the corridor work.</span>
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.7,
            maxWidth: 550,
            lineHeight: 1.6,
            marginTop: '2rem',
          }}
        >
          The regional business network for the Mississippi Corridor. Find locals. Get found. Keep your money in the region.
        </p>
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="#listings"
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
            Browse Directory
          </a>
          <a
            href="/media/services"
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
            View Services
          </a>
        </div>
      </section>

      {/* Photo break */}
      <div
        style={{
          width: '100%',
          height: 280,
          backgroundImage: 'url(/images/dsd/bg-natchez-street.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
        }}
        role="img"
        aria-label="Downtown Natchez street"
      />

      {/* Editorial Surface */}
      <section
        style={{
          borderTop: '1px solid var(--muted, #333)',
          padding: '3rem 1.5rem',
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
          From the Corridor
        </p>
        <p
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
          }}
        >
          The network is alive.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {[
            {
              label: 'Outsider Economics · Brief 001',
              title: 'The 80% Extraction Rate (And How to Stop It)',
              desc: 'Eighty cents of every dollar earned in the Deep South leaves within 48 hours. Not bad luck. A machine designed to drain you. Here\'s how it works — and how to stop it.',
              href: '/economics/field-manual/02-the-extraction-trap',
            },
            {
              label: 'Big Muddy Spotlight · Issue 001',
              title: 'Rise Up: The Talent Has Always Been Here.',
              desc: 'Arrie Aslin and the Rise Up Gospel and Blues Band travel the corridor. At every stop: a live show, a regional talent search, and the economic program running underneath.',
              href: '/touring',
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              style={{
                display: 'block',
                border: '1px solid var(--muted, #333)',
                padding: '1.75rem',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
            >
              <p
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--accent, #c8943e)',
                  marginBottom: '0.5rem',
                  opacity: 0.8,
                }}
              >
                {card.label}
              </p>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  margin: '0 0 0.75rem',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.55,
                  lineHeight: 1.6,
                  margin: '0 0 1rem',
                }}
              >
                {card.desc}
              </p>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--accent, #c8943e)',
                  borderBottom: '1px solid var(--accent, #c8943e)',
                  paddingBottom: '0.1rem',
                }}
              >
                Read →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section
        id="listings"
        style={{
          padding: '4rem 1.5rem',
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '2rem',
          }}
        >
          Browse by Category
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              style={{
                border: '1px solid var(--muted, #333)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: 140,
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.7,
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--fg, #f5f0eb)',
                    margin: '0 0 0.25rem',
                  }}
                >
                  {cat.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent, #c8943e)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {cat.count}
                </p>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--fg, #f5f0eb)',
                    opacity: 0.6,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Businesses */}
      <section
        style={{
          borderTop: '1px solid var(--muted, #333)',
          padding: '4rem 1.5rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '0.5rem',
          }}
        >
          Featured Listings
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.6,
            marginBottom: '2.5rem',
            maxWidth: 550,
          }}
        >
          Businesses we&apos;ve written about, photographed, and know personally. The corridor
          starts here.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FEATURED_BUSINESSES.map((biz) => (
            <div
              key={biz.name}
              style={{
                border: '1px solid var(--muted, #333)',
                padding: '1.5rem 2rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--fg, #f5f0eb)',
                    margin: '0 0 0.25rem',
                  }}
                >
                  {biz.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent, #c8943e)',
                    margin: '0 0 0.5rem',
                  }}
                >
                  {biz.type} &middot; {biz.city}
                </p>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--fg, #f5f0eb)',
                    opacity: 0.65,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {biz.desc}
                </p>
              </div>
              {biz.articleSlug && (
                <a
                  href={`/magazine/${biz.articleSlug}`}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent, #c8943e)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid var(--accent, #c8943e)',
                    paddingBottom: '0.15rem',
                  }}
                >
                  Read feature
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Photo break */}
      <div
        style={{
          width: '100%',
          height: 240,
          backgroundImage: 'url(/images/dsd/mississippi-sunset.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
        }}
        role="img"
        aria-label="Mississippi River sunset"
      />

      {/* Pricing Tiers */}
      <section
        style={{
          padding: '4rem 1.5rem',
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '0.5rem',
          }}
        >
          Directory Membership
        </h2>
        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '0.5rem',
          }}
        >
          More than a listing. A marketing partner.
        </p>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.6,
            lineHeight: 1.7,
            maxWidth: 600,
            marginBottom: '2.5rem',
          }}
        >
          Every paid tier includes access to the Big Muddy ecosystem — Magazine features,
          Radio mentions, AI-generated content matched to your voice, and photography by
          Chase Pierson. This isn&apos;t a Yelp listing. This is a media company working for your business.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              style={{
                border: tier.name === 'The Route'
                  ? '2px solid var(--accent, #c8943e)'
                  : '1px solid var(--muted, #333)',
                padding: '2rem',
                position: 'relative',
              }}
            >
              {tier.name === 'The Route' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-0.75rem',
                    left: '1.5rem',
                    background: 'var(--accent, #c8943e)',
                    color: '#0a0a0a',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '0.2rem 0.75rem',
                  }}
                >
                  Best Value
                </div>
              )}
              <p
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--accent, #c8943e)',
                  marginBottom: '0.25rem',
                }}
              >
                {tier.name}
              </p>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  margin: '0 0 1.5rem',
                  lineHeight: 1.1,
                }}
              >
                {tier.price}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--fg, #f5f0eb)',
                      opacity: 0.7,
                      lineHeight: 1.5,
                      padding: '0.3rem 0',
                      paddingLeft: '1.25rem',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--accent, #c8943e)',
                      }}
                    >
                      —
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Plug In Your Tools */}
      <section
        style={{
          borderTop: '1px solid var(--muted, #333)',
          padding: '4rem 1.5rem',
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent, #c8943e)',
            marginBottom: '0.5rem',
          }}
        >
          Integrations
        </h2>
        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '0.5rem',
          }}
        >
          Plug In Your Tools
        </p>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.6,
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: '2.5rem',
          }}
        >
          Connect the services you already use. Your accounts, your data — we just make them work harder.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
          }}
        >
          {[
            { name: 'Stripe', category: 'Payments' },
            { name: 'Square', category: 'POS' },
            { name: 'Toast', category: 'Restaurant POS' },
            { name: 'OpenTable', category: 'Reservations' },
            { name: 'Cloudbeds', category: 'Property Management' },
            { name: 'Mailchimp', category: 'Email' },
            { name: 'Google Analytics', category: 'Traffic' },
            { name: 'Meta Pixel', category: 'Retargeting' },
          ].map((tool) => (
            <div
              key={tool.name}
              style={{
                border: '1px solid var(--muted, #333)',
                padding: '1.25rem 1.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  margin: '0 0 0.2rem',
                  lineHeight: 1.3,
                }}
              >
                {tool.name}
              </p>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--accent, #c8943e)',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  opacity: 0.8,
                }}
              >
                {tool.category}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          borderTop: '1px solid var(--muted, #333)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          maxWidth: 600,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '1rem',
          }}
        >
          Run a business on the corridor?
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.7,
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          Free listings are free. Paid tiers start at $50/month. No contracts — month to
          month, cancel anytime. We&apos;ll build your profile, match your voice, and start
          putting your business in front of people who are already coming to the corridor.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/directory/submit"
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
            Get Listed
          </a>
          <a
            href="/directory/dashboard"
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
            Business Dashboard &rarr;
          </a>
        </div>
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.8rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.4,
          }}
        >
          listings@hillbillydreamsinc.com
        </p>
        <p
          style={{
            marginTop: '2rem',
            fontSize: '0.7rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.25,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Powered by Measurably Better · hillbillydreamsinc.com
        </p>
      </section>
    </main>
  );
}
