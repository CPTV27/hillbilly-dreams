// packages/modules/events/src/isolation.ts
// Multi-tenant isolation enforcement. EventHandler.tenantScope determines
// whether a handler may receive an event from a given tenant.
//
// Modes (deny-by-default):
//   "all"                      — explicit opt-in, fires for any tenant
//   "own:<tenantId>"           — handler only fires for event.tenantId == <tenantId>
//   "<tenantA>,<tenantB>,..."  — comma-separated allowlist of tenant ids
//   "own" (legacy, deprecated) — treated as DENY until upgraded to "own:<id>"
//
// The legacy bare "own" mode is deprecated as of 2026-04-19 per external
// review (Gemini) — it previously defaulted to allow-all which created a
// cross-tenant data-access vulnerability. All handlers registered with
// bare "own" now hard-fail isolation checks; re-register with
// "own:<tenantId>" or an explicit allowlist.

export function isAllowedDelivery(
  scope: string,
  eventTenantId: string
): boolean {
  // "all" — explicit cross-tenant opt-in
  if (scope === 'all') return true;

  // Legacy bare "own" — DENY (was allow-all; security hole)
  if (scope === 'own') {
    console.error(
      `[events/isolation] Handler with legacy "own" tenantScope blocked for event.tenantId=${eventTenantId}. ` +
        `Re-register the handler with "own:<tenantId>" or an explicit allowlist.`
    );
    return false;
  }

  // New canonical form — "own:<tenantId>"
  if (scope.startsWith('own:')) {
    const handlerTenant = scope.slice(4).trim();
    return handlerTenant === eventTenantId;
  }

  // Comma-separated allowlist — "tenantA,tenantB"
  const allowList = scope.split(',').map((s) => s.trim()).filter(Boolean);
  return allowList.includes(eventTenantId);
}

/** Build a canonical scope string for a per-tenant handler. */
export function ownScope(tenantId: string): string {
  return `own:${tenantId}`;
}

/** Parse a scope string and return its mode + parameters. Used by admin UI. */
export function parseScope(
  scope: string
): { mode: 'all' | 'own' | 'legacy-own-deny' | 'allowlist'; tenantIds: string[] } {
  if (scope === 'all') return { mode: 'all', tenantIds: [] };
  if (scope === 'own') return { mode: 'legacy-own-deny', tenantIds: [] };
  if (scope.startsWith('own:')) {
    return { mode: 'own', tenantIds: [scope.slice(4).trim()] };
  }
  const allowList = scope.split(',').map((s) => s.trim()).filter(Boolean);
  return { mode: 'allowlist', tenantIds: allowList };
}
