'use client';

import { useState } from 'react';

const C = {
  bg: '#FAFAF8', white: '#FFFFFF', text: '#1A1A1A', textSec: '#6B7280',
  muted: '#9CA3AF', accent: '#B45309', border: '#E5E5E0',
  green: '#16A34A', greenBg: 'rgba(22,163,74,0.06)',
};

type TaskStatus = 'automated' | 'needs_you' | 'in_progress';
type Task = { id: number; title: string; detail: string; status: TaskStatus; };

const initialTasks: Task[] = [
  { id: 1, title: 'Responded to Sarah M.\'s Google review', detail: 'Posted 2 minutes ago', status: 'automated' },
  { id: 2, title: 'Draft Tuesday lunch special', detail: 'Tap to approve or edit the draft', status: 'needs_you' },
  { id: 3, title: 'Competitor posted new pricing', detail: 'See analysis and suggested response', status: 'needs_you' },
  { id: 4, title: 'Generating weekly P&L summary', detail: 'Pulling data from QuickBooks...', status: 'in_progress' },
  { id: 5, title: 'Posted storefront photo to Instagram & Google', detail: 'Got 12 likes in the first hour', status: 'automated' },
];

export default function TasksMode({ onSwitchToChat }: { onSwitchToChat?: (text: string) => void }) {
  const [tasks, setTasks] = useState(initialTasks);

  const statusColor = (s: TaskStatus) => s === 'automated' ? C.green : s === 'needs_you' ? C.accent : C.muted;
  const statusLabel = (s: TaskStatus) => s === 'automated' ? 'Done' : s === 'needs_you' ? 'Needs You' : 'Working...';

  return (
    <div style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <p style={{ fontSize: 13, color: C.muted, margin: '0 0 16px' }}>
          {tasks.filter(t => t.status === 'needs_you').length} items need you &middot; {tasks.filter(t => t.status === 'in_progress').length} in progress
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tasks.map(task => (
            <div key={task.id} style={{
              backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
              padding: '14px 16px', borderLeft: `3px solid ${statusColor(task.status)}`,
              opacity: task.status === 'automated' ? 0.7 : 1,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text, textDecoration: task.status === 'automated' ? 'none' : 'none' }}>{task.title}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: statusColor(task.status), letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>{statusLabel(task.status)}</span>
              </div>
              <p style={{ fontSize: 13, color: C.textSec, margin: '0 0 10px' }}>{task.detail}</p>
              {task.status === 'needs_you' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'automated' as TaskStatus, detail: 'Approved and posted' } : t))} style={{ padding: '7px 14px', borderRadius: 6, border: 'none', backgroundColor: C.accent, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Approve</button>
                  <button onClick={() => onSwitchToChat?.(task.title)} style={{ padding: '7px 14px', borderRadius: 6, border: `1px solid ${C.border}`, backgroundColor: 'transparent', color: C.accent, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Chat →</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
