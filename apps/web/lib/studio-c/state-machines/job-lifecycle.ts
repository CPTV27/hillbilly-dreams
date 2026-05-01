/**
 * Studio C production job lifecycle state machine.
 *
 * The canonical source of truth for which state transitions are legal on a
 * `StudioJob` and which approval tier is required to make each one.
 *
 * Phase 1 (2026-05-01). Pure logic, no DB writes. Phase 2 wires this up to
 * Prisma + a job-state-update API endpoint.
 *
 * Design references: docs/studio-c/workflow-synthesis-2026-05-01.md
 */

// ── Types ──

export type JobState =
  | 'intake'
  | 'prep'
  | 'shooting'
  | 'ingesting'
  | 'editing'
  | 'internal_review'
  | 'chase_review'
  | 'revisions'
  | 'conforming'
  | 'delivered'
  | 'archived'
  | 'cancelled'
  | 'on_hold';

export const ALL_JOB_STATES: JobState[] = [
  'intake',
  'prep',
  'shooting',
  'ingesting',
  'editing',
  'internal_review',
  'chase_review',
  'revisions',
  'conforming',
  'delivered',
  'archived',
  'cancelled',
  'on_hold',
];

/** Approval tier — drives which transitions a given user can perform. */
export type ApprovalTier = 'A' | 'B' | 'C';

/** Terminal states — no further transitions allowed. */
export const TERMINAL_STATES: ReadonlySet<JobState> = new Set<JobState>(['archived', 'cancelled']);

/** Transition record — `to` is the destination, `requires` is the minimum tier
 *  required to authorize this move. C means automated (no human required). */
interface Transition {
  to: JobState;
  requires: ApprovalTier;
  /** Optional human-readable description of why this transition exists. */
  reason?: string;
}

// ── Transition table ──
// The full DAG. Anything not listed here is illegal.
//
// Tier semantics:
// - C = automated, no human in loop
// - B = Elijah / Miles can authorize
// - A = Chase only

const TRANSITIONS: Readonly<Record<JobState, ReadonlyArray<Transition>>> = {
  intake: [
    { to: 'prep', requires: 'B', reason: 'Job accepted, prep work begins.' },
    { to: 'cancelled', requires: 'B', reason: 'Declined before any work.' },
    { to: 'on_hold', requires: 'B', reason: 'Paused at intake.' },
  ],
  prep: [
    { to: 'shooting', requires: 'C', reason: 'Shoot day arrives.' },
    { to: 'on_hold', requires: 'B' },
    { to: 'cancelled', requires: 'B' },
  ],
  shooting: [
    { to: 'ingesting', requires: 'C', reason: 'Wrap — cards begin offload.' },
    { to: 'cancelled', requires: 'A', reason: 'Mid-shoot kill requires Chase.' },
  ],
  ingesting: [
    { to: 'editing', requires: 'B', reason: 'Ingest verified — editor picks up.' },
    { to: 'on_hold', requires: 'B' },
  ],
  editing: [
    { to: 'internal_review', requires: 'B', reason: 'Rough cut up for review.' },
    { to: 'on_hold', requires: 'B' },
    { to: 'cancelled', requires: 'A' },
  ],
  internal_review: [
    {
      to: 'conforming',
      requires: 'B',
      reason: 'Tier B sign-off — only legal for Tier B/C jobs.',
    },
    {
      to: 'chase_review',
      requires: 'B',
      reason: 'Escalation to Chase. Always legal from Tier B (manual escalation or required for Tier A jobs).',
    },
    { to: 'revisions', requires: 'B', reason: 'Reviewer requested changes.' },
  ],
  chase_review: [
    { to: 'conforming', requires: 'A', reason: 'Chase approves the cut.' },
    { to: 'revisions', requires: 'A' },
  ],
  revisions: [
    { to: 'editing', requires: 'C', reason: 'Back to the editor with notes.' },
  ],
  conforming: [
    { to: 'delivered', requires: 'B', reason: 'Final exports out the door.' },
  ],
  delivered: [
    { to: 'archived', requires: 'C', reason: 'Retention timer transitions to archive.' },
  ],
  on_hold: [
    { to: 'prep', requires: 'B' },
    { to: 'shooting', requires: 'B' },
    { to: 'editing', requires: 'B' },
    { to: 'cancelled', requires: 'A' },
  ],
  archived: [],
  cancelled: [],
};

// ── Public API ──

/** Returns the legal target states for a given current state. */
export function legalTargets(from: JobState): JobState[] {
  return TRANSITIONS[from].map((t) => t.to);
}

/** Returns the required approval tier for a given transition, or null if illegal. */
export function tierFor(from: JobState, to: JobState): ApprovalTier | null {
  const t = TRANSITIONS[from].find((tr) => tr.to === to);
  return t ? t.requires : null;
}

/** Whether the transition is structurally legal (ignoring tier). */
export function isTransitionLegal(from: JobState, to: JobState): boolean {
  return TRANSITIONS[from].some((t) => t.to === to);
}

/** Tier `actor` is allowed if their tier rank >= required rank.
 *  Rank: A = 3, B = 2, C = 1. A user with tier A can authorize anything;
 *  C means automated (no user required). */
export function tierRank(tier: ApprovalTier): number {
  return { C: 1, B: 2, A: 3 }[tier];
}

/** Whether `actorTier` is sufficient to authorize a transition that requires `requiredTier`.
 *  Special case: a C-required transition may run with no actor (automation). */
export function actorCanAuthorize(actorTier: ApprovalTier | null, requiredTier: ApprovalTier): boolean {
  if (requiredTier === 'C') return true; // automation OK; humans also OK
  if (actorTier === null) return false;  // human required, none provided
  return tierRank(actorTier) >= tierRank(requiredTier);
}

export interface TransitionAttempt {
  from: JobState;
  to: JobState;
  /** Tier of the user attempting the move. null for automation runs. */
  actorTier: ApprovalTier | null;
  /** Approval tier configured on the job — used to enforce that Tier A jobs
   *  cannot bypass chase_review. */
  jobApprovalTier: ApprovalTier;
}

export interface TransitionResult {
  ok: boolean;
  /** When `ok === false`, why the transition was rejected. */
  reason?: string;
}

/** Validates a transition attempt against the state machine + tier rules.
 *
 *  Rules layered on top of the structural transition table:
 *    1. The transition must exist in the table.
 *    2. The actor's tier must meet the required tier for the transition.
 *    3. Tier A jobs cannot go directly from `internal_review → conforming` —
 *       they MUST route through `chase_review`. (Tier B/C jobs may skip.)
 */
export function validateTransition(attempt: TransitionAttempt): TransitionResult {
  const { from, to, actorTier, jobApprovalTier } = attempt;

  // Rule 1 — structural legality.
  if (!isTransitionLegal(from, to)) {
    return { ok: false, reason: `Illegal transition: ${from} → ${to}.` };
  }

  // Rule 2 — actor tier must clear the gate.
  const required = tierFor(from, to);
  if (required === null) {
    // Belt-and-suspenders — should be unreachable given Rule 1.
    return { ok: false, reason: `No tier defined for ${from} → ${to}.` };
  }
  if (!actorCanAuthorize(actorTier, required)) {
    return {
      ok: false,
      reason: `Tier ${actorTier ?? 'none'} cannot authorize ${from} → ${to} (requires ${required}).`,
    };
  }

  // Rule 3 — Tier A jobs cannot skip chase_review.
  if (
    jobApprovalTier === 'A' &&
    from === 'internal_review' &&
    to === 'conforming'
  ) {
    return {
      ok: false,
      reason: 'Tier A jobs must route through chase_review; cannot ship from internal_review.',
    };
  }

  return { ok: true };
}

/** Convenience: whether a job is in a terminal state. */
export function isTerminal(state: JobState): boolean {
  return TERMINAL_STATES.has(state);
}
