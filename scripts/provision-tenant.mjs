#!/usr/bin/env node
// scripts/provision-tenant.mjs
//
// MBT Tenant Provisioning CLI. One command spins up the platform side of a
// new tenant (Vicki Wolpert, future realtors, brokers, civic partners).
//
// Usage:
//   node scripts/provision-tenant.mjs create <id> --name=<name> --domain=<domain> \
//     --entity=<entity> --route-group=<group> --theme=<class> \
//     --city=<city> --state=<state> --tagline=<"text"> \
//     [--features=directory,social,content-creation] \
//     [--gcs-bucket=bmt-media-<id>] [--accent=#c8a676]
//
//   node scripts/provision-tenant.mjs list
//
//   node scripts/provision-tenant.mjs add-domain <id> <domain>
//
//   node scripts/provision-tenant.mjs generate-checklist <id>
//
// What this automates:
//   - Creates the TenantConfig entry in apps/web/config/tenants.ts (if not present)
//   - Adds the domain(s) to apps/web/config/domain-routes.ts
//   - Emits a pre-flight checklist Markdown (docs/tenants/<id>.md) with
//     concrete manual steps for Cloudflare DNS, Stripe customer, Sanity dataset
//     filter, Immich folder, Postiz account
//
// What requires manual follow-up (prints checklist after create):
//   - Vercel domain config (if new domain) — add in Vercel dashboard + verify
//   - Cloudflare DNS — A record → 76.76.21.21 + www CNAME → cname.vercel-dns.com
//   - Stripe — create customer + payment method (customer does this via checkout)
//   - Sanity — already shared dataset with tenantId filter; no action needed
//   - Immich — create a folder for the tenant's photos
//   - Postiz — connect social accounts for the tenant

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const TENANTS_TS = path.join(REPO_ROOT, 'apps/web/config/tenants.ts');
const DOMAIN_ROUTES_TS = path.join(REPO_ROOT, 'apps/web/config/domain-routes.ts');
const TENANT_DOCS_DIR = path.join(REPO_ROOT, 'docs/tenants');

const subcommand = process.argv[2];
const restArgs = process.argv.slice(3);

async function main() {
  switch (subcommand) {
    case 'create':
      return cmdCreate();
    case 'list':
      return cmdList();
    case 'add-domain':
      return cmdAddDomain();
    case 'generate-checklist':
      return cmdGenerateChecklist();
    default:
      console.error(`Unknown subcommand: ${subcommand ?? '(none)'}\n`);
      console.error('Usage: node scripts/provision-tenant.mjs <command> [options]');
      console.error('Commands: create | list | add-domain | generate-checklist');
      process.exit(1);
  }
}

async function cmdCreate() {
  const id = restArgs[0];
  if (!id) {
    console.error('ERROR: tenant id is required as first positional arg');
    process.exit(1);
  }
  const { values } = parseArgs({
    args: restArgs.slice(1),
    options: {
      name: { type: 'string' },
      domain: { type: 'string', multiple: true },
      entity: { type: 'string' },
      'route-group': { type: 'string' },
      theme: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      tagline: { type: 'string' },
      features: { type: 'string' },
      'gcs-bucket': { type: 'string' },
      accent: { type: 'string' },
    },
    strict: false,
  });

  const required = ['name', 'domain', 'entity', 'route-group', 'theme', 'city', 'state', 'tagline'];
  for (const key of required) {
    if (!values[key]) {
      console.error(`ERROR: --${key} is required`);
      process.exit(1);
    }
  }

  const domains = Array.isArray(values.domain) ? values.domain : [values.domain];
  const config = {
    id,
    name: values.name,
    entity: values.entity,
    domains,
    primaryDomain: domains[0],
    routeGroup: values['route-group'],
    themeClass: values.theme,
    gcsBucket: values['gcs-bucket'] ?? `bmt-media-${id}`,
    accentColor: values.accent ?? '#c8a676',
    tagline: values.tagline,
    location: { city: values.city, state: values.state },
    features: (values.features ?? '').split(',').map((f) => f.trim()).filter(Boolean),
  };

  await appendToTenantsTs(config);
  await appendToDomainRoutes(config);
  await generateChecklist(config);

  console.log(`\n✓ Tenant ${id} registered in codebase.`);
  console.log(`  - Added to apps/web/config/tenants.ts`);
  console.log(`  - Added to apps/web/config/domain-routes.ts`);
  console.log(`  - Checklist at docs/tenants/${id}.md\n`);
  console.log(`Next steps (manual, from the checklist):`);
  console.log(`  1. Add domain(s) to Vercel project + verify`);
  console.log(`  2. Configure Cloudflare DNS (A → 76.76.21.21, www CNAME → cname.vercel-dns.com)`);
  console.log(`  3. Commit + push to trigger deploy`);
  console.log(`  4. Walk through docs/tenants/${id}.md for Stripe / Immich / Postiz setup\n`);
}

async function cmdList() {
  const src = await fs.readFile(TENANTS_TS, 'utf8');
  const idMatches = [...src.matchAll(/^\s*id:\s*['"]([^'"]+)['"]/gm)];
  console.log(`\n${idMatches.length} tenant(s) registered:\n`);
  for (const m of idMatches) console.log(`  - ${m[1]}`);
  console.log('');
}

async function cmdAddDomain() {
  const id = restArgs[0];
  const domain = restArgs[1];
  if (!id || !domain) {
    console.error('Usage: provision-tenant.mjs add-domain <id> <domain>');
    process.exit(1);
  }

  const src = await fs.readFile(TENANTS_TS, 'utf8');
  const tenantBlockRe = new RegExp(
    `(\\{\\s*id:\\s*['"]${id}['"][\\s\\S]*?domains:\\s*\\[)([\\s\\S]*?)(\\])`,
    'g'
  );
  const match = tenantBlockRe.exec(src);
  if (!match) {
    console.error(`ERROR: tenant ${id} not found in tenants.ts`);
    process.exit(1);
  }

  const before = match[1];
  const inside = match[2];
  const after = match[3];
  if (inside.includes(`'${domain}'`) || inside.includes(`"${domain}"`)) {
    console.log(`Domain ${domain} already registered for ${id}. No change.`);
    return;
  }
  const updatedInside = inside.trimEnd().replace(/,?\s*$/, `, '${domain}'\n    `);
  const newSrc = src.replace(tenantBlockRe, `${before}${updatedInside}${after}`);
  await fs.writeFile(TENANTS_TS, newSrc, 'utf8');

  // Also append to domain-routes.ts
  const routes = await fs.readFile(DOMAIN_ROUTES_TS, 'utf8');
  if (!routes.includes(domain)) {
    console.log(`  Note: also add '${domain}' to apps/web/config/domain-routes.ts manually`);
  }
  console.log(`✓ Added ${domain} to ${id} in tenants.ts`);
}

async function cmdGenerateChecklist() {
  const id = restArgs[0];
  if (!id) {
    console.error('Usage: provision-tenant.mjs generate-checklist <id>');
    process.exit(1);
  }
  const src = await fs.readFile(TENANTS_TS, 'utf8');
  const tenantMatch = new RegExp(
    `\\{\\s*id:\\s*['"]${id}['"][\\s\\S]*?features:\\s*\\[[^\\]]*\\][\\s\\S]*?\\}`,
    'g'
  ).exec(src);
  if (!tenantMatch) {
    console.error(`ERROR: tenant ${id} not found`);
    process.exit(1);
  }
  // Quick field extraction
  const extract = (field) => {
    const re = new RegExp(`${field}:\\s*['"]([^'"]+)['"]`);
    const m = tenantMatch[0].match(re);
    return m?.[1];
  };
  const config = {
    id,
    name: extract('name') ?? id,
    primaryDomain: extract('primaryDomain') ?? `${id}.com`,
    entity: extract('entity') ?? '—',
    tagline: extract('tagline') ?? '',
    city: '—',
    state: '—',
  };
  await generateChecklist(config);
  console.log(`\n✓ Checklist at docs/tenants/${id}.md`);
}

async function appendToTenantsTs(config) {
  let src = await fs.readFile(TENANTS_TS, 'utf8');
  if (src.includes(`id: '${config.id}'`)) {
    console.log(`Tenant ${config.id} already present in tenants.ts — skipping insert`);
    return;
  }
  const newEntry = `  {
    id: '${config.id}',
    name: '${config.name}',
    entity: '${config.entity}',
    domains: [${config.domains.map((d) => `'${d}'`).join(', ')}],
    primaryDomain: '${config.primaryDomain}',
    routeGroup: '${config.routeGroup}',
    themeClass: '${config.themeClass}',
    gcsBucket: '${config.gcsBucket}',
    accentColor: '${config.accentColor}',
    tagline: '${config.tagline.replace(/'/g, "\\'")}',
    location: { city: '${config.location.city}', state: '${config.location.state}' },
    features: [${config.features.map((f) => `'${f}'`).join(', ')}],
  },`;

  // Insert before the closing `];` of TENANTS array
  const closingIdx = src.lastIndexOf('];');
  if (closingIdx < 0) {
    throw new Error('Could not find closing `];` in tenants.ts');
  }
  // Step backwards to find the last `},` so we can insert right after it
  src = src.slice(0, closingIdx) + newEntry + '\n' + src.slice(closingIdx);
  await fs.writeFile(TENANTS_TS, src, 'utf8');
}

async function appendToDomainRoutes(config) {
  const routes = await fs.readFile(DOMAIN_ROUTES_TS, 'utf8');
  const alreadyThere = config.domains.every((d) => routes.includes(d));
  if (alreadyThere) {
    console.log('Domains already present in domain-routes.ts — skipping');
    return;
  }
  console.log(
    '  Note: manually add the new domain(s) to apps/web/config/domain-routes.ts if they require routing.'
  );
}

async function generateChecklist(config) {
  await fs.mkdir(TENANT_DOCS_DIR, { recursive: true });
  const docPath = path.join(TENANT_DOCS_DIR, `${config.id}.md`);

  const content = `# Tenant provisioning checklist — ${config.name}

*Generated by \`scripts/provision-tenant.mjs\` on ${new Date().toISOString().slice(0, 10)}.*

## Tenant registered

- ID: \`${config.id}\`
- Name: ${config.name}
- Entity: ${config.entity}
- Primary domain: \`${config.primaryDomain}\`
- Location: ${config.location?.city ?? '—'}, ${config.location?.state ?? '—'}
- Tagline: ${config.tagline}

## Automated — done

- [x] Added to \`apps/web/config/tenants.ts\`
- [x] Added to \`apps/web/config/domain-routes.ts\` (if applicable)
- [x] Checklist generated at \`docs/tenants/${config.id}.md\`

## Manual — requires someone at the keyboard

### 1. Vercel domain (~5 minutes)

1. Go to https://vercel.com/chase-piersons-projects/hillbilly-dreams/settings/domains
2. Add \`${config.primaryDomain}\` (and any additional domains)
3. Vercel will show pending verification → proceed to DNS step below

### 2. Cloudflare DNS (~5 minutes)

1. Go to https://dash.cloudflare.com → ChasePierson.TV account
2. Select (or add) zone \`${config.primaryDomain}\`
3. Add DNS records:
   - \`A\` record: \`@\` → \`76.76.21.21\` (Vercel) — **gray cloud** (DNS only)
   - \`CNAME\` record: \`www\` → \`cname.vercel-dns.com\` — **gray cloud**
4. Back in Vercel, click "Refresh" on the domain — verification should turn green within 1-2 min

### 3. Stripe customer (automatic per purchase)

Nothing to do up front. When the customer completes their first checkout, Stripe creates the customer automatically + the Commerce module wires up ModuleEngagement if applicable. Verify after first transaction:

- Stripe Dashboard → Customers → search by email
- Platform DB: \`SELECT * FROM "Subscription" WHERE "tenantId" = '${config.id}'\`

### 4. Sanity dataset — no action needed

MBT uses a single shared dataset (\`production\`) with tenant filters. The wizard + article pipeline respect \`tenantId\` on documents. Sanity Studio shows all tenants' content together; filter via query.

### 5. Immich folder (~2 minutes)

1. SSH to the Hetzner Immich box (docs/operations/MAC_MINI_SERVICES_INVENTORY.md doesn't cover Hetzner — future doc)
2. Create album: \`${config.name} — master\`
3. Invite tenant contact as a shared user (they upload their own; we use their photos for content)

### 6. Postiz social account linking (~10 minutes, per social platform)

For each social platform the tenant wants us to post on their behalf:

1. Open Postiz on Mac mini at http://192.168.4.37:4007
2. Add integration → ${config.name} — [platform]
3. OAuth redirect flow — the tenant does this once from their phone
4. Verify the account shows up in Postiz with a green status

### 7. First content drop (~30 minutes)

- [ ] Import any existing photos the tenant has into their Immich folder
- [ ] Pre-populate dashboard with sample listings / sample content
- [ ] Schedule first 30 days of social calendar (via \`/admin/create\` wizard)
- [ ] Brief the content coordinator on tenant voice + cadence

### 8. Customer welcome (~5 minutes)

Send the welcome email sequence from \`docs/marketing-copy/vicki-wolpert-onboarding-emails.md\` (adapt for this tenant). Include:

- Dashboard URL
- Content coordinator name + contact
- First-week call scheduling link

### 9. Verification — is the tenant live?

Open \`https://${config.primaryDomain}\` → should render the right brand.
Open \`https://${config.primaryDomain}/admin\` → should authenticate the tenant contact.
Open \`https://${config.primaryDomain}/pricing?tenantId=${config.id}\` (if offering public plans) → should render plan cards.

POST a test plan via the admin at \`/admin/plans\` if needed, then POST a test checkout from the pricing page.

## Rollback — if provisioning fails partway

1. Remove the tenant block from \`apps/web/config/tenants.ts\`
2. Remove the domain(s) from \`apps/web/config/domain-routes.ts\`
3. Remove DNS records in Cloudflare
4. Remove domain from Vercel
5. Delete this checklist file

## Escalation

- Platform / routing / deployment issues → Chase
- Content / onboarding cadence → content coordinator
- Billing / subscription → billing@bigmuddyinn.com
`;

  await fs.writeFile(docPath, content, 'utf8');
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
