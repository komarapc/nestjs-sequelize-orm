import { z } from 'zod';

export const rolesCreateSchema = z.object({
	name: z.string().min(2).max(255),
	description: z.string().min(2).max(255).optional(),
});

export const rolesUpdateSchema = z.object({
	name: z.string().min(2).max(255).optional(),
	description: z.string().min(2).max(255).optional(),
});

export const rolesQuerySchema = z.object({
	name: z.string().min(2).max(255).optional(),
	page: z.string().transform(Number).optional().default('1'),
	limit: z.string().transform(Number).optional().default('10'),
});

export type RolesCreateSchema = z.infer<typeof rolesCreateSchema>;
export type RolesUpdateSchema = z.infer<typeof rolesUpdateSchema>;
export type RolesQuerySchema = z.infer<typeof rolesQuerySchema>;
