# Land Tracker

Personal real estate and land research tracker built with Next.js, Convex, Tailwind, and React-Leaflet.

## Setup

```bash
pnpm install
pnpm dev
```

This runs Next.js and `convex dev` in parallel.

- App: http://localhost:3000
- Convex local backend: from `.env.local` (`NEXT_PUBLIC_CONVEX_URL`)

### First-time auth

1. Open http://localhost:3000/signin
2. Create an account (email + password)
3. Add properties from **Add**

### Paste-to-fill (optional)

Set an Anthropic key on the Convex deployment:

```bash
pnpm exec convex env set ANTHROPIC_API_KEY <your-key>
```

## Scripts

- `pnpm dev` — frontend + Convex
- `pnpm dev:frontend` — Next only
- `pnpm dev:backend` — Convex only
- `pnpm build` — production Next build

## Notes

- pnpm is configured with `dangerouslyAllowAllBuilds=true` so install never blocks on package build scripts.
- Documents are stored in a related `documents` table; photos are storage IDs on each property.
- For a linked Convex cloud project later: `pnpm exec convex login` and reconfigure deployment.
