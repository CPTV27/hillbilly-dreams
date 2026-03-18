#!/usr/bin/env python3
"""
DSD Photo Culler — Phase 1: Technical Scoring
Generates thumbnails and scores photos on technical quality.
Outputs a ranked JSON manifest for Phase 2 (AI vision curation).

Usage:
  python3 scripts/photo-cull.py [--source DIR] [--limit N] [--workers N]
"""

import os
import sys
import json
import subprocess
import hashlib
import argparse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image
import numpy as np
from datetime import datetime

# ── Config ────────────────────────────────────────────────────────────────────

THUMB_DIR = Path("/tmp/dsd-cull/thumbs")
SCORES_FILE = Path("/tmp/dsd-cull/scores.json")
THUMB_SIZE = 512  # max dimension
THUMB_QUALITY = 70

# Default source directories (last 2 months)
DEFAULT_SOURCES = [
    "/Volumes/BlueSSD_EXF/Ocean Springs/2026",
    "/Volumes/BlueSSD_EXF/Mac-Archive-2026-03-16/Studio-C/Content-Library/PROD_MEDIA/02_PURE_RAW_OUT",
]

RAW_EXTENSIONS = {".arw", ".dng", ".cr2", ".nef", ".raf", ".rw2", ".orf"}
IMG_EXTENSIONS = {".jpg", ".jpeg", ".png", ".tiff", ".tif", ".heic", ".webp"}
ALL_EXTENSIONS = RAW_EXTENSIONS | IMG_EXTENSIONS


# ── Thumbnail Generation ─────────────────────────────────────────────────────

def generate_thumbnail(src_path: str, thumb_path: str) -> bool:
    """Use macOS sips to convert any image/RAW to JPEG thumbnail."""
    try:
        subprocess.run(
            [
                "sips",
                "-s", "format", "jpeg",
                "-s", "formatOptions", str(THUMB_QUALITY),
                "-Z", str(THUMB_SIZE),
                src_path,
                "--out", thumb_path,
            ],
            capture_output=True,
            timeout=30,
        )
        return os.path.exists(thumb_path) and os.path.getsize(thumb_path) > 1000
    except Exception:
        return False


def get_thumb_path(src_path: str) -> str:
    """Deterministic thumbnail path from source hash."""
    h = hashlib.md5(src_path.encode()).hexdigest()[:12]
    name = Path(src_path).stem[:40]
    return str(THUMB_DIR / f"{name}_{h}.jpg")


# ── Technical Scoring ─────────────────────────────────────────────────────────

def score_sharpness(img_array: np.ndarray) -> float:
    """Laplacian variance — higher = sharper."""
    if len(img_array.shape) == 3:
        gray = np.mean(img_array, axis=2).astype(np.float64)
    else:
        gray = img_array.astype(np.float64)

    # Laplacian kernel
    laplacian = np.array([[0, 1, 0], [1, -4, 1], [0, 1, 0]], dtype=np.float64)
    from scipy.signal import convolve2d
    lap = convolve2d(gray, laplacian, mode="valid")
    return float(np.var(lap))


def score_sharpness_simple(img_array: np.ndarray) -> float:
    """Simple gradient-based sharpness (no scipy needed)."""
    if len(img_array.shape) == 3:
        gray = np.mean(img_array, axis=2).astype(np.float64)
    else:
        gray = img_array.astype(np.float64)

    # Horizontal and vertical gradients
    gx = np.diff(gray, axis=1)
    gy = np.diff(gray, axis=0)
    return float(np.var(gx) + np.var(gy))


def score_exposure(img_array: np.ndarray) -> float:
    """Score 0–1 based on histogram distribution. Penalizes blown highlights and crushed blacks."""
    if len(img_array.shape) == 3:
        brightness = np.mean(img_array, axis=2)
    else:
        brightness = img_array

    mean_b = np.mean(brightness)
    # Ideal mean brightness around 118-138 (slightly below middle for editorial look)
    exposure_score = 1.0 - abs(mean_b - 128) / 128

    # Penalize blown highlights (>250) and crushed blacks (<5)
    blown = np.sum(brightness > 250) / brightness.size
    crushed = np.sum(brightness < 5) / brightness.size
    clipping_penalty = (blown + crushed) * 2

    return max(0, min(1, exposure_score - clipping_penalty))


def score_contrast(img_array: np.ndarray) -> float:
    """Standard deviation of brightness — higher = more contrast."""
    if len(img_array.shape) == 3:
        brightness = np.mean(img_array, axis=2)
    else:
        brightness = img_array
    return float(np.std(brightness)) / 128  # Normalize to 0–1 range


def score_color_richness(img_array: np.ndarray) -> float:
    """Saturation-based score. More saturated = more visually interesting."""
    if len(img_array.shape) != 3 or img_array.shape[2] < 3:
        return 0.0

    r, g, b = img_array[:, :, 0].astype(float), img_array[:, :, 1].astype(float), img_array[:, :, 2].astype(float)
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    chroma = max_c - min_c

    # Average saturation
    with np.errstate(divide="ignore", invalid="ignore"):
        saturation = np.where(max_c > 0, chroma / max_c, 0)

    return float(np.mean(saturation))


def score_composition(img_array: np.ndarray) -> float:
    """Rule of thirds: is the most interesting content near the intersection points?"""
    if len(img_array.shape) == 3:
        gray = np.mean(img_array, axis=2)
    else:
        gray = img_array

    h, w = gray.shape
    # Interest = gradient magnitude
    gx = np.abs(np.diff(gray, axis=1))
    gy = np.abs(np.diff(gray, axis=0))

    # Pad to same size
    interest = np.zeros_like(gray)
    interest[:, :w-1] += gx
    interest[:h-1, :] += gy

    # Rule of thirds intersection points
    thirds_y = [h // 3, 2 * h // 3]
    thirds_x = [w // 3, 2 * w // 3]
    r = min(h, w) // 8  # radius around intersection

    thirds_energy = 0
    total_energy = np.sum(interest)
    if total_energy == 0:
        return 0.0

    for ty in thirds_y:
        for tx in thirds_x:
            y1, y2 = max(0, ty - r), min(h, ty + r)
            x1, x2 = max(0, tx - r), min(w, tx + r)
            thirds_energy += np.sum(interest[y1:y2, x1:x2])

    # What fraction of energy is near thirds points
    return min(1.0, float(thirds_energy / total_energy) * 2.5)


def score_photo(thumb_path: str) -> dict:
    """Score a thumbnail on all technical dimensions."""
    try:
        img = Image.open(thumb_path)
        arr = np.array(img)

        if arr.size == 0:
            return {"error": "empty image"}

        sharpness = score_sharpness_simple(arr)
        exposure = score_exposure(arr)
        contrast = score_contrast(arr)
        color = score_color_richness(arr)
        composition = score_composition(arr)

        # Weighted composite
        composite = (
            sharpness / 1000 * 0.30  # normalize sharpness roughly to 0–1
            + exposure * 0.20
            + contrast * 0.20
            + color * 0.15
            + composition * 0.15
        )

        return {
            "sharpness": round(sharpness, 2),
            "exposure": round(exposure, 4),
            "contrast": round(contrast, 4),
            "color": round(color, 4),
            "composition": round(composition, 4),
            "composite": round(composite, 4),
        }
    except Exception as e:
        return {"error": str(e)}


# ── Pipeline ──────────────────────────────────────────────────────────────────

def find_photos(sources: list[str]) -> list[str]:
    """Walk source directories and find all photo files."""
    photos = []
    for src in sources:
        if not os.path.exists(src):
            print(f"  ⚠ Source not found: {src}")
            continue
        for root, dirs, files in os.walk(src):
            # Skip hidden dirs
            dirs[:] = [d for d in dirs if not d.startswith(".")]
            for f in files:
                if f.startswith("."):
                    continue
                ext = os.path.splitext(f)[1].lower()
                if ext in ALL_EXTENSIONS:
                    photos.append(os.path.join(root, f))
    return photos


def process_one(src_path: str) -> dict:
    """Generate thumbnail + score for one photo."""
    thumb = get_thumb_path(src_path)

    # Generate thumbnail if not cached
    if not os.path.exists(thumb):
        ok = generate_thumbnail(src_path, thumb)
        if not ok:
            return {
                "src": src_path,
                "thumb": None,
                "scores": {"error": "thumbnail failed"},
            }

    scores = score_photo(thumb)
    return {
        "src": src_path,
        "thumb": thumb,
        "scores": scores,
    }


def main():
    parser = argparse.ArgumentParser(description="DSD Photo Culler — Phase 1")
    parser.add_argument("--source", nargs="+", default=DEFAULT_SOURCES, help="Source directories")
    parser.add_argument("--limit", type=int, default=0, help="Limit number of photos (0=all)")
    parser.add_argument("--workers", type=int, default=4, help="Parallel workers")
    parser.add_argument("--dng-only", action="store_true", help="Only process DNG files (fastest)")
    args = parser.parse_args()

    THUMB_DIR.mkdir(parents=True, exist_ok=True)

    print(f"🔍 Scanning sources...")
    photos = find_photos(args.source)

    if args.dng_only:
        photos = [p for p in photos if p.lower().endswith(".dng") and not os.path.basename(p).startswith(".")]
    else:
        photos = [p for p in photos if not os.path.basename(p).startswith(".")]

    if args.limit > 0:
        photos = photos[:args.limit]

    print(f"📸 Found {len(photos)} photos")
    print(f"⚙️  Processing with {args.workers} workers...")

    results = []
    done = 0
    errors = 0

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(process_one, p): p for p in photos}
        for future in as_completed(futures):
            done += 1
            result = future.result()
            results.append(result)
            if "error" in result.get("scores", {}):
                errors += 1
            if done % 25 == 0 or done == len(photos):
                pct = done / len(photos) * 100
                print(f"  [{done}/{len(photos)}] {pct:.0f}% — {errors} errors")

    # Sort by composite score descending
    scored = [r for r in results if "error" not in r.get("scores", {})]
    scored.sort(key=lambda r: r["scores"]["composite"], reverse=True)

    # Save results
    output = {
        "generated": datetime.now().isoformat(),
        "total_scanned": len(photos),
        "total_scored": len(scored),
        "total_errors": errors,
        "photos": scored,
    }

    with open(SCORES_FILE, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\n✅ Done! {len(scored)} photos scored, {errors} errors")
    print(f"📊 Results saved to: {SCORES_FILE}")

    # Print top 20
    print(f"\n🏆 Top 20 photos:")
    for i, r in enumerate(scored[:20]):
        name = os.path.basename(r["src"])
        s = r["scores"]
        print(f"  {i+1:2d}. [{s['composite']:.3f}] {name}")
        print(f"      sharp={s['sharpness']:.0f}  exp={s['exposure']:.3f}  "
              f"contrast={s['contrast']:.3f}  color={s['color']:.3f}  comp={s['composition']:.3f}")


if __name__ == "__main__":
    main()
