import { z } from 'zod';

export const projectSchema = z.object({
	id: z.string().uuid().or(z.string().min(1)),
	orgId: z.string().uuid().or(z.string().min(1)),
	name: z.string().min(1).max(180),
	description: z.string().max(5000).nullable(),
	createdAt: z.string(),
	updatedAt: z.string()
});

export const createProjectInputSchema = z.object({
	name: z.string().min(1).max(180),
	description: z.string().max(5000).optional()
});

export const updateProjectInputSchema = z.object({
	name: z.string().min(1).max(180).optional(),
	description: z.string().max(5000).nullable().optional()
});

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;
