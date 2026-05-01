# Workflows

Canonical home for documented processes across the MBT ecosystem. Every workflow has two layers:

1. **Human-readable SOP** — markdown doc here, polished webpage on the live site at `/workflows/<slug>`.
2. **Machine-parseable spec** — structured front-matter (YAML) at the top of each doc capturing `inputs`, `outputs`, `triggers`, `owner`, `state_machine`, and `automation_hooks` so robots can act on it.

## Folder structure

```
docs/workflows/
├── README.md                    ← this file
├── drafts/                      ← router-generated, not yet reviewed
│   └── <slug>.md
├── accepted/                    ← passed human review, authoritative
│   └── <slug>.md
└── archive/                     ← deprecated workflows, kept for history
    └── <slug>.md
```

## How a workflow gets created

1. **Run the generator.** `npx tsx scripts/generate-workflow.ts <slug> "<description>"`. The generator calls the AI router (`apps/web/lib/ai-models.ts`) with role=`editorial`, primary model Claude Sonnet, fallback to Gemini Pro. Output lands in `docs/workflows/drafts/<slug>.md`.
2. **Human review.** Chase or the workflow's owner reads the draft, edits, marks it accepted.
3. **Promote.** Move from `drafts/` → `accepted/`. Update `/workflows/index.html` to link to it with the `web` badge instead of `draft`.
4. **Test.** Each accepted workflow gets a test fixture (or live exercise) before it's used to drive automation. Test passing = the workflow is real, not theory.
5. **Wire automation.** Use the front-matter `automation_hooks` field to wire any state transitions into Asana, Postiz, Sanity webhooks, Studio C job lifecycle, etc.

## Front-matter schema

Every workflow doc starts with YAML front-matter:

```yaml
---
slug: card-to-cloud-ingest
title: Card-to-Cloud Ingest
status: draft | accepted | archived
owner: miles@chasepierson.tv
category: production | onboarding | operations | brand | finance
human_readable: true
machine_parseable: true
last_reviewed: 2026-05-01
inputs:
  - name: card_label
    type: string
  - name: shoot_date
    type: date
outputs:
  - name: ingest_record_id
    type: string
triggers:
  - shoot_complete
state_machine:
  - intake → verifying_checksum
  - verifying_checksum → uploading
  - uploading → complete | failed
automation_hooks:
  - on_complete: post_to_asana
  - on_failed: page_chase
---
```

## Why router-driven generation

We have ~50 processes that need formal SOPs. Hand-writing them is months of work. The router can generate solid first drafts in minutes; humans review and accept. The router is for grunt work, humans are for taste, legal, and final acceptance — same rule as everywhere else in MBT.

## Honesty rule

A draft is NOT authoritative. The `/workflows` resource center marks drafts explicitly. Don't operate from a draft. Wait for human review.
