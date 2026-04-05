# Social Broadcast Architecture

## Native Publisher System
Our broadcast ecosystem relies on a 100% native publisher stack without an external reliance on software like Postiz.
- **Location:** Managed under `lib/social-publisher.ts`.
- **Integrations:** Facebook is actively implemented. Instagram (IG) and Google Business Profile (GBP) exist as stubbed API methods intended for future expansion.

## Publishing Pipeline Workflow
1. **Creation:** Content operates out of the Editorial Bureau.
2. **Database Asset:** Material is staged into a `SocialPost` database record.
3. **Approval:** A human-in-the-loop sign-off flow ensures narrative quality.
4. **Broadcast:** Approved entries enter the publish queue.

## Automation & Authentication
- **Cron Jobs:** The Vercel cron handler automatically triggers the broadcast queue via `vercel.json` and evaluates pending executions strictly every 15 minutes.
- **Facebook OAuth:** The integration sequence for authorization is mapped downstream and specced out inside Issue #78.
