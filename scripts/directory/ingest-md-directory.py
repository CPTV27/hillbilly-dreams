#!/usr/bin/env python3
"""
Generic ingester for the corridor-directory markdown research files.

Reads the 10 Perplexity research .md files, parses them into structured
records (one per entity), and emits:
  - JSON catalog per category
  - CSV flat list (one row per entity)
  - Markdown summary with counts, geographies, and top-confidence records
  - Per-state/region briefs where applicable

The MD files are narrative research documents with a consistent per-entity
structure: `### Name` heading followed by a bullet list of `- **Key:** value`
pairs, entities separated by `---`.

Usage:
    python3 scripts/directory/ingest-md-directory.py
    python3 scripts/directory/ingest-md-directory.py --category musicians
    python3 scripts/directory/ingest-md-directory.py --dry-run

Outputs land at data/directory/{category}/ alongside the venue outputs.
"""

import sys
import re
import json
import csv
import os
from pathlib import Path
from collections import defaultdict, Counter

ROOT = Path(__file__).resolve().parent.parent.parent
SRC_DIR = ROOT / "Perplexity-research" / "corridor-directory"
OUT_ROOT = ROOT / "data" / "directory"

# File → category mapping
SOURCES = {
    "01-venues.md":                "venues-md",            # venue narratives (supplemental to yaml seed)
    "02-musicians.md":             "musicians",
    "03-legacy.md":                "legacy-artists",
    "04-studios.md":               "studios",
    "05-press.md":                 "press",
    "06-labels-management.md":     "labels",
    "07-festivals.md":             "festivals",
    "08-tourism.md":               "tourism",
    "09-infrastructure.md":        "infrastructure",
    "10-editorial.md":             "editorial-pitches",
}


def slugify(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "-", s)
    return s.strip("-")


def parse_md_file(md_path: Path) -> list:
    """
    Parse a markdown file into a list of records.

    Heuristic: each entity starts with `### Name` and is followed by bullet
    list entries of the form `- **Key:** value`. Entities are separated by
    `---` fences and/or blank lines.
    """
    text = md_path.read_text(encoding="utf-8")

    # Split on top-level entity headings (### only, not #### or deeper)
    # and capture the heading line with each entity.
    # Use a regex that matches `### ` at the start of a line.
    chunks = re.split(r"(?m)^### (?!#)", text)
    # First chunk is everything before the first `###` — skip it (intro, TOC, etc.)
    chunks = chunks[1:] if chunks else []

    records = []
    for chunk in chunks:
        lines = chunk.splitlines()
        if not lines:
            continue
        name = lines[0].strip()
        # Skip "back to top" or empty names
        if not name or name.lower().startswith("back to"):
            continue

        record = {"name": name, "slug": slugify(name), "fields": {}, "notes": [], "sources": []}

        # Scan bullet lines for `- **Key:** value` pairs
        for line in lines[1:]:
            line = line.rstrip()
            if not line.strip():
                continue
            # `- **Key:** value`
            m = re.match(r"^\s*-\s+\*\*([^*]+?):\*\*\s*(.*)$", line)
            if m:
                key = m.group(1).strip().lower().replace(" ", "_").replace("/", "_")
                val = m.group(2).strip()
                # Accumulate multiple values under same key
                if key in record["fields"]:
                    if isinstance(record["fields"][key], list):
                        record["fields"][key].append(val)
                    else:
                        record["fields"][key] = [record["fields"][key], val]
                else:
                    record["fields"][key] = val
                # Pull raw source URLs out of the value
                for url_match in re.finditer(r"\((https?://[^\s)]+)\)", val):
                    record["sources"].append(url_match.group(1))
            elif line.strip().startswith("- "):
                # Plain bullet, no key
                record["notes"].append(line.strip()[2:])

        # De-dupe sources
        record["sources"] = sorted(set(record["sources"]))
        records.append(record)

    return records


def extract_location(fields: dict) -> tuple:
    """Best-effort extraction of (city, state) from various field names."""
    for key in ("base", "location", "hq", "headquarters", "hometown", "home_base", "based", "city"):
        val = fields.get(key)
        if isinstance(val, str):
            # Parse "City, ST" or "City, State"
            m = re.match(r"^([^,]+?),\s*([A-Z]{2}|[A-Za-z]+)", val)
            if m:
                city = m.group(1).strip()
                state_raw = m.group(2).strip()
                # Normalize state to 2-letter if possible
                state_map = {
                    "mississippi": "MS", "tennessee": "TN", "louisiana": "LA",
                    "arkansas": "AR", "alabama": "AL", "georgia": "GA",
                    "kentucky": "KY", "texas": "TX", "missouri": "MO",
                }
                state = state_map.get(state_raw.lower(), state_raw[:2].upper())
                return city, state
    return None, None


def extract_contact(fields: dict) -> dict:
    """Pull email, phone, website, socials out of various field names."""
    contact = {"email": None, "phone": None, "website": None,
               "instagram": None, "facebook": None, "twitter": None, "tiktok": None, "youtube": None}

    for key, val in fields.items():
        if not isinstance(val, str):
            continue
        vlow = val.lower()

        # Email
        em = re.search(r"\b([\w.+-]+@[\w-]+\.[\w.-]+)\b", val)
        if em and not contact["email"]:
            contact["email"] = em.group(1)
        # Phone
        ph = re.search(r"\b\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b", val)
        if ph and not contact["phone"]:
            contact["phone"] = ph.group(0)
        # Instagram handle
        ig = re.search(r"@([\w.]+)", val)
        if ig and "instagram" in key and not contact["instagram"]:
            contact["instagram"] = "@" + ig.group(1)
        # URLs
        for url in re.findall(r"https?://[^\s)\]]+", val):
            uh = url.lower()
            if "instagram.com" in uh and not contact["instagram"]:
                contact["instagram"] = url
            elif "facebook.com" in uh and not contact["facebook"]:
                contact["facebook"] = url
            elif "twitter.com" in uh or "x.com/" in uh and not contact["twitter"]:
                contact["twitter"] = url
            elif "tiktok.com" in uh and not contact["tiktok"]:
                contact["tiktok"] = url
            elif "youtube.com" in uh or "youtu.be" in uh and not contact["youtube"]:
                contact["youtube"] = url
            elif not contact["website"] and "instagram.com" not in uh and "facebook.com" not in uh \
                    and "twitter.com" not in uh and "tiktok.com" not in uh:
                # First non-social URL is the website
                contact["website"] = url

    return contact


def normalize_record(record: dict, category: str) -> dict:
    """Add structured fields on top of the parsed markdown."""
    city, state = extract_location(record["fields"])
    contact = extract_contact(record["fields"])

    # Gaps = fields that are mentioned but empty/unknown
    gaps = []
    for k, v in record["fields"].items():
        if isinstance(v, str) and (v.strip() == "" or "unknown" in v.lower() or "tbd" in v.lower()):
            gaps.append(k)

    return {
        "slug": record["slug"],
        "name": record["name"],
        "category": category,
        "city": city,
        "state": state,
        "email": contact["email"],
        "phone": contact["phone"],
        "website": contact["website"],
        "socials": {k: contact[k] for k in ("instagram", "facebook", "twitter", "tiktok", "youtube") if contact[k]},
        "fields": record["fields"],
        "notes": record["notes"],
        "sources": record["sources"],
        "source_count": len(record["sources"]),
        "gaps_count": len(gaps),
        "gap_fields": gaps,
    }


def process_category(md_path: Path, category: str, out_dir: Path, dry_run: bool = False):
    """Process one MD file into the ingestion outputs."""
    print(f"\n=== {category} ({md_path.name}) ===")
    raw_records = parse_md_file(md_path)
    records = [normalize_record(r, category) for r in raw_records]
    if not records:
        print(f"  (no records parsed — skipping)")
        return 0

    print(f"  Parsed: {len(records)} records")

    if dry_run:
        return len(records)

    out_dir.mkdir(parents=True, exist_ok=True)

    # 1. JSON catalog
    catalog_path = out_dir / f"{category}-catalog.json"
    with open(catalog_path, "w") as f:
        json.dump({"count": len(records), "category": category, "records": records}, f, indent=2, default=str)
    print(f"  ✓ Catalog: {catalog_path}")

    # 2. CSV flat list — one row per entity
    csv_path = out_dir / f"{category}-list.csv"
    # Collect all unique field keys across records
    all_field_keys = set()
    for r in records:
        all_field_keys.update(r["fields"].keys())
    all_field_keys = sorted(all_field_keys)[:20]  # Cap at 20 most common fields for readability

    with open(csv_path, "w", newline="") as f:
        writer = csv.writer(f)
        header = ["slug", "name", "city", "state", "email", "phone", "website", "source_count", "gaps_count"] + list(all_field_keys)
        writer.writerow(header)
        for r in records:
            row = [
                r["slug"], r["name"], r["city"] or "", r["state"] or "",
                r["email"] or "", r["phone"] or "", r["website"] or "",
                r["source_count"], r["gaps_count"],
            ]
            for fk in all_field_keys:
                val = r["fields"].get(fk, "")
                if isinstance(val, list):
                    val = "; ".join(str(v) for v in val)
                row.append(str(val)[:500])  # Truncate long values
            writer.writerow(row)
    print(f"  ✓ CSV: {csv_path}")

    # 3. Summary markdown
    by_state = Counter(r["state"] or "?" for r in records)
    by_city = defaultdict(list)
    for r in records:
        by_city[f"{r['city']}, {r['state']}" if r["city"] else "Unknown"].append(r)

    with_contact = sum(1 for r in records if r["email"] or r["phone"])
    with_website = sum(1 for r in records if r["website"])
    with_sources = sum(1 for r in records if r["source_count"] > 0)

    summary_path = out_dir / f"{category}-summary.md"
    with open(summary_path, "w") as f:
        f.write(f"# Big Muddy Directory — {category.replace('-', ' ').title()}\n\n")
        f.write(f"*Ingested from `Perplexity-research/corridor-directory/{md_path.name}`. "
                f"{len(records)} records across the Mississippi corridor.*\n\n")
        f.write(f"## At a glance\n\n")
        f.write(f"| Metric | Value |\n|---|---|\n")
        f.write(f"| Total records | {len(records)} |\n")
        f.write(f"| With contact info | {with_contact} |\n")
        f.write(f"| With website | {with_website} |\n")
        f.write(f"| With cited sources | {with_sources} |\n")
        f.write(f"| States covered | {len(by_state)} |\n")
        f.write(f"| Cities / locations | {len(by_city)} |\n\n")

        f.write(f"## By state\n\n")
        for st, count in by_state.most_common():
            f.write(f"- **{st}**: {count}\n")
        f.write("\n")

        f.write(f"## Records\n\n")
        for r in records:
            loc = f" — {r['city']}, {r['state']}" if r['city'] else ""
            f.write(f"### {r['name']}{loc}\n\n")
            for k, v in list(r["fields"].items())[:8]:
                if isinstance(v, list):
                    v = "; ".join(str(x) for x in v)
                f.write(f"- **{k}:** {v}\n")
            if r["email"] or r["phone"] or r["website"]:
                f.write(f"- _Contact: "
                        f"{r['email'] or ''} "
                        f"{r['phone'] or ''} "
                        f"{r['website'] or ''}_\n")
            f.write(f"- _Sources: {r['source_count']}, Gaps: {r['gaps_count']}_\n\n")

    print(f"  ✓ Summary: {summary_path}")

    return len(records)


def main():
    dry_run = "--dry-run" in sys.argv
    filter_cat = None
    if "--category" in sys.argv:
        idx = sys.argv.index("--category")
        if idx + 1 < len(sys.argv):
            filter_cat = sys.argv[idx + 1]

    if not SRC_DIR.exists():
        print(f"ERROR: {SRC_DIR} not found. Did you unzip corridor-directory.zip?", file=sys.stderr)
        sys.exit(1)

    total_records = 0
    total_categories = 0
    for fname, cat in SOURCES.items():
        if filter_cat and filter_cat != cat:
            continue
        md_path = SRC_DIR / fname
        if not md_path.exists():
            print(f"  ⚠ Missing: {md_path.name} — skipping")
            continue
        out_dir = OUT_ROOT / cat
        count = process_category(md_path, cat, out_dir, dry_run=dry_run)
        total_records += count
        total_categories += 1

    print(f"\n=== SUMMARY ===")
    print(f"Categories processed: {total_categories}")
    print(f"Total records: {total_records}")
    if not dry_run:
        print(f"Outputs at: {OUT_ROOT}")


if __name__ == "__main__":
    main()
