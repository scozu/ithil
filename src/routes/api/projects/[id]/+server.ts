import { fail, ok } from '$lib/server/api/http';
import { requireRole, requireSession } from '$lib/server/auth/guards';
import { getProject, updateProject } from '$lib/server/mock/store';
import { updateProjectInputSchema } from '$lib/shared/contracts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	try {
		const session = requireSession(locals.session);
		const project = getProject(session.orgId, params.id);

		if (!project) {
			return fail('not_found', 'Project not found', 404);
		}

		return ok({ item: project });
	} catch {
		return fail('unauthorized', 'Authentication required', 401);
	}
};

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	try {
		const session = requireRole(locals.session, 'editor');
		const body = await request.json();
		const parsed = updateProjectInputSchema.safeParse(body);

		if (!parsed.success) {
			return fail('validation_error', 'Invalid project payload', 400, parsed.error.flatten());
		}

		const project = updateProject(session.orgId, params.id, parsed.data);
		if (!project) {
			return fail('not_found', 'Project not found', 404);
		}

		return ok({ item: project });
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
