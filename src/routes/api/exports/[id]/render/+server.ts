import { fail, ok } from '$lib/server/api/http';
import { requireRole } from '$lib/server/auth/guards';
import { finishExport } from '$lib/server/mock/workflows';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, params }) => {
	try {
		const session = requireRole(locals.session, 'editor');
		const item = finishExport(session.orgId, params.id);
		if (!item) {
			return fail('not_found', 'Export not found', 404);
		}

		return ok({
			id: item.id,
			status: item.status,
			url: item.blobUrl
		});
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
