import { fail, ok } from '$lib/server/api/http';
import { getShareByToken } from '$lib/server/mock/workflows';
import { shareEventInputSchema } from '$lib/shared/contracts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	const share = getShareByToken(params.token);
	if (!share) {
		return fail('not_found', 'Share link not found', 404);
	}

	const body = await request.json();
	const parsed = shareEventInputSchema.safeParse(body);
	if (!parsed.success) {
		return fail('validation_error', 'Invalid share event payload', 400, parsed.error.flatten());
	}

	return ok({
		recorded: true,
		eventType: parsed.data.eventType
	});
};
