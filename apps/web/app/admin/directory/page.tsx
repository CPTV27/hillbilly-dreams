// apps/web/app/admin/directory/page.tsx
// Directory browse — top-level category index
// Reads JSON catalogs seeded by scripts/directory/ingest-*.py
// Each card shows a category's record count and a link to the category's list page.

import Link from 'next/link';
import {
  DIRECTORY_CATEGORIES,
  type CatalogSource,
  getAllCatalogCounts,
} from '@/lib/directory/catalogs';

function SourceBadge({ source }: { source: CatalogSource }) {
  const label =
    source === 'yaml' ? 'Canonical' : source === 'md' ? 'Placeholder' : 'Empty';
  const title =
    source === 'yaml'
      ? 'Sourced from a Perplexity YAML seed — template-conformant.'
      : source === 'md'
        ? 'Derived from a narrative MD file — will be replaced when the YAML seed lands.'
        : 'No records yet.';
  return (
    <span className={`dir-source-badge dir-source-badge--${source}`} title={title}>
      {label}
    </span>
  );
}

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Big Muddy Directory',
  description: 'Internal catalog of venues, musicians, studios, press, labels, festivals, tourism, infrastructure, and editorial pitches across the Mississippi music corridor.',
};

export default async function DirectoryIndexPage() {
  const counts = await getAllCatalogCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  // Sort canonical (YAML) categories above placeholders (MD) so the eye lands on truth first.
  const sourceRank: Record<string, number> = { yaml: 0, md: 1, empty: 2 };
  const ordered = [...DIRECTORY_CATEGORIES].sort(
    (a, b) => sourceRank[a.source] - sourceRank[b.source],
  );

  const yamlCount = DIRECTORY_CATEGORIES.filter((c) => c.source === 'yaml').length;
  const mdCount = DIRECTORY_CATEGORIES.filter((c) => c.source === 'md').length;

  return (
    <div>
      <header className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Big Muddy Directory</h1>
          <p className="admin-page-sub">
            {total.toLocaleString()} records across {DIRECTORY_CATEGORIES.length} categories
            {' · '}
            <span className="dir-source-key">
              <span className="dir-source-key__pill dir-source-key__pill--yaml" />
              {yamlCount} canonical
            </span>
            {' '}
            <span className="dir-source-key">
              <span className="dir-source-key__pill dir-source-key__pill--md" />
              {mdCount} placeholder
            </span>
          </p>
        </div>
      </header>

      <div className="dir-grid">
        {ordered.map((cat) => {
          const count = counts[cat.id] || 0;
          return (
            <Link
              key={cat.id}
              href={`/admin/directory/${cat.id}`}
              className={`dir-card dir-card--${cat.source}`}
            >
              <div className="dir-card__icon" aria-hidden="true">
                {cat.icon}
              </div>
              <div className="dir-card__body">
                <div className="dir-card__row">
                  <div className="dir-card__label">{cat.label}</div>
                  <SourceBadge source={cat.source} />
                </div>
                <div className="dir-card__desc">{cat.description}</div>
                <div className="dir-card__count">
                  {count === 0 ? (
                    <span className="dir-card__count-empty">No records yet</span>
                  ) : (
                    <>
                      <strong>{count.toLocaleString()}</strong>
                      <span>{count === 1 ? 'record' : 'records'}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="dir-footnote">
        <p>
          <strong>Canonical</strong> categories are sourced from a Perplexity seed YAML and
          are template-conformant (confidence scores, gap lists, sources).{' '}
          <strong>Placeholder</strong> categories were seeded from MD narratives and will
          be replaced as the next round of YAML seeds lands.
        </p>
        <p>
          Catalogs live at <code>data/directory/&lt;category&gt;/&lt;category&gt;-catalog.json</code>.
          Re-seed any category with{' '}
          <code>python3 scripts/directory/ingest-seed.py &lt;category&gt;</code>{' '}
          (wipes the existing dir before writing).
        </p>
      </div>

      <style>{`
        .dir-source-key {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-right: var(--space-2);
          font-size: var(--text-xs);
        }
        .dir-source-key__pill {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dir-source-key__pill--yaml { background: var(--success, #22c55e); }
        .dir-source-key__pill--md   { background: var(--warning, #d97706); }
        .dir-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }
        .dir-card {
          display: flex;
          gap: var(--space-4);
          padding: var(--space-5);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text);
          transition: all var(--duration-fast) var(--ease-default);
          position: relative;
        }
        .dir-card--md {
          opacity: 0.85;
        }
        .dir-card--md:hover { opacity: 1; }
        .dir-card:hover {
          border-color: var(--accent);
          transform: translateY(-1px);
        }
        .dir-card--yaml {
          border-left: 3px solid var(--success, #22c55e);
        }
        .dir-card--md {
          border-left: 3px solid var(--warning, #d97706);
        }
        .dir-card__icon {
          font-size: 28px;
          color: var(--accent);
          width: 40px;
          flex-shrink: 0;
          line-height: 1;
          padding-top: 2px;
        }
        .dir-card__body {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          min-width: 0;
          flex: 1;
        }
        .dir-card__row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-2);
        }
        .dir-card__label {
          font-size: var(--text-lg);
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .dir-source-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: var(--tracking-widest);
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          white-space: nowrap;
        }
        .dir-source-badge--yaml {
          background: var(--success-muted, rgba(34, 197, 94, 0.15));
          color: var(--success, #22c55e);
        }
        .dir-source-badge--md {
          background: var(--warning-muted, rgba(217, 119, 6, 0.15));
          color: var(--warning, #d97706);
        }
        .dir-source-badge--empty {
          background: var(--surface-2);
          color: var(--text-disabled);
        }
        .dir-card__desc {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: var(--leading-snug);
        }
        .dir-card__count {
          margin-top: auto;
          font-size: var(--text-xs);
          color: var(--text-muted);
          display: flex;
          align-items: baseline;
          gap: var(--space-2);
          padding-top: var(--space-2);
          border-top: 1px solid var(--border-subtle);
        }
        .dir-card__count strong {
          font-size: var(--text-xl);
          color: var(--text);
          font-weight: 700;
        }
        .dir-card__count-empty {
          color: var(--text-disabled);
          font-style: italic;
        }
        .dir-footnote {
          padding: var(--space-5);
          border: 1px dashed var(--border);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          font-size: var(--text-sm);
          line-height: var(--leading-normal);
        }
        .dir-footnote code {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: var(--text-xs);
          background: var(--surface-2);
          padding: 1px 6px;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
}
