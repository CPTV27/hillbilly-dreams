// apps/web/app/(magazine)/page.tsx
// Magazine homepage — featured article + article grid

import type { Metadata } from 'next';
import Image from 'next/image';
import { ArticleCard } from '@bigmuddy/ui';
import { NewsletterSignup } from '@bigmuddy/ui';
import type { Article } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: 'Big Muddy Magazine',
  description:
    'Long-form editorial, city guides, and stories from the Mississippi music corridor.',
};

// Static placeholder articles
const PLACEHOLDER_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Clarksdale at Midnight: Where the Blues Were Born',
    slug: 'clarksdale-at-midnight-where-the-blues-were-born',
    category: 'city-guide',
    city: 'clarksdale',
    author: 'Chase Pierson',
    status: 'published',
    excerpt:
      'The crossroads is real. You can stand there at midnight and feel it — the weight of every note ever played in this delta town pressing up through the asphalt.',
    readTime: '8 min read',
    publishedAt: new Date('2026-02-15').toISOString(),
    heroImage: '/images/magazine/clarksdale-crossroads.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'The Inn at Natchez: Six Rooms, Six Stories',
    slug: 'the-inn-at-natchez-six-rooms-six-stories',
    category: 'feature',
    city: 'natchez',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt:
      'At 411 N Commerce Street, each suite is named for a legend. Sleep in the Muddy Waters room and wake to the river.',
    readTime: '6 min read',
    publishedAt: new Date('2026-02-20').toISOString(),
    heroImage: '/images/magazine/natchez-bluff-sunset.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Memphis to New Orleans: The Full Route',
    slug: 'memphis-to-new-orleans-the-full-route',
    category: 'feature',
    city: 'memphis',
    author: 'Chase Pierson',
    status: 'published',
    excerpt: 'Five cities. Four hundred miles. A thousand years of American music. Here is how to drive it right.',
    readTime: '12 min read',
    publishedAt: new Date('2026-01-28').toISOString(),
    heroImage: '/images/magazine/memphis-beale-street-neon.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "New Orleans After Dark: Frenchmen Street's Living Jazz Museum",
    slug: 'new-orleans-after-dark-frenchmen-street',
    category: 'city-guide',
    city: 'new-orleans',
    author: 'Miles Donovan',
    status: 'published',
    excerpt: 'Every night on Frenchmen Street is different. The Spotted Cat, Snug Harbor, the Maison — the music never stops.',
    readTime: '7 min read',
    publishedAt: new Date('2026-01-15').toISOString(),
    heroImage: '/images/magazine/new-orleans-frenchmen.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Robert Johnson: Chasing a Ghost Through the Delta',
    slug: 'robert-johnson-chasing-a-ghost-through-the-delta',
    category: 'music',
    city: 'clarksdale',
    author: 'Chase Pierson',
    status: 'published',
    excerpt: 'Twenty-nine songs and a face in one photograph. Everything else is delta dust and legend.',
    readTime: '10 min read',
    publishedAt: new Date('2026-01-08').toISOString(),
    heroImage: '/images/magazine/juke-joint-saturday.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Vicksburg's Quiet Comeback: Art in a Civil War Town",
    slug: 'vicksburg-quiet-comeback-art-civil-war-town',
    category: 'city-guide',
    city: 'vicksburg',
    author: 'Amy Chen',
    status: 'published',
    excerpt: 'After decades of decline, Vicksburg is getting interesting again. The galleries on Washington Street are worth the detour.',
    readTime: '5 min read',
    publishedAt: new Date('2025-12-30').toISOString(),
    heroImage: '/images/magazine/vicksburg-bluffs.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: "Son House and the Sermon: Delta Blues as Religion",
    slug: 'son-house-delta-blues-as-religion',
    category: 'music',
    city: 'clarksdale',
    author: 'Chase Pierson',
    status: 'published',
    excerpt: "Before Robert Johnson, before Muddy Waters — Son House was playing something that sounded less like music and more like prayer.",
    readTime: '9 min read',
    publishedAt: new Date('2025-12-20').toISOString(),
    heroImage: '/images/magazine/blues-trail-marker.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    title: "The Trace: Natchez to Nashville on America's Oldest Road",
    slug: 'natchez-trace-oldest-road-america',
    category: 'feature',
    city: 'natchez',
    author: 'Big Muddy Magazine',
    status: 'published',
    excerpt: "The Natchez Trace Parkway follows a path older than the United States. Drive it slowly.",
    readTime: '11 min read',
    publishedAt: new Date('2025-12-10').toISOString(),
    heroImage: '/images/magazine/natchez-trace-parkway.webp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const CATEGORIES = ['All', 'City Guide', 'Feature', 'Music', 'Interview', 'Photo Essay', 'Food & Drink'];

export default async function MagazineHomepage() {
  // TODO: Replace with live Prisma queries:
  // const articles = await prisma.article.findMany({
  //   where: { status: 'published' },
  //   orderBy: { publishedAt: 'desc' },
  //   take: 9,
  // });

  const articles = PLACEHOLDER_ARTICLES;
  const [featured, ...grid] = articles;

  return (
    <>
      {/* ── Hero ── */}
      <section className="mag-hero">
        <Image
          src="/images/generated/hero-magazine-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
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
          <ArticleCard article={featured} variant="featured" />
        </div>
      </section>

      {/* ── Category Filter + Grid ── */}
      <section className="mag-grid">
        <div className="section-container">
          <div className="mag-grid__header">
            <h2 className="mag-grid__title">Latest Stories</h2>
            {/* Client-side category filter would go here */}
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
              <ArticleCard key={article.id} article={article} />
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
              <h2 className="mag-city-guides__title">Five Cities. One River.</h2>
              <p className="mag-city-guides__desc">
                Comprehensive guides to every stop on the corridor — 
                where to eat, sleep, listen, and why it all matters.
              </p>
              <a href="/city-guides" className="btn btn--outline">
                Browse City Guides
              </a>
            </div>
            <div className="mag-city-guides__cities">
              {['Memphis', 'Clarksdale', 'Vicksburg', 'Natchez', 'New Orleans'].map((city) => (
                <a
                  key={city}
                  href={`/city-guides#${city.toLowerCase().replace(' ', '-')}`}
                  className="mag-city-tag"
                >
                  {city}
                </a>
              ))}
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
          transition: all var(--duration-fast) var(--ease-default);
          text-transform: uppercase;
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
          gap: var(--space-8);
        }

        /* ── City Guides ── */
        .mag-city-guides {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
        .mag-city-guides__inner {
          display: flex;
          align-items: center;
          gap: var(--space-16);
          flex-wrap: wrap;
        }
        .mag-city-guides__text {
          flex: 1;
          min-width: 280px;
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
        .mag-city-guides__cities {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .mag-city-tag {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: var(--tracking-tight);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
          line-height: 1.2;
        }
        .mag-city-tag:hover {
          color: var(--accent);
        }

        /* Shared */
        .btn {
          display: inline-flex;
          align-items: center;
          padding: var(--space-3) var(--space-8);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: all var(--duration-fast) var(--ease-default);
          cursor: pointer;
          border: none;
        }
        .btn--outline {
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
        }
        .btn--outline:hover { background: var(--accent-muted); }
        .section-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-20) var(--space-6);
        }
        .section-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-4);
          display: block;
        }
      `}</style>
    </>
  );
}
