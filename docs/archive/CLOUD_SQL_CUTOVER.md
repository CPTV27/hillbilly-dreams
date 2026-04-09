# Cloud SQL Cutover

## Environments & Status
- **Current Production:** Neon (`DATABASE_URL` in Vercel environment). All active edges and live sites read from here.
- **Ready Standby:** Cloud SQL instances (`sovereign-db-primary`) at `34.31.180.74`. 

## Cutover Steps
1. **Connector Installation:** Install `@google-cloud/cloud-sql-connector` across required environments.
2. **Environment Update:** Swap the active `DATABASE_URL` target from the Neon connection string to the Cloud SQL target.
3. **Validation Test:** Test live production queries, database pushing, and edge latency.
4. **Switch Finalize:** Declare cutover successful upon health-checks passing.

## Rollback Protocol
- Immediate rollback involves reverting the `DATABASE_URL` variable in Vercel back to the Neon connection string and initiating a deployment redeploy.

## Authorization
- **Execution Wait:** Do not initiate cutover until all current product features are considered stable.
- **Approver:** Chase holds sole authorization to initiate the cutover.
