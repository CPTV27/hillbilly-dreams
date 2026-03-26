# Prompt for Agent: Create S2PX/Scan2Plan Handoff Package for Elijah

## Task
Create a complete handoff document that Chase can give to Elijah Tuttle so he can independently operate and maintain the Scan2Plan CPQ system. This should be everything Elijah needs to pick it up and run with it — accounts, credentials, architecture, and what's where.

## What to Research and Document

### 1. GitHub Repository
- Repo: CPTV27/S2PX (private) — NOT being transferred. Code stays with Chase.
- Elijah built the CPQ to Owen's spec. Owen paid for it. But the repo is Chase's.
- Elijah does NOT get the codebase. He gets everything else listed below.
- If Elijah needs the CPQ code, that's a separate conversation about licensing.

### 2. Google Cloud Console
Search for ALL GCP projects related to Scan2Plan/S2PX:
- `s2px-production` (chase@scan2plan.io) — the main S2PX project
- Any other projects with "s2px" or "scan2plan" in the name
- Document for each: project ID, region, services enabled, billing status

### 3. Google Cloud Storage
- List all GCS buckets on the s2px-production project
- Document what's in each bucket (scan data, deliverables, assets)
- Note the storage class and any lifecycle policies
- Document the public URLs if any buckets are public

### 4. Firebase Projects
Check these Firebase projects for S2PX-related config:
- hdi-s2px
- s2px-production
- Any others
- Document: hosting URLs, Firestore collections, auth providers, Cloud Functions

### 5. Database
- Where does the S2PX app's database live? (Neon? Cloud SQL? Firestore?)
- Document the connection strings (redacted — Chase will fill in credentials)
- List the main tables/collections and what they store

### 6. API Keys and Secrets
- List ALL secrets that the S2PX app needs to run (names only, not values)
- Where are they stored? (Secret Manager? .env files? Firebase config?)
- Document the env var names so Elijah knows what to set up

### 7. Domains
- scan2plan.io — where is this registered? Where does DNS point?
- s2px-sandbox.web.app — Firebase hosting URL
- Any other S2PX-related domains

### 8. Third-Party Integrations
- QuickBooks Online connection (Owen's account — may need to be disconnected)
- Google Workspace integration
- Stripe (if any)
- Any other APIs the CPQ connects to

### 9. The CPQ Product Features (from Elijah's own summary)
Document what the CPQ does:
- Sales pipeline (Kanban / lead management)
- Deal workspace (full lead detail view)
- CPQ calculator (multi-building, multi-discipline)
- Production pipeline
- Proposal builder + PDF export
- Signature flow + post-signature email notification
- Scan Tech PDF generator
- QuickBooks integration
- Google Drive integration

### 10. What's Chase's vs What Transfers
Clearly delineate:
- ALL CODE stays with Chase. CPTV27/S2PX repo is NOT transferred. CPTV27/hillbilly-dreams is NOT transferred. No codebase leaves.
- GCS scan data / project files = can be transferred to Owen or Elijah (it's their business data)
- GCP project access = can be granted for the s2px-production project specifically
- Domain (scan2plan.io) = can be transferred if desired
- Elijah gets: cloud infrastructure access, data, domain, product documentation, architecture docs
- Elijah does NOT get: source code, GitHub access, any HDX/MB IP

## Output
Save the handoff document to: /Users/chasethis/hillbilly-dreams/docs/S2PX_ELIJAH_HANDOFF.md

Format it as a clean, professional document that Elijah can read and act on. Include:
- Table of contents
- Account/project summary table
- Step-by-step "how to get this running" section
- List of credentials he'll need Chase to provide
- Clear notes on what Chase owns vs what transfers

## Files to Check
- /Users/chasethis/hillbilly-dreams/AGENT_LEDGER.md — has S2PX history
- /Users/chasethis/hillbilly-dreams/_archive/S2PX_BACKEND_PLAN.md — old architecture doc
- /Users/chasethis/hillbilly-dreams/docs/ACCOUNTS.md — account map
- /Users/chasethis/hillbilly-dreams/docs/ENV_VARS.md — env var reference

## GCP Access
Use gcloud CLI (already authenticated as admin@hillbillydreamsinc.com on project hillbillydreams).
For s2px-production project, you may need to switch: `gcloud config set project s2px-production`

## Important Notes
- Owen declined the S2PX deal on March 25, 2026
- All GitHub collaborator access was revoked
- This handoff is so Elijah can take the CPQ and operate it independently
- Chase's HDX/MB platform IP is NOT part of this handoff
- Be explicit about the boundary between Chase's code and the CPQ
