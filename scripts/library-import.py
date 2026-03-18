#!/usr/bin/env python3
"""
BMT Photo Library Importer
═══════════════════════════
Takes photos you've edited in Lightroom (or anywhere), converts to webp,
scores them, and adds them to the shared library.

Lightroom Workflow:
  1. Edit in Lightroom (orientation, crop, color, etc.)
  2. Export → Custom Preset "BMT Library" (see --setup-lightroom)
  3. Run: python3 scripts/library-import.py ~/Pictures/bmt-export/

What it does:
  - Converts any jpg/png/tiff/heic to webp (1600px long edge, quality 82)
  - Runs technical scoring (sharpness, exposure, contrast, color, composition)
  - Copies webp files to apps/web/public/images/library/
  - Updates manifest.json
  - Prints what to add to photo-library.ts (or does it automatically with --auto)

Usage:
  python3 scripts/library-import.py <folder-or-files...> [options]
  python3 scripts/library-import.py ~/Pictures/bmt-export/
  python3 scripts/library-import.py ~/Pictures/bmt-export/*.jpg --prefix natchez
  python3 scripts/library-import.py --setup-lightroom

Options:
  --prefix NAME     Naming prefix (default: "corridor")
  --start NUM       Starting number for new photos (default: auto from manifest)
  --quality N       WebP quality 0-100 (default: 82)
  --max-dim N       Max dimension in px (default: 1600)
  --dry-run         Show what would happen without writing anything
  --setup-lightroom Print Lightroom export preset instructions
  --no-score        Skip technical scoring (faster)
"""

import os
import sys
import json
import shutil
import subprocess
import argparse
from pathlib import Path
from datetime import datetime

# ── Paths ────────────────────────────────────────────────────────────────────

REPO_ROOT = Path(__file__).resolve().parent.parent
LIBRARY_DIR = REPO_ROOT / "apps" / "web" / "public" / "images" / "library"
MANIFEST_PATH = LIBRARY_DIR / "manifest.json"
TS_LIBRARY_PATH = REPO_ROOT / "apps" / "web" / "lib" / "photo-library.ts"

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".tiff", ".tif", ".heic", ".webp", ".dng", ".arw"}

# ── Conversion ───────────────────────────────────────────────────────────────

def convert_to_webp(src: Path, dst: Path, max_dim: int = 1600, quality: int = 82) -> bool:
    """Convert any image to webp using cwebp (preferred) or sips fallback."""
    tmp_jpg = None

    try:
        ext = src.suffix.lower()

        # If already webp, just resize if needed
        if ext == ".webp":
            # Use cwebp to re-encode at target quality/size
            result = subprocess.run(
                ["cwebp", "-resize", str(max_dim), "0", "-q", str(quality), str(src), "-o", str(dst)],
                capture_output=True, timeout=30,
            )
            if result.returncode == 0 and dst.exists():
                return True

        # For HEIC/RAW, use sips to convert to JPEG first
        if ext in {".heic", ".dng", ".arw"}:
            tmp_jpg = dst.with_suffix(".tmp.jpg")
            subprocess.run(
                ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "95",
                 "-Z", str(max_dim), str(src), "--out", str(tmp_jpg)],
                capture_output=True, timeout=30,
            )
            if not tmp_jpg.exists():
                return False
            src = tmp_jpg

        # Convert to webp with cwebp
        result = subprocess.run(
            ["cwebp", "-resize", str(max_dim), "0", "-q", str(quality), str(src), "-o", str(dst)],
            capture_output=True, timeout=30,
        )

        if result.returncode != 0:
            # Fallback: sips → jpeg → cwebp
            if not tmp_jpg:
                tmp_jpg = dst.with_suffix(".tmp.jpg")
                subprocess.run(
                    ["sips", "-s", "format", "jpeg", "-Z", str(max_dim), str(src), "--out", str(tmp_jpg)],
                    capture_output=True, timeout=30,
                )
            if tmp_jpg and tmp_jpg.exists():
                result = subprocess.run(
                    ["cwebp", "-q", str(quality), str(tmp_jpg), "-o", str(dst)],
                    capture_output=True, timeout=30,
                )

        return dst.exists() and dst.stat().st_size > 1000

    except Exception as e:
        print(f"  ⚠ Convert failed: {e}")
        return False
    finally:
        if tmp_jpg and tmp_jpg.exists():
            tmp_jpg.unlink()


# ── Scoring (reuses photo-cull.py logic) ─────────────────────────────────────

def score_photo(path: Path) -> float:
    """Score a photo on technical quality. Returns 0-1 composite."""
    try:
        from PIL import Image
        import numpy as np

        img = Image.open(path)
        # Convert to RGB if needed
        if img.mode != "RGB":
            img = img.convert("RGB")
        # Work on a thumbnail for speed
        img.thumbnail((512, 512), Image.LANCZOS)
        arr = np.array(img, dtype=np.float64)

        if arr.size == 0:
            return 0.5

        # Sharpness (gradient variance)
        gray = np.mean(arr, axis=2)
        gx = np.diff(gray, axis=1)
        gy = np.diff(gray, axis=0)
        sharpness = float(np.var(gx) + np.var(gy))

        # Exposure
        brightness = np.mean(arr, axis=2)
        mean_b = np.mean(brightness)
        exposure = 1.0 - abs(mean_b - 128) / 128
        blown = np.sum(brightness > 250) / brightness.size
        crushed = np.sum(brightness < 5) / brightness.size
        exposure = max(0, min(1, exposure - (blown + crushed) * 2))

        # Contrast
        contrast = float(np.std(brightness)) / 128

        # Color richness
        r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
        max_c = np.maximum(np.maximum(r, g), b)
        min_c = np.minimum(np.minimum(r, g), b)
        chroma = max_c - min_c
        with np.errstate(divide="ignore", invalid="ignore"):
            saturation = np.where(max_c > 0, chroma / max_c, 0)
        color = float(np.mean(saturation))

        # Composition (rule of thirds energy)
        h, w = gray.shape
        interest = np.zeros_like(gray)
        interest[:, :w - 1] += np.abs(gx)
        interest[:h - 1, :] += np.abs(gy)
        total_energy = np.sum(interest)
        if total_energy > 0:
            r_size = min(h, w) // 8
            thirds_energy = 0
            for ty in [h // 3, 2 * h // 3]:
                for tx in [w // 3, 2 * w // 3]:
                    y1, y2 = max(0, ty - r_size), min(h, ty + r_size)
                    x1, x2 = max(0, tx - r_size), min(w, tx + r_size)
                    thirds_energy += np.sum(interest[y1:y2, x1:x2])
            composition = min(1.0, float(thirds_energy / total_energy) * 2.5)
        else:
            composition = 0.0

        # Weighted composite
        composite = (
            min(1.0, sharpness / 1000) * 0.30
            + exposure * 0.20
            + contrast * 0.20
            + color * 0.15
            + composition * 0.15
        )

        return round(composite, 4)

    except Exception as e:
        print(f"  ⚠ Score failed: {e}")
        return 0.5


# ── Manifest ─────────────────────────────────────────────────────────────────

def load_manifest() -> dict:
    if MANIFEST_PATH.exists():
        with open(MANIFEST_PATH) as f:
            return json.load(f)
    return {"generated": "", "source": "", "total": 0, "photos": []}


def save_manifest(manifest: dict):
    manifest["generated"] = datetime.now().strftime("%Y-%m-%d")
    manifest["total"] = len(manifest["photos"])
    # Sort by score descending
    manifest["photos"].sort(key=lambda p: p.get("score", 0), reverse=True)
    with open(MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"  ✅ manifest.json updated ({manifest['total']} photos)")


def get_next_num(manifest: dict, prefix: str) -> int:
    """Find the next available number for this prefix."""
    existing = set()
    for p in manifest.get("photos", []):
        if p["file"].startswith(prefix):
            try:
                num = int(p["file"].split("-")[-1].split(".")[0])
                existing.add(num)
            except ValueError:
                pass
    # Also check what's on disk
    for f in LIBRARY_DIR.glob(f"{prefix}-*.webp"):
        try:
            num = int(f.stem.split("-")[-1])
            existing.add(num)
        except ValueError:
            pass
    return max(existing, default=0) + 1


# ── Main Pipeline ────────────────────────────────────────────────────────────

def find_images(paths: list[str]) -> list[Path]:
    """Find all supported image files from the given paths."""
    images = []
    for p in paths:
        path = Path(p).expanduser().resolve()
        if path.is_dir():
            for f in sorted(path.iterdir()):
                if f.suffix.lower() in SUPPORTED_EXTENSIONS and not f.name.startswith("."):
                    images.append(f)
        elif path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS:
            images.append(path)
        else:
            print(f"  ⚠ Skipping: {p}")
    return images


def print_lightroom_setup():
    print("""
╔══════════════════════════════════════════════════════════════════════╗
║                  LIGHTROOM EXPORT PRESET SETUP                      ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  1. Open Lightroom Classic → File → Export                           ║
║                                                                      ║
║  2. Configure these settings:                                        ║
║                                                                      ║
║     Export Location:                                                 ║
║       → Specific folder: ~/Pictures/bmt-export                      ║
║                                                                      ║
║     File Naming:                                                     ║
║       → Custom Name - Sequence                                       ║
║       → Custom Text: (leave blank, the script handles naming)        ║
║       → Or keep original filenames — the script renames anyway       ║
║                                                                      ║
║     File Settings:                                                   ║
║       → Image Format: JPEG (the script converts to WebP)            ║
║       → Quality: 95 (let the script handle final compression)        ║
║       → Color Space: sRGB                                            ║
║                                                                      ║
║     Image Sizing:                                                    ║
║       → Resize to Fit: Long Edge                                     ║
║       → 2400 pixels (gives the script room to work)                  ║
║       → Resolution: 72 ppi                                           ║
║                                                                      ║
║     Output Sharpening:                                               ║
║       → Sharpen For: Screen                                          ║
║       → Amount: Standard                                             ║
║                                                                      ║
║     Metadata:                                                        ║
║       → Copyright Only (strips GPS/camera data for web)              ║
║                                                                      ║
║  3. Click "Add" in the preset panel → Name it "BMT Library"         ║
║                                                                      ║
║  4. After export, run:                                               ║
║                                                                      ║
║     python3 scripts/library-import.py ~/Pictures/bmt-export/         ║
║                                                                      ║
║  Lightroom CC (cloud) users:                                         ║
║     Export to Files app → ~/Pictures/bmt-export/ → same workflow     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
""")


def main():
    parser = argparse.ArgumentParser(
        description="BMT Photo Library Importer — Lightroom → Library pipeline"
    )
    parser.add_argument("paths", nargs="*", help="Folders or image files to import")
    parser.add_argument("--prefix", default="corridor", help="Naming prefix (default: corridor)")
    parser.add_argument("--start", type=int, default=0, help="Starting number (default: auto)")
    parser.add_argument("--quality", type=int, default=82, help="WebP quality (default: 82)")
    parser.add_argument("--max-dim", type=int, default=1600, help="Max dimension px (default: 1600)")
    parser.add_argument("--dry-run", action="store_true", help="Preview without writing")
    parser.add_argument("--no-score", action="store_true", help="Skip technical scoring")
    parser.add_argument("--setup-lightroom", action="store_true", help="Print Lightroom preset setup")
    args = parser.parse_args()

    if args.setup_lightroom:
        print_lightroom_setup()
        return

    if not args.paths:
        parser.print_help()
        print("\n  💡 Tip: Run with --setup-lightroom for Lightroom export preset instructions")
        return

    # Find images
    images = find_images(args.paths)
    if not images:
        print("❌ No supported images found.")
        print(f"   Supported: {', '.join(sorted(SUPPORTED_EXTENSIONS))}")
        return

    print(f"\n📸 Found {len(images)} image(s) to import\n")

    # Load manifest
    manifest = load_manifest()
    next_num = args.start if args.start > 0 else get_next_num(manifest, args.prefix)

    # Ensure library dir exists
    LIBRARY_DIR.mkdir(parents=True, exist_ok=True)

    imported = []
    for i, src in enumerate(images):
        num = next_num + i
        filename = f"{args.prefix}-{num:04d}.webp"
        dst = LIBRARY_DIR / filename

        print(f"  [{i+1}/{len(images)}] {src.name} → {filename}")

        if args.dry_run:
            print(f"         → Would save to {dst}")
            score = 0.6
        else:
            # Convert
            ok = convert_to_webp(src, dst, max_dim=args.max_dim, quality=args.quality)
            if not ok:
                print(f"         ⚠ Conversion failed, skipping")
                continue

            # Score
            if args.no_score:
                score = 0.6
            else:
                score = score_photo(dst)

            size_kb = dst.stat().st_size / 1024
            print(f"         ✅ {size_kb:.0f}KB · score: {score:.3f}")

        entry = {
            "file": filename,
            "num": num,
            "score": score,
        }
        imported.append(entry)

    if not imported:
        print("\n❌ Nothing imported.")
        return

    # Update manifest
    if not args.dry_run:
        existing_files = {p["file"] for p in manifest["photos"]}
        for entry in imported:
            if entry["file"] not in existing_files:
                manifest["photos"].append(entry)
        save_manifest(manifest)

    # Print TypeScript entries to add
    print(f"\n{'─' * 70}")
    print(f"📋 Add these to apps/web/lib/photo-library.ts → LIBRARY array:")
    print(f"{'─' * 70}\n")

    for entry in imported:
        print(f"  {{ src: '/images/library/{entry['file']}', alt: 'DESCRIBE THIS PHOTO', score: {entry['score']:.3f}, tags: ['TAG1', 'TAG2'], corridorNum: {entry['num']} }},")

    print(f"\n{'─' * 70}")
    print(f"  ☝️  Fill in the alt text and tags, then paste into the LIBRARY array.")
    print(f"     Valid tags: azalea, mansion, downtown, storefront, live-oak, street,")
    print(f"     marina, shrimp-boat, pier, waterfront, cottage, garden, iron-fence,")
    print(f"     carriage, residential, brick, b-and-b")
    print(f"{'─' * 70}")

    if args.dry_run:
        print(f"\n🔍 DRY RUN — nothing was written. Remove --dry-run to import.\n")
    else:
        print(f"\n✅ Imported {len(imported)} photo(s) to the library.\n")
        print(f"   Next steps:")
        print(f"   1. Add the TypeScript entries above to photo-library.ts")
        print(f"   2. Update any new tags in the PhotoTag type if needed")
        print(f"   3. Commit and push\n")


if __name__ == "__main__":
    main()
