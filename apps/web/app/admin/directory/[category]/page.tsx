// apps/web/app/admin/directory/[category]/page.tsx
// Directory category list — table of all records in one category
// Server Component reads the catalog JSON and renders a sortable, scannable table.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  DIRECTORY_CATEGORIES,
  DirectoryCategory,
  getCatalog,
  isVenueRecord,
  recordDisplayLocation,
  recordPrimaryContact,
} from '@/lib/directory/catalogs';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const meta = DIRECTORY_CATEGORIES.find((c) => c.id === category);
  return {
    title: meta ? `${meta.label} — Directory` : 'Directory',
    description: meta?.description,
  };
}

function isValidCategory(id: string): id is DirectoryCategory {
  return DIRECTORY_CATEGORIES.some((c) => c.id === id);
}

export default async function CategoryListPage({ params }: PageProps) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();

  const meta = DIRECTORY_CATEGORIES.find((c) => c.id === category)!;

  let records: Awaited<ReturnType<typeof getCatalog>>['records'] = [];
  let loadError: string | null = null;
  try {
    const result = await getCatalog(category);
    records = result.records;
  } catch (err) {
    loadError = err instanceof Error ? err.message : String(err);
  }

  // Sort by state, then city, then name for consistent scanning
  records = [...records].sort((a, b) => {
    const ac = (a.state ?? '') + (a.city ?? '') + a.name;
    const bc = (b.state ?? '') + (b.city ?? '') + b.name;
    return ac.localeCompare(bc);
  });

  const highConfidence = records.filter((r) => {
    if (isVenueRecord(r)) return r.confidence === 'High';
    return false;
  }).length;

  return (
    <div>
      <header className="admin-page-header">
        <div>
          <nav className="dir-crumb">
            <Link href="/admin/directory">Directory</Link>
            <span>/</span>
            <span>{meta.label}</span>
          </nav>
          <h1 className="admin-page-title">
            <span className="dir-title-icon" aria-hidden="true">{meta.icon}</span>
            {meta.label}
          </h1>
          <p className="admin-page-sub">
            {records.length.toLocaleString()} {records.length === 1 ? 'record' : 'records'}
            {highConfidence > 0 && ` · ${highConfidence} high confidence`}
          </p>
        </div>
        <div>
          <Link href="/admin/directory" className="admin-btn admin-btn--ghost">
            ← All categories
          </Link>
        </div>
      </header>

      {loadError ? (
        <div className="admin-error-banner">
          Could not load catalog for <strong>{meta.label}</strong>: {loadError}
        </div>
      ) : records.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">{meta.icon}</div>
          <p className="admin-empty__text">
            No {meta.label.toLowerCase()} catalog found yet. Drop a seed YAML into{' '}
            <code>Perplexity-research/</code> and run the ingester.
          </p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                {category === 'venues' ? (
                  <>
                    <th>Capacity</th>
                    <th>Genres</th>
                    <th>Confidence</th>
                  </>
                ) : (
                  <>
                    <th>Details</th>
                    <th>Gaps</th>
                  </>
                )}
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => {
                const location = recordDisplayLocation(r);
                const contact = recordPrimaryContact(r);
                return (
                  <tr key={r.slug}>
                    <td>
                      <Link
                        href={`/admin/directory/${category}/${r.slug}`}
                        className="dir-link"
                      >
                        {r.name}
                      </Link>
                    </td>
                    <td className="dir-muted">{location || '—'}</td>
                    {isVenueRecord(r) ? (
                      <>
                        <td className="dir-muted">
                          {r.capacity_standing
                            ? `${r.capacity_standing.toLocaleString()} std`
                            : r.capacity_seated
                              ? `${r.capacity_seated.toLocaleString()} seated`
                              : r.capacity_tier || '—'}
                        </td>
                        <td className="dir-muted dir-wrap">
                          {r.primary_genres.slice(0, 3).join(', ') || '—'}
                        </td>
                        <td>
                          <span
                            className={`admin-badge admin-badge--${
                              r.confidence === 'High'
                                ? 'published'
                                : r.confidence === 'Medium'
                                  ? 'review'
                                  : 'draft'
                            }`}
                          >
                            {r.confidence}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="dir-muted dir-wrap">
                          {detailsSnippet(r)}
                        </td>
                        <td className="dir-muted">
                          {'gaps_count' in r && r.gaps_count > 0
                            ? `${r.gaps_count}`
                            : '—'}
                        </td>
                      </>
                    )}
                    <td className="dir-muted dir-wrap">
                      {contact ? truncate(contact, 40) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .dir-crumb {
          display: flex;
          gap: var(--space-2);
          font-size: var(--text-xs);
          color: var(--text-muted);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          margin-bottom: var(--space-2);
        }
        .dir-crumb a {
          color: var(--text-muted);
          text-decoration: none;
        }
        .dir-crumb a:hover { color: var(--accent); }
        .dir-title-icon {
          color: var(--accent);
          margin-right: var(--space-2);
          font-size: 0.9em;
        }
        .dir-link {
          color: var(--text);
          font-weight: 600;
          text-decoration: none;
        }
        .dir-link:hover { color: var(--accent); }
        .dir-muted { color: var(--text-muted); }
        .dir-wrap {
          max-width: 260px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + '…';
}

function detailsSnippet(r: { fields?: Record<string, string | string[]> }): string {
  if (!r.fields) return '—';
  // Pick one or two interesting fields to show
  const preferred = ['genres', 'genre', 'type', 'beat', 'role', 'service', 'services'];
  for (const key of preferred) {
    const v = r.fields[key];
    if (v) {
      return Array.isArray(v) ? v.slice(0, 3).join(', ') : String(v);
    }
  }
  const first = Object.entries(r.fields)[0];
  if (!first) return '—';
  const [, v] = first;
  return Array.isArray(v) ? v.slice(0, 3).join(', ') : String(v);
}
