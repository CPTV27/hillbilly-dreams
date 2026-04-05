import { redirect } from 'next/navigation';

/** Tour + whiteboard deep link — canonical blueprint view. */
export default function PlatformArchitecturePage() {
  redirect('/whiteboard?view=architecture');
}
