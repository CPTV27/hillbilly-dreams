// apps/web/app/economics/field-manual/[slug]/page.tsx
// Individual post page — renders markdown from outsider-economics-v2/

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAdjacentPosts } from '../../../../lib/posts';
import { ReadingProgress } from './reading-progress';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: `${post.title} | Outsider Economics`,
      description: post.excerpt,
      url: `https://outsidereconomics.com/field-manual/${slug}`,
      siteName: 'Outsider Economics',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Outsider Economics`,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://outsidereconomics.com/field-manual/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <>
      <ReadingProgress />
      <article className="post">
        <div className="post__container">
          <header className="post__header">
            <div className="post__eyebrow">
              <span className="post__num">Dispatch {String(post.order).padStart(2, '0')}</span>
              <span className="post__divider">/</span>
              <a href="/field-manual" className="post__back">Field Manual</a>
            </div>
            <h1 className="post__title">{post.title}</h1>
          </header>
          <div
            className="post__body"
            dangerouslySetInnerHTML={{ __html: post.htmlContent ?? '' }}
          />

          {/* ── Prev/Next Navigation ── */}
          <nav className="post__nav" aria-label="Post navigation">
            {prev ? (
              <a href={`/field-manual/${prev.slug}`} className="post__nav-link post__nav-link--prev">
                <span className="post__nav-label">&larr; Previous</span>
                <span className="post__nav-num">Dispatch {String(prev.order).padStart(2, '0')}</span>
                <span className="post__nav-title">{prev.title}</span>
              </a>
            ) : (
              <div />
            )}
            {next ? (
              <a href={`/field-manual/${next.slug}`} className="post__nav-link post__nav-link--next">
                <span className="post__nav-label">Next &rarr;</span>
                <span className="post__nav-num">Dispatch {String(next.order).padStart(2, '0')}</span>
                <span className="post__nav-title">{next.title}</span>
              </a>
            ) : (
              <a href="/field-manual" className="post__nav-link post__nav-link--next">
                <span className="post__nav-label">Finished &rarr;</span>
                <span className="post__nav-num">Field Manual</span>
                <span className="post__nav-title">Back to All Posts</span>
              </a>
            )}
          </nav>

          <footer className="post__footer">
            <a href="/field-manual" className="btn btn--ghost">&larr; All Posts</a>
            <a
              href="https://outsidereconomics.substack.com"
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe for More
            </a>
          </footer>
        </div>
      </article>

      <style>{`
        .post {
          background: var(--bg);
          padding-top: var(--space-16);
        }
        .post__container {
          max-width: 720px;
          margin: 0 auto;
          padding: var(--space-12) var(--space-6) var(--space-24);
        }
        .post__header {
          margin-bottom: var(--space-12);
        }
        .post__eyebrow {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }
        .post__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .post__divider {
          color: var(--text-disabled);
          font-size: var(--text-xs);
        }
        .post__back {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        .post__back:hover {
          color: var(--accent);
        }
        .post__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }

        /* ── Body typography ── */
        .post__body {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
        }
        .post__body h2 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          margin: var(--space-16) 0 var(--space-6);
          line-height: var(--leading-tight);
        }
        .post__body h3 {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: var(--space-10) 0 var(--space-4);
        }
        .post__body p {
          margin: 0 0 var(--space-6);
        }
        .post__body strong {
          color: var(--text);
          font-weight: 700;
        }
        .post__body em {
          color: var(--accent);
          font-style: italic;
        }
        .post__body hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: var(--space-12) 0;
        }
        .post__body ol,
        .post__body ul {
          margin: 0 0 var(--space-6);
          padding-left: var(--space-6);
        }
        .post__body li {
          margin-bottom: var(--space-4);
        }
        .post__body a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .post__body a:hover {
          color: var(--accent-hover);
        }
        .post__body blockquote {
          border-left: 2px solid var(--accent);
          padding: var(--space-4) var(--space-6);
          margin: var(--space-8) 0;
          background: var(--accent-muted);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .post__body blockquote p {
          margin: 0;
          color: var(--text);
        }
        .post__body code {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          background: var(--surface);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          color: var(--accent);
        }

        /* ── Prev/Next Navigation ── */
        .post__nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
          margin-top: var(--space-16);
          padding-top: var(--space-12);
          border-top: 1px solid var(--border);
        }
        .post__nav-link {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-5);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface);
          text-decoration: none;
          transition: border-color var(--duration-normal) var(--ease-default),
                      box-shadow var(--duration-normal) var(--ease-default);
        }
        .post__nav-link:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .post__nav-link--next {
          text-align: right;
        }
        .post__nav-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        .post__nav-num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-disabled);
        }
        .post__nav-title {
          font-family: var(--font-display);
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--text);
          line-height: var(--leading-tight);
        }

        /* ── Footer ── */
        .post__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          flex-wrap: wrap;
          padding-top: var(--space-12);
          margin-top: var(--space-8);
        }

        /* ── Buttons ── */
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
          .post__title {
            font-size: var(--text-4xl);
          }
          .post__nav {
            grid-template-columns: 1fr;
          }
          .post__nav-link--next {
            text-align: left;
          }
        }
      `}</style>
    </>
  );
}
