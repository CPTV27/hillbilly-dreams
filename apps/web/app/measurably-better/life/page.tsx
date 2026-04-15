import { redirect } from 'next/navigation';

/** Southern Concierge entry — opens the global Delta Dawn widget via /dawn */
export default function MeasurablyBetterLifePage() {
  redirect('/dawn');
}
