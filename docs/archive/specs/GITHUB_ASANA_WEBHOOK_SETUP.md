# GitHub → Asana webhook — production setup (#92)

**Route:** `POST /api/webhooks/github`  
**Code:** `apps/web/app/api/webhooks/github/route.ts`  
**Asana project:** Hillbilly Dreams Inc — GID **`1213753731475702`**  
**Mapping:** `AgentContext` domain **`asana_sync`**, key **`issue-{number}`**, JSON body stores `asanaGid`.

---

## 1. Vercel environment

| Variable | Purpose |
|----------|---------|
| `GITHUB_WEBHOOK_SECRET` | HMAC key; must match GitHub webhook secret. |
| `ASANA_PAT` **or** `ASANA_ACCESS_TOKEN` | Asana API token with task create/complete on the HDI project. |

## 2. GitHub configuration

1. Repo **Settings → Webhooks → Add webhook** (or org-level webhook for all repos — use repo scope if possible).
2. **Payload URL:** `https://bigmuddytouring.com/api/webhooks/github`  
   (Any production hostname on the same Vercel deployment is valid if DNS points to the app.)
3. **Content type:** `application/json`.
4. **Secret:** generate a random string; paste into Vercel as `GITHUB_WEBHOOK_SECRET`.
5. **Events:** **Issues only** — enable `issues` (delivers `opened`, `closed`, `reopened`, etc.).
6. **Active:** checked.

## 3. Signature verification

GitHub sends header **`X-Hub-Signature-256`**: `sha256=<hex>`.  
The route verifies HMAC-SHA256 of the **raw body** against `GITHUB_WEBHOOK_SECRET`.

## 4. Behavior matrix

| `action` | Asana | DB |
|----------|-------|-----|
| `opened` | `createTask` | Upsert `asana_sync` / `issue-{n}` |
| `closed` | `completeTask` | Update JSON `state` |
| `reopened` | `uncompleteTask` | Update JSON `state` |

Pull requests disguised as issues (`pull_request` on payload) are **skipped**.

## 5. Testing (safe sequence)

1. Create a **test issue** in `CPTV27/hillbilly-dreams`.
2. Confirm task appears in Asana within seconds.
3. Close issue → task completes.
4. Reopen issue → task un-completes.

## 6. Coexistence with cron

`GET /api/cron/sync-github-asana` mirrors issues labeled **`sync-asana`**.  
Webhook handles **all** issues on the repo; avoid duplicate tasks by keeping **one** source of truth — webhook for real-time, cron as backfill if webhook missed (optional).

## 7. Troubleshooting

- **401 Invalid signature** — secret mismatch or body altered by a proxy; ensure no middleware rewrites POST body.
- **503** — missing `GITHUB_WEBHOOK_SECRET` or Asana token in Vercel.
- **500** — check Vercel logs; Asana project GID must be correct.
