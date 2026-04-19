// apps/web/app/directory/page.tsx
// Deep South Directory — Business directory landing page
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Deep South Directory — Find locals. Get found.',
  description:
    'Get found by travelers and locals across the Deep South. Claim a free listing; add paid help when you want magazine, radio, and photo coverage.',
};

const HERO_GCS =
  'https://storage.googleapis.com/bmt-media-bigmuddy/approved/big-muddy/natchez/legacy-starter/04d36e95fe24.webp';

const CATEGORIES = [
  {
    name: 'Restaurants & Food',
    image: '/images/dsd/cat-restaurant.webp',
    count: 'Biscuits & Blues, The Camp, Cotton Alley, and more',
    desc: "From Regina's biscuits to gas station fried chicken. The Deep South eats.",
  },
  {
    name: 'Venues & Events',
    image: '/images/dsd/cat-venue.webp',
    count: 'Live rooms, event halls, supper clubs',
    desc: "Where the town gathers. Weddings, shows, private dining — places with history in the walls.",
  },
  {
    name: 'Hotels & Lodging',
    image: '/images/dsd/cat-hotel.webp',
    count: 'Big Muddy Inn, B&Bs, historic homes',
    desc: "Places to stay that have a story. Not chains — characters.",
  },
  {
    name: 'Shops & Retail',
    image: '/images/dsd/cat-shop.webp',
    count: 'Antiques, art, flowers, gifts',
    desc: "Main Street still works in these towns. Support the people who keep it open.",
  },
  {
    name: 'Tours & Experiences',
    image: '/images/dsd/cat-tour.webp',
    count: 'Walking tours, cooking classes, river excursions',
    desc: "The things you came here to do. We know who does them best.",
  },
  {
    name: 'Services',
    image: '/images/dsd/cat-service.webp',
    count: 'Barbershops, salons, contractors, professionals',
    desc: "The behind-the-scenes people who keep small-town businesses running.",
  },
];

const FEATURED_BUSINESSES = [
  {
    name: 'Biscuits & Blues',
    type: 'Restaurant / Cooking School',
    city: 'Natchez, MS',
    desc: "Built by Regina Charboneau, the Biscuit Queen of Natchez. Paris-trained technique, Mississippi soul.",
    image: '/images/dsd/southern-food.webp',
    articleSlug: 'reginas-biscuits-how-the-biscuit-queen-of-natchez-trained-in-paris-and-came-home',
  },
  {
    name: 'The Big Muddy Inn',
    type: 'Boutique Hotel',
    city: 'Natchez, MS',
    desc: "6 rooms in downtown Natchez. Every room has a story. No two are alike.",
    image: '/images/dsd/hotel-room.webp',
    articleSlug: null,
  },
  {
    name: 'Stanton Hall',
    type: 'Historic Venue / Event Space',
    city: 'Natchez, MS',
    desc: "Built in 1857. Maintained by the Pilgrimage Garden Club since 1938. National Historic Landmark.",
    image: '/images/dsd/hero-mainstreet.webp',
    articleSlug: 'save-the-hall-ball-pilgrimage-garden-clubs-fight-for-stanton-hall',
  },
  {
    name: "Beaumont's Barbershop",
    type: 'Barbershop',
    city: 'Natchez, MS',
    desc: "Three chairs, forty years on the same block. The kind of shop where everybody knows your name and your grandfather's name too.",
    image: null,
    articleSlug: null,
  },
  {
    name: 'Magnolia Antiques & Vintage',
    type: 'Antique Store',
    city: 'Port Gibson, MS',
    desc: "Four floors of furniture, maps, quilts, and things that belonged to someone who mattered. Open Thursday through Sunday.",
    image: null,
    articleSlug: null,
  },
  {
    name: 'River Bend Walking Tours',
    type: 'Tour Company',
    city: 'Natchez, MS',
    desc: "Two-hour walking tours of the historic district led by a licensed guide who grew up here. Not a script — a conversation.",
    image: null,
    articleSlug: null,
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Claim your listing',
    desc: 'Tell us who you are, where you are, and how people find you today. We handle the setup.',
    image: '/images/dsd/step-meet.webp',
  },
  {
    step: '02',
    title: 'Add your story',
    desc: 'Photos, hours, what makes you different — the details travelers and locals actually need.',
    image: '/images/dsd/step-voice.webp',
  },
  {
    step: '03',
    title: 'Get discovered',
    desc: 'Show up in the Deep South Directory and in the media work we do across the corridor.',
    image: '/images/dsd/step-publish.webp',
  },
];

const TIERS = [
  {
    name: 'Free',
    priceLabel: '$0',
    href: '/directory/onboard?tier=free',
    highlight: false,
    features: [
      'Listing on Deep South Directory',
      'Map, hours, and contact basics',
      'Visible to people browsing the region',
    ],
  },
  {
    name: 'Essentials',
    priceLabel: '$25/mo',
    href: '/directory/onboard?tier=essentials',
    highlight: false,
    features: [
      'Everything in Free',
      'Help keeping your details accurate',
      'Monthly snapshot of views and searches',
    ],
  },
  {
    name: 'Pro',
    priceLabel: '$50/mo',
    href: '/directory/onboard?tier=pro',
    highlight: false,
    features: [
      'Everything in Essentials',
      'More frequent check-ins on your listing',
      'Priority when we update corridor-wide content',
    ],
  },
  {
    name: 'Marketing',
    priceLabel: '$99/mo',
    href: '/directory/onboard?tier=marketing',
    highlight: false,
    features: [
      'Everything in Pro',
      'Social and review help on a steady cadence',
      'Eligibility for magazine and radio mentions',
    ],
  },
  {
    name: 'Engine',
    priceLabel: '$250/mo',
    href: '/directory/onboard?tier=engine',
    highlight: true,
    features: [
      'Everything in Marketing',
      'On-site photography when scheduled',
      'Direct line to the magazine and touring teams',
    ],
  },
];

export default function DirectoryPage() {
  return (
    <main style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={HERO_GCS}
            alt="The Mississippi River at Natchez"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
          />
          {/* Dark gradient overlay — bottom-heavy so text pops */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.92) 100%)',
            }}
          />
        </div>

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '5rem 1.5rem 4rem',
            maxWidth: 900,
            margin: '0 auto',
            width: '100%',
          }}
        >
          <p
            style={{
              color: 'var(--accent, #c8943e)',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '1.25rem',
            }}
          >
            Deep South Directory
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 700,
              color: 'color-mix(in srgb, var(--text-on-dark, #ffffff) 100%, transparent)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem',
              maxWidth: 760,
            }}
          >
            Get found by travelers and locals
            <br />
            <span style={{ color: 'var(--accent)' }}>in the Deep South.</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'color-mix(in srgb, var(--text-on-dark, #ffffff) 82%, transparent)',
              maxWidth: 560,
              lineHeight: 1.65,
              marginBottom: '2.5rem',
            }}
          >
            When someone looks for a place to eat, stay, or shop along the river corridor, your hours
            and story should be right — not buried or wrong. We help Main Street businesses show up
            where people already look.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="/directory/onboard"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2.25rem',
                background: 'var(--accent)',
                color: 'var(--bg)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.02em',
              }}
            >
              Claim Your Free Listing
            </a>
            <a
              href="#how-it-works"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2.25rem',
                border: '1px solid color-mix(in srgb, var(--text-on-dark, #ffffff) 50%, transparent)',
                color: 'var(--text-on-dark, #ffffff)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* ── OWNER PORTRAIT + WHY DSD ─────────────────────────── */}
      <section
        id="why-dsd"
        style={{
          padding: '5rem 1.5rem',
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* Photo side */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/5',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/dsd/restaurant-owner.webp"
            alt="Restaurant owner in the Deep South"
            fill
            style={{ objectFit: 'cover' }}
          />
          {/* Small accent label */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              background: 'var(--accent, #c8943e)',
              color: '#0a0a0a',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.35rem 0.75rem',
            }}
          >
            Member story
          </div>
        </div>

        {/* Text side */}
        <div>
          <p
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              marginBottom: '0.75rem',
            }}
          >
            Why Deep South Directory
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: 'var(--text)',
              margin: '0 0 1.25rem',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            We show up in person before we ask you to show up online.
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--text)',
              opacity: 0.65,
              lineHeight: 1.75,
              marginBottom: '2rem',
            }}
          >
            We run a magazine, a radio station, and a touring circuit — so your listing isn&apos;t a
            box we check once. It&apos;s tied into the same crew that writes the stories and books the
            rooms.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                desc: "Magazine editorial coverage. Radio mentions. Professional photography. That's a full-time PR agency at 1/10th the cost.",
              },
              {
                title: 'One subscription. Everything handled.',
                desc: "Listings synced across Google, Yelp, and major directories. Reviews monitored. Editorial spotlights. Monthly report in your inbox.",
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
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    margin: '0 0 0.3rem',
                  }}
                >
                  {bullet.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.82rem',
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
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section
        id="how-it-works"
        style={{
          background: 'color-mix(in srgb, var(--accent) 5%, transparent)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '5rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              marginBottom: '0.5rem',
            }}
          >
            How it works
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              color: 'var(--text)',
              margin: '0 0 3rem',
              lineHeight: 1.2,
            }}
          >
            Claim your listing. Add your story. Get discovered.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '2rem',
            }}
          >
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step}>
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '1/1',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      background: 'var(--accent, #c8943e)',
                      color: '#0a0a0a',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      padding: '0.2rem 0.5rem',
                    }}
                  >
                    {step.step}
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    margin: '0 0 0.4rem',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text)',
                    opacity: 0.6,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section
        id="listings"
        style={{
          padding: '5rem 1.5rem',
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
          Browse by Category
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 2.5rem',
            lineHeight: 1.2,
          }}
        >
          Every kind of business. One directory.
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
              {/* Category image */}
              <div
                style={{
                  position: 'relative',
                  height: 160,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.7) 100%)',
                  }}
                />
                <h3
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '1rem',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {cat.name}
                </h3>
              </div>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <p
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--accent, #c8943e)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.4,
                  }}
                >
                  {cat.count}
                </p>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text)',
                    opacity: 0.6,
                    lineHeight: 1.55,
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

      {/* ── FULL-WIDTH PHOTO BREAK ────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          height: '45vh',
          minHeight: 280,
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/dsd/mississippi-sunset.webp"
          alt="Mississippi at sunset"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,10,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <blockquote
            style={{
              textAlign: 'center',
              maxWidth: 640,
              padding: '0 1.5rem',
              margin: 0,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.3,
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              &ldquo;The things worth finding aren&apos;t always the ones that show up on the first page
              of Google. We fix that.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      {/* ── FEATURED BUSINESSES ──────────────────────────────── */}
      <section
        style={{
          padding: '5rem 1.5rem',
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
          Featured Listings
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 0.75rem',
            lineHeight: 1.2,
          }}
        >
          Businesses we&apos;ve written about, photographed, and know personally.
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text)',
            opacity: 0.55,
            marginBottom: '3rem',
            maxWidth: 560,
            lineHeight: 1.6,
          }}
        >
          These aren&apos;t paid placements. They&apos;re places we trust.
        </p>

        {/* Top 3 — large cards with photos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {FEATURED_BUSINESSES.filter((b) => b.image).map((biz) => (
            <div
              key={biz.name}
              style={{
                border: '1px solid var(--border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                <Image
                  src={biz.image!}
                  alt={biz.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    margin: '0 0 0.25rem',
                  }}
                >
                  {biz.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent, #c8943e)',
                    margin: '0 0 0.75rem',
                  }}
                >
                  {biz.type} &middot; {biz.city}
                </p>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text)',
                    opacity: 0.65,
                    lineHeight: 1.55,
                    margin: '0 0 1.25rem',
                    flex: 1,
                  }}
                >
                  {biz.desc}
                </p>
                {biz.articleSlug && (
                  <a
                    href={`/magazine/${biz.articleSlug}`}
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--accent, #c8943e)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--accent, #c8943e)',
                      paddingBottom: '0.15rem',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Read feature &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Remaining — compact list rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {FEATURED_BUSINESSES.filter((b) => !b.image).map((biz) => (
            <div
              key={biz.name}
              style={{
                borderTop: '1px solid var(--border)',
                padding: '1.5rem 0',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'start',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    margin: '0 0 0.2rem',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {biz.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent, #c8943e)',
                    margin: '0 0 0.5rem',
                  }}
                >
                  {biz.type} &middot; {biz.city}
                </p>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text)',
                    opacity: 0.6,
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
                    fontSize: '0.78rem',
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
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <a
              href="/directory"
              style={{
                fontSize: '0.82rem',
                color: 'var(--accent, #c8943e)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--accent, #c8943e)',
                paddingBottom: '0.15rem',
              }}
            >
              Browse all listings &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── PRICING TIERS ────────────────────────────────────── */}
      <section
        style={{
          padding: '5rem 1.5rem',
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
          Directory Membership
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 0.75rem',
            lineHeight: 1.2,
          }}
        >
          More than a listing. A marketing partner.
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text)',
            opacity: 0.6,
            lineHeight: 1.7,
            maxWidth: 600,
            marginBottom: '3rem',
          }}
        >
          The companies charging $300 a month have never set foot in Port Gibson. We have. Higher
          tiers plug you into magazine coverage, radio mentions, and professional photography — real
          media, not another dashboard. We&apos;re a small team and we don&apos;t promise what we
          can&apos;t deliver.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
                    fontSize: '0.62rem',
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
                  fontSize: '0.72rem',
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
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: '0 0 1.5rem',
                  lineHeight: 1.1,
                }}
              >
                {tier.priceLabel}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', flex: 1 }}>
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text)',
                      opacity: 0.7,
                      lineHeight: 1.5,
                      padding: '0.3rem 0',
                      paddingLeft: '1.25rem',
                      borderBottom: '1px solid var(--border)',
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
                  fontSize: '0.78rem',
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

      {/* ── INTEGRATIONS ─────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
          padding: '4rem 1.5rem',
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
          Integrations
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}
        >
          Connects to the tools you already use
        </h2>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text)',
            opacity: 0.55,
            lineHeight: 1.65,
            maxWidth: 520,
            marginBottom: '2rem',
          }}
        >
          Your accounts, your data — we just make them work harder.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
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
                padding: '0.6rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                }}
              >
                {tool.name}
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--accent, #c8943e)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  opacity: 0.8,
                }}
              >
                {tool.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA — photo background ────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          marginTop: '3rem',
        }}
      >
        {/* Background photo */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/dsd/southern-food.webp"
            alt="Deep South food and hospitality"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10,10,10,0.82)',
            }}
          />
        </div>

        {/* CTA content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '6rem 1.5rem',
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent, #c8943e)',
              marginBottom: '1rem',
            }}
          >
            Get listed today
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.25rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Your business deserves to be famous.
            <br />
            <span style={{ color: 'var(--accent, #c8943e)' }}>Not just findable.</span>
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.65,
              marginBottom: '2.5rem',
              maxWidth: 520,
              margin: '0 auto 2.5rem',
            }}
          >
            Free to list. No long contracts. No setup fees. We&apos;ll build your profile, manage
            your listings, and put you in front of people already planning trips and nights out in
            the Deep South.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/directory/onboard"
              style={{
                display: 'inline-block',
                padding: '0.9rem 2.5rem',
                background: 'var(--accent, #c8943e)',
                color: '#0a0a0a',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.02em',
              }}
            >
              Claim Your Listing — Free
            </a>
            <a
              href="/directory/dashboard"
              style={{
                display: 'inline-block',
                padding: '0.9rem 2.5rem',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#ffffff',
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
              marginTop: '1.75rem',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            hello@deepsouthdirectory.com
          </p>
          <p
            style={{
              marginTop: '1.25rem',
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Deep South Directory &middot; Natchez, Mississippi
          </p>
        </div>
      </section>
    </main>
  );
}
