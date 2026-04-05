# Photo Ingestion Pipeline

## Workflow Stages
1. **Shooting:** Chase provides raw capture via external shoots.
2. **Export:** Images are exported from Lightroom.
3. **Upload & Staging:** Files are uploaded directly to the designated Google Cloud Storage (GCS) buckets.

## Analysis & Tagging
- **Processing:** The framework employs the Vision API for immediate metadata tagging.
- **Scale:** 16,936 photos have already been successfully processed and tagged structurally.
- **Namespace Identity:** Assets related strictly to studio photography are isolated under the `visual_vault` namespace structure.

## Metadata & Integration
- **XMP Alignment:** Metadata models ensure structural compatibility with Adobe Bridge.
- **Data Records:** Assets are definitively indexed into the database as `VisualAsset` rows.
- **Synology Linking (WIP):** Local indexer routing is underway at `scripts/media/synology-indexer.ts`.
