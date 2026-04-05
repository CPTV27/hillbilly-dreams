'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface AuditIssue {
  severity: 'critical' | 'warning' | 'info';
  title: string;
  detail: string;
  fix: string;
}

interface AuditData {
  business: {
    name: string;
    slug: string;
    city: string;
    state: string;
    category: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
  };
  google: {
    found: boolean;
    placeId: string | null;
    rating: number | null;
    reviewCount: number | null;
    hours: Record<string, { open: string; close: string }> | null;
    photoCount: number;
    businessStatus: string | null;
    website: string | null;
  };
  issues: AuditIssue[];
  score: number;
  dsdPitch: string;
}

const SEVERITY_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  critical: { bg: 'var(--error-muted, rgba(239,68,68,0.12))', color: 'var(--error, #ef4444)', label: 'CRITICAL' },
  warning: { bg: 'var(--warning-muted, rgba(200,158,62,0.12))', color: 'var(--warning, #c89e3e)', label: 'WARNING' },
  info: { bg: 'var(--slate-muted, rgba(74,98,116,0.12))', color: 'var(--slate, #4a6274)', label: 'INFO' },
};

function scoreColor(score: number): string {
  if (score >= 80) return 'var(--success, #4a7c59)';
  if (score >= 50) return 'var(--warning, #c89e3e)';
  return 'var(--error, #ef4444)';
}

export default function AuditPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [audit, setAudit] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/scout/audit/${slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        else setAudit(d.data);
      })
      .catch(() => setError('Failed to load audit'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Running audit for <strong>{slug}</strong>...</p>
        <p style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>Checking Google Places, reviews, hours, photos...</p>
      </div>
    );
  }

  if (error || !audit) {
    return (
      <div style={{ padding: 'var(--space-8)' }}>
        <div className="admin-error-banner">{error || 'No audit data'}</div>
        <a href="/admin/scout" className="admin-btn admin-btn--ghost" style={{ marginTop: 'var(--space-4)' }}>Back to Scout</a>
      </div>
    );
  }

  const { business, google, issues, score, dsdPitch } = audit;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div className="admin-page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="admin-page-title">{business.name}</h1>
          <p className="admin-page-sub">
            {business.category && `${business.category} \u00b7 `}{business.city}, {business.state}
            {business.address && ` \u00b7 ${business.address}`}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="admin-btn admin-btn--primary"
        >
          Print Audit
        </button>
      </div>

      {/* Score + Pitch */}
      <div className="admin-card" style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div style={{ textAlign: 'center', minWidth: 100 }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: scoreColor(score), lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginTop: 'var(--space-1)' }}>Score</div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
            {dsdPitch}
          </p>
        </div>
      </div>

      {/* Google Snapshot */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>
          Google Business Profile
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Status</div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: google.found ? 'var(--success)' : 'var(--error)' }}>
              {google.found ? (google.businessStatus || 'Found') : 'Not Found'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Rating</div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)' }}>
              {google.rating ? `${google.rating} \u2605` : '\u2014'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Reviews</div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)' }}>
              {google.reviewCount ?? '\u2014'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Photos</div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)' }}>
              {google.photoCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Hours</div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)' }}>
              {google.hours && Object.keys(google.hours).length > 0 ? `${Object.keys(google.hours).length} days` : 'Missing'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>Website</div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>
              {google.website || business.website || '\u2014'}
            </div>
          </div>
        </div>
      </div>

      {/* Issues */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>
          Issues ({issues.length})
        </h2>
        {issues.length === 0 ? (
          <div className="admin-card" style={{ textAlign: 'center', color: 'var(--success)' }}>
            No issues found. Business looks solid.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {issues.map((issue, i) => {
              const sev = SEVERITY_STYLES[issue.severity];
              return (
                <div key={i} className="admin-card" style={{ borderLeft: `3px solid ${sev.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--radius-sm)', background: sev.bg, color: sev.color, letterSpacing: 'var(--tracking-wide)' }}>
                      {sev.label}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text)' }}>{issue.title}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-2)', lineHeight: 1.5 }}>{issue.detail}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', margin: 0, fontWeight: 600 }}>{issue.fix}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Walk-In Pitch */}
      <div className="admin-card" style={{ borderLeft: '3px solid var(--accent)', marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-3)' }}>
          Walk-In Pitch
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 1.7, margin: '0 0 var(--space-4)' }}>
          {dsdPitch}
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <a href={`/directory/onboard?business=${business.slug}&tier=marketing`} className="admin-btn admin-btn--primary">
            Start Onboard ($99/mo)
          </a>
          <a href={`/directory/onboard?business=${business.slug}&tier=free`} className="admin-btn admin-btn--ghost">
            Free Listing First
          </a>
        </div>
      </div>

      {/* Contact Info */}
      {(business.phone || business.website) && (
        <div className="admin-card" style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-3)' }}>
            Contact
          </h2>
          {business.phone && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', margin: '0 0 var(--space-1)' }}>Phone: {business.phone}</p>}
          {business.website && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', margin: 0 }}>Web: {business.website}</p>}
        </div>
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          .admin-sidebar, .admin-sidebar__footer, nav, [role="navigation"] { display: none !important; }
          .admin-shell { grid-template-columns: 1fr !important; }
          .admin-btn { display: none !important; }
          .admin-card { break-inside: avoid; border: 1px solid #ddd !important; }
          * { color: #000 !important; background: #fff !important; }
        }
      `}</style>
    </div>
  );
}
