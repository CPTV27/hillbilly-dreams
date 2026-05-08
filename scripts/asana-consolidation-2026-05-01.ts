#!/usr/bin/env -S npx tsx
/**
 * Asana consolidation — 2026-05-01
 *
 * Finishes the Asana cleanup that the MCP couldn't complete (project moves,
 * project renames, project archives).
 *
 * REQUIRES (run from your Mac Terminal, not the sandbox):
 *   - bw unlock + BW_SESSION exported
 *   - Bitwarden item: "Asana PAT — Chief of Staff" with the PAT in .login.password
 *
 * USAGE:
 *   bw unlock --raw > /tmp/bw-session && export BW_SESSION=$(cat /tmp/bw-session)
 *   ASANA_PAT=$(bw get item "Asana PAT — Chief of Staff" | jq -r .login.password) \
 *     npx tsx scripts/asana-consolidation-2026-05-01.ts --dry-run
 *
 * Then re-run without --dry-run to execute.
 *
 * What it does:
 *   1. Finds every task in the workspace whose name starts with "[ROUTE: <Target>]"
 *   2. For each: adds task to target project, removes from current project, strips the prefix
 *   3. Renames 2 projects (Music & Entertainment → Big Muddy Records; Deep South Directory → Directory Module)
 *   4. Archives 14 deprecated projects (zero incomplete tasks remain in each)
 *
 * Idempotent: re-running is safe. If a task no longer has the [ROUTE: ...] prefix, it's skipped.
 */

const ASANA_PAT = process.env.ASANA_PAT;
const DRY_RUN = process.argv.includes("--dry-run");
const WORKSPACE_GID = "1211216881488780";

if (!ASANA_PAT) {
  console.error("ERROR: ASANA_PAT not set. Export it first.");
  process.exit(1);
}

// ----- PROJECT REGISTRY (verified 2026-05-01) -----

const PROJECTS = {
  // Targets for [ROUTE: ...] tagged tasks
  "MBT Platform": "1214435350452746",
  "CEO Command Center": "1214377083408837",
  "Inverted Intelligence/Outsider Economics": "1214435350601554",
  "Big Muddy Acres": "1214435569077968",
  Lyrai: "1214435350532283",
  "Big Muddy Magazine": "1213945999434115",
  "Sales Pipeline": "1214377004647771",
  "Parking Lot / Intake": "1214377004978196",
  "Studio C Work": "1214376886538254",
  "Finance / Admin": "1214376908518733",
  "Big Muddy Operations": "1214376908517191",
  "Weekly Partner Commitments": "1214376792613690",
} as const;

// Projects to rename (current_gid → new_name)
const RENAMES: Array<[string, string, string]> = [
  ["1213828982457283", "Music & Entertainment — Big Muddy Records", "Big Muddy Records"],
  ["1213942613519300", "Deep South Directory", "Directory Module"],
];

// Projects to archive (zero incomplete tasks; safe to flip flag)
const ARCHIVES: Array<[string, string]> = [
  ["1213753731475702", "Hillbilly Dreams Inc"],
  ["1213942086710192", "Hillbilly Dreams Org Chart & Brand Map"],
  ["1213945999485433", "Launch — April 2026"],
  ["1214143246291054", "Big Muddy — Partner Onboarding (April 2026)"],
  ["1214266847644690", "Corporate Structure — April 2026"],
  ["1213828983804994", "Marketing Department — 4-Week Sprint"],
  ["1213828691255920", "Shot List — Real Photo Pipeline"],
  ["1213828793807810", "Shot List — Real Photos Needed"],
  ["1213828691250638", "Biz Dev Pipeline"],
  ["1213853652406670", "Tracy — Business & Finance"],
  ["1213859652065310", "Amy — Inn & Bar Ops"],
  ["1211309411699481", "Studio C Control Center"],
  ["1214267143100863", "Studio C — Engineering"],
  ["1214248337630582", "Chase Pierson Photography — Website Build"], // merging into Launch Setup; pick one to keep
];

// ----- HTTP helpers -----

const BASE = "https://app.asana.com/api/1.0";

async function asana(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${ASANA_PAT}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Asana ${init.method || "GET"} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

async function* paginate<T = any>(path: string): AsyncGenerator<T> {
  let url = path;
  while (url) {
    const data: any = await asana(url);
    for (const item of data.data) yield item;
    url = data.next_page?.path || null;
  }
}

// ----- Main flow -----

const ROUTE_REGEX = /^\[ROUTE: ([^\]]+)\]\s+/;

async function findRoutedTasks() {
  const tasks: Array<{ gid: string; name: string; target: string; projectGids: string[] }> = [];
  // Search workspace for tasks with [ROUTE: in the name (Asana search supports `text` param)
  const url = `/workspaces/${WORKSPACE_GID}/tasks/search?text=${encodeURIComponent("[ROUTE:")}&completed=false&limit=100&opt_fields=name,projects.gid`;
  for await (const t of paginate(url)) {
    const m = (t as any).name?.match(ROUTE_REGEX);
    if (!m) continue;
    tasks.push({
      gid: (t as any).gid,
      name: (t as any).name,
      target: m[1].trim(),
      projectGids: ((t as any).projects || []).map((p: any) => p.gid),
    });
  }
  return tasks;
}

async function moveTask(taskGid: string, fromProject: string, toProject: string, oldName: string) {
  const newName = oldName.replace(ROUTE_REGEX, "");
  if (DRY_RUN) {
    console.log(`  [DRY] move ${taskGid} → ${toProject}, rename: "${newName}"`);
    return;
  }
  // Add to target
  await asana(`/tasks/${taskGid}/addProject`, {
    method: "POST",
    body: JSON.stringify({ data: { project: toProject } }),
  });
  // Remove from source (WPC, usually)
  await asana(`/tasks/${taskGid}/removeProject`, {
    method: "POST",
    body: JSON.stringify({ data: { project: fromProject } }),
  });
  // Strip the [ROUTE: ...] prefix
  await asana(`/tasks/${taskGid}`, {
    method: "PUT",
    body: JSON.stringify({ data: { name: newName } }),
  });
}

async function renameProject(gid: string, newName: string) {
  if (DRY_RUN) {
    console.log(`  [DRY] rename project ${gid} → "${newName}"`);
    return;
  }
  await asana(`/projects/${gid}`, {
    method: "PUT",
    body: JSON.stringify({ data: { name: newName } }),
  });
}

async function archiveProject(gid: string) {
  if (DRY_RUN) {
    console.log(`  [DRY] archive project ${gid}`);
    return;
  }
  await asana(`/projects/${gid}`, {
    method: "PUT",
    body: JSON.stringify({ data: { archived: true } }),
  });
}

async function main() {
  console.log(`\n=== Asana consolidation 2026-05-01 ${DRY_RUN ? "(DRY RUN)" : "(LIVE)"} ===\n`);

  // Phase 1: route tagged tasks
  console.log("Phase 1: Routing tagged tasks");
  const routed = await findRoutedTasks();
  console.log(`  found ${routed.length} tagged tasks\n`);

  let moved = 0;
  let skipped = 0;
  for (const t of routed) {
    const targetGid = (PROJECTS as any)[t.target];
    if (!targetGid) {
      console.log(`  SKIP ${t.gid}: unknown target "${t.target}" — fix manually`);
      skipped++;
      continue;
    }
    // Pick "from" project: WPC if present, else the first non-target project
    const wpcGid = PROJECTS["Weekly Partner Commitments"];
    const fromGid = t.projectGids.includes(wpcGid)
      ? wpcGid
      : t.projectGids.find((p) => p !== targetGid) || t.projectGids[0];
    if (!fromGid) {
      console.log(`  SKIP ${t.gid}: no source project`);
      skipped++;
      continue;
    }
    console.log(`  ${t.target}: ${t.name.slice(0, 70)}...`);
    await moveTask(t.gid, fromGid, targetGid, t.name);
    moved++;
  }
  console.log(`\n  moved: ${moved}, skipped: ${skipped}\n`);

  // Phase 2: rename projects
  console.log("Phase 2: Renaming projects");
  for (const [gid, oldName, newName] of RENAMES) {
    console.log(`  "${oldName}" → "${newName}"`);
    await renameProject(gid, newName);
  }
  console.log("");

  // Phase 3: archive projects
  console.log("Phase 3: Archiving deprecated projects");
  for (const [gid, name] of ARCHIVES) {
    console.log(`  archive: ${name}`);
    await archiveProject(gid);
  }
  console.log("");

  console.log(`=== DONE ${DRY_RUN ? "(no changes; re-run without --dry-run)" : ""} ===\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
