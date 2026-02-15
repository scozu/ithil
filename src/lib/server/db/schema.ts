import {
	boolean,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	primaryKey,
	smallint,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

export const membershipRoleEnum = pgEnum('membership_role', ['owner', 'admin', 'editor', 'viewer']);
export const exportStatusEnum = pgEnum('export_status', ['queued', 'processing', 'finished', 'failed']);
export const aiRoleEnum = pgEnum('ai_role', ['system', 'user', 'assistant']);
export const shareEventTypeEnum = pgEnum('share_event_type', ['view', 'download']);

export const orgs = pgTable('orgs', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 160 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	clerkUserId: varchar('clerk_user_id', { length: 200 }).notNull().unique(),
	email: varchar('email', { length: 320 }).notNull(),
	name: varchar('name', { length: 160 }),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const memberships = pgTable(
	'memberships',
	{
		orgId: uuid('org_id')
			.notNull()
			.references(() => orgs.id, { onDelete: 'cascade' }),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		role: membershipRoleEnum('role').notNull().default('viewer'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [primaryKey({ columns: [table.orgId, table.userId] })]
);

export const projects = pgTable(
	'projects',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		orgId: uuid('org_id')
			.notNull()
			.references(() => orgs.id, { onDelete: 'cascade' }),
		name: varchar('name', { length: 180 }).notNull(),
		description: text('description'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [index('projects_org_created_idx').on(table.orgId, table.createdAt)]
);

export const assets = pgTable(
	'assets',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		orgId: uuid('org_id')
			.notNull()
			.references(() => orgs.id, { onDelete: 'cascade' }),
		projectId: uuid('project_id')
			.notNull()
			.references(() => projects.id, { onDelete: 'cascade' }),
		filename: varchar('filename', { length: 260 }).notNull(),
		title: varchar('title', { length: 220 }).notNull(),
		notes: text('notes'),
		mimeType: varchar('mime_type', { length: 120 }).notNull(),
		sizeBytes: integer('size_bytes').notNull(),
		year: smallint('year'),
		materials: varchar('materials', { length: 255 }),
		dimensions: varchar('dimensions', { length: 255 }),
		blobKey: text('blob_key').notNull(),
		thumbnailBlobKey: text('thumbnail_blob_key'),
		createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [
		index('assets_org_project_created_idx').on(table.orgId, table.projectId, table.createdAt),
		index('assets_org_project_mime_created_idx').on(
			table.orgId,
			table.projectId,
			table.mimeType,
			table.createdAt
		)
	]
);

export const tags = pgTable('tags', {
	id: uuid('id').primaryKey().defaultRandom(),
	orgId: uuid('org_id')
		.notNull()
		.references(() => orgs.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 80 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const assetTags = pgTable(
	'asset_tags',
	{
		assetId: uuid('asset_id')
			.notNull()
			.references(() => assets.id, { onDelete: 'cascade' }),
		tagId: uuid('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' })
	},
	(table) => [primaryKey({ columns: [table.assetId, table.tagId] })]
);

export const shareLinks = pgTable(
	'share_links',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		orgId: uuid('org_id')
			.notNull()
			.references(() => orgs.id, { onDelete: 'cascade' }),
		projectId: uuid('project_id')
			.notNull()
			.references(() => projects.id, { onDelete: 'cascade' }),
		tokenHash: varchar('token_hash', { length: 64 }).notNull(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		passwordHash: varchar('password_hash', { length: 255 }),
		allowDownload: boolean('allow_download').notNull().default(false),
		createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
		revokedAt: timestamp('revoked_at', { withTimezone: true }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [uniqueIndex('share_links_token_hash_uk').on(table.tokenHash)]
);

export const shareEvents = pgTable('share_events', {
	id: uuid('id').primaryKey().defaultRandom(),
	shareLinkId: uuid('share_link_id')
		.notNull()
		.references(() => shareLinks.id, { onDelete: 'cascade' }),
	eventType: shareEventTypeEnum('event_type').notNull(),
	ipHash: varchar('ip_hash', { length: 64 }),
	uaHash: varchar('ua_hash', { length: 64 }),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const pdfTemplates = pgTable('pdf_templates', {
	id: uuid('id').primaryKey().defaultRandom(),
	orgId: uuid('org_id')
		.notNull()
		.references(() => orgs.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 160 }).notNull(),
	schemaJson: jsonb('schema_json').notNull(),
	htmlTemplate: text('html_template').notNull(),
	cssTemplate: text('css_template').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const pdfExports = pgTable(
	'pdf_exports',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		orgId: uuid('org_id')
			.notNull()
			.references(() => orgs.id, { onDelete: 'cascade' }),
		projectId: uuid('project_id')
			.notNull()
			.references(() => projects.id, { onDelete: 'cascade' }),
		templateId: uuid('template_id').references(() => pdfTemplates.id, { onDelete: 'set null' }),
		status: exportStatusEnum('status').notNull().default('queued'),
		blobKey: text('blob_key'),
		errorMessage: text('error_message'),
		requestedBy: uuid('requested_by').references(() => users.id, { onDelete: 'set null' }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [
		index('pdf_exports_org_project_status_created_idx').on(
			table.orgId,
			table.projectId,
			table.status,
			table.createdAt
		)
	]
);

export const aiConversations = pgTable('ai_conversations', {
	id: uuid('id').primaryKey().defaultRandom(),
	orgId: uuid('org_id')
		.notNull()
		.references(() => orgs.id, { onDelete: 'cascade' }),
	projectId: uuid('project_id')
		.notNull()
		.references(() => projects.id, { onDelete: 'cascade' }),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	title: varchar('title', { length: 160 }),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const aiMessages = pgTable('ai_messages', {
	id: uuid('id').primaryKey().defaultRandom(),
	conversationId: uuid('conversation_id')
		.notNull()
		.references(() => aiConversations.id, { onDelete: 'cascade' }),
	role: aiRoleEnum('role').notNull(),
	contentText: text('content_text').notNull(),
	metadataJson: jsonb('metadata_json'),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export type MembershipRole = (typeof membershipRoleEnum.enumValues)[number];
