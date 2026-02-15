import { z } from 'zod';

export const assetListItemSchema = z.object({
	id: z.string().uuid().or(z.string().min(1)),
	projectId: z.string().uuid().or(z.string().min(1)),
	orgId: z.string().uuid().or(z.string().min(1)),
	title: z.string().min(1).max(220),
	filename: z.string().min(1).max(260),
	thumbnailUrl: z.string().url().or(z.string().min(1)),
	year: z.number().int().nullable(),
	materials: z.string().nullable(),
	dimensions: z.string().nullable(),
	createdAt: z.string()
});

export const getAssetsQuerySchema = z.object({
	projectId: z.string().min(1),
	q: z.string().max(200).optional(),
	type: z.string().max(120).optional(),
	tags: z.union([z.string(), z.array(z.string())]).optional(),
	cursor: z.string().optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	view: z.enum(['grid', 'list']).optional()
});

export const updateAssetInputSchema = z.object({
	title: z.string().min(1).max(220).optional(),
	notes: z.string().max(5000).nullable().optional(),
	year: z.number().int().min(1000).max(3000).nullable().optional(),
	materials: z.string().max(255).nullable().optional(),
	dimensions: z.string().max(255).nullable().optional(),
	tags: z.array(z.string()).max(32).optional()
});

export const uploadCompleteInputSchema = z.object({
	projectId: z.string().min(1),
	blobKey: z.string().min(1),
	filename: z.string().min(1).max(260),
	mimeType: z.string().min(1).max(120),
	sizeBytes: z.number().int().positive(),
	title: z.string().min(1).max(220).optional(),
	notes: z.string().max(5000).optional(),
	year: z.number().int().min(1000).max(3000).optional(),
	materials: z.string().max(255).optional(),
	dimensions: z.string().max(255).optional(),
	tags: z.array(z.string()).max(32).optional()
});

export type AssetListItem = z.infer<typeof assetListItemSchema>;
export type GetAssetsQuery = z.infer<typeof getAssetsQuerySchema>;
export type UpdateAssetInput = z.infer<typeof updateAssetInputSchema>;
export type UploadCompleteInput = z.infer<typeof uploadCompleteInputSchema>;
