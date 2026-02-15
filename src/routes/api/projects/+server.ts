import { ok, fail } from '$lib/server/api/http';
import { requireSession, requireRole } from '$lib/server/auth/guards';
import { createProjectInputSchema } from '$lib/shared/contracts';
import { createProject, listProjects } from '$lib/server/mock/store';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	try {
		const session = requireSession(locals.session);
		const projects = listProjects(session.orgId);
		return ok({ items: projects });
	} catch {
		return fail('unauthorized', 'Authentication required', 401);
	}
};

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const session = requireRole(locals.session, 'editor');
		const body = await request.json();
		const parsed = createProjectInputSchema.safeParse(body);

		if (!parsed.success) {
			return fail('validation_error', 'Invalid project payload', 400, parsed.error.flatten());
		}

		const created = createProject(session.orgId, parsed.data);
		return ok({ item: created }, 201);
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
