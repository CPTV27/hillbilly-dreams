#!/usr/bin/env python3
"""
Generic seed-YAML ingester for the corridor directory.

Handles any category whose seed follows the venues-seed.yaml pattern:

    {category_plural}:
    - {primary_key}:
        name: ""
        ...
      other_section:
        ...
      research:
        ...
      sources: []

Reads: Perplexity-research/{category}-seed.yaml
Writes:
    data/directory/{category}/{category}-catalog.json
    data/directory/{category}/{category}-list.csv
    data/directory/{category}/{category}-summary.md
    data/directory/{category}/phone-call-list.csv         (one row per gap per record)

Usage:
    python3 scripts/directory/ingest-seed.py musicians
    python3 scripts/directory/ingest-seed.py festivals
    python3 scripts/directory/ingest-seed.py studios
    python3 scripts/directory/ingest-seed.py labels
    python3 scripts/directory/ingest-seed.py press
"""

import sys
import re
import json
import csv
from pathlib import Path
from collections import defaultdict, Counter

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML not installed. Run: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent.parent
SEED_DIR = ROOT / "Perplexity-research"
OUT_ROOT = ROOT / "data" / "directory"

# Map category -> (top-level yaml key, per-record primary key).
# The primary key is the section that holds `name`, `status`, etc.
# Fallback: scan keys to find the one with `name` field.
CATEGORY_CONFIG = {
    "venues": {
        "top_key": "venues",
        "primary_key": "venue",
        "seed_file": "venues-seed.yaml",
    },
    "musicians": {
        "top_key": "musicians",
        "primary_key": "artist",
        "seed_file": "musicians-seed.yaml",
    },
    "festivals": {
        "top_key": "festivals",
        "primary_key": "festival",
        "seed_file": "festivals-seed.yaml",
    },
    "studios": {
        "top_key": "studios",
        "primary_key": "studio",
        "seed_file": "studios-seed.yaml",
    },
    "labels": {
        "top_key": "labels",
        "primary_key": "entity",
        "seed_file": "labels-seed.yaml",
    },
    "press": {
        "top_key": "press",
        "primary_key": "outlet",
        "seed_file": "press-seed.yaml",
    },
}


def slugify(s: str) -> str:
    s = str(s).lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "-", s)
    return s.strip("-")


def is_unknown(v) -> bool:
    if v is None:
        return True
    if isinstance(v, str):
        s = v.strip()
        return s == "" or s.upper() == "UNKNOWN"
    if isinstance(v, (list, dict)):
        return len(v) == 0
    return False


def scrub(v):
    """Return None/empty for unknown, else the value."""
    return None if is_unknown(v) else v


def get_nested(d: dict, path: str, default=None):
    """Safely fetch nested key path like 'booking.booking_email'."""
    cur = d
    for part in path.split("."):
        if not isinstance(cur, dict):
            return default
        cur = cur.get(part)
        if cur is None:
            return default
    return cur


def build_record(raw: dict, category: str, primary_key: str) -> dict:
    """Convert a nested seed record into a flat-ish JSON record."""
    primary = raw.get(primary_key, {}) or {}
    research = raw.get("research", {}) or {}
    sources = raw.get("sources", []) or []

    name = primary.get("name", "") or ""
    name = name.strip()

    # Best-effort city/state — different categories store them in different sections
    city = (
        get_nested(raw, f"{primary_key}.city")
        or get_nested(raw, "origin.home_city")
        or get_nested(raw, "location.city")
        or get_nested(raw, f"{primary_key}.home_city")
        or get_nested(raw, f"{primary_key}.headquarters_city")
        or get_nested(raw, f"{primary_key}.headquartered_city")
    )
    state = (
        get_nested(raw, f"{primary_key}.state")
        or get_nested(raw, "origin.home_state")
        or get_nested(raw, "location.state")
        or get_nested(raw, f"{primary_key}.home_state")
        or get_nested(raw, f"{primary_key}.headquarters_state")
        or get_nested(raw, f"{primary_key}.headquartered_state")
    )

    # Email / phone / website — try common locations
    email = (
        scrub(get_nested(raw, f"{primary_key}.email"))
        or scrub(get_nested(raw, "booking.booking_email"))
        or scrub(get_nested(raw, "booking.booker_email"))
        or scrub(get_nested(raw, "contact.email"))
        or scrub(get_nested(raw, "contact.pitch_email"))
        or scrub(get_nested(raw, "writer.email"))
        or scrub(get_nested(raw, "contacts.a_and_r_contacts.0.email"))
        or scrub(get_nested(raw, "booking.talent_buyer_email"))
        or scrub(get_nested(raw, "business.booking_contact_email"))
    )
    phone = (
        scrub(get_nested(raw, f"{primary_key}.phone"))
        or scrub(get_nested(raw, "booking.booking_phone"))
        or scrub(get_nested(raw, "booking.booker_phone"))
        or scrub(get_nested(raw, "contact.phone"))
        or scrub(get_nested(raw, "business.booking_contact_phone"))
    )
    website = (
        scrub(get_nested(raw, f"{primary_key}.website"))
        or scrub(get_nested(raw, "links.website"))
        or scrub(get_nested(raw, "outlet.website"))
    )

    slug_base = name if name else f"{category}-unknown-{id(raw)}"
    slug_loc = city or ""
    slug = slugify(f"{slug_base}-{slug_loc}") if slug_loc else slugify(slug_base)

    gaps = research.get("gaps_to_resolve", []) or []
    confidence = research.get("overall_confidence", "UNKNOWN")

    # Primary genres if present anywhere sensible
    primary_genres = (
        get_nested(raw, f"{primary_key}.primary_genres")
        or get_nested(raw, "work.primary_genres")
        or get_nested(raw, "programming.primary_genres")
        or get_nested(raw, "programming_focus.primary_genres")
        or []
    )

    status = (
        get_nested(raw, f"{primary_key}.status")
        or "active"
    )

    # Heritage flag for musicians
    is_heritage = get_nested(raw, "legacy.is_heritage", "")

    return {
        "slug": slug,
        "name": name,
        "category": category,
        "city": scrub(city),
        "state": scrub(state),
        "email": email,
        "phone": phone,
        "website": website,
        "status": status,
        "confidence": confidence,
        "is_heritage": is_heritage if is_heritage else None,
        "primary_genres": primary_genres if isinstance(primary_genres, list) else [],
        "gaps_count": len(gaps),
        "source_count": len(sources),
        "next_action": research.get("next_call_or_email", "") or "",
        "full_record": raw,  # Preserve the full nested structure
    }


def write_outputs(records: list, category: str, out_dir: Path, seed_filename: str):
    out_dir.mkdir(parents=True, exist_ok=True)

    # 1. Catalog JSON
    catalog_path = out_dir / f"{category}-catalog.json"
    with open(catalog_path, "w") as f:
        json.dump({"count": len(records), "category": category, "records": records}, f, indent=2, default=str)
    print(f"  ✓ Catalog: {catalog_path}")

    # 2. Flat CSV list (one row per record)
    csv_path = out_dir / f"{category}-list.csv"
    with open(csv_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "slug", "name", "city", "state", "email", "phone", "website",
            "status", "confidence", "is_heritage", "primary_genres",
            "gaps_count", "source_count", "next_action",
        ])
        for r in records:
            writer.writerow([
                r["slug"], r["name"],
                r["city"] or "", r["state"] or "",
                r["email"] or "", r["phone"] or "", r["website"] or "",
                r["status"], r["confidence"],
                r["is_heritage"] or "",
                "; ".join(r["primary_genres"]) if r["primary_genres"] else "",
                r["gaps_count"], r["source_count"],
                r["next_action"],
            ])
    print(f"  ✓ CSV: {csv_path}")

    # 3. Phone call list — one row per (record, gap)
    call_list_path = out_dir / "phone-call-list.csv"
    with open(call_list_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "name", "city", "state", "phone", "email", "website",
            "confidence", "next_action",
            "gap_field", "gap_category",
            "gap_index", "total_gaps_for_record",
        ])
        total = 0
        for r in records:
            gaps = (r["full_record"].get("research", {}) or {}).get("gaps_to_resolve", []) or []
            if not gaps:
                writer.writerow([
                    r["name"], r["city"] or "", r["state"] or "",
                    r["phone"] or "", r["email"] or "", r["website"] or "",
                    r["confidence"], r["next_action"],
                    "(no gaps)", "", "", 0,
                ])
                continue
            for i, gap in enumerate(gaps, 1):
                cat = str(gap).split(".")[0] if "." in str(gap) else "other"
                writer.writerow([
                    r["name"], r["city"] or "", r["state"] or "",
                    r["phone"] or "", r["email"] or "", r["website"] or "",
                    r["confidence"], r["next_action"],
                    gap, cat, i, len(gaps),
                ])
                total += 1
    print(f"  ✓ Call list: {call_list_path} ({total} gap rows)")

    # 4. Summary markdown
    by_state = Counter(r["state"] or "?" for r in records)
    by_city = defaultdict(list)
    for r in records:
        loc = f"{r['city']}, {r['state']}" if r["city"] else "Unknown"
        by_city[loc].append(r)
    by_confidence = Counter(r["confidence"] for r in records)
    by_status = Counter(r["status"] for r in records)
    with_contact = sum(1 for r in records if r["email"] or r["phone"])
    with_website = sum(1 for r in records if r["website"])

    heritage_count = sum(1 for r in records if r["is_heritage"] == "yes")
    working_count = sum(1 for r in records if r["is_heritage"] == "no")

    summary_path = out_dir / f"{category}-summary.md"
    with open(summary_path, "w") as f:
        f.write(f"# Big Muddy Directory — {category.title()}\n\n")
        f.write(f"*Seeded from `Perplexity-research/{seed_filename}`. {len(records)} records across the Mississippi corridor.*\n\n")
        f.write(f"## At a glance\n\n")
        f.write(f"| Metric | Value |\n|---|---|\n")
        f.write(f"| Total records | {len(records)} |\n")
        f.write(f"| With contact info | {with_contact} |\n")
        f.write(f"| With website | {with_website} |\n")
        f.write(f"| States covered | {len(by_state)} ({', '.join(sorted(by_state.keys()))}) |\n")
        f.write(f"| Cities/locations | {len(by_city)} |\n")
        if heritage_count or working_count:
            f.write(f"| Heritage | {heritage_count} |\n")
            f.write(f"| Working | {working_count} |\n")
        f.write(f"\n")

        f.write(f"## By status\n\n")
        for st, count in by_status.most_common():
            f.write(f"- **{st}**: {count}\n")
        f.write("\n")

        f.write(f"## By confidence\n\n")
        for conf, count in by_confidence.most_common():
            f.write(f"- **{conf}**: {count}\n")
        f.write("\n")

        f.write(f"## By location\n\n")
        for loc, vs in sorted(by_city.items(), key=lambda kv: -len(kv[1])):
            f.write(f"### {loc} — {len(vs)} records\n\n")
            for r in vs:
                genre = ", ".join(r["primary_genres"][:2]) if r["primary_genres"] else ""
                tag = ""
                if r["is_heritage"] == "yes":
                    tag = " ★"
                f.write(f"- **{r['name']}**{tag} `{r['confidence']}`")
                if genre:
                    f.write(f" — {genre}")
                f.write("\n")
                if r["email"]:
                    f.write(f"  - Email: {r['email']}\n")
                elif r["phone"]:
                    f.write(f"  - Phone: {r['phone']}\n")
                elif r["website"]:
                    f.write(f"  - Web: {r['website']}\n")
                f.write(f"  - Gaps: {r['gaps_count']}\n")
            f.write("\n")

    print(f"  ✓ Summary: {summary_path}")


def main():
    import argparse
    import shutil

    parser = argparse.ArgumentParser(
        description="Ingest a category seed YAML into JSON catalog + CSV + summary."
    )
    parser.add_argument(
        "category",
        choices=list(CATEGORY_CONFIG.keys()),
        help=f"Category to ingest. One of: {', '.join(CATEGORY_CONFIG.keys())}",
    )
    parser.add_argument(
        "--keep-existing",
        action="store_true",
        help="Do NOT wipe data/directory/<category>/ before writing. "
             "Default behavior is to wipe, so the YAML seed is the single source of truth.",
    )
    args = parser.parse_args()

    category = args.category
    cfg = CATEGORY_CONFIG[category]
    seed_path = SEED_DIR / cfg["seed_file"]

    if not seed_path.exists():
        print(f"ERROR: {seed_path} not found", file=sys.stderr)
        print(f"Drop the {cfg['seed_file']} file into Perplexity-research/ first.", file=sys.stderr)
        sys.exit(1)

    print(f"=== Ingesting {category} from {seed_path.name} ===\n")
    with open(seed_path, "r") as f:
        data = yaml.safe_load(f)

    top_key = cfg["top_key"]
    primary_key = cfg["primary_key"]
    raw_records = data.get(top_key, []) or []

    if not raw_records:
        # Fallback: try first list-valued key in the root
        for k, v in (data or {}).items():
            if isinstance(v, list) and v:
                raw_records = v
                top_key = k
                print(f"  (Using fallback top-level key: {k})")
                break

    print(f"Found {len(raw_records)} records in {top_key}: list\n")

    records = [build_record(r, category, primary_key) for r in raw_records]

    out_dir = OUT_ROOT / category

    # ATOMIC REPLACEMENT: wipe the category dir first so YAML is canonical.
    # This prevents stale MD-derived files from co-existing with YAML output.
    if out_dir.exists() and not args.keep_existing:
        print(f"  Wiping existing {out_dir} (use --keep-existing to skip)")
        shutil.rmtree(out_dir)

    write_outputs(records, category, out_dir, cfg["seed_file"])

    # Final summary
    total_gaps = sum(r["gaps_count"] for r in records)
    by_conf = Counter(r["confidence"] for r in records)

    print(f"\n=== {category.upper()} INGESTION COMPLETE ===")
    print(f"Records: {len(records)}")
    print(f"High confidence: {by_conf.get('High', 0)}")
    print(f"Medium confidence: {by_conf.get('Medium', 0)}")
    print(f"Low confidence: {by_conf.get('Low', 0)}")
    print(f"Total gaps to resolve: {total_gaps}")
    print(f"\nOutputs at: {out_dir}")


if __name__ == "__main__":
    main()
