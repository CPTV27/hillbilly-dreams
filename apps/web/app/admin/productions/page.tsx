'use client';

// apps/web/app/admin/productions/page.tsx
// Production pipeline board — list all video production jobs

import { useState, useEffect, useCallback, useMemo } from 'react';

const STAGE_FILTERS = ['all', 'script', 'voiceover', 'video', 'review', 'published'];
const STAGE_LABELS: Record<string, string> = {
  script: 'Script',
  voiceover: 'Voiceover',
  video: 'Video',
  review: 'Review',
  published: 'Published',
};

interface Campaign {
  id: number;
  name: string;
  slug: string;
}

interface Job {
  id: number;
  title: string;
  slug: string;
  format: string;
  stage: string;
  approvalStatus: string;
  veoOperationId: string | null;
  updatedAt: string;
  campaign: Campaign;
  _count: { artifacts: number };
}

interface PipelineStageRow {
  stage: string;
  count: number;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function stageBadgeClass(stage: string): string {
  const map: Record<string, string> = {
    script: 'admin-badge--draft',
    voiceover: 'admin-badge--scheduled',
    video: 'admin-badge--upcoming',
    review: 'admin-badge--review',
    published: 'admin-badge--published',
  };
  return map[stage] || 'admin-badge--draft';
}

function approvalBadgeClass(status: string): string {
  const map: Record<string, string> = {
    pending: 'admin-badge--draft',
    approved: 'admin-badge--active',
    revision: 'admin-badge--sold-out',
  };
  return map[status] || 'admin-badge--draft';
}

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton--text" style={{ width: '70%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '50%' }} /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--badge" /></td>
      <td><div className="skeleton skeleton--text" style={{ width: '60%' }} /></td>
    </tr>
  );
}

export default function ProductionsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState<number | null>(null);
  const [pipelineStages, setPipelineStages] = useState<PipelineStageRow[] | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [jobsRes, campaignsRes, pipeRes] = await Promise.all([
        fetch('/api/productions'),
        fetch('/api/productions/campaigns'),
        fetch('/api/content/pipeline'),
      ]);
      const jobsData = await jobsRes.json();
      const campaignsData = await campaignsRes.json();
      setJobs(jobsData.jobs ?? []);
      setCampaigns(campaignsData.campaigns ?? []);
      if (pipeRes.ok) {
        const pipe = await pipeRes.json();
        setPipelineStages(pipe.stages ?? null);
      } else {
        setPipelineStages(null);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch productions:', err);
      setError('Failed to load productions.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (stageFilter !== 'all' && j.stage !== stageFilter) return false;
      if (campaignFilter && j.campaign.id !== campaignFilter) return false;
      return true;
    });
  }, [jobs, stageFilter, campaignFilter]);

  // Stage summary counts
  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = { all: jobs.length };
    for (const stage of STAGE_FILTERS.slice(1)) {
      counts[stage] = jobs.filter((j) => j.stage === stage).length;
    }
    return counts;
  }, [jobs]);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Productions</h1>
          <p className="admin-page-sub">
            Video production pipeline — {jobs.length} job{jobs.length !== 1 ? 's' : ''} across {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}
          </p>
        </div>
        <a href="/admin/productions/new" className="admin-btn admin-btn--primary">
          + New Job
        </a>
      </div>

      {error && <div className="admin-error-banner">{error}</div>}

      {pipelineStages && pipelineStages.length > 0 && (
        <div className="admin-card" style={{ marginBottom: 'var(--space-4)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' }}>Pipeline</span>
          {pipelineStages.map((s) => (
            <span key={s.stage} className="admin-badge admin-badge--draft">
              {STAGE_LABELS[s.stage] || s.stage}: {s.count}
            </span>
          ))}
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Live from /api/content/pipeline</span>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="admin-filter-bar" style={{ marginBottom: 0 }}>
          {STAGE_FILTERS.map((s) => (
            <button
              key={s}
              className={`admin-filter-btn ${stageFilter === s ? 'admin-filter-btn--active' : ''}`}
              onClick={() => setStageFilter(s)}
            >
              {s === 'all' ? 'All' : STAGE_LABELS[s]} ({stageCounts[s] || 0})
            </button>
          ))}
        </div>
        <select
          className="admin-select"
          style={{ width: 'auto', minWidth: 180 }}
          value={campaignFilter ?? ''}
          onChange={(e) => setCampaignFilter(e.target.value ? parseInt(e.target.value, 10) : null)}
        >
          <option value="">All Campaigns</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Format</th>
              <th>Campaign</th>
              <th>Stage</th>
              <th>Approval</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {loading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="admin-empty">
                    <div className="admin-empty__icon">▶</div>
                    <div className="admin-empty__text">
                      {jobs.length === 0
                        ? 'No production jobs yet. Create one or seed the campaigns.'
                        : 'No jobs match the current filters.'}
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {!loading && filtered.map((job) => (
              <tr
                key={job.id}
                onClick={() => window.location.href = `/admin/productions/${job.id}`}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <strong>{job.title}</strong>
                  {job.veoOperationId && (
                    <span style={{ marginLeft: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--warning)' }}>
                      generating...
                    </span>
                  )}
                </td>
                <td>
                  <span className="admin-badge admin-badge--draft">{job.format}</span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{job.campaign.name}</td>
                <td>
                  <span className={`admin-badge ${stageBadgeClass(job.stage)}`}>
                    {STAGE_LABELS[job.stage] || job.stage}
                  </span>
                </td>
                <td>
                  <span className={`admin-badge ${approvalBadgeClass(job.approvalStatus)}`}>
                    {job.approvalStatus}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                  {formatDate(job.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seed button if no campaigns */}
      {!loading && campaigns.length === 0 && (
        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <button
            className="admin-btn admin-btn--ghost"
            onClick={async () => {
              const res = await fetch('/api/productions/seed', { method: 'POST' });
              if (res.ok) fetchData();
            }}
          >
            Seed 6 Campaign Concepts
          </button>
        </div>
      )}
    </>
  );
}
