// apps/web/app/admin/page.tsx
// Root redirect — sends /admin to /admin/treasury.
// Historical redirect to /ops 404s; /admin/treasury is the MBT-platform
// landing page (MRR + bucket hours + Tier 3 engagements + per-entity P&L).

import { redirect } from 'next/navigation';

export default function AdminRoot() {
  redirect('/admin/treasury');
}
