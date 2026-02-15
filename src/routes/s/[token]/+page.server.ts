import { error } from '@sveltejs/kit';
import { getShareByToken } from '$lib/server/mock/workflows';
import { listAssetsByProject } from '$lib/server/mock/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const share = getShareByToken(params.token);
	if (!share) {
		throw error(404, 'Share link not found');
	}

	if (new Date(share.expiresAt) <= new Date()) {
		throw error(410, 'Share link expired');
	}

	return {
		share: {
			id: share.id,
			projectId: share.projectId,
			expiresAt: share.expiresAt,
			allowDownload: share.allowDownload
		},
		assets: listAssetsByProject(share.orgId, share.projectId)
	};
};
