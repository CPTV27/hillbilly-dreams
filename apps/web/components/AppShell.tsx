'use client';

import { useState, useRef } from 'react';

const C = {
  white: '#FFFFFF', text: '#1A1A1A', muted: '#9CA3AF',
  accent: '#B45309', border: '#E5E5E0',
};

type Mode = 'text' | 'tasks' | 'gallery';

const tabs: { mode: Mode; icon: string }[] = [
  { mode: 'text', icon: '💬' },
  { mode: 'tasks', icon: '✓' },
  { mode: 'gallery', icon: '▦' },
];

export default function AppShell({
  businessName,
  children,
  activeMode,
  onModeChange,
}: {
  businessName: string;
  children: React.ReactNode;
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
}) {
  const touchStart = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    const modeOrder: Mode[] = ['text', 'tasks', 'gallery'];
    const idx = modeOrder.indexOf(activeMode);
    if (diff < -60 && idx < 2) onModeChange(modeOrder[idx + 1]);
    if (diff > 60 && idx > 0) onModeChange(modeOrder[idx - 1]);
    touchStart.current = null;
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'var(--font-inter, "Helvetica Neue", sans-serif)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div style={{
        backgroundColor: C.white, borderBottom: `1px solid ${C.border}`,
        padding: '0 16px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: '0.06em' }}>MEASURABLY BETTER</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{businessName}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>

      {/* Bottom tab bar */}
      <div style={{
        backgroundColor: C.white, borderTop: `1px solid ${C.border}`,
        height: 56, display: 'flex', flexShrink: 0,
      }}>
        {tabs.map(tab => (
          <button
            key={tab.mode}
            onClick={() => onModeChange(tab.mode)}
            style={{
              flex: 1, border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
              position: 'relative', fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: 20, opacity: activeMode === tab.mode ? 1 : 0.4 }}>{tab.icon}</span>
            {activeMode === tab.mode && (
              <span style={{ position: 'absolute', bottom: 6, width: 20, height: 2, backgroundColor: C.accent, borderRadius: 1 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
