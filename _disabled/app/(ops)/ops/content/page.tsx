import { prisma } from '@bigmuddy/database';
import ContentLibraryClient from '../components/ContentLibraryClient';

export const revalidate = 0;

export default async function ContentLibrary() {
    const packs = await prisma.contentPack.findMany({
        orderBy: { title: 'asc' },
    });

    return (
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
                backgroundColor: 'var(--theme-card-bg)',
                padding: '1.5rem 2.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--theme-card-border)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                background: 'linear-gradient(to bottom right, var(--theme-progress-bg), var(--theme-card-bg))'
            }}>
                <div style={{
                    width: '4rem',
                    height: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--theme-accent-bg)',
                    borderRadius: '50%',
                    fontSize: '1.875rem',
                    flexShrink: 0
                }}>
                    📘
                </div>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--theme-text-primary)', letterSpacing: '-0.025em', margin: 0 }}>Content Library</h1>
                    <p style={{ color: 'var(--theme-text-secondary)', marginTop: '0.5rem', fontSize: '1.125rem', margin: '0.5rem 0 0 0' }}>
                        Pre-written copy for our profiles, listings, and guest emails. Copy and paste what you need.
                    </p>
                </div>
            </div>

            <ContentLibraryClient initialPacks={packs} />
        </div>
    );
}
