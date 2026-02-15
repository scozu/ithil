import { ok, fail } from '$lib/server/api/http';
import { requireSession } from '$lib/server/auth/guards';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	try {
		const session = requireSession(locals.session);
		return ok({
			user: {
				id: session.userId,
				email: session.email ?? null,
				name: session.name ?? null
			},
			orgId: session.orgId,
			role: session.role
		});
	} catch {
		return fail('unauthorized', 'Authentication required', 401);
	}
};
