# GitHub to Asana Sync 

## Goal
Establish a unilateral pipeline where engineering activity in GitHub automatically populates and resolves business-facing task boards in Asana. This ensures non-technical stakeholders (Amy, Tracy) have full parity on development progress without ever needing to navigate GitHub.

## Architecture Pipeline
`GitHub Webhook` → `Next.js API Route (/api/webhooks/github)` → `Asana API (Task Creation/Resolution)`

## Implementation Spec
1.  **GitHub Configuration:**
    *   Setup an organizational webhook emitting `issues` events (specifically `opened`, `labeled`, and `closed`).
    *   Payload URL points to our platform's Vercel production edge: `https://deepsouthdirectory.com/api/webhooks/github`
    *   Secure via `GITHUB_WEBHOOK_SECRET` hash validation.

2.  **API Route Pseudocode:**
    ```typescript
    export async function POST(req) {
      const payload = await req.json();
      const eventType = req.headers.get('x-github-event');
      // Validate signature
      
      if (eventType === 'issues') {
        const { action, issue } = payload;
        
        if (action === 'opened') {
           // Parse labels -> Asana tags/projects
           // Create Asana Task in "Hillbilly Dreams Inc" project
           // POST https://app.asana.com/api/1.0/tasks
        } 
        else if (action === 'closed') {
           // Lookup Asana Task ID (stored in DB or via fuzzy search)
           // Mark task `completed: true`
           // PUT https://app.asana.com/api/1.0/tasks/{task_id}
        }
      }
      return new Response('OK', { status: 200 });
    }
    ```

3.  **Label Mapping Matrix:**
    *   `P0` → Tag: Urgent / High Priority
    *   `dsd` → Add to "Deep South Directory" portfolio layer
    *   `bearsville` → Add to "Bearsville Creative" portfolio layer

## Environment Variables Required
```env
GITHUB_WEBHOOK_SECRET="<github_generated_crypto_secret>"
ASANA_PAT="<asana_personal_access_token_for_automation_bot>"
ASANA_WORKSPACE_ID="<target_workspace>"
ASANA_HDI_PROJECT_ID="<master_project_id>"
```
