import type { Metadata } from 'next';
import { CITY_GUIDE_ARTICLES } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Big Muddy Magazine — Print Edition',
  description: 'Print-ready magazine layout. Use browser print (Cmd+P) to generate PDF.',
};

export default function PrintMagazinePage() {
  const articles = CITY_GUIDE_ARTICLES.filter(a => a.status === 'published').slice(0, 12);

  return (
    <>
      <div className="print-magazine">
        {/* Cover */}
        <section className="print-page print-cover">
          <div className="print-cover__content">
            <p className="print-cover__eyebrow">The Mississippi Music Region</p>
            <h1 className="print-cover__title">Big Muddy<br />Magazine</h1>
            <p className="print-cover__issue">Spring 2026 &middot; Volume 1</p>
            <p className="print-cover__tagline">Memphis to New Orleans. The towns, the music, the people who stay.</p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="print-page print-toc">
          <h2 className="print-section-title">In This Issue</h2>
          <div className="print-toc__list">
            {articles.map((article, i) => (
              <div key={article.slug} className="print-toc__item">
                <span className="print-toc__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <span className="print-toc__title">{article.title}</span>
                  <span className="print-toc__city">{article.city?.replace(/-/g, ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Articles */}
        {articles.map((article, i) => (
          <section key={article.slug} className="print-page print-article">
            <div className="print-article__header">
              <span className="print-article__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="print-article__category">{article.category}</span>
            </div>
            <h2 className="print-article__title">{article.title}</h2>
            {article.city && (
              <p className="print-article__city">{article.city.replace(/-/g, ' ')}, Mississippi</p>
            )}
            <p className="print-article__excerpt">{article.excerpt}</p>
            <div className="print-article__body" dangerouslySetInnerHTML={{ __html: article.body || '' }} />
            <div className="print-article__footer">
              <span>Big Muddy Magazine</span>
              <span>bigmuddymagazine.com</span>
            </div>
          </section>
        ))}

        {/* Back Cover */}
        <section className="print-page print-back">
          <div className="print-back__content">
            <p className="print-back__brand">Big Muddy</p>
            <p className="print-back__tagline">The Mississippi&apos;s Music Region</p>
            <p className="print-back__url">bigmuddymagazine.com</p>
          </div>
        </section>
      </div>

      <style>{`
        @media screen {
          .print-magazine {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: #0f0f0d;
            color: #e8e0d4;
          }
          .print-page {
            margin-bottom: 3rem;
            padding: 3rem;
            border: 1px solid #2a2520;
            border-radius: 4px;
            min-height: 400px;
          }
        }

        @media print {
          body { margin: 0; padding: 0; background: #fff; color: #1a1a1a; }
          .print-magazine { max-width: none; padding: 0; background: #fff; color: #1a1a1a; }
          .print-page {
            page-break-after: always;
            min-height: 100vh;
            padding: 1in;
            border: none;
            margin: 0;
            display: flex;
            flex-direction: column;
          }
          .print-page:last-child { page-break-after: avoid; }
          @page { size: letter; margin: 0; }
        }

        /* Cover */
        .print-cover {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: linear-gradient(180deg, #1a1510, #0f0f0d);
        }
        @media print { .print-cover { background: #1a1a1a; color: #fff; } }
        .print-cover__eyebrow {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8943e;
          margin-bottom: 1.5rem;
        }
        .print-cover__title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }
        .print-cover__issue {
          font-size: 0.8rem;
          color: #8a8074;
          margin-bottom: 2rem;
        }
        .print-cover__tagline {
          font-size: 1rem;
          font-style: italic;
          color: #8a8074;
          max-width: 400px;
          margin: 0 auto;
        }

        /* TOC */
        .print-section-title {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c8943e;
          margin-bottom: 2rem;
        }
        .print-toc__list { display: flex; flex-direction: column; gap: 1rem; }
        .print-toc__item { display: flex; gap: 1rem; align-items: baseline; }
        .print-toc__num { font-size: 0.75rem; color: #c8943e; font-weight: 700; min-width: 2rem; }
        .print-toc__title { display: block; font-weight: 700; font-size: 1rem; }
        .print-toc__city { display: block; font-size: 0.75rem; color: #8a8074; text-transform: capitalize; }

        /* Article */
        .print-article__header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .print-article__num { font-size: 0.75rem; color: #c8943e; font-weight: 700; }
        .print-article__category { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8a8074; }
        .print-article__title { font-size: 2rem; font-weight: 800; line-height: 1.1; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
        .print-article__city { font-size: 0.85rem; color: #c8943e; margin-bottom: 1.5rem; text-transform: capitalize; }
        .print-article__excerpt { font-size: 1.1rem; font-style: italic; color: #8a8074; line-height: 1.6; margin-bottom: 1.5rem; border-left: 3px solid #c8943e; padding-left: 1rem; }
        .print-article__body { font-size: 0.9rem; line-height: 1.7; flex: 1; }
        .print-article__body p { margin-bottom: 1rem; }
        .print-article__footer { display: flex; justify-content: space-between; font-size: 0.7rem; color: #8a8074; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #2a2520; }
        @media print { .print-article__footer { border-top-color: #ddd; color: #999; } }

        /* Back Cover */
        .print-back {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: linear-gradient(180deg, #0f0f0d, #1a1510);
        }
        @media print { .print-back { background: #1a1a1a; color: #fff; } }
        .print-back__brand { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .print-back__tagline { font-size: 0.8rem; color: #c8943e; margin-bottom: 1rem; }
        .print-back__url { font-size: 0.75rem; color: #8a8074; }
      `}</style>
    </>
  );
}
