#!/usr/bin/env node
// One-time migration: hash existing plaintext apiSecret values with bcrypt.
// Run: node scripts/hash-bridge-secrets.mjs
// Requires DATABASE_URL in environment or apps/web/.env.local

import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load env from apps/web/.env.local
const envPath = resolve(process.cwd(), 'apps/web/.env.local');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const val = trimmed.slice(eq + 1).replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  console.log('No .env.local found, using existing env vars');
}

const { PrismaClient } = await import(
  resolve(process.cwd(), 'node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client/index.js')
);
const bcrypt = await import(
  resolve(process.cwd(), 'node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js')
);

const prisma = new PrismaClient();

try {
  const clients = await prisma.bridgeClient.findMany();
  console.log(`Found ${clients.length} bridge clients`);

  let migrated = 0;
  for (const client of clients) {
    // Skip already-hashed secrets (bcrypt hashes start with $2)
    if (client.apiSecret.startsWith('$2')) {
      console.log(`  [SKIP] ${client.name} — already hashed`);
      continue;
    }

    const hashed = await bcrypt.hash(client.apiSecret, 10);
    await prisma.bridgeClient.update({
      where: { id: client.id },
      data: { apiSecret: hashed },
    });
    console.log(`  [OK] ${client.name} — secret hashed (was ${client.apiSecret.slice(0, 8)}...)`);
    migrated++;
  }

  console.log(`\nDone. Migrated ${migrated} of ${clients.length} clients.`);
  console.log('Clients now require x-api-secret header with raw secret for ingest.');
} finally {
  await prisma.$disconnect();
}
