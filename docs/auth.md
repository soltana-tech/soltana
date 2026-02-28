# Auth

Self-hosted authentication via Better Auth with Drizzle adapter on Cloudflare D1.

## Provider: Better Auth

- **Self-hosted** -- runs entirely on the application server, no external service
- **Email + password** -- built-in, enabled by default
- **OAuth** -- Google, GitHub (configurable via environment variables)
- **Session management** -- server-side sessions stored in D1

## Architecture

### Server Instance

- **`src/shared/server/auth/auth.ts`** -- `createAuth(d1)` factory; configures Better Auth with
  Drizzle adapter, `tanstackStartCookies` plugin, and social providers
- **`src/routes/api/auth/$.ts`** -- TanStack Start API route that delegates all `/api/auth/*`
  requests to Better Auth's handler

### Client

- **`src/shared/lib/auth-client.ts`** -- `createAuthClient()` from `better-auth/react`; exports
  `signIn`, `signUp`, `signOut`, `useSession`

### Helpers

- **`getSession()`** -- server function; reads session from request headers
- **`ensureSession()`** -- server function; redirects to `/sign-in` if unauthenticated

## Custom Sign-in/Sign-up Pages

- **`src/routes/sign-in.tsx`** -- email/password form with error handling
- **`src/routes/sign-up.tsx`** -- name/email/password form with validation

## Database Tables

Better Auth manages four tables (`user`, `session`, `account`, `verification`) defined in the
Drizzle schema. These are separate from the application's user-facing tables.

## Auth-gated vs Unauthenticated

| Auth required | No auth |
| ------------- | ------- |
| Custom study plans | Full scripture reading |
| Annotations, notebooks, tagging | Built-in plan following (localStorage progress) |
| Cross-device progress sync | Historical timeline |
| Persistent user preferences | Teach section (read-only, no saving) |

## Environment Variables

```env
BETTER_AUTH_SECRET=<32+ char secret>
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<optional>
GOOGLE_CLIENT_SECRET=<optional>
GITHUB_CLIENT_ID=<optional>
GITHUB_CLIENT_SECRET=<optional>
```

## Status

- Better Auth integration scaffolded with Drizzle D1 adapter
- Custom sign-in/sign-up pages with Dracula neumorphic styling
- Server helpers (`getSession`, `ensureSession`) available
- Auth-gated routes not yet enforced (Phase 2)
- localStorage to D1 migration prompt planned for Phase 2
