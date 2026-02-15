# ithil

Ithil is a performance-focused, project-based digital asset management platform.

## Baseline

- Runtime/tooling: Bun + SvelteKit + Vercel adapter.
- Auth: Clerk-first architecture via internal auth adapter seam.
- Database: PlanetScale Postgres.
- Storage: Vercel Blob.
- Queue/cache/rate-limit: Upstash Redis.
- Email: Resend.
- Monitoring: Sentry + Vercel logs.
- UI baseline: Figma-inspired authenticated shell with sidebar + responsive asset grid.

## Quick Start

1. Install dependencies:
```bash
bun install
```
2. Configure environment:
```bash
cp .env.example .env
```
3. Generate migrations:
```bash
bun run db:generate
```
4. Run checks:
```bash
bun run check
```
5. Start development:
```bash
bun run dev
```

## Database Commands

- Generate migration: `bun run db:generate`
- Apply migrations: `bun run db:migrate`
- Push schema: `bun run db:push`
- Open Drizzle Studio: `bun run db:studio`
- Seed demo rows: `bun run seed`

## Build

```bash
bun run build
```

## Planning Docs

- `/Users/scozu/Developer/ithil/docs/IMPLEMENTATION_PLAN.md`
