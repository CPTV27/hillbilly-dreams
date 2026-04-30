#!/usr/bin/env python3
"""Inspect the approved bucket index.json for inventory breakdown.
Reads /tmp/approved-index.json (downloaded via gcloud storage cp).
"""
import json
from collections import Counter, defaultdict

with open('/tmp/approved-index.json') as f:
    data = json.load(f)

photos = data['photos']
print(f'TOTAL PHOTOS: {len(photos)}')
print()

# Group by city
by_city = Counter(f"{p['region']}/{p['city']}" for p in photos)
print('--- BREAKDOWN BY CITY ---')
for k, v in sorted(by_city.items(), key=lambda x: -x[1]):
    print(f'  {v:>4}  {k}')
print()

# Group by shoot
by_shoot = defaultdict(list)
for p in photos:
    key = f"{p['region']}/{p['city']}/{p['shoot']}"
    by_shoot[key].append(p)
print(f'TOTAL SHOOTS/SUBDIRS: {len(by_shoot)}')
print()

# Top shoots
print('--- TOP SHOOTS BY PHOTO COUNT ---')
for k, items in sorted(by_shoot.items(), key=lambda x: -len(x[1]))[:30]:
    sample_orig = items[0].get('originalFilename', '')[:60]
    print(f'  {len(items):>4}  {k}  | sample: {sample_orig}')
print()

# Metadata coverage
has_caption = sum(1 for p in photos if p.get('caption'))
has_subjects = sum(1 for p in photos if p.get('subjects'))
has_category = sum(1 for p in photos if p.get('category'))
print(f'METADATA COVERAGE:')
print(f'  has caption: {has_caption}/{len(photos)}')
print(f'  has subjects: {has_subjects}/{len(photos)}')
print(f'  has category: {has_category}/{len(photos)}')
print()

# Camera
cameras = Counter(p.get('camera') for p in photos)
print('--- CAMERAS ---')
for k, v in cameras.most_common():
    print(f'  {v:>4}  {k}')
print()

# Capture date range
dates = [p.get('capturedAt', '') for p in photos if p.get('capturedAt')]
if dates:
    print(f'CAPTURE DATE RANGE: {min(dates)[:10]} -> {max(dates)[:10]}')

# Width
widths = Counter(p.get('widths', {}).get('orig') for p in photos)
print()
print('--- ORIG WIDTHS ---')
for k, v in widths.most_common():
    print(f'  {v:>4}  {k}')

# Original filenames sampled per shoot
print()
print('--- SAMPLE FILENAMES BY SHOOT (first 3 per shoot) ---')
for k in sorted(by_shoot.keys()):
    items = by_shoot[k]
    print(f'\n{k} [{len(items)} photos]')
    for p in items[:3]:
        print(f'    {p.get("originalFilename", "")[:90]}')
