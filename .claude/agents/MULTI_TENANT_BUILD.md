# Multi-Tenant Build — Spin Up 4 Tenants From One Codebase

## Mission

Convert the hillbilly-dreams monorepo from a single-brand app into a true multi-tenant platform. Four tenants need to be live:

1. **Big Muddy** (Natchez, MS) — already running, this is the reference implementation
2. **Bearsville Media Group** (Woodstock, NY) — new tenant, needs splash page immediately
3. **Studio C** (studio-c.video) — video agency / recording studio / media company
4. **Tuthill Design** (tuthilldesign.com) — photography company

## Before You Start

Read these files in order:
1. `.claude/agents/MASTER_HANDOFF.md` — system overview, all domains, QC rules
2. `.claude/agents/ORIGIN_STORY.md` — why multi-tenancy matters (same architecture, any town)
3. `memory/project_true_multitenancy.md` — architecture decision (config-driven, not fork-driven)
4. `apps/web/config/domain-routes.ts` — current hostname-based routing
5. `apps/web/middleware.ts` — how routing works today

## Current State

The app already serves 15+ domains from one codebase using hostname-based middleware routing. Each hostname pattern maps to a route group (e.g., `bigmuddytouring` → `/touring`). But there's no tenant abstraction — brand info is scattered across page files, layouts, and hardcoded strings.

Domain routing config is at: `apps/web/config/domain-routes.ts`

These routes already exist for the new tenants:
- `/studio` — Studio C pages (studiocvideo.com, studio-c.video)
- `/tuthill` — Tuthill Design pages (tuthilldesign.com)
- `/gallery` — BuyCurious Art (buycurious.art)

## What to Build

### 1. Tenant Config Registry (`config/tenants.ts`)

Single source of truth per tenant:

```typescript
export interface TenantConfig {
  id: string;                    // 'big-muddy' | 'bearsville' | 'studio-c' | 'tuthill'
  name: string;                  // Display name
  entity: string;                // Legal entity name
  domains: string[];             // All domains for this tenant
  primaryDomain: string;         // Canonical domain
  routeGroup: string;            // Next.js route group
  themeClass: string;            // CSS theme class
  gcsBucket: string;             // GCS storage bucket
  accentColor: string;           // Primary brand color (hex)
  logo?: string;                 // Logo URL
  tagline: string;               // One-line description
  location: { city: string; state: string; };
  features: string[];            // Enabled features: 'directory' | 'radio' | 'magazine' | 'gallery' | 'studio'
}

export const TENANTS: TenantConfig[] = [
  {
    id: 'big-muddy',
    name: 'Big Muddy',
    entity: 'Hillbilly Dreams Inc',
    domains: ['bigmuddytouring.com', 'bigmuddymagazine.com', 'bigmuddyradio.com', 'bigmuddyentertainment.com', 'deepsouthdirectory.com', 'measurablybetter.life', 'outsidereconomics.com', 'buycurious.art', 'bigmuddymedia.com', 'bigmuddyrecord.com'],
    primaryDomain: 'bigmuddytouring.com',
    routeGroup: 'touring',
    themeClass: 'theme-touring',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#c8943e',
    tagline: "The Mississippi's Music Corridor",
    location: { city: 'Natchez', state: 'MS' },
    features: ['directory', 'radio', 'magazine', 'gallery', 'studio', 'inn'],
  },
  {
    id: 'bearsville',
    name: 'Bearsville Media Group',
    entity: 'Bearsville Media Group LLC',
    domains: ['bearsvillemedia.com', 'bearsvilleradio.com'],
    primaryDomain: 'bearsvillemedia.com',
    routeGroup: 'bearsville',
    themeClass: 'theme-bearsville',
    gcsBucket: 'bmt-media-bigmuddy', // shared for now, separate later
    accentColor: '#8B6914',
    tagline: "The Hudson Valley's Creative Engine",
    location: { city: 'Woodstock', state: 'NY' },
    features: ['directory', 'radio', 'magazine', 'studio'],
  },
  {
    id: 'studio-c',
    name: 'Studio C',
    entity: 'Studio C Video LLC',
    domains: ['studiocvideo.com', 'studio-c.video', 'studio-c.com'],
    primaryDomain: 'studio-c.video',
    routeGroup: 'studio',
    themeClass: 'theme-studio',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#4A90D9',
    tagline: 'Production. Recording. Broadcasting.',
    location: { city: 'Woodstock', state: 'NY' },
    features: ['gallery', 'studio', 'radio'],
  },
  {
    id: 'tuthill',
    name: 'Tuthill Design',
    entity: 'Tuthill Design LLC',
    domains: ['tuthilldesign.com'],
    primaryDomain: 'tuthilldesign.com',
    routeGroup: 'tuthill',
    themeClass: 'theme-tuthill',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#2D5F2D',
    tagline: 'Photography for the Hudson Valley',
    location: { city: 'Woodstock', state: 'NY' },
    features: ['gallery', 'studio'],
  },
];
```

### 2. Update Middleware to Use Tenant Config

Modify `middleware.ts` to resolve tenant from hostname, then pass `tenantId` via headers or cookies so pages can read it.

### 3. Tenant-Aware Layouts

Each route group layout reads the tenant config and applies:
- Theme class
- Logo
- Navigation items (based on enabled features)
- Footer with entity name

### 4. Bearsville Splash Page

Create `apps/web/app/bearsville/page.tsx`:
- Hero: "Bearsville Media Group — The Hudson Valley's Creative Engine"
- Three sections: Directory, Radio, Magazine
- "Get Listed" CTA for businesses
- "Listen" CTA for radio
- Dark warm theme (Hudson Valley autumn palette)

This needs to be live immediately as a proof of concept.

### 5. Shared Admin Panel

The admin panel at `/admin/*` should work for any tenant. Add a tenant switcher in the admin sidebar — Chase can switch between Big Muddy, Bearsville, Studio C, and Tuthill to manage each one.

### 6. Domain Routing Updates

Add to `config/domain-routes.ts`:
```typescript
{ pattern: 'bearsville', routeGroup: 'bearsville' },
```

### 7. Tenant-Scoped Data

When querying the database, filter by tenant where applicable:
- Directory listings: scoped to tenant's location
- Events: scoped to tenant's venue
- Articles: scoped to tenant's brand
- AgentContext: scoped to tenant's domain

Use the PublicQueries and PrivateQueries layers (already built at `packages/database/lib/`) as the foundation.

## How Updates Push to All Tenants

This already works — Vercel deploys from one repo to all domains. The key rule:

**Features go in the shared codebase. Brand goes in the tenant config.**

If Elijah builds a video delivery feature for Studio C, it ships as a shared feature that any tenant can enable via `features: ['video-delivery']`. The feature code is shared. The branding is per-tenant.

## Files to Create

1. `config/tenants.ts` — tenant registry
2. `apps/web/app/bearsville/page.tsx` — splash page
3. `apps/web/app/bearsville/layout.tsx` — Bearsville layout with theme

## Files to Modify

1. `apps/web/middleware.ts` — resolve tenant from hostname
2. `apps/web/config/domain-routes.ts` — add Bearsville routes
3. `apps/web/app/admin/layout.tsx` — add tenant switcher to sidebar

## DO NOT

- Fork the repo. One codebase, always.
- Create separate databases per tenant (use column-based filtering for now)
- Hardcode Big Muddy branding into shared components
- Break existing Big Muddy functionality — it must keep working exactly as is

## Verification

1. bigmuddytouring.com still works exactly as before
2. bearsvillemedia.com shows the Bearsville splash page
3. studio-c.video shows Studio C branding
4. tuthilldesign.com shows Tuthill Design branding
5. /admin panel has a tenant switcher
6. One git push updates all four tenants simultaneously
