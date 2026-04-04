# Executive Command Interface — Task Spec

Status: Tracked | Owner: Chase (Executive Assignment) | Created: 2026-04-04

---

## Purpose

Mobile-responsive executive layer at `/admin/command` that lets Chase review the product from phone/laptop and issue direct change orders without terminal access. "Bed-mode" usage.

---

## ECI-01: Command Sidebar (Pilot Chat)

**Scope:** Persistent slide-out chat on all `/admin` routes.
**Function:** Text input creates AgentTask and ProductionJob records. Auto-associates with current URL.
**Assign to:** Frontend agent
**Priority:** P1
**Estimate:** 2 sessions

---

## ECI-02: Visual Review Mode (Annotation Layer)

**Scope:** "Review Mode" toggle in global header.
**Features:**
- Click text → "Request Edit" modal
- Click image → "Replace Image" modal (links to VisualAsset library)
- Every submission creates ProductionJob with PENDING_ASSIGNMENT status
**Assign to:** Frontend agent
**Priority:** P2
**Estimate:** 2-3 sessions

---

## ECI-03: Big Board (Task Ledger)

**Scope:** Mobile-optimized table at `/admin/command/tasks`.
**Columns:** Task ID, Component, Status (Draft/AI_Ready/Review/Live), Resource, Comments
**Features:** One-touch status updates, resource reassignment dropdowns
**Assign to:** Frontend agent
**Priority:** P1
**Estimate:** 1-2 sessions

---

## ECI-04: Product Designer (No-Code Config)

**Scope:** GUI at `/admin/command/design` for ProductBundle and ProductFeature management.
**Features:**
- Toggle features on/off per bundle
- Update pricing
- Style Guide preview (colors, typography)
**Assign to:** Frontend + Product agent
**Priority:** P2
**Estimate:** 2-3 sessions

---

## ECI-05: Mobile Optimization

**Scope:** All `/admin` routes mobile-first responsive.
**Constraint:** Inline CSS + CSS custom properties (no Tailwind per project rules).
**Priority:** P1 — applies to all ECI tasks

---

## Build Order

1. ECI-03 (Task Ledger) — see all tasks from phone immediately
2. ECI-01 (Sidebar) — issue commands from any admin page
3. ECI-04 (Product Designer) — configure bundles without code
4. ECI-02 (Review Mode) — annotate live pages

---

## Quickest Path to "Bed-Mode"

1. Deploy Task Ledger at `/admin/command/tasks` — reads AgentTask + ProductionJob tables
2. Access via `192.168.x.x:3000/admin/command` on phone or Cloud Run URL
3. Use Sidebar to create tasks, Ledger to track them
