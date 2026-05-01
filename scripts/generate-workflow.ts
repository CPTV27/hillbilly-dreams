#!/usr/bin/env tsx
/**
 * Workflow generator — calls the MBT AI router to draft a workflow SOP doc.
 *
 * Usage:
 *   npx tsx scripts/generate-workflow.ts <slug> "<one-line description>"
 *
 * Example:
 *   npx tsx scripts/generate-workflow.ts card-to-cloud-ingest \
 *     "Studio C field card offload with checksums to LucidLink"
 *
 * Output: docs/workflows/drafts/<slug>.md
 *
 * Honesty gate: this script writes drafts only. They're not authoritative
 * until a human (Chase or the named owner) reviews and promotes them to
 * docs/workflows/accepted/.
 *
 * Routing: uses role='editorial' which prefers Claude Sonnet for careful
 * structured writing, with Gemini Pro fallback. Keys must be in env:
 * ANTHROPIC_API_KEY, GEMINI_API_KEY (Vertex service account also works).
 *
 * Created: 2026-05-01.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Import the router. Path is relative to repo root since this script lives in /scripts.
import { callAI } from '../apps/web/lib/ai-models';

const PROMPT_TEMPLATE = `You are drafting an internal Standard Operating Procedure (SOP) for the Measurably Better Things platform. The audience is the Studio C operating team and partner-staff at Big Muddy. Your job is to produce a workflow document that is BOTH human-readable and machine-parseable.

Output format requirements:

1. YAML front-matter at the top with these required fields:
   slug, title, status (set to "draft"), owner (set to "TBD — Chase to assign"), category (one of: production, onboarding, operations, brand, finance), human_readable: true, machine_parseable: true, last_reviewed (today's date), inputs (array of { name, type, required }), outputs (array of { name, type }), triggers (array of strings), state_machine (array of "from → to" strings), automation_hooks (array of "on_<event>: <action>" strings).

2. After the front-matter, an H1 with the workflow title.

3. Sections, in this order:
   - Purpose — one paragraph, plain language, what this workflow exists to do.
   - Owner + escalation — who runs it, who escalates when it breaks.
   - Inputs — what's needed to start.
   - Steps — numbered, each step has: who, what, expected outcome, common failure.
   - Outputs — what gets produced.
   - State machine — the explicit transitions in plain English (matching the YAML).
   - Definition of done — a checklist of what "the workflow ran cleanly" means.
   - Automation hooks — what robots can do at which transitions, with the exact event names.
   - Failure modes — top three things that go wrong and how to recover.
   - Test plan — how to verify the workflow works before relying on it.

4. Tone: terse, operational, no marketing puffery. Real names of tools where they exist (Cloudbeds, Asana, LucidLink, Frame.io, Postiz, Sanity, Stripe, Neon Postgres, Vercel, etc.). Match the voice of the existing /docs/operations runbooks.

5. Honesty: where the workflow has unresolved decisions, mark them with "TBD — <what needs to be decided>" rather than inventing answers.

Workflow to draft:
- slug: {{SLUG}}
- description: {{DESCRIPTION}}

Produce ONLY the markdown document. No preamble, no explanation. Begin with the YAML front-matter delimiter \`---\`.`;

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: npx tsx scripts/generate-workflow.ts <slug> "<description>"');
    process.exit(1);
  }

  const slug = args[0];
  const description = args[1];

  if (!/^[a-z0-9-]+$/.test(slug)) {
    console.error(`Slug must be lowercase letters, numbers, and hyphens only. Got: ${slug}`);
    process.exit(1);
  }

  const prompt = PROMPT_TEMPLATE
    .replace('{{SLUG}}', slug)
    .replace('{{DESCRIPTION}}', description);

  console.log(`Generating workflow draft: ${slug}`);
  console.log(`  description: ${description}`);
  console.log(`  routing: role=editorial (Claude Sonnet primary, Gemini Pro fallback)`);
  console.log('');

  const response = await callAI({
    role: 'editorial',
    prompt,
  });

  console.log(`  model used: ${response.label} (${response.model})`);
  console.log(`  output bytes: ${response.text.length}`);

  const outDir = join(process.cwd(), 'docs', 'workflows', 'drafts');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, `${slug}.md`);
  writeFileSync(outPath, response.text, 'utf-8');

  console.log(`  written: ${outPath}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  1. Read the draft and edit. Path: ${outPath}`);
  console.log(`  2. Update front-matter status to "accepted" once reviewed.`);
  console.log(`  3. Move file to docs/workflows/accepted/${slug}.md`);
  console.log(`  4. Update apps/web/public/workflows/index.html to link to it as a "web" badge.`);
}

main().catch((err) => {
  console.error('Generation failed:', err);
  process.exit(1);
});
