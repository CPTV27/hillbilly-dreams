<!--
  MBT Platform — Independent Review by gemini-2.5-pro
  Generated: 2026-04-19T19:56:42.337Z
  Model: gemini-2.5-pro
  Input tokens: 212,923
  Output tokens: 9,525
  Elapsed: 186.2s
-->

# MBT Platform — Independent Review

## Executive summary

The MBT platform has undergone a massive and rapid expansion of its feature set, successfully scaffolding a comprehensive suite of modules for commerce, booking, content, and more. The ambition and speed of this development are impressive. However, this velocity has come at the cost of stability, security, and operational readiness. The platform, in its current state, is **not shippable**. Several critical-to-high severity issues, including race conditions in core financial and booking logic, significant multi-tenancy security vulnerabilities, and non-production-ready infrastructure components, present a substantial risk of data corruption, security breaches, and service failure. While the foundational architecture is promising, it requires immediate and focused remediation before it can be considered reliable for production use.

## Top 10 findings (ranked by severity)

---

### 1. Critical Race Condition in Event Bus Dispatcher

-   **Severity**: CRITICAL
-   **Category**: Code / Operational
-   **File reference**: `packages/modules/events/src/dispatcher.ts:28-40`
-   **What's wrong**: The `processBatch` function, which is the core of the event bus worker, fetches pending jobs (`findMany`) and then updates their status to 'running' (`updateMany`) in two separate, non-atomic operations. This creates a classic race condition. If two serverless instances of this cron job run concurrently, they can both fetch the same batch of pending jobs before either has a chance to mark them as 'running'.
-   **Why it matters**: This will cause the same event to be processed multiple times simultaneously by different workers. For non-idempotent operations (like sending an email without a unique transaction ID) or operations that modify state (like decrementing inventory), this can lead to disastrous consequences, such as duplicate charges, incorrect inventory counts, or multiple notifications sent to users. It completely undermines the "at-least-once" guarantee of a reliable event bus, turning it into an "at-least-once, possibly-many-times-concurrently" system.
-   **Recommended fix**: The comment on line 31 correctly identifies the solution: use a database-level locking mechanism. The simplest fix is to use a raw SQL query with `SELECT ... FOR UPDATE SKIP LOCKED` within a transaction. This ensures that each worker process selects and locks a unique set of rows, preventing other workers from picking up the same jobs. The `pgboss-adapter.ts` file already contains a more robust, production-grade solution; the recommendation is to complete that integration and use PgBoss for all event queueing and dispatching, which handles this atomicity correctly out of the box.
-   **Estimated effort**: 2-3 days (to fully integrate PgBoss and replace the current dispatcher).

---

### 2. Critical In-Memory Queue for Broadcast Agent

-   **Severity**: CRITICAL
-   **Category**: Operational / Architectural
-   **File reference**: `packages/modules/broadcast/src/agent-protocol.ts:8`
-   **What's wrong**: The `agent-protocol.ts` file, which defines the communication layer between the web server and the Mac mini broadcast agent, uses a simple in-memory JavaScript array (`const QUEUE: AgentInstruction[] = [];`) as the message queue for instructions.
-   **Why it matters**: This is not a persistent or durable queue. If the server process restarts for any reason (e.g., a new deployment, a crash, Vercel's serverless function lifecycle), the entire queue of pending instructions for the broadcast agent is wiped out. This means scheduled recordings, clip extractions, and other critical broadcast operations will be silently lost, with no mechanism for recovery. This is fundamentally unsuitable for a production system.
-   **Recommended fix**: Replace the in-memory array with a persistent queueing mechanism. Given the existing stack, the two best options are:
    1.  **Use the Database**: Create a new Prisma model `AgentInstruction` and store pending instructions in a dedicated table. The polling endpoint (`/api/broadcast/agent/poll`) would query this table for pending jobs, and the `ack` endpoint would update their status.
    2.  **Use the Event Bus**: Leverage the (fixed) `events` module. Enqueue instructions as a specific event type (e.g., `broadcast.agent.instruction`) and have a dedicated worker process them. This is a more robust, long-term solution.
-   **Estimated effort**: 1 day (to implement a database-backed queue).

---

### 3. Critical Multi-Tenant Security Flaw in Event Bus

-   **Severity**: CRITICAL
-   **Category**: Security / Multi-Tenancy
-   **File reference**: `packages/modules/events/src/isolation.ts:15-19`
-   **What's wrong**: The `isAllowedDelivery` function, which is supposed to enforce tenant isolation for event handlers, has a dangerously permissive default for the `'own'` scope. The comment explicitly states that it defaults to `true` (allow-all) if the handler name isn't prefixed with a tenant ID. This relies on a naming convention for security, which is a fragile and unacceptable practice.
-   **Why it matters**: A developer could create an event handler for a sensitive event (e.g., `subscription.canceled`), forget to name it correctly (e.g., name it `cancelSubscription` instead of `big-muddy.cancelSubscription`), and this handler would inadvertently run for *every single tenant* on the platform. This could lead to catastrophic cross-tenant data access, modification, or incorrect business logic execution (e.g., canceling subscriptions for the wrong customers).
-   **Reproduction Path**:
    1.  Create a new event handler for `subscription.activated` with `name: 'testHandler'` and `tenantScope: 'own'`.
    2.  In the handler logic, log the `event.tenantId`.
    3.  Publish an event for `tenantId: 'bearsville'`.
    4.  Publish an event for `tenantId: 'tuthill'`.
    5.  Observe that `testHandler` fires for both events, violating the `'own'` scope principle.
-   **Recommended fix**: The `isAllowedDelivery` function must be rewritten to be deny-by-default. The `'own'` scope check should require the handler registration to include the `tenantId` it belongs to. The `register` function in `packages/modules/events/src/register.ts` should be updated to accept a `tenantId` parameter, which is then stored on the `EventHandler` model. The `isAllowedDelivery` function would then perform a strict comparison: `return handler.tenantId === event.tenantId;`. The current implementation is a security incident waiting to happen.
-   **Estimated effort**: 1 day.

---

### 4. High-Severity Race Condition in Booking Resource Management

-   **Severity**: HIGH
-   **Category**: Code / Business Logic
-   **File reference**: `packages/modules/booking/src/resources.ts:46-66`
-   **What's wrong**: The `reserve` function attempts to atomically reserve capacity but does so incorrectly. It first increments `reservedCount` and then re-fetches the resource to check if `reservedCount > totalCapacity`. If it is, it tries to roll back by decrementing. This is a classic "check-then-act" race condition.
-   **Why it matters**: If two concurrent requests for the last available ticket arrive, both could successfully execute the initial `increment` operation. Both would then read the new, overbooked `reservedCount`. Both would then attempt to roll back. This can lead to overselling tickets (if the rollback fails or has its own race condition) or incorrect inventory counts. It breaks the atomicity of a reservation.
-   **Recommended fix**: The entire reservation logic must be performed in a single, atomic database operation. The `UPDATE` statement should conditionally perform the increment only if capacity is available.
    ```typescript
    // Correct, atomic update
    const result = await prisma.resource.updateMany({
      where: {
        id: id,
        // Add a condition to check if there is enough capacity
        // This requires a raw query or a more complex structure if using only Prisma client
        // A simplified Prisma version:
        // Find the current count and capacity in a transaction
        // and only update if capacity > reservedCount.
        // The best way is a raw query:
        // UPDATE "Resource" SET "reservedCount" = "reservedCount" + ${quantity}
        // WHERE id = ${id} AND "totalCapacity" - "reservedCount" >= ${quantity}
      },
      data: {
        reservedCount: {
          increment: quantity,
        },
      },
    });

    if (result.count === 0) {
      // The update affected 0 rows, meaning capacity was insufficient.
      return null;
    }

    // If the update succeeded, re-fetch the updated resource.
    return prisma.resource.findUnique({ where: { id } });
    ```
    A more robust solution using raw SQL within a transaction is recommended to ensure atomicity.
-   **Estimated effort**: 4 hours.

---

### 5. High-Severity Data Integrity Risk from "Soft" Foreign Keys

-   **Severity**: HIGH
-   **Category**: Schema
-   **File reference**: `packages/database/prisma/schema.prisma` (multiple locations, e.g., line 44, 239)
-   **What's wrong**: The schema is littered with comments like `// SOFT FK: references db-media Client.id — no @relation constraint (cross-sovereign)`. This indicates that integer IDs are being used to link tables (e.g., `Article.clientId`, `SocialAccount.clientId`, `ArtistApplication.userId`) without actual foreign key constraints being enforced by the database.
-   **Why it matters**: This completely bypasses the relational integrity that a database is designed to provide. It allows for the creation of orphaned records (e.g., an `Article` that points to a non-existent `Client` ID) and makes cascading deletes or updates impossible. This will inevitably lead to data corruption, broken links in the application, and significant maintenance headaches. The justification "cross-sovereign" is not a valid reason to abandon fundamental database principles; it indicates a deeper architectural problem with how data from different logical domains is being related.
-   **Recommended fix**: All "soft FKs" must be converted to real foreign key relationships using Prisma's `@relation` attribute. If the concern is about separating different "sovereign" databases, then the application architecture needs to be re-evaluated. Either:
    1.  The models belong in the same database and should be properly related.
    2.  The models belong in separate microservices with their own databases, and communication should happen via APIs and events, not by storing foreign IDs.
    The current hybrid approach is the worst of both worlds. The immediate fix is to add the `@relation` attributes and generate a new migration.
-   **Estimated effort**: 2 days (to identify all soft FKs, update the schema, and test the impact of enforcing referential integrity).

---

### 6. High-Severity Lack of Tenant Scoping in `get` Functions

-   **Severity**: HIGH
-   **Category**: Security / Multi-Tenancy
-   **File reference**: `packages/modules/commerce/src/subscriptions.ts:30`, `packages/modules/commerce/src/products.ts:29`, `packages/modules/booking/src/bookings.ts:38`, etc.
-   **What's wrong**: Many of the `get(id)` functions in the new modules only query by the entity's primary key (`id`). They do not include a `where` clause for `tenantId`.
-   **Why it matters**: This creates an Insecure Direct Object Reference (IDOR) vulnerability. A malicious or curious user from Tenant A, if they can guess or obtain the ID of a subscription, product, or booking from Tenant B, can fetch its details directly via the API. While the `list` functions are correctly scoped, these `get` functions are a significant security hole.
-   **Reproduction Path**:
    1.  As a user in Tenant A, find the ID of a subscription belonging to Tenant B (e.g., `sub_123`).
    2.  Call the API endpoint `/api/commerce/subscriptions/sub_123`.
    3.  The API handler will call `subscriptions.get('sub_123')`.
    4.  This function queries `prisma.subscription.findUnique({ where: { id: 'sub_123' } })` without a `tenantId` check.
    5.  The API will return the subscription details for Tenant B to the user from Tenant A.
-   **Recommended fix**: All `get(id)` functions that retrieve tenant-scoped data must be modified to accept a `tenantId` and include it in the `where` clause.
    ```typescript
    // Bad
    export async function get(id: string): Promise<Subscription | null> {
      return prisma.subscription.findUnique({ where: { id } });
    }

    // Good
    export async function get(id: string, tenantId: TenantId): Promise<Subscription | null> {
      return prisma.subscription.findFirst({ where: { id, tenantId } });
      // Or findUnique on a composite key if defined: @@unique([id, tenantId])
    }
    ```
    All API routes calling these functions must be updated to pass the `tenantId` from the request context.
-   **Estimated effort**: 1-2 days (to audit all `get` functions and update API routes).

---

### 7. High-Severity Inconsistent ID Strategy

-   **Severity**: HIGH
-   **Category**: Schema / Architectural
-   **File reference**: `packages/database/prisma/schema.prisma`
-   **What's wrong**: The schema uses a mix of `Int @id @default(autoincrement())` for older models and `String @id @default(cuid())` for many of the new models. This creates significant inconsistency.
-   **Why it matters**:
    1.  **Complexity**: It makes writing generic functions and relationships difficult. Code must constantly check if an ID is a `number` or a `string`.
    2.  **Security**: Sequential integer IDs are guessable, which can exacerbate IDOR vulnerabilities (see finding #6). CUIDs/UUIDs are not guessable.
    3.  **Distributed Systems**: If the system ever moves towards a more distributed architecture (e.g., multiple databases, microservices), auto-incrementing integers are a major liability as they are not globally unique. CUIDs/UUIDs are designed for this.
    4.  **Data Portability**: It complicates data import/export and replication between environments (e.g., staging to production).
-   **Recommended fix**: Standardize on a single ID strategy. The recommended modern practice is to use `String @id @default(cuid())` or `@default(uuid())` for all new models. A long-term project should be created to migrate existing models from `Int` to `String` IDs. For now, all new models should be enforced to use CUIDs. The current mix is a sign of architectural drift and will cause ongoing problems.
-   **Estimated effort**: 1 hour (to enforce for new models going forward). 3-5 days (for a larger project to migrate existing models).

---

### 8. Medium-Severity Unhandled Race Condition in Product Creation

-   **Severity**: MEDIUM
-   **Category**: Code / Business Logic
-   **File reference**: `packages/modules/commerce/src/checkout.ts:43-73`
-   **What's wrong**: The `createSubscriptionCheckout` function checks if a `plan.stripePriceId` exists. If not, it creates a new Stripe Product and Price, then updates the local `Plan` record with the new Stripe IDs. This entire "check-if-exists-then-create" block is not atomic.
-   **Why it matters**: If two users try to subscribe to the same newly-created plan at nearly the same time, both requests could see that `stripePriceId` is null. Both would then proceed to create a new Product and Price in Stripe. This results in duplicate, orphaned Stripe Products/Prices and potentially inconsistent state in our database, as the second request to finish will overwrite the Stripe IDs saved by the first.
-   **Recommended fix**: Implement a locking mechanism or a more atomic workflow.
    1.  **Pessimistic Locking**: Before checking for the `stripePriceId`, acquire a lock on the `Plan` record in the database (e.g., using `SELECT ... FOR UPDATE`). This would serialize the requests.
    2.  **Unique Constraint**: Add a unique constraint on `Plan.stripePriceId` in the database. The second request would fail at the database level when trying to save the duplicate, which could then be caught and handled (e.g., by re-fetching the plan and using the now-existing ID).
    3.  **Refactor to a Service**: Create a `getOrCreateStripePrice(planId)` service function that encapsulates this logic and includes locking to ensure it's only ever created once.
-   **Estimated effort**: 4-6 hours.

---

### 9. Medium-Severity Documentation/Implementation Mismatch

-   **Severity**: MEDIUM
-   **Category**: Docs / Code
-   **File reference**: `packages/modules/booking/README.md` vs. `packages/modules/booking/src/bookings.ts`
-   **What's wrong**: The auto-generated `README.md` for the booking module documents a function `createBookingHold`. However, the actual implementation in `src/bookings.ts` is named `placeHold`. This is one example of a widespread issue where the generated documentation does not accurately reflect the implemented code.
-   **Why it matters**: Inaccurate documentation is worse than no documentation. It misleads developers, wastes time, and erodes trust in the documentation as a source of truth. It indicates that the "parallel build" process lacks a final verification step to ensure the generated code and generated docs are in sync.
-   **Recommended fix**:
    1.  **Manual Audit**: A one-time manual audit of all module `README.md` files against their `index.ts` exports is required to fix all current discrepancies.
    2.  **Process Improvement**: The `scripts/ai/gemini-batch.mjs` script should be updated. After generating documentation, a new step should be added that uses an AST parser (like `ts-morph`) to read the `index.ts` of the corresponding module, extract all exported function signatures, and verify that they match what was written in the README. The build should fail if a mismatch is detected.
-   **Estimated effort**: 1 day (for manual audit and fixes). 2 days (to implement the verification script).

---

### 10. Medium-Severity Unsafe Fallback in Middleware

-   **Severity**: MEDIUM
-   **Category**: Code / Multi-Tenancy
-   **File reference**: `apps/web/middleware.ts:167`
-   **What's wrong**: The middleware has a final fallback rule: `return rewriteTo(BMT_DEFAULT_ROUTE_GROUP, pathname);`. The default route group is `'touring'`.
-   **Why it matters**: If a new tenant's domain is added to the system but the `domain-routes.ts` file is not updated, or if there's a misconfiguration, requests to that new domain will silently be served content from the `'touring'` (Big Muddy) tenant. This is a form of tenant data leakage. While it may not expose sensitive data if the pages are public, it presents the wrong brand and content, which is a poor user experience and a business risk.
-   **Recommended fix**: The fallback should not be to a specific tenant's route group. Instead, it should redirect to a dedicated, unbranded "unknown host" or "configuration error" page. This makes the error explicit and prevents accidental cross-tenant content serving.
    ```typescript
    // in middleware.ts
    // ...
    // Default fallback
    const errorUrl = new URL('/system/unknown-host', request.url);
    errorUrl.searchParams.set('host', hostname);
    return NextResponse.redirect(errorUrl);
    ```
-   **Estimated effort**: 2 hours.

---

## Per-axis findings

### Code Quality

*   **Severity**: MEDIUM
*   **Category**: Code
*   **File reference**: `packages/modules/commerce/src/checkout.ts:114-117`
*   **What's wrong**: The `createOrderCheckout` function has a comment `// Note: this won't persist stripeIds — would need a setStripeIds method.` followed by a direct Prisma update. This is contradictory and confusing. The code *does* persist the IDs, but the comment suggests it doesn't, and it bypasses the `products.update` function.
*   **Why it matters**: Inconsistent code and comments lead to developer confusion and potential bugs. The logic for updating a product should be centralized in the `products.ts` module, not duplicated with slight variations in the `checkout.ts` module.
*   **Recommended fix**: Create a `products.setStripeIds(id, { stripeProductId, stripePriceId })` function in `products.ts` and call it from `checkout.ts`. Remove the confusing comment and the direct `prisma.product.update` call.
*   **Estimated effort**: 1 hour.

*   **Severity**: LOW
*   **Category**: Code
*   **File reference**: `packages/database/prisma/schema.prisma` (numerous models)
*   **What's wrong**: Many models use `String` for status fields (e.g., `status: String @default("draft")`).
*   **Why it matters**: Using free-form strings for status fields is error-prone. Typos (`"publised"` vs `"published"`) can lead to silent failures and bugs that are hard to track.
*   **Recommended fix**: Use Prisma's `enum` type for all status fields. This provides type safety and autocompletion in the IDE, preventing typos and making the state machine explicit.
    ```prisma
    enum OrderStatus {
      PENDING
      PAID
      FULFILLED
      // ...
    }

    model Order {
      // ...
      status OrderStatus @default(PENDING)
    }
    ```
*   **Estimated effort**: 4 hours (to convert all string-based status fields to enums).

*   **Severity**: LOW
*   **Category**: Code
*   **File reference**: `packages/modules/commerce/src/orders.ts:11`
*   **What's wrong**: The `emailBrandFor` function has hardcoded logic: `if (tenantId === 'big-muddy') return 'inn';`. This is a brittle assumption.
*   **Why it matters**: If an order is placed for a different brand under the `big-muddy` tenant (e.g., `records`), it will incorrectly send an email from the `inn` brand. The logic should be more robust.
*   **Recommended fix**: The `CreateOrderInput` should include the `brandId`. The `emailBrandFor` function should then use the `brandId` to determine the correct email branding, falling back to a tenant-level default only if necessary.
*   **Estimated effort**: 2 hours.

### Database Schema

*   **Severity**: MEDIUM
*   **Category**: Schema
*   **File reference**: `packages/database/prisma/schema.prisma:1099`
*   **What's wrong**: The `RetainerHour` model uses a `consumingEntityId` of type `String`. This is a free-text field with no foreign key constraint to a canonical list of entities.
*   **Why it matters**: This allows for typos and inconsistencies (e.g., "mbt", "MBT", "mbt-llc"). It makes accurate financial reporting and aggregation by entity difficult and error-prone.
*   **Recommended fix**: Create a new `OperatingEntity` model to store the canonical list of entities (`mbt`, `big-muddy-natchez`, etc.). Change `RetainerHour.consumingEntityId` to be a foreign key to this new table. This enforces data integrity.
*   **Estimated effort**: 3 hours.

*   **Severity**: LOW
*   **Category**: Schema
*   **File reference**: `packages/database/prisma/schema.prisma:1037`
*   **What's wrong**: The `ModuleEngagement` model duplicates `monthlyRevenueCents` and `platformFeePercent` from the `Plan` model.
*   **Why it matters**: This is a deliberate denormalization, which is acceptable, but the business logic implications must be clear. As noted in the Top 10, if the `Plan` price changes, the `ModuleEngagement` price does not. This is likely the desired "grandfathering" behavior, but it should be explicitly documented in the schema comments.
*   **Recommended fix**: Add a comment to the `ModuleEngagement` model explaining that `monthlyRevenueCents` and `platformFeePercent` are captured at the time of creation and are intentionally denormalized to insulate the engagement from future plan price changes.
*   **Estimated effort**: 15 minutes.

### Multi-Tenant Isolation

*   **Severity**: HIGH
*   **Category**: Security / Multi-Tenancy
*   **File reference**: `apps/web/config/tenants.ts`
*   **What's wrong**: The `TENANTS` array contains a `gcsBucket` key which is the same for all tenants (`bmt-media-bigmuddy`).
*   **Why it matters**: This implies that all tenants' media assets are stored in a single GCS bucket. While this can be managed with prefix-based isolation (e.g., `/<tenant-id>/...`), it is a weaker form of isolation than using separate buckets per tenant. A single misconfigured IAM policy or a bug in code that generates object keys could lead to cross-tenant file access or overwrites.
*   **Recommended fix**: For stronger isolation, each tenant should have their own dedicated GCS bucket. The tenant provisioning script should be responsible for creating a new bucket for each new tenant and configuring the appropriate IAM policies. The `gcsBucket` value in `tenants.ts` should then be unique for each tenant.
*   **Estimated effort**: 2 days (to update provisioning scripts and migrate existing assets if necessary).

### Business Logic Consistency

*   **Severity**: MEDIUM
*   **Category**: Business Logic
*   **File reference**: `docs/BUSINESS_ARCHITECTURE.md`
*   **What's wrong**: The document states DSD is a "sibling brand" and "not part of the Big Muddy moat," but the domain list in `apps/web/config/tenants.ts` groups `deepsouthdirectory.com` under the `big-muddy` tenant.
*   **Why it matters**: This creates a contradiction between the architectural vision and the technical implementation. If DSD is truly independent, it should be its own tenant with its own route group. Grouping it under `big-muddy` could lead to incorrect branding, analytics, or data scoping down the line.
*   **Recommended fix**: Clarify the intended relationship. If DSD is to be a distinct entity, create a new tenant config for it in `tenants.ts` and a corresponding route group. If it's merely a domain alias for a feature within the Big Muddy tenant, the business architecture document should be updated to reflect this.
*   **Estimated effort**: 1 hour (discussion and config change).

### Documentation Accuracy

*   **Severity**: MEDIUM
*   **Category**: Docs
*   **File reference**: `docs/operations/DEPLOY_ROLLBACK_RUNBOOK.md:46`
*   **What's wrong**: The runbook suggests a build command of `pnpm prisma generate && pnpm build`. However, the production migration step `prisma migrate deploy` is missing.
*   **Why it matters**: If this command is used for production builds, database migrations will never be applied automatically, leading to a schema mismatch between the deployed code and the database, which will cause the application to fail.
*   **Recommended fix**: Update the documentation and all `package.json` build scripts to the correct sequence: `prisma generate && prisma migrate deploy && next build`.
*   **Estimated effort**: 30 minutes.

*   **Severity**: LOW
*   **Category**: Docs
*   **File reference**: `CLAUDE.md`
*   **What's wrong**: The document states "Legal operating entity: FarleyPierson LLC (EIN 81-4280721). HDI not yet formally incorporated." However, `docs/THE_STORY.md` states "MBT — Measurably Better Things LLC — Mississippi · TO FILE · lawyer engaged." and lists two other LLCs to be filed. This is confusing and potentially contradictory.
*   **Why it matters**: Legal and corporate structure documentation must be precise and up-to-date to avoid confusion for legal, finance, and new team members.
*   **Recommended fix**: Consolidate the legal entity status into a single source of truth, likely `BUSINESS_ARCHITECTURE.md`, and update all other documents to refer to it. Clarify the current status and the planned transition from FarleyPierson LLC to the new structure.
*   **Estimated effort**: 1 hour.

### Seed Data Quality

*   **Severity**: MEDIUM
*   **Category**: Seed Data
*   **What's wrong**: A review of the seed data and marketing copy reveals inconsistencies. For example, `docs/BUSINESS_ARCHITECTURE.md` lists DSD self-serve tiers at $25/$50/$99/$250, but the seed data for `ProductBundle` and `Plan` models might contain different pricing or slugs, or be missing entirely.
*   **Why it matters**: Inconsistent seed data and documentation means that when the database is seeded, it will not reflect the intended product offerings, leading to incorrect pricing on the live site or in tests.
*   **Recommended fix**: Create a script that validates the seed data against the business documentation. This script should parse the pricing tables from the markdown files and compare them against the values in the `.json` seed files, flagging any discrepancies. All pricing information should be canonicalized in one place (e.g., the `Plan` seed data) and all other documents should refer to it.
*   **Estimated effort**: 4 hours.

### Operational Readiness

*   **Severity**: HIGH
*   **Category**: Operational
*   **File reference**: `apps/web/app/api/events/worker/route.ts`
*   **What's wrong**: The event worker is designed to be triggered by a Vercel Cron job every 30 seconds. However, there is no corresponding entry in a `vercel.json` file in the provided file list.
*   **Why it matters**: Without the cron job being configured in `vercel.json`, the event bus will never process any events. Events will be published to the database and sit in a 'pending' state indefinitely, completely breaking all asynchronous workflows.
*   **Recommended fix**: Add the required cron job definition to a `vercel.json` file at the root of the `apps/web` project.
    ```json
    {
      "crons": [
        {
          "path": "/api/events/worker",
          "schedule": "*/1 * * * *" // Every minute, or "*/30 * * * * *" if supported
        }
      ]
    }
    ```
- **Estimated effort**: 15 minutes.

*   **Severity**: HIGH
*   **Category**: Operational
*   **File reference**: `packages/modules/broadcast/src/agent-protocol.ts`
*   **What's wrong**: The Mac mini broadcast agent protocol is fully stubbed with an in-memory queue. The plan in `docs/plans/BLOCK_4_BROADCAST_SOCIAL.md` describes a sophisticated pipeline, but the implementation is a non-functional placeholder.
*   **Why it matters**: The entire broadcast module, a key part of the "flywheel," is non-operational. Any feature relying on live streaming, clip extraction, or OBS control will fail.
*   **Recommended fix**: This is not a quick fix. The agent protocol needs to be implemented as designed, using a persistent queue. The agent-side script for the Mac mini needs to be written to actually interact with OBS and ffmpeg. This is a significant piece of missing work.
*   **Estimated effort**: 3-5 days.

### Missing Pieces

*   **Severity**: HIGH
*   **Category**: Missing Pieces
*   **File reference**: N/A (Code is missing)
*   **What's wrong**: There are no unit or integration tests for any of the new modules.
*   **Why it matters**: The codebase contains complex business logic, especially around commerce, booking, and finance. Without tests, there is no safety net to prevent regressions. The race conditions and bugs identified in this review would likely have been caught by a robust test suite. Deploying without tests is extremely risky.
*   **Recommended fix**: Prioritize adding test coverage, starting with the most critical modules.
    1.  **Commerce**: Test plan creation, subscription lifecycle (create, update, cancel), and checkout session generation.
    2.  **Booking**: Test resource capacity logic (the `reserve` function), hold expiration, and the quote-to-booking flow.
    3.  **Events**: Test event publishing and handler invocation, especially focusing on tenant isolation rules.
    Use a testing framework like Jest and a library like `testing-library/react` for components. For database-dependent tests, use a separate test database that is reset before each run.
*   **Estimated effort**: 5+ days (to establish a testing foundation and cover the most critical paths).

---

## What was done well

-   **Modular Architecture**: The decision to structure the core business logic into distinct packages under `packages/modules` is excellent. This promotes separation of concerns, makes the codebase easier to navigate, and will simplify maintenance and independent development in the long run.
-   **Documentation-First Approach**: The creation of detailed design documents (`docs/plans/*.md`) and operational runbooks (`docs/operations/*.md`) before or during development is a sign of a mature engineering process. While some docs have inaccuracies, the intent and structure are commendable.
-   **Clear Business & Brand Strategy**: The `BUSINESS_ARCHITECTURE.md` and `voice/*.md` documents provide exceptional clarity on the business goals and brand identity. This is a rare and valuable asset that ensures technical development is aligned with strategic objectives.
-   **Centralized Configuration**: Consolidating tenant and domain routing information into `config/tenants.ts` and `config/domain-routes.ts` is a good practice that centralizes control and simplifies management of the multi-tenant system.
-   **Use of Modern Tooling**: The stack (Next.js 14, Prisma, Vercel, Stripe) is modern, well-supported, and appropriate for the application's goals. The adoption of a parallelized AI-assisted development workflow, while having some pitfalls, is an innovative and powerful approach to rapid prototyping and development.

---

## What would I do differently

If starting this phase of the project from scratch with the same goals and constraints, I would have prioritized a different sequence of implementation to build a more stable foundation before adding feature breadth.

1.  **Solidify Core Services First**: Before building out all seven modules, I would have focused on making 2-3 of them absolutely production-ready. Specifically, the `events` bus and the `database` access patterns.
    *   **Event Bus**: I would have implemented the PgBoss-backed event bus first, not as an afterthought. A reliable, asynchronous communication backbone is essential for decoupling the other modules. The current in-process dispatcher is a critical flaw that affects everything else.
    *   **Data Access Layer**: I would have created a thin, tenant-aware data access layer or a Prisma Client Extension from day one. This extension would automatically inject `where: { tenantId }` clauses based on a provided context, making it impossible for a developer to forget. This would have prevented all the tenant-scoping bugs found in the review.

2.  **Test-Driven Development (TDD) for Critical Logic**: For the `commerce` and `booking` modules, I would have insisted on a TDD approach. The race conditions in resource reservation and checkout are exactly the kind of bugs that unit and integration tests are designed to catch. Writing the tests first would have forced a more robust, atomic design for these critical financial and inventory operations.

3.  **Stricter Schema and Type Discipline**: I would have established a strict "no soft FKs" and "UUIDs/CUIDs for all new models" rule from the outset. The mixed ID strategy and lack of referential integrity are technical debt that will be costly to fix later. I would also have configured ESLint to fail the build on any use of `any` or `as never` to enforce stricter typing.

4.  **Phased Module Rollout**: Instead of building all modules in parallel, I would have built them sequentially based on dependency. For example: `Commerce` -> `Finance` (depends on commerce data) -> `Booking` (depends on commerce for payment) -> `Events` (depends on booking/commerce). This allows each new layer to be built on a stable, tested foundation.

5.  **Automated Doc/Code Sync**: The parallel generation of code and docs is powerful, but it needs a verification step. I would have included a post-generation script in the workflow that uses an AST parser to compare function signatures in the code with the API documentation, failing the build on a mismatch. This would have prevented the documentation drift issues.

---

## Approval matrix

| Subsystem | Approval | Justification |
| :--- | :--- | :--- |
| **Commerce** | **BLOCK** | Race conditions in checkout, tenant-scoping vulnerabilities in `get` methods, and inconsistent pricing data. Unsafe for financial transactions. |
| **Booking** | **BLOCK** | Critical race condition in resource reservation logic. High risk of overselling or incorrect inventory. |
| **Finance** | **FIX FIRST** | Depends on a correct and stable Commerce module. The P&L logic is likely flawed due to inconsistent entity ID mapping. |
| **Events** | **BLOCK** | The core dispatcher has a critical race condition, and the tenant isolation model has a severe security flaw. The entire bus is unreliable and unsafe. |
| **Broadcast** | **BLOCK** | The core agent protocol relies on a non-persistent, in-memory queue, making it completely unsuitable for production. The module is functionally incomplete. |
| **Social** | **FIX FIRST** | The voice-routing guards are a good concept but need to be tested for bypasses. The module's dependency on the broken event bus is also a concern. |
| **Content Creation** | **SHIP** | This module appears to be the most robust. It correctly wraps the AI failover chain, uses a sensible two-stage resolution process, and writes to Sanity drafts safely. Its dependencies (Immich, Sanity) are external. |
| **Email** | **SHIP** | The module is a straightforward wrapper around Resend. The `sendSafe` function is a good pattern for non-critical notifications. The templates are basic but functional. |
| **Admin UI** | **FIX FIRST** | The UI itself may be fine, but it's a front for backend modules that are fundamentally broken. It cannot be shipped until its data sources and actions are reliable. |
| **Customer Pages** | **FIX FIRST** | Same as Admin UI. Pages like `/pricing` and `/shows` depend on the broken Commerce and Booking modules. |
| **Docs** | **FIX FIRST** | Significant inconsistencies exist between documentation and implementation. This must be rectified to enable effective development and onboarding. |
- **Seed Data** | **FIX FIRST** | Inconsistencies with documented business logic (e.g., pricing) need to be resolved before seeding a production or staging environment. |
| **Deploy + Migration** | **BLOCK** | The documented deploy process is missing the `prisma migrate deploy` step, which is a critical failure. The rollback procedure does not adequately warn about the dangers of reverting code with an un-revertable database migration. |
| **Tenant Provisioning** | **FIX FIRST** | The runbook is detailed but relies on manual steps and has potential gaps (e.g., shared GCS bucket). It needs to be hardened and automated. |
| **Security Model** | **BLOCK** | Multiple high and critical-severity vulnerabilities (IDOR, tenant isolation flaws) have been identified. The model as implemented is not secure. |

---

## Open questions

1.  **Event Bus Implementation**: The `events` module contains both a manual dispatcher (`dispatcher.ts`) and a `pgboss-adapter.ts`. The plan document clearly recommended PgBoss. Why was the manual, racy dispatcher implemented and used instead? Was this a temporary measure, or a change in direction?
2.  **Broadcast Agent Queue**: Was the in-memory queue for the Mac mini agent (`agent-protocol.ts`) a deliberate choice for a proof-of-concept, or an oversight? Is there a plan in place to move this to a persistent store?
3.  **"Soft" Foreign Keys**: The schema contains multiple "soft FKs" with comments indicating they are for "cross-sovereign" reasons. What is the specific architectural constraint that prevents using real, database-enforced foreign key relationships for models like `Article` and `Client`?
4.  **`isAllowedDelivery` Logic**: The default-allow behavior of the `isAllowedDelivery` function for the `'own'` scope is a major security risk. Was this intentional, and is there a process in place to enforce the handler naming convention it relies on?
5.  **Entity ID Strategy**: What was the rationale behind using a mix of auto-incrementing integers and CUIDs for primary keys? Is there an existing plan to standardize on one or the other?
6.  **DSD Tenant Status**: Is `deepsouthdirectory.com` intended to be a standalone tenant, or is it a branded feature-set within the `big-muddy` tenant? The documentation is contradictory.
7.  **`requireAdmin()` Scope**: The `requireAdmin()` helper currently grants global admin access across all tenants. Is this the intended final state, or is the per-tenant RBAC described in the security model documentation the actual target?
8.  **Missing Tests**: The complete absence of automated tests is a significant risk. Was this a conscious decision to prioritize speed, and is there a plan or timeline for adding test coverage?