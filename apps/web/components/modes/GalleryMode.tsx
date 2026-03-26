'use client';

const C = {
  bg: '#FAFAF8', white: '#FFFFFF', text: '#1A1A1A', textSec: '#6B7280',
  muted: '#9CA3AF', accent: '#B45309', border: '#E5E5E0', green: '#16A34A',
};

type MediaItem = { id: number; title: string; platforms: string[]; date: string; status: 'posted' | 'scheduled' | 'draft' | 'processing' };

const items: MediaItem[] = [
  { id: 1, title: 'Brisket Plate', platforms: ['IG', 'FB', 'Google'], date: 'Today', status: 'posted' },
  { id: 2, title: 'Storefront', platforms: ['Google'], date: 'Today', status: 'posted' },
  { id: 3, title: 'Saturday Band', platforms: ['IG', 'FB'], date: 'Yesterday', status: 'posted' },
  { id: 4, title: 'Lunch Special Board', platforms: [], date: 'Draft', status: 'draft' },
  { id: 5, title: 'Customer Review', platforms: ['Website'], date: 'Monday', status: 'posted' },
  { id: 6, title: 'New Menu', platforms: [], date: 'Processing...', status: 'processing' },
];

const statusBadge = (s: MediaItem['status']) => {
  if (s === 'posted') return { color: C.green, label: '✓ Posted' };
  if (s === 'scheduled') return { color: C.accent, label: '◎ Scheduled' };
  if (s === 'draft') return { color: C.muted, label: '○ Draft' };
  return { color: C.muted, label: '◌ Processing' };
};

export default function GalleryMode() {
  return (
    <div style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, maxWidth: 600, margin: '0 auto' }}>
        {items.map(item => {
          const badge = statusBadge(item.status);
          return (
            <div key={item.id} style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#E8E5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                📷
              </div>
              <div style={{ padding: '10px 10px 12px' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: '0 0 4px' }}>{item.title}</p>
                <p style={{ fontSize: 11, color: badge.color, margin: '0 0 4px', fontWeight: 500 }}>{badge.label}</p>
                {item.platforms.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const }}>
                    {item.platforms.map(p => (
                      <span key={p} style={{ fontSize: 10, backgroundColor: '#F3F4F6', color: C.textSec, padding: '2px 6px', borderRadius: 4, fontWeight: 500 }}>{p}</span>
                    ))}
                  </div>
                )}
                <p style={{ fontSize: 10, color: C.muted, margin: '6px 0 0' }}>{item.date}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'fixed', bottom: 70, right: 20 }}>
        <button style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: C.accent, border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📷</button>
      </div>
    </div>
  );
}
