// lib/task-sync.ts
// 3-way task synchronization: BMT Dashboard → Asana → Google Calendar
// Adapted from S2PX server/lib/task-automation-service.ts for Next.js

import { createCalendarEvent, type CalendarEventPayload } from './calendar-service';

// ── Asana Client (lightweight REST wrapper) ──

const ASANA_PAT = process.env.ASANA_PAT;
const ASANA_BASE = 'https://app.asana.com/api/1.0';

async function asanaFetch(path: string, opts?: RequestInit) {
  if (!ASANA_PAT) throw new Error('ASANA_PAT not configured');

  const res = await fetch(`${ASANA_BASE}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${ASANA_PAT}`,
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Asana ${res.status}: ${text}`);
  }

  return res.json();
}

// ── Workspace GID Cache ──

let _cachedWorkspaceGid: string | null = null;

async function getWorkspaceGid(): Promise<string> {
  if (_cachedWorkspaceGid) return _cachedWorkspaceGid;

  const { data } = await asanaFetch('/workspaces');
  if (!data?.length) throw new Error('No Asana workspaces found');

  _cachedWorkspaceGid = data[0].gid;
  return _cachedWorkspaceGid as string;
}

// ── Public API ──

export interface TaskPayload {
  title: string;
  description?: string;
  assigneeEmail: string;
  dueDate?: Date;
  calendarEvent?: CalendarEventPayload;
  projectGid?: string; // Asana project to attach task to
}

export interface SyncResult {
  asana?: { gid: string; url: string };
  calendar?: { id: string; htmlLink: string };
  errors: string[];
}

/**
 * Push a task to Asana and optionally create a Google Calendar event.
 * Both operations run concurrently for speed.
 */
export async function syncTaskToEcosystem(payload: TaskPayload): Promise<SyncResult> {
  const result: SyncResult = { errors: [] };

  const promises: Promise<void>[] = [];

  // 1. Asana
  if (ASANA_PAT) {
    promises.push(
      (async () => {
        try {
          const workspaceGid = await getWorkspaceGid();

          const taskData: Record<string, unknown> = {
            name: payload.title,
            notes: payload.description || '',
            assignee: payload.assigneeEmail,
            workspace: workspaceGid,
          };

          if (payload.dueDate) {
            taskData.due_on = payload.dueDate.toISOString().split('T')[0];
          }
          if (payload.projectGid) {
            taskData.projects = [payload.projectGid];
          }

          const { data } = await asanaFetch('/tasks', {
            method: 'POST',
            body: JSON.stringify({ data: taskData }),
          });

          result.asana = {
            gid: data.gid,
            url: `https://app.asana.com/0/0/${data.gid}`,
          };

          console.log(`[task-sync] Asana → ${payload.assigneeEmail}: "${payload.title}"`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          result.errors.push(`Asana: ${msg}`);
          console.error(`[task-sync] Asana error:`, msg);
        }
      })()
    );
  }

  // 2. Google Calendar
  if (payload.calendarEvent) {
    promises.push(
      (async () => {
        try {
          const event = await createCalendarEvent(
            payload.assigneeEmail,
            payload.calendarEvent!
          );

          result.calendar = {
            id: event.id || '',
            htmlLink: event.htmlLink || '',
          };

          console.log(`[task-sync] Calendar → ${payload.assigneeEmail}: "${payload.calendarEvent!.summary}"`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          result.errors.push(`Calendar: ${msg}`);
          console.error(`[task-sync] Calendar error:`, msg);
        }
      })()
    );
  }

  await Promise.all(promises);
  return result;
}

// ── Convenience: Artist Onboarding Pipeline ──

export type OnboardingTask =
  | 'social_scan'
  | 'music_scan'
  | 'press_scan'
  | 'brand_kit'
  | 'photo_session'
  | 'content_calendar';

const ONBOARDING_DESCRIPTIONS: Record<OnboardingTask, string> = {
  social_scan: 'Scan Spotify, Instagram, TikTok, YouTube for presence and follower counts',
  music_scan: 'Catalog all released tracks, albums, streaming links, ISRC codes',
  press_scan: 'Search for press coverage, reviews, interviews, features',
  brand_kit: 'Generate brand variation from Amy Allen template — logo, colors, fonts',
  photo_session: 'Schedule portrait session at Studio C or on-location',
  content_calendar: 'Build 90-day content calendar — social posts, newsletter features, playlist adds',
};

/**
 * Fire all onboarding pipeline tasks to Asana for a newly submitted artist.
 */
export async function syncOnboardingPipeline(
  artistName: string,
  assigneeEmail: string
): Promise<SyncResult[]> {
  const tasks: OnboardingTask[] = [
    'social_scan',
    'music_scan',
    'press_scan',
    'brand_kit',
    'photo_session',
    'content_calendar',
  ];

  return Promise.all(
    tasks.map((task) =>
      syncTaskToEcosystem({
        title: `[${artistName}] ${task.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
        description: ONBOARDING_DESCRIPTIONS[task],
        assigneeEmail,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days out
      })
    )
  );
}
