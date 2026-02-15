import { z } from 'zod';

export const createExportInputSchema = z.object({
	projectId: z.string().min(1),
	templateId: z.string().optional()
});

export type CreateExportInput = z.infer<typeof createExportInputSchema>;
