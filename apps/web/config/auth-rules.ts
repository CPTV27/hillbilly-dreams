// apps/web/config/auth-rules.ts
// ─────────────────────────────────────────────────────────────
// BMT TENANT AUTH RULES
// ─────────────────────────────────────────────────────────────
// All BMT-specific access control data lives here.
// The auth engine (auth.ts) imports this config — swap the import
// to adapt for another HDX sovereign.
//
// Seam introduced: 2026-03-24 — Phase 2 Wave 3 (AG)
// ─────────────────────────────────────────────────────────────

// ── Platform-Portable Auth Interfaces ──

/**
 * Tenant auth rules that any HDX sovereign must provide.
 */
export interface TenantAuthRules {
  /** Domains where any user@domain gets access */
  allowedDomains: string[];
  /** Individual emails that get access */
  allowedEmails: string[];
  /** Path for the sign-in page */
  signInPage: string;
  /** Path for the error page */
  errorPage: string;
  /** Default role for new users */
  defaultRole: string;
}

/**
 * Callback invoked after a successful sign-in.
 * Tenants provide their own implementation to log activity, send
 * notifications, etc. The auth engine calls this but never imports
 * any database directly.
 */
export type OnSignInCallback = (user: {
  id?: string;
  email?: string | null;
  name?: string | null;
}) => Promise<void>;

/**
 * Callback to enrich a JWT token with tenant-specific user data.
 * The auth engine calls this after standard JWT population.
 */
export type OnJwtEnrichCallback = (
  email: string
) => Promise<Record<string, unknown> | null>;

// ── BMT-Specific Auth Rules ──

export const BMT_ALLOWED_DOMAINS: string[] = [
  'chasepierson.tv',
  'thebigmuddyinn.com',
  'studio.c.video',
  'studio-c.com',
];

export const BMT_ALLOWED_EMAILS: string[] = [
  // Core team
  'chase@scan2plan.io',
  'chase@scantoplan.io',
  'tracy@thebigmuddyinn.com',
  'amy@thebigmuddyinn.com',
  'amyaldersonallen@gmail.com',
  'tracyaldersonallen@gmail.com',
  'jphoustonlives@gmail.com',
  'team@chasepierson.tv',
  // Studio C
  'info@studio.c.video',
  'miles@studio.c.video',
  'elijah@studio.c.video',
  'info@studio-c.com',
  'miles@studio-c.com',
  'elijah@studio-c.video',
];

/**
 * Team password for email/password login.
 * MUST be set via TEAM_PASSWORD env var — no hardcoded fallback.
 */
export function getTeamPassword(): string {
  const pw = process.env.TEAM_PASSWORD;
  if (!pw) {
    throw new Error(
      '[Auth] TEAM_PASSWORD env var is required. Set it in .env or .env.local.'
    );
  }
  return pw;
}

export const BMT_AUTH_RULES: TenantAuthRules = {
  allowedDomains: BMT_ALLOWED_DOMAINS,
  allowedEmails: BMT_ALLOWED_EMAILS,
  signInPage: '/admin/login',
  errorPage: '/admin/login',
  defaultRole: 'viewer',
};

/**
 * Check if an email is allowed by the BMT access control rules.
 * Exported for use by admin-auth.ts and other guard functions.
 */
export function isAllowedUser(email: string | null | undefined): boolean {
  if (!email) return false;
  const lower = email.toLowerCase();
  const domain = lower.split('@')[1];
  return (
    BMT_ALLOWED_DOMAINS.includes(domain) ||
    BMT_ALLOWED_EMAILS.includes(lower)
  );
}
