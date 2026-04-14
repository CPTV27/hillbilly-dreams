'use client';

// apps/web/app/admin/onboarding/amy/AmyOnboardingClient.tsx
//
// The integration glue for Amy's onboarding page. Owns the state machine
// that ties together:
//   - ProgressSidebar (checklist UI from Cursor)
//   - TaskDetailPanel (task action zone from Cursor)
//   - NotificationPrefsForm (task 8 form from Cursor)
//   - OnboardingCompleteScreen (final screen from Cursor)
//   - DeltaDawnWidget (existing widget, now with mode + onMarker support)
//
// Responsibilities:
//   - Fetch /api/onboarding/amy/status on mount AND on interval (polls
//     every 15s for server-side completion detection: OAuth, Sanity)
//   - Handle ?step=...&status=success query params on return from OAuth
//     flows and event form (marks task complete immediately)
//   - Call /api/onboarding/amy/complete when a task is manually finished
//   - Call /api/onboarding/amy/save-state on debounced form input changes
//   - Call /api/onboarding/amy/prefs when notification prefs are saved
//   - Parse Delta Dawn's [[TASK:...]] markers to advance the checklist

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DeltaDawnWidget from '@/components/DeltaDawnWidget';
import { ONBOARDING_TASKS, getTaskById, type OnboardingTask } from './tasks';
import ProgressSidebar from './ProgressSidebar';
import TaskDetailPanel from './TaskDetailPanel';
import NotificationPrefsForm from './NotificationPrefsForm';
import OnboardingCompleteScreen from './OnboardingCompleteScreen';

// ─── Types ───────────────────────────────────────────────────────────────────

interface NotifPrefs {
  email: boolean;
  asana: boolean;
  sms: boolean;
  googleChat: boolean;
}

interface InitialProgress {
  completedTasks: string[];
  currentTaskId: string | null;
  currentTaskState: Record<string, Record<string, unknown>>;
  notifPrefs: Record<string, boolean> | null;
  completedAt: string | null;
  sessionCount: number;
  lastSeenAt: string;
}

export interface AmyOnboardingClientProps {
  userName: string;
  userEmail: string;
  initialProgress: InitialProgress;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const POLL_INTERVAL_MS = 15000;
const SAVE_DEBOUNCE_MS = 1500;

// ─── Component ───────────────────────────────────────────────────────────────

export function AmyOnboardingClient({
  userName,
  userEmail,
  initialProgress,
}: AmyOnboardingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── Progress state ──
  const [completedTasks, setCompletedTasks] = useState<string[]>(
    initialProgress.completedTasks
  );
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(
    initialProgress.currentTaskId
  );
  const [taskStates, setTaskStates] = useState<Record<string, Record<string, unknown>>>(
    initialProgress.currentTaskState
  );
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs | null>(
    initialProgress.notifPrefs
      ? {
          email: Boolean(initialProgress.notifPrefs.email),
          asana: Boolean(initialProgress.notifPrefs.asana),
          sms: Boolean(initialProgress.notifPrefs.sms),
          googleChat: Boolean(initialProgress.notifPrefs.googleChat),
        }
      : null
  );
  const [completedAt, setCompletedAt] = useState<Date | null>(
    initialProgress.completedAt ? new Date(initialProgress.completedAt) : null
  );
  const [showCompletionView, setShowCompletionView] = useState<boolean>(
    !!initialProgress.completedAt
  );

  // Prefs form UI state
  const [prefsSaving, setPrefsSaving] = useState(false);
  const [prefsError, setPrefsError] = useState<string | null>(null);

  const saveStateDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentTask: OnboardingTask | null = useMemo(
    () => (currentTaskId ? getTaskById(currentTaskId) ?? null : null),
    [currentTaskId]
  );
  const currentTaskStateForPanel = useMemo(() => {
    if (!currentTaskId) return null;
    return taskStates[currentTaskId] ?? null;
  }, [currentTaskId, taskStates]);

  // ── Fetch status from server and apply any diffs ──
  const refreshStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/onboarding/amy/status', { cache: 'no-store' });
      if (!res.ok) return;
      const json = (await res.json()) as {
        progress: {
          completedTasks: string[];
          currentTaskId: string | null;
          currentTaskState: Record<string, Record<string, unknown>>;
          notifPrefs: Record<string, boolean> | null;
          completedAt: string | null;
        };
      };
      const p = json.progress;
      setCompletedTasks(p.completedTasks);
      setCurrentTaskId((prev) => p.currentTaskId ?? prev);
      setTaskStates(p.currentTaskState || {});
      if (p.notifPrefs) {
        setNotifPrefs({
          email: Boolean(p.notifPrefs.email),
          asana: Boolean(p.notifPrefs.asana),
          sms: Boolean(p.notifPrefs.sms),
          googleChat: Boolean(p.notifPrefs.googleChat),
        });
      }
      if (p.completedAt) {
        setCompletedAt(new Date(p.completedAt));
        setShowCompletionView(true);
      }
    } catch {
      /* silent — poll will try again */
    }
  }, []);

  // ── Polling every 15s for server-side detection (OAuth + Sanity) ──
  useEffect(() => {
    const id = setInterval(() => {
      void refreshStatus();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refreshStatus]);

  // ── Query param handler: ?step=connect-meta&status=success etc ──
  useEffect(() => {
    const step = searchParams?.get('step');
    const status = searchParams?.get('status');
    if (step && status === 'success') {
      // Explicit completion from an OAuth callback or event form redirect.
      // Fire the complete endpoint (it's idempotent if already done) and
      // clean the query string so a refresh doesn't re-fire.
      void (async () => {
        try {
          await fetch('/api/onboarding/amy/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: step }),
          });
        } catch {
          /* ignore */
        }
        await refreshStatus();
        router.replace('/admin/onboarding/amy');
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // ── Mark task complete (generic — used by chat round-trip, tour, static) ──
  const markComplete = useCallback(
    async (taskId: string) => {
      try {
        const res = await fetch('/api/onboarding/amy/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: taskId }),
        });
        if (res.ok) await refreshStatus();
      } catch {
        /* non-fatal */
      }
    },
    [refreshStatus]
  );

  // ── Save partial task state (debounced, for forms) ──
  const scheduleStateSave = useCallback(
    (taskId: string, state: Record<string, unknown>) => {
      // Optimistic local update
      setTaskStates((prev) => ({ ...prev, [taskId]: state }));

      if (saveStateDebounceRef.current) {
        clearTimeout(saveStateDebounceRef.current);
      }
      saveStateDebounceRef.current = setTimeout(() => {
        void fetch('/api/onboarding/amy/save-state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: taskId, state }),
        }).catch(() => {
          /* non-fatal */
        });
      }, SAVE_DEBOUNCE_MS);
    },
    []
  );

  // ── Select a task from the sidebar (jump around) ──
  const handleSelectTask = useCallback((taskId: string) => {
    setCurrentTaskId(taskId);
  }, []);

  // ── Primary action button click from TaskDetailPanel ──
  const handleAction = useCallback(() => {
    if (!currentTask) return;
    // For the "chat" type, there's no button — this shouldn't fire.
    // For "tour", "oauth", "external-form", "sanity" types, TaskDetailPanel
    // renders an <a href> which the browser navigates natively. Our
    // onAction is still called on click for metrics/logging purposes only.
    // We don't need to do anything here — the hrefs do the work.
  }, [currentTask]);

  // ── Manual complete (used by "Got it" on static task) ──
  const handleManualComplete = useCallback(() => {
    if (!currentTask) return;
    void markComplete(currentTask.id);
  }, [currentTask, markComplete]);

  // ── Skip current task (optional UX) ──
  const handleSkip = useCallback(() => {
    if (!currentTask) return;
    // "Skip for now" — just advance currentTaskId to next uncompleted
    // without marking this one done. The server still has it as incomplete.
    const nextIdx = ONBOARDING_TASKS.findIndex((t) => t.id === currentTask.id) + 1;
    const next = ONBOARDING_TASKS[nextIdx];
    if (next) setCurrentTaskId(next.id);
  }, [currentTask]);

  // ── Save notification prefs (task 8) ──
  const handleSavePrefs = useCallback(
    async (prefs: NotifPrefs) => {
      setPrefsSaving(true);
      setPrefsError(null);
      try {
        const res = await fetch('/api/onboarding/amy/prefs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prefs),
        });
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(text || `Save failed (${res.status})`);
        }
        setNotifPrefs(prefs);
        await refreshStatus();
      } catch (e) {
        setPrefsError(e instanceof Error ? e.message : 'Save failed');
      } finally {
        setPrefsSaving(false);
      }
    },
    [refreshStatus]
  );

  // ── Delta Dawn marker handler ──
  const handleDawnMarker = useCallback(
    (taskId: string) => {
      // When Delta Dawn emits [[TASK:id]], advance the highlight in the
      // sidebar to match (but don't mark anything complete — that's driven
      // by actual events). If the marker is for the CURRENT task (e.g.
      // a transition confirmation), mark it complete immediately.
      if (taskId === currentTaskId) {
        void markComplete(taskId);
      } else {
        setCurrentTaskId(taskId);
      }
    },
    [currentTaskId, markComplete]
  );

  // ── Auto-complete "meet-delta-dawn" after first chat interaction ──
  // We watch localStorage for the delta-dawn-chat-v1 key — if it has at
  // least 2 messages (initial dawn + user reply + dawn reply), task 1 is
  // done. Simple and robust — no API coupling needed.
  useEffect(() => {
    if (completedTasks.includes('meet-delta-dawn')) return;
    const check = () => {
      try {
        const raw = localStorage.getItem('delta-dawn-chat-v1');
        if (!raw) return;
        const parsed = JSON.parse(raw) as Array<{ role: string; text: string }>;
        const hasUserMsg = parsed.some((m) => m.role === 'user');
        if (hasUserMsg) {
          void markComplete('meet-delta-dawn');
        }
      } catch {
        /* ignore */
      }
    };
    check();
    const id = setInterval(check, 2000);
    return () => clearInterval(id);
  }, [completedTasks, markComplete]);

  // ── Reopen checklist after completion screen ──
  const handleReopenFromComplete = useCallback(() => {
    setShowCompletionView(false);
  }, []);

  // ── Render ──

  if (showCompletionView && completedAt) {
    return (
      <main style={pageStyle}>
        <OnboardingCompleteScreen
          completedAt={completedAt}
          userName={userName}
          onReopen={handleReopenFromComplete}
        />
        <DeltaDawnWidget mode="amy-onboarding" onMarker={handleDawnMarker} autoOpen />
      </main>
    );
  }

  const completedCount = completedTasks.length;

  // Determine what children to pass to TaskDetailPanel based on current task type
  let panelChildren: React.ReactNode = null;
  if (currentTask?.action.type === 'form' && currentTask.id === 'notification-prefs') {
    panelChildren = (
      <NotificationPrefsForm
        initialPrefs={notifPrefs ?? undefined}
        onSave={handleSavePrefs}
        saving={prefsSaving}
        error={prefsError}
      />
    );
  }

  return (
    <main style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Welcome, {userName}</h1>
          <p style={subtitleStyle}>
            Let&apos;s get you set up. Delta Dawn is here the whole way —
            just ask her anything.
          </p>
        </div>
        <div style={progressBadgeStyle}>
          {completedCount} of {ONBOARDING_TASKS.length} complete
        </div>
      </header>

      <div style={gridStyle}>
        <section style={sidebarWrapStyle}>
          <ProgressSidebar
            tasks={ONBOARDING_TASKS}
            completedTaskIds={completedTasks}
            currentTaskId={currentTaskId}
            onSelectTask={handleSelectTask}
          />
        </section>

        <section style={panelWrapStyle}>
          <TaskDetailPanel
            task={currentTask}
            taskState={currentTaskStateForPanel}
            onAction={handleAction}
            onComplete={handleManualComplete}
            onStateChange={(state) => {
              if (currentTask) scheduleStateSave(currentTask.id, state);
            }}
            onSkip={handleSkip}
          >
            {panelChildren}
          </TaskDetailPanel>
        </section>
      </div>

      <DeltaDawnWidget mode="amy-onboarding" onMarker={handleDawnMarker} autoOpen />
    </main>
  );
}

export default AmyOnboardingClient;

// ─── Styles ──────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  padding: '32px 24px 120px',
  background: 'linear-gradient(180deg, rgba(10, 8, 6, 1) 0%, rgba(20, 15, 10, 1) 100%)',
  color: 'var(--card-fg-color, #f5e9d1)',
  fontFamily: 'var(--font-body, -apple-system, BlinkMacSystemFont, system-ui, sans-serif)',
  maxWidth: 1280,
  margin: '0 auto',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 24,
  marginBottom: 28,
  flexWrap: 'wrap',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: '-0.01em',
};

const subtitleStyle: React.CSSProperties = {
  margin: '6px 0 0',
  opacity: 0.7,
  fontSize: 14,
  maxWidth: 560,
};

const progressBadgeStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 999,
  background: 'var(--card-bg-color, rgba(30, 27, 24, 0.92))',
  border: '1px solid var(--accent, #c8943e)',
  color: 'var(--accent, #c8943e)',
  fontSize: 13,
  fontWeight: 600,
  whiteSpace: 'nowrap',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(280px, 360px) 1fr',
  gap: 24,
  alignItems: 'start',
};

const sidebarWrapStyle: React.CSSProperties = {
  position: 'sticky',
  top: 24,
  maxHeight: 'calc(100vh - 48px)',
};

const panelWrapStyle: React.CSSProperties = {
  minWidth: 0, // prevents grid blowout
};
