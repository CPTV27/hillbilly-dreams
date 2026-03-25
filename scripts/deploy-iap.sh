#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Phase 12: BeyondCorp Zero-Trust / IAP Deployment
# ─────────────────────────────────────────────────────────────
# This script provisions an External HTTPS Load Balancer over the
# BMT Cloud Run cluster and forcibly enables Identity-Aware Proxy (IAP).
#
# Prerequisite: You must have an OAuth Brand/Consent Screen configured
# natively in the Google Cloud Console first.
# ─────────────────────────────────────────────────────────────

PROJECT_ID="bigmuddy-ff651"
REGION="us-east4"
CLOUD_RUN_SERVICE="bmt-web" 
DOMAIN="measurablybetterthings.com"
IAP_ALLOWED_DOMAIN="hillbillydreamsinc.com"

echo "🛡️ Deploying BeyondCorp Zero-Trust IAP..."

# 1. Create a Serverless Network Endpoint Group (NEG) routed to Cloud Run
gcloud compute network-endpoint-groups create swarm-serverless-neg \
    --region=$REGION \
    --network-endpoint-type=serverless  \
    --cloud-run-service=$CLOUD_RUN_SERVICE \
    --project=$PROJECT_ID

# 2. Create the Backend Service to attach the NEG
gcloud compute backend-services create swarm-backend-service \
    --global \
    --project=$PROJECT_ID

# 3. Add the Serverless NEG to the Backend Service
gcloud compute backend-services add-backend swarm-backend-service \
    --global \
    --network-endpoint-group=swarm-serverless-neg \
    --network-endpoint-group-region=$REGION \
    --project=$PROJECT_ID

# 4. Enable IAP on the Backend Service
# Note: Ensure you have IAP OAuth client keys configured.
gcloud compute backend-services update swarm-backend-service \
    --global \
    --iap=enabled \
    --project=$PROJECT_ID

# 5. Lock down access (Grant IAP Resource Accessor role to Domain)
gcloud iap web add-iam-policy-binding \
    --resource-type=backend-services \
    --service=swarm-backend-service \
    --member="domain:$IAP_ALLOWED_DOMAIN" \
    --role="roles/iap.httpsResourceAccessor" \
    --project=$PROJECT_ID

# 6. Create the URL Map
gcloud compute url-maps create swarm-url-map \
    --default-service swarm-backend-service \
    --global \
    --project=$PROJECT_ID

# 7. Provision a Google-managed SSL Certificate
gcloud compute ssl-certificates create swarm-ssl-cert \
    --domains=$DOMAIN \
    --global \
    --project=$PROJECT_ID

# 8. Create the Target HTTPS Proxy
gcloud compute target-https-proxies create swarm-https-proxy \
    --ssl-certificates=swarm-ssl-cert \
    --url-map=swarm-url-map \
    --global \
    --project=$PROJECT_ID

# 9. Reserve a Static External IP Address
gcloud compute addresses create swarm-public-ip \
    --network-tier=PREMIUM \
    --ip-version=IPV4 \
    --global \
    --project=$PROJECT_ID

# Retrieve the IP
STATIC_IP=$(gcloud compute addresses describe swarm-public-ip --global --project=$PROJECT_ID --format="get(address)")

# 10. Spin up the Global Forwarding Rule
gcloud compute forwarding-rules create swarm-forwarding-rule \
    --load-balancing-scheme=EXTERNAL \
    --network-tier=PREMIUM \
    --address=$STATIC_IP \
    --global \
    --target-https-proxy=swarm-https-proxy \
    --ports=443 \
    --project=$PROJECT_ID

# 11. Lock down Cloud Run ingress so it ONLY accepts internal traffic / Load Balancer
gcloud run services update $CLOUD_RUN_SERVICE \
    --ingress=internal-and-cloud-load-balancing \
    --region=$REGION \
    --project=$PROJECT_ID

echo "─────────────────────────────────────────────────────────────"
echo "✅ BEYONDCORP DEPLOYMENT COMPLETE"
echo "─────────────────────────────────────────────────────────────"
echo "You must now log into your DNS registrar for $DOMAIN"
echo "and map the root A Record to this new protected IP: $STATIC_IP"
echo "Traffic bypassing IAP has been explicitly blackholed."
echo "─────────────────────────────────────────────────────────────"
