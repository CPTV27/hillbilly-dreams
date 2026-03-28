// apps/web/app/touring/inn/blog/page.tsx
// The Big Muddy Journal — blog index for the Inn
// Server component. Static seed data; swap for DB query when ready.

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Big Muddy Journal | Stories from 411 North Commerce Street',
  description:
    'Music, food, travel, and the real story of Natchez, Mississippi — from the people who live and play at the Big Muddy Inn.',
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-natchez-is-the-next-great-music-city',
    title: 'Why Natchez Is the Next Great Music City',
    excerpt:
      'Forget Nashville. Forget Austin. The real music is happening in a small Mississippi town where the blues never left.',
    category: 'Music',
    date: '2026-03-15',
    readTime: '5 min',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp',
  },
  {
    slug: 'six-suites-six-legends',
    title: 'Six Suites, Six Legends: The Rooms of Big Muddy Inn',
    excerpt:
      'Each room tells a story. Muddy Waters, Robert Johnson, John Lee Hooker, B.B. King, and the British Invasion that brought the blues back home.',
    category: 'The Inn',
    date: '2026-03-10',
    readTime: '7 min',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/inn-blue-suite.webp',
  },
  {
    slug: 'bubbles-bites-and-blues',
    title: 'Bubbles, Bites & Blues: The Excursion That Started It All',
    excerpt:
      'How a biscuit class with Regina Charboneau led to a riverboat, a house on Commerce Street, and a whole new life.',
    category: 'Experience',
    date: '2026-03-05',
    readTime: '6 min',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp',
  },
  {
    slug: 'gas-station-fried-chicken-at-midnight',
    title: 'Gas Station Fried Chicken at Midnight: A Natchez Love Story',
    excerpt:
      "Dodge's Store doesn't look like much. But at midnight, when the chicken comes out fresh, you understand why people never leave Natchez.",
    category: 'Food',
    date: '2026-02-28',
    readTime: '4 min',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/eating-the-delta.webp',
  },
  {
    slug: 'the-blues-room-sessions',
    title: 'Inside the Blues Room: 50 Seats, Zero Pretense',
    excerpt:
      "Our 50-seat speakeasy-style venue is where strangers become friends and music becomes medicine. Here's what a typical Friday night looks like.",
    category: 'Music',
    date: '2026-02-20',
    readTime: '5 min',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-show.webp',
  },
  {
    slug: 'meet-arri-b-aslin',
    title: 'Meet Arri B. Aslin: Our Artist-in-Residence',
    excerpt:
      "Amy Allen transforms into Arri B. Aslin when the lights go down. Meet the soul behind the Blues Room's signature sound.",
    category: 'People',
    date: '2026-02-15',
    readTime: '6 min',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/musician-performing.webp',
  },
  {
    slug: 'what-to-do-in-natchez-beyond-the-antebellum',
    title: 'What to Do in Natchez (Beyond the Antebellum Homes)',
    excerpt:
      "Yes, the mansions are stunning. But Natchez is a food town, a music town, and a river town. Here's the local's guide.",
    category: 'Travel',
    date: '2026-02-10',
    readTime: '8 min',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/magazine/natchez-bluff-sunset.webp',
  },
  {
    slug: 'how-we-got-here',
    title: 'How We Got Here: The Big Muddy Origin Story',
    excerpt:
      'A phone call from a boat. A biscuit class in Natchez. A house on Commerce Street. This is how Big Muddy happened.',
    category: 'The Inn',
    date: '2026-02-05',
    readTime: '10 min',
    image: 'https://storage.googleapis.com/bmt-media-bigmuddy/real/inn-foyer.webp',
  },
];

const CATEGORIES = ['All', 'Music', 'The Inn', 'Food', 'Travel', 'People', 'Experience'];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Featured post card — full width, large image left, text right
function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/touring/inn/blog/${post.slug}`} className="journal-featured">
      <div className="journal-featured__image-wrap">
        <img
          src={post.image}
          alt={post.title}
          className="journal-featured__img"
        />
        <span className="journal-featured__category">{post.category}</span>
      </div>
      <div className="journal-featured__body">
        <p className="journal-featured__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="journal-meta__sep" aria-hidden="true">·</span>
          <span>{post.readTime} read</span>
        </p>
        <h2 className="journal-featured__title">{post.title}</h2>
        <p className="journal-featured__excerpt">{post.excerpt}</p>
        <span className="journal-featured__cta">Read the story →</span>
      </div>
    </Link>
  );
}

// Standard grid card
function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/touring/inn/blog/${post.slug}`} className="journal-card">
      <div className="journal-card__image-wrap">
        <img
          src={post.image}
          alt={post.title}
          className="journal-card__img"
        />
        <span className="journal-card__category">{post.category}</span>
      </div>
      <div className="journal-card__body">
        <p className="journal-card__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="journal-meta__sep" aria-hidden="true">·</span>
          <span>{post.readTime} read</span>
        </p>
        <h3 className="journal-card__title">{post.title}</h3>
        <p className="journal-card__excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export default function InnBlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      {/* ── Hero ── */}
      <section className="journal-hero">
        <div className="journal-hero__bg" aria-hidden="true" />
        <div className="journal-hero__content">
          <div className="journal-hero__eyebrow">
            <span className="journal-hero__ornament">&#9670;</span>
            <span>Big Muddy Inn · Natchez, Mississippi</span>
          </div>
          <h1 className="journal-hero__title">
            The Big Muddy <em>Journal</em>
          </h1>
          <p className="journal-hero__sub">
            Stories from 411 North Commerce Street
          </p>
        </div>
      </section>

      {/* ── Category Pills ── */}
      <section className="journal-filters" aria-label="Filter by category">
        <div className="journal-filters__inner">
          <nav className="journal-pills" aria-label="Blog categories">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`journal-pill${cat === 'All' ? ' journal-pill--active' : ''}`}
                aria-current={cat === 'All' ? 'true' : undefined}
              >
                {cat}
              </span>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Post Grid ── */}
      <section className="journal-grid-section">
        <div className="journal-container">
          {/* Featured post */}
          <FeaturedCard post={featured} />

          {/* Remaining posts — 2-column grid */}
          <div className="journal-grid">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ── Design tokens used throughout ── */
        /* --bg, --surface, --border, --text, --text-muted, --text-disabled */
        /* --accent, --font-display, --font-body, --font-mono              */
        /* --space-*, --text-*, --tracking-*, --leading-*, --radius-*      */

        /* ── Hero ── */
        .journal-hero {
          position: relative;
          padding: var(--space-24) var(--space-6) var(--space-16);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          overflow: hidden;
          text-align: center;
        }
        .journal-hero__bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200, 148, 62, 0.10) 0%, transparent 65%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(200, 148, 62, 0.025) 80px,
              rgba(200, 148, 62, 0.025) 81px
            );
        }
        .journal-hero__content {
          position: relative;
          z-index: 1;
          max-width: 680px;
        }
        .journal-hero__eyebrow {
          display: inline-flex;
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
        .journal-hero__ornament {
          font-size: 8px;
        }
        .journal-hero__title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0 0 var(--space-4);
        }
        .journal-hero__title em {
          font-style: italic;
          color: var(--accent);
        }
        .journal-hero__sub {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          margin: 0;
        }

        /* ── Category Filters ── */
        .journal-filters {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--surface);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .journal-filters__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .journal-filters__inner::-webkit-scrollbar {
          display: none;
        }
        .journal-pills {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4) 0;
          white-space: nowrap;
        }
        .journal-pill {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          color: var(--text-muted);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: var(--space-2) var(--space-4);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          user-select: none;
        }
        .journal-pill:hover {
          color: var(--accent);
          border-color: var(--accent);
        }
        .journal-pill--active {
          color: var(--bg);
          background: var(--accent);
          border-color: var(--accent);
        }

        /* ── Section container ── */
        .journal-grid-section {
          padding: var(--space-16) 0 var(--space-24);
          background: var(--bg);
        }
        .journal-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-10);
        }

        /* ── Meta shared ── */
        .journal-meta__sep {
          color: var(--border-strong);
          margin: 0 var(--space-1);
        }

        /* ── Featured card ── */
        .journal-featured {
          display: grid;
          grid-template-columns: 1fr;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--surface);
          text-decoration: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .journal-featured:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 8px 40px rgba(200, 148, 62, 0.12);
        }
        @media (min-width: 768px) {
          .journal-featured {
            grid-template-columns: 1fr 1fr;
          }
        }
        .journal-featured__image-wrap {
          position: relative;
          min-height: 280px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .journal-featured__image-wrap {
            min-height: 400px;
          }
        }
        .journal-featured__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .journal-featured__category {
          position: absolute;
          top: var(--space-4);
          left: var(--space-4);
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          padding: var(--space-1) var(--space-3);
          border-radius: 100px;
        }
        .journal-featured__body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-8) var(--space-8);
          gap: var(--space-4);
        }
        @media (max-width: 767px) {
          .journal-featured__body {
            padding: var(--space-6);
          }
        }
        .journal-featured__meta {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          margin: 0;
        }
        .journal-featured__title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .journal-featured__excerpt {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
        }
        .journal-featured__cta {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          margin-top: var(--space-2);
        }

        /* ── Grid ── */
        .journal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 640px) {
          .journal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Standard card ── */
        .journal-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--surface);
          text-decoration: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .journal-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 4px 24px rgba(200, 148, 62, 0.10);
        }
        .journal-card__image-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .journal-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .journal-card__category {
          position: absolute;
          top: var(--space-3);
          left: var(--space-3);
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          padding: 3px var(--space-2);
          border-radius: 100px;
        }
        .journal-card__body {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-5);
          flex: 1;
        }
        .journal-card__meta {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          margin: 0;
        }
        .journal-card__title {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .journal-card__excerpt {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          /* Clamp to 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
