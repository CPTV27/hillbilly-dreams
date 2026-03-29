'use client';

const NODES = [
  { id: 'shows', label: 'Live Shows', metric: '12/mo target', desc: 'JP books acts, fills the Blues Room', color: '#c8943e' },
  { id: 'audience', label: 'Audience', metric: 'In the room', desc: 'People show up, experience the music', color: '#22c55e' },
  { id: 'bar', label: 'Bar Revenue', metric: '$300-500/night', desc: 'Amy runs bar ops, 80%+ margins', color: '#3b82f6' },
  { id: 'content', label: 'Content', metric: 'Photos, video, articles', desc: 'Every show generates content for all channels', color: '#8b5cf6' },
  { id: 'media', label: 'Media Distribution', metric: 'Magazine + Radio + Social', desc: 'Content reaches people who weren\'t in the room', color: '#ec4899' },
  { id: 'discovery', label: 'Discovery', metric: 'Tourists find us', desc: 'DSD listings, SEO, word of mouth', color: '#f97316' },
  { id: 'directory', label: 'Directory Revenue', metric: '$20-99/mo per business', desc: 'Businesses join the ecosystem', color: '#c8943e' },
  { id: 'invest', label: 'Reinvestment', metric: 'Better shows, more content', desc: 'Revenue funds the next cycle', color: '#22c55e' },
];

export function FlywheelLens() {
  return (
    <div>
      <div className="eco-card" style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="eco-card-label">The Big Muddy Flywheel</div>
        <p style={{ fontSize: '0.85rem', color: '#8a8074', maxWidth: 500, margin: '0 auto 2rem' }}>
          Every piece feeds every other piece. Shows create audience. Audience creates revenue. Revenue creates content. Content creates discovery. Discovery creates more audience.
        </p>

        {/* Flywheel Nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {NODES.map((node, i) => (
            <div key={node.id}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.5rem',
                background: '#0f0f0d', border: `1px solid ${node.color}40`, borderRadius: 10,
                minWidth: 350, textAlign: 'left',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: node.color, flexShrink: 0, boxShadow: `0 0 8px ${node.color}40` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e8e0d4' }}>{node.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6a6560' }}>{node.desc}</div>
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: node.color, textAlign: 'right', flexShrink: 0 }}>
                  {node.metric}
                </div>
              </div>
              {i < NODES.length - 1 && (
                <div style={{ textAlign: 'center', padding: '0.25rem 0', color: '#2a2520', fontSize: '1.2rem' }}>↓</div>
              )}
            </div>
          ))}
          <div style={{ textAlign: 'center', padding: '0.5rem 0', color: '#c8943e', fontSize: '1rem', fontWeight: 700 }}>
            ↻ Cycle repeats
          </div>
        </div>
      </div>

      {/* 2:1 Multiplier */}
      <div className="eco-card">
        <div className="eco-card-label">The Multiplier</div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c8943e' }}>2:1</div>
            <div style={{ fontSize: '0.8rem', color: '#8a8074' }}>Every $1K show generates ~$500 in downstream value (rooms, directory, magazine, content)</div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22c55e' }}>80%+</div>
            <div style={{ fontSize: '0.8rem', color: '#8a8074' }}>Bar margins on show nights. The audience is already there.</div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>4</div>
            <div style={{ fontSize: '0.8rem', color: '#8a8074' }}>Content channels from every show: social, magazine, radio, video</div>
          </div>
        </div>
      </div>
    </div>
  );
}
