'use client';

import { useState } from 'react';
import { AudienceLens } from './AudienceLens';
import { PersonnelLens } from './PersonnelLens';
import { OrgChartLens } from './OrgChartLens';
import { RevenueLens } from './RevenueLens';
import { TechStackLens } from './TechStackLens';
import { FlywheelLens } from './FlywheelLens';

const LENSES = [
  { id: 'audience', label: 'Audience', icon: 'A', desc: 'How we grow' },
  { id: 'personnel', label: 'Personnel', icon: 'P', desc: 'Who does what + AI' },
  { id: 'org', label: 'Org Chart', icon: 'O', desc: 'Corporate structure' },
  { id: 'revenue', label: 'Revenue', icon: '$', desc: 'Where money comes from' },
  { id: 'tech', label: 'Tech Stack', icon: 'T', desc: 'Infrastructure' },
  { id: 'flywheel', label: 'Flywheel', icon: 'F', desc: 'How it all connects' },
] as const;

type LensId = typeof LENSES[number]['id'];

export default function EcosystemPage() {
  const [lens, setLens] = useState<LensId>('flywheel');

  return (
    <>
      <div className="eco">
        <div className="eco-header">
          <h1 className="eco-title">Ecosystem</h1>
          <p className="eco-sub">One business. Six ways to see it.</p>
        </div>

        {/* Lens Selector */}
        <div className="eco-lenses">
          {LENSES.map(l => (
            <button key={l.id} className={`eco-lens ${lens === l.id ? 'eco-lens--active' : ''}`} onClick={() => setLens(l.id)}>
              <span className="eco-lens__icon">{l.icon}</span>
              <div>
                <span className="eco-lens__label">{l.label}</span>
                <span className="eco-lens__desc">{l.desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Lens Content */}
        <div className="eco-content">
          {lens === 'audience' && <AudienceLens />}
          {lens === 'personnel' && <PersonnelLens />}
          {lens === 'org' && <OrgChartLens />}
          {lens === 'revenue' && <RevenueLens />}
          {lens === 'tech' && <TechStackLens />}
          {lens === 'flywheel' && <FlywheelLens />}
        </div>
      </div>

      <style>{`
        .eco { max-width: 1100px; margin: 0 auto; }
        .eco-header { margin-bottom: 1.5rem; }
        .eco-title { font-size: 1.5rem; font-weight: 800; color: var(--text, #e8e0d4); margin: 0; }
        .eco-sub { font-size: 0.8rem; color: var(--text-muted, #8a8074); margin: 0.25rem 0 0; }

        .eco-lenses { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem; margin-bottom: 2rem; }
        @media (max-width: 900px) { .eco-lenses { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 500px) { .eco-lenses { grid-template-columns: repeat(2, 1fr); } }

        .eco-lens { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: #1a1816; border: 1px solid #2a2520; border-radius: 10px; cursor: pointer; transition: all 0.15s; text-align: left; }
        .eco-lens:hover { border-color: #c8943e40; }
        .eco-lens--active { border-color: #c8943e; background: rgba(200,148,62,0.06); }
        .eco-lens__icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(200,148,62,0.08); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; color: #6a6560; flex-shrink: 0; }
        .eco-lens--active .eco-lens__icon { background: rgba(200,148,62,0.2); color: #c8943e; }
        .eco-lens__label { display: block; font-size: 0.8rem; font-weight: 700; color: #e8e0d4; }
        .eco-lens__desc { display: block; font-size: 0.6rem; color: #5a5550; }

        .eco-content { min-height: 400px; }

        .eco-card { background: #1a1816; border: 1px solid #2a2520; border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem; }
        .eco-card-label { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #6a6560; margin-bottom: 0.5rem; }
        .eco-card-title { font-size: 1rem; font-weight: 700; color: #e8e0d4; margin: 0 0 0.5rem; }

        .eco-node { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: #1a1816; border: 1px solid #2a2520; border-radius: 8px; font-size: 0.8rem; font-weight: 600; color: #e8e0d4; }
        .eco-node--accent { border-color: #c8943e; color: #c8943e; }
        .eco-connector { display: block; width: 2px; height: 20px; background: #2a2520; margin: 0 auto; }
        .eco-arrow { color: #c8943e; font-size: 1.2rem; }
      `}</style>
    </>
  );
}
