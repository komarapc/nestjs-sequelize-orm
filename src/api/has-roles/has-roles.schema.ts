import { z } from 'zod';

export const hasRoleCreateSchema = z.object({
	user_id: z.string().min(36),
	role_id: z.string().min(36),
});

export const hasRoleUpdateSchema = z.object({
	user_id: z.string().optional(),
	role_id: z.string().optional(),
});

export type HasRoleCreateSchema = z.infer<typeof hasRoleCreateSchema>;
export type HasRoleUpdateSchema = z.infer<typeof hasRoleUpdateSchema>;
