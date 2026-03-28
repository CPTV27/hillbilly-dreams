// apps/web/app/touring/inn/blog/[slug]/page.tsx
// Individual blog post page — "coming soon" placeholder while articles are being written.
// Dynamic route: /touring/inn/blog/[slug]

import type { Metadata } from 'next';
import Link from 'next/link';

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

// Next.js 13+ App Router: params is now a Promise in Next 15
type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | Big Muddy Journal` : 'Big Muddy Journal',
    description: post?.excerpt,
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: { params: Params }) {
  const { slug } = await props.params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="post-not-found">
        <p className="post-not-found__code">404</p>
        <h1 className="post-not-found__title">Story not found</h1>
        <Link href="/touring/inn/blog" className="post-not-found__back">
          ← Back to the Journal
        </Link>
        <style>{`
          .post-not-found {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--space-4);
            padding: var(--space-24) var(--space-6);
            text-align: center;
            background: var(--bg);
          }
          .post-not-found__code {
            font-family: var(--font-mono);
            font-size: var(--text-xs);
            color: var(--accent);
            letter-spacing: var(--tracking-widest);
            text-transform: uppercase;
            margin: 0;
          }
          .post-not-found__title {
            font-family: var(--font-display);
            font-size: var(--text-3xl);
            font-weight: 700;
            color: var(--text);
            margin: 0;
          }
          .post-not-found__back {
            font-family: var(--font-body);
            font-size: var(--text-sm);
            color: var(--accent);
            text-decoration: none;
          }
          .post-not-found__back:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {/* ── Post header ── */}
      <section className="post-hero">
        <div className="post-hero__bg" aria-hidden="true" />
        <div className="post-hero__content">
          <Link href="/touring/inn/blog" className="post-hero__back">
            ← The Journal
          </Link>
          <span className="post-hero__category">{post.category}</span>
          <h1 className="post-hero__title">{post.title}</h1>
          <p className="post-hero__excerpt">{post.excerpt}</p>
          <p className="post-hero__meta">
            <time dateTime={post.date}>
              {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="post-hero__meta-sep" aria-hidden="true">·</span>
            <span>{post.readTime} read</span>
          </p>
        </div>
      </section>

      {/* ── Coming soon body ── */}
      <section className="post-coming-soon">
        <div className="post-coming-soon__inner">
          <div className="post-coming-soon__ornament" aria-hidden="true">&#9670;</div>
          <h2 className="post-coming-soon__heading">This story is being written.</h2>
          <p className="post-coming-soon__body">
            The full article is on its way. Check back soon — or subscribe below
            and we&apos;ll send it to you when it&apos;s ready.
          </p>
          <Link href="/touring/inn/blog" className="post-coming-soon__back">
            ← Browse other stories
          </Link>
        </div>
      </section>

      <style>{`
        /* ── Post Hero ── */
        .post-hero {
          position: relative;
          padding: var(--space-24) var(--space-6) var(--space-16);
          background: var(--bg);
          overflow: hidden;
        }
        .post-hero__bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200, 148, 62, 0.09) 0%, transparent 60%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(200, 148, 62, 0.025) 80px,
              rgba(200, 148, 62, 0.025) 81px
            );
        }
        .post-hero__content {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .post-hero__back {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          letter-spacing: var(--tracking-wide);
          text-decoration: none;
          text-transform: uppercase;
          width: fit-content;
        }
        .post-hero__back:hover {
          text-decoration: underline;
        }
        .post-hero__category {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          padding: var(--space-1) var(--space-3);
          border-radius: 100px;
          width: fit-content;
        }
        .post-hero__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .post-hero__excerpt {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
          max-width: 640px;
        }
        .post-hero__meta {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          margin: 0;
        }
        .post-hero__meta-sep {
          margin: 0 var(--space-2);
          color: var(--border-strong);
        }

        /* ── Coming Soon ── */
        .post-coming-soon {
          border-top: 1px solid var(--border);
          background: var(--surface);
          padding: var(--space-24) var(--space-6);
        }
        .post-coming-soon__inner {
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-6);
        }
        .post-coming-soon__ornament {
          font-size: 10px;
          color: var(--accent);
          opacity: 0.6;
        }
        .post-coming-soon__heading {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .post-coming-soon__body {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
        }
        .post-coming-soon__back {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
        }
        .post-coming-soon__back:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
