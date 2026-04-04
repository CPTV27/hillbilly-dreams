// apps/web/app/directory/page.tsx
// Deep South Directory — Business directory landing page
import type { Metadata } from 'next';
import { IllustrationDivider } from '@bigmuddy/ui';
import {
  getCorridorArtistsPublic,
  recordsArtistProfileUrl,
} from '@/lib/corridor-artists-public';

export const metadata: Metadata = {
  title: 'Deep South Directory — Main Street Marketing for Main Street Money',
  description:
    'The only marketing platform with a magazine, radio station, and photography studio built in. Local marketing made by people who actually live here.',
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

// Tier names and benefits are canonical; dollar amounts stay off the site until pricing is set.
// Onboard captures intent via ?tier=free|core|growth|partner

const TIERS = [
  {
    name: 'Free',
    priceLabel: 'Free',
    href: '/directory/onboard?tier=free',
    highlight: false,
    features: [
      'Business listing on the directory',
      'Google review alerts',
      'Basic monthly report',
      'Visible to visitors searching the corridor',
      'Part of the Big Muddy network',
    ],
  },
  {
    name: 'Core',
    priceLabel: 'Pricing TBD',
    href: '/directory/onboard?tier=core',
    highlight: false,
    features: [
      'Everything in Free',
      'AI assistant trained on your business and your town',
      'Local context — not generic internet answers',
      'Help visitors with common questions',
      'Content ideas on demand',
    ],
  },
  {
    name: 'Growth',
    priceLabel: 'Pricing TBD',
    href: '/directory/onboard?tier=growth',
    highlight: false,
    features: [
      'Everything in Core',
      'Social posting cadence (e.g. several posts per week)',
      'Publishing to Facebook, Instagram, and Google surfaces',
      'Content calendar',
      'Detailed monthly report',
      'Email support',
    ],
  },
  {
    name: 'Partner',
    priceLabel: 'Pricing TBD',
    href: '/directory/onboard?tier=partner',
    highlight: true,
    features: [
      'Everything in Growth',
      'AI-assisted review response drafts',
      'Competitor watch (limited set)',
      'Custom social posts and scheduling',
      'Magazine and radio exposure when our production calendar allows',
      'On-site photography for your business when schedule allows',
      'Full analytics dashboard',
      'Direct line to our team',
    ],
  },
];

function truncateBio(text: string | null, max = 140): string | null {
  if (!text?.trim()) return null;
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
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
        {/* Background removed — clean dark surface */}
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
          Main Street marketing
          <br />
          <span style={{ color: 'var(--accent, #c8943e)' }}>for Main Street money.</span>
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
          Right now, someone in your town is searching for a restaurant, a hotel, or a shop like yours on Google. If your listing has wrong hours, no photos, or zero reviews — they&apos;re picking your competitor. We fix that.
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
            href="#why-dsd"
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
            Why DSD
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
          We&apos;re not a software company. We&apos;re a media company that sells software at software prices.
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
          Every other marketing tool manages what people find when they search for you. We also create the content that makes you worth finding. We own a magazine. A radio station. A photography studio. And a touring circuit that brings audiences through your door.
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
              title: "We're from here.",
              desc: "DSD is run by people who live, eat, and work in the same small towns our clients do. We probably ate at your restaurant last week.",
            },
            {
              title: 'We cost less than a single Yelp ad.',
              desc: "Birdeye starts at $299. Thryv starts at $244. You get more from DSD for less — and no sales call to find out the price.",
            },
            {
              title: 'We give you media, not just software.',
              desc: "Magazine editorial coverage. Radio mentions. Professional photography. That's not a feature. That's a full-time PR agency at 1/10th the cost.",
            },
            {
              title: 'One subscription. Everything handled.',
              desc: 'Listings synced across Google, Yelp, Facebook, and 50+ directories. Reviews monitored. Social content posted. Monthly report in your inbox.',
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

      {/* Corridor musicians — Prisma-backed roster (public statuses only) */}
      <section
        id="musicians"
        style={{
          borderTop: '1px solid var(--border)',
          padding: '3rem 1.5rem',
          maxWidth: 1000,
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
          Corridor musicians
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 0.75rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          Talent on the route — tied into radio, rooms, and records.
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            maxWidth: 640,
            margin: '0 0 2rem',
          }}
        >
          These are artists already moving through the Big Muddy network — showcases, touring, and
          the label pipeline. The directory isn&apos;t only storefronts; it&apos;s the whole corridor
          stack working together.
        </p>
        {corridorArtists.length === 0 ? (
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 560,
            }}
          >
            Public roster entries appear here as artists graduate into showcases and routed work.
            Musicians can{' '}
            <a href="/directory/onboard/musician" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              get on the list
            </a>
            ; talent and booking also run through{' '}
            <a
              href="https://bigmuddytouring.com"
              style={{ color: 'var(--accent)', fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Big Muddy Touring
            </a>
            .
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {corridorArtists.map((a) => (
              <a
                key={a.id}
                href={recordsArtistProfileUrl(a.slug)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '1.25rem 1.35rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'var(--surface)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <p
                  style={{
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--accent)',
                    margin: '0 0 0.35rem',
                    fontWeight: 700,
                  }}
                >
                  {a.genre?.replace(/-/g, ' ') ?? 'Corridor artist'}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    margin: '0 0 0.35rem',
                    lineHeight: 1.25,
                  }}
                >
                  {a.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>
                  {a.city}, {a.state}
                </p>
                {truncateBio(a.bio) && (
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {truncateBio(a.bio)}
                  </p>
                )}
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '0.85rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    borderBottom: '1px solid var(--accent)',
                    paddingBottom: 2,
                  }}
                >
                  Artist profile ↗
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Editorial Surface */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
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
            color: 'var(--text)',
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
              label: 'From the Corridor',
              title: 'Where Does the Money Go?',
              desc: 'Most of the money spent in small Southern towns leaves before the week is out. We looked at why — and what local businesses can do about it.',
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
                border: '1px solid var(--border)',
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
                  color: 'var(--text)',
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
                  color: 'var(--text)',
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
                border: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--accent, #c8943e)',
                  background: 'rgba(200, 148, 62, 0.06)',
                  borderBottom: '1px solid var(--border)',
                  letterSpacing: '0.05em',
                }}
              >
                {cat.icon}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text)',
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
                    color: 'var(--text)',
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
          borderTop: '1px solid var(--border)',
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
            color: 'var(--text)',
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
                border: '1px solid var(--border)',
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
                    color: 'var(--text)',
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
                    color: 'var(--text)',
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
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}
        >
          More than a listing. A marketing partner.
        </p>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text)',
            opacity: 0.6,
            lineHeight: 1.7,
            maxWidth: 600,
            marginBottom: '2.5rem',
          }}
        >
          The companies charging $300 a month have never set foot in Port Gibson. We have. Higher tiers plug you into magazine coverage, radio mentions, and professional photography — real media, not another dashboard. We&apos;re a small team and we don&apos;t promise what we can&apos;t deliver.
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
                border: tier.highlight
                  ? '2px solid var(--accent, #c8943e)'
                  : '1px solid var(--border)',
                padding: '2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {tier.highlight && (
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
                  Full network
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
                  color: 'var(--text)',
                  margin: '0 0 1.5rem',
                  lineHeight: 1.1,
                }}
              >
                {tier.priceLabel}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem' }}>
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text)',
                      opacity: 0.7,
                      lineHeight: 1.5,
                      padding: '0.3rem 0',
                      paddingLeft: '1.25rem',
                      borderBottom: '1px solid var(--border-subtle)',
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
              <a
                href={tier.href}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.75rem 1.5rem',
                  background: tier.highlight ? 'var(--accent, #c8943e)' : 'transparent',
                  color: tier.highlight ? '#0a0a0a' : 'var(--accent, #c8943e)',
                  border: tier.highlight ? 'none' : '1px solid var(--accent, #c8943e)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  marginTop: 'auto',
                }}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Plug In Your Tools */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
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
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}
        >
          Plug In Your Tools
        </p>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text)',
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
                border: '1px solid var(--border)',
                padding: '1.25rem 1.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text)',
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
          borderTop: '1px solid var(--border)',
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
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          Your business deserves to be famous. Not just findable.
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text)',
            opacity: 0.7,
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          Free to list. No long contracts. No setup fees. We&apos;ll build your profile, manage your listings, and put you in front of people already planning trips and nights out on the corridor. Pricing is flexible while we onboard founding members.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
            Get started
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
            color: 'var(--text)',
            opacity: 0.4,
          }}
        >
          listings@hillbillydreamsinc.com
        </p>
        <p
          style={{
            marginTop: '2rem',
            fontSize: '0.7rem',
            color: 'var(--text)',
            opacity: 0.25,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Deep South Directory · Natchez, Mississippi
        </p>
      </section>
    </main>
  );
}
