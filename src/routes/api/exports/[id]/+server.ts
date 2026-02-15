import { fail, ok } from '$lib/server/api/http';
import { requireSession } from '$lib/server/auth/guards';
import { getExportById } from '$lib/server/mock/workflows';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	try {
		const session = requireSession(locals.session);
		const item = getExportById(session.orgId, params.id);

		if (!item) {
			return fail('not_found', 'Export not found', 404);
		}

		return ok({
			id: item.id,
			status: item.status,
			url: item.blobUrl
		});
	} catch {
		return fail('unauthorized', 'Authentication required', 401);
	}
};
