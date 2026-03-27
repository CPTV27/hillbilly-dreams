// apps/web/app/ops/page.tsx
// Stub: ops dashboard is disabled to reduce build size.
// Full ops UI lives in _disabled/app/(ops)/ops/ — re-enable when ready.

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Operations — Measurably Better Things',
};

export default function OpsStub() {
  // Redirect to the main MBT page until ops dashboard is re-enabled
  redirect('/measurably-better');
}
