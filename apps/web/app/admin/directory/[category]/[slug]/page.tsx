// apps/web/app/admin/directory/[category]/[slug]/page.tsx
// Directory record detail — single page view of one record
// Server Component reads the catalog JSON and renders all fields for the matched slug.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  DIRECTORY_CATEGORIES,
  DirectoryCategory,
  getRecord,
  isVenueRecord,
  recordDisplayLocation,
} from '@/lib/directory/catalogs';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  if (!isValidCategory(category)) return { title: 'Directory' };
  try {
    const record = await getRecord(category, slug);
    return record ? { title: `${record.name} — ${category}` } : { title: 'Not found' };
  } catch {
    return { title: 'Directory' };
  }
}

function isValidCategory(id: string): id is DirectoryCategory {
  return DIRECTORY_CATEGORIES.some((c) => c.id === id);
}

export default async function RecordDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  if (!isValidCategory(category)) notFound();

  const meta = DIRECTORY_CATEGORIES.find((c) => c.id === category)!;

  let record;
  try {
    record = await getRecord(category, slug);
  } catch {
    notFound();
  }
  if (!record) notFound();

  const location = recordDisplayLocation(record);

  return (
    <div>
      <header className="admin-page-header">
        <div>
          <nav className="dir-crumb">
            <Link href="/admin/directory">Directory</Link>
            <span>/</span>
            <Link href={`/admin/directory/${category}`}>{meta.label}</Link>
            <span>/</span>
            <span>{record.name}</span>
          </nav>
          <h1 className="admin-page-title">{record.name}</h1>
          {location && (
            <p className="admin-page-sub">{location}</p>
          )}
        </div>
        <div className="dir-detail-actions">
          <Link
            href={`/admin/directory/${category}`}
            className="admin-btn admin-btn--ghost"
          >
            ← Back to {meta.label}
          </Link>
        </div>
      </header>

      {isVenueRecord(record) ? (
        <VenueDetail record={record} />
      ) : (
        <GenericDetail record={record} />
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
          flex-wrap: wrap;
        }
        .dir-crumb a {
          color: var(--text-muted);
          text-decoration: none;
        }
        .dir-crumb a:hover { color: var(--accent); }
        .dir-detail-actions {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }
        .dir-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-5);
          margin-bottom: var(--space-6);
        }
        @media (max-width: 768px) {
          .dir-grid-2 { grid-template-columns: 1fr; }
        }
        .dir-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-5);
          margin-bottom: var(--space-5);
        }
        .dir-section h2 {
          margin: 0 0 var(--space-4);
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--text-disabled);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
        }
        .dir-kv {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: var(--space-2) var(--space-4);
          font-size: var(--text-sm);
        }
        @media (max-width: 480px) {
          .dir-kv { grid-template-columns: 1fr; gap: var(--space-1) var(--space-4); }
        }
        .dir-kv__k {
          color: var(--text-muted);
          font-weight: 500;
        }
        .dir-kv__v {
          color: var(--text);
          word-break: break-word;
        }
        .dir-kv__v a {
          color: var(--accent);
          text-decoration: none;
        }
        .dir-kv__v a:hover { text-decoration: underline; }
        .dir-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .dir-chip {
          padding: 2px var(--space-2);
          background: var(--surface-2);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
        }
        .dir-notes {
          margin: 0;
          padding-left: var(--space-5);
          color: var(--text);
          font-size: var(--text-sm);
          line-height: var(--leading-normal);
        }
        .dir-notes li { margin-bottom: var(--space-2); }
        .dir-sources {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .dir-sources li {
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          word-break: break-all;
        }
        .dir-raw {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: var(--space-4);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: var(--text-xs);
          color: var(--text-muted);
          overflow-x: auto;
          white-space: pre-wrap;
          max-height: 600px;
          overflow-y: auto;
        }
        .dir-toggle {
          font-size: var(--text-xs);
          color: var(--text-muted);
          cursor: pointer;
          user-select: none;
          padding: var(--space-2);
        }
      `}</style>
    </div>
  );
}

// ─── Venue Detail ────────────────────────────────────────────────────────────

function VenueDetail({ record }: { record: import('@/lib/directory/catalogs').VenueRecord }) {
  const r = record;
  return (
    <>
      <div className="dir-grid-2">
        <section className="dir-section">
          <h2>Overview</h2>
          <dl className="dir-kv">
            <KV k="Status" v={r.status} />
            <KV k="Year opened" v={r.year_opened} />
            <KV k="Address" v={r.address} />
            <KV k="Neighborhood" v={r.neighborhood} />
            <KV
              k="Venue types"
              v={r.venue_types.length ? r.venue_types.join(', ') : null}
            />
            <KV k="Age policy" v={r.age_policy} />
            <KV k="Capacity tier" v={r.capacity_tier} />
            <KV
              k="Capacity"
              v={
                r.capacity_standing || r.capacity_seated
                  ? [
                      r.capacity_standing && `${r.capacity_standing.toLocaleString()} standing`,
                      r.capacity_seated && `${r.capacity_seated.toLocaleString()} seated`,
                    ]
                      .filter(Boolean)
                      .join(' · ')
                  : null
              }
            />
            <KV k="Confidence" v={r.confidence} />
            <KV k="Gaps remaining" v={r.gaps_count ? String(r.gaps_count) : '0'} />
          </dl>
        </section>

        <section className="dir-section">
          <h2>Contact</h2>
          <dl className="dir-kv">
            <KV k="Website" v={r.website} link />
            <KV k="Phone" v={r.phone} />
            <KV k="Email" v={r.email} email />
            <KV k="Booker" v={r.booker_name} />
            <KV k="Booker email" v={r.booker_email} email />
            <KV k="Booker phone" v={r.booker_phone} />
            <KV k="Typical fee" v={r.typical_fee_range} />
            <KV k="Deal structure" v={r.deal_structure} />
          </dl>
        </section>
      </div>

      {(r.primary_genres.length > 0 || r.secondary_genres.length > 0) && (
        <section className="dir-section">
          <h2>Genres</h2>
          {r.primary_genres.length > 0 && (
            <>
              <p className="dir-kv__k" style={{ marginBottom: '8px' }}>
                Primary
              </p>
              <div className="dir-chip-row" style={{ marginBottom: '12px' }}>
                {r.primary_genres.map((g) => (
                  <span key={g} className="dir-chip">
                    {g}
                  </span>
                ))}
              </div>
            </>
          )}
          {r.secondary_genres.length > 0 && (
            <>
              <p className="dir-kv__k" style={{ marginBottom: '8px' }}>
                Secondary
              </p>
              <div className="dir-chip-row">
                {r.secondary_genres.map((g) => (
                  <span key={g} className="dir-chip">
                    {g}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {Object.keys(r.socials).some((k) => r.socials[k]) && (
        <section className="dir-section">
          <h2>Socials</h2>
          <dl className="dir-kv">
            {Object.entries(r.socials)
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <KV key={k} k={k} v={v} link />
              ))}
          </dl>
        </section>
      )}

      {r.next_contact_action && (
        <section className="dir-section">
          <h2>Next action</h2>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)' }}>
            {r.next_contact_action}
          </p>
        </section>
      )}

      <details className="dir-section">
        <summary className="dir-toggle">View full record (JSON)</summary>
        <pre className="dir-raw">{JSON.stringify(r.full_record, null, 2)}</pre>
      </details>
    </>
  );
}

// ─── Generic Detail ──────────────────────────────────────────────────────────

function GenericDetail({ record }: { record: import('@/lib/directory/catalogs').GenericRecord }) {
  const r = record;
  const fieldEntries = Object.entries(r.fields || {});

  return (
    <>
      <div className="dir-grid-2">
        <section className="dir-section">
          <h2>Contact</h2>
          <dl className="dir-kv">
            <KV k="Website" v={r.website} link />
            <KV k="Email" v={r.email} email />
            <KV k="Phone" v={r.phone} />
            <KV k="City" v={r.city} />
            <KV k="State" v={r.state} />
          </dl>
        </section>

        {Object.keys(r.socials || {}).length > 0 && (
          <section className="dir-section">
            <h2>Socials</h2>
            <dl className="dir-kv">
              {Object.entries(r.socials).map(([k, v]) => (
                <KV key={k} k={k} v={v} link />
              ))}
            </dl>
          </section>
        )}
      </div>

      {fieldEntries.length > 0 && (
        <section className="dir-section">
          <h2>Details</h2>
          <dl className="dir-kv">
            {fieldEntries.map(([k, v]) => (
              <KV
                key={k}
                k={k.replace(/_/g, ' ')}
                v={Array.isArray(v) ? v.join(', ') : String(v)}
              />
            ))}
          </dl>
        </section>
      )}

      {r.notes && r.notes.length > 0 && (
        <section className="dir-section">
          <h2>Notes</h2>
          <ul className="dir-notes">
            {r.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      {r.sources && r.sources.length > 0 && (
        <section className="dir-section">
          <h2>Sources ({r.source_count || r.sources.length})</h2>
          <ul className="dir-sources">
            {r.sources.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {r.gap_fields && r.gap_fields.length > 0 && (
        <section className="dir-section">
          <h2>Gaps to resolve ({r.gaps_count})</h2>
          <div className="dir-chip-row">
            {r.gap_fields.map((f) => (
              <span key={f} className="dir-chip">
                {f}
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

// ─── Key/Value row helper ────────────────────────────────────────────────────

function KV({
  k,
  v,
  link,
  email,
}: {
  k: string;
  v: string | null | undefined;
  link?: boolean;
  email?: boolean;
}) {
  if (!v) return null;
  let content: React.ReactNode = v;
  if (link) {
    const href = /^https?:\/\//.test(v) ? v : `https://${v}`;
    content = (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {v}
      </a>
    );
  } else if (email) {
    content = <a href={`mailto:${v}`}>{v}</a>;
  }
  return (
    <>
      <dt className="dir-kv__k">{k}</dt>
      <dd className="dir-kv__v" style={{ margin: 0 }}>
        {content}
      </dd>
    </>
  );
}
