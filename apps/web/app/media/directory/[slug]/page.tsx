// apps/web/app/media/directory/[slug]/page.tsx
// Deep South Directory — individual business profile page.
// Server component. ISR at 300s. Schema.org LocalBusiness structured data.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

interface DirectoryClient {
  id: number;
  name: string;
  slug: string;
  tier: string;
  businessType: string;
  city: string;
  state: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  logoUrl: string | null;
  heroImageUrl: string | null;
  website: string | null;
  gbpUrl: string | null;
  platforms: string[];
}

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
  city: string | null;
  category: string | null;
  heroImage: string | null;
}

async function getClient(slug: string): Promise<DirectoryClient | null> {
  try {
    const res = await fetch(`${baseUrl}/api/directory?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

async function getCityArticles(city: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams({ city, status: 'published', take: '4' });
    const res = await fetch(`${baseUrl}/api/articles?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data ?? []);
  } catch {
    return [];
  }
}

// ── Metadata ────────────────────────────────────────────────────────────────

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = await getClient(params.slug);
  if (!client) return { title: 'Business Not Found' };
  return {
    title: `${client.name} — ${client.city}, ${client.state}`,
    description:
      client.description ||
      `${client.name} in ${client.city}, ${client.state} — a Deep South Directory member.`,
    openGraph: {
      title: `${client.name} | Deep South Directory`,
      description:
        client.description ||
        `${client.name} — ${client.city}, ${client.state}`,
      ...(client.heroImageUrl ? { images: [{ url: client.heroImageUrl }] } : {}),
    },
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const TIER_LABELS: Record<string, string> = {
  'front-porch': 'Front Porch',
  'the-route': 'The Route',
  'river-room': 'River Room',
  'blues-room': 'Blues Room',
};

const TYPE_LABELS: Record<string, string> = {
  restaurant: 'Restaurant',
  venue: 'Venue',
  hotel: 'Hotel',
  shop: 'Shop',
  tour: 'Tour',
  service: 'Service',
};

const PLATFORM_ICONS: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  twitter: 'X (Twitter)',
  youtube: 'YouTube',
  tripadvisor: 'TripAdvisor',
  yelp: 'Yelp',
};

function schemaType(businessType: string) {
  if (businessType === 'restaurant') return 'Restaurant';
  if (businessType === 'hotel') return 'Hotel';
  if (businessType === 'venue') return 'MusicVenue';
  return 'LocalBusiness';
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function BusinessProfilePage({ params }: Props) {
  const client = await getClient(params.slug);

  if (!client) notFound();

  const cityArticles = await getCityArticles(client.city);

  const tierLabel = TIER_LABELS[client.tier] ?? client.tier;
  const typeLabel = TYPE_LABELS[client.businessType] ?? client.businessType;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': schemaType(client.businessType),
    name: client.name,
    ...(client.description ? { description: client.description } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(client.address ? { streetAddress: client.address } : {}),
      addressLocality: client.city,
      addressRegion: client.state,
      addressCountry: 'US',
    },
    ...(client.phone ? { telephone: client.phone } : {}),
    ...(client.website ? { url: client.website } : {}),
    ...(client.logoUrl ? { image: client.logoUrl } : {}),
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Hero ── */}
      <section className="biz-hero" style={client.heroImageUrl ? { '--hero-image': `url(${client.heroImageUrl})` } as React.CSSProperties : undefined}>
        {client.heroImageUrl && <div className="biz-hero__overlay" aria-hidden="true" />}
        <div className="biz-hero__content">
          <div className="biz-hero__breadcrumb">
            <a href="/media/directory" className="biz-hero__back">
              ← Directory
            </a>
            <span className="biz-hero__breadcrumb-sep" aria-hidden="true">/</span>
            <span>{client.city}</span>
          </div>
          <div className="biz-hero__badges">
            <span className={`dir-badge dir-badge--type dir-badge--${client.businessType}`}>
              {typeLabel}
            </span>
            <span className="dir-badge dir-badge--tier">{tierLabel}</span>
          </div>
          <h1 className="biz-hero__name">{client.name}</h1>
          <p className="biz-hero__location">
            {client.city}, {client.state}
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="biz-body">
        <div className="section-container">
          <div className="biz-layout">

            {/* ── Left: main content ── */}
            <div className="biz-main">

              {/* Description */}
              {client.description && (
                <section className="biz-section" aria-labelledby="biz-about-heading">
                  <h2 id="biz-about-heading" className="biz-section__title">About</h2>
                  <p className="biz-description">{client.description}</p>
                </section>
              )}

              {/* Platforms */}
              {client.platforms && client.platforms.length > 0 && (
                <section className="biz-section" aria-labelledby="biz-platforms-heading">
                  <h2 id="biz-platforms-heading" className="biz-section__title">Find Us Online</h2>
                  <ul className="biz-platforms" role="list">
                    {client.platforms.map((p) => (
                      <li key={p} className="biz-platform-item">
                        <span className="biz-platform-icon" aria-hidden="true">↗</span>
                        <span className="biz-platform-name">
                          {PLATFORM_ICONS[p.toLowerCase()] ?? p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Featured In */}
              {cityArticles.length > 0 && (
                <section className="biz-section" aria-labelledby="biz-featured-heading">
                  <h2 id="biz-featured-heading" className="biz-section__title">
                    Featured In — {client.city} Coverage
                  </h2>
                  <p className="biz-section__sub">
                    Stories and guides from Big Muddy Magazine covering {client.city}.
                  </p>
                  <div className="biz-articles">
                    {cityArticles.map((article) => (
                      <a
                        key={article.id}
                        href={`/magazine/articles/${article.slug}`}
                        className="biz-article-card"
                        aria-label={article.title}
                      >
                        {article.heroImage && (
                          <img
                            src={article.heroImage}
                            alt=""
                            className="biz-article-card__img"
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        <div className="biz-article-card__text">
                          {article.category && (
                            <span className="biz-article-card__cat">{article.category}</span>
                          )}
                          <p className="biz-article-card__title">{article.title}</p>
                          {article.excerpt && (
                            <p className="biz-article-card__excerpt">
                              {article.excerpt.length > 100
                                ? article.excerpt.slice(0, 97) + '…'
                                : article.excerpt}
                            </p>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* ── Right: sidebar ── */}
            <aside className="biz-sidebar" aria-label="Business contact information">

              {/* Contact card */}
              <div className="biz-contact-card">
                <h2 className="biz-contact-card__title">Contact & Location</h2>

                {client.address && (
                  <div className="biz-contact-row">
                    <span className="biz-contact-row__icon" aria-hidden="true">◎</span>
                    <div className="biz-contact-row__content">
                      <span className="biz-contact-row__label">Address</span>
                      <span className="biz-contact-row__value">{client.address}</span>
                      <span className="biz-contact-row__value">
                        {client.city}, {client.state}
                      </span>
                    </div>
                  </div>
                )}

                {client.phone && (
                  <div className="biz-contact-row">
                    <span className="biz-contact-row__icon" aria-hidden="true">◈</span>
                    <div className="biz-contact-row__content">
                      <span className="biz-contact-row__label">Phone</span>
                      <a href={`tel:${client.phone}`} className="biz-contact-row__link">
                        {client.phone}
                      </a>
                    </div>
                  </div>
                )}

                {client.email && (
                  <div className="biz-contact-row">
                    <span className="biz-contact-row__icon" aria-hidden="true">▣</span>
                    <div className="biz-contact-row__content">
                      <span className="biz-contact-row__label">Email</span>
                      <a href={`mailto:${client.email}`} className="biz-contact-row__link">
                        {client.email}
                      </a>
                    </div>
                  </div>
                )}

                {client.website && (
                  <div className="biz-contact-row">
                    <span className="biz-contact-row__icon" aria-hidden="true">↗</span>
                    <div className="biz-contact-row__content">
                      <span className="biz-contact-row__label">Website</span>
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="biz-contact-row__link"
                      >
                        {client.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}

                {client.gbpUrl && (
                  <a
                    href={client.gbpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="biz-contact-card__maps-btn"
                    aria-label={`View ${client.name} on Google Maps`}
                  >
                    View on Google Maps →
                  </a>
                )}
              </div>

              {/* CTA card */}
              <div className="biz-cta-card">
                <div className="biz-cta-card__ornament" aria-hidden="true">&#9670;</div>
                <p className="biz-cta-card__heading">Want your business in the directory?</p>
                <p className="biz-cta-card__sub">
                  Join the Deep South Directory. Get listed, get featured, get found.
                </p>
                <a href="/media/directory/claim" className="btn btn--primary biz-cta-card__btn">
                  Claim Your Business →
                </a>
                <a href="/media/pricing" className="biz-cta-card__pricing-link">
                  Starting at $99/month
                </a>
              </div>

            </aside>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Shared badge styles (mirrored from directory index) ── */
        .dir-badge {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          padding: 2px var(--space-2);
          border-radius: var(--radius-sm);
          line-height: 1.6;
        }
        .dir-badge--type {
          background: rgba(200, 148, 62, 0.12);
          color: var(--accent);
          border: 1px solid rgba(200, 148, 62, 0.25);
        }
        .dir-badge--restaurant { background: rgba(200, 100, 62, 0.1); color: #c8643e; border: 1px solid rgba(200, 100, 62, 0.22); }
        .dir-badge--venue      { background: rgba(100, 62, 200, 0.1); color: #8b5cf6; border: 1px solid rgba(100, 62, 200, 0.22); }
        .dir-badge--hotel      { background: rgba(62, 150, 200, 0.1); color: #3b9ec4; border: 1px solid rgba(62, 150, 200, 0.22); }
        .dir-badge--shop       { background: rgba(62, 200, 120, 0.1); color: #3ec878; border: 1px solid rgba(62, 200, 120, 0.22); }
        .dir-badge--tour       { background: rgba(200, 180, 62, 0.1); color: #c8b43e; border: 1px solid rgba(200, 180, 62, 0.22); }
        .dir-badge--service    { background: rgba(180, 180, 180, 0.1); color: var(--text-muted); border: 1px solid var(--border); }
        .dir-badge--tier {
          background: transparent;
          color: var(--text-disabled);
          border: 1px solid var(--border-subtle);
        }

        /* ── Hero ── */
        .biz-hero {
          position: relative;
          background:
            var(--hero-image, none)
            var(--bg) center / cover no-repeat;
          border-bottom: 1px solid var(--border);
          min-height: 320px;
          display: flex;
          align-items: flex-end;
        }
        .biz-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 15, 13, 0.92) 0%,
            rgba(15, 15, 13, 0.5) 50%,
            rgba(15, 15, 13, 0.2) 100%
          );
          z-index: 0;
        }
        .biz-hero__content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: var(--space-12) var(--space-6) var(--space-10);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .biz-hero__breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          margin-bottom: var(--space-2);
        }
        .biz-hero__back {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .biz-hero__back:hover {
          color: var(--text);
        }
        .biz-hero__breadcrumb-sep {
          color: var(--border);
        }
        .biz-hero__badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .biz-hero__name {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, var(--text-5xl));
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0;
        }
        .biz-hero__location {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          margin: 0;
        }

        /* ── Body layout ── */
        .biz-body {
          background: var(--bg);
          padding-bottom: var(--space-20);
        }
        .biz-body .section-container {
          padding-top: var(--space-10);
        }
        .biz-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-10);
          align-items: start;
        }
        @media (min-width: 900px) {
          .biz-layout {
            grid-template-columns: 1fr 320px;
            gap: var(--space-12);
          }
        }

        /* ── Sections ── */
        .biz-section {
          padding-bottom: var(--space-10);
          border-bottom: 1px solid var(--border);
          margin-bottom: var(--space-10);
        }
        .biz-section:last-child {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }
        .biz-section__title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .biz-section__sub {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin: calc(-1 * var(--space-3)) 0 var(--space-6);
          line-height: var(--leading-normal);
        }
        .biz-description {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          max-width: 640px;
        }

        /* ── Platforms ── */
        .biz-platforms {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .biz-platform-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: var(--space-2) var(--space-4);
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .biz-platform-item:hover {
          border-color: var(--accent);
        }
        .biz-platform-icon {
          font-size: var(--text-xs);
          color: var(--accent);
        }
        .biz-platform-name {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
        }

        /* ── Articles ── */
        .biz-articles {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-4);
        }
        @media (min-width: 640px) {
          .biz-articles {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .biz-article-card {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          text-decoration: none;
          transition:
            border-color var(--duration-fast) var(--ease-default),
            box-shadow var(--duration-fast) var(--ease-default);
        }
        .biz-article-card:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .biz-article-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .biz-article-card__img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          background: var(--surface-2);
        }
        .biz-article-card__text {
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          flex: 1;
        }
        .biz-article-card__cat {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .biz-article-card__title {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0;
        }
        .biz-article-card__excerpt {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }

        /* ── Contact Card ── */
        .biz-contact-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          margin-bottom: var(--space-5);
        }
        .biz-contact-card__title {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--border);
        }
        .biz-contact-row {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-3) 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .biz-contact-row:last-of-type {
          border-bottom: none;
        }
        .biz-contact-row__icon {
          font-size: var(--text-base);
          color: var(--accent);
          opacity: 0.6;
          flex-shrink: 0;
          margin-top: 1px;
          width: 1.2em;
          text-align: center;
        }
        .biz-contact-row__content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .biz-contact-row__label {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .biz-contact-row__value {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
        }
        .biz-contact-row__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--accent);
          text-decoration: none;
          word-break: break-word;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .biz-contact-row__link:hover {
          color: var(--text);
        }
        .biz-contact-card__maps-btn {
          display: block;
          margin-top: var(--space-5);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          padding: var(--space-3) var(--space-4);
          border: 1px solid rgba(200, 148, 62, 0.3);
          border-radius: var(--radius-md);
          text-align: center;
          transition:
            background var(--duration-fast) var(--ease-default),
            border-color var(--duration-fast) var(--ease-default);
        }
        .biz-contact-card__maps-btn:hover {
          background: rgba(200, 148, 62, 0.08);
          border-color: var(--accent);
        }

        /* ── CTA Card ── */
        .biz-cta-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .biz-cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(200, 148, 62, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .biz-cta-card__ornament {
          font-size: 10px;
          color: var(--accent);
          opacity: 0.4;
          margin-bottom: var(--space-4);
          display: block;
        }
        .biz-cta-card__heading {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
          line-height: var(--leading-tight);
        }
        .biz-cta-card__sub {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-5);
        }
        .biz-cta-card__btn {
          width: 100%;
          justify-content: center;
          margin-bottom: var(--space-3);
        }
        .biz-cta-card__pricing-link {
          display: block;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .biz-cta-card__pricing-link:hover {
          color: var(--text-muted);
        }

        /* ── Sidebar stacks below content on mobile ── */
        @media (max-width: 899px) {
          .biz-sidebar {
            order: -1;
          }
        }
      `}</style>
    </>
  );
}
