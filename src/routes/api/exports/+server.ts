import { fail, ok } from '$lib/server/api/http';
import { requireRole } from '$lib/server/auth/guards';
import { createPdfExport } from '$lib/server/mock/workflows';
import { createExportInputSchema } from '$lib/shared/contracts';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const session = requireRole(locals.session, 'editor');
		const body = await request.json();
		const parsed = createExportInputSchema.safeParse(body);

		if (!parsed.success) {
			return fail('validation_error', 'Invalid export payload', 400, parsed.error.flatten());
		}

		const item = createPdfExport(session.orgId, parsed.data.projectId);
		return ok({ id: item.id, status: item.status }, 201);
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
