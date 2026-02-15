import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL || '';

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url
	},
	verbose: true,
	strict: true
});
