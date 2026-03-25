import React from 'react';
import { redirect } from 'next/navigation';

export default function EnterpriseLanding() {
  // Directly shuttle Owen into his bespoke console experience
  redirect('/measurably-better/enterprise/console');

  return (
    <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'system-ui' }}>
      <h1>Routing securely to the Sovereign Engine...</h1>
    </div>
  );
}
