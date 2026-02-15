import { fail, ok } from '$lib/server/api/http';
import { processQueuedExports } from '$lib/server/mock/workflows';
import type { RequestHandler } from './$types';

function isAuthorized(secret: string | undefined, authHeader: string | null) {
	if (!secret) return false;
	return authHeader === `Bearer ${secret}`;
}

export const GET: RequestHandler = async ({ request }) => {
	if (!isAuthorized(process.env.CRON_SECRET, request.headers.get('authorization'))) {
		return fail('unauthorized', 'Invalid cron secret', 401);
	}

	const processed = processQueuedExports();
	return ok({ processedCount: processed.length, ids: processed });
};
