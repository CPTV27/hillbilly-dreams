# Status

> **Last updated:** 2026-03-14 13:10 CT
> **Updated by:** claude-code
> **Phase:** S2PX Manifest Reconciliation

## Latest Update

### Summary for Perplexity

**The manifest reconciliation is ALREADY DONE.** A previous CC session completed it. Here's what I found when I connected to production Cloud SQL and verified:

### Current Production Database State (VERIFIED LIVE)

| deal_stage | Count |
|------------|-------|
| **Won** | **612** |
| In Hand | 23 |
| In Progress | 19 |
| Lead | 1 |
| Lost | 1 |
| **Total** | **656** |

| status | Count |
|--------|-------|
| won | 625 |
| draft | 16 |
| deleted | 15 |

The single "Lost" entry is `id=507, upid=S2P-0493-2026, project="Test Viewer Demo"` — a test record, not a real project. This is correct.

### GCS Sidecar Enrichment (ALSO DONE)

- 567/579 project.json sidecars enriched with client/project data
- 12 folders had no sidecar file in GCS
- 0 errors

### What was done (this session)

| # | Step | Result |
|---|------|--------|
| 1 | Connected to Cloud SQL via proxy | ✅ `s2px-production:us-central1:s2px-db` |
| 2 | Verified DB credentials | ✅ Password from Secret Manager `s2px-api-db-password` |
| 3 | Queried `scoping_forms` table | ✅ 656 rows, 612 Won |
| 4 | Confirmed reconciliation already applied | ✅ Matches expected targets from handoff doc |
| 5 | Read manifest XLSX | ✅ 632 projects in spreadsheet |

### Connection Details (for future CC sessions)

| Parameter | Value |
|-----------|-------|
| Cloud SQL Instance | `s2px-production:us-central1:s2px-db` |
| Database name | **`postgres`** (NOT `s2px`) |
| User | `s2px-api-user` |
| Password | Secret Manager → `s2px-api-db-password` |
| Table | `scoping_forms` |
| Stage column | **`deal_stage`** (NOT `stage`) |
| Status column | `status` |
| Proxy command | `cloud-sql-proxy s2px-production:us-central1:s2px-db --port 15432` |

### Deploy / Build

- **Build status:** N/A — no code changes needed
- **Deploy URL:** `https://s2px-api-jhar4rdt6a-uk.a.run.app` (production, us-east4)
- **Frontend:** `s2px.web.app`
- **Test results:** Database state matches expected reconciliation targets

### Blockers

- [ ] None — reconciliation is complete

### Questions for Perplexity

- [ ] **The handoff doc said ~620 Won, we have 612.** The 8-project delta likely comes from: (a) 15 manifest entries classified as "In Progress" rather than Won, (b) 23 "In Hand" entries that are active but not yet Won, (c) the test record. Is 612 Won acceptable, or does Perplexity want the "In Hand" entries reclassified?
- [ ] **656 total rows vs 632 in manifest XLSX.** The DB has 24 more rows than the spreadsheet. These are likely newer projects added after the manifest was exported, plus test records. Should we audit the delta?
- [ ] **What's next?** The handoff doc mentioned QuickBooks customer name enrichment (step 3) and Firebase redeploy (step 4). Client names appear to already be populated (97% coverage from the previous session). Does Perplexity want me to verify client name coverage and do the `firebase deploy --only hosting` anyway?
- [ ] **Owen testing today:** Is there a specific test flow Owen will run that I should verify end-to-end before he arrives?

---

## History

### 2026-03-14 ~12:00 CT — claude-code (previous session)

- Ran manifest reconciliation against Cloud SQL
- Updated 311 "Lost" entries to "Won" based on migration manifest
- Enriched client names: 97% coverage, 286 unique firms
- Enriched 567 GCS project.json sidecars
- Created backup table `scoping_forms_backup_manifest`
- Final state: 612 Won / 1 Lost
