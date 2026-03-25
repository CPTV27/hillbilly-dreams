// apps/web/app/economics/field-manual/page.tsx
// Field Manual index — lists all posts from outsider-economics-v2/

import type { Metadata } from 'next';
import Image from 'next/image';
import { getAllPosts } from '../../../lib/posts';

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
      <section className="fm-hero-img">
        <Image
          src="/images/ai-corridor/delta-cotton-field.webp"
          alt="Cotton field at golden hour in the Mississippi Delta"
          width={1600}
          height={900}
          priority
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

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
            {posts.map((post) => (
              <a key={post.slug} href={`/field-manual/${post.slug}`} className="fm-post">
                <div className="fm-post__num">{String(post.order).padStart(2, '0')}</div>
                <div className="fm-post__content">
                  <h3 className="fm-post__title">{post.title}</h3>
                  <p className="fm-post__excerpt">{post.excerpt}</p>
                </div>
                <div className="fm-post__arrow" aria-hidden="true">&rarr;</div>
              </a>
            ))}
          </div>
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
          max-height: 420px;
          overflow: hidden;
          line-height: 0;
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
          gap: var(--space-4);
        }
        .fm-post {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: var(--space-5);
          align-items: center;
          padding: var(--space-6);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface-2);
          text-decoration: none;
          transition: border-color var(--duration-normal) var(--ease-default),
                      box-shadow var(--duration-normal) var(--ease-default);
        }
        .fm-post:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .fm-post__num {
          font-family: var(--font-mono);
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--accent);
          opacity: 0.3;
          line-height: 1;
        }
        .fm-post__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-2);
        }
        .fm-post__excerpt {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0;
          max-width: 600px;
        }
        .fm-post__arrow {
          font-size: var(--text-xl);
          color: var(--accent);
          opacity: 0.4;
          transition: opacity var(--duration-normal) var(--ease-default);
        }
        .fm-post:hover .fm-post__arrow {
          opacity: 1;
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
