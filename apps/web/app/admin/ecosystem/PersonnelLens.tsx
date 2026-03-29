'use client';

const ROLES = [
  { function: 'Social Media Manager', traditional: '$3,500/mo', setup: 'Content Studio + Postiz', ai: 90, human: 'Approves posts', badge: 'AI Primary' },
  { function: 'Review Manager', traditional: '$2,000/mo', setup: 'Delta Dawn + AI Drafts', ai: 95, human: 'Sends responses', badge: 'AI Primary' },
  { function: 'Radio DJs (18 shows)', traditional: '$15,000/mo (7 people)', setup: 'OpenBroadcaster + AI Characters', ai: 100, human: 'Programs schedule', badge: 'Fully Automated' },
  { function: 'Photographer', traditional: '$4,000/mo', setup: 'Chase + Imagen Enhancement', ai: 40, human: 'Shoots, selects, directs', badge: 'Human Primary' },
  { function: 'Bookkeeper', traditional: '$2,000/mo', setup: 'Tracy + QuickBooks', ai: 30, human: 'Oversight, compliance', badge: 'Human Primary' },
  { function: 'Front Desk', traditional: '$2,500/mo', setup: 'Amy + Delta Dawn', ai: 50, human: 'Guest hospitality', badge: 'Hybrid' },
  { function: 'Booking Agent', traditional: '$3,000/mo', setup: 'JP + Content Studio', ai: 60, human: 'Books acts, negotiates', badge: 'Hybrid' },
  { function: 'Web Developer', traditional: '$8,000/mo', setup: 'Claude Code Agents', ai: 95, human: 'Directs, reviews', badge: 'AI Primary' },
  { function: 'Magazine Editor', traditional: '$4,000/mo', setup: 'Scout API + Gemini', ai: 80, human: 'Curates, edits voice', badge: 'AI Primary' },
  { function: 'Marketing Director', traditional: '$6,000/mo', setup: 'Multi-Model AI Routing', ai: 70, human: 'Strategy decisions', badge: 'Hybrid' },
];

const TOTAL_TRADITIONAL = 50000;
const TOTAL_ACTUAL_HUMANS = 3;
const TOTAL_AI_COST = 500;

export function PersonnelLens() {
  return (
    <div>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="eco-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>${(TOTAL_TRADITIONAL / 1000).toFixed(0)}K<span style={{ fontSize: '0.8rem', color: '#6a6560' }}>/mo</span></div>
          <div style={{ fontSize: '0.7rem', color: '#6a6560', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Traditional Staffing</div>
        </div>
        <div className="eco-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22c55e' }}>{TOTAL_ACTUAL_HUMANS} <span style={{ fontSize: '0.8rem', color: '#6a6560' }}>humans</span></div>
          <div style={{ fontSize: '0.7rem', color: '#6a6560', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Team</div>
        </div>
        <div className="eco-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c8943e' }}>${TOTAL_AI_COST}<span style={{ fontSize: '0.8rem', color: '#6a6560' }}>/mo</span></div>
          <div style={{ fontSize: '0.7rem', color: '#6a6560', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI API Costs</div>
        </div>
      </div>

      {/* Role Table */}
      <div className="eco-card" style={{ overflowX: 'auto' }}>
        <div className="eco-card-label">Role Comparison</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2a2520' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: '#6a6560', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Function</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: '#6a6560', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Traditional</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: '#6a6560', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Setup</th>
              <th style={{ textAlign: 'center', padding: '0.5rem', color: '#6a6560', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI %</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: '#6a6560', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Human Does</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map(role => (
              <tr key={role.function} style={{ borderBottom: '1px solid #1a1816' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: '#e8e0d4' }}>{role.function}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#ef4444', fontSize: '0.75rem' }}>{role.traditional}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#c8943e', fontSize: '0.75rem' }}>{role.setup}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <div style={{ width: 60, height: 6, background: '#2a2520', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${role.ai}%`, height: '100%', background: role.ai >= 80 ? '#22c55e' : role.ai >= 50 ? '#c8943e' : '#3b82f6', borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#8a8074' }}>{role.ai}%</span>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#6a6560', fontSize: '0.75rem' }}>{role.human}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
