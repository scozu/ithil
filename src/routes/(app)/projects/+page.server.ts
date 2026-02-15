import { requireSession } from '$lib/server/auth/guards';
import { listProjects } from '$lib/server/mock/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = requireSession(locals.session);
	return {
		projects: listProjects(session.orgId)
	};
};
