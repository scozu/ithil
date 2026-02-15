import { fail, ok } from '$lib/server/api/http';
import { requireRole } from '$lib/server/auth/guards';
import { createShareLink } from '$lib/server/mock/workflows';
import { createShareInputSchema } from '$lib/shared/contracts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request, url }) => {
	try {
		const session = requireRole(locals.session, 'editor');
		const body = await request.json();
		const parsed = createShareInputSchema.safeParse(body);

		if (!parsed.success) {
			return fail('validation_error', 'Invalid share payload', 400, parsed.error.flatten());
		}

		const share = createShareLink(
			session.orgId,
			parsed.data.projectId,
			parsed.data.expiresAt,
			parsed.data.allowDownload ?? false
		);

		return ok(
			{
				id: share.id,
				token: share.token,
				url: `${url.origin}/s/${share.token}`,
				expiresAt: share.expiresAt
			},
			201
		);
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
