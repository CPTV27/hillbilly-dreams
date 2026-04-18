#!/usr/bin/env python3
"""
Ingest venues-seed.yaml from Perplexity research into operational formats.

Reads:
    Perplexity-research/venues-seed.yaml

Writes:
    data/directory/venues/venues-catalog.json      (clean JSON catalog, one record per venue)
    data/directory/venues/phone-call-list.csv      (every gap, every venue, ready for follow-up calls)
    data/directory/venues/venues-summary.md        (human-readable summary + priority list)
    data/directory/venues/by-city/{city}.md        (per-city brief, one file per corridor city)

Usage:
    python3 scripts/directory/ingest-venues.py
    python3 scripts/directory/ingest-venues.py --prisma      # Also upsert to Prisma (requires DB)
    python3 scripts/directory/ingest-venues.py --dry-run     # Show what would happen

No DB required for the base run. Prisma ingestion is opt-in via --prisma flag
once the migration is in place.
"""

import sys
import json
import csv
import os
import re
from pathlib import Path
from collections import defaultdict

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML not installed. Run: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent.parent
SEED_FILE = ROOT / "Perplexity-research" / "venues-seed.yaml"
OUT_DIR = ROOT / "data" / "directory" / "venues"
OUT_DIR.mkdir(parents=True, exist_ok=True)
BY_CITY_DIR = OUT_DIR / "by-city"
BY_CITY_DIR.mkdir(exist_ok=True)


def slugify(s: str) -> str:
    """Lowercase, strip non-alphanumerics, hyphenate."""
    s = s.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "-", s)
    return s.strip("-")


def is_unknown(v):
    """True if value is 'UNKNOWN', None, empty string, or empty list."""
    if v is None:
        return True
    if isinstance(v, str):
        return v.strip().upper() == "UNKNOWN" or v.strip() == ""
    if isinstance(v, (list, dict)):
        return len(v) == 0
    return False


def flatten_gaps(venue: dict) -> list:
    """Return the list of gaps_to_resolve for this venue."""
    research = venue.get("research", {}) or {}
    return research.get("gaps_to_resolve", []) or []


def build_clean_record(raw: dict) -> dict:
    """
    Convert Perplexity nested structure into a clean flat record
    suitable for ingestion, with nested sections preserved.
    """
    v = raw.get("venue", {}) or {}
    room = raw.get("room", {}) or {}
    production = raw.get("production", {}) or {}
    staffing = raw.get("staffing", {}) or {}
    bar_food = raw.get("bar_and_food", {}) or {}
    booking = raw.get("booking", {}) or {}
    calendar = raw.get("calendar", {}) or {}
    context = raw.get("business_context", {}) or {}
    research = raw.get("research", {}) or {}
    sources = raw.get("sources", []) or []

    name = v.get("name", "").strip()
    city = v.get("city", "").strip()
    state = v.get("state", "").strip()
    slug = f"{slugify(name)}-{slugify(city)}" if name and city else slugify(name)

    # Parse lat_lon if present (format varies: "lat, lng" or "UNKNOWN")
    lat = lng = None
    lat_lon = v.get("lat_lon")
    if lat_lon and not is_unknown(lat_lon):
        try:
            parts = [p.strip() for p in str(lat_lon).split(",")]
            if len(parts) == 2:
                lat, lng = float(parts[0]), float(parts[1])
        except (ValueError, TypeError):
            pass

    # Parse ZIP from address if visible
    address = v.get("address", "")
    zip_code = None
    if address and not is_unknown(address):
        zip_match = re.search(r"\b(\d{5})(?:-\d{4})?\b", address)
        if zip_match:
            zip_code = zip_match.group(1)

    # Top-level normalized record
    record = {
        "slug": slug,
        "name": name,
        "category": "venue",
        "city": city,
        "state": state or "MS",
        "address": None if is_unknown(address) else address,
        "zip": zip_code,
        "lat": lat,
        "lng": lng,
        "phone": None if is_unknown(v.get("phone")) else v.get("phone"),
        "website": None if is_unknown(v.get("website")) else v.get("website"),
        "email": None if is_unknown(v.get("email")) else v.get("email"),
        "status": v.get("status", "active"),
        "year_opened": None if is_unknown(v.get("year_opened")) else v.get("year_opened"),
        "neighborhood": None if is_unknown(v.get("neighborhood")) else v.get("neighborhood"),
        "venue_types": v.get("venue_type", []) or [],
        "primary_genres": v.get("primary_genres", []) or [],
        "secondary_genres": v.get("secondary_genres", []) or [],
        "age_policy": None if is_unknown(v.get("age_policy")) else v.get("age_policy"),
        "capacity_tier": None if is_unknown(room.get("capacity_tier")) else room.get("capacity_tier"),
        "capacity_standing": None if is_unknown(room.get("capacity_standing")) else room.get("capacity_standing"),
        "capacity_seated": None if is_unknown(room.get("capacity_seated")) else room.get("capacity_seated"),
        "booker_name": None if is_unknown(booking.get("booker_name")) else booking.get("booker_name"),
        "booker_email": None if is_unknown(booking.get("booker_email")) else booking.get("booker_email"),
        "booker_phone": None if is_unknown(booking.get("booker_phone")) else booking.get("booker_phone"),
        "typical_fee_range": None if is_unknown(booking.get("typical_fee_range")) else booking.get("typical_fee_range"),
        "deal_structure": None if is_unknown(booking.get("deal_structure")) else booking.get("deal_structure"),
        "socials": {k: (None if is_unknown(v) else v) for k, v in (v.get("socials", {}) or {}).items()},
        "confidence": research.get("overall_confidence", "UNKNOWN"),
        "next_contact_action": research.get("next_call_or_email", ""),
        "gaps_count": len(flatten_gaps(raw)),
        # Preserve full rich data for the metadata JSON column later
        "full_record": {
            "venue": v,
            "room": room,
            "production": production,
            "staffing": staffing,
            "bar_and_food": bar_food,
            "booking": booking,
            "calendar": calendar,
            "business_context": context,
            "research": research,
            "sources": sources,
        },
    }
    return record


def main():
    prisma_mode = "--prisma" in sys.argv
    dry_run = "--dry-run" in sys.argv

    print(f"Reading: {SEED_FILE}")
    if not SEED_FILE.exists():
        print(f"ERROR: {SEED_FILE} not found", file=sys.stderr)
        sys.exit(1)

    with open(SEED_FILE, "r") as f:
        data = yaml.safe_load(f)

    raw_venues = data.get("venues", [])
    print(f"Found {len(raw_venues)} venue records\n")

    records = [build_clean_record(v) for v in raw_venues]

    # === 1. Write clean JSON catalog ===
    catalog_path = OUT_DIR / "venues-catalog.json"
    if not dry_run:
        with open(catalog_path, "w") as f:
            json.dump({"count": len(records), "venues": records}, f, indent=2, default=str)
    print(f"✓ Catalog: {catalog_path} ({len(records)} records)")

    # === 2. Write phone call list (CSV) ===
    # One row per (venue, gap) combination — a concrete call list.
    call_list_path = OUT_DIR / "phone-call-list.csv"
    if not dry_run:
        with open(call_list_path, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([
                "venue_name", "city", "state",
                "phone", "booker_email", "website",
                "confidence", "next_contact_action",
                "gap_field", "gap_category",
                "gap_index", "total_gaps_for_venue",
            ])
            total_gap_rows = 0
            for r in records:
                gaps = r["full_record"]["research"].get("gaps_to_resolve", []) or []
                if not gaps:
                    # Venue with no gaps still gets one row so it appears in the list
                    writer.writerow([
                        r["name"], r["city"], r["state"],
                        r["phone"] or "", r["booker_email"] or "", r["website"] or "",
                        r["confidence"], r["next_contact_action"],
                        "(no gaps)", "", "", 0,
                    ])
                    continue
                for i, gap in enumerate(gaps, 1):
                    cat = str(gap).split(".")[0] if "." in str(gap) else "other"
                    writer.writerow([
                        r["name"], r["city"], r["state"],
                        r["phone"] or "", r["booker_email"] or "", r["website"] or "",
                        r["confidence"], r["next_contact_action"],
                        gap, cat,
                        i, len(gaps),
                    ])
                    total_gap_rows += 1
    print(f"✓ Call list: {call_list_path} ({total_gap_rows} gap rows)")

    # === 3. Write summary markdown ===
    summary_path = OUT_DIR / "venues-summary.md"
    by_city = defaultdict(list)
    by_state = defaultdict(int)
    by_confidence = defaultdict(int)
    by_capacity = defaultdict(int)
    for r in records:
        by_city[r["city"] or "UNKNOWN"].append(r)
        by_state[r["state"] or "?"] += 1
        by_confidence[r["confidence"]] += 1
        tier = r["capacity_tier"] or "?"
        by_capacity[tier] += 1

    if not dry_run:
        with open(summary_path, "w") as f:
            f.write(f"# Big Muddy Directory — Venues\n\n")
            f.write(f"*Seeded from Perplexity research. {len(records)} venues across the Mississippi corridor.*\n\n")
            f.write(f"## At a glance\n\n")
            f.write(f"| Metric | Value |\n|---|---|\n")
            f.write(f"| Total venues | {len(records)} |\n")
            f.write(f"| States covered | {len(by_state)} ({', '.join(sorted(by_state.keys()))}) |\n")
            f.write(f"| Cities covered | {len(by_city)} |\n")
            f.write(f"| High confidence | {by_confidence.get('High', 0)} |\n")
            f.write(f"| Medium confidence | {by_confidence.get('Medium', 0)} |\n")
            f.write(f"| Low confidence | {by_confidence.get('Low', 0)} |\n\n")

            f.write(f"## By city\n\n")
            for city, vs in sorted(by_city.items()):
                f.write(f"### {city}, {vs[0]['state']} — {len(vs)} venues\n\n")
                for r in vs:
                    tier = f"[{r['capacity_tier']}]" if r['capacity_tier'] else ""
                    conf = f"`{r['confidence']}`"
                    genre = ", ".join(r["primary_genres"][:2]) if r["primary_genres"] else ""
                    f.write(f"- **{r['name']}** {tier} {conf} — {genre}\n")
                    if r['booker_email']:
                        f.write(f"  - Booking: {r['booker_email']}\n")
                    elif r['phone']:
                        f.write(f"  - Phone: {r['phone']}\n")
                    elif r['website']:
                        f.write(f"  - Web: {r['website']}\n")
                    f.write(f"  - Gaps to resolve: {r['gaps_count']}\n")
                f.write("\n")

            f.write(f"## Priority call list (venues with known booking contact + most gaps to close)\n\n")
            priority = sorted(
                [r for r in records if r['booker_email'] or r['phone']],
                key=lambda r: (-r['gaps_count'], r['name']),
            )[:20]
            f.write("| Venue | City | Contact | Gaps |\n|---|---|---|---|\n")
            for r in priority:
                contact = r['booker_email'] or r['phone'] or "?"
                f.write(f"| {r['name']} | {r['city']}, {r['state']} | {contact} | {r['gaps_count']} |\n")
    print(f"✓ Summary: {summary_path}")

    # === 4. Per-city briefs ===
    for city, vs in by_city.items():
        city_slug = slugify(city)
        brief_path = BY_CITY_DIR / f"{city_slug}.md"
        if not dry_run:
            with open(brief_path, "w") as f:
                f.write(f"# {city} — Venue Brief\n\n")
                f.write(f"**{len(vs)} venues** researched. State: {vs[0]['state']}\n\n")
                for r in vs:
                    f.write(f"## {r['name']}\n\n")
                    f.write(f"- **Status:** {r['status']}\n")
                    f.write(f"- **Type:** {', '.join(r['venue_types']) if r['venue_types'] else 'UNKNOWN'}\n")
                    f.write(f"- **Capacity:** {r['capacity_standing'] or '?'} standing, tier {r['capacity_tier'] or '?'}\n")
                    f.write(f"- **Genres:** {', '.join(r['primary_genres']) if r['primary_genres'] else 'UNKNOWN'}\n")
                    f.write(f"- **Address:** {r['address'] or 'UNKNOWN'}\n")
                    f.write(f"- **Website:** {r['website'] or 'UNKNOWN'}\n")
                    f.write(f"- **Phone:** {r['phone'] or 'UNKNOWN'}\n")
                    f.write(f"- **Booker:** {r['booker_email'] or r['booker_phone'] or 'UNKNOWN'}\n")
                    f.write(f"- **Confidence:** {r['confidence']}\n")
                    f.write(f"- **Gaps to resolve:** {r['gaps_count']}\n")
                    if r['next_contact_action']:
                        f.write(f"- **Next action:** {r['next_contact_action']}\n")
                    f.write("\n")
    print(f"✓ Per-city briefs: {BY_CITY_DIR} ({len(by_city)} files)")

    # === 5. Prisma ingest (optional) ===
    if prisma_mode:
        print("\n--prisma mode: would upsert to DirectoryBusiness (not implemented yet, needs migration for metadata JSON)")

    # === Summary output ===
    print(f"\n=== INGESTION COMPLETE ===")
    print(f"Venues: {len(records)}")
    print(f"Cities: {len(by_city)}")
    print(f"High confidence: {by_confidence.get('High', 0)}")
    print(f"Medium confidence: {by_confidence.get('Medium', 0)}")
    print(f"Low confidence: {by_confidence.get('Low', 0)}")
    total_gaps = sum(r['gaps_count'] for r in records)
    print(f"Total gaps to resolve: {total_gaps}")
    print(f"\nOutputs at: {OUT_DIR}")


if __name__ == "__main__":
    main()
