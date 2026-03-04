// apps/web/app/(magazine)/articles/[id]/page.tsx
// Article detail page — rich editorial typography

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { NewsletterSignup } from '@bigmuddy/ui';
import type { Article } from '@bigmuddy/config';

interface ArticlePageProps {
  params: { id: string };
}

// Static placeholder articles — replace with prisma queries when database is connected
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
    body: `<p>The crossroads is real. You can stand there at midnight, at the corner of Highways 61 and 49, in the middle of Clarksdale, Mississippi, and feel it. The weight of every note ever played in this delta town pressing up through the asphalt.</p>

<p>The legend says Robert Johnson went to the crossroads at midnight and sold his soul to the devil in exchange for the ability to play guitar like no one before him. The truth, as with most things in the delta, is more interesting and more complicated. Johnson likely learned to play from Ike Zinneman, a musician so good that people assumed he must have made the same deal. The crossroads story was attached to Johnson later, a convenient mythology for a man who died at 27 and left behind only twenty-nine songs.</p>

<p>But the crossroads is still worth visiting. Not because a deal was made there, but because of what the intersection represents — the moment when the blues met electric amplification, when the Delta sound got loud enough to be heard in Chicago, and from Chicago, heard around the world.</p>

<h2>Delta Blues Museum</h2>

<p>Start here. The Delta Blues Museum is a genuine institution — not the tourist-trap kind of institution, but the kind that takes its subject seriously. The collection includes instruments, photographs, and memorabilia spanning the full arc of Delta blues history, from Son House and Charley Patton through Muddy Waters and B.B. King. The Muddy Waters cabin has been moved here from its original site in Rolling Fork.</p>

<p>Plan for two hours minimum. More if you're the kind of person who reads every placard.</p>

<h2>Ground Zero Blues Club</h2>

<p>Morgan Freeman co-owns this place, which tells you something about how seriously Clarksdale takes its blues heritage. Ground Zero is not a museum piece — it's a working juke joint, with live music most nights and a menu that takes blues food (catfish, fried pickles, tamales) as seriously as the music.</p>

<p>The building itself is a converted cotton warehouse from the 1930s. The floors slope, the walls are plastered with photographs and graffiti, and the ceiling is covered in business cards from visitors going back decades. Order a beer, find a table near the stage, and wait. Something good is always about to happen.</p>

<h2>The Drive South</h2>

<p>Highway 61 south of Clarksdale is some of the flattest land in America. The delta is not beautiful in the conventional sense — there are no mountains, no dramatic coastline, no postcard vistas. What it has instead is a particular quality of light in the late afternoon that turns the flat fields golden and makes you understand why people stayed, generation after generation, despite everything else.</p>

<p>Drive south with the windows down. Put on something by Junior Kimbrough. The music starts to make sense once you're moving through the landscape that made it.</p>`,
    readTime: '8 min read',
    publishedAt: new Date('2026-02-15').toISOString(),
    heroImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// TODO: generateStaticParams — replace with prisma query:
// export async function generateStaticParams() {
//   const articles = await prisma.article.findMany({
//     where: { status: 'published' },
//     select: { slug: true },
//   });
//   return articles.map((a) => ({ slug: a.slug }));
// }

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  // TODO: Replace with prisma query
  const article = PLACEHOLDER_ARTICLES.find((a) => a.slug === params.id);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.heroImage ? [{ url: article.heroImage }] : [{ url: '/og-default.jpg' }],
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // TODO: Replace with prisma query:
  // const article = await prisma.article.findUnique({
  //   where: { slug: params.slug },
  // });
  // if (!article || article.status !== 'published') notFound();

  const article = PLACEHOLDER_ARTICLES.find((a) => a.slug === params.id);

  if (!article) {
    notFound();
  }

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const CATEGORY_LABELS: Record<string, string> = {
    'city-guide': 'City Guide',
    feature: 'Feature',
    'photo-essay': 'Photo Essay',
    interview: 'Interview',
    'food-drink': 'Food & Drink',
    music: 'Music',
  };

  return (
    <>
      <article className="article-page">
        {/* ── Article Header ── */}
        <header className="article-header">
          <div className="article-header__inner">
            <div className="article-header__meta">
              <a
                href="/articles"
                className="article-header__category"
              >
                {CATEGORY_LABELS[article.category] || article.category}
              </a>
              {article.city && (
                <span className="article-header__separator">·</span>
              )}
              {article.city && (
                <span className="article-header__city">
                  {article.city.charAt(0).toUpperCase() + article.city.slice(1)}
                </span>
              )}
            </div>
            <h1 className="article-header__title">{article.title}</h1>
            {article.excerpt && (
              <p className="article-header__excerpt">{article.excerpt}</p>
            )}
            <div className="article-header__byline">
              <span className="article-header__author">{article.author}</span>
              {publishedDate && (
                <>
                  <span className="article-header__separator">·</span>
                  <span className="article-header__date">{publishedDate}</span>
                </>
              )}
              {article.readTime && (
                <>
                  <span className="article-header__separator">·</span>
                  <span className="article-header__read-time">{article.readTime}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── Hero Image ── */}
        {article.heroImage && (
          <div className="article-hero-img">
            <div className="article-hero-img__inner">
              <img
                src={article.heroImage}
                alt={article.title}
                className="article-hero-img__img"
              />
            </div>
          </div>
        )}

        {/* ── Article Body ── */}
        <div className="article-body">
          <div className="article-body__inner">
            {article.body ? (
              <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
            ) : (
              <p className="article-prose__placeholder">
                This article is being prepared for publication.
              </p>
            )}
          </div>
        </div>

        {/* ── Article Footer ── */}
        <footer className="article-footer">
          <div className="article-footer__inner">
            <div className="article-footer__rule" aria-hidden="true" />
            <div className="article-footer__nav">
              <a href="/magazine" className="article-footer__back">← Back to Magazine</a>
              {article.city && (
                <a
                  href={`/city-guides#${article.city}`}
                  className="article-footer__city-guide"
                >
                  {article.city.charAt(0).toUpperCase() + article.city.slice(1)} City Guide →
                </a>
              )}
            </div>
          </div>
        </footer>
      </article>

      <NewsletterSignup variant="inline" />

      <style>{`
        .article-page {
          background: var(--bg);
        }
        /* ── Header ── */
        .article-header {
          background: var(--bg);
          padding: var(--space-20) 0 var(--space-12);
          border-bottom: 1px solid var(--border);
        }
        .article-header__inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }
        .article-header__meta {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
        }
        .article-header__category {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .article-header__category:hover { color: var(--accent-hover); }
        .article-header__separator {
          color: var(--text-disabled);
          font-size: var(--text-xs);
        }
        .article-header__city {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
        }
        .article-header__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          line-height: var(--leading-tight);
          margin: 0 0 var(--space-6);
        }
        .article-header__excerpt {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-6);
          border-left: 2px solid var(--accent);
          padding-left: var(--space-5);
        }
        .article-header__byline {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
        }
        .article-header__author {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text);
        }
        .article-header__date,
        .article-header__read-time {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        /* ── Hero Image ── */
        .article-hero-img {
          width: 100%;
          background: var(--surface);
        }
        .article-hero-img__inner {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-8) var(--space-6);
        }
        .article-hero-img__img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        /* ── Article Body ── */
        .article-body {
          padding: var(--space-12) 0 var(--space-20);
        }
        .article-body__inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        /* ── Article Prose Styles ── */
        .article-prose {
          font-family: var(--font-body);
          font-size: 1.0625rem; /* 17px */
          color: var(--text);
          line-height: var(--leading-loose);
        }
        .article-prose p {
          margin: 0 0 var(--space-6);
        }
        .article-prose h2 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: var(--space-12) 0 var(--space-4);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border-subtle);
        }
        .article-prose h3 {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: var(--space-8) 0 var(--space-3);
        }
        .article-prose blockquote {
          border-left: 3px solid var(--accent);
          padding: var(--space-4) var(--space-6);
          margin: var(--space-8) 0;
          background: var(--accent-subtle);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
        .article-prose blockquote p {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          color: var(--text);
          margin: 0;
          line-height: var(--leading-snug);
        }
        .article-prose a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .article-prose a:hover { color: var(--accent-hover); }
        .article-prose img {
          width: 100%;
          border-radius: var(--radius-md);
          margin: var(--space-8) 0;
        }
        .article-prose__placeholder {
          color: var(--text-disabled);
          font-style: italic;
        }

        /* ── Footer ── */
        .article-footer__inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 var(--space-6) var(--space-12);
        }
        .article-footer__rule {
          height: 1px;
          background: var(--border);
          margin-bottom: var(--space-8);
        }
        .article-footer__nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-4);
        }
        .article-footer__back,
        .article-footer__city-guide {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-default);
        }
        .article-footer__back:hover,
        .article-footer__city-guide:hover { color: var(--accent-hover); }
      `}</style>
    </>
  );
}
