import { fail, ok } from '$lib/server/api/http';
import { requireRole } from '$lib/server/auth/guards';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, params }) => {
	try {
		requireRole(locals.session, 'editor');
		return ok({
			assetId: params.id,
			suggestions: ['painting', 'contemporary', 'catalogued']
		});
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
