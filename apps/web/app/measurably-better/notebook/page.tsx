import { prisma } from '@bigmuddy/database';
import NotebookClient from './NotebookClient';

// Force dynamic because we want to load the latest Swarm Drops instantly.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SovereignNotebookPage() {
  // 1. Fetch all knowledge base drops
  const drops = await prisma.notebookDrop.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100 // Hard limit for V1 to protect the 1M token RAG limit
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--surface)',
      fontFamily: 'var(--font-body)'
    }}>
      {/* 2. Top Navigation Bar */}
      <header style={{
        height: '64px',
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--accent)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '800',
            fontSize: '18px'
          }}>
            N
          </div>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: 'var(--text)' }}>
            Sovereign Notebook
          </h1>
        </div>
        
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>
          {drops.length} Fragments Secured
        </div>
      </header>

      {/* 3. Two-Pane Dashboard Client */}
      <NotebookClient initialDrops={drops as any} />
    </div>
  );
}
