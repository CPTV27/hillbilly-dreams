// apps/web/app/magazine/city-guides/page.tsx
// City guides index — all 18 city guide articles grouped by region

import type { Metadata } from 'next';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@bigmuddy/ui';
import {
  CITY_GUIDE_ARTICLES,
  CORRIDOR_CITIES,
  LOUISIANA_CITIES,
  ARKANSAS_MISSOURI_CITIES,
} from '@/lib/articles';
import type { Article } from '@bigmuddy/config';

export const metadata: Metadata = {
  title: 'City Guides — Big Muddy Magazine',
  description:
    'Comprehensive guides to all 18 cities in the Big Muddy network. Memphis to New Orleans, Louisiana, Arkansas, and Missouri.',
};

const REGIONS = [
  {
    id: 'corridor',
    label: 'The Corridor',
    subtitle: 'Memphis to New Orleans',
    description:
      'The core route — five cities along Highway 61, the Blues Highway. This is where the whole journey begins and ends.',
    citySlugs: CORRIDOR_CITIES,
  },
  {
    id: 'louisiana',
    label: 'Louisiana',
    subtitle: 'River Road to the Red River',
    description:
      'Eight cities across Louisiana — plantation country, Cajun heartland, the oldest town in the territory, and the city where Elvis was launched.',
    citySlugs: LOUISIANA_CITIES,
  },
  {
    id: 'arkansas-missouri',
    label: 'Arkansas & Missouri',
    subtitle: 'Delta to the Ozarks',
    description:
      'Five cities from South Arkansas through the Ozark hills to Missouri — oil boom towns, college cities, world-class art museums, and the most honest city in America.',
    citySlugs: ARKANSAS_MISSOURI_CITIES,
  },
];

function ArticleGuideCard({ article }: { article: Article }) {
  const cityLabel = article.city
    ? article.city
        .split('-')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : null;

  return (
    <a href={`/articles/${article.slug}`} className="guide-card">
      <div className="guide-card__image-wrap">
        {article.heroImage ? (
          <Image
            src={article.heroImage}
            alt={cityLabel ?? article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="guide-card__image-placeholder" />
        )}
        <div className="guide-card__image-overlay" />
        {cityLabel && (
          <span className="guide-card__city-badge">{cityLabel}</span>
        )}
      </div>
      <div className="guide-card__body">
        <h3 className="guide-card__title">{article.title}</h3>
        {article.excerpt && (
          <p className="guide-card__excerpt">{article.excerpt}</p>
        )}
        <div className="guide-card__footer">
          {article.readTime && (
            <span className="guide-card__read-time">{article.readTime}</span>
          )}
          <span className="guide-card__read-link">Read guide →</span>
        </div>
      </div>
    </a>
  );
}

export default function CityGuidesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="guides-hero">
        <div className="guides-hero__content">
          <div className="guides-hero__eyebrow">
            <span className="guides-hero__ornament">&#9670;</span>
            <span>Big Muddy Magazine</span>
          </div>
          <h1 className="guides-hero__title">City Guides</h1>
          <p className="guides-hero__sub">
            Eighteen cities. Five states. From Memphis to Branson, from the Delta 
            to the Ozarks — the places where American music was born, died, and 
            refuses to stop being reborn.
          </p>
          <div className="guides-hero__count">
            <span className="guides-hero__count-num">18</span>
            <span className="guides-hero__count-label">City Guides</span>
          </div>
        </div>
      </section>

      {/* ── Region Groups ── */}
      {REGIONS.map((region) => {
        const regionArticles = CITY_GUIDE_ARTICLES.filter((a) =>
          region.citySlugs.includes(a.city as string)
        );

        return (
          <section key={region.id} id={region.id} className="guides-region">
            <div className="guides-region__container">
              <div className="guides-region__header">
                <div>
                  <div className="section-label">{region.label}</div>
                  <h2 className="guides-region__title">{region.subtitle}</h2>
                  <p className="guides-region__desc">{region.description}</p>
                </div>
                <div className="guides-region__count">
                  <span className="guides-region__count-num">{regionArticles.length}</span>
                  <span className="guides-region__count-label">guides</span>
                </div>
              </div>

              <div className="guides-grid">
                {regionArticles.map((article) => (
                  <ArticleGuideCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <style>{`
        /* ── Hero ── */
        .guides-hero {
          background: var(--bg);
          padding: var(--space-24) var(--space-6) var(--space-20);
          position: relative;
          overflow: hidden;
        }
        .guides-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200, 148, 62, 0.07) 0%, transparent 60%);
        }
        .guides-hero__content {
          position: relative;
          max-width: var(--container-xl);
          margin: 0 auto;
        }
        .guides-hero__eyebrow {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-6);
        }
        .guides-hero__ornament {
          font-size: 8px;
        }
        .guides-hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-6);
        }
        .guides-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          max-width: 600px;
          margin: 0 0 var(--space-10);
        }
        .guides-hero__count {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
        }
        .guides-hero__count-num {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--accent);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
        }
        .guides-hero__count-label {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
        }

        /* ── Region ── */
        .guides-region {
          border-top: 1px solid var(--border);
        }
        .guides-region:nth-child(even) {
          background: var(--surface);
        }
        .guides-region__container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-16) var(--space-6);
        }
        .guides-region__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-6);
          margin-bottom: var(--space-10);
          flex-wrap: wrap;
        }
        .guides-region__title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-3);
        }
        .guides-region__desc {
          font-family: var(--font-body);
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          max-width: 560px;
          margin: 0;
        }
        .guides-region__count {
          text-align: right;
          flex-shrink: 0;
        }
        .guides-region__count-num {
          display: block;
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-tight);
          line-height: 1;
        }
        .guides-region__count-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
        }

        /* ── Guides Grid ── */
        .guides-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 640px) {
          .guides-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .guides-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── Guide Card ── */
        .guide-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: border-color var(--duration-normal) var(--ease-default),
                      transform var(--duration-normal) var(--ease-default);
        }
        .guide-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-2px);
        }
        .guide-card__image-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--surface-2);
        }
        .guide-card__image-wrap img {
          transition: transform var(--duration-slow) var(--ease-default);
        }
        .guide-card:hover .guide-card__image-wrap img {
          transform: scale(1.05);
        }
        .guide-card__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,15,13,0.6) 0%, transparent 60%);
          z-index: 1;
        }
        .guide-card__image-placeholder {
          position: absolute;
          inset: 0;
          background: var(--surface-2);
        }
        .guide-card__city-badge {
          position: absolute;
          bottom: var(--space-3);
          left: var(--space-3);
          z-index: 2;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          background: var(--accent);
          border-radius: var(--radius-sm);
          padding: 2px var(--space-2);
        }
        .guide-card__body {
          padding: var(--space-5);
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .guide-card__title {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-snug);
          margin: 0 0 var(--space-3);
        }
        .guide-card__excerpt {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-4);
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .guide-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
          margin-top: auto;
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-subtle);
        }
        .guide-card__read-time {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wide);
        }
        .guide-card__read-link {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .guide-card:hover .guide-card__read-link {
          color: var(--accent-hover);
        }

        /* Shared */
        .section-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          margin-bottom: var(--space-3);
          display: block;
        }
      `}</style>
    </>
  );
}
