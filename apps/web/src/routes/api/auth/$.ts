import { createFileRoute } from '@tanstack/react-router';

import { createAuth } from '~/shared/server/auth/auth';

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const auth = createAuth((globalThis as Record<string, unknown>).DB as D1Database);
        return auth.handler(request);
      },
      POST: async ({ request }: { request: Request }) => {
        const auth = createAuth((globalThis as Record<string, unknown>).DB as D1Database);
        return auth.handler(request);
      },
    },
  },
});
