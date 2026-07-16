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
- `pnpm build` — deploy Convex prod, then Next production build (for Vercel)
- `pnpm build:next` — Next production build only

## Deploy (Vercel + Convex)

Vercel hosts Next.js; Convex hosts the backend. Deploy both.

1. **Convex production env** (dashboard or CLI with `--prod`):

   ```bash
   pnpm exec convex env set SITE_URL https://YOUR-APP.vercel.app --prod
   pnpm exec convex env set ANTHROPIC_API_KEY <your-key> --prod
   ```

   Also ensure production has Convex Auth keys (`JWT_PRIVATE_KEY`, `JWKS`). Run `pnpm dlx @convex-dev/auth` against prod if missing.

2. **Vercel project** — import the repo (pnpm). Set:

   | Variable | Value |
   |----------|--------|
   | `NEXT_PUBLIC_CONVEX_URL` | Production Convex URL (`*.convex.cloud`) |
   | `NEXT_PUBLIC_CONVEX_SITE_URL` | Production HTTP actions URL (`*.convex.site`) |
   | `CONVEX_DEPLOY_KEY` | Deploy key from Convex dashboard → Production → Settings |

   Use **prod** URLs, not the `dev:` values in `.env.local`.

3. **Build** — Vercel’s default `pnpm build` runs `convex deploy` then `next build` via `CONVEX_DEPLOY_KEY`.

4. After the first deploy, set `SITE_URL` to the real Vercel URL (or custom domain), create an account on `/signin`, and smoke-test auth + paste-to-fill.

## Notes

- pnpm is configured with `dangerouslyAllowAllBuilds=true` so install never blocks on package build scripts.
- Documents are stored in a related `documents` table; photos are storage IDs on each property.
- `ANTHROPIC_API_KEY` belongs on the **Convex** deployment, not only in `.env.local` or Vercel.
