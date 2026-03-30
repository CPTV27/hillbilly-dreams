// apps/web/app/measurably-better/life/sandbox/page.tsx
// Sandbox entry — redirects to dashboard with sandbox flag

import { redirect } from 'next/navigation';

export default function SandboxEntry() {
  redirect('/life?sandbox=true');
}
