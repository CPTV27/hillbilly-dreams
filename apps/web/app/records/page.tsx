// apps/web/app/records/page.tsx
// Big Muddy Records — Landing page

const ROSTER = [
  {
    name: 'Amy Allen',
    genre: 'Soul / Blues / Storytelling',
    description:
      'Songs that carry the weight of the corridor — the Rhythm Nightclub Fire, the river towns, the people who stayed.',
    status: 'Active',
  },
  {
    name: 'Mechanical Bull',
    genre: 'Alt-Country / Southern Rock',
    description:
      'Country, southern rock, and 70s California guitar tone out of Woodstock, NY. Chase Pierson, Avalon Peacock, Adam Widoff, Dave Malachowski, Chris Zaloom, George Quinn, J-Bird Bowman, Josh Pierson — and John Medeski on organ. Two albums deep.',
    status: 'Active',
  },
  {
    name: 'Kate Squire',
    genre: 'Folk / Americana / Singer-Songwriter',
    description:
      'Quiet songs that hit hard. Kate writes like she\'s telling you something she\'s only going to say once — spare arrangements, honest vocals, stories that stick.',
    status: 'Active',
  },
  {
    name: 'Arrie Aslin',
    genre: 'Americana / Parlor Folk / Blues',
    description:
      'Artist-in-Residence at the Big Muddy Inn. Arrie hosts the Blues Room sessions, curates the American Parlor Songbook, and records the kind of music that belongs in a room with good light and old wood.',
    status: 'Coming Soon',
  },
];

const UPCOMING_SESSIONS = [
  {
    title: 'Blues Room Live — Open Mic Night',
    date: 'Every Friday',
    location: 'The Big Muddy Inn, Natchez',
    description: 'Drop in. Plug in. Play. We record everything.',
  },
  {
    title: 'Porch Sessions',
    date: 'Spring 2026',
    location: 'Various — Natchez porches',
    description:
      'Acoustic recordings on front porches across Natchez. The cicadas are part of the mix.',
  },
  {
    title: 'Corridor Sessions',
    date: 'Summer 2026',
    location: 'Memphis to New Orleans',
    description:
      'Road recordings at juke joints, churches, and living rooms along Highway 61. The label hits the road.',
  },
];

const ECOSYSTEM = [
  {
    name: 'Big Muddy Radio',
    url: 'https://bigmuddyradio.com',
    role: 'Playlists, live sessions, podcast — your release gets airtime before it drops.',
  },
  {
    name: 'Big Muddy Magazine',
    url: 'https://bigmuddymagazine.com',
    role: 'Features, interviews, photo essays — earned media, not just paid ads.',
  },
  {
    name: 'Big Muddy Touring',
    url: 'https://bigmuddytouring.com',
    role: 'The Inn, the route, the audience already in the room when you arrive.',
  },
  {
    name: 'BuyCurious Art',
    url: 'https://buycuriousart.com',
    role: 'Art marketplace — merch, prints, limited vinyl. A second revenue channel.',
  },
];

export default function RecordsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem 1.5rem',
          maxWidth: 900,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Hero background image */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://storage.googleapis.com/bmt-media-bigmuddy/heroes/records-hero.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
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
          Natchez, Mississippi
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          The sound of
          <br />
          <span style={{ color: 'var(--accent, #c8943e)' }}>the river.</span>
        </h1>
        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.7,
            maxWidth: 600,
            lineHeight: 1.6,
            marginTop: '2rem',
          }}
        >
          Big Muddy Records is an independent label based in Natchez, Mississippi.
          We record the music that lives along the Mississippi corridor and give artists
          the infrastructure of a full media ecosystem — without taking their masters.
        </p>
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="/records/artists"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'var(--accent, #c8943e)',
              color: '#0a0a0a',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
            }}
          >
            Meet the Artists
          </a>
          <a
            href="/records/sessions"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              border: '1px solid var(--accent, #c8943e)',
              color: 'var(--accent, #c8943e)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
            }}
          >
            Live Sessions
          </a>
        </div>
      </section>

      {/* Why another label */}
      <section
        style={{
          borderTop: '1px solid var(--muted, #333)',
          padding: '4rem 1.5rem',
          maxWidth: 700,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '1.5rem',
          }}
        >
          Why another label?
        </h2>
        <div
          style={{
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.75,
            lineHeight: 1.8,
            fontSize: '1rem',
          }}
        >
          <p>
            The Mississippi corridor between Memphis and New Orleans produced more
            American music per mile than anywhere on earth. That music is still being
            made — in living rooms in Clarksdale, on front porches in Natchez, in the
            back of churches in Vicksburg. By people who play because they have to.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Traditional labels take your masters, lock you into multi-album deals, and
            charge you for the marketing they promised. You recoup for years. You
            own nothing.
          </p>
          <p style={{ marginTop: '1rem' }}>
            We do it differently. Artists own their masters from day one. Marketing
            services are included. The ecosystem — Radio, Magazine, the Inn, the touring
            route — amplifies your release without burning your budget on ad spend.
            Twelve months at a time. No multi-year lock-in.
          </p>
          <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--accent, #c8943e)' }}>
            Artists own their masters. Always. No exceptions.
          </p>
        </div>
      </section>

      {/* Photo break — Anthologist turntable */}
      <div
        style={{
          width: '100%',
          height: 320,
          backgroundImage: 'url(/images/records/anthologist-turntable.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
        }}
        role="img"
        aria-label="Vintage turntable at the Anthologist record store in Natchez"
      />

      {/* How It Works */}
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
          Marketing Packages
        </h2>
        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '0.75rem',
          }}
        >
          You don&apos;t have to be on the label.
        </p>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.7,
            lineHeight: 1.7,
            maxWidth: 650,
            marginBottom: '2.5rem',
          }}
        >
          Any band or solo artist can use our marketing infrastructure — distribution,
          social media, PR, photography, radio placement. If you want the full label
          deal (recording, vinyl pressing, the whole ecosystem), that&apos;s the Blues
          Room. But you don&apos;t need to sign anything to get started.
        </p>

        {/* Tiered packages */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {[
            {
              name: 'Front Porch',
              price: '$100/mo',
              sub: 'For artists just getting started',
              featured: false,
              includes: [
                'Digital distribution (all platforms)',
                'Artist page on bigmuddyrecords.net',
                'Spotify playlist placement (Big Muddy Radio)',
                'Monthly content calendar (4 posts)',
                'You keep your masters',
              ],
            },
            {
              name: 'The Route',
              price: '$250/mo',
              sub: 'For artists ready to build an audience',
              featured: true,
              includes: [
                'Everything in Front Porch',
                'Social media management (2 platforms, 12 posts/mo)',
                'PR outreach — regional press, blogs, podcasts',
                'Radio promotion (Big Muddy Radio features)',
                'AI-generated content (brand-voice matched)',
                'Magazine feature in Big Muddy Magazine',
                'Photo session with Chase Pierson (quarterly)',
              ],
            },
            {
              name: 'Blues Room',
              price: '$500/mo',
              sub: 'Full ecosystem — the whole machine behind you',
              featured: false,
              includes: [
                'Everything in The Route',
                'Full social media management (4 platforms, 20 posts/mo)',
                'Recording sessions at the Blues Room (Big Muddy Inn)',
                'Video production (session footage + promo clips)',
                'BuyCurious Art merch channel (vinyl, prints, limited editions)',
                'Touring infrastructure (Inn bookings, route events)',
                'Analytics dashboard — streams, social, press, revenue',
                'Annual renewal — no multi-album lock-in',
              ],
            },
          ].map((pkg) => (
            <div
              key={pkg.name}
              style={{
                border: pkg.featured
                  ? '2px solid var(--accent, #c8943e)'
                  : '1px solid var(--muted, #333)',
                padding: '2rem',
                position: 'relative',
              }}
            >
              {pkg.featured && (
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
                  Most Popular
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
                {pkg.name}
              </p>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  margin: '0 0 0.25rem',
                  lineHeight: 1.1,
                }}
              >
                {pkg.price}
              </p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.5,
                  marginBottom: '1.5rem',
                }}
              >
                {pkg.sub}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--fg, #f5f0eb)',
                      opacity: 0.75,
                      lineHeight: 1.5,
                      padding: '0.35rem 0',
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
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:music@bigmuddyrecords.net"
                style={{
                  display: 'inline-block',
                  marginTop: '1.5rem',
                  padding: '0.6rem 1.5rem',
                  background: pkg.featured ? 'var(--accent, #c8943e)' : 'transparent',
                  color: pkg.featured ? '#0a0a0a' : 'var(--accent, #c8943e)',
                  border: pkg.featured ? 'none' : '1px solid var(--accent, #c8943e)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.04em',
                }}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>

        {/* Where your money goes */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '0.5rem',
          }}
        >
          Blues Room: Where your $500/month goes
        </h3>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.6,
            marginBottom: '1.5rem',
            maxWidth: 600,
          }}
        >
          This is the actual budget breakdown. No hidden fees. No line items you discover later.
        </p>
        <div
          style={{
            border: '1px solid var(--muted, #333)',
            marginBottom: '2.5rem',
          }}
        >
          {[
            { line: 'Distribution & admin', amount: '$50/mo', note: 'All-platform distribution, royalty accounting, sync licensing' },
            { line: 'Social media & content', amount: '$150/mo', note: '20 posts/month across 4 platforms, AI-generated to your voice' },
            { line: 'PR & radio', amount: '$100/mo', note: 'Press pitching, podcast outreach, Big Muddy Radio features' },
            { line: 'Recording & production', amount: '$100/mo', note: 'Blues Room sessions, video clips, session footage' },
            { line: 'Photo, merch & touring', amount: '$100/mo', note: 'Quarterly photo sessions, BuyCurious channel, Inn events' },
          ].map((item) => (
            <div
              key={item.line}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 100px 1fr',
                gap: '1rem',
                padding: '0.85rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--fg, #f5f0eb)', fontWeight: 600 }}>
                {item.line}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent, #c8943e)', fontWeight: 700 }}>
                {item.amount}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--fg, #f5f0eb)', opacity: 0.5 }}>
                {item.note}
              </span>
            </div>
          ))}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 100px 1fr',
              gap: '1rem',
              padding: '1rem 1.5rem',
              borderTop: '1px solid var(--accent, #c8943e)',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--fg, #f5f0eb)', fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: '1.1rem', color: 'var(--accent, #c8943e)', fontWeight: 700 }}>$500/mo</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--fg, #f5f0eb)', opacity: 0.5 }}>
              $6K/year — you&apos;d pay $15K+ assembling this yourself
            </span>
          </div>
        </div>

        {/* What's included free across all tiers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0',
            border: '1px solid var(--muted, #333)',
          }}
        >
          {[
            {
              label: 'You keep your masters',
              detail: 'Every tier, every time. No exceptions. The music belongs to the person who made it.',
            },
            {
              label: 'No multi-album deal',
              detail: 'Annual renewal on label tiers. Marketing-only packages are month-to-month. Walk anytime.',
            },
            {
              label: 'Label optional',
              detail: 'Front Porch and The Route work for any independent artist. No signing required.',
            },
            {
              label: 'Custom builds',
              detail: 'Need vinyl pressing without PR? Recording without social? We\'ll build exactly what you need.',
            },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: '1.5rem',
                borderRight: i < 3 ? '1px solid var(--muted, #333)' : 'none',
              }}
            >
              <p
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--accent, #c8943e)',
                  margin: '0 0 0.5rem',
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.65,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Traditional vs Big Muddy comparison */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--fg, #f5f0eb)',
            marginBottom: '1.25rem',
          }}
        >
          The math, compared
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
          {/* Traditional */}
          <div
            style={{
              border: '1px solid var(--muted, #333)',
              padding: '1.75rem',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--fg, #f5f0eb)',
                opacity: 0.4,
                marginBottom: '1.25rem',
              }}
            >
              Traditional Label
            </p>
            {[
              'Label owns your masters',
              '3–5 album obligation',
              'Recoup before you see a dollar',
              'Marketing billed back to you',
              'Publicist: separate vendor, separate invoice',
              'Radio: pay-to-play or pray',
            ].map((item) => (
              <p
                key={item}
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.5,
                  lineHeight: 1.5,
                  margin: '0 0 0.4rem',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid #333',
                }}
              >
                {item}
              </p>
            ))}
          </div>

          {/* Big Muddy */}
          <div
            style={{
              border: '1px solid var(--accent, #c8943e)',
              padding: '1.75rem',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--accent, #c8943e)',
                marginBottom: '1.25rem',
              }}
            >
              Big Muddy Records
            </p>
            {[
              'You own your masters. Always.',
              '12 months, then renewal by choice',
              '$100–$500/month, known cost, no surprises',
              'Marketing included at every tier',
              'Publicist included in The Route and up',
              'Radio, Magazine, and touring built in',
            ].map((item) => (
              <p
                key={item}
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.85,
                  lineHeight: 1.5,
                  margin: '0 0 0.4rem',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid var(--accent, #c8943e)',
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Photo break — vinyl dividers */}
      <div
        style={{
          width: '100%',
          height: 240,
          backgroundImage: 'url(/images/records/anthologist-vinyl-dividers.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.75,
        }}
        role="img"
        aria-label="Vinyl record dividers at the Anthologist"
      />

      {/* The Studio */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent, #c8943e)', marginBottom: '0.5rem' }}>
          Studio C
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--fg, #f5f0eb)', marginBottom: '1rem' }}>
          Where it gets made.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--fg, #f5f0eb)', opacity: 0.65, lineHeight: 1.7, maxWidth: 600, marginBottom: '2rem' }}>
          Studio C is the recording and production arm of Big Muddy Records. From live session captures to full production — this is where corridor music becomes something you can hold in your hands.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {[
            { src: '/images/studio-c/utopiademo-day-10.webp', alt: 'Studio C equipment' },
            { src: '/images/studio-c/utopiademo-day-20.webp', alt: 'Studio C recording session' },
            { src: '/images/studio-c/utopiademo-day-35.webp', alt: 'Studio C production' },
            { src: '/images/studio-c/utopiademo-day-50.webp', alt: 'Studio C demo day' },
          ].map((img) => (
            <div key={img.src} style={{ height: 200, backgroundImage: `url(${img.src})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }} role="img" aria-label={img.alt} />
          ))}
        </div>
      </section>

      {/* Ecosystem */}
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
          The Ecosystem
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.6,
            marginBottom: '2.5rem',
            maxWidth: 600,
          }}
        >
          Big Muddy Records is one part of a larger media operation. When you sign with
          the label, your release gets amplified across the full network.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {ECOSYSTEM.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                border: '1px solid var(--muted, #333)',
                padding: '1.5rem',
                textDecoration: 'none',
              }}
            >
              <p
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--accent, #c8943e)',
                  margin: '0 0 0.5rem',
                }}
              >
                {brand.name}
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
                {brand.role}
              </p>
            </a>
          ))}
        </div>
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem 2rem',
            background: 'rgba(200, 148, 62, 0.06)',
            border: '1px solid rgba(200, 148, 62, 0.2)',
          }}
        >
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--fg, #f5f0eb)',
              opacity: 0.8,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Three recording venues: the Blues Room at the Big Muddy Inn, the Anthologist
            (record store, flower shop, and performance space on Main Street), and Bobby
            J&apos;s. Plus a Prevost touring bus for mobile production, the radio show for
            pre-release cross-promotion, the Magazine for earned features and interviews,
            and Chase Pierson for photography and visual content. None of it billed
            separately.
          </p>
        </div>
      </section>

      {/* Roster */}
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
            marginBottom: '2rem',
          }}
        >
          Current Roster
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {ROSTER.map((artist) => (
            <div
              key={artist.name}
              style={{
                border: '1px solid var(--muted, #333)',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--fg, #f5f0eb)',
                    margin: 0,
                  }}
                >
                  {artist.name}
                </h3>
                <span
                  style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.5rem',
                    border: '1px solid var(--accent, #c8943e)',
                    color: 'var(--accent, #c8943e)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {artist.status}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--accent, #c8943e)',
                  marginBottom: '0.75rem',
                }}
              >
                {artist.genre}
              </p>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.7,
                  lineHeight: 1.6,
                }}
              >
                {artist.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sessions */}
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
            marginBottom: '2rem',
          }}
        >
          Upcoming Sessions
        </h2>
        {UPCOMING_SESSIONS.map((session, i) => (
          <div
            key={session.title}
            style={{
              padding: '1.5rem 0',
              borderBottom:
                i < UPCOMING_SESSIONS.length - 1
                  ? '1px solid var(--muted, #333)'
                  : 'none',
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--fg, #f5f0eb)',
                  margin: 0,
                }}
              >
                {session.date}
              </p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.5,
                  margin: '0.25rem 0 0',
                }}
              >
                {session.location}
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--fg, #f5f0eb)',
                  margin: '0 0 0.5rem',
                }}
              >
                {session.title}
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.7,
                  lineHeight: 1.6,
                }}
              >
                {session.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Submit Music CTA */}
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
          Play along the corridor?
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
          We take 2–4 artists per year. If you make music between Memphis and New Orleans
          — or anywhere the river touches — send us something honest. No demo
          requirements, no genre restrictions. We&apos;ll tell you straight whether it
          fits.
        </p>
        <a
          href="mailto:music@bigmuddyrecords.net"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'var(--accent, #c8943e)',
            color: '#0a0a0a',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.04em',
          }}
        >
          Submit Your Music
        </a>
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.8rem',
            color: 'var(--fg, #f5f0eb)',
            opacity: 0.4,
          }}
        >
          music@bigmuddyrecords.net
        </p>
      </section>
    </main>
  );
}
