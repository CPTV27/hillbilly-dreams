// apps/web/app/magazine/articles/[id]/page.tsx
// Article detail page — [id] param is the article slug
// Static generation via generateStaticParams

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@bigmuddy/ui';
import { CITY_GUIDE_ARTICLES, getArticleBySlug } from '@/lib/articles';
import type { Article } from '@bigmuddy/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${baseUrl}/api/articles?status=published`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      const articles: Article[] = Array.isArray(data) ? data : data.data ?? [];
      if (articles.length) return articles.map((a) => ({ id: a.slug }));
    }
  } catch {
    // fall through to static
  }
  return CITY_GUIDE_ARTICLES.map((article) => ({
    id: article.slug,
  }));
}

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/articles/slug/${slug}`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const article = await res.json();
      if (article && article.slug) return article;
    }
  } catch {
    // fall through to static
  }
  return getArticleBySlug(slug) ?? null;
}

async function getAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${baseUrl}/api/articles?status=published`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      const articles: Article[] = Array.isArray(data) ? data : data.data ?? [];
      if (articles.length) return articles;
    }
  } catch {
    // fall through to static
  }
  return CITY_GUIDE_ARTICLES;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.id);
  if (!article) {
    return { title: 'Article Not Found' };
  }
  return {
    title: `${article.title} — Big Muddy Magazine`,
    description: article.excerpt ?? undefined,
  };
}

// Parse basic markdown — headings, bold, paragraphs
function renderBody(body: string) {
  const blocks = body.split(/\n\n+/);
  const elements: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    // H1 heading
    if (trimmed.startsWith('# ')) {
      // Skip — we render the title separately
      return;
    }

    // H2 heading
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^## /, '');
      elements.push(
        <h2 key={i} className="article-body__h2">{text}</h2>
      );
      return;
    }

    // H3 heading
    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^### /, '');
      elements.push(
        <h3 key={i} className="article-body__h3">{text}</h3>
      );
      return;
    }

    // Paragraph — inline formatting: **bold** and *italic*
    const parts = trimmed.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={j}>{part.slice(1, -1)}</em>;
      }
      return part;
    });

    elements.push(
      <p key={i} className="article-body__p">{rendered}</p>
    );
  });

  return elements;
}

function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const cityLabel = article.city
    ? article.city
        .split('-')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : null;

  return (
    <>
      {/* ── Hero Image ── */}
      {article.heroImage && (
        <div className="article-hero">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            style={{ objectFit: 'cover' }}
          />
          <div className="article-hero__overlay" />
        </div>
      )}

      {/* ── Article Content ── */}
      <article className="article-wrap">
        <div className="article-inner">

          {/* Back link */}
          <nav className="article-back">
            <a href="/city-guides" className="article-back__link">
              ← Back to City Guides
            </a>
          </nav>

          {/* Header */}
          <header className="article-header">
            {cityLabel && (
              <div className="article-header__city">{cityLabel}</div>
            )}
            <span className="article-header__category">{article.category}</span>
            <h1 className="article-header__title">{article.title}</h1>
            <div className="article-header__meta">
              <span className="article-header__author">{article.author}</span>
              <span className="article-header__sep" aria-hidden="true">·</span>
              {article.readTime && (
                <>
                  <span className="article-header__read-time">{article.readTime}</span>
                  <span className="article-header__sep" aria-hidden="true">·</span>
                </>
              )}
              {article.publishedAt && (
                <time className="article-header__date">
                  {formatDate(article.publishedAt)}
                </time>
              )}
            </div>
            {article.excerpt && (
              <p className="article-header__excerpt">{article.excerpt}</p>
            )}
          </header>

          {/* Body */}
          <div className="article-body">
            {article.body ? renderBody(article.body) : (
              <p className="article-body__p">Article content coming soon.</p>
            )}
          </div>

          {/* Prev / Next Navigation */}
          <nav className="article-nav" aria-label="Article navigation">
            <div className="article-nav__inner">
              {prevArticle ? (
                <a href={`/articles/${prevArticle.slug}`} className="article-nav__link article-nav__link--prev">
                  <span className="article-nav__dir">← Previous</span>
                  <span className="article-nav__title">{prevArticle.title}</span>
                </a>
              ) : (
                <div />
              )}
              {nextArticle ? (
                <a href={`/articles/${nextArticle.slug}`} className="article-nav__link article-nav__link--next">
                  <span className="article-nav__dir">Next →</span>
                  <span className="article-nav__title">{nextArticle.title}</span>
                </a>
              ) : (
                <div />
              )}
            </div>
          </nav>

          {/* Back to city guides */}
          <div className="article-footer-cta">
            <a href="/city-guides" className="btn btn--outline">
              Browse All 18 City Guides
            </a>
          </div>
        </div>
      </article>

      <style>{`
        /* ── Hero ── */
        .article-hero {
          position: relative;
          height: clamp(300px, 50vh, 600px);
          width: 100%;
          overflow: hidden;
          background: var(--surface);
        }
        .article-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15,15,13,0.3) 0%, rgba(15,15,13,0.7) 100%);
          z-index: 1;
        }

        /* ── Article Wrap ── */
        .article-wrap {
          background: var(--bg);
          padding: var(--space-16) var(--space-6);
        }
        .article-inner {
          max-width: 720px;
          margin: 0 auto;
        }

        /* ── Back link ── */
        .article-back {
          margin-bottom: var(--space-10);
        }
        .article-back__link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          transition: color var(--duration-fast) var(--ease-default);
        }
        .article-back__link:hover {
          color: var(--accent);
        }

        /* ── Header ── */
        .article-header {
          margin-bottom: var(--space-12);
          padding-bottom: var(--space-10);
          border-bottom: 1px solid var(--border);
        }
        .article-header__city {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-2);
        }
        .article-header__category {
          display: inline-block;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 2px var(--space-2);
          margin-bottom: var(--space-5);
        }
        .article-header__title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-5);
        }
        .article-header__meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
          margin-bottom: var(--space-6);
        }
        .article-header__author {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
        }
        .article-header__sep {
          color: var(--border-strong);
        }
        .article-header__read-time,
        .article-header__date {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-disabled);
        }
        .article-header__excerpt {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          font-weight: 400;
          color: var(--text-muted);
          line-height: var(--leading-snug);
          margin: 0;
        }

        /* ── Body ── */
        .article-body {
          margin-bottom: var(--space-16);
        }
        .article-body__p {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0 0 var(--space-6);
        }
        .article-body__p:last-child {
          margin-bottom: 0;
        }
        .article-body__p strong {
          color: var(--text);
          font-weight: 700;
        }
        .article-body__p em {
          font-style: italic;
          color: var(--text-muted);
        }
        .article-body__h2 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: var(--space-12) 0 var(--space-5);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border);
        }
        .article-body__h3 {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: var(--space-8) 0 var(--space-4);
        }

        /* ── Prev/Next Nav ── */
        .article-nav {
          padding: var(--space-10) 0;
          border-top: 1px solid var(--border);
          margin-bottom: var(--space-10);
        }
        .article-nav__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-6);
        }
        .article-nav__link {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          text-decoration: none;
          padding: var(--space-5);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface);
          transition: border-color var(--duration-fast) var(--ease-default);
        }
        .article-nav__link:hover {
          border-color: var(--accent);
        }
        .article-nav__link--next {
          text-align: right;
        }
        .article-nav__dir {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }
        .article-nav__title {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
          line-height: var(--leading-snug);
        }

        /* ── Footer CTA ── */
        .article-footer-cta {
          text-align: center;
          padding-top: var(--space-6);
        }

        /* Shared button */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
        .btn--outline:hover {
          background: var(--accent-muted);
        }

        @media (max-width: 640px) {
          .article-nav__inner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
