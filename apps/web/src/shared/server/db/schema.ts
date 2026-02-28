import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// --- Better Auth (managed by better-auth, do not modify column names) ---

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'boolean' }).notNull(),
  image: text('image'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: integer('accessTokenExpiresAt', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refreshTokenExpiresAt', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }),
});

// --- Corpus (read-only at runtime, populated by pipeline) ---

export const corpora = sqliteTable('corpora', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  tradition: text('tradition').notNull(),
  language: text('language').notNull(),
  refSystem: text('ref_system').notNull(),
});

export const translations = sqliteTable('translations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  corpusId: integer('corpus_id')
    .notNull()
    .references(() => corpora.id),
  name: text('name').notNull(),
  abbreviation: text('abbreviation').notNull(),
  license: text('license'),
});

export const passages = sqliteTable('passages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  corpusId: integer('corpus_id')
    .notNull()
    .references(() => corpora.id),
  translationId: integer('translation_id')
    .notNull()
    .references(() => translations.id),
  refSystem: text('ref_system').notNull(),
  ref: text('ref', { mode: 'json' }).notNull(),
  text: text('text').notNull(),
  sortOrder: integer('sort_order').notNull(),
});

export const crossReferences = sqliteTable('cross_references', {
  sourceId: integer('source_id')
    .notNull()
    .references(() => passages.id),
  targetId: integer('target_id')
    .notNull()
    .references(() => passages.id),
  type: text('type').notNull(),
});

// --- Study Plans ---

export const planDefinitions = sqliteTable('plan_definitions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type', { enum: ['builtin', 'custom'] }).notNull(),
  creatorUserId: text('creator_user_id'),
});

export const planItems = sqliteTable('plan_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  planDefinitionId: integer('plan_definition_id')
    .notNull()
    .references(() => planDefinitions.id),
  sortOrder: integer('sort_order').notNull(),
  passageRef: text('passage_ref', { mode: 'json' }),
  label: text('label'),
});

export const userPlans = sqliteTable('user_plans', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  planDefinitionId: integer('plan_definition_id')
    .notNull()
    .references(() => planDefinitions.id),
  enrolledAt: text('enrolled_at').notNull(),
});

export const readingProgress = sqliteTable('reading_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  planItemId: integer('plan_item_id')
    .notNull()
    .references(() => planItems.id),
  completedAt: text('completed_at').notNull(),
});

// --- Annotations ---

export const annotations = sqliteTable('annotations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  passageId: integer('passage_id')
    .notNull()
    .references(() => passages.id),
  type: text('type', {
    enum: ['highlight', 'underline', 'note', 'link'],
  }).notNull(),
  content: text('content'),
  color: text('color'),
  createdAt: text('created_at').notNull(),
});

export const annotationTags = sqliteTable('annotation_tags', {
  annotationId: integer('annotation_id')
    .notNull()
    .references(() => annotations.id),
  tag: text('tag').notNull(),
});

export const notebooks = sqliteTable('notebooks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
});

export const notebookEntries = sqliteTable('notebook_entries', {
  notebookId: integer('notebook_id')
    .notNull()
    .references(() => notebooks.id),
  annotationId: integer('annotation_id')
    .notNull()
    .references(() => annotations.id),
});

// --- User Preferences ---

export const userPreferences = sqliteTable('user_preferences', {
  userId: text('user_id').primaryKey(),
  theme: text('theme'),
  readingTheme: text('reading_theme'),
  fontSize: integer('font_size'),
  layout: text('layout'),
  footnotePlacement: text('footnote_placement'),
  redLetter: integer('red_letter', { mode: 'boolean' }),
  prefsJson: text('prefs_json', { mode: 'json' }),
});
