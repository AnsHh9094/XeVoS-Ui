# shadcn Registry Index Submission

This repository now exposes a namespaced registry at:

- `https://componentry.fun/r/registry.json`
- Example item: `https://componentry.fun/r/true-focus.json`

## Goal

Get zero-config installs working:

```bash
npx shadcn@latest add @componentry/true-focus
```

## Required change in `shadcn-ui/ui`

1. Open `apps/v4/registry/directory.json`.
2. Add an entry for Componentry (matching the current `registries.json` shape):

```json
{
  "name": "@componentry",
  "homepage": "https://componentry.fun",
  "url": "https://componentry.fun/r/{name}.json",
  "description": "Beautiful, interactive React + Tailwind components for modern product UIs."
}
```

3. Run:

```bash
pnpm registry:build
```

4. Commit generated index artifacts and open a PR.

## Suggested PR checklist

- [ ] `https://componentry.fun/r/registry.json` is publicly accessible.
- [ ] `https://componentry.fun/r/true-focus.json` is publicly accessible.
- [ ] Local validation passes in this repo: `pnpm validate:registry`.
- [ ] New namespace works with explicit registry flag:
      `npx shadcn@latest add @componentry/true-focus --registry "https://componentry.fun/r/registry.json"`.
