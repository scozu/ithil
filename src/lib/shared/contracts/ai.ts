import { z } from 'zod';

export const aiChatInputSchema = z.object({
	projectId: z.string().min(1),
	conversationId: z.string().optional(),
	message: z.string().min(1).max(4000)
});

export type AiChatInput = z.infer<typeof aiChatInputSchema>;
