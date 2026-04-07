'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   Bearsville Creative — Onboarding Deck
   Presented by Chase Pierson to Miles & Elijah
   April 2026

   13 slides, vertical scroll, nav dots, keyboard navigation.
   ═══════════════════════════════════════════════════════════════════════ */

const SLIDES = [
  'title',
  'origin',
  'entertainment',
  'magazine',
  'radio',
  'flywheel',
  'numbers',
  'bearsville',
  'studio',
  'wifi',
  'melodyvault',
  'role',
  'next-steps',
] as const;

type SlideId = (typeof SLIDES)[number];

const SLIDE_LABELS: Record<SlideId, string> = {
  title: 'Welcome',
  origin: 'Origin',
  entertainment: 'Entertainment',
  magazine: 'Magazine',
  radio: 'Radio',
  flywheel: 'Flywheel',
  numbers: 'Numbers',
  bearsville: 'Bearsville',
  studio: 'The Studio',
  wifi: 'WiFi + Broadcast',
  melodyvault: 'MelodyVault',
  role: 'Your Role',
  'next-steps': 'Next Steps',
};

/* ── Colors ─────────────────────────────────────────────────────────── */
const C = {
  bg: '#0f0f0d',
  surface: '#1a1816',
  border: 'rgba(200,148,62,0.12)',
  borderHover: 'rgba(200,148,62,0.3)',
  gold: '#c8943e',
  goldDim: 'rgba(200,148,62,0.08)',
  text: '#e8e0d4',
  muted: 'rgba(232,224,212,0.5)',
  dim: 'rgba(232,224,212,0.25)',
};

/* ── Reusable elements ──────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: C.gold,
        marginBottom: '20px',
      }}
    >
      {children}
    </div>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3.6rem)',
        fontWeight: 300,
        lineHeight: 1.08,
        color: C.text,
        margin: '0 0 28px',
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(1rem, 1.6vw, 1.12rem)',
        lineHeight: 1.75,
        color: C.muted,
        maxWidth: 640,
        margin: '0 0 16px',
      }}
    >
      {children}
    </p>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: '4px',
        padding: '24px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 300,
          color: C.gold,
          marginBottom: '6px',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: C.muted,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function StatGrid({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: '16px',
        marginTop: '36px',
      }}
    >
      {items.map((item) => (
        <StatCard key={item.label} value={item.value} label={item.label} />
      ))}
    </div>
  );
}

function Tag({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '8px 18px',
        border: `1px solid ${highlight ? C.gold : C.border}`,
        borderRadius: '3px',
        fontFamily: 'var(--font-body)',
        fontSize: '0.85rem',
        color: highlight ? C.gold : C.text,
        backgroundColor: highlight ? C.goldDim : C.surface,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: '4px',
        padding: '24px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: 500,
          color: C.gold,
          marginBottom: '8px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: C.muted,
          lineHeight: 1.55,
        }}
      >
        {desc}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 50,
        height: 1,
        background: C.gold,
        margin: '32px 0',
        opacity: 0.5,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SLIDES
   ═══════════════════════════════════════════════════════════════════════ */

function SlideTitle1() {
  return (
    <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
      <SectionLabel>Bearsville Creative</SectionLabel>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 200,
          lineHeight: 1.02,
          color: C.text,
          margin: '0 0 32px',
          letterSpacing: '-0.02em',
        }}
      >
        Welcome to<br />Bearsville Creative
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          color: C.muted,
          margin: '0 0 36px',
          lineHeight: 1.7,
        }}
      >
        Powered by Measurably Better Things
      </p>
      <div style={{ width: 50, height: 1, background: C.gold, margin: '0 auto 36px' }} />
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          color: C.gold,
          fontStyle: 'italic',
        }}
      >
        Everything we built in Natchez. Now in Woodstock.
      </p>
    </div>
  );
}

function SlideOrigin() {
  return (
    <>
      <SectionLabel>The Origin</SectionLabel>
      <SlideTitle>From Viacom to Main Street</SlideTitle>
      <P>
        In 2022, Chase designed a complete media production-to-distribution
        pipeline called the DeFacto Codec Market. It was global media
        infrastructure — broadcast, production, analytics, distribution —
        built entirely on open source tools.
      </P>
      <P>
        Then the realization: the same architecture that runs a Viacom can run
        a small-town media economy. Big Muddy is that architecture, applied to
        Main Street, powered by AI, anchored in the Mississippi corridor.
      </P>
      <Divider />
      <P>
        The gap isn&apos;t technology — it&apos;s organization. That&apos;s
        what we sell.
      </P>
    </>
  );
}

function SlideEntertainment() {
  return (
    <>
      <SectionLabel>Big Muddy Entertainment</SectionLabel>
      <SlideTitle>The Entertainment Engine</SlideTitle>
      <P>
        Books bands. Provides transport — we just got a Sprinter van. Promotes
        shows through the media company. Every show generates a 2:1 ecosystem
        multiplier.
      </P>
      <P>
        One show produces: inn bookings, magazine articles, radio content,
        directory listings, social media, and record sales. Entertainment is
        the flywheel&apos;s ignition. Remove it and the whole system stalls.
      </P>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '32px' }}>
        {[
          'Book bands',
          'Sprinter van transport',
          'Promote shows',
          'Record sessions',
          'Inn bookings (2:1)',
          'Magazine coverage',
          'Radio rotation',
          'Social content',
        ].map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </>
  );
}

function SlideMagazine() {
  return (
    <>
      <SectionLabel>Big Muddy Magazine</SectionLabel>
      <SlideTitle>Editorial Content Platform</SlideTitle>
      <P>
        City guides, food features, music coverage, photo essays across 13
        corridor cities. An automated publishing pipeline that generates
        articles from show data, artist profiles, and local intel.
      </P>
      <P>
        Every show, every session, every partnership produces content. The
        magazine is where it lives. We have a live editorial site at
        bigmuddymagazine.com with real articles in the outsider-economics-v2
        content directory.
      </P>
      <StatGrid
        items={[
          { value: '13', label: 'Corridor Cities' },
          { value: '5+', label: 'Live Articles' },
          { value: '93', label: 'Slideshow Photos' },
          { value: '152', label: 'Save the Hall Photos' },
        ]}
      />
      <P>
        The same pipeline will power Bearsville Magazine for the Hudson Valley.
      </P>
    </>
  );
}

function SlideRadio() {
  return (
    <>
      <SectionLabel>Big Muddy Radio</SectionLabel>
      <SlideTitle>Streaming Radio</SlideTitle>
      <P>
        Live streaming from a Mac Mini running Icecast and OpenBroadcaster. 55
        original tracks from 3 artists. 6 curated playlists. Station IDs and
        breaks. A live radio player on every page of the site.
      </P>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '32px',
        }}
      >
        {[
          { artist: 'Amy Allen', tracks: '9 tracks', genre: 'Folk' },
          { artist: 'Chase Pierson', tracks: '6 tracks', genre: 'Americana' },
          { artist: 'Mechanical Bull', tracks: '40 tracks', genre: 'Rock' },
        ].map((a) => (
          <div
            key={a.artist}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: '4px',
              padding: '24px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: C.text,
                marginBottom: '6px',
              }}
            >
              {a.artist}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: C.muted,
              }}
            >
              {a.tracks} &middot; {a.genre}
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <P>
        6 playlists ready. The broadcasting stack runs 24/7 and can be
        replicated in Woodstock with the same hardware.
      </P>
    </>
  );
}

function SlideFlywheel() {
  return (
    <>
      <SectionLabel>The Flywheel</SectionLabel>
      <SlideTitle>Every Piece Feeds the Next</SlideTitle>
      <P>
        Shows produce records. Records play on radio. Radio drives magazine
        readership. The magazine sends traffic to the directory. The directory
        fills the inn. The inn hosts the next show.
      </P>
      <P>Remove one edge and it breaks.</P>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
          marginTop: '36px',
        }}
      >
        {['Shows', 'Records', 'Radio', 'Magazine', 'Directory', 'Inn'].map(
          (node, i, arr) => (
            <span
              key={node}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Tag highlight={i === 0 || i === arr.length - 1}>{node}</Tag>
              {i < arr.length - 1 && (
                <span style={{ color: C.gold, fontSize: '1.3rem' }}>&rarr;</span>
              )}
            </span>
          )
        )}
        <span style={{ color: C.gold, fontSize: '1.5rem', marginLeft: '4px' }}>
          &#8635;
        </span>
      </div>
      <Divider />
      <P>
        This is the core model. Bearsville gets the same flywheel — Studio
        replaces Inn, but the loop is identical.
      </P>
    </>
  );
}

function SlideNumbers() {
  return (
    <>
      <SectionLabel>What We Built</SectionLabel>
      <SlideTitle>The Platform Today</SlideTitle>
      <StatGrid
        items={[
          { value: '14', label: 'Domains' },
          { value: '$167/mo', label: 'Infrastructure' },
          { value: '5,605', label: 'Directory Businesses' },
          { value: '735', label: 'Venues' },
          { value: '660', label: 'Hotels' },
          { value: '1,571', label: 'Restaurants' },
          { value: '8,548', label: 'Constellation Nodes' },
          { value: '11,552', label: 'Graph Edges' },
          { value: '13', label: 'Corridor Cities' },
          { value: '55', label: 'Original Tracks' },
          { value: '1', label: 'AI Agent (Delta Dawn)' },
          { value: '10', label: 'Database Tools' },
        ]}
      />
    </>
  );
}

function SlideBearsville() {
  return (
    <>
      <SectionLabel>Bearsville Creative</SectionLabel>
      <SlideTitle>The Same Model, Adapted</SlideTitle>
      <P>
        Woodstock, New York. The Hudson Valley. A creative corridor with
        decades of musical history. We take the exact architecture from
        Natchez and plant it here.
      </P>
      <P>
        Studio C is the production arm. Bearsville Magazine for editorial.
        Bearsville Radio for streaming. A Hudson Valley directory for local
        business. Same flywheel, different geography.
      </P>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          marginTop: '32px',
        }}
      >
        <InfoCard title="Studio C" desc="Recording, mixing, video production. The production core." />
        <InfoCard title="Bearsville Magazine" desc="Hudson Valley editorial. City guides, artist features, food." />
        <InfoCard title="Bearsville Radio" desc="Streaming radio + campus broadcast. Same Icecast stack." />
        <InfoCard title="Hudson Valley Directory" desc="Local business listings. Same model as Deep South Directory." />
      </div>
    </>
  );
}

function SlideStudio() {
  return (
    <>
      <SectionLabel>The Studio</SectionLabel>
      <SlideTitle>Utopia at Studio C</SlideTitle>
      <P>
        Session booking through the call sheet system. QR check-in for every
        artist. Video services fully integrated — multi-cam, live stream,
        highlights, BTS, social clips.
      </P>
      <P>
        MelodyVault handles track management and distribution. Automated
        marketing runs for every session — social posts, directory listings,
        radio rotation.
      </P>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginTop: '32px',
        }}
      >
        {[5, 11, 19, 27].map((n) => (
          <div
            key={n}
            style={{
              aspectRatio: '16/10',
              overflow: 'hidden',
              borderRadius: '3px',
              border: `1px solid ${C.border}`,
            }}
          >
            <img
              src={`/images/studio-c/utopiademo-day-${n}.webp`}
              alt={`Studio C — photo ${n}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function SlideWifi() {
  return (
    <>
      <SectionLabel>WiFi + Broadcast</SectionLabel>
      <SlideTitle>Campus Broadcast Network</SlideTitle>
      <P>
        A live radio player embedded on the website. Video reels broadcast to
        the Bearsville campus WiFi network. Captive portal branded per event.
        Every guest who connects enters the ecosystem.
      </P>
      <P>
        The same infrastructure that streams Icecast to the web can push
        content to a local WiFi audience. Concerts, open mics, art shows — all
        with real-time media distribution to everyone on the property.
      </P>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '32px',
        }}
      >
        {[
          'Live radio player on site',
          'Video reels on campus WiFi',
          'Branded captive portal',
          'Per-event theming',
          'Real-time analytics',
          'Guest-to-ecosystem pipeline',
        ].map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </>
  );
}

function SlideMelodyVault() {
  return (
    <>
      <SectionLabel>MelodyVault</SectionLabel>
      <SlideTitle>Track Management + Distribution</SlideTitle>
      <P>
        55 tracks ingested. AI analysis for genre, mood, key, and tempo.
        Revenue splits: 80% artist, 15% label, 5% platform. SoundCloud
        integration. Automated social posting on every release.
      </P>
      <StatGrid
        items={[
          { value: '55', label: 'Tracks Ingested' },
          { value: '80%', label: 'Artist Share' },
          { value: '15%', label: 'Label Share' },
          { value: '5%', label: 'Platform Share' },
        ]}
      />
      <div
        style={{
          marginTop: '28px',
          padding: '24px',
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.gold,
            marginBottom: '12px',
          }}
        >
          Pipeline
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.92rem',
            color: C.muted,
            lineHeight: 1.75,
          }}
        >
          Record &rarr; Ingest &rarr; AI Analysis &rarr; Metadata &rarr;
          Distribution &rarr; Radio Rotation &rarr; Social Posts &rarr;
          Revenue Split
        </div>
      </div>
    </>
  );
}

function SlideRole() {
  return (
    <>
      <SectionLabel>Your Role</SectionLabel>
      <SlideTitle>Miles + Elijah</SlideTitle>
      <P>
        You operate the studio. You book sessions. You manage local media. You
        build the Hudson Valley directory. Same model as Chase, Tracy, and Amy
        in Natchez.
      </P>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          marginTop: '32px',
        }}
      >
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: '4px',
            padding: '28px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: C.gold,
              marginBottom: '12px',
            }}
          >
            Natchez (Big Muddy)
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: C.text,
              marginBottom: '8px',
              fontWeight: 500,
            }}
          >
            Chase (CEO/CTO) + Tracy (Finance) + Amy (Operations)
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: C.muted,
              lineHeight: 1.6,
            }}
          >
            Shows, touring, inn, directory, radio, magazine. Equal equity
            partners running the flagship implementation.
          </div>
        </div>
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.gold}`,
            borderRadius: '4px',
            padding: '28px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: C.gold,
              marginBottom: '12px',
            }}
          >
            Woodstock (Bearsville)
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: C.text,
              marginBottom: '8px',
              fontWeight: 500,
            }}
          >
            Miles + Elijah
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: C.muted,
              lineHeight: 1.6,
            }}
          >
            Studio sessions, local media, Hudson Valley directory, campus
            broadcast. The Northeast node.
          </div>
        </div>
      </div>
    </>
  );
}

function SlideNextSteps() {
  const steps = [
    {
      n: '01',
      label: 'Plex library setup',
      desc: 'Media server for campus playback and content distribution.',
    },
    {
      n: '02',
      label: 'First session booking',
      desc: 'Get a session on the call sheet. Test the full pipeline end to end.',
    },
    {
      n: '03',
      label: 'bearsvillemediagroup.com activation',
      desc: 'Domain is live. Wire up the site, radio player, magazine.',
    },
    {
      n: '04',
      label: 'Directory seeding — Hudson Valley',
      desc: 'Import local businesses. Build the map. Same tools as Deep South Directory.',
    },
    {
      n: '05',
      label: 'Adobe / Lightroom Classic catalog',
      desc: 'Photo pipeline from shoot to web. Same workflow as Natchez.',
    },
  ];

  return (
    <>
      <SectionLabel>Next Steps</SectionLabel>
      <SlideTitle>Let&apos;s Build</SlideTitle>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          marginTop: '24px',
        }}
      >
        {steps.map((item) => (
          <div
            key={item.n}
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              padding: '20px 24px',
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: '4px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 200,
                color: C.gold,
                flexShrink: 0,
                width: 36,
                lineHeight: 1,
              }}
            >
              {item.n}
            </span>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: C.text,
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: C.muted,
                  lineHeight: 1.55,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Slide renderer map
   ═══════════════════════════════════════════════════════════════════════ */

const SLIDE_RENDERERS: Record<SlideId, () => React.ReactNode> = {
  title: () => <SlideTitle1 />,
  origin: () => <SlideOrigin />,
  entertainment: () => <SlideEntertainment />,
  magazine: () => <SlideMagazine />,
  radio: () => <SlideRadio />,
  flywheel: () => <SlideFlywheel />,
  numbers: () => <SlideNumbers />,
  bearsville: () => <SlideBearsville />,
  studio: () => <SlideStudio />,
  wifi: () => <SlideWifi />,
  melodyvault: () => <SlideMelodyVault />,
  role: () => <SlideRole />,
  'next-steps': () => <SlideNextSteps />,
};

/* ═══════════════════════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════════════════════ */

export default function OnboardingDeck() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  /* Intersection observer for scroll tracking */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSlide(idx);
          }
        }
      },
      { threshold: 0.45 }
    );

    for (const ref of slideRefs.current) {
      if (ref) observer.observe(ref);
    }

    return () => observer.disconnect();
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const next = Math.min(activeSlide + 1, SLIDES.length - 1);
        slideRefs.current[next]?.scrollIntoView({ behavior: 'smooth' });
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(activeSlide - 1, 0);
        slideRefs.current[prev]?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeSlide]);

  const setSlideRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      slideRefs.current[i] = el;
    },
    []
  );

  const goTo = useCallback((i: number) => {
    slideRefs.current[i]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; background: ${C.bg}; overflow-x: hidden; }
        ::selection { background: ${C.gold}; color: ${C.bg}; }
      `}</style>

      {/* ── Navigation dots ── */}
      <nav
        style={{
          position: 'fixed',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          alignItems: 'flex-end',
        }}
      >
        {SLIDES.map((id, i) => {
          const isActive = i === activeSlide;
          return (
            <button
              key={id}
              onClick={() => goTo(i)}
              aria-label={SLIDE_LABELS[id]}
              title={SLIDE_LABELS[id]}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 0',
              }}
            >
              {isActive && (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: C.gold,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {SLIDE_LABELS[id]}
                </span>
              )}
              <span
                style={{
                  display: 'block',
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  borderRadius: '50%',
                  backgroundColor: isActive ? C.gold : C.dim,
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* ── Slide counter — top right ── */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 100,
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: C.gold,
          opacity: 0.5,
        }}
      >
        {String(activeSlide + 1).padStart(2, '0')} /{' '}
        {String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* ── Slides ── */}
      <main
        style={{
          backgroundColor: C.bg,
          color: C.text,
          fontFamily: 'var(--font-body)',
          minHeight: '100vh',
        }}
      >
        {SLIDES.map((id, i) => (
          <section
            key={id}
            ref={setSlideRef(i)}
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 72px 80px 48px',
              borderBottom:
                i < SLIDES.length - 1 ? `1px solid ${C.border}` : 'none',
            }}
          >
            <div style={{ maxWidth: 920, width: '100%' }}>
              {SLIDE_RENDERERS[id]()}
            </div>
          </section>
        ))}
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: '40px 24px',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: C.muted,
          opacity: 0.4,
          borderTop: `1px solid ${C.border}`,
          backgroundColor: C.bg,
        }}
      >
        Bearsville Creative &middot; Woodstock, NY &middot; Powered by
        Measurably Better Things
      </footer>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 768px) {
          section { padding: 60px 24px !important; }
        }
        @media print {
          nav, footer { display: none !important; }
          section {
            min-height: auto !important;
            page-break-after: always;
          }
        }
      `}</style>
    </>
  );
}
