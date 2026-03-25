#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Phase 11: Deploy Google Cloud Eventarc & Scheduler Triggers
# ─────────────────────────────────────────────────────────────
# This script provisions serverless Cron jobs that blindly
# ping our Next.js edge routers every night at 3:00 AM.
# ─────────────────────────────────────────────────────────────

PROJECT_ID="bigmuddy-ff651"
LOCATION="us-east4" # Default Cloud Run region
TARGET_DOMAIN="https://measurablybetterthings.com"
CRON_SECRET=${CRON_SECRET:-"CHANGE_ME_IN_ENV"} # Pass via environment variable

echo "🚀 Provisioning Sovereign Swarm Background Workers..."

# 1. QuickBooks Nightly Anomaly Sync (3:00 AM)
gcloud scheduler jobs create http qbo-nightly-sync \
  --project $PROJECT_ID \
  --location $LOCATION \
  --schedule="0 3 * * *" \
  --uri="$TARGET_DOMAIN/api/cron/sync-qbo" \
  --http-method="GET" \
  --headers="Authorization=Bearer $CRON_SECRET" \
  --time-zone="America/Chicago"

# 2. Google Workspace Calendar Sync (3:05 AM)
gcloud scheduler jobs create http google-nightly-sync \
  --project $PROJECT_ID \
  --location $LOCATION \
  --schedule="5 3 * * *" \
  --uri="$TARGET_DOMAIN/api/cron/sync-google" \
  --http-method="GET" \
  --headers="Authorization=Bearer $CRON_SECRET" \
  --time-zone="America/Chicago"

echo "✅ Cron Eventarc Triggers Deployed."
echo "The Next.js Edge Routes are now decoupled from frontend UX latency."
