// apps/web/app/economics/field-manual/page.tsx
// Field Manual index — lists all posts from outsider-economics-v2/

import type { Metadata } from 'next';
import Image from 'next/image';
import { getAllPosts } from '../../../lib/posts';

const GCS_ILLUS = 'https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook';

const CHAPTER_IMAGES: Record<number, string> = {
  1: `${GCS_ILLUS}/08-folk-art/marketplace.webp`,
  2: `${GCS_ILLUS}/01-woodcut/main-street-storefront.webp`,
  3: `${GCS_ILLUS}/09-blueprint/data-flow.webp`,
  4: `${GCS_ILLUS}/10-watercolor/cotton-field.webp`,
  5: `${GCS_ILLUS}/04-chalkboard/tonights-lineup.webp`,
  6: `${GCS_ILLUS}/01-woodcut/river-landscape.webp`,
  7: `${GCS_ILLUS}/12-cartographic/touring-circuit.webp`,
  8: `${GCS_ILLUS}/10-watercolor/small-town-street.webp`,
  9: `${GCS_ILLUS}/06-neon/juke-joint-entrance.webp`,
  10: `${GCS_ILLUS}/03-risograph/radio-tower.webp`,
  11: `${GCS_ILLUS}/09-blueprint/building-floorplan.webp`,
  12: `${GCS_ILLUS}/08-folk-art/community-quilt.webp`,
  13: `${GCS_ILLUS}/12-cartographic/delta-region.webp`,
  14: `${GCS_ILLUS}/07-letterpress/concert-broadside.webp`,
  15: `${GCS_ILLUS}/09-blueprint/dashboard-wireframe.webp`,
};

const description = 'The complete playbook for building sovereign local economies. Six frameworks, real math, no theory.';
export const metadata: Metadata = {
  title: 'Field Manual',
  description,
  openGraph: {
    type: 'website',
    title: 'Field Manual | Outsider Economics',
    description,
    url: 'https://outsidereconomics.com/field-manual',
    siteName: 'Outsider Economics',
  },
  twitter: { card: 'summary_large_image', title: 'Field Manual | Outsider Economics', description },
  alternates: { canonical: 'https://outsidereconomics.com/field-manual' },
};

export const dynamic = 'force-dynamic';

export default function FieldManualPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* ── Hero Image ── */}
      <section className="fm-hero-img" style={{ backgroundImage: 'url(https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook/10-watercolor/river-golden-hour.webp)', backgroundSize: 'cover', backgroundPosition: 'center 30%' }} />

      {/* ── Header ── */}
      <section className="fm-header">
        <div className="section-container">
          <div className="section-label">The Book</div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-hero)', marginBottom: 'var(--space-6)' }}>
            Field Manual
          </h1>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            This isn&apos;t a textbook. It&apos;s a field manual — the kind of thing you throw in the
            truck and refer to when you&apos;re actually building something. Each post stands alone.
            Read them in order or jump to the one that matches your problem.
          </p>
          <div className="fm-header__ctas">
            <a
              href="https://outsidereconomics.substack.com"
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe on Substack
            </a>
            <a
              href="https://www.amazon.com/dp/B0F2HZBZFZ"
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get the Book
            </a>
          </div>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="fm-posts">
        <div className="section-container">
          <div className="section-label">The Posts</div>
          <h2 className="section-title">{posts.length} Dispatches</h2>
          <div className="fm-posts__list">
            {posts.map((post, i) => (
              <a
                key={post.slug}
                href={`/field-manual/${post.slug}`}
                className={`fm-chapter ${i % 2 === 1 ? 'fm-chapter--reverse' : ''}`}
              >
                <div
                  className="fm-chapter__image"
                  style={{ backgroundImage: `url(${CHAPTER_IMAGES[post.order] || CHAPTER_IMAGES[1]})` }}
                />
                <div className="fm-chapter__text">
                  <span className="fm-chapter__num">{String(post.order).padStart(2, '0')}</span>
                  <h3 className="fm-chapter__title">{post.title}</h3>
                  <p className="fm-chapter__excerpt">{post.excerpt}</p>
                  <span className="fm-chapter__link">Read chapter &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies (field reports) ── */}
      <section
        style={{
          background: 'var(--bg)',
          padding: 'var(--space-16) 0',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="section-container">
          <div className="section-label">Proof</div>
          <h2 className="section-title" style={{ fontSize: 'var(--text-3xl)' }}>
            Case studies
          </h2>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            Natchez, the Bronx, Bearsville, mesh edges, tourism rails, rural land — builds that shipped, with math
            attached. Same field manual voice; longer receipts.
          </p>
          <a href="/case-studies" className="btn btn--primary">
            Read case studies
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="fm-cta">
        <div className="section-container">
          <div className="fm-cta__inner">
            <h2 className="section-title">More Coming</h2>
            <p className="section-desc" style={{ maxWidth: 480, margin: '0 auto var(--space-8)' }}>
              New posts drop on the Substack first. Subscribe to get them as they come out,
              or check back here — they&apos;ll show up automatically.
            </p>
            <div className="fm-header__ctas">
              <a
                href="https://outsidereconomics.substack.com"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe Free
              </a>
              <a href="/the-math" className="btn btn--ghost">
                See the Math
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .fm-hero-img {
          width: 100%;
          height: 50vh;
          min-height: 360px;
          max-height: 560px;
          overflow: hidden;
          background-position: center 40%;
        }
        .fm-header {
          background: var(--bg);
          padding-top: var(--space-16);
        }
        .fm-header__ctas {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        .fm-posts {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .fm-posts__list {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .fm-chapter {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 320px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          border-radius: var(--radius-lg);
          background: var(--surface-2);
          border: 1px solid var(--border);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .fm-chapter:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-glow);
        }
        .fm-chapter--reverse {
          direction: rtl;
        }
        .fm-chapter--reverse > * {
          direction: ltr;
        }
        .fm-chapter__image {
          background-size: cover;
          background-position: center;
          min-height: 240px;
        }
        .fm-chapter__text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-8) var(--space-6);
          gap: var(--space-2);
        }
        .fm-chapter__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.5;
          letter-spacing: 0.1em;
        }
        .fm-chapter__title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          margin: 0;
          line-height: var(--leading-tight);
        }
        .fm-chapter__excerpt {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
        }
        .fm-chapter__link {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          margin-top: var(--space-2);
        }
        @media (max-width: 768px) {
          .fm-chapter {
            grid-template-columns: 1fr;
          }
          .fm-chapter--reverse {
            direction: ltr;
          }
          .fm-chapter__image {
            min-height: 180px;
          }
        }
        .fm-cta {
          background: var(--bg);
        }
        .fm-cta__inner {
          text-align: center;
        }
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
        }
        .section-title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--text);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-4);
        }
        .section-desc {
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-10);
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-6);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--duration-normal) var(--ease-default);
          cursor: pointer;
          border: 1px solid transparent;
        }
        .btn--primary {
          background: var(--accent);
          color: var(--bg);
        }
        .btn--primary:hover {
          background: var(--accent-hover);
          box-shadow: var(--shadow-glow);
        }
        .btn--ghost {
          background: transparent;
          color: var(--text);
          border-color: var(--border-strong);
        }
        .btn--ghost:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        @media (max-width: 640px) {
          .fm-post {
            grid-template-columns: 1fr;
          }
          .fm-post__num {
            font-size: var(--text-xl);
          }
          .fm-post__arrow {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
