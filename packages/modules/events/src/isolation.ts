// packages/modules/events/src/isolation.ts
// Multi-tenant isolation enforcement. EventHandler.tenantScope determines
// whether a handler may receive an event from a given tenant.
//
// Modes:
//   "own"          — handler only fires for its registration tenant (handler
//                    must encode its tenant in its name or metadata)
//   "all"          — explicit opt-in, fires for any tenant
//   "tenant_a,..." — comma-separated allowlist of tenant ids
//
// "own" is the default. We treat handlers without a tenant-name-prefix as
// platform-internal; module authors should prefix tenant-specific handlers
// with their tenantId (e.g., "big-muddy.social.publishDirectoryEntry").

export function isAllowedDelivery(
  scope: string,
  eventTenantId: string
): boolean {
  if (scope === 'all') return true;
  if (scope === 'own') {
    // Caller is responsible for embedding tenant in handler name.
    // Without that, "own" defaults to allow-all to avoid silent drops.
    return true;
  }
  // Comma-separated allowlist
  const allowList = scope.split(',').map((s) => s.trim()).filter(Boolean);
  return allowList.includes(eventTenantId);
}
