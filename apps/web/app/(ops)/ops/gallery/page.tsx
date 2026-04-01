import { prisma } from '@bigmuddy/database';
import Link from 'next/link';
import { formatDate } from '@/lib/utils'; // Try to use the shared format. If not available we'll just format manually

export const metadata = {
    title: 'Gallery Operations | Venture Gallery',
};

// Force dynamic due to DB query
export const dynamic = 'force-dynamic';

export default async function GalleryOpsDashboard() {
    let applications: any[] = [];
    try {
        applications = await prisma.artistApplication.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (err) {
        console.error('[gallery] Prisma query failed:', err);
        // Degrade gracefully — render empty state below
    }

    const pendingCount = applications.filter((app: any) => app.status === 'pending').length;
    const approvedCount = applications.filter((app: any) => app.status === 'approved').length;
    const rejectedCount = applications.filter((app: any) => app.status === 'rejected').length;

    // A simple SVG icons cache
    const iconEye = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header & Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
            }}>
                <div style={{ backgroundColor: 'var(--theme-card-bg)', border: '1px solid var(--theme-card-border)', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text-muted)', marginBottom: '0.5rem' }}>New Applications</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--theme-accent)' }}>{pendingCount}</div>
                </div>
                <div style={{ backgroundColor: 'var(--theme-card-bg)', border: '1px solid var(--theme-card-border)', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text-muted)', marginBottom: '0.5rem' }}>Approved Artists</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--theme-success)' }}>{approvedCount}</div>
                </div>
                <div style={{ backgroundColor: 'var(--theme-card-bg)', border: '1px solid var(--theme-card-border)', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text-muted)', marginBottom: '0.5rem' }}>Passes / Rejected</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--theme-text-secondary)' }}>{rejectedCount}</div>
                </div>
            </div>

            {/* Applications List */}
            <div style={{
                backgroundColor: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-card-border)',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--theme-card-border)', backgroundColor: 'var(--theme-accent-bg)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--theme-accent)', margin: 0 }}>Artist Applications</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--theme-text-secondary)', margin: '0.25rem 0 0 0' }}>Review and approve candidates for Venture Gallery</p>
                </div>

                {applications.length === 0 ? (
                    <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--theme-text-muted)' }}>
                        No applications yet.
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ minWidth: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'var(--theme-hover)', color: 'var(--theme-text-secondary)', borderBottom: '1px solid var(--theme-card-border)' }}>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Artist</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Medium</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Location</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Submitted</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app: any) => (
                                    <tr key={app.id} style={{ borderBottom: '1px solid var(--theme-card-border)', transition: 'background-color 0.2s' }}>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ fontWeight: 600, color: 'var(--theme-text-primary)' }}>{app.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>{app.email}</div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--theme-text-secondary)' }}>{app.medium}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--theme-text-secondary)' }}>{app.city}, {app.state}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--theme-text-secondary)' }}>
                                            {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                backgroundColor: app.status === 'pending' ? 'var(--theme-warning-bg, rgba(251,191,36,0.15))' :
                                                                  app.status === 'approved' ? 'var(--theme-success-bg, rgba(52,211,153,0.15))' :
                                                                  'var(--theme-hover)',
                                                color: app.status === 'pending' ? 'var(--theme-warning)' :
                                                       app.status === 'approved' ? 'var(--theme-success)' :
                                                       'var(--theme-text-muted)',
                                                border: `1px solid ${app.status === 'pending' ? 'var(--theme-warning)' : app.status === 'approved' ? 'var(--theme-success)' : 'var(--theme-card-border)'}`
                                            }}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <Link href={`/ops/gallery/${app.id}`} style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                color: 'var(--theme-accent)',
                                                textDecoration: 'none',
                                                padding: '0.375rem 0.75rem',
                                                borderRadius: '0.375rem',
                                                border: '1px solid var(--theme-card-border)',
                                                backgroundColor: 'var(--theme-card-bg)',
                                            }}>
                                                {iconEye} Review
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
