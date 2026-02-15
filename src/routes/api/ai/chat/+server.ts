import { fail, ok } from '$lib/server/api/http';
import { requireSession } from '$lib/server/auth/guards';
import { aiChatInputSchema } from '$lib/shared/contracts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const session = requireSession(locals.session);
		const body = await request.json();
		const parsed = aiChatInputSchema.safeParse(body);

		if (!parsed.success) {
			return fail('validation_error', 'Invalid chat payload', 400, parsed.error.flatten());
		}

		return ok({
			conversationId: parsed.data.conversationId ?? crypto.randomUUID(),
			message: {
				role: 'assistant',
				content:
					`Metadata-only assistant response for project ${parsed.data.projectId}. ` +
					`Received prompt: "${parsed.data.message}".`
			},
			scope: {
				orgId: session.orgId,
				projectId: parsed.data.projectId
			}
		});
	} catch {
		return fail('unauthorized', 'Authentication required', 401);
	}
};
