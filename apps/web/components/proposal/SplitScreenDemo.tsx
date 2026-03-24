'use client';

import React, { useState, useEffect } from 'react';

const terminalLines = [
  '> Initializing Gemini 2.5 Pro Vision pipeline...',
  '> Ingesting iPhone LiDAR point cloud (2.4M points)...',
  '> Processing walk-through video (1080p, 4:32)...',
  '',
  '{"frame": 1, "material": "exposed brick", "confidence": 0.98, "est_area_sqft": 450}',
  '{"frame": 14, "material": "drywall (painted)", "confidence": 0.95, "est_area_sqft": 1200}',
  '{"frame": 27, "material": "concrete slab", "confidence": 0.97, "est_area_sqft": 800}',
  '{"frame": 41, "material": "drop ceiling (2x4 grid)", "confidence": 0.92, "est_area_sqft": 1200}',
  '{"frame": 58, "hazard": "water_damage", "severity": "moderate", "location": "NE corner"}',
  '{"frame": 72, "material": "steel beam (exposed)", "confidence": 0.96, "count": 4}',
  '',
  '> Spatial analysis complete. Generating itemized quote...',
  '',
  '┌─────────────────────────────────────────────┐',
  '│  AUTO-GENERATED QUOTE · S2PX Engine v2.1    │',
  '├─────────────────────────────────────────────┤',
  '│  Scan (LOD 200, 3,650 SF)       $4,380.00   │',
  '│  BIM Model (Revit, LOD 300)     $5,840.00   │',
  '│  Point Cloud Registration       $1,200.00   │',
  '│  Travel (48mi round-trip)         $192.00   │',
  '├─────────────────────────────────────────────┤',
  '│  TOTAL                         $11,612.00   │',
  '│  Estimated Margin: 68.2%                    │',
  '└─────────────────────────────────────────────┘',
  '',
  '> Quote ready. Elapsed: 47 seconds.',
];

export default function SplitScreenDemo() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const delay = terminalLines[visibleLines] === '' ? 400 : terminalLines[visibleLines].startsWith('{') ? 300 : terminalLines[visibleLines].startsWith('│') || terminalLines[visibleLines].startsWith('├') || terminalLines[visibleLines].startsWith('┌') || terminalLines[visibleLines].startsWith('└') ? 150 : 600;
      const timer = setTimeout(() => setVisibleLines(v => v + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <div style={styles.container}>
      <div style={styles.badge}>
        <span style={styles.badgeIcon}>&#9888;&#65039;</span> July Milestone Preview &middot; In Development
      </div>

      <h3 style={styles.title}>The Workflow Inverts</h3>
      <p style={styles.subtitle}>
        Site capture generates the quote. Your team doesn&apos;t build estimates &mdash; they review them.
      </p>

      <div style={styles.splitScreen}>
        {/* Left: iPhone capture */}
        <div style={styles.leftPanel}>
          <div style={styles.videoPlaceholder}>
            <div style={styles.phoneFrame}>
              <div style={styles.phoneScanLines} />
              <div style={styles.phoneLabel}>
                <div style={styles.phoneDot} />
                iPhone 15 Pro &middot; LiDAR Active
              </div>
              <div style={styles.scanOverlay}>
                <div style={styles.scanGrid} />
                <div style={styles.scanText}>CAPTURING SPATIAL DATA</div>
                <div style={styles.scanStats}>
                  <span>2.4M points</span>
                  <span>3,650 SF</span>
                  <span>LOD 200</span>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.panelLabel}>Raw iPhone Spatial Capture</div>
        </div>

        {/* Right: Gemini terminal */}
        <div style={styles.rightPanel}>
          <div style={styles.terminal}>
            <div style={styles.terminalHeader}>
              <div style={styles.terminalDots}>
                <span style={{ ...styles.dot, background: '#ff5f56' }} />
                <span style={{ ...styles.dot, background: '#ffbd2e' }} />
                <span style={{ ...styles.dot, background: '#27c93f' }} />
              </div>
              <span style={styles.terminalTitle}>Gemini 2.5 Pro Vision &middot; us-east4</span>
            </div>
            <div style={styles.terminalBody}>
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{
                  ...styles.terminalLine,
                  color: line.startsWith('{') ? '#4ade80' : line.startsWith('>') ? '#60a5fa' : line.startsWith('│') || line.startsWith('├') || line.startsWith('┌') || line.startsWith('└') ? '#fbbf24' : '#94a3b8',
                }}>
                  {line || '\u00A0'}
                </div>
              ))}
              {visibleLines < terminalLines.length && (
                <span style={styles.cursor}>&#9608;</span>
              )}
            </div>
          </div>
          <div style={styles.panelLabel}>Gemini 2.5 Pro &middot; Real-Time Analysis</div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1000px',
    margin: '4rem auto',
    padding: '0 1rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '20px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.03em',
    marginBottom: '1.5rem',
    border: '1px solid #fde68a',
  },
  badgeIcon: {
    fontSize: '0.9rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 0.75rem',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#475569',
    lineHeight: 1.6,
    margin: '0 0 2rem',
    maxWidth: '700px',
  },
  splitScreen: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    minHeight: '420px',
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
  },
  videoPlaceholder: {
    flex: 1,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  phoneFrame: {
    width: '160px',
    height: '300px',
    borderRadius: '24px',
    border: '3px solid #334155',
    background: '#020617',
    position: 'relative',
    overflow: 'hidden',
  },
  phoneScanLines: {
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(56, 189, 248, 0.03) 4px, rgba(56, 189, 248, 0.03) 5px)',
  },
  phoneLabel: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    right: '12px',
    fontSize: '0.6rem',
    color: '#38bdf8',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
  phoneDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    boxShadow: '0 0 6px #22c55e',
  },
  scanOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  scanGrid: {
    width: '80px',
    height: '80px',
    border: '2px solid rgba(56, 189, 248, 0.4)',
    borderRadius: '4px',
    background: 'repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(56, 189, 248, 0.15) 19px, rgba(56, 189, 248, 0.15) 20px), repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(56, 189, 248, 0.15) 19px, rgba(56, 189, 248, 0.15) 20px)',
  },
  scanText: {
    fontSize: '0.55rem',
    color: '#38bdf8',
    fontWeight: 700,
    letterSpacing: '0.15em',
  },
  scanStats: {
    display: 'flex',
    gap: '8px',
    fontSize: '0.5rem',
    color: '#64748b',
  },
  panelLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#64748b',
    textAlign: 'center',
    marginTop: '10px',
    letterSpacing: '0.02em',
  },
  terminal: {
    flex: 1,
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #1e293b',
    background: '#0a0f1a',
    display: 'flex',
    flexDirection: 'column',
  },
  terminalHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    background: '#111827',
    borderBottom: '1px solid #1e293b',
  },
  terminalDots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    display: 'inline-block',
  },
  terminalTitle: {
    fontSize: '0.7rem',
    color: '#64748b',
    fontWeight: 500,
  },
  terminalBody: {
    flex: 1,
    padding: '14px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
    fontSize: '0.7rem',
    lineHeight: 1.6,
    overflowY: 'auto',
  },
  terminalLine: {
    whiteSpace: 'pre',
  },
  cursor: {
    color: '#60a5fa',
    animation: 'blink 1s step-end infinite',
    fontSize: '0.7rem',
  },
};
