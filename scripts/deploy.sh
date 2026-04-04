#!/usr/bin/env bash
set -e

echo "🚀 [Sovereign OS] Initiating Cloud Ascension Deployment..."

PROJECT_ID="hillbilly-dreams-sovereign"
REGION="us-central1"
REPO_NAME="sovereign"
IMAGE_NAME="hub"
IMAGE_TAG="us-central1-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:latest"

echo "🛡️ Ensuring default credentials and boundaries..."
gcloud config set project $PROJECT_ID
gcloud config set run/region $REGION

echo "📦 Building Hub Container via Cloud Build..."
# Note: In production you would use a cloudbuild.yaml, but this mimics our local Docker workflow.
gcloud builds submit --tag $IMAGE_TAG .

echo "🚢 Deploying to Cloud Run (The Hub)..."
# Updates the Cloud Run service to point to the fresh image revision
gcloud run deploy sovereign-hub \
  --image $IMAGE_TAG \
  --region $REGION \
  --project $PROJECT_ID \
  --update-env-vars NODE_ENV=production \
  --quiet

echo "✅ Deployment Complete. The Sovereign Hub is live."
