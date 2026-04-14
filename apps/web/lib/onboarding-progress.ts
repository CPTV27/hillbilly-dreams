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
import { ONBOARDING_TASKS, TOTAL_TASKS, getNextTask, TASK_IDS } from '@/app/admin/onboarding/amy/tasks';
import type { OnboardingProgress } from '@prisma/client';
import type { Prisma } from '@prisma/client';

const SESSION_IDLE_MINUTES = 60;

/**
 * Get the user's existing onboarding progress row, or create one with
 * default state if this is their first visit. Also updates lastSeenAt
 * and increments sessionCount if > SESSION_IDLE_MINUTES have passed.
 */
export async function getOrCreateOnboardingProgress(
  userEmail: string,
  role: 'amy' | 'tracy' | 'future-hire' = 'amy'
): Promise<OnboardingProgress> {
  const existing = await prisma.onboardingProgress.findUnique({
    where: { userEmail },
  });

  if (!existing) {
    // First visit — create with task 1 active
    return prisma.onboardingProgress.create({
      data: {
        userEmail,
        role,
        completedTasks: [],
        currentTaskId: ONBOARDING_TASKS[0].id,
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
  taskId: string
): Promise<OnboardingProgress> {
  if (!(TASK_IDS as readonly string[]).includes(taskId)) {
    throw new Error(`Unknown onboarding task id: ${taskId}`);
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
  const isAllDone = nextCompleted.length >= TOTAL_TASKS;
  const nextTask = getNextTask(nextCompleted);

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
 * Save notification preferences (task 8). Stored at the top level of
 * notifPrefs, not inside currentTaskState. Auto-marks task 8 complete.
 */
export async function saveNotificationPrefs(
  userEmail: string,
  prefs: { email?: boolean; asana?: boolean; sms?: boolean; googleChat?: boolean }
): Promise<OnboardingProgress> {
  const after = await prisma.onboardingProgress.update({
    where: { userEmail },
    data: {
      notifPrefs: prefs,
      lastSeenAt: new Date(),
    },
  });
  return markTaskComplete(userEmail, 'notification-prefs');
}

/**
 * Switch the active task without marking anything complete. Used when
 * Amy clicks a task card in the sidebar to jump around.
 */
export async function setCurrentTask(
  userEmail: string,
  taskId: string | null
): Promise<OnboardingProgress> {
  if (taskId !== null && !(TASK_IDS as readonly string[]).includes(taskId)) {
    throw new Error(`Unknown onboarding task id: ${taskId}`);
  }
  return prisma.onboardingProgress.update({
    where: { userEmail },
    data: {
      currentTaskId: taskId,
      lastSeenAt: new Date(),
    },
  });
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
