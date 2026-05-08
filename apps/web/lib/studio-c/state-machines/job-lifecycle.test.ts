/**
 * Unit tests for the Studio C job lifecycle state machine.
 *
 * Run: `npx tsx --test apps/web/lib/studio-c/state-machines/job-lifecycle.test.ts`
 *
 * Uses Node's built-in `node:test` to avoid pulling in a new test framework
 * for Phase 1. Existing repo only has Playwright (E2E) configured.
 */
import { test, describe } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  ALL_JOB_STATES,
  TERMINAL_STATES,
  legalTargets,
  isTransitionLegal,
  tierFor,
  tierRank,
  actorCanAuthorize,
  validateTransition,
  isTerminal,
} from './job-lifecycle';

describe('job-lifecycle — basic structure', () => {
  test('every state is enumerated exactly once', () => {
    const set = new Set(ALL_JOB_STATES);
    assert.equal(set.size, ALL_JOB_STATES.length);
  });

  test('terminal states have no outbound transitions', () => {
    Array.from(TERMINAL_STATES).forEach((t) => {
      assert.deepEqual(legalTargets(t), []);
    });
  });

  test('archived and cancelled are terminal', () => {
    assert.ok(isTerminal('archived'));
    assert.ok(isTerminal('cancelled'));
  });

  test('intake is not terminal', () => {
    assert.ok(!isTerminal('intake'));
  });
});

describe('job-lifecycle — legal transitions', () => {
  test('intake → prep is legal', () => {
    assert.ok(isTransitionLegal('intake', 'prep'));
  });

  test('prep → shooting is legal', () => {
    assert.ok(isTransitionLegal('prep', 'shooting'));
  });

  test('shooting → ingesting is legal', () => {
    assert.ok(isTransitionLegal('shooting', 'ingesting'));
  });

  test('editing → internal_review is legal', () => {
    assert.ok(isTransitionLegal('editing', 'internal_review'));
  });

  test('internal_review → chase_review is legal (escalation path)', () => {
    assert.ok(isTransitionLegal('internal_review', 'chase_review'));
  });

  test('revisions → editing is legal', () => {
    assert.ok(isTransitionLegal('revisions', 'editing'));
  });

  test('delivered → archived is legal', () => {
    assert.ok(isTransitionLegal('delivered', 'archived'));
  });

  test('on_hold → prep / shooting / editing all legal', () => {
    assert.ok(isTransitionLegal('on_hold', 'prep'));
    assert.ok(isTransitionLegal('on_hold', 'shooting'));
    assert.ok(isTransitionLegal('on_hold', 'editing'));
  });
});

describe('job-lifecycle — illegal transitions are rejected', () => {
  test('intake → conforming is illegal (cannot skip prep/shoot/edit)', () => {
    assert.ok(!isTransitionLegal('intake', 'conforming'));
  });

  test('shooting → delivered is illegal (cannot skip ingest/edit)', () => {
    assert.ok(!isTransitionLegal('shooting', 'delivered'));
  });

  test('archived → editing is illegal (terminal)', () => {
    assert.ok(!isTransitionLegal('archived', 'editing'));
  });

  test('cancelled → anything is illegal (terminal)', () => {
    for (const target of ALL_JOB_STATES) {
      assert.ok(!isTransitionLegal('cancelled', target));
    }
  });

  test('delivered cannot go back to editing', () => {
    assert.ok(!isTransitionLegal('delivered', 'editing'));
  });
});

describe('job-lifecycle — tier rank ordering', () => {
  test('A > B > C', () => {
    assert.ok(tierRank('A') > tierRank('B'));
    assert.ok(tierRank('B') > tierRank('C'));
  });
});

describe('job-lifecycle — tier authorization', () => {
  test('Tier A actor can authorize Tier A transitions', () => {
    assert.ok(actorCanAuthorize('A', 'A'));
    assert.ok(actorCanAuthorize('A', 'B'));
    assert.ok(actorCanAuthorize('A', 'C'));
  });

  test('Tier B actor can authorize Tier B and C, NOT A', () => {
    assert.ok(!actorCanAuthorize('B', 'A'));
    assert.ok(actorCanAuthorize('B', 'B'));
    assert.ok(actorCanAuthorize('B', 'C'));
  });

  test('No actor (null) can only run C transitions', () => {
    assert.ok(!actorCanAuthorize(null, 'A'));
    assert.ok(!actorCanAuthorize(null, 'B'));
    assert.ok(actorCanAuthorize(null, 'C'));
  });
});

describe('job-lifecycle — validateTransition end-to-end', () => {
  test('Tier B actor can move intake → prep on a Tier B job', () => {
    const result = validateTransition({
      from: 'intake',
      to: 'prep',
      actorTier: 'B',
      jobApprovalTier: 'B',
    });
    assert.ok(result.ok);
  });

  test('Tier B actor CANNOT cancel a job that is shooting (requires A)', () => {
    const result = validateTransition({
      from: 'shooting',
      to: 'cancelled',
      actorTier: 'B',
      jobApprovalTier: 'B',
    });
    assert.ok(!result.ok);
    assert.match(result.reason!, /requires A/);
  });

  test('Tier A job CANNOT skip chase_review even if Tier A actor signs', () => {
    // This is the rule that protects "Chase required" jobs from short-circuit.
    const result = validateTransition({
      from: 'internal_review',
      to: 'conforming',
      actorTier: 'A',
      jobApprovalTier: 'A',
    });
    assert.ok(!result.ok);
    assert.match(result.reason!, /chase_review/);
  });

  test('Tier B job CAN go internal_review → conforming with Tier B actor', () => {
    const result = validateTransition({
      from: 'internal_review',
      to: 'conforming',
      actorTier: 'B',
      jobApprovalTier: 'B',
    });
    assert.ok(result.ok);
  });

  test('Tier A job goes internal_review → chase_review → conforming', () => {
    const escalate = validateTransition({
      from: 'internal_review',
      to: 'chase_review',
      actorTier: 'B',
      jobApprovalTier: 'A',
    });
    assert.ok(escalate.ok);

    const ship = validateTransition({
      from: 'chase_review',
      to: 'conforming',
      actorTier: 'A',
      jobApprovalTier: 'A',
    });
    assert.ok(ship.ok);
  });

  test('chase_review → conforming requires Tier A actor', () => {
    const result = validateTransition({
      from: 'chase_review',
      to: 'conforming',
      actorTier: 'B',
      jobApprovalTier: 'A',
    });
    assert.ok(!result.ok);
    assert.match(result.reason!, /requires A/);
  });

  test('Automation (null actor) can run revisions → editing (Tier C)', () => {
    const result = validateTransition({
      from: 'revisions',
      to: 'editing',
      actorTier: null,
      jobApprovalTier: 'B',
    });
    assert.ok(result.ok);
  });

  test('Automation cannot authorize a Tier B transition', () => {
    const result = validateTransition({
      from: 'editing',
      to: 'internal_review',
      actorTier: null,
      jobApprovalTier: 'B',
    });
    assert.ok(!result.ok);
  });

  test('Cannot transition out of a terminal state (archived)', () => {
    const result = validateTransition({
      from: 'archived',
      to: 'editing',
      actorTier: 'A',
      jobApprovalTier: 'A',
    });
    assert.ok(!result.ok);
    assert.match(result.reason!, /Illegal/);
  });

  test('Tier required for delivered → archived is C (automation)', () => {
    assert.equal(tierFor('delivered', 'archived'), 'C');
  });
});
