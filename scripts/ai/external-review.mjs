#!/usr/bin/env node
// scripts/ai/external-review.mjs
//
// Send a comprehensive context package of the MBT codebase + docs to
// Gemini 2.5 Pro (or 3.1 Pro) via Vertex AI and receive a
// top-to-bottom review. Saves the review to docs/operations/REVIEW_BY_GEMINI_<date>.md.
//
// This uses the same GOOGLE_APPLICATION_CREDENTIALS_JSON + Vertex API
// endpoint as scripts/ai/gemini-batch.mjs. No new secrets needed.
//
// Usage:
//   node scripts/ai/external-review.mjs
//   node scripts/ai/external-review.mjs --model=gemini-2.5-pro
//   node scripts/ai/external-review.mjs --dry-run     # report only, no Gemini call

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
dotenv.config({ path: path.join(REPO_ROOT, 'apps/web/.env.local') });

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const MODEL = args.find((a) => a.startsWith('--model='))?.split('=')[1] ?? 'gemini-2.5-pro';
const VERTEX_PROJECT_ID = process.env.VERTEX_PROJECT_ID || 'bigmuddy-ff651';
const VERTEX_LOCATION = 'us-central1';

// Files to include in the review context. Most-important stuff first.
const INCLUDE_FILES = [
  // Business context
  'docs/BUSINESS_ARCHITECTURE.md',
  'docs/THE_STORY.md',
  'docs/SOP_PARALLEL_BUILD.md',
  'CLAUDE.md',

  // Schema (the heart of it)
  'packages/database/prisma/schema.prisma',

  // 7 module READMEs
  'packages/modules/commerce/README.md',
  'packages/modules/booking/README.md',
  'packages/modules/finance/README.md',
  'packages/modules/events/README.md',
  'packages/modules/broadcast/README.md',
  'packages/modules/social/README.md',
  'packages/modules/content-creation/README.md',

  // All module source
  'packages/modules/commerce/index.ts',
  'packages/modules/commerce/src/types.ts',
  'packages/modules/commerce/src/plans.ts',
  'packages/modules/commerce/src/subscriptions.ts',
  'packages/modules/commerce/src/products.ts',
  'packages/modules/commerce/src/orders.ts',
  'packages/modules/commerce/src/checkout.ts',
  'packages/modules/commerce/src/webhooks.ts',
  'packages/modules/booking/index.ts',
  'packages/modules/booking/src/types.ts',
  'packages/modules/booking/src/resources.ts',
  'packages/modules/booking/src/bookings.ts',
  'packages/modules/booking/src/tickets.ts',
  'packages/modules/booking/src/quotes.ts',
  'packages/modules/finance/index.ts',
  'packages/modules/finance/src/types.ts',
  'packages/modules/finance/src/engagements.ts',
  'packages/modules/finance/src/buckets.ts',
  'packages/modules/finance/src/mrr.ts',
  'packages/modules/finance/src/pnl.ts',
  'packages/modules/events/index.ts',
  'packages/modules/events/src/types.ts',
  'packages/modules/events/src/bus.ts',
  'packages/modules/events/src/publish.ts',
  'packages/modules/events/src/register.ts',
  'packages/modules/events/src/isolation.ts',
  'packages/modules/events/src/dispatcher.ts',
  'packages/modules/events/src/pgboss-adapter.ts',
  'packages/modules/broadcast/index.ts',
  'packages/modules/broadcast/src/types.ts',
  'packages/modules/broadcast/src/podcast.ts',
  'packages/modules/broadcast/src/broadcasts.ts',
  'packages/modules/broadcast/src/clips.ts',
  'packages/modules/broadcast/src/buzzsprout.ts',
  'packages/modules/broadcast/src/rss.ts',
  'packages/modules/broadcast/src/agent-protocol.ts',
  'packages/modules/social/index.ts',
  'packages/modules/social/src/types.ts',
  'packages/modules/social/src/voice-router.ts',
  'packages/modules/social/src/publisher.ts',
  'packages/modules/content-creation/index.ts',
  'packages/modules/content-creation/src/types.ts',
  'packages/modules/content-creation/src/entity-resolver.ts',
  'packages/modules/content-creation/src/immich-client.ts',
  'packages/modules/content-creation/src/templates.ts',
  'packages/modules/content-creation/src/sanity-writer.ts',
  'packages/modules/email/index.ts',
  'packages/modules/email/src/types.ts',
  'packages/modules/email/src/send.ts',
  'packages/modules/email/src/templates.ts',

  // Critical apps/web files
  'apps/web/middleware.ts',
  'apps/web/config/tenants.ts',
  'apps/web/config/domain-routes.ts',
  'apps/web/lib/ai-models.ts',
  'apps/web/lib/admin-auth.ts',
  'apps/web/lib/page-content.ts',

  // Sanity schemas
  'apps/web/sanity/schemas/index.ts',
  'apps/web/sanity/schemas/contentTemplate.ts',
  'apps/web/sanity/schemas/pageContent.ts',
  'apps/web/sanity/schemas/podcastEpisode.ts',
  'apps/web/sanity/schemas/magazineIssue.ts',
  'apps/web/sanity/schemas/showEvent.ts',
  'apps/web/sanity/schemas/staff.ts',
  'apps/web/sanity/schemas/partnerArtist.ts',
  'apps/web/sanity/schemas/pressRelease.ts',
  'apps/web/sanity/schemas/faq.ts',

  // Key API routes
  'apps/web/app/api/commerce/webhook/route.ts',
  'apps/web/app/api/commerce/plans/route.ts',
  'apps/web/app/api/commerce/subscriptions/checkout/route.ts',
  'apps/web/app/api/commerce/subscriptions/[id]/cancel/route.ts',
  'apps/web/app/api/booking/quotes/route.ts',
  'apps/web/app/api/booking/tickets/scan/route.ts',
  'apps/web/app/api/events/worker/route.ts',
  'apps/web/app/api/events/publish/route.ts',
  'apps/web/app/api/wizard/context/route.ts',
  'apps/web/app/api/wizard/generate/route.ts',
  'apps/web/app/api/wizard/save/route.ts',
  'apps/web/app/api/podcast/rss/[show]/route.ts',
  'apps/web/app/api/cron/podcast-sync/route.ts',

  // Voice docs (all 8 — important for review)
  'docs/voice/big-muddy-inn.md',
  'docs/voice/big-muddy-magazine.md',
  'docs/voice/big-muddy-touring.md',
  'docs/voice/big-muddy-records.md',
  'docs/voice/big-muddy-radio.md',
  'docs/voice/chase-pierson-photography.md',
  'docs/voice/tuthill-design.md',
  'docs/voice/studio-c.md',

  // Ops runbooks
  'docs/operations/ENVIRONMENT_VARIABLES.md',
  'docs/operations/ARCHITECTURE_OVERVIEW.md',
  'docs/operations/MULTI_TENANT_DEVELOPER_GUIDE.md',
  'docs/operations/SECURITY_MODEL.md',
  'docs/operations/DEPLOY_ROLLBACK_RUNBOOK.md',
  'docs/operations/DATABASE_MIGRATION_RUNBOOK.md',
  'docs/operations/INCIDENT_RESPONSE_RUNBOOK.md',
  'docs/operations/STRIPE_WEBHOOK_EVENTS.md',
  'docs/operations/TENANT_PROVISIONING_RUNBOOK.md',

  // Plans (to check what was promised vs built)
  'docs/plans/BLOCK_4_BROADCAST_SOCIAL.md',
  'docs/plans/BLOCK_5_COORDINATION_EVENT_BUS.md',
  'docs/plans/BLOCK_6_CONTENT_CREATION_WIZARD.md',

  // The review prompt itself
  'docs/operations/GEMINI_TOP_TO_BOTTOM_REVIEW_PROMPT.md',
];

// Parse GOOGLE_APPLICATION_CREDENTIALS_JSON
const credsRaw = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
if (!DRY_RUN && !credsRaw) {
  console.error('ERROR: GOOGLE_APPLICATION_CREDENTIALS_JSON not set');
  process.exit(1);
}

async function getAuth() {
  const fixed = credsRaw
    .replace(/\r\n/g, '\\n')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
  const creds = JSON.parse(fixed);
  return new GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
}

async function buildContext() {
  const sections = [];
  let totalChars = 0;
  let loaded = 0;
  let missing = 0;

  for (const relPath of INCLUDE_FILES) {
    const fullPath = path.join(REPO_ROOT, relPath);
    try {
      const content = await fs.readFile(fullPath, 'utf8');
      sections.push(`\n\n# === FILE: ${relPath} ===\n\n${content}`);
      totalChars += content.length;
      loaded++;
    } catch {
      missing++;
    }
  }

  console.log(`Assembled context: ${loaded}/${INCLUDE_FILES.length} files loaded (${missing} missing)`);
  console.log(`Total chars: ${totalChars.toLocaleString()} (~${Math.round(totalChars / 4).toLocaleString()} tokens)`);
  return sections.join('');
}

const REVIEW_PROMPT = `You are doing a top-to-bottom independent review of the MBT (Measurably Better Things LLC) platform — a multi-tenant Next.js 14 / Prisma / Sanity / Stripe monorepo that powers a media-hospitality ecosystem anchored on the Mississippi corridor with a Hudson Valley node.

In the last 48 hours a partner AI agent ("Cos" — Claude Code) shipped ~55,000 lines across 45+ commits. I want you to review independently — code, schema, docs, seed data, operational choices, security, business logic consistency — and flag everything questionable.

Find the FILES YOU NEED below. Each file is prefixed with "# === FILE: path ===" so you can quote paths in your findings.

## What I want you to deliver

A review document structured as:

# MBT Platform — Independent Review

## Executive summary
(3-5 sentences. Is the platform in shippable shape? Blocking issues? Soft concerns? Be honest.)

## Top 10 findings (ranked by severity)
For each:
- **Severity** (CRITICAL / HIGH / MEDIUM / LOW / COSMETIC)
- **Category** (security / schema / code / docs / business logic / operational)
- **File reference** (path/to/file.ts:line)
- **What's wrong**
- **Why it matters**
- **Recommended fix**
- **Estimated effort** (hours / days)

## Per-axis findings
Detailed findings per axis (Code Quality, Database Schema, Multi-Tenant Isolation, Business Logic Consistency, Documentation Accuracy, Seed Data Quality, Operational Readiness, Missing Pieces).

## What was done well
Acknowledge genuinely good decisions. No boosterism — only mention things that are non-obvious or actually hard.

## What would I do differently
Your recommendations if starting over with the same constraints.

## Approval matrix
For each major subsystem, state: SHIP / FIX FIRST / BLOCK. Subsystems: Commerce, Booking, Finance, Events, Broadcast, Social, Content Creation, Email, Admin UI, Customer Pages, Docs, Seed Data, Deploy + Migration, Tenant Provisioning, Security Model.

## Open questions
Things you couldn't answer from the repo alone.

Be honest. Be specific. File + line references are non-negotiable. Skip positive review of things that are merely OK — focus on actionable deltas. Aim for 5,000-8,000 words.

## Critical rules
- No marketing-speak. No "thrilled" / "exciting" / "comprehensive".
- If you flag something CRITICAL, back it with a reproduction path.
- Use the exact path format shown in file headers — the partner needs to navigate to it.
- Don't defer — if you don't know something, say so in Open Questions.

## The codebase starts below.
`;

async function callGeminiPro(prompt) {
  const auth = await getAuth();
  const client = await auth.getClient();
  const token = (await client.getAccessToken()).token;
  const endpoint = `https://${VERTEX_LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT_ID}/locations/${VERTEX_LOCATION}/publishers/google/models/${MODEL}:generateContent`;

  console.log(`\nCalling ${MODEL} at ${VERTEX_LOCATION}...`);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 65536,
        temperature: 0.3,
      },
    }),
    signal: AbortSignal.timeout(600_000),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const usage = data.usageMetadata || {};
  return {
    text,
    promptTokens: usage.promptTokenCount || 0,
    completionTokens: usage.candidatesTokenCount || 0,
    totalTokens: usage.totalTokenCount || 0,
  };
}

async function main() {
  const start = Date.now();
  console.log(`\n=== MBT External Review ===`);
  console.log(`Model: ${MODEL}`);
  console.log(`Mode:  ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`);

  const context = await buildContext();
  const fullPrompt = REVIEW_PROMPT + context;

  console.log(`Full prompt size: ${fullPrompt.length.toLocaleString()} chars / ~${Math.round(fullPrompt.length / 4).toLocaleString()} tokens`);

  if (DRY_RUN) {
    console.log(`\nDry run complete. Would send ~${Math.round(fullPrompt.length / 4).toLocaleString()} tokens to ${MODEL}.`);
    return;
  }

  const result = await callGeminiPro(fullPrompt);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log(`\nResult:`);
  console.log(`  Elapsed: ${elapsed}s`);
  console.log(`  Input tokens:  ${result.promptTokens.toLocaleString()}`);
  console.log(`  Output tokens: ${result.completionTokens.toLocaleString()}`);
  console.log(`  Total tokens:  ${result.totalTokens.toLocaleString()}`);
  console.log(`  Output chars:  ${result.text.length.toLocaleString()}`);

  const dateStr = new Date().toISOString().slice(0, 10);
  const outPath = path.join(REPO_ROOT, `docs/operations/REVIEW_BY_GEMINI_${dateStr}.md`);

  const header = `<!--
  MBT Platform — Independent Review by ${MODEL}
  Generated: ${new Date().toISOString()}
  Model: ${MODEL}
  Input tokens: ${result.promptTokens.toLocaleString()}
  Output tokens: ${result.completionTokens.toLocaleString()}
  Elapsed: ${elapsed}s
-->

`;

  await fs.writeFile(outPath, header + result.text, 'utf8');
  console.log(`\n✓ Review written to ${path.relative(REPO_ROOT, outPath)}`);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
