import React from 'react';
import { redirect } from 'next/navigation';

export default function EnterpriseLanding() {
  // Enterprise console redirect
  redirect('/measurably-better/enterprise/console');

  return (
    <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
      <h1>Routing securely to the Sovereign Engine...</h1>
    </div>
  );
}
