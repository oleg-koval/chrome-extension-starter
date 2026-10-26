#!/usr/bin/env bash
set -euo pipefail

max=300
status=0

while IFS= read -r file; do
  [ -f "$file" ] || continue
  lines=$(wc -l < "$file" | tr -d ' ')
  if [ "$lines" -gt "$max" ]; then
    printf 'ERROR: %s has %s lines (max %s)\n' "$file" "$lines" "$max"
    status=1
  fi
done < <(
  find . -type f \
    \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.mjs' -o -name '*.sh' -o -name '*.css' -o -name '*.html' -o -name '*.json' -o -name '*.yml' -o -name '*.yaml' \) \
    ! -path './.git/*' \
    ! -path './node_modules/*' \
    ! -path './dist/*' \
    ! -path './coverage/*' \
    ! -path './package-lock.json' \
    -print
)

exit "$status"
