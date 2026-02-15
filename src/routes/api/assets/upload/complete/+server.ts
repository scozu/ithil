import { fail, ok } from '$lib/server/api/http';
import { requireRole } from '$lib/server/auth/guards';
import { createAssetFromUpload } from '$lib/server/mock/store';
import { uploadCompleteInputSchema } from '$lib/shared/contracts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const session = requireRole(locals.session, 'editor');
		const body = await request.json();
		const parsed = uploadCompleteInputSchema.safeParse(body);

		if (!parsed.success) {
			return fail('validation_error', 'Invalid upload complete payload', 400, parsed.error.flatten());
		}

		const asset = createAssetFromUpload(session.orgId, parsed.data);
		return ok({ item: asset }, 201);
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
