'use client';

const STREAMS = [
  { category: 'Recurring', color: '#22c55e', items: [
    { name: 'DSD The Listing', price: 'Free', mrr: '$0', count: 'Building audience' },
    { name: 'DSD paid tier (mid)', price: '$25/mo', mrr: 'TBD', count: 'Walk-in ladder' },
    { name: 'DSD paid tier (growth)', price: '$50/mo', mrr: 'TBD', count: 'Walk-in ladder' },
    { name: 'DSD The Engine', price: '$99/mo', mrr: 'TBD', count: 'Active' },
    { name: 'DSD top tier', price: '$250/mo', mrr: 'TBD', count: 'Enterprise / full stack' },
    { name: 'Magazine Subscriptions', price: 'TBD', mrr: 'TBD', count: 'Future' },
  ]},
  { category: 'Transactional', color: '#3b82f6', items: [
    { name: 'Room Bookings', price: '$125-175/night', mrr: 'Variable', count: '6 suites' },
    { name: 'Bar Revenue', price: '$300-500/show night', mrr: 'Variable', count: '12 nights/mo target' },
    { name: 'Show Tickets', price: '$10-25', mrr: 'Variable', count: 'Per event' },
    { name: 'Print Sales', price: '$150-450', mrr: 'Variable', count: '30 prints in store' },
  ]},
  { category: 'Licensing', color: '#8b5cf6', items: [
    { name: 'Stock Photography', price: 'Per license', mrr: 'TBD', count: 'Monday launch' },
    { name: 'Content Syndication', price: 'Per article', mrr: 'TBD', count: 'Future' },
    { name: 'Platform Licensing (LYRAI)', price: 'TBD', mrr: 'TBD', count: 'Future' },
  ]},
  { category: 'Grants & Sponsorship', color: '#f97316', items: [
    { name: 'Tourism Board', price: 'Grant', mrr: 'TBD', count: 'Natchez CVB' },
    { name: 'Arts Council', price: 'Grant', mrr: 'TBD', count: 'MS Arts Commission' },
    { name: 'USDA Rural Development', price: 'Grant', mrr: 'TBD', count: 'Applied' },
  ]},
];

export function RevenueLens() {
  return (
    <div>
      {STREAMS.map(stream => (
        <div key={stream.category} className="eco-card">
          <div className="eco-card-label" style={{ color: stream.color }}>{stream.category} Revenue</div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {stream.items.map(item => (
              <div key={item.name} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.5rem 0.75rem', background: '#0f0f0d', borderRadius: 6,
                borderLeft: `3px solid ${stream.color}40`,
              }}>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e8e0d4' }}>{item.name}</span>
                  <span style={{ fontSize: '0.7rem', color: '#5a5550', marginLeft: '0.5rem' }}>{item.count}</span>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: stream.color }}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
