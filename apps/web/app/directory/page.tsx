// apps/web/app/directory/page.tsx
// Deep South Directory — Browse / Index Page
//
// Server Component. Fetches directly from Prisma (no API round-trip).
// Primary model: DirectoryBusiness (active=true, ordered by tier then name)
// Fallback: Client (status='active') if DirectoryBusiness table doesn't exist yet.
//
// Usage:
//   /directory              — all active businesses
//   /directory?type=restaurant — filtered by businessType / category
//   /directory?city=natchez — filtered by city (case-insensitive)

import type { Metadata } from 'next';
import Link from 'next/link';
import './directory-index.css';

// ── Types ────────────────────────────────────────────────────────────────────

interface DirectoryBusinessRecord {
  id: number;
  name: string;
  slug: string;
  tier: string;
  category: string;
  subcategory?: string | null;
  city: string;
  state: string;
  description?: string | null;
  heroImageUrl?: string | null;
  photoUrls?: string[];
  googleRating?: number | null;
  googleReviewCount?: number | null;
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
  description?: string | null;
  heroImageUrl?: string | null;
  status: string;
}

interface BusinessCard {
  id: number;
  name: string;
  slug: string;
  tier: string;
  category: string;
  city: string;
  state: string;
  description: string | null;
  heroImageUrl: string | null;
  googleRating: number | null;
  googleReviewCount: number | null;
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Deep South Directory — Find the Best of Main Street',
  description:
    'Browse local restaurants, shops, services, and hidden gems across the Deep South. Discover what makes Main Street worth a visit.',
  openGraph: {
    title: 'Deep South Directory',
    description: 'Find the best of Main Street across the Deep South.',
  },
};

// ── Data Fetching ─────────────────────────────────────────────────────────────

async function fetchBusinesses(filters: {
  type?: string;
  city?: string;
}): Promise<BusinessCard[]> {
  try {
    const { prisma } = await import('@/lib/db');

    const db = prisma as unknown as {
      directoryBusiness?: {
        findMany: (args: object) => Promise<DirectoryBusinessRecord[]>;
      };
      client?: {
        findMany: (args: object) => Promise<ClientRecord[]>;
      };
    };

    // Build where clause
    const where: Record<string, unknown> = { active: true };

    if (filters.type) {
      where.category = { contains: filters.type, mode: 'insensitive' };
    }
    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    // Primary: DirectoryBusiness
    if (db.directoryBusiness) {
      const rows = await db.directoryBusiness.findMany({
        where,
        orderBy: [{ tier: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          name: true,
          slug: true,
          tier: true,
          category: true,
          subcategory: true,
          city: true,
          state: true,
          description: true,
          heroImageUrl: true,
          photoUrls: true,
          googleRating: true,
          googleReviewCount: true,
          active: true,
        },
      });

      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        tier: r.tier,
        category: r.subcategory ? `${r.category} — ${r.subcategory}` : r.category,
        city: r.city,
        state: r.state,
        description: r.description ?? null,
        heroImageUrl: r.heroImageUrl ?? r.photoUrls?.[0] ?? null,
        googleRating: r.googleRating ?? null,
        googleReviewCount: r.googleReviewCount ?? null,
      }));
    }

    // Fallback: Client
    if (db.client) {
      const clientWhere: Record<string, unknown> = { status: 'active' };
      if (filters.type) {
        clientWhere.businessType = { contains: filters.type, mode: 'insensitive' };
      }
      if (filters.city) {
        clientWhere.city = { contains: filters.city, mode: 'insensitive' };
      }

      const rows = await db.client.findMany({
        where: clientWhere,
        orderBy: [{ tier: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          name: true,
          slug: true,
          tier: true,
          businessType: true,
          city: true,
          state: true,
          description: true,
          heroImageUrl: true,
          status: true,
        },
      });

      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        tier: r.tier,
        category: r.businessType,
        city: r.city,
        state: r.state,
        description: r.description ?? null,
        heroImageUrl: r.heroImageUrl ?? null,
        googleRating: null,
        googleReviewCount: null,
      }));
    }

    return [];
  } catch {
    // No DB / missing env — graceful degradation
    return [];
  }
}

// ── Icon Components ───────────────────────────────────────────────────────────
// Inline SVG — no icon library dependency

function MapPinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function StorefrontIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => ({
    filled: i < full || (i === full && hasHalf),
  }));

  return (
    <div
      className="dsdi-card__stars-row"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className={`dsdi-card__star${s.filled ? '' : ' dsdi-card__star--empty'}`}
        >
          <StarIcon filled={s.filled} />
        </span>
      ))}
    </div>
  );
}

// ── Category Filter Config ─────────────────────────────────────────────────────

const CATEGORY_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Restaurants', value: 'restaurant' },
  { label: 'Retail', value: 'retail' },
  { label: 'Services', value: 'service' },
  { label: 'Arts', value: 'art' },
  { label: 'Lodging', value: 'lodging' },
  { label: 'Food & Drink', value: 'food' },
];

// ── Business Card Component ───────────────────────────────────────────────────

function BusinessCardItem({ business }: { business: BusinessCard }) {
  const isPaid =
    business.tier &&
    !['free', 'front-porch'].includes(business.tier.toLowerCase());

  return (
    <article className="dsdi-card" aria-label={business.name}>
      {/* Hero image */}
      <div className="dsdi-card__image-wrap">
        {business.heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={business.heroImageUrl}
            alt={`${business.name} — storefront`}
            className="dsdi-card__image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="dsdi-card__image-placeholder" aria-hidden="true">
            <span className="dsdi-card__image-placeholder-icon">
              <StorefrontIcon />
            </span>
          </div>
        )}

        {/* Tier badge */}
        {isPaid && (
          <span className="dsdi-card__tier dsdi-card__tier--paid" aria-label={`${business.tier} tier`}>
            {business.tier}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="dsdi-card__body">
        {/* Category */}
        <span className="dsdi-card__category">{business.category}</span>

        {/* Name */}
        <Link
          href={`/directory/${business.slug}`}
          className="dsdi-card__name-link"
          aria-label={`View listing for ${business.name}`}
        >
          <h2 className="dsdi-card__name">{business.name}</h2>
        </Link>

        {/* Location */}
        <p className="dsdi-card__location">
          <MapPinIcon />
          <span>{business.city}, {business.state}</span>
        </p>

        {/* Description */}
        {business.description && (
          <p className="dsdi-card__description">{business.description}</p>
        )}

        {/* Stars */}
        {business.googleRating != null && (
          <div className="dsdi-card__stars">
            <StarRating rating={business.googleRating} />
            <span className="dsdi-card__rating">{business.googleRating.toFixed(1)}</span>
            {business.googleReviewCount != null && (
              <span className="dsdi-card__review-count">
                ({business.googleReviewCount.toLocaleString()})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card footer CTA */}
      <Link
        href={`/directory/${business.slug}`}
        className="dsdi-card__cta"
        tabIndex={-1}
        aria-hidden="true"
      >
        <span>View listing</span>
        <ArrowRightIcon />
      </Link>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{ type?: string; city?: string }>;
}

export default async function DirectoryIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const typeFilter = params.type ?? '';
  const cityFilter = params.city ?? '';

  const businesses = await fetchBusinesses({
    type: typeFilter || undefined,
    city: cityFilter || undefined,
  });

  const activeFilterLabel =
    CATEGORY_FILTERS.find((f) => f.value === typeFilter)?.label ?? 'All';

  const buildFilterUrl = (value: string) => {
    const parts: string[] = [];
    if (value) parts.push(`type=${encodeURIComponent(value)}`);
    if (cityFilter) parts.push(`city=${encodeURIComponent(cityFilter)}`);
    return `/directory${parts.length ? `?${parts.join('&')}` : ''}`;
  };

  return (
    <div className="theme-dsd dsdi-page">

      {/* ── Hero Header ── */}
      <header className="dsdi-hero" role="banner">
        <span className="dsdi-hero__eyebrow">Deep South Directory</span>
        <h1 className="dsdi-hero__title">Find the Best of Main Street</h1>
        <p className="dsdi-hero__subtitle">
          Local restaurants, shops, services, and hidden gems across the Deep South.
        </p>

        {/* Category filter pills — server-rendered links, no JS needed */}
        <nav className="dsdi-filters" aria-label="Filter by category">
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = filter.value === typeFilter;
            return (
              <Link
                key={filter.value}
                href={buildFilterUrl(filter.value)}
                className={`dsdi-filter-btn${isActive ? ' dsdi-filter-btn--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Show ${filter.label} listings`}
              >
                {filter.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* ── Results bar ── */}
      {(typeFilter || cityFilter) && (
        <div className="dsdi-results-bar" role="status" aria-live="polite">
          <p className="dsdi-results-count">
            <strong>{businesses.length}</strong>{' '}
            {businesses.length === 1 ? 'business' : 'businesses'}
            {activeFilterLabel !== 'All' ? ` in ${activeFilterLabel}` : ''}
            {cityFilter ? ` near ${cityFilter}` : ''}
          </p>
          <Link
            href="/directory"
            className="dsdi-results-count"
            style={{ color: 'var(--dsd-accent)', fontWeight: 600 }}
            aria-label="Clear all filters"
          >
            Clear filters
          </Link>
        </div>
      )}

      {/* ── Business Grid ── */}
      <main id="main-content" className="dsdi-grid-wrap">
        {businesses.length === 0 ? (
          /* ── Empty State ── */
          <div className="dsdi-empty" role="status">
            <div className="dsdi-empty__icon" aria-hidden="true">
              <StorefrontIcon />
            </div>
            <h2 className="dsdi-empty__title">No businesses listed yet.</h2>
            <p className="dsdi-empty__subtitle">
              Be the first to put your business on the map.
            </p>
            <Link href="/directory/onboard" className="dsdi-empty__cta">
              <PlusIcon />
              Get Listed Free
            </Link>
          </div>
        ) : (
          <ul
            className="dsdi-grid"
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
            aria-label={`${businesses.length} businesses listed`}
          >
            {businesses.map((business) => (
              <li key={business.id}>
                <BusinessCardItem business={business} />
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* ── Footer CTA Banner ── */}
      <footer className="dsdi-footer-cta">
        <span className="dsdi-footer-cta__eyebrow">Join the directory</span>
        <h2 className="dsdi-footer-cta__title">Own a business?<br />Get listed.</h2>
        <p className="dsdi-footer-cta__subtitle">
          Put your business in front of locals and visitors who are looking right now.
        </p>
        <Link href="/directory/onboard" className="dsdi-footer-cta__btn">
          <PlusIcon />
          Get Listed Today
        </Link>
        <span className="dsdi-footer-cta__fine">Free listing available. Paid tiers from $99/mo.</span>
      </footer>

    </div>
  );
}
