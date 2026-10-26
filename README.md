# Chrome Extension Starter

TypeScript and Manifest V3 starter for small Chrome extensions. It demonstrates
a popup, a typed Chrome API boundary, a pure domain function, and an unpacked
build without requesting broad host access.

## Quick start

```bash
npm ci
npm run ci
npm run build
```

Open `chrome://extensions`, enable Developer mode, select **Load unpacked**, and
choose the generated `dist/` directory. The popup reads the active page title
after the user opens the extension.

## Design

- Manifest V3 with only the `activeTab` permission.
- No host permissions, backend, analytics, or page data transmission.
- TypeScript strict checking, ESLint, Prettier, Vitest coverage, and built-output
  checks.
- Husky pre-commit gate runs lint, formatting, and the fast unit tests.
- GitHub Actions tests Node 22 and 24, runs Charter v0.2.0, checks CodeQL, and
  updates npm and Actions dependencies through Dependabot.
- Charter validates the shared engineering contract, local gates, file length,
  PR size, and required PR sections.

## Project layout

```text
src/domain/       pure extension policy
src/popup/        popup DOM and Chrome API boundary
public/           source manifest and popup assets
scripts/          reproducible build and size checks
tests/            behavior and built-artifact checks
.charter/         shared engineering rules and their enforcement
dist/             generated unpacked extension
```

Change `public/manifest.json`, the popup UI, and the typed entry point for your
extension. Keep new permissions minimal and explain each one in the pull request.
Never edit `dist/` by hand.

## Based on

The extension shape takes cues from [MergeChain](https://github.com/oleg-koval/mergechain)
and [PR Redline](https://github.com/oleg-koval/production-pr-warning). This is a
fresh, minimal template rather than a copy of either product.

## Commands

| Command                 | Purpose                                    |
| ----------------------- | ------------------------------------------ |
| `npm run build`         | Build `dist/` for **Load unpacked**        |
| `npm run typecheck`     | Strict TypeScript check                    |
| `npm run lint`          | ESLint, including the 300-line cap         |
| `npm run format:check`  | Prettier check                             |
| `npm run test:coverage` | Pure policy tests with coverage thresholds |
| `npm run test:package`  | Build and verify the extension package     |
| `npm run secrets`       | Scan tracked and working files for secrets |
| `npm run ci`            | Run every local gate                       |

CI checks the pure policy function and the built package structure; it does
not launch Chrome or exercise the popup against the tabs API. Before shipping a
popup change, load `dist/` with **Load unpacked** and verify the popup on a page.

## License

MIT. See [LICENSE](./LICENSE).
