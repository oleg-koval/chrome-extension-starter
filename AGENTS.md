# Agent instructions

This starter follows the shared rules in [RULES.md](./RULES.md). Read them before
changing code. The contract is also checked through `.charter/` and CI.

## Setup

Requires Node.js 22 or newer and npm.

```bash
npm ci
npm run hooks
```

## Commands

- Full local gates: `npm run ci`
- Build unpacked extension: `npm run build`
- Unit tests with coverage: `npm run test:coverage`
- Built-package checks: `npm run test:package`
- Lint and format: `npm run lint` and `npm run format:check`

## Layout

```text
src/domain/   pure policy and formatting
src/popup/    browser API and DOM boundary
public/       hand-authored extension manifest
scripts/      build and repository checks
tests/        behavior and built-artifact checks
dist/         generated unpacked extension; never edit directly
```

Keep browser API calls at the edge, request the smallest permissions needed,
and test policy functions without mocking browser internals.

The Git pre-commit gate intentionally blocks commits that fail lint, formatting,
or fast tests, as required by RULES.md §2.4. Charter C40's non-blocking hook
rule concerns agent-tool hooks.
