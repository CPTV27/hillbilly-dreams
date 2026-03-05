// apps/web/app/magazine/page.tsx
// Magazine homepage — featured article + article grid with all 18 city guides

import type { Metadata } from 'next';
import Image from 'next/image';
import { ArticleCard, NewsletterSignup, BLUR_DATA_URL } from '@bigmuddy/ui';
import { CITY_GUIDE_ARTICLES, CORRIDOR_CITIES, LOUISIANA_CITIES, ARKANSAS_MISSOURI_CITIES } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Big Muddy Magazine',
  description:
    'Long-form editorial, city guides, and stories from the Mississippi music corridor. Eighteen cities across five states.',
};

const CATEGORIES = ['All', 'City Guide', 'Feature', 'Music', 'Interview', 'Photo Essay', 'Food & Drink'];

const REGION_GROUPS = [
  {
    id: 'corridor',
    label: 'The Corridor',
    description: 'Memphis to New Orleans',
    citySlugs: CORRIDOR_CITIES,
  },
  {
    id: 'louisiana',
    label: 'Louisiana',
    description: 'St. Francisville to Shreveport',
    citySlugs: LOUISIANA_CITIES,
  },
  {
    id: 'arkansas-missouri',
    label: 'Arkansas & Missouri',
    description: 'El Dorado to Branson',
    citySlugs: ARKANSAS_MISSOURI_CITIES,
  },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

async function getArticles(): Promise<typeof CITY_GUIDE_ARTICLES> {
  try {
    const res = await fetch(`${baseUrl}/api/articles?status=published`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return CITY_GUIDE_ARTICLES;
    const data = await res.json();
    const all = Array.isArray(data) ? data : data.data ?? [];
    return all.length > 0 ? all : CITY_GUIDE_ARTICLES;
  } catch {
    return CITY_GUIDE_ARTICLES;
  }
}

export default async function MagazineHomepage() {
  const articles = await getArticles();
  const [featured, ...grid] = articles;

  return (
    <>
      {/* ── Hero ── */}
      <section className="mag-hero">
        <Image
          src="https://storage.googleapis.com/bmt-media-bigmuddy/heroes/hero-mississippi-dawn.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="mag-hero__overlay" />
        <div className="mag-hero__content">
          <span className="mag-hero__issue">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <h1 className="mag-hero__title">Big Muddy Magazine</h1>
          <p className="mag-hero__sub">
            Stories from the Southern Gothic heartland
          </p>
        </div>
      </section>

      {/* ── Featured Article ── */}
      <section className="mag-featured">
        <div className="section-container">
          <div className="section-label">Featured Story</div>
          <ArticleCard article={featured} variant="featured" href={`/articles/${featured.slug}`} />
        </div>
      </section>

      {/* ── Fleet ── */}
      <section className="fleet-banner">
        <div className="fleet-banner__inner">
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/fleet/fleet-tesla-natchez-bluff.webp" alt="Big Muddy Tesla at the Natchez bluff overlook" width={1600} height={893} sizes="100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} style={{ width: '100%', height: 'auto' }} />
        </div>
      </section>

      {/* ── Category Filter + Grid ── */}
      <section className="mag-grid">
        <div className="section-container">
          <div className="mag-grid__header">
            <h2 className="mag-grid__title">Latest Stories</h2>
            <div className="mag-grid__categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`mag-cat-btn ${cat === 'All' ? 'mag-cat-btn--active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="mag-article-grid">
            {grid.map((article) => (
              <ArticleCard key={article.id} article={article} href={`/articles/${article.slug}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── City Guides CTA ── */}
      <section className="mag-city-guides">
        <div className="section-container">
          <div className="mag-city-guides__inner">
            <div className="mag-city-guides__text">
              <div className="section-label">City Guides</div>
              <h2 className="mag-city-guides__title">18 City Guides</h2>
              <p className="mag-city-guides__desc">
                Comprehensive guides to every city in the Big Muddy network — 
                where to eat, sleep, listen, and why it all matters.
                Five states. A thousand years of American music.
              </p>
              <a href="/city-guides" className="btn btn--outline">
                Browse City Guides
              </a>
            </div>
            <div className="mag-city-guides__regions">
              {REGION_GROUPS.map((region) => {
                const regionArticles = CITY_GUIDE_ARTICLES.filter((a) =>
                  region.citySlugs.includes(a.city as string)
                );
                return (
                  <div key={region.id} className="mag-region-group">
                    <div className="mag-region-group__label">{region.label}</div>
                    <div className="mag-region-group__desc">{region.description}</div>
                    <div className="mag-region-group__cities">
                      {regionArticles.map((article) => (
                        <a
                          key={article.id}
                          href={`/articles/${article.slug}`}
                          className="mag-city-tag"
                        >
                          {article.city
                            ? article.city
                                .split('-')
                                .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                                .join(' ')
                            : article.title}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        /* ── Hero ── */
        .mag-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg);
        }
        .mag-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 15, 13, 0.5) 0%, rgba(15, 15, 13, 0.65) 50%, rgba(15, 15, 13, 0.9) 100%);
          z-index: 1;
        }
        .mag-hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: var(--space-24) var(--space-6);
        }
        .mag-hero__issue {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          display: block;
          margin-bottom: var(--space-4);
        }
        .mag-hero__title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 8vw, 5.5rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
          margin: 0 0 var(--space-3);
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }
        .mag-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          font-style: italic;
          margin: 0;
        }

        /* ── Featured ── */
        .mag-featured {
          border-bottom: 1px solid var(--border);
        }

        /* ── Grid ── */
        .mag-grid {
          border-bottom: 1px solid var(--border);
        }
        .mag-grid__header {
          margin-bottom: var(--space-10);
        }
        .mag-grid__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-5);
        }
        .mag-grid__categories {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }
        .mag-cat-btn {
          padding: var(--space-2) var(--space-4);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
          color: var(--text-muted);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--duration-normal) var(--ease-default);
          text-transform: uppercase;
          box-shadow: var(--shadow-md);
        }
        .mag-cat-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .mag-cat-btn--active {
          background: var(--accent-muted);
          border-color: var(--accent);
          color: var(--accent);
        }
        .mag-article-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-6);
        }

        /* ── City Guides ── */
        .mag-city-guides {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .mag-city-guides__inner {
          display: flex;
          align-items: flex-start;
          gap: var(--space-16);
          flex-wrap: wrap;
        }
        .mag-city-guides__text {
          flex: 0 0 300px;
          min-width: 260px;
        }
        .mag-city-guides__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-4);
        }
        .mag-city-guides__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-6);
        }
        .mag-city-guides__regions {
          flex: 1;
          display: flex;
          gap: var(--space-10);
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .mag-region-group {
          min-width: 160px;
        }
        .mag-region-group__label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-1);
        }
        .mag-region-group__desc {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
          margin-bottom: var(--space-3);
        }
        .mag-region-group__cities {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .mag-city-tag {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: var(--tracking-tight);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
          line-height: 1.2;
          padding: var(--space-1) 0;
        }
        .mag-city-tag:hover {
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
