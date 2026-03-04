// packages/ui/components/ArticleCard.tsx
// Card component for magazine articles

import React from 'react';
import Image from 'next/image';
import type { Article } from '@bigmuddy/config';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  href?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  'city-guide': 'City Guide',
  feature: 'Feature',
  'photo-essay': 'Photo Essay',
  interview: 'Interview',
  'food-drink': 'Food & Drink',
  music: 'Music',
};

export function ArticleCard({ article, variant = 'default', href }: ArticleCardProps) {
  const articleHref = href || `/articles/${article.slug}`;
  const categoryLabel = CATEGORY_LABELS[article.category] || article.category;
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  if (variant === 'featured') {
    return (
      <article className="article-card article-card--featured">
        <a href={articleHref} className="article-card__link">
          <div className="article-card__image-wrap">
            {article.heroImage ? (
              <Image src={article.heroImage} alt={article.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            ) : (
              <div className="article-card__image-placeholder" />
            )}
          </div>
          <div className="article-card__body">
            <div className="article-card__meta">
              <span className="article-card__category">{categoryLabel}</span>
              {article.city && (
                <span className="article-card__city">
                  {article.city.charAt(0).toUpperCase() + article.city.slice(1)}
                </span>
              )}
            </div>
            <h2 className="article-card__title">{article.title}</h2>
            {article.excerpt && (
              <p className="article-card__excerpt">{article.excerpt}</p>
            )}
            <div className="article-card__footer">
              <span className="article-card__author">{article.author}</span>
              {publishedDate && (
                <span className="article-card__date">{publishedDate}</span>
              )}
              {article.readTime && (
                <span className="article-card__read-time">{article.readTime}</span>
              )}
            </div>
          </div>
        </a>
        <style>{articleCardStyles}</style>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="article-card article-card--compact">
        <a href={articleHref} className="article-card__link">
          <span className="article-card__category">{categoryLabel}</span>
          <h3 className="article-card__title">{article.title}</h3>
          {article.readTime && (
            <span className="article-card__read-time">{article.readTime}</span>
          )}
        </a>
        <style>{articleCardStyles}</style>
      </article>
    );
  }

  // Default card
  return (
    <article className="article-card">
      <a href={articleHref} className="article-card__link">
        <div className="article-card__image-wrap">
          {article.heroImage ? (
            <Image src={article.heroImage} alt={article.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px" style={{ objectFit: 'cover' }} />
          ) : (
            <div className="article-card__image-placeholder" />
          )}
        </div>
        <div className="article-card__body">
          <div className="article-card__meta">
            <span className="article-card__category">{categoryLabel}</span>
            {article.city && (
              <span className="article-card__city">
                {article.city.charAt(0).toUpperCase() + article.city.slice(1)}
              </span>
            )}
          </div>
          <h3 className="article-card__title">{article.title}</h3>
          {article.excerpt && (
            <p className="article-card__excerpt">{article.excerpt}</p>
          )}
          <div className="article-card__footer">
            {publishedDate && (
              <span className="article-card__date">{publishedDate}</span>
            )}
            {article.readTime && (
              <span className="article-card__read-time">{article.readTime}</span>
            )}
          </div>
        </div>
      </a>
      <style>{articleCardStyles}</style>
    </article>
  );
}

const articleCardStyles = `
  .article-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: border-color var(--duration-normal) var(--ease-default),
                transform var(--duration-normal) var(--ease-default);
  }
  .article-card:hover {
    border-color: var(--border-strong);
    transform: translateY(-2px);
  }
  .article-card__link {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  .article-card__image-wrap {
    aspect-ratio: 16/9;
    overflow: hidden;
    background: var(--surface-2);
    position: relative;
  }
  .article-card__image-wrap img {
    transition: transform var(--duration-slow) var(--ease-default);
  }
  .article-card:hover .article-card__image-wrap img {
    transform: scale(1.04);
  }
  .article-card__image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--surface-2) 0%, var(--surface-3) 100%);
  }
  .article-card__body {
    padding: var(--space-6);
  }
  .article-card__meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
  }
  .article-card__category {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--accent);
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
  }
  .article-card__city {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: var(--tracking-wide);
  }
  .article-card__title {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--text);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    margin: 0 0 var(--space-3);
    transition: color var(--duration-fast) var(--ease-default);
  }
  .article-card:hover .article-card__title {
    color: var(--accent-hover);
  }
  .article-card__excerpt {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--text-muted);
    line-height: var(--leading-normal);
    margin: 0 0 var(--space-4);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .article-card__footer {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
  }
  .article-card__author,
  .article-card__date,
  .article-card__read-time {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--text-disabled);
  }
  .article-card__author {
    color: var(--text-muted);
    font-weight: 500;
  }

  /* Featured variant */
  .article-card--featured {
    display: grid;
    grid-template-columns: 1fr;
    background: transparent;
    border: none;
    border-radius: 0;
  }
  @media (min-width: 768px) {
    .article-card--featured .article-card__link {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
      align-items: center;
    }
    .article-card--featured .article-card__image-wrap {
      aspect-ratio: 4/3;
    }
    .article-card--featured .article-card__title {
      font-size: var(--text-4xl);
    }
  }
  .article-card--featured .article-card__body {
    padding: 0;
  }

  /* Compact variant */
  .article-card--compact {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border-subtle);
    border-radius: 0;
    padding: var(--space-4) 0;
  }
  .article-card--compact:hover {
    transform: none;
    border-color: var(--border);
  }
  .article-card--compact .article-card__link {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
  }
  .article-card--compact .article-card__title {
    font-size: var(--text-md);
    font-weight: 600;
    flex: 1;
  }
`;

export default ArticleCard;
