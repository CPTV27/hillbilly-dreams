// apps/web/app/touring/inn/weddings/page.tsx
// Destination wedding packages for The Big Muddy Inn — Natchez, MS

import type { Metadata } from 'next';

// Skip static generation — this 1161-line page times out the SSG worker
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Weddings at The Big Muddy Inn — Natchez, MS',
  description:
    'Intimate destination weddings in historic Natchez, Mississippi. Six rooms, live blues, professional photography, and the whole Mississippi corridor as your backdrop. Packages from $4,500.',
};

/* ─────────────────────────────────────────────── *
 *  DATA                                           *
 * ─────────────────────────────────────────────── */

interface PackageFeature {
  text: string;
}

interface WeddingPackage {
  id: string;
  name: string;
  capacity: string;
  price: string;
  tag?: string;
  features: PackageFeature[];
}

interface AddOn {
  name: string;
  price: string;
}

interface Vendor {
  category: string;
  name: string;
  note: string;
}

const PACKAGES: WeddingPackage[] = [
  {
    id: 'intimate',
    name: 'Intimate',
    capacity: 'Up to 20 guests',
    price: 'Starting at $4,500',
    features: [
      { text: 'Full inn buyout (6 rooms, 2 nights)' },
      { text: 'Blues Room ceremony or reception' },
      { text: 'Front porch cocktail hour' },
      { text: 'Live acoustic music by Arrie Aslin' },
      { text: 'Photography by Chase Pierson (4 hours)' },
      { text: 'Wedding coordination' },
      { text: 'Welcome basket for each room' },
    ],
  },
  {
    id: 'full-muddy',
    name: 'The Full Muddy',
    capacity: 'Up to 40 guests',
    price: 'Starting at $8,500',
    tag: 'Most Popular',
    features: [
      { text: 'Everything in Intimate' },
      { text: 'Extended photography (8 hours, next-day portraits)' },
      { text: 'Rehearsal dinner coordination' },
      { text: 'Live band for reception' },
      { text: 'Professional video highlights (3–5 min edit)' },
      { text: 'Social media content package' },
      { text: 'Vendor coordination with Natchez partners' },
      { text: 'Day-of coordination' },
    ],
  },
  {
    id: 'corridor',
    name: 'The Corridor',
    capacity: 'Multi-Day, Up to 60 guests',
    price: 'Starting at $15,000',
    features: [
      { text: 'Everything in The Full Muddy' },
      { text: '3-night inn buyout' },
      { text: 'Welcome dinner + farewell brunch' },
      { text: 'Big Muddy Touring transportation (vintage bus for wedding party)' },
      { text: 'Full photography + videography (2 days)' },
      { text: 'Coffee table book of wedding photos' },
      { text: 'Magazine-quality feature article about your wedding' },
      { text: 'Streaming/recording of ceremony' },
      { text: 'Coordination with overflow lodging at partner properties' },
    ],
  },
];

const ADD_ONS: AddOn[] = [
  { name: 'Additional photography hours', price: '$250/hr' },
  { name: 'Stanton Hall ceremony venue', price: 'Coordinated pricing' },
  { name: 'Under-the-Hill Saloon rehearsal dinner', price: 'Coordinated pricing' },
  { name: 'Hair & makeup team', price: '$150/person' },
  { name: 'Custom playlist curation by Big Muddy Radio', price: '$250' },
  { name: 'Bridal portrait session', price: '$500' },
  { name: 'Engagement shoot in downtown Natchez', price: '$750' },
];

const VENDORS: Vendor[] = [
  { category: 'Florist', name: 'The Anthologist', note: 'Flowers and venue — they do both' },
  { category: 'Catering', name: 'Local restaurant partners', note: 'We coordinate with the best in Natchez' },
  { category: 'Bakery', name: 'Custom wedding cakes', note: 'Local bakers, made to order' },
  { category: 'Bridal', name: 'Local bridal shop partner', note: 'On-call for fittings and alterations' },
  { category: 'Hair & Makeup', name: 'On-call team', note: 'Available for full wedding party' },
  { category: 'Officiant', name: 'Network of local officiants', note: 'Religious, civil, and custom ceremonies' },
  { category: 'Rentals', name: 'Tables, chairs, linens, tents', note: 'Full setup and breakdown included' },
  { category: 'Music', name: 'Big Muddy Records artists', note: 'Live music sourced from our own label' },
  { category: 'Transportation', name: 'Big Muddy Touring', note: 'Vintage bus for the wedding party' },
  { category: 'Photography', name: 'Chase Pierson', note: 'Included in every package' },
];

const GALLERY_IMAGES = [
  {
    src: '/images/corridor/inn-hallway-gathering.webp',
    alt: 'The Big Muddy Inn hallway — six rooms opening onto the corridor',
  },
  {
    src: '/images/corridor/fire-pit-gathering.webp',
    alt: 'Evening gathering around a fire pit — the kind of night your guests will talk about',
  },
  {
    src: '/images/corridor/natchez-night-lounge.webp',
    alt: 'Natchez after dark — the Blues Room at night',
  },
  {
    src: '/images/corridor/natchez-bluff-river-view.webp',
    alt: 'The Mississippi River from the Natchez bluff — your wedding backdrop',
  },
];

/* ─────────────────────────────────────────────── *
 *  PAGE                                           *
 * ─────────────────────────────────────────────── */

export default function WeddingsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: '#0a0a0a',
          padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 60px)',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/corridor/oceansprings-natchez-580-of-1183.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0,
          }}
          role="presentation"
          aria-hidden="true"
        />
        {/* Gradient vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.85) 100%)',
            zIndex: 1,
          }}
          aria-hidden="true"
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 760,
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--accent, #c8943e)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
          >
            <span style={{ opacity: 0.6 }}>&#9670;</span>
            <span>Big Muddy Inn Weddings</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              color: 'var(--fg, #f5f0eb)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 1.1,
              margin: '0 0 var(--space-6)',
              textShadow: '0 2px 40px rgba(0,0,0,0.6)',
            }}
          >
            Get married where<br />
            <em style={{ color: 'var(--accent, #c8943e)', fontStyle: 'italic' }}>
              the river bends.
            </em>
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(245,240,235,0.72)',
              lineHeight: 1.7,
              maxWidth: 580,
              margin: '0 0 var(--space-10)',
            }}
          >
            Intimate weddings in a historic Natchez inn. Six rooms, live blues, a
            photographer who lives here, and the whole Mississippi corridor as your
            backdrop.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <a
              href="#packages"
              className="cta-hover"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: 'var(--accent, #c8943e)',
                color: '#0a0a0a',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
                transition: 'opacity 0.2s',
              }}
            >
              View Packages
            </a>
            <a
              href="mailto:weddings@bigmuddyinn.com"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: 'transparent',
                color: 'var(--accent, #c8943e)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1.5px solid var(--accent, #c8943e)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Schedule a Tour
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Natchez ── */}
      <section
        style={{
          background: '#0a0a0a',
          borderTop: '1px solid var(--muted, #333)',
          borderBottom: '1px solid var(--muted, #333)',
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Section label */}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--accent, #c8943e)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
            }}
          >
            Why Natchez
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--fg, #f5f0eb)',
              letterSpacing: 'var(--tracking-tight)',
              margin: '0 0 var(--space-4)',
            }}
          >
            The most photogenic small town on the Mississippi.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'rgba(245,240,235,0.6)',
              lineHeight: 1.7,
              maxWidth: 620,
              margin: '0 0 clamp(40px, 6vw, 72px)',
            }}
          >
            Natchez has been throwing parties for 300 years. It knows how.
          </p>

          {/* 3-column selling points */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {[
              {
                number: '01',
                title: 'History You Can Touch',
                body: 'Antebellum architecture, National Historic Landmarks, the oldest settlement on the Mississippi. Your venue is the city itself — every street corner is a photo backdrop.',
              },
              {
                number: '02',
                title: 'Small Town, Big Moment',
                body: 'No traffic, no crowds. Your wedding is the event, not one of a thousand. When you book the inn, you book the neighborhood. The whole town notices.',
              },
              {
                number: '03',
                title: 'The Whole Weekend',
                body: "This isn't a venue rental. It's a multi-day experience for your closest people. Friday night cocktails on the bluff. Saturday ceremony. Sunday brunch before everyone drives home slow.",
              },
            ].map((point) => (
              <div
                key={point.number}
                style={{
                  borderTop: '2px solid var(--accent, #c8943e)',
                  paddingTop: 'var(--space-6)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--accent, #c8943e)',
                    letterSpacing: 'var(--tracking-widest)',
                    opacity: 0.6,
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {point.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 700,
                    color: 'var(--fg, #f5f0eb)',
                    margin: '0 0 var(--space-3)',
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(245,240,235,0.6)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Arrie Aslin photo break ── */}
      <div
        style={{
          width: '100%',
          height: 'clamp(200px, 30vw, 380px)',
          backgroundImage: 'url(/images/arrie-aslin/ta-c2-228-of-955.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          opacity: 0.7,
          borderTop: '1px solid var(--muted, #333)',
          borderBottom: '1px solid var(--muted, #333)',
        }}
        role="img"
        aria-label="Arrie Aslin, resident musician at The Big Muddy Inn"
      />

      {/* ── Packages ── */}
      <section
        id="packages"
        style={{
          background: '#0a0a0a',
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)',
        }}
      >
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--accent, #c8943e)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-3)',
              }}
            >
              Wedding Packages
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--fg, #f5f0eb)',
                letterSpacing: 'var(--tracking-tight)',
                margin: '0 0 var(--space-4)',
              }}
            >
              Choose your weekend.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'rgba(245,240,235,0.6)',
                lineHeight: 1.7,
                maxWidth: 560,
                margin: 0,
              }}
            >
              Every package includes full inn buyout, wedding coordination, and access to the
              Big Muddy media network. Start small, add on, or go all the way.
            </p>
          </div>

          {/* Package cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
              alignItems: 'start',
            }}
          >
            {PACKAGES.map((pkg) => {
              const isPopular = Boolean(pkg.tag);
              return (
                <article
                  key={pkg.id}
                  style={{
                    background: isPopular ? 'rgba(200,148,62,0.06)' : 'rgba(245,240,235,0.03)',
                    border: isPopular
                      ? '1.5px solid var(--accent, #c8943e)'
                      : '1px solid var(--muted, #333)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'clamp(24px, 3vw, 36px)',
                    position: 'relative',
                  }}
                >
                  {/* Popular tag */}
                  {isPopular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -13,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--accent, #c8943e)',
                        color: '#0a0a0a',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        letterSpacing: 'var(--tracking-widest)',
                        textTransform: 'uppercase',
                        padding: '4px 16px',
                        borderRadius: '100px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {pkg.tag}
                    </div>
                  )}

                  {/* Capacity */}
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: isPopular ? 'var(--accent, #c8943e)' : 'rgba(245,240,235,0.4)',
                      letterSpacing: 'var(--tracking-widest)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {pkg.capacity}
                  </div>

                  {/* Package name */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                      fontWeight: 700,
                      color: 'var(--fg, #f5f0eb)',
                      letterSpacing: 'var(--tracking-tight)',
                      margin: '0 0 var(--space-2)',
                    }}
                  >
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                      fontWeight: 700,
                      color: 'var(--accent, #c8943e)',
                      marginBottom: 'var(--space-6)',
                      paddingBottom: 'var(--space-6)',
                      borderBottom: '1px solid var(--muted, #333)',
                    }}
                  >
                    {pkg.price}
                  </div>

                  {/* Feature list */}
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: '0 0 var(--space-8)',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                    }}
                    aria-label={`${pkg.name} package features`}
                  >
                    {pkg.features.map((feature) => (
                      <li
                        key={feature.text}
                        style={{
                          display: 'flex',
                          gap: 'var(--space-3)',
                          alignItems: 'flex-start',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'rgba(245,240,235,0.72)',
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: 'var(--accent, #c8943e)',
                            flexShrink: 0,
                            marginTop: 2,
                            fontWeight: 700,
                          }}
                          aria-hidden="true"
                        >
                          &#10003;
                        </span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="mailto:weddings@bigmuddyinn.com"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '13px 24px',
                      background: isPopular ? 'var(--accent, #c8943e)' : 'transparent',
                      color: isPopular ? '#0a0a0a' : 'var(--accent, #c8943e)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 700,
                      letterSpacing: 'var(--tracking-wide)',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      border: '1.5px solid var(--accent, #c8943e)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    Inquire About {pkg.name}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Add-Ons ── */}
      <section
        style={{
          background: 'rgba(245,240,235,0.02)',
          borderTop: '1px solid var(--muted, #333)',
          borderBottom: '1px solid var(--muted, #333)',
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--accent, #c8943e)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
            }}
          >
            A La Carte
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--fg, #f5f0eb)',
              letterSpacing: 'var(--tracking-tight)',
              margin: '0 0 var(--space-4)',
            }}
          >
            Add-Ons
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'rgba(245,240,235,0.6)',
              lineHeight: 1.7,
              margin: '0 0 clamp(32px, 5vw, 52px)',
            }}
          >
            Build the weekend exactly as you want it.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {ADD_ONS.map((addon, i) => (
              <div
                key={addon.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 'var(--space-6)',
                  padding: 'var(--space-5) 0',
                  borderBottom:
                    i < ADD_ONS.length - 1 ? '1px solid rgba(245,240,235,0.08)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--fg, #f5f0eb)',
                    lineHeight: 1.4,
                  }}
                >
                  {addon.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    color: 'var(--accent, #c8943e)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vendor Network ── */}
      <section
        style={{
          background: '#0a0a0a',
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--accent, #c8943e)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
            }}
          >
            Vendor Partners
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--fg, #f5f0eb)',
              letterSpacing: 'var(--tracking-tight)',
              margin: '0 0 var(--space-3)',
            }}
          >
            The Natchez Wedding Network
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'rgba(245,240,235,0.6)',
              lineHeight: 1.7,
              maxWidth: 580,
              margin: '0 0 clamp(40px, 6vw, 64px)',
            }}
          >
            We work with the best vendors in town. You get one point of contact — we
            handle the rest.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {VENDORS.map((vendor) => (
              <div
                key={vendor.category}
                style={{
                  background: 'rgba(245,240,235,0.03)',
                  border: '1px solid var(--muted, #333)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-5)',
                  transition: 'border-color 0.2s',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--accent, #c8943e)',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {vendor.category}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    color: 'var(--fg, #f5f0eb)',
                    marginBottom: 'var(--space-2)',
                    lineHeight: 1.3,
                  }}
                >
                  {vendor.name}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(245,240,235,0.45)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {vendor.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ── */}
      <section
        style={{
          background: 'rgba(245,240,235,0.02)',
          borderTop: '1px solid var(--muted, #333)',
          borderBottom: '1px solid var(--muted, #333)',
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--accent, #c8943e)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
            }}
          >
            The Big Muddy Treatment
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--fg, #f5f0eb)',
              letterSpacing: 'var(--tracking-tight)',
              margin: '0 0 var(--space-4)',
            }}
          >
            Every wedding gets the full production.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'rgba(245,240,235,0.6)',
              lineHeight: 1.7,
              maxWidth: 620,
              margin: '0 0 clamp(40px, 6vw, 56px)',
            }}
          >
            Professional photography. Video highlights. Social-ready content. A magazine
            article if you want one. We&rsquo;re a media company that happens to have an inn
            — your wedding gets the full production.
          </p>

          {/* 4-image grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--space-3)',
            }}
          >
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.src}
                style={{
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--muted, #333)',
                }}
                role="img"
                aria-label={img.alt}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${img.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.4s ease',
                  }}
                />
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(245,240,235,0.3)',
              marginTop: 'var(--space-4)',
              textAlign: 'center',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            Real wedding photos will replace these. The locations are real. The light is real.
          </p>
        </div>
      </section>

      {/* ── Testimonial Placeholder ── */}
      <section
        style={{
          background: '#0a0a0a',
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)',
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: 'var(--accent, #c8943e)',
              opacity: 0.25,
              lineHeight: 1,
              marginBottom: 'var(--space-4)',
              fontStyle: 'italic',
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <blockquote
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--fg, #f5f0eb)',
                lineHeight: 1.65,
                margin: '0 0 var(--space-8)',
              }}
            >
              We don&rsquo;t have testimonials yet because we haven&rsquo;t done a wedding.
              But we have 6 rooms, a resident musician, a professional photographer, and the
              most photogenic small town on the Mississippi. Book the first one.
            </p>
            <footer>
              <cite
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: 'var(--accent, #c8943e)',
                  letterSpacing: 'var(--tracking-wide)',
                  fontStyle: 'normal',
                  textTransform: 'uppercase',
                }}
              >
                Chase Pierson, The Big Muddy Inn
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{
          background: '#0a0a0a',
          borderTop: '1px solid var(--muted, #333)',
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)',
        }}
      >
        <div
          style={{
            maxWidth: 700,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--accent, #c8943e)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
            }}
          >
            Let&rsquo;s Talk
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              color: 'var(--fg, #f5f0eb)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 1.15,
              margin: '0 0 var(--space-5)',
            }}
          >
            Let&rsquo;s talk about<br />
            <em style={{ color: 'var(--accent, #c8943e)', fontStyle: 'italic' }}>
              your wedding.
            </em>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'rgba(245,240,235,0.6)',
              lineHeight: 1.7,
              margin: '0 0 clamp(28px, 4vw, 48px)',
            }}
          >
            Every wedding at The Big Muddy Inn starts with a conversation. Tell us about
            your people, your vision, and when you&rsquo;re thinking. We&rsquo;ll build the
            weekend around you.
          </p>

          {/* Contact details */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <a
              href="mailto:weddings@bigmuddyinn.com"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--fg, #f5f0eb)',
                textDecoration: 'none',
                opacity: 0.75,
              }}
            >
              weddings@bigmuddyinn.com
            </a>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'rgba(245,240,235,0.35)',
              }}
            >
              Phone: Coming soon
            </span>
          </div>

          <a
            href="mailto:weddings@bigmuddyinn.com"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              background: 'var(--accent, #c8943e)',
              color: '#0a0a0a',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Start Planning
          </a>

          {/* Ornament */}
          <div
            style={{
              marginTop: 'clamp(40px, 6vw, 64px)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              opacity: 0.2,
            }}
            aria-hidden="true"
          >
            <div style={{ height: 1, width: 80, background: 'var(--fg, #f5f0eb)' }} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-sm)',
                color: 'var(--fg, #f5f0eb)',
                letterSpacing: 'var(--tracking-widest)',
              }}
            >
              &#9670;
            </span>
            <div style={{ height: 1, width: 80, background: 'var(--fg, #f5f0eb)' }} />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(245,240,235,0.25)',
              marginTop: 'var(--space-4)',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            The Big Muddy Inn &amp; Blues Room &middot; 411 N Commerce Street &middot; Natchez, MS
          </p>
        </div>
      </section>
      <style>{`.cta-hover:hover { opacity: 0.85; }`}</style>
    </>
  );
}
