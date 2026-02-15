import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL;

if (!connectionString) {
	console.error('Missing DATABASE_URL or DATABASE_URL_DIRECT.');
	process.exit(1);
}

const sql = postgres(connectionString, { max: 1, prepare: false });

async function run() {
	const orgId = '11111111-1111-1111-1111-111111111111';
	const userId = '22222222-2222-2222-2222-222222222222';
	const projectId = '33333333-3333-3333-3333-333333333333';

	await sql`
		insert into orgs (id, name)
		values (${orgId}::uuid, 'Demo Org')
		on conflict (id) do nothing
	`;

	await sql`
		insert into users (id, clerk_user_id, email, name)
		values (${userId}::uuid, 'clerk_demo_user', 'demo@ithil.app', 'Demo Owner')
		on conflict (id) do nothing
	`;

	await sql`
		insert into memberships (org_id, user_id, role)
		values (${orgId}::uuid, ${userId}::uuid, 'owner')
		on conflict (org_id, user_id) do nothing
	`;

	await sql`
		insert into projects (id, org_id, name, description)
		values (${projectId}::uuid, ${orgId}::uuid, 'New Project', null)
		on conflict (id) do nothing
	`;
}

run()
	.then(async () => {
		console.log('Seed complete.');
		await sql.end();
	})
	.catch(async (err) => {
		console.error('Seed failed:', err);
		await sql.end();
		process.exit(1);
	});
