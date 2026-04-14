// apps/web/lib/onboarding-progress.ts
//
// Small helper layer on top of the OnboardingProgress Prisma model.
// Encapsulates the common operations: get-or-create, mark task complete,
// save partial state, touch-session, etc.
//
// All helpers take a userEmail (from the auth session) as their primary
// key. The caller is responsible for auth enforcement — these helpers
// do NOT check admin status.

import { prisma } from '@/lib/prisma';
import {
  ONBOARDING_TASKS as AMY_TASKS,
  TOTAL_TASKS as AMY_TOTAL,
  getNextTask as getNextAmyTask,
  TASK_IDS as AMY_TASK_IDS,
} from '@/app/admin/onboarding/amy/tasks';
import type { OnboardingTask } from '@/app/admin/onboarding/amy/tasks';
import {
  TRACY_ONBOARDING_TASKS,
  TRACY_TOTAL_TASKS,
  getTracyNextTask,
  TRACY_TASK_IDS,
} from '@/app/admin/onboarding/tracy/tasks';
import type { OnboardingProgress } from '@prisma/client';
import type { Prisma } from '@prisma/client';

const SESSION_IDLE_MINUTES = 60;

export type OnboardingRole = 'amy' | 'tracy' | 'future-hire';

/** Look up the task list, validation ids, total count, and next-task fn for a role. */
function getRoleConfig(role: OnboardingRole): {
  tasks: OnboardingTask[];
  taskIds: readonly string[];
  total: number;
  getNext: (completedIds: string[]) => OnboardingTask | null;
} {
  if (role === 'tracy') {
    return {
      tasks: TRACY_ONBOARDING_TASKS,
      taskIds: TRACY_TASK_IDS,
      total: TRACY_TOTAL_TASKS,
      getNext: getTracyNextTask,
    };
  }
  // Amy + future-hire fall back to the Amy task list for now.
  return {
    tasks: AMY_TASKS,
    taskIds: AMY_TASK_IDS,
    total: AMY_TOTAL,
    getNext: getNextAmyTask,
  };
}

/**
 * Get the user's existing onboarding progress row, or create one with
 * default state if this is their first visit. Also updates lastSeenAt
 * and increments sessionCount if > SESSION_IDLE_MINUTES have passed.
 */
export async function getOrCreateOnboardingProgress(
  userEmail: string,
  role: OnboardingRole = 'amy'
): Promise<OnboardingProgress> {
  const existing = await prisma.onboardingProgress.findUnique({
    where: { userEmail },
  });

  const cfg = getRoleConfig(role);

  if (!existing) {
    // First visit — create with task 1 of the role's task list active
    return prisma.onboardingProgress.create({
      data: {
        userEmail,
        role,
        completedTasks: [],
        currentTaskId: cfg.tasks[0]?.id ?? null,
        currentTaskState: {},
        lastSeenAt: new Date(),
        sessionCount: 1,
        startedAt: new Date(),
      },
    });
  }

  // Existing — touch lastSeenAt + maybe bump sessionCount
  const minutesSinceLastSeen =
    (Date.now() - existing.lastSeenAt.getTime()) / 60000;
  const bumpSession = minutesSinceLastSeen > SESSION_IDLE_MINUTES;

  return prisma.onboardingProgress.update({
    where: { userEmail },
    data: {
      lastSeenAt: new Date(),
      sessionCount: bumpSession ? { increment: 1 } : undefined,
    },
  });
}

/**
 * Mark a task as completed and advance currentTaskId to the next
 * uncompleted task (or null if all done).
 *
 * If the task is already in completedTasks, this is a no-op.
 * If this is the final task, sets completedAt.
 */
export async function markTaskComplete(
  userEmail: string,
  taskId: string,
  role: OnboardingRole = 'amy'
): Promise<OnboardingProgress> {
  const cfg = getRoleConfig(role);
  if (!cfg.taskIds.includes(taskId)) {
    throw new Error(`Unknown onboarding task id for role ${role}: ${taskId}`);
  }

  const current = await prisma.onboardingProgress.findUnique({
    where: { userEmail },
  });
  if (!current) {
    throw new Error(`No OnboardingProgress found for ${userEmail}`);
  }

  // Already complete — no-op
  if (current.completedTasks.includes(taskId)) return current;

  const nextCompleted = [...current.completedTasks, taskId];
  const isAllDone = nextCompleted.length >= cfg.total;
  const nextTask = cfg.getNext(nextCompleted);

  const clearedState = clearTaskState(
    current.currentTaskState as Record<string, unknown> | null,
    taskId
  );

  return prisma.onboardingProgress.update({
    where: { userEmail },
    data: {
      completedTasks: nextCompleted,
      currentTaskId: nextTask?.id ?? null,
      // Clear partial state for the task we just finished
      currentTaskState: clearedState as Prisma.InputJsonValue,
      completedAt: isAllDone && !current.completedAt ? new Date() : current.completedAt,
      lastSeenAt: new Date(),
    },
  });
}

/**
 * Save partial state for the currently active task (e.g. half-filled form).
 * Called on debounced input change (~1.5s). Merges into currentTaskState
 * keyed by taskId so different tasks don't clobber each other.
 */
export async function saveTaskState(
  userEmail: string,
  taskId: string,
  state: Record<string, unknown>
): Promise<OnboardingProgress> {
  const current = await prisma.onboardingProgress.findUnique({
    where: { userEmail },
  });
  if (!current) {
    throw new Error(`No OnboardingProgress found for ${userEmail}`);
  }

  const existingState = (current.currentTaskState ?? {}) as Record<string, unknown>;
  const newState = { ...existingState, [taskId]: state };

  return prisma.onboardingProgress.update({
    where: { userEmail },
    data: {
      currentTaskState: newState as Prisma.InputJsonValue,
      lastSeenAt: new Date(),
    },
  });
}

/**
 * Save notification preferences. Stored at the top level of notifPrefs,
 * not inside currentTaskState. Auto-marks the 'notification-prefs' task
 * complete for the given role (both Amy and Tracy have this task).
 */
export async function saveNotificationPrefs(
  userEmail: string,
  prefs: { email?: boolean; asana?: boolean; sms?: boolean; googleChat?: boolean },
  role: OnboardingRole = 'amy'
): Promise<OnboardingProgress> {
  await prisma.onboardingProgress.update({
    where: { userEmail },
    data: {
      notifPrefs: prefs,
      lastSeenAt: new Date(),
    },
  });
  return markTaskComplete(userEmail, 'notification-prefs', role);
}

/**
 * Switch the active task without marking anything complete. Used when a
 * user clicks a task card in the sidebar to jump around.
 */
export async function setCurrentTask(
  userEmail: string,
  taskId: string | null,
  role: OnboardingRole = 'amy'
): Promise<OnboardingProgress> {
  if (taskId !== null) {
    const cfg = getRoleConfig(role);
    if (!cfg.taskIds.includes(taskId)) {
      throw new Error(`Unknown onboarding task id for role ${role}: ${taskId}`);
    }
  }
  return prisma.onboardingProgress.update({
    where: { userEmail },
    data: {
      currentTaskId: taskId,
      lastSeenAt: new Date(),
    },
  });
}

// ─── Peer progress (for Tracy's review-amy-progress task) ────────────────────

/**
 * Read-only peer progress view. Tracy can see Amy's onboarding state
 * (and vice versa) for the "review-amy-progress" task. Returns just the
 * safe, non-sensitive fields — no task state blob, no notification prefs.
 */
export async function getPeerProgress(peerRole: OnboardingRole): Promise<{
  completedTasks: string[];
  currentTaskId: string | null;
  completedAt: Date | null;
  lastSeenAt: Date | null;
  sessionCount: number;
  totalTasks: number;
  startedAt: Date | null;
} | null> {
  // Look up the most recent progress row for this role. We expect at
  // most one row per role for today's needs (Amy and Tracy each have one).
  const row = await prisma.onboardingProgress.findFirst({
    where: { role: peerRole },
    orderBy: { lastSeenAt: 'desc' },
  });
  if (!row) return null;

  const cfg = getRoleConfig(peerRole);
  return {
    completedTasks: row.completedTasks,
    currentTaskId: row.currentTaskId,
    completedAt: row.completedAt,
    lastSeenAt: row.lastSeenAt,
    sessionCount: row.sessionCount,
    totalTasks: cfg.total,
    startedAt: row.startedAt,
  };
}

// ─── Internal helpers ────────────────────────────────────────────────────────

/** Remove a completed task's partial state from the JSON blob. */
function clearTaskState(
  existing: Record<string, unknown> | null,
  taskId: string
): Record<string, unknown> {
  if (!existing) return {};
  const copy = { ...existing };
  delete copy[taskId];
  return copy;
}
