# Show Me the Law

Plain-language summaries of statutes and regulations, kept current as they change.

## What's inside

Turborepo monorepo, pnpm workspaces.

- `apps/web` — Next.js 16 + Tailwind v4 + shadcn frontend (design deferred, stack decided)
- `apps/api` — Fastify 5 + Zod backend
- `apps/worker` — BullMQ job worker (Valkey-backed), currently a shell
- `apps/ingest` — Vaquill → Postgres ingestion pipeline (not yet built)
- `packages/db` — Drizzle ORM schema (not yet built)
- `packages/eslint-config` — shared ESLint flat configs
- `packages/typescript-config` — shared `tsconfig.json` bases

See `personal/codebases/show-me-the-law/planning/` in the wiki for the full design docs.

## Prerequisites

- Node 24+ (see `.nvmrc`)
- pnpm (`corepack enable && corepack prepare pnpm@latest --activate`)
- Docker (for Postgres + Valkey)

## Getting started

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm dev
```

`apps/api` runs on `:3000` (`PORT` in `.env`), `apps/web` on `:3000` in dev via `next dev --port 3000` — don't run both at once, or change one's port.

## Scripts

| Command             | What it does                                               |
| ------------------- | ---------------------------------------------------------- |
| `pnpm dev`          | Run all apps in dev mode                                   |
| `pnpm build`        | Build all apps/packages                                    |
| `pnpm lint`         | Lint all apps/packages                                     |
| `pnpm check-types`  | Type-check all apps/packages                               |
| `pnpm format`       | Format the repo with Prettier                              |
| `pnpm format:check` | Check formatting without writing (CI)                      |
| `pnpm clean`        | Remove build outputs and `.turbo` cache in every workspace |

Turborepo caches every task above — a second run with no relevant changes replays instantly instead of re-executing.

## Docker

`docker-compose.yaml` runs Postgres 18 and Valkey (Redis-compatible) for local dev. Credentials come from `.env` — see `.env.example`.

Valkey's host port is `6380`, not the default `6379` — avoids colliding with other local projects also running Redis/Valkey. Containers talk to each other on the default `6379` internally; only the host-side mapping is shifted.
