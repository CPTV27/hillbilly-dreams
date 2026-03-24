import { prisma } from '@bigmuddy/database';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function GalleryApplicationReview({ params }: { params: { id: string } }) {
    const app = await prisma.artistApplication.findUnique({
        where: { id: params.id },
        include: { user: true },
    });

    if (!app) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--theme-text-primary)' }}>Application not found.</h1>
                <Link href="/ops/gallery" style={{ color: 'var(--theme-accent)' }}>Back to Gallery</Link>
            </div>
        );
    }

    const isPending = app.status === 'PENDING';
    const displayName = app.user?.name ?? 'Unknown Artist';
    const displayEmail = app.user?.email ?? 'No email';

    const iconCheck = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
    const iconX = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    const iconBack = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '48rem' }}>
            <div>
                <Link href="/ops/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text-muted)', textDecoration: 'none', marginBottom: '1rem' }}>
                    {iconBack} Back to Gallery
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--theme-text-primary)' }}>Review Artist: {displayName}</h1>
                    <span style={{
                        padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                        backgroundColor: app.status === 'PENDING' ? 'var(--theme-warning-bg, rgba(251,191,36,0.15))' : app.status === 'APPROVED' ? 'var(--theme-success-bg, rgba(52,211,153,0.15))' : 'var(--theme-hover)',
                        color: app.status === 'PENDING' ? 'var(--theme-warning)' : app.status === 'APPROVED' ? 'var(--theme-success)' : 'var(--theme-text-muted)',
                        border: `1px solid ${app.status === 'PENDING' ? 'var(--theme-warning)' : app.status === 'APPROVED' ? 'var(--theme-success)' : 'var(--theme-card-border)'}`
                    }}>
                        {app.status}
                    </span>
                </div>
            </div>

            <div style={{ backgroundColor: 'var(--theme-card-bg)', border: '1px solid var(--theme-card-border)', borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--theme-text-muted)', marginBottom: '0.25rem' }}>Email</div>
                            <div style={{ color: 'var(--theme-text-primary)', fontWeight: 500 }}><a href={`mailto:${displayEmail}`} style={{color:'var(--theme-accent)'}}>{displayEmail}</a></div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--theme-text-muted)', marginBottom: '0.25rem' }}>Portfolio</div>
                            <div style={{ color: 'var(--theme-text-primary)', fontWeight: 500 }}>
                                <a href={app.portfolioUrl.startsWith('http') ? app.portfolioUrl : `https://${app.portfolioUrl}`} target="_blank" rel="noreferrer" style={{color:'var(--theme-accent)'}}>{app.portfolioUrl}</a>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--theme-text-muted)', marginBottom: '0.25rem' }}>Stripe Account</div>
                            <div style={{ color: 'var(--theme-text-primary)', fontWeight: 500 }}>{app.stripeAccountId ?? 'Not yet created'}</div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--theme-card-border)', paddingTop: '1.5rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--theme-text-muted)', marginBottom: '0.5rem' }}>Artist Statement</div>
                        <div style={{ color: 'var(--theme-text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap', backgroundColor: 'var(--theme-hover)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--theme-card-border)' }}>
                            {app.artistStatement}
                        </div>
                    </div>
                </div>

                {isPending && (
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--theme-hover)', borderTop: '1px solid var(--theme-card-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <form action={`/api/gallery/applications/${app.id}/approve`} method="POST" style={{ flex: 1 }}>
                            <button type="submit" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#fff', backgroundColor: 'var(--theme-success)', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                                {iconCheck} Approve & Create Stripe Connect Acct
                            </button>
                        </form>
                        <form action={`/api/gallery/applications/${app.id}/reject`} method="POST">
                            <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text-primary)', backgroundColor: 'var(--theme-card-bg)', borderRadius: '0.5rem', border: '1px solid var(--theme-card-border)', cursor: 'pointer' }}>
                                {iconX} Reject
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
