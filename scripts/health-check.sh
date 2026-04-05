#!/bin/bash
# Health Check — runs after every deploy or on a cron
# Tests every critical endpoint and reports to Asana
# Usage: bash scripts/health-check.sh

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
PASS=0
FAIL=0
REPORT=""

check() {
  local name="$1"
  local url="$2"
  local expected="$3"
  local code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null)
  if [ "$code" = "$expected" ]; then
    REPORT="$REPORT\n✅ $name ($code)"
    PASS=$((PASS + 1))
  else
    REPORT="$REPORT\n❌ $name (got $code, expected $expected)"
    FAIL=$((FAIL + 1))
  fi
}

echo "🔍 Health Check — $TIMESTAMP"
echo ""

# Domains
check "bigmuddytouring.com" "https://bigmuddytouring.com" "200"
check "bigmuddymagazine.com" "https://bigmuddymagazine.com" "200"
check "bigmuddyradio.com" "https://bigmuddyradio.com" "200"
check "bigmuddyentertainment.com" "https://bigmuddyentertainment.com" "200"
check "bigmuddyrecordlabel.com" "https://bigmuddyrecordlabel.com" "200"
check "deepsouthdirectory.com" "https://deepsouthdirectory.com" "200"
check "outsidereconomics.com" "https://outsidereconomics.com" "200"
check "hillbillydreamsinc.com" "https://hillbillydreamsinc.com" "200"
check "tuthilldesign.com" "https://tuthilldesign.com" "200"
check "bearsvillemediagroup.com" "https://bearsvillemediagroup.com" "200"
check "measurablybetter.life" "https://measurablybetter.life" "200"

# Key pages
check "DSD Homepage" "https://deepsouthdirectory.com/directory" "200"
check "Inn TV" "https://deepsouthdirectory.com/inn/tv" "200"
check "Explorer" "https://deepsouthdirectory.com/explorer" "200"
check "Tracy Page" "https://deepsouthdirectory.com/tracy.html" "200"
check "Amy Page" "https://deepsouthdirectory.com/amy.html" "200"
check "Press Hub" "https://deepsouthdirectory.com/press/index.html" "200"
check "Marketing Kit" "https://deepsouthdirectory.com/sandbox/inn-marketing-kit.html" "200"
check "Print Ad" "https://deepsouthdirectory.com/sandbox/inn-print-ad.html" "200"

# API endpoints
check "Dawn Chat API" "https://deepsouthdirectory.com/api/dawn/chat" "405"
check "System Health" "https://deepsouthdirectory.com/api/admin/system-health" "200"

echo ""
echo -e "$REPORT"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PASS: $PASS | FAIL: $FAIL | TOTAL: $((PASS + FAIL))"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAIL -gt 0 ]; then
  echo "⚠️  $FAIL endpoints failed. Check above."
  exit 1
else
  echo "✅ All endpoints healthy."
  exit 0
fi
