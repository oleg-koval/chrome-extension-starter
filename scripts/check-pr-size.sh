#!/usr/bin/env bash
set -euo pipefail

base="${1:-${CHARTER_BASE:-origin/main}}"
max="${PR_MAX_LINES:-200}"

changed=$(git diff --numstat "$base"...HEAD -- . ':(exclude)package-lock.json' ':(exclude).charter/rules.toml' | awk '$1 != "-" { total += $1 + $2 } END { print total + 0 }')

if [ "$changed" -gt "$max" ]; then
  printf 'ERROR: %s changed lines against %s (max %s). Split the PR.\n' "$changed" "$base" "$max"
  exit 1
fi
printf 'ok: %s changed lines against %s (max %s)\n' "$changed" "$base" "$max"
