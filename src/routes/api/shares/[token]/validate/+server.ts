import { fail, ok } from '$lib/server/api/http';
import { getShareByToken } from '$lib/server/mock/workflows';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const share = getShareByToken(params.token);

	if (!share) {
		return fail('not_found', 'Share link not found', 404);
	}

	return ok({
		id: share.id,
		projectId: share.projectId,
		expiresAt: share.expiresAt,
		allowDownload: share.allowDownload,
		passwordRequired: false
	});
};
