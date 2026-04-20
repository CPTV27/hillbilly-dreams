// apps/web/app/touring/page.tsx
// Big Muddy Touring — Sanity-driven homepage.
//
// Content is edited at https://bigmuddytouring.com/studio (singleton
// `touringPage` doc). If Sanity is unavailable (env missing, build-time
// preflight, network hiccup), the page falls back to the static
// *_FALLBACK constants below so nothing ever renders blank.

import type { Metadata } from 'next';
import Image from 'next/image';
import { getSanityClient } from '@/sanity/lib/client';

export const revalidate = 60;

// ─── Sanity helpers ───────────────────────────────────────────────────────────

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset =
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

/**
 * Resolve a Sanity image field (object with `asset._ref`) to a CDN URL,
 * or pass through an external URL string. Returns null for missing input.
 */
function sanityImageUrl(
  img: { asset?: { _ref?: string; url?: string } } | null | undefined,
): string | null {
  if (!img) return null;
  if (img.asset?.url) return img.asset.url;
  const ref = img.asset?._ref;
  if (!ref || !projectId) return null;
  // Ref format: image-<hash>-<dims>-<ext>  →  https://cdn.sanity.io/images/<pid>/<dataset>/<hash>-<dims>.<ext>
  const parts = ref.split('-'); // ["image", hash, "WxH", "ext"]
  if (parts.length < 4 || parts[0] !== 'image') return null;
  const [, hash, dims, ext] = parts;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dims}.${ext}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type SanityImage = { asset?: { _ref?: string; url?: string } } | null;
type Cta = { label?: string; href?: string } | null;

type TouringPageDoc = {
  hero?: {
    eyebrow?: string;
    headline?: string;
    subhead?: string;
    heroImage?: SanityImage;
    primaryCta?: Cta;
    secondaryCta?: Cta;
  };
  capabilityCards?: Array<{
    _key?: string;
    num?: string;
    heading?: string;
    body?: string;
    proof?: string;
    image?: SanityImage;
  }>;
  loopSection?: {
    eyebrow?: string;
    headline?: string;
    subhead?: string;
    cities?: string[];
    partnerNote?: string;
  };
  houseBandSection?: {
    headline?: string;
    body?: string;
    closer?: string;
    backgroundImage?: SanityImage;
  };
  sessions?: Array<{
    _key?: string;
    title?: string;
    description?: string;
    note?: string;
    image?: SanityImage;
  }>;
  threeDoorsOut?: {
    bands?: { eyebrow?: string; headline?: string; body?: string; ctaLabel?: string; ctaHref?: string };
    venues?: { eyebrow?: string; headline?: string; body?: string; ctaLabel?: string; ctaHref?: string };
    fans?: {
      eyebrow?: string;
      headline?: string;
      body?: string;
      links?: Array<{ _key?: string; label?: string; href?: string }>;
    };
  };
  footerLine?: string;
};

// ─── Fallback (current static content) ────────────────────────────────────────

const GCS = 'https://storage.googleapis.com/bmt-media-bigmuddy/touring/approved';
const FALLBACK_HERO_IMG = `${GCS}/hero-1600.webp`;

export const CAPABILITY_CARDS_FALLBACK = [
  { num: '01', heading: 'BOOK', body: 'Real venue relationships across the corridor.', proof: '26 venues across 13 cities, Memphis to New Orleans.', imgUrl: `${GCS}/card-01-book-1600.webp`, alt: 'Drummer at a Pearl kit in a session atmosphere' },
  { num: '02', heading: 'TRANSPORT', body: 'Sprinter van, gear handling, no rentals required.', proof: 'Wrap landing this week. Yours for the run.', imgUrl: `${GCS}/card-02-transport-1600.webp`, alt: 'Brick sidewalk on a corridor town Main Street' },
  { num: '03', heading: 'PROMOTE', body: 'Through media we own, not platforms we rent.', proof: 'Big Muddy Magazine + Big Muddy Radio + corridor social — every show.', imgUrl: `${GCS}/card-03-promote-1600.webp`, alt: 'Cigar and Balsamics storefront on Main Street' },
  { num: '04', heading: 'RECORD', body: 'Sessions and releases through Big Muddy Records.', proof: '55 tracks in the catalog. Non-exclusive deals. You keep your masters.', imgUrl: `${GCS}/card-04-record-1600.webp`, alt: 'Vintage Realistic turntable with vinyl mid-spin' },
  { num: '05', heading: 'HOUSE', body: 'The Big Muddy Inn in Natchez, on the river.', proof: '6 rooms. Blues Room. Production base camp.', imgUrl: `${GCS}/card-05-house-1600.webp`, alt: 'Golden urns and glassware at the Inn' },
  { num: '06', heading: 'SPLIT FAIR', body: "Artist-first deals. Non-exclusive. Terms we’d want if we were the ones on stage.", proof: 'Deal structures vary by artist and project — built together, not dictated.', imgUrl: null, alt: '' },
] as const;

export const CORRIDOR_FALLBACK = [
  'Memphis, TN',
  'Tunica, MS',
  'Helena, AR',
  'Clarksdale, MS',
  'Greenville, MS',
  'Indianola, MS',
  'Yazoo City, MS',
  'Vicksburg, MS',
  'Natchez, MS *',
  'St. Francisville, LA',
  'Baton Rouge, LA',
  'Lafayette, LA',
  'New Orleans, LA',
];

export const SESSIONS_FALLBACK = [
  { title: 'Blues Room — Friday Night Sessions', description: 'Weekly live recordings at the Inn, every Friday.', note: 'Arrie Aslin hosts.', imgUrl: `${GCS}/card-01-book-1600.webp`, alt: 'Drummer at a Pearl kit' },
  { title: 'Save the Hall Ball — A Night at Stanton Hall', description: 'Pilgrimage Garden Club fundraiser, March 2026.', note: 'Live recording in the magazine archive.', imgUrl: `${GCS}/session-ball-1600.webp`, alt: 'Dance floor with chandeliers' },
  { title: 'Amy Allen — Live at Five', description: 'May 8 at the Big Muddy Inn.', note: 'Album showcase.', imgUrl: `${GCS}/session-arrival-1600.webp`, alt: 'Gowns arriving at night' },
  { title: 'Studio C Sessions — Utopia, Woodstock NY', description: 'Spring sessions for the corridor catalog.', note: 'Tracking now.', imgUrl: null, alt: '' },
] as const;

export const metadata: Metadata = {
  title: 'Big Muddy Touring — We bring the party.',
  description:
    'We book the bands. We drive them there. We put them on the radio. We put them on a record. We book them a room. And we split it fair. 13 cities, Memphis to New Orleans.',
};

// ─── Data fetch ───────────────────────────────────────────────────────────────

const TOURING_QUERY = `*[_type == "touringPage" && _id == "touringPage-singleton"][0]{
  hero{
    eyebrow, headline, subhead,
    heroImage{asset->{_ref, url}},
    primaryCta, secondaryCta
  },
  capabilityCards[]{
    _key, num, heading, body, proof,
    image{asset->{_ref, url}}
  },
  loopSection,
  houseBandSection{
    headline, body, closer,
    backgroundImage{asset->{_ref, url}}
  },
  sessions[]{
    _key, title, description, note,
    image{asset->{_ref, url}}
  },
  threeDoorsOut,
  footerLine
}`;

async function fetchTouringPage(): Promise<TouringPageDoc | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    return await client.fetch<TouringPageDoc | null>(TOURING_QUERY);
  } catch (err) {
    console.warn('[touring] Sanity fetch failed, using fallback:', err);
    return null;
  }
}

// ─── Rendering ────────────────────────────────────────────────────────────────

// shared style tokens
const gold = 'var(--accent, #C8943E)';
const bg = 'var(--bg, #0a0a08)';
const text = 'var(--text, #e8e0d4)';
const muted = 'var(--text-muted, #6b635a)';
const subtle = 'rgba(200,148,62,0.12)';
const divider = '1px solid rgba(200,148,62,0.12)';

/** Convert "line one|line two" → ["line one", <br/>, "line two"] */
function splitBars(s: string | undefined): React.ReactNode {
  if (!s) return null;
  const parts = s.split('|');
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < parts.length - 1 ? <br /> : null}
    </span>
  ));
}

export default async function TouringPage() {
  const data = await fetchTouringPage();

  // ── HERO ────────────────────────────────────────────────────────────────────
  const heroEyebrow = data?.hero?.eyebrow ?? 'Big Muddy Touring';
  const heroHeadline = data?.hero?.headline ?? 'We bring|the party.';
  const heroSubhead =
    data?.hero?.subhead ??
    'We book the bands. We drive them there. We put them on the radio. We put them on a record. We book them a room. And we split it fair.';
  const heroImageUrl = sanityImageUrl(data?.hero?.heroImage ?? null) ?? FALLBACK_HERO_IMG;
  const primaryCta = data?.hero?.primaryCta ?? { label: 'Bring Your Band', href: '#bands' };
  const secondaryCta = data?.hero?.secondaryCta ?? { label: 'Book Your Venue', href: '#venues' };

  // ── CAPABILITY CARDS ────────────────────────────────────────────────────────
  const cardsFromSanity =
    data?.capabilityCards && data.capabilityCards.length > 0
      ? data.capabilityCards.map((c, i) => ({
          num: c.num ?? String(i + 1).padStart(2, '0'),
          heading: c.heading ?? '',
          body: c.body ?? '',
          proof: c.proof ?? '',
          imgUrl: sanityImageUrl(c.image ?? null),
          alt: c.heading ?? '',
        }))
      : null;
  const cards = cardsFromSanity ?? CAPABILITY_CARDS_FALLBACK.map((c) => ({
    num: c.num, heading: c.heading, body: c.body, proof: c.proof,
    imgUrl: c.imgUrl as string | null, alt: c.alt as string,
  }));

  // ── LOOP ────────────────────────────────────────────────────────────────────
  const loopEyebrow = data?.loopSection?.eyebrow ?? 'The Loop';
  const loopHeadline = data?.loopSection?.headline ?? 'Memphis to New Orleans.';
  const loopSubhead =
    data?.loopSection?.subhead ?? 'The Mississippi corridor. Real cities, real rooms, real audiences.';
  const citiesRaw = (data?.loopSection?.cities && data.loopSection.cities.length > 0)
    ? data.loopSection.cities
    : CORRIDOR_FALLBACK;
  const cities = citiesRaw.map((raw) => {
    const anchor = /\*\s*$/.test(raw);
    const clean = raw.replace(/\s*\*\s*$/, '').trim();
    return { label: clean, anchor };
  });
  const partnerNote =
    data?.loopSection?.partnerNote ??
    "Working with corridor partner Sean Davis (Doug Duffey’s manager, former director of the Delta Blues Museum) to expand routes through the Delta circuit.";

  // ── HOUSE BAND ──────────────────────────────────────────────────────────────
  const hbHeadline = data?.houseBandSection?.headline ?? 'Every great scene|had a house band.';
  const hbBody =
    data?.houseBandSection?.body ??
    "Muscle Shoals had the Swampers. Memphis had Booker T. & the M.G.’s. Stax had its rhythm section. Big Muddy has a rotating crew of corridor players who can back any artist who comes through. Singer-songwriter rolls in with no band? We’ve got you. Touring act needs a fill-in horn section? Done.";
  const hbCloser =
    data?.houseBandSection?.closer ??
    "If you can play, you’re on the list. The music just has to be good.";
  const hbImageUrl =
    sanityImageUrl(data?.houseBandSection?.backgroundImage ?? null) ??
    '/images/corridor/guitarist-chandelier-venue.webp';

  // ── SESSIONS ────────────────────────────────────────────────────────────────
  const sessionsFromSanity =
    data?.sessions && data.sessions.length > 0
      ? data.sessions.map((s) => ({
          title: s.title ?? '',
          description: s.description ?? '',
          note: s.note ?? '',
          imgUrl: sanityImageUrl(s.image ?? null),
          alt: s.title ?? '',
        }))
      : null;
  const sessions = sessionsFromSanity ?? SESSIONS_FALLBACK.map((s) => ({
    title: s.title, description: s.description, note: s.note,
    imgUrl: s.imgUrl as string | null, alt: s.alt as string,
  }));

  // ── THREE DOORS OUT ─────────────────────────────────────────────────────────
  const bandsDoor = {
    eyebrow: data?.threeDoorsOut?.bands?.eyebrow ?? 'For Bands',
    headline: data?.threeDoorsOut?.bands?.headline ?? 'Bring your band|to the corridor.',
    body: data?.threeDoorsOut?.bands?.body ?? "Submit your music. We’ll listen. If it fits, we’ll route a tour, put you on the radio, and book you a room.",
    ctaLabel: data?.threeDoorsOut?.bands?.ctaLabel ?? 'Submit Your Band',
    ctaHref: data?.threeDoorsOut?.bands?.ctaHref ?? 'mailto:bookings@bigmuddytouring.com',
  };
  const venuesDoor = {
    eyebrow: data?.threeDoorsOut?.venues?.eyebrow ?? 'For Venues',
    headline: data?.threeDoorsOut?.venues?.headline ?? 'Get on|the circuit.',
    body: data?.threeDoorsOut?.venues?.body ?? "Tell us what you can hold and what nights are open. We’ll bring confirmed acts, production support, and audience.",
    ctaLabel: data?.threeDoorsOut?.venues?.ctaLabel ?? 'Get on the Circuit',
    ctaHref: data?.threeDoorsOut?.venues?.ctaHref ?? 'mailto:bookings@bigmuddytouring.com',
  };
  const fansDoor = {
    eyebrow: data?.threeDoorsOut?.fans?.eyebrow ?? 'For Fans',
    headline: data?.threeDoorsOut?.fans?.headline ?? "What’s|coming up.",
    body: data?.threeDoorsOut?.fans?.body ?? 'Live music every week somewhere on the river. The radio plays it 24/7. The magazine writes about it.',
    links:
      data?.threeDoorsOut?.fans?.links && data.threeDoorsOut.fans.links.length > 0
        ? data.threeDoorsOut.fans.links.map((l) => ({ label: l.label ?? '', href: l.href ?? '#' }))
        : [
            { label: 'Listen to Big Muddy Radio →', href: '/radio' },
            { label: 'Read the Magazine →', href: '/magazine' },
            { label: 'See Upcoming Shows →', href: '/touring/shows' },
          ],
  };

  const footerLine = data?.footerLine ?? 'Big Muddy Touring — Natchez, Mississippi';

  return (
    <main
      style={{
        background: bg,
        color: text,
        minHeight: '100vh',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      {/*
        Mobile-responsive hero. Inline <style> block scopes the responsive
        rules — App Router doesn't ship styled-jsx, but a vanilla <style>
        element works fine and keeps all hero CSS in one file.
      */}
      <style>{`
        .bmt-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }
        .bmt-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.65) 35%, rgba(10,10,8,0.1) 70%, transparent 100%);
        }
        .bmt-hero__copy {
          position: relative;
          z-index: 1;
          padding: clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }
        .bmt-hero__eyebrow { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 20px; }
        .bmt-hero__title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(3.5rem, 10vw, 7.5rem);
          font-weight: 800;
          line-height: 0.88;
          letter-spacing: -0.04em;
          margin: 0 0 28px;
          max-width: 700px;
        }
        .bmt-hero__subhead {
          font-size: clamp(0.95rem, 1.6vw, 1.15rem);
          line-height: 1.65;
          color: rgba(232,224,212,0.75);
          max-width: 540px;
          margin: 0 0 36px;
          white-space: pre-line;
        }
        .bmt-hero__ctas { display: flex; gap: 16px; flex-wrap: wrap; justify-content: flex-end; }

        @media (max-width: 768px) {
          .bmt-hero {
            min-height: auto;
          }
          /* Stronger bottom gradient on mobile so text is readable over any image */
          .bmt-hero__overlay {
            background: linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.92) 30%, rgba(10,10,8,0.55) 60%, rgba(10,10,8,0.15) 100%);
          }
          .bmt-hero__copy {
            /* Left-align on mobile — right-align reads poorly on narrow screens with long copy */
            align-items: flex-start;
            text-align: left;
            padding: 32px 20px 40px;
            min-height: 88vh;
            justify-content: flex-end;
          }
          .bmt-hero__title {
            font-size: clamp(2.25rem, 9vw, 3.25rem);
            line-height: 1;
            margin: 0 0 20px;
            max-width: 100%;
          }
          .bmt-hero__subhead {
            font-size: 1rem;
            margin: 0 0 28px;
            max-width: 100%;
          }
          .bmt-hero__ctas { justify-content: flex-start; }
        }
      `}</style>
      <section className="bmt-hero">
        <Image
          src={heroImageUrl}
          alt="The corridor road, Memphis to New Orleans."
          fill
          priority
          quality={85}
          sizes="(max-width: 768px) 800px, 1600px"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="bmt-hero__overlay" />
        <div className="bmt-hero__copy">
          <p className="bmt-hero__eyebrow" style={{ color: gold }}>
            {heroEyebrow}
          </p>
          <h1 className="bmt-hero__title">
            {splitBars(heroHeadline)}
          </h1>
          <p className="bmt-hero__subhead">
            {heroSubhead}
          </p>
          <div className="bmt-hero__ctas">
            {primaryCta?.label && primaryCta?.href && (
              <a
                href={primaryCta.href}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: bg,
                  background: gold,
                  padding: '14px 36px',
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta?.label && secondaryCta?.href && (
              <a
                href={secondaryCta.href}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: gold,
                  border: `1px solid ${gold}`,
                  padding: '14px 36px',
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── CAPABILITY CARDS ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderTop: divider,
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: gold,
            margin: '0 0 48px',
          }}
        >
          What we do
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '1px',
            background: subtle,
            border: divider,
          }}
        >
          {cards.map((c, i) => (
            <div
              key={`${c.num}-${i}`}
              style={{ background: bg, borderBottom: divider, overflow: 'hidden' }}
            >
              {c.imgUrl && (
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                  <Image
                    src={c.imgUrl}
                    alt={c.alt}
                    fill
                    quality={75}
                    sizes="(max-width: 768px) 800px, 600px"
                    style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.72 }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,8,0.55) 100%)',
                    }}
                  />
                </div>
              )}
              <div style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-display, Georgia, serif)',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: gold,
                    margin: '0 0 12px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {c.num}
                </p>
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: text,
                    margin: '0 0 14px',
                  }}
                >
                  {c.heading}
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.55, color: text, margin: '0 0 10px' }}>
                  {c.body}
                </p>
                <p
                  style={{
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                    color: muted,
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  {c.proof}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE LOOP ─────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderTop: divider,
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: gold,
            margin: '0 0 16px',
          }}
        >
          {loopEyebrow}
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}
        >
          {splitBars(loopHeadline)}
        </h2>
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: muted,
            margin: '0 0 56px',
            maxWidth: '500px',
            lineHeight: 1.6,
          }}
        >
          {loopSubhead}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0',
            rowGap: '12px',
          }}
        >
          {cities.map((stop, i) => (
            <span key={`${stop.label}-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: stop.anchor ? 'clamp(1.1rem, 2vw, 1.4rem)' : 'clamp(0.9rem, 1.6vw, 1.1rem)',
                  fontWeight: stop.anchor ? 800 : 400,
                  color: stop.anchor ? gold : 'rgba(232,224,212,0.55)',
                  letterSpacing: stop.anchor ? '-0.02em' : '0',
                  whiteSpace: 'nowrap',
                }}
              >
                {stop.label}
              </span>
              {i < cities.length - 1 && (
                <span
                  style={{
                    color: 'rgba(200,148,62,0.3)',
                    margin: '0 10px',
                    fontSize: '0.9rem',
                  }}
                >
                  →
                </span>
              )}
            </span>
          ))}
        </div>
        <p
          style={{
            fontSize: '0.82rem',
            color: muted,
            margin: '48px 0 0',
            lineHeight: 1.6,
            maxWidth: '580px',
          }}
        >
          {partnerNote}
        </p>
      </section>

      {/* ── HOUSE BAND ───────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          borderTop: divider,
        }}
      >
        <Image
          src={hbImageUrl}
          alt="Live music at a corridor venue"
          fill
          quality={80}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, #0a0a08 0%, rgba(10,10,8,0.55) 30%, rgba(10,10,8,0.05) 65%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)',
            maxWidth: '660px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
            }}
          >
            {splitBars(hbHeadline)}
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'rgba(232,224,212,0.7)',
              margin: '0 0 20px',
              whiteSpace: 'pre-line',
            }}
          >
            {hbBody}
          </p>
          {hbCloser && (
            <p style={{ fontSize: '0.88rem', color: muted, margin: 0, fontStyle: 'italic' }}>
              {hbCloser}
            </p>
          )}
        </div>
      </section>

      {/* ── RECENT SESSIONS ──────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderTop: divider,
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: gold,
            margin: '0 0 48px',
          }}
        >
          Recent Sessions
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px',
          }}
        >
          {sessions.map((s, i) => (
            <article
              key={`${s.title}-${i}`}
              style={{
                border: divider,
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.02)',
                overflow: 'hidden',
              }}
            >
              {s.imgUrl && (
                <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                  <Image
                    src={s.imgUrl}
                    alt={s.alt}
                    fill
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover', objectPosition: 'center top', opacity: 0.85 }}
                  />
                </div>
              )}
              <div style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-display, Georgia, serif)',
                    fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: text,
                    margin: '0 0 10px',
                  }}
                >
                  {s.title}
                </p>
                <p style={{ fontSize: '0.88rem', color: muted, lineHeight: 1.5, margin: '0 0 10px' }}>
                  {s.description}
                </p>
                {s.note && (
                  <p style={{ fontSize: '0.78rem', color: gold, margin: 0, fontStyle: 'italic' }}>
                    {s.note}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── THREE DOORS OUT ──────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderTop: divider,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1px',
          background: subtle,
        }}
      >
        {/* For Bands */}
        <div id="bands" style={{ background: bg, padding: 'clamp(32px, 5vw, 56px)' }}>
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: gold,
              margin: '0 0 20px',
            }}
          >
            {bandsDoor.eyebrow}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
            }}
          >
            {splitBars(bandsDoor.headline)}
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: muted, margin: '0 0 28px' }}>
            {bandsDoor.body}
          </p>
          <a
            href={bandsDoor.ctaHref}
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: bg,
              background: gold,
              padding: '13px 28px',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            {bandsDoor.ctaLabel}
          </a>
        </div>

        {/* For Venues */}
        <div
          id="venues"
          style={{
            background: bg,
            padding: 'clamp(32px, 5vw, 56px)',
            borderLeft: divider,
            borderRight: divider,
          }}
        >
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: gold,
              margin: '0 0 20px',
            }}
          >
            {venuesDoor.eyebrow}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
            }}
          >
            {splitBars(venuesDoor.headline)}
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: muted, margin: '0 0 28px' }}>
            {venuesDoor.body}
          </p>
          <a
            href={venuesDoor.ctaHref}
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: gold,
              border: `1px solid ${gold}`,
              padding: '13px 28px',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            {venuesDoor.ctaLabel}
          </a>
        </div>

        {/* For Fans */}
        <div style={{ background: bg, padding: 'clamp(32px, 5vw, 56px)' }}>
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: gold,
              margin: '0 0 20px',
            }}
          >
            {fansDoor.eyebrow}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
            }}
          >
            {splitBars(fansDoor.headline)}
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: muted, margin: '0 0 28px' }}>
            {fansDoor.body}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {fansDoor.links.map((l, i) => (
              <a
                key={`${l.href}-${i}`}
                href={l.href}
                style={{
                  fontSize: '0.82rem',
                  color: gold,
                  textDecoration: 'none',
                  borderBottom:
                    i < fansDoor.links.length - 1 ? `1px solid rgba(200,148,62,0.2)` : 'none',
                  paddingBottom: i < fansDoor.links.length - 1 ? '12px' : 0,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: 'clamp(28px, 4vw, 48px) clamp(24px, 5vw, 80px)',
          borderTop: `1px solid rgba(200,148,62,0.08)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.65rem',
            color: 'rgba(200,148,62,0.4)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {footerLine}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.12)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Powered by Measurably Better Things
        </p>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 640px) {
              #venues {
                border-left: none !important;
                border-right: none !important;
                border-top: 1px solid rgba(200,148,62,0.12);
                border-bottom: 1px solid rgba(200,148,62,0.12);
              }
            }
          `,
        }}
      />
    </main>
  );
}
