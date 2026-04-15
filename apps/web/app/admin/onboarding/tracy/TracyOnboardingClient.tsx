'use client';

// apps/web/app/admin/onboarding/tracy/TracyOnboardingClient.tsx
//
// Tracy's onboarding glue component. Sibling to AmyOnboardingClient —
// uses Cursor's four UI pieces (ProgressSidebar, TaskDetailPanel,
// NotificationPrefsForm, OnboardingCompleteScreen) + DeltaDawnWidget,
// but points at Tracy's API endpoints and uses the 6-task Tracy flow.
// Injects a live PeerProgressCard into the task panel when Tracy is on
// the 'review-amy-progress' task.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DeltaDawnWidget from '@/components/DeltaDawnWidget';
import {
  TRACY_ONBOARDING_TASKS,
  getTracyTaskById,
} from './tasks';
import type { OnboardingTask } from '../amy/tasks';
import ProgressSidebar from '../amy/ProgressSidebar';
import TaskDetailPanel from '../amy/TaskDetailPanel';
import NotificationPrefsForm from '../amy/NotificationPrefsForm';
import OnboardingCompleteScreen from '../amy/OnboardingCompleteScreen';
import PeerProgressCard from './PeerProgressCard';

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

export interface TracyOnboardingClientProps {
  userName: string;
  userEmail: string;
  initialProgress: InitialProgress;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const POLL_INTERVAL_MS = 15000;
const SAVE_DEBOUNCE_MS = 1500;

// ─── Component ───────────────────────────────────────────────────────────────

export function TracyOnboardingClient({
  userName,
  userEmail,
  initialProgress,
}: TracyOnboardingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const [prefsSaving, setPrefsSaving] = useState(false);
  const [prefsError, setPrefsError] = useState<string | null>(null);

  const saveStateDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentTask: OnboardingTask | null = useMemo(
    () => (currentTaskId ? getTracyTaskById(currentTaskId) ?? null : null),
    [currentTaskId]
  );
  const currentTaskStateForPanel = useMemo(() => {
    if (!currentTaskId) return null;
    return taskStates[currentTaskId] ?? null;
  }, [currentTaskId, taskStates]);

  // ── Fetch Tracy status ──
  const refreshStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/onboarding/tracy/status', { cache: 'no-store' });
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

  useEffect(() => {
    const id = setInterval(() => {
      void refreshStatus();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refreshStatus]);

  // ?step=...&status=success handler (for dashboard tour etc)
  useEffect(() => {
    const step = searchParams?.get('step');
    const status = searchParams?.get('status');
    if (step && status === 'success') {
      void (async () => {
        try {
          await fetch('/api/onboarding/tracy/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: step }),
          });
        } catch {
          /* ignore */
        }
        await refreshStatus();
        router.replace('/admin/onboarding/tracy');
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const markComplete = useCallback(
    async (taskId: string) => {
      try {
        const res = await fetch('/api/onboarding/tracy/complete', {
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

  const scheduleStateSave = useCallback(
    (taskId: string, state: Record<string, unknown>) => {
      setTaskStates((prev) => ({ ...prev, [taskId]: state }));
      if (saveStateDebounceRef.current) {
        clearTimeout(saveStateDebounceRef.current);
      }
      saveStateDebounceRef.current = setTimeout(() => {
        void fetch('/api/onboarding/tracy/save-state', {
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

  const handleSelectTask = useCallback((taskId: string) => {
    setCurrentTaskId(taskId);
  }, []);

  const handleAction = useCallback(() => {
    // links handle navigation natively — nothing to do here
  }, []);

  const handleManualComplete = useCallback(() => {
    if (!currentTask) return;
    void markComplete(currentTask.id);
  }, [currentTask, markComplete]);

  const handleSkip = useCallback(() => {
    if (!currentTask) return;
    const nextIdx = TRACY_ONBOARDING_TASKS.findIndex((t) => t.id === currentTask.id) + 1;
    const next = TRACY_ONBOARDING_TASKS[nextIdx];
    if (next) setCurrentTaskId(next.id);
  }, [currentTask]);

  const handleSavePrefs = useCallback(
    async (prefs: NotifPrefs) => {
      setPrefsSaving(true);
      setPrefsError(null);
      try {
        const res = await fetch('/api/onboarding/tracy/prefs', {
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

  const handleDawnMarker = useCallback(
    (taskId: string) => {
      // Markers are navigation hints ONLY — they highlight the sidebar
      // task Delta Dawn is referencing. They do NOT mark tasks complete.
      // Completion comes from real events (form submits, OAuth callbacks,
      // API status polls). See the matching comment in AmyOnboardingClient.
      setCurrentTaskId(taskId);
    },
    []
  );

  // Auto-complete meet-delta-dawn on first user chat turn
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
          variant="tracy"
        />
        <DeltaDawnWidget mode="tracy-onboarding" onMarker={handleDawnMarker} autoOpen />
      </main>
    );
  }

  const completedCount = completedTasks.length;

  // Task-specific children injected into TaskDetailPanel
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
  } else if (currentTask?.id === 'review-amy-progress') {
    // Peer view — Tracy sees Amy's live progress above the "Acknowledged" button
    panelChildren = <PeerProgressCard peer="amy" peerDisplayName="Amy" />;
  }

  return (
    <main style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Welcome, {userName}</h1>
          <p style={subtitleStyle}>
            Finance, Inn ops, grants, and approvals. Delta Dawn pulls real
            numbers — just ask.
          </p>
        </div>
        <div style={progressBadgeStyle}>
          {completedCount} of {TRACY_ONBOARDING_TASKS.length} complete
        </div>
      </header>

      <div style={gridStyle}>
        <section style={sidebarWrapStyle}>
          <ProgressSidebar
            tasks={TRACY_ONBOARDING_TASKS}
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

      <DeltaDawnWidget mode="tracy-onboarding" onMarker={handleDawnMarker} autoOpen />
    </main>
  );
}

export default TracyOnboardingClient;

// ─── Styles (mirror Amy's so both pages feel the same) ──────────────────────

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  padding: '32px 24px 120px',
  background: 'linear-gradient(180deg, rgba(10, 8, 6, 1) 0%, rgba(20, 15, 10, 1) 100%)',
  color: 'var(--card-fg-color, #f5e9d1)',
  fontFamily:
    'var(--font-body, -apple-system, BlinkMacSystemFont, system-ui, sans-serif)',
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
  minWidth: 0,
};
