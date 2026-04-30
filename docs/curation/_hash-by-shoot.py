#!/usr/bin/env python3
"""Map hashes to shoot for the 3 real shoots."""
import json
with open('/tmp/approved-index.json') as f:
    data = json.load(f)
target_shoots = set()
for p in data['photos']:
    if p['city'] == 'liberty-ms':
        target_shoots.add('liberty-ms')
    elif p['shoot'] == 'silver-street-antiques-business-listing-exterior-only':
        target_shoots.add('silver-street')
    elif p['shoot'] == 'save-the-hall-ball':
        target_shoots.add('hall-ball')

print('LIBERTY-MS (Sony A7M2, March 15, 2026):')
for p in sorted([x for x in data['photos'] if x['city'] == 'liberty-ms'],
                key=lambda x: x['originalFilename']):
    print(f"  {p['hash']}  {p['originalFilename']}  ({p['widths']['orig']}px)")

print()
print('SILVER-STREET (iPhone 16 Pro):')
for p in sorted([x for x in data['photos'] if x['shoot'] == 'silver-street-antiques-business-listing-exterior-only'],
                key=lambda x: x['originalFilename']):
    print(f"  {p['hash']}  {p['originalFilename']}  ({p['widths']['orig']}px)")

print()
print('SAVE-THE-HALL-BALL (Sony A7M2, March 22, 2026) - 152 photos, every 10th printed:')
sthb = sorted([x for x in data['photos'] if x['shoot'] == 'save-the-hall-ball'],
              key=lambda x: x['originalFilename'])
for i, p in enumerate(sthb):
    if i % 10 == 0:
        print(f"  [{i:>3}] {p['hash']}  {p['originalFilename']}")
