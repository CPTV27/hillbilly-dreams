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
            backgroundImage: 'url(/images/ai-corridor/blues-parlor-live.webp)',
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
            marginBottom: '2rem',
          }}
        >
          How It Works
        </h2>

        {/* The model */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0',
            border: '1px solid var(--muted, #333)',
            marginBottom: '3rem',
          }}
        >
          {[
            {
              label: '$4,000 / month',
              sub: '$48K annually',
              detail:
                'One retainer covers your publicist, $24K in marketing budget, content creation, and full management. No line-item surprises.',
            },
            {
              label: '20–25% of gross',
              sub: 'Retainer recoups against it',
              detail:
                'If 25% of your gross exceeds $48K, the label earns the difference. If it doesn\'t, the retainer covers it. You always know exactly what the deal costs.',
            },
            {
              label: 'Annual renewal',
              sub: 'Not multi-album lock-in',
              detail:
                'Twelve months at a time. If we\'re not delivering, you walk. That keeps us honest.',
            },
            {
              label: '2–4 artists / year',
              sub: 'Deep attention, not volume',
              detail:
                'We cap the roster deliberately. Every artist gets the full ecosystem, not a slot in a release queue.',
            },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: '2rem',
                borderRight: i % 2 === 0 ? '1px solid var(--muted, #333)' : 'none',
                borderBottom: i < 2 ? '1px solid var(--muted, #333)' : 'none',
              }}
            >
              <p
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--accent, #c8943e)',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.5,
                  margin: '0.25rem 0 0.75rem',
                }}
              >
                {item.sub}
              </p>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--fg, #f5f0eb)',
                  opacity: 0.7,
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
              '$4K/month, known cost, no surprises',
              '$24K marketing budget included',
              'Publicist included in the retainer',
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
            Infrastructure: the Blues Room at the Big Muddy Inn for live recording
            sessions, a Prevost touring bus for mobile production, the radio show for
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
