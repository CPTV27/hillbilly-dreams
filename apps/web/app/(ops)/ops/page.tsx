import { redirect } from 'next/navigation';

// Old ops dashboard deprecated — redirect to new admin Mission Control
export default function OpsRedirect() {
  redirect('/admin/dashboard');
}
