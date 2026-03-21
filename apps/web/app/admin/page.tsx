// apps/web/app/admin/page.tsx
// Root redirect — sends /admin to /dashboard

import { redirect } from 'next/navigation';

export default function AdminRoot() {
  redirect('/ops');
}
