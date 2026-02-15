# Ithil Implementation Plan (Postgres-First)

## Summary

This is the execution baseline for Ithil before code scaffolding starts.

- Database is locked to PlanetScale Postgres.
- The prior PlanetScale Vitess/MySQL approach is superseded.
- The first UI target is the authenticated dashboard from Figma (`Desktop 1` style direction).

## Locked Decisions

- Tenant model: multi-organization from day one.
- Auth: Clerk with internal adapter layer.
- Runtime: SvelteKit on Vercel, using Bun for local/dev tasks.
- Database: PlanetScale Postgres.
- Storage: Vercel Blob.
- Cache/rate-limit/idempotency: Upstash Redis.
- Email: Resend.
- Observability: Sentry + Vercel logs.
- Share links (MVP): project-wide scope only.
- PDF templates (MVP): one built-in template.
- AI context (MVP): metadata-only (no OCR/RAG in MVP).

## Why Postgres for This Project

- Lower solo-dev entry cost profile than Vitess production branching.
- Full PostgreSQL compatibility, which keeps future search/AI options open.
- Better fit for incremental MVP evolution with standard SQL semantics.

## Architecture

- Frontend/API: SvelteKit + `@sveltejs/adapter-vercel`.
- Data access: Drizzle ORM with Postgres dialect.
- Connection strategy:
  - Runtime traffic through pooled endpoint.
  - Migrations through direct endpoint.
- Public share pages under `/s/[token]`.
- Authenticated app under `/app/...`.

## Data Model (Initial)

- `orgs`
- `users`
- `memberships`
- `projects`
- `assets`
- `tags`
- `asset_tags`
- `share_links`
- `share_events`
- `pdf_templates`
- `pdf_exports`
- `ai_conversations`
- `ai_messages`

### Asset fields required for dashboard cards

- `title`
- `year`
- `materials`
- `dimensions`
- `thumbnail_blob_key`
- `project_id`
- `org_id`

## API Surface (MVP)

- `GET /api/me`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`
- `POST /api/assets/upload/init`
- `POST /api/assets/upload/complete`
- `GET /api/assets`
- `PATCH /api/assets/:id`
- `POST /api/shares`
- `GET /api/shares/:token/validate`
- `POST /api/shares/:token/event`
- `POST /api/exports`
- `GET /api/exports/:id`
- `POST /api/ai/chat`
- `GET /api/cron/expire-shares`
- `GET /api/cron/process-exports`

## Figma-Informed UI Setup

Reference: `https://www.figma.com/design/QhdW5JdmDL7UX3Oj9oBJDm/ithil?node-id=0-1&m=dev`

### Required shell behavior

- Desktop layout:
  - Fixed left sidebar.
  - Main content region with asset cards.
- Mobile layout:
  - Top app bar.
  - Slide-in navigation drawer.

### Required grid behavior

- `>=1280px`: 3 columns.
- `768px-1279px`: 2 columns.
- `<768px`: 1 column.

### Card content

- Thumbnail frame.
- Line 1: `Title, Year`.
- Line 2: `Materials`.
- Line 3: `Dimensions`.

## Postgres-Specific Setup Tasks (Before Feature Work)

1. Add `.env.example` with:
   - `DATABASE_URL` (pooled)
   - `DATABASE_URL_DIRECT` (direct)
2. Configure Drizzle for Postgres.
3. Create initial SQL migration files targeting Postgres types:
   - `uuid`
   - `jsonb`
   - `timestamptz`
4. Add migration scripts using Bun:
   - `bun run db:generate`
   - `bun run db:migrate`
5. Add basic seed for:
   - one org
   - one owner membership
   - one demo project
   - six demo assets for grid layout checks

## Implementation Order

1. Bootstrap app and tooling.
2. Implement auth + org scoping middleware.
3. Implement Postgres schema and migrations.
4. Implement Figma-aligned app shell + asset grid page.
5. Implement upload/list/edit asset flow.
6. Implement share links.
7. Implement PDF exports.
8. Implement AI metadata chat.
9. Add cron jobs and hardening.

## Acceptance Criteria for the DB Switch

- No MySQL-only SQL in migrations.
- No Vitess-specific assumptions in docs or scripts.
- Postgres connection split is documented (`pooled` vs `direct`).
- Drizzle config and migration workflow target Postgres only.

