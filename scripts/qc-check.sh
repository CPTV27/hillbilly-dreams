#!/bin/bash
# scripts/qc-check.sh — HDI Quality Control Checker
# Run before every commit. Catches violations from the QC audit.
# Usage: bash scripts/qc-check.sh

set -e
FAIL=0
SRC="apps/web"

echo "=== HDI Quality Control Check ==="
echo ""

# 1. Wrong Gemini model
echo "Checking: Gemini model references..."
if grep -rn "gemini-1\.5-pro\|gemini-1\.0-pro\|gemini-pro'" "$SRC" --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v node_modules | grep -v ".next"; then
  echo "  FAIL: Found deprecated Gemini model references. Use ai-models.ts registry."
  FAIL=1
else
  echo "  PASS"
fi

# 2. Hardcoded fonts in MBT pages
echo "Checking: Hardcoded fonts in measurably-better/..."
if grep -rn "fontFamily:.*system-ui\|fontFamily:.*Helvetica\|fontFamily:.*Arial\|fontFamily:.*sans-serif" "$SRC/app/measurably-better" --include="*.tsx" 2>/dev/null; then
  echo "  FAIL: Hardcoded font-family found. Use var(--font-body) or var(--font-display)."
  FAIL=1
else
  echo "  PASS"
fi

# 3. MB abbreviation (standalone, not in words)
echo "Checking: 'MB' used as Measurably Better abbreviation..."
if grep -rn '">MB<\|>MB<\| MB |"MB"' "$SRC/app/measurably-better" --include="*.tsx" 2>/dev/null; then
  echo "  FAIL: 'MB' used as abbreviation. Use 'MBT' or 'Measurably Better Things'."
  FAIL=1
else
  echo "  PASS"
fi

# 4. Tech jargon on customer pages
echo "Checking: Tech jargon on customer-facing pages..."
if grep -rn "Sovereign VPC\|Cloud SQL\|Cloud Run\|Vertex AI\|token context\|tokens per second\|edge routing\|provisioned throughput" "$SRC/app/measurably-better/page.tsx" "$SRC/app/directory" 2>/dev/null; then
  echo "  FAIL: Infrastructure jargon on customer-facing pages."
  FAIL=1
else
  echo "  PASS"
fi

# 5. S2PX/Owen on customer pages
echo "Checking: S2PX/Owen references on customer pages..."
if grep -rn "S2PX\|Owen\|Scan2Plan" "$SRC/app/measurably-better/page.tsx" "$SRC/app/measurably-better/regional" "$SRC/app/directory" 2>/dev/null; then
  echo "  FAIL: S2PX/Owen/Scan2Plan referenced on customer-facing page (project is paused)."
  FAIL=1
else
  echo "  PASS"
fi

# 6. Vercel references
echo "Checking: Vercel references..."
if grep -rn "vercel\|VERCEL" "$SRC" --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v node_modules | grep -v "vercel.json"; then
  echo "  FAIL: Vercel reference found. Deploy to Firebase App Hosting only."
  FAIL=1
else
  echo "  PASS"
fi

# 7. HuggingFace references
echo "Checking: HuggingFace references..."
if grep -rni "hugging.face\|huggingface" "$SRC" --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v node_modules; then
  echo "  FAIL: HuggingFace reference found. Google/Vertex AI only."
  FAIL=1
else
  echo "  PASS"
fi

# 8. Employee references
echo "Checking: 'employee' references to partners..."
if grep -rni "employee" "$SRC/app" --include="*.tsx" 2>/dev/null | grep -i "tracy\|amy"; then
  echo "  FAIL: Tracy/Amy referred to as employees. They are equity partners."
  FAIL=1
else
  echo "  PASS"
fi

echo ""
if [ $FAIL -eq 0 ]; then
  echo "ALL CHECKS PASSED"
else
  echo "SOME CHECKS FAILED — fix violations before committing."
  exit 1
fi
