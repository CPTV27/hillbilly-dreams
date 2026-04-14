'use client';

import type { CSSProperties } from 'react';
import type { OnboardingTask } from './tasks';

export interface ProgressSidebarProps {
  tasks: OnboardingTask[];
  completedTaskIds: string[];
  currentTaskId: string | null;
  onSelectTask: (taskId: string) => void;
}

const wrap: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
  background: 'var(--card-bg-color, rgba(30, 27, 24, 0.92))',
  border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.22))',
  borderRadius: 12,
  padding: 16,
  boxSizing: 'border-box',
};

const headerBlock: CSSProperties = {
  marginBottom: 16,
  flexShrink: 0,
};

const headerTitle: CSSProperties = {
  margin: 0,
  fontSize: '0.8125rem',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--accent, #f97316)',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

const headerMeta: CSSProperties = {
  margin: '8px 0 0',
  fontSize: '0.8125rem',
  color: 'var(--text-muted, rgba(240, 235, 224, 0.55))',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

const listWrap: CSSProperties = {
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const footerNote: CSSProperties = {
  marginTop: 16,
  paddingTop: 12,
  borderTop: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.15))',
  fontSize: '0.75rem',
  lineHeight: 1.5,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.45))',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

function cardBase(completed: boolean, current: boolean, upcoming: boolean): CSSProperties {
  return {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '12px 12px',
    borderRadius: 10,
    border: current
      ? '2px solid var(--accent, #f97316)'
      : '1px solid var(--card-border-color, rgba(200, 148, 62, 0.18))',
    background: current
      ? 'var(--accent-muted, rgba(249, 115, 22, 0.12))'
      : completed
        ? 'var(--surface-2, rgba(255, 255, 255, 0.03))'
        : 'var(--surface-1, rgba(255, 255, 255, 0.02))',
    boxShadow: current ? '0 4px 16px rgba(0, 0, 0, 0.28)' : 'none',
    cursor: 'pointer',
    textAlign: 'left',
    font: 'inherit',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
    opacity: upcoming ? 0.72 : 1,
    outline: 'none',
  };
}

const badge: CSSProperties = {
  flexShrink: 0,
  width: 28,
  height: 28,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: 700,
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

const badgeCompleted: CSSProperties = {
  ...badge,
  background: 'var(--success-muted, rgba(74, 124, 89, 0.25))',
  color: 'var(--success, #6abf7a)',
};

const badgeCurrent: CSSProperties = {
  ...badge,
  background: 'var(--accent-muted, rgba(249, 115, 22, 0.2))',
  color: 'var(--accent, #f97316)',
};

const badgeUpcoming: CSSProperties = {
  ...badge,
  background: 'rgba(240, 235, 224, 0.06)',
  color: 'var(--text-muted, rgba(240, 235, 224, 0.5))',
};

const textCol: CSSProperties = {
  minWidth: 0,
  flex: 1,
};

const titleStyle = (completed: boolean, upcoming: boolean): CSSProperties => ({
  margin: 0,
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: 1.35,
  color: completed
    ? 'var(--text-muted, rgba(240, 235, 224, 0.45))'
    : upcoming
      ? 'var(--text-muted, rgba(240, 235, 224, 0.65))'
      : 'var(--text, rgba(240, 235, 224, 0.92))',
  textDecoration: completed ? 'line-through' : 'none',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
});

const descStyle = (completed: boolean, upcoming: boolean): CSSProperties => ({
  margin: '4px 0 0',
  fontSize: '0.75rem',
  lineHeight: 1.45,
  color: completed
    ? 'var(--text-muted, rgba(240, 235, 224, 0.35))'
    : upcoming
      ? 'var(--text-muted, rgba(240, 235, 224, 0.42))'
      : 'var(--text-muted, rgba(240, 235, 224, 0.55))',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
});

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProgressSidebar({
  tasks,
  completedTaskIds,
  currentTaskId,
  onSelectTask,
}: ProgressSidebarProps) {
  const done = new Set(completedTaskIds);
  const total = tasks.length;
  const nComplete = tasks.filter((t) => done.has(t.id)).length;

  return (
    <aside style={wrap}>
      <div style={headerBlock}>
        <h2 style={headerTitle}>Your Setup</h2>
        <p style={headerMeta}>
          {nComplete} of {total} complete
        </p>
      </div>

      <ul role="list" className="amy-progress-list" style={listWrap}>
        {tasks.map((task) => {
          const isDone = done.has(task.id);
          const isCurrent = currentTaskId === task.id;
          const isUpcoming = !isDone && !isCurrent;

          let stateLabel: string;
          if (isDone) stateLabel = 'completed';
          else if (isCurrent) stateLabel = 'current step';
          else stateLabel = 'upcoming';

          const aria = `Task ${task.number}: ${task.title} — ${stateLabel}`;

          return (
            <li key={task.id} role="listitem">
              <button
                type="button"
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={aria}
                onClick={() => onSelectTask(task.id)}
                style={cardBase(isDone, isCurrent, isUpcoming)}
              >
                <span
                  style={
                    isDone ? badgeCompleted : isCurrent ? badgeCurrent : badgeUpcoming
                  }
                >
                  {isDone ? (
                    <span style={{ display: 'flex', color: 'var(--success, #6abf7a)' }}>
                      <CheckIcon />
                    </span>
                  ) : (
                    task.number
                  )}
                </span>
                <span style={textCol}>
                  <p style={titleStyle(isDone, isUpcoming)}>{task.title}</p>
                  <p style={descStyle(isDone, isUpcoming)}>{task.oneLineDescription}</p>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p style={footerNote}>
        You can come back to this anytime. Your progress saves automatically.
      </p>

      <style>{`
        @media (max-width: 899px) {
          .amy-progress-list {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            padding-bottom: 8px !important;
            gap: 8px !important;
            -webkit-overflow-scrolling: touch;
          }
          .amy-progress-list > li {
            flex: 0 0 min(280px, 85vw) !important;
          }
        }
      `}</style>
    </aside>
  );
}

export default ProgressSidebar;
