# AG Directive: S2PX Asana Integration Mode

## Context
CC has proven the Asana-as-primary-interface pattern on Big Muddy. Tracy and Amy use Asana mobile as their daily driver — tasks, notes, photos, receipts. The ops dashboard is Chase's deeper view with visuals and content packs. The backend is invisible to the team.

Now apply this same pattern to S2PX. The scanning teams, project managers, and field crews should live in Asana. The CFO opens the S2PX dashboard to see numbers. Nobody else needs to touch the backend.

## What to Build

### 1. Asana Tier Detection
Build a utility that detects whether the connected Asana workspace is on Free, Premium, or Business/Enterprise. The S2PX platform should auto-adjust its behavior based on the tier.

**Detection method:** Call `GET /workspaces/{workspace_gid}` — Premium/Business workspaces return additional fields. Alternatively, attempt to create a portfolio or custom field and catch the 402/403 to determine tier.

Cache the tier result. Expose it as `getAsanaTier(): 'free' | 'premium' | 'business'`.

### 2. Asana Basic Mode (Free Tier)
When the workspace is on the free plan:

- **Projects** = one project per client engagement (e.g., "ACME Corp — Phase 1 Scan")
- **Sections** = workflow stages within each project (e.g., "Field Scan", "Processing", "QA", "Delivery")
- **Tasks** = individual deliverables or work items
- **Subtasks** = checklist items within a task
- **Assignee** = team member email
- **Due dates** = milestone dates
- **Comments** = notes, photos, receipts attached to tasks
- **Description** = step-by-step instructions (plain text, stripped HTML)

Limitations to work around:
- No custom fields → encode metadata in task name prefixes: `[SCAN-042] Site Name — Phase`
- No portfolios → use a "master project" with sections per client as an index
- No forms → team submits work via task comments or a simple web form that creates Asana tasks via API
- No rules/automation → S2PX backend handles automation, pushes results to Asana as task updates
- No timeline view → not available, teams use list/board view

### 3. Asana Premium Mode (Premium/Business Tier)
When the workspace is on Premium or higher, unlock additional features:

- **Custom fields** on tasks:
  - `scan_type` (enum: terrestrial, aerial, mobile, handheld)
  - `square_footage` (number)
  - `deliverable_format` (enum: BIM, point_cloud, mesh, 2D_plans)
  - `priority` (enum: standard, rush, critical)
  - `client_id` (text — links back to S2PX client record)
  - `estimated_hours` (number)
  - `actual_hours` (number)
- **Portfolios** → one portfolio per client, projects underneath for each engagement
- **Forms** → intake form for new scan requests that auto-creates a project with templated sections
- **Rules** → auto-assign tasks when moved to a section, auto-set due dates, notify PM on completion
- **Timeline view** → available for project planning
- **Templates** → project templates for common engagement types (single-site scan, multi-phase, ongoing retainer)

### 4. Sync Architecture
The S2PX backend is the source of truth for financials, licensing, and client data. Asana is the source of truth for task status and team activity.

**S2PX → Asana (push):**
- New project created → create Asana project with sections
- New deliverable added → create Asana task in correct section
- Client info updated → update Asana project description
- Invoice generated → add comment to Asana project with invoice summary

**Asana → S2PX (pull/webhook):**
- Task completed → update deliverable status in S2PX DB
- Hours logged (custom field) → feed into S2PX time tracking
- Task comment with photo → store attachment reference in S2PX
- Project completed → trigger S2PX delivery workflow

**Webhook vs polling:** Use Asana webhooks (`POST /webhooks`) if on Premium. Fall back to polling (`GET /tasks?modified_since=`) on Free tier. Poll interval: 5 minutes.

### 5. Team Experience
The goal: a field crew member opens Asana on their phone, sees today's tasks, checks them off, attaches a photo of the scan setup, adds a note about site conditions. They never log into S2PX.

A project manager opens Asana on desktop, sees the board view of all active projects, drags tasks between sections, fills in hours. They might open S2PX once a week to review financials.

The CFO opens S2PX, sees revenue dashboards, utilization rates, project margins. They never open Asana.

### 6. Configuration
Store Asana config in the S2PX settings:

```typescript
interface AsanaConfig {
  enabled: boolean;
  tier: 'free' | 'premium' | 'business';
  pat: string; // encrypted
  workspaceGid: string;
  defaultProjectTemplateGid?: string; // Premium only
  webhookSecret?: string; // Premium only
  syncInterval: number; // minutes, for polling fallback
  fieldMapping: Record<string, string>; // S2PX field → Asana custom field GID
}
```

### 7. Files to Create
- `lib/asana-tier.ts` — tier detection and capability flags
- `lib/asana-sync.ts` — two-way sync engine (extends existing task-sync.ts pattern)
- `lib/asana-config.ts` — configuration management
- `app/api/asana/webhook/route.ts` — incoming webhook handler
- `app/api/asana/sync/route.ts` — manual sync trigger
- `app/settings/asana/page.tsx` — settings UI for connecting Asana workspace

### 8. Reference Implementation
CC already built and deployed this pattern for Big Muddy:
- `apps/web/lib/task-sync.ts` — Asana REST wrapper with workspace GID cache
- `apps/web/app/api/ops/tasks/sync-asana/route.ts` — bulk sync endpoint
- 42 tasks synced with sections, due dates, and full guide content in notes
- Sections used as session/category grouping within a single project

Adapt this for S2PX with the tier-aware enhancements above.

### 9. Custom Workspaces per User
Every user gets their own custom workspace — not just a role-based view, but a space they can personalize.

**Template options on first login:**
- Field Crew — board view focused on today's scans, big photo upload button, checklist-first
- Project Manager — timeline + board hybrid, multi-project overview, hours tracking
- QA Reviewer — comparison views, markup tools, delivery checklists
- Executive — numbers dashboard, utilization charts, margin summaries

**Style options:**
- Each user picks a visual theme during onboarding (same pattern as Big Muddy's interfaceTheme: futuristic/retro/minimal)
- S2PX can offer construction-industry-appropriate themes: Blueprint, Field, Industrial, Clean
- Theme applies CSS custom properties (same deep token system CC built for Big Muddy ops)

**Camera-to-style pipeline:**
- User takes a photo of anything — a scan setup, a receipt, a whiteboard, site conditions
- Photo uploads to their Asana task as an attachment AND syncs to S2PX storage
- S2PX auto-processes the image:
  - Receipts → OCR extraction → expense line item created
  - Site photos → auto-tagged with project/location metadata, stored in project gallery
  - Whiteboard → OCR + cleanup → converted to task notes
  - Scan QA screenshots → attached to the deliverable record
- The workspace displays these photos in the user's chosen style — not raw uploads, but styled cards that match their theme

**Implementation:**
- `app/workspace/[userId]/page.tsx` — personalized workspace shell
- `lib/photo-pipeline.ts` — classify uploaded image (receipt/site/whiteboard/scan), route to appropriate processor
- `lib/ocr-service.ts` — Google Cloud Vision or similar for receipt/whiteboard extraction
- Store workspace preferences in User model: `workspaceTemplate`, `workspaceTheme`, `workspaceLayout`

### 10. Agents as Asana Users
CC, AG, Perplexity, and any future agents should appear in Asana as team members — not bots, not integrations, but users with their own task lists.

**How it works:**
- Each agent gets an Asana account (e.g., `cc@thebigmuddyinn.com`, `ag@thebigmuddyinn.com`)
- Tasks assigned to agents show up in their Asana profile like any human's tasks
- When an agent starts work, it posts a comment: "Working on this now"
- When it finishes, it posts the result as a comment (with attachments if relevant) and marks the task complete
- If blocked, it posts a comment explaining why and reassigns to Chase or the appropriate human
- Long-running tasks (builds, research, content generation) post progress updates as comments

**From Chase's perspective:** Open Asana, see the board. Tracy is on CloudBeds pricing. Amy is on Instagram. CC is on the SEO fix. AG is on brand themes. All in the same view. No distinction between human and agent work items.

**Implementation:**
- Create Google Workspace accounts for agents under the bigmuddyinn.com domain
- Invite those accounts to the Asana workspace
- Store agent Asana member GIDs in config
- Agent task pickup: poll for tasks assigned to agent's GID, or use webhooks
- Agent task completion: PATCH task status + POST comment with results
- The agent orchestration layer (`.agents/` protocol) maps to Asana task lifecycle

## Success Criteria
- [ ] `getAsanaTier()` correctly detects Free vs Premium vs Business
- [ ] Basic mode creates projects/sections/tasks on Free tier without errors
- [ ] Premium mode creates custom fields, portfolios, and forms when available
- [ ] Field crew can complete a full workday using only Asana mobile
- [ ] CFO can see project financials without opening Asana
- [ ] Two-way sync keeps Asana and S2PX in agreement within 5 minutes
