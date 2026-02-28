import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { createAuth } from './auth';

export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const headers = getRequestHeaders();
  const auth = createAuth((globalThis as Record<string, unknown>).DB as D1Database);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const session = await auth.api.getSession({ headers });
  return session;
});

export const ensureSession = createServerFn({ method: 'GET' }).handler(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const headers = getRequestHeaders();
  const auth = createAuth((globalThis as Record<string, unknown>).DB as D1Database);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const session = await auth.api.getSession({ headers });

  if (!session) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: '/sign-in' });
  }

  return session;
});
