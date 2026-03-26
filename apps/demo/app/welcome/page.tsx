// /welcome — redirect to measurably-better product landing
import { redirect } from 'next/navigation';

export default function WelcomeIndex() {
  redirect('/measurably-better');
}
