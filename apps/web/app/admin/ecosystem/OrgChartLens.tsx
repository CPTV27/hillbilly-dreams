'use client';

interface OrgNode {
  name: string;
  role?: string;
  children?: OrgNode[];
  color?: string;
}

const ORG: OrgNode = {
  name: 'Hillbilly Dreams Inc',
  role: 'Holding Company',
  color: '#c8943e',
  children: [
    {
      name: 'Big Muddy Touring',
      role: 'Hospitality Division',
      color: '#3b82f6',
      children: [
        { name: 'The Big Muddy Inn', role: '6 Suites — Natchez' },
        { name: 'The Blues Room', role: '50-Seat Listening Room' },
        { name: 'Corridor Tours', role: 'Memphis → New Orleans' },
      ],
    },
    {
      name: 'Big Muddy Media',
      role: 'Content Division',
      color: '#8b5cf6',
      children: [
        { name: 'Big Muddy Magazine', role: 'Publishing' },
        { name: 'Big Muddy Radio', role: '18 Shows — Broadcasting' },
        { name: 'Big Muddy Records', role: 'Indie Label' },
      ],
    },
    {
      name: 'Big Muddy Entertainment',
      role: 'Talent Division',
      color: '#ec4899',
      children: [
        { name: 'Rise Up', role: 'Artist Development' },
        { name: 'Talent Search', role: 'Scouting Pipeline' },
      ],
    },
    {
      name: 'Deep South Directory',
      role: 'SaaS Division',
      color: '#22c55e',
      children: [
        { name: 'Free Listing', role: 'Directory + Alerts' },
        { name: 'The Assistant — $20', role: 'AI + Local Knowledge' },
        { name: 'The Works — $49', role: 'Social Media' },
        { name: 'The Engine — $99', role: 'Full Stack' },
      ],
    },
    {
      name: 'Outsider Economics',
      role: 'Publishing / Education',
      color: '#f97316',
      children: [
        { name: 'Field Manual', role: '15+ Chapters' },
        { name: 'Toolkit', role: '7 Practical Tools' },
        { name: 'Deep South Resources', role: 'Grants, Orgs, Legal' },
      ],
    },
    {
      name: 'Venture Gallery',
      role: 'Marketplace',
      color: '#eab308',
      children: [
        { name: 'Chase Pierson Photography', role: 'Print Sales' },
        { name: 'Artist Storefronts', role: 'Stripe Connect' },
      ],
    },
  ],
};

function OrgNodeComponent({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const color = node.color || '#2a2520';
  return (
    <div style={{ marginLeft: depth * 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem',
        borderLeft: depth > 0 ? `2px solid ${color}40` : 'none',
        marginBottom: '0.25rem',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <div>
          <span style={{ fontSize: depth === 0 ? '1rem' : '0.85rem', fontWeight: 700, color: depth === 0 ? color : '#e8e0d4' }}>{node.name}</span>
          {node.role && <span style={{ fontSize: '0.7rem', color: '#6a6560', marginLeft: '0.5rem' }}>{node.role}</span>}
        </div>
      </div>
      {node.children?.map(child => (
        <OrgNodeComponent key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export function OrgChartLens() {
  return (
    <div className="eco-card" style={{ padding: '2rem' }}>
      <div className="eco-card-label">Corporate Structure — Viacom Model</div>
      <p style={{ fontSize: '0.8rem', color: '#6a6560', marginBottom: '1.5rem' }}>
        6 divisions, one holding company. Each division operates independently but shares infrastructure.
      </p>
      <OrgNodeComponent node={ORG} />
    </div>
  );
}
