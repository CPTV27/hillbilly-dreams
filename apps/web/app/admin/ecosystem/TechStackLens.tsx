'use client';

const LAYERS = [
  {
    name: 'Frontend',
    color: '#3b82f6',
    services: [
      { name: 'Vercel', role: '15 domains, Next.js App Router', cost: 'Pro plan', status: 'live' },
      { name: 'Cloudflare', role: 'DNS, CDN, DDoS protection', cost: 'Free', status: 'live' },
    ],
  },
  {
    name: 'Database',
    color: '#22c55e',
    services: [
      { name: 'Neon PostgreSQL', role: '57 models, public + private schemas', cost: 'Starter', status: 'live' },
      { name: 'Prisma ORM', role: 'Type-safe queries, migrations', cost: 'Free', status: 'live' },
    ],
  },
  {
    name: 'Storage',
    color: '#c8943e',
    services: [
      { name: 'Google Cloud Storage', role: 'All media assets, illustrations, photos', cost: 'Per GB', status: 'live' },
      { name: 'Hot Folder Sync', role: 'Drop files → GCS → indexed in 2 min', cost: 'Free', status: 'live' },
    ],
  },
  {
    name: 'AI / Generation',
    color: '#8b5cf6',
    services: [
      { name: 'Vertex AI Imagen 3', role: 'Image generation + enhancement', cost: 'Per image', status: 'live' },
      { name: 'Vertex AI Veo 3.1', role: 'Video generation', cost: 'Per second', status: 'ready' },
      { name: 'Gemini 2.5 Flash / 3.1 Pro', role: 'Text, reasoning, content generation', cost: 'Per token', status: 'live' },
      { name: 'Anthropic Claude', role: 'Reasoning, editorial (failover)', cost: 'Per token', status: 'live' },
      { name: 'Perplexity', role: 'Live web search (failover)', cost: 'Per query', status: 'live' },
      { name: 'Cloud TTS Journey', role: 'Voice generation', cost: 'Per char', status: 'ready' },
    ],
  },
  {
    name: 'Broadcasting',
    color: '#ec4899',
    services: [
      { name: 'OpenBroadcaster', role: 'Radio automation, 18 shows', cost: 'Self-hosted', status: 'live' },
      { name: 'Icecast', role: 'Audio streaming server', cost: 'Self-hosted', status: 'live' },
      { name: 'Plex', role: 'In-room TV, media library', cost: 'Free', status: 'live' },
      { name: 'OBS Studio', role: 'Video compositing, live broadcast', cost: 'Free', status: 'live' },
    ],
  },
  {
    name: 'Social & Publishing',
    color: '#f97316',
    services: [
      { name: 'Postiz', role: 'Social media scheduling (9 containers)', cost: 'Self-hosted', status: 'live' },
      { name: 'Stripe', role: 'Payments, Connect marketplace', cost: '2.9% + 30¢', status: 'live' },
      { name: 'Canva', role: 'Design templates, poster generation', cost: 'Free/Pro', status: 'live' },
    ],
  },
  {
    name: 'Operations',
    color: '#eab308',
    services: [
      { name: 'Asana', role: 'Task management (4 project boards)', cost: 'Free', status: 'live' },
      { name: 'Bitwarden', role: 'Secrets management', cost: 'Free', status: 'live' },
      { name: 'GitHub', role: 'Code repository, CI/CD', cost: 'Free', status: 'live' },
      { name: 'Sentry', role: 'Error monitoring', cost: 'Free', status: 'setup' },
    ],
  },
];

export function TechStackLens() {
  return (
    <div>
      {LAYERS.map(layer => (
        <div key={layer.name} className="eco-card">
          <div className="eco-card-label" style={{ color: layer.color }}>{layer.name}</div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {layer.services.map(svc => (
              <div key={svc.name} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.5rem 0.75rem', background: '#0f0f0d', borderRadius: 6,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: svc.status === 'live' ? '#22c55e' : svc.status === 'ready' ? '#eab308' : '#6a6560',
                    boxShadow: svc.status === 'live' ? '0 0 6px rgba(34,197,94,0.4)' : 'none',
                  }} />
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e8e0d4' }}>{svc.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#5a5550', marginLeft: '0.5rem' }}>{svc.role}</span>
                  </div>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#6a6560', flexShrink: 0 }}>{svc.cost}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
