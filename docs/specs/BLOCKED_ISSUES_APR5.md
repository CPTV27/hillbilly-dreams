# Blocked Issues Register (April 5, 2026)

*Note: Due to GitHub CLI EPERM configuration blocks on the host sandbox, the agent swarm is unable to comment directly on the following issues. They are formally documented as BLOCKED below.*

### Issue #86 — Canva Business Setup
**Status:** BLOCKED
**Reason:** Agent swarm lacks access to the HDI Canva Business Account credentials. Chase must manually provision API access, configure the team seats, and align the billing card.

### Issue #82 — Canva/Miro Export
**Status:** BLOCKED
**Reason:** Requires manual human export of existing visual assets from Chase's private workspace. The agents cannot scrape the authenticated Miro board or download the Canva templates.

### Issue #75 — Tuthill Spatial Scanning
**Status:** BLOCKED
**Reason:** Physical hardware constraint. The Matterport Pro3 LiDAR scanner is required to physically map the architecture and run the S2P loop. The process cannot progress digitally until physical deployment.

### Issue #56 — Kiosk Hardware
**Status:** BLOCKED
**Reason:** Hardware constraint. Procurement and physical configuration of the iPad/Surface enclosures for the walk-in DSD portals must be handled by Chase/Elijah directly in the physical realm.

### Issue #53 — Canva Brand Integration
**Status:** BLOCKED
**Reason:** Lacking Canva Developer API tokens. Until Chase sets up the app inside Canva's developer portal, the Next.js platform cannot push our 12-brand hex codes and typography automatically into the Canva tenant.

### Issue #78 — Facebook OAuth Connect
**Status:** BLOCKED
**Reason:** META_APP_ID and META_APP_SECRET are missing from the environment variables.

### Issue #68 & #55 — Stripe Connect webhooks & commission routing
**Status:** BLOCKED
**Reason:** STRIPE_SECRET_KEY is missing from the environment variables.

### Issue #64 — Stale dependencies (Dependabot)
**Status:** BLOCKED
**Reason:** The sandbox agent environment lacks GitHub CLI permissions to pull, view, or merge Dependabot pull requests.
