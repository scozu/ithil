import { fail, ok } from '$lib/server/api/http';
import { requireRole } from '$lib/server/auth/guards';
import { updateAsset } from '$lib/server/mock/store';
import { updateAssetInputSchema } from '$lib/shared/contracts';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	try {
		const session = requireRole(locals.session, 'editor');
		const body = await request.json();
		const parsed = updateAssetInputSchema.safeParse(body);

		if (!parsed.success) {
			return fail('validation_error', 'Invalid asset payload', 400, parsed.error.flatten());
		}

		const asset = updateAsset(session.orgId, params.id, parsed.data);
		if (!asset) {
			return fail('not_found', 'Asset not found', 404);
		}

		return ok({ item: asset });
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
