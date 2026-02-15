import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

let client: ReturnType<typeof postgres> | null = null;

if (connectionString) {
	client = postgres(connectionString, {
		prepare: false,
		max: 5
	});
}

export const db = client ? drizzle(client, { schema }) : null;

export function requireDb() {
	if (!db) {
		throw new Error('DATABASE_URL is not configured. Set DATABASE_URL to enable database access.');
	}

	return db;
}
