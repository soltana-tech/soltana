import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/shared/server/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
});
