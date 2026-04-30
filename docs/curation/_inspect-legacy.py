#!/usr/bin/env python3
"""Dump all filenames in the legacy-starter shoot to vet them for AI/stock content."""
import json

with open('/tmp/approved-index.json') as f:
    data = json.load(f)

legacy = [p for p in data['photos'] if p['shoot'] == 'legacy-starter']
print(f'LEGACY-STARTER ({len(legacy)} photos):')
print()
for p in legacy:
    fn = p.get('originalFilename', '')
    cam = p.get('camera') or 'NO-CAM'
    w = p.get('widths', {}).get('orig', '?')
    print(f'  [{cam:>20}] [{w}px] {fn}')
print()
print('--- HASHES + URLs FOR LEGACY ---')
for p in legacy:
    print(f"  {p['hash']}  {p['urls']['thumb']}")
