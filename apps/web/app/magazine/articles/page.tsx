// apps/web/app/magazine/articles/page.tsx
// Magazine articles index — filterable by category via query param
// bigmuddymagazine.com/articles?category=interview

import type { Metadata } from 'next';
import { ArticleCard } from '@bigmuddy/ui';
import { CITY_GUIDE_ARTICLES } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles — Big Muddy Magazine',
  description: 'Stories, interviews, photo essays, and city guides from the Deep South.',
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bmt--bigmuddy-ff651.us-east4.hosted.app';

const CATEGORY_MAP: Record<string, string> = {
  'city-guide': 'City Guide',
  'feature': 'Feature',
  'music': 'Music',
  'interview': 'Interview',
  'photo-essay': 'Photo Essay',
  'food-drink': 'Food & Drink',
};

async function getArticles(category?: string): Promise<typeof CITY_GUIDE_ARTICLES> {
  try {
    const params = new URLSearchParams({ status: 'published' });
    if (category) params.set('category', category);
    const res = await fetch(`${baseUrl}/api/articles?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return filterStatic(category);
    const data = await res.json();
    const all = Array.isArray(data) ? data : data.data ?? [];
    return all.length > 0 ? all : filterStatic(category);
  } catch {
    return filterStatic(category);
  }
}

function filterStatic(category?: string) {
  if (!category) return CITY_GUIDE_ARTICLES;
  return CITY_GUIDE_ARTICLES.filter((a) => a.category === category);
}

export default async function ArticlesIndexPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category ?? undefined;
  const articles = await getArticles(category);
  const categoryLabel = category ? (CATEGORY_MAP[category] ?? category) : null;

  return (
    <>
      <section className="articles-index">
        <div className="section-container">
          <div className="articles-index__header">
            <h1 className="articles-index__title">
              {categoryLabel ? categoryLabel : 'All Articles'}
            </h1>
            <p className="articles-index__sub">
              {articles.length} {articles.length === 1 ? 'story' : 'stories'}
              {categoryLabel ? ` in ${categoryLabel}` : ' from the Deep South'}
            </p>
          </div>

          {/* Category filters */}
          <div className="articles-index__filters">
            <a
              href="/articles"
              className={`articles-filter-btn${!category ? ' articles-filter-btn--active' : ''}`}
            >
              All
            </a>
            {Object.entries(CATEGORY_MAP).map(([slug, label]) => (
              <a
                key={slug}
                href={`/articles?category=${slug}`}
                className={`articles-filter-btn${category === slug ? ' articles-filter-btn--active' : ''}`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Articles grid */}
          {articles.length === 0 ? (
            <div className="articles-index__empty">
              <p>No articles found{categoryLabel ? ` in ${categoryLabel}` : ''}.</p>
              <a href="/articles" className="btn btn--outline">View all articles</a>
            </div>
          ) : (
            <div className="articles-index__grid">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  href={`/articles/${article.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .articles-index {
          padding: var(--space-16) 0;
          min-height: 60vh;
        }
        .articles-index__header {
          margin-bottom: var(--space-8);
        }
        .articles-index__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-2);
        }
        .articles-index__sub {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          margin: 0;
        }
        .articles-index__filters {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          margin-bottom: var(--space-10);
        }
        .articles-filter-btn {
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
          text-decoration: none;
        }
        .articles-filter-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .articles-filter-btn--active {
          background: var(--accent-muted);
          border-color: var(--accent);
          color: var(--accent);
        }
        .articles-index__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-6);
        }
        .articles-index__empty {
          text-align: center;
          padding: var(--space-16) 0;
          color: var(--text-muted);
        }
        .articles-index__empty p {
          margin-bottom: var(--space-4);
        }
      `}</style>
    </>
  );
}
