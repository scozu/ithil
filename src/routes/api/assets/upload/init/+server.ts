import { fail, ok } from '$lib/server/api/http';
import { requireRole } from '$lib/server/auth/guards';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import type { RequestHandler } from './$types';

const uploadInitSchema = z.object({
	projectId: z.string().min(1),
	filename: z.string().min(1).max(260),
	mimeType: z.string().min(1).max(120),
	sizeBytes: z.number().int().positive()
});

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const session = requireRole(locals.session, 'editor');
		const body = await request.json();
		const parsed = uploadInitSchema.safeParse(body);

		if (!parsed.success) {
			return fail('validation_error', 'Invalid upload init payload', 400, parsed.error.flatten());
		}

		const objectKey = `org/${session.orgId}/projects/${parsed.data.projectId}/assets/${randomUUID()}/${parsed.data.filename}`;

		return ok(
			{
				objectKey,
				uploadMethod: 'direct-blob-upload'
			},
			201
		);
	} catch {
		return fail('forbidden', 'Editor access required', 403);
	}
};
