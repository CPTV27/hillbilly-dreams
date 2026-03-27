'use client';

// apps/web/app/portal/reports/reports-client.tsx
// Monthly reports view — read-only for clients
//
// Usage: /portal/reports?client=1

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface ReportData {
  id: number;
  month: number;
  year: number;
  data: Record<string, unknown>;
  summary: string | null;
  pdfUrl: string | null;
  sentAt: string | null;
}

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

interface ReportMetricProps {
  value: unknown;
  label: string;
}

function ReportMetric({ value, label }: ReportMetricProps) {
  if (value === undefined || value === null) return null;
  const numVal = Number(value);
  if (numVal === 0 && label === 'Avg Rating') return null;
  return (
    <div className="portal-stat">
      <span className="portal-stat__value">{String(value)}</span>
      <span className="portal-stat__label">{label}</span>
    </div>
  );
}

export default function PortalReportsClient() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client');
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    fetch(`${baseUrl}/api/clients/${clientId}/report`)
      .then(r => r.json())
      .then(d => setReports(d.data || []))
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <p style={{ textAlign: 'center', color: 'var(--text-muted, #8a8074)', padding: '64px 0' }}
        role="status" aria-live="polite">
        Loading reports...
      </p>
    );
  }

  if (reports.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted, #8a8074)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text, #2a2520)', marginBottom: '12px' }}>
          Monthly Reports
        </h1>
        <p>Your first monthly report will be generated at the end of the month.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="portal-page-title">Monthly Reports</h1>

      <div className="portal-reports-list">
        {reports.map(report => {
          const d = report.data as Record<string, unknown>;
          return (
            <article key={report.id} className="portal-card">
              <header className="portal-report-header">
                <h2 className="portal-report-title">
                  {MONTH_NAMES[report.month]} {report.year}
                </h2>
                <div className="portal-report-actions">
                  {report.sentAt && (
                    <span className="portal-report-sent">
                      Sent {new Date(report.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                  {report.pdfUrl && (
                    <a
                      href={report.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portal-pdf-link"
                      aria-label={`Download PDF for ${MONTH_NAMES[report.month]} ${report.year}`}
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </header>

              <div className="portal-stats portal-report-stats" role="list" aria-label="Report metrics">
                <ReportMetric value={d.postsPublished} label="Posts Published" />
                <ReportMetric value={d.reviewCount} label="New Reviews" />
                <ReportMetric value={d.avgRating} label="Avg Rating" />
                <ReportMetric value={d.reviewsResponded} label="Reviews Responded" />
                <ReportMetric value={d.totalImpressions} label="Impressions" />
                <ReportMetric value={d.totalEngagements} label="Engagements" />
              </div>

              {report.summary && (
                <div className="portal-report-summary">
                  <p className="portal-report-summary__text">{report.summary}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <style>{`
        .portal-page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text, #2a2520);
          margin: 0 0 var(--space-8, 32px);
          letter-spacing: -0.01em;
        }
        .portal-reports-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-6, 24px);
        }
        .portal-card {
          background: var(--surface, #fff);
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-md, 8px);
          padding: var(--space-6, 24px);
        }
        .portal-report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-5, 20px);
          gap: var(--space-3, 12px);
          flex-wrap: wrap;
        }
        .portal-report-title {
          font-size: var(--text-lg, 18px);
          font-weight: 700;
          color: var(--text, #2a2520);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .portal-report-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3, 12px);
        }
        .portal-report-sent {
          font-size: var(--text-xs, 12px);
          color: var(--text-disabled, #b8b0a4);
        }
        .portal-pdf-link {
          display: inline-block;
          padding: 6px 12px;
          font-size: var(--text-xs, 12px);
          font-weight: 600;
          color: var(--accent, #c8553d);
          border: 1px solid var(--accent, #c8553d);
          border-radius: var(--radius-sm, 4px);
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .portal-pdf-link:hover {
          background: var(--accent, #c8553d);
          color: #fff;
        }
        .portal-pdf-link:focus-visible {
          outline: 2px solid var(--accent, #c8553d);
          outline-offset: 2px;
        }
        .portal-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: var(--space-3, 12px);
        }
        .portal-report-stats {
          margin-bottom: var(--space-5, 20px);
        }
        .portal-stat {
          background: var(--bg, #faf9f6);
          border: 1px solid var(--border, #e5e2dc);
          border-radius: var(--radius-md, 8px);
          padding: var(--space-4, 16px);
          text-align: center;
        }
        .portal-stat__value {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text, #2a2520);
          line-height: 1;
          margin-bottom: var(--space-1, 4px);
          letter-spacing: -0.02em;
        }
        .portal-stat__label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted, #8a8074);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .portal-report-summary {
          background: var(--bg, #faf9f6);
          padding: var(--space-4, 16px) var(--space-5, 20px);
          border-radius: var(--radius-sm, 4px);
          border-left: 3px solid var(--accent, #c8553d);
        }
        .portal-report-summary__text {
          font-size: var(--text-sm, 14px);
          color: var(--text, #2a2520);
          line-height: 1.7;
          margin: 0;
          white-space: pre-wrap;
        }
      `}</style>
    </>
  );
}
