'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Unchecks the mobile nav drawer when the route changes (client navigations keep checkbox state). */
export function AdminNavCloseOnRoute() {
  const pathname = usePathname();
  useEffect(() => {
    const el = document.getElementById('admin-nav-toggle') as HTMLInputElement | null;
    if (el) el.checked = false;
  }, [pathname]);
  return null;
}
