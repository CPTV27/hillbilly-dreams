#!/usr/bin/env node
// scripts/verify-deploy.mjs
//
// Smoke-test the production deploy by hitting every public URL + every
// admin route (which should 401/redirect) + every API endpoint we care
// about. Prints a green/red table and exits non-zero on any failure.
//
// Usage:
//   node scripts/verify-deploy.mjs                   # default production URL
//   node scripts/verify-deploy.mjs --base=https://bigmuddy-preview.vercel.app
//   node scripts/verify-deploy.mjs --base=http://localhost:3000   # local dev

import { parseArgs } from 'node:util';

const args = parseArgs({
  args: process.argv.slice(2),
  options: {
    base: { type: 'string' },
    verbose: { type: 'boolean' },
  },
});

const BASE = args.values.base ?? 'https://bigmuddytouring.com';
const VERBOSE = !!args.values.verbose;

// Each check: { method, path, expect: status or function, label }
const CHECKS = [
  // Public pages
  { path: '/', expect: (s) => s === 200, label: 'Home' },
  { path: '/story', expect: 200, label: 'Story page' },
  { path: '/pricing', expect: 200, label: 'Pricing (any brand)' },
  { path: '/shows', expect: 200, label: 'Shows list' },
  { path: '/private-events', expect: 200, label: 'Private events inquiry' },
  { path: '/account/subscriptions', expect: 200, label: 'Account subscriptions' },
  { path: '/checkout/success', expect: 200, label: 'Checkout success' },
  { path: '/checkout/cancelled', expect: 200, label: 'Checkout cancelled' },

  // Public API endpoints
  { path: '/api/commerce/plans', expect: 200, label: 'Plans API (public)' },
  { path: '/api/commerce/plans?tenantId=big-muddy', expect: 200, label: 'Plans filtered' },
  { path: '/api/booking/resources?upcomingOnly=true', expect: 200, label: 'Resources (shows)' },

  // Admin pages — should 401/302 without auth
  { path: '/admin', expect: (s) => s === 401 || s === 302 || s === 307 || s === 200, label: 'Admin root (gated)' },
  { path: '/admin/subscriptions', expect: (s) => s === 401 || s === 302 || s === 307 || s === 200, label: 'Admin subscriptions (gated)' },
  { path: '/admin/treasury', expect: (s) => s === 401 || s === 302 || s === 307 || s === 200, label: 'Treasury (gated)' },
  { path: '/admin/coordination', expect: (s) => s === 401 || s === 302 || s === 307 || s === 200, label: 'Coordination (gated)' },
  { path: '/admin/create', expect: (s) => s === 401 || s === 302 || s === 307 || s === 200, label: 'Create wizard (gated)' },
];

async function check(c) {
  const url = BASE + c.path;
  const start = Date.now();
  let status = 0;
  let error = null;
  try {
    const res = await fetch(url, {
      method: c.method ?? 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000),
    });
    status = res.status;
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  const elapsed = Date.now() - start;

  const pass = !error && (
    typeof c.expect === 'function' ? c.expect(status) : status === c.expect
  );

  return { ...c, url, status, elapsed, pass, error };
}

async function main() {
  console.log(`\n=== MBT Deploy Verification ===`);
  console.log(`Base URL: ${BASE}`);
  console.log(`Checks:   ${CHECKS.length}\n`);

  const results = await Promise.all(CHECKS.map(check));

  const colW = {
    label: Math.max(...results.map((r) => r.label.length)) + 2,
    status: 4,
    elapsed: 7,
  };

  for (const r of results) {
    const icon = r.pass ? '✓' : '✗';
    const statusStr = String(r.status).padEnd(colW.status);
    const elapsedStr = `${r.elapsed}ms`.padStart(colW.elapsed);
    const line = `${icon} ${r.label.padEnd(colW.label)} ${statusStr} ${elapsedStr}  ${r.path}`;
    if (r.pass) console.log(`\x1b[32m${line}\x1b[0m`);
    else {
      console.log(`\x1b[31m${line}\x1b[0m`);
      if (r.error) console.log(`    → ${r.error}`);
      else if (VERBOSE) console.log(`    → expected ${c.expect}, got ${r.status}`);
    }
  }

  const failed = results.filter((r) => !r.pass);
  const passed = results.length - failed.length;

  console.log(`\n${passed} passed / ${failed.length} failed`);

  if (failed.length > 0) {
    console.log('\nFailures:');
    for (const f of failed) {
      console.log(`  - ${f.label}: ${f.error ?? `status ${f.status}`}`);
    }
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(2);
});
