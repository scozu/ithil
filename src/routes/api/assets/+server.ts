import { fail, ok } from '$lib/server/api/http';
import { requireSession } from '$lib/server/auth/guards';
import { listAssetsByProject } from '$lib/server/mock/store';
import { getAssetsQuerySchema } from '$lib/shared/contracts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	try {
		const session = requireSession(locals.session);
		const parsed = getAssetsQuerySchema.safeParse({
			projectId: url.searchParams.get('projectId'),
			q: url.searchParams.get('q') ?? undefined,
			type: url.searchParams.get('type') ?? undefined,
			tags: url.searchParams.getAll('tags'),
			cursor: url.searchParams.get('cursor') ?? undefined,
			limit: url.searchParams.get('limit') ?? undefined,
			view: url.searchParams.get('view') ?? undefined
		});

		if (!parsed.success) {
			return fail('validation_error', 'Invalid assets query', 400, parsed.error.flatten());
		}

		const items = listAssetsByProject(session.orgId, parsed.data.projectId, parsed.data.q);
		return ok({
			items,
			nextCursor: null
		});
	} catch {
		return fail('unauthorized', 'Authentication required', 401);
	}
};
