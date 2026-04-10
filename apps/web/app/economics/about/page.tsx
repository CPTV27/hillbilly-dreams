// apps/web/app/economics/about/page.tsx
// About — Chase and the project

import type { Metadata } from 'next';
const description = 'Chase Tuthill Pierson — photographer, filmmaker, and the guy who was Mechanical Bull. The story behind Outsider Economics.';
export const metadata: Metadata = {
  title: 'About',
  description,
  openGraph: {
    type: 'website',
    title: 'About | Outsider Economics',
    description,
    url: 'https://outsidereconomics.com/about',
    siteName: 'Outsider Economics',
  },
  twitter: { card: 'summary_large_image', title: 'About | Outsider Economics', description },
  alternates: { canonical: 'https://outsidereconomics.com/about' },
};

export default function AboutPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="about-header">
        <div className="section-container">
          <div className="section-label">About</div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-hero)', marginBottom: 'var(--space-6)' }}>
            Who Wrote This
          </h1>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            Not an economist. Not an academic. A photographer and filmmaker
            who got annoyed enough to run the numbers.
          </p>
        </div>
      </section>

      {/* ── The Story ── */}
      <section className="about-story">
        <div className="section-container">
          <div className="about-story__inner">
            <div className="about-story__text">
              <div className="section-label">The Short Version</div>
              <h2 className="section-title">Photographer Makes Spreadsheet</h2>
              <div className="about-story__body">
                <p>
                  I spent years behind a camera. Stills, motion, the same picture from a hundred
                  angles until the right one showed up. I was the band Mechanical Bull — not
                  in it, I was it — and we ended up in more movies than we ever meant to.
                  Film sets, tour vans, small towns that were nothing like the ones on the
                  posters. That's where this all started.
                </p>
                <p>
                  Later I ended up building systems, the way a lot of photographers do when they
                  realize the work is half making the thing and half running the pipeline that
                  ships it. And at some point I looked at the small towns I kept driving through
                  and realized: the informal networks holding them together weren&apos;t just
                  neighborly — they were an economy. A real one. Just undocumented, uncoordinated,
                  and invisible to anyone with a spreadsheet.
                </p>
                <p>
                  So I built the spreadsheet.
                </p>
                <p>
                  Turns out, a community swapping skills generates real value. Market-rate,
                  somebody-would-have-charged-you-for-this value. And none of it has to
                  leave town.
                </p>
                <p>
                  That&apos;s when I wrote the book. Not because I wanted to be an author —
                  because someone needed to write down the math before the people who know
                  how to do this stuff all retire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What I Do ── */}
      <section className="about-work">
        <div className="section-container">
          <div className="section-label">The Longer Version</div>
          <h2 className="section-title">What I Actually Do</h2>
          <div className="about-work__grid">
            <div className="about-work__card">
              <h3 className="about-work__card-title">Big Muddy Touring</h3>
              <p className="about-work__card-desc">
                A media-hospitality company anchored in Natchez, Mississippi. A boutique inn,
                a touring circuit down the Mississippi, and a network of venues and artists
                that runs on the same principles as this book.
              </p>
              <a href="https://bigmuddytouring.com" className="about-work__link" target="_blank" rel="noopener noreferrer">
                bigmuddytouring.com
              </a>
            </div>
            <div className="about-work__card">
              <h3 className="about-work__card-title">Big Muddy Magazine</h3>
              <p className="about-work__card-desc">
                Long-form stories about the Deep South. The people, the music,
                the food, the economics. The stuff that doesn&apos;t fit in a tweet thread.
              </p>
              <a href="https://bigmuddymagazine.com" className="about-work__link" target="_blank" rel="noopener noreferrer">
                bigmuddymagazine.com
              </a>
            </div>
            <div className="about-work__card">
              <h3 className="about-work__card-title">Big Muddy Radio</h3>
              <p className="about-work__card-desc">
                Internet radio from Natchez, Mississippi. Blues, roots, the American Parlor
                Songbook. The soundtrack to everything else we do.
              </p>
              <a href="https://bigmuddyradio.com" className="about-work__link" target="_blank" rel="noopener noreferrer">
                bigmuddyradio.com
              </a>
            </div>
            <div className="about-work__card">
              <h3 className="about-work__card-title">Outsider Economics</h3>
              <p className="about-work__card-desc">
                This project. The book, the math, the community. Everything I learned
                about why small towns aren&apos;t actually broke — they&apos;re just badly
                coordinated.
              </p>
              <a href="https://outsidereconomics.substack.com" className="about-work__link" target="_blank" rel="noopener noreferrer">
                The Weekly Dispatch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Point ── */}
      <section className="about-point">
        <div className="section-container">
          <div className="about-point__inner">
            <div className="section-label">The Point</div>
            <h2 className="section-title">Why Any of This Matters</h2>
            <div className="about-point__body">
              <p>
                I&apos;m not trying to start a movement. Movements need leaders and leaders
                need followers and followers need permission. That&apos;s the old pattern.
              </p>
              <p>
                This is a manual. You read it, you run the math on your town, and then
                you either do something or you don&apos;t. I&apos;m not going to follow up.
                I&apos;m not going to sell you a course. There&apos;s no mastermind group.
              </p>
              <p>
                There&apos;s just the math, the frameworks, and the fact that twenty
                people in your zip code already have every skill your community needs.
                The only thing missing is the coordination.
              </p>
              <p style={{ color: 'var(--accent)', fontWeight: 600 }}>
                So coordinate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="about-contact">
        <div className="section-container">
          <div className="about-contact__inner">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-desc" style={{ maxWidth: 480, margin: '0 auto var(--space-8)' }}>
              I read everything. I can&apos;t promise I&apos;ll reply to everything, but
              I&apos;ll read it. Especially if you ran the numbers on your town and want
              to tell me what you found.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <a
                href="https://outsidereconomics.substack.com"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe to the Dispatch
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
        </div>
      </section>

      <style>{`
        /* ── Header ── */
        .about-header {
          background: var(--bg);
          padding-top: var(--space-16);
        }

        /* ── Story ── */
        .about-story {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .about-story__inner {
          max-width: 720px;
        }
        .about-story__body {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .about-story__body p {
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
        }
        .about-story__body p:nth-child(3) {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text);
          line-height: var(--leading-tight);
        }

        /* ── Work ── */
        .about-work {
          background: var(--bg);
        }
        .about-work__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 640px) {
          .about-work__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .about-work__card {
          padding: var(--space-6);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface);
          transition: border-color var(--duration-normal) var(--ease-default);
        }
        .about-work__card:hover {
          border-color: var(--border-strong);
        }
        .about-work__card-title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 var(--space-3);
        }
        .about-work__card-desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-4);
        }
        .about-work__link {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
        }
        .about-work__link:hover {
          text-decoration: underline;
        }

        /* ── The Point ── */
        .about-point {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .about-point__inner {
          max-width: 720px;
        }
        .about-point__body {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .about-point__body p {
          font-size: var(--text-md);
          color: var(--text-muted);
          line-height: var(--leading-loose);
          margin: 0;
        }

        /* ── Contact ── */
        .about-contact {
          background: var(--bg);
        }
        .about-contact__inner {
          text-align: center;
        }

        /* ── Shared ── */
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
      `}</style>
    </>
  );
}
