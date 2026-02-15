import { fail, ok } from '$lib/server/api/http';
import { requireRole } from '$lib/server/auth/guards';
import { z } from 'zod';
import type { RequestHandler } from './$types';

const bodySchema = z.object({
	tags: z.array(z.string().min(1).max(80)).max(32)
});

export const POST: RequestHandler = async ({ locals, request, params }) => {
	try {
		requireRole(locals.session, 'editor');
		const body = await request.json();
		const parsed = bodySchema.safeParse(body);
		if (!parsed.success) {
			return fail('validation_error', 'Invalid tags payload', 400, parsed.error.flatten());
		}

		return ok({
			assetId: params.id,
			tags: parsed.data.tags
		});
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
