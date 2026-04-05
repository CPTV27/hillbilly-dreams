'use client';

// apps/web/app/admin/launch/page.tsx
// Launch Dashboard — live progress report for the team.
// Mirrors the PDF handout but always current.

import { useState } from 'react';

// ─── Data ───

const LIVE_SITES = [
  { name: 'Big Muddy Touring', url: 'https://bigmuddytouring.com', desc: 'Main site — lodging, route, shows', status: 'live' },
  { name: 'Big Muddy Magazine', url: 'https://bigmuddymagazine.com', desc: 'City guides and features', status: 'live' },
  { name: 'Big Muddy Radio', url: 'https://bigmuddyradio.com', desc: '18 shows, web player, stream', status: 'live' },
  { name: 'Big Muddy Records', url: 'https://bigmuddyrecordlabel.com', desc: 'Record label', status: 'live' },
  { name: 'Big Muddy Entertainment', url: 'https://bigmuddyentertainment.com', desc: 'Shows and talent search', status: 'live' },
  { name: 'Deep South Directory', url: 'https://deepsouthdirectory.com', desc: 'Local business directory', status: 'live' },
  { name: 'Outsider Economics', url: 'https://outsidereconomics.com', desc: 'Economic philosophy', status: 'live' },
  { name: 'Venture Gallery', url: 'https://venturegallery.art', desc: 'Gallery and marketplace', status: 'live' },
  { name: 'Measurably Better Things', url: 'https://measurablybetterthings.com', desc: 'AI business platform', status: 'live' },
  { name: 'Hillbilly Dreams Inc', url: 'https://hillbillydreamsinc.com', desc: 'Holding company', status: 'needs-work' },
  { name: 'Admin Dashboard', url: '/admin/dashboard', desc: 'Operations center', status: 'live' },
];

type TaskStatus = 'done' | 'in-progress' | 'not-started' | 'blocked';

interface LaunchTask {
  name: string;
  owner: string;
  status: TaskStatus;
  target: string;
  week: 1 | 2 | 3;
}

const TASKS: LaunchTask[] = [
  // Week 1
  { name: 'Google account consolidation', owner: 'Chase', status: 'not-started', target: 'Mar 31', week: 1 },
  { name: 'Monthly burn audit with Tracy', owner: 'Chase + Tracy', status: 'not-started', target: 'Apr 2', week: 1 },
  { name: 'Team onboarding — everyone logs in', owner: 'Everyone', status: 'not-started', target: 'Apr 2', week: 1 },
  { name: 'Connect QuickBooks', owner: 'Tracy', status: 'not-started', target: 'Apr 4', week: 1 },
  { name: 'Fix 3 dashboard bugs', owner: 'Chase', status: 'not-started', target: 'Apr 4', week: 1 },
  { name: 'Build /admin/launch dashboard', owner: 'Chase', status: 'done', target: 'Apr 3', week: 1 },
  // Week 2
  { name: 'Tracy: 3 finance tasks (P&L, invoice, report)', owner: 'Tracy', status: 'not-started', target: 'Apr 9', week: 2 },
  { name: 'Amy: 3 ops tasks (event, calendar, review)', owner: 'Amy', status: 'not-started', target: 'Apr 9', week: 2 },
  { name: 'JP: Lock in band for Live at Five (May 8)', owner: 'JP', status: 'not-started', target: 'Apr 15', week: 2 },
  { name: 'Fix everything from user testing', owner: 'Chase', status: 'not-started', target: 'Apr 11', week: 2 },
  { name: 'Program 6 radio shows', owner: 'Chase / Amy / Tracy', status: 'not-started', target: 'Apr 11', week: 2 },
  // Week 3
  { name: 'Rewrite HDI + MBT homepages', owner: 'Chase', status: 'not-started', target: 'Apr 14', week: 3 },
  { name: 'Fix AI images with text errors', owner: 'Chase', status: 'not-started', target: 'Apr 14', week: 3 },
  { name: 'Seed 200 directory listings', owner: 'Chase', status: 'not-started', target: 'Apr 16', week: 3 },
  { name: 'Onboard 3-5 pilot businesses ($25/mo)', owner: 'Chase', status: 'not-started', target: 'Apr 16', week: 3 },
  { name: 'Amy: Add 5 real events to calendar', owner: 'Amy', status: 'not-started', target: 'Apr 16', week: 3 },
  { name: 'Tracy: Verify financial data in dashboard', owner: 'Tracy', status: 'not-started', target: 'Apr 16', week: 3 },
  { name: 'Stripe billing — real transactions', owner: 'Chase', status: 'not-started', target: 'Apr 16', week: 3 },
];

const KEY_DATES = [
  { date: 'Mon Mar 31', event: 'Google account consolidation', highlight: false },
  { date: 'Wed Apr 2', event: 'Everyone logged in. Monthly burn review with Tracy.', highlight: false },
  { date: 'Fri Apr 4', event: 'QuickBooks connected. Dashboard bugs fixed.', highlight: false },
  { date: 'Wed Apr 9', event: 'User testing complete — Tracy, Amy each finish 3 tasks.', highlight: false },
  { date: 'Mon Apr 14', event: 'Homepages rewritten. QC issues fixed.', highlight: false },
  { date: 'Wed Apr 16', event: '200 directory listings. 6 radio shows. 5 real events. Pilot businesses.', highlight: false },
  { date: 'Fri Apr 18', event: 'SOFT LAUNCH — MBT live for Natchez', highlight: true },
  { date: 'Thu May 8', event: 'Live at Five — JP\'s band', highlight: true },
];

const ROLES = [
  { name: 'Chase', role: 'CEO / CTO', areas: 'Platform development, Google infrastructure, business onboarding, homepage rewrites, directory seeding' },
  { name: 'Tracy', role: 'Business & Finance', areas: 'QuickBooks, financial data, monthly burn review, cost optimization' },
  { name: 'Amy', role: 'Inn & Bar Operations', areas: 'Events, calendar, reviews, radio show programming' },
  { name: 'JP', role: 'Shows & Programming', areas: 'Band for Live at Five (May 8). Back in a few weeks. Radio covered by Chase/Amy/Tracy.' },
];

// ─── Helpers ───

function statusColor(s: TaskStatus): string {
  return s === 'done' ? 'var(--success)' : s === 'in-progress' ? 'var(--warning)' : s === 'blocked' ? 'var(--error)' : 'var(--text-disabled)';
}

function statusBg(s: TaskStatus): string {
  return s === 'done' ? 'var(--success-muted)' : s === 'in-progress' ? 'var(--warning-muted)' : s === 'blocked' ? 'var(--error-muted, rgba(239,68,68,0.12))' : 'var(--surface-3)';
}

function statusLabel(s: TaskStatus): string {
  return s === 'done' ? 'DONE' : s === 'in-progress' ? 'IN PROGRESS' : s === 'blocked' ? 'BLOCKED' : 'NOT STARTED';
}

function siteStatusColor(s: string): string {
  return s === 'live' ? 'var(--success)' : s === 'needs-work' ? 'var(--warning)' : 'var(--text-disabled)';
}

function siteStatusBg(s: string): string {
  return s === 'live' ? 'var(--success-muted)' : s === 'needs-work' ? 'var(--warning-muted)' : 'var(--surface-3)';
}

// ─── Component ───

export default function LaunchDashboard() {
  const [weekFilter, setWeekFilter] = useState<number | null>(null);
  const [ownerFilter, setOwnerFilter] = useState<string | null>(null);

  const filteredTasks = TASKS.filter((t) => {
    if (weekFilter && t.week !== weekFilter) return false;
    if (ownerFilter && !t.owner.toLowerCase().includes(ownerFilter.toLowerCase())) return false;
    return true;
  });

  const counts = {
    done: TASKS.filter((t) => t.status === 'done').length,
    inProgress: TASKS.filter((t) => t.status === 'in-progress').length,
    notStarted: TASKS.filter((t) => t.status === 'not-started').length,
    blocked: TASKS.filter((t) => t.status === 'blocked').length,
    total: TASKS.length,
  };

  const pct = Math.round((counts.done / counts.total) * 100);

  const owners = Array.from(new Set(TASKS.map((t) => t.owner)));

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Launch Dashboard</h1>
          <p className="admin-page-sub">Mid-April soft launch — {counts.done} of {counts.total} tasks complete ({pct}%)</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-muted)' }}>
          <span>{pct}% COMPLETE</span>
          <span>TARGET: APRIL 18</span>
        </div>
        <div style={{ height: 8, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--success)', borderRadius: 4, transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {[
            { label: 'Done', count: counts.done, color: 'var(--success)' },
            { label: 'In Progress', count: counts.inProgress, color: 'var(--warning)' },
            { label: 'Not Started', count: counts.notStarted, color: 'var(--text-disabled)' },
            { label: 'Blocked', count: counts.blocked, color: 'var(--error)' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
              {s.label}: {s.count}
            </div>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {[
          { value: '10', label: 'Live Sites', color: 'var(--success)' },
          { value: '15', label: 'Total Domains', color: 'var(--accent)' },
          { value: 'Apr 18', label: 'Soft Launch', color: 'var(--warning)' },
          { value: 'May 8', label: 'Live at Five', color: 'var(--error, #ef4444)' },
        ].map((c) => (
          <div key={c.label} className="admin-card" style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: c.color, letterSpacing: '-0.02em' }}>{c.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-disabled)', letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginTop: 'var(--space-1)' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Live Sites */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>What's Built and Live</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Site</th>
                <th>What It Does</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LIVE_SITES.map((s) => (
                <tr key={s.name}>
                  <td>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>
                      {s.name} <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>↗</span>
                    </a>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{s.desc}</td>
                  <td>
                    <span className="admin-badge" style={{ background: siteStatusBg(s.status), color: siteStatusColor(s.status) }}>
                      {s.status === 'live' ? 'LIVE' : 'NEEDS WORK'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task List */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>Launch Tasks</h2>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <button className={`admin-filter-btn ${weekFilter === null ? 'admin-filter-btn--active' : ''}`} onClick={() => setWeekFilter(null)}>All</button>
            <button className={`admin-filter-btn ${weekFilter === 1 ? 'admin-filter-btn--active' : ''}`} onClick={() => setWeekFilter(1)}>Week 1</button>
            <button className={`admin-filter-btn ${weekFilter === 2 ? 'admin-filter-btn--active' : ''}`} onClick={() => setWeekFilter(2)}>Week 2</button>
            <button className={`admin-filter-btn ${weekFilter === 3 ? 'admin-filter-btn--active' : ''}`} onClick={() => setWeekFilter(3)}>Week 3</button>
            <select className="admin-select" style={{ width: 'auto', minWidth: 120, padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-xs)' }} value={ownerFilter ?? ''} onChange={(e) => setOwnerFilter(e.target.value || null)}>
              <option value="">All People</option>
              {owners.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Owner</th>
                <th>Week</th>
                <th>Target</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{t.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{t.owner}</td>
                  <td><span className="admin-badge admin-badge--draft">{t.week}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{t.target}</td>
                  <td>
                    <span className="admin-badge" style={{ background: statusBg(t.status), color: statusColor(t.status) }}>
                      {statusLabel(t.status)}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr><td colSpan={5} className="admin-empty"><div className="admin-empty__text">No tasks match filters.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gantt-style Timeline */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Timeline</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 1, fontSize: 'var(--text-xs)' }}>
          {/* Header */}
          <div style={{ padding: 'var(--space-3)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Task</div>
          <div style={{ padding: 'var(--space-3)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', textAlign: 'center' }}>Week 1<br /><span style={{ fontWeight: 400 }}>Mar 31-Apr 4</span></div>
          <div style={{ padding: 'var(--space-3)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', textAlign: 'center' }}>Week 2<br /><span style={{ fontWeight: 400 }}>Apr 7-11</span></div>
          <div style={{ padding: 'var(--space-3)', fontWeight: 700, color: 'var(--text-disabled)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', textAlign: 'center' }}>Week 3<br /><span style={{ fontWeight: 400 }}>Apr 14-18</span></div>
          {/* Rows */}
          {TASKS.map((t, i) => {
            const barColor = t.status === 'done' ? 'var(--success)' : t.status === 'in-progress' ? 'var(--warning)' : t.owner.includes('JP') ? 'var(--error, #ef4444)' : 'var(--accent, #4285F4)';
            return [
              <div key={`t${i}`} style={{ padding: 'var(--space-2) var(--space-3)', borderTop: '1px solid var(--border-subtle)', fontWeight: 500, color: 'var(--text)' }}>
                {t.name}<br /><span style={{ color: 'var(--text-disabled)', fontWeight: 400 }}>{t.owner}</span>
              </div>,
              ...[1, 2, 3].map((w) => (
                <div key={`t${i}w${w}`} style={{ padding: 'var(--space-2) var(--space-3)', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {t.week === w && (
                    <div style={{ width: '80%', height: 6, borderRadius: 3, background: barColor }} />
                  )}
                </div>
              )),
            ];
          })}
        </div>
      </div>

      {/* Roles */}
      <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Team Roles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          {ROLES.map((r) => (
            <div key={r.name} style={{ padding: 'var(--space-4)', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--space-1)' }}>{r.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent, #4285F4)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>{r.role}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{r.areas}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Dates */}
      <div className="admin-card">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--space-4)' }}>Key Dates</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Date</th><th>Event</th></tr>
            </thead>
            <tbody>
              {KEY_DATES.map((d, i) => (
                <tr key={i} style={d.highlight ? { background: 'var(--success-muted)' } : undefined}>
                  <td style={{ fontWeight: d.highlight ? 700 : 500, whiteSpace: 'nowrap' }}>{d.date}</td>
                  <td style={{ fontWeight: d.highlight ? 700 : 400, color: d.highlight ? 'var(--success)' : 'var(--text-muted)' }}>{d.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
