'use client';

const FUNNEL = [
  {
    stage: 'Discover',
    color: '#f97316',
    width: '100%',
    channels: [
      { name: 'Deep South Directory', role: 'SEO, tourist search', brand: 'DSD' },
      { name: 'Google / Social', role: 'Organic reach, ads', brand: 'All' },
      { name: 'Radio', role: 'Broadcast + streaming', brand: 'Radio' },
      { name: 'Word of Mouth', role: 'Guest referrals', brand: 'Inn' },
    ],
  },
  {
    stage: 'Engage',
    color: '#c8943e',
    width: '85%',
    channels: [
      { name: 'Magazine Articles', role: 'Stories keep people reading', brand: 'Magazine' },
      { name: 'Radio Shows', role: 'Daily listening habit', brand: 'Radio' },
      { name: 'Social Media', role: 'Visual, behind-the-scenes', brand: 'All' },
      { name: 'Newsletter', role: 'Weekly dispatch', brand: 'OE' },
    ],
  },
  {
    stage: 'Convert',
    color: '#22c55e',
    width: '60%',
    channels: [
      { name: 'Room Bookings', role: 'Cloudbeds → Inn revenue', brand: 'Inn' },
      { name: 'Show Tickets', role: 'Blues Room admission', brand: 'Entertainment' },
      { name: 'Bar Sales', role: '$300-500/show night', brand: 'Inn' },
      { name: 'DSD Subscriptions', role: '$25-250/mo per business', brand: 'DSD' },
      { name: 'Print Sales', role: 'Photography storefront', brand: 'Gallery' },
    ],
  },
  {
    stage: 'Retain',
    color: '#3b82f6',
    width: '45%',
    channels: [
      { name: 'Event Calendar', role: 'Reason to come back', brand: 'Entertainment' },
      { name: 'Radio Loyalty', role: 'Daily connection', brand: 'Radio' },
      { name: 'Magazine Features', role: 'Ongoing storytelling', brand: 'Magazine' },
      { name: 'Community', role: 'Rise Up, OE network', brand: 'OE' },
    ],
  },
];

export function AudienceLens() {
  return (
    <div>
      <div className="eco-card" style={{ padding: '2rem' }}>
        <div className="eco-card-label">Audience Growth Funnel</div>
        <p style={{ fontSize: '0.8rem', color: '#6a6560', marginBottom: '2rem' }}>
          How people find us, what keeps them, what they pay for, and what brings them back.
        </p>

        {FUNNEL.map(stage => (
          <div key={stage.stage} style={{ marginBottom: '1.5rem' }}>
            {/* Funnel Bar */}
            <div style={{
              width: stage.width,
              background: `${stage.color}15`,
              border: `1px solid ${stage.color}40`,
              borderRadius: 8,
              padding: '1rem 1.25rem',
              margin: '0 auto',
              transition: 'width 0.3s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: stage.color }}>{stage.stage}</span>
                <span style={{ fontSize: '0.65rem', color: '#5a5550' }}>{stage.channels.length} channels</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {stage.channels.map(ch => (
                  <div key={ch.name} style={{
                    padding: '0.375rem 0.75rem',
                    background: '#0f0f0d',
                    borderRadius: 6,
                    fontSize: '0.7rem',
                  }}>
                    <span style={{ fontWeight: 600, color: '#e8e0d4' }}>{ch.name}</span>
                    <span style={{ color: '#5a5550', marginLeft: '0.25rem' }}>— {ch.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
