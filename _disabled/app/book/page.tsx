// apps/web/app/book/page.tsx
// Coffee table book layout preview tool — The Big Muddy Inn
// A digital template for Chase to arrange photographs before print production.
// Server component — no interactivity needed; this is a layout canvas.

import type { Metadata } from 'next';

/* ─────────────────────────────────────────────────────── *
 *  BOOK METADATA                                          *
 * ─────────────────────────────────────────────────────── */

const BOOK = {
  title: 'The Big Muddy Inn',
  subtitle: 'A Photography Book by Chase Pierson',
  photographer: 'Chase Pierson',
  publisher: 'Big Muddy Media',
  year: 2026,
  format: '12 × 10 Landscape',
  pages: '120 pages',
  location: 'Natchez, Mississippi',
};

/* ─────────────────────────────────────────────────────── *
 *  SECTION DATA                                           *
 *  Each section maps to a chapter / spread sequence.     *
 *  slots: array of layout descriptors for placeholders.  *
 *  'full' = 100%, 'half' = ~50%, 'third' = ~33%         *
 * ─────────────────────────────────────────────────────── */

interface SlotConfig {
  width: 'full' | 'half' | 'third' | 'two-thirds';
  aspectRatio: string; // CSS aspect-ratio value
  caption?: string;
}

interface BookSection {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  description: string;
  slots: SlotConfig[];
}

const SECTIONS: BookSection[] = [
  {
    id: 'building',
    chapter: 'Chapter One',
    title: 'The Building',
    subtitle: 'The architecture, the restoration, the bones of the place',
    description:
      '411 North Commerce Street. Built before the Civil War, in the oldest part of Natchez, perched above the bluff where the city began. The restoration took years. Every layer of paint told a story.',
    slots: [
      { width: 'full', aspectRatio: '16/7', caption: 'Exterior — full facade' },
      { width: 'half', aspectRatio: '4/5', caption: 'Foyer entrance' },
      { width: 'half', aspectRatio: '4/5', caption: 'Original millwork detail' },
      { width: 'third', aspectRatio: '1/1', caption: 'Staircase' },
      { width: 'third', aspectRatio: '1/1', caption: 'Restored tin ceiling' },
      { width: 'third', aspectRatio: '1/1', caption: 'Front door hardware' },
      { width: 'two-thirds', aspectRatio: '3/2', caption: 'Back gallery / courtyard' },
    ],
  },
  {
    id: 'rooms',
    chapter: 'Chapter Two',
    title: 'The Rooms',
    subtitle: 'Six suites, each named for a legend',
    description:
      'Every room holds a name and a story. The beds are high off the floor the way they used to be. The windows let the morning in slow.',
    slots: [
      { width: 'half', aspectRatio: '3/2', caption: 'Room 1 — wide shot' },
      { width: 'half', aspectRatio: '3/2', caption: 'Room 2 — wide shot' },
      { width: 'third', aspectRatio: '4/5', caption: 'Room 3 — detail' },
      { width: 'third', aspectRatio: '4/5', caption: 'Room 4 — bed' },
      { width: 'third', aspectRatio: '4/5', caption: 'Room 5 — window light' },
      { width: 'full', aspectRatio: '21/9', caption: 'Room 6 — panoramic' },
      { width: 'half', aspectRatio: '3/2', caption: 'Bathroom tile / soaking tub' },
      { width: 'half', aspectRatio: '3/2', caption: 'Room nameplate / signage' },
    ],
  },
  {
    id: 'blues-room',
    chapter: 'Chapter Three',
    title: 'The Blues Room',
    subtitle: 'The performance space, the sessions, the music',
    description:
      'Downstairs, the blues play. The room holds maybe forty people and it feels like a hundred. The PA hums before the set. Instruments wait in the low light.',
    slots: [
      { width: 'full', aspectRatio: '16/7', caption: 'Stage — empty, before the set' },
      { width: 'half', aspectRatio: '4/5', caption: 'Performer — portrait' },
      { width: 'half', aspectRatio: '4/5', caption: 'Audience — close' },
      { width: 'third', aspectRatio: '1/1', caption: 'Guitar on stand' },
      { width: 'third', aspectRatio: '1/1', caption: 'Microphone, low light' },
      { width: 'third', aspectRatio: '1/1', caption: 'Soundboard / mixing' },
      { width: 'two-thirds', aspectRatio: '3/2', caption: 'Full room — session in progress' },
    ],
  },
  {
    id: 'porch',
    chapter: 'Chapter Four',
    title: 'The Porch',
    subtitle: 'Front porch life, Natchez views, golden hour',
    description:
      'The porch is where the day ends. Rocking chairs. Spanish moss in the distance. The Mississippi somewhere past the bluff, wide and brown and moving south.',
    slots: [
      { width: 'full', aspectRatio: '21/9', caption: 'Porch — golden hour panoramic' },
      { width: 'half', aspectRatio: '3/2', caption: 'Rocking chairs, late afternoon' },
      { width: 'half', aspectRatio: '3/2', caption: 'Street view from porch' },
      { width: 'third', aspectRatio: '4/5', caption: 'Porch column detail' },
      { width: 'third', aspectRatio: '4/5', caption: 'Hanging fern / plant' },
      { width: 'third', aspectRatio: '4/5', caption: 'Guest on porch — candid' },
    ],
  },
  {
    id: 'corridor',
    chapter: 'Chapter Five',
    title: 'The Corridor',
    subtitle: 'Highway 61, the towns, the route',
    description:
      'The corridor runs from Memphis to New Orleans. Eighteen cities. Five states. The road is the connective tissue. Every mile is a photograph waiting.',
    slots: [
      { width: 'full', aspectRatio: '16/7', caption: 'Highway 61 — wide, vanishing point' },
      { width: 'third', aspectRatio: '1/1', caption: 'Small-town main street' },
      { width: 'third', aspectRatio: '1/1', caption: 'Gas station / roadside' },
      { width: 'third', aspectRatio: '1/1', caption: 'Bridge over water' },
      { width: 'half', aspectRatio: '3/2', caption: 'Delta flat — storm light' },
      { width: 'half', aspectRatio: '3/2', caption: 'Town square — one of 18 cities' },
      { width: 'two-thirds', aspectRatio: '3/2', caption: 'Natchez bluff — river below' },
    ],
  },
  {
    id: 'people',
    chapter: 'Chapter Six',
    title: 'The People',
    subtitle: 'Artists, guests, community, Regina, the Garden Club',
    description:
      'The Inn does not exist without the people who make it. Regina runs the house. The Garden Club tends the grounds. Artists come through and some of them stay.',
    slots: [
      { width: 'half', aspectRatio: '4/5', caption: 'Regina — portrait' },
      { width: 'half', aspectRatio: '4/5', caption: 'Artist in residence — portrait' },
      { width: 'full', aspectRatio: '21/9', caption: 'Garden Club gathering — wide' },
      { width: 'third', aspectRatio: '1/1', caption: 'Guest — candid, porch' },
      { width: 'third', aspectRatio: '1/1', caption: 'Hands — detail' },
      { width: 'third', aspectRatio: '1/1', caption: 'Community dinner table' },
      { width: 'two-thirds', aspectRatio: '3/2', caption: 'Group — Inn staff and community' },
    ],
  },
  {
    id: 'food',
    chapter: 'Chapter Seven',
    title: 'The Food',
    subtitle: 'Biscuits, kitchen, dining',
    description:
      'Breakfast is not optional. The biscuits are the size of a fist and they come out of the oven at seven. The kitchen is small and hot and the smell carries to the second floor.',
    slots: [
      { width: 'full', aspectRatio: '16/7', caption: 'Kitchen — wide, morning light' },
      { width: 'half', aspectRatio: '1/1', caption: 'Biscuits — overhead, cast iron' },
      { width: 'half', aspectRatio: '1/1', caption: 'Breakfast table — set' },
      { width: 'third', aspectRatio: '4/5', caption: 'Hands in dough — close' },
      { width: 'third', aspectRatio: '4/5', caption: 'Coffee pour — detail' },
      { width: 'third', aspectRatio: '4/5', caption: 'Dining room — candid' },
    ],
  },
];

/* ─────────────────────────────────────────────────────── *
 *  TYPES                                                  *
 * ─────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'The Big Muddy Inn — Photography Book',
  description:
    'Layout preview for The Big Muddy Inn photography book by Chase Pierson. A coffee table book about the historic inn at 411 North Commerce Street, Natchez, Mississippi.',
  robots: { index: false, follow: false },
};

/* ─────────────────────────────────────────────────────── *
 *  SUBCOMPONENTS                                          *
 * ─────────────────────────────────────────────────────── */

function PhotoSlot({ slot, index }: { slot: SlotConfig; index: number }) {
  const widthMap: Record<SlotConfig['width'], string> = {
    full: '100%',
    'two-thirds': 'calc(66.666% - 6px)',
    half: 'calc(50% - 6px)',
    third: 'calc(33.333% - 8px)',
  };

  return (
    <div
      style={{
        width: widthMap[slot.width],
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: slot.aspectRatio,
          border: '1px dashed rgba(200, 148, 62, 0.35)',
          borderRadius: '2px',
          background: 'rgba(200, 148, 62, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label={`Photo placeholder ${index + 1}: ${slot.caption ?? ''}`}
      >
        {/* Corner marks */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            width: '12px',
            height: '12px',
            borderTop: '1px solid rgba(200, 148, 62, 0.5)',
            borderLeft: '1px solid rgba(200, 148, 62, 0.5)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '12px',
            height: '12px',
            borderTop: '1px solid rgba(200, 148, 62, 0.5)',
            borderRight: '1px solid rgba(200, 148, 62, 0.5)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            width: '12px',
            height: '12px',
            borderBottom: '1px solid rgba(200, 148, 62, 0.5)',
            borderLeft: '1px solid rgba(200, 148, 62, 0.5)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '12px',
            height: '12px',
            borderBottom: '1px solid rgba(200, 148, 62, 0.5)',
            borderRight: '1px solid rgba(200, 148, 62, 0.5)',
          }}
        />

        {/* Drop icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{ opacity: 0.3 }}
        >
          <rect x="3" y="3" width="18" height="18" rx="1" stroke="#c8943e" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" stroke="#c8943e" strokeWidth="1.5" />
          <path d="M3 16l5-5 4 4 3-3 6 6" stroke="#c8943e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <span
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(200, 148, 62, 0.5)',
          }}
        >
          Drop image
        </span>

        {/* Slot number */}
        <span
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '14px',
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: 'rgba(200, 148, 62, 0.3)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Caption label */}
      {slot.caption && (
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '11px',
            color: 'rgba(245, 240, 235, 0.35)',
            letterSpacing: '0.04em',
            lineHeight: 1.4,
            paddingLeft: '2px',
          }}
        >
          {slot.caption}
        </p>
      )}
    </div>
  );
}

function SectionDivider({ chapter }: { chapter: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '14px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body, sans-serif)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(200, 148, 62, 0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        {chapter}
      </span>
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'rgba(200, 148, 62, 0.15)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────── *
 *  PAGE                                                   *
 * ─────────────────────────────────────────────────────── */

export default function BookPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#f5f0eb',
      }}
    >

      {/* ── Top navigation strip ── */}
      <div
        style={{
          borderBottom: '1px solid rgba(200, 148, 62, 0.12)',
          padding: '14px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#c8943e',
          }}
        >
          Big Muddy Media — Book Layout Preview
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '11px',
            color: 'rgba(245, 240, 235, 0.3)',
            letterSpacing: '0.06em',
          }}
        >
          {BOOK.format} &middot; {BOOK.pages} &middot; {BOOK.year}
        </span>
      </div>

      {/* ── Cover — full bleed hero placeholder ── */}
      <section
        aria-label="Book cover"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(200, 148, 62, 0.12)',
          overflow: 'hidden',
        }}
      >
        {/* Full-bleed placeholder background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px dashed rgba(200, 148, 62, 0.2)',
            margin: '24px',
            borderRadius: '2px',
            background: 'rgba(200, 148, 62, 0.025)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          {/* Corner registration marks */}
          {(['tl','tr','bl','br'] as const).map((pos) => (
            <span
              key={pos}
              style={{
                position: 'absolute',
                top: pos.startsWith('t') ? '16px' : undefined,
                bottom: pos.startsWith('b') ? '16px' : undefined,
                left: pos.endsWith('l') ? '16px' : undefined,
                right: pos.endsWith('r') ? '16px' : undefined,
                width: '20px',
                height: '20px',
                borderTop: pos.startsWith('t') ? '1px solid rgba(200,148,62,0.4)' : undefined,
                borderBottom: pos.startsWith('b') ? '1px solid rgba(200,148,62,0.4)' : undefined,
                borderLeft: pos.endsWith('l') ? '1px solid rgba(200,148,62,0.4)' : undefined,
                borderRight: pos.endsWith('r') ? '1px solid rgba(200,148,62,0.4)' : undefined,
              }}
            />
          ))}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              opacity: 0.25,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="1" stroke="#c8943e" strokeWidth="1" />
              <circle cx="8.5" cy="8.5" r="1.5" stroke="#c8943e" strokeWidth="1" />
              <path d="M3 16l5-5 4 4 3-3 6 6" stroke="#c8943e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#c8943e',
              }}
            >
              Full-bleed cover photograph
            </span>
          </div>
        </div>

        {/* Cover text overlay */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 48px',
          }}
        >
          {/* Publisher ornament */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '40px',
            }}
          >
            <div style={{ width: '40px', height: '1px', background: '#c8943e', opacity: 0.4 }} />
            <span
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#c8943e',
                opacity: 0.7,
              }}
            >
              {BOOK.publisher}
            </span>
            <div style={{ width: '40px', height: '1px', background: '#c8943e', opacity: 0.4 }} />
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              margin: '0 0 24px',
              color: '#f5f0eb',
              textShadow: '0 2px 60px rgba(0,0,0,0.8)',
            }}
          >
            {BOOK.title}
          </h1>

          {/* Rule */}
          <div
            style={{
              width: '80px',
              height: '1px',
              background: '#c8943e',
              margin: '0 auto 24px',
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: 'clamp(0.8rem, 1.6vw, 1.05rem)',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(245, 240, 235, 0.65)',
              margin: '0 0 56px',
            }}
          >
            {BOOK.subtitle}
          </p>

          {/* Metadata strip */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            {[
              { label: 'Location', value: BOOK.location },
              { label: 'Format', value: BOOK.format },
              { label: 'Pages', value: BOOK.pages },
              { label: 'Year', value: String(BOOK.year) },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#c8943e',
                    opacity: 0.7,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '12px',
                    color: 'rgba(245, 240, 235, 0.55)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section
        aria-label="Table of contents"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '80px 48px',
          borderBottom: '1px solid rgba(200, 148, 62, 0.1)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#c8943e',
            marginBottom: '32px',
          }}
        >
          Contents
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { chapter: 'Frontmatter', title: 'Cover & Title Page', page: '1' },
            ...SECTIONS.map((s, i) => ({
              chapter: s.chapter,
              title: s.title,
              page: String(i * 14 + 7),
            })),
            { chapter: 'Colophon', title: 'Credits & Acknowledgments', page: '118' },
          ].map((entry) => (
            <div
              key={entry.title}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0',
                padding: '10px 0',
                borderBottom: '1px solid rgba(245, 240, 235, 0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(200, 148, 62, 0.45)',
                  width: '130px',
                  flexShrink: 0,
                }}
              >
                {entry.chapter}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: '1rem',
                  color: 'rgba(245, 240, 235, 0.8)',
                  flex: 1,
                }}
              >
                {entry.title}
              </span>
              <div
                style={{
                  flex: 1,
                  borderBottom: '1px dotted rgba(245, 240, 235, 0.1)',
                  margin: '0 16px',
                  position: 'relative',
                  top: '-4px',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '12px',
                  color: 'rgba(245, 240, 235, 0.3)',
                  letterSpacing: '0.06em',
                  flexShrink: 0,
                }}
              >
                {entry.page}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Book Sections ── */}
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-label={section.title}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '80px 48px',
            borderBottom: '1px solid rgba(200, 148, 62, 0.08)',
          }}
        >
          {/* Section header */}
          <header style={{ marginBottom: '56px', maxWidth: '640px' }}>
            <SectionDivider chapter={section.chapter} />

            <h2
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#f5f0eb',
                margin: '0 0 12px',
                fontVariant: 'small-caps',
              }}
            >
              {section.title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#c8943e',
                margin: '0 0 20px',
              }}
            >
              {section.subtitle}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'rgba(245, 240, 235, 0.5)',
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              {section.description}
            </p>
          </header>

          {/* Photo grid — flex wrap to allow mixed widths */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}
            role="list"
            aria-label={`Photo slots for ${section.title}`}
          >
            {section.slots.map((slot, i) => (
              <div key={i} role="listitem" style={{ width: slotFlexBasis(slot.width) }}>
                <PhotoSlot slot={slot} index={i} />
              </div>
            ))}
          </div>

          {/* Spread count indicator */}
          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(200, 148, 62, 0.35)',
              }}
            >
              {section.slots.length} image slots &middot; {section.chapter}
            </span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'rgba(200, 148, 62, 0.08)',
              }}
            />
          </div>
        </section>
      ))}

      {/* ── Colophon / Credits ── */}
      <section
        aria-label="Colophon and credits"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '80px 48px 120px',
        }}
      >
        <SectionDivider chapter="Colophon" />

        <h2
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: '2.25rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#f5f0eb',
            margin: '0 0 48px',
            fontVariant: 'small-caps',
          }}
        >
          Credits &amp; Acknowledgments
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '64px',
          }}
        >
          {[
            {
              label: 'Photographs',
              value: BOOK.photographer,
            },
            {
              label: 'Publisher',
              value: BOOK.publisher,
            },
            {
              label: 'Location',
              value: '411 N Commerce Street\nNatchez, Mississippi 39120',
            },
            {
              label: 'Edition',
              value: `First Edition, ${BOOK.year}\n${BOOK.format} · ${BOOK.pages}`,
            },
            {
              label: 'Printing',
              value: 'Printed in the United States\n[Printer TBD]',
            },
            {
              label: 'Rights',
              value: `All photographs © ${BOOK.year} ${BOOK.photographer}\nAll rights reserved`,
            },
          ].map((item) => (
            <div key={item.label}>
              <div
                style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#c8943e',
                  marginBottom: '8px',
                  opacity: 0.7,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '14px',
                  color: 'rgba(245, 240, 235, 0.6)',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-line',
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Acknowledgments text placeholder */}
        <div
          style={{
            borderTop: '1px solid rgba(200, 148, 62, 0.12)',
            paddingTop: '40px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#c8943e',
              marginBottom: '16px',
              opacity: 0.7,
            }}
          >
            Acknowledgments
          </div>

          {/* Placeholder lines */}
          {[100, 92, 88, 75, 80, 65].map((width, i) => (
            <div
              key={i}
              style={{
                height: '1px',
                width: `${width}%`,
                background: 'rgba(245, 240, 235, 0.08)',
                marginBottom: '12px',
                borderRadius: '1px',
              }}
              aria-hidden="true"
            />
          ))}

          <p
            style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'rgba(200, 148, 62, 0.3)',
              fontStyle: 'italic',
              marginTop: '20px',
            }}
          >
            Acknowledgments text to be written
          </p>
        </div>

        {/* Final ornament */}
        <div
          style={{
            marginTop: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
          aria-hidden="true"
        >
          <div style={{ width: '60px', height: '1px', background: 'rgba(200,148,62,0.25)' }} />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1L9.545 5.91H14.706L10.581 8.68L12.126 13.59L8 10.82L3.874 13.59L5.419 8.68L1.294 5.91H6.455L8 1Z"
              stroke="#c8943e"
              strokeWidth="0.75"
              fill="rgba(200,148,62,0.15)"
            />
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'rgba(200,148,62,0.25)' }} />
        </div>
      </section>

    </div>
  );
}

/* ─────────────────────────────────────────────────────── *
 *  HELPERS                                                *
 * ─────────────────────────────────────────────────────── */

function slotFlexBasis(width: SlotConfig['width']): string {
  switch (width) {
    case 'full':
      return '100%';
    case 'two-thirds':
      return 'calc(66.666% - 6px)';
    case 'half':
      return 'calc(50% - 6px)';
    case 'third':
      return 'calc(33.333% - 8px)';
  }
}
