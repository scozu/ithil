import { z } from 'zod';

export const createShareInputSchema = z.object({
	projectId: z.string().min(1),
	expiresAt: z.string(),
	password: z.string().min(6).max(128).optional(),
	allowDownload: z.boolean().optional()
});

export const shareEventInputSchema = z.object({
	eventType: z.enum(['view', 'download'])
});

export type CreateShareInput = z.infer<typeof createShareInputSchema>;
export type ShareEventInput = z.infer<typeof shareEventInputSchema>;
