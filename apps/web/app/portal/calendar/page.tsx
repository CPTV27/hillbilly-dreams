import { Suspense } from 'react';
import PortalCalendarClient from './calendar-client';

export const dynamic = 'force-dynamic';

export default function PortalCalendarPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>Loading calendar...</div>}>
      <PortalCalendarClient />
    </Suspense>
  );
}
