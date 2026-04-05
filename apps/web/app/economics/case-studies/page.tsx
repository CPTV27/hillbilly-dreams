// Case studies index — markdown from outsider-economics-v2/case-studies/

import type { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/case-studies';

const GCS_ILLUS = 'https://storage.googleapis.com/bmt-media-bigmuddy/illustrations/lookbook';

const description =
  'Field reports from real builds — Natchez, Bearsville, the Bronx, mesh distribution, tourism, rural land.';
export const metadata: Metadata = {
  title: 'Case Studies',
  description,
  openGraph: {
    type: 'website',
    title: 'Case Studies | Outsider Economics',
    description,
    url: 'https://outsidereconomics.com/case-studies',
    siteName: 'Outsider Economics',
  },
  twitter: { card: 'summary_large_image', title: 'Case Studies | Outsider Economics', description },
  alternates: { canonical: 'https://outsidereconomics.com/case-studies' },
};

/** ISR — re-read markdown after deploy / periodic refresh */
export const revalidate = 300;

export default function CaseStudiesIndexPage() {
  const studies = getAllCaseStudies();

  return (
    <div className="oe-case-studies-scope">
      <section
        className="cs-hero"
        style={{
          backgroundImage: `url(${GCS_ILLUS}/12-cartographic/delta-region.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <section className="cs-header">
        <div className="section-container">
          <div className="section-label">Proof</div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-hero)', marginBottom: 'var(--space-6)' }}>
            Case studies
          </h1>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            These aren&apos;t hypotheticals. They&apos;re field notes from systems that shipped — media nodes, directories,
            mesh edges, hospitality stacks. Same voice as the manual; heavier on the receipts.
          </p>
          <a href="/field-manual" className="btn btn--ghost">
            &larr; Field Manual
          </a>
        </div>
      </section>

      <section className="cs-list">
        <div className="section-container">
          <div className="section-label">Reports</div>
          <h2 className="section-title">{studies.length} studies</h2>
          <div className="cs-list__grid">
            {studies.map((s, i) => (
              <a key={s.slug} href={`/case-studies/${s.slug}`} className="cs-card">
                <span className="cs-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="cs-card__title">{s.title}</h3>
                <p className="cs-card__excerpt">{s.excerpt}</p>
                <span className="cs-card__link">Read &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .oe-case-studies-scope {
          --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
          --font-body: 'Inter', system-ui, sans-serif;
          --accent: #c8943e;
          --accent-hover: #d4a04a;
          --accent-muted: rgba(200, 148, 62, 0.15);
          --accent-subtle: rgba(200, 148, 62, 0.08);
          --border: rgba(200, 148, 62, 0.12);
          --border-strong: rgba(200, 148, 62, 0.25);
          --shadow-glow: 0 0 24px rgba(200, 148, 62, 0.14);
        }
        .cs-hero {
          width: 100%;
          height: 42vh;
          min-height: 280px;
          max-height: 480px;
        }
        .cs-header {
          background: var(--bg);
          padding-top: var(--space-12);
          padding-bottom: var(--space-4);
        }
        .cs-list {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding-bottom: var(--space-20);
        }
        .cs-list__grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .cs-card {
          display: block;
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          background: var(--surface-2);
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cs-card:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-glow);
        }
        .cs-card__num {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--accent);
          opacity: 0.6;
          letter-spacing: 0.12em;
        }
        .cs-card__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text);
          margin: var(--space-2) 0 var(--space-3);
          line-height: var(--leading-tight);
        }
        .cs-card__excerpt {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-normal);
          margin: 0 0 var(--space-3);
        }
        .cs-card__link {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--accent);
        }
        .section-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--space-16) var(--space-6);
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
          margin: 0 0 var(--space-8);
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
          border: 1px solid var(--border-strong);
          color: var(--text);
        }
        .btn--ghost:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
