#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required."
  echo "Install: https://cli.github.com/"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Log in to GitHub first:"
  echo "  gh auth login"
  exit 1
fi

OWNER="${1:-}"
REPO_NAME="${2:-idx-zillow-layout}"
VISIBILITY="${3:-public}"
VERSION="${4:-0.1.0}"

if [[ -z "$OWNER" ]]; then
  OWNER="$(gh api user -q .login)"
fi

CSS_FILE="idx-zillow-layout.css"
JS_FILE="idx-zillow-layout.iife.js"

echo "Building assets..."
npm run build

if [[ ! -f "dist/$CSS_FILE" || ! -f "dist/$JS_FILE" ]]; then
  echo "Build failed: expected dist/$CSS_FILE and dist/$JS_FILE"
  exit 1
fi

if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  git add .
  git commit -m "Initial idx-zillow-layout widget"
fi

if gh repo view "$OWNER/$REPO_NAME" >/dev/null 2>&1; then
  echo "Repo $OWNER/$REPO_NAME already exists — pushing latest commit..."
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$OWNER/$REPO_NAME.git"
  git branch -M main
  git push -u origin main
else
  echo "Creating repo $OWNER/$REPO_NAME..."
  gh repo create "$REPO_NAME" --"${VISIBILITY}" --source=. --remote=origin --push
fi

echo "Publishing dist/ to gh-pages branch..."
PAGES_DIR="$(mktemp -d)"
cp "dist/$CSS_FILE" "dist/$JS_FILE" "$PAGES_DIR/"

pushd "$PAGES_DIR" >/dev/null
git init -b gh-pages
git add .
git commit -m "Deploy assets v$VERSION"
git remote add origin "https://github.com/$OWNER/$REPO_NAME.git"
git push -f origin gh-pages
popd >/dev/null
rm -rf "$PAGES_DIR"

echo "Configuring GitHub Pages (legacy gh-pages branch)..."
gh api "repos/$OWNER/$REPO_NAME/pages" -X POST \
  -f build_type=legacy \
  -f 'source[branch]=gh-pages' \
  -f 'source[path]=/' >/dev/null 2>&1 || \
gh api "repos/$OWNER/$REPO_NAME/pages" -X PUT \
  -f build_type=legacy \
  -f 'source[branch]=gh-pages' \
  -f 'source[path]=/' >/dev/null 2>&1 || true

BASE="https://$OWNER.github.io/$REPO_NAME"
echo ""
echo "Done. CDN URLs:"
echo "  $BASE/$CSS_FILE"
echo "  $BASE/$JS_FILE"
echo ""
echo "Embed snippet:"
cat <<EOF

<link rel="stylesheet" href="$BASE/$CSS_FILE?v=$VERSION" />
<script
  src="$BASE/$JS_FILE?v=$VERSION"
  data-replace-content="true"
></script>

EOF
