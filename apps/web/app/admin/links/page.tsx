import { redirect } from 'next/navigation';

/** Short path to the bridge / deep-link hub (#88). */
export default function AdminLinksRedirectPage() {
  redirect('/admin/bridge');
}
