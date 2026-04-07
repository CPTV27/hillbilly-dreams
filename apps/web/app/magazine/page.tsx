// apps/web/app/magazine/page.tsx
// Magazine homepage — featured article + article grid with all 18 city guides

import type { Metadata } from 'next';
import Image from 'next/image';
import { ArticleCard, NewsletterSignup, IllustrationDivider, BLUR_DATA_URL } from '@bigmuddy/ui';
import { CITY_GUIDE_ARTICLES, DEEP_SOUTH_GUIDE_CITIES, LOUISIANA_CITIES, ARKANSAS_MISSOURI_CITIES } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Big Muddy Magazine',
  description:
    'Long-form editorial, city guides, and stories from the Deep South. Eighteen cities across five states.',
};

const CATEGORIES = ['All', 'City Guide', 'Feature', 'Music', 'Interview', 'Photo Essay', 'Food & Drink'];

const REGION_GROUPS = [
  {
    id: 'region',
    label: 'The Region',
    description: 'Memphis to New Orleans',
    citySlugs: DEEP_SOUTH_GUIDE_CITIES,
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
          src="/images/processed/big-muddy/natchez-brick-street-live-oaks.webp"
          alt="Brick street under live oak canopy in Natchez — azaleas, historic homes, dappled afternoon light"
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

      {/* ── Magazine Intro ── */}
      <section
        className="section-container"
        style={{
          padding: 'var(--space-12) var(--space-6)',
          maxWidth: '700px',
          position: 'relative',
          zIndex: 1,
          background: 'var(--bg)',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          lineHeight: 1.7,
          color: 'var(--text)',
          textAlign: 'center',
        }}>
          Long-form editorial from the Deep South. City guides, artist profiles,
          photo essays, and the stories behind the businesses, musicians, and towns that make
          this region what it is. Published from Natchez, Mississippi.
        </p>
      </section>

      {/* ── Newsletter (moved up) ── */}
      <section
        style={{
          padding: '0 var(--space-6) var(--space-8)',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          background: 'var(--bg)',
        }}
      >
        <NewsletterSignup />
      </section>

      {/* ── Visual break (scroll — no fixed/parallax; avoids hero bleed-through) ── */}
      <div className="mag-visual-break" role="img" aria-label="Natchez lounge at night">
        <Image
          src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/natchez-bluff-sunset.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          aria-hidden
        />
      </div>

      {/* ── Featured Article ── */}
      <section className="mag-featured">
        <div className="section-container">
          <div className="section-label">Featured Story</div>
          <ArticleCard article={featured} variant="featured" href={`/articles/${featured.slug}`} />
        </div>
      </section>

      {/* ── Outsider Economics case studies (sister site) ── */}
      <section
        className="section-container"
        style={{
          padding: 'var(--space-10) var(--space-6)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        <div className="section-label">Field manual</div>
        <h2 className="section-title" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
          Proof from real builds
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
            maxWidth: 560,
            lineHeight: 1.65,
            marginBottom: 'var(--space-6)',
          }}
        >
          Long-form case studies on Outsider Economics — the Natchez stack, Bearsville / Utopia, the Bronx, mesh
          distribution, tourism rails. Magazine stays narrative; the spreadsheets and system notes live there.
        </p>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          <li>
            <a
              href="https://outsidereconomics.com/case-studies/03-big-muddy-natchez"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Big Muddy / Natchez — inn, directory, radio, touring
            </a>
          </li>
          <li>
            <a
              href="https://outsidereconomics.com/case-studies/02-bearsville-utopia"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bearsville / Utopia — studio campus as media node
            </a>
          </li>
          <li>
            <a
              href="https://outsidereconomics.com/case-studies"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              All case studies on Outsider Economics →
            </a>
          </li>
        </ul>
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

      {/* ── Region Photo Strip ── */}
      <section className="mag-photostrip">
        <div className="mag-photostrip__inner">
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/clarksdale-crossroads.webp" alt="Along the Deep South" width={400} height={300} sizes="25vw" style={{ width: '100%', height: '200px', objectFit: 'cover', opacity: 0.7 }} />
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/oxford-square.webp" alt="Live oak canopy over Ocean Springs street" width={400} height={300} sizes="25vw" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/natchez-trace-parkway.webp" alt="Antebellum mansion with iron fence and carriage" width={400} height={300} sizes="25vw" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/vicksburg-bluffs.webp" alt="Teal shrimp boat at Ocean Springs marina" width={400} height={300} sizes="25vw" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
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

      {/* ── Real Photo Strip ── */}
      <section className="mag-photostrip">
        <div className="mag-photostrip__inner">
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/oxford-square.webp" alt="Cafe sidewalk scene in Natchez" width={400} height={300} sizes="25vw" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/greenville-levee.webp" alt="Ocean Springs to Natchez region" width={400} height={300} sizes="25vw" style={{ width: '100%', height: '200px', objectFit: 'cover', opacity: 0.7 }} />
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/helena-river-levee.webp" alt="Pink azaleas cascading along Natchez sidewalk" width={400} height={300} sizes="25vw" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <Image src="https://storage.googleapis.com/bmt-media-bigmuddy/magazine/jackson-capitol.webp" alt="Brick sidewalk with awnings on Natchez main street" width={400} height={300} sizes="25vw" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        </div>
      </section>

      <NewsletterSignup variant="section" />

      <style>{`
        /* ── Hero ── */
        .mag-hero {
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg);
        }
        /* Do NOT use position:fixed on the hero image — it stays pinned to the viewport
           and every image below (featured story, strips) stacks on top, which reads as broken. */
        .mag-hero img {
          position: absolute !important;
        }
        .mag-hero__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
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

        /* ── Visual break between intro and featured (scrolls with page; no fixed attachment) ── */
        .mag-visual-break {
          position: relative;
          z-index: 1;
          height: min(42vh, 420px);
          min-height: 200px;
          overflow: hidden;
          background: var(--bg);
        }
        .mag-visual-break::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, var(--bg) 0%, transparent 18%, transparent 82%, var(--bg) 100%);
        }
        @media (max-width: 768px) {
          .mag-visual-break {
            height: min(32vh, 280px);
          }
        }

        /* ── Signature Hook (photo credits) ── */
        .mag-signature {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-disabled);
          padding: var(--space-2) var(--space-6);
          text-align: right;
        }

        /* ── Featured ── */
        .mag-featured {
          border-bottom: 1px solid var(--border);
          position: relative;
          z-index: 1;
          background: var(--bg);
        }
        .mag-featured .article-card--featured {
          background: var(--surface);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          overflow: hidden;
        }

        /* ── Grid ── */
        .mag-grid {
          border-bottom: 1px solid var(--border);
          position: relative;
          z-index: 1;
          background: var(--bg);
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

        /* ── Photo Strip ── */
        .mag-photostrip {
          position: relative;
          z-index: 1;
          background: var(--bg);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .mag-photostrip__inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        @media (max-width: 640px) {
          .mag-photostrip__inner {
            grid-template-columns: repeat(2, 1fr);
          }
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
