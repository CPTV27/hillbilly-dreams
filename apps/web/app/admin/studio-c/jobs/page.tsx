'use client';

import { useState, useEffect } from 'react';

interface StudioCJob {
  id: string;
  clientBrand: string;
  clientId: number | null;
  requestType: string;
  brief: string;
  location: string | null;
  preferredDate: string | null;
  budget: string | null;
  status: string;
  assignedTo: string | null;
  jobId: number | null;
  notes: string | null;
  callSheet?: unknown;
  createdAt: string;
}

const STATUSES = ['submitted', 'accepted', 'scheduled', 'shooting', 'editing', 'review', 'delivered', 'archived'];
const BRANDS = ['all', 'big-muddy', 'bearsville', 'dsd', 'tuthill', 'magazine'];
const BRAND_LABELS: Record<string, string> = { 'big-muddy': 'Big Muddy', bearsville: 'Bearsville Creative', dsd: 'DSD', tuthill: 'Tuthill Design', magazine: 'Magazine' };
const TYPE_LABELS: Record<string, string> = { 'session-recording': 'Session Recording', 'promo-video': 'Promo Video', 'property-tour': 'Property Tour', 'social-clips': 'Social Clips', bts: 'Behind the Scenes', documentary: 'Documentary' };
const STATUS_COLORS: Record<string, string> = { submitted: 'var(--warning, #c89e3e)', accepted: 'var(--accent, #c8943e)', scheduled: 'var(--slate, #4a6274)', shooting: 'var(--accent, #c8943e)', editing: 'var(--slate, #4a6274)', review: 'var(--warning, #c89e3e)', delivered: 'var(--success, #4a7c59)', archived: 'var(--text-disabled, #6b635a)' };

export default function StudioCJobsPage() {
  const [jobs, setJobs] = useState<StudioCJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (brandFilter !== 'all') params.set('brand', brandFilter);
    fetch(`/api/studio-c/jobs?${params}`)
      .then(r => r.json())
      .then(d => setJobs(d.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [statusFilter, brandFilter]);

  const updateJob = async (id: string, field: string, value: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/studio-c/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });
      const body = await res.json().catch(() => ({}));
      if (body.data) {
        setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...body.data } : j)));
      } else {
        setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, [field]: value } : j)));
      }
    } catch {
      /* keep UI stable */
    }
    setUpdating(null);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Studio C Jobs</h1>
          <p className="admin-page-sub">Video production requests from all HDI brands. Utopia Studios, Bearsville NY.</p>
        </div>
        <button onClick={load} className="admin-btn admin-btn--ghost">Refresh</button>
      </div>

      {/* Filters — horizontal scroll on narrow viewports (#88) */}
      <div className="studio-c-jobs-filters" style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', flexWrap: 'nowrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch', alignItems: 'center' }}>
        <div className="admin-filter-bar" style={{ margin: 0, flexShrink: 0 }}>
          {['all', ...STATUSES.slice(0, 5)].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`admin-filter-btn ${statusFilter === s ? 'admin-filter-btn--active' : ''}`} style={{ minHeight: 44 }}>
              {s}
            </button>
          ))}
        </div>
        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="admin-select" style={{ width: 'auto', minWidth: 160, minHeight: 44, fontSize: '16px', flexShrink: 0 }}>
          {BRANDS.map(b => <option key={b} value={b}>{b === 'all' ? 'All Brands' : BRAND_LABELS[b] || b}</option>)}
        </select>
      </div>

      {/* Job Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">{'🎬'}</div>
          <p className="admin-empty__text">No production requests yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {jobs.map(job => (
            <div key={job.id} className="admin-card" style={{ borderLeft: `3px solid ${STATUS_COLORS[job.status] || 'var(--border)'}`, opacity: updating === job.id ? 0.5 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                    <span className="admin-badge admin-badge--upcoming">{BRAND_LABELS[job.clientBrand] || job.clientBrand}</span>
                    <span className="admin-badge admin-badge--media">{TYPE_LABELS[job.requestType] || job.requestType}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', lineHeight: 1.6, margin: 0, maxWidth: 500 }}>{job.brief}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
                    {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  {job.preferredDate && (
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)' }}>
                      Target: {new Date(job.preferredDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              </div>

              <div className="studio-c-job-actions" style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'stretch', flexWrap: 'wrap' }}>
                {/* Status */}
                <select
                  value={job.status}
                  onChange={e => updateJob(job.id, 'status', e.target.value)}
                  className="admin-select"
                  style={{ width: 'auto', minWidth: 'min(100%, 200px)', minHeight: 44, padding: '10px 32px 10px 12px', fontSize: '16px' }}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Assignee */}
                <input
                  type="text"
                  placeholder="Assign to..."
                  defaultValue={job.assignedTo || ''}
                  onBlur={e => { if (e.target.value !== (job.assignedTo || '')) updateJob(job.id, 'assignedTo', e.target.value); }}
                  className="admin-input"
                  style={{ flex: '1 1 160px', minWidth: 140, minHeight: 44, padding: '10px 12px', fontSize: '16px' }}
                />

                {/* Budget + Location */}
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', alignSelf: 'center', width: '100%', flexBasis: '100%' }}>
                  {job.budget || 'No budget'} {job.location ? `\u00b7 ${job.location}` : ''}
                </span>
                <a
                  href={`/admin/studio-c/sessions/${job.id}/call-sheet`}
                  className="admin-btn admin-btn--ghost"
                  style={{ fontSize: 'var(--text-sm)', minHeight: 44, padding: '10px 16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                >
                  Call sheet
                </a>
                {job.jobId != null && (
                  <a
                    href={`/admin/productions/${job.jobId}`}
                    className="admin-btn admin-btn--ghost"
                    style={{ fontSize: 'var(--text-sm)', minHeight: 44, padding: '10px 16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                  >
                    Production job #{job.jobId}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
