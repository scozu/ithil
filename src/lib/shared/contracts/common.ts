import { z } from 'zod';

export const roleSchema = z.enum(['owner', 'admin', 'editor', 'viewer']);

export const apiErrorSchema = z.object({
	error: z.object({
		code: z.string(),
		message: z.string(),
		details: z.unknown().optional()
	})
});

export type ApiError = z.infer<typeof apiErrorSchema>;
