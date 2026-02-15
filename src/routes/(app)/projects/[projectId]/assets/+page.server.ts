import { error } from '@sveltejs/kit';
import { requireSession } from '$lib/server/auth/guards';
import { getProject, listAssetsByProject } from '$lib/server/mock/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const session = requireSession(locals.session);
	const project = getProject(session.orgId, params.projectId);

	if (!project) {
		throw error(404, 'Project not found');
	}

	const q = url.searchParams.get('q') ?? '';
	const assets = listAssetsByProject(session.orgId, params.projectId, q);

	return {
		project,
		assets,
		filters: {
			q
		}
	};
};
