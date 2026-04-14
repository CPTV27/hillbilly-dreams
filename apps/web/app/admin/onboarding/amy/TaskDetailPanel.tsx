'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { OnboardingTask } from './tasks';

export interface TaskDetailPanelProps {
  task: OnboardingTask | null;
  taskState: Record<string, unknown> | null;
  onAction: () => void;
  onComplete: () => void;
  onStateChange: (state: Record<string, unknown>) => void;
  onSkip?: () => void;
  children?: ReactNode;
}

const panel: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 280,
  padding: 20,
  borderRadius: 12,
  background: 'var(--card-bg-color, rgba(30, 27, 24, 0.92))',
  border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.22))',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body, system-ui, sans-serif)',
};

const resumeBanner: CSSProperties = {
  marginBottom: 16,
  padding: '10px 12px',
  borderRadius: 8,
  fontSize: '0.75rem',
  lineHeight: 1.45,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.75))',
  background: 'var(--surface-2, rgba(255, 255, 255, 0.04))',
  border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.12))',
};

const emptyWrap: CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 16px',
  textAlign: 'center',
};
const emptyText: CSSProperties = {
  margin: 0,
  maxWidth: 360,
  fontSize: '0.9375rem',
  lineHeight: 1.55,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.55))',
};
const metaRow: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--accent, #f97316)',
  marginBottom: 8,
};

const titleStyle: CSSProperties = {
  margin: '0 0 12px',
  fontSize: '1.25rem',
  fontWeight: 700,
  lineHeight: 1.3,
  color: 'var(--text, rgba(240, 235, 224, 0.95))',
  fontFamily: 'var(--font-display, var(--font-body, Georgia, serif))',
};
const descStyle: CSSProperties = {
  margin: '0 0 20px',
  fontSize: '0.875rem',
  lineHeight: 1.6,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.72))',
  whiteSpace: 'pre-wrap',
};

const chatHintBox: CSSProperties = {
  padding: '14px 16px',
  borderRadius: 10,
  background: 'var(--surface-2, rgba(255, 255, 255, 0.04))',
  border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.15))',
  fontSize: '0.875rem',
  lineHeight: 1.55,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.78))',
};
const primaryBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '14px 20px',
  border: 'none',
  borderRadius: 10,
  fontSize: '0.9375rem',
  fontWeight: 700,
  cursor: 'pointer',
  background: 'var(--accent, #f97316)',
  color: 'var(--accent-contrast, #1a1816)',
  fontFamily: 'inherit',
  transition: 'filter 0.15s ease, transform 0.1s ease',
};

const primaryLink: CSSProperties = { ...primaryBtn, textDecoration: 'none', boxSizing: 'border-box' };
const skipLink: CSSProperties = {
  marginTop: 12,
  display: 'block',
  textAlign: 'center',
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: 'var(--text-muted, rgba(240, 235, 224, 0.45))',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontFamily: 'inherit',
};

const staticBlock: CSSProperties = {
  marginBottom: 16,
  padding: 16,
  borderRadius: 10,
  background: 'var(--surface-1, rgba(0, 0, 0, 0.2))',
  border: '1px solid var(--card-border-color, rgba(200, 148, 62, 0.12))',
  fontSize: '0.875rem',
  lineHeight: 1.65,
  color: 'var(--text, rgba(240, 235, 224, 0.88))',
  maxHeight: 'min(45vh, 320px)',
  overflowY: 'auto',
};

const formSlot: CSSProperties = { marginTop: 4 };
const staticH3: CSSProperties = {
  margin: '16px 0 8px',
  fontSize: '1rem',
  fontWeight: 700,
  color: 'var(--text, rgba(240, 235, 224, 0.95))',
};
const staticBullet: CSSProperties = {
  margin: '4px 0',
  paddingLeft: 8,
  borderLeft: '2px solid var(--accent-muted, rgba(249, 115, 22, 0.25))',
};
const staticPara: CSSProperties = { margin: '6px 0' };

function hasResumeData(state: Record<string, unknown> | null): boolean {
  if (state == null) return false;
  return Object.keys(state).length > 0;
}

function boldParts(line: string): ReactNode[] {
  return line.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const m = /^\*\*([^*]+)\*\*$/.exec(part);
    return m ? (
      <strong key={i} style={{ fontWeight: 700 }}>
        {m[1]}
      </strong>
    ) : (
      part
    );
  });
}

function StaticContentBody({ text }: { text: string }) {
  return (
    <div>
      {text.trim().split('\n').map((line, i) => {
        const t = line.trim();
        if (t.startsWith('## ')) return <h3 key={i} style={staticH3}>{t.slice(3)}</h3>;
        if (t.startsWith('- ') || t.startsWith('• ')) {
          return (
            <p key={i} style={staticBullet}>
              {boldParts(t.replace(/^[-•]\s*/, ''))}
            </p>
          );
        }
        if (t === '') return <br key={i} />;
        return (
          <p key={i} style={staticPara}>
            {boldParts(line)}
          </p>
        );
      })}
    </div>
  );
}

function ActionZone({
  task,
  onAction,
  onComplete,
  children,
}: {
  task: OnboardingTask;
  onAction: () => void;
  onComplete: () => void;
  children?: ReactNode;
}) {
  const { action } = task;
  const label = action.label;
  const href = action.href;
  const hint = action.hint;

  if (action.type === 'chat') {
    return (
      <div style={chatHintBox}>
        {hint ?? 'Use the chat on the left to work through this step with Delta Dawn.'}
      </div>
    );
  }

  if (action.type === 'form') {
    return <div style={formSlot}>{children}</div>;
  }

  if (action.type === 'static') {
    const body =
      task.staticContent?.trim() ??
      'Content for this step is not available yet. You can skip for now or check back later.';
    return (
      <>
        <div style={staticBlock}>
          <StaticContentBody text={body} />
        </div>
        <button
          type="button"
          className="amy-task-primary"
          style={primaryBtn}
          aria-label={`${label} — ${task.title}`}
          onClick={() => onComplete()}
        >
          {label}
        </button>
      </>
    );
  }

  const useHref = typeof href === 'string' && href.length > 0;
  if (useHref) {
    const newTab = action.type === 'sanity';
    return (
      <a
        href={href}
        className="amy-task-primary"
        style={primaryLink}
        {...(newTab ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {})}
        aria-label={newTab ? `${label} — ${task.title} (opens in new tab)` : `${label} — ${task.title}`}
        onClick={() => onAction()}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="amy-task-primary"
      style={primaryBtn}
      aria-label={`${label} — ${task.title}`}
      onClick={() => onAction()}
    >
      {label}
    </button>
  );
}

export function TaskDetailPanel({
  task,
  taskState,
  onAction,
  onComplete,
  onSkip,
  children,
}: TaskDetailPanelProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const prevId = useRef<string | null>(null);

  useEffect(() => {
    const id = task?.id ?? null;
    if (id !== prevId.current) {
      prevId.current = id;
      if (id) {
        titleRef.current?.focus();
      }
    }
  }, [task?.id]);

  const showResume = hasResumeData(taskState);

  if (task == null) {
    return (
      <section style={panel} aria-label="Task details">
        <div style={emptyWrap}>
          <p style={emptyText}>
            Pick a step from the sidebar to begin — any order is fine, and completed steps stay
            checked for review.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section style={panel} aria-label="Task details">
      {showResume && (
        <div style={resumeBanner} role="status">
          Resuming from where you left off — your answers are saved as you go.
        </div>
      )}

      <div style={metaRow}>Step {task.number}</div>
      <h2 ref={titleRef} tabIndex={-1} style={titleStyle}>
        {task.title}
      </h2>
      <p style={descStyle}>{task.detailDescription}</p>

      <div style={{ marginTop: 'auto', paddingTop: 4 }}>
        <ActionZone task={task} onAction={onAction} onComplete={onComplete}>
          {task.action.type === 'form' ? children : null}
        </ActionZone>
      </div>

      {onSkip ? (
        <button type="button" style={skipLink} onClick={onSkip}>
          Skip for now
        </button>
      ) : null}

      <style>{`
        @media (min-width: 640px) {
          .amy-task-primary {
            width: auto !important;
            min-width: 220px;
            max-width: 320px;
            margin-left: 0;
            margin-right: auto;
          }
        }
        .amy-task-primary:hover {
          filter: brightness(1.06);
        }
      `}</style>
    </section>
  );
}

export default TaskDetailPanel;
