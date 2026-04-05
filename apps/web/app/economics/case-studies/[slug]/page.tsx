import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getAdjacentCaseStudies } from '@/lib/case-studies';
import { CaseStudyPrintButton } from './print-button';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: 'Not Found' };
  return {
    title: study.title,
    description: study.excerpt,
    openGraph: {
      type: 'article',
      title: `${study.title} | Outsider Economics`,
      description: study.excerpt,
      url: `https://outsidereconomics.com/case-studies/${slug}`,
      siteName: 'Outsider Economics',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${study.title} | Outsider Economics`,
      description: study.excerpt,
    },
    alternates: {
      canonical: `https://outsidereconomics.com/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const { prev, next } = getAdjacentCaseStudies(slug);

  return (
    <>
      <article className="post cs-study">
        <div className="post__container">
          <header className="post__header">
            <div className="post__eyebrow">
              <span className="post__num">Case study</span>
              <span className="post__divider">/</span>
              <a href="/case-studies" className="post__back">
                All studies
              </a>
            </div>
            <h1 className="post__title">{study.title}</h1>
            <p className="cs-print-hint no-print" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-4)' }}>
              <CaseStudyPrintButton />
              <span style={{ marginLeft: 'var(--space-3)' }}>Use your browser print dialog for walk-in collateral.</span>
            </p>
          </header>
          <div className="post__body" dangerouslySetInnerHTML={{ __html: study.htmlContent ?? '' }} />

          <nav className="post__nav no-print" aria-label="Case study navigation">
            {prev ? (
              <a href={`/case-studies/${prev.slug}`} className="post__nav-link post__nav-link--prev">
                <span className="post__nav-label">&larr; Previous</span>
                <span className="post__nav-title">{prev.title}</span>
              </a>
            ) : (
              <div />
            )}
            {next ? (
              <a href={`/case-studies/${next.slug}`} className="post__nav-link post__nav-link--next">
                <span className="post__nav-label">Next &rarr;</span>
                <span className="post__nav-title">{next.title}</span>
              </a>
            ) : (
              <a href="/case-studies" className="post__nav-link post__nav-link--next">
                <span className="post__nav-label">Index &rarr;</span>
                <span className="post__nav-title">All case studies</span>
              </a>
            )}
          </nav>

          <footer className="post__footer no-print">
            <a href="/case-studies" className="btn btn--ghost">
              &larr; All studies
            </a>
            <a href="/field-manual" className="btn btn--ghost">
              Field Manual
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
        .post__header { margin-bottom: var(--space-12); }
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
        .post__divider { color: var(--text-disabled); font-size: var(--text-xs); }
        .post__back {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }
        .post__back:hover { color: var(--accent); }
        .post__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          color: var(--text);
          line-height: var(--leading-tight);
          letter-spacing: var(--tracking-tight);
          margin: 0;
        }
        .cs-print-btn {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
          background: transparent;
          border: 1px solid var(--accent);
          border-radius: var(--radius-md);
          padding: var(--space-2) var(--space-4);
          cursor: pointer;
        }
        .cs-print-btn:hover {
          background: var(--accent-muted);
        }
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
        .post__body p { margin: 0 0 var(--space-6); }
        .post__body strong { color: var(--text); font-weight: 700; }
        .post__body ul { margin: 0 0 var(--space-6); padding-left: var(--space-6); }
        .post__body li { margin-bottom: var(--space-4); }
        .post__body a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
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
        }
        .post__nav-link:hover { border-color: var(--accent); box-shadow: var(--shadow-glow); }
        .post__nav-link--next { text-align: right; }
        .post__nav-label {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--accent);
          text-transform: uppercase;
        }
        .post__nav-title {
          font-family: var(--font-display);
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--text);
        }
        .post__footer {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          padding-top: var(--space-12);
          margin-top: var(--space-8);
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-6);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 600;
          border-radius: var(--radius-md);
          text-decoration: none;
          border: 1px solid var(--border-strong);
          color: var(--text);
        }
        .btn--ghost:hover { border-color: var(--accent); color: var(--accent); }
        @media print {
          .no-print { display: none !important; }
          .cs-study { background: #fff !important; color: #111 !important; }
          .post__body, .post__title { color: #111 !important; }
        }
        @media (max-width: 640px) {
          .post__title { font-size: var(--text-4xl); }
          .post__nav { grid-template-columns: 1fr; }
          .post__nav-link--next { text-align: left; }
        }
      `}</style>
    </>
  );
}
