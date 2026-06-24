# Reglet

## Development

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm exec playwright install chromium
```

Tests run in a real browser via Playwright. The `playwright` npm package does not download browser binaries during install, so Chromium must be installed separately before running tests.

Component tests use [vitest-browser-svelte](https://github.com/vitest-community/vitest-browser-svelte).

```bash
pnpm test
```
