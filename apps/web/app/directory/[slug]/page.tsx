// apps/web/app/directory/[slug]/page.tsx
// Deep South Directory — Public Business Listing
//
// This is the DEMO PAGE Chase walks into a restaurant with on his phone to close
// a $99/mo sale. Mobile-first, fast, credible. Works as a Server Component with
// direct Prisma access (no API round-trip). Graceful degradation on all null fields.
//
// Data priority:
//   1. DirectoryBusiness (slug match, active=true) — richer data (hours, photos, spotlight)
//   2. Client (slug match, status='active') — fallback for paid clients
//   3. Placeholder page if neither exists

import type { Metadata } from 'next';
import Link from 'next/link';
import './directory-listing.css';

// ── Types ────────────────────────────────────────────────────

interface DirectoryBusinessRecord {
  id: number;
  name: string;
  slug: string;
  category: string;
  subcategory?: string | null;
  city: string;
  state: string;
  address?: string | null;
  phone?: string | null;
  website?: string | null;
  description?: string;
  spotlight?: string | null;
  tier: string;
  googleRating?: number | null;
  googleReviewCount?: number | null;
  hoursJson?: unknown;
  photoUrls?: string[];
  active: boolean;
}

interface ClientRecord {
  id: number;
  name: string;
  slug: string;
  tier: string;
  businessType: string;
  city: string;
  state: string;
  address?: string | null;
  phone?: string | null;
  website?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  heroImageUrl?: string | null;
  gbpUrl?: string | null;
  platforms?: string[];
}

// Unified shape used for rendering
interface ListingData {
  id: number;
  name: string;
  slug: string;
  category: string;
  tier: string;
  city: string;
  state: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  spotlight: string | null;
  heroImageUrl: string | null;
  gbpUrl: string | null;
  platforms: string[];
  googleRating: number | null;
  googleReviewCount: number | null;
  hoursJson: unknown;
  photoUrls: string[];
}

type HoursMap = Record<string, { open: string; close: string } | null>;

// ── Data Fetching ─────────────────────────────────────────────

async function fetchListing(slug: string): Promise<ListingData | null> {
  try {
    const { prisma } = await import('@/lib/db');
    const db = prisma as unknown as {
      directoryBusiness: {
        findFirst: (args: object) => Promise<DirectoryBusinessRecord | null>;
      };
      client: {
        findFirst: (args: object) => Promise<ClientRecord | null>;
      };
    };

    // Try DirectoryBusiness first
    const dbd = await db.directoryBusiness.findFirst({
      where: { slug, active: true },
    });

    if (dbd) {
      return {
        id: dbd.id,
        name: dbd.name,
        slug: dbd.slug,
        category: dbd.subcategory ? `${dbd.category} — ${dbd.subcategory}` : dbd.category,
        tier: dbd.tier,
        city: dbd.city,
        state: dbd.state,
        address: dbd.address ?? null,
        phone: dbd.phone ?? null,
        website: dbd.website ?? null,
        description: dbd.description ?? null,
        spotlight: dbd.spotlight ?? null,
        heroImageUrl: dbd.photoUrls?.[0] ?? null,
        gbpUrl: null,
        platforms: [],
        googleRating: dbd.googleRating ?? null,
        googleReviewCount: dbd.googleReviewCount ?? null,
        hoursJson: dbd.hoursJson ?? null,
        photoUrls: dbd.photoUrls ?? [],
      };
    }

    // Fall back to Client
    const client = await db.client.findFirst({
      where: { slug, status: 'active' },
    });

    if (client) {
      return {
        id: client.id,
        name: client.name,
        slug: client.slug,
        category: client.businessType,
        tier: client.tier,
        city: client.city,
        state: client.state,
        address: client.address ?? null,
        phone: client.phone ?? null,
        website: client.website ?? null,
        description: client.description ?? null,
        spotlight: null,
        heroImageUrl: client.heroImageUrl ?? null,
        gbpUrl: client.gbpUrl ?? null,
        platforms: client.platforms ?? [],
        googleRating: null,
        googleReviewCount: null,
        hoursJson: null,
        photoUrls: [],
      };
    }

    return null;
  } catch {
    // No DB / missing env — return null gracefully
    return null;
  }
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const listing = await fetchListing(slug);

  if (!listing) {
    return {
      title: 'Business Not Found — Deep South Directory',
    };
  }

  const description =
    listing.spotlight ??
    listing.description ??
    `${listing.name} in ${listing.city}, ${listing.state}. Listed on Deep South Directory.`;

  return {
    title: `${listing.name} — ${listing.city}, ${listing.state} | Deep South Directory`,
    description: description.slice(0, 160),
    openGraph: {
      title: listing.name,
      description: description.slice(0, 160),
      images: listing.heroImageUrl ? [listing.heroImageUrl] : [],
    },
  };
}

// ── Icon Components ───────────────────────────────────────────
// Inline SVG icons — no icon library dependency

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.64 19.79 19.79 0 01.01 1.06 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
    </svg>
  );
}

function MapPinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ── Star Rating ───────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => ({
    filled: i < full || (i === full && hasHalf),
  }));
  return (
    <div className="dsd-reviews__stars" aria-label={`${rating} out of 5 stars`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className={`dsd-reviews__star${s.filled ? '' : ' dsd-reviews__star--empty'}`}
        >
          <StarIcon filled={s.filled} />
        </span>
      ))}
    </div>
  );
}

// ── Hours Parser ──────────────────────────────────────────────

const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_SHORT: Record<string, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};

function parseHours(hoursJson: unknown): HoursMap | null {
  if (!hoursJson || typeof hoursJson !== 'object') return null;
  const raw = hoursJson as Record<string, unknown>;
  const result: HoursMap = {};
  for (const day of DAY_ORDER) {
    const val = raw[day];
    if (val === null || val === undefined) {
      result[day] = null;
    } else if (typeof val === 'object' && val !== null) {
      const entry = val as Record<string, unknown>;
      if (typeof entry.open === 'string' && typeof entry.close === 'string') {
        result[day] = { open: entry.open, close: entry.close };
      } else {
        result[day] = null;
      }
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

function getTodayKey(): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

// ── Section Components ────────────────────────────────────────

function HoursSection({ hoursJson }: { hoursJson: unknown }) {
  const hours = parseHours(hoursJson);
  if (!hours) return null;
  const todayKey = getTodayKey();

  return (
    <section className="dsd-card" aria-label="Business Hours">
      <div className="dsd-card__header">
        <span className="dsd-card__header-icon"><ClockIcon /></span>
        <h2 className="dsd-card__title">Hours</h2>
      </div>
      <div className="dsd-card__body">
        <dl className="dsd-hours">
          {DAY_ORDER.map((day) => {
            const entry = hours[day];
            const isToday = day === todayKey;
            return (
              <div key={day} className="dsd-hours__row">
                <dt className={`dsd-hours__day${isToday ? ' dsd-hours__day--today' : ''}`}>
                  {isToday ? <strong>{DAY_SHORT[day]}</strong> : DAY_SHORT[day]}
                </dt>
                <dd className="dsd-hours__time">
                  {entry ? (
                    <span>{entry.open} – {entry.close}</span>
                  ) : (
                    <span className="dsd-hours__closed">Closed</span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function PhotosSection({ photoUrls }: { photoUrls: string[] }) {
  if (!photoUrls.length) return null;
  const countClass =
    photoUrls.length === 1
      ? 'dsd-photos--single'
      : photoUrls.length >= 3
      ? 'dsd-photos--three'
      : '';

  return (
    <section aria-label="Photos">
      <div className={`dsd-photos ${countClass}`}>
        {photoUrls.slice(0, 6).map((url, i) => (
          <div key={i} className="dsd-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`Photo ${i + 1}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsSection({
  rating,
  count,
  gbpUrl,
}: {
  rating: number | null;
  count: number | null;
  gbpUrl: string | null;
}) {
  if (!rating) return null;
  const displayRating = rating.toFixed(1);

  return (
    <section className="dsd-card" aria-label="Google Reviews">
      <div className="dsd-card__header">
        <span className="dsd-card__header-icon"><GoogleIcon /></span>
        <h2 className="dsd-card__title">Google Reviews</h2>
      </div>
      <div className="dsd-card__body">
        <div className="dsd-reviews">
          <span className="dsd-reviews__score" aria-hidden="true">
            {displayRating}
          </span>
          <StarRating rating={rating} />
          <div className="dsd-reviews__meta">
            {count != null && (
              <span className="dsd-reviews__count">
                {count.toLocaleString()} review{count !== 1 ? 's' : ''}
              </span>
            )}
            {gbpUrl && (
              <a
                href={gbpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dsd-reviews__link"
                aria-label={`Read reviews on Google (opens in new tab)`}
              >
                Read on Google
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default async function DirectoryListingPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const listing = await fetchListing(slug);

  if (!listing) {
    return (
      <div className="theme-dsd dsd-page">
        <div className="dsd-not-found" role="main">
          <h1 className="dsd-not-found__title">Listing Not Found</h1>
          <p className="dsd-not-found__subtitle">
            We couldn&apos;t find a business at this address. It may have moved
            or hasn&apos;t been listed yet.
          </p>
          <Link href="/directory" className="dsd-directions-btn">
            Browse the Directory
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    category,
    tier,
    city,
    state,
    address,
    phone,
    website,
    description,
    spotlight,
    heroImageUrl,
    gbpUrl,
    platforms,
    googleRating,
    googleReviewCount,
    hoursJson,
    photoUrls,
  } = listing;

  const bodyText = spotlight || description;

  // Build Maps link
  const mapsQuery = encodeURIComponent(
    [name, address, city, state].filter(Boolean).join(', ')
  );
  const mapsUrl = `https://maps.google.com/?q=${mapsQuery}`;

  // Format phone for display
  const phoneDisplay = phone
    ? phone.replace(/^\+1/, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    : null;
  const phoneHref = phone
    ? `tel:${phone.replace(/[^+\d]/g, '')}`
    : null;

  // Clean website for display
  const websiteDisplay = website
    ? website.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : null;

  const hasPaidTier =
    tier && !['free', 'front-porch'].includes(tier.toLowerCase());

  return (
    <div className="theme-dsd dsd-page">
      {/* ── Hero ── */}
      <header className="dsd-hero" role="banner">
        {heroImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImageUrl}
            alt={`${name} — hero image`}
            className="dsd-hero__image"
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className="dsd-hero__overlay" aria-hidden="true" />
        <div className="dsd-hero__content">
          <span className="dsd-hero__badge">{category}</span>
          <h1 className="dsd-hero__name">{name}</h1>
          <p className="dsd-hero__location">
            <MapPinIcon size={14} />
            {city}, {state}
          </p>
        </div>
      </header>

      {/* ── Quick Info Bar ── */}
      <nav className="dsd-info-bar" aria-label="Quick contact actions">
        {phoneHref && (
          <a
            href={phoneHref}
            className="dsd-info-btn"
            aria-label={`Call ${name}: ${phoneDisplay}`}
          >
            <PhoneIcon />
            <span className="dsd-info-btn__label">Call</span>
          </a>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="dsd-info-btn"
            aria-label={`Visit ${name} website (opens in new tab)`}
          >
            <GlobeIcon />
            <span className="dsd-info-btn__label">Website</span>
          </a>
        )}
        {address && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dsd-info-btn"
            aria-label={`Get directions to ${name} (opens in Google Maps)`}
          >
            <MapPinIcon />
            <span className="dsd-info-btn__label">Directions</span>
          </a>
        )}
      </nav>

      {/* ── Body ── */}
      <main className="dsd-body" id="main-content">

        {/* AI Spotlight / Description */}
        {bodyText && (
          <section className="dsd-card" aria-label="About this business">
            <div className="dsd-card__header">
              <h2 className="dsd-card__title">
                {spotlight ? 'Deep South Spotlight' : 'About'}
              </h2>
            </div>
            <div className="dsd-card__body">
              <p className="dsd-spotlight__text">{bodyText}</p>
            </div>
          </section>
        )}

        {/* Google Reviews */}
        <ReviewsSection
          rating={googleRating}
          count={googleReviewCount}
          gbpUrl={gbpUrl}
        />

        {/* Hours */}
        <HoursSection hoursJson={hoursJson} />

        {/* Photos */}
        {photoUrls.length > 0 && (
          <section className="dsd-card" aria-label="Photos">
            <div className="dsd-card__header">
              <h2 className="dsd-card__title">Photos</h2>
            </div>
            <PhotosSection photoUrls={photoUrls} />
          </section>
        )}

        {/* Address */}
        {address && (
          <section className="dsd-card" aria-label="Location">
            <div className="dsd-card__header">
              <span className="dsd-card__header-icon">
                <MapPinIcon size={16} />
              </span>
              <h2 className="dsd-card__title">Location</h2>
            </div>
            <div className="dsd-card__body">
              <div className="dsd-address">
                <address className="dsd-address__text" style={{ fontStyle: 'normal' }}>
                  {address}
                  <br />
                  {city}, {state}
                </address>
                {website && websiteDisplay && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dsd-reviews__link"
                    style={{ fontSize: 'var(--text-sm)', display: 'inline-block', marginTop: 'var(--space-1)' }}
                  >
                    {websiteDisplay}
                  </a>
                )}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dsd-directions-btn"
                  aria-label={`Get directions to ${name} in Google Maps (opens in new tab)`}
                >
                  <MapPinIcon size={16} />
                  Get Directions
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Platform Tags (for paid clients) */}
        {platforms.length > 0 && (
          <section className="dsd-card" aria-label="Platforms">
            <div className="dsd-card__header">
              <h2 className="dsd-card__title">Listed On</h2>
            </div>
            <div className="dsd-platforms">
              {platforms.map((p) => (
                <span key={p} className="dsd-platform-tag">{p}</span>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* ── Footer CTA ── */}
      <footer className="dsd-footer">
        {hasPaidTier ? (
          <div className="dsd-powered-by">
            <span className="dsd-powered-by__label">Powered by</span>
            <span className="dsd-powered-by__brand">Deep South Directory</span>
          </div>
        ) : (
          <>
            <a
              href={`/directory/claim?slug=${slug}`}
              className="dsd-claim-btn"
            >
              Claim This Business
            </a>
            <div className="dsd-powered-by">
              <span className="dsd-powered-by__label">Powered by</span>
              <span className="dsd-powered-by__brand">Deep South Directory</span>
            </div>
          </>
        )}
      </footer>
    </div>
  );
}
